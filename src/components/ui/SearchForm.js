export default function SearchForm({ username, setUsername, loading, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  
  return (
    <div className="max-w-md mx-auto mb-10 mt-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.replace(/[@\s]/g, ''))}
              placeholder="Enter Instagram username"
              className="w-full ring-2 ring-hoverbg px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-black placeholder-gray-400 focus:border-textPurple focus:ring-2 focus:ring-textPurple focus:outline-none transition-all"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-6">
              <span className="text-gray-400 text-lg">@</span>
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-textPurple text-white font-semibold rounded-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>Analyzing Profile...</span>
            </div>
          ) : (
            'Analyze Profile'
          )}
        </button>
       
        {loading && (
          <div className="p-5 bg-gradient-to-r from-textPurple/10 to-purple/10 backdrop-blur-lg rounded-2xl border border-textPurple/20">
            <div className="text-center space-y-2">
              <p className="text-gray-700 font-medium text-sm">
                Scraping profile data and analyzing content
              </p>
              <p className="text-gray-500 text-xs">
                Estimated time: 5-6 minutes
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}