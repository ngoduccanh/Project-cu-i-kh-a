import express from 'express';
import dotenv from 'dotenv'
import connectDataBase from "./Src/Confic/Database.js"
import { authRouter } from './Src/Router/authRouter.js';
import { postRouter } from './Src/Router/postRoutes.js';
import cors from 'cors'

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;
connectDataBase()
app.use(express.json());
app.use(cors())
app.use('/auth',authRouter)
app.use('/posts',postRouter)
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
  });
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });