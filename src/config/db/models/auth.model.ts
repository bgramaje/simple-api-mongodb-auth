import { Schema, model, Document } from 'mongoose';

interface Auth extends Document {
    user_id?: Schema.Types.ObjectId;
    refreshToken?: string;
}

const schema = new Schema<Auth>({
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'user'},
    refreshToken: { type: String, required: true, unique: true }
});

const AuthModel = model<Auth>('Auth', schema);

export { Auth, AuthModel };