import { Model, Document } from 'mongoose';

import Service from "./services";
import { AuthModel, Auth } from "../../config/db/models/auth.model";
import { authDB } from "../db/auth.db";

export class authService extends Service<Auth>{
    protected model: typeof AuthModel;
    protected db: authDB;

    constructor() {
        super();
        this.model = AuthModel;
        this.db = new authDB();
    }

    /**
     * Service Layer
     * @function getByRefreshToken(), gets an specific entity from DDBB(entity?) by it's refreshToken.
     * @param refreshToken id 
     * @returns Promise<Auth | null>
     */
    async getByRefreshToken(refreshToken: String): Promise<Auth | null> {
        try {
            const result = await this.db.getByRefreshToken(refreshToken);
            return result;
        } catch (error: any) {
            throw error;
        }
    }

    /**
     * Service Layer
     * @function deleteByRefreshToken(), deletes data from DDBB(entity?)
     * @param id id of the entity to be removed
     * @returns Promise<Document<T> | undefined | null>
     */
    async deleteByRefreshToken(id: String): Promise<Document<Auth> | null> {
        try {
            const result = await this.db.deleteByRefreshToken(id);
            return result;
        } catch (error: any) {
            throw error;
        }
    }
}