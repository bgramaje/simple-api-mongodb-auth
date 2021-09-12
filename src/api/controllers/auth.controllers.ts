import { Model } from 'mongoose';
import bcrypt, { hash } from "bcrypt"
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

import Service from "../services/services";
import Controller from './controller';
import Logger from "../../config/utils/logger.utils";

import { Auth, AuthModel } from "../../config/db/models/auth.model";
import { authService } from '../services/auth.services';
import { userService } from '../services/user.services';

import { User } from '../../config/db/models/user.model';

const _userService = new userService();

export class authController extends Controller<Auth>{
    protected model: typeof AuthModel;
    protected service: authService;

    constructor() {
        super();
        this.model = AuthModel;
        this.service = new authService();
    }

    /**
     * Controller Layer
     * @function login(), logs a user into the API
     * @param req Request 
     * @param res Response
     * @param next NextFunction
     */
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user: User | null = await _userService.getByUsername(req.body.username)
            if (user) {
                if (await bcrypt.compare(req.body.password, user.password!)) {
                    const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET!) //{ expiresIn: '86400s' }1 day token 86400s
                    const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN_SECRET!) //1 day token 86400s
                    req.body = { 'user_id': user._id, refreshToken }
                    const newEntity = req.body as typeof Model;
                    this.service.add(newEntity)
                    res.status(200).json({ auth: true, accessToken: accessToken, refreshToken: refreshToken, user_id: user._id })
                } else res.status(404).json({ auth: false, message: 'password incorrect' })
            } else res.status(404).json({ found: false, message: 'user with provided username not found' })
        } catch (error) {
            Logger.error(error);
            next(error)
        }
    }

    async newAccessToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (req.body.refreshToken == null) res.status(401).send();
            const tokenDB = this.service.getByRefreshToken(req.body.refreshToken);
            if (!tokenDB) res.status(403).send({ token: false, notFound: true });
            jwt.verify(req.body.refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any, user: any) => {
                if (err) return res.send(403)
                const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '86400s' }) //{ expiresIn: '86400s' }
                res.status(200).json({ recreated: true, accessToken: accessToken }) //1 day token 86400s
            })
        } catch (error) {
            Logger.error(error);
            next(error)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.service.deleteByRefreshToken(req.body.refreshToken)
            res.status(200).json({ deletedFromDB: true, logout: true })
        } catch (error) {
            Logger.error(error);
            next(error)
        }
    }

    async checkAccessToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const bearerHeader = req.headers['authorization'];
            const bearerToken = bearerHeader && bearerHeader.split(' ')[1]
            if (bearerToken == null) res.status(401).send();
            jwt.verify(bearerToken!, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
                if (err) res.status(200).json({ validToken: false, user: null })
                if (user) res.status(200).json({ validToken: true, user: user })
            })
        } catch (error) {
            Logger.error(error);
            next(error)
        }
    }

    async checkRefreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const tokenDB = await this.service.getByRefreshToken(req.body.refreshToken);
            if (tokenDB) res.status(200).json({ validToken: true, logout: false })
            else res.status(200).json({ validToken: false, logout: true })
        } catch (error) {
            Logger.error(error);
            next(error)
        }
    }
}