// Kiểm tra logic lịch học trong plan.js. Chạy: node tools/test_plan.js
const assert = require('assert');
const P = require('../plan.js');

const catalog = [];
for (let b = 10; b <= 20; b++) for (let t = 1; t <= 4; t++) catalog.push({ id: `cam${b}_t${t}`, title: `Cambridge IELTS ${b} • Test ${t}`, book: `cam${b}` });
const mk = (prefix, n, minutes) => Array.from({ length: n }, (_, i) => ({ id: `${prefix}${String(i + 1).padStart(2, '0')}`, title: `${prefix}${i + 1}`, unit: 'U', minutes, goal: 'g' }));
const lessons = { writing: mk('w', 24, 30), speaking: mk('s', 18, 25) };
const allDone = skill => Object.fromEntries(lessons[skill].map(l => [l.id, 1]));
const allReviewed = skill => Object.fromEntries(lessons[skill].map(l => [l.id, { n: 4, at: 1 }]));
const at = (day, hour = 20) => { const d = P.parseYmd(day); d.setHours(hour); return d.getTime(); };
const envOn = day => ({ today: day, catalog, due: 5, spokenSec: 0, localResults: {}, lessons });
const plan = (st, day) => P.planFor(st, P.parseYmd(day), envOn(day));
const ids = (st, day) => plan(st, day).tasks.map(t => t.id);
const task = (st, day, id) => plan(st, day).tasks.find(t => t.id === id);

// Bắt đầu Chủ nhật 8/11/2026, thi 1/5/2027
const st = P.normalize({ startDate: '2026-11-08', examDate: '2027-05-01' });
const info = P.weekInfo(st, P.parseYmd('2026-11-09'));
assert.strictEqual(info.week, 1, 'tuần tính từ Thứ Hai của tuần bắt đầu');
assert.strictEqual(info.totalWeeks, 26);

// Trước ngày bắt đầu: chỉ chuẩn bị máy
assert.strictEqual(P.phaseOf(st, P.parseYmd('2026-11-07'), envOn('2026-11-07')), 'pre');
assert.deepStrictEqual(ids(st, '2026-11-07'), ['setup']);

// Ngày 1: từ vựng + bài học Speaking 1 + bài học Writing 1 + kiểm tra Listening (1 bài kiểm tra mỗi ngày)
assert.strictEqual(P.phaseOf(st, P.parseYmd('2026-11-08'), envOn('2026-11-08')), 'diag');
assert.deepStrictEqual(ids(st, '2026-11-08'), ['vocab', 'Sles', 'Wles', 'D-L']);
assert.strictEqual(task(st, '2026-11-08', 'D-L').action.testId, 'cam15_t1');
assert.strictEqual(task(st, '2026-11-08', 'Wles').action.id, 'w01');
assert.strictEqual(task(st, '2026-11-08', 'Sles').action.id, 's01');

// Học xong bài 1 trong ngày → vẫn hiện bài 1 (đã xong); hôm sau sang bài 2 và kiểm tra Reading
const st2 = P.normalize({
  ...st,
  results: { cam15_t1_listening: { band: 6, at: 1 } },
  course: { writing: { w01: at('2026-11-08') }, speaking: { s01: at('2026-11-08') } },
  done: { '2026-11-08': { 'D-L': { at: 1, testId: 'cam15_t1' }, Wles: { at: 1, lessonId: 'w01' }, Sles: { at: 1, lessonId: 's01' } } }
});
assert.deepStrictEqual(ids(st2, '2026-11-08'), ['vocab', 'Sles', 'Wles', 'D-L']);
assert.strictEqual(task(st2, '2026-11-08', 'Wles').action.id, 'w01');
assert.strictEqual(task(st2, '2026-11-08', 'Wles').done, true);
// Hôm sau: ôn lại 2 bài vừa học (trước bài mới), rồi bài 2 và kiểm tra Reading
assert.deepStrictEqual(ids(st2, '2026-11-09'), ['vocab', 'review', 'Sles', 'Wles', 'D-R']);
assert.strictEqual(task(st2, '2026-11-09', 'Wles').action.id, 'w02');
assert.strictEqual(task(st2, '2026-11-09', 'review').action.id, 'w01');

// Ôn ngắt quãng: ôn ngày 9 → lần sau ngày 11 → 15 → 22; ôn đủ 4 lần thì thôi
const rv = (reviews, day) => P.reviewState(P.normalize({ ...st2, reviews: { writing: reviews } }), 'writing', 'w01', P.parseYmd(day));
assert.strictEqual(rv({}, '2026-11-09').due, true);
assert.strictEqual(rv({ w01: { n: 1, at: at('2026-11-09') } }, '2026-11-10').due, false);
assert.strictEqual(rv({ w01: { n: 1, at: at('2026-11-09') } }, '2026-11-11').due, true);
assert.strictEqual(P.ymd(rv({ w01: { n: 2, at: at('2026-11-11') } }, '2026-11-12').next), '2026-11-15');
assert.strictEqual(P.ymd(rv({ w01: { n: 3, at: at('2026-11-15') } }, '2026-11-16').next), '2026-11-22');
assert.strictEqual(rv({ w01: { n: 4, at: at('2026-11-22') } }, '2027-01-01').due, false);
assert.deepStrictEqual(ids(P.normalize({ ...st2, reviews: { writing: { w01: { n: 1, at: at('2026-11-09') } }, speaking: { s01: { n: 1, at: at('2026-11-09') } } } }), '2026-11-10'),
  ['vocab', 'Sles', 'Wles', 'D-R'], 'đã ôn hôm qua thì hôm nay không có việc ôn');
