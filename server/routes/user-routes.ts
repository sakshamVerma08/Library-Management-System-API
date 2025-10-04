import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createUser, getUser } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.use("/:id", authMiddleware);

// /api/users routes

userRouter.post("/", createUser);

userRouter.get("/:id", getUser);

export default userRouter;
