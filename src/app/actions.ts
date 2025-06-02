

"use server";

import { connectToDatabase } from "@/lib/mongoose";
import TokenModel from "@/app/(models)/token";
import User, { IUser } from "./(models)/user";
import { ActionResponse } from "./types/types";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Company, CompanyType } from "./(models)/company";
import { Job } from "./(models)/job";
import { JobFormData } from "@/components/ui/jobeditor";
import { revalidatePath } from 'next/cache';
import Application from "./(models)/application";
import PaymentMethodModel from "./(models)/payment";
import { Types } from "mongoose";
import Payment from "./(models)/paymentModel";
import { CompanyFormData } from "@/components/Companyform";
import { signOut } from "./auth";





function generateRandomToken(length = 29): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export async function createToken() {
    await connectToDatabase();

    const token = generateRandomToken();
    const newToken = await TokenModel.create({ token });

    // Convert to plain object
    const plainToken = {
        _id: newToken._id!.toString(),
        token: newToken.token,
        createdAt: newToken.createdAt,
    };

    return plainToken; // return plain object instead of Mongoose instance
}

export async function getAndDeleteToken(token: string) {
    await connectToDatabase();
    // Try to find the token
    const existingToken = await TokenModel.findOne({ token });

    if (!existingToken) {
        return null;
    }

    // Convert to plain object before deleting
    const tokenData = {
        _id: existingToken._id!.toString(),
        token: existingToken.token,
        createdAt: existingToken.createdAt,
    };
    // Delete it from the DB
    await TokenModel.deleteOne({ _id: existingToken._id });
    return tokenData;
}


export async function registerUserByEmail(email: string): Promise<ActionResponse<IUser>> {
    if (!email || typeof email !== "string") {
        throw new Error("Invalid email");
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email }).lean<IUser>();
    if (existingUser) {
        return { success: false, message: "User already exists", data: sanitizeUser(existingUser as unknown as IUser & { createdAt: Date; updatedAt: Date; }) as IUser };
    }

    const newUserDoc = await User.create({ email });
    const newUser = newUserDoc.toObject();

    return {
        success: true,
        message: "User created successfully",
        data: sanitizeUser(newUser) as unknown as IUser,
    };
}

function sanitizeUser(user: IUser & { createdAt: Date, updatedAt: Date }): Partial<IUser> & { createdAt: string, updatedAt: string } {
    return {
        _id: user._id!.toString(),
        email: user.email,
        name: user.name || "",
        jobs: user.jobs || [],
        payments: user.payments || [],
        createdAt: user.createdAt?.toISOString?.() || "",
        updatedAt: user.updatedAt?.toISOString?.() || "",
    };
}





export const createCompany = async (formData: CompanyFormData): Promise<ActionResponse<CompanyType>> => {
    console.log("Creating company with data:", formData);
    await connectToDatabase();

    const { name, about, logo } = formData;

    // Check for existing company
    const existingCompany = await Company.findOne({ name }).lean<CompanyType>();
    if (existingCompany) {
        return {
            success: false,
            message: "A company with this name already exists.",
        };
    }

    // Upload logo if present
    let logoUrl = "";
    if (logo?.base64) {
        logoUrl = await uploadToCloudinary(logo.base64);
    }

    // Create new company document
    const newCompanyDoc = await Company.create({
        name,
        about,
        logo: logoUrl,
    });

    // Manually extract only the plain fields (no Mongoose metadata)
    const newCompany: CompanyType = {
        _id: newCompanyDoc._id.toString(),  // Convert ObjectId to string
        name: newCompanyDoc.name,
        about: newCompanyDoc.about,
        logo: newCompanyDoc.logo,
        createdAt: newCompanyDoc.createdAt?.toISOString?.() ?? '',
        updatedAt: newCompanyDoc.updatedAt?.toISOString?.() ?? '',
    } as unknown as CompanyType;

    revalidatePath('/admin/company');

    return {
        success: true,
        message: "Company created successfully",
        data: newCompany,
    };
};




export const getAllCompanies = async (): Promise<ActionResponse<CompanyType[]>> => {
    try {
        await connectToDatabase();

        const companies = await Company.find().sort({ createdAt: -1 }); // newest first (optional)

        return {
            success: true,
            message: "Companies fetched successfully",
            data: companies,
        };
    } catch (error) {
        console.error("Error fetching companies:", error);
        return {
            success: false,
            message: "Failed to fetch companies",
        };
    }
};


export const removeCompany = async (
    id: string
): Promise<{ success: boolean; message: string }> => {
    await connectToDatabase();
    // Try to find and delete the company by id
    const deleted = await Company.findByIdAndDelete(id);

    if (!deleted) {
        return {
            success: false,
            message: "Company not found or already deleted.",
        };
    }

    return {
        success: true,
        message: "Company deleted successfully.",
    };
};





