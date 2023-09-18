import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserInput {
    email: string,
    name: string,
    password: string,
}

export interface UserDocument extends UserInput, Document {
    createdAt: Date,
    updatedAt: Date
    comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified("password")){
        next();
    }

    try {
        const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch(error: any) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password).catch((error) => false);
}


const UserModel = mongoose.model<UserDocument>('User', UserSchema)

export default UserModel;