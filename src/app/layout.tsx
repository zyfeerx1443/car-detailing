import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "latin-ext"],
  variable: "--font-unbounded",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "APEX Detailing — Studio detailingu samochodowego w Warszawie",
  description:
    "Profesjonalny auto detailing w Warszawie (Mokotów): mycie detailingowe, polerowanie One-Step, powłoki ceramiczne 9H oraz pranie i detailing wnętrza. Szybka wycena online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${manrope.variable} ${unbounded.variable} dark`}>
      <body className="font-sans antialiased bg-[#09090b] text-zinc-100">
        {children}
      </body>
    </html>
  );
}
