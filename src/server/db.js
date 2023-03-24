import mongoose from "mongoose";
import Grid from "gridfs-stream";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(console.log("db connected"));
  } catch (e) {
    console.log(e);
  }
};
