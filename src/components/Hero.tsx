import { ArrowRight, MessageCircle } from "lucide-react";
import { StudioProfile, buildWhatsAppUrl } from "@/data/studio";

const HERO_STATS = [
  { value: "Gwarancja do 5 lat", label: "Certyfikowane powłoki ceramiczne" },
  { value: "8+ lat doświadczenia", label: "Zespół certyfikowanych detailerów" },
  { value: "Ponad 1 000 aut", label: "Zrealizowanych projektów w Warszawie" },
];

export function Hero({ studio }: { studio: StudioProfile }) {
  const quickWhatsAppUrl = buildWhatsAppUrl(
    `Dzień dobry! Chciałbym zapytać o wolny termin i wycenę detailingu w studiu ${studio.name}.`,
    studio.whatsappNumber
  );

  return (
    <section className="relative isolate flex min-h-[82svh] items-center overflow-hidden bg-[#0a0a0b] py-20 sm:py-28 lg:py-32">
      {/* Cinematic Dark Studio Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src="/images/hero-car.jpg"
          alt="Samochód po detailingu i aplikacji powłoki ceramicznej w studiu w Warszawie"
          className="h-full w-full object-cover object-center grayscale contrast-[1.08] brightness-[0.52]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/60 via-[#0a0a0b]/50 to-[#0a0a0b]/90" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Soft Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 rounded-full bg-black/55 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff6b81] backdrop-blur-md">
          <span>Studio auto detailingu</span>
          <span className="text-white/30">•</span>
          <span className="normal-case tracking-normal text-zinc-200">
            {studio.address}
          </span>
        </div>

        {/* Centered Bold Headline */}
        <h1 className="mx-auto mt-6 max-w-4xl break-words font-display text-3xl font-bold leading-[1.14] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
          <span className="block">{studio.name}</span>
          <span className="mt-2 block text-zinc-300">
            Detailing samochodowy i ochrona lakieru
          </span>
        </h1>

        {/* Clean Airy Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
          Mycie detailingowe, korekta One-Step, powłoki ceramiczne 9H oraz
          pranie i pielęgnacja wnętrza. Przejrzysty cennik i szybka wycena w
          kalkulatorze online.
        </p>

        {/* Soft Pill Buttons */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <a
            href="#kalkulator"
            className="soft-pill-crimson inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold tracking-wide sm:w-auto sm:text-base"
          >
            <span>Oblicz koszt</span>
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href={quickWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="soft-pill-dark-ghost inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold sm:w-auto sm:text-base"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Wyślij na WhatsApp</span>
          </a>
        </div>

        {/* Floating Soft Rounded Stat Container */}
        <div className="mx-auto mt-14 max-w-4xl rounded-3xl bg-white/[0.06] px-6 py-6 backdrop-blur-xl sm:mt-16 sm:px-10 sm:py-7">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
            {HERO_STATS.map((stat) => (
              <div key={stat.value} className="text-center">
                <div className="font-display text-base font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs leading-relaxed text-zinc-300">
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
