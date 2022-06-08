const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdUser = await prisma.user.create({
    data: { username: "alice1", email: "alice1@gmail.com" },
  });

  const createdProfile = await prisma.profile.create({
    data: {
      profPicUrl: "https:/alice1profilepic.com",
      bio: "alice1 test bio",
      userId: createdUser.id,
    },
  });

  const createdPost = await prisma.post.create({
    data: {
      title: "alice test post title 1",
      content: "alice test post 1",
      //   published: true,
      //   pictureUrl: 'https:/alicetestpostpicture1.com'
      userId: createdUser.id,
    },
  });

  const createdComment = await prisma.comment.create({
    data: {
      content: "test comment 1 on alice test post 1 ",
      postId: createdPost.id,
      userId: createdUser.id,
    },
  });

  console.log(`user created`, createdUser);
  console.log(`profile created`, createdProfile);
  console.log(`Post created`, createdPost);
  console.log(`Comment created`, createdComment);
  // Don't edit any of the code below this line
  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
