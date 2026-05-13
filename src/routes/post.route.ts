import express from "express";
import { useAuth } from "../middleware/auth.middleware";
import { PostController } from "../controller/post.controller";

const postRouter = express.Router();
const { authenticate } = useAuth();

const { createPost, getDashboardSummary } = PostController();

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new article
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: "https://www.instagram.com/p/Clp8p8z0x00/"
 *               kolName:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       200:
 *         description: Postingan berhasil disimpan
 */
postRouter.post("/posts", createPost);

/**
 * @swagger
 * /api/posts/summary:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Data dashboard berhasil diambil
 */
postRouter.get("/posts/summary", getDashboardSummary);

export default postRouter;
