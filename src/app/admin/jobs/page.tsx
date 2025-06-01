import { getJobs } from "@/app/actions";
import JobTable, { JobType } from "@/components/jobtable";

const Page = async () => {
  // Fetch jobs from the server
  const jobs = await getJobs({ page: 1 });
  console.log("Fetched jobs:", jobs);
  return (
    <section className="container py-10 px-4">
      <JobTable jobs={jobs.jobs as unknown as JobType[]} />
    </section>
  );
};
export default Page;
