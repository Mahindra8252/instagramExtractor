"use client";
import React, { useState } from "react";

function AnalyticsCard({ icon: Icon, title, value, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-gradient-to-br from-cardbg to-s rounded-3xl p-6 border border-border-light shadow-soft hover:shadow-hard transition-all duration-500 hover:-translate-y-2 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-purple/5 to-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glassmorphism floating orb */}
      <div
        className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple/20 to-purple/20 rounded-full blur-3xl transition-all duration-700 ${
          isHovered ? "scale-150 opacity-40" : "scale-100 opacity-20"
        }`}
      />
      
      <div className="relative z-10">

        <div className="flex items-center space-x-4 mb-6">
          <div
            className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br from-textPurple via-textPurple to-textPurple flex items-center justify-center transform transition-all duration-500 ${
              isHovered ? "scale-110 rotate-6 shadow-hard" : "scale-100 rotate-0"
            }`}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple to-textPurple  opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
            <Icon className="relative w-7 h-7 text-light" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-texts uppercase tracking-wider mb-0.5 transition-colors duration-300 group-hover:text-textPurple">
              {title}
            </h3>
          </div>
        </div>
        
        <div className="relative mb-3">
          <div className="text-5xl font-black bg-gradient-to-r from-black via-gray-500 to-gray-900 bg-clip-text text-transparent animate-gradient mb-1 tracking-tight transition-all duration-300 group-hover:scale-105 origin-left">
            {value}
          </div>
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-light/30 to-transparent transform -skew-x-12 transition-all duration-1000 ${
              isHovered ? "translate-x-full" : "-translate-x-full"
            }`}
          />
        </div>
        
        <p className="text-sm text-texts font-medium leading-relaxed transition-all duration-300 group-hover:text-textp">
          {description}
        </p>
        
        <div className="mt-4 h-1 w-0 bg-gradient-to-r from-purple via-purple to-purple rounded-full group-hover:w-full transition-all duration-700" />
      </div>
      
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default AnalyticsCard;