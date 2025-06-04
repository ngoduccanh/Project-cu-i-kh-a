import Post from "../Model/Post.js"
import Comment from "../Model/Comment.js"
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
        const userId = req.params.userId;
        try {
              const posts = await Post.find({ author: userId })
            .populate('author', 'username avatar')
            .populate({
                path: 'comments',
                populate: { path: 'author', select: 'username avatar' }
            })
            .sort({ createdAt: -1 });
            res.json(posts);
        } catch (err) {
            res.status(500).json({ error: 'Lỗi khi lấy posts của user' });
        }
        },
    createComment : async (req, res) => {
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
              res.status(201).json({ message: 'Tạo comment thành công', comment });
            } catch (err) {
              res.status(500).json({ error: 'Lỗi khi tạo comment' });
            }
          },
    
 }
 export default PostController