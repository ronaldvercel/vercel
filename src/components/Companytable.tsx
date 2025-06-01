"use client";
import React from "react";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "../components/hooks/use-toast";
import { deleteCompany } from "@/app/actions";

// Define the company type based on your schema
export interface CompanyType {
  _id: string;
  name: string;
  logo?: string;
  about: string;
  createdAt: Date;
  updatedAt: Date;
}

const CompanyTable = ({ companies }: { companies: CompanyType[] }) => {
  // const [companies, setCompanies] = useState<CompanyType[]>([]);
  // useEffect(() => {
  //   const fetchCompanies = async () => {
  //     try {
  //       const companiesData = await getAllCompanies();
  //       console.log(companiesData);
  //       setCompanies(companiesData.data as SetStateAction<CompanyType[]>);
  //       // setCompanies(companiesData);
  //     } catch (error) {
  //       console.error("Failed to fetch companies:", error);
  //     }
  //   };

  //   fetchCompanies();
  // }, []);

  const handleEdit = async (company: CompanyType) => {
    const response = await deleteCompany(company._id);
    toast({
      title: "Error",
      description: response?.message,
      variant: "destructive",
    });
    return;
  };

  const handleDelete = async (companyId: string) => {
    const response = await deleteCompany(companyId);
    toast({
      title: "Error",
      description: response?.message,
      variant: "destructive",
    });
    return;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="w-full">
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Company</TableHead>
              <TableHead className="font-semibold">About</TableHead>
              <TableHead className="font-semibold">Created</TableHead>
              <TableHead className="font-semibold">Updated</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company._id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    {company.logo ? (
                      <Image
                        height={32}
                        width={32}
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {company.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <span className="text-gray-900">{company.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600 max-w-md">
                  <div
                    className="truncate"
                    title={company.about}
                    dangerouslySetInnerHTML={{ __html: company.about }}
                  ></div>
                </TableCell>
                <TableCell className="text-gray-500">
                  {formatDate(company.createdAt)}
                </TableCell>
                <TableCell className="text-gray-500">
                  {formatDate(company.updatedAt)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32 bg-white">
                      <DropdownMenuItem
                        onClick={() => handleEdit(company)}
                        className="cursor-pointer"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(company._id)}
                        className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompanyTable;
