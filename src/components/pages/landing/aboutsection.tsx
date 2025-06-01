import React from "react";
import { Shield, Users, Briefcase } from "lucide-react";

const AboutSection: React.FC = () => {
  const companyLogos = [
    "TechCorp",
    "InnovateLabs",
    "DataFlow",
    "CloudSync",
    "DevMaster",
    "CodeBase",
    "TechPro",
    "DigitalEdge",
    "SystemsPlus",
    "WebForce",
  ];

  const stats = [
    { number: "17", label: "Verified Companies" },
    { number: "95%", label: "Success Rate" },
    { number: "$120K+", label: "Average Salary" },
    { number: "24h", label: "Response Time" },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-inter font-bold text-4xl text-gray-900 mb-4">
            About VercelJobs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We partner with elite U.S. companies to bring you exclusive remote
            opportunities. Our rigorous verification process ensures both
            quality positions and qualified candidates.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-inter font-bold text-3xl text-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Company showcase */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="font-inter font-semibold text-2xl text-gray-900 text-center mb-8">
            Trusted by Leading Companies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {companyLogos.map((company, index) => (
              <div
                key={index}
                className="h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 font-medium hover:bg-gray-200 transition-colors"
              >
                {company}
              </div>
            ))}
          </div>
        </div>

        {/* Security emphasis */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="font-inter font-semibold text-xl text-gray-900 mb-3">
              Secure & Verified
            </h3>
            <p className="text-gray-600">
              All companies undergo strict verification. Your data is protected
              with enterprise-grade security.
            </p>
          </div>

          <div className="text-center">
            <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="font-inter font-semibold text-xl text-gray-900 mb-3">
              Exclusive Access
            </h3>
            <p className="text-gray-600">
              Token-based system ensures only qualified professionals access
              premium opportunities.
            </p>
          </div>

          <div className="text-center">
            <Briefcase className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="font-inter font-semibold text-xl text-gray-900 mb-3">
              Premium Positions
            </h3>
            <p className="text-gray-600">
              Hand-picked roles from top companies with competitive compensation
              and benefits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
