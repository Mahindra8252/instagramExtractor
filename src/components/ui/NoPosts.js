function NoPosts({ message }) {
  return (
    <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 rounded-2xl p-8">
      <div className="text-center">
        {/* Camera Icon Container */}
        <div className="relative mb-8 inline-block">
          <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl">
            <svg 
              className="w-16 h-16 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full opacity-80 animate-pulse"></div>
          <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-pink-400 rounded-full opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h3 className="text-3xl font-bold text-white tracking-tight">
            No Posts Yet
          </h3>
          <p className="text-white/80 text-lg max-w-md mx-auto leading-relaxed">
            {message || 'When posts are shared, they will appear here.'}
          </p>
        </div>

        {/* Optional decorative element */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default NoPosts;