import instaLogo from "@/assets/instaLogo.webp";
// import { Sparkle, TrendingUp, BarChart3 } from "lucide-react";
import Image from "next/image";
import logo1 from "@/assets/logo1.png";
import { Sparkles, BarChart3, Users, Heart, MessageCircle } from "lucide-react";

export default function Header() {
  return (
    <div className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* Instagram Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F58529] via-[#DD2A7B] via-[#8134AF] to-[#515BD4]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Animated Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-2 h-2 bg-white/40 rounded-full animate-float" />
        <div className="absolute top-40 right-[15%] w-3 h-3 bg-white/30 rounded-full animate-float-delayed" />
        <div className="absolute bottom-32 left-[20%] w-2 h-2 bg-white/40 rounded-full animate-float-slow" />
        <div className="absolute top-60 right-[25%] w-4 h-4 bg-white/20 rounded-full animate-float" />
        <div className="absolute bottom-40 right-[10%] w-2 h-2 bg-white/30 rounded-full animate-float-delayed" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center flex flex-col items-center gap-6 max-w-4xl mx-auto">
        
        {/* Icon Grid */}
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-tr from-pink-500/30 to-purple-500/30 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl animate-bounce-slow">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <div className="p-3 bg-gradient-to-tr from-orange-400/30 to-pink-500/30 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl animate-bounce-slow delay-100">
            <Users className="h-8 w-8 text-white" />
          </div>
          <div className="p-3 bg-gradient-to-tr from-purple-500/30 to-pink-600/30 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl animate-bounce-slow delay-200">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <div className="p-3 bg-gradient-to-tr from-pink-500/30 to-orange-400/30 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl animate-bounce-slow delay-300">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Main Title with Glassmorphism */}
        <div className="space-y-4">
          <div className="inline-block p-1 bg-gradient-to-r from-white/40 to-white/10 rounded-3xl backdrop-blur-sm">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white px-8 py-4 flex items-center justify-center gap-4">
              ScrapInsta
              {/* <Sparkles className="h-12 w-12 md:h-16 md:w-16 animate-pulse" fill="white" /> */}
            </h1>
          </div>
          
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500/40 to-purple-600/40 backdrop-blur-xl rounded-full border border-white/40 shadow-2xl">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="text-white font-semibold text-lg">Instagram Analytics Platform</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xl md:text-2xl text-white/95 font-medium max-w-3xl leading-relaxed drop-shadow-lg">
          Unlock powerful insights from any Instagram profile. Track engagement, analyze followers, and discover content trends—all in one place.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full max-w-3xl">
          <div className="p-6 bg-gradient-to-br from-[#DD2A7B]/20 to-[#8134AF]/20 backdrop-blur-xl rounded-2xl border border-white/30 hover:from-[#F58529]/30 hover:to-[#515BD4]/30 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold text-white mb-1">100K+</div>
            <div className="text-white/90 text-sm font-medium">Profiles Analyzed</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-[#F58529]/20 to-[#DD2A7B]/20 backdrop-blur-xl rounded-2xl border border-white/30 hover:from-[#8134AF]/30 hover:to-[#515BD4]/30 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold text-white mb-1">50M+</div>
            <div className="text-white/90 text-sm font-medium">Data Points</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-[#8134AF]/20 to-[#515BD4]/20 backdrop-blur-xl rounded-2xl border border-white/30 hover:from-[#F58529]/30 hover:to-[#DD2A7B]/30 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold text-white mb-1">Real-time</div>
            <div className="text-white/90 text-sm font-medium">Updates</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-[#DD2A7B]/20 to-[#F58529]/20 backdrop-blur-xl rounded-2xl border border-white/30 hover:from-[#8134AF]/30 hover:to-[#515BD4]/30 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold text-white mb-1">24/7</div>
            <div className="text-white/90 text-sm font-medium">Access</div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-30px) translateX(-10px); opacity: 0.7; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
          50% { transform: translateY(-15px) translateX(15px); opacity: 0.6; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .delay-100 { animation-delay: 0.2s; }
        .delay-200 { animation-delay: 0.4s; }
        .delay-300 { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
}
