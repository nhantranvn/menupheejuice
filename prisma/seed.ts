import { existsSync, readFileSync } from "fs";
import path from "path";
import { PrismaClient, UserRole } from "@prisma/client";

function loadEnvFile() {
  const envPath = path.join(process.cwd(), ".env");

  if (!existsSync(envPath)) {
    return;
  }

  const content = readFileSync(envPath, "utf8");

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['\"]|['\"]$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const prisma = new PrismaClient();

const TOPPINGS = [
  { name: "Hạt sen", price: 10000, sortOrder: 1 },
  { name: "Trân châu trắng", price: 5000, sortOrder: 2 },
  { name: "Trân châu đen", price: 5000, sortOrder: 3 },
  { name: "Thạch nổ củ năng", price: 10000, sortOrder: 4 },
  { name: "Thạch nha đam", price: 5000, sortOrder: 5 },
  { name: "Thạch dừa", price: 5000, sortOrder: 6 },
  { name: "Thạch nổ đậu đỏ", price: 5000, sortOrder: 7 },
  { name: "Trân châu ô long", price: 5000, sortOrder: 8 },
] as const;

const MENU_DATA = [
  {
    name: "Món mới siêu đỉnh",
    items: [
      "Sữa Dâu Sấy Trăng Hoa",
      "Sữa Chua Dẻo Cốm Xoài Trân Châu",
      "Dưa Hấu Đá Sayy - Sinh Tố Dưa Hấu Siêu Hot",
      "Nước Dừa Thạch Nổ Đậu Đỏ May Mắn",
      "Nước Dừa Hạt Chia",
      "Nước Dừa Tươi",
      "Nước Dừa Nước Mát Long Vương",
      "Nước Dừa Hạt Sen Thanh Mát Giải Nhiệt",
      "Nước Dừa Kem Matcha Siêu Phê Nhà Phee",
      "Sen Dừa Quế Hoa Thơm Dịu Nhẹ Nhàng",
      "Choco Bạc Hà Đá Say Mát Lạnh Sảng Khoái",
      "Trà Măng Cầu Tươi",
    ],
  },
  {
    name: "Trà sữa - trà trái cây",
    items: [
      "Matcha Latte Quế Hoa Topping Linh Tinh",
      "Trà Nhài Cam Mây Trắng Bồng Bềnh",
      "Trà Mãng Cầu Quế Hoa Hot Trend",
      "Bạc Xỉu Up Xỉu Down",
      "YaKuLựu Đỏ Trân Châu",
      "Sữa Chua Xoài Dẻo Trân Châu",
      "Hoa Quả Dầm Sữa Chua Dẻo",
      "Nước Dừa Quế Hoa Hot Trend Siêu Cuốn",
      "Bơ Già Dừa Nướng Siêu Ngon",
      "Chanh Leo Núi Đá Ahihi",
      "Nước Ép Cam",
      "Matcha Latte Siêu Cuốnnnn",
      "Trà Sữa Cốm Non",
      "Nước Ép Roi Đỏ",
      "Trà Mận Nhiệt Đới",
    ],
  },
  {
    name: "Kem - sữa chua dẻo mlem mlem",
    items: [
      "Kem Dừa Cốm Non Siêu Ngon",
      "Sữa Chua Xoài Dẻo Trân Châu",
      "Hoa Quả Dầm Kem Dừa Trân Châu",
      "Kem Bơ Dừa Đà Lạt",
      "Kem Bơ Sầu Riêng",
      "Sữa Chua Dẻo Cốm Non Trân Châu 3Q",
      "Milo Sữa Chua Dẻo Sốt Kiwi",
      "Milo Sữa Chua Dẻo Sốt Dâu Tây",
      "Milo Sữa Chua Dẻo Sốt Đào",
      "Milo Sữa Chua Dẻo Sốt Việt Quất",
      "Milo Sữa Chua Dẻo Sốt Caramel",
      "Milo Sữa Chua Dẻo Sốt Chocolate",
    ],
  },
  {
    name: "Nước ép detox healthy",
    items: [
      "Nước Dừa Quế Hoa Hot Trend Siêu Cuốn",
      "Nước Ép Cóc - Táo Siêu Hot",
      "Nước Ép Dưa Hấu",
      "Nước Ép Cóc Mix Ổi",
      "Nước Ép Ổi - Chanh Leo",
      "Nước Ép Cóc - Dứa",
      "Nước Ép Cần Tây - Táo",
      "Nước Ép Cần Tây - Dứa - Ổi",
      "Nước Ép Cần Tây - Táo - Cà Rốt",
      "Nước Ép Cần Tây - Cam - Dứa",
      "Nước Ép Cóc - Ổi",
      "Nước Ép Cam Mix Cà Rốt",
      "Nước Ép Cam Mix Táo",
      "Nước Ép Dứa Mix Táo",
      "Nước Ép Dứa Mix Cà Rốt",
      "Nước Ép Dứa Mix Ổi",
      "Nước Ép Chanh Leo",
      "Nước Ép Táo Mix Ổi",
      "Nước Ép Cóc Bao Tử",
      "Nước Ép Cà Rốt",
      "Nước Ép Táo",
      "Nước Ép Ổi",
      "Nước Ép Dứa",
      "Nước Ép Cam - Dứa",
      "Nước Ép Cam",
      "Nước Ép Cần Tây - Dứa",
      "Nước Ép Lựu",
      "Nước Ép Roi Đỏ",
    ],
  },
  {
    name: "Sinh tố trái cây",
    items: [
      "Sinh Tố Bơ Kem Chesse Món Mới Siêu Ngon",
      "Bơ Già Dừa Nướng Siêu Ngon",
      "Chanh Leo Núi Đá Ahihi",
      "Kem Bơ Dừa Đà Lạt",
      "Kem Bơ Sầu Riêng",
      "Sinh Tố Bơ",
      "Sinh Tố Xoài - Chanh Leo",
      "Sinh Tố Bơ Dừa",
      "Sinh Tố Bơ Xoài",
      "Sinh Tố Mãng Cầu",
      "Sữa Chua Dẻo Cốm Non",
      "Sinh Tố Xoài Dừa",
      "Sinh Tố Xoài Mãng Cầu",
      "Sinh Tố Xoài",
      "Chanh Tuyết AvoMoRi - Sinh Tố Chanh Tuyết",
    ],
  },
] as const;

function buildPlaceholderImage(name: string) {
  return `https://placehold.co/800x600/f5f5f4/1c1917?text=${encodeURIComponent(name)}`;
}

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@example.com";

  await prisma.orderItemTopping.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItemVariant.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.menuCategory.deleteMany();
  await prisma.topping.deleteMany();
  await prisma.menuImportJob.deleteMany();

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: "Quản trị viên",
      role: UserRole.ADMIN,
    },
    create: {
      name: "Quản trị viên",
      email: adminEmail,
      role: UserRole.ADMIN,
    },
  });

  for (const topping of TOPPINGS) {
    await prisma.topping.upsert({
      where: { name: topping.name },
      update: {
        price: topping.price,
        sortOrder: topping.sortOrder,
        isActive: true,
      },
      create: topping,
    });
  }

  for (let categoryIndex = 0; categoryIndex < MENU_DATA.length; categoryIndex += 1) {
    const categorySeed = MENU_DATA[categoryIndex];

    const category = await prisma.menuCategory.create({
      data: {
        name: categorySeed.name,
        sortOrder: categoryIndex + 1,
      },
    });

    for (let itemIndex = 0; itemIndex < categorySeed.items.length; itemIndex += 1) {
      const itemName = categorySeed.items[itemIndex];
      
      const menuItem = await prisma.menuItem.upsert({
        where: { name: itemName },
        update: {},
        create: {
          name: itemName,
          description: `Món ${itemName.toLowerCase()} với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.`,
          imageUrl: buildPlaceholderImage(itemName),
          isAvailable: true,
        },
      });

      await prisma.menuItemInCategory.upsert({
        where: {
          menuItemId_categoryId: {
            menuItemId: menuItem.id,
            categoryId: category.id,
          },
        },
        update: {
          sortOrder: itemIndex + 1,
        },
        create: {
          menuItemId: menuItem.id,
          categoryId: category.id,
          sortOrder: itemIndex + 1,
        },
      });

      // Kiểm tra nếu chưa có variant thì mới tạo
      const variantCount = await prisma.menuItemVariant.count({
        where: { menuItemId: menuItem.id },
      });

      if (variantCount === 0) {
        await prisma.menuItemVariant.createMany({
          data: [
            {
              menuItemId: menuItem.id,
              name: "Cốc 500ml",
              sizeMl: 500,
              price: 30000,
              sortOrder: 1,
            },
            {
              menuItemId: menuItem.id,
              name: "Cốc 700ml",
              sizeMl: 700,
              price: 40000,
              sortOrder: 2,
            },
          ],
        });
      }
    }
  }

  console.log(`Đã seed ${MENU_DATA.length} danh mục, ${MENU_DATA.reduce((sum, category) => sum + category.items.length, 0)} món, ${TOPPINGS.length} topping.`);
}

main()
  .catch((error) => {
    console.error("Seed thất bại", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });