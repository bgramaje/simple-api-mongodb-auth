import express, { Response, Request, NextFunction } from "express";
import asyncHandler from 'express-async-handler'

import { sampleController } from "../controllers/sample.controllers";

const router = express.Router();
const controller = new sampleController();

/**
 * @description /, retrives all 'sample' model from DDBB
 * @param {*} rute
 * @param {function(req: Request, res: Response, next: NextFunction)}
 */
router.get('/list', asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        controller.get(req, res, next)
    })
);

/**
 * @description /, retrives a 'sample' model from DDBB by it's Id
 * @param {*} rute
 * @param {function(req: Request, res: Response, next: NextFunction)}
 */
router.get('/list/:id', asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        controller.getById(req, res, next);
    })
);

/**
 * @description /,create a new 'sample' model, and saves it in DDBB
 * @param {*} rute
 * @param {function(req: Request, res: Response, next: NextFunction)}
 */
router.post('/create', asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        controller.add(req, res, next)
    })
);

/**
 * @description /, deletes a 'sample' model from DDBB by it's Id.
 * @param {*} rute
 * @param {function(req: Request, res: Response, next: NextFunction)}
 */
router.delete('/delete/:id', asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        controller.delete(req, res, next);
    })
);

/**
 * @description /, updates a 'sample' model from DDBB by it's Id
 * @param {*} rute
 * @param {function(req: Request, res: Response, next: NextFunction)}
 */
router.put('/update/:id', asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        controller.update(req, res, next)
    })
);

export { router as sampleRouter };
