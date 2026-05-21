"use client";

import { useTravelStore } from "@/store/useTravelStore";
import { motion } from "framer-motion";
import { Compass, Crosshair } from "lucide-react";

export default function TravelMap() {
  const { journeys, activeJourneyId, selectedNodeId, setSelectedNode } = useTravelStore();

  // Find active journey and nodes
  const activeJourney = journeys.find((j) => j.id === activeJourneyId) || journeys[0];
  const nodes = activeJourney?.nodes || [];
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  // Calculate mock coordinates projection for SVG viewBox [0 to 300, 0 to 200]
  // We can project lat/long coordinates relative to min/max coords of nodes
  const projectCoords = (coords: [number, number]): [number, number] => {
    if (nodes.length <= 1) return [150, 100];
    
    const lats = nodes.map(n => n.coordinates[0]);
    const lngs = nodes.map(n => n.coordinates[1]);
    
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const latSpan = maxLat - minLat || 1;
    const lngSpan = maxLng - minLng || 1;

    // Map long to X (50 to 250) and lat to Y (150 to 50, inverted because Y increases downwards)
    const x = 50 + ((coords[1] - minLng) / lngSpan) * 200;
    const y = 150 - ((coords[0] - minLat) / latSpan) * 100;
    
    return [x, y];
  };

  // Build the SVG path string
  let pathD = "";
  if (nodes.length > 1) {
    const points = nodes.map(n => projectCoords(n.coordinates));
    pathD = `M ${points[0][0]} ${points[0][1]} ` + points.slice(1).map(p => `L ${p[0]} ${p[1]}`).join(" ");
  }

  return (
    <div className="relative w-full h-[400px] lg:h-[500px] bg-slate-50 border border-slate-200/60 rounded-3xl overflow-hidden shadow-inner flex flex-col justify-between p-6 pattern-dots">
      {/* Map Header details */}
      <div className="flex justify-between items-start z-10">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">TELEMETRY MATRIX</span>
          <h4 className="text-xs font-bold font-display text-slate-700 flex items-center gap-1.5">
            <Crosshair className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
            {activeJourney?.title || "Active Path"}
          </h4>
        </div>
        
        <div className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200/60 flex items-center gap-1 shadow-sm">
          <Compass className="w-3.5 h-3.5 text-brand-orange animate-spin-slow" />
          <span className="text-[9px] font-bold text-slate-600 tracking-wider">
            GRID ACTIVE
          </span>
        </div>
      </div>

      {/* Vector Path Layer */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 300 200" className="w-full h-full p-12 overflow-visible">
          {/* Connecting Path */}
          {pathD && (
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#map-grad)"
              strokeWidth="2"
              strokeDasharray="6 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}

          <defs>
            <linearGradient id="map-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>

          {/* Node plot markers */}
          {nodes.map((node) => {
            const [x, y] = projectCoords(node.coordinates);
            const isSelected = node.id === selectedNodeId;

            return (
              <g key={node.id} className="cursor-pointer" onClick={() => setSelectedNode(node.id)}>
                {/* Outer Glow ring for selected node */}
                {isSelected && (
                  <motion.circle
                    cx={x}
                    cy={y}
                    r="12"
                    fill="rgba(6, 182, 212, 0.15)"
                    stroke="rgba(6, 182, 212, 0.4)"
                    strokeWidth="1"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                
                {/* Inner marker */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? "5" : "4"}
                  fill={isSelected ? "#06B6D4" : "#94A3B8"}
                  stroke="#FFFFFF"
                  strokeWidth={isSelected ? "1.5" : "1"}
                  className="transition-colors duration-300"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating telemetry panel */}
      {selectedNode && (
        <div className="glass-panel p-4 rounded-2xl w-full max-w-[280px] shadow-glass z-10 space-y-1.5 self-start sm:self-auto border-slate-200/50">
          <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase tracking-wider">
            <span>COORDINATES</span>
            <span className="text-brand-cyan">LAT / LNG</span>
          </div>
          <div className="font-display font-bold text-xs text-slate-800 flex items-center justify-between">
            <span>{selectedNode.location}</span>
            <span className="font-mono text-[10px] text-slate-500">
              {selectedNode.coordinates[0].toFixed(4)}°, {selectedNode.coordinates[1].toFixed(4)}°
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
