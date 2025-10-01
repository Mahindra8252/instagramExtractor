"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

import Header from "../ui/Header";
import SearchForm from "../ui/SearchForm";
import ErrorDisplay from "../ui/ErrorDisplay";
import ProfileCard from "../ui/ProfileCard";
import AnalyticsDashboard from "../AnalyticsDashboard";
import PostsGrid from "../ui/PostsGrid";
import RecentUsers from "../ui/RecentUsers";
import DemographicInsights from "../DemographicInsights";
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
      // console.log(" Checking database for cached data...");
      const dbResponse = await fetch(`/api/database?username=${encodeURIComponent(usernameToAnalyze)}`);
      const dbResult = await dbResponse.json();

      if (dbResult.success && dbResult.fromCache) {
        // console.log("Found cached data, displaying...");
        toast.success("Data loaded from DB!");
        
        setData(dbResult.data);
        setFinalResult(dbResult.data);
        setFromCache(true);
        setLoading(false);
        return;
      }

      // console.log(" No cached data found, running analysis...");
      await runAnalysisAndSave(usernameToAnalyze);
      
    } catch (error) {
      console.error(" Error in analyzeUser:", error);
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
          // console.log(" Saving data to database...");
          
          const saveResponse = await fetch('/api/database', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: usernameToAnalyze,
              userData: result
            })
          });

          const saveResult = await saveResponse.json();
          if (saveResult.success) {
            // console.log(" Data saved to database successfully");
            toast.success("Data saved to database!", { autoClose: 2000 });
          } else {
            console.error(" Failed to save to database:", saveResult.error);
          }
        } catch (dbError) {
          console.error(" Database save error:", dbError);
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
    // console.log(" Refresh requested - running fresh analysis...");
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
    <div className="h-screen w-screen text-black flex flex-col justify-start items-center bg-s overflow-scroll">
      <div className="w-full h-full px-4 py-8 ">
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

        {data && (
          <div className="max-w-4xl mx-auto mb-6 flex justify-center gap-4">
            <button
              onClick={resetPage}
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Search
            </button>

            {fromCache && (
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-textPurple/80 hover:bg-textPurple disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {loading ? "Refreshing..." : "Refresh Data"}
              </button>
            )}
          </div>
        )}

        {data && data.success && (
          <div className="max-w-8xl mx-auto  rounded-3xl bg-p pb-10 mb-5 shadow-2xl">

            {fromCache && (
              <div className="px-6 pt-4">
                <div className="bg-purple/40 border border-hoverbg rounded-lg p-3 mb-4">
                  <p className="text-textPurple text-sm font-medium flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    This data is from cache. Click &quot;Refresh Data&quot; for latest information.
                  </p>
                </div>
              </div>
            )}
            <ProfileCard profile={data.profile} username={username} />

            {finalResult && finalResult.enhancedPosts && (
              <AnalyticsDashboard
                analytics={finalResult.analytics || data.analytics}
                enhancedPosts={finalResult.enhancedPosts}
                username={username}
                profile={data.profile}
              />
            )}

            {finalResult && finalResult.demographicData && (
              <DemographicInsights demographicData={finalResult.demographicData} />
            )}

            <PostsGrid
              posts={data.posts}
              enhancedPosts={finalResult?.enhancedPosts}
              message={data.message}
            />
          </div>
        )}
      </div>
    </div>
  );
}