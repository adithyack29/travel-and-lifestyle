import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/animations/SmoothScroll";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "VoyageAI — Plan. Explore. Remember.",
  description: "An immersive AI-powered travel memory ecosystem. Plan trips, track journeys visually, generate cinematic timelines, and write emotional journals automatically.",
  metadataBase: new URL("https://voyageai-travel.vercel.app"),
  openGraph: {
    title: "VoyageAI — Plan. Explore. Remember.",
    description: "An immersive AI-powered travel memory ecosystem.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "VoyageAI — Plan. Explore. Remember.",
    description: "An immersive AI-powered travel memory ecosystem.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased bg-background text-foreground`}>
        <QueryProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </QueryProvider>
      </body>
    </html>
  );
}
