import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "APEX Detailing Lab — Премиальный детейлинг и защита авто в Москве",
  description:
    "Премиальный детейлинг в Москве: керамика 9H, восстановительная полировка, оклейка полиуретановой плёнкой LLumar и SunTek, детейлинг-химчистка и предпродажная подготовка. Гарантия до 5 лет.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${unbounded.variable} dark`}>
      <body className="font-sans antialiased bg-[#08090c] text-zinc-100 selection:bg-amber-500/30">
        {children}
      </body>
    </html>
  );
}
