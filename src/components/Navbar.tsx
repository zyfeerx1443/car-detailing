"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, Clock, MapPin, ArrowUpRight } from "lucide-react";
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
    const onScroll = () => setScrolled(window.scrollY > 36);
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
    <header className="sticky top-0 z-50 w-full">
      {/* Top Crimson Info Bar (inspired by reference screenshot) */}
      <div className="bg-[#c8102e] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 text-xs font-medium sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <a
              href={STUDIO_INFO.phoneHref}
              className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-85"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{STUDIO_INFO.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${STUDIO_INFO.email}`}
              className="hidden items-center gap-1.5 transition-opacity hover:opacity-85 sm:inline-flex"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>{STUDIO_INFO.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-5">
            <span className="hidden items-center gap-1.5 md:inline-flex">
              <MapPin className="h-3.5 w-3.5" />
              <span>Warszawa, Mokotów</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{STUDIO_INFO.hours}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Black Navigation Bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-[#0a0a0b]/95 shadow-[0_14px_40px_-18px_rgba(0,0,0,0.9)] backdrop-blur-xl py-3.5"
            : "bg-[#0a0a0b] py-4"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <a
            href="#"
            className="flex items-center gap-3 focus:outline-none"
            aria-label="APEX Detailing Warszawa — Strona główna"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.08] text-white">
              <span className="font-display text-base font-extrabold tracking-tight">
                A
              </span>
            </div>
            <div className="leading-none">
              <div className="font-display text-base font-bold tracking-[0.14em] text-white">
                {STUDIO_INFO.brand}
              </div>
              <div className="mt-1 text-[10px] font-semibold tracking-[0.22em] text-zinc-400">
                {STUDIO_INFO.brandSub}
              </div>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden items-center gap-1 rounded-full bg-white/[0.04] px-2 py-1.5 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#rezerwacja"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-colors hover:bg-zinc-200"
            >
              <span>Zarezerwuj termin</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={STUDIO_INFO.phoneHref}
              aria-label="Zadzwoń do studia"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] text-white"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] text-white"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="mt-3 bg-[#0a0a0b] px-4 pb-8 pt-4 lg:hidden">
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-2xl bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-zinc-100 transition-colors hover:bg-white/[0.08]"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-zinc-400" />
                </a>
              ))}
            </nav>

            <div className="mt-5 rounded-3xl bg-white/[0.04] p-5">
              <div className="text-sm font-semibold text-white">
                {STUDIO_INFO.phoneDisplay}
              </div>
              <div className="mt-1 text-xs text-zinc-400">
                {STUDIO_INFO.address}
              </div>
              <a
                href="#kalkulator"
                onClick={() => setMobileOpen(false)}
                className="soft-pill-crimson mt-4 flex w-full items-center justify-center rounded-full px-5 py-3.5 text-sm font-bold"
              >
                Oblicz koszt
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
