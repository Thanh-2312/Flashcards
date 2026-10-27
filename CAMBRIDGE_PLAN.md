# PLAN: Cambridge IELTS 10–20 → Flashcard theo chủ đề + Làm đề có chữa + Listening 3 tab

> **Đọc file này trước khi làm bất kỳ phase nào.** Mỗi phase là 1 việc giao được cho 1 subagent.
> Nguyên tắc chung (giống `SPEAKING_PLAN.md`): **1 người dùng → làm đơn giản nhất có thể**. Không server, không build step, vẫn chạy trên GitHub Pages. Python chỉ dùng **offline** để sinh dữ liệu.
> **Speaking giữ nguyên** — không sửa `speaking.js`, `roleplay.js`, khối HTML Speaking.

---

## 0. Mục tiêu (định nghĩa "xong")

| # | Tính năng | Xong khi |
|---|---|---|
| A | **Flashcard theo chủ đề, ôn cuốn chiếu** | Tất cả từ **khó (CEFR ≥ B2)** lấy từ mọi bài Listening + Reading CAM 10–20 thành thẻ đúng chuẩn `AGENT.md`, gắn `topic`, lọc theo chủ đề, ôn theo chu kỳ 1→4→7→14 ngày + giới hạn thẻ mới/ngày |
| B | **Làm đề Reading** | Làm được 40 câu/test, nộp bài → chấm + band. Câu sai: **cuộn tới & tô sáng đoạn văn chứa đáp án**, tô **keyword câu hỏi ↔ cụm paraphrase trong bài**, ghi chú **bẫy** (vì sao đáp án nhiễu sai) |
| C | **Làm đề Listening** | Làm được 40 câu/test có audio. Câu sai: nút **▶ nghe lại đúng đoạn audio dẫn chứng**, hiện đoạn transcript đó, tô keyword + bẫy (vd. người nói đổi ý) |
| D | **Listening 3 tab khi luyện nghe** | Mỗi part có 3 tab: **① Toàn văn** (transcript chạy theo audio) · **② Chỉ từ khó** · **③ Từ khó + nghĩa** |
| E | Speaking | Không đổi |

---

## 1. Hiện trạng (đã khảo sát — đừng làm lại)

### 1.1 Code app (vanilla JS, mỗi tính năng 1 file, gắn vào `index.html`)
| File | Vai trò | Ghi chú quan trọng |
|---|---|---|
| `app.js` (203KB) | Flashcard chính | `INTERVAL_LEVELS = [1,4,7,14]` (dòng ~13), `DEFAULT_CARDS` (187 thẻ `card-XXX`), `STORAGE_KEY = 'minimal_flashcards_data_v6'`, `loadCardsFromStorage()` tự merge thẻ mặc định mới vào localStorage, category chỉ có `words`/`collocations`/`speaking`. Đồng bộ Firebase (`SYNC_STORAGE_KEY`) |
| `cambridge.js` (57KB) | Cambridge Hub: chọn book/test, làm bài, chấm band, review, `replayClueAudio(start,end,q)`, tab "Topics" có SRS **riêng** (`ielts_cambridge_saved_vocab`) | Đang đọc toàn bộ `window.CAMBRIDGE_DATA` |
| `cambridge_data.js` (576KB) | Dữ liệu sinh ra: `books[cam10, cam11]`, `topics[8]`, `band_scale` | Chỉ **CAM10 Test 1** có dữ liệu thật (câu hỏi, clue, giờ audio). Test 2–4 & CAM11 là **placeholder** (`"Question 14 (Passage 2)"`, clue giả) |
| `generate_cambridge_dataset.py` | Sinh `cambridge_data.js` | **Hỏng khi chạy lại**: `from build_cambridge_db import VOCABULARY_TOPICS` nhưng `build_cambridge_db.py` **không tồn tại** (chỉ còn `.pyc`, chưa từng commit). Dữ liệu topics vẫn còn trong `cambridge_data.js` |
| `listening.js` + `listening_data.js` | Luyện nghe real-time CAM10 T1 | Đã có 4 mode: `karaoke` (toàn văn), `minimal` (từ khó chạy theo audio), `detailed` (từ khó + IPA + nghĩa), `vocab` (danh sách). Dữ liệu từ có `start/end` theo giây. **Tái sử dụng làm tính năng D** |
| `TEST 1/align_listening.py` | Căn giờ transcript bằng Gemini | ⚠️ **Chứa Gemini API key (base64) và ĐÃ được commit/push** → xem Phase 0 |
| `index.html` (đang sửa, chưa commit) | Đã thêm **thanh lọc chủ đề** `#topic-filter-nav`, badge `#current-topic-tag`, select `#card-input-topic` với 9 topic: `environment, travel, architecture, science, health, education, economy, psychology, communication` | JS cho các phần này **chưa viết** trong `app.js`. Dùng đúng 9 topic id này |

