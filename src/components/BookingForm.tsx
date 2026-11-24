"use client";

import { useState, FormEvent } from "react";
import {
  Send,
  MessageCircle,
  PhoneCall,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  X,
  ArrowRight,
} from "lucide-react";
import { STUDIO_INFO, formatRubles } from "@/data/studio";
import type { CalculationSummary } from "./Calculator";

type MessengerType = "Telegram" | "WhatsApp" | "Позвонить";

const MESSENGERS: {
  id: MessengerType;
  label: string;
  hint: string;
  icon: typeof Send;
}[] = [
  { id: "Telegram", label: "Telegram", hint: "Быстрый ответ", icon: Send },
  {
    id: "WhatsApp",
    label: "WhatsApp",
    hint: "Фото и прайс",
    icon: MessageCircle,
  },
  { id: "Позвонить", label: "Звонок", hint: "За 10 минут", icon: PhoneCall },
];

interface BookingFormProps {
  lockedCalculation: CalculationSummary | null;
  onClearCalculation: () => void;
}

function formatRussianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";

  let normalized = digits;
  if (normalized.startsWith("8")) {
    normalized = "7" + normalized.slice(1);
  } else if (!normalized.startsWith("7")) {
    normalized = "7" + normalized;
  }
  normalized = normalized.slice(0, 11);

  let result = "+7";
  if (normalized.length > 1) {
    result += " (" + normalized.slice(1, 4);
  }
  if (normalized.length >= 4) {
    result += ")";
  }
  if (normalized.length > 4) {
    result += " " + normalized.slice(4, 7);
  }
  if (normalized.length > 7) {
    result += "-" + normalized.slice(7, 9);
  }
  if (normalized.length > 9) {
    result += "-" + normalized.slice(9, 11);
  }
  return result;
}

