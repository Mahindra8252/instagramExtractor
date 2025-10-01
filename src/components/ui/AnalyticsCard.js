"use client";
import React, { useState } from "react";

function AnalyticsCard({ icon: Icon, title, value, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-3xl p-8 border-2 border-white/30 shadow-2xl hover:shadow-[0_20px_60px_rgba(168,85,247,0.4)] transition-all duration-700 hover:scale-[1.08] overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Multiple animated shimmer effects */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1200 ${
          isHovered ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'
        }`}
        style={{ width: '50%' }}
      />
      <div 
        className={`absolute inset-0 bg-gradient-to-l from-transparent via-white/10 to-transparent transition-all duration-1500 delay-200 ${
          isHovered ? '-translate-x-full opacity-100' : 'translate-x-full opacity-0'
        }`}
        style={{ width: '40%' }}
      />
      
      {/* Multiple decorative circles with animation */}
      <div className={`absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-3xl transition-all duration-700 ${isHovered ? 'scale-150' : 'scale-100'}`} />
      <div className={`absolute top-1/2 right-0 w-24 h-24 bg-yellow-300/10 rounded-full blur-2xl transition-all duration-1000 ${isHovered ? 'scale-125 translate-x-4' : 'scale-100'}`} />
      <div className={`absolute -bottom-6 -left-6 w-28 h-28 bg-pink-300/10 rounded-full blur-2xl transition-all duration-900 ${isHovered ? 'scale-125' : 'scale-100'}`} />
      
      {/* Floating particles */}
      <div className={`absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full transition-all duration-1000 ${isHovered ? 'translate-y-[-20px] opacity-0' : 'translate-y-0 opacity-100'}`} />
      <div className={`absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white/30 rounded-full transition-all duration-1200 delay-100 ${isHovered ? 'translate-y-[-25px] opacity-0' : 'translate-y-0 opacity-100'}`} />
      <div className={`absolute bottom-1/3 left-1/2 w-2.5 h-2.5 bg-white/35 rounded-full transition-all duration-1100 delay-200 ${isHovered ? 'translate-y-[-30px] opacity-0' : 'translate-y-0 opacity-100'}`} />
      
      <div className="relative z-10">
        {/* Icon and Title Section */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div
              className={`relative w-20 h-20 rounded-2xl bg-white/25 backdrop-blur-md border-2 border-white/40 flex items-center justify-center transform transition-all duration-700 shadow-xl ${
                isHovered ? "scale-110 rotate-12 shadow-[0_10px_30px_rgba(255,255,255,0.3)]" : "scale-100 rotate-0"
              }`}
            >
              {/* Pulsing ring effect */}
              <div className={`absolute inset-0 rounded-2xl border-2 border-white/60 transition-all duration-1000 ${isHovered ? 'scale-125 opacity-0' : 'scale-100 opacity-100'}`} />
              <Icon className="relative w-10 h-10 text-white drop-shadow-lg" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white/90 uppercase tracking-widest transition-all duration-300 group-hover:text-white group-hover:tracking-[0.2em]">
                {title}
              </h3>
              <div className={`h-0.5 bg-white/60 rounded-full transition-all duration-700 mt-2 ${isHovered ? 'w-full' : 'w-0'}`} />
            </div>
          </div>
          
          {/* Sparkle indicator */}
          <div className={`w-3 h-3 rounded-full bg-white transition-all duration-500 ${isHovered ? 'scale-150 opacity-100' : 'scale-0 opacity-0'}`} />
        </div>
        
        {/* Value Display with enhanced effects */}
        <div className="relative mb-6">
          <div className={`text-7xl font-black text-white mb-2 tracking-tight transition-all duration-500 origin-left drop-shadow-[0_4px_20px_rgba(255,255,255,0.3)] ${isHovered ? 'scale-110 tracking-tighter' : 'scale-100'}`}>
            {value}
          </div>
          
          {/* Animated gradient overlay on value */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 transition-all duration-1000 blur-sm ${
              isHovered ? "translate-x-full" : "-translate-x-full"
            }`}
          />
          
          {/* Glow effect under number */}
          <div className={`absolute -bottom-2 left-0 right-0 h-8 bg-white/20 blur-2xl rounded-full transition-all duration-700 ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-50'}`} />
        </div>
        
        {/* Description with enhanced styling */}
        <div className="relative">
          <p className={`text-base text-white/95 font-semibold leading-relaxed transition-all duration-500 ${isHovered ? 'text-white translate-x-1' : 'text-white/95'}`}>
            {description}
          </p>
          
          {/* Underline animation */}
          <div className={`mt-3 h-1 bg-gradient-to-r from-white via-yellow-200 to-white rounded-full transition-all duration-700 shadow-lg ${isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
        </div>
        
        {/* Stats indicator dots */}
        <div className="flex gap-2 mt-6">
          <div className={`w-2 h-2 rounded-full bg-white/60 transition-all duration-300 ${isHovered ? 'bg-white scale-125' : ''}`} />
          <div className={`w-2 h-2 rounded-full bg-white/60 transition-all duration-300 delay-75 ${isHovered ? 'bg-white scale-125' : ''}`} />
          <div className={`w-2 h-2 rounded-full bg-white/60 transition-all duration-300 delay-150 ${isHovered ? 'bg-white scale-125' : ''}`} />
        </div>
      </div>
      
      {/* Enhanced corner accents */}
      <div className={`absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-white/15 to-transparent rounded-br-full transition-all duration-700 ${isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-0'}`} />
      <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/15 to-transparent rounded-tl-full transition-all duration-700 ${isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-0'}`} />
      
      {/* Multiple accent lines */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-white/30 via-white/60 to-white/30 transition-all duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Radial gradient overlay */}
      <div className={`absolute inset-0 bg-radial-gradient from-white/0 via-white/0 to-white/5 transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
}

export default AnalyticsCard;