import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "How does the token system work?",
      answer:
        "Our token system ensures exclusive access to premium job opportunities. Once you're verified, you receive a unique token that grants access to our job board. This maintains quality for both candidates and employers.",
    },
    {
      question: "Are the jobs legitimate and verified?",
      answer:
        "Yes, all companies and positions are thoroughly vetted. We partner with only verified U.S. companies and validate every job posting. Each company undergoes a rigorous verification process before joining our platform.",
    },
    {
      question: "What information do you collect and how is it protected?",
      answer:
        "We collect only necessary professional information for verification. All data is encrypted and stored securely using enterprise-grade security measures. We never share your information without explicit consent.",
    },
    {
      question: "How long does the verification process take?",
      answer:
        "Our verification process typically takes 24-48 hours. We review your professional background, experience, and qualifications. You'll receive an email notification once your application is processed.",
    },
    {
      question: "What types of roles are available?",
      answer:
        "We feature remote positions across various fields including software engineering, product management, design, data science, marketing, and more. All roles are from verified U.S. companies with competitive compensation.",
    },
    {
      question: "Is there a cost to use VercelJobs?",
      answer:
        "Access to our platform is free for qualified professionals. There are no hidden fees or charges. Our revenue comes from partnerships with hiring companies, not from job seekers.",
    },
    {
      question: "Can I refer other professionals?",
      answer:
        "Yes, we have a referral program for existing members. You can invite qualified professionals to join our platform. Both you and your referral may be eligible for rewards when they successfully find a position.",
    },
    {
      question: "What happens after I apply to a job?",
      answer:
        "Once you apply, your application goes directly to the hiring company. You'll receive updates on your application status, and our team is available to assist throughout the interview process.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-inter font-bold text-4xl text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about VercelJobs
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-inter font-semibold text-gray-900 hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
