import express, { urlencoded } from "express";
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("visiting / route");
  res.send("Hello World");
});



app.listen(3000, () => {
  console.log("App is live on http://localhost:3000 ✅");
});
