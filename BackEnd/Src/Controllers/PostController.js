import Post from "../Model/Post.js"
import Comment from "../Model/Comment.js"
import Shape from "../Model/Shape.js";
 const PostController = {
     createPost: async (req, res) => {
        const { image, caption } = req.body;
        if (!caption) return res.status(400).json({ error: 'Image bắt buộc' });
      
        try {
          const newPost = new Post({
            author: req.user._id,
            image,
            caption,
            likes: [],
            comments: []
          });
          await newPost.save();
          res.status(201).json({ message: 'Tạo post thành công', post: newPost });
        } catch (err) {
          res.status(500).json({ error: 'Lỗi khi tạo post' });
        }
      },
      getAllPosts: async (req, res) => {
        try {
          const posts = await Post.find()
            .populate('author', 'username avatar')
            .populate({
              path: 'comments',
              populate: { path: 'author', select: 'username avatar' }
            })
            .sort({ createdAt: -1 });
      
          res.json(posts);
        } catch (err) {
          res.status(500).json({ error: 'Lỗi khi lấy posts' });
        }
      },
      getUserPosts: async (req, res) => {
        try {
          const userId = req.user._id;  
          const posts = await Post.find({ author: userId })
            .populate('author', 'username avatar')
            .populate({
              path: 'comments',
              populate: { path: 'author', select: 'username avatar' }
            })
            .sort({ createdAt: -1 });
          res.json({ posts }); 
        } catch (err) {
          res.status(500).json({ error: 'Lỗi khi lấy posts của user' });
        }
      },
      getPostsByUserId: async (req, res) => {
        try {
          const { userId } = req.params;
          const posts = await Post.find({ author: userId })
            .populate('author', 'username avatar')
            .populate({
              path: 'comments',
              populate: { path: 'author', select: 'username avatar' }
            })
            .sort({ createdAt: -1 });

          res.json({ posts });
        } catch (err) {
          console.error("Lỗi khi lấy post của userId:", err);
          res.status(500).json({ error: 'Lỗi khi lấy bài viết của người dùng' });
        }
      },
      createComment: async (req, res) => {
        const { postId, text } = req.body;
        if (!text) return res.status(400).json({ error: 'Text bắt buộc' });
      
        try {
          const comment = new Comment({
            post: postId,
            author: req.user._id,
            text
          });
          await comment.save();
      
          const post = await Post.findById(postId);
          post.comments.push(comment._id);
          await post.save();
          const populatedComment = await Comment.findById(comment._id)
            .populate("author", "username avatar");
      
          res.status(201).json({
            message: 'Tạo comment thành công',
            comment: populatedComment
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Lỗi khi tạo comment' });
        }
      },
          getComments: async (req, res) => {
            const postId = req.params.postId;
            try {
              const comments = await Comment.find({ post: postId })
              .populate('author', ['username', 'avatar'])
              res.status(200).json(comments);
            } catch (error) {
              console.error("Lỗi khi lấy bình luận:", error);
              res.status(500).json({ message: "Lỗi khi lấy bình luận" });
            }
          },
          DeleteComment: async (req, res) => {
            const commentId = req.params.commentId;
          
            try {
              const comment = await Comment.findById(commentId);
              if (!comment) return res.status(404).json({ message: "Không tìm thấy bình luận" });
              if (comment.author.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: "Bạn không có quyền xóa bình luận này" });
              }
              await Post.findByIdAndUpdate(comment.post, {
                $pull: { comments: comment._id }
              });
              await Comment.findByIdAndDelete(commentId);
          
              res.status(200).json({ message: "Xóa bình luận thành công" });
            } catch (error) {
              console.error("Lỗi khi xoá bình luận:", error);
              res.status(500).json({ message: "Lỗi server khi xoá bình luận" });
            }
          },
          DeletePost: async (req, res) => {
            const postId = req.params.postId;
            try {
              const post = await Post.findById(postId);
              if (!post) {
                return res.status(404).json({ message: "Không tìm thấy bài post" });
              }
          
              if (post.author.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: "Bạn không có quyền xóa bài viết này" });
              }
              await Comment.deleteMany({ _id: { $in: post.comments } });
              await Post.findByIdAndDelete(postId);
          
              res.status(200).json({ message: "Xóa bài viết thành công" });
            } catch (error) {
              console.error("Lỗi khi xoá bài viết:", error);
              res.status(500).json({ message: "Lỗi server khi xoá bài viết" });
            }
          },
          SavedPost: async(req,res) =>{
            const { postId } = req.body;
            const userId = req.user._id;
            try {
              const existing = await Shape.findOne({ user: userId, post: postId });
              if (existing) return res.status(400).json({ message: "Đã lưu trước đó" });

              const saved = new Shape({ user: userId, post: postId });
              await saved.save();
              res.status(201).json({ message: "Đã shape bài viết" });
            } catch (err) {
              res.status(500).json({ message: "Lỗi server", error: err.message });
            }
          },
          GetSavedPost: async(req,res) =>{
            try {
              const userId = req.user._id;
               const saved = await Shape.find({ user: userId })
                .populate({
                  path: "post",
                  populate: {
                    path: "author",
                    select: "username avatar", 
                  },
                });
              res.json(saved);
            } catch (err) {
              res.status(500).json({ message: "Lỗi khi lấy danh sách", error: err.message });
            }
          },
          deleteSavedPost: async(req,res)=>{
            const { postId } = req.params;
            const userId = req.user._id;
            try {
              const saved = await Shape.findOne({ user: userId, post: postId });

              if (!saved) {
                return res.status(404).json({ message: 'Bài viết chưa được lưu hoặc đã bị xóa' });
              }
              await Shape.deleteOne({ _id: saved._id });
              res.status(200).json({ message: 'Đã xóa bài viết đã lưu' });
            } catch (error) {
              console.error('Lỗi khi xóa bài viết đã lưu:', error);
              res.status(500).json({ message: 'Lỗi máy chủ' });
            }
          }
        }
 export default PostController