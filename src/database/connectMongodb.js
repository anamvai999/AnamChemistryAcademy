import mongoose from "mongoose";

const connectMongodb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://junayed:0zw3FnG5nE0NC45f@cluster0.ib2sqlw.mongodb.net/akhanka?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to mongodb server");
  } catch (error) {
    console.log("Not connected to mongodb server", error);
  }
};

export default connectMongodb;
