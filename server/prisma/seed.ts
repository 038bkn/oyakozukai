import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // 親ユーザー
    const parent = await prisma.user.create({
        data: {
            user_name: "おや",
            role: "parent",
            email: "parent@example.com",
            password_hash: "parent",
        },
    });

    // 子ユーザー
    const child = await prisma.user.create({
        data: {
            user_name: "こども",
            role: "child",
            email: "child@example.com",
            password_hash: "child",
        },
    });

    console.log({ parent, child })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
