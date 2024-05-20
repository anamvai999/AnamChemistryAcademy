import mongoose from "mongoose";

const connectMongodb = async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/akhankha"
    );
    console.log("Connected to mongodb server");
  } catch (error) {
    console.log("Not connected to mongodb server", error);
  }
};

export default connectMongodb;
