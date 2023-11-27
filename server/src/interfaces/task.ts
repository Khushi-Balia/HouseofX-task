import { Document } from 'mongoose';
import IUser from './user';

export default interface ITask extends Document {
    title: string;
    author: IUser;
    content: string;
    headline: string;
    picture?: string;
}
