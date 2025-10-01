import Image from "next/image";
import React, { useState, useEffect } from "react";

const RecentUsers = ({ onUserSelect, isVisible }) => {
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState(new Set());

  const fetchRecentUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/database/recent");
      const data = await response.json();

      if (data.success) {
        setRecentUsers(data.users || []);
      }
    } catch (error) {
      console.error("Error fetching recent users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      fetchRecentUsers();
    }
  }, [isVisible]);

  const handleUserClick = (username) => {
    onUserSelect(username);
  };

  const handleImageError = (username) => {
    setImageErrors(prev => new Set([...prev, username]));
  };

  if (!isVisible) {
    return null;
  }
//   console.log(recentUsers);

  return (
    <div className="max-w-4xl mx-auto mb-8 pb-10">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 px-6 py-4">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-black font-semibold text-lg">
              Recently Analyzed Profiles
            </h3>
          </div>
          <p className="text-purple-100 text-sm mt-1">
            Click on any username to view their analysis
          </p>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <span className="ml-3 text-gray-600">
                Loading recent profiles...
              </span>
            </div>
          ) : recentUsers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recentUsers.map((user, index) => (
                <button
                  key={user.username || index}
                  onClick={() => handleUserClick(user.username)}
                  className="group bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-xl p-4 text-left transition-all duration-200 transform hover:scale-105 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
                      {user.userData?.profile?.profilePicture && !imageErrors.has(user.username) ? (
                        <img
                          src={`/api/proxy-image?url=${encodeURIComponent(user.userData.profile.profilePicture)}`}
                          alt={user.username}
                          className="w-10 h-10 rounded-full object-cover"
                          onError={() => handleImageError(user.username)}
                        />
                      ) : (
                        <span className="text-white font-semibold text-sm">
                          {user.username?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 group-hover:text-purple-700 truncate">
                        @{user.username}
                      </p>
                      <p className="text-xs text-gray-500 group-hover:text-purple-600">
                        {new Date(user.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-4 h-4 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg
                className="w-12 h-12 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-gray-500">No profiles analyzed yet</p>
              <p className="text-gray-400 text-sm mt-1">
                Recent profiles will appear here after analysis
              </p>
            </div>
          )}
        </div>

        {recentUsers.length > 0 && (
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <button
              onClick={fetchRecentUsers}
              disabled={loading}
              className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh List
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentUsers;
