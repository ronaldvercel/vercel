import mongoose, { Schema, Document } from 'mongoose';

export interface IPaymentMethod extends Document {
    cashapp: string;
    zelle: string;
    applepay: string;
    venmo: string;
}

const PaymentMethodSchema: Schema<IPaymentMethod> = new Schema(
    {
        cashapp: { type: String, required: true, default: "" },
        zelle: { type: String, required: true, default: "" },
        applepay: { type: String, required: true, default: "" },
        venmo: { type: String, required: true, default: "" },
    },
    {
        timestamps: true,
    }
);

const PaymentMethodModel =
    mongoose.models.PaymentMethod ||
    mongoose.model<IPaymentMethod>('PaymentMethod', PaymentMethodSchema);

export default PaymentMethodModel;
