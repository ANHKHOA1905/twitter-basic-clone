import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("connect DB is successfuly !!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
