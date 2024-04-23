import mongoose from "mongoose";


const connectMongodb = async () => {
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to mongodb server');
    }catch(error){
        console.log("Not connected to mongodb server", error);
    }
}

export default connectMongodb;