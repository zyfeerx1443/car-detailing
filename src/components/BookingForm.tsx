"use client";

import { useState, FormEvent } from "react";
import {
  MessageCircle,
  PhoneCall,
  CheckCircle2,
  X,
  ArrowRight,
} from "lucide-react";
import { STUDIO_INFO, formatPLN, buildWhatsAppUrl } from "@/data/studio";
import type { CalculationSummary } from "./Calculator";

type ContactChannel = "WhatsApp" | "Telefon";

interface BookingFormProps {
  lockedCalculation: CalculationSummary | null;
  onClearCalculation: () => void;
}

function formatPolishPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";

  let normalized = digits;
  if (!normalized.startsWith("48")) {
    normalized = "48" + normalized;
  }
  normalized = normalized.slice(0, 11);

  const local = normalized.slice(2);
  let result = "+48";
  if (local.length > 0) result += " " + local.slice(0, 3);
  if (local.length > 3) result += " " + local.slice(3, 6);
  if (local.length > 6) result += " " + local.slice(6, 9);
  return result;
}

export function BookingForm({
  lockedCalculation,
  onClearCalculation,
}: BookingFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [carModel, setCarModel] = useState("");
  const [channel, setChannel] = useState<ContactChannel>("WhatsApp");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{
    orderId: string;
    name: string;
    phone: string;
    carModel: string;
    channel: ContactChannel;
  } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const digits = phone.replace(/\D/g, "");
    const trimmedCar = carModel.trim();

    if (trimmedName.length < 2) {
      setError("Podaj proszę swoje imię.");
      return;
    }
    if (digits.length < 11) {
      setError("Wpisz poprawny polski numer telefonu (9 cyfr po +48).");
      return;
    }
    if (trimmedCar.length < 2) {
      setError("Podaj markę i model samochodu.");
      return;
    }

    setError(null);
    const orderId = `WAW-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmitted({
      orderId,
      name: trimmedName,
      phone,
      carModel: trimmedCar,
      channel,
    });
  };

  const directWhatsAppText = lockedCalculation
    ? `Dzień dobry! Chciałbym zarezerwować termin (${lockedCalculation.vehicleLabel}: ${lockedCalculation.selectedTitles.join(
        ", "
      )} — ${formatPLN(lockedCalculation.total)}).${
        carModel.trim() ? ` Auto: ${carModel.trim()}.` : ""
      }`
    : `Dzień dobry! Chciałbym zarezerwować termin detailingu w Warszawie.${
        carModel.trim() ? ` Auto: ${carModel.trim()}.` : ""
      }`;

  return (
    <section
      id="rezerwacja"
      className="scroll-mt-24 border-t border-white/[0.06] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mono-card rounded-3xl p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left Info */}
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Rezerwacja i kontakt
                </p>
                <h2 className="mt-2.5 font-display text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                  Zarezerwuj termin lub napisz na WhatsApp
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  Zostaw krótkie zgłoszenie — oddzwonimy lub odpiszemy w ciągu
                  15 minut, potwierdzimy wolny termin i dokładny zakres prac.
                </p>
              </div>

              <div className="mt-8 space-y-3 border-t border-white/[0.08] pt-6">
                <a
                  href={buildWhatsAppUrl(directWhatsAppText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-mono flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Wyślij na WhatsApp</span>
                </a>
                <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                  <a
                    href={STUDIO_INFO.phoneHref}
                    className="font-medium text-white hover:underline"
                  >
                    {STUDIO_INFO.phoneDisplay}
                  </a>
                  <span>{STUDIO_INFO.hours}</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/[0.03] p-6 text-center sm:p-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="mt-4 text-xs font-medium uppercase tracking-widest text-zinc-400">
                    Zgłoszenie nr {submitted.orderId}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold text-white">
                    Dziękujemy, {submitted.name}!
                  </h3>
                  <p className="mt-2.5 max-w-md text-sm leading-relaxed text-zinc-400">
                    Otrzymaliśmy rezerwację dla{" "}
                    <span className="font-medium text-white">
                      {submitted.carModel}
                    </span>
                    . Skontaktujemy się przez{" "}
                    <span className="font-medium text-white">
                      {submitted.channel}
                    </span>{" "}
                    ({submitted.phone}).
                  </p>

                  {lockedCalculation && (
                    <div className="mt-5 w-full max-w-md rounded-xl border border-white/10 bg-[#09090b]/70 p-4 text-left text-xs text-zinc-300">
                      <div className="font-semibold text-white">
                        Dołączona wycena ({lockedCalculation.vehicleLabel}):
                      </div>
                      <div className="mt-1 text-zinc-400">
                        {lockedCalculation.selectedTitles.join(" · ")}
                      </div>
                      <div className="mt-2 font-display text-sm font-semibold text-white">
                        Razem: {formatPLN(lockedCalculation.total)}
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
                    className="btn-secondary-mono mt-6 rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer"
                  >
                    Wyślij kolejne zgłoszenie
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="rounded-2xl border border-white/[0.08] bg-[#09090b]/80 p-5 sm:p-7"
                >
                  {lockedCalculation && (
                    <div className="mb-5 flex items-start justify-between gap-3 rounded-xl border border-white/15 bg-white/[0.04] p-3.5">
                      <div className="min-w-0">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                          Wybrany pakiet · {lockedCalculation.vehicleLabel}
                        </div>
                        <div className="mt-0.5 text-xs text-zinc-200 sm:text-sm">
                          {lockedCalculation.selectedTitles.join(", ")}
                        </div>
                        <div className="mt-1 font-display text-sm font-semibold text-white">
                          {formatPLN(lockedCalculation.total)}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={onClearCalculation}
                        aria-label="Usuń wycenę z formularza"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 text-zinc-400 hover:text-white cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="booking-name"
                        className="mb-1.5 block text-xs font-medium text-zinc-400"
                      >
                        Imię
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="np. Marek"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-white/50 focus:bg-white/[0.05]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="mb-1.5 block text-xs font-medium text-zinc-400"
                      >
                        Telefon
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="+48 512 840 320"
                        value={phone}
                        onChange={(e) =>
                          setPhone(formatPolishPhone(e.target.value))
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-white/50 focus:bg-white/[0.05]"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="booking-car"
                      className="mb-1.5 block text-xs font-medium text-zinc-400"
                    >
                      Marka i model samochodu
                    </label>
                    <input
                      id="booking-car"
                      type="text"
                      required
                      placeholder="np. BMW Serii 3 / Volvo XC60"
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-white/50 focus:bg-white/[0.05]"
                    />
                  </div>

                  <div className="mt-4">
                    <span className="mb-2 block text-xs font-medium text-zinc-400">
                      Preferowany kontakt
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      {(
                        [
                          { id: "WhatsApp", label: "WhatsApp", icon: MessageCircle },
                          { id: "Telefon", label: "Rozmowa tel.", icon: PhoneCall },
                        ] as const
                      ).map((opt) => {
                        const Icon = opt.icon;
                        const active = channel === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setChannel(opt.id)}
                            aria-pressed={active}
                            className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                              active
                                ? "border-white bg-white text-zinc-950"
                                : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/25"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span>{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="mt-4 rounded-xl border border-white/25 bg-white/[0.06] px-4 py-2.5 text-xs font-medium text-white"
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn-primary-white mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold cursor-pointer sm:text-base"
                  >
                    <span>Zarezerwuj termin</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <p className="mt-3 text-center text-[11px] text-zinc-500">
                    Wysyłając formularz, wyrażasz zgodę na kontakt w sprawie
                    wyceny i rezerwacji terminu.
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
