import React from "react";
import { Key, Users, Check } from "lucide-react";

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: Key,
      title: "Get Your Token",
      description:
        "Request secure access through our verification process. We ensure only qualified professionals gain entry.",
    },
    {
      icon: Users,
      title: "Browse Exclusive Jobs",
      description:
        "Access curated remote positions from 17 verified U.S. companies with competitive salaries.",
    },
    {
      icon: Check,
      title: "Get Hired",
      description:
        "Apply directly through our platform and connect with hiring managers at top-tier companies.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-inter font-bold text-4xl lg:text-5xl text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with VercelJobs in three simple steps
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center group animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <step.icon className="h-10 w-10 text-primary-600 transition-transform group-hover:scale-110" />
                </div>

                {/* Animated connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-primary-200 -translate-x-8">
                    <div className="w-0 h-full bg-gradient-to-r from-primary-500 to-primary-600 animate-pulse"></div>
                  </div>
                )}

                {/* Step number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold transform group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>
              </div>

              <h3 className="font-inter font-semibold text-xl text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
