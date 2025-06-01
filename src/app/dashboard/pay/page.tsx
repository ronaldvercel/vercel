import React from "react";
import PaymentMethodCard from "@/components/paymentmethodcard";
import PaymentForm from "@/components/paymentform";
import { getPaymentMethods } from "@/app/actions";
import { auth } from "@/app/auth";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Index = async ({ searchParams }: { searchParams: SearchParams }) => {
  const res = await searchParams;
  const { companyName, jobTitle, processingFee, jobId } = res;
  const methods = await getPaymentMethods();
  const user = await auth();

  const paymentMethods = [
    { method: "CashApp", id: `${methods.cashapp}`, icon: "/cashapp.png" },
    { method: "Zelle", id: `${methods.zelle}`, icon: "/zelle-logo.png" },
    { method: "Apple Pay", id: `${methods.applepay}`, icon: "/apple-pay.jpg" },
    { method: "Venmo", id: `${methods.venmo}`, icon: "/venmo.png" },
  ];

  console.log({ jobTitle, companyName, processingFee, jobId });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <header className="text-center mb-12 lg:mb-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-4 tracking-tight leading-tight">
              Complete Your Payment
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed font-light">
              Secure and streamlined payment processing for your application
            </p>

            {/* Job Details Card */}
            <div className="inline-block bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200/60 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-2 h-16 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                <div className="text-left">
                  <div className="flex items-center mb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Position Details
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3 leading-tight">
                    {jobTitle}
                  </h2>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-slate-500 font-medium">
                      Application Fee:
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-blue-600">
                      ${processingFee}.00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Payment Methods Section */}
        <section className="mb-12 lg:mb-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
                Select Payment Method
              </h2>
              <p className="text-slate-600 text-base md:text-lg font-light max-w-2xl mx-auto">
                Choose your preferred payment platform and copy the details
                below
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
              {paymentMethods.map((method, index) => (
                <PaymentMethodCard
                  key={index}
                  method={method.method}
                  id={method.id}
                  icon={method.icon}
                />
              ))}
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-3 bg-blue-50/80 border border-blue-100 rounded-xl backdrop-blur-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-blue-700 font-medium">
                  Click the copy button to easily copy payment details
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Form Section */}
        <section className="mb-12">
          <PaymentForm
            email={user?.user?.email as string}
            id={jobId as string}
          />
        </section>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-slate-200/60">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <p className="text-slate-700 font-medium text-sm md:text-base">
                Your payment information is secure and protected
              </p>
            </div>
            <p className="text-slate-500 text-sm md:text-base">
              Need assistance? Contact our support team at{" "}
              <a
                href="mailto:support@paypalace.com"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 underline decoration-blue-200 hover:decoration-blue-300"
              >
                support@paypalace.com
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
