import { auth } from "@/app/auth";
import AccessToken from "@/components/validate";
import { redirect } from "next/navigation";

const Page = async () => {
  const profile = await auth();
  if (profile) {
    redirect("/dashboard");
  }
  return <AccessToken />;
};
export default Page;
