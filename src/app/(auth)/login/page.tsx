import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth, signIn } from "@/app/auth";
import Logo from "@/components/Logo";
import Link from "next/link";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const profile = await auth();
  if (profile) {
    redirect("/dashboard");
  }
  console.log(process.env.AUTH_SECRET);
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full  animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-300/20 rounded-full animate-float delay-1000"></div>
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

        {/* Sign-in card */}
        <Card className=" bg-white/95 border-0 shadow-2xl animate-scale-in">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to access exclusive job opportunities
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Google Sign-in Button */}
            <Button
              variant="outline"
              className="w-full h-12 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-primary-300 transition-all duration-300 group"
            >
              <div className="flex items-center justify-center gap-3">
                <svg
                  className="w-5 h-5 transition-transform group-hover:scale-110"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <form
                  action={async () => {
                    "use server";
                    await signIn("google", {
                      redirectTo: "/dashboard",
                    });
                  }}
                >
                  <button
                    type="submit"
                    className="font-medium cursor-pointer text-gray-700"
                  >
                    Continue with Google
                  </button>
                </form>
              </div>
            </Button>

            {/* Security notice */}
            <div className="text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                By signing in, you agree to our secure authentication process.
                Your data is protected and never shared with third parties.
              </p>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Secure
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-500"></div>
                Verified
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-1000"></div>
                Trusted
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional info */}
        <div className="text-center mt-6 animate-fade-in delay-300">
          <p className="text-sm text-gray-600">
            Do not have access?
            <Link
              href="/"
              className="ml-1 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300"
            >
              Request your token
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
