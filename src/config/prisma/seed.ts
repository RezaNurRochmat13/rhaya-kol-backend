import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Memulai proses seeding data...');

  await prisma.engagementLog.deleteMany();
  await prisma.post.deleteMany();

  // 2. Data Master KOL & Postingan
  const dummyPosts = [
    {
      kolName: 'Reza Tech',
      url: 'https://www.instagram.com/p/C6Sample1/',
      platform: 'Instagram',
    },
    {
      kolName: 'Rochmat Foodie',
      url: 'https://www.tiktok.com/@rochmat/video/70001',
      platform: 'TikTok',
    },
    {
      kolName: 'Digital Nomad ID',
      url: 'https://www.instagram.com/p/C6Sample2/',
      platform: 'Instagram',
    },
  ];

  for (const item of dummyPosts) {
    const post = await prisma.post.create({
      data: item,
    });

    console.log(`✅ Post dibuat untuk KOL: ${post.kolName}`);

    const logs = [];
    let baseLikes = Math.floor(Math.random() * 500) + 200;
    let baseComments = Math.floor(Math.random() * 50) + 10;
    let baseShares = Math.floor(Math.random() * 20);

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const fluctuation = () => Math.floor(Math.random() * 50) - 20;

      logs.push({
        postId: post.id,
        likes: Math.max(0, baseLikes + (6 - i) * 30 + fluctuation()),
        comments: Math.max(0, baseComments + (6 - i) * 5 + fluctuation()),
        shares: Math.max(0, baseShares + (6 - i) * 2 + fluctuation()),
        capturedAt: date,
      });
    }

    await prisma.engagementLog.createMany({
      data: logs,
    });
    
    console.log(`   📈 7 hari log engagement berhasil dibuat untuk ${post.kolName}`);
  }

  console.log('\n✨ Seeding selesai! Database kamu sekarang siap digunakan.');
}

main()
  .catch((e) => {
    console.error('❌ Terjadi kesalahan saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
