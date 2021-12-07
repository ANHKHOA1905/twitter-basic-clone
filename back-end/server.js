import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import authRoute from "./routes/authRoute.js";
import postRoute from "./routes/postRoute.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import Post from "./models/Post.js";

//dotenv
dotenv.config();

//connect DB
connectDB();

//use express
const app = express();

// use cors
app.use(cors());
// use body parser
app.use(express.json());

//mount the route
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/posts", postRoute);

// Unhandle route
app.use("*", (req, res, next) => {
  const err = new Error("The route can not be found");
  err.statusCode = 404;
  next(err);
});
app.use(errorHandler);

app.listen(process.env.APP_PORT, () => {
  console.log(`server is running at port ${process.env.APP_PORT}`);
});
