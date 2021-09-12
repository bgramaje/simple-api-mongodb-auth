import { Model, Document, FilterQuery } from "mongoose";

import DB from "./db";
import { User, UserModel } from "../../config/db/models/user.model"

export class userDB extends DB<User> {
    protected model: Model<User>;

    constructor() {
        super()
        this.model = UserModel
    }

    /**
     * Data Access Layer
     * @function getByUsername(), gets an specific model from a document by it's Id.
     * @param id id of the model
     * @returns Promise<Document<T> | undefined | null>
     */
    async getByUsername(username: String): Promise<Document<User> | null> {
        try {
            const result = await this.model.findOne({ username: username } as FilterQuery<User>)
            return result;
        } catch (error: any) {
            throw error;
        }
    }
}