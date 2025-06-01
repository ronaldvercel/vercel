import { Schema, model, models } from "mongoose";

const JobSchema = new Schema(
    {
        title: { type: String, required: true }, // e.g., "Frontend Developer"
        pay: { type: String, required: true }, // e.g., "$60k - $80k"
        description: { type: String, required: true },
        type: {
            type: String,
            enum: ["onsite", "remote", "hybrid"],
            default: "onsite",
            required: true,
        },
        location: { type: String, required: true }, // City, State or Country
        company: {
            type: Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },
        experienceLevel: {
            type: String,
            enum: ["internship", "entry", "mid", "senior", "lead"],
            default: "entry",
        },
        tags: [{ type: String }], // e.g., ["React", "Node.js", "MongoDB"]
        deadline: { type: Date }, // Optional job application deadline

        // ✅ Add this field
        processingFee: {
            type: String,
            required: true, // Optional; make `true` if always required
        },
    },
    { timestamps: true }
);

export const Job = models.Job || model("Job", JobSchema);
