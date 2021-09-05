import { UpdateResult } from 'mongodb';
import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export default abstract class DB<T extends Document> {
    protected abstract model: Model<T>;

    /**
     * Data Access Layer
     * @function get(), gets all models from a document MongoDB
     * @returns Promise<Document<T>[] | undefined>
     */
    async get(): Promise<Document<T>[]> {
        try {
            const result = await this.model.find({})
            return result;
        } catch (error: any) {
            throw error;
        }
    }

    /**
     * Data Access Layer
     * @function getById(), gets an specific model from a document by it's Id.
     * @param id id of the model 
     * @returns Promise<Document<T> | undefined | null>
     */
    async getById(id: String): Promise<Document<T> | null> {
        try {
            const result = await this.model.findOne({ _id: id } as FilterQuery<T>)
            return result;
        } catch (error: any) {
            throw error;
        }
    }

    /**
     * Data Access Layer
     * @function add(), adds a new model to a document of MongoDB
     * @param newEntity entity to be saved into DDBB
     * @returns Promise<Document<T> | undefined
     */
    async add(newEntity: typeof Model): Promise<Document<T>> {
        try {
            const entity = new this.model(newEntity);
            await entity.save();
            return entity;
        } catch (error: any) {
            throw error;
        }
    }

    /**
     * Data Access Layer
     * @function delete(), deletes a model from a document of MongoDB 
     * @param id id of the model 
     * @returns Promise<Document<T> | undefined | null>
     */
    async delete(id: String): Promise<Document<T> | null> {
        try {
            const result = await this.model.findOneAndDelete({ _id: id } as FilterQuery<T>)
            return result;
        } catch (error: any) {
            throw error;
        }
    }

    /**
     * Data Access Layer
     * @function update(), updates a model from a document of MongoDB 
     * @param id id of the model 
     * @param updateQuery query to apply to the model to be updated
     * @returns Promise<UpdateResult | undefined>
     */
    async update(id: String, updateQuery: {}): Promise<UpdateResult> {
        try {
            const result = await this.model.updateOne({ _id: id } as FilterQuery<T>, updateQuery as UpdateQuery<T>);
            return result;
        } catch (error: any) {
            throw error;
        }
    }
}