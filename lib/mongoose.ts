import mongoose from 'mongoose';

let isConnected = false; 

//Backend Logic for connection to MongoDB,first it's set to False

export const ConnectToDB = async() => {
    mongoose.set("strictQuery", true);// Prevents accepting of any unknown field queries to db


    if(!process.env.MONGODB_URL) return console.log("Missing Mongo URL");

    if(isConnected){
        console.log("Already Connected to MONGODB");
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log("MongoDB Connected");
    } catch(error){
        console.log("Error in connecting to database");
    }
}