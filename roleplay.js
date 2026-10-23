/**
 * 🎭 NHẬP VAI (ROLEPLAY) — trò chuyện với nhân vật AI bằng giọng nói hoặc chữ.
 * Dùng lại recorder + Gemini callers từ speaking.js qua window.SpeakingCore.
 */
(function () {
  'use strict';

  const SESSION_KEY = 'roleplay_session_v1';

  const CATEGORIES = { movie: '🎬 Phim ảnh', daily: '🏙️ Đời thường', fun: '😂 Vui nhộn' };

  const SCENARIOS = [
    { id: 'wand', cat: 'movie', emoji: '🧙', title: 'Mua đũa phép ở Hẻm Xéo', char: 'Mr. Ollivander',
      role: 'Mr. Ollivander, the mysterious old wand maker in Diagon Alley (Harry Potter world). The learner is a new young wizard buying a first wand.',
      mission: 'Mua cây đũa phép đầu tiên: hỏi giá, thử đũa, hỏi đũa làm từ gì.',
      opener: 'Ah, a new face! Welcome to my shop. Tell me, young wizard, which hand do you use for magic?',
      hints: ['I use my right hand.', 'Can I try this wand, please?'] },
    { id: 'sherlock', cat: 'movie', emoji: '🕵️', title: 'Bị Sherlock thẩm vấn', char: 'Sherlock Holmes',
      role: 'Sherlock Holmes, the brilliant, slightly arrogant detective. The learner is a suspect: a chocolate cake vanished from Mrs. Hudson\'s kitchen at 9 p.m. last night. Ask sharp questions, notice details, be playful.',
      mission: 'Bạn là nghi phạm vụ mất bánh kem. Hãy chứng minh mình vô tội!',
      opener: 'Sit down. A chocolate cake vanished from Mrs. Hudson\'s kitchen at 9 p.m. last night. Where exactly were you?',
      hints: ['I was at home watching TV.', 'I don\'t even like chocolate!'] },
    { id: 'pirate', cat: 'movie', emoji: '🏴‍☠️', title: 'Xin gia nhập tàu cướp biển', char: 'Captain Redbeard',
      role: 'Captain Redbeard, a loud, funny pirate captain who talks like a pirate ("Arr", "ye"). The learner wants to join the crew.',
      mission: 'Thuyết phục thuyền trưởng nhận bạn vào đoàn: kể kỹ năng và lý do.',
      opener: 'Arr! So ye want to join my crew, eh? Tell me, landlubber, what can ye do on a ship?',
      hints: ['I can cook very well.', 'I\'m good at swimming.'] },
    { id: 'chef', cat: 'movie', emoji: '👨‍🍳', title: 'Đầu bếp khó tính chấm món', char: 'Chef Gordon',
      role: 'Chef Gordon, a famous, very strict TV chef. Dramatic and funny, never offensive. The learner is a contestant presenting a dish.',
      mission: 'Giới thiệu món bạn nấu và bảo vệ nó trước vị đầu bếp khó tính.',
      opener: 'Right! What have you cooked for me today? Describe it — and it had better be good!',
      hints: ['I made Vietnamese pho.', 'It\'s my grandmother\'s recipe.'] },
    { id: 'hero', cat: 'movie', emoji: '🦸', title: 'Phỏng vấn siêu anh hùng', char: 'Lisa — TV reporter',
      role: 'Lisa, an excited TV news reporter interviewing the city\'s newest superhero (the learner) live on air.',
      mission: 'Bạn là siêu anh hùng mới. Kể về siêu năng lực và trận chiến gần nhất.',
      opener: 'Breaking news! I\'m here with the city\'s newest superhero. So, tell our viewers — what\'s your superpower?',
      hints: ['I can fly very fast.', 'I can talk to animals.'] },
    { id: 'zombie', cat: 'fun', emoji: '🧟', title: 'Sống sót giữa đại dịch zombie', char: 'Jake — your teammate',
      role: 'Jake, a nervous but brave survivor in a zombie apocalypse, whispering. The learner is his teammate; together you must plan an escape from the city.',
      mission: 'Cùng đồng đội lên kế hoạch thoát khỏi thành phố đầy zombie.',
      opener: 'Shh! Keep your voice down. They\'re right outside. We need a plan — what do we have in our bags?',
      hints: ['We have some water and a map.', 'Let\'s go to the roof.'] },
    { id: 'alien', cat: 'fun', emoji: '👽', title: 'Giải thích Trái Đất cho người ngoài hành tinh', char: 'Zorp',
      role: 'Zorp, a curious, friendly alien who just landed on Earth and misunderstands everything in funny ways. The learner explains Earth life (bubble tea, phones, traffic...).',
      mission: 'Giải thích cho Zorp về cuộc sống trên Trái Đất: trà sữa, điện thoại, kẹt xe...',
      opener: 'Greetings, human! I just landed. What is this strange drink with black balls everyone is holding? Explain, please!',
      hints: ['It\'s called bubble tea.', 'You drink it with a big straw.'] },
    { id: 'market', cat: 'fun', emoji: '🛍️', title: 'Bán hàng ở chợ Bến Thành', char: 'Emma — a tourist',
      role: 'Emma, a friendly tourist from Australia shopping at Ben Thanh Market. The learner is the seller. Bargain hard but cheerfully.',
      mission: 'Bạn là người bán: chào hàng, báo giá và trả giá với khách du lịch.',
      opener: 'Hello! How much is this T-shirt? It looks nice, but I don\'t have much money...',
      hints: ['It\'s 200,000 dong.', 'I can give you a discount.'] },
    { id: 'date', cat: 'fun', emoji: '💘', title: 'Buổi hẹn hò đầu tiên', char: 'Alex',
      role: 'Alex, a charming, slightly awkward person on a first date with the learner at a restaurant. Light, wholesome and friendly.',
      mission: 'Làm quen: hỏi sở thích, công việc và hẹn gặp lần sau.',
      opener: 'Hi! Sorry I\'m a little late — the traffic was crazy. So... have you been to this restaurant before?',
      hints: ['No, it\'s my first time here.', 'Don\'t worry, I just arrived too.'] },
    { id: 'cafe', cat: 'daily', emoji: '☕', title: 'Gọi đồ ở quán cà phê', char: 'Mia — barista',
      role: 'Mia, a cheerful barista at Sunny Café. Ask about size, ice, sugar, takeaway, payment.',
      mission: 'Gọi đồ uống theo ý bạn, hỏi size, giá và thanh toán.',
      opener: 'Hi there! Welcome to Sunny Café. What can I get for you today?',
      hints: ['Can I have an iced latte, please?', 'What do you recommend?'] },
    { id: 'airport', cat: 'daily', emoji: '🛃', title: 'Qua cửa hải quan sân bay', char: 'Officer Brown',
      role: 'Officer Brown, a serious but fair immigration officer at a US airport.',
      mission: 'Trả lời câu hỏi nhập cảnh: mục đích chuyến đi, ở đâu, bao lâu.',
      opener: 'Good afternoon. Passport, please. What\'s the purpose of your visit?',
      hints: ['I\'m here on vacation.', 'I\'m visiting my friend.'] },
    { id: 'hotel', cat: 'daily', emoji: '🏨', title: 'Phàn nàn với khách sạn', char: 'Daniel — receptionist',
      role: 'Daniel, a polite hotel receptionist. The learner calls to complain about the room; offer solutions but not too easily.',
      mission: 'Phàn nàn về phòng (máy lạnh hỏng, ồn ào...) và yêu cầu đổi phòng.',
      opener: 'Good evening, front desk. How can I help you?',
      hints: ['The air conditioner doesn\'t work.', 'My room is too noisy.'] },
    { id: 'doctor', cat: 'daily', emoji: '🩺', title: 'Đi khám bác sĩ', char: 'Dr. Smith',
      role: 'Dr. Smith, a kind family doctor. Ask about symptoms, how long, and give simple advice.',
      mission: 'Mô tả triệu chứng và hỏi bác sĩ cách điều trị.',
      opener: 'Hello, please have a seat. So, what seems to be the problem today?',
      hints: ['I have a bad headache.', 'I\'ve had a fever since yesterday.'] },
    { id: 'interview', cat: 'daily', emoji: '💼', title: 'Phỏng vấn xin việc', char: 'Ms. Taylor — HR manager',
      role: 'Ms. Taylor, a friendly but professional HR manager interviewing the learner for a job they want.',
      mission: 'Giới thiệu bản thân, điểm mạnh và thuyết phục nhà tuyển dụng.',
      opener: 'Thanks for coming in. Let\'s start simple — can you tell me a little about yourself?',
      hints: ['My name is Thanh and I\'m from Vietnam.', 'I\'m a hard-working person.'] }
  ];

  let core = null;
  let session = loadSession(); // { sc, messages: [{who, text, vi?, fix?}], hints }
  let filter = 'all';
  let busy = false;
  let recTimer = null;

  const $ = (id) => document.getElementById(id);

  function loadSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; } catch (e) { return null; }
  }
  function saveSession() {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else localStorage.removeItem(SESSION_KEY);
  }

  // ---------- PICKER ----------
  function renderPicker() {
    const chips = [['all', '✨ Tất cả'], ...Object.entries(CATEGORIES)];
    $('rp-filter-row').innerHTML = chips.map(([k, label]) =>
      `<button type="button" class="rp-filter-chip${k === filter ? ' active' : ''}" data-filter="${k}">${label}</button>`).join('');

    const list = SCENARIOS.filter(s => filter === 'all' || s.cat === filter);
    $('rp-scenario-grid').innerHTML = list.map(s => `
      <button type="button" class="rp-scenario-card rp-cat-${s.cat}" data-id="${s.id}">
        <span class="rp-scenario-emoji">${s.emoji}</span>
        <span class="rp-scenario-title">${core.escapeHtml(s.title)}</span>
        <span class="rp-scenario-char">với ${core.escapeHtml(s.char)}</span>
        <span class="rp-scenario-mission">${core.escapeHtml(s.mission)}</span>
      </button>`).join('');
  }

  function showView() {
    const inChat = !!session;
    $('rp-picker').style.display = inChat ? 'none' : 'block';
    $('rp-stage').style.display = inChat ? 'block' : 'none';
    if (inChat) renderStage(); else renderPicker();
  }

  function startScenario(sc) {
    session = { sc, messages: [{ who: 'ai', text: sc.opener }], hints: sc.hints || [] };
    saveSession();
    showView();
    core.speak(sc.opener);
  }

  async function startCustom() {
    const idea = $('rp-custom-input').value.trim();
    if (!idea || busy) return;
    busy = true;
    const btn = $('rp-custom-start');
    btn.disabled = true; btn.textContent = 'Đang dựng cảnh...';
    try {
      const d = await core.callGemini(
        `Create a fun English speaking role-play for a Vietnamese learner (B1). The learner's idea (may be Vietnamese): """${idea}"""
Return JSON only: {"title_vi": "short Vietnamese title", "emoji": "1 emoji", "char": "AI character name", "role": "1-2 English sentences describing the AI character and what the learner is doing", "mission_vi": "learner's goal in Vietnamese", "opener": "character's first line in simple English, ending with a question", "hints": ["2 short possible learner replies"]}`);
      startScenario({ id: 'custom', cat: 'fun', emoji: d.emoji || '✨', title: d.title_vi || idea, char: d.char || 'AI',
        role: d.role || idea, mission: d.mission_vi || idea, opener: d.opener || 'Hi! Shall we start?', hints: d.hints || [] });
      $('rp-custom-input').value = '';
    } catch (err) {
      core.showToast(err.message);
    } finally {
      busy = false; btn.disabled = false; btn.textContent = 'Bắt đầu';
    }
  }

  // ---------- CHAT ----------
  function renderStage() {
    const { sc } = session;
    $('rp-char-avatar').textContent = sc.emoji;
    $('rp-char-name').textContent = sc.char;
    $('rp-char-scene').textContent = sc.title;
    $('rp-mission').innerHTML = `🎯 <strong>Nhiệm vụ:</strong> ${core.escapeHtml(sc.mission)}`;
    renderChat();
  }

  function renderChat() {
    const esc = core.escapeHtml;
    const html = session.messages.map((m, i) => {
      if (m.who === 'ai') {
        return `<div class="rp-msg rp-msg-ai">
          <span class="rp-msg-avatar">${session.sc.emoji}</span>
          <div class="rp-bubble">
            <div class="rp-bubble-text">${esc(m.text)}</div>
            ${m.vi ? `<div class="rp-bubble-vi" id="rp-vi-${i}" hidden>${esc(m.vi)}</div>` : ''}
            <div class="rp-bubble-actions">
              <button type="button" class="rp-icon-btn" data-speak="${i}" title="Nghe lại">🔊</button>
              ${m.vi ? `<button type="button" class="rp-icon-btn" data-vi="${i}" title="Xem nghĩa tiếng Việt">🇻🇳</button>` : ''}
            </div>
          </div>
        </div>`;
      }
      return `<div class="rp-msg rp-msg-me">
        <div class="rp-bubble">
          <div class="rp-bubble-text">${m.voice ? '🎙️ ' : ''}${esc(m.text)}</div>
          ${m.fix && m.fix.natural ? `<div class="rp-fix">
            <div class="rp-fix-label">💡 Nói tự nhiên hơn</div>
            <div class="rp-fix-text">${esc(m.fix.natural)}
              <button type="button" class="rp-icon-btn" data-speak-fix="${i}" title="Nghe">🔊</button></div>
            ${m.fix.note_vi ? `<div class="rp-fix-note">${esc(m.fix.note_vi)}</div>` : ''}
          </div>` : ''}
        </div>
      </div>`;
    }).join('') + (busy ? `<div class="rp-msg rp-msg-ai"><span class="rp-msg-avatar">${session.sc.emoji}</span>
      <div class="rp-bubble rp-typing"><span></span><span></span><span></span></div></div>` : '');

    const chat = $('rp-chat');
    chat.innerHTML = html;
    chat.scrollTop = chat.scrollHeight;

    $('rp-hints').innerHTML = !busy && session.hints.length
      ? `<span class="rp-hints-label">Gợi ý:</span>` + session.hints.map(h =>
        `<button type="button" class="rp-hint-chip" data-hint="${esc(h)}">${esc(h)}</button>`).join('')
      : '';
  }

  function transcriptText() {
    return session.messages.map(m => `${m.who === 'ai' ? 'CHARACTER' : 'LEARNER'}: ${m.text}`).join('\n');
  }

  function systemPrompt() {
    const { sc } = session;
    return `You are role-playing as ${sc.char}. Scene: ${sc.role}
The learner's goal: ${sc.mission}
The learner is a Vietnamese English learner (around B1). Stay fully in character, be expressive and fun, but use simple, natural spoken English: 1-3 short sentences (max ~40 words). Always end with a question or something that invites a reply. Keep the story moving with small surprises.
The learner may mix in Vietnamese words when stuck — understand them and continue naturally.
Return ONLY JSON:
{
  "heard": "exactly what the learner said (put Vietnamese words in parentheses). For typed input, copy it.",
  "fix": null or {"natural": "how a native speaker would naturally say the learner's line, same meaning", "note_vi": "very short Vietnamese explanation of the main change"},
  "reply": "your in-character reply",
  "reply_vi": "Vietnamese translation of your reply",
  "hints": ["2 short, different things the learner could say next (B1)"]
}
Only give "fix" when there is a real grammar mistake, a Vietnamese word, or a clearly unnatural phrase; otherwise null.`;
  }

  async function sendTurn({ text, audio, durationSec }) {
    if (busy || !session) return;
    busy = true;
    renderChat();
    try {
      const history = `Conversation so far:\n${transcriptText()}\n\n`;
      const d = audio
        ? await core.callGeminiWithAudio(audio, history + 'The learner\'s new line is in the attached audio.', systemPrompt())
        : await core.callGemini(history + `The learner's new line (typed): """${text}"""`, systemPrompt());

      session.messages.push({ who: 'me', text: d.heard || text || '...', voice: !!audio, fix: d.fix || null });
      session.messages.push({ who: 'ai', text: d.reply || '...', vi: d.reply_vi || '' });
      session.hints = Array.isArray(d.hints) ? d.hints.slice(0, 3) : [];
      saveSession();
      if (!audio) $('rp-text').value = '';
      if (durationSec) core.addSpokenSeconds(durationSec);
      busy = false;
      renderChat();
      core.speak(d.reply || '');
    } catch (err) {
      busy = false;
      renderChat();
      core.showToast(err.message || 'Có lỗi, bạn thử lại nhé!');
    }
  }

  function sendText() {
    const text = $('rp-text').value.trim();
    if (text) sendTurn({ text });
  }

  // ---------- VOICE ----------
  async function toggleMic() {
    const rec = core.VoiceRecorder;
    if (busy) return;
    if (rec.isRecording) return finishMic();
    try {
      rec.onLimit = finishMic;
      await rec.start();
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      $('rp-mic').classList.add('is-recording');
      clearInterval(recTimer);
      const tick = () => {
        const s = rec.durationSec;
        $('rp-rec-status').innerHTML = `<span class="recording-live-dot"></span> Đang nghe... ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')} — chạm 🎙️ lần nữa để gửi`;
      };
      tick();
      recTimer = setInterval(tick, 500);
    } catch (err) {
      rec.onLimit = null;
      core.showToast(err.message || 'Không mở được micro.');
    }
  }

  async function finishMic() {
    const rec = core.VoiceRecorder;
    clearInterval(recTimer);
    $('rp-mic').classList.remove('is-recording');
    $('rp-rec-status').textContent = '';
    const result = await rec.stop();
    rec.onLimit = null;
    if (!result || result.durationSec < 1) {
      core.showToast('Bản ghi hơi ngắn, bạn nói lại nhé!');
      return;
    }
    sendTurn({ audio: result.audioBlob, durationSec: result.durationSec });
  }

  // ---------- SUMMARY ----------
  async function endSession() {
    if (busy || !session) return;
    if (session.messages.filter(m => m.who === 'me').length === 0) {
      core.showToast('Hãy nói ít nhất 1 câu trước khi kết thúc nhé!');
      return;
    }
    const box = $('rp-summary');
    box.style.display = 'block';
    box.innerHTML = `<div class="rp-typing rp-summary-loading"><span></span><span></span><span></span></div><p class="rp-muted">AI đang tổng kết cuộc trò chuyện...</p>`;
    busy = true;
    try {
      const d = await core.callGemini(
        `Role-play scene: ${session.sc.role}\nLearner's goal: ${session.sc.mission}\n\n${transcriptText()}`,
        `You are a warm English speaking coach for a Vietnamese learner (B1). Review the LEARNER's lines in this role-play.
Return ONLY JSON:
{
  "score": "fun overall score out of 10, e.g. 7.5",
  "mission_done": true or false,
  "praise_vi": ["2 specific, encouraging points in Vietnamese"],
  "mistakes": [{"wrong": "learner's words", "right": "natural version", "why_vi": "short Vietnamese explanation"}],
  "phrases": [{"en": "useful phrase for this situation", "ipa": "/.../", "vi": "nghĩa tiếng Việt", "example": "short example sentence"}],
  "next_vi": "ONE tip in Vietnamese for next time"
}
Max 3 mistakes (only real ones), 3-5 phrases.`);
      renderSummary(d);
    } catch (err) {
      box.innerHTML = `<p class="rp-muted">❌ ${core.escapeHtml(err.message)}</p>`;
    } finally {
      busy = false;
    }
  }

  function renderSummary(d) {
    const esc = core.escapeHtml;
    const phrases = Array.isArray(d.phrases) ? d.phrases : [];
    $('rp-summary').innerHTML = `
      <div class="rp-summary-head">
        <div class="rp-score">${esc(String(d.score || '–'))}<small>/10</small></div>
        <div>
          <h4>🏁 Tổng kết vai diễn</h4>
          <p class="rp-muted">${d.mission_done ? '✅ Bạn đã hoàn thành nhiệm vụ!' : '⏳ Nhiệm vụ chưa xong — lần sau thử tiếp nhé!'}</p>
        </div>
      </div>
      ${(d.praise_vi || []).map(p => `<div class="rp-praise">🌟 ${esc(p)}</div>`).join('')}
      ${(d.mistakes || []).length ? `<h5>✏️ Sửa lỗi</h5>` + d.mistakes.map(m => `
        <div class="rp-mistake"><span class="rp-wrong">${esc(m.wrong)}</span> → <span class="rp-right">${esc(m.right)}</span>
          <div class="rp-fix-note">${esc(m.why_vi)}</div></div>`).join('') : ''}
      ${phrases.length ? `<h5>🧩 Cụm từ nên học</h5>` + phrases.map((p, i) => `
        <div class="rp-phrase">
          <div><strong>${esc(p.en)}</strong> <span class="rp-muted">${esc(p.ipa || '')}</span><div class="rp-fix-note">${esc(p.vi)}</div></div>
          <div class="rp-phrase-actions">
            <button type="button" class="rp-icon-btn" data-phrase-speak="${i}" title="Nghe">🔊</button>
            <button type="button" class="rp-icon-btn" data-phrase-save="${i}" title="Lưu vào Flashcards">➕</button>
          </div>
        </div>`).join('') : ''}
      ${d.next_vi ? `<div class="rp-next">🎯 <strong>Lần sau:</strong> ${esc(d.next_vi)}</div>` : ''}
      <div class="rp-summary-actions">
        <button type="button" class="btn-subtle" id="rp-replay">🔁 Chơi lại cảnh này</button>
        <button type="button" class="btn-primary" id="rp-new">🎭 Chọn cảnh khác</button>
      </div>`;
    $('rp-summary').dataset.phrases = JSON.stringify(phrases);
    $('rp-summary').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function leave() {
    if (core.VoiceRecorder.isRecording) { core.VoiceRecorder.cancel(); core.VoiceRecorder.onLimit = null; clearInterval(recTimer); }
    session = null;
    saveSession();
    $('rp-summary').style.display = 'none';
    $('rp-mic').classList.remove('is-recording');
    $('rp-rec-status').textContent = '';
    showView();
  }

  // ---------- EVENTS ----------
  function bind() {
    $('rp-filter-row').addEventListener('click', (e) => {
      const chip = e.target.closest('[data-filter]');
      if (chip) { filter = chip.dataset.filter; renderPicker(); }
    });
    $('rp-scenario-grid').addEventListener('click', (e) => {
      const card = e.target.closest('[data-id]');
      if (card) startScenario(SCENARIOS.find(s => s.id === card.dataset.id));
    });
    $('rp-custom-start').addEventListener('click', startCustom);
    $('rp-custom-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') startCustom(); });

    $('rp-back').addEventListener('click', () => {
      if (session.messages.length <= 1 || confirm('Rời cảnh này? Cuộc trò chuyện hiện tại sẽ bị xóa.')) leave();
    });
    $('rp-end').addEventListener('click', endSession);
    $('rp-send').addEventListener('click', sendText);
    $('rp-text').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); sendText(); } });
    $('rp-mic').addEventListener('click', toggleMic);

    $('rp-chat').addEventListener('click', (e) => {
      const t = e.target.closest('button');
      if (!t) return;
      const m = session.messages[t.dataset.speak ?? t.dataset.speakFix ?? t.dataset.vi];
      if (t.dataset.speak !== undefined) core.speak(m.text);
      else if (t.dataset.speakFix !== undefined) core.speak(m.fix.natural);
      else if (t.dataset.vi !== undefined) { const el = $('rp-vi-' + t.dataset.vi); el.hidden = !el.hidden; }
    });
    $('rp-hints').addEventListener('click', (e) => {
      const chip = e.target.closest('[data-hint]');
      if (chip) { $('rp-text').value = chip.dataset.hint; $('rp-text').focus(); core.speak(chip.dataset.hint); }
    });
    $('rp-summary').addEventListener('click', (e) => {
      const t = e.target.closest('button');
      if (!t) return;
      if (t.id === 'rp-new') return leave();
      if (t.id === 'rp-replay') { const sc = session.sc; $('rp-summary').style.display = 'none'; return startScenario(sc); }
      const phrases = JSON.parse($('rp-summary').dataset.phrases || '[]');
      const p = phrases[t.dataset.phraseSpeak ?? t.dataset.phraseSave];
      if (!p) return;
      if (t.dataset.phraseSpeak !== undefined) core.speak(p.en);
      else {
        core.saveFlashcard({ en: p.en, vi: p.vi, ipa: p.ipa, exampleEn: p.example || p.en });
        t.textContent = '✅'; t.disabled = true;
      }
    });
  }

  function init() {
    core = window.SpeakingCore;
    if (!core || !$('speaking-tab-roleplay')) return;
    bind();
    showView();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
