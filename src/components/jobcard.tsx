"use client";
import React from "react";
import { MapPin, Clock, DollarSign, Users, Calendar, Tag } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Job {
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
  deadline?: string;
  createdAt: string;
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  console.log("JobCard job:", job);
  const getTypeColor = (type: string) => {
    switch (type) {
      case "remote":
        return "bg-green-100 text-green-800 border-green-200";
      case "hybrid":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "onsite":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getExperienceColor = (level: string) => {
    switch (level) {
      case "internship":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "entry":
        return "bg-green-100 text-green-800 border-green-200";
      case "mid":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "senior":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "lead":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isDeadlineSoon = () => {
    if (!job.deadline) return false;
    const deadline = new Date(job.deadline);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  const router = useRouter();

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Image
              height={80}
              width={80}
              alt="Company Image"
              className="object-cover"
              src={job?.company?.logo as string}
            />
            {/* <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              {job?.company?.name.charAt(0).toUpperCase()}
            </div> */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
              <p className="text-gray-600 font-medium">{job?.company?.name}</p>
            </div>
          </div>
          {isDeadlineSoon() && (
            <Badge variant="destructive" className="animate-pulse">
              Deadline Soon
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p
          className="text-gray-700 leading-relaxed line-clamp-3"
          dangerouslySetInnerHTML={{ __html: job.description }}
        ></p>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <DollarSign className="w-4 h-4 text-green-500" />
            <span className="font-semibold">{job.pay}</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>{job.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge className={`${getTypeColor(job.type)} border`}>
            <Clock className="w-3 h-3 mr-1" />
            {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
          </Badge>

          <Badge
            className={`${getExperienceColor(job.experienceLevel)} border`}
          >
            <Users className="w-3 h-3 mr-1" />
            {job.experienceLevel.charAt(0).toUpperCase() +
              job.experienceLevel.slice(1)}
          </Badge>
        </div>

        {job.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {job.tags.slice(0, 4).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
            {job.tags.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{job.tags.length - 4} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>Posted {formatDate(job.createdAt)}</span>
          </div>
          {job.deadline && (
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Due {formatDate(job.deadline)}</span>
            </div>
          )}
        </div>
        <Button
          onClick={() => {
            router.push(`/dashboard/jobs/${job._id}`);
          }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300"
          size="sm"
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
