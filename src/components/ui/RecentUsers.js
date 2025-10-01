import React, { useState, useEffect } from "react";
import { Clock, Users, RefreshCw, ChevronRight, Sparkles } from "lucide-react";

const RecentUsers = ({ onUserSelect, isVisible }) => {
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState(new Set());

  const fetchRecentUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/database/recent");
      const data = await response.json();
      if (data.success) setRecentUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching recent users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible) fetchRecentUsers();
  }, [isVisible]);

  const handleUserClick = (username) => onUserSelect(username);
  const handleImageError = (username) => setImageErrors(prev => new Set([...prev, username]));

  if (!isVisible) return null;

  return (
    <div className="max-w-6xl mx-auto mb-10 px-4">
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-3xl blur-xl opacity-20"></div>
        
        {/* Main Container */}
        <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl flex items-center gap-2">
                    Recently Analyzed
                    <Sparkles className="w-5 h-5" />
                  </h3>
                  <p className="text-white/90 text-sm mt-0.5">
                    Click on any profile to view their analytics
                  </p>
                </div>
              </div>
              {recentUsers.length > 0 && (
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <Users className="w-4 h-4 text-white" />
                  <span className="text-white font-semibold text-sm">
                    {recentUsers.length} profile{recentUsers.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-gray-200 border-t-[#833ab4] rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-[#fd1d1d] rounded-full animate-spin animation-delay-150"></div>
                </div>
                <span className="mt-4 text-gray-600 font-medium">
                  Loading recent profiles...
                </span>
              </div>
            ) : recentUsers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {recentUsers.map((user, index) => (
                  <button
                    key={user.username || index}
                    onClick={() => handleUserClick(user.username)}
                    className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 hover:from-[#fdf0f5] hover:to-[#fde2f1] border-2 border-gray-200 hover:border-[#fd1d1d] rounded-2xl p-5 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#833ab4]/0 via-[#fd1d1d]/0 to-[#fcb045]/0 group-hover:from-[#833ab4]/10 group-hover:via-[#fd1d1d]/10 group-hover:to-[#fcb045]/10 transition-all duration-300"></div>

                    <div className="relative">
                      {/* Avatar */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-[#833ab4] to-[#fd1d1d] rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                          <div className="relative w-14 h-14 bg-gradient-to-br from-[#833ab4] to-[#fd1d1d] rounded-full flex items-center justify-center overflow-hidden ring-2 ring-white shadow-lg">
                            {user.userData?.profile?.profilePicture && !imageErrors.has(user.username) ? (
                              <img
                                src={`/api/proxy-image?url=${encodeURIComponent(user.userData.profile.profilePicture)}`}
                                alt={user.username}
                                className="w-full h-full object-cover"
                                onError={() => handleImageError(user.username)}
                              />
                            ) : (
                              <span className="text-white font-bold text-lg">
                                {user.username?.charAt(0)?.toUpperCase() || 'U'}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 group-hover:text-[#fd1d1d] truncate text-base transition-colors">
                            @{user.username}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <p className="text-xs text-gray-500 group-hover:text-[#fd1d1d] transition-colors">
                              {new Date(user.updatedAt).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      {user.userData?.profile && (
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200 group-hover:border-[#fd1d1d] transition-colors">
                          <div className="text-center">
                            <p className="text-xs text-gray-500 font-medium">Posts</p>
                            <p className="text-sm font-bold text-gray-900">
                              {user.userData.profile.posts || 0}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 font-medium">Followers</p>
                            <p className="text-sm font-bold text-gray-900">
                              {user.userData.profile.followers ? 
                                (user.userData.profile.followers > 999 ? 
                                  `${(user.userData.profile.followers / 1000).toFixed(1)}K` : 
                                  user.userData.profile.followers) : 
                                '0'}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 font-medium">Following</p>
                            <p className="text-sm font-bold text-gray-900">
                              {user.userData.profile.following || 0}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Arrow */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
                        <div className="p-1.5 bg-gradient-to-r from-[#833ab4] to-[#fd1d1d] rounded-lg shadow-lg">
                          <ChevronRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#833ab4] to-[#fd1d1d] rounded-full blur-2xl opacity-20"></div>
                  <div className="relative p-6 bg-white rounded-full">
                    <Users className="w-16 h-16 text-gray-400" />
                  </div>
                </div>
                <p className="text-gray-600 font-semibold text-lg mt-6">No profiles analyzed yet</p>
                <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
                  Recent profiles will appear here after analysis. Start by searching for an Instagram username above!
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {recentUsers.length > 0 && (
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
              <button
                onClick={fetchRecentUsers}
                disabled={loading}
                className="group flex items-center gap-2 text-sm font-semibold text-[#833ab4] hover:text-[#fd1d1d] disabled:text-gray-400 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                <span>{loading ? 'Refreshing...' : 'Refresh List'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animation-delay-150 { animation-delay: 150ms; }
      `}</style>
    </div>
  );
};

export default RecentUsers;
