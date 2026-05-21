"use client";

import React, { useState } from "react";
import { useTravelStore } from "@/store/useTravelStore";
import { generateItinerary } from "@/lib/gemini";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { 
  Sparkles, 
  Compass, 
  TrendingUp, 
  Calendar, 
  ListTodo,
  CheckCircle,
  Coffee,
  Sunset,
  Moon,
  Sun
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIFeatures() {
  const { 
    itineraryLoading, 
    generatedItinerary, 
    setItineraryLoading, 
    setGeneratedItinerary 
  } = useTravelStore();

  const [destination, setDestination] = useState("Rome, Italy");
  const [days, setDays] = useState(3);
  const [style, setStyle] = useState("Cultural Exploration");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;

    setItineraryLoading(true);
    setGeneratedItinerary(null);
    try {
      const plan = await generateItinerary(destination, days, style);
      setGeneratedItinerary(plan);
    } catch (err) {
      console.error(err);
    } finally {
      setItineraryLoading(false);
    }
  };

  const activityIcons = {
    morning: <Sun className="w-4 h-4 text-brand-orange" />,
    afternoon: <Coffee className="w-4 h-4 text-brand-cyan" />,
    evening: <Sunset className="w-4 h-4 text-brand-purple" />,
    night: <Moon className="w-4 h-4 text-slate-700" />,
  };

  return (
    <section id="ai-itinerary-section" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-brand-cyan/10 to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-brand-purple/10 to-transparent blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-cyan/10 border border-brand-cyan/15 rounded-full text-brand-cyan font-display text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 fill-brand-cyan/20" />
            AI Travel Studio
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient">
            Intelligent Journey Engine
          </h2>
          <p className="text-foreground-muted text-sm sm:text-base leading-relaxed">
            Harness advanced artificial intelligence to craft precise itineraries, translate camera roll metadata into diaries, and map insights.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Col-1: Interactive Itinerary Planner Form */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 bg-white/70 border-slate-200/50 backdrop-blur-md">
              <h3 className="font-display text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-cyan fill-brand-cyan/10" />
                AI Itinerary Builder
              </h3>
              
              <form onSubmit={handleGenerate} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Destination</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Paris, Tokyo, Bali"
                    className="w-full px-4 py-3 rounded-full text-sm text-foreground bg-white border border-slate-200 focus:border-brand-cyan focus:outline-none transition-all shadow-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Days</label>
                    <select
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-full text-sm text-foreground bg-white border border-slate-200 focus:border-brand-cyan focus:outline-none transition-all shadow-sm"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                        <option key={d} value={d}>
                          {d} {d === 1 ? "Day" : "Days"}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Travel Style</label>
                    <select
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      className="w-full px-4 py-3 rounded-full text-sm text-foreground bg-white border border-slate-200 focus:border-brand-cyan focus:outline-none transition-all shadow-sm"
                    >
                      <option value="Cultural Exploration">Cultural</option>
                      <option value="Culinary Tasting">Culinary</option>
                      <option value="Adventurous Trails">Adventure</option>
                      <option value="Slow & Relaxed">Relaxed</option>
                      <option value="Luxury Escape">Luxury</option>
                    </select>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="cyan"
                  className="w-full mt-2 font-display text-sm font-semibold justify-center h-12"
                  disabled={itineraryLoading}
                >
                  {itineraryLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Analyzing routes...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      Generate Expedition Plan <Compass className="w-4 h-4 animate-spin-slow" />
                    </span>
                  )}
                </Button>
              </form>
            </Card>

            {/* Smart Analytics Quick Card */}
            <Card className="p-5 bg-white/40 border-slate-200/50 backdrop-blur-md flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Travel Analytics</h4>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold font-display text-slate-800">4,380 km</span>
                  <span className="text-[10px] text-green-500 font-bold">12% more than last year</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Col-2: Output display and dynamic details */}
          <div className="lg:col-span-7 h-full">
            <AnimatePresence mode="wait">
              {itineraryLoading ? (
                <motion.div
                  key="loading-state"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="w-full h-[400px] border border-dashed border-slate-200 bg-white/30 rounded-3xl flex flex-col items-center justify-center p-6 text-center"
                >
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full border-2 border-brand-cyan/20 animate-ping" />
                    <div className="absolute inset-2 rounded-full border-2 border-brand-cyan/40 animate-pulse" />
                    <div className="absolute inset-4 rounded-full bg-brand-cyan/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-brand-cyan" />
                    </div>
                  </div>
                  <h4 className="font-display font-bold text-slate-800">Consulting Gemini Engine</h4>
                  <p className="text-slate-400 text-xs mt-1 max-w-xs">
                    Building a customized list of events, calculating route travel times, and styling landmarks.
                  </p>
                </motion.div>
              ) : generatedItinerary ? (
                <motion.div
                  key="itinerary-result"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  {/* Generated Plan Header */}
                  <Card className="p-6 bg-gradient-to-r from-white to-brand-cyan/5 border-slate-200/50">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-wider block mb-1">
                          GENERATED PLAN
                        </span>
                        <h3 className="font-display text-2xl font-bold text-slate-800">
                          {generatedItinerary.destination}
                        </h3>
                        <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                          {generatedItinerary.summary}
                        </p>
                      </div>
                      
                      <div className="bg-white px-3 py-1.5 rounded-2xl border border-slate-100 flex items-center gap-1.5 shrink-0 shadow-sm">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-600">
                          {generatedItinerary.days} Days
                        </span>
                      </div>
                    </div>
                  </Card>

                  {/* Day-by-Day Timeline Render */}
                  <div
                    data-lenis-prevent
                    className="space-y-4 max-h-[400px] overflow-y-auto pr-1"
                  >
                    {generatedItinerary.plan.map((dayPlan) => (
                      <Card key={dayPlan.day} className="p-5 bg-white border-slate-200/50 shadow-sm">
                        <h4 className="font-display text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-brand-cyan" />
                          {dayPlan.title}
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {dayPlan.activities.map((act, aIdx) => (
                            <div key={aIdx} className="bg-slate-50/50 border border-slate-100 p-3 rounded-2xl flex items-start gap-3">
                              <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0">
                                {activityIcons[act.icon] || <Compass className="w-4 h-4 text-slate-400" />}
                              </div>
                              <div>
                                <span className="text-[9px] font-bold text-slate-400 block mb-0.5">{act.time}</span>
                                <h5 className="text-xs font-bold text-slate-800 leading-snug">{act.activity}</h5>
                                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">{act.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full min-h-[400px] border border-slate-200/80 bg-white/30 rounded-3xl flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                    <ListTodo className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-slate-700">No Plan Generated</h4>
                  <p className="text-slate-400 text-xs mt-1 max-w-sm">
                    Enter details in the builder panel and click Generate. Our engine will curate days, coordinates, and timings using the Gemini API layout.
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
