"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RichTextEditor from "./ui/editor";
import { createCompany } from "@/app/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
// Zod schema for validation
export const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  logo: z.any().optional(),
  about: z.string().min(1, "About section is required"),
});

export type CompanyFormData = z.infer<typeof companySchema>;

const CompanyForm: React.FC = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      about: "",
    },
  });

  const aboutContent = watch("about");

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue("logo", file);
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: CompanyFormData) => {
    setLoading(true);
    try {
      const result = await createCompany({
        ...data,
        logo: selectedFile
          ? {
              base64: logoPreview,
              name: selectedFile.name,
              size: selectedFile.size,
              type: selectedFile.type,
            }
          : null,
      });
      if (!result.success) {
        toast.error(result.message || "Failed to create company");
        setLoading(false);
        return;
      }
      toast.success(result.message);
    } catch (error) {
      console.error("Error creating company:", error);
    }
    setLoading(false);
    router.refresh();
    reset(); // <-- resets react-hook-form fields
    setLogoPreview(null);
    setSelectedFile(null);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Company Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter company name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Logo Upload */}
          <div className="space-y-2">
            <Label htmlFor="logo">Company Logo</Label>
            <div className="space-y-4">
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="cursor-pointer"
              />
              {logoPreview && (
                <div className="flex justify-center">
                  <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* About Rich Text Editor */}
          <div className="space-y-2">
            <Label htmlFor="about">About Company *</Label>
            <RichTextEditor
              content={aboutContent || ""}
              onChange={(content) => setValue("about", content)}
              className="min-h-[200px]"
            />
            {errors.about && (
              <p className="text-sm text-red-500">{errors.about.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            {loading ? "Saving..." : "Save Company"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CompanyForm;
