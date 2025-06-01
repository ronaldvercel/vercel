"use client";
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import Image from "next/image";

interface PaymentMethodCardProps {
  method: string;
  id: string;
  icon: string;
}

const PaymentMethodCard = ({ method, id, icon }: PaymentMethodCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60 hover:shadow-md hover:border-slate-300/60 transition-all duration-300 backdrop-blur-sm">
      {/* Header */}
      <div className="text-center mb-5">
        <div className="text-2xl mb-3 transform group-hover:scale-110 transition-transform duration-200">
          <Image alt={`${method} logo`} height={50} width={50} src={icon} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 leading-tight">
          {method}
        </h3>
      </div>

      {/* Payment ID Section */}
      <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Payment ID
            </label>
            <p className="font-mono text-sm text-slate-900 break-all leading-relaxed">
              {id}
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="flex-shrink-0 p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all duration-200 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 group-hover:bg-blue-600 group-hover:shadow-sm"
            title="Copy to clipboard"
            aria-label={`Copy ${method} payment ID`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Copied Feedback */}
      {copied && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-emerald-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg">
            <div className="flex items-center gap-1.5">
              <Check size={12} />
              <span>Copied!</span>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-emerald-600"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodCard;
