/**
 * IELTS SPEAKING AI COACH MODULE
 * 1. Dịch câu đời thường (Việt -> Anh giao tiếp tự nhiên)
 * 2. Mỗi ngày 1 câu hỏi IELTS Speaking (Part 1, 2, 3) có gợi ý và chấm chữa chi tiết
 * Sử dụng Google Gemini API (trình duyệt trực tiếp, lưu API key tại localStorage)
 */

(function () {
  'use strict';

  // --- QUESTION BANK (NGÂN HÀNG CÂU HỎI IELTS SPEAKING) ---
  const QUESTION_BANK = {
    // PART 1
    1: {
      classic: [
        {
          id: 'p1-c-01',
          topic: 'Work & Study',
          question: 'What do you like most about your current job or study?',
          vietnamese: 'Bạn thích điều gì nhất ở công việc hoặc việc học tập hiện tại của mình?',
          suggestedWords: '30 - 50 từ (2 - 4 câu ngắn)'
        },
        {
          id: 'p1-c-02',
          topic: 'Hometown',
          question: 'What is your hometown like? Do you enjoy living there?',
          vietnamese: 'Quê hương của bạn như thế nào? Bạn có thích sống ở đó không?',
          suggestedWords: '30 - 50 từ (2 - 4 câu ngắn)'
        },
        {
          id: 'p1-c-03',
          topic: 'Daily Routine',
          question: 'What is your favourite part of the day, and why?',
          vietnamese: 'Khoảng thời gian nào trong ngày bạn yêu thích nhất, và tại sao?',
          suggestedWords: '30 - 50 từ (2 - 4 câu ngắn)'
        },
        {
          id: 'p1-c-04',
          topic: 'Free Time & Hobbies',
          question: 'What do you usually like to do when you have free time on weekends?',
          vietnamese: 'Bạn thường thích làm gì khi có thời gian rảnh vào cuối tuần?',
          suggestedWords: '30 - 50 từ (2 - 4 câu ngắn)'
        },
        {
          id: 'p1-c-05',
          topic: 'Music',
          question: 'What kind of music do you like to listen to when you want to relax?',
          vietnamese: 'Bạn thích nghe thể loại nhạc nào khi muốn thư giãn?',
          suggestedWords: '30 - 50 từ (2 - 4 câu ngắn)'
        },
        {
          id: 'p1-c-06',
          topic: 'Food & Cooking',
          question: 'Do you prefer eating at home or eating out at restaurants? Why?',
          vietnamese: 'Bạn thích ăn ở nhà hay ăn ngoài hàng quán hơn? Vì sao?',
          suggestedWords: '30 - 50 từ (2 - 4 câu ngắn)'
        },
        {
          id: 'p1-c-07',
          topic: 'Weather',
          question: 'What kind of weather do you like best, and what do you do on such days?',
          vietnamese: 'Kiểu thời tiết nào bạn thích nhất, và bạn thường làm gì vào những ngày đó?',
          suggestedWords: '30 - 50 từ (2 - 4 câu ngắn)'
        },
        {
          id: 'p1-c-08',
          topic: 'Friends',
          question: 'Do you prefer spending time with a few close friends or a large group?',
          vietnamese: 'Bạn thích dành thời gian bên vài người bạn thân hay trong một nhóm đông người hơn?',
          suggestedWords: '30 - 50 từ (2 - 4 câu ngắn)'
        },
        {
          id: 'p1-c-09',
          topic: 'Sports & Exercise',
          question: 'How often do you do physical exercise or play sports?',
          vietnamese: 'Bạn có thường xuyên tập thể dục hoặc chơi thể thao không?',
          suggestedWords: '30 - 50 từ (2 - 4 câu ngắn)'
        },
        {
          id: 'p1-c-10',
          topic: 'Travel',
          question: 'Do you enjoy travelling to new places? Where would you like to visit next?',
          vietnamese: 'Bạn có thích du lịch đến những nơi mới lạ không? Bạn muốn đi đâu tiếp theo?',
          suggestedWords: '30 - 50 từ (2 - 4 câu ngắn)'
        }
      ],
      forecast: [
        {
          id: 'p1-f-01',
          topic: 'Robots & AI',
          question: 'Do you think artificial intelligence and robots are helpful in your daily life?',
          vietnamese: 'Bạn có nghĩ trí tuệ nhân tạo (AI) và robot hữu ích trong cuộc sống hàng ngày không?',
          suggestedWords: '30 - 50 từ (2 - 4 câu ngắn)'
        },
        {
          id: 'p1-f-02',
          topic: 'Chatting Online',
          question: 'Do you prefer chatting with your friends online or talking face-to-face?',
          vietnamese: 'Bạn thích nhắn tin với bạn bè qua mạng hay trò chuyện trực tiếp mặt đối mặt?',
          suggestedWords: '30 - 50 từ (2 - 4 câu ngắn)'
        },
        {
          id: 'p1-f-03',
          topic: 'Relaxing & Unwinding',
          question: 'What is your favourite way to unwind after a long, stressful day?',
          vietnamese: 'Cách yêu thích nhất của bạn để xả hơi sau một ngày dài căng thẳng là gì?',
          suggestedWords: '30 - 50 từ (2 - 4 câu ngắn)'
        },
        {
          id: 'p1-f-04',
          topic: 'Crowded Places',
          question: 'How do you feel when you have to be in crowded places like shopping malls or markets?',
          vietnamese: 'Bạn cảm thấy thế nào khi phải ở những nơi đông đúc như trung tâm thương mại hay chợ?',
          suggestedWords: '30 - 50 từ (2 - 4 câu ngắn)'
        },
        {
          id: 'p1-f-05',
          topic: 'Memory',
          question: 'Are you good at remembering people’s names or birthdays?',
          vietnamese: 'Bạn có giỏi nhớ tên người khác hoặc ngày sinh nhật không?',
          suggestedWords: '30 - 50 từ (2 - 4 câu ngắn)'
        },
        {
          id: 'p1-f-06',
          topic: 'Public Transportation',
          question: 'Do you often use public transport like buses or trains in your city?',
          vietnamese: 'Bạn có hay đi phương tiện công cộng như xe buýt hay tàu hỏa trong thành phố không?',
          suggestedWords: '30 - 50 từ (2 - 4 câu ngắn)'
        },
        {
          id: 'p1-f-07',
          topic: 'Plants & Flowers',
          question: 'Do you keep any indoor plants or flowers at home? Why or why not?',
          vietnamese: 'Bạn có trồng chậu cây hay hoa nào trong nhà không? Tại sao có hoặc không?',
          suggestedWords: '30 - 50 từ (2 - 4 câu ngắn)'
        },
        {
          id: 'p1-f-08',
          topic: 'Video Games',
          question: 'Did you play video games when you were younger? Do you still play now?',
          vietnamese: 'Hồi bé bạn có hay chơi game điện tử không? Bây giờ bạn còn chơi không?',
          suggestedWords: '30 - 50 từ (2 - 4 câu ngắn)'
        },
        {
          id: 'p1-f-09',
          topic: 'Science',
          question: 'Did you enjoy learning science subjects when you were in school?',
          vietnamese: 'Khi còn đi học, bạn có hứng thú với các môn khoa học tự nhiên không?',
          suggestedWords: '30 - 50 từ (2 - 4 câu ngắn)'
        },
        {
          id: 'p1-f-10',
          topic: 'Sharing Things',
          question: 'Do you like sharing your things, such as books or food, with other people?',
          vietnamese: 'Bạn có thích chia sẻ đồ đạc của mình, ví dụ sách vở hay đồ ăn, với người khác không?',
          suggestedWords: '30 - 50 từ (2 - 4 câu ngắn)'
        }
      ]
    },

    // PART 2 (CUE CARDS)
    2: {
      classic: [
        {
          id: 'p2-c-01',
          topic: 'Person You Admire',
          question: 'Describe a person who has greatly influenced or inspired you.',
          vietnamese: 'Miêu tả một người đã có ảnh hưởng lớn hoặc truyền cảm hứng cho bạn.',
          bullets: [
            'Who this person is',
            'How you know them',
            'What qualities or things they did that impressed you',
            'And explain why they influenced you so much.'
          ],
          suggestedWords: '100 - 150 từ (nói khoảng 1 - 2 phút)'
        },
        {
          id: 'p2-c-02',
          topic: 'Memorable Journey',
          question: 'Describe a memorable trip or journey you took in the past.',
          vietnamese: 'Miêu tả một chuyến đi hoặc chuyến du lịch đáng nhớ trong quá khứ của bạn.',
          bullets: [
            'Where you went',
            'Who you went with',
            'What you did during this trip',
            'And explain why this trip was so memorable for you.'
          ],
          suggestedWords: '100 - 150 từ (nói khoảng 1 - 2 phút)'
        },
        {
          id: 'p2-c-03',
          topic: 'Useful Skill',
          question: 'Describe a useful skill you learned that helps you in your daily life.',
          vietnamese: 'Miêu tả một kỹ năng hữu ích mà bạn đã học được giúp ích cho cuộc sống.',
          bullets: [
            'What the skill is',
            'How and when you learned it',
            'How difficult it was to learn',
            'And explain how this skill helps you now.'
          ],
          suggestedWords: '100 - 150 từ (nói khoảng 1 - 2 phút)'
        },
        {
          id: 'p2-c-04',
          topic: 'Important Decision',
          question: 'Describe an important decision you made in your life.',
          vietnamese: 'Miêu tả một quyết định quan trọng mà bạn từng đưa ra trong đời.',
          bullets: [
            'What the decision was',
            'When and why you made it',
            'Who helped or advised you',
            'And explain how this decision affected your life.'
          ],
          suggestedWords: '100 - 150 từ (nói khoảng 1 - 2 phút)'
        },
        {
          id: 'p2-c-05',
          topic: 'Relaxing Place',
          question: 'Describe a place where you often go when you want to relax.',
          vietnamese: 'Miêu tả một địa điểm bạn thường đến khi muốn thư giãn, nghỉ ngơi.',
          bullets: [
            'Where this place is',
            'What it looks like',
            'What you usually do there',
            'And explain why it helps you feel peaceful and relaxed.'
          ],
          suggestedWords: '100 - 150 từ (nói khoảng 1 - 2 phút)'
        }
      ],
      forecast: [
        {
          id: 'p2-f-01',
          topic: 'Good News',
          question: 'Describe a time when you received very good news from someone.',
          vietnamese: 'Miêu tả một lần bạn nhận được tin vui bất ngờ từ ai đó.',
          bullets: [
            'What the news was',
            'Who told you about it',
            'When and where you heard it',
            'And explain how you felt and reacted when hearing the news.'
          ],
          suggestedWords: '100 - 150 từ (nói khoảng 1 - 2 phút)'
        },
        {
          id: 'p2-f-02',
          topic: 'Challenge Overcome',
          question: 'Describe a difficult challenge or problem you managed to overcome recently.',
          vietnamese: 'Miêu tả một thử thách hoặc khó khăn mà bạn đã vượt qua gần đây.',
          bullets: [
            'What the challenge was',
            'When and why it happened',
            'How you dealt with it',
            'And explain what you learned from this experience.'
          ],
          suggestedWords: '100 - 150 từ (nói khoảng 1 - 2 phút)'
        },
        {
          id: 'p2-f-03',
          topic: 'Helpful App or Website',
          question: 'Describe a mobile app or website that you find very useful for learning or work.',
          vietnamese: 'Miêu tả một ứng dụng hoặc trang web bạn thấy rất hữu ích cho học tập hay công việc.',
          bullets: [
            'What app or website it is',
            'How often you use it',
            'What special features it has',
            'And explain why it is so beneficial to you.'
          ],
          suggestedWords: '100 - 150 từ (nói khoảng 1 - 2 phút)'
        },
        {
          id: 'p2-f-04',
          topic: 'Quiet Place',
          question: 'Describe a quiet and peaceful place you visited recently.',
          vietnamese: 'Miêu tả một nơi yên tĩnh và thanh bình mà bạn từng đến gần đây.',
          bullets: [
            'Where it was located',
            'When and why you went there',
            'What you did while you were there',
            'And explain why you found it so quiet and refreshing.'
          ],
          suggestedWords: '100 - 150 từ (nói khoảng 1 - 2 phút)'
        },
        {
          id: 'p2-f-05',
          topic: 'Enjoyable Celebration',
          question: 'Describe a party or celebration you attended that you really enjoyed.',
          vietnamese: 'Miêu tả một bữa tiệc hoặc dịp kỷ niệm mà bạn tham gia và rất thích.',
          bullets: [
            'What event was being celebrated',
            'Where it took place and who was there',
            'What people did during the event',
            'And explain why you enjoyed it so much.'
          ],
          suggestedWords: '100 - 150 từ (nói khoảng 1 - 2 phút)'
        }
      ]
    },

    // PART 3 (DISCUSSIONS)
    3: {
      classic: [
        {
          id: 'p3-c-01',
          topic: 'Decision Making',
          question: 'Why do you think some people find it very difficult to make important life decisions?',
          vietnamese: 'Tại sao một số người lại cảm thấy rất khó khăn khi đưa ra quyết định quan trọng trong đời?',
          suggestedWords: '40 - 70 từ (3 - 5 câu lập luận)'
        },
        {
          id: 'p3-c-02',
          topic: 'Technology & Free Time',
          question: 'How has modern technology changed the way people spend their leisure time?',
          vietnamese: 'Công nghệ hiện đại đã thay đổi cách mọi người dành thời gian rảnh như thế nào?',
          suggestedWords: '40 - 70 từ (3 - 5 câu lập luận)'
        },
        {
          id: 'p3-c-03',
          topic: 'Education & Practical Skills',
          question: 'Do you believe schools should focus more on teaching practical life skills rather than academic theories?',
          vietnamese: 'Bạn có tin rằng nhà trường nên tập trung dạy kỹ năng sống thực tế hơn là lý thuyết hàn lâm không?',
          suggestedWords: '40 - 70 từ (3 - 5 câu lập luận)'
        },
        {
          id: 'p3-c-04',
          topic: 'Travel & Culture',
          question: 'What are the main benefits of travelling to other countries for young people?',
          vietnamese: 'Lợi ích chính của việc du lịch sang các quốc gia khác đối với người trẻ là gì?',
          suggestedWords: '40 - 70 từ (3 - 5 câu lập luận)'
        }
      ],
      forecast: [
        {
          id: 'p3-f-01',
          topic: 'Future of Work & AI',
          question: 'In what ways do you think artificial intelligence will change the job market in the next ten years?',
          vietnamese: 'Trí tuệ nhân tạo (AI) sẽ thay đổi thị trường việc làm theo những hướng nào trong 10 năm tới?',
          suggestedWords: '40 - 70 từ (3 - 5 câu lập luận)'
        },
        {
          id: 'p3-f-02',
          topic: 'Modern Communication',
          question: 'Has communicating via text messages reduced the quality of personal relationships today?',
          vietnamese: 'Việc giao tiếp qua tin nhắn có làm giảm chất lượng các mối quan hệ cá nhân hiện nay không?',
          suggestedWords: '40 - 70 từ (3 - 5 câu lập luận)'
        },
        {
          id: 'p3-f-03',
          topic: 'Urban Living & Mental Health',
          question: 'Why do many people living in crowded big cities often feel lonely or stressed?',
          vietnamese: 'Tại sao nhiều người sống ở các thành phố lớn đông đúc lại hay cảm thấy cô đơn hoặc áp lực?',
          suggestedWords: '40 - 70 từ (3 - 5 câu lập luận)'
        },
        {
          id: 'p3-f-04',
          topic: 'Green Spaces',
          question: 'Why is it important for cities to have green parks and quiet natural spaces for citizens?',
          vietnamese: 'Tại sao việc các đô thị có công viên cây xanh và không gian thiên nhiên yên bình lại quan trọng?',
          suggestedWords: '40 - 70 từ (3 - 5 câu lập luận)'
        }
      ]
    }
  };

  // --- STORAGE KEYS ---
  const STORAGE_CONFIG_KEY = 'speaking_gemini_config_v1';
  const STORAGE_STATE_KEY = 'speaking_user_state_v1';
  const STORAGE_VOICE_STATS_KEY = 'speaking_voice_stats_v1';

  // --- DEFAULT CONFIG & STATE ---
  const DEFAULT_CONFIG = {
    apiKey: '',
    model: 'gemini-3.8-flash',
    targetLevel: 'b1',
    driveClientId: '',
    driveFolderName: 'IELTS Speaking Voice'
  };

  const DEFAULT_STATE = {
    translations: [], // { id, vi, result, timestamp }
    answers: [], // { id, dateStr, part, source, questionId, questionText, answer, feedback, timestamp }
    drafts: {}, // { [questionId]: string }
    skipOffsets: {}, // { '1_classic': 0, ... }
    lastPracticedDate: '',
    streakCount: 0
  };

  const DEFAULT_VOICE_STATS = {
    dailySpokenSec: {}, // { 'YYYY-MM-DD': number }
    streakCount: 0,
    lastSpokenDate: '',
    totalSpokenMinutes: 0
  };

  // State in memory
  let config = loadConfig();
  let state = loadState();
  let voiceStats = loadVoiceStats();
  let currentActiveTab = 'speak-now'; // 'speak-now' | 'voice-diary' | 'daily' | 'translate'
  let currentPart = 1; // 1 | 2 | 3
  let currentSource = 'classic'; // 'classic' | 'forecast'
  let currentQuestion = null;
  let isTranslating = false;
  let isSubmitting = false;
  let isLoadingHints = false;

  // Active speak-now attempt memory
  let lastAttempt1 = null; // for comparison when doing attempt 2
  let currentAttemptNum = 1; // 1 | 2

  // --- STORAGE HELPERS ---
  function loadConfig() {
    try {
      const raw = localStorage.getItem(STORAGE_CONFIG_KEY);
      let cfg = raw ? { ...DEFAULT_CONFIG, ...JSON.parse(raw) } : { ...DEFAULT_CONFIG };

      // Auto-load from config.js (window.APP_CONFIG)
      if (window.APP_CONFIG) {
        if (window.APP_CONFIG.GEMINI_API_KEY && typeof window.APP_CONFIG.GEMINI_API_KEY === 'string') {
          const hardcodedKey = window.APP_CONFIG.GEMINI_API_KEY.trim();
          if (hardcodedKey && !hardcodedKey.includes('...') && hardcodedKey !== 'AIzaSy...') {
            cfg.apiKey = hardcodedKey;
          }
        }
        if (window.APP_CONFIG.GEMINI_MODEL) {
          cfg.model = window.APP_CONFIG.GEMINI_MODEL;
        }
        if (window.APP_CONFIG.TARGET_LEVEL) {
          cfg.targetLevel = window.APP_CONFIG.TARGET_LEVEL;
        }
        if (window.APP_CONFIG.GOOGLE_DRIVE) {
          if (window.APP_CONFIG.GOOGLE_DRIVE.CLIENT_ID && !cfg.driveClientId) {
            cfg.driveClientId = window.APP_CONFIG.GOOGLE_DRIVE.CLIENT_ID;
          }
          if (window.APP_CONFIG.GOOGLE_DRIVE.FOLDER_NAME) {
            cfg.driveFolderName = window.APP_CONFIG.GOOGLE_DRIVE.FOLDER_NAME;
          }
        }
      }
      return cfg;
    } catch (e) {
      return { ...DEFAULT_CONFIG };
    }
  }

  function saveConfig(newConfig) {
    config = { ...config, ...newConfig };
    localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(config));
    updateAPIStatusBadge();
    updateDriveAuthStatusUI();
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_STATE_KEY);
      return raw ? { ...DEFAULT_STATE, ...JSON.parse(raw) } : { ...DEFAULT_STATE };
    } catch (e) {
      return { ...DEFAULT_STATE };
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_STATE_KEY, JSON.stringify(state));
  }

  function loadVoiceStats() {
    try {
      const raw = localStorage.getItem(STORAGE_VOICE_STATS_KEY);
      return raw ? { ...DEFAULT_VOICE_STATS, ...JSON.parse(raw) } : { ...DEFAULT_VOICE_STATS };
    } catch (e) {
      return { ...DEFAULT_VOICE_STATS };
    }
  }

  function saveVoiceStats() {
    localStorage.setItem(STORAGE_VOICE_STATS_KEY, JSON.stringify(voiceStats));
    renderVoiceStatsBar();
  }

  // --- SOUND / TTS SYNTHESIS ---
  function speak(text, rate = 0.88) {
    if (typeof window.speakEnglish === 'function') {
      window.speakEnglish(text);
      return;
    }
    if (!('speechSynthesis' in window)) {
      showToastMessage('Trình duyệt không hỗ trợ phát âm');
      return;
    }
    window.speechSynthesis.cancel();
    const clean = text.replace(/[\(\)\[\]\/\*\_]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  }

  function showToastMessage(msg) {
    if (typeof window.showToast === 'function') {
      window.showToast(msg);
    } else {
      alert(msg);
    }
  }

  // --- GEMINI API CALLER ---
  async function callGemini(promptText, systemPrompt = '') {
    if (!config.apiKey || !config.apiKey.trim()) {
      openAISettingsModal();
      throw new Error('Vui lòng dán Google Gemini API Key trong bảng Cài đặt trước khi dùng.');
    }

    const modelName = config.model || 'gemini-3.8-flash';
    const cleanKey = config.apiKey.trim();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelName)}:generateContent?key=${encodeURIComponent(cleanKey)}`;

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: promptText }]
        }
      ],
      generationConfig: {
        temperature: 0.6,
        responseMimeType: 'application/json'
      }
    };

    if (systemPrompt) {
      payload.systemInstruction = {
        parts: [{ text: systemPrompt }]
      };
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      let errMsg = `Lỗi HTTP ${response.status}`;
      try {
        const errJson = await response.json();
        errMsg = errJson.error?.message || errMsg;
      } catch (e) {
        errMsg = response.statusText || errMsg;
      }

      if (response.status === 400 || response.status === 403) {
        throw new Error(`API Key không hợp lệ hoặc chưa được kích hoạt (${response.status}): ${errMsg}`);
      }
      if (response.status === 429) {
        throw new Error('Đã chạm hạn mức gọi tạm thời (Rate Limit). Vui lòng đợi 30 giây rồi thử lại!');
      }
      throw new Error(`Lỗi Gemini API: ${errMsg}`);
    }

    const data = await response.json();
    const textOut = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textOut) {
      throw new Error('Không nhận được nội dung trả về từ Gemini. Vui lòng thử lại.');
    }

    try {
      return JSON.parse(textOut);
    } catch (parseError) {
      // Try stripping markdown blocks ```json ... ```
      const cleaned = textOut.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      return JSON.parse(cleaned);
    }
  }

  // --- AUDIO BASE64 HELPER ---
  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        const base64 = typeof result === 'string' && result.includes(',') ? result.split(',')[1] : result;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // --- GEMINI MULTIMODAL AUDIO CALLER ---
  async function callGeminiWithAudio(audioBlob, promptText, systemPrompt = '') {
    if (!config.apiKey || !config.apiKey.trim()) {
      openAISettingsModal();
      throw new Error('Vui lòng dán Google Gemini API Key trong bảng Cài đặt trước khi dùng.');
    }

    const modelName = config.model || 'gemini-3.8-flash';
    const cleanKey = config.apiKey.trim();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelName)}:generateContent?key=${encodeURIComponent(cleanKey)}`;

    const base64Audio = await blobToBase64(audioBlob);
    const mimeType = (audioBlob.type || 'audio/webm').split(';')[0];

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Audio
              }
            },
            {
              text: promptText
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.4,
        responseMimeType: 'application/json'
      }
    };

    if (systemPrompt) {
      payload.systemInstruction = {
        parts: [{ text: systemPrompt }]
      };
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      let errMsg = `Lỗi HTTP ${response.status}`;
      try {
        const errJson = await response.json();
        errMsg = errJson.error?.message || errMsg;
      } catch (e) {
        errMsg = response.statusText || errMsg;
      }

      if (response.status === 400 || response.status === 403) {
        throw new Error(`API Key không hợp lệ hoặc model không hỗ trợ định dạng âm thanh: ${errMsg}`);
      }
      if (response.status === 429) {
        throw new Error('Đã chạm hạn mức gọi tạm thời (Rate Limit). Vui lòng đợi 30 giây rồi thử lại!');
      }
      throw new Error(`Lỗi Gemini API: ${errMsg}`);
    }

    const data = await response.json();
    const textOut = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textOut) {
      throw new Error('Không nhận được nội dung phản hồi từ Gemini. Vui lòng thử nói lại.');
    }

    try {
      return JSON.parse(textOut);
    } catch (parseError) {
      const cleaned = textOut.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      return JSON.parse(cleaned);
    }
  }

  // =========================================================================
  // INDEXEDDB ENGINE: LOCAL VOICE RECORDINGS ARCHIVE (OFFLINE-FIRST)
  // =========================================================================
  const VoiceDB = {
    DB_NAME: 'IELTS_Voice_Recordings_v1',
    DB_VERSION: 1,
    STORE_NAME: 'recordings',
    _dbPromise: null,

    getDB() {
      if (!this._dbPromise) {
        this._dbPromise = new Promise((resolve, reject) => {
          if (!window.indexedDB) {
            reject(new Error('Trình duyệt không hỗ trợ IndexedDB'));
            return;
          }
          const req = indexedDB.open(this.DB_NAME, this.DB_VERSION);
          req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(this.STORE_NAME)) {
              const store = db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
              store.createIndex('dateStr', 'dateStr', { unique: false });
              store.createIndex('timestamp', 'timestamp', { unique: false });
            }
          };
          req.onsuccess = (e) => resolve(e.target.result);
          req.onerror = (e) => reject(e.target.error);
        });
      }
      return this._dbPromise;
    },

    async save(record) {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.STORE_NAME, 'readwrite');
        const store = tx.objectStore(this.STORE_NAME);
        const req = store.put(record);
        req.onsuccess = () => resolve(record);
        req.onerror = () => reject(req.error);
      });
    },

    async getAll() {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.STORE_NAME, 'readonly');
        const store = tx.objectStore(this.STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => {
          const list = req.result || [];
          list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
          resolve(list);
        };
        req.onerror = () => reject(req.error);
      });
    },

    async get(id) {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.STORE_NAME, 'readonly');
        const store = tx.objectStore(this.STORE_NAME);
        const req = store.get(id);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    },

    async update(id, updates) {
      const existing = await this.get(id);
      if (!existing) return null;
      const updated = { ...existing, ...updates };
      return this.save(updated);
    },

    async delete(id) {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.STORE_NAME, 'readwrite');
        const store = tx.objectStore(this.STORE_NAME);
        const req = store.delete(id);
        req.onsuccess = () => resolve(true);
        req.onerror = () => reject(req.error);
      });
    }
  };

  // =========================================================================
  // GOOGLE DRIVE SERVICE: CLOUD VOICE SYNC (GIS OAUTH & REST API V3)
  // =========================================================================
  const GoogleDriveService = {
    accessToken: localStorage.getItem('gdrive_speaking_access_token') || '',
    tokenExpiry: parseInt(localStorage.getItem('gdrive_speaking_token_expiry') || '0', 10),
    folderId: localStorage.getItem('gdrive_speaking_folder_id') || '',
    tokenClient: null,

    initGIS() {
      if (typeof window.google === 'undefined' || !window.google.accounts || !window.google.accounts.oauth2) {
        return;
      }
      const clientId = (config.driveClientId || '').trim();
      if (!clientId) return;

      try {
        this.tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: 'https://www.googleapis.com/auth/drive.file',
          callback: async (tokenResponse) => {
            if (tokenResponse.error) {
              showToastMessage(`Lỗi đăng nhập Google Drive: ${tokenResponse.error}`);
              return;
            }
            if (tokenResponse.access_token) {
              this.accessToken = tokenResponse.access_token;
              this.tokenExpiry = Date.now() + (parseInt(tokenResponse.expires_in, 10) || 3500) * 1000;
              localStorage.setItem('gdrive_speaking_access_token', this.accessToken);
              localStorage.setItem('gdrive_speaking_token_expiry', String(this.tokenExpiry));
              updateDriveAuthStatusUI();
              showToastMessage('✅ Đã kết nối Google Drive thành công!');
              await this.ensureFolder();
              await this.syncUnsyncedRecordings();
              renderVoiceDiary();
            }
          }
        });
      } catch (err) {
        console.warn('GIS Init warning:', err);
      }
    },

    isConnected() {
      return Boolean(this.accessToken && Date.now() < this.tokenExpiry);
    },

    requestToken() {
      const clientId = (config.driveClientId || '').trim();
      if (!clientId) {
        openAISettingsModal();
        showToastMessage('Vui lòng nhập Google OAuth Client ID trong Cài đặt trước!');
        return;
      }
      if (!this.tokenClient) {
        this.initGIS();
      }
      if (this.tokenClient) {
        this.tokenClient.requestAccessToken({ prompt: '' });
      } else {
        showToastMessage('Đang kết nối thư viện Google Identity... Vui lòng thử lại sau vài giây.');
      }
    },

    async ensureFolder() {
      if (!this.isConnected()) return null;
      if (this.folderId) return this.folderId;

      const folderName = config.driveFolderName || 'IELTS Speaking Voice';
      try {
        const q = `name='${folderName.replace(/'/g, "\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;
        const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name)`, {
          headers: { 'Authorization': `Bearer ${this.accessToken}` }
        });
        if (searchRes.ok) {
          const data = await searchRes.json();
          if (data.files && data.files.length > 0) {
            this.folderId = data.files[0].id;
            localStorage.setItem('gdrive_speaking_folder_id', this.folderId);
            return this.folderId;
          }
        }

        // Create folder if not found
        const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder'
          })
        });
        if (createRes.ok) {
          const created = await createRes.json();
          this.folderId = created.id;
          localStorage.setItem('gdrive_speaking_folder_id', this.folderId);
          return this.folderId;
        }
      } catch (e) {
        console.warn('Folder error:', e);
      }
      return null;
    },

    async uploadRecording(record) {
      if (!this.isConnected() || !record.audioBlob) return null;

      try {
        const folderId = await this.ensureFolder();
        const dateStr = record.dateStr || getTodayDateString();
        const part = record.part || 1;
        const attempt = record.attempt || 1;
        const ext = record.audioBlob.type?.includes('mp4') ? 'mp4' : 'webm';
        const fileName = `${dateStr}_P${part}_lan${attempt}_${record.id}.${ext}`;

        const metadata = {
          name: fileName,
          description: record.transcript || 'IELTS Speaking Voice Recording',
          parents: folderId ? [folderId] : [],
          appProperties: {
            speakingRecordId: record.id,
            dateStr: dateStr,
            part: String(part),
            attempt: String(attempt),
            durationSec: String(record.durationSec || 0)
          }
        };

        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const closeDelim = "\r\n--" + boundary + "--";

        const base64Data = await blobToBase64(record.audioBlob);
        const mimeType = record.audioBlob.type?.split(';')[0] || 'audio/webm';

        const multipartRequestBody =
          delimiter +
          'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
          JSON.stringify(metadata) +
          delimiter +
          'Content-Type: ' + mimeType + '\r\n' +
          'Content-Transfer-Encoding: base64\r\n\r\n' +
          base64Data +
          closeDelim;

        const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'multipart/related; boundary=' + boundary
          },
          body: multipartRequestBody
        });

        if (res.ok) {
          const uploaded = await res.json();
          await VoiceDB.update(record.id, {
            syncedToDrive: true,
            driveFileId: uploaded.id,
            driveFileName: fileName
          });
          return uploaded.id;
        }
      } catch (e) {
        console.warn('Drive upload error:', e);
      }
      return null;
    },

    async syncUnsyncedRecordings() {
      if (!this.isConnected()) return;
      try {
        const all = await VoiceDB.getAll();
        const unsynced = all.filter(r => !r.syncedToDrive && r.audioBlob);
        for (const item of unsynced) {
          await this.uploadRecording(item);
        }
      } catch (e) {
        console.warn('Sync error:', e);
      }
    }
  };

  // =========================================================================
  // VOICE RECORDER: NATIVE BROWSER MEDIARECORDER
  // =========================================================================
  const VoiceRecorder = {
    mediaRecorder: null,
    stream: null,
    chunks: [],
    startTime: 0,
    timerInterval: null,
    isRecording: false,
    durationSec: 0,

    async start() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Trình duyệt của bạn không hỗ trợ ghi âm trực tiếp qua mic. Vui lòng dùng Chrome, Edge hoặc Safari.');
      }

      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      this.chunks = [];
      let mimeType = 'audio/webm;codecs=opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        if (MediaRecorder.isTypeSupported('audio/webm')) mimeType = 'audio/webm';
        else if (MediaRecorder.isTypeSupported('audio/mp4')) mimeType = 'audio/mp4';
        else mimeType = '';
      }

      this.mediaRecorder = mimeType ? new MediaRecorder(this.stream, { mimeType }) : new MediaRecorder(this.stream);

      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          this.chunks.push(e.data);
        }
      };

      this.isRecording = true;
      this.startTime = Date.now();
      this.durationSec = 0;
      this.mediaRecorder.start(250);

      // Update UI to recording state
      const container = document.getElementById('mic-pulsing-container');
      const timerRow = document.getElementById('recording-timer-row');
      const controls = document.getElementById('recording-live-controls');
      const timerText = document.getElementById('recording-live-timer');
      const micLabel = document.getElementById('mic-btn-label');
      const micSub = document.getElementById('mic-btn-sub');

      if (container) container.classList.add('is-recording');
      if (timerRow) timerRow.style.display = 'flex';
      if (controls) controls.style.display = 'flex';
      if (micLabel) micLabel.textContent = 'Đang nghe bạn nói...';
      if (micSub) micSub.textContent = 'Chạm để dừng';

      clearInterval(this.timerInterval);
      this.timerInterval = setInterval(() => {
        this.durationSec = Math.floor((Date.now() - this.startTime) / 1000);
        if (timerText) {
          const mm = String(Math.floor(this.durationSec / 60)).padStart(2, '0');
          const ss = String(this.durationSec % 60).padStart(2, '0');
          timerText.textContent = `${mm}:${ss} / 00:30`;
        }

        // Auto-stop after 90 seconds
        if (this.durationSec >= 90) {
          (this.onLimit || handleFinishRecording)();
        }
      }, 1000);
    },

    stop() {
      return new Promise((resolve) => {
        clearInterval(this.timerInterval);
        this.isRecording = false;

        const container = document.getElementById('mic-pulsing-container');
        const timerRow = document.getElementById('recording-timer-row');
        const controls = document.getElementById('recording-live-controls');
        const micLabel = document.getElementById('mic-btn-label');
        const micSub = document.getElementById('mic-btn-sub');

        if (container) container.classList.remove('is-recording');
        if (timerRow) timerRow.style.display = 'none';
        if (controls) controls.style.display = 'none';
        if (micLabel) micLabel.textContent = 'Chạm để nói';
        if (micSub) micSub.textContent = 'Mục tiêu 30 giây';

        if (!this.mediaRecorder) {
          resolve(null);
          return;
        }

        this.mediaRecorder.onstop = () => {
          const type = this.mediaRecorder.mimeType || 'audio/webm';
          const blob = new Blob(this.chunks, { type });
          const finalDuration = Math.max(1, this.durationSec);

          if (this.stream) {
            this.stream.getTracks().forEach(t => t.stop());
            this.stream = null;
          }
          this.mediaRecorder = null;
          resolve({ audioBlob: blob, durationSec: finalDuration });
        };

        if (this.mediaRecorder.state !== 'inactive') {
          this.mediaRecorder.stop();
        } else {
          resolve(null);
        }
      });
    },

    cancel() {
      clearInterval(this.timerInterval);
      this.isRecording = false;
      if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.stop();
      }
      if (this.stream) {
        this.stream.getTracks().forEach(t => t.stop());
        this.stream = null;
      }
      this.mediaRecorder = null;
      this.chunks = [];

      const container = document.getElementById('mic-pulsing-container');
      const timerRow = document.getElementById('recording-timer-row');
      const controls = document.getElementById('recording-live-controls');
      const micLabel = document.getElementById('mic-btn-label');
      const micSub = document.getElementById('mic-btn-sub');

      if (container) container.classList.remove('is-recording');
      if (timerRow) timerRow.style.display = 'none';
      if (controls) controls.style.display = 'none';
      if (micLabel) micLabel.textContent = 'Chạm để nói';
      if (micSub) micSub.textContent = 'Mục tiêu 30 giây';
    }
  };

  // --- TEST CONNECTION ---
  async function testGeminiKey(key, model) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key.trim())}`;
    const payload = {
      contents: [
        { role: 'user', parts: [{ text: 'Respond with valid JSON: {"status": "ok", "message": "Connection successful"}' }] }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        maxOutputTokens: 50
      }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      let msg = res.statusText;
      try {
        const data = await res.json();
        msg = data.error?.message || msg;
      } catch (e) {}
      throw new Error(msg);
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text;
  }

  // --- SAVE COLLOCATION TO FLASHCARDS ---
  function saveToFlashcardCollocation(phraseObj) {
    if (typeof window.addCollocationCard === 'function') {
      window.addCollocationCard({
        english: phraseObj.en,
        vietnamese: phraseObj.vi,
        exampleEn: phraseObj.exampleEn || phraseObj.en,
        exampleVi: phraseObj.exampleVi || phraseObj.vi,
        ipa: phraseObj.ipa || '/collocation/'
      });
    } else {
      showToastMessage(`Đã chọn lưu: "${phraseObj.en}"`);
    }
  }

  // --- TAB 1: DỊCH CÂU ĐỜI THƯỜNG ---
  async function handleTranslate() {
    const inputEl = document.getElementById('speaking-translate-input');
    const resultBox = document.getElementById('speaking-translate-result');
    const btnTranslate = document.getElementById('btn-do-translate');

    const text = (inputEl.value || '').trim();
    if (!text) {
      showToastMessage('Vui lòng gõ một câu tiếng Việt bạn muốn dịch');
      inputEl.focus();
      return;
    }

    if (isTranslating) return;
    isTranslating = true;
    btnTranslate.disabled = true;
    btnTranslate.innerHTML = '<span class="spinner-inline"></span> Đang dịch bằng AI...';

    const systemPrompt = `You are a bilingual English speaking coach specializing in natural everyday spoken English for Vietnamese learners (level B1).
