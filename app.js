/**
 * Minimal Flashcards Application
 * Categories: Words & Collocations
 * Spaced Repetition Intervals: 1, 4, 7, 14 days
 * Modes: Flip Card & Interactive Typing Quiz
 */

(function () {
  'use strict';

  // --- INTERVAL CONSTANTS (Days) ---
  const INTERVAL_LEVELS = [1, 4, 7, 14];
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  // --- DEFAULT STARTER DATA (IELTS Academic Words & Collocations) ---
  const DEFAULT_CARDS = [
    // --- WORDS ---
    {
      id: 'w-1',
      category: 'words',
      english: 'ubiquitous',
      ipa: '/juːˈbɪk.wə.təs/',
      vietnamese: 'Phổ biến khắp nơi, đâu đâu cũng thấy',
      exampleEn: 'Mobile phones have become ubiquitous in daily modern life.',
      exampleVi: 'Điện thoại di động đã trở nên phổ biến ở khắp nơi trong đời sống hiện đại.',
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'w-2',
      category: 'words',
      english: 'meticulous',
      ipa: '/məˈtɪk.jə.ləs/',
      vietnamese: 'Tỉ mỉ, cẩn thận từng chi tiết nhỏ',
      exampleEn: 'She was meticulous about keeping her research records accurate.',
      exampleVi: 'Cô ấy rất tỉ mỉ trong việc giữ cho các bản ghi chép nghiên cứu luôn chính xác.',
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'w-3',
      category: 'words',
      english: 'mitigate',
      ipa: '/ˈmɪt.ɪ.ɡeɪt/',
      vietnamese: 'Làm giảm bớt, xoa dịu mức độ nghiêm trọng',
      exampleEn: 'Emergency measures were taken to mitigate the environmental damage.',
      exampleVi: 'Các biện pháp khẩn cấp đã được thực hiện để giảm thiểu thiệt hại môi trường.',
      interval: 4,
      boxLevel: 2,
      nextReviewDate: Date.now() - 1000,
      createdDate: Date.now()
    },
    {
      id: 'w-4',
      category: 'words',
      english: 'exacerbate',
      ipa: '/ɪɡˈzæs.ə.beɪt/',
      vietnamese: 'Làm trầm trọng thêm, làm xấu đi tình hình',
      exampleEn: 'The prolonged drought has exacerbated the food shortage problem.',
      exampleVi: 'Đợt hạn hán kéo dài đã làm trầm trọng thêm vấn đề thiếu lương thực.',
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'w-5',
      category: 'words',
      english: 'paramount',
      ipa: '/ˈpær.ə.maʊnt/',
      vietnamese: 'Tối quan trọng, có ý nghĩa tối cao',
      exampleEn: 'Passenger safety is of paramount importance to the airline company.',
      exampleVi: 'Sự an toàn của hành khách là điều tối quan trọng đối với hãng hàng không.',
      interval: 7,
      boxLevel: 3,
      nextReviewDate: Date.now() + 3 * MS_PER_DAY,
      createdDate: Date.now()
    },
    {
      id: 'w-6',
      category: 'words',
      english: 'resilient',
      ipa: '/rɪˈzɪl.jənt/',
      vietnamese: 'Kiên cường, có khả năng phục hồi nhanh sau khó khăn',
      exampleEn: 'Local communities proved remarkably resilient after the natural disaster.',
      exampleVi: 'Cộng đồng địa phương đã tỏ ra kiên cường đáng kinh ngạc sau thảm họa thiên nhiên.',
      interval: 14,
      boxLevel: 4,
      nextReviewDate: Date.now() + 10 * MS_PER_DAY,
      createdDate: Date.now()
    },

    // --- COLLOCATIONS ---
    {
      id: 'c-1',
      category: 'collocations',
      english: 'cast light on',
      ipa: '/kɑːst laɪt ɒn/',
      vietnamese: 'Làm sáng tỏ, làm rõ một vấn đề',
      exampleEn: 'Recent scientific findings have cast new light on human evolution.',
      exampleVi: 'Những phát hiện khoa học gần đây đã làm sáng tỏ thêm về sự tiến hóa của loài người.',
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'c-2',
      category: 'collocations',
      english: 'strike a balance',
      ipa: '/straɪk ə ˈbæl.əns/',
      vietnamese: 'Tạo lập sự cân bằng, dung hòa giữa hai yếu tố',
      exampleEn: 'It can be difficult to strike a balance between career and family life.',
      exampleVi: 'Có thể rất khó để dung hòa giữa sự nghiệp và cuộc sống gia đình.',
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'c-3',
      category: 'collocations',
      english: 'pose a threat to',
      ipa: '/pəʊz ə θret tuː/',
      vietnamese: 'Gây ra mối đe dọa / nguy cơ cho...',
      exampleEn: 'Deforestation poses a severe threat to global biodiversity.',
      exampleVi: 'Nạn phá rừng gây ra mối đe dọa nghiêm trọng cho đa dạng sinh học toàn cầu.',
      interval: 4,
      boxLevel: 2,
      nextReviewDate: Date.now() - 1000,
      createdDate: Date.now()
    },
    {
      id: 'c-4',
      category: 'collocations',
      english: 'play a crucial role in',
      ipa: '/pleɪ ə ˈkruː.ʃəl rəʊl ɪn/',
      vietnamese: 'Đóng một vai trò tối quan trọng trong việc gì',
      exampleEn: 'Higher education plays a crucial role in economic development.',
      exampleVi: 'Giáo dục đại học đóng vai trò then chốt trong phát triển kinh tế.',
      interval: 7,
      boxLevel: 3,
      nextReviewDate: Date.now() + 2 * MS_PER_DAY,
      createdDate: Date.now()
    },
    {
      id: 'c-5',
      category: 'collocations',
      english: 'bridge the gap',
      ipa: '/brɪdʒ ðə ɡæp/',
      vietnamese: 'Thu hẹp khoảng cách (về thu nhập, nhận thức, thế hệ)',
      exampleEn: 'Government scholarships aim to bridge the gap between rich and poor students.',
      exampleVi: 'Học bổng chính phủ nhằm thu hẹp khoảng cách giữa học sinh khá giả và nghèo khó.',
      interval: 1,
      boxLevel: 1,
      nextReviewDate: Date.now(),
      createdDate: Date.now()
    },
    {
      id: 'c-6',
      category: 'collocations',
      english: 'have a profound impact on',
      ipa: '/hæv ə prəˈfaʊnd ˈɪm.pækt ɒn/',
      vietnamese: 'Có tác động / ảnh hưởng sâu sắc tới',
      exampleEn: 'Digital technology has had a profound impact on how people communicate.',
      exampleVi: 'Công nghệ kỹ thuật số đã có tác động sâu sắc đến cách con người giao tiếp.',
      interval: 14,
      boxLevel: 4,
      nextReviewDate: Date.now() + 12 * MS_PER_DAY,
      createdDate: Date.now()
    }
  ];

  // --- STATE ---
  const state = {
    cards: [],
    selectedCategory: null, // 'words' | 'collocations'
    currentFilter: 'all',   // 'all' | 'due' | '1' | '4' | '7' | '14'
    studyMode: 'flip',      // 'flip' | 'type'
    currentIndex: 0,
    isFlipped: false,
    filteredCards: [],
    typingState: {
      hintRevealedCount: 0,
      hasSubmitted: false
    }
  };

  // --- DOM ELEMENTS ---
  const el = {
    selectionOverlay: document.getElementById('selection-overlay'),
    btnSelectWords: document.getElementById('btn-select-words'),
    btnSelectCollocations: document.getElementById('btn-select-collocations'),
    wordsPreviewCount: document.getElementById('words-preview-count'),
    collocationsPreviewCount: document.getElementById('collocations-preview-count'),
    
    // Header
    btnChangeCategory: document.getElementById('btn-change-category'),
    currentCatName: document.getElementById('current-cat-name'),
    spacedDueBadge: document.getElementById('spaced-due-badge'),
    dueCountText: document.getElementById('due-count-text'),
    modeFlipBtn: document.getElementById('mode-flip-btn'),
    modeTypeBtn: document.getElementById('mode-type-btn'),
    btnOpenList: document.getElementById('btn-open-list'),
    btnAddCard: document.getElementById('btn-add-card'),
    btnToggleTheme: document.getElementById('btn-toggle-theme'),

    // Interval Filter
    intervalChips: document.querySelectorAll('.interval-chip'),
    countAll: document.getElementById('count-all'),
    countDue: document.getElementById('count-due'),
    count1: document.getElementById('count-1'),
    count4: document.getElementById('count-4'),
    count7: document.getElementById('count-7'),
    count14: document.getElementById('count-14'),

    // Study Area
    studyArea: document.getElementById('study-area'),
    studyProgressFill: document.getElementById('study-progress-fill'),
    cardPositionText: document.getElementById('card-position-text'),
    currentBoxTag: document.getElementById('current-box-tag'),
    currentBoxText: document.getElementById('current-box-text'),

    // Flip Card Scene
    cardScene: document.getElementById('card-scene'),
    flashcardElement: document.getElementById('flashcard-element'),
    frontTypeChip: document.getElementById('front-type-chip'),
    frontVietnamese: document.getElementById('front-vietnamese'),
    frontContextHint: document.getElementById('front-context-hint'),
    backTypeChip: document.getElementById('back-type-chip'),
    backEnglish: document.getElementById('back-english'),
    backIpa: document.getElementById('back-ipa'),
    backMeaning: document.getElementById('back-meaning'),
    backExampleWrapper: document.getElementById('back-example-wrapper'),
    backExampleEn: document.getElementById('back-example-en'),
    backExampleVi: document.getElementById('back-example-vi'),
    backNextReviewInfo: document.getElementById('back-next-review-info'),
    btnAudioSpeak: document.getElementById('btn-audio-speak'),

    // Typing Interactive
    typeInteractivePanel: document.getElementById('type-interactive-panel'),
    typeBadgeCategory: document.getElementById('type-badge-category'),
    typePromptMeaning: document.getElementById('type-prompt-meaning'),
    typeClozeHint: document.getElementById('type-cloze-hint'),
    typeForm: document.getElementById('type-form'),
    userTypedInput: document.getElementById('user-typed-input'),
    btnSubmitAnswer: document.getElementById('btn-submit-answer'),
    typeFeedbackBanner: document.getElementById('type-feedback-banner'),
    feedbackIcon: document.getElementById('feedback-icon'),
    feedbackStatusText: document.getElementById('feedback-status-text'),
    feedbackCorrectWord: document.getElementById('feedback-correct-word'),
    btnAudioType: document.getElementById('btn-audio-type'),
    btnHintLetter: document.getElementById('btn-hint-letter'),
    btnRevealSolution: document.getElementById('btn-reveal-solution'),

    // Controls
    controlsToolbar: document.getElementById('controls-toolbar'),
    btnPrevCard: document.getElementById('btn-prev-card'),
    btnNextCard: document.getElementById('btn-next-card'),
    btnRateAgain: document.getElementById('btn-rate-again'),
    btnRateGood: document.getElementById('btn-rate-good'),
    btnAdvanceIntervalLabel: document.getElementById('btn-advance-interval-label'),

    // Empty state
    emptyStateView: document.getElementById('empty-state-view'),
    emptyDescText: document.getElementById('empty-desc-text'),
    btnResetFilter: document.getElementById('btn-reset-filter'),
    btnEmptyAdd: document.getElementById('btn-empty-add'),

    // Modals
    modalCardForm: document.getElementById('modal-card-form'),
    modalCardTitle: document.getElementById('modal-card-title'),
    cardEditorForm: document.getElementById('card-editor-form'),
    editCardId: document.getElementById('edit-card-id'),
    cardInputCategory: document.getElementById('card-input-category'),
    cardInputEnglish: document.getElementById('card-input-english'),
    cardInputIpa: document.getElementById('card-input-ipa'),
    cardInputVietnamese: document.getElementById('card-input-vietnamese'),
    cardInputExampleEn: document.getElementById('card-input-example-en'),
    cardInputExampleVi: document.getElementById('card-input-example-vi'),
    cardInputInterval: document.getElementById('card-input-interval'),
    btnCloseCardModal: document.getElementById('btn-close-card-modal'),
    btnCancelCardModal: document.getElementById('btn-cancel-card-modal'),

    modalManageCards: document.getElementById('modal-manage-cards'),
    btnCloseManageModal: document.getElementById('btn-close-manage-modal'),
    btnCloseManageBottom: document.getElementById('btn-close-manage-bottom'),
    manageSearchInput: document.getElementById('manage-search-input'),
    manageTableBody: document.getElementById('manage-table-body'),
    manageTotalStatus: document.getElementById('manage-total-status'),
    btnExportJson: document.getElementById('btn-export-json'),
    fileImportJson: document.getElementById('file-import-json'),
    btnResetDefaultData: document.getElementById('btn-reset-default-data'),

    toastContainer: document.getElementById('toast-container')
  };

  // --- STORAGE HELPERS ---
  const STORAGE_KEY = 'minimal_flashcards_data_v1';
  const PREF_KEY = 'minimal_flashcards_pref_v1';

  function loadCardsFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Lỗi đọc dữ liệu từ localStorage, sử dụng dữ liệu mặc định', e);
    }
    saveCardsToStorage(DEFAULT_CARDS);
    return JSON.parse(JSON.stringify(DEFAULT_CARDS));
  }

  function saveCardsToStorage(cards) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    } catch (e) {
      console.error('Không thể lưu vào localStorage', e);
      showToast('Bộ nhớ trình duyệt đầy hoặc không thể lưu');
    }
  }

  function loadUserPreferences() {
    try {
      const pref = localStorage.getItem(PREF_KEY);
      if (pref) return JSON.parse(pref);
    } catch (e) {}
    return { category: null, theme: 'light', studyMode: 'flip' };
  }

  function saveUserPreferences(prefs) {
    try {
      const current = loadUserPreferences();
      const updated = { ...current, ...prefs };
      localStorage.setItem(PREF_KEY, JSON.stringify(updated));
    } catch (e) {}
  }

  // --- TOAST NOTIFICATION ---
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    el.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2400);
  }

  // --- SOUND / TTS SYNTHESIS ---
  function speakEnglish(text) {
    if (!('speechSynthesis' in window)) {
      showToast('Trình duyệt không hỗ trợ phát âm TTS');
      return;
    }
    window.speechSynthesis.cancel(); // Stop any pending speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    
    // Choose high quality English voice if available
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (enVoice) utterance.voice = enVoice;

    window.speechSynthesis.speak(utterance);
  }

  // --- INITIALIZATION ---
  function init() {
    state.cards = loadCardsFromStorage();
    const prefs = loadUserPreferences();

    // Theme setup
    if (prefs.theme === 'dark') {
      document.body.classList.add('dark-mode');
    }

    // Study mode setup
    if (prefs.studyMode === 'type') {
      setStudyMode('type', false);
    } else {
      setStudyMode('flip', false);
    }

    updateCategoryCountsPreview();

    // Check if user already picked a category
    if (prefs.category && (prefs.category === 'words' || prefs.category === 'collocations')) {
      selectCategory(prefs.category, false);
      el.selectionOverlay.style.display = 'none';
    } else {
      // First visit: show selection overlay
      el.selectionOverlay.style.display = 'flex';
    }

    bindEvents();
  }

  // --- CATEGORY COUNTS PREVIEW ---
  function updateCategoryCountsPreview() {
    const wordsCount = state.cards.filter(c => c.category === 'words').length;
    const collocationsCount = state.cards.filter(c => c.category === 'collocations').length;
    el.wordsPreviewCount.textContent = `${wordsCount} từ`;
    el.collocationsPreviewCount.textContent = `${collocationsCount} cụm`;
  }

  // --- CATEGORY SELECTION ---
  function selectCategory(categoryKey, savePref = true) {
    state.selectedCategory = categoryKey;
    el.selectionOverlay.style.display = 'none';

    if (categoryKey === 'words') {
      el.currentCatName.textContent = 'Words';
    } else {
      el.currentCatName.textContent = 'Collocations';
    }

    if (savePref) {
      saveUserPreferences({ category: categoryKey });
    }

    state.currentFilter = 'all';
    state.currentIndex = 0;
    updateIntervalNavChips();
    filterAndRenderCards();
  }

  // --- FILTERING CARDS ---
  function getFilteredCards() {
    if (!state.selectedCategory) return [];

    const now = Date.now();
    let list = state.cards.filter(c => c.category === state.selectedCategory);

    if (state.currentFilter === 'due') {
      list = list.filter(c => !c.nextReviewDate || c.nextReviewDate <= now);
    } else if (['1', '4', '7', '14'].includes(state.currentFilter)) {
      const intVal = parseInt(state.currentFilter, 10);
      list = list.filter(c => c.interval === intVal);
    }

    return list;
  }

  function updateIntervalBadgeCounts() {
    if (!state.selectedCategory) return;
    const now = Date.now();
    const catCards = state.cards.filter(c => c.category === state.selectedCategory);

    const countAll = catCards.length;
    const countDue = catCards.filter(c => !c.nextReviewDate || c.nextReviewDate <= now).length;
    const count1 = catCards.filter(c => c.interval === 1).length;
    const count4 = catCards.filter(c => c.interval === 4).length;
    const count7 = catCards.filter(c => c.interval === 7).length;
    const count14 = catCards.filter(c => c.interval === 14).length;

    el.countAll.textContent = countAll;
    el.countDue.textContent = countDue;
    el.count1.textContent = count1;
    el.count4.textContent = count4;
    el.count7.textContent = count7;
    el.count14.textContent = count14;

    el.dueCountText.textContent = `${countDue} cần ôn`;
    if (countDue > 0) {
      el.spacedDueBadge.style.color = 'var(--status-danger)';
    } else {
      el.spacedDueBadge.style.color = 'var(--text-secondary)';
    }
  }

  function updateIntervalNavChips() {
    el.intervalChips.forEach(chip => {
      if (chip.dataset.filter === state.currentFilter) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  }

  function filterAndRenderCards() {
    state.filteredCards = getFilteredCards();
    updateIntervalBadgeCounts();

    if (state.currentIndex >= state.filteredCards.length) {
      state.currentIndex = Math.max(0, state.filteredCards.length - 1);
    }

    renderCurrentCard();
  }

  // --- RENDER CURRENT CARD ---
  function renderCurrentCard() {
    const list = state.filteredCards;
    const total = list.length;

    if (total === 0) {
      // Show Empty state
      el.cardScene.style.display = 'none';
      el.typeInteractivePanel.style.display = 'none';
      el.controlsToolbar.style.display = 'none';
      el.emptyStateView.style.display = 'block';
      el.studyProgressFill.style.width = '0%';
      el.cardPositionText.textContent = '0 / 0';
      el.currentBoxTag.style.display = 'none';

      if (state.currentFilter === 'due') {
        el.emptyDescText.textContent = 'Tuyệt vời! Bạn đã hoàn thành toàn bộ thẻ đến hạn hôm nay. Hãy chọn "Tất cả" để ôn luyện thêm.';
      } else {
        el.emptyDescText.textContent = 'Chưa có thẻ nào trong bộ lọc này. Bạn có thể thêm thẻ mới bất cứ lúc nào!';
      }
      return;
    }

    el.emptyStateView.style.display = 'none';
    el.controlsToolbar.style.display = 'flex';

    const card = list[state.currentIndex];
    const progressPercent = ((state.currentIndex + 1) / total) * 100;
    el.studyProgressFill.style.width = `${progressPercent}%`;
    el.cardPositionText.textContent = `Thẻ ${state.currentIndex + 1} / ${total}`;

    // Box Level Info
    el.currentBoxTag.style.display = 'inline-flex';
    el.currentBoxText.textContent = `Hộp ${card.interval} ngày`;

    // Next advance interval label
    const nextInterval = getNextInterval(card.interval);
    el.btnAdvanceIntervalLabel.textContent = `+${nextInterval} ngày`;

    // Render in Flip Mode
    renderFlipCard(card);

    // Render in Typing Mode
    renderTypeMode(card);

    // Toggle views based on active study mode
    if (state.studyMode === 'flip') {
      el.cardScene.style.display = 'block';
      el.typeInteractivePanel.style.display = 'none';
    } else {
      el.cardScene.style.display = 'none';
      el.typeInteractivePanel.style.display = 'block';
      setTimeout(() => el.userTypedInput.focus(), 80);
    }
  }

  function renderFlipCard(card) {
    // Reset flip state
    state.isFlipped = false;
    el.flashcardElement.classList.remove('is-flipped');

    const catLabel = card.category === 'words' ? 'Word' : 'Collocation';
    el.frontTypeChip.textContent = catLabel;
    el.backTypeChip.textContent = catLabel;

    // Front
    el.frontVietnamese.textContent = card.vietnamese || 'Chưa có nghĩa tiếng Việt';
    if (card.exampleVi) {
      el.frontContextHint.textContent = `Gợi ý ngữ cảnh: "${card.exampleVi}"`;
    } else {
      el.frontContextHint.textContent = '';
    }

    // Back
    el.backEnglish.textContent = card.english || '';
    el.backIpa.textContent = card.ipa ? card.ipa : '';
    el.backMeaning.textContent = card.vietnamese || '';

    if (card.exampleEn) {
      el.backExampleWrapper.style.display = 'block';
      el.backExampleEn.textContent = card.exampleEn;
      el.backExampleVi.textContent = card.exampleVi || '';
    } else {
      el.backExampleWrapper.style.display = 'none';
    }

    const nextDays = getNextInterval(card.interval);
    el.backNextReviewInfo.innerHTML = `Chu kỳ tiếp theo nếu nhớ: <strong>+${nextDays} ngày</strong> (Hộp ${nextDays}d)`;
  }

  function renderTypeMode(card) {
    state.typingState = {
      hintRevealedCount: 0,
      hasSubmitted: false
    };

    el.typeBadgeCategory.textContent = card.category === 'words' ? 'Word Quiz' : 'Collocation Quiz';
    el.typePromptMeaning.textContent = card.vietnamese || 'Chưa có định nghĩa';

    // Cloze hint if example exists
    if (card.exampleEn) {
      // Replace target word in example with blanks _______
      const regex = new RegExp(escapeRegExp(card.english), 'gi');
      const cloze = card.exampleEn.replace(regex, '_______');
      el.typeClozeHint.textContent = cloze;
      el.typeClozeHint.style.display = 'block';
    } else {
      el.typeClozeHint.style.display = 'none';
    }

    el.userTypedInput.value = '';
    el.typeFeedbackBanner.style.display = 'none';
    el.typeFeedbackBanner.className = 'feedback-banner';
    el.btnSubmitAnswer.textContent = 'Kiểm tra';
  }

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // --- INTERVAL CALCULATOR ---
  function getNextInterval(currentInterval) {
    const idx = INTERVAL_LEVELS.indexOf(currentInterval);
    if (idx === -1 || idx >= INTERVAL_LEVELS.length - 1) {
      return INTERVAL_LEVELS[INTERVAL_LEVELS.length - 1]; // Max 14 days
    }
    return INTERVAL_LEVELS[idx + 1];
  }

  // --- SPACED REPETITION ACTION ---
  function handleRateCard(success) {
    const list = state.filteredCards;
    if (list.length === 0) return;

    const currentCard = list[state.currentIndex];
    const originalCard = state.cards.find(c => c.id === currentCard.id);
    if (!originalCard) return;

    const now = Date.now();

    if (success) {
      // Advance to next interval (1 -> 4 -> 7 -> 14)
      const newInterval = getNextInterval(originalCard.interval);
      originalCard.interval = newInterval;
      originalCard.boxLevel = INTERVAL_LEVELS.indexOf(newInterval) + 1;
      originalCard.nextReviewDate = now + (newInterval * MS_PER_DAY);
      originalCard.lastReviewed = now;
      showToast(`✨ Đã nhớ! Thẻ chuyển sang hộp +${newInterval} ngày.`);
    } else {
      // Reset back to 1 day
      originalCard.interval = 1;
      originalCard.boxLevel = 1;
      originalCard.nextReviewDate = now + (1 * MS_PER_DAY);
      originalCard.lastReviewed = now;
      showToast(`🔄 Chưa thuộc. Thẻ được xếp lại vào hộp 1 ngày.`);
    }

    saveCardsToStorage(state.cards);

    // If currently filtered by 'due' or specific interval, the card may leave the filtered set
    if (state.currentFilter === 'due' || state.currentFilter === '1' || state.currentFilter === '4' || state.currentFilter === '7' || state.currentFilter === '14') {
      filterAndRenderCards();
    } else {
      // Move to next card
      nextCard();
      updateIntervalBadgeCounts();
    }
  }

  // --- TYPING CHECK LOGIC ---
  function checkTypedAnswer() {
    const list = state.filteredCards;
    if (list.length === 0) return;
    const card = list[state.currentIndex];

    // If already submitted once, pressing Enter moves to next or advances
    if (state.typingState.hasSubmitted) {
      handleRateCard(state.typingState.isCorrect);
      return;
    }

    const userInput = el.userTypedInput.value.trim();
    if (!userInput) {
      showToast('Hãy gõ câu trả lời của bạn trước khi kiểm tra');
      el.userTypedInput.focus();
      return;
    }

    const cleanUser = normalizeString(userInput);
    const cleanTarget = normalizeString(card.english);

    const isMatch = cleanUser === cleanTarget;
    state.typingState.hasSubmitted = true;
    state.typingState.isCorrect = isMatch;

    el.typeFeedbackBanner.style.display = 'flex';

    if (isMatch) {
      el.typeFeedbackBanner.className = 'feedback-banner correct';
      el.feedbackIcon.textContent = '✓';
      el.feedbackStatusText.textContent = 'Chính xác tuyệt đối!';
      el.feedbackCorrectWord.innerHTML = `Từ chuẩn: <span>${card.english}</span>`;
      el.btnSubmitAnswer.textContent = 'Tiếp tục ➔';
      speakEnglish(card.english);
    } else {
      el.typeFeedbackBanner.className = 'feedback-banner incorrect';
      el.feedbackIcon.textContent = '✕';
      el.feedbackStatusText.textContent = 'Chưa chính xác!';
      el.feedbackCorrectWord.innerHTML = `Đáp án đúng là: <span>${card.english}</span>`;
      el.btnSubmitAnswer.textContent = 'Tiếp tục ➔';
      speakEnglish(card.english);
    }
  }

  function normalizeString(str) {
    return str.toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function revealLetterHint() {
    const list = state.filteredCards;
    if (list.length === 0) return;
    const card = list[state.currentIndex];
    
    state.typingState.hintRevealedCount++;
    const sub = card.english.slice(0, state.typingState.hintRevealedCount);
    el.userTypedInput.value = sub;
    el.userTypedInput.focus();
    showToast(`Gợi ý: ${sub}...`);
  }

  function revealSolution() {
    const list = state.filteredCards;
    if (list.length === 0) return;
    const card = list[state.currentIndex];

    el.userTypedInput.value = card.english;
    checkTypedAnswer();
  }

  // --- NAVIGATION ---
  function prevCard() {
    if (state.filteredCards.length <= 1) return;
    state.currentIndex = (state.currentIndex - 1 + state.filteredCards.length) % state.filteredCards.length;
    renderCurrentCard();
  }

  function nextCard() {
    if (state.filteredCards.length <= 1) return;
    state.currentIndex = (state.currentIndex + 1) % state.filteredCards.length;
    renderCurrentCard();
  }

  function toggleFlipCard() {
    state.isFlipped = !state.isFlipped;
    if (state.isFlipped) {
      el.flashcardElement.classList.add('is-flipped');
      // Speak audio when flipped
      const card = state.filteredCards[state.currentIndex];
      if (card && card.english) {
        speakEnglish(card.english);
      }
    } else {
      el.flashcardElement.classList.remove('is-flipped');
    }
  }

  // --- STUDY MODE SWITCHER ---
  function setStudyMode(mode, save = true) {
    state.studyMode = mode;
    if (mode === 'flip') {
      el.modeFlipBtn.classList.add('active');
      el.modeTypeBtn.classList.remove('active');
    } else {
      el.modeTypeBtn.classList.add('active');
      el.modeFlipBtn.classList.remove('active');
    }
    if (save) {
      saveUserPreferences({ studyMode: mode });
    }
    renderCurrentCard();
  }

  // --- CARD CRUD & MODALS ---
  function openAddCardModal() {
    el.modalCardTitle.textContent = 'Thêm Flashcard Mới';
    el.editCardId.value = '';
    el.cardEditorForm.reset();
    el.cardInputCategory.value = state.selectedCategory || 'words';
    el.cardInputInterval.value = '1';
    el.modalCardForm.style.display = 'flex';
    setTimeout(() => el.cardInputEnglish.focus(), 100);
  }

  function openEditCardModal(cardId) {
    const card = state.cards.find(c => c.id === cardId);
    if (!card) return;

    el.modalCardTitle.textContent = 'Chỉnh Sửa Flashcard';
    el.editCardId.value = card.id;
    el.cardInputCategory.value = card.category;
    el.cardInputEnglish.value = card.english || '';
    el.cardInputIpa.value = card.ipa || '';
    el.cardInputVietnamese.value = card.vietnamese || '';
    el.cardInputExampleEn.value = card.exampleEn || '';
    el.cardInputExampleVi.value = card.exampleVi || '';
    el.cardInputInterval.value = card.interval ? String(card.interval) : '1';

    el.modalCardForm.style.display = 'flex';
  }

  function closeCardModal() {
    el.modalCardForm.style.display = 'none';
  }

  function handleSaveCardForm(e) {
    e.preventDefault();

    const id = el.editCardId.value;
    const category = el.cardInputCategory.value;
    const english = el.cardInputEnglish.value.trim();
    const ipa = el.cardInputIpa.value.trim();
    const vietnamese = el.cardInputVietnamese.value.trim();
    const exampleEn = el.cardInputExampleEn.value.trim();
    const exampleVi = el.cardInputExampleVi.value.trim();
    const interval = parseInt(el.cardInputInterval.value, 10) || 1;

    if (!english || !vietnamese) {
      showToast('Vui lòng điền đủ từ tiếng Anh và nghĩa tiếng Việt');
      return;
    }

    if (id) {
      // Edit existing
      const existing = state.cards.find(c => c.id === id);
      if (existing) {
        existing.category = category;
        existing.english = english;
        existing.ipa = ipa;
        existing.vietnamese = vietnamese;
        existing.exampleEn = exampleEn;
        existing.exampleVi = exampleVi;
        existing.interval = interval;
        existing.boxLevel = INTERVAL_LEVELS.indexOf(interval) + 1;
        showToast('Đã cập nhật flashcard');
      }
    } else {
      // Create new
      const newCard = {
        id: 'card-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        category,
        english,
        ipa,
        vietnamese,
        exampleEn,
        exampleVi,
        interval,
        boxLevel: INTERVAL_LEVELS.indexOf(interval) + 1,
        nextReviewDate: Date.now(),
        createdDate: Date.now()
      };
      state.cards.unshift(newCard);
      showToast('Đã thêm thẻ flashcard mới');
    }

    saveCardsToStorage(state.cards);
    closeCardModal();
    updateCategoryCountsPreview();
    filterAndRenderCards();
    if (el.modalManageCards.style.display === 'flex') {
      renderManageTable();
    }
  }

  function deleteCard(cardId) {
    if (!confirm('Bạn có chắc chắn muốn xóa flashcard này không?')) return;
    state.cards = state.cards.filter(c => c.id !== cardId);
    saveCardsToStorage(state.cards);
    showToast('Đã xóa flashcard');
    updateCategoryCountsPreview();
    filterAndRenderCards();
    renderManageTable();
  }

  // --- MANAGE CARDS MODAL ---
  function openManageModal() {
    el.modalManageCards.style.display = 'flex';
    el.manageSearchInput.value = '';
    renderManageTable();
  }

  function closeManageModal() {
    el.modalManageCards.style.display = 'none';
  }

  function renderManageTable() {
    const q = el.manageSearchInput.value.toLowerCase().trim();
    let list = state.cards;

    if (q) {
      list = list.filter(c =>
        (c.english && c.english.toLowerCase().includes(q)) ||
        (c.vietnamese && c.vietnamese.toLowerCase().includes(q)) ||
        (c.exampleEn && c.exampleEn.toLowerCase().includes(q))
      );
    }

    el.manageTotalStatus.textContent = `Tổng cộng: ${list.length} thẻ`;

    if (list.length === 0) {
      el.manageTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 24px; color: var(--text-tertiary);">Không tìm thấy flashcard nào phù hợp.</td></tr>`;
      return;
    }

    const now = Date.now();
    el.manageTableBody.innerHTML = list.map(c => {
      const isDue = !c.nextReviewDate || c.nextReviewDate <= now;
      const dueLabel = isDue
        ? '<span style="color:var(--status-danger); font-weight:600;">Cần ôn ngay</span>'
        : `Còn ${Math.ceil((c.nextReviewDate - now) / MS_PER_DAY)} ngày`;

      return `
        <tr>
          <td><span class="card-type-chip">${c.category === 'words' ? 'Word' : 'Colloc'}</span></td>
          <td><strong>${c.english}</strong> ${c.ipa ? `<span style="font-size:0.8rem; color:var(--text-tertiary);">${c.ipa}</span>` : ''}</td>
          <td>${c.vietnamese}</td>
          <td><span class="pill-dot dot-${c.interval}"></span> ${c.interval} ngày</td>
          <td>${dueLabel}</td>
          <td class="text-right">
            <button type="button" class="action-btn-sm" title="Sửa" onclick="window.editCardHandler('${c.id}')">✏️</button>
            <button type="button" class="action-btn-sm delete" title="Xóa" onclick="window.deleteCardHandler('${c.id}')">🗑️</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Expose global handlers for dynamic onclick
  window.editCardHandler = (id) => openEditCardModal(id);
  window.deleteCardHandler = (id) => deleteCard(id);

  // --- EXPORT / IMPORT JSON ---
  function exportCardsJson() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state.cards, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `flashcards_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Đã tải xuống file sao lưu JSON');
  }

  function importCardsJson(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported) && imported.length > 0) {
          state.cards = imported;
          saveCardsToStorage(state.cards);
          showToast(`Nhập thành công ${imported.length} thẻ flashcard!`);
          updateCategoryCountsPreview();
          filterAndRenderCards();
          renderManageTable();
        } else {
          showToast('File JSON không hợp lệ hoặc danh sách rỗng');
        }
      } catch (err) {
        showToast('Lỗi đọc file JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  function resetToDefaultData() {
    if (!confirm('Khôi phục lại danh mục flashcard mẫu ban đầu? Toàn bộ thẻ tự tạo có thể bị thay thế.')) return;
    state.cards = JSON.parse(JSON.stringify(DEFAULT_CARDS));
    saveCardsToStorage(state.cards);
    showToast('Đã khôi phục dữ liệu mẫu ban đầu');
    updateCategoryCountsPreview();
    filterAndRenderCards();
    renderManageTable();
  }

  // --- THEME TOGGLE ---
  function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    saveUserPreferences({ theme: isDark ? 'dark' : 'light' });
    showToast(isDark ? 'Giao diện trung tính tối' : 'Giao diện trung tính sáng');
  }

  // --- EVENT BINDINGS ---
  function bindEvents() {
    // Category Selection buttons
    el.btnSelectWords.addEventListener('click', () => selectCategory('words'));
    el.btnSelectCollocations.addEventListener('click', () => selectCategory('collocations'));
    el.btnChangeCategory.addEventListener('click', () => {
      updateCategoryCountsPreview();
      el.selectionOverlay.style.display = 'flex';
    });

    // Theme
    el.btnToggleTheme.addEventListener('click', toggleTheme);

    // Study Modes
    el.modeFlipBtn.addEventListener('click', () => setStudyMode('flip'));
    el.modeTypeBtn.addEventListener('click', () => setStudyMode('type'));

    // Interval Filter Chips
    el.intervalChips.forEach(chip => {
      chip.addEventListener('click', () => {
        state.currentFilter = chip.dataset.filter;
        updateIntervalNavChips();
        state.currentIndex = 0;
        filterAndRenderCards();
      });
    });

    // Flip Card Trigger
    el.flashcardElement.addEventListener('click', (e) => {
      // Don't flip if clicking TTS button
      if (e.target.closest('#btn-audio-speak')) return;
      toggleFlipCard();
    });

    // TTS Buttons
    el.btnAudioSpeak.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = state.filteredCards[state.currentIndex];
      if (card && card.english) speakEnglish(card.english);
    });

    el.btnAudioType.addEventListener('click', () => {
      const card = state.filteredCards[state.currentIndex];
      if (card && card.english) speakEnglish(card.english);
    });

    // Typing Mode Form & Actions
    el.typeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      checkTypedAnswer();
    });
    el.btnSubmitAnswer.addEventListener('click', () => {
      checkTypedAnswer();
    });
    el.btnHintLetter.addEventListener('click', revealLetterHint);
    el.btnRevealSolution.addEventListener('click', revealSolution);

    // Controls Toolbar
    el.btnPrevCard.addEventListener('click', prevCard);
    el.btnNextCard.addEventListener('click', nextCard);

    // Rating Spaced Repetition Buttons
    el.btnRateAgain.addEventListener('click', () => handleRateCard(false));
    el.btnRateGood.addEventListener('click', () => handleRateCard(true));

    // Empty state buttons
    el.btnResetFilter.addEventListener('click', () => {
      state.currentFilter = 'all';
      updateIntervalNavChips();
      filterAndRenderCards();
    });
    el.btnEmptyAdd.addEventListener('click', openAddCardModal);

    // Add / Edit Modal
    el.btnAddCard.addEventListener('click', openAddCardModal);
    el.btnCloseCardModal.addEventListener('click', closeCardModal);
    el.btnCancelCardModal.addEventListener('click', closeCardModal);
    el.cardEditorForm.addEventListener('submit', handleSaveCardForm);

    // Manage Modal
    el.btnOpenList.addEventListener('click', openManageModal);
    el.btnCloseManageModal.addEventListener('click', closeManageModal);
    el.btnCloseManageBottom.addEventListener('click', closeManageModal);
    el.manageSearchInput.addEventListener('input', renderManageTable);
    el.btnExportJson.addEventListener('click', exportCardsJson);
    el.fileImportJson.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        importCardsJson(e.target.files[0]);
      }
    });
    el.btnResetDefaultData.addEventListener('click', resetToDefaultData);

    // Close modals on clicking backdrop
    [el.modalCardForm, el.modalManageCards].forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.style.display = 'none';
      });
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      // If typing in input or textarea, let default happen (except Enter in single input)
      const isInputActive = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);

      if (e.key === 'Escape') {
        el.modalCardForm.style.display = 'none';
        el.modalManageCards.style.display = 'none';
        return;
      }

      if (isInputActive) {
        // If user is in typing quiz input, Enter submits
        if (document.activeElement === el.userTypedInput && e.key === 'Enter') {
          e.preventDefault();
          checkTypedAnswer();
        }
        return;
      }

      // Hotkeys when browsing cards
      if (e.code === 'Space') {
        e.preventDefault();
        toggleFlipCard();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevCard();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextCard();
      } else if (e.key === '1') {
        e.preventDefault();
        handleRateCard(false);
      } else if (e.key === '2') {
        e.preventDefault();
        handleRateCard(true);
      }
    });
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
