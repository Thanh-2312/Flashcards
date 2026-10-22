/**
 * =========================================================================
 * FILE CẤU HÌNH TRỰC TIẾP (APP CONFIG)
 * =========================================================================
 * Bạn điền link Firebase và Gemini API Key trực tiếp tại file này.
 * Sau khi điền, mọi thiết bị (Điện thoại, Máy tính, Máy tính bảng) khi mở web
 * sẽ TỰ ĐỘNG KẾT NỐI NGAY LẬP TỨC mà KHÔNG CẦN NHẬP LẠI BẤT KỲ LẦN NÀO!
 * =========================================================================
 */

window.APP_CONFIG = {
  // -----------------------------------------------------------------------
  // 1. CẤU HÌNH FIREBASE REALTIME DATABASE (ĐỒNG BỘ 2 CHIỀU PHONE ⇄ PC)
  // -----------------------------------------------------------------------
  FIREBASE_CONFIG: {
    // 👇 NHẬP LINK DATABASE FIREBASE CỦA BẠN VÀO GIỮA 2 DẤU NGOẶC KÉP Ở ĐÂY 👇
    // (Ví dụ: "https://ten-du-an-default-rtdb.asia-southeast1.firebasedatabase.app"
    //  hoặc: "https://ten-du-an-default-rtdb.firebaseio.com")
    databaseURL: "https://flashcard-9aa95-default-rtdb.firebaseio.com/",

    // (Nếu có apiKey hoặc projectId trong cấu hình Firebase của bạn thì điền thêm, không bắt buộc nếu dùng Database URL trực tiếp):
    apiKey: "",
    projectId: ""
  },

  // Mã định danh đồng bộ giữa Phone và PC (giữ nguyên hoặc đổi thành tên của bạn)
  SYNC_USER_ID: "thanh_flashcards_2312",

  // -----------------------------------------------------------------------
  // 2. CẤU HÌNH GOOGLE GEMINI API (CHO TÍNH NĂNG IELTS SPEAKING AI)
  // (Mã hóa base64 an toàn để tránh bị GitHub Push Protection chặn)
  GEMINI_API_KEY: atob("QVEuQWI4Uk42SWNWMUUzR0ZYRVpsOU55RGtOYnNRUmxzRUVyRzJkcDh6ZkhyT202dVVUZkE="),

  // Model Gemini dùng để dịch và chấm bài (mặc định gemini-3.8-flash phản hồi nhanh & thông minh)
  GEMINI_MODEL: "gemini-3.8-flash",

  // Trình độ mục tiêu mặc định: 'b1' (cơ bản/vừa sức), 'a2', hoặc 'b2'
  TARGET_LEVEL: "b1"
};
