import { Heart, MessageCircle, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function PostCard({ post, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!post || !post.url) {
    return (
      <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl p-6 text-center shadow-xl">
        <span className="text-white text-sm font-semibold">Invalid post data</span>
      </div>
    );
  }

  const proxyUrl = `/api/proxy-post-image?url=${encodeURIComponent(post.url)}&t=${Date.now()}`;

  const formatNumber = (num) => {
    if (!num || isNaN(num)) return "0";
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const {
    postLikes = 0,
    postComments = 0,
    postCaption = "",
    postHashtags = [],
    postVibe = [],
    postQuality = [],
    analysis = "",
    imageLevelAnalysis = {},
    postLink = "#",
  } = post;

  return (
    <div className="group h-full">
      <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl shadow-xl border-2 border-white/20 h-full flex flex-col hover:scale-[1.02]">
        
        <Link href={postLink} target="_blank" className="relative block">
          {/* Quality Badge */}
          {postQuality.length > 0 && (
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-white/95 backdrop-blur-md text-purple-600 px-4 py-2 rounded-full text-xs font-bold shadow-lg border-2 border-white flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                {postQuality[0]}
              </div>
            </div>
          )}
          
          {/* Image/Video Container */}
          <div className="relative bg-gradient-to-br from-purple-400 to-pink-400">
            {post.type === "image" ? (
              <>
                {!imageLoaded && (
                  <div className="w-full aspect-square flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  src={proxyUrl}
                  alt={`Instagram post ${index + 1}`}
                  className={`w-full aspect-square object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    if (e.target.src !== post.url) {
                      e.target.src = post.url;
                    } else {
                      e.target.style.display = "none";
                      e.target.nextElementSibling.style.display = "flex";
                    }
                  }}
                />
              </>
            ) : (
              <video
                src={proxyUrl}
                controls
                className="w-full aspect-square object-cover"
                loading="lazy"
                onError={(e) => {
                  if (e.target.src !== post.url) {
                    e.target.src = post.url;
                  }
                }}
              />
            )}

            <div
              className="w-full aspect-square bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center"
              style={{ display: "none" }}
            >
              <div className="text-center text-white">
                <div className="text-3xl mb-2">📷</div>
                <div className="text-sm font-medium">Image unavailable</div>
              </div>
            </div>

            {/* Engagement Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                  <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                  <span className="text-gray-900 text-sm font-bold">{formatNumber(postLikes)}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                  <MessageCircle className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-900 text-sm font-bold">{formatNumber(postComments)}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Content Section with Gradient Background */}
        <div className="p-5 space-y-4 flex-1 flex flex-col bg-gradient-to-b from-transparent to-black/20">
          
          {/* Caption */}
          {postCaption && (
            <div className="space-y-1">
              <p className="text-white text-sm leading-relaxed line-clamp-2 font-medium">
                {postCaption}
              </p>
            </div>
          )}

          {/* Vibes Section */}
          {postVibe.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Vibes</span>
              {postVibe.slice(0, 3).map((vibe, i) => (
                <span
                  key={i}
                  className="bg-white/90 backdrop-blur-sm text-purple-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white"
                >
                  {vibe}
                </span>
              ))}
            </div>
          )}

          {/* Hashtags */}
          {postHashtags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {postHashtags.slice(0, 3).map((hashtag, i) => (
                <span 
                  key={i} 
                  className="text-xs text-white hover:text-yellow-300 transition-colors font-semibold hover:underline cursor-pointer"
                >
                  {hashtag.startsWith("#") ? hashtag : `#${hashtag}`}
                </span>
              ))}
            </div>
          )}

          {/* AI Analysis */}
          {analysis && (
            <div className="mt-auto">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-md">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">
                    AI Insight
                  </span>
                </div>
                <p 
                  className={`text-xs text-gray-700 leading-relaxed font-medium ${!isExpanded && 'line-clamp-2'}`}
                >
                  {analysis}
                </p>
                {analysis.length > 100 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xs text-purple-600 hover:text-purple-700 font-bold mt-2 transition-colors underline"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Mood Badge */}
          {imageLevelAnalysis.mood && (
            <div className="flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-white shadow-lg">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">Mood</span>
              <span className="text-sm font-bold text-orange-600">{imageLevelAnalysis.mood}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;