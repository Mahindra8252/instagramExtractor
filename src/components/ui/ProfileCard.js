import { ExternalLink, Lock } from "lucide-react";
import Link from "next/link";

export default function ProfileCard({ profile, username }) {
  if (!profile) return null;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/20">
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 rounded-3xl border-2 border-dashed border-textPurple p-6">
        <div className="flex flex-col items-center gap-4 lg:min-w-[280px]">
          <div className="flex-shrink-0 p-1 border-[3px] rounded-full border-textPurple">
            {profile.profilePicture ? (
              <img
                src={`/api/proxy-image?url=${encodeURIComponent(
                  profile.profilePicture
                )}`}
                alt={`${profile.username}'s profile`}
                className="w-32 h-32 rounded-full object-cover"
                onError={(e) => {
                  console.log("Profile picture failed to load");
                  e.target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";
                }}
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-600/20 border-4 border-hoverbg flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </div>
            )}
          </div>

          <div className="w-full flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-black">
                @{profile.username || username}
              </h2>
              {profile.isVerified && (
                <svg
                  className="w-6 h-6 text-blue-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>

            {profile.influencerName ? (
              <h3 className="text-lg text-gray-700 font-medium mb-3">
                {profile.influencerName}
              </h3>
            ) : (
              <p className="text-gray-500 text-sm italic mb-3">
                Display name not available
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
              {profile.isPrivate && (
                <span className="inline-flex items-center gap-1.5 bg-yellow-400/20 text-yellow-700 px-3 py-2 rounded-full text-xs font-semibold border border-yellow-400/30">
                  <Lock className="w-3.5 h-3.5" />
                  Private
                </span>
              )}
              <Link
                href={`https://www.instagram.com/${
                  profile.username || username
                }/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-textPurple hover:bg-textPurple/90 text-white px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
              >
                <ExternalLink className="w-4 h-4" />
                View on Instagram
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-[1px] bg-textPurple/40 self-stretch"></div>
        <div className="lg:hidden w-full h-[1px] bg-textPurple/40"></div>

        <div className="flex-1 flex flex-col justify-center w-full">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-black mb-1">
                {profile.postsCount?.toLocaleString() || "0"}
              </div>
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Posts
              </div>
            </div>
            <div className="text-center border-x border-gray-300/50">
              <div className="text-3xl md:text-4xl font-bold text-black mb-1">
                {profile.followersCount?.toLocaleString() || "0"}
              </div>
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Followers
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-black mb-1">
                {profile.followingCount?.toLocaleString() || "0"}
              </div>
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Following
              </div>
            </div>
          </div>

          {profile.bio && (
            <p className="text-gray-800 text-sm leading-relaxed mb-4 text-center lg:text-left">
              {profile.bio}
            </p>
          )}

          {profile.website && (
            <div className="flex justify-center lg:justify-start">
              <a
                href={"https://"+profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-textPurple hover:text-textPurple/80 text-sm font-medium transition-colors group"
              >
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                {profile.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
