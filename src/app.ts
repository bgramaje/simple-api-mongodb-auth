import express, { Request, Response } from 'express';
import morgan, { format } from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import winston from 'winston';
import { logger } from 'express-winston';

import {
    HOME
} from './config/routes'

import { sampleRouter } from './api/routes/sample.routes';

import {
    notFound,
    errorHandler
} from './api/middlewares/error.middlewares';

import morganMiddleware from './api/middlewares/morgan.middleware';

import Logger from "./config/utils/logger.utils"

const app = express();

//app.use(morgan('dev'));
app.use(morganMiddleware);
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(HOME, (req: Request, res: Response) => {
    res.json({
        message: 'HOME - 🌈👋🌎'
    });
})

app.use("/sample", sampleRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
