"use client";
import React from "react";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  MapPin,
  Clock,
  DollarSign,
} from "lucide-react";
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
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { deleteJobById } from "@/app/actions";
import toast from "react-hot-toast";
import Image from "next/image";
// import { toast } from "@/hooks/use-toast";

// Define the job type based on your schema
export interface JobType {
  _id: string;
  title: string;
  pay: string;
  description: string;
  type: "onsite" | "remote" | "hybrid";
  location: string;
  company: {
    _id: string;
    name: string;
    logo?: string;
  };
  experienceLevel: "internship" | "entry" | "mid" | "senior" | "lead";
  tags: string[];
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Mock data that matches your schema

const JobTable = ({ jobs }: { jobs: JobType[] }) => {
  console.log(jobs);
  const handleEdit = (job: JobType) => {
    console.log("Editing job:", job);
  };

  const handleDelete = async (jobId: string) => {
    const res = await deleteJobById(jobId);
    if (res.success) {
      toast.success(res.message);
      return;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "remote":
        return "bg-green-100 text-green-800";
      case "hybrid":
        return "bg-blue-100 text-blue-800";
      case "onsite":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getExperienceLevelColor = (level: string) => {
    switch (level) {
      case "internship":
        return "bg-purple-100 text-purple-800";
      case "entry":
        return "bg-cyan-100 text-cyan-800";
      case "mid":
        return "bg-yellow-100 text-yellow-800";
      case "senior":
        return "bg-red-100 text-red-800";
      case "lead":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full">
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Job</TableHead>
              <TableHead className="font-semibold">Company</TableHead>
              <TableHead className="font-semibold">Details</TableHead>
              <TableHead className="font-semibold">Tags</TableHead>
              <TableHead className="font-semibold">Deadline</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job._id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <div className="space-y-2">
                    <div className="font-semibold text-gray-900">
                      {job.title}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-3 w-3" />
                        <span>{job.pay}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                          job.type
                        )}`}
                      >
                        {job.type}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceLevelColor(
                          job.experienceLevel
                        )}`}
                      >
                        {job.experienceLevel}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    {job?.company?.logo ? (
                      <Image
                        height={32}
                        width={32}
                        src={job.company.logo}
                        alt={`${job.company.name} logo`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {job?.company?.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <span className="text-gray-900 font-medium">
                      {job?.company?.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600 max-w-md">
                  <div
                    className="truncate"
                    title={job.description}
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {job.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {job.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        +{job.tags.length - 3}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-gray-500">
                  {job.deadline ? (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-sm">
                        {formatDate(job.deadline)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400">No deadline</span>
                  )}
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
                        onClick={() => handleEdit(job)}
                        className="cursor-pointer"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(job._id)}
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

export default JobTable;
