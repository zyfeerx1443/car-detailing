import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import {
  DEFAULT_STUDIO_NAME,
  buildPageDescription,
  buildPageTitle,
} from "@/data/studio";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

// Fallback for routes without their own metadata; the landing page
// generates personalized metadata from URL params in app/page.tsx.
export const metadata: Metadata = {
  title: buildPageTitle(DEFAULT_STUDIO_NAME),
  description: buildPageDescription(DEFAULT_STUDIO_NAME),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${manrope.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased bg-[#0a0a0b] text-zinc-100">
        {children}
      </body>
    </html>
  );
}
