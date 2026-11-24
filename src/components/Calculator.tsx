"use client";

import {
  Check,
  Clock,
  MessageCircle,
  RotateCcw,
  Calendar,
} from "lucide-react";
import {
  VEHICLE_CLASSES,
  CALCULATOR_SERVICES,
  VehicleClassId,
  ServiceId,
  formatPLN,
  buildWhatsAppUrl,
} from "@/data/studio";

export interface CalculationSummary {
  vehicleClass: VehicleClassId;
  vehicleLabel: string;
  selectedIds: ServiceId[];
  selectedTitles: string[];
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
  estimatedTime: string;
}

interface CalculatorProps {
  vehicleClass: VehicleClassId;
  selectedServices: ServiceId[];
  onChangeVehicleClass: (cls: VehicleClassId) => void;
  onToggleService: (id: ServiceId) => void;
  onReset: () => void;
  onLockCalculation: (summary: CalculationSummary) => void;
}

export function buildCalculationSummary(
  vehicleClass: VehicleClassId,
  selectedServices: ServiceId[]
): CalculationSummary {
  const cls =
    VEHICLE_CLASSES.find((v) => v.id === vehicleClass) ?? VEHICLE_CLASSES[1];
  const active = CALCULATOR_SERVICES.filter((s) =>
    selectedServices.includes(s.id)
  );

  const subtotal = active.reduce((sum, s) => sum + s.prices[vehicleClass], 0);
  const discountPercent = active.length >= 2 ? 10 : 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = subtotal - discountAmount;

  const totalHours = active.reduce((sum, s) => sum + s.hours, 0);
  let estimatedTime = "—";
  if (totalHours > 0 && totalHours <= 4) estimatedTime = "2–4 godz.";
  else if (totalHours > 4 && totalHours <= 10) estimatedTime = "1 dzień";
  else if (totalHours > 10 && totalHours <= 20) estimatedTime = "1–2 dni";
  else if (totalHours > 20) estimatedTime = "2–3 dni";

  return {
    vehicleClass,
    vehicleLabel: cls.label,
    selectedIds: selectedServices,
    selectedTitles: active.map((s) => s.shortTitle),
    subtotal,
    discountPercent,
    discountAmount,
    total,
    estimatedTime,
  };
}