### 1.2 Dữ liệu `CAMBRIDGE/CAMBRIDGE IELTS 10-20/`
- `CAM 10` … `CAM 20`, mỗi bộ 4 test. Tên thư mục/file **không đồng nhất** (`LISTENING`/`Listening`, `TEST 1`/`Test 1`/`CAM 17 Test 1`; CAM 12 Reading là file `TEST 1.docx` không có thư mục; file khoá `~$...docx` cần bỏ qua).
- **Reading**: 1 docx đề (passage + câu hỏi) + thường 1 docx `ANSWER KEY…` (CAM 12, 19, 20 cần kiểm tra key nằm đâu — có thể nằm cuối file đề hoặc tên `Key-T1 Read.docx`).
- **Listening**: docx câu hỏi + docx transcript (+ đôi khi `ANSWER KEY.docx`, `Key-T1 Lis.docx`). Transcript **CAM 12, 14, 16 có đánh dấu `(Q1)…(Q40)`**; **CAM 19, 20 không có** → phải tìm dẫn chứng bằng LLM.
- **Audio**: CAM 10, 11, 16, 17, 19, 20: 4 file/test (mỗi section 1 file). CAM 12, 13 (T3–4), 14, 15, 18: **1 file/test** (cả 4 part) → cần lưu `offset` mỗi part. CAM 20 T1 thư mục tên `Audio_`. Có thêm bản trùng ở `CAMBRIDGE/CAMBRIDGE 20/FILE NGHE CAM 20` (`.m4a`) và thư mục `…-20260821T043347Z-1-002` (bản extract trùng) → **bỏ qua**.
- Docx câu hỏi có thể chứa **ảnh** (map, diagram, flow-chart) trong `word/media/` → phải trích ra.
- Bỏ qua: thư mục `LISTENING CAM 10-20 (chia dạng - DONE)`, `SPEAKING`, `WRITING`, các PDF.
- Toàn bộ `CAMBRIDGE/` = 3.9GB; `.gitignore` đang loại CAM 12–20 → hiện **audio CAM 12–20 không có trên GitHub Pages**.

### 1.3 Môi trường máy
Python 3.14, Node 24, **chưa có** `ffmpeg`, **chưa có** `faster-whisper` (ctranslate2 có thể chưa có wheel cho 3.14 → dùng venv Python 3.12).

---

## 2. Quyết định kỹ thuật (đã chốt mặc định — người dùng có thể đổi)

