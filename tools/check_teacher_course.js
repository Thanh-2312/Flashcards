// Kiểm tra dữ liệu bài giảng video (teacher_course.js) trước khi dùng trong app. Chạy: node tools/check_teacher_course.js
const assert = require('assert');
const fs = require('fs');
const path = require('path');

global.window = {};
require('../teacher_course.js');
const T = window.TEACHER_COURSE;
assert(T && typeof T === 'object', 'thiếu window.TEACHER_COURSE');

// Bài "viết cả bài" phải trỏ tới đề có thật trong writing.js
const writingSrc = fs.readFileSync(path.join(__dirname, '..', 'writing.js'), 'utf8');
const promptIds = new Set([...writingSrc.matchAll(/'(t[12]-\d\d)'/g)].map(m => m[1]));
const ids = new Set();
const filled = s => typeof s === 'string' && s.trim().length > 0;

for (const skill of ['writing', 'speaking']) {
  const list = T[skill] || [];
  assert(Array.isArray(list), `${skill} phải là mảng`);
  assert(!T.expected || list.length <= T.expected[skill], `${skill}: nhiều bài hơn số video`);
  let lastVideo = 0;
  list.forEach((l, i) => {
    const where = `${skill}[${i}] ${l.id}`;
    const prefix = skill === 'writing' ? 'hw' : 'hs';
    assert(l.id === `${prefix}${String(l.video).padStart(2, '0')}`, `${where}: id phải là ${prefix} + số video 2 chữ số`);
    assert(!ids.has(l.id), `${where}: id trùng`);
    ids.add(l.id);
    assert(Number.isInteger(l.video) && l.video > lastVideo, `${where}: số video phải tăng dần`);
    lastVideo = l.video;
    for (const k of ['unit', 'title', 'goal']) assert(filled(l[k]), `${where}: thiếu ${k}`);
    assert(Number.isInteger(l.minutes) && l.minutes >= 10 && l.minutes <= 90, `${where}: minutes phải từ 10 đến 90`);
    assert(Array.isArray(l.points) && l.points.length >= 3 && l.points.every(filled), `${where}: cần ít nhất 3 ý chính`);
    (l.examples || []).forEach((ex, j) => {
      assert(['bad', 'good', 'model', 'note'].includes(ex.kind) && filled(ex.text), `${where}: examples[${j}] sai định dạng`);
    });
    const p = l.practice;
    assert(p && filled(p.task), `${where}: thiếu practice.task`);
    if (p.type === 'write') {
      assert(filled(p.check), `${where}: bài write cần check (tiêu chí cho AI chữa)`);
    } else if (p.type === 'essay') {
      assert(['task1', 'task2'].includes(p.taskType) && promptIds.has(p.promptId), `${where}: essay cần taskType và promptId có trong writing.js`);
    } else if (p.type === 'speak') {
      assert(Array.isArray(p.questions) && p.questions.length > 0, `${where}: speak cần questions`);
      p.questions.forEach((q, j) => {
        assert([1, 2, 3].includes(q.part) && filled(q.q) && filled(q.vi), `${where}: questions[${j}] cần part, q, vi`);
        assert(!q.bullets || (Array.isArray(q.bullets) && q.bullets.every(filled)), `${where}: questions[${j}].bullets sai`);
      });
      assert(!p.shadow || (Array.isArray(p.shadow) && p.shadow.every(filled)), `${where}: shadow sai`);
    } else {
      assert.fail(`${where}: practice.type phải là write, essay hoặc speak`);
    }
  });
}

console.log(`teacher_course.js hợp lệ: ${(T.writing || []).length}/${(T.expected || {}).writing || '?'} bài Writing, ${(T.speaking || []).length}/${(T.expected || {}).speaking || '?'} bài Speaking`);
