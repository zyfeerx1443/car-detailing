"use client";

import {
  Calculator as CalcIcon,
  Car,
  Check,
  Clock,
  Percent,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import {
  VEHICLE_CLASSES,
  CALCULATOR_SERVICES,
  VehicleClassId,
  ServiceId,
  formatRubles,
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
  estimatedDays: string;
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
    VEHICLE_CLASSES.find((v) => v.id === vehicleClass) ?? VEHICLE_CLASSES[0];
  const active = CALCULATOR_SERVICES.filter((s) =>
    selectedServices.includes(s.id)
  );

  const subtotal = active.reduce(
    (sum, s) => sum + Math.round((s.basePrice * cls.multiplier) / 500) * 500,
    0
  );

  const discountPercent = active.length >= 2 ? 10 : 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = subtotal - discountAmount;

  const rawDays = active.reduce((sum, s) => sum + s.days, 0);
  let estimatedDays = "—";
  if (rawDays > 0 && rawDays <= 1) estimatedDays = "1 день";
  else if (rawDays > 1 && rawDays <= 2) estimatedDays = "1–2 дня";
  else if (rawDays > 2 && rawDays <= 4) estimatedDays = "2–4 дня";
  else if (rawDays > 4) estimatedDays = `${Math.ceil(rawDays)}–${Math.ceil(rawDays) + 1} дней`;

  return {
    vehicleClass,
    vehicleLabel: cls.label,
    selectedIds: selectedServices,
    selectedTitles: active.map((s) => s.shortTitle),
    subtotal,
    discountPercent,
    discountAmount,
    total,
    estimatedDays,
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
    VEHICLE_CLASSES.find((v) => v.id === vehicleClass) ?? VEHICLE_CLASSES[0];
  const summary = buildCalculationSummary(vehicleClass, selectedServices);

  return (
    <section
      id="calculator"
      className="relative scroll-mt-24 py-20 sm:py-28"
    >
      {/* Background accent */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[440px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/8 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
            <span className="h-px w-6 bg-amber-400" />
            Онлайн-расчёт за 30 секунд
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Калькулятор стоимости
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Выберите класс автомобиля и нужные процедуры — итоговая цена и сроки
            пересчитаются мгновенно. При выборе от 2 услуг действует комплексная
            скидка 10%.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* Left Controls: Class + Toggles */}
          <div className="space-y-8 lg:col-span-7 xl:col-span-8">
            {/* Step 1: Vehicle Class */}
            <div className="glass-card rounded-3xl p-5 sm:p-7">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 font-display text-xs font-bold text-amber-400">
                    01
                  </span>
                  <h3 className="font-display text-base font-semibold text-white sm:text-lg">
                    Выберите класс автомобиля
                  </h3>
                </div>
                <span className="hidden text-xs text-zinc-500 sm:inline">
                  Коэффициент ×{currentClass.multiplier.toFixed(1)}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {VEHICLE_CLASSES.map((cls) => {
                  const active = cls.id === vehicleClass;
                  return (
                    <button
                      key={cls.id}
                      type="button"
                      onClick={() => onChangeVehicleClass(cls.id)}
                      aria-pressed={active}
                      className={`group relative flex flex-col items-start rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                        active
                          ? "border-amber-400/70 bg-amber-500/[0.12] shadow-[0_0_28px_-10px_rgba(245,158,11,0.55)]"
                          : "border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex w-full items-center justify-between">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                            active
                              ? "bg-amber-400 text-zinc-950"
                              : "bg-white/[0.06] text-zinc-400 group-hover:text-white"
                          }`}
                        >
                          <Car className="h-5 w-5" />
                        </div>
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                            active
                              ? "border-amber-400 bg-amber-400 text-zinc-950"
                              : "border-white/20"
                          }`}
                        >
                          {active && <Check className="h-3 w-3 stroke-[3]" />}
                        </span>
                      </div>

                      <div className="mt-3.5 font-display text-sm font-semibold text-white">
                        {cls.label}
                      </div>
                      <div className="mt-1 text-xs text-zinc-400">
                        {cls.subtitle}
                      </div>
                      <div className="mt-2 text-[11px] leading-snug text-zinc-500">
                        {cls.examples}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Services Switchers */}
            <div className="glass-card rounded-3xl p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 font-display text-xs font-bold text-amber-400">
                    02
                  </span>
                  <h3 className="font-display text-base font-semibold text-white sm:text-lg">
                    Отметьте нужные услуги
                  </h3>
                </div>
                {selectedServices.length > 0 && (
                  <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-amber-400 cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Сбросить
                  </button>
                )}
              </div>

              <div className="mt-5 space-y-3">
                {CALCULATOR_SERVICES.map((service) => {
                  const isOn = selectedServices.includes(service.id);
                  const servicePrice =
                    Math.round(
                      (service.basePrice * currentClass.multiplier) / 500
                    ) * 500;

                  return (
                    <button
                      key={service.id}
                      type="button"
                      role="switch"
                      aria-checked={isOn}
                      onClick={() => onToggleService(service.id)}
                      className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-all cursor-pointer sm:p-5 ${
                        isOn
                          ? "border-amber-400/55 bg-amber-500/[0.09]"
                          : "border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-white sm:text-base">
                            {service.title}
                          </span>
                          {service.badge && (
                            <span className="rounded-full border border-amber-400/30 bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                              {service.badge}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                          {service.description}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-5">
                        <div className="text-right">
                          <div
                            className={`font-display text-sm font-bold tabular-nums sm:text-base ${
                              isOn ? "text-amber-300" : "text-zinc-200"
                            }`}
                          >
                            {formatRubles(servicePrice)}
                          </div>
                        </div>

                        {/* Toggle Switch Pill */}
                        <div
                          className={`relative h-7 w-12 shrink-0 rounded-full p-1 transition-colors duration-200 ${
                            isOn
                              ? "bg-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.6)]"
                              : "bg-zinc-800 border border-white/10"
                          }`}
                        >
                          <div
                            className={`h-5 w-5 rounded-full transition-transform duration-200 ${
                              isOn
                                ? "translate-x-5 bg-zinc-950"
                                : "translate-x-0 bg-zinc-400"
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

          {/* Right Sticky Total Summary Panel */}
          <aside className="lg:sticky lg:top-28 lg:col-span-5 xl:col-span-4">
            <div className="glass-card relative overflow-hidden rounded-3xl border-amber-500/30 p-6 sm:p-7">
              <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-amber-500/20 blur-3xl" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-400">
                  <CalcIcon className="h-5 w-5" />
                  <span className="font-display text-sm font-semibold uppercase tracking-wider">
                    Ваш расчёт
                  </span>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-zinc-200">
                  {currentClass.label}
                </span>
              </div>

              {/* Selected Items List */}
              <div className="mt-6 space-y-3 border-b border-white/[0.08] pb-5">
                {selectedServices.length === 0 ? (
                  <p className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-4 text-center text-sm text-zinc-400">
                    Выберите хотя бы одну услугу слева, чтобы увидеть точную
                    стоимость и сроки.
                  </p>
                ) : (
                  CALCULATOR_SERVICES.filter((s) =>
                    selectedServices.includes(s.id)
                  ).map((item) => {
                    const price =
                      Math.round(
                        (item.basePrice * currentClass.multiplier) / 500
                      ) * 500;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <span className="text-zinc-300">{item.shortTitle}</span>
                        <span className="shrink-0 font-semibold text-white tabular-nums">
                          {formatRubles(price)}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Discount Info */}
              {summary.discountPercent > 0 ? (
                <div className="mt-4 flex items-center justify-between rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 font-semibold text-emerald-300">
                    <Percent className="h-4 w-4 shrink-0" />
                    <span>Скидка за комплекс −{summary.discountPercent}%</span>
                  </div>
                  <span className="font-bold text-emerald-300 tabular-nums">
                    −{formatRubles(summary.discountAmount)}
                  </span>
                </div>
              ) : (
                selectedServices.length === 1 && (
                  <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-500/[0.07] px-4 py-2.5 text-xs text-amber-200/90">
                    Добавьте ещё 1 услугу и получите{" "}
                    <strong className="font-bold text-amber-300">
                      скидку 10%
                    </strong>{" "}
                    на весь комплекс
                  </div>
                )
              )}

              {/* Total Price */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Ориентировочная стоимость</span>
                  <span className="inline-flex items-center gap-1 text-zinc-300">
                    <Clock className="h-3.5 w-3.5 text-amber-400" />
                    Срок: {summary.estimatedDays}
                  </span>
                </div>

                <div className="mt-2 flex items-baseline gap-3">
                  <div className="font-display text-3xl font-bold tracking-tight text-white tabular-nums sm:text-4xl">
                    {formatRubles(summary.total)}
                  </div>
                  {summary.discountAmount > 0 && (
                    <div className="text-sm font-medium text-zinc-500 line-through tabular-nums">
                      {formatRubles(summary.subtotal)}
                    </div>
                  )}
                </div>
              </div>

              {/* CTA */}
              <button
                type="button"
                disabled={selectedServices.length === 0}
                onClick={() => onLockCalculation(summary)}
                className="neon-amber-btn mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-bold text-zinc-950 disabled:cursor-not-allowed disabled:opacity-45 sm:text-base cursor-pointer"
              >
                <span>Зафиксировать расчёт</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="mt-3 text-center text-[11px] leading-relaxed text-zinc-500">
                Точную стоимость подтвердим после бесплатного осмотра ЛКП в
                студии. Без скрытых доплат.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
