import { ArrowRight, MessageCircle } from "lucide-react";
import { STUDIO_INFO, buildWhatsAppUrl } from "@/data/studio";

const HERO_STATS = [
  { value: "Gwarancja do 5 lat", label: "Certyfikowane powłoki 9H" },
  { value: "8+ lat doświadczenia", label: "Zespół certyfikowanych detailerów" },
  { value: "Ponad 1 000 aut", label: "Zrealizowanych projektów w Warszawie" },
];

export function Hero() {
  const quickWhatsAppUrl = buildWhatsAppUrl(
    "Dzień dobry! Chciałbym zapytać o wolny termin i wycenę detailingu w Warszawie."
  );

  return (
    <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden pb-16 pt-28 sm:pt-36 lg:pb-24">
      {/* Monochrome Studio Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src="/images/hero-car.jpg"
          alt="Samochód po detailingu i aplikacji powłoki ceramicznej w studiu w Warszawie"
          className="h-full w-full object-cover object-[70%_center] grayscale contrast-[1.08] brightness-[0.65] lg:object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/85 to-[#09090b]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/50" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1 text-xs font-medium tracking-wide text-zinc-300">
            <span>Studio auto detailingu</span>
            <span className="text-zinc-600">·</span>
            <span className="text-white">{STUDIO_INFO.city}, Mokotów</span>
          </div>

          {/* Headline */}
          <h1 className="mt-6 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Detailing samochodowy i ochrona lakieru w{" "}
            <span className="text-zinc-300">{STUDIO_INFO.cityLocative}</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Mycie detailingowe, korekta One-Step, powłoki ceramiczne 9H oraz
            pranie i pielęgnacja wnętrza. Przejrzysty cennik i szybka wycena w
            kalkulatorze online.
          </p>

          {/* Primary Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#kalkulator"
              className="btn-primary-white inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold sm:w-auto sm:text-base"
            >
              <span>Oblicz koszt</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-mono inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold sm:w-auto sm:text-base"
            >
              <MessageCircle className="h-4 w-4 text-zinc-300" />
              <span>Wyślij na WhatsApp</span>
            </a>
          </div>

          {/* Minimalist Hairline Proof Strip */}
          <div className="mt-12 grid grid-cols-1 gap-5 border-t border-white/10 pt-8 sm:grid-cols-3 sm:gap-6">
            {HERO_STATS.map((stat) => (
              <div key={stat.value}>
                <div className="font-display text-sm font-semibold text-white sm:text-[15px]">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs leading-relaxed text-zinc-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
