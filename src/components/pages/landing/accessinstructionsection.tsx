import React from "react";
import { Button } from "@/components/ui/button";
import { Key, Users, Check } from "lucide-react";

const AccessInstructionsSection: React.FC = () => {
  const steps = [
    {
      icon: Users,
      title: "Submit Application",
      description:
        "Fill out our qualification form with your professional background and experience.",
    },
    {
      icon: Check,
      title: "Verification Process",
      description:
        "Our team reviews your application and verifies your credentials within 24-48 hours.",
    },
    {
      icon: Key,
      title: "Receive Token",
      description:
        "Once approved, you'll receive your secure access token via email.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-inter font-bold text-4xl text-gray-900 mb-4">
            How to Get Access
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Follow these simple steps to join our exclusive community
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-start space-x-6 pb-8">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-inter font-semibold text-xl text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 text-lg font-medium rounded-xl"
          >
            Request Access Token
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AccessInstructionsSection;
