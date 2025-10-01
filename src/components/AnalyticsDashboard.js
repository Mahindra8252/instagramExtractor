import React from "react";
import { calculateMetrics, formatNumber } from "../utils/analyticsCalculations";
import AnalyticsCard from "@/components/ui/AnalyticsCard";
import {
  Activity,
  Bot,
  GitGraph,
  Heart,
  MessageCircleCode,
  Smile,
  TrendingUp,
} from "lucide-react";
import MetricsSection from "./ui/MetricSection";

const AnalyticsDashboard = ({
  analytics,
  enhancedPosts = [],
  username,
  profile,
}) => {
  // Validate input data
  if (
    !enhancedPosts ||
    !Array.isArray(enhancedPosts) ||
    enhancedPosts.length === 0
  ) {
    console.log("ℹAnalyticsDashboard: No analysed posts data available");
    return null;
  }

  const metrics = calculateMetrics({ enhancedPosts, profile });

  return (
    <div className="mb-8 p-8 w-full">
      <div className="flex items-center space-x-3 mb-6 w-full ">
        <h2 className="text-4xl font-semibold text-black flex flex-row gap-[5px] justify-center items-center w-full">
          <span className="text-textPurple">{username}&apos;s </span> profile
          analysis
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard
          icon={TrendingUp}
          title="Engagement Rate"
          value={formatNumber(metrics.totalEngagement) + "%"}
          description="Likes + Comments"
        />

        <AnalyticsCard
          icon={Heart}
          title="Avg Likes"
          value={formatNumber(metrics.avgLikes)}
          description="Per post"
        />

        <AnalyticsCard
          icon={MessageCircleCode}
          title="Avg Comments"
          value={formatNumber(metrics.avgComments)}
          description="Per post"
        />

        <AnalyticsCard
          icon={Bot}
          title="Posts Analyzed"
          value={enhancedPosts.length}
          description="Posts processed"
        />
      </div>

      <MetricsSection metrics={metrics} enhancedPosts={enhancedPosts} />

      {metrics.allMoods.length > 0 && (
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <div className="rounded-3xl border-2 border-dashed border-textPurple p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple/30 to-textPurple/20 flex items-center justify-center text-2xl border border-textPurple/30">
                <Smile className="text-textPurple" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">
                  Overall Content Mood
                </h3>
                <p className="text-sm text-texts">
                  Emotional tone across all posts
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {[...new Set(metrics.allMoods)].map((mood, index) => (
                <span
                  key={`${mood}-${index}`}
                  className="group relative bg-gradient-to-r from-yellow/80 to-yellow/60 text-textp px-5 py-2.5 rounded-full text-sm font-semibold border border-yellow/40 hover:scale-105 hover:shadow-medium transition-all duration-300 hover:from-yellow hover:to-yellow/80"
                >
                  <span className="relative z-10">{mood}</span>
                  <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </span>
              ))}
            </div>

            {metrics.allMoods.length > 5 && (
              <div className="mt-4 pt-4 border-t border-textPurple/20">
                <p className="text-xs text-texts text-center">
                  <span className="font-semibold text-textPurple">
                    {[...new Set(metrics.allMoods)].length}
                  </span>{" "}
                  unique mood
                  {[...new Set(metrics.allMoods)].length !== 1 ? "s" : ""}{" "}
                  detected
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
