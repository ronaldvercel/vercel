import { getJobById } from "@/app/actions";
import JobPage from "@/components/jobpage";
import { Job } from "@/app/types/types";
import { auth } from "@/app/auth";
import { Session } from "next-auth";

const Page = async ({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id } = await params;
  const job = await getJobById(id as string);
  const session = await auth();
  console.log("Auth:", session);

  return (
    <section>
      <JobPage session={session as Session} job={job.data as unknown as Job} />
    </section>
  );
};

// You can fetch job details using jobId here
// const job = await getJobById(jobId);

export default Page;
