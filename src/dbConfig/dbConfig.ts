import { DB_NAME } from "@/constants/constants";
import mongoose from "mongoose";

export async function connectDB() {
  try {
    const mongoURI = `${process.env.MONGODB_URI}/${DB_NAME}`;

    if (!mongoURI) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    await mongoose.connect(mongoURI);

    const connection = mongoose.connection;

    connection.on("connection", () => {
      console.log("MongoDB Connected");
    });

    connection.on("error", (error) => {
      console.log("Error connecting to MongoDB: ", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
}