Your mission: Translate the user's casual Vietnamese into the most authentic, natural spoken English that a native speaker would actually say in everyday conversations.
Avoid unnatural word-by-word literal translations.

Return ONLY a JSON object with this exact structure:
{
  "main": "Most natural, everyday spoken English version (clear, simple words, natural flow)",
  "casual": "More casual or colloquial version (friendly, slang/idiom if appropriate)",
  "polite": "More polite or professional version (suitable for workplace/seniors)",
  "note_vi": "1-2 brief sentences in Vietnamese explaining why native speakers use this phrasing instead of literal translation",
  "key_phrases": [
    {
      "en": "useful phrase",
      "ipa": "/.../",
      "vi": "nghĩa tiếng Việt",
      "exampleEn": "short natural sentence with this phrase"
    }
  ]
}`;

    const userPrompt = `Vietnamese sentence: """${text}"""`;

    try {
      const result = await callGemini(userPrompt, systemPrompt);
      renderTranslationResult(text, result);

      // Save to state history
      state.translations.unshift({
        id: 'trans-' + Date.now(),
        vi: text,
        result: result,
        timestamp: Date.now()
      });
      if (state.translations.length > 25) {
        state.translations = state.translations.slice(0, 25);
      }
      saveState();
      renderTranslationHistory();
    } catch (err) {
      showToastMessage(err.message || 'Lỗi khi dịch. Vui lòng thử lại.');
    } finally {
      isTranslating = false;
      btnTranslate.disabled = false;
      btnTranslate.innerHTML = '<span>Dịch sang tiếng Anh tự nhiên</span>';
    }
  }

  function renderTranslationResult(originalVi, data) {
    const resultBox = document.getElementById('speaking-translate-result');
    if (!resultBox) return;

    resultBox.style.display = 'block';

    let phrasesHtml = '';
    if (data.key_phrases && data.key_phrases.length) {
      phrasesHtml = `
        <div class="result-section-box">
          <div class="result-section-title">Cụm từ gợi ý đáng học:</div>
          <div class="phrases-grid">
            ${data.key_phrases.map((p, idx) => `
              <div class="phrase-card">
                <div class="phrase-top">
                  <div class="phrase-en-group">
                    <strong class="phrase-en">${escapeHtml(p.en)}</strong>
                    ${p.ipa ? `<span class="phrase-ipa">${escapeHtml(p.ipa)}</span>` : ''}
                  </div>
                  <div class="phrase-actions">
                    <button type="button" class="btn-speaking-action btn-speak" title="Nghe phát âm" onclick="window.speakingModule.speak('${escapeJs(p.en)}')">Nghe</button>
                    <button type="button" class="btn-add-flashcard-pill" title="Lưu thành flashcard collocation"
                      onclick="window.speakingModule.savePhrase(${idx}, 'translate')">
                      Lưu Thẻ
                    </button>
                  </div>
                </div>
                <div class="phrase-vi">${escapeHtml(p.vi)}</div>
                ${p.exampleEn ? `<div class="phrase-eg"><em>Ví dụ:</em> "${escapeHtml(p.exampleEn)}"</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    resultBox.innerHTML = `
      <div class="translate-result-card">
        <div class="result-header">
          <div class="result-badge-row">
            <span class="badge-tag badge-tag-green">Kết quả tự nhiên</span>
            <span class="badge-original-label">Gốc: "${escapeHtml(originalVi)}"</span>
          </div>
        </div>

        <!-- MAIN NATURAL -->
        <div class="speaking-option-card main-option">
          <div class="option-label">CÁCH NÓI TỰ NHIÊN (EVERYDAY SPOKEN)</div>
          <div class="option-content-row">
            <div class="option-text-main">${escapeHtml(data.main)}</div>
            <div class="option-btns">
              <button type="button" class="btn-speaking-action btn-speak" title="Nghe đọc chuẩn" onclick="window.speakingModule.speak('${escapeJs(data.main)}')">
                Nghe
              </button>
              <button type="button" class="btn-speaking-action btn-save-card" title="Lưu câu này vào Flashcard Collocations"
                onclick="window.speakingModule.saveCustomCard('${escapeJs(data.main)}', '${escapeJs(originalVi)}')">
                Lưu Collocation
              </button>
            </div>
          </div>
        </div>

        <!-- CASUAL & POLITE VARIANTS -->
        <div class="variants-row">
          ${data.casual ? `
            <div class="speaking-option-card variant-option">
              <div class="option-label">THÂN MẬT / BẠN BÈ (CASUAL)</div>
              <div class="option-text-sub">${escapeHtml(data.casual)}</div>
              <div class="option-btns-sub">
                <button type="button" class="btn-speaking-action btn-speak" title="Nghe đọc" onclick="window.speakingModule.speak('${escapeJs(data.casual)}')">Nghe</button>
                <button type="button" class="btn-add-flashcard-pill" title="Lưu thẻ" onclick="window.speakingModule.saveCustomCard('${escapeJs(data.casual)}', '${escapeJs(originalVi)}')">Lưu</button>
              </div>
            </div>
          ` : ''}

          ${data.polite ? `
            <div class="speaking-option-card variant-option">
              <div class="option-label">LỊCH SỰ / CÔNG SỞ (POLITE / FORMAL)</div>
              <div class="option-text-sub">${escapeHtml(data.polite)}</div>
              <div class="option-btns-sub">
                <button type="button" class="btn-speaking-action btn-speak" title="Nghe đọc" onclick="window.speakingModule.speak('${escapeJs(data.polite)}')">Nghe</button>
                <button type="button" class="btn-add-flashcard-pill" title="Lưu thẻ" onclick="window.speakingModule.saveCustomCard('${escapeJs(data.polite)}', '${escapeJs(originalVi)}')">Lưu</button>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- NOTE -->
        ${data.note_vi ? `
          <div class="result-note-box">
            <div class="note-content">
              <strong>Lưu ý cách nói của người bản xứ:</strong>
              <p>${escapeHtml(data.note_vi)}</p>
            </div>
          </div>
        ` : ''}

        ${phrasesHtml}
      </div>
    `;

    // Store current phrases in memory for saving
    window.__currentTranslatePhrases = data.key_phrases || [];

    // Scroll smoothly to result
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function renderTranslationHistory() {
    const historyBox = document.getElementById('speaking-translate-history');
    if (!historyBox) return;

    if (!state.translations || state.translations.length === 0) {
      historyBox.innerHTML = '<div class="empty-history-text">Chưa có câu dịch nào. Hãy thử gõ một câu ở trên!</div>';
      return;
    }

    historyBox.innerHTML = `
      <div class="history-header">
        <span class="history-title">Lịch sử dịch gần đây (${state.translations.length})</span>
        <button type="button" class="btn-text-subtle" onclick="window.speakingModule.clearTranslateHistory()">Xóa lịch sử</button>
      </div>
      <div class="history-list">
        ${state.translations.slice(0, 10).map((item, idx) => `
          <div class="history-item" onclick="window.speakingModule.recallTranslation(${idx})">
            <div class="history-vi">${escapeHtml(item.vi)}</div>
            <div class="history-en">${escapeHtml(item.result?.main || '')}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // --- TAB 2: MỖI NGÀY 1 CÂU IELTS SPEAKING ---
  function getTodayDateString() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function getDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  function loadCurrentQuestion() {
    const list = QUESTION_BANK[currentPart]?.[currentSource] || [];
    if (!list.length) return null;

    const offsetKey = `${currentPart}_${currentSource}`;
    const offset = state.skipOffsets[offsetKey] || 0;
    const daySeed = getDayOfYear();
    const idx = (daySeed + offset) % list.length;
    currentQuestion = list[idx];
    return currentQuestion;
  }

  function renderQuestionCard() {
    const q = loadCurrentQuestion();
    if (!q) return;

    const card = document.getElementById('daily-question-display');
    if (!card) return;

    const todayStr = getTodayDateString();
    const alreadyDone = (state.answers || []).some(a => a.dateStr === todayStr && a.part === currentPart);

    let bulletsHtml = '';
    if (q.bullets && q.bullets.length) {
      bulletsHtml = `
        <div class="cue-card-bullets">
          <div class="cue-card-title">You should say:</div>
          <ul>
            ${q.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="question-header-row">
        <div class="q-meta-badges">
          <span class="badge-part">Part ${currentPart}</span>
          <span class="badge-topic">${escapeHtml(q.topic)}</span>
          <span class="badge-source">${currentSource === 'forecast' ? 'Bộ đề dự đoán' : 'Câu hỏi kinh điển'}</span>
        </div>
        <div class="q-status-wrap">
          ${alreadyDone ? '<span class="status-done-pill">Đã làm hôm nay</span>' : '<span class="status-todo-pill">Câu của hôm nay</span>'}
        </div>
      </div>

      <div class="question-main-box">
        <h2 class="question-text">${escapeHtml(q.question)}</h2>
        <div class="question-vi-hint">${escapeHtml(q.vietnamese)}</div>
        ${bulletsHtml}
      </div>

      <div class="question-action-bar">
        <button type="button" class="btn-speaking-action btn-speak" onclick="window.speakingModule.speak('${escapeJs(q.question)}')">
          Nghe câu hỏi
        </button>
        <button type="button" id="btn-toggle-hints" class="btn-speaking-action btn-hint" onclick="window.speakingModule.toggleHints()">
          Gợi ý làm bài
        </button>
        <button type="button" class="btn-speaking-action btn-change-q" title="Đổi sang câu hỏi khác cùng Part" onclick="window.speakingModule.changeQuestion()">
          Đổi câu khác
        </button>
      </div>

      <!-- HINTS CONTAINER (EXPANDABLE) -->
      <div id="daily-hints-container" class="hints-box" style="display: none;"></div>
    `;

    // Load draft if any
    const textarea = document.getElementById('daily-user-answer');
    if (textarea) {
      const draft = state.drafts[q.id] || '';
      textarea.value = draft;
      updateWordCount(draft);
    }

    // Hide old feedback when question changes
    const feedbackBox = document.getElementById('daily-feedback-container');
    if (feedbackBox) feedbackBox.style.display = 'none';

    updateDailyStatsBadge();
  }

  function updateWordCount(text) {
    const countEl = document.getElementById('daily-word-count');
    const tipEl = document.getElementById('daily-length-guide');
    if (!countEl) return;

    const words = (text || '').trim().split(/\s+/).filter(Boolean);
    const count = words.length;
    countEl.textContent = `${count} từ`;

    if (tipEl && currentQuestion) {
      tipEl.textContent = `Gợi ý: ${currentQuestion.suggestedWords}`;
    }
  }

  async function handleToggleHints() {
    const container = document.getElementById('daily-hints-container');
    if (!container || !currentQuestion) return;

    if (container.style.display === 'block') {
      container.style.display = 'none';
      return;
    }

    container.style.display = 'block';
    container.innerHTML = '<div class="loading-state"><span class="spinner-inline"></span> Đang tạo gợi ý dàn ý và từ vựng...</div>';

    const systemPrompt = `You are a helpful IELTS Speaking tutor for a Vietnamese beginner (level B1).
Provide quick, practical guidance for the student to answer this question easily and confidently.

Return ONLY a JSON object:
{
  "outline_vi": [
    "Bước 1 (Mở đầu trực tiếp): ...",
    "Bước 2 (Mở rộng ý / giải thích): ...",
    "Bước 3 (Ví dụ cá nhân hoặc cảm xúc): ..."
  ],
  "suggested_phrases": [
    { "en": "English phrase", "vi": "nghĩa tiếng Việt" }
  ],
  "tip_vi": "1 mẹo đơn giản bằng tiếng Việt giúp người mới bắt đầu nói tự tin"
}`;

    const userPrompt = `IELTS Speaking Part ${currentPart} question: "${currentQuestion.question}".`;

    try {
      const data = await callGemini(userPrompt, systemPrompt);
      container.innerHTML = `
        <div class="hints-content">
          <div class="hints-block">
            <strong>📋 Dàn ý 3 bước dễ nói (bằng tiếng Việt):</strong>
            <ol class="outline-steps">
              ${(data.outline_vi || []).map(step => `<li>${escapeHtml(step)}</li>`).join('')}
            </ol>
          </div>

          <div class="hints-block">
            <strong>✨ Cụm từ gợi ý nên dùng:</strong>
            <div class="hint-phrases-list">
              ${(data.suggested_phrases || []).map(p => `
                <span class="hint-phrase-pill" onclick="window.speakingModule.insertHintPhrase('${escapeJs(p.en)}')">
                  <strong>${escapeHtml(p.en)}</strong>: ${escapeHtml(p.vi)}
                </span>
              `).join('')}
            </div>
          </div>

          ${data.tip_vi ? `
            <div class="hints-tip">
              💡 <em>${escapeHtml(data.tip_vi)}</em>
            </div>
          ` : ''}
        </div>
      `;
    } catch (err) {
      container.innerHTML = `<div class="error-state">❌ Không tải được gợi ý: ${escapeHtml(err.message)}</div>`;
    }
  }

  async function handleSubmitDailyAnswer() {
    const textarea = document.getElementById('daily-user-answer');
    const feedbackBox = document.getElementById('daily-feedback-container');
    const btnSubmit = document.getElementById('btn-submit-daily');

    if (!textarea || !currentQuestion) return;

    const answerText = textarea.value.trim();
    if (!answerText) {
      showToastMessage('Vui lòng viết câu trả lời của bạn trước khi nộp');
      textarea.focus();
      return;
    }

    const words = answerText.split(/\s+/).filter(Boolean);
    if (words.length < 5) {
      showToastMessage('Câu trả lời hơi ngắn, bạn hãy viết thêm 1-2 câu nữa nhé!');
      return;
    }

    if (isSubmitting) return;
    isSubmitting = true;
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = '<span class="spinner-inline"></span> Đang chấm bài bằng AI...';

    const systemPrompt = `You are a supportive, encouraging IELTS Speaking coach for a Vietnamese beginner at B1 level.
The student is practicing IELTS Speaking Part ${currentPart}.
Question: "${currentQuestion.question}"

Crucial Instructions:
1. The student is a beginner. If the student included any Vietnamese words or phrases in brackets or parentheses (e.g. "(đi phượt)" or "(xả stress)") when they didn't know the English word, identify them, correct them, and provide the natural English expression.
2. Estimated Band: Give a realistic speaking band score suitable for this response (e.g. "5.0" or "5.5").
3. Encouragement: 1-2 warm, friendly sentences in Vietnamese acknowledging their effort.
4. Corrected Version: Keep the student's exact ideas and sentence structure as much as possible, only fix grammar, tense, prepositions and unnatural word choices. Wrap EVERY corrected part inside <mark>...</mark> tags so the student clearly sees what changed.
5. Mistakes: Identify 2 to 5 specific mistakes:
   - "wrong": what the student wrote
   - "right": the corrected phrasing
   - "why_vi": short, clear explanation in Vietnamese.
6. Simple Model Answer (Level B1): A clean, natural answer with short, easy-to-pronounce sentences and familiar words. Suitable for a beginner to shadow and speak out loud.
7. Advanced Model Answer (Band 6.5 - 7.0): A more fluent, higher-band version expressing the same ideas with natural collocations and discourse markers.
8. Key Phrases: 3 to 5 valuable collocations/phrases extracted from the model answers:
   - "en": English phrase
   - "ipa": phonetic transcription (e.g. "/.../")
   - "vi": clear Vietnamese meaning
   - "exampleEn": a short sentence using it
9. Next Step Tip (in Vietnamese): 1 actionable speaking tip for next time.

Return ONLY a JSON object:
{
  "band": "5.0",
  "comment_vi": "...",
  "corrected_html": "...",
  "mistakes": [
    { "wrong": "...", "right": "...", "why_vi": "..." }
  ],
  "simple_version": "...",
  "advanced_version": "...",
  "phrases": [
    { "en": "...", "ipa": "...", "vi": "...", "exampleEn": "..." }
  ],
  "next_tip_vi": "..."
}`;

    const userPrompt = `Student's written answer:\n"""\n${answerText}\n"""`;

    try {
      const data = await callGemini(userPrompt, systemPrompt);
      renderFeedbackResult(answerText, data);

      // Save answer to state
      const record = {
        id: 'ans-' + Date.now(),
        dateStr: getTodayDateString(),
        part: currentPart,
        source: currentSource,
        questionId: currentQuestion.id,
        questionText: currentQuestion.question,
        answer: answerText,
        feedback: data,
        timestamp: Date.now()
      };

      state.answers.unshift(record);
      if (state.answers.length > 30) state.answers = state.answers.slice(0, 30);

      // Update streak
      updateStreak();
      saveState();

      // Clear draft for this question
      delete state.drafts[currentQuestion.id];
      saveState();

      renderQuestionCard();
      renderDailyHistory();
    } catch (err) {
      showToastMessage(err.message || 'Lỗi khi chấm bài. Vui lòng thử lại.');
    } finally {
      isSubmitting = false;
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = '<span>Nộp bài & Nhận chấm chữa AI</span>';
    }
  }

  function renderFeedbackResult(originalAnswer, data) {
    const feedbackBox = document.getElementById('daily-feedback-container');
    if (!feedbackBox) return;

    feedbackBox.style.display = 'block';

    let mistakesHtml = '';
    if (data.mistakes && data.mistakes.length) {
      mistakesHtml = `
        <div class="feedback-sub-box">
          <div class="feedback-sub-title">Các lỗi ngữ pháp & từ vựng cần lưu ý:</div>
          <div class="mistakes-grid">
            ${data.mistakes.map(m => `
              <div class="mistake-item">
                <div class="mistake-diff">
                  <span class="m-wrong">${escapeHtml(m.wrong)}</span>
                  <span class="m-arrow">➔</span>
                  <span class="m-right">${escapeHtml(m.right)}</span>
                </div>
                <div class="m-why">${escapeHtml(m.why_vi)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    let phrasesHtml = '';
    if (data.phrases && data.phrases.length) {
      phrasesHtml = `
        <div class="feedback-sub-box">
          <div class="feedback-sub-title">Cụm từ ghi điểm nên nạp vào Flashcard:</div>
          <div class="phrases-grid">
            ${data.phrases.map((p, idx) => `
              <div class="phrase-card">
                <div class="phrase-top">
                  <div class="phrase-en-group">
                    <strong class="phrase-en">${escapeHtml(p.en)}</strong>
                    ${p.ipa ? `<span class="phrase-ipa">${escapeHtml(p.ipa)}</span>` : ''}
                  </div>
                  <div class="phrase-actions">
                    <button type="button" class="btn-speaking-action btn-speak" title="Nghe đọc" onclick="window.speakingModule.speak('${escapeJs(p.en)}')">Nghe</button>
                    <button type="button" class="btn-add-flashcard-pill" title="Lưu thẻ" onclick="window.speakingModule.savePhrase(${idx}, 'daily')">Lưu Thẻ</button>
                  </div>
                </div>
                <div class="phrase-vi">${escapeHtml(p.vi)}</div>
                ${p.exampleEn ? `<div class="phrase-eg"><em>Ví dụ:</em> "${escapeHtml(p.exampleEn)}"</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    feedbackBox.innerHTML = `
      <div class="feedback-result-card">
        <!-- SCORE & ENCOURAGEMENT -->
        <div class="score-banner">
          <div class="score-left">
            <span class="score-badge">Band ước tính: ${escapeHtml(data.band || '5.0')}</span>
            <span class="score-subtext">Trình độ B1</span>
          </div>
          <div class="score-comment">
            ${escapeHtml(data.comment_vi || '')}
          </div>
        </div>

        <!-- CORRECTED VERSION -->
        <div class="feedback-sub-box">
          <div class="feedback-sub-title">Bài của bạn sau khi sửa lỗi:</div>
          <div class="corrected-text-box">
            ${data.corrected_html || escapeHtml(originalAnswer)}
          </div>
        </div>

        <!-- MISTAKES BREAKDOWN -->
        ${mistakesHtml}

        <!-- SIMPLE MODEL ANSWER (LEVEL B1) -->
        <div class="model-answer-card simple-model">
          <div class="model-badge-row">
            <span class="model-type-badge simple-badge">NÓI ĐƠN GIẢN (LEVEL B1 - DỄ NÓI CHO NGƯỜI MỚI)</span>
            <div class="model-actions">
              <button type="button" class="btn-speaking-action btn-speak" onclick="window.speakingModule.speak('${escapeJs(data.simple_version)}', 0.85)">
                Nghe đọc chậm
              </button>
            </div>
          </div>
          <p class="model-text">${escapeHtml(data.simple_version)}</p>
          <div class="model-tip-footer">
            <em>Hãy bấm nghe phát âm và đọc to lại 2-3 lần theo ngữ điệu (Shadowing).</em>
          </div>
        </div>

        <!-- ADVANCED MODEL ANSWER (BAND 6.5 - 7.0) -->
        <div class="model-answer-card advanced-model">
          <div class="model-badge-row">
            <span class="model-type-badge advanced-badge">NÓI TỰ NHIÊN HƠN (BAND 6.5 - 7.0)</span>
            <div class="model-actions">
              <button type="button" class="btn-speaking-action btn-speak" onclick="window.speakingModule.speak('${escapeJs(data.advanced_version)}', 0.9)">
                Nghe đọc
              </button>
            </div>
          </div>
          <p class="model-text">${escapeHtml(data.advanced_version)}</p>
        </div>

        <!-- KEY PHRASES -->
        ${phrasesHtml}

        <!-- NEXT STEP TIP -->
        ${data.next_tip_vi ? `
          <div class="next-tip-box">
            <div class="next-tip-body">
              <strong>Mẹo thực chiến cho lần nói tiếp theo:</strong>
              <p>${escapeHtml(data.next_tip_vi)}</p>
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // Store in memory for flashcard addition
    window.__currentDailyPhrases = data.phrases || [];

    feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function updateStreak() {
    const today = getTodayDateString();
    if (state.lastPracticedDate === today) {
      return; // Already counted today
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

    if (state.lastPracticedDate === yesterdayStr) {
      state.streakCount = (state.streakCount || 0) + 1;
    } else {
      state.streakCount = 1;
    }
    state.lastPracticedDate = today;
  }

  function updateDailyStatsBadge() {
    const streakEl = document.getElementById('speaking-streak-count');
    if (streakEl) {
      streakEl.textContent = `${state.streakCount || 0} ngày`;
    }
  }

  function renderDailyHistory() {
    const historyContainer = document.getElementById('daily-history-list');
    if (!historyContainer) return;

    if (!state.answers || state.answers.length === 0) {
      historyContainer.innerHTML = '<div class="empty-history-text">Bạn chưa nộp bài luyện nào. Hãy bắt đầu câu hỏi đầu tiên ở trên nhé!</div>';
      return;
    }

    historyContainer.innerHTML = `
      <div class="history-header">
        <span class="history-title">Bài luyện đã hoàn thành (${state.answers.length})</span>
      </div>
      <div class="history-list">
        ${state.answers.slice(0, 8).map((a, idx) => `
          <div class="history-answer-item" onclick="window.speakingModule.recallAnswer(${idx})">
            <div class="ans-header">
              <span class="ans-part">Part ${a.part}</span>
              <span class="ans-band">Band ${escapeHtml(a.feedback?.band || '5.0')}</span>
              <span class="ans-date">${escapeHtml(a.dateStr)}</span>
            </div>
            <div class="ans-q">${escapeHtml(a.questionText)}</div>
            <div class="ans-preview">"${escapeHtml(a.answer.slice(0, 100))}${a.answer.length > 100 ? '...' : ''}"</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // --- API SETTINGS MODAL & BADGE ---
  function updateAPIStatusBadge() {
    const badge = document.getElementById('speaking-api-badge');
    if (!badge) return;

    if (config.apiKey && config.apiKey.trim()) {
      badge.className = 'speaking-badge badge-active';
      badge.innerHTML = `<span class="badge-dot-live"></span><span>${escapeHtml(config.model || 'gemini-3.8-flash')}</span>`;
      badge.title = 'AI đã sẵn sàng (bấm để đổi model hoặc API Key)';
    } else {
      badge.className = 'speaking-badge badge-warning';
      badge.innerHTML = `<span class="badge-dot-idle"></span><span>Chưa có API Key</span>`;
      badge.title = 'Nhấn để cài đặt Gemini API Key';
    }
  }

  function openAISettingsModal() {
    const modal = document.getElementById('modal-speaking-settings');
    if (!modal) return;

    const inputKey = document.getElementById('speaking-api-key-input');
    const selectModel = document.getElementById('speaking-model-select');
    const customWrap = document.getElementById('custom-model-wrapper');
    const customInput = document.getElementById('speaking-custom-model-input');
    const selectLevel = document.getElementById('speaking-target-level');
    const statusBox = document.getElementById('speaking-test-status');

    if (inputKey) inputKey.value = config.apiKey || '';

    if (selectModel) {
      const knownModels = [
        'gemini-3.8-flash',
        'gemini-3.6-flash',
        'gemini-3-flash',
        'gemini-3.5-flash-lite',
        'gemini-3.1-flash-lite',
        'gemini-2.5-flash',
        'gemini-2.5-flash-lite',
        'gemma-4-26b',
        'gemma-4-31b'
      ];
      const curModel = config.model || 'gemini-3.8-flash';
      if (knownModels.includes(curModel)) {
        selectModel.value = curModel;
        if (customWrap) customWrap.style.display = 'none';
      } else {
        selectModel.value = 'custom';
        if (customWrap) customWrap.style.display = 'block';
        if (customInput) customInput.value = curModel;
      }
    }

    const driveInput = document.getElementById('speaking-drive-client-id');
    if (driveInput) driveInput.value = config.driveClientId || '';
    updateDriveAuthStatusUI();

    if (selectLevel) selectLevel.value = config.targetLevel || 'b1';
    if (statusBox) {
      statusBox.style.display = 'none';
      statusBox.innerHTML = '';
    }

    modal.style.display = 'flex';
  }

  function closeAISettingsModal() {
    const modal = document.getElementById('modal-speaking-settings');
    if (modal) modal.style.display = 'none';
  }

  function updateDriveAuthStatusUI() {
    const authStatusText = document.getElementById('drive-auth-status-text');
    const authStatusDot = document.querySelector('#drive-auth-status .status-dot-idle, #drive-auth-status .status-dot-live');
    const btnDriveSync = document.getElementById('btn-toggle-drive-sync');
    const syncStatusLabel = document.getElementById('drive-sync-status-label');

    const connected = GoogleDriveService.isConnected();

    if (authStatusText) {
      authStatusText.textContent = connected
        ? '🟢 Đã kết nối Google Drive (Thư mục: IELTS Speaking Voice)'
        : 'Chưa kết nối Google Drive';
    }
    if (authStatusDot) {
      authStatusDot.className = connected ? 'status-dot-live' : 'status-dot-idle';
    }

    if (btnDriveSync && syncStatusLabel) {
      if (connected) {
        btnDriveSync.classList.add('is-connected');
        syncStatusLabel.textContent = '🟢 Google Drive: Đã kết nối';
      } else {
        btnDriveSync.classList.remove('is-connected');
        syncStatusLabel.textContent = 'Kết nối Google Drive';
      }
    }
  }

  async function handleTestAPIConnection() {
    const inputKey = document.getElementById('speaking-api-key-input');
    const selectModel = document.getElementById('speaking-model-select');
    const customInput = document.getElementById('speaking-custom-model-input');
    const statusBox = document.getElementById('speaking-test-status');
    const btnTest = document.getElementById('btn-test-gemini');

    const key = (inputKey.value || '').trim();
    let model = (selectModel.value || 'gemini-3.8-flash');
    if (model === 'custom') {
      model = (customInput?.value || '').trim() || 'gemini-3.8-flash';
    }

    if (!key) {
      showToastMessage('Vui lòng nhập API Key để kiểm tra');
      return;
    }

    statusBox.style.display = 'block';
    statusBox.className = 'status-box status-loading';
    statusBox.innerHTML = '<span class="spinner-inline"></span> Đang gửi tín hiệu kiểm tra tới Google Gemini...';
    btnTest.disabled = true;

    try {
      await testGeminiKey(key, model);
      statusBox.className = 'status-box status-success';
      statusBox.innerHTML = `✅ Kết nối thành công! Khóa API hợp lệ và model <strong>${escapeHtml(model)}</strong> đã sẵn sàng hoạt động.`;
    } catch (err) {
      statusBox.className = 'status-box status-error';
      statusBox.innerHTML = `❌ Kiểm tra thất bại: ${escapeHtml(err.message)}<br><small>Nếu model này chưa mở cho tài khoản của bạn, bạn có thể chuyển sang <strong>gemini-2.5-flash</strong> hoặc <strong>gemini-1.5-flash</strong> để tiếp tục sử dụng bình thường.</small>`;
    } finally {
      btnTest.disabled = false;
    }
  }

  function handleSaveAISettings() {
    const inputKey = document.getElementById('speaking-api-key-input');
    const selectModel = document.getElementById('speaking-model-select');
    const customInput = document.getElementById('speaking-custom-model-input');
    const selectLevel = document.getElementById('speaking-target-level');
    const driveInput = document.getElementById('speaking-drive-client-id');

    const key = (inputKey.value || '').trim();
    let model = (selectModel.value || 'gemini-3.8-flash');
    if (model === 'custom') {
      model = (customInput?.value || '').trim() || 'gemini-3.8-flash';
    }
    const targetLevel = selectLevel.value || 'b1';
    const driveClientId = (driveInput?.value || '').trim();

    saveConfig({ apiKey: key, model, targetLevel, driveClientId });
    closeAISettingsModal();
    showToastMessage(`Đã lưu cấu hình AI & Google Drive!`);
  }

  // =========================================================================
  // NÓI NGAY (SPEAK NOW): VOICE HERO & FEEDBACK
  // =========================================================================

  function renderVoiceStatsBar() {
    const streakEl = document.getElementById('speak-now-streak');
    const todayTimeEl = document.getElementById('speak-now-today-time');
    const totalTimeEl = document.getElementById('speak-now-total-time');
    const goalCircle = document.getElementById('speak-now-goal-circle');

    const todayStr = getTodayDateString();
    const todaySec = voiceStats.dailySpokenSec[todayStr] || 0;
    const targetSec = 120; // 2 minutes goal

    if (streakEl) {
      streakEl.textContent = `${voiceStats.streakCount || 0} ngày`;
    }

    if (todayTimeEl) {
      const mm = String(Math.floor(todaySec / 60)).padStart(2, '0');
      const ss = String(todaySec % 60).padStart(2, '0');
      todayTimeEl.textContent = `${mm}:${ss} / 02:00`;
    }

    if (totalTimeEl) {
      totalTimeEl.textContent = `${voiceStats.totalSpokenMinutes || 0} phút`;
    }

    if (goalCircle) {
      const circumference = 113.1; // 2 * PI * 18
      const pct = Math.min(1, todaySec / targetSec);
      const offset = circumference - (pct * circumference);
      goalCircle.style.strokeDashoffset = offset;
    }
  }

  function getStarterPhrasesForQuestion(q, part) {
    if (part === 1) {
      return [
        'Well, to be honest...',
        'Actually, in my daily life...',
        'For instance, whenever I have free time...'
      ];
    } else if (part === 2) {
      return [
        "I'd like to talk about...",
        'The main reason why is that...',
        'Looking back on it now...'
      ];
    } else {
      return [
        'From my perspective...',
        'One obvious reason is that...',
        'On the other hand, some people believe...'
      ];
    }
  }

  function renderSpeakNowQuestion() {
    const q = loadCurrentQuestion();
    const container = document.getElementById('speak-now-question-card');
    if (!q || !container) return;

    const starterChips = getStarterPhrasesForQuestion(q, currentPart);
    let bulletsHtml = '';
    if (q.bullets && q.bullets.length) {
      bulletsHtml = `
        <div class="cue-card-bullets">
          <div class="cue-card-title">You should say:</div>
          <ul>
            ${q.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="q-meta-badges">
        <span class="badge-part">Part ${currentPart}</span>
        <span class="badge-topic">${escapeHtml(q.topic)}</span>
        <span class="badge-source">${currentSource === 'forecast' ? 'Bộ đề dự đoán' : 'Kinh điển'}</span>
      </div>

      <h2 class="speak-now-q-title">${escapeHtml(q.question)}</h2>
      <div class="speak-now-q-vi">${escapeHtml(q.vietnamese)}</div>
      ${bulletsHtml}

      <div class="starter-chips-wrap">
        <span class="starter-chips-label">Gợi ý mở đầu:</span>
        ${starterChips.map(phrase => `
          <button type="button" class="starter-chip" onclick="window.speakingModule.speak('${escapeJs(phrase)}')">
            🔊 ${escapeHtml(phrase)}
          </button>
        `).join('')}
      </div>

      <div class="speak-now-q-actions">
        <button type="button" class="btn-speaking-action btn-speak" onclick="window.speakingModule.speak('${escapeJs(q.question)}')">
          Nghe câu hỏi
        </button>
        <button type="button" class="btn-speaking-action btn-change-q" onclick="window.speakingModule.changeQuestion()">
          Đổi câu khác
        </button>
      </div>
    `;

    renderVoiceStatsBar();
  }

  async function handleToggleRecordSpeakNow() {
    if (VoiceRecorder.isRecording) {
      await handleFinishRecording();
    } else {
      try {
        await VoiceRecorder.start();
      } catch (err) {
        showToastMessage(err.message || 'Không thể mở micro. Vui lòng cho phép quyền truy cập micro trên trình duyệt.');
      }
    }
  }

  function handleCancelRecording() {
    VoiceRecorder.cancel();
    showToastMessage('Đã hủy lượt ghi âm.');
  }

  async function handleFinishRecording() {
    const loadingBox = document.getElementById('speak-now-loading');
    const loadingText = document.getElementById('speak-loading-status-text');
    const feedbackBox = document.getElementById('speak-now-feedback-container');

    if (loadingBox) {
      loadingBox.style.display = 'flex';
      if (loadingText) loadingText.textContent = 'AI đang lắng nghe và phân tích bài nói của bạn...';
    }
    if (feedbackBox) feedbackBox.style.display = 'none';

    try {
      const recResult = await VoiceRecorder.stop();
      if (!recResult || !recResult.audioBlob || recResult.durationSec < 2) {
        showToastMessage('Bản ghi âm hơi ngắn (dưới 2 giây). Bạn hãy nói thử ít nhất 5-10 giây nhé!');
        if (loadingBox) loadingBox.style.display = 'none';
        return;
      }

      await processVoiceSpeech(recResult.audioBlob, recResult.durationSec);
    } catch (err) {
      showToastMessage(err.message || 'Lỗi khi xử lý bài nói. Vui lòng thử lại.');
    } finally {
      if (loadingBox) loadingBox.style.display = 'none';
    }
  }

  async function processVoiceSpeech(audioBlob, durationSec) {
    const systemPrompt = `You are an encouraging, expert IELTS Speaking coach evaluating a beginner Vietnamese student (A2-B1 level).
Listen to the student's audio recording.

CRUCIAL REQUIREMENTS:
1. "transcript": Transcribe EXACTLY what the student said in English. If the student paused, struggled, or inserted Vietnamese words/phrases (e.g. they said "(đi phượt)" or "(xả stress)"), write those Vietnamese words inside parentheses so they can be identified.
2. "word_count": Count of total words spoken.
3. "praise": Exactly 2 warm, encouraging bullet points in Vietnamese praising their effort, clarity, or pronunciation.
4. "mistakes": Exactly 1 or 2 high-priority mistakes to fix (grammar, prepositions, or Vietnamese words they used). Return array:
   - "wrong": what they said
   - "right": natural English correction
   - "why_vi": short, easy-to-understand explanation in Vietnamese.
5. "upgraded_version": Rewrite their answer into a natural, fluent IELTS Speaking answer (Band 6.5 - 7.0) keeping the EXACT same ideas and personal feelings they expressed. Wrap 2-4 key high-scoring phrases/collocations inside <mark>...</mark> tags.
6. "upgraded_phrases": 2 to 3 valuable collocations from the upgraded version:
   - "en": English phrase
   - "ipa": phonetic transcription
   - "vi": clear Vietnamese meaning
7. "pronunciation_tip": 1 specific word the student said that could be improved, with:
   - "word": English word
   - "ipa": phonetic transcription
   - "tip_vi": friendly advice in Vietnamese on how to pronounce it clearly.

Return ONLY a JSON object:
{
  "transcript": "...",
  "word_count": 0,
  "praise": ["...", "..."],
  "mistakes": [{ "wrong": "...", "right": "...", "why_vi": "..." }],
  "upgraded_version": "...",
  "upgraded_phrases": [{ "en": "...", "ipa": "...", "vi": "..." }],
  "pronunciation_tip": { "word": "...", "ipa": "...", "tip_vi": "..." }
}`;

    const userPrompt = `Student answered IELTS Speaking Part ${currentPart} question: "${currentQuestion.question}". Audio duration: ${durationSec} seconds. Attempt number: ${currentAttemptNum}.`;

    const feedbackData = await callGeminiWithAudio(audioBlob, userPrompt, systemPrompt);

    // Create record
    const todayStr = getTodayDateString();
    const recordId = 'voice_' + Date.now();
    const record = {
      id: recordId,
      dateStr: todayStr,
      part: currentPart,
      topic: currentQuestion.topic || 'General',
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      attempt: currentAttemptNum,
      durationSec: durationSec,
      audioBlob: audioBlob,
      transcript: feedbackData.transcript || '',
      feedback: feedbackData,
      syncedToDrive: false,
      driveFileId: null,
      timestamp: Date.now()
    };

    // Save to IndexedDB (local offline-first archive)
    await VoiceDB.save(record);

    // Update Daily Speaking Stats
    voiceStats.dailySpokenSec[todayStr] = (voiceStats.dailySpokenSec[todayStr] || 0) + durationSec;
    voiceStats.totalSpokenMinutes = Math.max(1, Math.round(((voiceStats.totalSpokenMinutes || 0) * 60 + durationSec) / 60));

    // Update streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

    if (voiceStats.lastSpokenDate !== todayStr) {
      if (voiceStats.lastSpokenDate === yesterdayStr) {
        voiceStats.streakCount = (voiceStats.streakCount || 0) + 1;
      } else {
        voiceStats.streakCount = 1;
      }
      voiceStats.lastSpokenDate = todayStr;
    }
    saveVoiceStats();

    // Background upload to Google Drive if connected
    if (GoogleDriveService.isConnected()) {
      GoogleDriveService.uploadRecording(record).then(driveId => {
        if (driveId) {
          const syncPill = document.getElementById('speak-now-drive-sync-indicator');
          if (syncPill) {
            syncPill.innerHTML = '🟢 Đã lưu vào Google Drive & Thiết bị';
          }
          renderVoiceDiary();
        }
      });
    }

    // Attempt comparison logic
    let comparisonData = null;
    if (currentAttemptNum === 2 && lastAttempt1) {
      comparisonData = {
        wordsDiff: (feedbackData.word_count || 0) - (lastAttempt1.wordCount || 0),
        timeDiff: durationSec - (lastAttempt1.durationSec || 0)
      };
    } else {
      lastAttempt1 = {
        wordCount: feedbackData.word_count || 0,
        durationSec: durationSec,
        audioBlob: audioBlob
      };
    }

    renderSpeakNowFeedback(record, comparisonData);
    renderVoiceDiary();
  }

  function renderSpeakNowFeedback(record, comparisonData) {
    const feedbackBox = document.getElementById('speak-now-feedback-container');
    if (!feedbackBox) return;

    feedbackBox.style.display = 'flex';

    const fb = record.feedback || {};
    const praiseList = fb.praise || ['Phát âm tự nhiên và tự tin hơn!', 'Nội dung trả lời đúng trọng tâm câu hỏi.'];
    const mistakes = fb.mistakes || [];
    const phrases = fb.upgraded_phrases || [];
    const pron = fb.pronunciation_tip;

    // Create Audio Player for User's Voice
    const userAudioUrl = URL.createObjectURL(record.audioBlob);

    let mistakesHtml = '';
    if (mistakes.length) {
      mistakesHtml = `
        <div class="fb-card mistakes-fix-card">
          <div class="fb-card-title">🔧 Sửa ${mistakes.length} Chỗ Cần Nhớ</div>
          ${mistakes.map(m => `
            <div class="mistake-fix-row">
              <div class="mistake-diff-line">
                <span class="m-wrong">${escapeHtml(m.wrong)}</span>
                <span class="m-arrow">➔</span>
                <span class="m-right">${escapeHtml(m.right)}</span>
              </div>
              <div class="m-explain-vi">${escapeHtml(m.why_vi)}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    let comparisonBannerHtml = '';
    if (comparisonData) {
      const wordsSign = comparisonData.wordsDiff >= 0 ? `+${comparisonData.wordsDiff}` : `${comparisonData.wordsDiff}`;
      comparisonBannerHtml = `
        <div class="attempt-compare-banner">
          <div class="attempt-compare-title">🎉 Tuyệt vời! Bạn vừa hoàn thành Lần Nói Thứ 2</div>
          <div class="attempt-compare-body">
            Số từ phát triển: <strong>${wordsSign} từ</strong> so với lần 1. Bạn đã ứng dụng thành công các từ vựng và nói trôi chảy hơn!
          </div>
        </div>
      `;
    }

    feedbackBox.innerHTML = `
      ${comparisonBannerHtml}

      <!-- CELEBRATION HEADER -->
      <div class="celebrate-banner">
        <div class="celebrate-left">
          <span class="celebrate-emoji">🎉</span>
          <div>
            <div class="celebrate-headline">Bạn vừa nói ${record.durationSec} giây — ${fb.word_count || 0} từ!</div>
            <div class="celebrate-subtext">Lần nói thứ ${record.attempt || 1} • Câu hỏi Part ${record.part || 1}</div>
          </div>
        </div>
        <span class="celebrate-badge">Hoàn thành xuất sắc</span>
      </div>

      <!-- CARD 1: USER'S SPEECH & VOICE PLAYBACK -->
      <div class="fb-card user-speech-card">
        <div class="fb-card-title">
          <span>🗣️ Bạn đã nói:</span>
          <span class="tag-duration">${record.durationSec}s</span>
        </div>
        <div class="user-transcript-text">
          "${escapeHtml(record.transcript)}"
        </div>
        <!-- IN-APP AUDIO PLAYER -->
        <div class="voice-player-inline" id="speak-now-player-wrapper">
          <button type="button" class="btn-audio-play" id="btn-play-user-rec" title="Nghe lại giọng bạn">
            ▶
          </button>
          <input type="range" class="voice-timeline-slider" id="user-rec-slider" value="0" min="0" max="${record.durationSec}" step="0.1">
          <span class="voice-time-label" id="user-rec-time">0:00 / 0:${String(record.durationSec).padStart(2, '0')}</span>
          <audio id="audio-user-rec" src="${userAudioUrl}" preload="metadata"></audio>
        </div>
      </div>

      <!-- CARD 2: PRAISE -->
      <div class="fb-card praise-card">
        <div class="fb-card-title">👍 Điểm sáng (Làm Tốt)</div>
        <ul class="praise-list">
          ${praiseList.map(p => `<li>${escapeHtml(p)}</li>`).join('')}
        </ul>
      </div>

      <!-- CARD 3: FIX MISTAKES -->
      ${mistakesHtml}

      <!-- CARD 4: UPGRADED ANSWER ("Ý CỦA BẠN, NÓI HAY HƠN") -->
      <div class="fb-card upgraded-speech-card">
        <div class="fb-card-title">
          <span>✨ Ý của bạn, nói hay hơn (Band 6.5 - 7.0)</span>
          <button type="button" class="btn-speaking-action btn-speak" onclick="window.speakingModule.speak('${escapeJs(fb.upgraded_version || '')}', 0.85)">
            Nghe đọc chậm & nhại
          </button>
        </div>
        <div class="upgraded-text">
          ${fb.upgraded_version || ''}
        </div>
        ${phrases.length ? `
          <div class="upgraded-actions-row">
            <span class="starter-chips-label">Cụm từ ghi điểm:</span>
            ${phrases.map((p, pIdx) => `
              <button type="button" class="starter-chip" onclick="window.speakingModule.savePhrase(${pIdx}, 'speak_now')">
                ➕ Lưu "${escapeHtml(p.en)}"
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <!-- CARD 5: PRONUNCIATION TIP -->
      ${pron && pron.word ? `
        <div class="fb-card pronounce-card">
          <div class="fb-card-title">🗣️ Góp ý phát âm:</div>
          <div class="pronounce-box">
            <span class="pronounce-word">${escapeHtml(pron.word)}</span>
            <span class="pronounce-ipa">${escapeHtml(pron.ipa || '')}</span>
            <span>➔ ${escapeHtml(pron.tip_vi || '')}</span>
            <button type="button" class="btn-speaking-action btn-speak" onclick="window.speakingModule.speak('${escapeJs(pron.word)}')">Nghe</button>
          </div>
        </div>
      ` : ''}

      <!-- ACTION FOOTER: RETRY & NEXT -->
      <div class="speak-now-action-footer">
        <button type="button" class="btn-retry-second-attempt" onclick="window.speakingModule.retrySecondAttempt()">
          🎙️ Nói Lại Lần 2 (Áp dụng bản hay hơn)
        </button>
        <div class="footer-secondary-row">
          <button type="button" class="btn-speaking-action btn-change-q" onclick="window.speakingModule.changeQuestion()">
            🎲 Thử câu hỏi tiếp theo
          </button>
          <span class="sync-saved-pill" id="speak-now-drive-sync-indicator">
            ${GoogleDriveService.isConnected() ? '🟢 Đã lưu vào Google Drive & Thiết bị' : '💾 Đã lưu vào Nhật ký giọng nói trên máy'}
          </span>
        </div>
      </div>
    `;

    // Cache current phrases for flashcard addition
    window.__currentSpeakNowPhrases = phrases;

    // Attach in-app audio player controls
    bindInlineAudioPlayer('audio-user-rec', 'btn-play-user-rec', 'user-rec-slider', 'user-rec-time');

    feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function bindInlineAudioPlayer(audioId, btnId, sliderId, labelId) {
    const audio = document.getElementById(audioId);
    const btn = document.getElementById(btnId);
    const slider = document.getElementById(sliderId);
    const label = document.getElementById(labelId);

    if (!audio || !btn) return;

    btn.addEventListener('click', () => {
      // Pause any other playing audios
      document.querySelectorAll('audio').forEach(a => {
        if (a !== audio && !a.paused) {
          a.pause();
          a.dispatchEvent(new Event('pause'));
        }
      });

      if (audio.paused) {
        audio.play();
        btn.textContent = '⏸';
      } else {
        audio.pause();
        btn.textContent = '▶';
      }
    });

    audio.addEventListener('timeupdate', () => {
      if (slider && !isNaN(audio.duration) && audio.duration > 0) {
        slider.max = audio.duration;
        slider.value = audio.currentTime;
      }
      if (label && !isNaN(audio.duration)) {
        const curM = String(Math.floor(audio.currentTime / 60)).padStart(2, '0');
        const curS = String(Math.floor(audio.currentTime % 60)).padStart(2, '0');
        const totM = String(Math.floor(audio.duration / 60)).padStart(2, '0');
        const totS = String(Math.floor(audio.duration % 60)).padStart(2, '0');
        label.textContent = `${curM}:${curS} / ${totM}:${totS}`;
      }
    });

    if (slider) {
      slider.addEventListener('input', () => {
        audio.currentTime = parseFloat(slider.value) || 0;
      });
    }

    audio.addEventListener('ended', () => {
      btn.textContent = '▶';
      if (slider) slider.value = 0;
    });

    audio.addEventListener('pause', () => {
      btn.textContent = '▶';
    });
  }

  // =========================================================================
  // NHẬT KÝ GIỌNG NÓI (VOICE DIARY): LIST BY DAY & DRIVE INTEGRATION
  // =========================================================================

  async function renderVoiceDiary() {
    const listContainer = document.getElementById('voice-diary-list');
    const tabCountPill = document.getElementById('diary-tab-count');
    const journeyCard = document.getElementById('diary-progress-comparison');
    if (!listContainer) return;

    const allRecordings = await VoiceDB.getAll();

    if (tabCountPill) {
      tabCountPill.textContent = String(allRecordings.length);
    }

    if (!allRecordings || allRecordings.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-diary-state">
          <div class="empty-diary-icon">🎙️</div>
          <div class="empty-diary-text">Bạn chưa có bài nói nào được lưu. Hãy qua tab <strong>"1. Nói Ngay"</strong> và bấm micro để lưu bài đầu tiên nhé!</div>
        </div>
      `;
      if (journeyCard) journeyCard.style.display = 'none';
      return;
    }

    // Progress journey card: if user has >= 2 recordings
    if (journeyCard) {
      if (allRecordings.length >= 2) {
        journeyCard.style.display = 'flex';
      } else {
        journeyCard.style.display = 'none';
      }
    }

    // Group recordings by dateStr
    const groups = {};
    allRecordings.forEach(rec => {
      const d = rec.dateStr || 'Khác';
      if (!groups[d]) groups[d] = [];
      groups[d].push(rec);
    });

    const todayStr = getTodayDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

    let html = '';
    const sortedDateKeys = Object.keys(groups).sort((a, b) => b.localeCompare(a));

    for (const dateKey of sortedDateKeys) {
      const items = groups[dateKey];
      let dayTitle = dateKey;
      if (dateKey === todayStr) {
        dayTitle = 'Hôm nay (Today)';
      } else if (dateKey === yesterdayStr) {
        dayTitle = 'Hôm qua (Yesterday)';
      } else {
        const parts = dateKey.split('-');
        if (parts.length === 3) {
          dayTitle = `Ngày ${parts[2]}/${parts[1]}/${parts[0]}`;
        }
      }

      html += `
        <div class="diary-day-group">
          <div class="diary-day-heading">
            <span>📅 ${escapeHtml(dayTitle)}</span>
            <span class="diary-day-count-badge">${items.length} bài nói</span>
          </div>
          <div class="diary-entries-grid">
            ${items.map(item => renderDiaryEntryCard(item)).join('')}
          </div>
        </div>
      `;
    }

    listContainer.innerHTML = html;

    // Bind audio players for each entry
    allRecordings.forEach(item => {
      bindInlineAudioPlayer(
        `diary-audio-${item.id}`,
        `diary-play-btn-${item.id}`,
        `diary-slider-${item.id}`,
        `diary-time-${item.id}`
      );
    });
  }

  function renderDiaryEntryCard(item) {
    const audioUrl = item.audioBlob ? URL.createObjectURL(item.audioBlob) : '';
    const fb = item.feedback || {};

    return `
      <div class="diary-entry-card" id="diary-card-${item.id}">
        <div class="diary-entry-top">
          <div class="diary-meta-left">
            <span class="tag-part">Part ${item.part || 1}</span>
            <span class="tag-attempt">Lần ${item.attempt || 1}</span>
            <span class="tag-duration">${item.durationSec || 0}s</span>
            ${item.syncedToDrive
              ? '<span class="tag-cloud-drive" title="Đã lưu an toàn trên Google Drive của bạn">☁️ Google Drive</span>'
              : '<span class="tag-cloud-local" title="Đã lưu trên máy này">💾 Máy này</span>'}
          </div>
          <div class="diary-entry-actions">
            <button type="button" class="btn-diary-icon" title="Tải file audio về máy" onclick="window.speakingModule.downloadVoice('${item.id}')">
              ⬇ Tải về
            </button>
            <button type="button" class="btn-diary-icon btn-delete" title="Xóa bản ghi này" onclick="window.speakingModule.deleteVoice('${item.id}')">
              🗑
            </button>
          </div>
        </div>

        <div class="diary-entry-question">${escapeHtml(item.questionText)}</div>

        <!-- In-app player -->
        <div class="diary-entry-player-row">
          <div class="voice-player-inline">
            <button type="button" class="btn-audio-play" id="diary-play-btn-${item.id}" title="Nghe bài nói">
              ▶
            </button>
            <input type="range" class="voice-timeline-slider" id="diary-slider-${item.id}" value="0" min="0" max="${item.durationSec || 30}" step="0.1">
            <span class="voice-time-label" id="diary-time-${item.id}">0:00 / 0:${String(item.durationSec || 0).padStart(2, '0')}</span>
            <audio id="diary-audio-${item.id}" src="${audioUrl}" preload="metadata"></audio>
          </div>
        </div>

        <div class="diary-entry-bottom">
          <button type="button" class="btn-toggle-transcript" onclick="window.speakingModule.toggleDiaryTranscript('${item.id}')">
            📝 Xem lời thoại & bản sửa ▾
          </button>
        </div>

        <div class="diary-entry-expanded" id="diary-expanded-${item.id}" style="display: none;">
          <div class="expanded-section-title">Bạn đã nói:</div>
          <div class="expanded-section-content">"${escapeHtml(item.transcript)}"</div>
          ${fb.upgraded_version ? `
            <div class="expanded-section-title">Bản nói tự nhiên hơn (Band 6.5-7.0):</div>
            <div class="expanded-section-content">${fb.upgraded_version}</div>
          ` : ''}
        </div>
      </div>
    `;
  }

  async function handleDownloadVoice(id) {
    const item = await VoiceDB.get(id);
    if (!item || !item.audioBlob) {
      showToastMessage('Không tìm thấy file ghi âm.');
      return;
    }
    const ext = item.audioBlob.type?.includes('mp4') ? 'mp4' : 'webm';
    const fileName = `IELTS_Speaking_${item.dateStr}_P${item.part}_lan${item.attempt}.${ext}`;
    const url = URL.createObjectURL(item.audioBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    showToastMessage(`Đang tải file: ${fileName}`);
  }

  async function handleDeleteVoice(id) {
    if (confirm('Bạn có chắc chắn muốn xóa bản ghi âm này không?')) {
      await VoiceDB.delete(id);
      showToastMessage('Đã xóa bản ghi.');
      renderVoiceDiary();
    }
  }

  function handleToggleDiaryTranscript(id) {
    const el = document.getElementById(`diary-expanded-${id}`);
    if (!el) return;
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }

  async function handlePlayComparisonJourney() {
    const all = await VoiceDB.getAll();
    if (all.length < 2) return;

    // Oldest is at end of sorted list
    const oldest = all[all.length - 1];
    const newest = all[0];

    showToastMessage(`Đang phát Ngày đầu (${oldest.dateStr})... Tiếp theo sẽ tự động chuyển sang Hôm nay (${newest.dateStr})!`);

    const audioOld = new Audio(URL.createObjectURL(oldest.audioBlob));
    audioOld.play();

    audioOld.onended = () => {
      showToastMessage(`Tiếp theo: Lắng nghe giọng bạn ở bài nói mới nhất (${newest.dateStr})!`);
      const audioNew = new Audio(URL.createObjectURL(newest.audioBlob));
      audioNew.play();
    };
  }

  function handleRetrySecondAttempt() {
    currentAttemptNum = 2;
    const stage = document.getElementById('speak-now-stage');
    if (stage) stage.scrollIntoView({ behavior: 'smooth' });
    showToastMessage('Sẵn sàng cho Lần 2! Hãy bấm nút micro và áp dụng các cụm từ mới nhé.');
  }

  // --- ESCAPING UTILITIES ---
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
    return String(str)
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '');
  }

  // --- INITIALIZATION ---
  function init() {
    bindEvents();
    updateAPIStatusBadge();
    updateDriveAuthStatusUI();
    renderVoiceStatsBar();
    renderSpeakNowQuestion();
    renderVoiceDiary();
    renderTranslationHistory();
    renderQuestionCard();
    renderDailyHistory();

    // Init Google Identity Services
    GoogleDriveService.initGIS();
  }

  function switchTab(tabKey) {
    currentActiveTab = tabKey;
    const tabMap = {
      'speak-now': { btn: 'tab-btn-speak-now', panel: 'speaking-tab-speak-now' },
      'voice-diary': { btn: 'tab-btn-voice-diary', panel: 'speaking-tab-voice-diary' },
      'daily': { btn: 'tab-btn-daily', panel: 'speaking-tab-daily' },
      'translate': { btn: 'tab-btn-translate', panel: 'speaking-tab-translate' },
      'roleplay': { btn: 'tab-btn-roleplay', panel: 'speaking-tab-roleplay' }
    };

    Object.keys(tabMap).forEach(k => {
      const btn = document.getElementById(tabMap[k].btn);
      const panel = document.getElementById(tabMap[k].panel);
      const isActive = k === tabKey;
      if (btn) btn.classList.toggle('active', isActive);
      if (panel) panel.style.display = isActive ? 'block' : 'none';
    });

    if (tabKey === 'speak-now') {
      renderSpeakNowQuestion();
    } else if (tabKey === 'voice-diary') {
      renderVoiceDiary();
    }
  }

  function bindEvents() {
    // 4-Tab Switching
    const tabBtnSpeakNow = document.getElementById('tab-btn-speak-now');
    const tabBtnVoiceDiary = document.getElementById('tab-btn-voice-diary');
    const tabBtnDaily = document.getElementById('tab-btn-daily');
    const tabBtnTranslate = document.getElementById('tab-btn-translate');

    if (tabBtnSpeakNow) tabBtnSpeakNow.addEventListener('click', () => switchTab('speak-now'));
    if (tabBtnVoiceDiary) tabBtnVoiceDiary.addEventListener('click', () => switchTab('voice-diary'));
    if (tabBtnDaily) tabBtnDaily.addEventListener('click', () => switchTab('daily'));
    if (tabBtnTranslate) tabBtnTranslate.addEventListener('click', () => switchTab('translate'));
    const tabBtnRoleplay = document.getElementById('tab-btn-roleplay');
    if (tabBtnRoleplay) tabBtnRoleplay.addEventListener('click', () => switchTab('roleplay'));

    // Speak Now Record Controls
    const btnRecordSpeakNow = document.getElementById('btn-record-speak-now');
    const btnFinishRecording = document.getElementById('btn-finish-recording');
    const btnCancelRecording = document.getElementById('btn-cancel-recording');

    if (btnRecordSpeakNow) btnRecordSpeakNow.addEventListener('click', handleToggleRecordSpeakNow);
    if (btnFinishRecording) btnFinishRecording.addEventListener('click', handleFinishRecording);
    if (btnCancelRecording) btnCancelRecording.addEventListener('click', handleCancelRecording);

    // Google Drive Sync Button in Voice Diary
    const btnDriveSync = document.getElementById('btn-toggle-drive-sync');
    if (btnDriveSync) {
      btnDriveSync.addEventListener('click', () => {
        GoogleDriveService.requestToken();
      });
    }

    // Google Drive Connect Button in Settings Modal
    const btnConnectDriveModal = document.getElementById('btn-connect-google-drive');
    if (btnConnectDriveModal) {
      btnConnectDriveModal.addEventListener('click', () => {
        const driveInput = document.getElementById('speaking-drive-client-id');
        if (driveInput) {
          config.driveClientId = driveInput.value.trim();
          saveConfig({ driveClientId: config.driveClientId });
        }
        GoogleDriveService.requestToken();
      });
    }

    // Progress Comparison Button in Voice Diary
    const btnCompareJourney = document.getElementById('btn-play-compare-journey');
    if (btnCompareJourney) {
      btnCompareJourney.addEventListener('click', handlePlayComparisonJourney);
    }

    // Quick translate tag clicks
    document.querySelectorAll('.quick-sample-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const input = document.getElementById('speaking-translate-input');
        if (input) {
          input.value = tag.getAttribute('data-text') || tag.textContent.trim();
          input.focus();
        }
      });
    });

    // Translate button & Ctrl+Enter
    const btnTranslate = document.getElementById('btn-do-translate');
    const translateInput = document.getElementById('speaking-translate-input');
    if (btnTranslate) {
      btnTranslate.addEventListener('click', handleTranslate);
    }
    if (translateInput) {
      translateInput.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          handleTranslate();
        }
      });
    }

    // Part switcher (Daily Tab)
    document.querySelectorAll('.part-switch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.part-switch-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPart = parseInt(btn.getAttribute('data-part'), 10) || 1;
        renderQuestionCard();
        renderSpeakNowQuestion();
      });
    });

    // Topic source switcher (classic vs forecast)
    document.querySelectorAll('.source-switch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.source-switch-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSource = btn.getAttribute('data-source') || 'classic';
        renderQuestionCard();
        renderSpeakNowQuestion();
      });
    });

    // User answer input (word count & auto draft saving)
    const textarea = document.getElementById('daily-user-answer');
    if (textarea) {
      textarea.addEventListener('input', (e) => {
        const val = e.target.value;
        updateWordCount(val);
        if (currentQuestion) {
          state.drafts[currentQuestion.id] = val;
          saveState();
        }
      });
    }

    // Submit daily answer
    const btnSubmitDaily = document.getElementById('btn-submit-daily');
    if (btnSubmitDaily) {
      btnSubmitDaily.addEventListener('click', handleSubmitDailyAnswer);
    }

    // AI Settings Modal Open/Close/Test/Save
    const btnOpenSettings = document.getElementById('btn-open-ai-settings');
    const badgeSettings = document.getElementById('speaking-api-badge');
    const btnCloseModal = document.getElementById('btn-close-ai-settings');
    const btnCancelModal = document.getElementById('btn-cancel-ai-settings');
    const btnSaveModal = document.getElementById('btn-save-ai-settings');
    const btnTestModal = document.getElementById('btn-test-gemini');
    const btnToggleKeyVis = document.getElementById('btn-toggle-key-vis');

    const selectModel = document.getElementById('speaking-model-select');
    const customWrap = document.getElementById('custom-model-wrapper');
    const customInput = document.getElementById('speaking-custom-model-input');
    if (selectModel && customWrap) {
      selectModel.addEventListener('change', () => {
        if (selectModel.value === 'custom') {
          customWrap.style.display = 'block';
          if (customInput) customInput.focus();
        } else {
          customWrap.style.display = 'none';
        }
      });
    }

    if (btnOpenSettings) btnOpenSettings.addEventListener('click', openAISettingsModal);
    if (badgeSettings) badgeSettings.addEventListener('click', openAISettingsModal);
    if (btnCloseModal) btnCloseModal.addEventListener('click', closeAISettingsModal);
    if (btnCancelModal) btnCancelModal.addEventListener('click', closeAISettingsModal);
    if (btnSaveModal) btnSaveModal.addEventListener('click', handleSaveAISettings);
    if (btnTestModal) btnTestModal.addEventListener('click', handleTestAPIConnection);

    if (btnToggleKeyVis) {
      btnToggleKeyVis.addEventListener('click', () => {
        const inputKey = document.getElementById('speaking-api-key-input');
        if (inputKey) {
          if (inputKey.type === 'password') {
            inputKey.type = 'text';
            btnToggleKeyVis.textContent = '🙈';
          } else {
            inputKey.type = 'password';
            btnToggleKeyVis.textContent = '👁️';
          }
        }
      });
    }

    // Back to flashcards button
    const btnBack = document.getElementById('btn-back-to-flashcard');
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        if (typeof window.selectCategory === 'function') {
          window.selectCategory('words');
        }
      });
    }

    // Clear draft button
    const btnClearDraft = document.getElementById('btn-clear-daily-draft');
    if (btnClearDraft) {
      btnClearDraft.addEventListener('click', () => {
        if (textarea && confirm('Bạn có muốn xóa bài đang viết dở để làm lại không?')) {
          textarea.value = '';
          updateWordCount('');
          if (currentQuestion) {
            delete state.drafts[currentQuestion.id];
            saveState();
          }
        }
      });
    }
  }

  // --- PUBLIC API EXPOSED ON WINDOW ---
  window.speakingModule = {
    init: init,
    speak: speak,
    openAISettings: openAISettingsModal,

    onActivate: function () {
      updateAPIStatusBadge();
      updateDriveAuthStatusUI();
      renderVoiceStatsBar();
      renderSpeakNowQuestion();
      renderVoiceDiary();
    },

    savePhrase: function (index, source) {
      let list = [];
      if (source === 'translate') list = window.__currentTranslatePhrases;
      else if (source === 'speak_now') list = window.__currentSpeakNowPhrases;
      else list = window.__currentDailyPhrases;

      if (!list || !list[index]) return;
      saveToFlashcardCollocation(list[index]);
    },

    saveCustomCard: function (english, vietnamese) {
      saveToFlashcardCollocation({
        en: english,
        vi: vietnamese,
        exampleEn: english,
        exampleVi: vietnamese
      });
    },

    changeQuestion: function () {
      const offsetKey = `${currentPart}_${currentSource}`;
      state.skipOffsets[offsetKey] = (state.skipOffsets[offsetKey] || 0) + 1;
      saveState();
      renderQuestionCard();
      renderSpeakNowQuestion();
      currentAttemptNum = 1;
      lastAttempt1 = null;
      const feedbackBox = document.getElementById('speak-now-feedback-container');
      if (feedbackBox) feedbackBox.style.display = 'none';
    },

    retrySecondAttempt: handleRetrySecondAttempt,
    downloadVoice: handleDownloadVoice,
    deleteVoice: handleDeleteVoice,
    toggleDiaryTranscript: handleToggleDiaryTranscript,
    playComparisonJourney: handlePlayComparisonJourney,

    toggleHints: handleToggleHints,

    insertHintPhrase: function (phraseText) {
      const textarea = document.getElementById('daily-user-answer');
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;
      const insert = ` ${phraseText} `;
      textarea.value = val.substring(0, start) + insert + val.substring(end);
      textarea.focus();
      textarea.setSelectionRange(start + insert.length, start + insert.length);
      updateWordCount(textarea.value);
    },

    recallTranslation: function (idx) {
      const item = state.translations[idx];
      if (!item) return;
      const input = document.getElementById('speaking-translate-input');
      if (input) input.value = item.vi;
      renderTranslationResult(item.vi, item.result);
    },

    clearTranslateHistory: function () {
      if (confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử dịch không?')) {
        state.translations = [];
        saveState();
        renderTranslationHistory();
      }
    },

    recallAnswer: function (idx) {
      const item = state.answers[idx];
      if (!item) return;
      currentPart = item.part;
      currentSource = item.source || 'classic';

      document.querySelectorAll('.part-switch-btn').forEach(b => {
        b.classList.toggle('active', parseInt(b.getAttribute('data-part'), 10) === currentPart);
      });
      document.querySelectorAll('.source-switch-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-source') === currentSource);
      });

      renderQuestionCard();
      renderSpeakNowQuestion();
      const textarea = document.getElementById('daily-user-answer');
      if (textarea) {
        textarea.value = item.answer;
        updateWordCount(item.answer);
      }
      if (item.feedback) {
        renderFeedbackResult(item.answer, item.feedback);
      }
    }
  };

  // Bridge for roleplay.js (reuses recorder, Gemini callers & helpers)
  window.SpeakingCore = {
    callGemini, callGeminiWithAudio, VoiceRecorder, speak, escapeHtml,
    showToast: showToastMessage,
    saveFlashcard: saveToFlashcardCollocation,
    addSpokenSeconds(sec) {
      const today = getTodayDateString();
      voiceStats.dailySpokenSec[today] = (voiceStats.dailySpokenSec[today] || 0) + sec;
      saveVoiceStats();
    }
  };

  // Auto init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
