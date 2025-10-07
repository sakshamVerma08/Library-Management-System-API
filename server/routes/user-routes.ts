import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createUser, getUser, loginUser } from "../controllers/userController.js";
const userRouter = express.Router(); // Router level middleware.


// Attatching authMiddleware to the /api/users/ routes (all of them).
userRouter.post("/", createUser);
userRouter.post("/login", loginUser);

userRouter.use(authMiddleware);



userRouter.get("/:id", getUser);

export default userRouter;
