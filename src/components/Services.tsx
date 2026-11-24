"use client";

import { Check, Plus, Clock } from "lucide-react";
import { SERVICE_CARDS, ServiceId } from "@/data/studio";

interface ServicesProps {
  selectedServices: ServiceId[];
  onSelectFromCard: (serviceId: ServiceId) => void;
}

export function Services({
  selectedServices,
  onSelectFromCard,
}: ServicesProps) {
  return (
    <section
      id="uslugi"
      className="scroll-mt-24 border-t border-white/[0.06] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Cennik usług · Warszawa
            </p>
            <h2 className="mt-2.5 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Usługi detailingowe
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
              Realistyczne ceny dopasowane do segmentu pojazdu. Każda realizacja
              poprzedzona jest bezpłatną inspekcją lakieru pod lampami
              kontrolnymi.
            </p>
          </div>
          <a
            href="#kalkulator"
            className="text-sm font-medium text-zinc-300 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
          >
            Przejdź do kalkulatora →
          </a>
        </div>

        {/* 4 Clean Monochrome Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {SERVICE_CARDS.map((service) => {
            const isAdded = selectedServices.includes(service.id);

            return (
              <article
                key={service.id}
                className="mono-card mono-card-hover flex flex-col justify-between rounded-2xl p-6 sm:p-7"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
                      {service.title}
                    </h3>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400">
                      <Clock className="h-3.5 w-3.5 text-zinc-400" />
                      {service.duration}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {service.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-zinc-300"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Button */}
                <div className="mt-7 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                      Zakres cenowy
                    </div>
                    <div className="mt-0.5 font-display text-lg font-semibold text-white tabular-nums sm:text-xl">
                      {service.priceRange}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectFromCard(service.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer sm:text-sm ${
                      isAdded
                        ? "bg-white text-zinc-950"
                        : "border border-white/15 bg-white/[0.04] text-white hover:border-white/35 hover:bg-white/[0.1]"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Wybrano</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        <span>Dodaj do wyceny</span>
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