| Vấn đề | Chọn | Lý do |
|---|---|---|
| Dữ liệu đề | **1 file JS / test**: `data/tests/cam10_t1.js` gán `window.CAM_TESTS['cam10_t1'] = {...}`, nạp lười bằng thẻ `<script>` khi mở test | 44 test × ~150KB không thể nhồi 1 file; `<script>` chạy được cả `file://` lẫn GitHub Pages (fetch JSON thì không chạy `file://`) |
| Mục lục | `cambridge_data.js` chỉ còn **manifest** (books → tests: id, title, có audio không) + `band_scale` | Trang tải nhanh |
| Trích xuất docx | Python stdlib (`zipfile` + `xml.etree`) như `generate_cambridge_dataset.py` đang làm | Không thêm dependency |
| Làm giàu (câu dẫn chứng, keyword, bẫy, từ khó, nghĩa) | **Subagent Claude tự đọc text đã trích và viết JSON** theo schema mục 3, 1 test / 1 subagent; script `validate.py` kiểm tra | Không cần API key, chất lượng cao, chạy song song. (Phương án B: script gọi Gemini — chỉ dùng nếu người dùng muốn tự động hoá hoàn toàn) |
| Căn giờ audio | **`faster-whisper` chạy local** (model `small.en`, `word_timestamps=True`) → so khớp với transcript chính thức bằng `difflib` | Miễn phí, tất định, có **giờ từng từ** (cần cho tab ②③). Bỏ cách dùng Gemini cũ |
| Lọc "từ khó" | 2 lớp: (1) lọc thô bằng `wordfreq` (`zipf_frequency < 4.2`) hoặc thuộc AWL, bỏ tên riêng/số; (2) subagent xác nhận CEFR **B2/C1/C2** theo Cambridge/Oxford Learner's như `AGENT.md` | Lớp 1 giảm khối lượng, lớp 2 đảm bảo đúng quy tắc |
| Audio trên web | Nén lại **mp3 mono 32 kbps** bằng ffmpeg vào `audio/cam{N}/t{M}[_p{K}].mp3`, commit vào repo | ~22 giờ audio ≈ 320MB < giới hạn 1GB GitHub Pages, mỗi file < 100MB. Giọng nói vẫn rõ |
| Thẻ flashcard Cambridge | File sinh riêng `cambridge_cards.js` → `window.CAMBRIDGE_CARDS = [...]`, **id ổn định** `cam-<lemma>` (vd. `cam-itinerary`) | Không nhồi hàng nghìn thẻ vào `app.js`; id theo lemma ⇒ sinh lại không trùng/không mất tiến độ |
| SRS | Dùng **chung SRS của `app.js`** (1→4→7→14). Bỏ SRS riêng trong tab Topics của `cambridge.js` | Một hệ thống, một chỗ đồng bộ Firebase |
| "Cuốn chiếu" | Hàng đợi hôm nay = **thẻ đến hạn** + **N thẻ mới/ngày cho mỗi chủ đề** (mặc định N=10, chỉnh trong cài đặt) | Không bị ngợp hàng nghìn thẻ mới cùng lúc |

> [!WARNING]
> Repo đang public và chứa nội dung sách Cambridge (bản quyền). Đây là rủi ro sẵn có, plan này làm tăng thêm (thêm passage + audio). Người dùng tự quyết có chuyển repo private hay không.

---

## 3. Schema dữ liệu (HỢP ĐỒNG giữa các phase — không tự ý đổi)

### 3.1 `data/tests/{testId}.js`  (testId = `cam{N}_t{M}`, vd. `cam16_t3`)
```js
window.CAM_TESTS = window.CAM_TESTS || {};
window.CAM_TESTS['cam16_t3'] = {
  id: 'cam16_t3', book: 16, test: 3, title: 'Cambridge IELTS 16 • Test 3',
  reading: {
    passages: [{
      n: 1, title: 'Roman shipbuilding and navigation',
      paragraphs: [ { id: 'A', text: '...' }, { id: 'B', text: '...' } ],   // id = chữ cái nếu bài có A–H, nếu không thì 'P1','P2',...
      groups: [{
        range: [1, 6], type: 'tfng',            // xem bảng type bên dưới
        instruction: 'Do the following statements agree with the information...?',
        options: null,                           // mảng {key:'A', text:'...'} cho mcq/matching; null nếu không có
        image: null,                             // 'data/img/cam16_t3_r_g1.png' nếu có
        questions: [{
          q: 1,
          stem: 'The Romans copied the design of some ships.',
          answer: ['TRUE'],                      // mọi đáp án chấp nhận (biến thể chính tả, có/không mạo từ)
          evidence: { para: 'B', quote: 'câu NGUYÊN VĂN trong đoạn B' },   // quote PHẢI là chuỗi con của paragraphs[B].text
          keywords: [ { q: 'copied', p: 'imitated' } ],  // q = từ trong câu hỏi, p = cụm tương ứng NGUYÊN VĂN trong passage
          trap: 'Đoạn C nhắc "design" nhưng nói về...',   // tiếng Việt; '' nếu không có bẫy
          explain: 'Giải thích ngắn tiếng Việt vì sao đáp án đúng.'
        }]
      }]
    }]
  },
  listening: {
    parts: [{
      n: 1, title: 'Part 1: ...',
      audio: { src: 'audio/cam16/t3_p1.mp3', offset: 0 },  // offset (giây) khi 1 file chứa cả test
      segments: [ { id: 's12', speaker: 'ANDREA', text: '...', start: 120.7, end: 124.0 } ], // 1 segment ≈ 1 lượt nói/câu
      words: [ { w: 'itinerary', s: 301.2, e: 301.8, seg: 's40' } ],  // CHỈ các từ khó (từ vocab bên dưới) kèm giờ
      groups: [ /* giống reading, nhưng evidence = */ 
        // evidence: { seg: ['s12'], quote: 'NGUYÊN VĂN trong segment', start: 120.7, end: 124.0 }
      ]
    }]
  },
  vocab: [ /* các thẻ ở 3.2 được rút từ test này — chỉ để tra cứu, nguồn thật là cambridge_cards.js */ ]
};
```

