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
      className="scroll-mt-24 bg-white py-24 text-zinc-950 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Airy Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8102e]">
            Cennik usług · Warszawa
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
            Usługi detailingowe
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
            Przejrzyste ceny dopasowane do segmentu auta. Każda realizacja
            rozpoczyna się od bezpłatnej inspekcji lakieru pod lampami
            kontrolnymi.
          </p>
        </div>

        {/* 4 Soft Rounded Cards without harsh frames */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {SERVICE_CARDS.map((service) => {
            const isAdded = selectedServices.includes(service.id);

            return (
              <article
                key={service.id}
                className="soft-card-light flex flex-col justify-between rounded-3xl p-7 sm:p-9"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-bold text-zinc-950 sm:text-2xl">
                      {service.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-600 shadow-sm">
                      <Clock className="h-3.5 w-3.5 text-[#c8102e]" />
                      {service.duration}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {service.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-zinc-700"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-950/[0.06] text-[#c8102e]">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Soft Footer Row */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                      Zakres cenowy
                    </div>
                    <div className="mt-1 font-display text-2xl font-bold text-[#c8102e] tabular-nums">
                      {service.priceRange}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectFromCard(service.id)}
                    className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all cursor-pointer ${
                      isAdded
                        ? "bg-zinc-950 text-white shadow-md"
                        : "bg-white text-zinc-950 shadow-sm hover:bg-[#c8102e] hover:text-white"
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
