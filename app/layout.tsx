import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Salil Monga’s Portfolio",
  description: "Just a fun portfolio website to learn and explore React",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="text-slate-100" style={{ backgroundColor: '#23272f' }}>
      <body className={inter.className} style={{ backgroundColor: '#23272f' }}>{children}</body>
    </html>
  );
}
