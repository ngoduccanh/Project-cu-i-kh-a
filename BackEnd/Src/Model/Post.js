import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  author: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  caption: {
    type: String 
  },
  likes: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  }],
  comments: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Comment' 
  }],
  Day:[{
    type: String
  }],
  location:[{
    type: String
  }]
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
export default Post;
