import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Briefcase, FileText } from "lucide-react";
import { getMetrics } from "../actions";

const Dashboard = async () => {
  const { totalUsers, totalRevenue, totalJobs, totalApplications } =
    await getMetrics();

  // Mock data - in a real app, this would come from an API

  const metrics = {
    totalUsers,
    totalRevenue,
    totalJobs,
    totalApplications,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div className=" bg-gray-50">
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Overview of your platform metrics
            </p>
          </div>

          <div className="grid grid-cols-1 py-4 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Users */}
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Users
                </CardTitle>
                <Users className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(metrics.totalUsers)}
                </div>
                <p className="text-xs text-green-600 mt-1">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            {/* Total Revenue */}
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(metrics.totalRevenue)}
                </div>
                <p className="text-xs text-green-600 mt-1">
                  +8% from last month
                </p>
              </CardContent>
            </Card>

            {/* Total Jobs */}
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Jobs
                </CardTitle>
                <Briefcase className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(metrics.totalJobs)}
                </div>
                <p className="text-xs text-green-600 mt-1">
                  +15% from last month
                </p>
              </CardContent>
            </Card>

            {/* Total Applications */}
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Applications
                </CardTitle>
                <FileText className="h-5 w-5 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(metrics.totalApplications)}
                </div>
                <p className="text-xs text-green-600 mt-1">
                  +18% from last month
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
