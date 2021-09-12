import { Model } from 'mongoose';

import Service from "./services";
import { UserModel, User } from "../../config/db/models/user.model";
import { userDB } from "../db/user.db";

export class userService extends Service<User>{
    protected model: typeof UserModel;
    protected db: userDB;

    constructor() {
        super();
        this.model = UserModel;
        this.db = new userDB();
    }

    /**
     * Service Layer
     * @function getByUsername(), gets an specific entity from DDBB(entity?) by it's Id.
     * @param id id 
     * @returns Promise<Document<T> | undefined | null>
     */
    async getByUsername(id: String): Promise<User | null> {
        try {
            const result = await this.db.getByUsername(id);
            return result;
        } catch (error: any) {
            throw error;
        }
    }
}