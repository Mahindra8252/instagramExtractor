import instaLogo from "@/assets/instaLogo.webp";
import { Sparkle } from "lucide-react";
import Image from "next/image";
import logo1 from "@/assets/logo1.png";

export default function Header() {
  return (
    <div className="text-center flex flex-col items-center gap-5">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full">
        <Image
          src={logo1}
          alt="Instagram Logo"
          className="h-full rounded-full w-full object-contain"
          priority
        />
      </div>
      <h1 className="text-5xl flex flex-row justify-center items-center font-bold mb-1 text-black">
        Scrapple{" "}
        <Sparkle className="inline-block ml-3 h-7 w-7 text-textPurple" />
      </h1>
      <p className="text-lg text-texts/70 max-w-2xl mx-auto">
        Get comprehensive insights into any Instagram profile including
        engagement metrics, follower analytics, and content performance
      </p>
    </div>
  );
}
