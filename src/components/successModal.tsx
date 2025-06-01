"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Heart, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  companyName: string;
  processingFee: string;
  returnedJobId?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  jobTitle,
  companyName,
  processingFee,
  returnedJobId,
}) => {
  const router = useRouter();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white border-0 shadow-2xl">
        <DialogHeader className="text-center space-y-4 pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl text-center font-bold text-gray-900">
            Application Submitted! 🎉
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold text-green-800 mb-2">
                Thank you for applying to
              </h3>
              <p className="text-lg font-bold text-green-900">{jobTitle}</p>
              <p className="text-green-700 text-sm">at {companyName}</p>
            </CardContent>
          </Card>

          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-sm">
                We are excited to review your application!
              </span>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">
                What happens next?
              </h4>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 text-blue-600" />
                  <span>
                    Complete your payment of $<strong>{processingFee}</strong>
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-left mt-0.5 text-blue-600" />
                  <span className="text-left">
                    Once payment is confirmed, we will begin reviewing your
                    application
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 text-blue-600" />
                  <span className="text-left">
                    Our team will reach out to you within 3-5 business days
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 text-blue-600" />
                  <span className="text-left">
                    The job status is considered unavailable and can not be
                    applied to by anyone until we have processed your
                    application
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs text-amber-800">
                <strong>Important:</strong> Please complete your payment to
                ensure your application is processed. You will receive payment
                instructions via email shortly.
              </p>
            </div>
          </div>

          <Button
            onClick={() => {
              onClose();
              router.push(
                `/dashboard/pay?jobTitle=${encodeURIComponent(
                  jobTitle
                )}&companyName=${encodeURIComponent(
                  companyName
                )}&processingFee=${encodeURIComponent(
                  processingFee
                )}&jobId=${encodeURIComponent(returnedJobId || "")}`
              );
            }}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3"
          >
            Got it, thanks! ✨
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
