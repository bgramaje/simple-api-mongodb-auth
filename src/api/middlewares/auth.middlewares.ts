import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user: JwtPayload
        }
    }
}

/**
 * @description It checks if a given token in a request is valid or not.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns an invalid state of the token, if it does not return anything, the token is correct and it proceeds to the next() call.
 */
const authToken = async (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers['authorization'];
    const bearerToken = bearerHeader && bearerHeader.split(' ')[1];
    if (!bearerToken) return res.status(401).send({ token: null, reason: 'No bearer token was provided to the request.' })

    jwt.verify(bearerToken!, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
        if (err) return res.status(403).send({ auth: false, token: bearerToken, reason: 'Bearer token invalid.' })
        req.user = user!
        next()
    })
}

export default authToken