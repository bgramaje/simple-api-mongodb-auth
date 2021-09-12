import express, { Response, Request, NextFunction } from "express";
import asyncHandler from 'express-async-handler'

import { authController } from "../controllers/auth.controllers";

const router = express.Router();
const controller = new authController();

/**
 * @description /, logs a new user
 * @param {*} rute
 * @param {function(req: Request, res: Response, next: NextFunction)}
 */
router.post('/login', asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        controller.login(req, res, next);
    })
);

/**
 * @description /, creates a new access token
 * @param {*} rute
 * @param {function(req: Request, res: Response, next: NextFunction)}
 */
router.post('/access-token/create', asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        controller.newAccessToken(req, res, next);
    })
);

/**
 * @description /, checks if provided access token is valid or not
 * @param {*} rute
 * @param {function(req: Request, res: Response, next: NextFunction)}
 */
router.get('/access-token/check', asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        controller.checkAccessToken(req, res, next);
    })
);

/**
 * @description /, checks if provided refresh token is valid or not
 * @param {*} rute
 * @param {function(req: Request, res: Response, next: NextFunction)}
 */
router.post('/refresh-token/check', asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        controller.checkRefreshToken(req, res, next);
    })
);

/**
 * @description /, logs out from the api
 * @param {*} rute
 * @param {function(req: Request, res: Response, next: NextFunction)}
 */
router.delete('/logout', asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        controller.logout(req, res, next);
    })
);

export { router as authRouter };
