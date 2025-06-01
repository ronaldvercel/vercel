import { CompanyType } from "@/components/Companytable";
import { getAllCompanies } from "@/app/actions";
import CompanyForm from "@/components/Companyform";
import CompanyTable from "@/components/Companytable";

const Page = async () => {
  const fetchCompanies = async () => {
    try {
      const companiesData = await getAllCompanies();
      console.log(companiesData);
      return companiesData.data; // Assuming data is the array of companies
      // setCompanies(companiesData);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    }
  };

  const companies = await fetchCompanies();
  return (
    <div className="py-10 flex flex-col gap-3 px-4">
      <CompanyTable companies={companies as CompanyType[]} />
      <CompanyForm />
    </div>
  );
};
export default Page;
