import { Document, Model } from 'mongoose';
import { UpdateResult } from 'mongodb';

import DB from "../db/db";

export default abstract class Service<T extends Document> {
    protected abstract db: DB<T>;
    protected abstract model: Model<T>;

    /**
     * Service Layer
     * @function get(), gets all data from DDBB(entitiy?)
     * @returns Promise<Document<T>[] | undefined>
     */
    async get(): Promise<Document[]> {
        try {
            const result = await this.db.get();
            return result;
        } catch (error: any) {
            throw error;
        }
    }

    /**
     * Service Layer
     * @function getById(), gets an specific entity from DDBB(entity?) by it's Id.
     * @param id id 
     * @returns Promise<Document<T> | undefined | null>
     */
    async getById(id: String): Promise<Document | null> {
        try {
            const result = await this.db.getById(id);
            return result;
        } catch (error: any) {
            throw error;
        }
    }

    /**
     * Service Layer
     * @function add(), adds a new data to DDBB(entity?)
     * @param newEntity entity to be saved into DDBB
     * @returns Promise<Document<T> | undefined
     */
    async add(entity: typeof Model): Promise<Document> {
        try {
            const result = await this.db.add(entity);
            return result;
        } catch (error: any) {
            throw error;
        }
    }

    /**
     * Service Layer
     * @function delete(), deletes data from DDBB(entity?)
     * @param id id of the entity to be removed
     * @returns Promise<Document<T> | undefined | null>
     */
    async delete(id: String): Promise<Document | null> {
        try {
            const result = await this.db.delete(id);
            return result;
        } catch (error: any) {
            throw error;
        }
    }

    /**
     * Data Access Layer
     * @function update(), updates data from DDBB(entity?)
     * @param id id of the entity to be updated
     * @param updateQuery query to apply to the entity to be updated
     * @returns Promise<UpdateResult | undefined>
     */
    async update(id: String, updateQuery: {}): Promise<UpdateResult> {
        try {
            const result = await this.db.update(id, updateQuery);
            return result;
        } catch (error: any) {
            throw error;
        }
    }
}