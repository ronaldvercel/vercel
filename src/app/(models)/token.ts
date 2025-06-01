import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IToken extends Document {
    token: string;
    createdAt: Date;
}

const TokenSchema: Schema<IToken> = new Schema({
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Token: Model<IToken> = mongoose.models.Token || mongoose.model<IToken>('Token', TokenSchema);

export default Token;
