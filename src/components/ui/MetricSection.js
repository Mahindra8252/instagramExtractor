import React from 'react'

const MetricSection = () => {
  return (
    <div>
      
    </div>
  )
}

export default MetricSection




// import React, { useState } from "react";
// import { Sparkles, Star, Palette } from "lucide-react";

// function MetricCard({ icon: Icon, title, children, gradientColors }) {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className={`relative rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden border-2 border-white/20 ${gradientColors}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Animated shimmer effect */}
//       <div 
//         className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 ${
//           isHovered ? 'translate-x-full' : '-translate-x-full'
//         }`}
//         style={{ width: '50%' }}
//       />

//       {/* Decorative circles */}
//       <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full blur-2xl" />
//       <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-xl" />

//       <div className="relative z-10">
//         <div className="flex items-center space-x-4 mb-6">
//           <div
//             className={`w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/30 transform transition-all duration-500 ${
//               isHovered ? "scale-110 rotate-6" : "scale-100 rotate-0"
//             }`}
//           >
//             <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
//           </div>
//           <h3 className="text-2xl font-bold text-white tracking-tight">
//             {title}
//           </h3>
//         </div>

//         <div className="space-y-4">{children}</div>
//       </div>

//       {/* Bottom accent line */}
//       <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
//     </div>
//   );
// }

// function MetricItem({ label, count, total }) {
//   const percentage = (count / total) * 100;

//   return (
//     <div className="group/item bg-white/90 backdrop-blur-md rounded-2xl p-4 hover:bg-white transition-all duration-300 border-2 border-white shadow-lg">
//       <div className="flex items-center justify-between mb-3">
//         <span className="text-gray-800 font-semibold capitalize text-lg">
//           {label}
//         </span>
//         <span className="text-2xl font-bold text-purple-600">
//           {count}
//         </span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
//         <div
//           className="h-2.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 transition-all duration-700 ease-out shadow-md"
//           style={{ width: `${percentage}%` }}
//         />
//       </div>
//     </div>
//   );
// }

// function ColorMetricItem({ color: themeColor, count }) {
//   let displayColor = themeColor.toLowerCase();

//   return (
//     <div className="group/item bg-white/90 backdrop-blur-md rounded-2xl p-4 hover:bg-white transition-all duration-300 border-2 border-white shadow-lg">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <div
//             className="w-10 h-10 rounded-xl shadow-lg border-2 border-white transition-transform duration-300 group-hover/item:scale-110 group-hover/item:rotate-12"
//             style={{ backgroundColor: displayColor }}
//           />
//           <span className="text-gray-800 font-semibold capitalize text-lg">
//             {themeColor}
//           </span>
//         </div>
//         <span className="text-2xl font-bold text-purple-600">{count}</span>
//       </div>
//     </div>
//   );
// }

// function MetricsSection({ metrics, enhancedPosts }) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
//       <MetricCard 
//         icon={Sparkles} 
//         title="Content Vibes"
//         gradientColors="bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500"
//       >
//         {metrics.topVibes.map(({ vibe, count }) => (
//           <MetricItem
//             key={vibe}
//             label={vibe}
//             count={count}
//             total={enhancedPosts.length}
//           />
//         ))}
//       </MetricCard>

//       <MetricCard 
//         icon={Star} 
//         title="Quality Analysis"
//         gradientColors="bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500"
//       >
//         {metrics.topQualities.map(({ quality, count }) => (
//           <MetricItem
//             key={quality}
//             label={quality}
//             count={count}
//             total={enhancedPosts.length}
//           />
//         ))}
//       </MetricCard>

//       <MetricCard 
//         icon={Palette} 
//         title="Color Trends"
//         gradientColors="bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600"
//       >
//         {metrics.topColors.map(({ color, count }) => (
//           <ColorMetricItem key={color} color={color} count={count} />
//         ))}
//       </MetricCard>
//     </div>
//   );
// }

// export default MetricsSection;