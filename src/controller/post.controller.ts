import { Response, Request } from 'express';
import { PostService } from '../service/post.service';

export function PostController() {
  const { createKolPost, getDashboardKolSummary } = PostService();

  async function createPost(request: Request, response: Response) {
    const { url, kolName } = request.body;

    try {
      const result = await createKolPost(url, kolName);

      response.json({
        message: 'Postingan berhasil disimpan',
        data: result,
      });
    } catch (err: any) {
      response.status(400).json({ error: err.message });
    }
  }

  async function getDashboardSummary(request: Request, response: Response) {
    try {
      const summary = await getDashboardKolSummary();

      response.json({
        message: 'Data dashboard berhasil diambil',
        data: summary,
      });
    } catch (err: any) {
      response.status(400).json({ error: err.message });
    }
  }

  return {
    createPost,
    getDashboardSummary,
  };
}
