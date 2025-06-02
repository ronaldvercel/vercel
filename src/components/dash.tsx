"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardMetricsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend: string;
  color: "blue" | "green" | "yellow" | "purple";
  index: number;
}

const colorMaps = {
  blue: {
    icon: "text-blue-600",
    value: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  green: {
    icon: "text-green-600",
    value: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  yellow: {
    icon: "text-yellow-600",
    value: "text-yellow-700",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
  },
  purple: {
    icon: "text-purple-600",
    value: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
};

const DashboardMetricsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  color,
  index,
}: DashboardMetricsCardProps) => {
  const colors = colorMaps[color];

  return (
    <Card
      className={`border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${colors.border}`}
      style={{
        animationDelay: `${index * 100}ms`,
        animation: "fadeInUp 0.6s ease-out forwards",
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${colors.bg}`}>
          <Icon className={`h-4 w-4 ${colors.icon}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${colors.value} mb-1`}>{value}</div>
        <p className="text-xs text-slate-500">{trend}</p>
      </CardContent>
    </Card>
  );
};

export default DashboardMetricsCard;
