import express from "express";
const bookRouter = express.Router();
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  addNewBook,
  deleteBook,
  getAllBooks,
  updateStatus,
} from "../controllers/bookController.js";
import { adminAuth } from "../middlewares/adminAuth.js";

// Book Router.

// calling authMiddleware on every route in this file.
bookRouter.use(authMiddleware);

// /api/books

bookRouter.get("/", getAllBooks);

// admin auth ensures that the authorized user is a admin or not (implementation of Authorization)
bookRouter.post("/", adminAuth, addNewBook);

bookRouter.put("/", updateStatus);

bookRouter.delete("/", adminAuth, deleteBook);

export default bookRouter;
