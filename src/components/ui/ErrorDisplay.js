export default function ErrorDisplay({ error }) {
  if (!error) return null;

  return (
    <div className="max-w-md mx-auto mb-8 animate-fade-in">
      <div className="relative bg-gradient-to-br from-red-500 via-pink-500 to-orange-500 rounded-3xl p-1 shadow-2xl overflow-hidden group">
        {/* Animated shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        
        {/* Inner content */}
        <div className="relative bg-white/95 backdrop-blur-md rounded-[1.4rem] p-6">
          <div className="flex items-start gap-4">
            {/* Icon container with pulse effect */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            {/* Error content */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
              <p className="text-gray-700 font-medium leading-relaxed">{error}</p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-16 h-16 bg-red-100 rounded-full blur-2xl opacity-50" />
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-pink-100 rounded-full blur-xl opacity-40" />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}