import { Search, Instagram, Sparkles, Clock, Database, TrendingUp } from "lucide-react";

export default function SearchForm({ username, setUsername, loading, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  
  return (
    <div className="max-w-2xl mx-auto mb-12 mt-12 px-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Input Container with Glow */}
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] via-[#8134AF] to-[#515BD4] rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-300"></div>
          
          {/* Input Wrapper */}
          <div className="relative bg-white/90 rounded-2xl shadow-2xl border border-white/30 backdrop-blur-md">
            <div className="flex items-center gap-3 px-6 py-5">
              {/* Instagram Icon */}
              <div className="flex-shrink-0 p-2 bg-gradient-to-br from-[#F58529] to-[#DD2A7B] rounded-xl shadow-lg">
                <Instagram className="h-6 w-6 text-white" />
              </div>
              
              {/* Input Field */}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/[@\s]/g, ''))}
                placeholder="Enter Instagram username"
                className="flex-1 bg-transparent text-lg text-gray-800 placeholder-gray-400 focus:outline-none font-medium"
                required
                disabled={loading}
              />
              
              {/* @ Symbol */}
              <span className="text-gray-400 text-xl font-bold">@</span>
            </div>
          </div>
        </div>

        {/* Submit Button with Insta Gradient */}
        <button
          type="submit"
          disabled={loading || !username.trim()}
          className="relative w-full group overflow-hidden"
        >
          {/* Button Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] via-[#8134AF] to-[#515BD4] rounded-2xl transition-transform duration-300 group-hover:scale-105 group-disabled:scale-100"></div>
          
          {/* Button Content */}
          <div className="relative px-8 py-5 flex items-center justify-center gap-3">
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
                <span className="text-white font-bold text-lg">Analyzing Profile...</span>
              </>
            ) : (
              <>
                <Search className="h-6 w-6 text-white" />
                <span className="text-white font-bold text-lg">Analyze Profile</span>
                
              </>
            )}
          </div>
          
          {/* Shine Effect */}
          {!loading && (
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          )}
        </button>

        {/* Quick Tips - Show when not loading */}
        {!loading && (
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-[#F58529]/10 to-[#DD2A7B]/10 rounded-xl border border-white/30 hover:shadow-lg transition-shadow">
              <div className="p-2 bg-gradient-to-tr from-[#F58529] to-[#DD2A7B] rounded-lg shadow-sm">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs font-semibold text-gray-700 text-center">Real-time Stats</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-[#DD2A7B]/10 to-[#8134AF]/10 rounded-xl border border-white/30 hover:shadow-lg transition-shadow">
              <div className="p-2 bg-gradient-to-tr from-[#DD2A7B] to-[#8134AF] rounded-lg shadow-sm">
                <Database className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs font-semibold text-gray-700 text-center">Deep Analytics</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-[#8134AF]/10 to-[#515BD4]/10 rounded-xl border border-white/30 hover:shadow-lg transition-shadow">
              <div className="p-2 bg-gradient-to-tr from-[#8134AF] to-[#515BD4] rounded-lg shadow-sm">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs font-semibold text-gray-700 text-center">AI Insights</span>
            </div>
          </div>
        )}
       
        {/* Loading State with Progress Steps */}
        {loading && (
          <div className="space-y-4">
            {/* Main Loading Card */}
            <div className="relative overflow-hidden p-6 bg-white/80 rounded-2xl border border-white/30 shadow-xl backdrop-blur-lg">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DD2A7B]/20 to-transparent animate-shimmer"></div>
              
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-[#F58529] to-[#DD2A7B] rounded-xl shadow-lg animate-pulse">
                      <Database className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-bold text-lg">Processing Profile Data</p>
                      <p className="text-gray-500 text-sm">@{username}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                    <Clock className="h-4 w-4 text-[#DD2A7B] animate-pulse" />
                    <span className="text-sm font-semibold text-gray-700">5-6 min</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] via-[#8134AF] to-[#515BD4] rounded-full animate-progress"></div>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Fetching posts, analyzing engagement, and calculating metrics...
                  </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-600 font-medium">Connecting</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-600 font-medium">Scraping</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-400 font-medium">Analyzing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fun Fact Card */}
            <div className="p-4 bg-gradient-to-r from-[#F58529]/10 via-[#DD2A7B]/10 to-[#8134AF]/10 rounded-xl border border-white/30 backdrop-blur-md">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-[#F58529] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">💡 Did you know?</p>
                  <p className="text-xs text-gray-600">
                    We analyze over 50 different metrics including engagement rate, post frequency, and audience demographics to give you comprehensive insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }

        .animate-shimmer { animation: shimmer 2s infinite; }
        .animate-progress { animation: progress 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
