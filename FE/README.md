# Phần mềm Quản lý Y tế Học đường

Phần mềm quản lý y tế học đường dành cho phòng y tế của trường học, giúp quản lý toàn bộ hoạt động y tế và sức khỏe học sinh.

## Tính năng chính

### 🏠 Trang chủ
- Giới thiệu thông tin trường học
- Tài liệu về sức khỏe học đường
- Blog chia sẻ kinh nghiệm

### 👨‍👩‍👧‍👦 Quản lý Hồ sơ Sức khỏe
- Khai báo hồ sơ sức khỏe học sinh
- Quản lý dị ứng, bệnh mãn tính
- Theo dõi tiền sử điều trị
- Quản lý thông tin thị lực, thính lực
- Lịch sử tiêm chủng

### 💊 Quản lý Thuốc
- Phụ huynh gửi thuốc cho trường
- Quản lý kho thuốc và vật tư y tế
- Theo dõi việc cho học sinh uống thuốc
- Báo cáo tồn kho

### 🚨 Xử lý Sự kiện Y tế
- Ghi nhận tai nạn, bệnh tật tại trường
- Xử lý các tình huống khẩn cấp
- Theo dõi và báo cáo sự kiện
- Thông báo cho phụ huynh

### 💉 Quản lý Tiêm chủng
1. Gửi phiếu thông báo đồng ý tiêm chủng
2. Chuẩn bị danh sách học sinh tiêm
3. Tiêm chủng và ghi nhận kết quả
4. Theo dõi sau tiêm

### 🩺 Kiểm tra Y tế Định kỳ
1. Gửi thông báo kiểm tra y tế
2. Chuẩn bị danh sách học sinh
3. Thực hiện kiểm tra và ghi nhận kết quả
4. Gửi kết quả và lập lịch tư vấn

### 👥 Quản lý Người dùng
- Quản lý tài khoản người dùng
- Phân quyền theo vai trò
- Theo dõi hoạt động hệ thống

### 📊 Dashboard & Báo cáo
- Thống kê tổng quan
- Báo cáo chi tiết
- Biểu đồ trực quan

## Công nghệ sử dụng

- **Frontend**: React 18, TypeScript
- **UI Framework**: Material-UI (MUI)
- **Routing**: React Router v6
- **Icons**: Material-UI Icons
- **Charts**: Recharts
- **Date**: date-fns

## Cài đặt và Chạy

### Yêu cầu hệ thống
- Node.js 16+
- npm hoặc yarn

### Cài đặt
```bash
# Clone dự án hoặc tải về
cd school-healthcare

# Cài đặt dependencies
npm install

# Chạy ứng dụng
npm start
```

Ứng dụng sẽ chạy tại: http://localhost:3000

## Tài khoản demo

### Quản trị viên
- **Email**: admin@school.edu.vn
- **Mật khẩu**: admin123
- **Quyền**: Toàn quyền hệ thống

### Nhân viên Y tế
- **Email**: medical@school.edu.vn
- **Mật khẩu**: medical123
- **Quyền**: Quản lý y tế, xử lý sự kiện

### Phụ huynh
- **Email**: parent@gmail.com
- **Mật khẩu**: parent123
- **Quyền**: Xem thông tin con, khai báo sức khỏe

## Cấu trúc dự án

```
src/
├── components/          # Các component tái sử dụng
│   ├── Layout.tsx
│   ├── StatCard.tsx
│   └── HealthEventDetailDialog.tsx
├── contexts/           # React Context
│   └── AuthContext.tsx
├── pages/             # Các trang chính
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── StudentHealth.tsx
│   ├── MedicineManagement.tsx
│   ├── HealthEvents.tsx
│   ├── Vaccination.tsx
│   ├── HealthCheck.tsx
│   └── UserManagement.tsx
├── App.tsx            # Component gốc
└── index.tsx          # Entry point
```

## Hướng dẫn sử dụng

### Đăng nhập
1. Truy cập `/login`
2. Chọn loại tài khoản demo
3. Nhập email và mật khẩu
4. Nhấn "Đăng nhập"

### Quản lý Hồ sơ Sức khỏe
1. Vào menu "Hồ sơ Sức khỏe"
2. Nhấn "Thêm hồ sơ mới"
3. Điền thông tin chi tiết
4. Lưu hồ sơ

### Xử lý Sự kiện Y tế
1. Vào menu "Sự kiện Y tế"
2. Nhấn "Thêm sự kiện"
3. Chọn loại sự kiện và mức độ
4. Mô tả chi tiết và xử lý

### Quản lý Tiêm chủng
1. Tạo chiến dịch tiêm chủng
2. Gửi thông báo cho phụ huynh
3. Chuẩn bị danh sách học sinh
4. Thực hiện tiêm và theo dõi

## Đóng góp

Để đóng góp vào dự án:
1. Fork repository
2. Tạo branch mới
3. Commit changes
4. Push và tạo Pull Request

## Giấy phép

MIT License

## Liên hệ

- Email: support@schoolhealthcare.edu.vn
- Phone: +84 123 456 789
