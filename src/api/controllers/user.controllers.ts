import { Model } from 'mongoose';
import bcrypt, { hash } from "bcrypt"
import { Request, Response, NextFunction } from "express";

import Service from "../services/services";
import Controller from './controller';
import Logger from "../../config/utils/logger.utils";

import { User, UserModel } from "../../config/db/models/user.model";
import { userService } from '../services/user.services';

export class userController extends Controller<User>{
    protected model: typeof UserModel;
    protected service: userService;

    constructor() {
        super();
        this.model = UserModel;
        this.service = new userService();
    }

    /**
     * Controller Layer
     * Overwrite add function in order to encrypt the password of the user
     * @function add(), adds entity into DDBB(entitiy?), and sends a result
     * @param req Request 
     * @param res Response
     * @param next NextFunction
     */
    async add(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const salt = await bcrypt.genSalt() //the greather, more time it takes, but more secure it is
            if (req.body.password) req.body.password = await bcrypt.hash(req.body.password, salt);;
            const newEntity = req.body as typeof Model;
            const result = await this.service.add(newEntity)
            result ? res.status(201).send(result) : res.status(500).send("Could not create entity");
        } catch (error: any) {
            Logger.error(error);
            next(error)
        }
    }
}