**`type` câu hỏi** (UI phải hỗ trợ đủ): `fill` (điền từ/số — ô input), `tfng`, `ynng`, `mcq` (1 đáp án), `mcq_multi` (chọn 2/3 đáp án, `answer` là mảng các key, chấm từng câu), `match` (chọn key từ `options` — dùng cho matching headings/information/features/endings), `map` (= `match` + `image`).

**Chấm `fill`**: chuẩn hoá (lowercase, bỏ dấu câu, gộp khoảng trắng, bỏ mạo từ đầu `a/an/the`) rồi so với từng phần tử `answer`. Đáp án dạng `(the) newspaper` hay `24 / twenty-four` phải được tách thành nhiều phần tử ở bước sinh dữ liệu.

### 3.2 Thẻ flashcard (`cambridge_cards.js`)
Đúng chuẩn `AGENT.md` + 3 trường mới:
```js
{
  id: 'cam-itinerary',                  // 'cam-' + lemma, chữ thường, khoảng trắng → '-'
  category: 'words',                    // hoặc 'collocations'
  topic: 'travel',                      // 1 trong 9 topic id ở mục 1.1
  english: 'itinerary',
  ipa: '/aɪˈtɪn.ər.ər.i/ (n - C1)',
  vietnamese: 'Lịch trình chi tiết chuyến đi',
  frontText: 'Before the trip, the travel agent sent us a full __________ with every day planned.', // MỌI từ xung quanh ≤ B1
  context: 'Câu NGUYÊN VĂN trong đề Cambridge chứa từ',
  exampleEn: 'frontText đã điền từ',
  acceptedAnswers: ['itinerary', 'itineraries'],
  source: ['cam10_t1:L1', 'cam14_t2:R3'], // mọi nơi từ xuất hiện (L = listening part, R = reading passage)
  interval: 1, boxLevel: 1, nextReviewDate: 0, createdDate: 0   // 0 = "chưa học" → app gán khi đưa vào hàng đợi
}
```
- **Gộp trùng theo lemma** trên toàn bộ 44 test (giữ `context` đầu tiên, nối `source`).
- Không tạo thẻ cho từ đã có trong `DEFAULT_CARDS` (so `english` chữ thường).
- `topic` lấy theo chủ đề **bài nghe/đọc** nguồn (subagent gán topic cho mỗi passage/part trước), không theo nghĩa từ.

---

## 4. Các phase (giao cho subagent)

```
Phase 0 ──► Phase 1 ──┬──► Phase 2 (song song theo bộ sách) ──► Phase 4 (flashcard)
                      └──► Phase 3 (audio + căn giờ) ─────────┘
Phase 5 (UI làm đề) và Phase 6 (UI listening 3 tab) có thể làm SONG SONG với Phase 2–3,
dùng CAM10 T1 (đã có dữ liệu thật) làm dữ liệu mẫu chuyển sang schema mới.
Phase 7: kiểm thử tổng + commit.
```

Thư mục mới: `tools/` (script Python), `data/tests/`, `data/raw/` (gitignore), `data/img/`, `audio/`.

---

### Phase 0 — Dọn nền (1 subagent, ~nhỏ)
1. **Bảo mật**: xoá key khỏi `TEST 1/align_listening.py` (đọc từ biến môi trường `GEMINI_API_KEY`). Báo người dùng **thu hồi/đổi key trên Google AI Studio** vì key đã nằm trong lịch sử git public. Không rewrite lịch sử git khi chưa được hỏi.
2. Khôi phục topics: viết `tools/extract_topics.py` lấy `topics` từ `cambridge_data.js` hiện tại → `data/legacy_topics.json`; sửa `generate_cambridge_dataset.py` bỏ import `build_cambridge_db` (hoặc thay hẳn bằng pipeline mới ở Phase 1 — khuyến nghị thay hẳn, giữ file cũ tới khi Phase 5 xong).
3. Thêm vào `.gitignore`: `data/raw/`, `.venv*/`.
4. Commit riêng phần `index.html`/`style.css` đang sửa dở (topic filter) **chỉ khi người dùng đồng ý** — hoặc để Phase 4 hoàn thiện cùng.

