"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/hooks/use-toast";
import Link from "next/link";
import Logo from "@/components/Logo";
import { getAndDeleteToken, registerUserByEmail } from "@/app/actions";
import { useRouter } from "next/navigation";

const AccessToken = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [accessToken, setAccessToken] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const handleTokenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken.trim()) {
      toast({
        title: "Error",
        description: "Please enter an access token",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const data = await getAndDeleteToken(accessToken); // Simulate token validation
    if (!data) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Invalid access token",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(false);
    toast({
      title: "Success",
      description: "Token validated successfully!",
      variant: "destructive",
    });
    setStep(2); // Move to the next step
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    const response = await registerUserByEmail(email);

    if (response.success === false) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: response.message,
      });
      return;
    }
    setIsLoading(false);
    toast({
      title: "Email Submitted",
      description: "Your email has been successfully submitted!",
    });
    router.push("/login");
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-300/20 rounded-full blur-3xl animate-float delay-1000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo and back link */}
        <div className="text-center mb-8 animate-fade-in">
          <Link
            href="/"
            className="inline-block mb-4 hover:scale-105 transition-transform duration-300"
          >
            <Logo size="lg" />
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-300 flex items-center justify-center gap-1"
          >
            ← Back to home
          </Link>
        </div>

        {/* Access Token Form */}
        <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-2xl animate-scale-in">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              {step === 1 ? "Enter Access Token" : "Submit Your Email"}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {step === 1
                ? "Please enter your access token to continue"
                : "Enter your email to complete the process"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 1 ? (
              <form onSubmit={handleTokenSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accessToken">Access Token</Label>
                  <Input
                    id="accessToken"
                    type="text"
                    placeholder="Enter your access token"
                    value={accessToken}
                    onChange={(e) => setAccessToken(e.target.value)}
                    className="h-12"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
                  disabled={isLoading}
                >
                  {isLoading ? "Validating..." : "Submit"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit Email"}
                </Button>
              </form>
            )}

            {/* Progress indicator */}
            <div className="flex items-center justify-center space-x-2 pt-4 border-t border-gray-100">
              <div
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  step >= 1 ? "bg-primary-600" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  step >= 2 ? "bg-primary-600" : "bg-gray-300"
                }`}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccessToken;
