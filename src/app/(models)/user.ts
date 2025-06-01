import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IUser extends Document {
    email: string;
    name?: string;
    jobs: mongoose.Types.ObjectId[];
    payments: mongoose.Types.ObjectId[];
}
const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        name: {
            type: String,
            required: false, // will be added later
            trim: true,
        },
        jobs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Application",
            },
        ],
        payments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Payment",
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Prevent model overwrite on hot reloads in dev
const User = models.User || model<IUser>("User", userSchema);
export default User;
