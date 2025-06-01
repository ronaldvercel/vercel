import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPayment extends Document {
    userId: Types.ObjectId;
    method: 'cashapp' | 'zelle' | 'applepay' | 'venmo';
    amount: number;
    jobId: Types.ObjectId;
    screenshot: string; // Optional field for screenshot
}

const PaymentSchema = new Schema<IPayment>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        method: {
            type: String,
            enum: ['cashapp', 'zelle', 'applepay', 'venmo'],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        screenshot: {
            type: String,
            required: true,
        },
        jobId: {
            type: Schema.Types.ObjectId,
            ref: 'Application',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Payment =
    mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;
