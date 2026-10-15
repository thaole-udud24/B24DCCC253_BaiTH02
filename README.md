# 🌤️ Mây Mùa — Dashboard Thời Tiết Việt Nam (Pastel Glassmorphism)

Ứng dụng dự báo thời tiết chuyên biệt cho **8 thành phố trọng điểm của Việt Nam**, xây dựng bằng **React 19, TypeScript, Vite** và dữ liệu thời gian thực từ **Open-Meteo API** (hoàn toàn miễn phí, không yêu cầu API key). Giao diện lấy cảm hứng từ phong cách kết hợp giữa **Google Weather (Material You)** và **Dribbble Pastel Dashboard**.

---

## 🌟 Tính Năng Nổi Bật

### 1. Dữ Liệu Thời Gian Thực & 8 Thành Phố Việt Nam
* **Hà Nội, Hải Phòng, Huế, Đà Nẵng, Nha Trang, Đà Lạt, TP. Hồ Chí Minh, Cần Thơ**.
* Cập nhật thời tiết trực tiếp từ trạm vệ tinh Open-Meteo API.
* Tự động lưu cache trong 10 phút để tối ưu tốc độ và giảm tải truy vấn mạng.

### 2. Giao Diện Pastel Dashboard Hiện Đại
* **Sidebar Điều Hướng Đa Năng**: Chuyển đổi linh hoạt giữa 5 màn hình chức năng:
  * ☀️ **Tổng quan (Overview)**: Toàn cảnh thời tiết với đầy đủ các widget phân tích.
  * ⏰ **Dự báo 24 giờ (Hourly)**: Bảng chi tiết nhiệt độ, độ ẩm, gió và khả năng mưa từng giờ.
  * 📅 **Dự báo tuần (Weekly)**: Xu hướng thời tiết 7 ngày tới với nhiệt độ Max/Min và giờ Mặt trời mọc/lặn.
  * 💧 **Lượng mưa & Độ ẩm (Rainfall)**: Biểu đồ cột lượng mưa và xác suất mưa.
  * 🍃 **Chất lượng không khí (AQI & Gió)**: Chỉ số ô nhiễm, hướng gió la bàn và khuyến cáo sức khỏe.
* **Hero Banner Phong Cảnh**: Nền đồi cỏ và bầu trời chuyển sắc pastel, số nhiệt độ lớn (64px), icon thời tiết 3D bay bổng và chỉ số cảm nhận (*Feels like*).
* **Đồ Họa Vòng Cung Mặt Trời**: Đường cong quỹ đạo mặt trời (Sunrise & Sunset) hiển thị vị trí mặt trời theo thời gian thực.
* **Bộ Lọc Khu Vực & Tìm Kiếm**:
  * Tìm kiếm tiếng Việt thông minh (hỗ trợ cả có dấu và không dấu).
  * Lọc nhanh theo Miền Bắc, Miền Trung, Miền Nam và Danh sách yêu thích.
* **Tiện Ích Người Dùng**:
  * Chuyển đổi tức thì đơn vị đo **°C ↔ °F**.
  * Lưu thành phố yêu thích vào `LocalStorage`.
  * Nút làm mới dữ liệu với hiệu ứng xoay mượt mà.

---

## 🛠️ Công Nghệ Sử Dụng

* **Framework & Bundler**: React 19, TypeScript, Vite
* **Bộ Icon**: Lucide React
* **Nguồn Dữ Liệu**: Open-Meteo Weather Forecast API
* **Kiểu Dáng (Styling)**: Vanilla CSS với hệ thống CSS Variables, Glassmorphism và bảng màu Pastel

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### Yêu Cầu Môi Trường
* **Node.js** >= 18.x
* **npm** hoặc **yarn** / **pnpm**

### Các Bước Cài Đặt
```bash
# 1. Clone repository
git clone https://github.com/thaole-udud24/B24DCCC253_BaiTH02.git
cd B24DCCC253_BaiTH02

# 2. Cài đặt các gói phụ thuộc
npm install

# 3. Chạy môi trường phát triển (Development)
npm run dev
```

Truy cập trên trình duyệt tại: `http://localhost:5174/` (hoặc `http://localhost:5173/`).

### Đóng Gói Ứng Dụng (Production Build)
```bash
npm run build
```
Thư mục xuất bản: `dist/`

---

## 📄 Bản Quyền & Giấy Phép
Dự án được phát triển phục vụ mục đích thực hành học tập và phi thương mại.
Dữ liệu thời tiết được cung cấp miễn phí bởi [Open-Meteo](https://open-meteo.com).
