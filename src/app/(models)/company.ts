import { Schema, model, models, Document } from "mongoose";


// Define TS type
export interface CompanyType extends Document {
    name: string;
    logo?: string;
    about: string;
    createdAt: Date;
    updatedAt: Date;
}


export const CompanySchema = new Schema<CompanyType>(
    {
        name: { type: String, required: true, unique: true },
        logo: { type: String, required: false },  // URL to logo image (optional)
        about: { type: String, required: true },
    },
    { timestamps: true }
);

export const Company = models.Company || model("Company", CompanySchema);
