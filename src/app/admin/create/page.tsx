"use client";
import React, { useState } from "react";
import JobEditor, { Job } from "@/components/ui/jobeditor";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample job data for editing demo
const sampleJob = {
  id: "1",
  title: "Senior React Developer",
  pay: "$90,000 - $130,000",
  description:
    "<h2>About the Role</h2><p>We are looking for an experienced React developer to join our growing team. You will be responsible for building scalable web applications and working closely with our design team.</p><h3>Requirements</h3><ul><li>5+ years of React experience</li><li>Strong TypeScript skills</li><li>Experience with modern build tools</li></ul>",
  companyId: "1",
  location: "San Francisco, CA",
  type: "hybrid" as const,
  experienceLevel: "senior" as const,
  tags: ["React", "TypeScript", "JavaScript", "Frontend"],
  deadline: new Date("2024-12-31"),
};

const Index = () => {
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editJob, setEditJob] = useState(sampleJob);

  const handleJobSuccess = () => {
    console.log("Job operation successful:", setMode, setEditJob);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Job Editor Demo</h1>
          <p className="text-xl text-gray-600">
            A comprehensive job posting editor with rich text, form validation,
            and responsive design
          </p>
        </div>

        {/* Mode Selector */}
        <Card className="max-w-md mx-auto">
          {/* <CardHeader>
            <CardTitle className="text-center">Demo Mode</CardTitle>
          </CardHeader> */}
          {/* <CardContent className="flex gap-2">
            <Button
              variant={mode === "create" ? "default" : "outline"}
              onClick={() => setMode("create")}
              className="flex-1"
            >
              Create New Job
            </Button>
            <Button
              variant={mode === "edit" ? "default" : "outline"}
              onClick={() => setMode("edit")}
              className="flex-1"
            >
              Edit Existing Job
            </Button>
          </CardContent> */}
        </Card>

        {/* Job Editor */}
        <div className="w-full">
          {mode === "create" ? (
            <JobEditor onSuccess={handleJobSuccess} />
          ) : (
            <JobEditor job={editJob as Job} onSuccess={handleJobSuccess} />
          )}
        </div>

        {/* Features List */}
        <Card className="max-w-4xl mx-auto mt-12">
          <CardHeader>
            <CardTitle>Features Included</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-green-600">
                  ✅ Form Features
                </h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• React Hook Form integration</li>
                  <li>• Zod schema validation</li>
                  <li>• Real-time error handling</li>
                  <li>• Form state management</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-green-600">
                  ✅ Rich Text Editor
                </h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• TipTap editor integration</li>
                  <li>• Bold, italic, strikethrough</li>
                  <li>• Headers and lists</li>
                  <li>• Blockquotes support</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-green-600">
                  ✅ Advanced Inputs
                </h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Company dropdown (backend)</li>
                  <li>• Tag management system</li>
                  <li>• Date picker integration</li>
                  <li>• Select dropdowns</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-green-600">
                  ✅ User Experience
                </h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Responsive design</li>
                  <li>• Loading states</li>
                  <li>• Toast notifications</li>
                  <li>• Clean, modern UI</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
