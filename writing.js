/**
 * WRITING • IELTS ACADEMIC TASK 1 & TASK 2
 * - Đề tự soạn theo dạng đề IELTS (số liệu Task 1 chỉ để minh hoạ)
 * - Đồng hồ đếm ngược 20/40 phút, đếm từ, tự lưu nháp
 * - AI chấm theo 4 tiêu chí chính thức (dùng Gemini đã cài trong mục Speaking)
 * - Viết lại phần yếu nhất, lịch sử bài lưu trong lịch học (đồng bộ qua todayModule)
 */
(function () {
  'use strict';

  const DRAFT_KEY = 'ielts_writing_draft_v1';
  const CFG = {
    task1: { label: 'Task 1', minutes: 20, minWords: 150, criteria: ['Task Achievement', 'Coherence and Cohesion', 'Lexical Resource', 'Grammatical Range and Accuracy'] },
    task2: { label: 'Task 2', minutes: 40, minWords: 250, criteria: ['Task Response', 'Coherence and Cohesion', 'Lexical Resource', 'Grammatical Range and Accuracy'] }
  };
  const CRITERIA_VI = {
    'Task Achievement': 'Hoàn thành yêu cầu', 'Task Response': 'Trả lời đề',
    'Coherence and Cohesion': 'Mạch lạc & liên kết', 'Lexical Resource': 'Từ vựng',
    'Grammatical Range and Accuracy': 'Ngữ pháp'
  };
  const T2_INSTR = 'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.';
  const T1_INSTR = 'Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.';

  const TASK2 = [
    ['t2-01', 'Thảo luận 2 quan điểm', 'Some people say that schools should focus on teaching practical life skills, such as managing money and cooking, while others believe academic subjects should remain the priority. Discuss both views and give your own opinion.'],
    ['t2-02', 'Lợi ích – Bất lợi', 'Many people now work from home for at least part of the week. Do the advantages of this trend outweigh the disadvantages?'],
    ['t2-03', 'Nguyên nhân – Giải pháp', 'Plastic waste is increasing in many countries. What are the causes of this problem, and what measures could be taken to reduce it?'],
    ['t2-04', 'Đồng ý – Không đồng ý', 'Governments should tax sugary drinks and fast food to improve public health. To what extent do you agree or disagree?'],
    ['t2-05', 'Câu hỏi kép', 'In many countries, young people are leaving rural areas to find work in cities. Why is this happening? Is it a positive or negative development?'],
    ['t2-06', 'Thảo luận 2 quan điểm', 'Some employers prefer to hire people with university degrees, while others value work experience more highly. Discuss both views and give your own opinion.'],
    ['t2-07', 'Lợi ích – Bất lợi', 'Social media makes it easier for people to stay informed, but it also spreads false information quickly. Do the advantages outweigh the disadvantages?'],
    ['t2-08', 'Thảo luận 2 quan điểm', 'Some people believe that the best way to reduce crime is to give offenders longer prison sentences. Others think there are better ways to reduce crime. Discuss both views and give your own opinion.'],
    ['t2-09', 'Đồng ý – Không đồng ý', 'Building more roads is not the best way to reduce traffic congestion in cities. To what extent do you agree or disagree?'],
    ['t2-10', 'Câu hỏi kép', 'As international travel becomes cheaper, local cultures in popular tourist destinations are changing. Why is this happening? Is it a positive or negative development?'],
    ['t2-11', 'Nguyên nhân – Ảnh hưởng', 'In some countries, more and more adults are choosing to live alone. What are the reasons for this, and what effects does it have on society?'],
    ['t2-12', 'Thảo luận 2 quan điểm', 'Some people think governments should spend money on public art and museums, while others believe this money should go to healthcare and education. Discuss both views and give your own opinion.'],
    ['t2-13', 'Vấn đề – Giải pháp', 'Children today spend many hours a day using smartphones and tablets. What problems can this cause, and how can parents and schools deal with them?'],
    ['t2-14', 'Đồng ý – Không đồng ý', 'Individuals can do very little to protect the environment; only governments and large companies can make a real difference. To what extent do you agree or disagree?'],
    ['t2-15', 'Đồng ý – Không đồng ý', 'Online courses will soon replace traditional classroom learning. To what extent do you agree or disagree?'],
    ['t2-16', 'Vấn đề – Giải pháp', 'Artificial intelligence is expected to replace many jobs in the coming decades. What problems might this cause, and what can be done to prepare for it?'],
    ['t2-17', 'Vấn đề – Giải pháp', 'The proportion of older people in many countries is rising. What challenges does this create, and how can societies respond to them?'],
    ['t2-18', 'Đồng ý – Không đồng ý', 'Professional athletes are paid far too much money compared with other workers. To what extent do you agree or disagree?'],
    ['t2-19', 'Đồng ý – Không đồng ý', 'The money spent on space exploration would be better used to solve problems on Earth. To what extent do you agree or disagree?'],
    ['t2-20', 'Câu hỏi kép', 'People today buy more products than they actually need. Why is this the case? Is it a positive or negative development?'],
    ['t2-21', 'Đồng ý – Không đồng ý', 'Children should start learning a foreign language at primary school rather than at secondary school. To what extent do you agree or disagree?'],
    ['t2-22', 'Nguyên nhân – Giải pháp', 'In many cities, house prices are rising much faster than incomes. What are the causes of this, and what solutions can you suggest?'],
    ['t2-23', 'Lợi ích – Bất lợi', 'Some popular tourist sites now limit the number of visitors allowed each day. Do the advantages of this policy outweigh the disadvantages?'],
    ['t2-24', 'Nguyên nhân – Ảnh hưởng', 'More and more people eat ready-made meals instead of cooking at home. What are the reasons for this, and what effects does it have on individuals and families?']
  ].map(([id, type, text]) => ({ id, type, text }));

  const TASK1 = [
    { id: 't1-01', intro: 'The table below shows the percentage of people in one country who used the internet every day, by age group, in 2005, 2015 and 2025.', unit: '%', cols: ['Age group', '2005', '2015', '2025'], rows: [['16–24', 38, 81, 97], ['25–44', 29, 74, 95], ['45–64', 12, 48, 83], ['65 and over', 3, 19, 61]] },
    { id: 't1-02', intro: 'The table below shows how an average household in two cities spent its monthly budget in 2024.', unit: '% of monthly budget', cols: ['Category', 'City A', 'City B'], rows: [['Housing', 38, 27], ['Food', 22, 31], ['Transport', 14, 9], ['Education', 9, 15], ['Leisure', 11, 8], ['Other', 6, 10]] },
    { id: 't1-03', intro: 'The table below shows the number of visitors to three museums in a city between 2016 and 2024.', unit: 'thousand visitors', cols: ['Museum', '2016', '2018', '2020', '2022', '2024'], rows: [['Science Museum', 420, 465, 180, 390, 510], ['Art Gallery', 310, 300, 95, 260, 280], ['History Museum', 150, 170, 60, 210, 330]] },
    { id: 't1-04', intro: 'The table below shows the sources of electricity produced in one country in 2000 and 2024.', unit: '% of total electricity', cols: ['Source', '2000', '2024'], rows: [['Coal', 52, 24], ['Natural gas', 21, 30], ['Hydropower', 19, 16], ['Wind', 1, 14], ['Solar', 0, 13], ['Other', 7, 3]] },
    { id: 't1-05', intro: 'The table below shows how workers in one city travelled to work in 2004 and 2024.', unit: '% of workers', cols: ['Mode of transport', '2004', '2024'], rows: [['Car', 46, 31], ['Bus', 24, 18], ['Metro', 5, 22], ['Bicycle', 9, 15], ['Walking', 12, 10], ['Motorbike', 4, 4]] },
    { id: 't1-06', intro: 'The table below shows the number of international students studying in five countries in 2015 and 2025.', unit: 'thousand students', cols: ['Country', '2015', '2025'], rows: [['Country A', 410, 520], ['Country B', 295, 310], ['Country C', 180, 345], ['Country D', 95, 240], ['Country E', 60, 55]] },
    { id: 't1-07', intro: 'The table below shows the average amount of water used per person per day in four countries, by sector, in 2023.', unit: 'litres per person per day', cols: ['Country', 'Households', 'Industry', 'Agriculture'], rows: [['Country A', 150, 210, 620], ['Country B', 95, 340, 410], ['Country C', 240, 180, 960], ['Country D', 70, 60, 1150]] },
    { id: 't1-08', intro: 'The table below shows sales of three types of books in one country between 2010 and 2025.', unit: 'million copies', cols: ['Type of book', '2010', '2015', '2020', '2025'], rows: [['Printed books', 182, 165, 150, 141], ['E-books', 12, 48, 63, 58], ['Audiobooks', 4, 9, 27, 56]] }
  ];

  let s = loadDraft();
  let remaining = CFG[s.task].minutes * 60;
  let timer = null;
  let grading = false;
  let result = null;   // kết quả chấm gần nhất trong phiên
  let errorMsg = '';
  let mode = null; // 'course' | 'practice'; null = tự chọn theo tiến độ lộ trình

  const esc = x => String(x == null ? '' : x).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const countWords = t => (String(t).trim().match(/[A-Za-z0-9À-ỹ'’-]+/g) || []).length;
  const fmtClock = sec => `${sec < 0 ? '-' : ''}${Math.floor(Math.abs(sec) / 60)}:${String(Math.abs(sec) % 60).padStart(2, '0')}`;
  const view = () => document.getElementById('writing-view');
  const history = () => (window.todayModule ? window.todayModule.getWritingHistory() : []);
  // Chưa học xong lộ trình thì mở Writing là vào bài học trước
  const currentMode = () => mode || (window.courseModule && !window.courseModule.isComplete('writing') ? 'course' : 'practice');

  function loadDraft() {
    try {
      const d = JSON.parse(localStorage.getItem(DRAFT_KEY));
      if (d && CFG[d.task]) return { task: d.task, promptId: d.promptId || null, text: d.text || '', rewrite: '' };
    } catch (e) {}
    return { task: 'task2', promptId: null, text: '', rewrite: '' };
  }
  function saveDraft() {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify({ task: s.task, promptId: s.promptId, text: s.text })); } catch (e) {}
  }

  const bank = task => (task === 'task1' ? TASK1 : TASK2);
  function currentPrompt() {
    const list = bank(s.task);
    let p = list.find(x => x.id === s.promptId);
    if (!p) {
      // Ưu tiên đề chưa viết
      const used = new Set(history().map(h => h.promptId));
      p = list.find(x => !used.has(x.id)) || list[Math.floor(Math.random() * list.length)];
      s.promptId = p.id;
    }
    return p;
  }

  function promptAsText(p) {
    if (s.task === 'task2') return `${p.text}\n\n${T2_INSTR}`;
    const table = [p.cols.join(' | ')].concat(p.rows.map(r => r.join(' | '))).join('\n');
    return `${p.intro}\nUnits: ${p.unit}\n${table}\n\n${T1_INSTR}`;
  }

  // ---------- Đồng hồ ----------
  function tick() {
    remaining -= 1;
    if (remaining === 0) showToastSafe('Hết giờ! Hoàn thành câu đang viết rồi nộp bài.');
    paintClock();
  }
  function toggleTimer() {
    if (timer) { clearInterval(timer); timer = null; } else { timer = setInterval(tick, 1000); }
    paintClock();
  }
  function resetTimer() {
    clearInterval(timer);
    timer = null;
    remaining = CFG[s.task].minutes * 60;
  }
  function paintClock() {
    const btn = document.getElementById('writing-timer');
    if (!btn) return;
    btn.textContent = `${timer ? 'Tạm dừng' : remaining === CFG[s.task].minutes * 60 ? 'Bắt đầu' : 'Tiếp tục'} · ${fmtClock(remaining)}`;
    btn.classList.toggle('is-running', !!timer);
    btn.classList.toggle('is-over', remaining <= 0);
  }
  function showToastSafe(msg) {
    const box = document.getElementById('toast-container');
    if (!box) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    box.appendChild(t);
    setTimeout(() => t.remove(), 2600);
  }

  function paintCount() {
    const n = countWords(s.text);
    const elc = document.getElementById('writing-count');
    if (elc) {
      elc.textContent = `${n} / ${CFG[s.task].minWords} từ`;
      elc.classList.toggle('is-ok', n >= CFG[s.task].minWords);
    }
  }

  // ---------- AI chấm ----------
  function systemPrompt() {
    const c = CFG[s.task];
    return `You are a senior IELTS Writing examiner. Assess the candidate's ${s.task === 'task1' ? 'Academic Writing Task 1' : 'Writing Task 2'} response strictly against the official IELTS Writing Band Descriptors (public version, revised May 2023).
Criteria, in this order: ${c.criteria.join('; ')}.
Rules:
- Give each criterion a whole band from 1 to 9. Be realistic and strict; never inflate scores.
- Penalise responses under ${c.minWords} words, off-topic or memorised content${s.task === 'task1' ? ', a missing overview, or data that is reported inaccurately' : ', or an unclear position'} as the descriptors require.
- Write every explanation in Vietnamese, short and concrete, addressed to the learner as "bạn".
- Quote the candidate's exact words in "original".
Return ONLY a JSON object:
{
  "criteria": [{ "name": "${c.criteria[0]}", "band": 6, "comment_vi": "..." }, { "name": "${c.criteria[1]}", "band": 6, "comment_vi": "..." }, { "name": "${c.criteria[2]}", "band": 6, "comment_vi": "..." }, { "name": "${c.criteria[3]}", "band": 6, "comment_vi": "..." }],
  "strengths_vi": ["...", "..."],
  "fixes": [{ "original": "...", "better": "...", "why_vi": "..." }],
  "rewrite_focus_vi": "Which part to rewrite (for example the thesis statement and body paragraph 2) and how, in at most 2 sentences",
  "vocab_upgrades": [{ "from": "...", "to": "...", "vi": "..." }]
}
"fixes" must have 3 to 5 items, most important first. "vocab_upgrades" has at most 3 items.`;
  }

  async function grade() {
    const words = countWords(s.text);
    if (words < 40) { errorMsg = 'Bài còn quá ngắn để chấm (cần ít nhất 40 từ).'; render(); return; }
    const sp = window.speakingModule;
    if (!sp || !sp.callGemini) { errorMsg = 'Chưa tải được mô-đun AI. Hãy tải lại trang.'; render(); return; }

    const p = currentPrompt();
    const used = CFG[s.task].minutes * 60 - remaining;
    grading = true;
    errorMsg = '';
    result = null;
    render();
    try {
      const data = await sp.callGemini(
        `TASK PROMPT:\n${promptAsText(p)}\n\nCANDIDATE RESPONSE (${words} words${used > 0 ? `, written in about ${Math.max(1, Math.round(used / 60))} minutes` : ''}):\n"""\n${s.text}\n"""`,
        systemPrompt()
      );
      const names = CFG[s.task].criteria;
      const criteria = names.map((name, i) => {
        const c = (data.criteria || [])[i] || {};
        const band = Math.min(9, Math.max(0, Number(c.band) || 0));
        return { name, band, note: String(c.comment_vi || '') };
      });
      const band = Math.round((criteria.reduce((sum, c) => sum + c.band, 0) / criteria.length) * 2) / 2;
      result = {
        band, criteria,
        strengths: (data.strengths_vi || []).slice(0, 3).map(String),
        fixes: (data.fixes || []).slice(0, 5).map(f => ({ original: String(f.original || ''), better: String(f.better || ''), why: String(f.why_vi || '') })),
        focus: String(data.rewrite_focus_vi || ''),
        upgrades: (data.vocab_upgrades || []).slice(0, 3).map(u => ({ from: String(u.from || ''), to: String(u.to || ''), vi: String(u.vi || '') }))
      };
      result.id = 'w_' + Date.now();
      if (window.todayModule) {
        window.todayModule.saveWriting({
          id: result.id, at: Date.now(), type: s.task, promptId: p.id,
          prompt: s.task === 'task2' ? p.text : p.intro,
          words, band, criteria, text: s.text,
          fixes: result.fixes, focus: result.focus, rewrite: ''
        });
      }
      resetTimer();
    } catch (e) {
      errorMsg = e.message || 'Không chấm được bài, vui lòng thử lại.';
    } finally {
      grading = false;
      render();
    }
  }

  // ---------- Giao diện ----------
  function renderPrompt(p) {
    if (s.task === 'task2') {
      return `<p class="prompt-text">${esc(p.text)}</p><p class="prompt-instr">${esc(T2_INSTR)}</p>`;
    }
    return `
      <p class="prompt-text">${esc(p.intro)}</p>
      <div class="prompt-table-wrap">
        <table class="prompt-table">
          <caption>Đơn vị: ${esc(p.unit)}</caption>
          <thead><tr>${p.cols.map(c => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead>
          <tbody>${p.rows.map(r => `<tr>${r.map((v, i) => (i ? `<td>${esc(v)}</td>` : `<th scope="row">${esc(v)}</th>`)).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>
      <p class="prompt-instr">${esc(T1_INSTR)}</p>
      <p class="prompt-note">Số liệu minh hoạ để luyện viết.</p>`;
  }

  function renderResult() {
    if (grading) return '<section class="ios-card writing-result"><p class="muted">AI đang chấm bài theo 4 tiêu chí…</p></section>';
    if (errorMsg) return `<section class="ios-card writing-result is-error"><p>${esc(errorMsg)}</p>${/API Key/i.test(errorMsg) ? '<button type="button" class="btn-tinted" data-act="ai-settings">Mở cài đặt AI</button>' : ''}</section>`;
    if (!result) return '';
    return `
      <section class="ios-card writing-result">
        <div class="result-head"><span>Band ước tính</span><strong>${result.band.toFixed(1)}</strong></div>
        <div class="criteria-grid">
          ${result.criteria.map(c => `
            <div class="criteria-tile">
              <span class="criteria-name">${esc(CRITERIA_VI[c.name] || c.name)}</span>
              <span class="criteria-band">${c.band}</span>
              <p>${esc(c.note)}</p>
            </div>`).join('')}
        </div>
        ${result.strengths.length ? `<h4>Điểm tốt</h4><ul class="plain-list">${result.strengths.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
        ${result.fixes.length ? `<h4>Sửa ngay</h4><ul class="fix-list">${result.fixes.map(f => `
          <li><p><del>${esc(f.original)}</del></p><p><ins>${esc(f.better)}</ins></p><p class="muted">${esc(f.why)}</p></li>`).join('')}</ul>` : ''}
        ${result.upgrades.length ? `<h4>Từ vựng nâng cấp</h4><ul class="plain-list">${result.upgrades.map(u => `<li><strong>${esc(u.from)}</strong> → <strong>${esc(u.to)}</strong> <span class="muted">${esc(u.vi)}</span></li>`).join('')}</ul>` : ''}
        <h4>Viết lại phần yếu nhất</h4>
        <p>${esc(result.focus || 'Viết lại câu luận điểm và đoạn thân bài yếu nhất bằng từ của bạn.')}</p>
        <textarea id="writing-rewrite" class="writing-textarea is-short" rows="6" placeholder="Tự viết lại phần này, không chép câu gợi ý…">${esc(s.rewrite)}</textarea>
        <button type="button" class="btn-tinted" data-act="save-rewrite">Lưu bài viết lại</button>
      </section>`;
  }

  function renderHistory() {
    const list = history().slice().reverse().slice(0, 12);
    if (!list.length) return '';
    return `
      <h3 class="group-title">Bài đã viết <span>${history().length} bài</span></h3>
      <section class="ios-card writing-history">
        ${list.map(h => {
          const d = new Date(h.at);
          return `
          <details class="wh-item">
            <summary>
              <span class="wh-band">${h.band != null ? Number(h.band).toFixed(1) : '—'}</span>
              <span class="wh-title">${h.type === 'task1' ? 'Task 1' : 'Task 2'} · ${d.getDate()}/${d.getMonth() + 1}</span>
              <span class="wh-meta">${esc(String(h.prompt || '').slice(0, 70))}…</span>
            </summary>
            <div class="wh-body">
              <p class="muted">${h.words} từ · ${(h.criteria || []).map(c => `${esc(CRITERIA_VI[c.name] || c.name)} ${c.band}`).join(' · ')}</p>
              <p class="wh-text">${esc(h.text)}</p>
              ${h.rewrite ? `<p class="how-label">Bài viết lại</p><p class="wh-text">${esc(h.rewrite)}</p>` : ''}
            </div>
          </details>`;
        }).join('')}
      </section>`;
  }

  function render() {
    const v = view();
    if (!v) return;
    const m = currentMode();
    const modeSwitch = `
      <div class="writing-top">
        <div class="ios-segmented" role="group" aria-label="Chế độ Writing">
          <button type="button" class="${m === 'course' ? 'active' : ''}" data-act="mode" data-mode="course" aria-pressed="${m === 'course'}">Lộ trình học</button>
          <button type="button" class="${m === 'practice' ? 'active' : ''}" data-act="mode" data-mode="practice" aria-pressed="${m === 'practice'}">Luyện viết đề</button>
        </div>
      </div>`;
    if (m === 'course' && window.courseModule) {
      v.innerHTML = modeSwitch + '<div id="writing-course" class="course-mount"></div>';
      window.courseModule.render(document.getElementById('writing-course'), 'writing');
      return;
    }
    const p = currentPrompt();
    const c = CFG[s.task];
    v.innerHTML = modeSwitch + `
      <div class="writing-top writing-subtop">
        <div class="ios-segmented" role="group" aria-label="Chọn dạng bài">
          <button type="button" class="${s.task === 'task2' ? 'active' : ''}" data-act="task" data-task="task2" aria-pressed="${s.task === 'task2'}">Task 2 · Bài luận</button>
          <button type="button" class="${s.task === 'task1' ? 'active' : ''}" data-act="task" data-task="task1" aria-pressed="${s.task === 'task1'}">Task 1 · Bảng số liệu</button>
        </div>
      </div>
      <div class="writing-grid">
        <div class="writing-col">
          <section class="ios-card writing-prompt">
            <div class="prompt-top">
              <span class="task-skill skill-writing">${c.label}${s.task === 'task2' ? ' · ' + esc(p.type) : ''}</span>
              <button type="button" class="btn-plain" data-act="next-prompt">Đề khác</button>
            </div>
            ${renderPrompt(p)}
          </section>
          ${renderHistory()}
        </div>
        <div class="writing-col">
          <section class="ios-card writing-editor">
            <div class="editor-bar">
              <button type="button" id="writing-timer" class="timer-btn" data-act="timer"></button>
              <span id="writing-count" class="word-count"></span>
            </div>
            <label class="sr-only" for="writing-text">Bài viết</label>
            <textarea id="writing-text" class="writing-textarea" rows="16" spellcheck="false"
              placeholder="${s.task === 'task2' ? 'Mở bài → Thân bài 1 → Thân bài 2 → Kết luận…' : 'Câu mở → Tổng quan → 2 đoạn chi tiết…'}">${esc(s.text)}</textarea>
            <div class="editor-actions">
              <button type="button" class="btn-filled" data-act="grade"${grading ? ' disabled' : ''}>${grading ? 'Đang chấm…' : 'Nộp cho AI chấm'}</button>
              <button type="button" class="btn-plain" data-act="clear">Xoá bài</button>
            </div>
            <p class="group-foot">Tối thiểu ${c.minWords} từ trong ${c.minutes} phút. Bài tự lưu nháp trên máy này.</p>
          </section>
          ${renderResult()}
        </div>
      </div>`;
    paintClock();
    paintCount();
  }

  function bind() {
    const v = view();
    if (!v || v.dataset.bound) return;
    v.dataset.bound = '1';

    v.addEventListener('input', e => {
      if (e.target.id === 'writing-text') {
        s.text = e.target.value;
        paintCount();
        saveDraft();
      } else if (e.target.id === 'writing-rewrite') {
        s.rewrite = e.target.value;
      }
    });

    v.addEventListener('click', e => {
      const btn = e.target.closest('[data-act]');
      if (!btn || btn.closest('#writing-course')) return; // nút trong bài học do courseModule xử lý
      switch (btn.dataset.act) {
        case 'mode':
          mode = btn.dataset.mode;
          render();
          return;
        case 'task':
          if (btn.dataset.task !== s.task) open(btn.dataset.task, true);
          return;
        case 'next-prompt': {
          if (s.text.trim() && !confirm('Đổi đề sẽ xoá bài đang viết. Tiếp tục?')) return;
          const list = bank(s.task);
          const i = list.findIndex(x => x.id === s.promptId);
          s.promptId = list[(i + 1) % list.length].id;
          s.text = '';
          result = null;
          errorMsg = '';
          resetTimer();
          saveDraft();
          render();
          return;
        }
        case 'timer':
          toggleTimer();
          return;
        case 'grade':
          grade();
          return;
        case 'clear':
          if (s.text.trim() && !confirm('Xoá toàn bộ bài đang viết?')) return;
          s.text = '';
          result = null;
          errorMsg = '';
          resetTimer();
          saveDraft();
          render();
          return;
        case 'save-rewrite':
          if (result && window.todayModule && s.rewrite.trim()) {
            window.todayModule.updateWriting(result.id, { rewrite: s.rewrite.trim() });
            showToastSafe('Đã lưu bài viết lại');
            render();
          }
          return;
        case 'ai-settings':
          if (window.speakingModule) window.speakingModule.openAISettings();
          return;
      }
    });
  }

  // Mở đúng dạng bài (gọi từ lịch học hoặc nút chuyển Task)
  function open(task, keepPrompt) {
    bind();
    mode = 'practice';
    if (CFG[task] && task !== s.task) {
      if (s.text.trim() && !confirm('Chuyển dạng bài sẽ xoá bài đang viết. Tiếp tục?')) { render(); return; }
      s = { task, promptId: null, text: '', rewrite: '' };
      result = null;
      errorMsg = '';
      resetTimer();
      saveDraft();
    } else if (!keepPrompt && !s.text.trim()) {
      s.promptId = null; // bài trống: lấy đề chưa viết tiếp theo
    }
    render();
  }

  // Bài học "viết cả bài" mở đúng đề trong khung luyện (có đồng hồ và AI chấm band)
  function openPrompt(task, promptId) {
    bind();
    mode = 'practice';
    if (CFG[task] && (task !== s.task || promptId !== s.promptId)) {
      if (s.text.trim() && !confirm('Mở đề mới sẽ xoá bài đang viết. Tiếp tục?')) { render(); return; }
      s = { task, promptId, text: '', rewrite: '' };
      result = null;
      errorMsg = '';
      resetTimer();
      saveDraft();
    }
    render();
    window.scrollTo(0, 0);
  }

  window.writingModule = {
    open,
    openPrompt,
    openCourse(lessonId) {
      bind();
      mode = 'course';
      if (window.courseModule) window.courseModule.open('writing', lessonId);
      render();
    },
    promptText(task, id) {
      const p = bank(task).find(x => x.id === id);
      return p ? (task === 'task2' ? p.text : p.intro) : '';
    },
    onActivate() { bind(); render(); }
  };
})();
