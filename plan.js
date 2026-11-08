/**
 * HÔM NAY • LỊCH HỌC IELTS 4 KỸ NĂNG
 * - Màn hình mở app: hôm nay học gì, học thế nào (mỗi việc có các bước làm + nút Bắt đầu)
 * - Lộ trình theo ngày thi: Kiểm tra đầu vào → Nền tảng → Tăng tốc → Thi thử → Tuần thi
 * - Writing và Speaking học từ đầu theo bài học (course.js), mỗi ngày 1 bài, xong mới chuyển sang luyện đề
 * - Trình độ ước tính từng kỹ năng, sổ lỗi sai tự ghi sau mỗi bài Cambridge
 * - Lưu localStorage, đồng bộ Firebase (nhánh users/<id>_plan) khi đã kết nối
 */
(function () {
  'use strict';

  const STORE_KEY = 'ielts_plan_v1';
  const CAM_PROGRESS_KEY = 'ielts_cambridge_progress_v2';
  const VOICE_STATS_KEY = 'speaking_voice_stats_v1';
  const DEFAULT_EXAM = '2027-05-01';
  const DEFAULT_START = '2026-11-08'; // người học chọn bắt đầu Chủ nhật 8/11/2026
  const DIAG_TEST = 'cam15_t1';
  const RESERVED_BOOKS = ['cam19', 'cam20']; // đề mới nhất để dành cho giai đoạn thi thử
  const SPEAK_GOAL_SEC = 120;
  const REVIEW_GAPS = [1, 2, 4, 7]; // ôn bài đã học sau 1, 3, 7 và 14 ngày (tính từ lần học/ôn trước)
  const REVIEWS_PER_DAY = 3;
  const DAY_MS = 86400000;
  const WEEKDAYS = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const WEEKDAYS_SHORT = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  // ---------- Ngày tháng (giờ địa phương, chuỗi YYYY-MM-DD) ----------
  const pad = n => String(n).padStart(2, '0');
  const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseYmd = s => { const [y, m, d] = String(s).split('-').map(Number); return new Date(y, m - 1, d); };
  const startOfDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const addDays = (d, n) => { const x = startOfDay(d); x.setDate(x.getDate() + n); return x; };
  const mondayOf = d => addDays(d, -((d.getDay() + 6) % 7));
  const daysBetween = (a, b) => Math.round((startOfDay(b) - startOfDay(a)) / DAY_MS);

  const SKILLS = {
    vocab: 'Từ vựng', listening: 'Listening', reading: 'Reading',
    writing: 'Writing', speaking: 'Speaking', review: 'Ôn tập', setup: 'Chuẩn bị'
  };

  const PHASES = {
    pre: { name: 'Sắp bắt đầu', desc: '' },
    diag: { name: 'Kiểm tra đầu vào', desc: 'Làm 1 bài Listening và 1 bài Reading để biết trình độ. Writing và Speaking học từ đầu theo bài học, mỗi ngày 1 bài.' },
    base: { name: 'Giai đoạn 1 · Nền tảng', desc: 'Tăng vốn từ, nghe chép chính tả, đọc chậm để hiểu vì sao sai, viết đúng bố cục.' },
    skill: { name: 'Giai đoạn 2 · Tăng tốc', desc: 'Làm đề bấm giờ chặt, tập trung vào dạng câu hay sai trong sổ lỗi.' },
    mock: { name: 'Giai đoạn 3 · Thi thử', desc: 'Mỗi tuần một buổi thi thử đủ Listening → Reading → Writing đúng giờ như thi thật.' },
    taper: { name: 'Tuần thi', desc: 'Học nhẹ để giữ nhịp, ngủ đủ, không học thêm kiến thức mới.' },
    after: { name: 'Đã qua ngày thi', desc: 'Nếu thi lại, đặt ngày thi mới trong phần Cài đặt bên dưới.' }
  };

  // Lịch xoay vòng theo thứ trong tuần (0 = Chủ nhật).
  // Mỗi ngày: từ vựng + Speaking (bài học, học xong thì nói 2 phút) + bài học Writing (khi chưa xong lộ trình).
  const LR_PLAN = { // Listening, Reading và ôn tập
    base: { 1: ['L', 'Ldeep'], 2: ['R'], 3: ['Ldeep', 'topic'], 4: ['L', 'Ldeep'], 5: ['R'], 6: ['topic', 'mistakes'], 0: ['Ldeep'] },
    skill: { 1: ['L', 'Ldeep'], 2: ['R'], 3: ['L'], 4: ['R'], 5: ['Ldeep', 'topic'], 6: ['L', 'R'], 0: ['mistakes'] },
    mock: { 1: ['L', 'Ldeep'], 2: ['R'], 3: ['mistakes'], 4: ['L', 'R'], 5: ['Ldeep'], 6: ['L', 'R'], 0: ['mistakes'] }
  };
  const WS_PLAN = { // luyện đề Writing và thi thử Speaking, chỉ khi đã học xong lộ trình tương ứng
    base: { 1: ['W1'], 2: ['W2'], 3: ['Smock'], 4: ['W1'], 5: ['W2'], 6: ['Smock'], 0: [] },
    skill: { 1: ['W1'], 2: ['W2'], 3: ['Smock'], 4: ['W1'], 5: ['W2'], 6: [], 0: ['Smock'] },
    mock: { 1: ['W1'], 2: ['W2'], 3: ['W1', 'Smock'], 4: [], 5: ['W2', 'Smock'], 6: ['W1', 'W2'], 0: [] }
  };

  const MISTAKE_REASONS = [
    'Không tìm ra vị trí thông tin',
    'Không nhận ra từ đồng nghĩa',
    'Nhầm False / Not Given',
    'Nghe sót hoặc nghe nhầm',
    'Sai chính tả, số ít/số nhiều',
    'Không biết từ vựng',
    'Hết giờ, phải đoán'
  ];

  // ---------- Trạng thái ----------
  function defaultState() {
    const today = ymd(new Date());
    return {
      startDate: today < DEFAULT_START ? DEFAULT_START : today, examDate: DEFAULT_EXAM, targetBand: null, skipDiag: false,
      done: {}, results: {}, mistakes: [], writing: [], speakingBands: [], course: { writing: {}, speaking: {} },
      reviews: { writing: {}, speaking: {} }, updatedAt: 0
    };
  }

  // Firebase bỏ mảng/đối tượng rỗng và có thể trả mảng dưới dạng object
  const toArray = x => (Array.isArray(x) ? x : Object.values(x || {})).filter(Boolean);
  function normalize(raw) {
    const base = defaultState();
    if (!raw || typeof raw !== 'object') return base;
    return {
      ...base, ...raw,
      done: raw.done || {}, results: raw.results || {},
      mistakes: toArray(raw.mistakes), writing: toArray(raw.writing), speakingBands: toArray(raw.speakingBands),
      course: { writing: (raw.course && raw.course.writing) || {}, speaking: (raw.course && raw.course.speaking) || {} },
      reviews: { writing: (raw.reviews && raw.reviews.writing) || {}, speaking: (raw.reviews && raw.reviews.speaking) || {} }
    };
  }

  // ---------- Lịch học (hàm thuần, không đụng DOM) ----------
  function weekInfo(st, date) {
    const start = mondayOf(parseYmd(st.startDate));
    const exam = parseYmd(st.examDate);
    return {
      week: Math.max(0, Math.floor(daysBetween(start, date) / 7)),
      totalWeeks: Math.max(1, Math.ceil(daysBetween(start, exam) / 7)),
      daysLeft: daysBetween(date, exam)
    };
  }

  const allResults = (st, env) => ({ ...(env.localResults || {}), ...st.results });

  function diagStatus(st, env) {
    const keys = Object.keys(allResults(st, env));
    return {
      'D-L': keys.some(k => k.endsWith('_listening')),
      'D-R': keys.some(k => k.endsWith('_reading'))
    };
  }

  // Bài học tiếp theo của lộ trình (null = đã học xong, hoặc không có dữ liệu bài học)
  const lessonsOf = (env, skill) => (env.lessons && env.lessons[skill]) || [];
  const nextLesson = (st, env, skill) => lessonsOf(env, skill).find(l => !st.course[skill][l.id]) || null;

  // Ôn ngắt quãng: lần ôn thứ n đến hạn REVIEW_GAPS[n] ngày sau lần học/ôn trước
  function reviewState(st, skill, id, date) {
    const doneAt = (st.course[skill] || {})[id];
    if (!doneAt) return null;
    const r = (st.reviews[skill] || {})[id] || { n: 0, at: doneAt };
    if (r.n >= REVIEW_GAPS.length) return { n: r.n, total: REVIEW_GAPS.length, due: false, next: null };
    const next = addDays(new Date(r.at), REVIEW_GAPS[r.n]);
    return { n: r.n, total: REVIEW_GAPS.length, due: startOfDay(date) >= next, next };
  }
  function dueReviews(st, date, env) {
    return ['writing', 'speaking']
      .flatMap(skill => lessonsOf(env, skill).map(lesson => ({ skill, lesson, rs: reviewState(st, skill, lesson.id, date) })))
      .filter(x => x.rs && x.rs.due)
      .sort((a, b) => a.rs.next - b.rs.next)
      .slice(0, REVIEWS_PER_DAY);
  }

  function phaseOf(st, date, env) {
    const { week, totalWeeks, daysLeft } = weekInfo(st, date);
    if (daysLeft < 0) return 'after';
    if (date < parseYmd(st.startDate)) return 'pre';
    if (daysLeft <= 7) return 'taper';
    // Kiểm tra đầu vào chỉ chặn tối đa 2 tuần đầu để lịch không bị kẹt
    if (!st.skipDiag && week < 2 && !Object.values(diagStatus(st, env)).every(Boolean)) return 'diag';
    if (totalWeeks - week <= 6) return 'mock';
    return week < Math.floor(totalWeeks * 0.45) ? 'base' : 'skill';
  }

  function pickTest(st, skill, phase, env) {
    const res = allResults(st, env);
    const list = env.catalog || [];
    const reserved = t => RESERVED_BOOKS.includes(t.book);
    const late = phase === 'mock' || phase === 'taper';
    const order = late ? list.filter(reserved).concat(list.filter(t => !reserved(t))) : list.filter(t => !reserved(t));
    const fresh = order.find(t => !res[`${t.id}_${skill}`]);
    if (fresh) return fresh;
    // Hết đề mới thì làm lại đề đã làm lâu nhất
    const lastAt = t => (res[`${t.id}_${skill}`] || {}).at || 0;
    return order.slice().sort((a, b) => lastAt(a) - lastAt(b))[0] || list[0] || { id: DIAG_TEST, title: DIAG_TEST, book: 'cam15' };
  }

  function latestResult(st, env, skill) {
    const res = allResults(st, env);
    return Object.keys(res)
      .filter(k => k.endsWith('_' + skill))
      .map(k => ({ testId: k.slice(0, -(skill.length + 1)), ...res[k] }))
      .sort((a, b) => (b.at || 0) - (a.at || 0))[0] || null;
  }

  function weakestPart(st, testId, skill) {
    const counts = {};
    st.mistakes.filter(m => m.testId === testId && m.skill === skill).forEach(m => { counts[m.part] = (counts[m.part] || 0) + 1; });
    const best = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
    return best ? Math.max(0, Number(best) - 1) : 0;
  }

  const shortTitle = t => String((t && t.title) || (t && t.id) || '').replace('Cambridge IELTS ', 'Cam ').replace(' • ', ' ');
  const findTest = (env, id) => (env.catalog || []).find(t => t.id === id) || { id, title: id, book: String(id).split('_')[0] };

  function buildTask(id, st, date, env, phase) {
    const isToday = ymd(date) === env.today;
    const rec = (st.done[ymd(date)] || {})[id] || null;
    const t = { id, done: !!rec, how: [], minutes: 20 };
    const examLike = phase === 'skill' || phase === 'mock' || phase === 'taper';
    const camTask = (skill, diag) => {
      const test = rec && rec.testId ? findTest(env, rec.testId)
        : diag && !allResults(st, env)[`${DIAG_TEST}_${skill}`] ? findTest(env, DIAG_TEST) : pickTest(st, skill, phase, env);
      t.skill = skill;
      t.action = { type: 'cam', skill, testId: test.id };
      return test;
    };

    switch (id) {
      case 'vocab':
        t.skill = 'vocab';
        t.title = env.due > 0 ? `Ôn ${env.due} thẻ đến hạn` : 'Ôn thẻ từ vựng';
        t.meta = env.due > 0 || !isToday ? 'Từ đơn + cụm từ, lặp lại 1 – 4 – 7 – 14 ngày' : 'Hôm nay không còn thẻ đến hạn';
        t.how = [
          'Nhìn mặt trước, tự nói ra từ cần điền rồi mới lật thẻ.',
          'Phải nghĩ quá 5 giây thì bấm "Chưa nhớ": thẻ sẽ quay lại vào ngày mai.',
          'Đọc to câu ví dụ một lần để nhớ cách dùng.'
        ];
        t.action = { type: 'vocab' };
        if (isToday && env.due === 0) t.done = true;
        break;

      case 'speak':
        t.skill = 'speaking';
        t.title = 'Nói 2 phút với AI';
        t.meta = isToday ? `Hôm nay đã nói ${fmtSec(env.spokenSec)} / 2:00` : 'Part 1 hoặc Part 2';
        t.how = [
          'Đọc câu hỏi, chuẩn bị 1 phút: ghi 5–7 từ khoá, không viết cả câu.',
          'Bấm ghi âm và nói liền một mạch, không dừng lại để sửa.',
          'Đọc nhận xét của AI, chọn 2 lỗi quan trọng nhất.',
          'Nói lại lần 2 cùng câu hỏi và sửa đúng 2 lỗi đó.'
        ];
        t.action = { type: 'speaking' };
        if (isToday && env.spokenSec >= SPEAK_GOAL_SEC) t.done = true;
        break;

      case 'Smock':
        t.skill = 'speaking';
        t.title = 'Speaking thi thử Part 1 – 3';
        t.meta = '3 câu Part 1 · 1 thẻ Part 2 · 2 câu Part 3';
        t.how = [
          'Part 1: trả lời 3 câu, mỗi câu 2–3 câu nói, có lý do hoặc ví dụ.',
          'Part 2: chuẩn bị 1 phút, nói đủ 2 phút theo các gợi ý trên thẻ.',
          'Part 3: trả lời 2 câu, nêu quan điểm, so sánh và đưa ví dụ xã hội.',
          'Nghe lại bản ghi trong Nhật ký, ghi lại những từ bạn hay lặp.'
        ];
        t.action = { type: 'speaking' };
        break;

      case 'L':
      case 'D-L': {
        const test = camTask('listening', id === 'D-L');
        t.minutes = 40;
        t.title = (id === 'D-L' ? 'Kiểm tra Listening: ' : 'Listening: ') + shortTitle(test);
        t.meta = '4 phần · 40 câu · 30 phút';
        t.how = id === 'D-L' ? [
          'Làm như thi thật: nghe 1 lần, không tua lại, không tra từ.',
          'Làm hết 4 phần rồi mới nộp bài.',
          'Band sẽ hiện ở mục Trình độ, câu sai tự vào Sổ lỗi sai.'
        ] : [
          'Trước mỗi phần, đọc nhanh câu hỏi và gạch chân từ khoá.',
          examLike ? 'Nghe 1 lần duy nhất, không dừng. 2 phút cuối kiểm tra chính tả và số ít/số nhiều.' : 'Nghe 1 lần như thi thật, chưa xem transcript.',
          'Nộp bài, với mỗi câu sai bấm nghe lại đoạn dẫn chứng và tìm từ đồng nghĩa.',
          'Câu sai tự vào Sổ lỗi sai để ôn vào Chủ nhật.'
        ];
        break;
      }

      case 'R':
      case 'D-R': {
        const test = camTask('reading', id === 'D-R');
        t.minutes = id === 'D-R' ? 65 : 75;
        t.title = (id === 'D-R' ? 'Kiểm tra Reading: ' : 'Reading: ') + shortTitle(test);
        t.meta = '3 bài đọc · 40 câu · 60 phút';
        t.how = id === 'D-R' ? [
          'Bấm giờ 60 phút, khoảng 20 phút mỗi bài đọc.',
          'Không tra từ, câu khó thì đoán rồi đi tiếp.',
          'Band sẽ hiện ở mục Trình độ, câu sai tự vào Sổ lỗi sai.'
        ] : [
          examLike ? 'Bấm giờ chặt: khoảng 20 phút mỗi bài, không tra từ.' : 'Bấm giờ 60 phút nhưng ưu tiên hiểu đúng, chưa cần nhanh.',
          examLike ? 'Câu nào quá 90 giây thì đoán và đi tiếp, cuối giờ quay lại.' : 'Đọc lướt ý chính từng đoạn trước, rồi tìm đáp án theo từ khoá.',
          'Nộp bài, với mỗi câu sai bấm "Xem trong bài" để tìm câu chứa đáp án và cặp từ đồng nghĩa.',
          'True/False/Not Given: False là bài nói ngược lại, Not Given là bài không nhắc tới.'
        ];
        break;
      }

      case 'Ldeep': {
        const last = latestResult(st, env, 'listening');
        const testId = (rec && rec.testId) || (last && last.testId) || 'cam10_t1';
        const part = weakestPart(st, testId, 'listening');
        t.skill = 'listening';
        t.minutes = 30;
        t.title = `Nghe sâu: ${shortTitle(findTest(env, testId))} · Part ${part + 1}`;
        t.meta = 'Chép chính tả + nói đuổi theo audio';
        t.how = [
          'Mở lại phần đã nghe ở chế độ Nghe sâu (transcript chạy theo audio).',
          'Nghe từng câu, dừng lại chép chính tả, rồi xem transcript để so.',
          'Đánh dấu chỗ nghe sai: số, tên riêng, nối âm, đuôi -s/-ed.',
          'Nói đuổi (shadowing) theo audio 5 phút, bắt chước ngữ điệu.'
        ];
        t.action = { type: 'deep', testId, part };
        break;
      }

      case 'W1':
        t.skill = 'writing';
        t.minutes = 30;
        t.title = 'Writing Task 1: mô tả bảng số liệu';
        t.meta = '20 phút · ít nhất 150 từ';
        t.how = [
          'Câu mở: viết lại đề bằng từ của bạn.',
          'Đoạn tổng quan: 2 đặc điểm nổi bật nhất, chưa đưa số liệu.',
          'Hai đoạn chi tiết: so sánh số liệu, gom nhóm các mục giống nhau.',
          'Nộp cho AI chấm, sửa lại các lỗi được chỉ ra.'
        ];
        t.action = { type: 'writing', task: 'task1' };
        break;

      case 'W2':
        t.skill = 'writing';
        t.minutes = 60;
        t.title = 'Writing Task 2: bài luận';
        t.meta = '40 phút viết · 20 phút chữa';
        t.how = [
          '5 phút đầu: xác định dạng đề, viết câu luận điểm và 2 ý chính.',
          'Viết 4 đoạn: mở bài, 2 thân bài (ý chính, giải thích, ví dụ), kết luận.',
          'AI chấm theo 4 tiêu chí: đọc tiêu chí thấp nhất trước.',
          'Tự viết lại câu luận điểm và đoạn thân bài yếu nhất, không chép bài mẫu.'
        ];
        t.action = { type: 'writing', task: 'task2' };
        break;

      case 'Wles':
      case 'Sles': {
        const skill = id === 'Wles' ? 'writing' : 'speaking';
        const list = lessonsOf(env, skill);
        const lesson = (rec && list.find(l => l.id === rec.lessonId)) || nextLesson(st, env, skill) || list[list.length - 1];
        if (!lesson) break;
        t.skill = skill;
        t.minutes = lesson.minutes;
        t.title = `Bài ${lesson.n || list.indexOf(lesson) + 1}/${lesson.total || list.length}: ${lesson.title}`;
        t.meta = lesson.track ? `${lesson.track} · ${lesson.unit}` : `Học ${SKILLS[skill]} từ đầu · ${lesson.unit}`;
        t.how = [`Mục tiêu: ${lesson.goal}`].concat((lesson.how || []).length ? lesson.how : [
          'Đọc phần Ý chính và Ví dụ mẫu (với Speaking, bấm Nghe mẫu rồi nói theo).',
          skill === 'writing' ? 'Làm phần Luyện tập, bấm "Nhờ AI chữa" rồi sửa lại theo góp ý.' : 'Bấm "Nói câu này với AI" cho từng câu hỏi, đọc nhận xét rồi nói lại lần 2.',
          'Bấm "Hoàn thành bài học". Học nhanh hơn lịch cũng được: bài sau mở sẵn.'
        ]);
        t.action = { type: 'lesson', skill, id: lesson.id };
        break;
      }

      case 'review': {
        const due = dueReviews(st, date, env);
        const first = due[0];
        t.skill = 'review';
        t.minutes = Math.max(5, due.length * 5);
        t.title = first ? `Ôn lại: ${SKILLS[first.skill]} bài ${first.lesson.n || 1} – ${first.lesson.title}` : 'Ôn lại bài đã học';
        t.meta = !first ? 'Đã ôn xong các bài đến hạn'
          : due.length > 1 ? `và ${due.slice(1).map(d => `${SKILLS[d.skill]} bài ${d.lesson.n || 1}`).join(', ')} · lặp lại 1 – 3 – 7 – 14 ngày` : 'Lặp lại 1 – 3 – 7 – 14 ngày sau khi học';
        t.how = [
          'Trước khi mở bài: tự nói hoặc viết nháp 3 ý chính bạn còn nhớ.',
          'Mở bài, đọc phần Ý chính và Ví dụ để so; ý nào quên thì đọc to 2 lần hoặc xem lại đúng đoạn đó trong mục lục video.',
          'Speaking: nghe mẫu 1 câu rồi nói lại không nhìn. Writing: viết lại 1 câu mẫu theo trí nhớ.',
          'Bấm "Đã ôn xong" ở đầu bài. Lần ôn sau sẽ cách xa hơn: 1 → 3 → 7 → 14 ngày.'
        ];
        t.action = first ? { type: 'lesson', skill: first.skill, id: first.lesson.id } : null;
        if (!first) t.done = true;
        break;
      }

      case 'setup':
        t.skill = 'setup';
        t.minutes = 10;
        t.title = 'Chuẩn bị máy trước buổi học đầu tiên';
        t.meta = 'Cài app lên màn hình chính, nhập Gemini key, bật đồng bộ';
        t.how = [
          'iPhone/iPad: mở app bằng Safari → nút Chia sẻ → "Thêm vào Màn hình chính" để mở như ứng dụng.',
          'Lấy Gemini API key miễn phí ở aistudio.google.com (mục Get API key), rồi dán vào Speaking → Cài đặt AI. AI cần key này để chữa Writing và Speaking.',
          'Mở menu ••• → Đồng bộ thiết bị trên từng máy để điện thoại, iPad và máy tính dùng chung tiến độ.',
          'Xem trước lịch các ngày tới bằng cách chạm vào dải Tuần này.'
        ];
        t.action = { type: 'aiSettings' };
        break;

      case 'mistakes': {
        const n = st.mistakes.filter(m => !m.reviewed).length;
        t.skill = 'review';
        t.minutes = 30;
        t.title = n ? `Ôn ${n} câu trong sổ lỗi sai` : 'Ôn sổ lỗi sai';
        t.meta = n ? 'Tìm nguyên nhân cho từng câu sai' : 'Chưa có câu sai nào cần ôn';
        t.how = [
          'Đọc lại câu hỏi, đáp án đúng và câu dẫn chứng.',
          'Chọn nguyên nhân sai để biết mình hay vấp ở đâu.',
          'Nếu là lỗi từ đồng nghĩa, thêm cặp từ đó vào flashcard.',
          'Bấm "Đã hiểu" khi nắm được cách làm đúng.'
        ];
        t.action = { type: 'mistakes' };
        if (isToday && n === 0) t.done = true;
        break;
      }

      case 'topic':
        t.skill = 'vocab';
        t.title = 'Từ vựng theo chủ đề Cambridge';
        t.meta = '10 thẻ mới của 1 chủ đề';
        t.how = [
          'Chọn 1 chủ đề (Môi trường, Giáo dục...) và học 10 thẻ mới.',
          'Đặt một câu của riêng bạn với mỗi từ rồi nói to.',
          'Lưu những từ muốn ôn lâu dài vào Flashcard.'
        ];
        t.action = { type: 'topics' };
        break;
    }

    if (id.startsWith('D-') && isToday && diagStatus(st, env)[id]) t.done = true;
    return t;
  }

  function planFor(st, date, env) {
    const info = weekInfo(st, date);
    const phase = phaseOf(st, date, env);
    const dayDone = st.done[ymd(date)] || {};
    const dow = date.getDay();
    // Bài học đã học trong ngày vẫn hiện (đã xong) dù lộ trình vừa hoàn thành
    const studying = (skill, id) => !!dayDone[id] || !!nextLesson(st, env, skill);
    const sItems = studying('speaking', 'Sles') ? ['Sles'] : ['speak'];
    const wItems = studying('writing', 'Wles') ? ['Wles'] : [];
    let ids;
    if (phase === 'pre') ids = ['setup'];
    else if (phase === 'after') ids = ['vocab'];
    else if (phase === 'taper') ids = info.daysLeft === 0 ? [] : ['vocab', 'speak'].concat(info.daysLeft > 2 ? [info.daysLeft % 2 ? 'L' : 'R'] : []);
    else if (phase === 'diag') {
      // Mỗi ngày 1 bài kiểm tra; bài làm sớm hơn lịch vẫn hiện (đã xong) trong ngày làm
      const ds = diagStatus(st, env);
      const keys = Object.keys(ds);
      const doneHere = keys.filter(k => dayDone[k]);
      const pending = keys.filter(k => !ds[k] && !dayDone[k]).slice(0, Math.max(0, 1 - doneHere.length));
      ids = ['vocab', ...sItems, ...wItems].concat(keys.filter(k => doneHere.includes(k) || pending.includes(k)));
    } else {
      const ws = WS_PLAN[phase][dow].filter(x => (x === 'Smock' ? sItems[0] === 'speak' : !wItems.length));
      ids = ['vocab', ...sItems, ...wItems, ...ws, ...LR_PLAN[phase][dow]];
    }
    // Ôn bài cũ ngay sau thẻ từ vựng, trước bài mới
    if (phase !== 'after' && ids[0] === 'vocab' && (dayDone.review || dueReviews(st, date, env).length)) ids.splice(1, 0, 'review');
    return { phase, info, tasks: ids.map(id => buildTask(id, st, date, env, phase)) };
  }

  // Làm tròn band tổng theo quy tắc IELTS: .25 lên .5, .75 lên số nguyên kế tiếp
  const overallBand = bands => Math.round((bands.reduce((s, b) => s + b, 0) / bands.length) * 2) / 2;

  // ---------- Định dạng ----------
  function fmtSec(sec) {
    const s = Math.max(0, Math.round(sec || 0));
    return `${Math.floor(s / 60)}:${pad(s % 60)}`;
  }
  function fmtMin(min) {
    const h = Math.floor(min / 60), m = min % 60;
    return h ? `${h} giờ${m ? ` ${m} phút` : ''}` : `${m} phút`;
  }
  const fmtBand = b => (b == null || isNaN(b) ? '—' : Number(b).toFixed(1));
  const fmtDay = d => `${d.getDate()}/${d.getMonth() + 1}`;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clip = (s, n) => { const x = String(s || '').replace(/\s+/g, ' ').trim(); return x.length > n ? x.slice(0, n - 1) + '…' : x; };

  // Phần dưới cần trình duyệt; khi chạy test bằng Node chỉ xuất các hàm thuần ở trên
  if (typeof document === 'undefined') {
    module.exports = { weekInfo, phaseOf, planFor, pickTest, diagStatus, overallBand, normalize, defaultState, ymd, parseYmd, reviewState };
    return;
  }

  let st = load();
  let expanded = null;   // id việc đang mở phần "Cách học"
  let previewDay = null; // ngày đang xem trước trong dải tuần
  let showAllMistakes = false;
  let cloudRef = null;
  let pushTimer = null;

  function load() {
    try { return normalize(JSON.parse(localStorage.getItem(STORE_KEY))); } catch (e) { return defaultState(); }
  }
  function persistLocal() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(st)); } catch (e) { console.warn('Không lưu được lịch học', e); }
  }
  function save() {
    st.updatedAt = Date.now();
    persistLocal();
    clearTimeout(pushTimer);
    pushTimer = setTimeout(pushCloud, 1200);
  }

  // shortcut: ghi đè cả nhánh theo updatedAt (ai lưu sau thắng); đủ cho 1 người dùng lần lượt từng máy
  function pushCloud() {
    if (!cloudRef) return;
    cloudRef.set(JSON.parse(JSON.stringify(st))).catch(e => console.warn('Không đồng bộ được lịch học:', e.message));
  }
  function attachCloud(db, userKey) {
    if (cloudRef) cloudRef.off();
    cloudRef = db.ref(`users/${userKey}_plan`);
    cloudRef.on('value', snap => {
      const remote = snap.val();
      if (remote && (remote.updatedAt || 0) > (st.updatedAt || 0)) {
        st = normalize(remote);
        persistLocal();
        refresh();
      } else if (!remote || (remote.updatedAt || 0) < (st.updatedAt || 0)) {
        pushCloud();
      }
    }, err => console.warn('Lỗi đồng bộ lịch học:', err && err.message));
  }

  function readEnv() {
    const env = { today: ymd(new Date()), catalog: [], due: 0, spokenSec: 0, localResults: {} };
    const books = (window.CAMBRIDGE_DATA && window.CAMBRIDGE_DATA.books) || [];
    env.catalog = books.flatMap(b => (b.tests || []).map(t => ({ id: t.id, title: t.title, book: b.id })));
    try { env.due = window.appApi ? window.appApi.getDueCount() : 0; } catch (e) {}
    try {
      const vs = JSON.parse(localStorage.getItem(VOICE_STATS_KEY)) || {};
      env.spokenSec = (vs.dailySpokenSec || {})[env.today] || 0;
    } catch (e) {}
    if (window.courseModule) env.lessons = { writing: window.courseModule.lessons('writing'), speaking: window.courseModule.lessons('speaking') };
    try {
      const prog = JSON.parse(localStorage.getItem(CAM_PROGRESS_KEY)) || {};
      Object.keys(prog).forEach(k => {
        const p = prog[k];
        if (p && p.completed) env.localResults[k] = { band: p.band, score: p.score, total: p.total, at: p.timestamp || 0 };
      });
    } catch (e) {}
    return env;
  }

  function markDone(id, extra) {
    const key = ymd(new Date());
    st.done[key] = { ...(st.done[key] || {}), [id]: { at: Date.now(), ...(extra || {}) } };
  }

  // Tìm việc hôm nay khớp với hoạt động vừa xong (ưu tiên bài kiểm tra đầu vào), tính như TRƯỚC khi có kết quả này
  function todayTaskFor(candidates, newResultKey) {
    const env = readEnv();
    if (newResultKey && !st.results[newResultKey]) delete env.localResults[newResultKey]; // Cambridge đã lưu kết quả trước khi báo
    const now = new Date();
    const ids = planFor(st, now, env).tasks.map(t => t.id);
    const ds = diagStatus(st, env);
    const inDiag = phaseOf(st, now, env) === 'diag';
    const dayDone = st.done[ymd(now)] || {};
    // Bài kiểm tra đầu vào được ghi nhận cả khi làm sớm hơn lịch
    return candidates.find(id => !dayDone[id] && (ids.includes(id) || (inDiag && id in ds && !ds[id]))) || null;
  }

  // ---------- Móc nối từ các mô-đun khác ----------
  function onTestSubmitted(r) {
    if (!r || !r.testId || !r.skill) return;
    const taskId = todayTaskFor(r.skill === 'listening' ? ['D-L', 'L'] : ['D-R', 'R'], `${r.testId}_${r.skill}`);
    const at = Date.now();
    st.results[`${r.testId}_${r.skill}`] = { band: r.band, score: r.score, total: r.total, at };
    (r.wrong || []).forEach(w => {
      st.mistakes.push({
        id: `${r.testId}_${r.skill}_${w.q}_${at}`,
        at, testId: r.testId, skill: r.skill, q: w.q || '',
        part: Number((r.skill === 'listening' ? w.partN : w.passageN) || 1),
        stem: clip(w.stem, 220),
        user: clip(w.userAnswer, 80),
        correct: clip((w.correctAnswers || []).join(' / '), 120),
        quote: clip(w.evidence && w.evidence.quote, 280),
        trap: clip(w.trap, 240),
        reason: '', reviewed: false
      });
    });
    st.mistakes = st.mistakes.slice(-300);
    if (taskId) markDone(taskId, { testId: r.testId });
    save();
    refresh();
  }

  function saveWriting(entry) {
    const taskId = todayTaskFor(entry.type === 'task1' ? ['W1'] : ['W2']);
    st.writing.push(entry);
    st.writing = st.writing.slice(-40);
    if (taskId) markDone(taskId, {});
    save();
    refresh();
  }

  function onSpeakingFeedback(fb) {
    const band = parseFloat(fb && fb.band);
    if (isNaN(band)) return;
    st.speakingBands.push({ at: Date.now(), band });
    st.speakingBands = st.speakingBands.slice(-30);
    save();
  }

  function completeLesson(skill, id) {
    if (!st.course[skill] || st.course[skill][id]) return;
    const taskId = todayTaskFor([skill === 'writing' ? 'Wles' : 'Sles']);
    st.course[skill][id] = Date.now();
    if (taskId) markDone(taskId, { lessonId: id });
    save();
    refresh();
  }

  function reviewLesson(skill, id) {
    const rs = reviewState(st, skill, id, new Date());
    if (!rs || !rs.due) return;
    st.reviews[skill] = { ...(st.reviews[skill] || {}), [id]: { n: rs.n + 1, at: Date.now() } };
    save();
    refresh();
  }

  // ---------- Hành động "Bắt đầu" ----------
  function runAction(a) {
    const app = window.appApi;
    if (!a || !app) return;
    if (a.type === 'vocab') app.showDueCards();
    else if (a.type === 'cam') {
      app.selectCategory('cambridge');
      const cam = window.cambridgeModule;
      if (cam) a.skill === 'listening' ? cam.startListeningTest(a.testId, 0) : cam.startReadingTest(a.testId, 0);
    } else if (a.type === 'deep') {
      app.selectCategory('listening');
      if (window.listeningModule) window.listeningModule.switchTest(a.testId, a.part || 0);
    } else if (a.type === 'speaking') {
      app.selectCategory('speaking');
      if (window.speakingModule && window.speakingModule.switchTab) window.speakingModule.switchTab('speak-now');
    } else if (a.type === 'writing') {
      app.selectCategory('writing');
      if (window.writingModule) window.writingModule.open(a.task);
    } else if (a.type === 'topics') {
      app.selectCategory('cambridge');
      if (window.cambridgeModule) window.cambridgeModule.renderTopicsView();
    } else if (a.type === 'lesson') {
      app.selectCategory(a.skill);
      const mod = a.skill === 'writing' ? window.writingModule : window.speakingModule;
      if (mod && mod.openCourse) mod.openCourse(a.id);
      window.scrollTo(0, 0);
    } else if (a.type === 'aiSettings') {
      app.selectCategory('speaking');
      if (window.speakingModule) window.speakingModule.openAISettings();
    } else if (a.type === 'mistakes') {
      const box = document.getElementById('today-mistakes');
      if (box) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ---------- Giao diện ----------
  const view = () => document.getElementById('today-view');
  let lastTasks = [];

  function refresh() {
    const v = view();
    if (v && v.style.display !== 'none') render();
  }

  function render() {
    const v = view();
    if (!v) return;
    const env = readEnv();
    const now = new Date();
    const plan = planFor(st, now, env);
    lastTasks = plan.tasks;

    // Ghi lại những việc tự hoàn thành hôm nay để lịch sử tuần còn đúng
    const dayDone = st.done[env.today] || {};
    const autoDone = plan.tasks.filter(t => t.done && !dayDone[t.id]);
    if (autoDone.length) { autoDone.forEach(t => markDone(t.id, {})); save(); }

    v.innerHTML = `
      <div class="today-head">
        <p class="today-date">${WEEKDAYS[now.getDay()]}, ${now.getDate()} tháng ${now.getMonth() + 1}</p>
      </div>
      <div class="today-grid">
        <div class="today-main">
          ${renderHero(plan)}
          ${renderTasks(plan)}
        </div>
        <div class="today-side">
          ${renderWeek(env)}
          ${renderLevels(env)}
          ${renderMistakes()}
          ${renderRoadmap(plan)}
          ${renderMethods()}
          ${renderSettings(plan)}
        </div>
      </div>`;
  }

  function renderHero(plan) {
    const p = { ...PHASES[plan.phase] };
    const { info } = plan;
    if (plan.phase === 'pre') {
      const start = parseYmd(st.startDate);
      p.desc = `Lộ trình bắt đầu ${WEEKDAYS[start.getDay()]} ${fmtDay(start)}. Hôm nay chỉ cần chuẩn bị máy khoảng 10 phút. Chạm vào ngày trong dải Tuần này để xem trước việc cần học.`;
    }
    const total = plan.tasks.reduce((s, t) => s + t.minutes, 0);
    const doneMin = plan.tasks.filter(t => t.done).reduce((s, t) => s + t.minutes, 0);
    const doneCount = plan.tasks.filter(t => t.done).length;
    const next = plan.tasks.find(t => !t.done);
    const countdown = info.daysLeft > 0 ? `Còn ${info.daysLeft} ngày đến kỳ thi`
      : info.daysLeft === 0 ? 'Hôm nay là ngày thi' : 'Đã qua ngày thi';
    const pct = total ? Math.round((doneMin / total) * 100) : 100;
    return `
      <section class="ios-card hero-card">
        <div class="hero-top">
          <span class="phase-pill">${esc(p.name)}</span>
          <span class="hero-countdown">${countdown}</span>
        </div>
        <p class="hero-desc">${esc(p.desc)}</p>
        <div class="hero-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-label="Tiến độ hôm nay">
          <div class="hero-bar"><span style="width:${pct}%"></span></div>
          <span class="hero-progress-text">${doneCount}/${plan.tasks.length} việc · ${fmtMin(doneMin)} / ${fmtMin(total)}</span>
        </div>
        ${info.daysLeft === 0 ? '<p class="hero-done">Chúc bạn thi thật tốt! Hôm nay không cần học thêm.</p>'
          : next ? `<button type="button" class="btn-filled btn-block" data-act="start" data-id="${next.id}">Bắt đầu: ${esc(next.title)}</button>`
          : '<p class="hero-done">Xong hết việc hôm nay. Nghỉ ngơi để mai học tiếp nhé!</p>'}
      </section>`;
  }

  function renderTasks(plan) {
    if (!plan.tasks.length) return '';
    const total = plan.tasks.reduce((s, t) => s + t.minutes, 0);
    return `
      <h3 class="group-title">Kế hoạch hôm nay <span>${fmtMin(total)}</span></h3>
      <ul class="ios-list task-list">
        ${plan.tasks.map(t => `
          <li class="task-row${t.done ? ' is-done' : ''}${expanded === t.id ? ' is-open' : ''}">
            <div class="task-line">
              <button type="button" class="task-check" data-act="toggle" data-id="${t.id}" aria-pressed="${t.done}"
                aria-label="${t.done ? 'Bỏ đánh dấu xong' : 'Đánh dấu xong'}: ${esc(t.title)}"></button>
              <button type="button" class="task-main" data-act="expand" data-id="${t.id}" aria-expanded="${expanded === t.id}">
                <span class="task-skill skill-${t.skill}">${SKILLS[t.skill]}</span>
                <span class="task-title">${esc(t.title)}</span>
                <span class="task-meta">${t.minutes} phút · ${esc(t.meta)}</span>
              </button>
              <span class="task-chevron" aria-hidden="true"></span>
            </div>
            ${expanded === t.id ? `
              <div class="task-how">
                <p class="how-label">Cách học</p>
                <ol>${t.how.map(h => `<li>${esc(h)}</li>`).join('')}</ol>
                <button type="button" class="btn-filled" data-act="start" data-id="${t.id}">Bắt đầu</button>
              </div>` : ''}
          </li>`).join('')}
      </ul>
      <p class="group-foot">Chạm vào một việc để xem cách học. Bài Cambridge, Writing và phần nói tự đánh dấu xong khi bạn làm.</p>`;
  }

  function renderWeek(env) {
    const today = startOfDay(new Date());
    const monday = mondayOf(today);
    const days = Array.from({ length: 7 }, (_, i) => addDays(monday, i));
    const cells = days.map(d => {
      const key = ymd(d);
      const doneCount = Object.keys(st.done[key] || {}).length;
      const planned = planFor(st, d, env).tasks.length;
      const isToday = key === env.today;
      const isPast = d < today;
      const beforeStart = d < parseYmd(st.startDate);
      const ratio = isPast || isToday ? Math.min(1, planned ? doneCount / planned : 0) : 0;
      return `
        <button type="button" class="week-day${isToday ? ' is-today' : ''}${beforeStart ? ' is-off' : ''}${previewDay === key ? ' is-selected' : ''}" data-act="day" data-day="${key}"
          aria-label="${WEEKDAYS[d.getDay()]} ${fmtDay(d)}: ${beforeStart ? 'trước khi bắt đầu lộ trình' : isPast || isToday ? `${doneCount} việc đã xong` : `${planned} việc`}">
          <span class="week-name">${WEEKDAYS_SHORT[d.getDay()]}</span>
          <span class="week-ring" style="--p:${Math.round(ratio * 100)}"><span>${d.getDate()}</span></span>
        </button>`;
    }).join('');

    let preview = '';
    if (previewDay && previewDay !== env.today) {
      const d = parseYmd(previewDay);
      const p = planFor(st, d, env);
      const doneMap = st.done[previewDay] || {};
      preview = `
        <div class="week-preview">
          <p class="week-preview-title">${WEEKDAYS[d.getDay()]} ${fmtDay(d)} · ${esc(PHASES[p.phase].name)}</p>
          ${p.tasks.length ? `<ul>${p.tasks.map(t => `<li class="${doneMap[t.id] ? 'is-done' : ''}"><span class="task-skill skill-${t.skill}">${SKILLS[t.skill]}</span>${esc(t.title)}</li>`).join('')}</ul>` : '<p class="muted">Nghỉ ngơi.</p>'}
        </div>`;
    }
    return `
      <h3 class="group-title">Tuần này</h3>
      <section class="ios-card week-card">
        <div class="week-strip">${cells}</div>
        ${preview}
      </section>`;
  }

  function renderLevels(env) {
    const L = latestResult(st, env, 'listening');
    const R = latestResult(st, env, 'reading');
    const W = st.writing.filter(w => w.band != null).slice(-1)[0] || null;
    const S = st.speakingBands.slice(-3);
    const sBand = S.length ? Math.round((S.reduce((s, x) => s + x.band, 0) / S.length) * 2) / 2 : null;
    const tiles = [
      { name: 'Listening', band: L && L.band, sub: L ? shortTitle(findTest(env, L.testId)) : 'Chưa làm bài' },
      { name: 'Reading', band: R && R.band, sub: R ? shortTitle(findTest(env, R.testId)) : 'Chưa làm bài' },
      { name: 'Writing', band: W && W.band, sub: W ? (W.type === 'task1' ? 'Task 1' : 'Task 2') : 'Có điểm từ Bài 12 lộ trình' },
      { name: 'Speaking', band: sBand, sub: S.length ? `TB ${S.length} câu gần nhất` : 'Có điểm khi luyện nói với AI' }
    ];
    const have = tiles.filter(t => t.band != null).map(t => Number(t.band));
    const overall = have.length === 4 ? overallBand(have) : null;
    return `
      <h3 class="group-title">Trình độ hiện tại</h3>
      <section class="ios-card level-card">
        <div class="level-grid">
          ${tiles.map(t => `
            <div class="level-tile">
              <span class="level-name">${t.name}</span>
              <span class="level-band">${fmtBand(t.band)}</span>
              <span class="level-sub">${esc(t.sub)}</span>
            </div>`).join('')}
        </div>
        <div class="level-overall">
          ${overall != null ? `<span>Band tổng ước tính</span><strong>${fmtBand(overall)}</strong>`
            : `<span>Làm đủ 4 kỹ năng để ước tính band tổng (${have.length}/4)</span>`}
          ${st.targetBand ? `<span class="level-target">Mục tiêu ${fmtBand(st.targetBand)}</span>` : ''}
        </div>
      </section>`;
  }

  function renderMistakes() {
    const open = st.mistakes.filter(m => !m.reviewed).reverse();
    const reasons = {};
    st.mistakes.filter(m => m.reason).forEach(m => { reasons[m.reason] = (reasons[m.reason] || 0) + 1; });
    const top = Object.keys(reasons).sort((a, b) => reasons[b] - reasons[a])[0];
    const list = showAllMistakes ? open.slice(0, 60) : open.slice(0, 4);
    const skillName = s => (s === 'listening' ? 'Listening' : 'Reading');
    return `
      <h3 class="group-title" id="today-mistakes">Sổ lỗi sai <span>${open.length} câu chưa ôn</span></h3>
      <section class="ios-card err-card">
        ${top ? `<p class="err-insight">Lỗi hay gặp nhất: <strong>${esc(top)}</strong> (${reasons[top]} lần)</p>` : ''}
        ${list.length ? list.map(m => `
          <article class="err-item">
            <p class="err-head">${skillName(m.skill)} · ${esc(m.testId.replace(/^cam(\d+)_t(\d+)$/, 'Cam $1 Test $2'))} · Câu ${esc(m.q)}</p>
            ${m.stem ? `<p class="err-stem">${esc(m.stem)}</p>` : ''}
            <p class="err-answers"><span class="ans-wrong">Bạn: ${esc(m.user || '(bỏ trống)')}</span><span class="ans-right">Đúng: ${esc(m.correct)}</span></p>
            ${m.quote ? `<p class="err-quote">${esc(m.quote)}</p>` : ''}
            ${m.trap ? `<p class="err-trap">${esc(m.trap)}</p>` : ''}
            <div class="err-actions">
              <select class="ios-select" data-act="reason" data-id="${esc(m.id)}" aria-label="Nguyên nhân sai">
                <option value="">Nguyên nhân sai…</option>
                ${MISTAKE_REASONS.map(r => `<option${m.reason === r ? ' selected' : ''}>${esc(r)}</option>`).join('')}
              </select>
              <button type="button" class="btn-tinted" data-act="reviewed" data-id="${esc(m.id)}">Đã hiểu</button>
            </div>
          </article>`).join('')
          : '<p class="muted">Chưa có câu sai nào cần ôn. Câu sai trong bài Cambridge sẽ tự được ghi vào đây.</p>'}
        ${open.length > 4 ? `<button type="button" class="btn-plain" data-act="more-mistakes">${showAllMistakes ? 'Thu gọn' : `Xem tất cả ${open.length} câu`}</button>` : ''}
      </section>`;
  }

  function renderRoadmap(plan) {
    const T = plan.info.totalWeeks;
    const baseEnd = Math.max(1, Math.floor(T * 0.45));
    const mockStart = Math.max(baseEnd + 1, T - 5);
    const rows = [
      { key: 'diag', range: 'Tuần 1' },
      { key: 'base', range: `Tuần 1 – ${baseEnd}` },
      { key: 'skill', range: `Tuần ${baseEnd + 1} – ${mockStart - 1}` },
      { key: 'mock', range: `Tuần ${mockStart} – ${T}` },
      { key: 'taper', range: '7 ngày cuối' }
    ];
    return `
      <h3 class="group-title">Lộ trình đến ngày thi <span>Tuần ${Math.min(plan.info.week + 1, T)}/${T}</span></h3>
      <ul class="ios-list roadmap-list">
        ${rows.map(r => `
          <li class="roadmap-row${plan.phase === r.key ? ' is-current' : ''}">
            <div><p class="roadmap-name">${esc(PHASES[r.key].name)}</p><p class="roadmap-desc">${esc(PHASES[r.key].desc)}</p></div>
            <span class="roadmap-range">${r.range}</span>
          </li>`).join('')}
      </ul>`;
  }

  function renderMethods() {
    const items = [
      ['Từ vựng: nhớ lại chủ động + lặp ngắt quãng', 'Tự nhớ ra từ trước khi lật thẻ và ôn lại theo khoảng cách tăng dần giúp nhớ lâu hơn đọc đi đọc lại.', 'https://ielts.idp.com/vietnam/about/news-and-articles/article-active-recall/en-gb', 'IDP: Active recall'],
      ['Listening: chép chính tả và nói đuổi', 'Chép chính tả chỉ ra chỗ nghe sai (số, tên riêng, nối âm). Nói đuổi theo transcript giúp quen tốc độ và ngữ điệu.', 'https://ece.edu.vn/en/master-listening-with-the-dictation-method/', 'Dictation method'],
      ['Reading: chữa từng câu sai, ghi sổ lỗi', 'Sau mỗi bài, tìm câu chứa đáp án cho từng câu sai và xác định nguyên nhân: vị trí, từ đồng nghĩa hay True/False/Not Given.', 'https://www.ieltsadvantage.com/2018/12/04/how-to-complete-ielts-reading-in-under-an-hour', 'IELTS Advantage'],
      ['Writing: chấm theo tiêu chí, viết lại phần yếu', 'Viết → chấm theo 4 tiêu chí chính thức → sửa → viết lại thân bài yếu nhất → áp dụng vào bài sau.', 'https://multimedia-english.com/blog/how-to-build-a-feedback-loop-for-better-ielts-writing-308', 'Feedback loop'],
      ['Speaking: 1 phút chuẩn bị, 2 phút nói, nghe lại', 'Nói mỗi ngày có ghi âm, nghe lại để tìm 2 điểm cần sửa rồi nói lại lần 2.', 'https://resources.cathoven.com/ielts-speaking/part-2-cue-cards', 'Cathoven: Part 2'],
      ['Lộ trình: kiểm tra → nền tảng → luyện đề → thi thử', 'Bắt đầu bằng bài kiểm tra trình độ, xây nền, rồi tăng dần đề bấm giờ và thi thử đủ bài ở các tuần cuối.', 'https://3d-universal.com/en/blogs/how-to-prepare-for-ielts-in-1-month-3-months-6-months.html', '3D Universal']
    ];
    return `
      <h3 class="group-title">Vì sao học thế này</h3>
      <section class="ios-card methods-card">
        ${items.map(([title, body, url, src]) => `
          <details class="method-item">
            <summary>${esc(title)}</summary>
            <p>${esc(body)} <a href="${url}" target="_blank" rel="noopener">Nguồn: ${esc(src)}</a></p>
          </details>`).join('')}
      </section>`;
  }

  function renderSettings(plan) {
    const bands = [5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0];
    return `
      <h3 class="group-title" id="today-settings">Cài đặt lịch học</h3>
      <ul class="ios-list settings-list">
        <li class="setting-row">
          <label for="plan-exam-date">Ngày thi</label>
          <input type="date" id="plan-exam-date" class="ios-input" value="${esc(st.examDate)}" data-act="exam">
        </li>
        <li class="setting-row">
          <label for="plan-target">Band mục tiêu</label>
          <select id="plan-target" class="ios-select" data-act="target">
            <option value="">Chưa đặt</option>
            ${bands.map(b => `<option value="${b}"${Number(st.targetBand) === b ? ' selected' : ''}>${b.toFixed(1)}</option>`).join('')}
          </select>
        </li>
        <li class="setting-row">
          <label for="plan-start-date">Bắt đầu lộ trình</label>
          <input type="date" id="plan-start-date" class="ios-input" value="${esc(st.startDate)}" data-act="start">
        </li>
      </ul>
      ${plan.phase === 'diag' ? '<div class="settings-actions"><button type="button" class="btn-plain" data-act="skip-diag">Bỏ qua kiểm tra đầu vào</button></div>' : ''}
      <p class="group-foot">Lịch học, kết quả và sổ lỗi sai tự đồng bộ giữa điện thoại, iPad và máy tính khi bạn đã bật Đồng bộ trong menu •••.</p>`;
  }

  // ---------- Sự kiện ----------
  function bind() {
    const v = view();
    if (!v || v.dataset.bound) return;
    v.dataset.bound = '1';

    v.addEventListener('click', e => {
      const btn = e.target.closest('[data-act]');
      if (!btn || btn.tagName === 'SELECT' || btn.tagName === 'INPUT') return;
      const id = btn.dataset.id;
      const task = lastTasks.find(t => t.id === id);
      switch (btn.dataset.act) {
        case 'start':
          if (task) runAction(task.action);
          return;
        case 'expand':
          expanded = expanded === id ? null : id;
          break;
        case 'toggle': {
          const key = ymd(new Date());
          if (st.done[key] && st.done[key][id]) {
            delete st.done[key][id];
          } else {
            markDone(id, task && task.action && task.action.testId ? { testId: task.action.testId } : {});
          }
          save();
          break;
        }
        case 'day':
          previewDay = previewDay === btn.dataset.day ? null : btn.dataset.day;
          break;
        case 'reviewed': {
          const m = st.mistakes.find(x => x.id === id);
          if (m) { m.reviewed = true; save(); }
          break;
        }
        case 'more-mistakes':
          showAllMistakes = !showAllMistakes;
          break;
        case 'skip-diag':
          st.skipDiag = true;
          save();
          break;
        default:
          return;
      }
      render();
    });

    v.addEventListener('change', e => {
      const elx = e.target;
      if (elx.dataset.act === 'reason') {
        const m = st.mistakes.find(x => x.id === elx.dataset.id);
        if (m) { m.reason = elx.value; save(); }
      } else if ((elx.dataset.act === 'exam' || elx.dataset.act === 'start') && /^\d{4}-\d{2}-\d{2}$/.test(elx.value)) {
        st[elx.dataset.act === 'exam' ? 'examDate' : 'startDate'] = elx.value;
        save();
        render();
      } else if (elx.dataset.act === 'target') {
        st.targetBand = elx.value ? Number(elx.value) : null;
        save();
        render();
      }
    });
  }

  function onActivate() {
    bind();
    render();
  }

  window.todayModule = {
    onActivate, refresh, attachCloud, onTestSubmitted, saveWriting, onSpeakingFeedback,
    getWritingHistory: () => st.writing.slice(),
    getCourseProgress: skill => ({ ...(st.course[skill] || {}) }),
    completeLesson, reviewLesson,
    reviewInfo: (skill, id) => reviewState(st, skill, id, new Date()),
    updateWriting(id, patch) {
      const w = st.writing.find(x => x.id === id);
      if (w) { Object.assign(w, patch); save(); }
    },
    openSettings() {
      if (window.appApi) window.appApi.selectCategory('today');
      const s = document.getElementById('today-settings');
      if (s) s.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
})();
