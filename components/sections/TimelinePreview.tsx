"use client";

import { useTravelStore } from "@/store/useTravelStore";
import TravelMap from "@/components/maps/TravelMap";
import Card from "@/components/ui/Card";
import { Calendar, MapPin, Sparkles, Navigation } from "lucide-react";
import { motion } from "framer-motion";

export default function TimelinePreview() {
  const { journeys, activeJourneyId, selectedNodeId, setSelectedNode } = useTravelStore();

  const activeJourney = journeys.find((j) => j.id === activeJourneyId) || journeys[0];
  const nodes = activeJourney?.nodes || [];

  return (
    <section id="timeline-preview" className="py-24 bg-background-muted border-b border-slate-100 relative">
      <div className="container mx-auto px-6">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/15 rounded-full text-brand-cyan font-display text-[10px] font-bold tracking-wider uppercase">
              <Calendar className="w-3 h-3" />
              Chronicle
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gradient">
              Journey Timeline
            </h2>
            <p className="text-foreground-muted text-sm sm:text-base leading-relaxed">
              Explore nodes chronological details. Walk through travel steps, images, and telemetry inputs.
            </p>
          </div>
        </div>

        {/* Timeline Grid (Map on left, vertical timeline on right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Floating Vector Map */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <TravelMap />
          </div>

          {/* Right Column: Vertical Connected Timeline Nodes */}
          <div className="lg:col-span-6 relative pl-6 sm:pl-8 space-y-12">
            {/* Main Vertical Connecting Line */}
            <div className="absolute left-[11px] sm:left-[15px] top-4 bottom-4 w-[2px] bg-slate-200/80" />

            {nodes.map((node, index) => {
              const isSelected = node.id === selectedNodeId;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node.id)}
                  className="relative cursor-pointer group"
                >
                  {/* Timeline Dot Marker */}
                  <div className="absolute left-[-26px] sm:left-[-30px] top-5 z-10 flex items-center justify-center">
                    <motion.div
                      animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className={`w-6 h-6 rounded-full border bg-white flex items-center justify-center transition-colors duration-300 ${
                        isSelected 
                          ? "border-brand-cyan shadow-sm" 
                          : "border-slate-300 group-hover:border-slate-400"
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                        isSelected ? "bg-brand-cyan" : "bg-slate-300 group-hover:bg-slate-400"
                      }`} />
                    </motion.div>
                  </div>

                  {/* Node Card Details */}
                  <Card
                    className={`p-6 bg-white border-slate-200/50 transition-all duration-300 relative ${
                      isSelected 
                        ? "shadow-premium ring-1 ring-slate-200" 
                        : "opacity-75 hover:opacity-100 hover:shadow-sm"
                    }`}
                  >
                    {/* Header: Date + Location */}
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-4 border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
                          STEP {index + 1}
                        </span>
                        <h4 className="font-display text-sm font-bold text-slate-800 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                          {node.location}
                        </h4>
                      </div>
                      
                      <div className="text-[10px] font-semibold text-slate-500 bg-slate-100/60 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
                        <Calendar className="w-3 h-3" />
                        {node.date}
                      </div>
                    </div>

                    {/* Node Image */}
                    <div className="relative h-[200px] w-full rounded-2xl overflow-hidden mb-4 border border-slate-100">
                      <img
                        src={node.image}
                        alt={node.title}
                        className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                      />
                    </div>

                    {/* Node Content */}
                    <h3 className="font-display text-base font-bold text-slate-800 mb-2 group-hover:text-brand-cyan transition-colors">
                      {node.title}
                    </h3>
                    <p className="text-foreground-muted text-xs sm:text-sm leading-relaxed">
                      {node.description}
                    </p>

                    {/* Active story visualizer link */}
                    {isSelected && (
                      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-brand-cyan font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 fill-brand-cyan/10" /> AI journal entry ready
                        </span>
                        <span className="flex items-center gap-0.5">
                          Read Full Diary <Navigation className="w-2.5 h-2.5 rotate-45" />
                        </span>
                      </div>
                    )}
                  </Card>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
