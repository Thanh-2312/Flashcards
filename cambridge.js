/**
 * =========================================================================
 * CAMBRIDGE IELTS INTERACTIVE PLATFORM & B2-C2 TOPIC FLASHCARD HUB
 * Features:
 * 1. Book & Test Selector (CAM 10, CAM 11, etc. - Tests 1 to 4)
 * 2. Listening Test taking with built-in audio player & scrub timeline
 * 3. Reading Test taking with responsive split-screen layout
 * 4. Automatic scoring with official IELTS 9.0 Band converter
 * 5. Error diagnosis, detailed Vietnamese explanations & Clue quotes
 * 6. "▶ Phát lại đoạn audio dẫn chứng" (Plays exact audio slice for each clue)
 * 7. Test completion tracking & progress badges saved to localStorage
 * 8. B2 -> C2 Academic Vocabulary extraction categorized into 8 Topics
 * 9. Spaced Repetition (1 - 4 - 7 - 14 ngày) rolling flashcard study
 * 10. Direct sync to app's personal flashcard database & Firebase cloud
 * =========================================================================
 */

(function () {
  'use strict';

  // --- STATE ---
  const state = {
    data: null,
    currentBookId: 'cam10',
    currentTestId: 'cam10_test1',
    currentSkill: 'listening', // 'listening' | 'reading' | 'topics'
    currentPartIndex: 0, // 0-based index for part/passage
    activeSubView: 'hub', // 'hub' | 'test' | 'review' | 'topics' | 'topic-study'
    userAnswers: {}, // key: "cam10_test1_listening_q1" -> string
    lastSubmission: null,
    progress: {}, // testId_skill -> { completed: true, score, total, band, date }
    
    // Audio Player State
    audioEl: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    playbackRate: 1.0,
    activeClueTime: null, // { start, end, qNum }
    
    // Topic Flashcard State
    activeTopicId: null,
    topicIntervalFilter: 'all', // 'all' | '1' | '4' | '7' | '14'
    topicCurrentIndex: 0,
    topicCardFlipped: false,
    savedTopicWordIds: new Set()
  };

  // --- ESCAPE HELPERS ---
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  // --- AUDIO CLOUD RESOLVER (GITHUB RELEASES FALLBACK) ---
  const DEFAULT_AUDIO_RELEASE_BASE = 'https://github.com/Thanh-2312/Flashcards/releases/download/v1.0-audio/';

  function resolveAudioUrl(src) {
    if (!src) return '';
    if (src.startsWith('http://') || src.startsWith('https://')) return src;

    const releaseBase = (window.APP_CONFIG && window.APP_CONFIG.AUDIO_RELEASE_URL)
      ? window.APP_CONFIG.AUDIO_RELEASE_URL.replace(/\/$/, '') + '/'
      : DEFAULT_AUDIO_RELEASE_BASE;

    const filename = src.split('/').pop().trim();
    const isOnline = window.location.hostname.includes('github.io');
    const isCam12To20 = /(?:CAM|Cam)\s*(?:1[2-9]|20)/i.test(src);

    if (isOnline && isCam12To20) {
      return `${releaseBase}${encodeURIComponent(filename)}`;
    }

    return encodeURI(src);
  }
  window.resolveAudioUrl = resolveAudioUrl;

  // --- STORAGE HELPERS FOR TEST PROGRESS ---
  const PROGRESS_STORAGE_KEY = 'ielts_cambridge_progress_v2';
  const SAVED_WORDS_STORAGE_KEY = 'ielts_cambridge_saved_vocab';

  function loadProgress() {
    try {
      const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (stored) state.progress = JSON.parse(stored);
    } catch (e) {
      state.progress = {};
    }

    try {
      const saved = localStorage.getItem(SAVED_WORDS_STORAGE_KEY);
      if (saved) state.savedTopicWordIds = new Set(JSON.parse(saved));
    } catch (e) {
      state.savedTopicWordIds = new Set();
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(state.progress));
    } catch (e) {
      console.warn('Cannot save progress to localStorage', e);
    }
  }

  function saveTopicWordsStorage() {
    try {
      localStorage.setItem(SAVED_WORDS_STORAGE_KEY, JSON.stringify(Array.from(state.savedTopicWordIds)));
    } catch (e) {}
  }

  // --- IELTS BAND CONVERTER ---
  function calculateBand(score, total, skill) {
    if (!state.data || !state.data.band_scale) {
      const pct = score / Math.max(1, total);
      if (pct >= 0.9) return 9.0;
      if (pct >= 0.8) return 8.0;
      if (pct >= 0.7) return 7.0;
      if (pct >= 0.6) return 6.0;
      if (pct >= 0.5) return 5.0;
      return 4.0;
    }

    // Scale to standard 40 questions
    const scaledScore = Math.round((score / Math.max(1, total)) * 40);
    const scale = state.data.band_scale[skill] || state.data.band_scale['listening'];
    
    for (const tier of scale) {
      if (scaledScore >= tier.min && scaledScore <= tier.max) {
        return tier.band;
      }
    }
    return 4.0;
  }

  // --- DYNAMIC TEST LOADER (SCHEMA 3.1) ---
  function loadTest(testId) {
    if (window.CAM_TESTS && window.CAM_TESTS[testId]) {
      return Promise.resolve(window.CAM_TESTS[testId]);
    }
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-test-id="${testId}"]`);
      if (existing) {
        if (window.CAM_TESTS && window.CAM_TESTS[testId]) {
          return resolve(window.CAM_TESTS[testId]);
        }
        existing.addEventListener('load', () => {
          if (window.CAM_TESTS && window.CAM_TESTS[testId]) resolve(window.CAM_TESTS[testId]);
          else reject(new Error(`Test data for ${testId} not found in window.CAM_TESTS.`));
        });
        existing.addEventListener('error', () => reject(new Error(`Không thể nạp dữ liệu bài thi ${testId}.`)));
        return;
      }
      const script = document.createElement('script');
      script.src = `data/tests/${testId}.js`;
      script.setAttribute('data-test-id', testId);
      script.onload = () => {
        if (window.CAM_TESTS && window.CAM_TESTS[testId]) {
          resolve(window.CAM_TESTS[testId]);
        } else {
          reject(new Error(`Không tìm thấy dữ liệu ${testId} sau khi nạp script.`));
        }
      };
      script.onerror = () => {
        reject(new Error(`Chưa có file dữ liệu data/tests/${testId}.js.`));
      };
      document.head.appendChild(script);
    });
  }

  // --- GET DATA HELPERS ---
  function getCurrentBook() {
    if (!state.data || !state.data.books) return null;
    return state.data.books.find(b => b.id === state.currentBookId) || state.data.books[0];
  }

  function getCurrentTest() {
    if (window.CAM_TESTS && window.CAM_TESTS[state.currentTestId]) {
      return window.CAM_TESTS[state.currentTestId];
    }
    const book = getCurrentBook();
    if (!book || !book.tests) return null;
    return book.tests.find(t => t.id === state.currentTestId) || book.tests[0];
  }

  function getCurrentListeningPart() {
    const test = getCurrentTest();
    if (!test || !test.listening || !test.listening.parts) return null;
    return test.listening.parts[state.currentPartIndex] || test.listening.parts[0];
  }

  function getCurrentReadingPassage() {
    const test = getCurrentTest();
    if (!test || !test.reading || !test.reading.passages) return null;
    return test.reading.passages[state.currentPartIndex] || test.reading.passages[0];
  }

  function getCurrentTopic() {
    if (!state.data || !state.data.topics) return null;
    return state.data.topics.find(t => t.topic_id === state.activeTopicId) || state.data.topics[0];
  }

  // --- INITIALIZATION ---
  function init() {
    state.data = window.CAMBRIDGE_DATA || null;
    state.audioEl = document.getElementById('cam-audio-element');

    loadProgress();
    bindEvents();
    renderHub();
  }

  function onActivate() {
    if (!state.data) {
      state.data = window.CAMBRIDGE_DATA || null;
    }
    if (!state.audioEl) {
      state.audioEl = document.getElementById('cam-audio-element');
    }
    renderHub();
  }

  // --- VIEW SWITCHER ---
  function showView(viewName) {
    state.activeSubView = viewName;

    const hubStage = document.getElementById('cam-hub-stage');
    const testStage = document.getElementById('cam-test-stage');
    const reviewStage = document.getElementById('cam-review-stage');
    const topicsStage = document.getElementById('cam-topics-stage');
    const topicStudyStage = document.getElementById('cam-topic-study-stage');

    if (hubStage) hubStage.style.display = viewName === 'hub' ? 'block' : 'none';
    if (testStage) testStage.style.display = viewName === 'test' ? 'block' : 'none';
    if (reviewStage) reviewStage.style.display = viewName === 'review' ? 'block' : 'none';
    if (topicsStage) topicsStage.style.display = viewName === 'topics' ? 'block' : 'none';
    if (topicStudyStage) topicStudyStage.style.display = viewName === 'topic-study' ? 'block' : 'none';

    // Update active nav tab
    document.querySelectorAll('.cam-nav-tab').forEach(tab => {
      const tabTarget = tab.getAttribute('data-target-view');
      if (tabTarget === viewName || (viewName === 'topic-study' && tabTarget === 'topics')) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // =========================================================================
  // VIEW 1: CAMBRIDGE TEST HUB (BOOK & TEST SELECTION)
  // =========================================================================
  function renderHub() {
    showView('hub');
    renderHubStats();
    renderBookSelector();
    renderTestCardsGrid();
  }

  function renderHubStats() {
    const totalCompletedEl = document.getElementById('cam-stat-completed');
    const avgBandEl = document.getElementById('cam-stat-avg-band');
    const totalVocabSavedEl = document.getElementById('cam-stat-vocab-saved');

    const progressEntries = Object.values(state.progress);
    const completedCount = progressEntries.filter(p => p.completed).length;

    let totalBands = 0;
    progressEntries.forEach(p => {
      if (p.band) totalBands += p.band;
    });
    const avgBand = completedCount > 0 ? (totalBands / completedCount).toFixed(1) : '0.0';

    if (totalCompletedEl) totalCompletedEl.textContent = `${completedCount} bài`;
    if (avgBandEl) avgBandEl.textContent = completedCount > 0 ? `Band ${avgBand}` : '--';
    if (totalVocabSavedEl) totalVocabSavedEl.textContent = `${state.savedTopicWordIds.size} từ`;
  }

  function renderBookSelector() {
    const container = document.getElementById('cam-book-selector-chips');
    if (!container || !state.data || !state.data.books) return;

    let html = '';
    state.data.books.forEach(b => {
      const isSelected = b.id === state.currentBookId;
      // count tests completed in this book
      let testsInBook = 0;
      let completedInBook = 0;
      b.tests.forEach(t => {
        testsInBook += 2; // 1 Listening, 1 Reading
        if (state.progress[`${t.id}_listening`]?.completed) completedInBook++;
        if (state.progress[`${t.id}_reading`]?.completed) completedInBook++;
      });

      html += `
        <button type="button" class="cam-book-chip ${isSelected ? 'active' : ''}" 
                onclick="window.cambridgeModule.selectBook('${b.id}')">
          <span class="chip-title">${escapeHtml(b.title)}</span>
          <span class="chip-badge">${completedInBook}/${testsInBook} xong</span>
        </button>
      `;
    });

    container.innerHTML = html;
  }

  function selectBook(bookId) {
    state.currentBookId = bookId;
    const book = getCurrentBook();
    if (book && book.tests && book.tests[0]) {
      state.currentTestId = book.tests[0].id;
    }
    renderHub();
  }

  function renderTestCardsGrid() {
    const container = document.getElementById('cam-tests-grid');
    if (!container) return;

    const book = getCurrentBook();
    if (!book || !book.tests) {
      container.innerHTML = '<div class="cam-empty-msg">Chưa có dữ liệu bài test cho cuốn sách này.</div>';
      return;
    }

    let html = '';
    book.tests.forEach((test, idx) => {
      const lProgress = state.progress[`${test.id}_listening`];
      const rProgress = state.progress[`${test.id}_reading`];

      const lCompleted = lProgress && lProgress.completed;
      const rCompleted = rProgress && rProgress.completed;

      html += `
        <div class="cam-test-card ${lCompleted && rCompleted ? 'fully-completed' : ''}">
          <div class="test-card-header">
            <div class="test-card-title-box">
              <span class="test-book-tag">${escapeHtml(book.title)}</span>
              <h3 class="test-title">${escapeHtml(test.title)}</h3>
            </div>
            <div class="test-meta-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Trọn bộ 80 câu</span>
            </div>
          </div>

          <div class="test-card-skills-row">
            <!-- Listening Skill Box -->
            <div class="skill-action-box ${lCompleted ? 'is-completed' : ''}">
              <div class="skill-info">
                <div class="skill-title-row">
                  <span class="skill-icon">🎧</span>
                  <strong class="skill-name">IELTS Listening</strong>
                </div>
                <div class="skill-status-tag">
                  ${lCompleted 
                    ? `<span class="badge-done">✓ Đã làm: ${lProgress.score}/${lProgress.total} (Band ${lProgress.band})</span>`
                    : `<span class="badge-pending">Chưa làm • 4 Parts</span>`
                  }
                </div>
              </div>
              <div class="skill-buttons-group">
                <button type="button" class="btn-cam-action btn-start-listening" 
                        onclick="window.cambridgeModule.startListeningTest('${test.id}', 0)">
                  <span>${lCompleted ? 'Làm lại Listening' : 'Làm Listening'}</span>
                </button>
                ${lCompleted ? `
                  <button type="button" class="btn-cam-review" title="Xem lại bài làm và dẫn chứng âm thanh"
                          onclick="window.cambridgeModule.reviewTestResult('${test.id}', 'listening')">
                    Xem kết quả
                  </button>
                ` : ''}
              </div>
            </div>

            <!-- Reading Skill Box -->
            <div class="skill-action-box ${rCompleted ? 'is-completed' : ''}">
              <div class="skill-info">
                <div class="skill-title-row">
                  <span class="skill-icon">📖</span>
                  <strong class="skill-name">IELTS Reading</strong>
                </div>
                <div class="skill-status-tag">
                  ${rCompleted 
                    ? `<span class="badge-done">✓ Đã làm: ${rProgress.score}/${rProgress.total} (Band ${rProgress.band})</span>`
                    : `<span class="badge-pending">Chưa làm • 3 Passages</span>`
                  }
                </div>
              </div>
              <div class="skill-buttons-group">
                <button type="button" class="btn-cam-action btn-start-reading" 
                        onclick="window.cambridgeModule.startReadingTest('${test.id}', 0)">
                  <span>${rCompleted ? 'Làm lại Reading' : 'Làm Reading'}</span>
                </button>
                ${rCompleted ? `
                  <button type="button" class="btn-cam-review" title="Xem lại bài làm và vị trí dẫn chứng"
                          onclick="window.cambridgeModule.reviewTestResult('${test.id}', 'reading')">
                    Xem kết quả
                  </button>
                ` : ''}
              </div>
            </div>
          </div>

          <div class="test-card-footer">
            <button type="button" class="btn-card-vocab-link" 
                    onclick="window.cambridgeModule.openTopicsFromTest('${test.id}')">
              <span>🗂️ Học từ vựng học thuật B2-C2 liên quan</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // =========================================================================
  // VIEW 2: INTERACTIVE TEST TAKING STAGE (SCHEMA 3.1)
  // =========================================================================
  function renderLoadingStage(msg = 'Đang tải dữ liệu bài thi...') {
    const container = document.getElementById('cam-test-body-container');
    if (container) {
      container.innerHTML = `
        <div class="cam-loading-box">
          <div class="cam-spinner"></div>
          <p class="cam-loading-text">${escapeHtml(msg)}</p>
        </div>
      `;
    }
  }

  function renderErrorStage(err) {
    const container = document.getElementById('cam-test-body-container');
    if (container) {
      container.innerHTML = `
        <div class="cam-error-box">
          <span class="cam-error-icon">⚠️</span>
          <h3>Chưa có dữ liệu bài thi này</h3>
          <p class="cam-error-text">${escapeHtml(err.message || 'File dữ liệu bài thi đang được khởi tạo theo Schema 3.1.')}</p>
          <button type="button" class="btn-cam-action btn-start-reading" onclick="window.cambridgeModule.renderHub()">
            Quay lại Kho Đề Thi
          </button>
        </div>
      `;
    }
  }

  function startListeningTest(testId, partIndex = 0) {
    state.currentTestId = testId;
    state.currentSkill = 'listening';
    state.currentPartIndex = partIndex;
    state.userAnswers = {};
    
    showView('test');
    renderLoadingStage('Đang tải đề thi Listening...');
    loadTest(testId).then(() => {
      renderTestStage();
    }).catch(err => {
      renderErrorStage(err);
    });
  }

  function startReadingTest(testId, passageIndex = 0) {
    state.currentTestId = testId;
    state.currentSkill = 'reading';
    state.currentPartIndex = passageIndex;
    state.userAnswers = {};

    showView('test');
    renderLoadingStage('Đang tải đề thi Reading...');
    loadTest(testId).then(() => {
      renderTestStage();
    }).catch(err => {
      renderErrorStage(err);
    });
  }

  function renderTestStage() {
    const test = getCurrentTest();
    if (!test) return;

    const titleEl = document.getElementById('cam-test-title');
    const skillBadgeEl = document.getElementById('cam-test-skill-badge');
    const partSwitcherEl = document.getElementById('cam-test-part-switcher');
    const bodyContainer = document.getElementById('cam-test-body-container');
    const audioPlayerDock = document.getElementById('cam-listening-dock');

    if (titleEl) titleEl.textContent = `${test.title}`;
    if (skillBadgeEl) {
      skillBadgeEl.className = `cam-skill-pill pill-${state.currentSkill}`;
      skillBadgeEl.textContent = state.currentSkill === 'listening' ? '🎧 Listening Test' : '📖 Reading Test';
    }

    // Render Part / Passage Tabs
    if (partSwitcherEl) {
      let tabsHtml = '';
      if (state.currentSkill === 'listening') {
        const parts = test.listening?.parts || [];
        parts.forEach((p, idx) => {
          const pNum = p.n || p.part || (idx + 1);
          const startQ = (pNum - 1) * 10 + 1;
          const endQ = pNum * 10;
          tabsHtml += `
            <button type="button" class="cam-part-tab-btn ${idx === state.currentPartIndex ? 'active' : ''}"
                    onclick="window.cambridgeModule.switchTestPart(${idx})">
              Part ${pNum} (${startQ}-${endQ})
            </button>
          `;
        });
      } else {
        const passages = test.reading?.passages || [];
        passages.forEach((p, idx) => {
          const pNum = p.n || p.passage || (idx + 1);
          tabsHtml += `
            <button type="button" class="cam-part-tab-btn ${idx === state.currentPartIndex ? 'active' : ''}"
                    onclick="window.cambridgeModule.switchTestPart(${idx})">
              Passage ${pNum}
            </button>
          `;
        });
      }
      partSwitcherEl.innerHTML = tabsHtml;
    }

    // Audio Player Bar setup
    if (state.currentSkill === 'listening') {
      if (audioPlayerDock) audioPlayerDock.style.display = 'block';
      const part = getCurrentListeningPart();
      if (part && state.audioEl) {
        const audioSrc = part.audio?.src || part.audio_src || '';
        state.audioEl.src = resolveAudioUrl(audioSrc);
        state.audioEl.playbackRate = state.playbackRate;
        state.audioEl.load();
        updateAudioPlayButton(false);
      }
    } else {
      if (audioPlayerDock) audioPlayerDock.style.display = 'none';
      if (state.audioEl && !state.audioEl.paused) {
        state.audioEl.pause();
      }
    }

    // Render Questions & Content Body
    if (bodyContainer) {
      if (state.currentSkill === 'listening') {
        renderListeningTestBody(bodyContainer);
      } else {
        renderReadingTestBody(bodyContainer);
      }
    }
  }

  function switchTestPart(newIndex) {
    state.currentPartIndex = newIndex;
    renderTestStage();
  }

  // --- QUESTION & GROUP RENDERING HELPERS (SCHEMA 3.1) ---
  function renderSingleQuestion(q, group) {
    const qKey = `q_${q.q}`;
    const savedVal = state.userAnswers[qKey] || '';
    const qType = q.type || group?.type || 'fill';
    const stem = q.stem || q.question || q.label || '';

    let inputHtml = '';

    if (qType === 'tfng') {
      const options = ['TRUE', 'FALSE', 'NOT GIVEN'];
      inputHtml = `
        <div class="tfng-pills-group" id="pill-group-${q.q}">
          ${options.map(opt => `
            <button type="button" 
                    class="tfng-pill-btn ${savedVal.toUpperCase() === opt ? 'selected' : ''}"
                    onclick="window.cambridgeModule.onAnswerChange('q_${q.q}', '${opt}'); window.cambridgeModule.updatePillUI('pill-group-${q.q}', this);">
              ${opt}
            </button>
          `).join('')}
        </div>
      `;
    } else if (qType === 'ynng') {
      const options = ['YES', 'NO', 'NOT GIVEN'];
      inputHtml = `
        <div class="tfng-pills-group" id="pill-group-${q.q}">
          ${options.map(opt => `
            <button type="button" 
                    class="tfng-pill-btn ${savedVal.toUpperCase() === opt ? 'selected' : ''}"
                    onclick="window.cambridgeModule.onAnswerChange('q_${q.q}', '${opt}'); window.cambridgeModule.updatePillUI('pill-group-${q.q}', this);">
              ${opt}
            </button>
          `).join('')}
        </div>
      `;
    } else if (qType === 'mcq') {
      const options = q.options || group?.options || [];
      if (options.length > 0) {
        inputHtml = `<div class="mcq-options-group">`;
        options.forEach((opt, oIdx) => {
          const optLetter = opt.length >= 2 && opt.charAt(1) === '.' ? opt.charAt(0).toUpperCase() : String.fromCharCode(65 + oIdx);
          const optText = opt.length >= 2 && opt.charAt(1) === '.' ? opt.substring(2).trim() : opt;
          const isChecked = savedVal.toUpperCase() === optLetter;
          inputHtml += `
            <label class="mcq-option-label ${isChecked ? 'selected' : ''}">
              <input type="radio" name="ans_q_${q.q}" value="${optLetter}" 
                     ${isChecked ? 'checked' : ''} 
                     onchange="window.cambridgeModule.onAnswerChange('q_${q.q}', '${optLetter}')">
              <span class="opt-letter">${optLetter}</span>
              <span class="opt-text">${escapeHtml(optText)}</span>
            </label>
          `;
        });
        inputHtml += `</div>`;
      } else {
        inputHtml = `
          <div class="fill-input-wrapper">
            <input type="text" class="cam-answer-input" 
                   id="input-q-${q.q}"
                   placeholder="Nhập chữ cái lựa chọn (A, B, C...)" 
                   value="${escapeHtml(savedVal)}"
                   autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false"
                   oninput="window.cambridgeModule.onAnswerChange('q_${q.q}', this.value)">
          </div>
        `;
      }
    } else if (qType === 'mcq_multi') {
      const options = q.options || group?.options || [];
      const selectedVals = (savedVal ? savedVal.split(/[,;\s]+/) : []).map(x => x.trim().toUpperCase());
      inputHtml = `<div class="mcq-options-group mcq-multi-group">`;
      options.forEach((opt, oIdx) => {
        const optLetter = opt.length >= 2 && opt.charAt(1) === '.' ? opt.charAt(0).toUpperCase() : String.fromCharCode(65 + oIdx);
        const optText = opt.length >= 2 && opt.charAt(1) === '.' ? opt.substring(2).trim() : opt;
        const isChecked = selectedVals.includes(optLetter);
        inputHtml += `
          <label class="mcq-option-label ${isChecked ? 'selected' : ''}">
            <input type="checkbox" name="ans_q_${q.q}" value="${optLetter}" 
                   ${isChecked ? 'checked' : ''} 
                   onchange="window.cambridgeModule.onMultiAnswerChange('q_${q.q}', this)">
            <span class="opt-letter">${optLetter}</span>
            <span class="opt-text">${escapeHtml(optText)}</span>
          </label>
        `;
      });
      inputHtml += `</div>`;
    } else if (qType === 'match' && group?.options && group.options.length > 0) {
      inputHtml = `
        <div class="match-select-wrapper">
          <select class="cam-select-input" onchange="window.cambridgeModule.onAnswerChange('q_${q.q}', this.value)">
            <option value="">-- Chọn đáp án phù hợp --</option>
            ${group.options.map((opt, oIdx) => {
              const optVal = opt.length >= 2 && opt.charAt(1) === '.' ? opt.charAt(0).toUpperCase() : String.fromCharCode(65 + oIdx);
              return `<option value="${optVal}" ${savedVal.toUpperCase() === optVal ? 'selected' : ''}>${escapeHtml(opt)}</option>`;
            }).join('')}
          </select>
        </div>
      `;
    } else {
      inputHtml = `
        <div class="fill-input-wrapper">
          <input type="text" class="cam-answer-input" 
                 id="input-q-${q.q}"
                 placeholder="Nhập đáp án của bạn..." 
                 value="${escapeHtml(savedVal)}"
                 autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
                 oninput="window.cambridgeModule.onAnswerChange('q_${q.q}', this.value)">
        </div>
      `;
    }

    return `
      <div class="cam-question-item" id="q-card-${q.q}">
        <div class="q-item-num-col">
          <span class="q-number-circle">${q.q}</span>
        </div>
        <div class="q-item-content-col">
          <div class="q-prompt-label">${escapeHtml(stem)}</div>
          ${inputHtml}
        </div>
      </div>
    `;
  }

  function renderQuestionGroup(group) {
    const rangeText = group.range ? `Câu ${group.range[0]} - ${group.range[1]}` : '';
    let html = `
      <div class="cam-question-group-card">
        <div class="group-header">
          ${rangeText ? `<span class="group-range-badge">${escapeHtml(rangeText)}</span>` : ''}
          ${group.instruction ? `<div class="group-instruction-text">${escapeHtml(group.instruction)}</div>` : ''}
        </div>
    `;

    if (group.image) {
      html += `
        <div class="group-image-wrap">
          <img src="${escapeHtml(group.image)}" alt="Test illustration" class="cam-group-img">
        </div>
      `;
    }

    if (group.options && group.options.length > 0 && group.type !== 'mcq' && group.type !== 'mcq_multi') {
      html += `
        <div class="group-options-box">
          <div class="group-options-title">Danh sách lựa chọn đối chiếu:</div>
          <div class="group-options-grid">
            ${group.options.map(opt => `<span class="group-opt-pill">${escapeHtml(opt)}</span>`).join('')}
          </div>
        </div>
      `;
    }

    html += `<div class="group-questions-list">`;
    (group.questions || []).forEach(q => {
      html += renderSingleQuestion(q, group);
    });
    html += `</div></div>`;

    return html;
  }

  function renderListeningTestBody(container) {
    const part = getCurrentListeningPart();
    if (!part) {
      container.innerHTML = '<div class="cam-empty-msg">Không tìm thấy dữ liệu part.</div>';
      return;
    }

    const pNum = part.n || part.part || (state.currentPartIndex + 1);
    const startQ = (pNum - 1) * 10 + 1;
    const endQ = pNum * 10;

    let html = `
      <div class="listening-test-arena">
        <div class="part-header-card">
          <div class="part-meta-row">
            <span class="part-number-tag">Part ${pNum}</span>
            <span class="part-range-tag">Câu ${startQ} đến ${endQ}</span>
          </div>
          <h2 class="part-title-text">${escapeHtml(part.title || `Part ${pNum}`)}</h2>
          <p class="part-desc-text">${escapeHtml(part.description || '🎧 Lắng nghe đoạn băng audio và điền câu trả lời bên dưới. Toàn bộ transcript dẫn chứng sẽ được mở sau khi nộp bài.')}</p>
        </div>

        <div class="questions-stream-box">
    `;

    if (part.groups && part.groups.length > 0) {
      part.groups.forEach(group => {
        html += renderQuestionGroup(group);
      });
    } else if (part.questions && part.questions.length > 0) {
      part.questions.forEach(q => {
        html += renderSingleQuestion(q, null);
      });
    }

    html += `
        </div>

        <!-- Submit Bar -->
        <div class="cam-test-submit-bar">
          <button type="button" class="btn-subtle" onclick="window.cambridgeModule.saveDraft()">
            💾 Lưu bản nháp
          </button>
          <button type="button" class="btn-cam-submit-test" onclick="window.cambridgeModule.submitCurrentTest()">
            <span>Nộp bài & Chấm điểm trọn bộ</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  function renderReadingTestBody(container) {
    const passage = getCurrentReadingPassage();
    if (!passage) {
      container.innerHTML = '<div class="cam-empty-msg">Không tìm thấy dữ liệu passage.</div>';
      return;
    }

    const pNum = passage.n || passage.passage || (state.currentPartIndex + 1);

    // Extract paragraphs
    let paragraphs = [];
    if (passage.paragraphs && Array.isArray(passage.paragraphs)) {
      paragraphs = passage.paragraphs;
    } else if (passage.text) {
      const rawParas = passage.text.split('\n\n').filter(p => p.trim());
      paragraphs = rawParas.map((pt, idx) => ({ id: `P${idx + 1}`, text: pt }));
    }

    let totalQ = 0;
    if (passage.groups) {
      passage.groups.forEach(g => totalQ += (g.questions ? g.questions.length : 0));
    } else if (passage.questions) {
      totalQ = passage.questions.length;
    }

    let html = `
      <div class="reading-split-workspace">
        <!-- MOBILE VIEW SWITCHER TABS -->
        <div class="reading-mobile-view-tabs">
          <button type="button" class="btn-read-tab active" id="btn-read-tab-passage" onclick="window.cambridgeModule.switchReadingMobileTab('passage')">
            📖 Bài đọc (Passage ${pNum})
          </button>
          <button type="button" class="btn-read-tab" id="btn-read-tab-questions" onclick="window.cambridgeModule.switchReadingMobileTab('questions')">
            ✏️ Câu hỏi (${totalQ} câu)
          </button>
        </div>

        <!-- LEFT COLUMN: READING PASSAGE TEXT -->
        <div class="reading-passage-column" id="reading-passage-column">
          <div class="passage-paper-card">
            <div class="passage-paper-header">
              <span class="passage-tag">Passage ${pNum}</span>
              <h2 class="passage-paper-title">${escapeHtml(passage.title)}</h2>
              <div class="passage-read-tools">
                <span class="text-hint">💡 Đọc kỹ văn bản để tìm từ khóa đối chiếu câu hỏi</span>
              </div>
            </div>

            <div class="passage-text-content" id="passage-text-viewport">
    `;

    paragraphs.forEach((p) => {
      const pId = p.id || 'P';
      html += `
        <div class="passage-p" id="para-${pNum}-${pId}">
          <span class="para-id-badge">${escapeHtml(pId)}</span>
          <span class="para-text-body">${escapeHtml(p.text)}</span>
        </div>
      `;
    });

    html += `
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: INTERACTIVE QUESTIONS -->
        <div class="reading-questions-column" id="reading-questions-column">
          <div class="reading-questions-card">
            <div class="questions-card-header">
              <h3>Bảng Trả Lời Câu Hỏi (Passage ${pNum})</h3>
              <span class="q-count-badge">${totalQ} câu</span>
            </div>

            <div class="questions-stream-box">
    `;

    if (passage.groups && passage.groups.length > 0) {
      passage.groups.forEach(group => {
        html += renderQuestionGroup(group);
      });
    } else if (passage.questions && passage.questions.length > 0) {
      passage.questions.forEach(q => {
        html += renderSingleQuestion(q, null);
      });
    }

    html += `
            </div>

            <!-- Submit Bar -->
            <div class="cam-test-submit-bar">
              <button type="button" class="btn-subtle" onclick="window.cambridgeModule.saveDraft()">
                💾 Lưu bản nháp
              </button>
              <button type="button" class="btn-cam-submit-test" onclick="window.cambridgeModule.submitCurrentTest()">
                <span>Nộp bài & Chấm điểm trọn bộ</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  function switchReadingMobileTab(tab) {
    const colPassage = document.getElementById('reading-passage-column');
    const colQuestions = document.getElementById('reading-questions-column');
    const btnPassage = document.getElementById('btn-read-tab-passage');
    const btnQuestions = document.getElementById('btn-read-tab-questions');

    if (tab === 'passage') {
      if (colPassage) colPassage.classList.add('mobile-active');
      if (colQuestions) colQuestions.classList.remove('mobile-active');
      if (btnPassage) btnPassage.classList.add('active');
      if (btnQuestions) btnQuestions.classList.remove('active');
    } else {
      if (colPassage) colPassage.classList.remove('mobile-active');
      if (colQuestions) colQuestions.classList.add('mobile-active');
      if (btnPassage) btnPassage.classList.remove('active');
      if (btnQuestions) btnQuestions.classList.add('active');
    }
  }

  function onAnswerChange(qKey, val) {
    state.userAnswers[qKey] = (val || '').trim();
  }

  function onMultiAnswerChange(qKey, inputEl) {
    const groupCard = inputEl.closest('.cam-question-item') || inputEl.closest('.mcq-multi-group');
    if (!groupCard) return;
    const checked = Array.from(groupCard.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value.toUpperCase());
    state.userAnswers[qKey] = checked.sort().join(', ');
  }

  function updatePillUI(groupId, clickedBtn) {
    const grp = document.getElementById(groupId);
    if (!grp) return;
    grp.querySelectorAll('.tfng-pill-btn').forEach(btn => btn.classList.remove('selected'));
    clickedBtn.classList.add('selected');
  }

  function saveDraft() {
    if (window.showToast) {
      window.showToast('💾 Đã lưu nháp các câu trả lời của bạn!');
    }
  }

  // =========================================================================
  // SUBMISSION & AUTOMATIC GRADING WITH BAND CONVERTER
  // =========================================================================
  function normalizeAnswer(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function checkAnswer(userAns, acceptedList) {
    if (!userAns) return false;
    const uNorm = normalizeAnswer(userAns);
    if (!uNorm) return false;

    const list = Array.isArray(acceptedList) ? acceptedList : [acceptedList];
    return list.some(acc => {
      if (!acc) return false;
      const aNorm = normalizeAnswer(acc);
      if (uNorm === aNorm) return true;

      // Handle slash alternatives e.g. "beach / beaches" or "dentist / dentist's"
      if (acc.includes('/')) {
        const parts = acc.split('/').map(p => normalizeAnswer(p));
        if (parts.includes(uNorm)) return true;
      }

      // Handle optional parenthesis e.g. "(the) newspaper"
      const withoutParen = acc.replace(/\([^)]*\)/g, '').trim();
      if (withoutParen && normalizeAnswer(withoutParen) === uNorm) return true;
      const withParenContent = acc.replace(/[()]/g, '').trim();
      if (withParenContent && normalizeAnswer(withParenContent) === uNorm) return true;

      return false;
    });
  }

  function submitCurrentTest() {
    const test = getCurrentTest();
    if (!test) return;

    let allQuestions = [];
    if (state.currentSkill === 'listening') {
      const parts = test.listening?.parts || [];
      parts.forEach((p, pIdx) => {
        const pNum = p.n || p.part || (pIdx + 1);
        if (p.groups && p.groups.length > 0) {
          p.groups.forEach(g => {
            (g.questions || []).forEach(q => {
              allQuestions.push({ ...q, partN: pNum, partIndex: pIdx });
            });
          });
        } else if (p.questions) {
          p.questions.forEach(q => {
            allQuestions.push({ ...q, partN: pNum, partIndex: pIdx });
          });
        }
      });
    } else {
      const passages = test.reading?.passages || [];
      passages.forEach((p, pIdx) => {
        const pNum = p.n || p.passage || (pIdx + 1);
        if (p.groups && p.groups.length > 0) {
          p.groups.forEach(g => {
            (g.questions || []).forEach(q => {
              allQuestions.push({ ...q, passageN: pNum, passageIndex: pIdx });
            });
          });
        } else if (p.questions) {
          p.questions.forEach(q => {
            allQuestions.push({ ...q, passageN: pNum, passageIndex: pIdx });
          });
        }
      });
    }

    let correctCount = 0;
    const detailedResults = [];

    allQuestions.forEach(q => {
      const userVal = state.userAnswers[`q_${q.q}`] || '';
      const isCorrect = checkAnswer(userVal, q.answer);
      if (isCorrect) correctCount++;

      detailedResults.push({
        q: q.q,
        type: q.type || 'fill',
        stem: q.stem || q.question || q.label || '',
        userAnswer: userVal,
        correctAnswers: Array.isArray(q.answer) ? q.answer : [q.answer],
        isCorrect: isCorrect,
        evidence: q.evidence || { quote: q.clue_quote || '', para: q.clue_paragraph || 'P1', start: q.clue_time?.start || 0, end: q.clue_time?.end || 0 },
        keywords: q.keywords || [],
        trap: q.trap || '',
        explain: q.explain || q.explanation || '',
        passageN: q.passageN || 1,
        partN: q.partN || 1,
        partIndex: q.partIndex !== undefined ? q.partIndex : 0
      });
    });

    const totalQuestions = allQuestions.length || 40;
    const bandScore = calculateBand(correctCount, totalQuestions, state.currentSkill);
    const now = new Date();
    const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

    // Record progress
    const progressKey = `${test.id}_${state.currentSkill}`;
    state.progress[progressKey] = {
      completed: true,
      score: correctCount,
      total: totalQuestions,
      band: bandScore,
      date: dateStr,
      timestamp: Date.now()
    };
    saveProgress();

    state.lastSubmission = {
      testId: test.id,
      testTitle: test.title,
      skill: state.currentSkill,
      score: correctCount,
      total: totalQuestions,
      band: bandScore,
      date: dateStr,
      details: detailedResults
    };

    renderReviewView();
  }

  // =========================================================================
  // VIEW 3: GRADING REVIEW & DETAILED EVIDENCE / TRAP EXPLANATIONS
  // =========================================================================
  function renderReviewView() {
    const sub = state.lastSubmission;
    if (!sub) return;

    showView('review');
    const container = document.getElementById('cam-review-container');
    if (!container) return;

    const percentage = Math.round((sub.score / Math.max(1, sub.total)) * 100);
    const isHigh = sub.band >= 7.0;

    let html = `
      <div class="review-page-card">
        <!-- SCORE HERO BANNER -->
        <div class="review-score-hero ${isHigh ? 'hero-high-score' : 'hero-normal-score'}">
          <div class="hero-band-circle">
            <span class="band-label">IELTS BAND</span>
            <span class="band-number">${sub.band.toFixed(1)}</span>
          </div>

          <div class="hero-score-info">
            <div class="hero-badge-pill">${sub.skill.toUpperCase()} REVIEW</div>
            <h2 class="hero-test-name">${escapeHtml(sub.testTitle)}</h2>
            <div class="hero-score-stat">
              Đúng <strong>${sub.score}/${sub.total} câu</strong> (${percentage}%) • Hoàn thành ngày ${sub.date}
            </div>
            <p class="hero-feedback-comment">
              ${sub.band >= 8.0 
                ? '🎉 Xuất sắc! Điểm số đạt mức thành thạo cao cấp Band 8.0+ IELTS học thuật.'
                : sub.band >= 6.5
                ? '👍 Rất tốt! Bạn đạt mức điểm vững chắc Band 6.5 - 7.5. Xem lại các câu sai để bứt phá lên 8.0+!'
                : '💪 Hãy kiên trì! Lắng nghe lại các đoạn audio dẫn chứng và phân tích bẫy từ vựng dưới đây.'}
            </p>
          </div>

          <div class="hero-action-buttons">
            <button type="button" class="btn-hero-primary" onclick="window.cambridgeModule.renderHub()">
              🏛️ Về kho đề thi
            </button>
            <button type="button" class="btn-hero-secondary" onclick="window.cambridgeModule.restartCurrentTest()">
              🔄 Làm lại bài này
            </button>
          </div>
        </div>

        <!-- REVIEW QUESTIONS LIST WITH CLUE AUDIO REPLAY -->
        <div class="review-questions-section">
          <div class="review-section-header">
            <h3>Chi Tiết Từng Câu Hỏi & Hướng Dẫn Dẫn Chứng</h3>
            <div class="review-filter-pills">
              <button type="button" class="rev-filter-btn active" data-filter="all" onclick="window.cambridgeModule.filterReviewCards('all')">
                Tất cả (${sub.total})
              </button>
              <button type="button" class="rev-filter-btn" data-filter="correct" onclick="window.cambridgeModule.filterReviewCards('correct')">
                ✅ Đúng (${sub.score})
              </button>
              <button type="button" class="rev-filter-btn" data-filter="wrong" onclick="window.cambridgeModule.filterReviewCards('wrong')">
                ❌ Sai (${sub.total - sub.score})
              </button>
            </div>
          </div>

          <div class="review-cards-stream" id="review-cards-stream">
    `;

    sub.details.forEach(item => {
      const isCorrect = item.isCorrect;
      const statusClass = isCorrect ? 'card-status-correct' : 'card-status-wrong';
      const ev = item.evidence || {};

      html += `
        <div class="review-item-card ${statusClass}" data-result="${isCorrect ? 'correct' : 'wrong'}">
          <div class="review-card-top">
            <div class="q-badge-row">
              <span class="review-q-num">Câu ${item.q}</span>
              <span class="review-status-pill ${isCorrect ? 'pill-correct' : 'pill-wrong'}">
                ${isCorrect ? '✅ ĐÚNG' : '❌ SAI'}
              </span>
            </div>

            <div class="review-card-top-actions">
              ${sub.skill === 'listening' && (ev.start !== undefined || ev.clueTime) ? `
                <button type="button" class="btn-replay-clue" 
                        id="btn-clue-${item.q}"
                        onclick="window.cambridgeModule.replayClueAudio(${ev.start || 0}, ${ev.end || 0}, ${item.q})">
                  <span class="btn-icon">▶</span>
                  <span>Nghe đoạn dẫn chứng (${formatTime(ev.start || 0)} - ${formatTime(ev.end || 0)})</span>
                </button>
                <button type="button" class="btn-goto-listening3tab" title="Mở phòng luyện nghe chuyên sâu 3 tab cho Part này"
                        onclick="window.openListening3Tab('${sub.testId}', ${item.partIndex})">
                  🎧 Luyện nghe part này
                </button>
              ` : ''}

              ${sub.skill === 'reading' ? `
                <button type="button" class="btn-scroll-evidence" 
                        onclick="window.cambridgeModule.jumpToReadingEvidence(${item.passageN}, '${ev.para || 'P1'}', ${item.q})">
                  📍 Xem trong bài (Đoạn [${ev.para || 'P1'}])
                </button>
              ` : ''}
            </div>
          </div>

          <div class="review-prompt-text">${escapeHtml(item.stem)}</div>

          <div class="review-answers-comparison">
            <div class="ans-box user-ans-box ${isCorrect ? 'box-correct' : 'box-wrong'}">
              <span class="ans-label">Câu trả lời của bạn:</span>
              <strong class="ans-val">${escapeHtml(item.userAnswer || '(Chưa điền đáp án)')}</strong>
            </div>

            <div class="ans-box correct-ans-box">
              <span class="ans-label">Đáp án chính xác:</span>
              <strong class="ans-val">${escapeHtml(item.correctAnswers.join(' / '))}</strong>
            </div>
          </div>

          <!-- CLUE QUOTE, KEYWORDS PARAPHRASE & TRAP EXPLANATION -->
          <div class="review-explanation-card">
            ${ev.quote ? `
              <div class="clue-quote-box">
                <span class="clue-tag">📌 Dẫn chứng trong bài (${sub.skill === 'reading' ? `Đoạn [${ev.para || 'P'}]` : `Part ${item.partN}`}):</span>
                <blockquote class="clue-quote-text">"${escapeHtml(ev.quote)}"</blockquote>
              </div>
            ` : ''}

            ${item.keywords && item.keywords.length > 0 ? `
              <div class="keywords-paraphrase-strip">
                <span class="kw-strip-title">🔑 Đối chiếu từ khóa (Paraphrase):</span>
                <div class="kw-pairs-list">
                  ${item.keywords.map((kw, kIdx) => `
                    <span class="kw-pair-badge kw-color-${kIdx % 4}">
                      <span class="kw-q-stem">${escapeHtml(kw.q)}</span>
                      <span class="kw-arrow">⇄</span>
                      <span class="kw-p-passage">${escapeHtml(kw.p)}</span>
                    </span>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            ${item.trap && item.trap.trim() ? `
              <div class="trap-warning-card">
                <div class="trap-header-row">
                  <span class="trap-icon">⚠️</span>
                  <strong class="trap-title">Bẫy & Lưu ý câu này:</strong>
                </div>
                <p class="trap-body-text">${escapeHtml(item.trap)}</p>
              </div>
            ` : ''}

            ${item.explain ? `
              <div class="explanation-box">
                <span class="exp-tag">💡 Hướng dẫn & Giải thích chi tiết:</span>
                <p class="exp-text">${escapeHtml(item.explain)}</p>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    });

    html += `
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  function filterReviewCards(type) {
    document.querySelectorAll('.rev-filter-btn').forEach(btn => {
      if (btn.getAttribute('data-filter') === type) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    document.querySelectorAll('.review-item-card').forEach(card => {
      const res = card.getAttribute('data-result');
      if (type === 'all' || res === type) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function replayClueAudio(startTime, endTime, qNum) {
    if (!state.audioEl) return;

    state.activeClueTime = { start: startTime, end: endTime, qNum: qNum };
    state.audioEl.currentTime = Math.max(0, startTime - 0.5);
    state.audioEl.play().catch(e => console.warn('Audio play blocked:', e));

    if (window.showToast) {
      window.showToast(`🎧 Đang phát lại đoạn dẫn chứng câu ${qNum} (${formatTime(startTime)} - ${formatTime(endTime)})`);
    }

    // Highlight button
    document.querySelectorAll('.btn-replay-clue').forEach(b => b.classList.remove('clue-playing'));
    const btn = document.getElementById(`btn-clue-${qNum}`);
    if (btn) btn.classList.add('clue-playing');

    // Auto-stop at endTime
    const checkInterval = setInterval(() => {
      if (state.audioEl && state.audioEl.currentTime >= endTime) {
        state.audioEl.pause();
        clearInterval(checkInterval);
        if (btn) btn.classList.remove('clue-playing');
      }
    }, 200);
  }

  function jumpToReadingEvidence(passageN, paraId, qNum) {
    // Switch to test stage and to that passage
    state.currentSkill = 'reading';
    state.currentPartIndex = Math.max(0, passageN - 1);
    showView('test');
    renderTestStage();

    // Find target paragraph in DOM
    setTimeout(() => {
      const paraEl = document.getElementById(`para-${passageN}-${paraId}`) || document.getElementById(`p-para-${paraId}`);
      if (paraEl) {
        paraEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        paraEl.classList.add('para-evidence-highlight');
        setTimeout(() => {
          paraEl.classList.remove('para-evidence-highlight');
        }, 4000);

        if (window.showToast) {
          window.showToast(`📍 Dẫn chứng câu ${qNum} tại Đoạn [${paraId}]`);
        }
      }
    }, 300);
  }

  function reviewTestResult(testId, skill) {
    state.currentTestId = testId;
    state.currentSkill = skill;
    state.currentPartIndex = 0;

    loadTest(testId).then(test => {
      let allQuestions = [];
      if (skill === 'listening') {
        const parts = test.listening?.parts || [];
        parts.forEach((p, pIdx) => {
          const pNum = p.n || p.part || (pIdx + 1);
          if (p.groups && p.groups.length > 0) {
            p.groups.forEach(g => {
              (g.questions || []).forEach(q => {
                allQuestions.push({ ...q, partN: pNum, partIndex: pIdx });
              });
            });
          } else if (p.questions) {
            p.questions.forEach(q => {
              allQuestions.push({ ...q, partN: pNum, partIndex: pIdx });
            });
          }
        });
      } else {
        const passages = test.reading?.passages || [];
        passages.forEach((p, pIdx) => {
          const pNum = p.n || p.passage || (pIdx + 1);
          if (p.groups && p.groups.length > 0) {
            p.groups.forEach(g => {
              (g.questions || []).forEach(q => {
                allQuestions.push({ ...q, passageN: pNum, passageIndex: pIdx });
              });
            });
          } else if (p.questions) {
            p.questions.forEach(q => {
              allQuestions.push({ ...q, passageN: pNum, passageIndex: pIdx });
            });
          }
        });
      }

      const prog = state.progress[`${testId}_${skill}`] || { score: allQuestions.length, total: allQuestions.length, band: 8.5, date: '26/10/2026' };

      state.lastSubmission = {
        testId: test.id,
        testTitle: test.title,
        skill: skill,
        score: prog.score,
        total: prog.total,
        band: prog.band,
        date: prog.date,
        details: allQuestions.map(q => ({
          q: q.q,
          type: q.type || 'fill',
          stem: q.stem || q.question || q.label || '',
          userAnswer: Array.isArray(q.answer) ? q.answer[0] : q.answer,
          correctAnswers: Array.isArray(q.answer) ? q.answer : [q.answer],
          isCorrect: true,
          evidence: q.evidence || { quote: q.clue_quote || '', para: q.clue_paragraph || 'P1', start: q.clue_time?.start || 0, end: q.clue_time?.end || 0 },
          keywords: q.keywords || [],
          trap: q.trap || '',
          explain: q.explain || q.explanation || '',
          passageN: q.passageN || 1,
          partN: q.partN || 1,
          partIndex: q.partIndex !== undefined ? q.partIndex : 0
        }))
      };

      renderReviewView();
    }).catch(err => {
      if (window.showToast) {
        window.showToast(`Chưa có dữ liệu bài thi ${testId}`);
      }
    });
  }

  function restartCurrentTest() {
    state.userAnswers = {};
    if (state.currentSkill === 'listening') {
      startListeningTest(state.currentTestId, state.currentPartIndex);
    } else {
      startReadingTest(state.currentTestId, state.currentPartIndex);
    }
  }

  // =========================================================================
  // VIEW 4: TOPIC-BASED VOCABULARY & FLASHCARDS (B2 -> C2)
  // =========================================================================
  function renderTopicsView() {
    showView('topics');
    const container = document.getElementById('cam-topics-grid');
    if (!container || !state.data || !state.data.topics) return;

    let html = '';
    state.data.topics.forEach(topic => {
      const wordCount = topic.words ? topic.words.length : 0;
      const b2Count = topic.words ? topic.words.filter(w => w.level === 'B2').length : 0;
      const c1Count = topic.words ? topic.words.filter(w => w.level === 'C1').length : 0;
      const c2Count = topic.words ? topic.words.filter(w => w.level === 'C2').length : 0;

      // Check how many saved
      let savedInTopic = 0;
      if (topic.words) {
        topic.words.forEach(w => {
          if (state.savedTopicWordIds.has(w.id)) savedInTopic++;
        });
      }

      html += `
        <div class="cam-topic-card">
          <div class="topic-card-top">
            <span class="topic-icon-giant">${topic.icon || '📚'}</span>
            <div class="topic-meta-badges">
              <span class="topic-cefr-pill pill-b2">${b2Count} B2</span>
              <span class="topic-cefr-pill pill-c1">${c1Count} C1</span>
              ${c2Count > 0 ? `<span class="topic-cefr-pill pill-c2">${c2Count} C2</span>` : ''}
            </div>
          </div>

          <div class="topic-card-body">
            <h3 class="topic-title-en">${escapeHtml(topic.title)}</h3>
            <h4 class="topic-title-vi">${escapeHtml(topic.titleVi)}</h4>
            <p class="topic-desc-text">${escapeHtml(topic.description)}</p>
          </div>

          <div class="topic-progress-row">
            <span class="topic-saved-badge">${savedInTopic}/${wordCount} từ đã lưu</span>
            <span class="topic-leitner-tag">Chu kỳ 1-4-7-14</span>
          </div>

          <div class="topic-card-actions">
            <button type="button" class="btn-topic-study" onclick="window.cambridgeModule.startTopicStudy('${topic.topic_id}')">
              <span>Học Flashcards cuốn chiếu</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>

            <button type="button" class="btn-topic-save-bulk" title="Lưu toàn bộ từ chủ đề này vào Flashcards cá nhân"
                    onclick="window.cambridgeModule.saveAllTopicWordsToFlashcards('${topic.topic_id}')">
              ⭐ Thêm cả chủ đề (${wordCount} từ)
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function openTopicsFromTest(testId) {
    renderTopicsView();
  }

  function startTopicStudy(topicId) {
    const mappedTopic = topicId === 'business' ? 'economy' : topicId;
    if (typeof window.selectCategory === 'function') {
      window.selectCategory('words');
    }
    if (typeof window.filterTopic === 'function') {
      window.filterTopic(mappedTopic);
    }
    if (typeof window.showToast === 'function') {
      window.showToast(`Đã chuyển tới Flashcards chủ đề: ${mappedTopic}`);
    }
  }

  function renderTopicStudyStage() {
    const topic = getCurrentTopic();
    if (!topic || !topic.words || topic.words.length === 0) return;

    const topicHeaderTitle = document.getElementById('topic-study-header-title');
    const topicHeaderSub = document.getElementById('topic-study-header-sub');
    const stageContainer = document.getElementById('topic-flashcard-stage');

    if (topicHeaderTitle) topicHeaderTitle.textContent = `${topic.icon} ${topic.titleVi}`;
    if (topicHeaderSub) topicHeaderSub.textContent = `${topic.title} • Chu kỳ lặp lại ngắt quãng (Spaced Repetition)`;

    const words = getFilteredTopicWords();
    const total = words.length;

    if (total === 0) {
      if (stageContainer) {
        stageContainer.innerHTML = `
          <div class="cam-empty-msg">
            Chưa có từ vựng nào trong chu kỳ này. Hãy chọn "Tất cả" để ôn luyện tiếp!
          </div>
        `;
      }
      return;
    }

    if (state.topicCurrentIndex >= total) state.topicCurrentIndex = total - 1;
    const word = words[state.topicCurrentIndex];
    const isSaved = state.savedTopicWordIds.has(word.id);

    let html = `
      <div class="topic-flashcard-wrapper">
        <!-- TOP CONTROLS & LEITNER INTERVAL CHIPS -->
        <div class="topic-study-topbar">
          <div class="leitner-filter-group">
            <span class="leitner-label">Chu kỳ cuốn chiếu:</span>
            <button type="button" class="leitner-pill ${state.topicIntervalFilter === 'all' ? 'active' : ''}" 
                    onclick="window.cambridgeModule.filterTopicInterval('all')">Tất cả (${topic.words.length})</button>
            <button type="button" class="leitner-pill ${state.topicIntervalFilter === '1' ? 'active' : ''}" 
                    onclick="window.cambridgeModule.filterTopicInterval('1')">Hộp 1 (1 ngày)</button>
            <button type="button" class="leitner-pill ${state.topicIntervalFilter === '4' ? 'active' : ''}" 
                    onclick="window.cambridgeModule.filterTopicInterval('4')">Hộp 2 (4 ngày)</button>
            <button type="button" class="leitner-pill ${state.topicIntervalFilter === '7' ? 'active' : ''}" 
                    onclick="window.cambridgeModule.filterTopicInterval('7')">Hộp 3 (7 ngày)</button>
            <button type="button" class="leitner-pill ${state.topicIntervalFilter === '14' ? 'active' : ''}" 
                    onclick="window.cambridgeModule.filterTopicInterval('14')">Hộp 4 (14 ngày)</button>
          </div>

          <div class="topic-word-counter">
            <strong>${state.topicCurrentIndex + 1}</strong> / ${total}
          </div>
        </div>

        <!-- 3D FLIPPABLE FLASHCARD -->
        <div class="cam-flashcard-scene" onclick="window.cambridgeModule.flipTopicCard()">
          <div class="cam-flashcard-card ${state.topicCardFlipped ? 'is-flipped' : ''}">
            <!-- FRONT FACE -->
            <div class="cam-card-face cam-card-front">
              <div class="card-front-top">
                <span class="level-badge badge-${(word.level || 'B2').toLowerCase()}">${word.level || 'B2'}</span>
                <span class="type-tag">${word.type || 'word'}</span>
                <span class="interval-tag">Chu kỳ: ${word.interval || 1} ngày</span>
              </div>

              <div class="card-front-blank-sentence">
                "${escapeHtml(word.frontBlank || word.exampleEn)}"
              </div>

              <div class="card-front-hint">
                <span class="hint-icon">💡</span>
                <span>Chạm để lật xem từ vựng IELTS, phiên âm IPA & nghĩa tiếng Việt</span>
              </div>
            </div>

            <!-- BACK FACE -->
            <div class="cam-card-face cam-card-back">
              <div class="card-back-top">
                <span class="level-badge badge-${(word.level || 'B2').toLowerCase()}">${word.level || 'B2'}</span>
                <span class="type-tag">${word.type || 'word'}</span>
                <button type="button" class="btn-tts-speak" title="Nghe phát âm chuẩn UK"
                        onclick="event.stopPropagation(); window.cambridgeModule.speakText('${word.word}')">
                  🔊 Nghe phát âm
                </button>
              </div>

              <div class="card-back-word-box">
                <h2 class="back-target-word">${escapeHtml(word.word)}</h2>
                <div class="back-ipa-text">${escapeHtml(word.ipa)}</div>
                <div class="back-meaning-text">${escapeHtml(word.vietnamese)}</div>
              </div>

              <div class="card-back-example-box">
                <div class="ex-en">"${escapeHtml(word.exampleEn)}"</div>
                <div class="ex-vi">${escapeHtml(word.exampleVi || '')}</div>
              </div>

              ${word.collocations && word.collocations.length > 0 ? `
                <div class="card-back-collocations">
                  <span class="coll-label">Collocations ăn điểm:</span>
                  <div class="coll-chips">
                    ${word.collocations.map(c => `<span class="coll-chip">${escapeHtml(c)}</span>`).join('')}
                  </div>
                </div>
              ` : ''}

              <div class="card-back-footer">
                <span class="card-source-tag">Nguồn: ${escapeHtml(word.source || 'Cambridge IELTS')}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- BOTTOM TOOLBAR -->
        <div class="topic-flashcard-controls">
          <button type="button" class="btn-flash-nav" onclick="window.cambridgeModule.prevTopicCard()">
            ← Từ trước
          </button>

          <button type="button" class="btn-flash-save ${isSaved ? 'already-saved' : ''}" 
                  onclick="window.cambridgeModule.saveCurrentWordToFlashcards('${word.id}')">
            ${isSaved ? '✓ Đã lưu trong Flashcards' : '⭐ Thêm từ này vào Flashcards'}
          </button>

          <button type="button" class="btn-flash-nav" onclick="window.cambridgeModule.nextTopicCard()">
            Từ tiếp theo →
          </button>
        </div>
      </div>
    `;

    if (stageContainer) stageContainer.innerHTML = html;
  }

  function getFilteredTopicWords() {
    const topic = getCurrentTopic();
    if (!topic || !topic.words) return [];
    if (state.topicIntervalFilter === 'all') return topic.words;
    const intVal = parseInt(state.topicIntervalFilter, 10);
    return topic.words.filter(w => w.interval === intVal);
  }

  function filterTopicInterval(filter) {
    state.topicIntervalFilter = filter;
    state.topicCurrentIndex = 0;
    state.topicCardFlipped = false;
    renderTopicStudyStage();
  }

  function flipTopicCard() {
    state.topicCardFlipped = !state.topicCardFlipped;
    const cardEl = document.querySelector('.cam-flashcard-card');
    if (cardEl) cardEl.classList.toggle('is-flipped', state.topicCardFlipped);
  }

  function prevTopicCard() {
    const words = getFilteredTopicWords();
    if (words.length === 0) return;
    state.topicCurrentIndex = (state.topicCurrentIndex - 1 + words.length) % words.length;
    state.topicCardFlipped = false;
    renderTopicStudyStage();
  }

  function nextTopicCard() {
    const words = getFilteredTopicWords();
    if (words.length === 0) return;
    state.topicCurrentIndex = (state.topicCurrentIndex + 1) % words.length;
    state.topicCardFlipped = false;
    renderTopicStudyStage();
  }

  function speakText(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-GB';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  // --- SAVE TOPIC VOCABULARY TO APP'S FLASHCARD SYSTEM ---
  function saveCurrentWordToFlashcards(wordId) {
    const topic = getCurrentTopic();
    if (!topic || !topic.words) return;
    const word = topic.words.find(w => w.id === wordId);
    if (!word) return;

    let success = false;
    const isPhrase = (word.word.includes(' ') || word.type === 'phrase' || word.type === 'collocation');

    if (isPhrase && typeof window.addCollocationCard === 'function') {
      success = window.addCollocationCard({
        english: word.word,
        vietnamese: word.vietnamese,
        exampleEn: word.exampleEn,
        exampleVi: word.exampleVi || word.vietnamese,
        ipa: word.ipa
      });
    } else if (typeof window.addWordCard === 'function') {
      success = window.addWordCard({
        english: word.word,
        vietnamese: word.vietnamese,
        exampleEn: word.exampleEn,
        exampleVi: word.exampleVi || word.vietnamese,
        ipa: word.ipa
      });
    }

    state.savedTopicWordIds.add(word.id);
    saveTopicWordsStorage();
    renderTopicStudyStage();
  }

  function saveAllTopicWordsToFlashcards(topicId) {
    if (!state.data || !state.data.topics) return;
    const topic = state.data.topics.find(t => t.topic_id === topicId);
    if (!topic || !topic.words) return;

    let addedCount = 0;
    topic.words.forEach(word => {
      const isPhrase = (word.word.includes(' ') || word.type === 'phrase' || word.type === 'collocation');
      if (isPhrase && typeof window.addCollocationCard === 'function') {
        window.addCollocationCard({
          english: word.word,
          vietnamese: word.vietnamese,
          exampleEn: word.exampleEn,
          exampleVi: word.exampleVi || word.vietnamese,
          ipa: word.ipa
        });
        addedCount++;
      } else if (typeof window.addWordCard === 'function') {
        window.addWordCard({
          english: word.word,
          vietnamese: word.vietnamese,
          exampleEn: word.exampleEn,
          exampleVi: word.exampleVi || word.vietnamese,
          ipa: word.ipa
        });
        addedCount++;
      }
      state.savedTopicWordIds.add(word.id);
    });

    saveTopicWordsStorage();
    if (window.showToast) {
      window.showToast(`🎉 Đã thêm toàn bộ ${addedCount} từ của chủ đề "${topic.titleVi}" vào Flashcards cá nhân!`);
    }
    renderTopicsView();
  }

  // =========================================================================
  // AUDIO CONTROLS & TIMELINE FOR LISTENING
  // =========================================================================
  function toggleAudio() {
    if (!state.audioEl) return;
    if (state.audioEl.paused) {
      state.audioEl.play().catch(e => console.warn('Play error:', e));
    } else {
      state.audioEl.pause();
    }
  }

  function updateAudioPlayButton(isPlaying) {
    state.isPlaying = isPlaying;
    const btn = document.getElementById('btn-cam-play');
    if (!btn) return;
    if (isPlaying) {
      btn.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1.5"></rect>
          <rect x="14" y="4" width="4" height="16" rx="1.5"></rect>
        </svg>
      `;
      btn.title = 'Tạm dừng audio';
    } else {
      btn.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="margin-left: 2px;">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      `;
      btn.title = 'Phát audio';
    }
  }

  function seekAudio(seconds) {
    if (!state.audioEl) return;
    state.audioEl.currentTime = Math.max(0, Math.min(seconds, state.duration || 9999));
  }

  function setSpeed(rate) {
    state.playbackRate = rate;
    if (state.audioEl) state.audioEl.playbackRate = rate;
    document.querySelectorAll('.cam-speed-btn').forEach(b => {
      const sp = parseFloat(b.getAttribute('data-speed') || '1.0');
      b.classList.toggle('active', Math.abs(sp - rate) < 0.05);
    });
    if (window.showToast) window.showToast(`Tốc độ: ${rate}x`);
  }

  function bindEvents() {
    // Audio element events
    const audio = state.audioEl;
    if (audio) {
      audio.addEventListener('play', () => updateAudioPlayButton(true));
      audio.addEventListener('pause', () => updateAudioPlayButton(false));
      audio.addEventListener('loadedmetadata', () => {
        state.duration = audio.duration || 0;
        const durEl = document.getElementById('cam-time-total');
        if (durEl) durEl.textContent = formatTime(state.duration);
      });
      audio.addEventListener('timeupdate', () => {
        state.currentTime = audio.currentTime || 0;
        const curEl = document.getElementById('cam-time-current');
        const fillEl = document.getElementById('cam-scrub-fill');
        if (curEl) curEl.textContent = formatTime(state.currentTime);
        if (fillEl && state.duration > 0) {
          const pct = (state.currentTime / state.duration) * 100;
          fillEl.style.width = `${pct}%`;
        }
      });
      audio.addEventListener('error', () => {
        const currentSrc = audio.src;
        const releaseBase = (window.APP_CONFIG && window.APP_CONFIG.AUDIO_RELEASE_URL)
          ? window.APP_CONFIG.AUDIO_RELEASE_URL.replace(/\/$/, '') + '/'
          : DEFAULT_AUDIO_RELEASE_BASE;

        if (currentSrc && !currentSrc.includes('/releases/download/')) {
          const filename = decodeURIComponent(currentSrc.split('/').pop().trim());
          if (filename && filename.length > 3) {
            console.log('[Cambridge Audio Fallback] Retrying from Cloud GitHub Release:', filename);
            audio.src = `${releaseBase}${encodeURIComponent(filename)}`;
            audio.load();
            return;
          }
        }
        console.warn('[Cambridge Audio Error] Failed to play audio:', currentSrc);
      });
    }

    // Audio Scrubber click
    const scrubTrack = document.getElementById('cam-scrub-track');
    if (scrubTrack) {
      scrubTrack.addEventListener('click', (e) => {
        const rect = scrubTrack.getBoundingClientRect();
        const ratio = Math.max(0, Math.min((e.clientX - rect.left) / rect.width, 1));
        if (state.duration > 0) seekAudio(ratio * state.duration);
      });
    }

    // Speed buttons
    document.querySelectorAll('.cam-speed-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sp = parseFloat(btn.getAttribute('data-speed') || '1.0');
        setSpeed(sp);
      });
    });

    // Play button
    const btnPlay = document.getElementById('btn-cam-play');
    if (btnPlay) btnPlay.addEventListener('click', toggleAudio);

    // Skip buttons
    const btnBack = document.getElementById('btn-cam-back-5');
    if (btnBack) btnBack.addEventListener('click', () => {
      if (state.audioEl) state.audioEl.currentTime = Math.max(0, state.audioEl.currentTime - 5);
    });

    const btnFwd = document.getElementById('btn-cam-fwd-5');
    if (btnFwd) btnFwd.addEventListener('click', () => {
      if (state.audioEl) state.audioEl.currentTime += 5;
    });

    // Header nav tabs in Cambridge workspace
    document.querySelectorAll('.cam-nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const targetView = tab.getAttribute('data-target-view');
        if (targetView === 'hub') renderHub();
        else if (targetView === 'topics') renderTopicsView();
      });
    });
  }

  // --- EXPOSE GLOBAL MODULE ---
  window.cambridgeModule = {
    init,
    onActivate,
    showView,
    renderHub,
    selectBook,
    startListeningTest,
    startReadingTest,
    switchTestPart,
    onAnswerChange,
    updatePillUI,
    saveDraft,
    submitCurrentTest,
    renderReviewView,
    filterReviewCards,
    replayClueAudio,
    reviewTestResult,
    loadTest,
    switchReadingMobileTab,
    jumpToReadingEvidence,
    onMultiAnswerChange,
    renderTopicsView,
    openTopicsFromTest,
    startTopicStudy,
    filterTopicInterval,
    flipTopicCard,
    prevTopicCard,
    nextTopicCard,
    speakText,
    saveCurrentWordToFlashcards,
    saveAllTopicWordsToFlashcards
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
