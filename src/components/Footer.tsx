import { MapPin, Clock, Phone, Mail, MessageCircle } from "lucide-react";
import { STUDIO_INFO } from "@/data/studio";

export function Footer() {
  return (
    <footer
      id="kontakt"
      className="border-t border-white/[0.08] bg-[#070709] pb-10 pt-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <a href="#" className="inline-flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/25 bg-white/[0.06]">
                <span className="font-display text-sm font-bold text-white">
                  A
                </span>
              </div>
              <div className="leading-none">
                <div className="font-display text-sm font-semibold tracking-[0.16em] text-white">
                  {STUDIO_INFO.brand}
                </div>
                <div className="mt-1 text-[10px] font-medium tracking-[0.2em] text-zinc-500">
                  {STUDIO_INFO.brandSub}
                </div>
              </div>
            </a>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              Studio auto detailingu na warszawskim Mokotowie. Pielęgnacja
              lakieru, powłoki ceramiczne oraz detailing wnętrza.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={STUDIO_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white hover:text-zinc-950"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={STUDIO_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
              >
                Instagram
              </a>
              <a
                href={STUDIO_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Nav */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">
              Menu
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
              {[
                { href: "#uslugi", label: "Usługi" },
                { href: "#kalkulator", label: "Kalkulator" },
                { href: "#o-studiu", label: "O studiu" },
                { href: "#opinie", label: "Opinie" },
                { href: "#rezerwacja", label: "Rezerwacja" },
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

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">
              Kontakt
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={STUDIO_INFO.phoneHref}
                  className="flex items-center gap-2.5 font-medium text-white hover:text-zinc-300"
                >
                  <Phone className="h-4 w-4 text-zinc-400" />
                  <span>{STUDIO_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${STUDIO_INFO.email}`}
                  className="flex items-center gap-2.5 text-zinc-400 hover:text-white"
                >
                  <Mail className="h-4 w-4 text-zinc-500" />
                  <span>{STUDIO_INFO.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Address & Hours */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">
              Adres i godziny otwarcia
            </h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                <div>
                  <div className="text-zinc-200">{STUDIO_INFO.address}</div>
                  <div className="mt-0.5 text-xs text-zinc-500">
                    {STUDIO_INFO.addressNote}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                <div className="text-zinc-200">{STUDIO_INFO.hours}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/[0.06] pt-6 text-xs text-zinc-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {STUDIO_INFO.brand}{" "}
            {STUDIO_INFO.brandSub}. Wszelkie prawa zastrzeżone.
          </p>
          <p>Warszawa, Polska</p>
        </div>
      </div>
    </footer>
  );
}
