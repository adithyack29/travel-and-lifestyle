"use client";

import { useTravelStore } from "@/store/useTravelStore";
import Card from "@/components/ui/Card";
import { Calendar, MapPin, Navigation, Sparkles } from "lucide-react";

export default function Showcase() {
  const { journeys, activeJourneyId, setActiveJourney } = useTravelStore();

  return (
    <section id="travel-showcase" className="py-24 bg-background-muted border-y border-slate-100 relative">
      <div className="container mx-auto px-6">
        
        {/* Editorial Heading Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-purple/10 border border-brand-purple/15 rounded-full text-brand-purple font-display text-[10px] font-bold tracking-wider uppercase">
              <Navigation className="w-3 h-3 rotate-45" />
              Curated Expeditions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gradient">
              Active Journeys
            </h2>
            <p className="text-foreground-muted text-sm sm:text-base leading-relaxed">
              Explore ongoing storytelling tracks. Click on an expedition to load its full path, media nodes, and AI journal entries.
            </p>
          </div>
          
          <div className="hidden md:flex gap-2 text-xs font-semibold text-slate-400">
            <span>SCROLL TO EXPLORE</span>
            <span>➔</span>
          </div>
        </div>

        {/* Journey Slider Track */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {journeys.map((journey) => {
            const isActive = journey.id === activeJourneyId;
            return (
              <Card
                key={journey.id}
                onClick={() => setActiveJourney(journey.id)}
                className={`cursor-pointer overflow-hidden group transition-all duration-500 relative flex flex-col h-[400px] border-slate-200/50 ${
                  isActive
                    ? "ring-2 ring-brand-cyan/60 border-transparent shadow-glass bg-white"
                    : "bg-white/60 hover:bg-white"
                }`}
              >
                {/* Journey Cover Image Container */}
                <div className="relative h-[240px] w-full overflow-hidden">
                  {/* Visual overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />
                  <img
                    src={journey.coverImage}
                    alt={journey.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Floating Date Tag */}
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 shadow-sm">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                      {journey.startDate}
                    </span>
                  </div>

                  {/* Active Status Ring */}
                  {isActive && (
                    <div className="absolute top-4 right-4 z-20 bg-brand-cyan text-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3 h-3 fill-white" />
                      <span className="text-[9px] font-bold uppercase tracking-wider">ACTIVE</span>
                    </div>
                  )}

                  {/* Location Title Overlaid */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h3 className="text-white font-display text-lg font-bold leading-snug drop-shadow-sm">
                      {journey.title}
                    </h3>
                  </div>
                </div>

                {/* Card Description Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-foreground-muted text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {journey.description}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4 text-[11px] text-slate-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                      {journey.nodes.length} Story Nodes
                    </span>
                    <span className={`transition-colors font-display ${isActive ? "text-brand-cyan font-bold" : "text-slate-400 group-hover:text-slate-800"}`}>
                      {isActive ? "Viewing Timeline" : "Load Journey ➔"}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
