import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Showcase from "@/components/sections/Showcase";
import AIFeatures from "@/components/sections/AIFeatures";
import TimelinePreview from "@/components/sections/TimelinePreview";
import StoryGenerator from "@/components/sections/StoryGenerator";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-brand-cyan/20 selection:text-slate-900">
      {/* Sticky Header Navigation */}
      <Header />

      {/* Primary Landing Page Components */}
      <Hero />
      <Showcase />
      <AIFeatures />
      <TimelinePreview />
      <StoryGenerator />
      <Testimonials />
      <CTA />
    </main>
  );
}
