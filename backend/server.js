import express from "express";
import 'dotenv/config.js'
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import userRouter from "./Routes/userRoute.js";
import dbConnect from "./config/dbConnect.js";

const app = express();
dbConnect();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve() + "/public"));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/", userRouter);

app.listen(4000, () => {
  console.log("Server Up At 4000");
});
