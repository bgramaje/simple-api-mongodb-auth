import { FilterQuery, Model, Document } from "mongoose";

import DB from "./db";
import { Auth, AuthModel } from "../../config/db/models/auth.model"

export class authDB extends DB<Auth> {
    protected model: Model<Auth>;

    constructor() {
        super()
        this.model = AuthModel
    }

    /**
    * Data Access Layer
    * @function getByRefreshToken(), gets an specific model from a document by it's refreshToken.
    * @param refreshToken of the model
    * @returns Promise<Document<Auth> | null>
    */
    async getByRefreshToken(refreshToken: String): Promise<Document<Auth> | null> {
        try {
            const result = await this.model.findOne({ refreshToken: refreshToken } as FilterQuery<Auth>)
            return result;
        } catch (error: any) {
            throw error;
        }
    }

    /**
     * Data Access Layer
     * @function delete(), deletes a model from a document of MongoDB by its refreshToken
     * @param refreshToken of the model 
     * @returns Promise<Document<Auth> | null>
     */
    async deleteByRefreshToken(refreshToken: String): Promise<Document<Auth> | null> {
        try {
            const result = await this.model.findOneAndDelete({ refreshToken: refreshToken } as FilterQuery<Auth>)
            return result;
        } catch (error: any) {
            throw error;
        }
    }
}