**Xong khi**: không còn chuỗi key trong repo HEAD; `data/legacy_topics.json` có 8 topic.

---

### Phase 1 — Trích xuất thô (1 subagent)
Viết `tools/extract_raw.py`:
1. Duyệt `CAMBRIDGE/CAMBRIDGE IELTS 10-20/CAM {10..20}`, **so tên không phân biệt hoa thường**, bỏ `~$*`, bỏ các thư mục liệt kê ở 1.2.
2. Với mỗi test xuất `data/raw/cam{N}_t{M}.json`:
   ```json
   { "id": "cam16_t3",
     "files": { "reading": "...", "reading_key": "...", "listening_q": "...", "listening_tr": "...", "listening_key": "...", "audio": ["..."] },
     "reading_text": ["đoạn 1", "đoạn 2", ...],          // giữ thứ tự paragraph docx
     "reading_key": { "1": "TRUE", ... },
     "listening_q_text": [...], "listening_tr_text": [...],
     "listening_key": { "1": "...", ... },               // nếu không có file key: tìm khối 'Answer key'/'Key' cuối file đề/transcript
     "transcript_markers": { "1": "dòng chứa (Q1)", ... }, // nếu transcript có (Qn)
     "images": ["data/img/cam16_t3_l_1.png", ...] }
   ```
3. Trích ảnh `word/media/*` → `data/img/` (đổi tên theo test). Ảnh > 300KB thì ghi chú để nén sau.
4. In **báo cáo bảng**: test nào thiếu key / thiếu transcript / thiếu audio / số câu key ≠ 40. Ghi báo cáo vào `data/raw/_report.md`.
5. Tái dùng `get_docx_paragraphs`, `clean_text`, `parse_answer_key` từ `generate_cambridge_dataset.py` (copy sang `tools/docx_utils.py`), mở rộng `parse_answer_key` để nhận cả `1 TRUE`, `1. A`, `1-2 B, D`, `(the) newspaper`, `A/C in either order`.

**Xong khi**: 44 file raw; `_report.md` liệt kê rõ chỗ thiếu; key đủ 40 câu cho mọi test có key.

---

### Phase 2 — Làm giàu dữ liệu đề (song song: 1 subagent / 1 bộ sách = 4 test)
Đầu vào: `data/raw/cam{N}_t*.json`. Đầu ra: `data/tests/cam{N}_t{M}.js` đúng schema 3.1 (chưa cần `start/end`/`words` — Phase 3 điền).

Việc của subagent cho **mỗi test**:
1. **Reading**: tách 3 passage; tách paragraph (nhận dạng nhãn A–H nếu có, kể cả dạng dính chữ như `"AAlan Macfarlane"` đang thấy trong dữ liệu cũ); tách nhóm câu hỏi (`Questions 1–6` + instruction + options); dựng `stem`, `type`, `answer` từ key.
2. Với **mỗi câu**: tìm `evidence` (paragraph + quote nguyên văn), `keywords` (≥1 cặp câu hỏi ↔ paraphrase trong bài), `trap` (cụm nhiễu trong bài và vì sao sai — đặc biệt TFNG/NG, MCQ), `explain` tiếng Việt ngắn.
3. **Listening**: tách 4 part từ transcript (`SECTION 1`/`PART 1`), chia `segments` theo lượt nói (`SPEAKER:`) hoặc câu; câu hỏi như reading; `evidence.seg` = segment chứa đáp án (nếu transcript có `(Qn)` thì dùng nó, rồi **xoá marker `(Qn)` khỏi text hiển thị**); `trap` = chỗ người nói nêu phương án rồi bác bỏ / sửa lại.
4. Gán `topic` (1 trong 9) cho mỗi passage và mỗi part.
5. **Rút từ khó** (theo `AGENT.md` + lọc mục 2) từ cả 3 passage + 4 transcript → ghi vào `vocab` của test, đủ trường 3.2. Mục tiêu ~15–30 thẻ/passage hoặc part, không lấy từ B1 trở xuống, không lấy tên riêng.
6. Chạy `python tools/validate.py data/tests/cam{N}_t{M}.js` (Phase 2 subagent đầu tiên viết script này, các subagent sau dùng lại) cho tới khi sạch.

