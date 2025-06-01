"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { DollarSign, User } from "lucide-react";
import { useToast } from "./hooks/use-toast";
import { Session } from "next-auth";
import { createApplication } from "@/app/actions";
import SuccessModal from "./successModal";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  companyName: string;
  processingFee: string;
  session: Session;
  jobId: string; // Optional jobId if needed for further processing
}

const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  jobTitle,
  companyName,
  processingFee,
  session,
  jobId,
}) => {
  console.log(session, jobId);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    location: "",
    agreeToTerms: false,
    agreeToProcessingFee: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [returnedJobId, setReturnedJobId] = useState(""); // Initialize jobId if provided
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms || !formData.agreeToProcessingFee) {
      toast({
        title: "Agreement Required",
        description:
          "Please agree to the terms and processing fee to continue.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    try {
      const res = await createApplication({ email: formData.email, jobId });
      console.log(res.application._id);
      setReturnedJobId(res.application._id); // Store the returned jobId
      if (res.success) {
        toast({
          title: "Application Submitted! 🎉",
          description:
            "Your application has been sent successfully. We'll get back to you soon!",
        });
      }
      setIsSuccessModalOpen(true);
      console.log("Application submitted:", {
        jobTitle,
        companyName,
        applicantData: formData,
      });

      toast({
        title: "Application Submitted! 🎉",
        description:
          "Your application has been sent successfully. We'll get back to you soon!",
      });

      onClose();
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        agreeToTerms: false,
        agreeToProcessingFee: false,
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Apply for {jobTitle}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              at{" "}
              <span className="font-semibold text-blue-600">{companyName}</span>
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="border border-blue-100 bg-blue-50/30">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      readOnly
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      placeholder="John Doe"
                      required
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      readOnly
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="john@example.com"
                      required
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+1 (555) 123-4567"
                      required
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium">
                      Current Location *
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      placeholder="San Francisco, CA"
                      required
                      className="bg-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}

            {/* Cover Letter */}

            {/* Processing Fee Notice */}
            <Card className="border border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-orange-900 mb-2">
                      Processing Fee Required
                    </h4>
                    <p className="text-sm text-orange-800 mb-3">
                      A processing fee of{" "}
                      <span className="font-bold">${processingFee}</span> is
                      required to review your application. We already have your
                      CV on file and will rewrite it before presenting it to the
                      employer to ensure the best possible fit. This fee helps
                      us maintain high-quality candidate screening and covers
                      administrative costs. If we are unable to match you with a
                      suitable employer, the processing fee is fully refundable.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agreements */}
            <div className="space-y-4">
              <Separator />
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      handleInputChange("agreeToTerms", checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="agreeToTerms"
                    className="text-sm leading-relaxed"
                  >
                    I agree to the terms and conditions and privacy policy. I
                    understand that my information will be shared with{" "}
                    {companyName} for the purpose of this job application.
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToProcessingFee"
                    checked={formData.agreeToProcessingFee}
                    onCheckedChange={(checked) =>
                      handleInputChange(
                        "agreeToProcessingFee",
                        checked as boolean
                      )
                    }
                  />
                  <Label
                    htmlFor="agreeToProcessingFee"
                    className="text-sm leading-relaxed"
                  >
                    I agree to pay the processing fee of ${processingFee} and
                    understand this fee is refundable if we are unable to match
                    you.
                  </Label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <SuccessModal
        returnedJobId={returnedJobId}
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        jobTitle={jobTitle}
        companyName={companyName}
        processingFee={processingFee}
      />
    </>
  );
};

export default ApplyModal;
