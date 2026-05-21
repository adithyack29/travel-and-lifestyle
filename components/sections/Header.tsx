"use client";

import React, { useEffect, useState } from "react";
import { Compass, Sparkles, Menu } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-4 bg-white/75 backdrop-blur-md border-b border-slate-200/80 shadow-premium"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-300 ${
            isScrolled 
              ? "bg-gradient-to-tr from-brand-cyan to-brand-purple text-white shadow-sm" 
              : "bg-white/15 border border-white/25 text-white"
          }`}>
            <Compass className="w-4.5 h-4.5 rotate-45" />
          </div>
          <span className={`font-display font-bold text-lg tracking-tight transition-colors duration-300 ${
            isScrolled ? "text-slate-800" : "text-white"
          }`}>
            VoyageAI
          </span>
        </div>

        {/* Navigation anchors */}
        <nav className={`hidden md:flex items-center gap-8 text-xs sm:text-sm font-semibold transition-colors duration-300 ${
          isScrolled ? "text-slate-500" : "text-white/80"
        }`}>
          <button
            onClick={() => handleNavClick("travel-showcase")}
            className={`transition-colors ${isScrolled ? "hover:text-slate-800" : "hover:text-white"}`}
          >
            Expeditions
          </button>
          <button
            onClick={() => handleNavClick("ai-itinerary-section")}
            className={`transition-colors ${isScrolled ? "hover:text-slate-800" : "hover:text-white"}`}
          >
            Itineraries
          </button>
          <button
            onClick={() => handleNavClick("timeline-preview")}
            className={`transition-colors ${isScrolled ? "hover:text-slate-800" : "hover:text-white"}`}
          >
            Visual Timeline
          </button>
          <button
            onClick={() => handleNavClick("ai-story-generator")}
            className={`transition-colors ${isScrolled ? "hover:text-slate-800" : "hover:text-white"}`}
          >
            AI Storyteller
          </button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          {isScrolled ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavClick("ai-itinerary-section")}
                className="hidden sm:inline-flex gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-purple fill-brand-purple/10" />
                Plan with AI
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleNavClick("ai-story-generator")}
              >
                Start Story
              </Button>
            </>
          ) : (
            <>
              <button className="px-4 py-1.5 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wide transition-all duration-300">
                Log in
              </button>
              <button className="text-white hover:opacity-80 transition-opacity p-1.5">
                <Menu className="w-5.5 h-5.5" />
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