export function Calculator({
  vehicleClass,
  selectedServices,
  onChangeVehicleClass,
  onToggleService,
  onReset,
  onLockCalculation,
}: CalculatorProps) {
  const currentClass =
    VEHICLE_CLASSES.find((v) => v.id === vehicleClass) ?? VEHICLE_CLASSES[1];
  const summary = buildCalculationSummary(vehicleClass, selectedServices);

  const whatsappMessage =
    selectedServices.length > 0
      ? `Dzień dobry! Proszę o potwierdzenie terminu na podstawie wyceny ze strony:\n• Klasa auta: ${
          summary.vehicleLabel
        }\n• Usługi: ${summary.selectedTitles.join(", ")}\n• Szacowany koszt: ${formatPLN(
          summary.total
        )}${
          summary.discountPercent > 0
            ? ` (z rabatem pakietowym -${summary.discountPercent}%)`
            : ""
        }`
      : "Dzień dobry! Chciałbym umówić się na bezpłatną wycenę detailingu w Warszawie.";

  return (
    <section
      id="kalkulator"
      className="scroll-mt-24 border-t border-white/[0.06] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Szybka wycena w 2 krokach
          </p>
          <h2 className="mt-2.5 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Kalkulator kosztów
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Wybierz segment auta i usługi — cena przeliczy się natychmiast. Przy
            wyborze min. 2 usług naliczamy 10% rabatu pakietowego.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          {/* Left Side: 2 Simple Steps */}
          <div className="space-y-6 lg:col-span-7 xl:col-span-8">
            {/* Step 1: 4 Vehicle Categories */}
            <div className="mono-card rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-md border border-white/15 bg-white/[0.05] font-display text-[11px] font-semibold text-white">
                  1
                </span>
                <h3 className="font-display text-sm font-semibold text-white sm:text-base">
                  Wybierz kategorię samochodu
                </h3>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {VEHICLE_CLASSES.map((cls) => {
                  const active = cls.id === vehicleClass;
                  return (
                    <button
                      key={cls.id}
                      type="button"
                      onClick={() => onChangeVehicleClass(cls.id)}
                      aria-pressed={active}
                      className={`flex flex-col items-start rounded-xl border p-4 text-left transition-colors cursor-pointer ${
                        active
                          ? "border-white bg-white text-zinc-950"
                          : "border-white/10 bg-white/[0.02] text-zinc-200 hover:border-white/25 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex w-full items-center justify-between gap-2">
                        <span className="text-sm font-semibold">
                          {cls.label}
                        </span>
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                            active
                              ? "border-zinc-950 bg-zinc-950 text-white"
                              : "border-white/25"
                          }`}
                        >
                          {active && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                        </span>
                      </div>
                      <span
                        className={`mt-1 text-xs ${
                          active ? "text-zinc-600" : "text-zinc-500"
                        }`}
                      >
                        {cls.examples}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Services Toggles */}
            <div className="mono-card rounded-2xl p-5 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md border border-white/15 bg-white/[0.05] font-display text-[11px] font-semibold text-white">
                    2
                  </span>
                  <h3 className="font-display text-sm font-semibold text-white sm:text-base">
                    Zaznacz usługi
                  </h3>
                </div>
                {selectedServices.length > 0 && (
                  <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-white cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Wyczyść
                  </button>
                )}
              </div>

              <div className="mt-4 divide-y divide-white/[0.07]">
                {CALCULATOR_SERVICES.map((service) => {
                  const isOn = selectedServices.includes(service.id);
                  const servicePrice = service.prices[vehicleClass];

                  return (
                    <button
                      key={service.id}
                      type="button"
                      role="switch"
                      aria-checked={isOn}
                      onClick={() => onToggleService(service.id)}
                      className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors first:pt-2 last:pb-1 cursor-pointer"
                    >
                      <div className="min-w-0 flex-1">
                        <div
                          className={`text-sm font-semibold transition-colors sm:text-[15px] ${
                            isOn ? "text-white" : "text-zinc-300"
                          }`}
                        >
                          {service.title}
                        </div>
                        <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">
                          {service.description}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-4">
                        <span
                          className={`font-display text-sm font-semibold tabular-nums ${
                            isOn ? "text-white" : "text-zinc-400"
                          }`}
                        >
                          {formatPLN(servicePrice)}
                        </span>

                        {/* Minimalist Monochrome Switch */}
                        <div
                          className={`relative h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors ${
                            isOn
                              ? "bg-white"
                              : "border border-white/15 bg-zinc-900"
                          }`}
                        >
                          <div
                            className={`h-5 w-5 rounded-full transition-transform ${
                              isOn
                                ? "translate-x-5 bg-zinc-950"
                                : "translate-x-0 bg-zinc-500"
                            }`}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side: Clean Summary + Direct WhatsApp CTA */}
          <aside className="lg:sticky lg:top-24 lg:col-span-5 xl:col-span-4">
            <div className="mono-card rounded-2xl border-white/15 p-6">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Podsumowanie
                </span>
                <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-zinc-200">
                  {currentClass.shortLabel}
                </span>
              </div>

              {/* Selected Items */}
              <div className="mt-5 space-y-2.5 border-b border-white/[0.08] pb-5">
                {selectedServices.length === 0 ? (
                  <p className="py-3 text-sm text-zinc-500">
                    Wybierz min. jedną usługę z listy, aby obliczyć koszt.
                  </p>
                ) : (
                  CALCULATOR_SERVICES.filter((s) =>
                    selectedServices.includes(s.id)
                  ).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <span className="text-zinc-300">{item.shortTitle}</span>
                      <span className="shrink-0 font-medium text-white tabular-nums">
                        {formatPLN(item.prices[vehicleClass])}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Package Discount */}
              {summary.discountPercent > 0 ? (
                <div className="mt-4 flex items-center justify-between rounded-xl border border-white/15 bg-white/[0.05] px-3.5 py-2.5 text-xs">
                  <span className="font-medium text-zinc-200">
                    Rabat pakietowy −{summary.discountPercent}%
                  </span>
                  <span className="font-semibold text-white tabular-nums">
                    −{formatPLN(summary.discountAmount)}
                  </span>
                </div>
              ) : (
                selectedServices.length === 1 && (
                  <p className="mt-4 text-xs text-zinc-400">
                    Dodaj drugą usługę, aby otrzymać{" "}
                    <span className="font-semibold text-white">10% rabatu</span>
                    .
                  </p>
                )
              )}

              {/* Total */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Szacowany koszt</span>
                  <span className="inline-flex items-center gap-1 text-zinc-300">
                    <Clock className="h-3.5 w-3.5" />
                    {summary.estimatedTime}
                  </span>
                </div>
                <div className="mt-1.5 flex items-baseline gap-3">
                  <div className="font-display text-3xl font-semibold tracking-tight text-white tabular-nums">
                    {formatPLN(summary.total)}
                  </div>
                  {summary.discountAmount > 0 && (
                    <span className="text-sm text-zinc-500 line-through tabular-nums">
                      {formatPLN(summary.subtotal)}
                    </span>
                  )}
                </div>
              </div>

              {/* Direct Actions */}
              <div className="mt-6 space-y-2.5">
                <a
                  href={buildWhatsAppUrl(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-white flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Wyślij na WhatsApp</span>
                </a>

                <button
                  type="button"
                  disabled={selectedServices.length === 0}
                  onClick={() => onLockCalculation(summary)}
                  className="btn-secondary-mono flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Zarezerwuj termin</span>
                </button>
              </div>

              <p className="mt-3 text-center text-[11px] text-zinc-500">
                Ceny brutto (z VAT). Ostateczną wycenę potwierdzamy podczas
                oględzin auta.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