// Mỗi ngày ôn tối đa 3 bài, bài đến hạn sớm nhất trước
const many = P.normalize({ ...st, course: { writing: { w01: at('2026-11-01'), w02: at('2026-11-02'), w03: at('2026-11-03') }, speaking: { s01: at('2026-11-04') } } });
assert.strictEqual(task(many, '2026-11-09', 'review').action.id, 'w01');
assert.strictEqual(task(many, '2026-11-09', 'review').minutes, 15);

// Xong đầu vào, đang học lộ trình → Giai đoạn 1; Thứ Hai: bài học + Listening + nghe sâu
const ready = P.normalize({ ...st, results: { cam15_t1_listening: { band: 6, at: 1 }, cam15_t1_reading: { band: 6.5, at: 2 } } });
assert.strictEqual(P.phaseOf(ready, P.parseYmd('2026-11-09'), envOn('2026-11-09')), 'base');
assert.deepStrictEqual(ids(ready, '2026-11-09'), ['vocab', 'Sles', 'Wles', 'L', 'Ldeep']);
assert.strictEqual(task(ready, '2026-11-09', 'L').action.testId, 'cam10_t1', 'đề mới đầu tiên theo thứ tự');
assert.strictEqual(task(ready, '2026-11-09', 'Ldeep').action.testId, 'cam15_t1', 'nghe sâu bài Listening gần nhất');

// Kiểm tra đầu vào không chặn quá 2 tuần
assert.strictEqual(P.phaseOf(st, P.parseYmd('2026-11-16'), envOn('2026-11-16')), 'base');

// Học xong lộ trình → luyện đề Writing, nói 2 phút, thi thử Speaking
const grad = P.normalize({ ...ready, course: { writing: allDone('writing'), speaking: allDone('speaking') }, reviews: { writing: allReviewed('writing'), speaking: allReviewed('speaking') } });
assert.deepStrictEqual(ids(grad, '2026-11-09'), ['vocab', 'speak', 'W1', 'L', 'Ldeep']);
assert.deepStrictEqual(ids(grad, '2026-11-11'), ['vocab', 'speak', 'Smock', 'Ldeep', 'topic']);
// Mới xong Speaking: có thi thử Speaking nhưng Writing vẫn học bài
const half = P.normalize({ ...ready, course: { writing: {}, speaking: allDone('speaking') }, reviews: { speaking: allReviewed('speaking') } });
assert.deepStrictEqual(ids(half, '2026-11-11'), ['vocab', 'speak', 'Wles', 'Smock', 'Ldeep', 'topic']);

// Giai đoạn 2 và 3
assert.strictEqual(P.phaseOf(grad, P.parseYmd('2027-02-01'), envOn('2027-02-01')), 'skill');
assert.strictEqual(P.phaseOf(grad, P.parseYmd('2027-03-27'), envOn('2027-03-27')), 'mock');
assert.deepStrictEqual(ids(grad, '2027-03-27'), ['vocab', 'speak', 'W1', 'W2', 'L', 'R'], 'Thứ Bảy thi thử đủ bài');
assert.strictEqual(task(grad, '2027-03-27', 'L').action.testId, 'cam19_t1', 'thi thử dùng đề mới nhất được để dành');

// Tuần thi, ngày thi, sau ngày thi
assert.strictEqual(P.phaseOf(grad, P.parseYmd('2027-04-26'), envOn('2027-04-26')), 'taper');
assert.deepStrictEqual(ids(grad, '2027-04-26'), ['vocab', 'speak', 'L']);
assert.deepStrictEqual(ids(grad, '2027-05-01'), []);
assert.deepStrictEqual(ids(grad, '2027-05-02'), ['vocab']);

// Hết đề mới → làm lại đề cũ nhất
const results = {};
catalog.filter(t => !['cam19', 'cam20'].includes(t.book)).forEach((t, i) => { results[`${t.id}_listening`] = { band: 6, at: 100 + i }; });
results.cam10_t1_listening.at = 999;
const pick = P.pickTest(P.normalize({ ...ready, results }), 'listening', 'base', envOn('2027-01-04'));
assert.strictEqual(pick.id, 'cam10_t2');

// Band tổng làm tròn theo IELTS
assert.strictEqual(P.overallBand([6, 6.5, 6, 6.5]), 6.5);
assert.strictEqual(P.overallBand([6, 6, 6, 6.5]), 6);
assert.strictEqual(P.overallBand([6.5, 6.5, 7, 7]), 7);

// Dữ liệu từ Firebase: mảng thành object, mảng/đối tượng rỗng bị bỏ
const n = P.normalize({ mistakes: { 0: { id: 'a' }, 1: { id: 'b' } }, updatedAt: 5 });
assert.deepStrictEqual(n.mistakes.map(m => m.id), ['a', 'b']);
assert.deepStrictEqual(n.writing, []);
assert.deepStrictEqual(n.done, {});
assert.deepStrictEqual(n.course, { writing: {}, speaking: {} });
assert.deepStrictEqual(n.reviews, { writing: {}, speaking: {} });

console.log('plan.js: tất cả kiểm tra đều đạt');
