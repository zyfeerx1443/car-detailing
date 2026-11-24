import {
  ShieldCheck,
  Award,
  CarFront,
  ArrowRight,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { STUDIO_INFO } from "@/data/studio";

const HERO_BADGES = [
  {
    icon: ShieldCheck,
    value: "Гарантия до 5 лет",
    detail: "Фиксируем в договоре",
  },
  {
    icon: Award,
    value: "Опыт 8+ лет",
    detail: "Сертифицированные мастера",
  },
  {
    icon: CarFront,
    value: "Более 1 000 авто",
    detail: "Премиум и спорт-сегмент",
  },
];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
      {/* Background Studio Photo */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <img
          src="/images/hero-car.jpg"
          alt="Премиальный автомобиль после нанесения керамики в детейлинг-студии"
          className="h-full w-full object-cover object-[72%_center] sm:object-[68%_center] lg:object-right opacity-85"
        />
        {/* Multi-layer obsidian & amber cinema vignette for crystal-clear typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090c] via-[#08090c]/88 to-[#08090c]/30 lg:via-[#08090c]/80 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-transparent to-[#08090c]/65" />
        <div className="absolute -left-32 top-1/4 h-[460px] w-[460px] rounded-full bg-amber-500/12 blur-[140px]" />
      </div>

      {/* Subtle architectural grid */}
      <div className="bg-grid-subtle pointer-events-none absolute inset-0 -z-10 opacity-35 [mask-image:radial-gradient(ellipse_at_left,black_30%,transparent_75%)]" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-amber-400/25 bg-amber-500/10 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-amber-200 sm:text-sm">
              Студия премиального детейлинга в {STUDIO_INFO.cityPrepositional}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-6 font-display text-[1.95rem] font-bold leading-[1.14] tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.09]">
            Премиальный детейлинг и{" "}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              защита вашего авто
            </span>{" "}
            в {STUDIO_INFO.cityPrepositional}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            Возвращаем кузову зеркальную глубину цвета, бронируем зоны риска
            оригинальным полиуретаном и бережно восстанавливаем салон немецкими
            составами — с фотоотчётом каждого этапа.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#calculator"
              className="neon-amber-btn group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl px-7 py-4 text-base font-bold text-zinc-950 sm:w-auto"
            >
              <span>Рассчитать стоимость</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href="#booking"
              className="glass-card inline-flex w-full items-center justify-center gap-2 rounded-2xl px-7 py-4 text-base font-semibold text-white transition-all hover:border-amber-400/40 hover:bg-white/[0.08] sm:w-auto"
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>Бесплатный осмотр</span>
            </a>
          </div>

          {/* Proof Badges */}
          <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
            {HERO_BADGES.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.value}
                  className="glass-card flex items-center gap-3.5 rounded-2xl px-4 py-3.5 sm:flex-col sm:items-start sm:gap-2.5 sm:p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-400/25 bg-amber-500/12 text-amber-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-display text-sm font-semibold text-white sm:text-[15px]">
                      {badge.value}
                    </div>
                    <div className="mt-0.5 text-xs text-zinc-400">
                      {badge.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Subtle Scroll Hint */}
      <a
        href="#services"
        aria-label="Перейти к услугам"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-zinc-500 transition-colors hover:text-amber-400 lg:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">
          Услуги
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
