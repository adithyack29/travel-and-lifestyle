"use client";

import React from "react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "VoyageAI revolutionized our journeys, streamlining route tracking and journal formatting. The map visualization keeps our family updated.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
    name: "Briana Patton",
    role: "Expedition Leader",
  },
  {
    text: "Generating day-by-day itineraries was smooth and quick. The customizable maps and story exporter made reliving the trip effortless.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    name: "Bilal Ahmed",
    role: "Adventure Photographer",
  },
  {
    text: "The AI Storyteller is exceptional, compiling coordinates and photo metrics into beautiful chapters. Highly recommended.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120",
    name: "Saman Malik",
    role: "Travel Blogger",
  },
  {
    text: "The telemetry path overlay is spectacular. VoyageAI updates nodes dynamically as I sail, building an emotional chronicle of my trip.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
    name: "Omar Raza",
    role: "Globe Trotter",
  },
  {
    text: "Its clean design and seamless smooth scrolling feel premium. It turns raw camera coordinates into visual stories.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
    name: "Zainab Hussain",
    role: "Digital Nomad",
  },
  {
    text: "The automatic map projection exceeded my expectations. It maps altitude indices and lets me export high-fidelity travel PDFs.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120",
    name: "Aliza Khan",
    role: "Solo Backpacker",
  },
  {
    text: "VoyageAI keeps our road trip milestones pinned. The interactive showcasing page lets our audience participate in real-time.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120",
    name: "Farhan Siddiqui",
    role: "Van Life Creator",
  },
  {
    text: "We wanted a platform that understands travel context, and VoyageAI's AI planner curates spots with precise coordination.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120",
    name: "Sana Sheikh",
    role: "Journalist",
  },
  {
    text: "With the editorial journal book, exporting my travels into structured text takes minutes. A state-of-the-art app.",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=120",
    name: "Hassan Ali",
    role: "Mountaineer",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Testimonials() {
  return (
    <section className="bg-background py-24 relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-brand-cyan/10 to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[30%] h-[30%] rounded-full bg-gradient-to-br from-brand-purple/10 to-transparent blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center mb-16 space-y-4"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/15 rounded-full text-brand-cyan font-display text-[10px] font-bold tracking-wider uppercase">
            Testimonials
          </span>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient">
            What our users say
          </h2>
          <p className="text-foreground-muted text-sm sm:text-base leading-relaxed">
            See how travelers are using VoyageAI to plan, track, and share their global expeditions.
          </p>
        </motion.div>

        {/* Scrolling Columns Container */}
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[640px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}
