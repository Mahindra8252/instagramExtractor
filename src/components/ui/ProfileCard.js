import { ExternalLink, Lock, CheckCircle2, Globe, ImageIcon } from "lucide-react";
import Link from "next/link";

export default function ProfileCard({ profile, username }) {
  if (!profile) return null;

  const formatNumber = (num) => {
    if (!num) return "0";
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <div className="p-8 mb-8">
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-3xl blur-xl opacity-20"></div>
        
        {/* Main Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Gradient Header Bar */}
          <div className="h-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]"></div>
          
          <div className="p-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Left Section */}
              <div className="flex flex-col items-center gap-4 lg:min-w-[280px]">
                {/* Avatar */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative p-1 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-full">
                    {profile.profilePicture ? (
                      <img
                        src={`/api/proxy-image?url=${encodeURIComponent(profile.profilePicture)}`}
                        alt={`${profile.username}'s profile`}
                        className="w-36 h-36 rounded-full object-cover ring-4 ring-white"
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";
                        }}
                      />
                    ) : (
                      <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#f0e5ff] to-[#ffe6f2] ring-4 ring-white flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Username & Name */}
                <div className="w-full flex flex-col items-center text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] bg-clip-text text-transparent">
                      @{profile.username || username}
                    </h2>
                    {profile.isVerified && (
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-50"></div>
                        <CheckCircle2 className="relative w-6 h-6 text-blue-500 fill-blue-500" />
                      </div>
                    )}
                  </div>

                  {profile.influencerName ? (
                    <h3 className="text-lg text-gray-600 font-medium mb-4">
                      {profile.influencerName}
                    </h3>
                  ) : (
                    <p className="text-gray-400 text-sm italic mb-4">
                      Display name not available
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                    {profile.isPrivate && (
                      <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 border-yellow-200 shadow-sm">
                        <Lock className="w-4 h-4" />
                        Private Account
                      </div>
                    )}
                    <Link
                      href={`https://www.instagram.com/${profile.username || username}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-lg transform hover:scale-105"
                    >
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      View on Instagram
                    </Link>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent self-stretch"></div>
              <div className="lg:hidden w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

              {/* Right Section */}
              <div className="flex-1 flex flex-col justify-center w-full">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {[
                    { label: "Posts", value: profile.postsCount, gradient: "from-[#833ab4] via-[#fd1d1d] to-[#fcb045]" },
                    { label: "Followers", value: profile.followersCount, gradient: "from-[#fd1d1d] via-[#fcb045] to-[#833ab4]" },
                    { label: "Following", value: profile.followingCount, gradient: "from-[#fcb045] via-[#833ab4] to-[#fd1d1d]" }
                  ].map((stat) => (
                    <div key={stat.label} className="text-center group cursor-default border-x border-gray-200 last:border-x-0">
                      <div className={`text-4xl md:text-5xl font-extrabold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform`}>
                        {formatNumber(stat.value)}
                      </div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bio */}
                {profile.bio && (
                  <div className="mb-6">
                    <div className="bg-gradient-to-r from-[#f0e5ff] to-[#ffe6f2] rounded-2xl p-5 border border-purple-100">
                      <p className="text-gray-700 text-sm leading-relaxed text-center lg:text-left">
                        {profile.bio}
                      </p>
                    </div>
                  </div>
                )}

                {/* Website */}
                {profile.website && (
                  <div className="flex justify-center lg:justify-start">
                    <a
                      href={"https://" + profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-[#833ab4] rounded-xl text-sm font-semibold text-gray-700 hover:text-[#833ab4] transition-all"
                    >
                      <Globe className="w-4 h-4" />
                      <span className="max-w-xs truncate">
                        {profile.website.replace(/^https?:\/\//, "")}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