export const createJob = async (
    formData: JobFormData
): Promise<ActionResponse<typeof Job>> => {
    await connectToDatabase();

    console.log(formData)

    const {
        title,
        pay,
        description,
        type = "onsite",
        location,
        companyId, // company ObjectId string
        experienceLevel = "entry",
        tags = [],
        deadline,
        processingFee
    } = formData;



    // Minimal validation
    if (!title || !pay || !description || !location || !companyId || !processingFee) {
        return {
            success: false,
            message: "Missing required fields",
        };
    }

    try {
        const newJob = await Job.create({
            title,
            pay,
            description,
            type,
            location,
            company: companyId,
            experienceLevel,
            tags,
            processingFee,
            deadline: deadline ? new Date(deadline) : undefined,
        });

        return {
            success: true,
            message: "Job created successfully",
            data: newJob.toObject(), // return plain object
        };
    } catch (error) {
        console.error("Error creating job:", error);
        return {
            success: false,
            message: "Failed to create job",
        };
    }
};





interface GetJobsParams {
    page?: number;
    limit?: number;
}

export const getJobs = async ({
    page = 1,
    limit = 10,
}: GetJobsParams = {}) => {
    await connectToDatabase();

    const skip = (page - 1) * limit;

    const jobs = await Job.find()
        .populate({ path: 'company', model: Company }) // optional: load full company
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

    const total = await Job.countDocuments();

    return {
        jobs,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
    };
};





/**
 * Update a company by its ID.
 */
export const editCompany = async (companyId: string, updateData: Partial<{ name: string; logo: string }>) => {
    try {
        await connectToDatabase();

        const updated = await Company.findByIdAndUpdate(companyId, updateData, { new: true });

        if (!updated) {
            throw new Error('Company not found or update failed');
        }

        revalidatePath('/dashboard/companies'); // optional: adjust based on your app route
        return { success: true, message: 'Company updated successfully', company: updated };
    } catch (error) {
        console.error("Error updating company:", error);
        return { success: false, message: 'Failed to update company' };
    }
};

/**
 * Delete a company by its ID.
 */
export const deleteCompany = async (companyId: string) => {
    try {
        await connectToDatabase();
        // Delete the company
        const deleted = await Company.findByIdAndDelete(companyId);
        if (!deleted) {
            throw new Error('Company not found or deletion failed');
        }
        // Delete all jobs attached to this company
        await Job.deleteMany({ _id: companyId });
        // Revalidate admin page if needed
        revalidatePath('/admin/company');


        return {
            success: true,
            message: 'Company and associated jobs deleted successfully',
        };
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error deleting company:", error.message);
            return {
                success: false,
                message: 'Failed to delete company and jobs',
            };
        }
    }
};


// Adjust the path to your Job model

export async function deleteJobById(jobId: string) {
    try {
        await connectToDatabase();


        const deletedJob = await Job.findByIdAndDelete(jobId);

        if (!deletedJob) {
            return { success: false, message: "Job not found" };
        }

        revalidatePath('/admin/jobs');

        return { success: true, message: "Job deleted successfully" };
    } catch (error) {
        console.error("Error deleting job:", error);
        return { success: false, message: "Internal Server Error" };
    }
}




export const getJobById = async (jobId: string) => {
    await connectToDatabase();

    if (!jobId) {
        return {
            success: false,
            message: "Job ID is required",
        };
    }

    try {
        const job = await Job.findById(jobId)
            .populate("company")  // <--- Populate company details
            .lean();

        if (!job) {
            return {
                success: false,
                message: "Job not found",
            };
        }

        return {
            success: true,
            data: job,
        };
    } catch (error) {
        console.error("Error fetching job by ID:", error);
        return {
            success: false,
            message: "Failed to fetch job",
        };
    }
};


export async function createApplication({ email, jobId }: { email: string; jobId: string }) {
    try {
        // Ensure DB connection is established
        connectToDatabase()
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return { success: false, message: 'User not found' };
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return { success: false, message: 'Job not found' };
        }

        // Create the application
        const newApplication = await Application.create({
            user: user._id,
            job: job._id,
            hasPaid: false,
            payment: null,

        });

        // Push jobId into the user's jobs array
        await User.findByIdAndUpdate(
            user._id,
            { $push: { jobs: newApplication._id } },
            { new: true }
        );
        return {
            success: true,
            application: newApplication,
        };
    } catch (error) {

        console.error('Error creating application:', error);
        return { success: false, message: 'Server error', error: "hello" };
    }
}



