import { SimplifiedJob, User } from "@/app/types/types";

// utils.ts
export function cn(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}


export function mapUserJobsToSimpleJobs(user: User): SimplifiedJob[] {
    console.log("Mapping user jobs to simple jobs:", user);
    return user.jobs.map((application) => ({
        id: application._id,
        date: application.createdAt.toISOString().split("T")[0], // "YYYY-MM-DD"
        jobName: application.job?.title,
        company: application.job?.company,
        wage: application.job?.pay,
        feesPaid: application?.hasPaid,
        status: application?.status,
    }));
}