import { Schema, model, Document } from 'mongoose';

interface User extends Document {
    username?: string;
    password?: string;
}

const schema = new Schema<User>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const UserModel = model<User>('User', schema);

export { User, UserModel };