"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { STUDIO_INFO } from "@/data/studio";

const NAV_LINKS = [
  { href: "#services", label: "Услуги" },
  { href: "#calculator", label: "Калькулятор" },
  { href: "#about", label: "О студии" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-[#08090c]/85 backdrop-blur-2xl border-b border-white/[0.08] py-3"
          : "bg-gradient-to-b from-[#08090c]/90 via-[#08090c]/45 to-transparent py-4 md:py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a
          href="#"
          className="group flex items-center gap-3 focus:outline-none"
          aria-label="APEX Detailing Lab — На главную"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/40 bg-amber-500/10 shadow-[0_0_24px_-6px_rgba(245,158,11,0.55)] transition-transform duration-300 group-hover:scale-105">
            <span className="font-display text-base font-bold tracking-tight text-amber-400">
              A
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
          </div>
          <div className="leading-none">
            <div className="font-display text-sm font-bold tracking-[0.14em] text-white sm:text-base">
              {STUDIO_INFO.brand}
            </div>
            <div className="mt-1 text-[10px] font-semibold tracking-[0.22em] text-zinc-400">
              {STUDIO_INFO.brandSub}
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.03] px-2 py-1.5 backdrop-blur-xl lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.07] hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <div className="text-right leading-tight">
            <a
              href={STUDIO_INFO.phoneHref}
              className="text-sm font-semibold tracking-tight text-white transition-colors hover:text-amber-400"
            >
              {STUDIO_INFO.phoneDisplay}
            </a>
            <div className="mt-0.5 flex items-center justify-end gap-1 text-[11px] text-zinc-400">
              <MapPin className="h-3 w-3 text-amber-400/90" />
              <span>{STUDIO_INFO.city} · 09:00–21:00</span>
            </div>
          </div>
          <a
            href="#booking"
            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/40 bg-amber-500/15 px-4 py-2.5 text-sm font-semibold text-amber-300 transition-all hover:border-amber-400 hover:bg-amber-500 hover:text-zinc-950"
          >
            <span>Записаться</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={STUDIO_INFO.phoneHref}
            aria-label="Позвонить в студию"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-amber-400 transition-colors hover:bg-white/10"
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/10"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-white/[0.08] bg-[#08090c]/98 px-4 pb-8 pt-6 backdrop-blur-2xl lg:hidden">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-2xl border border-white/[0.05] bg-white/[0.025] px-4 py-3.5 text-base font-semibold text-zinc-100 transition-colors active:bg-amber-500/15"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="h-4 w-4 text-amber-400" />
              </a>
            ))}
          </nav>

          <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
            <a
              href={STUDIO_INFO.phoneHref}
              className="block font-display text-lg font-semibold text-white"
            >
              {STUDIO_INFO.phoneDisplay}
            </a>
            <p className="mt-1 text-xs text-zinc-400">{STUDIO_INFO.address}</p>
            <p className="mt-0.5 text-xs text-amber-400/90">{STUDIO_INFO.hours}</p>
            <a
              href="#calculator"
              onClick={() => setMobileOpen(false)}
              className="neon-amber-btn mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-zinc-950"
            >
              Рассчитать стоимость
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
