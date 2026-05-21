import { create } from "zustand";
import { TravelItinerary, GeneratedStory } from "@/lib/gemini";

export interface JourneyNode {
  id: string;
  title: string;
  location: string;
  coordinates: [number, number]; // [lat, lng]
  date: string;
  image: string;
  description: string;
}

export interface Journey {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  nodes: JourneyNode[];
}

interface TravelState {
  // Journey state
  journeys: Journey[];
  activeJourneyId: string | null;
  selectedNodeId: string | null;
  
  // AI Itinerary state
  itineraryLoading: boolean;
  generatedItinerary: TravelItinerary | null;
  
  // AI Story state
  storyLoading: boolean;
  generatedStory: GeneratedStory | null;
  
  // Actions
  setActiveJourney: (id: string) => void;
  setSelectedNode: (id: string | null) => void;
  setItineraryLoading: (loading: boolean) => void;
  setGeneratedItinerary: (itinerary: TravelItinerary | null) => void;
  setStoryLoading: (loading: boolean) => void;
  setGeneratedStory: (story: GeneratedStory | null) => void;
}

// Premium mock journeys data (Polarsteps-inspired)
const MOCK_JOURNEYS: Journey[] = [
  {
    id: "trip-tokyo-kyoto",
    title: "Kyoto & Tokyo: The Modern and The Ancient",
    description: "An immersive transition from the neon corridors of Shibuya to the quiet wooden temples of Higashiyama.",
    coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200",
    startDate: "May 10, 2026",
    endDate: "May 22, 2026",
    nodes: [
      {
        id: "node-tokyo",
        title: "Neon Echoes in Shibuya",
        location: "Tokyo, Japan",
        coordinates: [35.6580, 139.7016],
        date: "May 10, 2026",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800",
        description: "The journey begins. Under the giant screens of Shibuya Crossing, we watched the light rain mirror the neon glare, walking into back-alley ramen stalls.",
      },
      {
        id: "node-fuji",
        title: "Mist over Kawaguchiko",
        location: "Mount Fuji, Japan",
        coordinates: [35.5011, 138.7562],
        date: "May 14, 2026",
        image: "https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?auto=format&fit=crop&q=80&w=800",
        description: "Waking up at 5:00 AM, the volcanic peak of Fuji emerged slowly from the morning fog, perfectly symmetric and calm above the silver lake.",
      },
      {
        id: "node-kyoto",
        title: "The Bamboo Path at Arashiyama",
        location: "Kyoto, Japan",
        coordinates: [35.0116, 135.7681],
        date: "May 18, 2026",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
        description: "Walking between towering stalks of bamboo. The wind makes a hollow, ringing rustle. Here, the hurry of Tokyo fades entirely into the moss-covered rocks.",
      },
    ],
  },
  {
    id: "trip-amalfi",
    title: "Amalfi Coast: Vertical Cliffs & Turquoise Seas",
    description: "Driving along narrow cliffside highways from Sorrento to Positano, smelling the salt and lemon trees.",
    coverImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200",
    startDate: "June 02, 2026",
    endDate: "June 12, 2026",
    nodes: [
      {
        id: "node-sorrento",
        title: "Sunset over the Bay",
        location: "Sorrento, Italy",
        coordinates: [40.6263, 14.3758],
        date: "June 02, 2026",
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800",
        description: "Sorted out our luggage and watched the golden hour turn the limestone cliffs into orange pillars above the dark blue Tyrrhenian Sea.",
      },
      {
        id: "node-positano",
        title: "The Colored Houses of the Cliff",
        location: "Positano, Italy",
        coordinates: [40.6281, 14.4850],
        date: "June 06, 2026",
        image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=800",
        description: "A cascade of terracotta, rose, and white houses stacked directly on the vertical cliffs. Walked down 1,000 steps to the pebble beaches.",
      },
      {
        id: "node-ravello",
        title: "Infinity Terrace View",
        location: "Ravello, Italy",
        coordinates: [40.6491, 14.6116],
        date: "June 10, 2026",
        image: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?auto=format&fit=crop&q=80&w=800",
        description: "High above the ocean, the gardens of Villa Cimbrone open up into the Terrace of Infinity, where marble busts stand guard over the sky.",
      },
    ],
  },
];

export const useTravelStore = create<TravelState>((set) => ({
  journeys: MOCK_JOURNEYS,
  activeJourneyId: "trip-tokyo-kyoto",
  selectedNodeId: "node-tokyo",
  
  itineraryLoading: false,
  generatedItinerary: null,
  
  storyLoading: false,
  generatedStory: null,
  
  setActiveJourney: (id) => set((state) => {
    const journey = state.journeys.find((j) => j.id === id);
    return {
      activeJourneyId: id,
      selectedNodeId: journey?.nodes[0]?.id || null,
    };
  }),
  setSelectedNode: (id) => set({ selectedNodeId: id }),
  setItineraryLoading: (loading) => set({ itineraryLoading: loading }),
  setGeneratedItinerary: (itinerary) => set({ generatedItinerary: itinerary }),
  setStoryLoading: (loading) => set({ storyLoading: loading }),
  setGeneratedStory: (story) => set({ generatedStory: story }),
}));
