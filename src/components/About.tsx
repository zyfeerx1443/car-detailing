import {
  UserCheck,
  FlaskConical,
  Sun,
  Camera,
  ShieldCheck,
  Thermometer,
} from "lucide-react";
import { PARTNER_BRANDS } from "@/data/studio";

const ADVANTAGES = [
  {
    icon: UserCheck,
    title: "Сертифицированные мастера",
    description:
      "Средний стаж наших технологов — от 6 лет. Мастера ежегодно проходят аттестацию по работе с керамикой и полиуретаном, бережно разбирают элементы без риска сломать клипсы и присылают фотоотчёты каждого этапа.",
    metric: "8+ лет опыта",
  },
  {
    icon: FlaskConical,
    title: "Немецкая автохимия и плёнки",
    description:
      "Используем только сертифицированные оригинальные составы Koch-Chemie, Sonax Profiline, Gyeon и плёнки LLumar / SunTek. Безопасно для тонкого японского лака, матовой кожи Nappa, алькантары и карбона.",
    metric: "100% оригинал",
  },
  {
    icon: Sun,
    title: "Чистая светлая студия",
    description:
      "Профессиональный свет 5000K с высоким индексом цветопередачи CRI 98 выявляет малейшую риску и голограммы. Беспылевые полы, контроль температуры и влажности, закрытая охраняемая территория 24/7.",
    metric: "Стандарт CRI 98",
  },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="pointer-events-none absolute left-0 top-24 -z-10 h-[360px] w-[360px] rounded-full bg-amber-500/7 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Split */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              <span className="h-px w-6 bg-amber-400" />
              Почему выбирают нас
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Студия, где каждая деталь имеет значение
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
              Мы не работаем «на поток». Одновременно в боксах находится не
              более 4 автомобилей, чтобы каждый мастер уделял максимум внимания
              подготовке поверхности, геометрии плёнки и финишному контролю.
            </p>

            {/* Studio Specs Mini-Pills */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-zinc-200">
                <Camera className="h-4 w-4 text-amber-400" />
                Фотоотчёт в мессенджер
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-zinc-200">
                <Thermometer className="h-4 w-4 text-amber-400" />
                Климат-контроль +22 °C
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-zinc-200">
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                Охрана и видео 24/7
              </span>
            </div>
          </div>

          {/* Studio Photo Card */}
          <div className="lg:col-span-7">
            <div className="glass-card group relative overflow-hidden rounded-3xl p-2">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.15rem]">
                <img
                  src="/images/studio-bay.jpg"
                  alt="Чистая светлая студия детейлинга APEX с профессиональным LED-освещением"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090c]/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3 sm:bottom-6 sm:left-6 sm:right-6">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400">
                      APEX LAB · БОКС №1–4
                    </div>
                    <div className="mt-1 font-display text-sm font-semibold text-white sm:text-lg">
                      Чистая зона без пыли и сквозняков
                    </div>
                  </div>
                  <div className="rounded-xl border border-amber-400/30 bg-[#08090c]/80 px-3.5 py-2 backdrop-blur-md">
                    <div className="font-display text-sm font-bold text-amber-400">
                      450 м²
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      площадь центра
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Advantage Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-12 lg:gap-6">
          {ADVANTAGES.map((adv) => {
            const Icon = adv.icon;
            return (
              <div
                key={adv.title}
                className="glass-card glass-card-hover flex flex-col justify-between rounded-3xl p-6 sm:p-7"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/25 bg-amber-500/12 text-amber-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-amber-300">
                      {adv.metric}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold text-white sm:text-xl">
                    {adv.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {adv.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Partner Chemistry & PPF Strip */}
        <div className="mt-10 rounded-3xl border border-white/[0.07] bg-white/[0.02] px-6 py-5 backdrop-blur-md">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Официальные материалы
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {PARTNER_BRANDS.map((brand) => (
                <span
                  key={brand}
                  className="font-display text-xs font-semibold tracking-[0.16em] text-zinc-400 transition-colors hover:text-amber-300 sm:text-sm"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
