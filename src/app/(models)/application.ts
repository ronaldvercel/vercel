// /app/(models)/application.ts

import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IApplication extends Document {
    job: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    payment: mongoose.Types.ObjectId | null;
    status: "pending" | "successful" | "rejected";
    hasPaid: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        payment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment", // Replace with actual payment model name
            default: null,
        },
        status: {
            type: String,
            enum: ["pending", "successful", "rejected"],
            default: "pending",
        },
        hasPaid: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Application = models.Application || model<IApplication>("Application", applicationSchema);

export default Application;
