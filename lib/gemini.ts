/**
 * VoyageAI Gemini AI Integration Client
 * Provides structure for generating travel itineraries and narratives.
 */

export interface ItineraryDay {
  day: number;
  title: string;
  activities: {
    time: string;
    activity: string;
    description: string;
    location: string;
    icon: "morning" | "afternoon" | "evening" | "night";
  }[];
}

export interface TravelItinerary {
  destination: string;
  days: number;
  style: string;
  summary: string;
  plan: ItineraryDay[];
}

export interface GeneratedStory {
  title: string;
  excerpt: string;
  chapters: {
    title: string;
    content: string;
    location: string;
    mood: string;
  }[];
}

// Simulate latency for AI queries
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function generateItinerary(
  destination: string,
  days: number,
  style: string
): Promise<TravelItinerary> {
  await delay(1500); // Simulate network and inference time

  // Structured response for AI planning
  return {
    destination,
    days,
    style,
    summary: `A tailored ${style} exploration of ${destination} crafted for deep immersion, balancing iconic milestones with hidden paths.`,
    plan: Array.from({ length: days }, (_, i) => {
      const dayNum = i + 1;
      return {
        day: dayNum,
        title: `Day ${dayNum}: Local Vibe & Iconic Landmarks`,
        activities: [
          {
            time: "09:00 AM",
            activity: "Sunrise Exploration & Specialty Coffee",
            description: "Begin with a slow morning walk through historic streets, grabbing single-origin coffee from a hidden alley cafe.",
            location: `${destination} Historic Quarter`,
            icon: "morning",
          },
          {
            time: "01:30 PM",
            activity: "Architectural Landmark & Local Dining",
            description: "Immerse in the visual arts scene by touring a design museum, followed by a seasonal, farm-to-table culinary tasting.",
            location: `${destination} Arts District`,
            icon: "afternoon",
          },
          {
            time: "06:30 PM",
            activity: "Panoramic Skyline Golden Hour",
            description: "Watch the sun dip below the horizon from a premium observation deck, offering uninterrupted city views.",
            location: `${destination} Sky Deck`,
            icon: "evening",
          },
          {
            time: "09:00 PM",
            activity: "Nightlife Discoveries",
            description: "Unwind at a low-key vinyl listening lounge featuring curated cocktails and local ambiance.",
            location: `${destination} Downtown`,
            icon: "night",
          },
        ],
      };
    }),
  };
}

export async function generateTravelStory(
  title: string,
  locations: string[],
  mood: string
): Promise<GeneratedStory> {
  await delay(2000); // Simulate story generation inference

  const displayTitle = title || `Echoes of ${locations[0] || "the Road"}`;
  
  return {
    title: displayTitle,
    excerpt: `An editorial recount of wandering across ${locations.join(" to ")} wrapped in a ${mood} atmosphere.`,
    chapters: locations.map((loc, idx) => {
      const contents = [
        `The mornings here have a specific weight. The air, crisp and tasting slightly of the nearby ocean, drifts through open archways. As the first tram rattles down the cobblestone tracks, the town wakes up in patches. There is no rush; there is only the rhythm of steps against ancient stone.`,
        `Time stretches differently when you are looking at things designed to outlast centuries. We spent hours tracking the movement of light across concrete columns, watching shadows merge. By late afternoon, we found a local bakery, eating warm bread on a wooden bench while watching the world slide past.`,
        `As twilight descends, the streetlights paint everything in gold. The conversation turns soft, matching the hum of the surrounding bistros. It becomes clear that the destination is merely a canvas; the true memory lies in the quiet spaces between landmarks, in the stillness of looking up at stars in an unfamiliar sky.`
      ];

      return {
        title: `Chapter ${idx + 1}: The Light in ${loc}`,
        content: contents[idx % contents.length],
        location: loc,
        mood: mood,
      };
    }),
  };
}
