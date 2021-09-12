import express, { Response, Request, NextFunction } from "express";
import asyncHandler from 'express-async-handler'

import { userController } from "../controllers/user.controllers";

import authToken from "../middlewares/auth.middlewares";

const router = express.Router();
const controller = new userController();

/**
 * @description /, retrives all 'user' model from DDBB
 * @param {*} rute
 * @param {function(req: Request, res: Response, next: NextFunction)}
 */
router.get('/list', [authToken], asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        controller.get(req, res, next)
    })
);

/**
 * @description /, retrives a 'user' model from DDBB by it's Id
 * @param {*} rute
 * @param {function(req: Request, res: Response, next: NextFunction)}
 */
router.get('/list/:id', [authToken], asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        controller.getById(req, res, next);
    })
);

/**
 * @description /,create a new 'user' model, and saves it in DDBB
 * @param {*} rute
 * @param {function(req: Request, res: Response, next: NextFunction)}
 */
router.post('/create', [authToken], asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        controller.add(req, res, next)
    })
);

/**
 * @description /, deletes a 'user' model from DDBB by it's Id.
 * @param {*} rute
 * @param {function(req: Request, res: Response, next: NextFunction)}
 */
router.delete('/delete/:id', [authToken], asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        controller.delete(req, res, next);
    })
);

/**
 * @description /, updates a 'user' model from DDBB by it's Id
 * @param {*} rute
 * @param {function(req: Request, res: Response, next: NextFunction)}
 */
router.put('/update/:id', [authToken], asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        controller.update(req, res, next)
    })
);

export { router as userRouter };