**`tools/validate.py` phải kiểm tra**: đủ câu 1–40 mỗi kỹ năng, không trùng số; mọi `evidence.quote` là chuỗi con (sau chuẩn hoá khoảng trắng/dấu nháy) của paragraph/segment được trỏ tới; mọi `keywords[].p` xuất hiện trong passage/transcript; `type` hợp lệ; `mcq/match` có `options` và `answer` ⊂ key của options; mỗi thẻ vocab có `__________` trong `frontText`, `category` hợp lệ, `topic` hợp lệ; `node -e` load file không lỗi.

**Xong khi**: 44 file `data/tests/*.js` qua `validate.py`. Test nào dữ liệu nguồn thiếu (theo `_report.md`) thì đánh `"incomplete": true` và vẫn hiển thị phần có.

---

### Phase 3 — Audio & căn giờ (1 subagent, chạy nền vì lâu)
1. Cài: `winget install Gyan.FFmpeg`; tạo venv Python 3.12: `py -3.12 -m venv .venv-audio` → `pip install faster-whisper`.
2. `tools/encode_audio.py`: ffmpeg → `audio/cam{N}/t{M}_p{K}.mp3` (mono, 32kbps, 22.05kHz). Với test 1-file: giữ `audio/cam{N}/t{M}.mp3`, xác định `offset` mỗi part bằng giờ của câu đầu tiên của part đó sau bước 3.
3. `tools/align_audio.py`: whisper `small.en`, `word_timestamps=True` → cache `data/raw/asr/{testId}_p{K}.json`. So khớp chuỗi từ ASR với từ trong `segments` (chuẩn hoá + `difflib.SequenceMatcher`) → điền `segments[].start/end`, `evidence.start/end` (= khoảng của các seg dẫn chứng, nới −1s/+1s), và `words[]` cho các từ khó trong `vocab`.
4. Báo cáo tỉ lệ khớp mỗi part; part < 85% từ khớp → liệt kê để người dùng kiểm.
5. Gỡ dòng `CAM 12–20` khỏi `.gitignore` **chỉ cho** thư mục `audio/` (giữ nguyên ignore thư mục `CAMBRIDGE/` gốc). Kiểm tổng dung lượng `audio/` < 400MB trước khi commit.

**Xong khi**: mọi part có audio có `start/end` cho ≥ 85% segment; `audio/` phát được trên trình duyệt.

---

### Phase 4 — Flashcard theo chủ đề, ôn cuốn chiếu (1 subagent)
1. `tools/build_cards.py`: gom `vocab` từ 44 test + `data/legacy_topics.json` (đổi sang schema 3.2, map 8 topic cũ sang 9 topic id) → gộp trùng theo lemma → bỏ trùng với `DEFAULT_CARDS` → `cambridge_cards.js`. Kiểm: id duy nhất, 100% có `__________`.
2. `index.html`: thêm `<script src="cambridge_cards.js">` **trước** `app.js`.
3. `app.js`:
   - `loadCardsFromStorage()`: merge thêm `window.CAMBRIDGE_CARDS` giống cách đang merge `DEFAULT_CARDS` (không ghi đè tiến độ thẻ đã có). Thẻ cũ không có `topic` → `'communication'`. **Không cần** nâng `STORAGE_KEY` nếu merge chạy mỗi lần load (kiểm lại; nếu cần thì nâng lên `_v7` và migrate từ `_v6`, không mất tiến độ).
   - Viết JS cho phần HTML topic đang dở: render chips `#topic-filter-chips` (Tất cả + 9 topic, kèm số thẻ), lọc `state.selectedTopic` kết hợp với lọc category + interval hiện có, cập nhật `#current-topic-text`, lưu `topic` khi thêm/sửa thẻ (`#card-input-topic`), nhớ topic chọn trong prefs.
   - **Cuốn chiếu**: thẻ có `nextReviewDate === 0` là "mới"; mỗi ngày đưa tối đa `newPerDay` (mặc định 10, lưu prefs) thẻ mới **mỗi topic** vào hàng đợi (gán `nextReviewDate = hôm nay`). Chip "Đến hạn" = đến hạn + mới hôm nay. Thêm chip "Mới (x)".
   - Hiện `source` ở mặt sau thẻ ("CAM 14 T2 • Reading 3").
