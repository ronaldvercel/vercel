import React from "react";
import { Button } from "@/components/ui/button";

const FeaturedJobsSection: React.FC = () => {
  const jobs = [
    {
      title: "Senior Full Stack Engineer",
      company: "TechCorp",
      location: "Remote (US)",
      salary: "$140K - $180K",
      type: "Full-time",
      tags: ["React", "Node.js", "TypeScript"],
    },
    {
      title: "Product Manager",
      company: "InnovateLabs",
      location: "Remote (US)",
      salary: "$130K - $170K",
      type: "Full-time",
      tags: ["Strategy", "Analytics", "Leadership"],
    },
    {
      title: "Senior DevOps Engineer",
      company: "CloudSync",
      location: "Remote (US)",
      salary: "$135K - $175K",
      type: "Full-time",
      tags: ["AWS", "Kubernetes", "Docker"],
    },
    {
      title: "UX/UI Designer",
      company: "DigitalEdge",
      location: "Remote (US)",
      salary: "$110K - $140K",
      type: "Full-time",
      tags: ["Figma", "Design Systems", "Research"],
    },
    {
      title: "Data Scientist",
      company: "DataFlow",
      location: "Remote (US)",
      salary: "$145K - $185K",
      type: "Full-time",
      tags: ["Python", "ML", "Analytics"],
    },
    {
      title: "Security Engineer",
      company: "SecureBase",
      location: "Remote (US)",
      salary: "$150K - $190K",
      type: "Full-time",
      tags: ["Cybersecurity", "Compliance", "Infrastructure"],
    },
  ];

  return (
    <section id="jobs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-inter font-bold text-4xl text-gray-900 mb-4">
            Featured Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Exclusive positions from our verified partner companies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow hover:border-primary-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-inter font-semibold text-lg text-gray-900 mb-1">
                    {job.title}
                  </h3>
                  <p className="text-primary-600 font-medium mb-2">
                    {job.company}
                  </p>
                  <p className="text-gray-500 text-sm">{job.location}</p>
                </div>
                <span className="bg-primary-100 text-primary-700 text-xs font-medium px-2 py-1 rounded-full">
                  {job.type}
                </span>
              </div>

              <div className="mb-4">
                <p className="font-semibold text-gray-900 text-lg">
                  {job.salary}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full border-primary-200 text-primary-600 hover:bg-primary-50"
              >
                View Details
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4"
          >
            View All Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobsSection;
