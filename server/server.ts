import express, { urlencoded, type Request, type Response } from "express";
const app = express();

import bookRouter from "./routes/book-routes.js";
import userRouter from "./routes/user-routes.js";
import dotenv from "dotenv";
import pool from "./db/db.js";

const result = dotenv.config({path:"./.env"});
if(result.error) throw result.error;
console.log(".env variables Loaded✅");
const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(urlencoded({ extended: true }));

// Connecting to the PostgreSQL DB Pool

pool.connect().then(client=>{
  console.log("✅ Connected to PostgreSQL DB via Pool ");
  client.release();
}
).catch(err=>{
  console.error('❌ Connection to PostgreSQL DB via Pool failed ', err.stack);
})



// Custom Router Middlewares

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

app.get("/", (req:Request, res:Response) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log(`App is live on http://localhost:${PORT} ✅`);
});
