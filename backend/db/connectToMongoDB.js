import mongoose from "mongoose";

const connectToMongoDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB");
    }catch(err){
        console.log("Error while connecting to MongoDB",err);
    }
}

export default connectToMongoDB;