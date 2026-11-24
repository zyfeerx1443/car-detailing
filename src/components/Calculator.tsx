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
  StudioProfile,
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
  studio: StudioProfile;
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
  studio,
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
      ? `Dzień dobry! Proszę o potwierdzenie terminu w studiu ${studio.name} na podstawie wyceny ze strony:\n• Klasa auta: ${
          summary.vehicleLabel
        }\n• Usługi: ${summary.selectedTitles.join(", ")}\n• Szacowany koszt: ${formatPLN(
          summary.total
        )}${
          summary.discountPercent > 0
            ? ` (z rabatem pakietowym -${summary.discountPercent}%)`
            : ""
        }`
      : `Dzień dobry! Chciałbym umówić się na bezpłatną wycenę detailingu w studiu ${studio.name}.`;

  return (
    <section
      id="kalkulator"
      className="scroll-mt-24 bg-[#0a0a0b] py-24 text-zinc-100 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff6b81]">
            Szybka wycena w 2 krokach
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Kalkulator kosztów
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Wybierz segment auta i usługi — cena przeliczy się natychmiast. Przy
            wyborze min. 2 usług naliczamy 10% rabatu pakietowego.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* Left Side: 2 Soft Rounded Cards */}
          <div className="space-y-7 lg:col-span-7 xl:col-span-8">
            {/* Step 1: 4 Vehicle Categories */}
            <div className="soft-card-dark rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c8102e] font-display text-xs font-bold text-white">
                  1
                </span>
                <h3 className="font-display text-base font-bold text-white sm:text-lg">
                  Wybierz kategorię samochodu
                </h3>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {VEHICLE_CLASSES.map((cls) => {
                  const active = cls.id === vehicleClass;
                  return (
                    <button
                      key={cls.id}
                      type="button"
                      onClick={() => onChangeVehicleClass(cls.id)}
                      aria-pressed={active}
                      className={`flex flex-col items-start rounded-2xl p-5 text-left transition-all cursor-pointer ${
                        active
                          ? "bg-white text-zinc-950 shadow-[0_16px_40px_-16px_rgba(255,255,255,0.3)]"
                          : "bg-white/[0.04] text-zinc-200 hover:bg-white/[0.08]"
                      }`}
                    >
                      <div className="flex w-full items-center justify-between gap-2">
                        <span className="text-sm font-bold sm:text-[15px]">
                          {cls.label}
                        </span>
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors ${
                            active
                              ? "bg-[#c8102e] text-white"
                              : "bg-white/10 text-transparent"
                          }`}
                        >
                          <Check className="h-3 w-3 stroke-[3]" />
                        </span>
                      </div>
                      <span
                        className={`mt-1.5 text-xs ${
                          active ? "text-zinc-600" : "text-zinc-400"
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
            <div className="soft-card-dark rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c8102e] font-display text-xs font-bold text-white">
                    2
                  </span>
                  <h3 className="font-display text-base font-bold text-white sm:text-lg">
                    Zaznacz usługi
                  </h3>
                </div>
                {selectedServices.length > 0 && (
                  <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3.5 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.1] hover:text-white cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Wyczyść
                  </button>
                )}
              </div>

              <div className="mt-6 space-y-3">
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
                      className={`flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left transition-all cursor-pointer ${
                        isOn
                          ? "bg-white/[0.09] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
                          : "bg-white/[0.03] hover:bg-white/[0.06]"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div
                          className={`text-sm font-semibold sm:text-[15px] ${
                            isOn ? "text-white" : "text-zinc-200"
                          }`}
                        >
                          {service.title}
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                          {service.description}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-4">
                        <span
                          className={`font-display text-sm font-bold tabular-nums sm:text-base ${
                            isOn ? "text-white" : "text-zinc-400"
                          }`}
                        >
                          {formatPLN(servicePrice)}
                        </span>

                        {/* Smooth Rounded Switch */}
                        <div
                          className={`relative h-7 w-12 shrink-0 rounded-full p-1 transition-colors ${
                            isOn ? "bg-[#c8102e]" : "bg-white/12"
                          }`}
                        >
                          <div
                            className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                              isOn ? "translate-x-5" : "translate-x-0"
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

          {/* Right Side: Soft Sticky Summary Card */}
          <aside className="lg:sticky lg:top-28 lg:col-span-5 xl:col-span-4">
            <div className="soft-card-dark rounded-3xl p-7 sm:p-8">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                  Podsumowanie
                </span>
                <span className="rounded-full bg-white/[0.08] px-3.5 py-1 text-xs font-semibold text-white">
                  {currentClass.shortLabel}
                </span>
              </div>

              {/* Selected Items */}
              <div className="mt-6 space-y-3 pb-6">
                {selectedServices.length === 0 ? (
                  <p className="rounded-2xl bg-white/[0.03] p-4 text-center text-sm text-zinc-400">
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
                      <span className="shrink-0 font-semibold text-white tabular-nums">
                        {formatPLN(item.prices[vehicleClass])}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Package Discount */}
              {summary.discountPercent > 0 ? (
                <div className="flex items-center justify-between rounded-2xl bg-[#c8102e]/15 px-4 py-3 text-xs">
                  <span className="font-semibold text-[#ff8a9b]">
                    Rabat pakietowy −{summary.discountPercent}%
                  </span>
                  <span className="font-bold text-white tabular-nums">
                    −{formatPLN(summary.discountAmount)}
                  </span>
                </div>
              ) : (
                selectedServices.length === 1 && (
                  <div className="rounded-2xl bg-white/[0.04] px-4 py-3 text-xs text-zinc-300">
                    Dodaj drugą usługę, aby otrzymać{" "}
                    <span className="font-bold text-white">10% rabatu</span>.
                  </div>
                )
              )}

              {/* Total */}
              <div className="mt-6 rounded-2xl bg-white/[0.04] p-5">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Szacowany koszt</span>
                  <span className="inline-flex items-center gap-1.5 text-zinc-300">
                    <Clock className="h-3.5 w-3.5 text-[#ff6b81]" />
                    {summary.estimatedTime}
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-3">
                  <div className="font-display text-3xl font-bold tracking-tight text-white tabular-nums">
                    {formatPLN(summary.total)}
                  </div>
                  {summary.discountAmount > 0 && (
                    <span className="text-sm text-zinc-500 line-through tabular-nums">
                      {formatPLN(summary.subtotal)}
                    </span>
                  )}
                </div>
              </div>

              {/* Soft Pill Actions */}
              <div className="mt-6 space-y-3">
                <a
                  href={buildWhatsAppUrl(whatsappMessage, studio.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="soft-pill-crimson flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Wyślij na WhatsApp</span>
                </a>

                <button
                  type="button"
                  disabled={selectedServices.length === 0}
                  onClick={() => onLockCalculation(summary)}
                  className="soft-pill-dark-ghost flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Zarezerwuj termin</span>
                </button>
              </div>

              <p className="mt-4 text-center text-[11px] leading-relaxed text-zinc-500">
                Ceny brutto (z VAT). Ostateczną wycenę potwierdzamy podczas
                bezpłatnych oględzin auta.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
