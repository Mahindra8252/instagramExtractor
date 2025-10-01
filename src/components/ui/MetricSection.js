"use state";
import React, { useState } from "react";
import { Sparkles, Star, Palette } from "lucide-react";

function MetricCard({ icon: Icon, title, children }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-gradient-to-br from-cardbg to-s rounded-3xl p-6 border border-border-light shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-1 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple/3 via-yellow/3 to-purple/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Glassmorphism floating orb */}
      <div
        className={`absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-purple/15 to-yellow/15 rounded-full blur-2xl transition-all duration-700 ${
          isHovered ? "scale-125 opacity-30" : "scale-100 opacity-15"
        }`}
      />

      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-6">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br from-textPurple via-textPurple to-textPurple flex items-center justify-center shadow-sm transform transition-all duration-500 ${
              isHovered ? "scale-110 rotate-3" : "scale-100 rotate-0"
            }`}
          >
            <Icon className="w-5 h-5 text-light" strokeWidth={2.5} />
          </div>
          <h3 className="text-lg font-bold text-textp transition-colors duration-300 group-hover:text-textPurple">
            {title}
          </h3>
        </div>

        <div className="space-y-4">{children}</div>

      </div>
    </div>
  );
}

function MetricItem({ label, count, total, color = "purple" }) {
  const percentage = (count / total) * 100;

  return (
    <div className="flex items-center justify-between group/item">
      <span className="text-texts font-medium capitalize transition-colors duration-300 group-hover/item:text-textp">
        {label}
      </span>
      <div className="flex items-center space-x-3">
        <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              color === "purple"
                ? "bg-gradient-to-r from-purple to-textPurple"
                : "bg-gradient-to-r from-yellow to-purple"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm font-semibold text-textPurple min-w-[2rem] text-right">
          {count}
        </span>
      </div>
    </div>
  );
}

function ColorMetricItem({ color: themeColor, count }) {
  let displayColor = themeColor.toLowerCase();
  // console.log(displayColor);

  return (
    <div className="flex items-center justify-between group/item">
      <div className="flex items-center space-x-3">
        <div
          className={`w-5 h-5 rounded-lg border-2 border-border-light shadow-sm transition-transform duration-300 group-hover/item:scale-110`}
          style={{ backgroundColor: displayColor }}
        />
        <span className="text-texts font-medium capitalize transition-colors duration-300 group-hover/item:text-textp">
          {themeColor}
        </span>
      </div>
      <span className="text-sm font-semibold text-textPurple">{count}</span>
    </div>
  );
}

function MetricsSection({ metrics, enhancedPosts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MetricCard icon={Sparkles} title="Content Vibes">
        {metrics.topVibes.map(({ vibe, count }) => (
          <MetricItem
            key={vibe}
            label={vibe}
            count={count}
            total={enhancedPosts.length}
            color="purple"
          />
        ))}
      </MetricCard>

      <MetricCard icon={Star} title="Quality Analysis">
        {metrics.topQualities.map(({ quality, count }) => (
          <MetricItem
            key={quality}
            label={quality}
            count={count}
            total={enhancedPosts.length}
            color="purple"
          />
        ))}
      </MetricCard>

      <MetricCard icon={Palette} title="Color Trends">
        {metrics.topColors.map(({ color, count }) => (
          <ColorMetricItem key={color} color={color} count={count} />
        ))}
      </MetricCard>
    </div>
  );
}

export default MetricsSection;
