"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, DollarSign, Calendar, Building2 } from "lucide-react";
import ApplyModal from "@/components/applymodal";
import { Job } from "@/app/types/types";
import { Session } from "next-auth";

// Mock job data based on your schema
// const mockJob = {
//   _id: "123",
//   title: "Senior Frontend Developer",
//   pay: "$80k - $120k",
//   description: `We're looking for a passionate Senior Frontend Developer to join our dynamic team. You'll be responsible for building and maintaining user-facing web applications using modern JavaScript frameworks.

// Key Responsibilities:
// • Develop responsive and interactive web applications
// • Collaborate with designers and backend developers
// • Optimize applications for maximum speed and scalability
// • Write clean, maintainable, and well-documented code
// • Participate in code reviews and technical discussions

// Requirements:
// • 5+ years of experience in frontend development
// • Strong proficiency in React, TypeScript, and modern CSS
// • Experience with state management libraries (Redux, Zustand)
// • Knowledge of testing frameworks (Jest, React Testing Library)
// • Understanding of web performance optimization techniques`,
//   type: "hybrid",
//   location: "San Francisco, CA",
//   company: {
//     _id: "company123",
//     name: "TechFlow Solutions",
//     description: `TechFlow Solutions is a leading technology company specializing in innovative software solutions for businesses worldwide. Founded in 2015, we've grown from a small startup to a team of 200+ talented professionals.

// Our mission is to empower businesses through cutting-edge technology and exceptional user experiences. We work with clients ranging from startups to Fortune 500 companies, helping them digital transform and scale their operations.

// At TechFlow, we believe in:
// • Innovation and continuous learning
// • Work-life balance and flexible arrangements
// • Diversity, equity, and inclusion
// • Sustainable business practices
// • Employee growth and development

// We offer comprehensive benefits including health insurance, dental and vision coverage, 401(k) matching, unlimited PTO, professional development budget, and flexible working arrangements.`,
//     logo: "/placeholder.svg",
//   },
//   experienceLevel: "senior",
//   tags: ["React", "TypeScript", "JavaScript", "CSS", "Node.js", "GraphQL"],
//   deadline: new Date("2024-06-30"),
//   processingFee: "$25",
//   createdAt: new Date("2024-01-15"),
//   updatedAt: new Date("2024-01-15"),
// };

const JobPage = ({ job, session }: { job: Job; session: Session }) => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const mockJob = job;

  const getTypeColor = (type: string) => {
    switch (type) {
      case "remote":
        return "bg-green-100 text-green-800";
      case "hybrid":
        return "bg-blue-100 text-blue-800";
      case "onsite":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getExperienceColor = (level: string) => {
    switch (level) {
      case "internship":
        return "bg-yellow-100 text-yellow-800";
      case "entry":
        return "bg-green-100 text-green-800";
      case "mid":
        return "bg-blue-100 text-blue-800";
      case "senior":
        return "bg-purple-100 text-purple-800";
      case "lead":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {mockJob.title}
                    </h1>
                    <p className="text-xl text-gray-600 font-medium">
                      {mockJob.company.name}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge
                    className={`${getTypeColor(
                      mockJob.type
                    )} border-0 px-3 py-1`}
                  >
                    {mockJob.type.charAt(0).toUpperCase() +
                      mockJob.type.slice(1)}
                  </Badge>
                  <Badge
                    className={`${getExperienceColor(
                      mockJob.experienceLevel
                    )} border-0 px-3 py-1`}
                  >
                    {mockJob.experienceLevel.charAt(0).toUpperCase() +
                      mockJob.experienceLevel.slice(1)}{" "}
                    Level
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="font-medium">{mockJob.pay}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <span>{mockJob.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span>
                      Deadline:{" "}
                      {formatDate(mockJob.deadline as unknown as Date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5 text-purple-500" />
                    <span>
                      Posted: {formatDate(mockJob.createdAt as unknown as Date)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:w-64 flex flex-col gap-3">
                <Button
                  onClick={() => setIsApplyModalOpen(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  Apply Now
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  Processing fee:{" "}
                  <span className="font-semibold text-gray-700">
                    ${mockJob.processingFee}
                  </span>
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Job Description */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p
                    className="whitespace-pre-line text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: mockJob.description }}
                  ></p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">
                  Required Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockJob.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 text-blue-800 hover:from-blue-100 hover:to-purple-100 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Information */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  About {mockJob.company.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="w-full h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-blue-600" />
                  </div>
                  <p
                    className="text-gray-700 leading-relaxed text-sm"
                    dangerouslySetInnerHTML={{
                      __html: mockJob.company.about as string,
                    }}
                  ></p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  Job Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Job Type:</span>
                  <Badge className={`${getTypeColor(mockJob.type)} border-0`}>
                    {mockJob.type.charAt(0).toUpperCase() +
                      mockJob.type.slice(1)}
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience Level:</span>
                  <Badge
                    className={`${getExperienceColor(
                      mockJob.experienceLevel
                    )} border-0`}
                  >
                    {mockJob.experienceLevel.charAt(0).toUpperCase() +
                      mockJob.experienceLevel.slice(1)}
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Salary Range:</span>
                  <span className="font-semibold text-green-600">
                    {mockJob.pay}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{mockJob.location}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ApplyModal
        jobId={mockJob._id}
        session={session}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        jobTitle={mockJob.title}
        companyName={mockJob.company.name}
        processingFee={mockJob.processingFee as string}
      />
    </div>
  );
};

export default JobPage;
