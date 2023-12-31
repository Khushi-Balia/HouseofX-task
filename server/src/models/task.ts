import mongoose, { Schema } from 'mongoose';
import ITask from '../interfaces/task';

const TaskSchema: Schema = new Schema(
    {
        title: { type: String, unique: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String, unique: true },
        headline: { type: String, unique: true },
        picture: { type: String }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ITask>('Task', TaskSchema);
