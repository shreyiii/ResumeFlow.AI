import mongoose from "mongoose";


const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB")})
        let uri = process.env.MONGODB_URI;
        const projectName ='resume-builder';
        if (!uri){
            throw new Error("MONGODB_URI is not defined");
        }
        if(uri.endsWith('/')){
            uri = uri.slice(0, -1);
        }
        await mongoose.connect(`${uri}/${projectName}`);
        } catch (error) {
            
            console.error(error.message);
            console.error(error);
        }
}

export default connectDB    