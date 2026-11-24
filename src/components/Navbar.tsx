"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { STUDIO_INFO } from "@/data/studio";

const NAV_LINKS = [
  { href: "#uslugi", label: "Usługi" },
  { href: "#kalkulator", label: "Kalkulator" },
  { href: "#o-studiu", label: "O studiu" },
  { href: "#opinie", label: "Opinie" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || mobileOpen
          ? "bg-[#09090b]/90 backdrop-blur-xl border-b border-white/[0.08] py-3.5"
          : "bg-gradient-to-b from-[#09090b]/85 to-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-3 focus:outline-none"
          aria-label="APEX Detailing Warszawa — Strona główna"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/25 bg-white/[0.06]">
            <span className="font-display text-sm font-bold text-white">A</span>
          </div>
          <div className="leading-none">
            <div className="font-display text-sm font-semibold tracking-[0.16em] text-white">
              {STUDIO_INFO.brand}
            </div>
            <div className="mt-1 text-[10px] font-medium tracking-[0.2em] text-zinc-400">
              {STUDIO_INFO.brandSub}
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={STUDIO_INFO.phoneHref}
            className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            {STUDIO_INFO.phoneDisplay}
          </a>
          <a
            href="#rezerwacja"
            className="btn-primary-white inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold"
          >
            <span>Zarezerwuj termin</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={STUDIO_INFO.phoneHref}
            aria-label="Zadzwoń do studia"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-white"
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-white"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-white/[0.08] bg-[#09090b] px-4 pb-8 pt-5 lg:hidden">
          <nav className="flex flex-col divide-y divide-white/[0.06]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between py-3.5 text-base font-medium text-zinc-200 transition-colors hover:text-white"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="h-4 w-4 text-zinc-500" />
              </a>
            ))}
          </nav>

          <div className="mt-6 space-y-3 border-t border-white/[0.08] pt-5">
            <div className="text-sm font-medium text-white">
              {STUDIO_INFO.phoneDisplay}
            </div>
            <div className="text-xs text-zinc-400">
              {STUDIO_INFO.address} · {STUDIO_INFO.hours}
            </div>
            <a
              href="#kalkulator"
              onClick={() => setMobileOpen(false)}
              className="btn-primary-white mt-3 flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold"
            >
              Oblicz koszt
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
