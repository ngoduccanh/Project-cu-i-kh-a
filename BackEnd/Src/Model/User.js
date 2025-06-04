import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  bio: {
    type: String,
    default: ''
  },
  followers: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  }],
  following: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
}, { timestamps: true });
userSchema.pre('save',async function (next) {
    const user = this;
    if (user.isModified('password')) {
        if (!user.password || user.password.length < 6) {
          const err = new Error('Mật khẩu phải có ít nhất 6 ký tự');
          return next(err);
        }
        try {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
          return next();
        } catch (err) {
          return next(err);
        }
    }
})
const User = mongoose.model('User', userSchema)
export default User