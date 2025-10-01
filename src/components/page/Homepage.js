"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { RefreshCw, Plus, Info } from "lucide-react";

import Header from "../ui/Header";
import SearchForm from "../ui/SearchForm";
import ErrorDisplay from "../ui/ErrorDisplay";
import ProfileCard from "../ui/ProfileCard";
import AnalyticsDashboard from "../AnalyticsDashboard";
import PostsGrid from "../ui/PostsGrid";
import RecentUsers from "../ui/RecentUsers";
import { handleSubmit } from "@/utils/startProcess";

export default function Homepage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [data, setData] = useState(null);
  const [finalResult, setFinalResult] = useState(null);
  const [error, setError] = useState("");
  const [fromCache, setFromCache] = useState(false);
  const [showRecentUsers, setShowRecentUsers] = useState(true);

  const handleUserSelect = (selectedUsername) => {
    setUsername(selectedUsername);
    setShowRecentUsers(false);
    analyzeUser(selectedUsername);
  };

  const analyzeUser = async (targetUsername = null) => {
    const usernameToAnalyze = targetUsername || username.trim();
    if (!usernameToAnalyze) {
      toast.error("Please enter a username");
      return;
    }

    setLoading(true);
    setError("");
    setFromCache(false);
    setShowRecentUsers(false);

    try {
      const dbResponse = await fetch(
        `/api/database?username=${encodeURIComponent(usernameToAnalyze)}`
      );
      const dbResult = await dbResponse.json();

      if (dbResult.success && dbResult.fromCache) {
        toast.success("Data loaded from cache!");
        setData(dbResult.data);
        setFinalResult(dbResult.data);
        setFromCache(true);
        setLoading(false);
        return;
      }

      await runAnalysisAndSave(usernameToAnalyze);
    } catch (error) {
      console.error("Error in analyzeUser:", error);
      setError("Failed to process request");
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    await analyzeUser();
  };

  const runAnalysisAndSave = async (targetUsername = null) => {
    const usernameToAnalyze = targetUsername || username.trim();

    const customSetFinalResult = async (result) => {
      setFinalResult(result);

      if (result && result.success) {
        try {
          const saveResponse = await fetch("/api/database", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: usernameToAnalyze,
              userData: result,
            }),
          });

          const saveResult = await saveResponse.json();
          if (saveResult.success) {
            toast.success("Data saved successfully!", { autoClose: 2000 });
          } else {
            console.error("Failed to save to database:", saveResult.error);
          }
        } catch (dbError) {
          console.error("Database save error:", dbError);
        }
      }
    };

    await handleSubmit(
      usernameToAnalyze,
      setLoading,
      setLoadingMessage,
      setError,
      setData,
      customSetFinalResult
    );
  };

  const handleRefresh = async () => {
    setFromCache(false);
    setShowRecentUsers(false);
    await runAnalysisAndSave();
  };

  const resetPage = () => {
    setData(null);
    setFinalResult(null);
    setError("");
    setFromCache(false);
    setUsername("");
    setShowRecentUsers(true);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 overflow-x-hidden">
      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-4 py-8">
        <Header />

        <SearchForm
          username={username}
          setUsername={setUsername}
          loading={loading}
          onSubmit={onSubmit}
        />

        <RecentUsers
          onUserSelect={handleUserSelect}
          isVisible={showRecentUsers && !data && !loading}
        />

        <ErrorDisplay error={error} />

        {/* Action Buttons */}
        {data && (
          <div className="max-w-4xl mx-auto mb-8 flex justify-center gap-4">
            <button
              onClick={resetPage}
              className="group relative overflow-hidden flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200"
            >
              <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
              <span>New Search</span>
            </button>

            {fromCache && (
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="group relative overflow-hidden flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <RefreshCw
                  className={`w-5 h-5 ${
                    loading
                      ? "animate-spin"
                      : "group-hover:rotate-180 transition-transform duration-500"
                  }`}
                />
                <span>{loading ? "Refreshing..." : "Refresh Data"}</span>
              </button>
            )}
          </div>
        )}

        {/* Results Container */}
        {data && data.success && (
          <div className="max-w-7xl mx-auto">
            {/* Cache Notice */}
            {fromCache && (
              <div className="mb-6 mx-auto max-w-4xl">
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm border border-purple-200 rounded-2xl p-4 shadow-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                        <Info className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800 mb-1">
                          Cached Data Displayed
                        </p>
                        <p className="text-xs text-gray-600">
                          This data is from our database. Click &quot;Refresh Data&quot; to fetch the latest information from Instagram.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content Card */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <ProfileCard profile={data.profile} username={username} />

              {finalResult && finalResult.enhancedPosts && (
                <AnalyticsDashboard
                  analytics={finalResult.analytics || data.analytics}
                  enhancedPosts={finalResult.enhancedPosts}
                  username={username}
                  profile={data.profile}
                />
              )}

              <PostsGrid
                posts={data.posts}
                enhancedPosts={finalResult?.enhancedPosts}
                message={data.message}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
