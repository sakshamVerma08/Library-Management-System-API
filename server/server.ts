import dotenv from "dotenv";
const result = dotenv.config({path:"./.env"});
if(result.error) throw result.error;

import express, { urlencoded, type Request, type Response } from "express";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 4000;

import bookRouter from "./routes/book-routes.js";
import userRouter from "./routes/user-routes.js";

// Connecting to the PostgreSQL DB Pool
app.use(cookieParser()); // now I can access token from req.cookies
app.use(express.json());
app.use(urlencoded({ extended: true }));


// Custom Router Middlewares

app.use("/api/users", userRouter); // router middleware for user routes
app.use("/api/books", bookRouter); // router middleware for book routes

app.get("/", (req:Request, res:Response) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log(`App is live on http://localhost:${PORT} ✅`);
});
