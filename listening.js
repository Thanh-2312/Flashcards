/**
 * =========================================================================
 * IELTS LISTENING REAL-TIME AUDIO SYNCHRONIZED MODULE
 * Cambridge IELTS 10 • Test 1 (All 4 Parts)
 * 
 * 3 Core Viewing Modes:
 * 1. 'detailed': Thẻ chi tiết (Word, IPA, Level, Nghĩa TV, Ngữ cảnh, Mẹo)
 * 2. 'minimal': Chỉ hiện từ (Tập trung nghe 100%, chữ to giữa màn hình, không nghĩa TV)
 * 3. 'karaoke': Chữ chạy theo lời nói (Full transcript, từ sáng theo giọng đọc)
 * + 'vocab': Tra cứu toàn bộ danh sách từ
 * =========================================================================
 */

(function () {
  'use strict';

  // --- STATE ---
  const savedTestId = localStorage.getItem('ielts_listening_last_test_id') || 'cam10_t1';
  const normSavedTestId = savedTestId.replace('_test', '_t');

  const state = {
    testData: null,
    currentTestId: normSavedTestId,
    currentSectionId: localStorage.getItem('ielts_listening_last_section_id') || 'section1',
    currentMode: 'detailed', // 'detailed' | 'minimal' | 'karaoke' | 'vocab'
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    activeWord: null,
    lastActiveWord: null,
    activeWordExpiry: 0,
    activeSegment: null,
    recentWordIds: [],
    autoPauseOnWord: false,
    pausedWordIds: new Set(),
    playbackRate: 1.0,
    filterLevel: 'all',
    searchQuery: '',
    savedWordIds: new Set(),
    karaokeAutoScroll: true
  };

  let audioEl = null;
  let rafId = null;

  // --- ESCAPE HTML HELPER ---
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeJs(str) {
    if (!str) return '';
    return String(str).replace(/'/g, "\\'").replace(/"/g, '\\"');
  }

  // --- TIME FORMATTING (MM:SS) ---
  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  // --- PROPORTIONAL TIMESTAMP INTERPOLATION ---
  function interpolateSegmentTimestamps(sec, totalDuration) {
    if (!sec || !sec.segments || sec.segments.length === 0 || !totalDuration || totalDuration <= 0) return;
    const hasTimings = sec.segments.some(s => s.end > 0);
    if (hasTimings) return;

    let totalWords = 0;
    sec.segments.forEach(seg => {
      const count = (seg.text.match(/\S+/g) || []).length;
      seg._wCount = Math.max(1, count);
      totalWords += seg._wCount;
    });

    if (totalWords === 0) return;

    let currentSec = 0;
    sec.segments.forEach(seg => {
      const dur = (seg._wCount / totalWords) * totalDuration;
      seg.start = Math.round(currentSec * 10) / 10;
      currentSec += dur;
      seg.end = Math.round(currentSec * 10) / 10;
    });

    if (sec.vocabulary && sec.vocabulary.length > 0) {
      sec.vocabulary.forEach(v => {
        if (v.start === 0 && v.end === 0) {
          const s = sec.segments.find(seg => seg.id === v.segment_id);
          if (s) {
            v.start = s.start;
            v.end = Math.min(s.end, s.start + 2.5);
          }
        }
      });
    }
  }

  // --- GET CURRENT SECTION DATA ---
  function getCurrentSection() {
    // 1. Check window.CAM_TESTS
    if (window.CAM_TESTS && window.CAM_TESTS[state.currentTestId]) {
      const test = window.CAM_TESTS[state.currentTestId];
      if (test.listening && test.listening.parts) {
        const numMatch = (state.currentSectionId || '').match(/\d+/);
        const partIdx = numMatch ? (parseInt(numMatch[0], 10) - 1) : 0;
        const part = test.listening.parts[partIdx] || test.listening.parts[0];
        if (part) {
          const vocabCards = test.vocab || [];
          const globalCards = window.CAMBRIDGE_CARDS || [];

          let vocabList = (part.words || []).map((pw, idx) => {
            const wNorm = (pw.w || '').toLowerCase();
            const foundCard = vocabCards.find(c => (c.english || '').toLowerCase() === wNorm)
                           || globalCards.find(c => (c.english || '').toLowerCase() === wNorm);

            return {
              id: foundCard?.id || `word_${part.n}_${idx}`,
              word: foundCard?.english || pw.w,
              ipa: foundCard?.ipa || '',
              meaning: foundCard?.vietnamese || '',
              level: foundCard?.ipa?.includes('C2') ? 'C2' : (foundCard?.ipa?.includes('C1') ? 'C1' : 'B2'),
              type: foundCard?.category === 'words' ? 'word' : 'collocation',
              start: pw.s || 0,
              end: pw.e || 0,
              context: foundCard?.exampleEn || foundCard?.context || '',
              tip: foundCard?.vietnamese || '',
              segment_id: pw.seg
            };
          });

          // Supplement vocab if words array is empty or short
          if (vocabList.length < 5 && vocabCards.length > 0) {
            const partText = (part.segments || []).map(s => s.text).join(' ').toLowerCase();
            vocabCards.forEach((card, idx) => {
              const engLower = (card.english || '').toLowerCase();
              if (engLower && partText.includes(engLower) && !vocabList.some(v => v.word.toLowerCase() === engLower)) {
                vocabList.push({
                  id: card.id || `word_${part.n}_ext_${idx}`,
                  word: card.english,
                  ipa: card.ipa || '',
                  meaning: card.vietnamese || '',
                  level: card.ipa?.includes('C2') ? 'C2' : (card.ipa?.includes('C1') ? 'C1' : 'B2'),
                  type: card.category === 'words' ? 'word' : 'collocation',
                  start: 0,
                  end: 0,
                  context: card.exampleEn || card.context || '',
                  tip: card.vietnamese || '',
                  segment_id: part.segments?.[0]?.id || 's1'
                });
              }
            });
          }

          return {
            section_id: `section${part.n}`,
            title: part.title || `Part ${part.n}`,
            description: `Part ${part.n} • Luyện nghe ngắt quãng và nhận diện từ vựng học thuật B2-C2`,
            audio_src: part.audio?.src || part.audio_src || '',
            audio_offset: part.audio?.offset || 0,
            total_words: vocabList.length,
            target_score: 'IELTS Band 7.0 - 9.0',
            segments: part.segments || [],
            vocabulary: vocabList
          };
        }
      }
    }

    // 2. Legacy fallback
    if (state.testData && state.testData.tests && state.testData.tests[0]) {
      const test = state.testData.tests[0];
      return test.sections.find(s => s.section_id === state.currentSectionId) || test.sections[0];
    }
    return null;
  }

  // --- DYNAMIC TEST LOADER & PICKER HELPERS ---
  function loadTestScript(testId) {
    if (window.CAM_TESTS && window.CAM_TESTS[testId]) {
      return Promise.resolve(window.CAM_TESTS[testId]);
    }
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-test-id="${testId}"]`);
      if (existing) {
        if (window.CAM_TESTS && window.CAM_TESTS[testId]) return resolve(window.CAM_TESTS[testId]);
        existing.addEventListener('load', () => resolve(window.CAM_TESTS[testId]));
        existing.addEventListener('error', reject);
        return;
      }
      const script = document.createElement('script');
      script.src = `data/tests/${testId}.js`;
      script.setAttribute('data-test-id', testId);
      script.onload = () => {
        if (window.CAM_TESTS && window.CAM_TESTS[testId]) resolve(window.CAM_TESTS[testId]);
        else reject(new Error(`Test data for ${testId} not found.`));
      };
      script.onerror = () => reject(new Error(`Không thể nạp file data/tests/${testId}.js`));
      document.head.appendChild(script);
    });
  }

  function getBooksManifest() {
    if (window.CAMBRIDGE_DATA && Array.isArray(window.CAMBRIDGE_DATA.books)) {
      return window.CAMBRIDGE_DATA.books;
    }
    const books = [];
    for (let b = 10; b <= 20; b++) {
      books.push({
        id: `cam${b}`,
        title: `Cambridge IELTS ${b}`,
        tests: [1, 2, 3, 4].map(t => ({
          id: `cam${b}_t${t}`,
          title: `Cambridge IELTS ${b} • Test ${t}`
        }))
      });
    }
    return books;
  }

  function populateTestPickers() {
    const bookSelect = document.getElementById('listening-book-select');
    const testSelect = document.getElementById('listening-test-select');
    if (!bookSelect || !testSelect) return;

    const books = getBooksManifest();
    bookSelect.innerHTML = books.map(b => `<option value="${b.id}">${escapeHtml(b.title)}</option>`).join('');

    let currentBookId = 'cam10';
    const m = state.currentTestId.match(/^cam(\d+)/i);
    if (m) {
      currentBookId = `cam${m[1]}`;
    }
    bookSelect.value = currentBookId;

    updateTestDropdownOptions(currentBookId);
    testSelect.value = state.currentTestId;
  }

  function updateTestDropdownOptions(bookId) {
    const testSelect = document.getElementById('listening-test-select');
    if (!testSelect) return;

    const books = getBooksManifest();
    const book = books.find(b => b.id === bookId) || books[0];
    if (!book) return;

    testSelect.innerHTML = book.tests.map((t, idx) => {
      const tNum = idx + 1;
      return `<option value="${t.id}">Test ${tNum}</option>`;
    }).join('');
  }

  function renderPartTabs(testData) {
    const nav = document.getElementById('listening-sections-nav');
    if (!nav) return;

    const parts = testData?.listening?.parts || [];
    if (parts.length === 0) return;

    let html = '';
    parts.forEach((p, idx) => {
      const secId = `section${p.n}`;
      const isActive = state.currentSectionId === secId || (!state.currentSectionId && idx === 0);
      const wordCount = (p.words || []).length;
      const title = p.title || `Part ${p.n}`;

      html += `
        <button type="button" class="listening-section-tab ${isActive ? 'active' : ''}" data-section="${secId}">
          <span class="sec-tab-num">Part ${p.n}</span>
          <span class="sec-tab-title">${escapeHtml(title)}</span>
          <span class="sec-tab-count">${wordCount} từ khó</span>
        </button>
      `;
    });

    nav.innerHTML = html;

    // Attach click handlers
    nav.querySelectorAll('.listening-section-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const secId = tab.getAttribute('data-section');
        if (secId) loadSection(secId, true);
      });
    });

    // Update breadcrumb and pill test
    const pillTest = document.getElementById('listening-pill-test');
    if (pillTest) {
      pillTest.textContent = testData.title || `Cambridge IELTS ${testData.book} • Test ${testData.test}`;
    }
  }

  function renderBrowseModal() {
    const grid = document.getElementById('listening-browse-grid');
    if (!grid) return;

    const books = getBooksManifest();
    let html = '';

    books.forEach(book => {
      const bNum = book.id.replace('cam', '');
      let testsHtml = '';
      book.tests.forEach((t, idx) => {
        const isActive = state.currentTestId === t.id;
        testsHtml += `
          <button type="button" class="listening-test-choice-btn ${isActive ? 'active' : ''}" data-test-id="${t.id}">
            Test ${idx + 1}
          </button>
        `;
      });

      html += `
        <div class="listening-book-card">
          <div class="listening-book-card-title">
            <span>Cambridge IELTS ${bNum}</span>
            <span class="listening-book-badge">4 Tests</span>
          </div>
          <div class="listening-test-btn-group">
            ${testsHtml}
          </div>
        </div>
      `;
    });

    grid.innerHTML = html;

    // Attach click events
    grid.querySelectorAll('.listening-test-choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tId = btn.getAttribute('data-test-id');
        if (tId) {
          closeBrowseModal();
          switchTest(tId, 0, true);
        }
      });
    });
  }

  function openBrowseModal() {
    const modal = document.getElementById('listening-browse-modal');
    if (modal) {
      renderBrowseModal();
      modal.style.display = 'flex';
    }
  }

  function closeBrowseModal() {
    const modal = document.getElementById('listening-browse-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  function switchTest(testId, partIndex = 0, autoPlay = false) {
    if (!testId) return;
    testId = testId.replace('_test', '_t');
    state.currentTestId = testId;
    state.currentSectionId = `section${partIndex + 1}`;
    localStorage.setItem('ielts_listening_last_test_id', testId);
    localStorage.setItem('ielts_listening_last_section_id', state.currentSectionId);

    // Sync select dropdowns
    const bookSelect = document.getElementById('listening-book-select');
    const testSelect = document.getElementById('listening-test-select');
    const m = testId.match(/^cam(\d+)/i);
    if (m && bookSelect && testSelect) {
      const bId = `cam${m[1]}`;
      if (bookSelect.value !== bId) {
        bookSelect.value = bId;
        updateTestDropdownOptions(bId);
      }
      testSelect.value = testId;
    }

    const loader = (window.cambridgeModule && typeof window.cambridgeModule.loadTest === 'function')
      ? window.cambridgeModule.loadTest(testId)
      : loadTestScript(testId);

    loader.then(testData => {
      renderPartTabs(testData);
      loadSection(state.currentSectionId, autoPlay);
    }).catch(err => {
      console.warn('Could not load test data for', testId, err);
      loadSection(state.currentSectionId, autoPlay);
    });
  }

  // --- INITIALIZATION ---
  function init() {
    state.testData = window.LISTENING_DATA || null;
    audioEl = document.getElementById('listening-audio-element');

    if (!audioEl) {
      console.warn('[ListeningModule] #listening-audio-element not found in DOM.');
      return;
    }

    bindAudioEvents();
    bindDomEvents();

    // Populate pickers
    populateTestPickers();

    // Load saved words from localStorage
    try {
      const saved = JSON.parse(localStorage.getItem('listening_saved_words') || '[]');
      state.savedWordIds = new Set(saved);
    } catch (e) {
      state.savedWordIds = new Set();
    }

    // Switch to initial test
    switchTest(state.currentTestId, 0, false);
  }

  // --- BIND AUDIO EVENTS ---
  function bindAudioEvents() {
    if (!audioEl) return;

    audioEl.addEventListener('loadedmetadata', () => {
      state.duration = audioEl.duration || 0;
      const sec = getCurrentSection();
      if (sec && state.duration > 0) {
        interpolateSegmentTimestamps(sec, state.duration);
      }
      updateDurationDisplay();
      renderTimelineMarkers();
      renderKaraokeTranscript();
      renderVocabList();
    });

    audioEl.addEventListener('error', () => {
      const hintEl = document.getElementById('listening-audio-hint');
      if (hintEl) {
        hintEl.style.display = 'block';
        hintEl.innerHTML = 'ℹ️ <strong>Audio:</strong> File nghe bài này chưa tìm thấy ở đường dẫn cục bộ hoặc đang tải. Bạn vẫn có thể luyện nghe, xem toàn bộ transcript, từ khó và tra nghĩa bên dưới.';
      }
    });

    audioEl.addEventListener('canplay', () => {
      const hintEl = document.getElementById('listening-audio-hint');
      if (hintEl) hintEl.style.display = 'none';
    });

    audioEl.addEventListener('play', () => {
      state.isPlaying = true;
      updatePlayPauseButton();
      startAnimationLoop();
    });

    audioEl.addEventListener('pause', () => {
      state.isPlaying = false;
      updatePlayPauseButton();
      stopAnimationLoop();
    });

    audioEl.addEventListener('ended', () => {
      state.isPlaying = false;
      updatePlayPauseButton();
      stopAnimationLoop();
    });

    audioEl.addEventListener('ratechange', () => {
      state.playbackRate = audioEl.playbackRate;
      updateSpeedButtons();
    });
  }

  // --- ANIMATION / TICK LOOP (SUB-SECOND PRECISION) ---
  function startAnimationLoop() {
    stopAnimationLoop();
    function tick() {
      if (audioEl) {
        state.currentTime = audioEl.currentTime;
        updateTimeSync();
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
  }

  function stopAnimationLoop() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  // --- TIME SYNC CORE LOGIC ---
  function updateTimeSync() {
    const sec = getCurrentSection();
    if (!sec) return;

    const t = state.currentTime;

    // 1. Update scrubber bar & current time text
    updateProgressBar(t);

    // 2. Identify active difficult word
    const activeWord = sec.vocabulary.find(w => t >= w.start && t <= (w.end + 0.8));

    if (activeWord) {
      if (!state.activeWord || state.activeWord.id !== activeWord.id) {
        state.activeWord = activeWord;
        state.lastActiveWord = activeWord;
        state.activeWordExpiry = t + 4.0; // keep visible 4s

        // Add to recent words list if not present
        if (!state.recentWordIds.includes(activeWord.id)) {
          state.recentWordIds.unshift(activeWord.id);
          renderRecentWordsStrip();
          renderMinimalRecentChips();
        }

        // Auto-pause feature
        if (state.autoPauseOnWord && !state.pausedWordIds.has(activeWord.id)) {
          state.pausedWordIds.add(activeWord.id);
          audioEl.pause();
          if (window.showToast) {
            window.showToast(`🎯 Tạm dừng tại từ: "${activeWord.word}". Bấm Play/Phím Cách để tiếp tục!`);
          }
        }

        // Render in active mode
        renderActiveWordHero(activeWord, true);
        renderMinimalWord(activeWord, true);
      }
    } else {
      // If between difficult words:
      if (state.lastActiveWord && t <= state.activeWordExpiry) {
        // keep lingering
      } else if (state.activeWord) {
        state.activeWord = null;
        renderActiveWordHero(null, false);
        renderMinimalWord(null, false);
      }
    }

    // 3. Karaoke Teleprompter Word & Segment Highlight
    updateKaraokeSync(t, sec);
  }

  // --- PROGRESS BAR & TIMELINE MARKERS ---
  function updateProgressBar(t) {
    const dur = state.duration || 1;
    const percent = Math.min(Math.max((t / dur) * 100, 0), 100);

    const fillBar = document.getElementById('listening-progress-fill');
    const timeDisplay = document.getElementById('listening-time-current');

    if (fillBar) fillBar.style.width = `${percent}%`;
    if (timeDisplay) timeDisplay.textContent = formatTime(t);
  }

  function updateDurationDisplay() {
    const durDisplay = document.getElementById('listening-time-total');
    if (durDisplay) durDisplay.textContent = formatTime(state.duration);
  }

  function renderTimelineMarkers() {
    const container = document.getElementById('listening-timeline-markers');
    if (!container) return;

    const sec = getCurrentSection();
    if (!sec || !state.duration || state.duration <= 0) {
      container.innerHTML = '';
      return;
    }

    const dur = state.duration;
    let html = '';

    sec.vocabulary.forEach(w => {
      const posPercent = (w.start / dur) * 100;
      if (posPercent >= 0 && posPercent <= 100) {
        html += `
          <button type="button" class="timeline-marker-dot" 
                  style="left: ${posPercent.toFixed(2)}%;" 
                  title="${escapeHtml(w.word)} (${formatTime(w.start)}) - ${escapeHtml(w.meaning)}"
                  onclick="window.listeningModule.jumpToWord('${w.id}')">
            <span class="marker-tooltip">${escapeHtml(w.word)}</span>
          </button>
        `;
      }
    });

    container.innerHTML = html;
  }

  // =========================================================================
  // TAB 1: DETAILED HERO CARD (THẺ CHI TIẾT ĐẦY ĐỦ THÔNG TIN)
  // =========================================================================
  function renderActiveWordHero(word, isDirectlyActive) {
    const heroCard = document.getElementById('listening-hero-card');
    if (!heroCard) return;

    if (!word) {
      heroCard.innerHTML = `
        <div class="hero-word-empty-state">
          <div class="audio-wave-radar">
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
          </div>
          <h3 class="empty-title">Đang lắng nghe audio...</h3>
          <p class="empty-sub">Khi người nói phát âm đến từ vựng khó / học thuật IELTS, từ đó sẽ ngay lập tức xuất hiện tại đây cùng phiên âm, nghĩa tiếng Việt và ví dụ ngữ cảnh.</p>
          <div class="empty-hint-chip">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            Mẹo: Dùng Phím Cách để Play/Pause, Mũi tên Trái/Phải để tua ±5s.
          </div>
        </div>
      `;
      heroCard.classList.remove('word-active');
      return;
    }

    const isSaved = state.savedWordIds.has(word.id);
    const badgeLevelClass = `badge-level-${(word.level || 'B2').toLowerCase()}`;

    let contextHtml = escapeHtml(word.context || '');
    if (word.word && contextHtml) {
      const safeWord = escapeHtml(word.word);
      const reg = new RegExp(`(${safeWord})`, 'gi');
      contextHtml = contextHtml.replace(reg, '<mark class="hero-context-highlight">$1</mark>');
    }

    heroCard.innerHTML = `
      <div class="hero-word-content ${isDirectlyActive ? 'pulse-word' : 'linger-word'}">
        <div class="hero-word-top-row">
          <div class="hero-badges-group">
            <span class="hero-level-badge ${badgeLevelClass}">${escapeHtml(word.level || 'B2')}</span>
            <span class="hero-type-badge">${escapeHtml(word.type || 'word')}</span>
            <span class="hero-time-tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              ${formatTime(word.start)}
            </span>
          </div>

          <div class="hero-actions-group">
            <button type="button" class="hero-action-btn btn-repeat-word" title="Nghe lại đoạn nói từ này" 
                    onclick="window.listeningModule.jumpToWord('${word.id}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="1 4 1 10 7 10"></polyline>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
              </svg>
              <span>Nghe lại</span>
            </button>

            <button type="button" class="hero-action-btn ${isSaved ? 'btn-saved' : 'btn-save-flashcard'}" 
                    id="btn-save-hero-word"
                    title="${isSaved ? 'Đã lưu trong Flashcards' : 'Lưu từ này vào Flashcards ôn tập ngắt quãng 1-4-7-14 ngày'}"
                    onclick="window.listeningModule.saveToFlashcards('${word.id}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>${isSaved ? 'Đã lưu thẻ' : 'Lưu Flashcard'}</span>
            </button>
          </div>
        </div>

        <div class="hero-word-main-row">
          <div class="hero-word-title-wrap">
            <h2 class="hero-word-text">${escapeHtml(word.word)}</h2>
            <button type="button" class="hero-speak-btn" title="Nghe phát âm chuẩn AI / Từ điển" 
                    onclick="window.listeningModule.speakWord('${escapeJs(word.word)}')">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            </button>
          </div>
          <span class="hero-word-ipa">${escapeHtml(word.ipa || '')}</span>
        </div>

        <div class="hero-meaning-box">
          <span class="meaning-label">Nghĩa tiếng Việt:</span>
          <p class="meaning-text">${escapeHtml(word.meaning || '')}</p>
        </div>

        ${word.context ? `
          <div class="hero-context-box">
            <span class="context-label">Ngữ cảnh trong audio:</span>
            <p class="context-sentence">“${contextHtml}”</p>
          </div>
        ` : ''}

        ${word.tip ? `
          <div class="hero-tip-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
            </svg>
            <span><strong>Mẹo IELTS:</strong> ${escapeHtml(word.tip)}</span>
          </div>
        ` : ''}
      </div>
    `;

    heroCard.classList.add('word-active');
  }

  function renderRecentWordsStrip() {
    const strip = document.getElementById('listening-recent-strip');
    if (!strip) return;

    const sec = getCurrentSection();
    if (!sec || state.recentWordIds.length === 0) {
      strip.innerHTML = '<span class="recent-empty">Chưa có từ vựng nào đã qua. Bấm Play để bắt đầu nghe.</span>';
      return;
    }

    let html = '';
    state.recentWordIds.forEach(id => {
      const w = sec.vocabulary.find(item => item.id === id);
      if (!w) return;
      const isCurrent = state.activeWord && state.activeWord.id === w.id;
      const isSaved = state.savedWordIds.has(w.id);

      html += `
        <div class="recent-word-chip ${isCurrent ? 'active' : ''}" onclick="window.listeningModule.jumpToWord('${w.id}')">
          <div class="chip-time">${formatTime(w.start)}</div>
          <div class="chip-word">${escapeHtml(w.word)}</div>
          <div class="chip-meaning">${escapeHtml(w.meaning)}</div>
          ${isSaved ? '<span class="chip-saved-icon" title="Đã lưu thẻ">★</span>' : ''}
        </div>
      `;
    });

    strip.innerHTML = html;
  }

  // =========================================================================
  // TAB 2: MINIMAL WORD ONLY (CHỈ HIỆN MỖI TỪ ĐỂ TẬP TRUNG NGHE HOÀN TOÀN)
  // =========================================================================
  function renderMinimalWord(word, isDirectlyActive) {
    const display = document.getElementById('minimal-word-display');
    if (!display) return;

    if (!word) {
      // If waiting or no word
      if (state.lastActiveWord && state.currentTime <= state.activeWordExpiry) {
        // Keep last word with slight linger
        return;
      }
      display.innerHTML = `
        <div class="minimal-empty-prompt">
          <div class="minimal-sound-ring">
            <span class="ring-pulse"></span>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
            </svg>
          </div>
          <h3 class="minimal-zen-title">Đang tập trung nghe...</h3>
          <p class="minimal-zen-desc">Màn hình sẽ <strong>chỉ hiện mỗi từ tiếng Anh</strong> to rõ ràng khi người nói phát âm đến. Hoàn toàn không có chữ thừa để bạn rèn luyện phản xạ đôi tai.</p>
        </div>
      `;
      return;
    }

    const badgeLevelClass = `badge-level-${(word.level || 'B2').toLowerCase()}`;
    const isSaved = state.savedWordIds.has(word.id);

    display.innerHTML = `
      <div class="minimal-active-word-card ${isDirectlyActive ? 'pop-active' : 'pop-linger'}">
        <div class="minimal-card-top-tags">
          <span class="hero-level-badge ${badgeLevelClass}">${escapeHtml(word.level || 'B2')}</span>
          <span class="hero-type-badge">${escapeHtml(word.type || 'word')}</span>
          <span class="hero-time-tag">${formatTime(word.start)}</span>
        </div>

        <h1 class="minimal-huge-word">${escapeHtml(word.word)}</h1>

        <div class="minimal-word-sub-meta">
          <span class="minimal-word-ipa">${escapeHtml(word.ipa || '')}</span>
          <button type="button" class="minimal-btn-speak" title="Nghe phát âm chuẩn" onclick="window.listeningModule.speakWord('${escapeJs(word.word)}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          </button>
          <button type="button" class="minimal-btn-repeat" title="Nghe lại đoạn nói từ này" onclick="window.listeningModule.jumpToWord('${word.id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="1 4 1 10 7 10"></polyline>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
            </svg>
          </button>
          <button type="button" class="minimal-btn-save ${isSaved ? 'saved' : ''}" title="Lưu thẻ" onclick="window.listeningModule.saveToFlashcards('${word.id}')">
            ${isSaved ? '★ Đã lưu thẻ' : '+ Lưu thẻ'}
          </button>
        </div>
      </div>
    `;
  }

  function renderMinimalRecentChips() {
    const container = document.getElementById('minimal-recent-chips');
    if (!container) return;

    const sec = getCurrentSection();
    if (!sec || state.recentWordIds.length === 0) {
      container.innerHTML = '<span class="minimal-recent-empty">Chưa có từ nào</span>';
      return;
    }

    let html = '';
    state.recentWordIds.slice(0, 10).forEach(id => {
      const w = sec.vocabulary.find(item => item.id === id);
      if (!w) return;
      const isCurrent = state.activeWord && state.activeWord.id === w.id;

      html += `
        <button type="button" class="minimal-recent-chip ${isCurrent ? 'active' : ''}" 
                onclick="window.listeningModule.jumpToWord('${w.id}')"
                title="${escapeHtml(w.word)} (${formatTime(w.start)})">
          <span class="chip-t">${formatTime(w.start)}</span>
          <span class="chip-w">${escapeHtml(w.word)}</span>
        </button>
      `;
    });

    container.innerHTML = html;
  }

  // =========================================================================
  // TAB 3: KARAOKE RUNNING TRANSCRIPT (CHỮ CHẠY THEO LỜI NÓI)
  // =========================================================================
  function renderKaraokeTranscript() {
    const container = document.getElementById('karaoke-stream-content');
    if (!container) return;

    const sec = getCurrentSection();
    if (!sec) {
      container.innerHTML = '<p class="empty-text">Chưa có dữ liệu transcript.</p>';
      return;
    }

    let html = '';
    sec.segments.forEach((seg, segIdx) => {
      // Split text into individual words for real-time word-by-word karaoke highlighting
      const rawWords = seg.text.split(/(\s+)/);
      let wordsHtml = '';
      let wordCounter = 0;

      rawWords.forEach(token => {
        if (/^\s+$/.test(token)) {
          wordsHtml += token;
        } else {
          // Check if this word belongs to any difficult vocab
          const cleanToken = token.replace(/[^a-zA-Z0-9'-]/g, '').toLowerCase();
          const matchedVocab = sec.vocabulary.find(v => {
            const vWords = v.word.toLowerCase().split(/\s+/);
            return vWords.includes(cleanToken) && Math.abs(v.start - seg.start) < 8.0;
          });

          const isVocab = !!matchedVocab;
          const vocabAttr = isVocab ? `data-vocab-id="${matchedVocab.id}" title="${escapeHtml(matchedVocab.meaning)}"` : '';

          wordsHtml += `<span class="k-word ${isVocab ? 'k-vocab-highlight' : ''}" data-word-num="${wordCounter}" ${vocabAttr}>${escapeHtml(token)}</span>`;
          wordCounter++;
        }
      });

      html += `
        <div class="karaoke-line" id="k-line-${seg.id}" data-seg-id="${seg.id}" data-start="${seg.start}" data-end="${seg.end}" data-total-words="${wordCounter}" onclick="window.listeningModule.seekTo(${seg.start})">
          <div class="k-line-head">
            <span class="k-speaker">${escapeHtml(seg.speaker)}</span>
            <span class="k-time">${formatTime(seg.start)}</span>
          </div>
          <div class="k-line-body">
            ${wordsHtml}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function updateKaraokeSync(t, sec) {
    if (state.currentMode !== 'karaoke') return;

    const activeSeg = sec.segments.find(s => t >= s.start && t <= s.end);

    // Update lines state
    sec.segments.forEach(seg => {
      const lineEl = document.getElementById(`k-line-${seg.id}`);
      if (!lineEl) return;

      if (t < seg.start) {
        // Upcoming
        lineEl.classList.remove('active', 'passed');
        lineEl.querySelectorAll('.k-word.spoken').forEach(w => w.classList.remove('spoken', 'current'));
      } else if (t > seg.end) {
        // Passed
        lineEl.classList.remove('active');
        lineEl.classList.add('passed');
        lineEl.querySelectorAll('.k-word:not(.spoken)').forEach(w => w.classList.add('spoken'));
        lineEl.querySelectorAll('.k-word.current').forEach(w => w.classList.remove('current'));
      } else {
        // Active Line Right Now!
        lineEl.classList.remove('passed');
        lineEl.classList.add('active');

        // Calculate sub-second word progress within the spoken sentence
        const totalWords = parseInt(lineEl.getAttribute('data-total-words') || '1', 10);
        const segDuration = Math.max(seg.end - seg.start, 0.1);
        const elapsed = t - seg.start;
        const ratio = Math.min(Math.max(elapsed / segDuration, 0), 1);
        const currentWordIndex = Math.floor(ratio * totalWords);

        const wordEls = lineEl.querySelectorAll('.k-word');
        wordEls.forEach((wSpan, idx) => {
          if (idx < currentWordIndex) {
            wSpan.classList.add('spoken');
            wSpan.classList.remove('current');
          } else if (idx === currentWordIndex) {
            wSpan.classList.add('spoken', 'current');
          } else {
            wSpan.classList.remove('spoken', 'current');
          }
        });

        // Auto-scroll to keep active line centered in viewport
        if (state.karaokeAutoScroll) {
          const viewport = document.getElementById('karaoke-stream-viewport');
          if (viewport) {
            const lineTop = lineEl.offsetTop;
            const lineHeight = lineEl.offsetHeight;
            const viewHeight = viewport.offsetHeight;
            const targetScroll = lineTop - (viewHeight / 2) + (lineHeight / 2);

            viewport.scrollTo({
              top: targetScroll,
              behavior: 'smooth'
            });
          }
        }
      }
    });
  }

  // =========================================================================
  // TAB 4: VOCABULARY LIST MODE
  // =========================================================================
  function renderVocabList() {
    const container = document.getElementById('listening-vocab-grid');
    const countBadge = document.getElementById('listening-vocab-filtered-count');
    if (!container) return;

    const sec = getCurrentSection();
    if (!sec) {
      container.innerHTML = '<p class="empty-text">Chưa có dữ liệu từ vựng.</p>';
      return;
    }

    let list = sec.vocabulary;

    if (state.filterLevel !== 'all') {
      list = list.filter(w => (w.level || '').toUpperCase() === state.filterLevel.toUpperCase());
    }

    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      list = list.filter(w =>
        (w.word || '').toLowerCase().includes(q) ||
        (w.meaning || '').toLowerCase().includes(q) ||
        (w.context || '').toLowerCase().includes(q)
      );
    }

    if (countBadge) {
      countBadge.textContent = `${list.length} / ${sec.vocabulary.length} từ`;
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div class="vocab-empty-state">
          <p>Không tìm thấy từ vựng nào phù hợp với bộ lọc hiện tại.</p>
        </div>
      `;
      return;
    }

    let html = '';
    list.forEach(w => {
      const isSaved = state.savedWordIds.has(w.id);
      const badgeLevelClass = `badge-level-${(w.level || 'B2').toLowerCase()}`;

      html += `
        <div class="vocab-card-item" id="vocab-card-${w.id}">
          <div class="vocab-card-header">
            <div class="vocab-card-badges">
              <span class="hero-level-badge ${badgeLevelClass}">${escapeHtml(w.level || 'B2')}</span>
              <span class="hero-type-badge">${escapeHtml(w.type || 'word')}</span>
              <span class="vocab-card-time" onclick="window.listeningModule.jumpToWord('${w.id}')" title="Nhấn để nghe đoạn này">
                ▶ ${formatTime(w.start)}
              </span>
            </div>
            <button type="button" class="btn-save-mini ${isSaved ? 'saved' : ''}" 
                    title="${isSaved ? 'Đã lưu trong Flashcards' : 'Lưu từ này vào Flashcards'}"
                    onclick="window.listeningModule.saveToFlashcards('${w.id}')">
              ${isSaved ? '★ Đã lưu' : '+ Lưu thẻ'}
            </button>
          </div>

          <div class="vocab-card-word-row">
            <h4 class="vocab-card-word">${escapeHtml(w.word)}</h4>
            <button type="button" class="btn-audio-mini" onclick="window.listeningModule.speakWord('${escapeJs(w.word)}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            </button>
          </div>
          <div class="vocab-card-ipa">${escapeHtml(w.ipa || '')}</div>
          <div class="vocab-card-meaning">${escapeHtml(w.meaning || '')}</div>
          ${w.context ? `<div class="vocab-card-context">“${escapeHtml(w.context)}”</div>` : ''}
          ${w.tip ? `<div class="vocab-card-tip"><strong>Mẹo:</strong> ${escapeHtml(w.tip)}</div>` : ''}
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // --- BIND DOM EVENTS ---
  function bindDomEvents() {
    // 1. Section Switcher Tabs
    document.querySelectorAll('.listening-section-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const secId = tab.getAttribute('data-section');
        if (secId) loadSection(secId, true);
      });
    });

    // 2. View Mode Switcher Buttons (detailed | minimal | karaoke | vocab)
    document.querySelectorAll('.listening-mode-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode');
        if (mode) setMode(mode);
      });
    });

    // 3. Play / Pause Button
    const btnPlay = document.getElementById('btn-listening-play');
    if (btnPlay) {
      btnPlay.addEventListener('click', togglePlay);
    }

    // 4. Skip Buttons
    const btnBack5 = document.getElementById('btn-listening-back-5');
    if (btnBack5) {
      btnBack5.addEventListener('click', () => skip(-5));
    }

    const btnForward5 = document.getElementById('btn-listening-forward-5');
    if (btnForward5) {
      btnForward5.addEventListener('click', () => skip(5));
    }

    // 5. Word Jump Buttons
    const btnPrevWord = document.getElementById('btn-listening-prev-word');
    if (btnPrevWord) {
      btnPrevWord.addEventListener('click', jumpToPrevWord);
    }

    const btnNextWord = document.getElementById('btn-listening-next-word');
    if (btnNextWord) {
      btnNextWord.addEventListener('click', jumpToNextWord);
    }

    // 6. Speed Selector Buttons
    document.querySelectorAll('.listening-speed-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const rate = parseFloat(btn.getAttribute('data-speed') || '1.0');
        setSpeed(rate);
      });
    });

    // 7. Auto-Pause Toggle
    const chkAutoPause = document.getElementById('listening-auto-pause-toggle');
    if (chkAutoPause) {
      chkAutoPause.addEventListener('change', (e) => {
        state.autoPauseOnWord = e.target.checked;
        if (window.showToast) {
          window.showToast(state.autoPauseOnWord ? 'Đã bật: Tự dừng khi phát âm từ khó' : 'Đã tắt tự dừng audio');
        }
      });
    }

    // 8. Karaoke Auto-Scroll Toggle
    const btnKaraokeScroll = document.getElementById('btn-toggle-karaoke-autoscroll');
    if (btnKaraokeScroll) {
      btnKaraokeScroll.addEventListener('click', () => {
        state.karaokeAutoScroll = !state.karaokeAutoScroll;
        const dot = document.getElementById('autoscroll-dot');
        if (dot) dot.classList.toggle('active', state.karaokeAutoScroll);
        if (window.showToast) {
          window.showToast(state.karaokeAutoScroll ? 'Đã bật tự cuộn theo lời' : 'Đã tắt tự cuộn');
        }
      });
    }

    // 9. Progress bar click / drag scrubber
    const progressTrack = document.getElementById('listening-progress-track');
    if (progressTrack) {
      progressTrack.addEventListener('click', (e) => {
        const rect = progressTrack.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        if (width > 0 && state.duration > 0) {
          const ratio = Math.max(0, Math.min(clickX / width, 1));
          seekTo(ratio * state.duration);
        }
      });
    }

    // 10. Search input in vocab mode
    const searchInput = document.getElementById('listening-vocab-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim();
        renderVocabList();
      });
    }

    // 11. Filter level pills in vocab mode
    document.querySelectorAll('.vocab-level-filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.vocab-level-filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.filterLevel = pill.getAttribute('data-level') || 'all';
        renderVocabList();
      });
    });

    // 12. Bulk Save all button
    const btnSaveAll = document.getElementById('btn-listening-save-all');
    if (btnSaveAll) {
      btnSaveAll.addEventListener('click', saveAllCurrentSectionWords);
    }

    // 13. Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      const listeningView = document.getElementById('listening-view');
      if (!listeningView || listeningView.style.display === 'none') return;
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        skip(-5);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        skip(5);
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        jumpToNextWord();
      }
    });

    // 14. Book & Test Pickers
    const bookSelect = document.getElementById('listening-book-select');
    if (bookSelect) {
      bookSelect.addEventListener('change', (e) => {
        const bId = e.target.value;
        updateTestDropdownOptions(bId);
        const testSelect = document.getElementById('listening-test-select');
        const nextTestId = testSelect?.value || `${bId}_t1`;
        switchTest(nextTestId, 0, false);
      });
    }

    const testSelect = document.getElementById('listening-test-select');
    if (testSelect) {
      testSelect.addEventListener('change', (e) => {
        switchTest(e.target.value, 0, false);
      });
    }

    // 15. Browse 44 Tests Modal
    const btnBrowse = document.getElementById('btn-listening-browse-tests');
    if (btnBrowse) {
      btnBrowse.addEventListener('click', openBrowseModal);
    }

    const btnCloseBrowse = document.getElementById('btn-close-listening-browse');
    if (btnCloseBrowse) {
      btnCloseBrowse.addEventListener('click', closeBrowseModal);
    }

    const browseModal = document.getElementById('listening-browse-modal');
    if (browseModal) {
      browseModal.addEventListener('click', (e) => {
        if (e.target === browseModal) closeBrowseModal();
      });
    }
  }

  // --- ACTIONS ---
  function loadSection(secId, autoPlay = false) {
    state.currentSectionId = secId;
    localStorage.setItem('ielts_listening_last_section_id', secId);

    const sec = getCurrentSection();
    if (!sec) return;

    state.currentTime = 0;
    state.activeWord = null;
    state.lastActiveWord = null;
    state.activeWordExpiry = 0;
    state.activeSegment = null;
    state.recentWordIds = [];
    state.pausedWordIds.clear();

    // If audio duration is already known, interpolate if needed
    if (state.duration > 0) {
      interpolateSegmentTimestamps(sec, state.duration);
    }

    // Update section tabs in UI
    document.querySelectorAll('.listening-section-tab').forEach(tab => {
      if (tab.getAttribute('data-section') === secId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update header meta info
    const titleEl = document.getElementById('listening-section-title');
    const descEl = document.getElementById('listening-section-desc');
    const badgeEl = document.getElementById('listening-section-meta-badge');

    if (titleEl) titleEl.textContent = sec.title;
    if (descEl) descEl.textContent = sec.description || sec.topic;
    if (badgeEl) badgeEl.textContent = `${sec.total_words} từ khó • ${sec.target_score}`;

    // Load audio source
    if (audioEl) {
      audioEl.pause();
      if (sec.audio_src) {
        audioEl.src = encodeURI(sec.audio_src);
        audioEl.playbackRate = state.playbackRate;
        audioEl.load();

        if (sec.audio_offset > 0) {
          audioEl.currentTime = sec.audio_offset;
        }

        if (autoPlay) {
          audioEl.play().catch(e => console.log('Autoplay blocked:', e));
        }
      } else {
        audioEl.removeAttribute('src');
      }
    }

    // Render initial views
    renderActiveWordHero(null, false);
    renderMinimalWord(null, false);
    renderRecentWordsStrip();
    renderMinimalRecentChips();
    renderTimelineMarkers();
    renderKaraokeTranscript();
    renderVocabList();
  }

  function setMode(mode) {
    state.currentMode = mode;

    document.querySelectorAll('.listening-mode-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-mode') === mode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const detailedStage = document.getElementById('listening-detailed-stage');
    const minimalStage = document.getElementById('listening-minimal-stage');
    const karaokeStage = document.getElementById('listening-karaoke-stage');
    const vocabStage = document.getElementById('listening-vocab-stage');

    if (detailedStage) detailedStage.style.display = mode === 'detailed' ? 'block' : 'none';
    if (minimalStage) minimalStage.style.display = mode === 'minimal' ? 'block' : 'none';
    if (karaokeStage) karaokeStage.style.display = mode === 'karaoke' ? 'block' : 'none';
    if (vocabStage) vocabStage.style.display = (mode === 'detailed' || mode === 'vocab') ? 'block' : 'none';

    if (mode === 'karaoke') {
      const sec = getCurrentSection();
      if (sec) updateKaraokeSync(state.currentTime, sec);
    } else if (mode === 'minimal') {
      renderMinimalWord(state.activeWord, true);
      renderMinimalRecentChips();
    } else if (mode === 'detailed') {
      renderActiveWordHero(state.activeWord, true);
      renderVocabList();
    } else if (mode === 'vocab') {
      renderVocabList();
    }
  }

  function togglePlay() {
    if (!audioEl) return;
    if (audioEl.paused) {
      audioEl.play().catch(e => console.log('Play failed:', e));
    } else {
      audioEl.pause();
    }
  }

  function updatePlayPauseButton() {
    const btnPlay = document.getElementById('btn-listening-play');
    if (!btnPlay) return;

    if (state.isPlaying) {
      btnPlay.classList.add('playing');
      btnPlay.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1.5"></rect>
          <rect x="14" y="4" width="4" height="16" rx="1.5"></rect>
        </svg>
      `;
      btnPlay.title = 'Tạm dừng (Phím Cách)';
    } else {
      btnPlay.classList.remove('playing');
      btnPlay.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="margin-left: 2px;">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      `;
      btnPlay.title = 'Phát audio (Phím Cách)';
    }
  }

  function seekTo(seconds) {
    if (!audioEl) return;
    const clamped = Math.max(0, Math.min(seconds, state.duration || 9999));
    audioEl.currentTime = clamped;
    state.currentTime = clamped;
    updateTimeSync();
  }

  function skip(deltaSeconds) {
    if (!audioEl) return;
    seekTo(audioEl.currentTime + deltaSeconds);
  }

  function jumpToWord(wordId) {
    const sec = getCurrentSection();
    if (!sec) return;
    const word = sec.vocabulary.find(w => w.id === wordId);
    if (!word) return;

    const targetTime = Math.max(0, word.start - 0.3);
    seekTo(targetTime);

    if (audioEl && audioEl.paused) {
      audioEl.play().catch(e => console.log('Play err:', e));
    }

    state.activeWord = word;
    state.lastActiveWord = word;
    state.activeWordExpiry = word.end + 4.0;
    renderActiveWordHero(word, true);
    renderMinimalWord(word, true);

    if (window.showToast) {
      window.showToast(`🎧 Đang nghe: "${word.word}" (${formatTime(word.start)})`);
    }
  }

  function jumpToPrevWord() {
    const sec = getCurrentSection();
    if (!sec) return;
    const t = state.currentTime;

    const prevWords = sec.vocabulary.filter(w => w.start < (t - 1.2));
    if (prevWords.length > 0) {
      const target = prevWords[prevWords.length - 1];
      jumpToWord(target.id);
    } else {
      seekTo(0);
    }
  }

  function jumpToNextWord() {
    const sec = getCurrentSection();
    if (!sec) return;
    const t = state.currentTime;

    const nextWord = sec.vocabulary.find(w => w.start > (t + 0.5));
    if (nextWord) {
      jumpToWord(nextWord.id);
    }
  }

  function setSpeed(rate) {
    state.playbackRate = rate;
    if (audioEl) {
      audioEl.playbackRate = rate;
    }
    updateSpeedButtons();
    if (window.showToast) {
      window.showToast(`Tốc độ phát: ${rate}x`);
    }
  }

  function updateSpeedButtons() {
    document.querySelectorAll('.listening-speed-btn').forEach(btn => {
      const speed = parseFloat(btn.getAttribute('data-speed') || '1.0');
      if (Math.abs(speed - state.playbackRate) < 0.05) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function speakWord(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const gbVoice = voices.find(v => v.lang.includes('GB') || v.name.includes('UK') || v.name.includes('British'));
    if (gbVoice) utterance.voice = gbVoice;

    window.speechSynthesis.speak(utterance);
  }

  // --- SAVE TO FLASHCARDS INTEGRATION ---
  function saveToFlashcards(wordId) {
    const sec = getCurrentSection();
    if (!sec) return;
    const word = sec.vocabulary.find(w => w.id === wordId);
    if (!word) return;

    const lemma = word.word.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const cardId = `cam-${lemma}`;

    // Try finding existing card in storage to activate it into today's queue
    let activated = false;
    try {
      const stored = localStorage.getItem('minimal_flashcards_data_v6');
      if (stored) {
        const cards = JSON.parse(stored);
        const target = cards.find(c => c.id === cardId || c.english.toLowerCase() === word.word.toLowerCase());
        if (target) {
          target.nextReviewDate = Date.now();
          target.createdDate = target.createdDate || Date.now();
          localStorage.setItem('minimal_flashcards_data_v6', JSON.stringify(cards));
          activated = true;
          if (window.showToast) {
            window.showToast(`Đã đưa "${word.word}" vào hàng đợi học flashcard hôm nay!`);
          }
        }
      }
    } catch (e) {}

    if (!activated) {
      if (typeof window.addWordCard === 'function') {
        window.addWordCard({
          english: word.word,
          vietnamese: word.meaning,
          exampleEn: word.context || word.word,
          exampleVi: word.meaning,
          ipa: word.ipa || '/ielts/'
        });
      }
    }

    state.savedWordIds.add(word.id);
    localStorage.setItem('listening_saved_words', JSON.stringify(Array.from(state.savedWordIds)));

    if (state.activeWord && state.activeWord.id === word.id) {
      renderActiveWordHero(state.activeWord, true);
      renderMinimalWord(state.activeWord, true);
    }
    renderRecentWordsStrip();
    renderVocabList();
  }

  window.openListening3Tab = function(testId, partIndex = 0) {
    if (typeof window.selectCategory === 'function') {
      window.selectCategory('listening');
    }
    switchTest(testId, partIndex, true);
    setMode('detailed');
  };

  function saveAllCurrentSectionWords() {
    const sec = getCurrentSection();
    if (!sec) return;

    let addedCount = 0;
    sec.vocabulary.forEach(w => {
      if (!state.savedWordIds.has(w.id)) {
        saveToFlashcards(w.id);
        addedCount++;
      }
    });

    if (window.showToast) {
      window.showToast(`🎉 Đã lưu toàn bộ ${addedCount} từ vựng của ${sec.title} vào Flashcards!`);
    }
  }

  // --- ON ACTIVATE ---
  function onActivate() {
    if (!audioEl) {
      init();
      return;
    }
    populateTestPickers();

    if (!window.CAM_TESTS || !window.CAM_TESTS[state.currentTestId]) {
      switchTest(state.currentTestId, 0, false);
    } else {
      renderPartTabs(window.CAM_TESTS[state.currentTestId]);
      const sec = getCurrentSection();
      if (sec && (!audioEl.src || audioEl.src === window.location.href)) {
        loadSection(sec.section_id, false);
      }
    }
  }

  // --- EXPOSE MODULE ---
  window.listeningModule = {
    init,
    onActivate,
    loadSection,
    switchTest,
    openBrowseModal,
    closeBrowseModal,
    setMode,
    togglePlay,
    seekTo,
    skip,
    jumpToWord,
    jumpToPrevWord,
    jumpToNextWord,
    setSpeed,
    speakWord,
    saveToFlashcards,
    saveAllCurrentSectionWords
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
