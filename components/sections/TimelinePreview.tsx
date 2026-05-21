"use client";

import { useRef, useState, useEffect } from "react";
import { useTravelStore } from "@/store/useTravelStore";
import TravelMap from "@/components/maps/TravelMap";
import Card from "@/components/ui/Card";
import { Calendar, MapPin, Sparkles, Navigation } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function TimelinePreview() {
  const { journeys, activeJourneyId, selectedNodeId, setSelectedNode } = useTravelStore();

  const activeJourney = journeys.find((j) => j.id === activeJourneyId) || journeys[0];
  const nodes = activeJourney?.nodes || [];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  // Sync scroll position to active index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalNodes = nodes.length;
    if (totalNodes === 0) return;
    const rawIndex = Math.floor(latest * totalNodes);
    const index = Math.min(rawIndex, totalNodes - 1);
    if (index !== activeIndex && index >= 0) {
      setActiveIndex(index);
      setSelectedNode(nodes[index].id);
    }
  });

  // Bi-directional sync if node is selected elsewhere (e.g. from showcase maps)
  useEffect(() => {
    const idx = nodes.findIndex((n) => n.id === selectedNodeId);
    if (idx !== -1 && idx !== activeIndex) {
      setActiveIndex(idx);
    }
  }, [selectedNodeId, nodes, activeIndex]);

  return (
    <div ref={containerRef} className="relative h-[220vh] bg-background-muted border-b border-slate-100">
      <section className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-16">
        <div className="container mx-auto px-6">
          
          {/* Section Title */}
          <div className="mb-10 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/15 rounded-full text-brand-cyan font-display text-[10px] font-bold tracking-wider uppercase">
              <Calendar className="w-3 h-3" />
              Chronicle
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-gradient">
              Journey Timeline
            </h2>
            <p className="text-foreground-muted text-xs sm:text-sm max-w-xl">
              Explore nodes chronological details. Walk through travel steps, images, and telemetry inputs.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Floating Vector Map */}
            <div className="lg:col-span-6">
              <TravelMap />
            </div>

            {/* Right Column: Sliding Vertical Timeline */}
            <div className="lg:col-span-6 h-[440px] overflow-hidden relative flex flex-col justify-center">
              {/* Fade masks */}
              <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background-muted to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background-muted to-transparent z-10 pointer-events-none" />
              
              {/* Sliding Track */}
              <div className="relative h-full">
                {/* Continuous Connecting Line */}
                <div className="absolute left-[26px] top-0 bottom-0 w-[2px] bg-slate-200/80 z-0" />

                <motion.div 
                  animate={{ y: -activeIndex * 440 }}
                  transition={{ type: "spring", stiffness: 90, damping: 18 }}
                  className="absolute inset-x-0 top-0"
                >
                  {nodes.map((node, index) => {
                    const isSelected = node.id === selectedNodeId;

                    return (
                      <div
                        key={node.id}
                        style={{ height: 440 }}
                        onClick={() => setSelectedNode(node.id)}
                        className="flex items-center py-4 cursor-pointer group select-none"
                      >
                        <div className="w-full relative pl-12 pr-2">
                          {/* Timeline Dot Marker */}
                          <div className="absolute left-[15px] top-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                            <motion.div
                              animate={isSelected ? { scale: [1, 1.25, 1] } : {}}
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
                            className={`p-5 bg-white border-slate-200/50 transition-all duration-300 relative ${
                              isSelected 
                                ? "shadow-premium ring-1 ring-slate-200/80" 
                                : "opacity-45 hover:opacity-75"
                            }`}
                          >
                            {/* Header: Date + Location */}
                            <div className="flex flex-wrap justify-between items-start gap-2 mb-3 border-b border-slate-100 pb-2">
                              <div>
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
                                  STEP {index + 1}
                                </span>
                                <h4 className="font-display text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                                  {node.location}
                                </h4>
                              </div>
                              
                              <div className="text-[9px] font-semibold text-slate-500 bg-slate-100/60 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                                <Calendar className="w-2.5 h-2.5" />
                                {node.date}
                              </div>
                            </div>

                            {/* Node Image */}
                            <div className="relative h-[160px] w-full rounded-xl overflow-hidden mb-3 border border-slate-100">
                              <img
                                src={node.image}
                                alt={node.title}
                                className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                              />
                            </div>

                            {/* Node Content */}
                            <h3 className="font-display text-sm font-bold text-slate-800 mb-1 group-hover:text-brand-cyan transition-colors">
                              {node.title}
                            </h3>
                            <p className="text-foreground-muted text-[11px] sm:text-xs leading-relaxed line-clamp-2">
                              {node.description}
                            </p>

                            {/* Active story visualizer link */}
                            {isSelected && (
                              <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between items-center text-[9px] text-brand-cyan font-bold uppercase tracking-wider">
                                <span className="flex items-center gap-1">
                                  <Sparkles className="w-3 h-3 fill-brand-cyan/10" /> AI journal entry ready
                                </span>
                                <span className="flex items-center gap-0.5">
                                  Read Full Diary <Navigation className="w-2 h-2 rotate-45" />
                                </span>
                              </div>
                            )}
                          </Card>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
