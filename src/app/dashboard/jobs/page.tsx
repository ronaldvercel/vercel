"use client";

import React, { useState, useEffect, useMemo } from "react";
import JobCard from "@/components/jobcard";
import JobFilters from "@/components/jobfilters";
import JobStats from "@/components/jobstats";
import { getJobs } from "@/app/actions";
import { Briefcase } from "lucide-react";
import { PaginatedJobs } from "@/app/types/types";
import { Job } from "@/app/types/types";

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const fetchJobs = async (page = 1) => {
    setLoading(true);
    try {
      const res = (await getJobs({ page })) as unknown as PaginatedJobs;
      console.log("Fetched jobs:", res);
      setJobs(res.jobs);
      setTotal(res.total);
      setCurrentPage(res.currentPage);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesType = selectedType === "all" || job.type === selectedType;
      const matchesExperience =
        selectedExperience === "all" ||
        job.experienceLevel === selectedExperience;
      const matchesLocation =
        selectedLocation === "all" || job.location === selectedLocation;

      return (
        matchesSearch && matchesType && matchesExperience && matchesLocation
      );
    });
  }, [jobs, searchTerm, selectedType, selectedExperience, selectedLocation]);

  // Stats
  const remoteJobs = jobs.filter((job) => job.type === "remote").length;
  const newJobsThisWeek = jobs.filter((job) => {
    const jobDate = new Date(job.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return jobDate >= weekAgo;
  }).length;
  const activeCompanies = new Set(jobs.map((job) => job.company?._id)).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}

        {/* Stats */}
        <JobStats
          totalJobs={total}
          remoteJobs={remoteJobs}
          newJobsThisWeek={newJobsThisWeek}
          activeCompanies={activeCompanies}
        />

        {/* Filters */}
        <JobFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedExperience={selectedExperience}
          setSelectedExperience={setSelectedExperience}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />

        {/* Result Counter */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredJobs.length}
            </span>{" "}
            of <span className="font-semibold text-gray-900">{total}</span> jobs
          </p>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>

        {/* No Results */}
        {!loading && filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-600 mt-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
