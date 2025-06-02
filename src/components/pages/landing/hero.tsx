import React from "react";
import { Button } from "@/components/ui/button";
import { Shield, Users, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100 animate-pulse"></div>

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200/30 rounded-full blur-xl animate-bounce delay-1000"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-primary-300/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary-400/25 rounded-full blur-lg animate-bounce delay-300"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-inter font-bold text-5xl lg:text-7xl text-gray-900 mb-6 animate-fade-in">
            Exclusive U.S. Jobs for the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800 animate-pulse">
              Best Talent
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300">
            Access premium remote opportunities from{" "}
            <span className="font-semibold text-primary-700">
              20 verified U.S. companies
            </span>
            . Our secure token system ensures you connect with only the
            highest-quality positions.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in delay-500">
            <Link className="block w-full" href={"/validate"}>
              <Button
                size="lg"
                className="group w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-10 py-5 text-lg font-medium rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
              >
                Validate Token
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link href={"/login"} className="block w-full">
              <Button
                size="lg"
                variant="outline"
                className="group w-full border-2 border-primary-600 text-primary-600 hover:bg-primary-50 hover:border-primary-700 px-10 py-5 text-lg font-medium rounded-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                Login
                <Shield className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
              </Button>
            </Link>
          </div>

          {/* Enhanced trust indicators with animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in delay-700">
            <div className="flex flex-col items-center space-y-3 group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Shield className="h-8 w-8 text-primary-600 transition-transform group-hover:scale-110" />
              </div>
              <span className="font-semibold text-gray-700 transition-colors group-hover:text-primary-600">
                Verified Companies
              </span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="flex flex-col items-center space-y-3 group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Users className="h-8 w-8 text-primary-600 transition-transform group-hover:scale-110" />
              </div>
              <span className="font-semibold text-gray-700 transition-colors group-hover:text-primary-600">
                Exclusive Access
              </span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="flex flex-col items-center space-y-3 group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Briefcase className="h-8 w-8 text-primary-600 transition-transform group-hover:scale-110" />
              </div>
              <span className="font-semibold text-gray-700 transition-colors group-hover:text-primary-600">
                Premium Positions
              </span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
