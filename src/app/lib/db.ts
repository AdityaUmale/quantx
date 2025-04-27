import mongoose from "mongoose";

const mongoString = process.env.MONGO_URI;


const dbConnect = async () => {
    try {
        if (!mongoString) {
            throw new Error('MongoDB connection string is not defined');
        }
        await mongoose.connect(mongoString);

    
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect;