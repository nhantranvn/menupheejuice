import { PrismaClient } from "@prisma/client";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url || url.includes("localhost")) {
    console.error("❌ LỖI: Bạn chưa cung cấp DATABASE_URL của server online.");
    console.error("Hãy chạy lệnh theo dạng: $env:DATABASE_URL=\"postgres://...\"; npx tsx prisma/fix-production.ts");
    process.exit(1);
  }

  console.log("🚀 Đang kết nối tới Production Database...");
  const prisma = new PrismaClient();

  try {
    // 1. Xóa trạng thái lỗi của migration trong bảng _prisma_migrations
    console.log("🛠️  Đang xóa trạng thái lỗi của bản cập nhật 'decouple_menu_items'...");
    await prisma.$executeRawUnsafe(
      `DELETE FROM "_prisma_migrations" WHERE "migration_name" = '20260419032022_decouple_menu_items' AND "finished_at" IS NULL`
    );
    console.log("✅ Đã xóa trạng thái lỗi thành công.");

    console.log("\n✨ Xong! Bây giờ bạn hãy quay lại trang Vercel và bấm 'Redeploy' (hoặc chờ nó tự chạy lại).");
    console.log("Bản cập nhật mới của tôi sẽ tự động dọn dẹp dữ liệu trùng lặp và chạy thành công.");
  } catch (error) {
    console.error("❌ Có lỗi xảy ra:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
