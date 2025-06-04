import express from 'express';
import PostController from '../Controllers/PostController.js';
import CheckUser from '../Middleware/CheckUser.js';
export const postRouter = express.Router();
postRouter.post("/Createpost",CheckUser,PostController.createPost)
postRouter.get("/",PostController.getAllPosts)
postRouter.get("/user/:userId",PostController.getUserPosts)
postRouter.post("/comment",CheckUser,PostController.createComment)