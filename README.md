# Restaurant Ordering MVP

MVP web app cho quán ăn với:

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Auth.js / NextAuth đăng nhập Google
- Tesseract.js OCR để quét ảnh menu

## Tính năng hiện tại

- Khách đăng nhập bằng Google
- Xem menu theo category
- Thêm món vào giỏ hàng
- Đặt hàng và tạo `Order`, `OrderItem` trong database
- Khách có trang `Đơn của tôi` để xem lịch sử đơn
- Admin xem danh sách đơn và cập nhật trạng thái
- Admin có thể tải ảnh menu, quét OCR, rà soát nội dung và nhập vào thực đơn
- Seed dữ liệu mẫu với 1 admin, 3 category, 10 món

## Cấu trúc chính

```text
app/
components/
lib/
prisma/
types/
auth.ts
middleware.ts
uploads/menu-imports/
docker-compose.yml
```

## 1. Cài package

```bash
npm install
```

## 2. Khởi động PostgreSQL bằng Docker

Project đã có sẵn file [docker-compose.yml](./docker-compose.yml) để chạy PostgreSQL local.

Khởi động DB:

```bash
docker compose up -d
```

Kiểm tra trạng thái:

```bash
docker compose ps
```

Dừng DB:

```bash
docker compose down
```

Xóa cả volume dữ liệu nếu cần reset sạch:

```bash
docker compose down -v
```

Cấu hình mặc định của PostgreSQL trong Docker:

- Host: `localhost`
- Port: `5432`
- Database: `restaurant_mvp`
- User: `postgres`
- Password: `postgres`

## 3. Cấu hình `.env`

Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

Hoặc trên PowerShell:

```powershell
Copy-Item .env.example .env
```

Cần điền các biến:

- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `ADMIN_EMAIL`

Nếu dùng PostgreSQL từ Docker Compose thì giữ nguyên `DATABASE_URL` mặc định là đủ:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/restaurant_mvp?schema=public"
```

Lưu ý:

- `ADMIN_EMAIL` nên là email Google bạn sẽ dùng để đăng nhập admin.
- Khi user đăng nhập bằng email này, hệ thống sẽ đồng bộ role `ADMIN`.
- Khi thêm schema mới cho `MenuImportJob`, bạn cần chạy migration mới.
- Lần OCR đầu tiên có thể mất thêm thời gian vì Tesseract.js cần tải dữ liệu ngôn ngữ `vie+eng`.

## 4. Prisma migrate

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

Nếu đã có project chạy trước đó, hãy tạo migration mới cho phần upload/OCR, ví dụ:

```bash
npm run prisma:migrate -- --name add-menu-import-job
```

## 5. Seed dữ liệu

```bash
npm run db:seed
```

Seed sẽ tạo:

- 1 admin user theo `ADMIN_EMAIL`
- 3 category
- 10 món mẫu

## 6. Chạy local

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

## Route chính

- `/`
- `/login`
- `/menu`
- `/cart`
- `/orders`
- `/orders/success`
- `/admin/orders`
- `/admin/menu-import`

## Cách nhập menu từ ảnh

1. Vào `/admin/menu-import`
2. Tải ảnh menu lên
3. Chờ OCR trả về nội dung text
4. Rà soát và sửa text OCR nếu cần
5. Điền tên danh mục muốn import
6. Bấm `Nhập vào thực đơn`

Gợi ý format để import tốt hơn:

```text
Phở bò đặc biệt 60000
Trà đào cam sả - 32000
Cơm tấm sườn bì chả 65000
```

## Ghi chú kiến trúc

- Cart được lưu ở client bằng `localStorage` để thao tác nhanh.
- Order creation, lưu OCR review và import menu đều dùng server actions.
- Prisma schema đã tách rõ `User`, `MenuCategory`, `MenuItem`, `Order`, `OrderItem` và `MenuImportJob`.
- OCR dùng `tesseract.js`, hiện parse tốt nhất với các dòng menu có tên món và giá ở cùng một dòng.
- Nếu OCR đọc chưa chuẩn, admin có thể sửa nội dung trước khi nhập vào menu.
