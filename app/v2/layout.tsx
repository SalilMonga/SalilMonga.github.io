import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./v2.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Salil Monga — Engineer's Playground",
  description:
    "Full-Stack Engineer, XR Developer, Builder. Explore an immersive portfolio experience.",
  openGraph: {
    title: "Salil Monga — Engineer's Playground",
    description:
      "Full-Stack Engineer, XR Developer, Builder. Explore an immersive portfolio experience.",
    type: "website",
  },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      style={{
        backgroundColor: "var(--v2-bg-primary)",
        color: "var(--v2-text-primary)",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}
