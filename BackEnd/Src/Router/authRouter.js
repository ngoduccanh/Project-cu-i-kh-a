import express from "express"
import usersController from "../Controllers/UserController.js"
import CheckUser from "../Middleware/CheckUser.js";
export const authRouter = express.Router();
authRouter.post('/register', usersController.register)
authRouter.post('/login',usersController.login)
authRouter.post('/CreatUser',CheckUser, usersController.CreatUser)
authRouter.get('/UserInfor',CheckUser, usersController.UserInfor)
authRouter.put('/UpdateUser', CheckUser, usersController.UpdateUser)
authRouter.get('/getAllUser', usersController.getAllUsers)
authRouter.get('/user/:userId', usersController.GetUserInfor)