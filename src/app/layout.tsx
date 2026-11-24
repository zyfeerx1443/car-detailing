import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
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
    <html lang="pl" className={`${manrope.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased bg-[#0a0a0b] text-zinc-100">
        {children}
      </body>
    </html>
  );
}
