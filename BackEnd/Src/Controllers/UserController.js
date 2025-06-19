import User from "../Model/User.js";
import Post from "../Model/Post.js"
import Comment from "../Model/Comment.js";
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import {randomBytes} from 'crypto'
const usersController = {
    register: async (req,res) =>{
        const {email,password}= req.body
        if (!email || !password) {
          return res.status(400).json({ error: 'Email và password là bắt buộc' });
        }
        const FindEmail = await User.findOne({email})
          if(FindEmail){
            return res.status(404).json({ error: 'Email đã tồn tại' });
        }
        const newAccont = new User({
            email,
            password,
        })
        await newAccont.save();
        return res.status(200).json({
            message: 'Đăng kí thành công.',
            newAccont,
          });
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({ error: 'Email và password là bắt buộc' });
        }
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(404).json({ error: 'Email không tồn tại.' });
          }
          const checkPassword = await bcrypt.compare(password, user.password);
          if (!checkPassword) {
            return res.status(401).json({ error: 'Sai mật khẩu.' });
          }
        const randomString = randomBytes(16).toString('hex');
        const apiKey = `mern-${user.id}-${user.email}-${randomString}`;
          return res.status(200).json({
            message: 'Đăng nhập thành công.',
            user,
            apiKey,
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Lỗi hệ thống' });
        }
      },
      CreatUser: async (req, res) => {
        const { username, avatar, bio, age, gender } = req.body;
      
        if (!username) {
          return res.status(400).json({
            message: "username không được để trống",
          });
        }
      
        try {
          const user = req.user;  
          user.username = username;
          user.age = Number(age);  
          user.gender = gender || "other";
          user.avatar = avatar || "";
          user.bio = bio || "";
      
          await user.save();
      
          res.status(200).json({
            message: "Tạo hồ sơ thành công",
            user: {
              id: user._id,
              username: user.username,
            },
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Lỗi hệ thống" });
        }
      },
      getAllUsers: async(req,res) =>{
        try {
          const users = await User.find()
          res.json(users);
        } catch (err) {
          res.status(500).json({ error: 'Lỗi khi lấy users' });
        }},
    UserInfor: async (req, res) => {
      try {
        const user = req.user; 
        if (!user) {
          return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
        
    const profileCreated = user.username?.trim() 
    
        res.json({
          profileCreated: !!profileCreated,
          user: {
            username: user.username,
            avatar: user.avatar,
            age: user.age,
            gender: user.gender,
            bio: user.bio,
          },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi khi lấy thông tin user" });
      }
    },
    UpdateUser: async (req, res) => {
      const { username, avatar, bio, age, gender } = req.body;
      const user = req.user;
    
      if (!username) {
        return res.status(400).json({ message: "username không được để trống" });
      }
    
      try {
        user.username = username;
        if (age !== undefined) user.age = age;
        if (gender) user.gender = gender;
        if (avatar) user.avatar = avatar;
        if (bio) user.bio = bio;
    
        await user.save();
    
        res.status(200).json({
          message: 'Cập nhật user thành công',
          user: {
            id: user._id,
            username: user.username,
            age: user.age,
            gender: user.gender,
            avatar: user.avatar,
            bio: user.bio
          }
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi hệ thống' });
      }
    },
    GetUserInfor: async(req,res) =>{
      try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: 'Không tìm thấy người dùng' });
        }
        const posts = await Post.find({ author: userId })
          .populate('author', 'name email')
          .populate({
            path: 'comments',
            populate: { path: 'author', select: 'username avatar' }
          })
          .lean();
        return res.status(200).json({
          success: true,
          user,
          posts
        });
      } catch (err) {
        console.error('Lỗi GetUserInfor:', err);
        return res.status(500).json({ error: 'Lỗi server' });
      }
    }
}
export default usersController