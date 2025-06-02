import React from "react";

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Ally Johnson",
      role: "Senior Developer",
      company: "TechCorp",
      image:
        "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1522529599102-193c0d76b5b6%3Ffm%3Djpg%26q%3D60%26w%3D3000%26ixlib%3Drb-4.1.0%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBwZXJzb258ZW58MHx8MHx8fDA%253D&sp=1748861834T9db547a5dec6e28a43679b14d66cb65faaf9153f404eadaec27ad2b2d5cf81a6",
      content:
        "VercelJobs connected me with my dream role at an amazing company. The process was seamless and the opportunities were exactly what I was looking for.",
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateLabs",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format",
      content:
        "The quality of companies and positions on VercelJobs is unmatched. Within 2 weeks, I had multiple offers from top-tier companies.",
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "DigitalEdge",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&auto=format",
      content:
        "I was skeptical about exclusive job platforms, but VercelJobs delivered. The companies are verified, and the salaries are competitive.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-inter font-bold text-4xl text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from professionals who found their perfect roles through
            VercelJobs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-inter font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>

              <blockquote className="text-gray-700 italic leading-relaxed">
                &quot;{testimonial.content}&quot;
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
