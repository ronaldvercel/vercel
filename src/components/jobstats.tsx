import React from "react";
import { Briefcase, TrendingUp, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface JobStatsProps {
  totalJobs: number;
  remoteJobs: number;
  newJobsThisWeek: number;
  activeCompanies: number;
}

const JobStats: React.FC<JobStatsProps> = ({
  totalJobs,
  remoteJobs,
  newJobsThisWeek,
  activeCompanies,
}) => {
  const stats = [
    {
      icon: Briefcase,
      label: "Total Jobs",
      value: totalJobs.toLocaleString(),
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: TrendingUp,
      label: "Remote Jobs",
      value: remoteJobs.toLocaleString(),
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Clock,
      label: "New This Week",
      value: newJobsThisWeek.toLocaleString(),
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Users,
      label: "Active Companies",
      value: activeCompanies.toLocaleString(),
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300"
        >
          <CardContent className="p-6 pt-6 ">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobStats;
