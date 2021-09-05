import app from './app'
import dotenv from "dotenv";

import { connectDB } from "./config/db/connect"
import Logger from "./config/utils/logger.utils"


dotenv.config();

const port = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            Logger.info(`Listening on http://localhost:${port}`);
        })
    })
    .catch((err: Error) => {
        Logger.error("Database connection failed", err)
        process.exit();
    });

