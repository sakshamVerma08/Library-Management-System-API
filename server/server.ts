import express, { urlencoded } from "express";
import bookRouter from "./routes/book-routes.js";
import userRouter from "./routes/user-routes.js";
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

// Custom Router Middlewares

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("App is live on http://localhost:3000 ✅");
});
