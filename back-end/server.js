import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import authRoute from "./routes/authRoute.js";

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

app.listen(process.env.APP_PORT, () => {
  console.log(`server is running at port ${process.env.APP_PORT}`);
});
