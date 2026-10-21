# AGENT INSTRUCTION: WORKFLOW TỰ ĐỘNG THÊM FLASHCARD TỪ BÀI ĐỌC & ĐỒNG BỘ GIT

Tài liệu này là chỉ dẫn chuẩn hóa (Standard Operating Procedure - SOP) dành cho bất kỳ AI Agent nào (Antigravity, Cursor, Copilot, Claude, ChatGPT,...) khi người dùng gửi một đoạn văn bản tiếng Anh (bài đọc IELTS Reading, bài báo học thuật,...) vào dự án này.

Khi người dùng gửi bài đọc, Agent **BẮT BUỘC** tự động thực hiện quy trình 4 bước khép kín dưới đây mà không cần hỏi lại các bước trung gian:
1. **Lọc từ vựng & cụm từ cấp độ B2 trở lên (B2, C1, C2)** từ bài đọc.
2. **Tạo đối tượng flashcard theo đúng chuẩn cấu trúc dự án** trong file `app.js`.
3. **Kiểm tra tính hợp lệ cú pháp (Validation)**.
4. **Tự động Commit & Push lên GitHub Repository** `https://github.com/Thanh-2312/Flashcards.git` trên nhánh `main`.

---

## BƯỚC 1: LỌC TỪ VỰNG & CỤM TỪ (CEFR $\ge$ B2)

1. **Tiêu chuẩn cấp độ:**
   - Tra cứu và đối chiếu theo chuẩn từ điển học thuật (Cambridge Dictionary / Oxford Learner's Dictionary).
   - Chỉ lấy các từ đơn hoặc cụm từ có nhãn **B2, C1, C2**.
   - Bỏ qua các từ cơ bản (A1, A2, B1) trừ khi chúng nằm trong một cụm cố định (collocation / idiom / phrasal verb) đạt cấp B2+.

2. **Phân loại thẻ (`category`):**
   - `'words'`: Các từ đơn (Danh từ, Động từ, Tính từ, Trạng từ) có tính học thuật cao.
   - `'collocations'`: Cụm từ cố định tự nhiên, thành ngữ (idioms), cụm động từ (phrasal verbs), hoặc liên từ nối lập luận (linking phrases) trong bài đọc.

---

## BƯỚC 2: QUY CHUẨN ĐỊNH DẠNG FLASHCARD (CHẶT CHẼ)

Mỗi thẻ flashcard mới được thêm vào mảng `DEFAULT_CARDS` trong `app.js` phải có đầy đủ các trường sau:

```javascript
{
  id: 'card-XXX', // Tăng dần tiếp nối ID lớn nhất hiện tại (ví dụ card-107, card-108,...)
  category: 'words', // hoặc 'collocations'
  english: 'target word or phrase', // Từ / cụm từ mục tiêu (chữ thường hoặc dạng chuẩn)
  ipa: '/.../ (pos - Level)', // Phiên âm IPA + loại từ + cấp độ CEFR (ví dụ: '/əˈmæs/ (v - C1)')
  vietnamese: 'Nghĩa tiếng Việt rõ ràng, súc tích, sát ngữ cảnh bài đọc.',
  frontText: 'Câu tiếng Anh trình độ <= B1 chứa chỗ trống __________.',
  context: 'Trích nguyên văn câu trong bài đọc chứa từ vựng.',
  exampleEn: 'Câu mặt trước hoàn chỉnh sau khi điền từ mục tiêu vào chỗ trống.',
  acceptedAnswers: ['form1', 'form2'], // Các biến thể chấp nhận được ở chế độ gõ (nguyên thể, quá khứ, số nhiều,...)
  interval: 1,
  boxLevel: 1,
  nextReviewDate: Date.now(),
  createdDate: Date.now()
}
```

### ⚠️ QUY TẮC BẮT BUỘC CHO MẶT TRƯỚC (`frontText`):
- **Phải có chỗ trống:** Sử dụng ký tự gạch dưới dài `__________` để làm vị trí cần điền.
- **Giới hạn từ vựng $\le$ B1:** Tất cả các từ xung quanh chỗ trống trong câu mặt trước **PHẢI HOÀN TOÀN THUỘC TRÌNH ĐỘ A1, A2, HOẶC B1**. Điều này đảm bảo người học không bị cản trở bởi từ vựng lạ khác và có thể suy luận chính xác từ cần điền dựa trên ngữ cảnh quen thuộc.
- **Ngữ cảnh gợi mở:** Câu phải có tính gợi ý nghĩa logic cao, giúp liên tưởng tự nhiên đến nghĩa tiếng Việt ở mặt sau.

### QUY TẮC CHO MẶT SAU & NGỮ CẢNH:
- `context`: Trích dẫn câu gốc từ bài đọc của người dùng để người học thấy cách từ vựng xuất hiện trong văn bản thực tế.
- `acceptedAnswers`: Cung cấp danh sách các từ/cụm từ mà hệ thống chấp nhận là đúng khi người học dùng chế độ gõ từ (Interactive Typing Mode).

---

## BƯỚC 3: CẬP NHẬT CODE & BỘ NHỚ LƯU TRỮ

1. **Tiếp nối ID:**
   - Đọc `app.js` và tìm ID lớn nhất hiện có trong `DEFAULT_CARDS`.
   - Các thẻ mới phải đánh số tiếp theo không được ngắt quãng hoặc trùng lặp (ví dụ: `card-107`, `card-108`,...).

2. **Cơ chế Auto-merge LocalStorage:**
   - Đảm bảo hàm `loadCardsFromStorage()` trong `app.js` luôn tự động quét mảng `DEFAULT_CARDS` và bổ sung bất kỳ thẻ nào chưa có trong `localStorage` của người dùng.
   - Nếu cần thiết, nâng cấp khóa lưu trữ `STORAGE_KEY` (ví dụ: từ `minimal_flashcards_data_v4` lên phiên bản kế tiếp) để đảm bảo trình duyệt người dùng tự động cập nhật ngay lập tức mà không bị mất chu kỳ ôn tập các thẻ trước đó.

3. **Kiểm tra cú pháp (Validation):**
   - Chạy lệnh kiểm tra cú pháp trước khi commit:
     ```bash
     node -c app.js
     ```
   - Chạy kiểm tra đảm bảo:
     - Không có ID trùng lặp.
     - 100% các thẻ đều có `__________` trong `frontText`.
     - Phân loại danh mục đúng `'words'` hoặc `'collocations'`.

---

## BƯỚC 4: TỰ ĐỘNG COMMIT & PUSH LÊN GITHUB

Sau khi kiểm tra cú pháp thành công, Agent chạy các lệnh Git sau trong thư mục làm việc:

```bash
git add app.js AGENT.md
git commit -m "feat: add B2+ flashcards from reading passage [Tên chủ đề bài đọc]"
git push origin main
```

**Remote URL mục tiêu:**
`https://github.com/Thanh-2312/Flashcards.git` (nhánh `main`)

---

## BÁO CÁO KẾT QUẢ CHO NGƯỜI DÙNG

Sau khi hoàn thành, Agent phản hồi cho người dùng bằng tiếng Việt với các nội dung:
1. Bảng tổng hợp các từ/cụm từ B2+ vừa được lọc và thêm mới (gồm: Từ vựng, IPA, CEFR, nghĩa tiếng Việt, câu gợi ý mặt trước).
2. Tổng số lượng flashcard hiện có trong hệ thống (Words & Collocations).
3. Xác nhận đã đồng bộ và push mã nguồn thành công lên GitHub Pages repository.
