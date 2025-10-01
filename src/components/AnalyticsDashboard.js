import React from "react";
import { calculateMetrics, formatNumber } from "../utils/analyticsCalculations";
import AnalyticsCard from "@/components/ui/AnalyticsCard";
import {
  Bot,
  Heart,
  MessageCircleCode,
  Smile,
  TrendingUp,
  BarChart3,
  Sparkles,
  Clock,
} from "lucide-react";
import MetricsSection from "./ui/MetricSection";

const AnalyticsDashboard = ({ analytics, enhancedPosts = [], username, profile }) => {
  if (!enhancedPosts || !Array.isArray(enhancedPosts) || enhancedPosts.length === 0) {
    console.log("ℹAnalyticsDashboard: No analysed posts data available");
    return null;
  }

  const metrics = calculateMetrics({ enhancedPosts, profile });

  return (
    <div className="mb-8 p-8 w-full">
      {/* Header Section with Instagram Gradient */}
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] via-[#8134AF] to-[#515BD4] rounded-3xl blur-2xl opacity-40 -z-10"></div>

        <div className="relative bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-[#DD2A7B] to-[#8134AF] rounded-2xl shadow-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold flex items-center gap-3">
                  <span className="bg-gradient-to-r from-[#F58529] via-[#DD2A7B] via-[#8134AF] to-[#515BD4] bg-clip-text text-transparent">
                    @{username}
                  </span>
                  <span className="text-gray-100">Analytics</span>
                </h2>
                <p className="text-gray-200 text-sm mt-1 font-medium">
                  Comprehensive profile performance insights
                </p>
              </div>
            </div>

            {/* Badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F58529]/20 to-[#515BD4]/20 rounded-full border border-white/30 shadow-lg">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">
                AI-Powered Analysis
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard
          icon={TrendingUp}
          title="Engagement Rate"
          value={formatNumber(metrics.totalEngagement) + "%"}
          description="Likes + Comments"
          gradient="from-[#F58529] to-[#DD2A7B]"
        />

        <AnalyticsCard
          icon={Heart}
          title="Avg Likes"
          value={formatNumber(metrics.avgLikes)}
          description="Per post"
          gradient="from-[#DD2A7B] to-[#8134AF]"
        />

        <AnalyticsCard
          icon={MessageCircleCode}
          title="Avg Comments"
          value={formatNumber(metrics.avgComments)}
          description="Per post"
          gradient="from-[#8134AF] to-[#515BD4]"
        />

        <AnalyticsCard
          icon={Bot}
          title="Posts Analyzed"
          value={enhancedPosts.length}
          description="Posts processed"
          gradient="from-[#F58529] to-[#515BD4]"
        />
      </div>

      {/* Metrics Section */}
      <MetricsSection metrics={metrics} enhancedPosts={enhancedPosts} />

      {/* Mood Analysis */}
      {metrics.allMoods.length > 0 && (
        <div className="mt-8 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] rounded-3xl blur-2xl opacity-20"></div>

          <div className="relative bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
            {/* Header */}
            <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#DD2A7B] to-[#8134AF] rounded-2xl blur-xl opacity-60"></div>
                  <div className="relative p-4 bg-gradient-to-br from-[#DD2A7B] to-[#8134AF] rounded-2xl shadow-lg">
                    <Smile className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Content Mood Analysis
                  </h3>
                  <p className="text-gray-200 text-sm mt-1">
                    Emotional tone detected across all posts
                  </p>
                </div>
              </div>

              <div className="px-4 py-2 bg-gradient-to-r from-[#F58529]/20 to-[#515BD4]/20 rounded-full border border-white/30">
                <span className="text-sm font-bold text-white">
                  {[...new Set(metrics.allMoods)].length} unique mood
                  {[...new Set(metrics.allMoods)].length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Mood Tags */}
            <div className="flex flex-wrap gap-3">
              {[...new Set(metrics.allMoods)].map((mood, index) => {
                const gradients = [
                  "from-[#F58529] to-[#DD2A7B]",
                  "from-[#DD2A7B] to-[#8134AF]",
                  "from-[#8134AF] to-[#515BD4]",
                  "from-[#F58529] to-[#515BD4]",
                ];
                const gradient = gradients[index % gradients.length];

                return (
                  <div key={`${mood}-${index}`} className="group relative">
                    <div
                      className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-xl blur opacity-0 group-hover:opacity-60 transition`}
                    ></div>
                    <div
                      className={`relative bg-gradient-to-r ${gradient} px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition`}
                    >
                      <span className="text-white font-semibold text-sm">
                        {mood}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {metrics.allMoods.length > 5 && (
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-[#F58529] rounded-full animate-pulse"></div>
                  <p className="text-sm text-gray-200">
                    Rich emotional diversity detected in content
                  </p>
                  <div className="w-2 h-2 bg-[#DD2A7B] rounded-full animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
