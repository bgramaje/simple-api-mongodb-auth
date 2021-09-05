import * as dotenv from "dotenv";
import mongoose from 'mongoose';
import Logger from "../utils/logger.utils";

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.DB_NAME!
        } as mongoose.ConnectOptions);
        Logger.info(`Successfully connected to database: ${process.env.MONGO_URI!}/${process.env.DB_NAME!} `);
    } catch (err) {
        Logger.error('Failed to connect to MongoDB', err);
    }
};