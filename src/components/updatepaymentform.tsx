"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updatePaymentMethod } from "@/app/actions";
import { toast } from "react-hot-toast";

interface PaymentMethod {
  _id: string;
  cashapp: string;
  zelle: string;
  applepay: string;
  venmo: string;
}

const PaymentMethodForm = ({ data }: { data: PaymentMethod }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );

  const [formData, setFormData] = useState({
    cashapp: "",
    zelle: "",
    applepay: "",
    venmo: "",
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Check if any field has changed from original
    // const originalValue = paymentMethod?.[field] || "";
    const hasAnyChanges = Object.keys(formData).some((key) => {
      const currentValue =
        key === field ? value : formData[key as keyof typeof formData];
      const original = paymentMethod?.[key as keyof typeof formData] || "";
      return currentValue !== original;
    });

    setHasChanges(hasAnyChanges);
  };

  // ✅ Properly initialize state only once
  useEffect(() => {
    setPaymentMethod(data);
    setFormData({
      cashapp: data.cashapp || "",
      zelle: data.zelle || "",
      applepay: data.applepay || "",
      venmo: data.venmo || "",
    });
    setIsLoading(false);
  }, [data]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentMethod) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Call your update function here
      const updatedData = (await updatePaymentMethod({
        id: paymentMethod._id,
        ...formData,
      })) as PaymentMethod;

      setPaymentMethod(updatedData);
      setHasChanges(false);

      toast.success("Payment methods updated successfully");
    } catch (error) {
      console.error("Error updating payment methods:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-black">Loading payment methods...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 flex items-center justify-center">
      <Card className="w-full max-w-md border-2 border-black bg-white">
        <CardHeader className="text-center border-b border-black">
          <CardTitle className="text-2xl font-bold text-black">
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="cashapp" className="text-black font-medium">
                  CashApp
                </Label>
                <Input
                  id="cashapp"
                  type="text"
                  value={formData.cashapp}
                  onChange={(e) => handleInputChange("cashapp", e.target.value)}
                  placeholder="Enter CashApp details"
                  className="mt-1 border-2 border-black bg-white text-black placeholder-gray-500 focus:border-gray-600"
                />
              </div>

              <div>
                <Label htmlFor="zelle" className="text-black font-medium">
                  Zelle
                </Label>
                <Input
                  id="zelle"
                  type="text"
                  value={formData.zelle}
                  onChange={(e) => handleInputChange("zelle", e.target.value)}
                  placeholder="Enter Zelle details"
                  className="mt-1 border-2 border-black bg-white text-black placeholder-gray-500 focus:border-gray-600"
                />
              </div>

              <div>
                <Label htmlFor="applepay" className="text-black font-medium">
                  Apple Pay
                </Label>
                <Input
                  id="applepay"
                  type="text"
                  value={formData.applepay}
                  onChange={(e) =>
                    handleInputChange("applepay", e.target.value)
                  }
                  placeholder="Enter Apple Pay details"
                  className="mt-1 border-2 border-black bg-white text-black placeholder-gray-500 focus:border-gray-600"
                />
              </div>

              <div>
                <Label htmlFor="venmo" className="text-black font-medium">
                  Venmo
                </Label>
                <Input
                  id="venmo"
                  type="text"
                  value={formData.venmo}
                  onChange={(e) => handleInputChange("venmo", e.target.value)}
                  placeholder="Enter Venmo details"
                  className="mt-1 border-2 border-black bg-white text-black placeholder-gray-500 focus:border-gray-600"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={!hasChanges || isSubmitting}
              className={`w-full border-2 border-black font-bold py-3 transition-colors ${
                hasChanges && !isSubmitting
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-500 text-gray-400 border-gray-300 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Updating..." : "Update Payment Methods"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethodForm;
