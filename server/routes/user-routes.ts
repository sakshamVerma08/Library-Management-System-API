import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createUser, getUser, loginUser } from "../controllers/userController.js";
const userRouter = express.Router();


// /api/users routes

userRouter.post("/", createUser);

userRouter.post("/", authMiddleware, loginUser)

userRouter.get("/:id", getUser);

export default userRouter;
