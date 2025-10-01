import PostCard from './PostCard';
import NoPosts from './NoPosts';

export default function PostsGrid({ posts, enhancedPosts, message }) {
  const postsToDisplay = enhancedPosts && Array.isArray(enhancedPosts) ? enhancedPosts : posts;
  
  if (!postsToDisplay || !Array.isArray(postsToDisplay) || postsToDisplay.length === 0) {
    return <NoPosts message={message} />;
  }

  const isEnhanced = !!(enhancedPosts && Array.isArray(enhancedPosts) && enhancedPosts.length > 0);
  
  // console.log(` PostsGrid: Displaying ${postsToDisplay.length} posts ( ${isEnhanced})`);
  if (isEnhanced) {
    // console.log(' Using analyzed posts with analysis data');
  } else {
    // console.log(' Using basic posts without  analysis');
  }

   return (
    <div className="bg-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10 pb-6 border-b-2 border-purple-100">
          <div className="flex items-center space-x-4">
            <h2 className="text-4xl font-bold text-gray-900">Posts scraped & analysed</h2>
            
          </div>
          <div className="bg-purple-50 rounded-lg px-5 py-2.5 border border-purple-200">
            <span className="text-purple-900 font-medium">{postsToDisplay.length} Posts</span>
          </div>
        </div>
       
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
          {postsToDisplay.map((post, index) => (
            <PostCard key={index} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}