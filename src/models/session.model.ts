import mongoose, { Document, Schema, model } from "mongoose";
import { UserDocument } from "./user.model";


export interface SessionDocument extends Document {
    user: UserDocument["_id"];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
}

const SessionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    valid: {
        type: Boolean,
        default: true
    },
    userAgent: {
        type: String
    }
},{
    timestamps: true
})

const SessionModel = model<SessionDocument>("Session", SessionSchema);

export default SessionModel;