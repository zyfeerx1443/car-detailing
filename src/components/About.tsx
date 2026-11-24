import { UserCheck, FlaskConical, Sun } from "lucide-react";
import { PARTNER_BRANDS } from "@/data/studio";

const ADVANTAGES = [
  {
    icon: UserCheck,
    title: "Certyfikowani specjaliści",
    description:
      "Doświadczeni detailerzy pracujący według procedur producentów powłok. Przed każdą korektą wykonujemy pomiar grubości lakieru.",
  },
  {
    icon: FlaskConical,
    title: "Niemiecka chemia premium",
    description:
      "Pracujemy wyłącznie na oryginalnych kosmetykach Koch-Chemie, Sonax Profiline i Gyeon — bezpiecznych dla lakieru, skóry i alcantary.",
  },
  {
    icon: Sun,
    title: "Sterylne, jasne studio",
    description:
      "Oświetlenie inspekcyjne CRI 98 ujawnia najdrobniejsze rysy i hologramy. Stała temperatura i monitorowane stanowiska w Warszawie.",
  },
];

export function About() {
  return (
    <section
      id="o-studiu"
      className="scroll-mt-24 border-t border-white/[0.06] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              O studiu
            </p>
            <h2 className="mt-2.5 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Minimalizm, precyzja i dbałość o detale
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
              Nie pracujemy masowo. Przyjmujemy ograniczoną liczbę aut dziennie,
              aby każdy etap — od mycia wstępnego po utwardzenie powłoki —
              przebiegał w kontrolowanych warunkach.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="mono-card overflow-hidden rounded-2xl p-1.5">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                <img
                  src="/images/studio-bay.jpg"
                  alt="Nowoczesne studio detailingu w Warszawie z profesjonalnym oświetleniem LED"
                  className="h-full w-full object-cover grayscale contrast-[1.06] brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 sm:bottom-5 sm:left-5 sm:right-5">
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400">
                      Mokotów · Warszawa
                    </div>
                    <div className="mt-0.5 font-display text-sm font-semibold text-white sm:text-base">
                      4 stanowiska w strefie bezpyłowej
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/15 bg-[#09090b]/80 px-3 py-1.5 text-right backdrop-blur-md">
                    <div className="font-display text-xs font-semibold text-white sm:text-sm">
                      CRI 98
                    </div>
                    <div className="text-[10px] text-zinc-400">światło LED</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Clean Pillars */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {ADVANTAGES.map((adv) => {
            const Icon = adv.icon;
            return (
              <div
                key={adv.title}
                className="mono-card rounded-2xl p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-white">
                  {adv.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                  {adv.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Partner Brands Strip */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-white/[0.07] py-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Wykorzystywane marki
          </span>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {PARTNER_BRANDS.map((brand) => (
              <span
                key={brand}
                className="font-display text-xs font-medium tracking-[0.16em] text-zinc-400"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
