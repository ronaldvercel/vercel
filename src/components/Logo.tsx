import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

const Logo: React.FC<LogoProps> = ({ size = "md", variant = "dark" }) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  };

  const textColor = variant === "light" ? "text-white" : "text-gray-900";
  const iconColor = variant === "light" ? "#FFFFFF" : "#3B82F6";

  return (
    <div className="flex items-center space-x-3">
      <div className={`${sizeClasses[size]} flex items-center`}>
        <svg
          viewBox="0 0 40 40"
          className={sizeClasses[size]}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* V-shaped briefcase icon */}
          <rect
            x="8"
            y="12"
            width="24"
            height="16"
            rx="2"
            stroke={iconColor}
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M14 12V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4"
            stroke={iconColor}
            strokeWidth="2"
            fill="none"
          />
          <path d="M8 20h24" stroke={iconColor} strokeWidth="2" />
          {/* Arrow pointing up for growth */}
          <path
            d="M20 22l-3 3m6-3l-3-3"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className={`font-inter font-bold text-xl ${textColor}`}>
        VercelJobs
      </span>
    </div>
  );
};

export default Logo;
