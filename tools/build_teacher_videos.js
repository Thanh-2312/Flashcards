// Tạo teacher_videos.js: tên file, thời lượng và mục lục (mốc thời gian) của từng video, lấy từ 2 file transcript gộp.
// Chạy: node tools/build_teacher_videos.js [Writing.md] [speaking.md]
// Không ghi đường dẫn thì đọc ở thư mục TEACHER_DIR (nếu đặt) rồi tới thư mục gốc repo.
const fs = require('fs');
const path = require('path');

const DIR = process.env.TEACHER_DIR;
const find = (arg, name) => [arg, DIR && path.join(DIR, name), path.join(__dirname, '..', name)].find(p => p && fs.existsSync(p));
const clean = s => s.replace(/\*\*|\*|`/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').trim();

function parse(file) {
  const out = {};
  const parts = fs.readFileSync(file, 'utf8').split(/^## Video (\d+):.*$/m);
  for (let i = 1; i < parts.length; i += 2) {
    const body = parts[i + 1];
    const heads = { 3: [], 4: [] };
    let pending = [];
    for (const line of body.split('\n')) {
      const h = line.match(/^(###|####) (.+)/);
      if (h) {
        const c = { t: '', title: clean(h[2]) };
        heads[h[1].length].push(c);
        pending.push(c);
        continue;
      }
      const t = line.match(/\*\*\[(\d{1,2}:\d{2}(?::\d{2})?)\]\*\*/);
      if (t && pending.length) { pending.forEach(c => { c.t = t[1]; }); pending = []; }
    }
    // Video chỉ có 1–2 mục lớn thì dùng mục nhỏ hơn cho mục lục chi tiết
    const chapters = (heads[3].length >= 3 ? heads[3] : heads[3].concat(heads[4]))
      .filter(c => c.t && !/^Video \d+/i.test(c.title));
    out[Number(parts[i])] = {
      file: (body.match(/File video gốc:\*\* `([^`]+)`/) || [])[1] || '',
      duration: (body.match(/Thời lượng:\*\* `([^`]+)`/) || [])[1] || '',
      chapters
    };
  }
  return out;
}

const wFile = find(process.argv[2], 'Writing.md');
const sFile = find(process.argv[3], 'speaking.md');
if (!wFile || !sFile) {
  console.error('Không tìm thấy Writing.md hoặc speaking.md');
  process.exit(1);
}
const data = { writing: parse(wFile), speaking: parse(sFile) };
for (const [skill, n] of [['writing', 30], ['speaking', 40]]) {
  const got = Object.keys(data[skill]).length;
  const empty = Object.entries(data[skill]).filter(([, v]) => !v.file || !v.chapters.length).map(([k]) => k);
  if (got !== n || empty.length) console.warn(`${skill}: ${got}/${n} video, thiếu file hoặc mục lục: ${empty.join(', ') || 'không'}`);
}
const out = path.join(__dirname, '..', 'teacher_videos.js');
fs.writeFileSync(out, `/** MỤC LỤC VIDEO BÀI GIẢNG: tạo tự động bằng tools/build_teacher_videos.js từ transcript, không sửa tay. */\nwindow.TEACHER_VIDEOS = ${JSON.stringify(data, null, 1)};\n`);
console.log(`Đã ghi ${out}: ${Object.keys(data.writing).length} video Writing, ${Object.keys(data.speaking).length} video Speaking`);
