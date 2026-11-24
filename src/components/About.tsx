import { UserCheck, FlaskConical, Sun } from "lucide-react";
import { PARTNER_BRANDS } from "@/data/studio";

const ADVANTAGES = [
  {
    icon: UserCheck,
    title: "Certyfikowani specjaliści",
    description:
      "Doświadczeni detailerzy pracujący według procedur producentów powłok. Przed każdą korektą wykonujemy dokładny pomiar grubości lakieru.",
  },
  {
    icon: FlaskConical,
    title: "Niemiecka chemia premium",
    description:
      "Pracujemy wyłącznie na oryginalnych kosmetykach Koch-Chemie, Sonax Profiline i Gyeon — w pełni bezpiecznych dla lakieru, skóry i alcantary.",
  },
  {
    icon: Sun,
    title: "Sterylne, jasne studio",
    description:
      "Oświetlenie inspekcyjne CRI 98 ujawnia najdrobniejsze rysy i hologramy. Stała temperatura i monitorowane stanowiska na Mokotowie.",
  },
];

export function About() {
  return (
    <section
      id="o-studiu"
      className="scroll-mt-24 bg-[#111114] py-24 text-zinc-100 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Split inspired by reference screenshot */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
              O studiu · Warszawa
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-[#ff7b8e] sm:text-4xl">
              Studio pielęgnacji i ochrony samochodów
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-zinc-300 sm:text-base">
              Detailing zaczyna się od porządku w procesie. Nie pracujemy
              masowo — przyjmujemy ograniczoną liczbę aut dziennie, aby każdy
              etap, od bezpiecznego mycia po korektę i aplikację powłoki,
              przebiegał w idealnych warunkach.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
              Każdy samochód traktujemy indywidualnie, dobierając chemię i
              system polerski do twardości lakieru oraz oczekiwanego efektu.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_70px_-24px_rgba(0,0,0,0.85)]">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src="/images/studio-bay.jpg"
                  alt="Nowoczesne studio detailingu w Warszawie z profesjonalnym oświetleniem LED"
                  className="h-full w-full object-cover grayscale contrast-[1.06] brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff7b8e]">
                      Mokotów · Warszawa
                    </div>
                    <div className="mt-1 font-display text-base font-bold text-white sm:text-lg">
                      4 stanowiska w strefie bezpyłowej
                    </div>
                  </div>
                  <div className="rounded-2xl bg-black/60 px-4 py-2 text-right backdrop-blur-md">
                    <div className="font-display text-sm font-bold text-white">
                      CRI 98
                    </div>
                    <div className="text-[11px] text-zinc-300">światło LED</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Soft Airy Pillars */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {ADVANTAGES.map((adv) => {
            const Icon = adv.icon;
            return (
              <div
                key={adv.title}
                className="rounded-3xl bg-white/[0.04] p-7 transition-colors hover:bg-white/[0.06] sm:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c8102e]/15 text-[#ff6b81]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-lg font-bold text-white">
                  {adv.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {adv.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Soft Brand Pill Strip */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white/[0.03] px-7 py-5">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            Wykorzystywane marki
          </span>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {PARTNER_BRANDS.map((brand) => (
              <span
                key={brand}
                className="font-display text-xs font-semibold tracking-[0.16em] text-zinc-300"
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
