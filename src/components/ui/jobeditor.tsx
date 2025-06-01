import React, { useState, useEffect, SetStateAction } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { createJob } from "@/app/actions"; // adjust the path accordingly
// import updateJob similarly if needed

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import RichTextEditor from "./editor";
import { getAllCompanies } from "@/app/actions";
import { CompanyType } from "@/app/(models)/company";
import toast from "react-hot-toast";

// // Mock functions - replace with your actual API calls
// const getCompanies = async () => {
//   // Simulate API call
//   return [
//     { id: "1", name: "TechCorp Inc." },
//     { id: "2", name: "StartupXYZ" },
//     { id: "3", name: "Enterprise Solutions" },
//     { id: "4", name: "Innovation Labs" },
//   ];
// };

const updateJob = async (jobId: string) => {
  console.log("Updating job:", jobId);
  // Simulate API call
  return { id: jobId };
};

const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  pay: z.string().min(1, "Pay is required"),
  description: z.string().min(1, "Description is required"),
  companyId: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  type: z.enum(["onsite", "remote", "hybrid"], {
    required_error: "Type is required",
  }),
  experienceLevel: z.enum(["internship", "entry", "mid", "senior", "lead"], {
    required_error: "Experience level is required",
  }),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  deadline: z.date({
    required_error: "Deadline is required",
  }),
  processingFee: z.string().min(1, "Processing fee is required"),
});

export type JobFormData = z.infer<typeof jobSchema>;

export interface Job {
  id?: string;
  title: string;
  pay: string;
  description: string;
  companyId: string;
  location: string;
  type: "onsite" | "remote" | "hybrid";
  experienceLevel: "internship" | "entry" | "mid" | "senior" | "lead";
  tags: string[];
  deadline: Date;
  processingFee: string;
}

interface JobEditorProps {
  job?: Job;
  onSuccess?: (job: Job) => void;
}

const JobEditor: React.FC<JobEditorProps> = ({ job }) => {
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const isEditing = !!job?.id;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: job
      ? {
          title: job.title,
          pay: job.pay,
          description: job.description,
          companyId: job.companyId,
          location: job.location,
          type: job.type,
          experienceLevel: job.experienceLevel,
          tags: job.tags,
          deadline: job.deadline,
          processingFee: job.processingFee,
        }
      : {
          title: "",
          pay: "",
          description: "",
          companyId: "",
          location: "",
          type: "remote" as const,
          experienceLevel: "entry" as const,
          tags: [],
          deadline: new Date(),
          processingFee: "",
        },
  });

  const tags = watch("tags");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesData = await getAllCompanies();
        console.log(companiesData);
        setCompanies(companiesData.data as SetStateAction<CompanyType[]>);
        // setCompanies(companiesData);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const onSubmit = async (data: JobFormData) => {
    setIsLoading(true);
    try {
      let result;
      if (isEditing && job?.id) {
        result = await updateJob(job.id);
        toast.success("Job updated successfully");
      } else {
        result = await createJob(data);
        console.log(result);
        if (result.success) {
          toast.success("Job created successfully");
          reset(); // reset form only on success
        } else {
          toast.error("Failed to create job");
          setIsLoading(false);
          return;
        }
      }
      // onSuccess?.(result);
    } catch (error) {
      console.error("Error creating/updating job:", error);
      toast.error("Failed to create job");
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setValue("tags", [...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {isEditing ? "Edit Job" : "Create New Job"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    id="title"
                    placeholder="e.g. Senior Frontend Developer"
                    {...field}
                    className={errors.title ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Pay */}
            <div className="space-y-2">
              <Label htmlFor="pay">Pay</Label>
              <Controller
                name="pay"
                control={control}
                render={({ field }) => (
                  <Input
                    id="pay"
                    placeholder="e.g. $80,000 - $120,000"
                    {...field}
                    className={errors.pay ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.pay && (
                <p className="text-sm text-red-500">{errors.pay.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="processingFee">Processing Fee</Label>
              <Controller
                name="processingFee"
                control={control}
                render={({ field }) => (
                  <Input
                    id="processingFee"
                    placeholder="e.g. $50 - $100"
                    {...field}
                    className={errors.processingFee ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.processingFee && (
                <p className="text-sm text-red-500">
                  {errors.processingFee.message}
                </p>
              )}
            </div>

            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Controller
                name="companyId"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={errors.companyId ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id as string}
                          value={company._id as string}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.companyId && (
                <p className="text-sm text-red-500">
                  {errors.companyId.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Input
                    id="location"
                    placeholder="e.g. San Francisco, CA"
                    {...field}
                    className={errors.location ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.location && (
                <p className="text-sm text-red-500">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Work Type</Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={errors.type ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onsite">Onsite</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>

            {/* Experience Level */}
            <div className="space-y-2">
              <Label htmlFor="experienceLevel">Experience Level</Label>
              <Controller
                name="experienceLevel"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={errors.experienceLevel ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                      <SelectItem value="lead">Lead/Principal</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.experienceLevel && (
                <p className="text-sm text-red-500">
                  {errors.experienceLevel.message}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  content={field.value}
                  onChange={field.onChange}
                  className={errors.description ? "border-red-500" : ""}
                />
              )}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  placeholder="Add a tag and press Enter"
                  className="flex-1"
                />
                <Button type="button" onClick={addTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-blue-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            {errors.tags && (
              <p className="text-sm text-red-500">{errors.tags.message}</p>
            )}
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <Label htmlFor="deadline">Application Deadline</Label>
            <Controller
              name="deadline"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                        errors.deadline && "border-red-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto bg-white p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.deadline && (
              <p className="text-sm text-red-500">{errors.deadline.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : isEditing ? "Update Job" : "Create Job"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobEditor;
