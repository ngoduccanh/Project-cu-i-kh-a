import User from "../Model/User.js"
const CheckUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Tài khoản chưa được cung cấp" });
    }
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ error: 'apiKey không đúng định dạng' });
    }
    const apiKey = tokenParts[1];
    const apiKeyParts = apiKey.split('-');
    if (apiKeyParts.length !== 4 || apiKeyParts[0] !== 'mern') {
      return res.status(401).json({ error: 'apiKey không đúng định dạng' });
    }
    const userId = apiKeyParts[1];
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ error: 'apiKey không hợp lệ hoặc user không tồn tại' });
      }
      req.user = user;
      next();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Lỗi hệ thống khi xác thực apiKey' });
    }
  };
  
  export default CheckUser;
  