"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ArrowRight, Compass, Globe, Heart, Share2, Mail } from "lucide-react";

export default function CTA() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-white pt-24 pb-12 border-t border-slate-100 overflow-hidden">
      {/* Background soft glows */}
      <div className="absolute top-[20%] left-[-10%] w-[45%] h-[45%] rounded-full bg-gradient-to-tr from-brand-cyan/10 to-transparent blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-gradient-to-br from-brand-purple/10 to-transparent blur-[110px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Cinematic Call to Action */}
        <div className="max-w-4xl mx-auto text-center space-y-8 pb-20 border-b border-slate-100">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-orange/10 border border-brand-orange/15 rounded-full text-brand-orange font-display text-xs font-semibold tracking-wider uppercase"
          >
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            Join the Voyage
          </motion.div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gradient leading-[1.1]">
            Ready to rewrite <br />
            your travel memories?
          </h2>

          <p className="text-foreground-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Create your account today, import raw coordinates, images, and track your journeys with cinematic layouts, fully responsive at zero cost.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="cyan"
              size="lg"
              className="gap-2 shadow-glow text-white"
            >
              Start Free Expedition <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleScrollToTop}
            >
              Back to Top
            </Button>
          </div>
        </div>

        {/* Footer Navigation Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-16 text-left">
          {/* Logo & Tagline */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleScrollToTop}>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-purple flex items-center justify-center text-white">
                <Compass className="w-4.5 h-4.5 rotate-45" />
              </div>
              <span className="font-display font-bold text-lg text-slate-800 tracking-tight">VoyageAI</span>
            </div>
            <p className="text-foreground-muted text-xs sm:text-sm max-w-xs leading-relaxed">
              An immersive, next-generation AI travel memories ecosystem designed to plan, explore, and remember your travels.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="#" className="hover:text-slate-600 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-slate-600 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-slate-600 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Product</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground-muted">
              <li><a href="#travel-showcase" className="hover:text-slate-800 transition-colors">Expeditions</a></li>
              <li><a href="#ai-itinerary-section" className="hover:text-slate-800 transition-colors">Itinerary Planner</a></li>
              <li><a href="#ai-story-generator" className="hover:text-slate-800 transition-colors">Story Co-Writer</a></li>
              <li><a href="#timeline-preview" className="hover:text-slate-800 transition-colors">Visual Timeline</a></li>
            </ul>
          </div>

          {/* Developer links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Developers</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground-muted">
              <li><a href="#" className="hover:text-slate-800 transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-slate-800 transition-colors">Gemini Integration</a></li>
              <li><a href="#" className="hover:text-slate-800 transition-colors">Supabase DB Schema</a></li>
              <li><a href="#" className="hover:text-slate-800 transition-colors">Open Source</a></li>
            </ul>
          </div>

          {/* Legal / Company links */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground-muted">
              <li><a href="#" className="hover:text-slate-800 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-slate-800 transition-colors">Security Details</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-semibold">
          <span>&copy; {new Date().getFullYear()} VoyageAI Inc. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by Google Deepmind pair programmers
          </span>
        </div>

      </div>
    </footer>
  );
}
