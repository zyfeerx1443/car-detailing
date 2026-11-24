"use client";

import { useState, FormEvent } from "react";
import {
  MessageCircle,
  PhoneCall,
  CheckCircle2,
  X,
  ArrowRight,
} from "lucide-react";
import {
  STUDIO_INFO,
  StudioProfile,
  formatPLN,
  buildWhatsAppUrl,
} from "@/data/studio";
import type { CalculationSummary } from "./Calculator";

type ContactChannel = "WhatsApp" | "Telefon";

interface BookingFormProps {
  studio: StudioProfile;
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
  studio,
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
    ? `Dzień dobry! Chciałbym zarezerwować termin w studiu ${studio.name} (${lockedCalculation.vehicleLabel}: ${lockedCalculation.selectedTitles.join(
        ", "
      )} — ${formatPLN(lockedCalculation.total)}).${
        carModel.trim() ? ` Auto: ${carModel.trim()}.` : ""
      }`
    : `Dzień dobry! Chciałbym zarezerwować termin detailingu w studiu ${studio.name}.${
        carModel.trim() ? ` Auto: ${carModel.trim()}.` : ""
      }`;

  return (
    <section
      id="rezerwacja"
      className="scroll-mt-24 bg-white pb-24 pt-6 sm:pb-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-[#111114] p-7 text-zinc-100 shadow-[0_32px_80px_-28px_rgba(10,10,15,0.45)] sm:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Info */}
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff7b8e]">
                  Rezerwacja i kontakt
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                  Zarezerwuj termin lub napisz na WhatsApp
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
                  Zostaw krótkie zgłoszenie — oddzwonimy lub odpiszemy w ciągu
                  15 minut, potwierdzimy wolny termin i dokładny zakres prac.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <a
                  href={buildWhatsAppUrl(
                    directWhatsAppText,
                    studio.whatsappNumber
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="soft-pill-dark-ghost flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  <MessageCircle className="h-4 w-4 text-[#ff6b81]" />
                  <span>Wyślij na WhatsApp</span>
                </a>
                <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-zinc-400">
                  <a
                    href={studio.phoneHref}
                    className="font-semibold text-white hover:underline"
                  >
                    {studio.phoneDisplay}
                  </a>
                  <span>{STUDIO_INFO.hours}</span>
                </div>
              </div>
            </div>

            {/* Right Soft Rounded Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center rounded-3xl bg-white/[0.04] p-7 text-center sm:p-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c8102e]/20 text-[#ff6b81]">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <div className="mt-4 rounded-full bg-white/[0.07] px-3.5 py-1 text-xs font-semibold text-zinc-300">
                    Zgłoszenie nr {submitted.orderId}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-white">
                    Dziękujemy, {submitted.name}!
                  </h3>
                  <p className="mt-2.5 max-w-md text-sm leading-relaxed text-zinc-300">
                    Otrzymaliśmy rezerwację dla{" "}
                    <span className="font-semibold text-white">
                      {submitted.carModel}
                    </span>
                    . Skontaktujemy się przez{" "}
                    <span className="font-semibold text-white">
                      {submitted.channel}
                    </span>{" "}
                    ({submitted.phone}).
                  </p>

                  {lockedCalculation && (
                    <div className="mt-5 w-full max-w-md rounded-2xl bg-black/40 p-4 text-left text-xs text-zinc-300">
                      <div className="font-semibold text-white">
                        Dołączona wycena ({lockedCalculation.vehicleLabel}):
                      </div>
                      <div className="mt-1 text-zinc-400">
                        {lockedCalculation.selectedTitles.join(" · ")}
                      </div>
                      <div className="mt-2 font-display text-sm font-bold text-white">
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
                    className="soft-pill-dark-ghost mt-6 rounded-full px-6 py-2.5 text-xs font-semibold cursor-pointer"
                  >
                    Wyślij kolejne zgłoszenie
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="rounded-3xl bg-white/[0.04] p-6 sm:p-8"
                >
                  {lockedCalculation && (
                    <div className="mb-6 flex items-start justify-between gap-3 rounded-2xl bg-white/[0.06] p-4">
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#ff7b8e]">
                          Wybrany pakiet · {lockedCalculation.vehicleLabel}
                        </div>
                        <div className="mt-1 text-xs text-zinc-200 sm:text-sm">
                          {lockedCalculation.selectedTitles.join(", ")}
                        </div>
                        <div className="mt-1.5 font-display text-sm font-bold text-white">
                          {formatPLN(lockedCalculation.total)}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={onClearCalculation}
                        aria-label="Usuń wycenę z formularza"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-zinc-300 hover:bg-white/20 hover:text-white cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="booking-name"
                        className="mb-2 block text-xs font-semibold text-zinc-300"
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
                        className="w-full rounded-2xl bg-white/[0.06] px-4 py-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:bg-white/[0.1] focus:ring-2 focus:ring-white/25"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="mb-2 block text-xs font-semibold text-zinc-300"
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
                        className="w-full rounded-2xl bg-white/[0.06] px-4 py-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:bg-white/[0.1] focus:ring-2 focus:ring-white/25"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="booking-car"
                      className="mb-2 block text-xs font-semibold text-zinc-300"
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
                      className="w-full rounded-2xl bg-white/[0.06] px-4 py-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:bg-white/[0.1] focus:ring-2 focus:ring-white/25"
                    />
                  </div>

                  <div className="mt-5">
                    <span className="mb-2.5 block text-xs font-semibold text-zinc-300">
                      Preferowany kontakt
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      {(
                        [
                          {
                            id: "WhatsApp",
                            label: "WhatsApp",
                            icon: MessageCircle,
                          },
                          {
                            id: "Telefon",
                            label: "Rozmowa tel.",
                            icon: PhoneCall,
                          },
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
                            className={`flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all cursor-pointer ${
                              active
                                ? "bg-white text-zinc-950 shadow-sm"
                                : "bg-white/[0.06] text-zinc-300 hover:bg-white/[0.1]"
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
                      className="mt-4 rounded-2xl bg-[#c8102e]/20 px-4 py-3 text-xs font-semibold text-[#ff9aa8]"
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="soft-pill-crimson mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold cursor-pointer sm:text-base"
                  >
                    <span>Zarezerwuj termin</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <p className="mt-3.5 text-center text-[11px] text-zinc-500">
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
