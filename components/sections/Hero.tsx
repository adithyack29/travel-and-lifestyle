"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";

export default function Hero() {
  const handleGetAppClick = () => {
    const featureSection = document.getElementById("ai-itinerary-section");
    if (featureSection) {
      featureSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-900">
      {/* Full-bleed forest river backdrop */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&q=80&w=2000')`
        }}
      />
      {/* Dark vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60 z-10" />

      {/* Main Content Container */}
      <div className="container mx-auto px-6 relative z-20 text-center flex flex-col items-center justify-center max-w-5xl">
        
        {/* Laurel Wreaths Award Badges */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-6 sm:gap-10 mb-8 text-white/90 select-none"
        >
          {/* Google Play */}
          <div className="flex items-center gap-2.5 drop-shadow-md">
            <svg className="w-6 h-6 fill-current text-white/80" viewBox="0 0 24 24">
              <path d="M6 21c-2.4-1.2-4.1-3.6-4.5-6.5C1 11.2 2.5 8 5.4 6c.4-.3.9-.2 1.2.2.3.4.2.9-.2 1.2-2.3 1.6-3.5 4.1-3.1 6.8.4 2.4 1.8 4.3 3.8 5.3.4.2.6.7.4 1.1-.2.4-.6.6-.9.6zM9.5 5.5c.4.2.6.7.4 1.1l-.8 1.8c-.2.4-.7.6-1.1.4-.4-.2-.6-.7-.4-1.1l.8-1.8c.2-.4.7-.6 1.1-.4M18 21c2.4-1.2 4.1-3.6 4.5-6.5.5-3.3-1-6.5-3.9-8.5-.4-.3-.9-.2-1.2.2-.3.4-.2.9.2 1.2 2.3 1.6 3.5 4.1 3.1 6.8-.4 2.4-1.8 4.3-3.8 5.3-.4.2-.6.7-.4 1.1.2.4.6.6.9.6zM14.5 5.5c-.4.2-.6.7-.4 1.1l.8 1.8c.2.4.7.6 1.1.4.4-.2.6-.7.4-1.1l-.8-1.8c-.2-.4-.7-.6-1.1-.4z" />
            </svg>
            <span className="text-[10px] uppercase font-bold tracking-wider text-left leading-tight">
              Google Play<br />
              <span className="text-white/60 font-semibold font-sans normal-case">Editors&apos; Choice</span>
            </span>
          </div>

          <div className="w-[1px] h-6 bg-white/20 hidden sm:block" />

          {/* App Store */}
          <div className="flex items-center gap-2.5 drop-shadow-md">
            <svg className="w-6 h-6 fill-current text-white/80" viewBox="0 0 24 24">
              <path d="M18 21c2.4-1.2 4.1-3.6 4.5-6.5.5-3.3-1-6.5-3.9-8.5-.4-.3-.9-.2-1.2.2-.3.4-.2.9.2 1.2 2.3 1.6 3.5 4.1 3.1 6.8-.4 2.4-1.8 4.3-3.8 5.3-.4.2-.6.7-.4 1.1.2.4.6.6.9.6zM14.5 5.5c-.4.2-.6.7-.4 1.1l.8 1.8c.2.4.7.6 1.1.4.4-.2.6-.7.4-1.1l-.8-1.8c-.2-.4-.7-.6-1.1-.4z" />
            </svg>
            <span className="text-[10px] uppercase font-bold tracking-wider text-left leading-tight">
              App Store<br />
              <span className="text-white/60 font-semibold font-sans normal-case">App of the Day</span>
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-md leading-[1.15] max-w-4xl"
        >
          One travel app for <br />
          all your adventures
        </motion.h1>

        {/* Subtitle description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mt-6 leading-relaxed drop-shadow-sm font-medium"
        >
          Join the 20M+ travelers who plan, track, and relive their trips with VoyageAI.
        </motion.p>

        {/* CTA + Review badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10"
        >
          {/* Button trigger */}
          <div 
            onClick={handleGetAppClick}
            className="inline-flex items-center bg-white hover:bg-white/95 text-slate-800 font-display font-bold text-sm px-7 py-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-[1.02] cursor-pointer gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-purple flex items-center justify-center text-white shrink-0">
              <Compass className="w-3.5 h-3.5 rotate-45" />
            </div>
            <span>Get the app</span>
          </div>
          
          {/* Ratings display */}
          <div className="flex flex-col items-center sm:items-start gap-1 select-none">
            <div className="flex items-center gap-0.5 text-yellow-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[9px] text-white/60 font-bold uppercase tracking-widest font-sans">
              4.8 (370K RATINGS)
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
