import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  const user = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      name: "Alice",
      email: "alice@prisma.io",
    },
  });

  await Promise.all([
    prisma.post.create({
      data: { title: "TestPost1", content: "Some content 1", authorId: 99999 },
    }),
    prisma.post.create({
      data: {
        title: "TestPost2",
        content: "Some content 2",
        authorId: user.id,
      },
    }),
  ]);

  const posts = await prisma.post.findMany();

  console.dir(posts);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
