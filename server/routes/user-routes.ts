import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createUser, getUser, loginUser } from "../controllers/userController.js";
const userRouter = express.Router(); // Router level middleware.


// Attatching authMiddleware to the /api/users/ routes (all of them).
userRouter.post("/", createUser);
userRouter.post("/login", loginUser);


// Get the User Profile
userRouter.get("/:id", authMiddleware,getUser);

export default userRouter;
