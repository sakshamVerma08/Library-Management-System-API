import express from "express";
import { getBooks } from "../controllers/book-controller";
const router = express.Router();


export const getBooks = router.get('/books', getBooks);

