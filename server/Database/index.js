import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URL = process.env.MONGODB_URL;

export const connection = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw error;
  }
};