4. Đồng bộ Firebase: kiểm payload với vài nghìn thẻ vẫn chạy; nếu quá lớn thì chỉ sync thẻ có `nextReviewDate !== 0` + bản ghi tiến độ.
5. `cambridge.js` tab **Topics**: bỏ SRS riêng; mỗi topic chỉ hiển thị thống kê + nút "Học chủ đề này" → về màn flashcard với topic đã lọc. Chuyển `ielts_cambridge_saved_vocab` cũ: không cần migrate (chỉ là cờ "đã lưu").

**Xong khi**: mở app → chọn topic → thấy đúng thẻ của topic đó, ôn được, tiến độ lưu sau reload, thẻ mới chỉ ra 10/ngày/topic.

---

### Phase 5 — UI làm đề Reading/Listening có chữa (1 subagent; có thể bắt đầu ngay với CAM10 T1)
Sửa `cambridge.js` (giữ cấu trúc module `window.cambridgeModule`, giữ `PROGRESS_STORAGE_KEY`):
1. **Nạp lười**: `cambridge_data.js` → manifest; `loadTest(testId)` chèn `<script src="data/tests/{id}.js">`, resolve khi `window.CAM_TESTS[id]` có. Hiện loading + lỗi "chưa có dữ liệu" nếu file thiếu.
2. **Render câu hỏi theo `type`** (mục 3.1): input / radio TFNG-YNNG / radio MCQ / checkbox `mcq_multi` (giới hạn số chọn) / select cho `match` + hiện ảnh `image`. Hiện `instruction` mỗi nhóm.
3. **Reading**: bố cục 2 cột (passage | câu hỏi) trên desktop, 2 tab trên mobile. Paragraph có `id` DOM `para-{passage}-{id}`.
4. **Listening (làm bài)**: audio theo part (có `offset`), **ẩn transcript** khi đang làm.
5. **Nộp bài → Review** (mở rộng `renderReviewView`), với mỗi câu **sai/bỏ trống**:
   - Đáp án của bạn vs đáp án đúng.
   - Reading: nút "📍 Xem trong bài" → cuộn tới paragraph, tô vàng `evidence.quote`; tô **cùng màu** từng cặp `keywords` (ở stem câu hỏi và ở passage) để thấy paraphrase.
   - Listening: nút "▶ Nghe đoạn dẫn chứng" dùng lại `replayClueAudio(start, end, q)` (+ `offset`); hiện segment(s) dẫn chứng, tô quote + keywords.
   - Hộp **⚠️ Bẫy**: `trap` (ẩn nếu rỗng) + `explain`.
   - Bộ lọc "Chỉ câu sai" (đã có `filterReviewCards`).
6. Lưu kết quả theo `testId` + skill như hiện tại; badge hoàn thành trên lưới test giữ nguyên.
7. Xoá dữ liệu cũ trong `cambridge_data.js` sau khi CAM10 T1 bản mới chạy đúng; xoá `generate_cambridge_dataset.py` (thay bằng `tools/`).

**Xong khi**: làm trọn 1 test Reading + 1 test Listening, cố tình sai vài câu mỗi `type`, review chỉ đúng đoạn/đúng audio, keyword tô đúng, chạy tốt trên mobile (375px) và dark mode.

---

