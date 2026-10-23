/**
 * =========================================================================
 * MẪU CẤU HÌNH (CONFIG TEMPLATE)
 * =========================================================================
 * File này là template mẫu (an toàn, không chứa thông tin nhạy cảm).
 * File cấu hình thật config.js đã được thêm vào .gitignore để bảo mật
 * 100% tất cả API Keys, Client ID và link Firebase của bạn.
 * =========================================================================
 */

window.APP_CONFIG = {
  // 1. Cấu hình Firebase Realtime Database (Đồng bộ thẻ)
  FIREBASE_CONFIG: {
    databaseURL: "", // Nhập link Firebase Realtime Database của bạn
    apiKey: "",
    projectId: ""
  },

  // Mã định danh người dùng
  SYNC_USER_ID: "thanh_flashcards_2312",

  // 2. Cấu hình Google Gemini API (Speaking AI Coach)
  GEMINI_API_KEY: "", // Nhập Gemini API Key

  // Model Gemini dùng để dịch và chấm bài
  GEMINI_MODEL: "gemini-3.8-flash",

  // Trình độ mục tiêu mặc định ('b1', 'a2', hoặc 'b2')
  TARGET_LEVEL: "b1",

  // 3. Cấu hình Google Drive (Nhật ký giọng nói)
  GOOGLE_DRIVE: {
    CLIENT_ID: "", // Nhập Google OAuth Client ID
    FOLDER_NAME: "IELTS Speaking Voice"
  }
};
