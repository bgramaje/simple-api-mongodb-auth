import express, { Request, Response } from 'express';
import morgan, { format } from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import {
    HOME,
    USERS,
    AUTH
} from './config/routes'

import { userRouter } from './api/routes/user.routes';
import { authRouter } from './api/routes/auth.routes';

import {
    notFound,
    errorHandler
} from './api/middlewares/error.middlewares';

import morganMiddleware from './api/middlewares/morgan.middleware';

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

app.use(USERS, userRouter);
app.use(AUTH, authRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
