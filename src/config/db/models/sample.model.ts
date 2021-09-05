import { Schema, model, Document } from 'mongoose';

interface Sample extends Document {
    name?: string;
    description?: string;
}

const schema = new Schema<Sample>({
    name: { type: String, required: true },
    description: { type: String, required: false }
});

const SampleModel = model<Sample>('Sample', schema);

export { Sample, SampleModel };