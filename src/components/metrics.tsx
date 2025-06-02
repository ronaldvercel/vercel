"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Job {
  id: string;
  jobName: string;
  company: string;
  status: string;
  wage: string;
  feesPaid: boolean;
  date: string;
  appliedDate: string;
  location: string;
}

interface ApplicationsTableProps {
  jobs: Job[];
}

const ApplicationsTable = ({ jobs }: ApplicationsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            Successful
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
            Rejected
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
            <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2 animate-pulse"></div>
            Pending
          </Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.jobName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "company":
          return a.company.localeCompare(b.company);
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-xl font-semibold text-slate-900">
              Application History
            </CardTitle>
            <p className="text-slate-600">
              Manage and track your job applications
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Successful</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="company">Company</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      {filteredJobs.length > 0 ? (
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                  <TableHead className="font-semibold text-slate-700 pl-6">
                    Applied Date
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Position
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Company
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Location
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Salary
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Fees
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 pr-6">
                    Response Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job, index) => (
                  <TableRow
                    key={job.id}
                    className="hover:bg-slate-50/50 transition-all duration-200 border-slate-100 group"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: "fadeInUp 0.4s ease-out forwards",
                    }}
                  >
                    <TableCell className="font-medium text-slate-600 pl-6">
                      {formatDate(job.appliedDate)}
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {job.jobName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-slate-700">
                        {job.company}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {job.location}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-md text-sm">
                        {job.wage}
                      </span>
                    </TableCell>
                    <TableCell>
                      {job.feesPaid ? (
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
                          Paid
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-slate-600 border-slate-300"
                        >
                          Unpaid
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell className="text-slate-600 pr-6">
                      {job.status !== "pending" ? formatDate(job.date) : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      ) : (
        <CardContent>
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg mb-2">📊</div>
            <h3 className="text-lg font-medium text-slate-600 mb-2">
              No applications found
            </h3>
            <p className="text-slate-500 mb-4">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search criteria"
                : "Start by adding your first job application"}
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Add Application
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ApplicationsTable;
