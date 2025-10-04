import dotenv from "dotenv";
const result = dotenv.config({path:"./.env"});
if(result.error) throw result.error;

import express, { urlencoded, type Request, type Response } from "express";
const app = express();
const PORT = process.env.PORT || 4000;

import bookRouter from "./routes/book-routes.js";
import userRouter from "./routes/user-routes.js";

import pool from "./db/db.js";

// Connecting to the PostgreSQL DB Pool

app.use(express.json());
app.use(urlencoded({ extended: true }));


// Custom Router Middlewares

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

app.get("/", (req:Request, res:Response) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log(`App is live on http://localhost:${PORT} ✅`);
});
