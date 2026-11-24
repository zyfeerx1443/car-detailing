"use client";

import {
  Sparkles,
  Shield,
  Armchair,
  BadgeCheck,
  Clock,
  Check,
  Plus,
} from "lucide-react";
import {
  SERVICE_CARDS,
  ServiceId,
  formatRubles,
} from "@/data/studio";

const ICON_MAP: Record<string, typeof Sparkles> = {
  ceramic: Sparkles,
  ppf_front: Shield,
  interior: Armchair,
  presale: BadgeCheck,
};

interface ServicesProps {
  selectedServices: ServiceId[];
  onSelectFromCard: (serviceId: ServiceId) => void;
}

export function Services({
  selectedServices,
  onSelectFromCard,
}: ServicesProps) {
  return (
    <section id="services" className="relative scroll-mt-24 py-20 sm:py-28">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-12 -z-10 h-[360px] w-[360px] rounded-full bg-amber-500/8 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              <span className="h-px w-6 bg-amber-400" />
              Направления работы
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Услуги и прайс-лист
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
              Работаем строго по технологическим картам производителей. Каждый
              автомобиль проходит предварительный осмотр с замером толщины ЛКП.
            </p>
          </div>
          <a
            href="#calculator"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-zinc-200 transition-colors hover:border-amber-400/40 hover:text-amber-300"
          >
            Собрать свой комплекс в калькуляторе →
          </a>
        </div>

        {/* 4 Service Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
          {SERVICE_CARDS.map((service) => {
            const Icon = ICON_MAP[service.id] ?? Sparkles;
            const isAdded = selectedServices.includes(service.id);

            return (
              <article
                key={service.id}
                className={`glass-card glass-card-hover relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-8 ${
                  service.featured
                    ? "border-amber-500/30 bg-gradient-to-b from-amber-500/[0.07] via-white/[0.03] to-white/[0.02]"
                    : ""
                }`}
              >
                {/* Top glow accent */}
                {service.featured && (
                  <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-amber-500/20 blur-3xl" />
                )}

                <div>
                  {/* Card Top Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/25 bg-amber-500/12 text-amber-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-300">
                        <Clock className="h-3.5 w-3.5 text-amber-400" />
                        {service.duration}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          service.featured
                            ? "border border-amber-400/40 bg-amber-500/20 text-amber-300"
                            : "border border-white/10 bg-white/[0.04] text-zinc-300"
                        }`}
                      >
                        {service.tag}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-6 font-display text-xl font-semibold leading-snug text-white sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <ul className="mt-6 space-y-2.5">
                    {service.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-zinc-300"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-400">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Action Footer */}
                <div className="mt-8 flex flex-col gap-4 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-zinc-500">
                      Стоимость для седана
                    </div>
                    <div className="mt-0.5 font-display text-2xl font-bold text-white tabular-nums">
                      от {formatRubles(service.priceFrom)}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectFromCard(service.id)}
                    className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all cursor-pointer ${
                      isAdded
                        ? "border border-amber-400/60 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                        : "border border-white/12 bg-white/[0.05] text-white hover:border-amber-400/50 hover:bg-amber-500 hover:text-zinc-950"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>В калькуляторе</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        <span>В расчёт</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