export function BookingForm({
  lockedCalculation,
  onClearCalculation,
}: BookingFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [carModel, setCarModel] = useState("");
  const [messenger, setMessenger] = useState<MessengerType>("Telegram");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{
    orderId: string;
    name: string;
    phone: string;
    carModel: string;
    messenger: MessengerType;
  } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const digits = phone.replace(/\D/g, "");
    const trimmedCar = carModel.trim();

    if (trimmedName.length < 2) {
      setError("Пожалуйста, укажите ваше имя.");
      return;
    }
    if (digits.length < 11) {
      setError("Введите корректный номер телефона (11 цифр).");
      return;
    }
    if (trimmedCar.length < 2) {
      setError("Укажите марку и модель автомобиля.");
      return;
    }

    setError(null);
    const orderId = `APX-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmitted({
      orderId,
      name: trimmedName,
      phone,
      carModel: trimmedCar,
      messenger,
    });
  };

  return (
    <section id="booking" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 mx-auto h-[420px] max-w-4xl rounded-full bg-amber-500/10 blur-[160px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-card relative overflow-hidden rounded-[2rem] border-amber-500/25 p-6 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Pitch */}
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/12 px-3.5 py-1 text-xs font-semibold text-amber-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Бесплатная диагностика ЛКП
                </span>

                <h2 className="mt-5 font-display text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                  Запишитесь на осмотр в студию
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
                  Оценим состояние лакокрасочного покрытия под детейлинг-лампами,
                  подберём оптимальный комплекс защиты и зафиксируем точную
                  стоимость без навязывания лишних услуг.
                </p>

                {/* Steps */}
                <ol className="mt-8 space-y-4">
                  {[
                    "Свяжемся в выбранном мессенджере за 10 минут",
                    "Согласуем удобное время осмотра и подберём материалы",
                    "Закрепим за вами персонального мастера-технолога",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-amber-500/15 font-display text-[11px] font-bold text-amber-300">
                        {i + 1}
                      </span>
                      <span className="text-sm text-zinc-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Отвечаем ежедневно с 09:00 до 21:00</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <a
                    href={STUDIO_INFO.phoneHref}
                    className="font-display text-base font-bold text-white transition-colors hover:text-amber-400"
                  >
                    {STUDIO_INFO.phoneDisplay}
                  </a>
                  <span className="text-xs text-zinc-500">
                    или напишите напрямую
                  </span>
                </div>
              </div>
            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-emerald-400/25 bg-emerald-500/[0.06] p-6 text-center sm:p-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/40 bg-emerald-500/15 text-emerald-400">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <div className="mt-5 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1 text-xs font-semibold text-zinc-300">
                    Заявка № {submitted.orderId}
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-white sm:text-2xl">
                    Спасибо, {submitted.name}!
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-300">
                    Мы получили вашу заявку на осмотр{" "}
                    <strong className="text-white">{submitted.carModel}</strong>{" "}
                    и свяжемся с вами через{" "}
                    <strong className="text-amber-300">
                      {submitted.messenger}
                    </strong>{" "}
                    по номеру {submitted.phone} в ближайшие 10 минут.
                  </p>

                  {lockedCalculation && (
                    <div className="mt-5 w-full max-w-md rounded-2xl border border-amber-400/25 bg-[#08090c]/60 p-4 text-left text-xs text-zinc-300">
                      <div className="font-semibold text-amber-300">
                        Прикреплённый расчёт ({lockedCalculation.vehicleLabel}):
                      </div>
                      <div className="mt-1 text-zinc-400">
                        {lockedCalculation.selectedTitles.join(" · ")}
                      </div>
                      <div className="mt-2 font-display text-sm font-bold text-white">
                        Итого: {formatRubles(lockedCalculation.total)}
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(null);
                      setName("");
                      setPhone("");
                      setCarModel("");
                    }}
                    className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-amber-400/40 hover:text-amber-300 cursor-pointer"
                  >
                    Отправить ещё одну заявку
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="rounded-3xl border border-white/[0.08] bg-[#0b0d12]/80 p-5 sm:p-8"
                >
                  {/* Attached Calculation Banner */}
                  {lockedCalculation && (
                    <div className="mb-6 flex items-start justify-between gap-3 rounded-2xl border border-amber-400/35 bg-amber-500/10 p-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                          <span>Прикреплён расчёт</span>
                          <span>·</span>
                          <span>{lockedCalculation.vehicleLabel}</span>
                        </div>
                        <div className="mt-1 text-xs text-zinc-200 sm:text-sm">
                          {lockedCalculation.selectedTitles.join(", ")}
                        </div>
                        <div className="mt-1.5 font-display text-sm font-bold text-white">
                          {formatRubles(lockedCalculation.total)}
                          {lockedCalculation.discountPercent > 0 && (
                            <span className="ml-2 text-xs font-medium text-emerald-400">
                              (учтена скидка −{lockedCalculation.discountPercent}
                              %)
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={onClearCalculation}
                        aria-label="Удалить прикреплённый расчёт"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-zinc-400 hover:text-white cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="booking-name"
                        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400"
                      >
                        Ваше имя
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Например, Александр"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-amber-400/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-amber-400/20"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400"
                      >
                        Телефон
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={phone}
                        onChange={(e) =>
                          setPhone(formatRussianPhone(e.target.value))
                        }
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-amber-400/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-amber-400/20"
                      />
                    </div>
                  </div>

                  {/* Car Model */}
                  <div className="mt-4">
                    <label
                      htmlFor="booking-car"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400"
                    >
                      Марка и модель авто
                    </label>
                    <input
                      id="booking-car"
                      type="text"
                      required
                      placeholder="Например, BMW X5 G05 / Porsche Cayenne"
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-amber-400/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-amber-400/20"
                    />
                  </div>

                  {/* Messenger Choice */}
                  <div className="mt-5">
                    <span className="mb-2.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Удобный способ связи
                    </span>
                    <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                      {MESSENGERS.map((item) => {
                        const Icon = item.icon;
                        const selected = messenger === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setMessenger(item.id)}
                            aria-pressed={selected}
                            className={`flex flex-col items-center justify-center rounded-2xl border px-2 py-3 text-center transition-all cursor-pointer sm:px-3 ${
                              selected
                                ? "border-amber-400/70 bg-amber-500/15 text-amber-200 shadow-[0_0_20px_-8px_rgba(245,158,11,0.6)]"
                                : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            <Icon
                              className={`h-5 w-5 ${
                                selected ? "text-amber-400" : "text-zinc-400"
                              }`}
                            />
                            <span className="mt-1.5 text-xs font-semibold sm:text-sm">
                              {item.label}
                            </span>
                            <span className="mt-0.5 hidden text-[10px] text-zinc-500 sm:block">
                              {item.hint}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="mt-4 rounded-xl border border-red-500/35 bg-red-500/10 px-4 py-2.5 text-xs font-medium text-red-300"
                    >
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="neon-amber-btn mt-6 flex w-full items-center justify-center gap-2.5 rounded-2xl px-6 py-4 text-base font-bold text-zinc-950 cursor-pointer"
                  >
                    <span>Записаться на осмотр</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>

                  <p className="mt-3 text-center text-[11px] text-zinc-500">
                    Нажимая кнопку, вы соглашаетесь с политикой обработки
                    персональных данных. Без спама и рассылок.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
