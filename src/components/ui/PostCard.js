import { Heart, MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function PostCard({ post, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!post || !post.url) {
    return (
      <div className="bg-errorbg border-2 border-error/20 rounded-3xl p-6 text-center">
        <span className="text-error text-sm font-medium">Invalid post data</span>
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
      <div className="bg-cardbg rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-hard shadow-soft border-2 border-s h-full flex flex-col">
        
        <Link href={postLink} target="_blank" className="relative">
          <div className="absolute top-3 right-3 z-10 flex gap-2">
            {postQuality.length > 0 && (
              <span className="bg-cardbg/95 backdrop-blur-sm text-textPurple px-3 py-1.5 rounded-full text-xs font-semibold border border-purple/30 shadow-medium">
                {postQuality[0]}
              </span>
            )}
          </div>
          
          {post.type === "image" ? (
            <img
              src={proxyUrl}
              alt={`Instagram post ${index + 1}`}
              className="w-full aspect-square object-cover"
              loading="lazy"
              onError={(e) => {
                if (e.target.src !== post.url) {
                  e.target.src = post.url;
                } else {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "flex";
                }
              }}
            />
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
            className="w-full aspect-square bg-s flex items-center justify-center"
            style={{ display: "none" }}
          >
            <div className="text-center text-texts">
              <div className="text-3xl mb-2"></div>
              <div className="text-sm">Image unavailable</div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-cardbg/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Heart className="w-4 h-4 text-textPurple fill-textPurple" />
                <span className="text-textp text-sm font-semibold">{formatNumber(postLikes)}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-cardbg/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <MessageCircle className="w-4 h-4 text-textPurple" />
                <span className="text-textp text-sm font-semibold">{formatNumber(postComments)}</span>
              </div>
            </div>
          </div>
        </Link>

        <div className="p-5 space-y-4 flex-1 flex flex-col">
          
          {postCaption && (
            <div className="space-y-1">
              <p className="text-textp text-sm leading-relaxed line-clamp-2">
                {postCaption}
              </p>
            </div>
          )}

          {postVibe.length > 0 && (
            <div className="flex flex-wrap gap-2">
              Vibes:
              {postVibe.slice(0, 3).map((vibe, i) => (
                <span
                  key={i}
                  className="bg-purple/20 text-textPurple text-xs font-medium px-3 py-1 rounded-full border border-purple/30"
                >
                  {vibe}
                </span>
              ))}
            </div>
          )}

          {postHashtags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {postHashtags.slice(0, 3).map((hashtag, i) => (
                <span 
                  key={i} 
                  className="text-xs text-texts hover:text-textPurple transition-colors font-medium"
                >
                  {hashtag.startsWith("#") ? hashtag : `#${hashtag}`}
                </span>
              ))}
            </div>
          )}

          {analysis && (
            <div className="mt-auto">
              <div className="bg-s rounded-2xl p-4 border border-border-light">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-textPurple" />
                  <span className="text-xs font-semibold text-textPurple uppercase tracking-wide">
                    AI Insight
                  </span>
                </div>
                <p 
                  className={`text-xs text-texts leading-relaxed ${!isExpanded && 'line-clamp-2'}`}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {analysis}
                </p>
                {analysis.length > 100 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xs text-textPurple hover:text-hoverbg font-medium mt-2 transition-colors"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            </div>
          )}

          {imageLevelAnalysis.mood && (
            <div className="flex flex-col items-start justify-between px-3 py-2 bg-yellow/20 rounded-xl border border-yellow/40">
              <span className="text-xs font-medium text-textp">Mood</span>
              <span className="text-xs font-semibold text-texts">{imageLevelAnalysis.mood}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;