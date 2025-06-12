import express from 'express';
import PostController from '../Controllers/PostController.js';
import CheckUser from '../Middleware/CheckUser.js';
export const postRouter = express.Router();
postRouter.post("/Createpost",CheckUser,PostController.createPost)
postRouter.get("/",PostController.getAllPosts)
postRouter.get("/user", CheckUser, PostController.getUserPosts);
postRouter.get("/:postId/comments", PostController.getComments)
postRouter.post("/comment",CheckUser,PostController.createComment)
postRouter.delete("/comments/:commentId",CheckUser,PostController.DeleteComment)
postRouter.delete("/:postId", CheckUser, PostController.DeletePost)
