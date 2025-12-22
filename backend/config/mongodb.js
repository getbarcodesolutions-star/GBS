import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB Connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB Connection Error:", err);
    });

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in environment variables");
    }

    await mongoose.connect(`${process.env.MONGODB_URI}/getbarcodeDATAbase`);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1)
  }
};

export default connectDB;
