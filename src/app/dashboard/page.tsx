import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CheckCircle, XCircle, Clock, TrendingUp, Plus } from "lucide-react";
import { auth } from "../auth";
import { getUserApplicationsByEmail } from "../actions";
import Link from "next/link";
import { User } from "../types/types";
import { mapUserJobsToSimpleJobs } from "@/lib/utils";

const Index = async () => {
  const session = await auth();
  const jobss = (await getUserApplicationsByEmail(
    session?.user?.email as string
  )) as User;
  console.log("Jobs:", jobss);
  // Sample data - in a real app this would come from an API
  const jobs = mapUserJobsToSimpleJobs(jobss);
  // Calculate metrics
  const totalApplications = jobss.jobs.length;
  const successfulJobs = jobss.jobs.filter(
    (job) => job.status === "success"
  ).length;
  const rejectedJobs = jobss.jobs.filter(
    (job) => job.status === "rejected"
  ).length;
  const pendingJobs = jobss.jobs.filter(
    (job) => job.status === "pending"
  ).length;
  const successRate = Math.round((successfulJobs / totalApplications) * 100);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Successful
          </Badge>
        );
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Vercel Application Dashboard
            </h1>
            <p className="text-slate-600 mt-2">
              Track your career journey with precision
            </p>
          </div>
          <div className="flex gap-3">
            <Link href={"/dashboard/jobs"} className="flex items-center">
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Plus className="h-4 w-4" />
                View jobs
              </Button>
            </Link>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Applications
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {totalApplications}
              </div>
              <p className="text-xs text-slate-500 mt-1">+1% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Successful
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">
                {successfulJobs}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {successRate}% success rate
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Pending
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-700">
                {pendingJobs}
              </div>
              <p className="text-xs text-slate-500 mt-1">Awaiting response</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Rejected
              </CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-700">
                {rejectedJobs}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Learning opportunities
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Jobs Table */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-900">
              Application History
            </CardTitle>
            <p className="text-slate-600">
              Detailed view of your job applications
            </p>
          </CardHeader>
          {jobs.length > 0 ? (
            <CardContent>
              <div className="rounded-lg border border-slate-200 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/80">
                      <TableHead className="font-semibold text-slate-700">
                        Date
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700">
                        Position
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700">
                        Company
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700">
                        Salary
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700">
                        Fees Paid
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow
                        key={job.id}
                        className="hover:bg-slate-50/50 transition-colors duration-200 border-slate-100"
                      >
                        <TableCell className="font-medium text-slate-600">
                          {formatDate(job.date)}
                        </TableCell>
                        <TableCell className="font-semibold text-slate-900">
                          {job.jobName}
                        </TableCell>
                        <TableCell className="text-slate-700">
                          {job.company}
                        </TableCell>
                        <TableCell className="font-semibold text-green-700">
                          {job.wage}
                        </TableCell>
                        <TableCell>
                          {job.feesPaid ? (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                              Paid
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-slate-600">
                              Unpaid
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(job.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          ) : (
            <div className="text-center text-slate-500 p-4">
              No applications found
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Index;