export async function getPaymentMethods() {
    await connectToDatabase();

    let method = await PaymentMethodModel.findOne(); // get the first one

    // If none exists, create a default one
    if (!method) {
        method = new PaymentMethodModel({
            cashapp: "qr2q4t",
            zelle: "23r4t3",
            applepay: "42t3t",
            venmo: "4tq3q5",
        });
        await method.save();
    }

    return JSON.parse(JSON.stringify(method)); // Convert to plain object
}



export async function updatePaymentMethod({
    id,
    cashapp,
    zelle,
    applepay,
    venmo,
}: {
    id: string;
    cashapp?: string;
    zelle?: string;
    applepay?: string;
    venmo?: string;
}) {
    await connectToDatabase();

    const updated = await PaymentMethodModel.findByIdAndUpdate(
        id,
        {
            ...(cashapp && { cashapp }),
            ...(zelle && { zelle }),
            ...(applepay && { applepay }),
            ...(venmo && { venmo }),
        },
        { new: true }
    );

    console.log("Updated Payment Method:", updated);
    revalidatePath('/admin/update-pay'); // or the path where payment data is shown
    revalidatePath('/admin/pay'); // or the path where payment data is shown
    return JSON.parse(JSON.stringify(updated));
}



interface SubmitPaymentActionProps {
    email: string;
    method: 'cashapp' | 'zelle' | 'applepay' | 'venmo';
    amount: number;
    jobId: string;
    screenshot: File;
}

interface SubmitPaymentProps {
    userId: string;
    method: 'cashapp' | 'zelle' | 'applepay' | 'venmo';
    amount: number;
    jobId: string;
    screenshot: string;
}


export async function submitPaymentAction({
    email,
    method,
    amount,
    jobId,
    screenshot,
}: SubmitPaymentActionProps) {
    // Convert File to base64 or buffer for Cloudinary uploader
    const fileData = await screenshot.arrayBuffer();
    const base64 = Buffer.from(fileData).toString('base64');
    const dataUrl = `data:${screenshot.type};base64,${base64}`;
    // Upload image to Cloudinary

    const user = await User.findOne({ email })
    const imageUrl = await uploadToCloudinary(dataUrl, "lovable");
    // Now call your existing submitPayment function with imageUrl
    const response = await submitPayment({
        userId: user._id.toString(), // Ensure userId is a string
        method,
        amount,
        jobId,
        screenshot: imageUrl,  // URL string, not File
    });

    return response;
}

export async function submitPayment({
    userId,
    method,
    amount,
    jobId,
    screenshot
}: SubmitPaymentProps) {
    try {
        await connectToDatabase();
        // Validate ObjectId format
        if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(jobId)) {
            throw new Error('Invalid userId or jobId');
        }

        // job id means application id

        const payment = await Payment.create({
            userId,
            method,
            amount,
            jobId,
            screenshot, // Store the screenshot URL
        });
        // Optionally revalidate paths if needed
        revalidatePath('/dashboard'); // Update as needed

        return {
            success: true,
            message: 'Payment submitted successfully.',
            payment,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'Failed to submit payment.',
        };
    }
}


export async function getUserApplicationsByEmail(email: string) {
    await connectToDatabase();
    const userWithJobs = await User.findOne({ email })
        .populate({
            path: "jobs",
            populate: {
                path: "job"
            }
        })
        .exec();
    if (!userWithJobs) {
        return
        // throw new Error("User not found");
    }
    return userWithJobs;
}

export async function getCompanyById(companyId: string) {
    await connectToDatabase();
    if (!companyId) {
        return {
            success: false,
            message: "Company ID is required",
        };
    }
    try {
        const company = await Company.findById(companyId).lean();
        if (!company) {
            return {
                success: false,
                message: "Company not found",
            };
        }
        return {
            success: true,
            data: company,
        };
    } catch (error) {
        console.error("Error fetching company by ID:", error);
        return {
            success: false,
            message: "Failed to fetch company",
        };
    }
}

export async function logout() {
    await signOut({ redirectTo: "/" })
}



export async function getMetrics() {
    try {
        await connectToDatabase(); // important if you're using Mongoose
        const [totalUsers, totalJobs, totalApplications, payments] = await Promise.all([
            User.countDocuments(),
            Job.countDocuments(),
            Application.countDocuments(),
            Payment.find({}, 'amount'), // only fetch the `amount` field
        ]);

        const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
        return {
            totalUsers,
            totalRevenue,
            totalJobs,
            totalApplications,
        };
    } catch (error) {
        console.error('Error fetching metrics:', error);
        throw new Error('Failed to load metrics');
    }
}










