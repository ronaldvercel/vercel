"use client";
import React, { useState } from "react";
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
import toast from "react-hot-toast";

import {
  Upload,
  CheckCircle,
  DollarSign,
  Hash,
  CreditCard,
} from "lucide-react";
import { submitPaymentAction } from "@/app/actions";

const PaymentForm = ({ id, email }: { id: string; email: string }) => {
  console.log("Payment Form ID:", id);
  const [formData, setFormData] = useState({
    jobId: id,
    amount: "",
    paymentMethod: "",
    screenshot: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, screenshot: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.jobId ||
      !formData.amount ||
      !formData.paymentMethod ||
      !formData.screenshot
    ) {
      toast.error("Please fill in all fields and upload a payment screenshot");
      return;
    }
    try {
      setLoading(true);
      const res = await submitPaymentAction({
        email,
        method: formData.paymentMethod as
          | "cashapp"
          | "zelle"
          | "applepay"
          | "venmo",
        amount: Number(formData.amount),
        jobId: formData.jobId,
        screenshot: formData.screenshot,
      });

      if (res.success) {
        toast.success("Payment confirmation submitted successfully!");
        setFormData({
          jobId: "",
          amount: "",
          paymentMethod: "",
          screenshot: null,
        });
      } else {
        toast.error(res.message || "Failed to submit payment");
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred");
    }
    setLoading(false);
  };
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-10 shadow-sm border border-slate-200/60 backdrop-blur-sm">
        {/* Form Header */}
        <header className="text-center mb-8 lg:mb-10">
          <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3 leading-tight">
            Submit Payment Confirmation
          </h3>
          <p className="text-slate-600 text-base md:text-lg font-light leading-relaxed">
            Please provide your payment details and upload verification
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Screenshot Upload Section */}
          <div className="space-y-3">
            <Label
              htmlFor="screenshot"
              className="text-sm font-semibold text-slate-900 flex items-center gap-2"
            >
              <Upload size={16} />
              Payment Screenshot *
            </Label>
            <div className="relative">
              <Input
                id="screenshot"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="screenshot"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer bg-slate-50/50 hover:bg-slate-100/50 hover:border-slate-400 transition-all duration-300 group"
              >
                {formData.screenshot ? (
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-3 bg-emerald-100 rounded-full">
                        <CheckCircle size={32} className="text-emerald-600" />
                      </div>
                    </div>
                    <p className="font-semibold text-slate-900 mb-1">
                      {formData.screenshot.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      Click to change file
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-4 bg-slate-100 rounded-full group-hover:bg-slate-200 transition-colors duration-200">
                        <Upload size={32} className="text-slate-400" />
                      </div>
                    </div>
                    <div>
                      <p className="text-base font-semibold text-slate-900 mb-1">
                        Click to upload screenshot
                      </p>
                      <p className="text-sm text-slate-500">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Job ID Field */}
            <div className="space-y-3">
              <Label
                htmlFor="jobId"
                className="text-sm font-semibold text-slate-900 flex items-center gap-2"
              >
                <Hash size={16} />
                Job ID *
              </Label>
              <div className="relative">
                <Input
                  id="jobId"
                  readOnly
                  type="text"
                  placeholder="e.g., RA-2025-001"
                  value={formData.jobId}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, jobId: e.target.value }))
                  }
                  className="h-12 pl-4 border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl text-base bg-white"
                />
              </div>
            </div>

            {/* Amount Field */}
            <div className="space-y-3">
              <Label
                htmlFor="amount"
                className="text-sm font-semibold text-slate-900 flex items-center gap-2"
              >
                <DollarSign size={16} />
                Amount Paid *
              </Label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-semibold text-base">
                  $
                </div>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="30.00"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, amount: e.target.value }))
                  }
                  className="h-12 pl-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl text-base bg-white"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Field */}
          <div className="space-y-3">
            <Label
              htmlFor="paymentMethod"
              className="text-sm font-semibold text-slate-900 flex items-center gap-2"
            >
              <CreditCard size={16} />
              Payment Method Used *
            </Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, paymentMethod: value }))
              }
            >
              <SelectTrigger className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl text-base bg-white">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-slate-200 shadow-xl rounded-xl z-50">
                <SelectItem
                  value="cashapp"
                  className="cursor-pointer hover:bg-slate-50"
                >
                  CashApp
                </SelectItem>
                <SelectItem
                  value="zelle"
                  className="cursor-pointer hover:bg-slate-50"
                >
                  Zelle
                </SelectItem>
                <SelectItem
                  value="applepay"
                  className="cursor-pointer hover:bg-slate-50"
                >
                  Apple Pay
                </SelectItem>
                <SelectItem
                  value="venmo"
                  className="cursor-pointer hover:bg-slate-50"
                >
                  Venmo
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all duration-200 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 text-base shadow-sm hover:shadow-md"
            >
              {loading ? "Submitting..." : "Submit Payment Confirmation"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
