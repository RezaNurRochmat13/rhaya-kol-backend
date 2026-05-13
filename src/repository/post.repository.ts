import prisma from '../config/database.config';

export function PostRepository() {
  async function createPost(payload: {
    url: string;
    platform: string;
    kolName: string;
  }) {
    return await prisma.post.create({
      data: {
        url: payload.url,
        platform: payload.platform,
        kolName: payload.kolName,
      },
    });
  }

  async function findPostByUrl(url: string) {
    return await prisma.post.findUnique({ where: { url } });
  }

  async function findPostsWithLogs(days: number) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return await prisma.post.findMany({
      include: {
        engagementLogs: {
          where: { capturedAt: { gte: startDate } },
          orderBy: { capturedAt: 'asc' },
        },
      },
    });
  }


  async function createEngagementLog(postId: string, stats: any) {
    return await prisma.engagementLog.create({
      data: { postId, ...stats },
    });
  }

  return {
    createPost,
    findPostByUrl,
    findPostsWithLogs,
    createEngagementLog,
  };
}
