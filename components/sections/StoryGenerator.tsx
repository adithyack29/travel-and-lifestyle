"use client";

import React, { useState } from "react";
import { useTravelStore } from "@/store/useTravelStore";
import { generateTravelStory } from "@/lib/gemini";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { BookOpen, PenTool, MapPin, Feather } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StoryGenerator() {
  const {
    storyLoading,
    generatedStory,
    setStoryLoading,
    setGeneratedStory,
  } = useTravelStore();

  const [title, setTitle] = useState("Echoes of Amalfi");
  const [locations, setLocations] = useState("Sorrento, Positano, Ravello");
  const [mood, setMood] = useState("Reflective");

  const handleCreateStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!locations.trim()) return;

    setStoryLoading(true);
    setGeneratedStory(null);

    const locationList = locations.split(",").map((l) => l.trim()).filter(Boolean);

    try {
      const storyResult = await generateTravelStory(title, locationList, mood);
      setGeneratedStory(storyResult);
    } catch (err) {
      console.error(err);
    } finally {
      setStoryLoading(false);
    }
  };

  return (
    <section id="ai-story-generator" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-[30%] left-[-10%] w-[35%] h-[35%] rounded-full bg-gradient-to-tr from-brand-purple/15 to-transparent blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-gradient-to-br from-brand-cyan/15 to-transparent blur-[110px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-purple/10 border border-brand-purple/15 rounded-full text-brand-purple font-display text-[10px] font-bold tracking-wider uppercase">
            <Feather className="w-3 h-3" />
            Co-Writer
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient">
            AI Storytelling Generator
          </h2>
          <p className="text-foreground-muted text-sm sm:text-base leading-relaxed">
            Translate raw location markers and images into cinematic diaries. Define your title and locations, and watch the AI write the memories.
          </p>
        </div>

        {/* Form and Book Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Input Panel */}
          <div className="lg:col-span-4 h-full">
            <Card className="p-6 bg-white/80 border-slate-200/50 backdrop-blur-md flex flex-col justify-between h-full">
              <div>
                <h3 className="font-display text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-brand-purple" />
                  Story Parameters
                </h3>
                
                <form onSubmit={handleCreateStory} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Journal Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Echoes of Amalfi"
                      className="w-full px-4 py-3 rounded-full text-sm text-foreground bg-white border border-slate-200 focus:border-brand-purple focus:outline-none transition-all shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Locations (comma separated)</label>
                    <textarea
                      value={locations}
                      onChange={(e) => setLocations(e.target.value)}
                      placeholder="e.g. Tokyo, Mount Fuji, Kyoto"
                      rows={3}
                      className="w-full px-4 py-3 rounded-3xl text-sm text-foreground bg-white border border-slate-200 focus:border-brand-purple focus:outline-none transition-all shadow-sm resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Story Atmosphere / Mood</label>
                    <select
                      value={mood}
                      onChange={(e) => setMood(e.target.value)}
                      className="w-full px-4 py-3 rounded-full text-sm text-foreground bg-white border border-slate-200 focus:border-brand-purple focus:outline-none transition-all shadow-sm"
                    >
                      <option value="Reflective & Poetic">Reflective</option>
                      <option value="Nostalgic Recollection">Nostalgic</option>
                      <option value="Cinematic Adventure">Adventure</option>
                      <option value="Romantic Travelogue">Romantic</option>
                      <option value="Whimsical Wandering">Whimsical</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    variant="purple"
                    className="w-full mt-2 font-display text-sm font-semibold justify-center h-12"
                    disabled={storyLoading}
                  >
                    {storyLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Writing memory...
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        Write AI Story <Feather className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </Card>
          </div>

          {/* Right: Immersive Editorial Book Showcase */}
          <div className="lg:col-span-8 flex flex-col justify-stretch">
            <AnimatePresence mode="wait">
              {storyLoading ? (
                <motion.div
                  key="writing"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="w-full h-full min-h-[420px] border border-dashed border-slate-200 bg-white/40 rounded-3xl flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full border-2 border-brand-purple/20 animate-ping" />
                    <div className="absolute inset-2 rounded-full border-2 border-brand-purple/40 animate-pulse" />
                    <div className="absolute inset-4 rounded-full bg-brand-purple/10 flex items-center justify-center">
                      <Feather className="w-5 h-5 text-brand-purple" />
                    </div>
                  </div>
                  <h4 className="font-display font-bold text-slate-800">Drafting Storybook...</h4>
                  <p className="text-slate-400 text-xs mt-1 max-w-xs">
                    Mapping tone coordinates, formatting paragraphs, and injecting sensory atmosphere models.
                  </p>
                </motion.div>
              ) : generatedStory ? (
                <motion.div
                  key="story-book"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white border border-slate-200/60 rounded-3xl shadow-glass flex flex-col h-full overflow-hidden"
                >
                  {/* Editorial Cover */}
                  <div className="p-8 bg-gradient-to-r from-slate-50 to-brand-purple/5 border-b border-slate-100 flex justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="text-[10px] font-bold text-brand-purple uppercase tracking-widest bg-brand-purple/10 px-2 py-0.5 rounded-full">
                          {generatedStory.chapters.length} Chapters
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-200/80 px-2 py-0.5 rounded-full">
                          {generatedStory.chapters[0].mood}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                        {generatedStory.title}
                      </h3>
                      <p className="text-slate-400 text-xs mt-1.5 leading-relaxed font-medium">
                        {generatedStory.excerpt}
                      </p>
                    </div>
                    
                    <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shrink-0 text-slate-400">
                      <BookOpen className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Chapters Container */}
                  <div
                    data-lenis-prevent
                    className="p-8 space-y-8 max-h-[350px] overflow-y-auto pr-2 flex-1"
                  >
                    {generatedStory.chapters.map((chap, cIdx) => (
                      <div key={cIdx} className="space-y-3 relative pl-6 border-l border-slate-100">
                        {/* Chapter bullet */}
                        <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-brand-purple" />
                        
                        <div className="flex justify-between items-baseline flex-wrap gap-2 text-slate-400">
                          <span className="text-[10px] font-bold uppercase tracking-wider block">CHAPTER {cIdx + 1}</span>
                          <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-brand-orange" /> {chap.location}
                          </span>
                        </div>
                        <h4 className="font-display text-base font-bold text-slate-800">
                          {chap.title}
                        </h4>
                        <p className="text-foreground-muted text-xs sm:text-sm leading-relaxed font-sans font-normal italic">
                          {chap.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Signature Footer */}
                  <div className="bg-slate-50/50 px-8 py-4 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 font-semibold">
                      <Feather className="w-3.5 h-3.5 text-brand-purple" /> VoyageAI Co-Writer Engine
                    </span>
                    <span>Ready to publish</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full min-h-[420px] border border-slate-200/80 bg-white/40 rounded-3xl flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4">
                    <Feather className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-slate-700">Write Your Story</h4>
                  <p className="text-slate-400 text-xs mt-1 max-w-sm">
                    Supply your travel diary details in the story settings panel and click Write AI Story to create a custom narrative layout.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
