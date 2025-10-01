import PostCard from './PostCard';
import NoPosts from './NoPosts';
import { Grid3x3, Sparkles, TrendingUp } from 'lucide-react';

export default function PostsGrid({ posts, enhancedPosts, message }) {
  const postsToDisplay = enhancedPosts && Array.isArray(enhancedPosts) ? enhancedPosts : posts;
  
  if (!postsToDisplay || !Array.isArray(postsToDisplay) || postsToDisplay.length === 0) {
    return <NoPosts message={message} />;
  }

  const isEnhanced = !!(enhancedPosts && Array.isArray(enhancedPosts) && enhancedPosts.length > 0);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="relative mb-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-3xl blur-xl opacity-20"></div>
          
          <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Left Side - Title */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50"></div>
                  <div className="relative p-4 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-2xl shadow-lg">
                    <Grid3x3 className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
                    Content Gallery
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {isEnhanced ? 'AI-analyzed posts with insights' : 'Scraped posts from profile'}
                  </p>
                </div>
              </div>

              {/* Right Side - Badges */}
              <div className="flex items-center gap-3">
                {isEnhanced && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border-2 border-purple-200 shadow-sm">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-bold text-purple-700">AI Enhanced</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-full shadow-lg">
                  <TrendingUp className="w-4 h-4 text-white" />
                  <span className="text-white font-bold text-sm">
                    {postsToDisplay.length} {postsToDisplay.length === 1 ? 'Post' : 'Posts'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {postsToDisplay.map((post, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <PostCard post={post} index={index} />
            </div>
          ))}
        </div>

        {/* Footer Stats */}
        {postsToDisplay.length > 6 && (
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-50 to-purple-50 rounded-full border border-gray-200 shadow-sm">
              <Grid3x3 className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">
                Showing all {postsToDisplay.length} posts
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
