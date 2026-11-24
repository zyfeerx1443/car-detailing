import { MapPin, Clock, Phone, Mail, MessageCircle } from "lucide-react";
import { STUDIO_INFO } from "@/data/studio";

export function Footer() {
  return (
    <footer
      id="kontakt"
      className="bg-[#0a0a0b] pb-12 pt-16 text-zinc-300 sm:pt-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Emblem Header echoing reference footer */}
        <div className="flex flex-col items-center text-center">
          <a href="#" className="inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.08] text-white">
              <span className="font-display text-base font-extrabold">A</span>
            </div>
            <div className="text-left leading-none">
              <div className="font-display text-base font-bold tracking-[0.16em] text-white">
                {STUDIO_INFO.brand}
              </div>
              <div className="mt-1 text-[10px] font-semibold tracking-[0.22em] text-zinc-500">
                {STUDIO_INFO.brandSub}
              </div>
            </div>
          </a>
        </div>

        {/* 3 Spacious Columns with clean thin underlines */}
        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-14">
          {/* Column 1: Contact & Socials */}
          <div>
            <h3 className="border-b border-white/10 pb-3 text-xs font-bold uppercase tracking-[0.18em] text-white">
              APEX Detailing
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-zinc-400">
              <li>
                <a
                  href={`mailto:${STUDIO_INFO.email}`}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-zinc-500" />
                  <span>{STUDIO_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={STUDIO_INFO.phoneHref}
                  className="inline-flex items-center gap-2.5 font-semibold text-white transition-colors hover:text-[#ff7b8e]"
                >
                  <Phone className="h-4 w-4 text-zinc-400" />
                  <span>{STUDIO_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                <span>{STUDIO_INFO.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                <span>{STUDIO_INFO.hours}</span>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={STUDIO_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#c8102e]"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={STUDIO_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-white/[0.05] px-4 py-2 text-xs font-semibold text-zinc-300 transition-colors hover:bg-white/[0.12] hover:text-white"
              >
                Instagram
              </a>
              <a
                href={STUDIO_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-white/[0.05] px-4 py-2 text-xs font-semibold text-zinc-300 transition-colors hover:bg-white/[0.12] hover:text-white"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Column 2: Oferta */}
          <div>
            <h3 className="border-b border-white/10 pb-3 text-xs font-bold uppercase tracking-[0.18em] text-white">
              Strefa Klienta
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-zinc-400">
              {[
                { href: "#uslugi", label: "Usługi i cennik" },
                { href: "#kalkulator", label: "Kalkulator kosztów" },
                { href: "#rezerwacja", label: "Rezerwacja terminu" },
                { href: "#opinie", label: "Opinie klientów" },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Informacje */}
          <div>
            <h3 className="border-b border-white/10 pb-3 text-xs font-bold uppercase tracking-[0.18em] text-white">
              Informacje
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-zinc-400">
              <li>
                <a
                  href="#o-studiu"
                  className="transition-colors hover:text-white"
                >
                  O naszym studiu
                </a>
              </li>
              <li className="text-zinc-500">{STUDIO_INFO.addressNote}</li>
              <li className="text-zinc-500">
                Bezpłatna inspekcja lakieru przed wyceną
              </li>
              <li className="text-zinc-500">
                Płatność kartą, gotówką lub BLIK
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/[0.06] pt-6 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} {STUDIO_INFO.brand}{" "}
          {STUDIO_INFO.brandSub}. Wszelkie prawa zastrzeżone · Warszawa, Polska
        </div>
      </div>
    </footer>
  );
}