### Phase 6 — Listening 3 tab (1 subagent; có thể bắt đầu ngay với CAM10 T1)
Tái dùng `listening.js` (đã có mode `karaoke`/`minimal`/`detailed`/`vocab`), **không viết lại**:
1. Đổi nguồn dữ liệu: thay `window.LISTENING_DATA` cố định bằng `window.CAM_TESTS[testId].listening` (segments → transcript karaoke; `words` + `vocab` → từ khó có giờ). Thêm bộ chọn Book → Test → Part (dùng manifest), nạp lười như Phase 5.
2. Thanh tab đúng **3 tab** theo yêu cầu (ánh xạ mode sẵn có):
   | Tab | Mode cũ | Hiển thị |
   |---|---|---|
   | ① Toàn văn | `karaoke` | Toàn bộ transcript, câu đang nói tô sáng + tự cuộn, bấm câu → tua tới. **Từ khó gạch chân** trong câu |
   | ② Chỉ từ khó | `minimal` | Chỉ các từ khó hiện ra đúng lúc được nói (từ hiện tại to, các từ vừa qua thành chip), bấm chip → tua |
   | ③ Từ khó + nghĩa | `detailed` (+ danh sách `vocab` bên dưới) | Từ khó hiện tại + IPA + loại từ/CEFR + nghĩa tiếng Việt + câu ngữ cảnh; nút 🔊 và **"+ Lưu vào flashcard"** |
   Mode `vocab` gộp vào tab ③ (danh sách bên dưới), không cần tab riêng.
3. "+ Lưu vào flashcard": vì thẻ đã có sẵn trong `cambridge_cards.js` (Phase 4), nút này chỉ **đưa thẻ đó vào hàng đợi học ngay** (`nextReviewDate = hôm nay`) thay vì tạo thẻ mới.
4. Nút ở màn Review của Phase 5: "🎧 Luyện nghe part này" → mở Listening 3 tab đúng test/part.
5. `listening_data.js` + thư mục `TEST 1/` thành thừa sau khi CAM10 T1 chạy bằng dữ liệu mới → xoá (audio CAM10 lấy từ `audio/cam10/`).

**Xong khi**: mọi part có audio đều mở được 3 tab, đồng bộ đúng giờ (lệch < 0.5s mắt thường), mobile OK.

---

### Phase 7 — Kiểm thử tổng & phát hành (1 subagent)
1. `node -c` cho mọi `.js`; `python tools/validate.py data/tests/*.js`; `tools/build_cards.py --check`.
2. Mở bằng preview server local (`python -m http.server`) và chạy qua: flashcard theo topic (lọc, ôn, reload), làm 1 test reading + 1 listening (CAM 10, 16, 20 — 3 kiểu nguồn khác nhau), 3 tab listening, Speaking vẫn chạy như cũ.
3. Kiểm dung lượng thứ sẽ push: `audio/` < 400MB, không file > 100MB, không có `CAMBRIDGE/` gốc, không có `config.js`.
4. Cập nhật `README.md` (mục tính năng) và `AGENT.md` (thêm: thẻ Cambridge sinh bằng `tools/build_cards.py`, id `cam-<lemma>`, có `topic`).
5. **Hỏi người dùng trước khi commit/push** (push là lên GitHub Pages public). Commit theo phase, message kiểu `feat: ...`.

---

## 5. Quy tắc cho mọi subagent
- Đọc `AGENT.md` (quy tắc flashcard) + file này. **Schema mục 3 là hợp đồng** — cần đổi thì ghi rõ vào cuối file này mục "Thay đổi schema" và báo lại.
- Không sửa Speaking (`speaking.js`, `roleplay.js`, HTML Speaking).
- Không thêm framework/bundler; vanilla JS, thêm CSS vào `style.css` dùng biến màu sẵn có (light + dark).
- Mọi chuỗi giao diện tiếng Việt; dữ liệu đề giữ nguyên tiếng Anh.
- Script Python đọc file từ `CAMBRIDGE/` (dữ liệu tải về) → chạy bằng `python -I`.
- Không commit/push nếu người dùng chưa đồng ý. Không đụng `config.js`.
- Báo cáo cuối mỗi phase: đã làm gì, số liệu (số test/câu/thẻ), cái gì **chưa** làm/chưa kiểm.

## 6. Việc người dùng cần tự làm / quyết định
1. **Đổi Gemini API key** đã lộ trong `TEST 1/align_listening.py` (Google AI Studio).
2. Đồng ý commit ~320MB audio vào repo (hoặc chọn host khác: Google Drive/Cloudflare R2 — khi đó chỉ đổi `audio.src` thành URL).
3. Repo public chứa nội dung Cambridge — giữ hay chuyển private.
4. Số thẻ mới/ngày/topic (mặc định 10).

## 7. Thay đổi schema
_(subagent ghi vào đây nếu buộc phải đổi)_
