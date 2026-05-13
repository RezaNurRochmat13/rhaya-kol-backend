import { PostRepository } from '../repository/post.repository';

export function PostService() {
  const { createPost, findPostByUrl, findPostsWithLogs } = PostRepository();

  async function createKolPost(url: string, kolName: string) {
    const existing = await findPostByUrl(url);
    if (existing) throw new Error('Postingan ini sudah terdaftar.');

    let platform = '';
    if (url.includes('instagram.com')) platform = 'Instagram';
    else if (url.includes('tiktok.com')) platform = 'TikTok';
    else throw new Error('Hanya mendukung Instagram dan TikTok.');

    return await createPost({ url, kolName, platform });
  }

  async function getDashboardKolSummary() {
    const data = await findPostsWithLogs(7);

    return data;
  }

  return {
    createKolPost,
    getDashboardKolSummary,
  };
}
