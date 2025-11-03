import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const connectDB = async () => {
  try {
    const mongoUser = process.env.MONGO_USER;
    const mongoPassword = process.env.MONGO_PASS;
    const mongoHost = process.env.MONGO_HOST;
    const mongPort = process.env.MONGO_PORT;
    const mongoDB = process.env.MONGO_DB;

    const mongoURI = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongPort}/${mongoDB}?authSource=admin`;

    mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on("connected", () => {
      console.log("✅ Connected to MongoDB Successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err.message);
      process.exit(1);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
