/**
 * Static, brand-neutral defaults. Studio name, address and phone are
 * personalized per client via URL params — see `resolveStudioProfile`.
 */
export const STUDIO_INFO = {
  phoneDisplay: "+48 512 840 320",
  phoneHref: "tel:+48512840320",
  whatsappNumber: "48512840320",
  addressNote: "Monitorowany parking podziemny · wygodny dojazd",
  hours: "Pn–Sb: 08:30 – 20:00",
  rating: "5.0",
  reviewsCount: "180+ opinii w Google",
} as const;

export type VehicleClassId = "ab" | "cd" | "suv" | "big_suv";

export interface VehicleClass {
  id: VehicleClassId;
  label: string;
  shortLabel: string;
  examples: string;
}

export const VEHICLE_CLASSES: VehicleClass[] = [
  {
    id: "ab",
    label: "Segment A/B (Małe)",
    shortLabel: "Segment A/B",
    examples: "VW Polo, Mini Cooper, Toyota Yaris",
  },
  {
    id: "cd",
    label: "Segment C/D (Sedan/Kombi)",
    shortLabel: "Segment C/D",
    examples: "BMW Serii 3, Audi A4, VW Passat",
  },
  {
    id: "suv",
    label: "SUV / Crossover",
    shortLabel: "SUV / Crossover",
    examples: "Porsche Macan, BMW X3, Volvo XC60",
  },
  {
    id: "big_suv",
    label: "Duży SUV / Van",
    shortLabel: "Duży SUV / Van",
    examples: "Mercedes GLS, Range Rover, VW Multivan",
  },
];

export type ServiceId =
  | "wash"
  | "onestep"
  | "ceramic"
  | "interior"
  | "ppf_front";

export interface ServiceCardItem {
  id: ServiceId;
  title: string;
  priceRange: string;
  duration: string;
  description: string;
  highlights: string[];
}

export const SERVICE_CARDS: ServiceCardItem[] = [
  {
    id: "wash",
    title: "Mycie detailingowe",
    priceRange: "150 – 250 zł",
    duration: "2–3 godz.",
    description:
      "Bezpieczne wieloetapowe mycie ręczne z dekontaminacją lakieru, czyszczeniem felg i zabezpieczeniem szybkim woskiem.",
    highlights: [
      "Piana aktywna pH neutralne i mycie na dwa wiadra",
      "Doczyszczanie felg, nadkoli, wnęk i emblematów",
      "Osuszanie delikatnymi ręcznikami i dressing opon",
    ],
  },
  {
    id: "onestep",
    title: "Polerowanie One-Step",
    priceRange: "900 – 1 200 zł",
    duration: "1 dzień",
    description:
      "Jednoetapowe odświeżenie lakieru usuwające do 65% drobnych zarysowań i hologramów. Przywraca głębię koloru i szklistość.",
    highlights: [
      "Pełna dekontaminacja chemiczna i glinkowanie",
      "Korekta One-Step maszynami Rupes i pastami Sonax",
      "Odtłuszczenie lakieru i zabezpieczenie woskiem",
    ],
  },
  {
    id: "ceramic",
    title: "Powłoka ceramiczna",
    priceRange: "1 400 – 2 000 zł",
    duration: "2–3 dni",
    description:
      "Trwała ochrona lakieru certyfikowaną powłoką ceramiczną 9H. Nadaje lustrzany połysk, silną hydrofobowość i ułatwia mycie.",
    highlights: [
      "Przygotowanie lakieru + odświeżenie przed aplikacją",
      "Aplikacja 2 warstw powłoki ceramicznej Gyeon / CarPro",
      "Pisemna gwarancja ochrony od 3 do 5 lat",
    ],
  },
  {
    id: "interior",
    title: "Pranie i detailing wnętrza",
    priceRange: "450 – 700 zł",
    duration: "1 dzień",
    description:
      "Kompleksowe czyszczenie kabiny, pranie ekstrakcyjne tapicerki lub czyszczenie i matowa impregnacja skór chemią Koch-Chemie.",
    highlights: [
      "Dokładne odkurzanie, pędzelkowanie i czyszczenie plastików",
      "Pranie ekstrakcyjne foteli i wykładzin lub pielęgnacja skóry",
      "Ozonowanie kabiny usuwające zapachy i bakterie",
    ],
  },
];

export interface CalculatorService {
  id: ServiceId;
  title: string;
  shortTitle: string;
  description: string;
  prices: Record<VehicleClassId, number>;
  hours: number;
}

export const CALCULATOR_SERVICES: CalculatorService[] = [
  {
    id: "wash",
    title: "Mycie detailingowe z dekontaminacją",
    shortTitle: "Mycie detailingowe",
    description: "Mycie ręczne pH neutralne, felgi, wnęki drzwi i dressing opon",
    prices: {
      ab: 150,
      cd: 180,
      suv: 210,
      big_suv: 250,
    },
    hours: 3,
  },
  {
    id: "onestep",
    title: "Polerowanie One-Step (odświeżenie lakieru)",
    shortTitle: "Polerowanie One-Step",
    description: "Usunięcie 50–65% mikrorys i zmatowień, głębia koloru",
    prices: {
      ab: 900,
      cd: 1000,
      suv: 1100,
      big_suv: 1200,
    },
    hours: 8,
  },
  {
    id: "ceramic",
    title: "Powłoka ceramiczna 9H (3–5 lat)",
    shortTitle: "Powłoka ceramiczna",
    description: "2 warstwy ceramiki, silny efekt hydrofobowy i szklistość",
    prices: {
      ab: 1400,
      cd: 1600,
      suv: 1800,
      big_suv: 2000,
    },
    hours: 16,
  },
  {
    id: "interior",
    title: "Pranie tapicerki i detailing wnętrza",
    shortTitle: "Detailing wnętrza",
    description: "Pranie ekstrakcyjne / pielęgnacja skór, plastiki, szyby, ozonowanie",
    prices: {
      ab: 450,
      cd: 520,
      suv: 600,
      big_suv: 700,
    },
    hours: 6,
  },
  {
    id: "ppf_front",
    title: "Folia ochronna PPF (strefy ryzyka)",
    shortTitle: "Folia PPF (przód)",
    description: "Zderzak, maska, reflektory, lusterka i wnęki klamek",
    prices: {
      ab: 2600,
      cd: 2900,
      suv: 3300,
      big_suv: 3700,
    },
    hours: 16,
  },
];

export interface ReviewItem {
  id: string;
  author: string;
  car: string;
  service: string;
  date: string;
  rating: number;
  text: string;
  initials: string;
}

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Marek Kowalski",
    car: "BMW Serii 3 G20",
    service: "One-Step + Powłoka ceramiczna",
    date: "Październik 2026",
    rating: 5,
    text: "Oddałem czarne BMW z wyraźnymi rysami po myjniach automatycznych. Po korekcie One-Step i położeniu ceramiki lakier wygląda lepiej niż przy odbiorze z salonu. Świetny kontakt na WhatsApp, jasna wycena przed pracą i terminowość co do godziny.",
    initials: "MK",
  },
  {
    id: "rev-2",
    author: "Piotr Zieliński",
    car: "Volvo XC60",
    service: "Pranie i detailing wnętrza",
    date: "Wrzesień 2026",
    rating: 5,
    text: "Jasna skórzana tapicerka odzyskała fabryczny, matowy wygląd bez tłustego nalotu. Wnętrze jest sterylnie czyste, bez sztucznych zapachów. Widać, że studio pracuje na topowej chemii i nie oszczędza czasu na detale.",
    initials: "PZ",
  },
  {
    id: "rev-3",
    author: "Karolina Nowak",
    car: "Audi Q5",
    service: "Mycie detailingowe + PPF przód",
    date: "Sierpień 2026",
    rating: 5,
    text: "Czyste, minimalistyczne studio z doskonałym oświetleniem. Folia ochronna na przodzie została położona z zawinięciem krawędzi — praktycznie niewidoczna. Zdecydowanie polecam każdemu, kto dba o swoje auto.",
    initials: "KN",
  },
];

export const PARTNER_BRANDS = [
  "KOCH-CHEMIE",
  "GYEON",
  "SONAX PROFILINE",
  "RUPES",
  "LLUMAR",
  "CARPRO",
];

export function formatPLN(amount: number): string {
  return new Intl.NumberFormat("pl-PL").format(Math.round(amount)) + " zł";
}

export function buildWhatsAppUrl(
  message: string,
  whatsappNumber: string = STUDIO_INFO.whatsappNumber
): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Per-client personalization resolved from URL search params
 * (?name=, ?address=, ?phone=). Falls back to defaults when absent/invalid.
 */
export interface StudioProfile {
  name: string;
  address: string;
  whatsappNumber: string;
  phoneDisplay: string;
  phoneHref: string;
}

export const DEFAULT_STUDIO_NAME = "Premium Detailing Warszawa";
export const DEFAULT_STUDIO_ADDRESS = "Warszawa";

type SearchParamValue = string | string[] | undefined;

function firstParam(value: SearchParamValue): string {
  const raw = Array.isArray(value) ? value[0] : value;
  return (raw ?? "").replace(/\s+/g, " ").trim();
}

function textParam(value: SearchParamValue, fallback: string, maxLength: number) {
  const text = firstParam(value).slice(0, maxLength).trim();
  return text || fallback;
}

/** Normalizes a phone param to wa.me digits; 9-digit numbers are treated as Polish. */
function normalizeWhatsAppNumber(value: SearchParamValue): string | null {
  let digits = firstParam(value).replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length === 9) digits = "48" + digits;
  return digits.length >= 10 && digits.length <= 15 ? digits : null;
}

function formatPhoneDisplay(digits: string): string {
  if (digits.length === 11 && digits.startsWith("48")) {
    const local = digits.slice(2);
    return `+48 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
  }
  return `+${digits}`;
}

export function buildPageTitle(studioName: string): string {
  return `${studioName} | Detailing & Ochrona Lakieru Warszawa`;
}

export function buildPageDescription(studioName: string): string {
  return `${studioName} — profesjonalny auto detailing w Warszawie: mycie detailingowe, polerowanie One-Step, powłoki ceramiczne 9H oraz pranie i detailing wnętrza. Szybka wycena online.`;
}

export function resolveStudioProfile(params: {
  name?: SearchParamValue;
  address?: SearchParamValue;
  phone?: SearchParamValue;
}): StudioProfile {
  const whatsappNumber = normalizeWhatsAppNumber(params.phone);

  return {
    name: textParam(params.name, DEFAULT_STUDIO_NAME, 80),
    address: textParam(params.address, DEFAULT_STUDIO_ADDRESS, 140),
    whatsappNumber: whatsappNumber ?? STUDIO_INFO.whatsappNumber,
    phoneDisplay: whatsappNumber
      ? formatPhoneDisplay(whatsappNumber)
      : STUDIO_INFO.phoneDisplay,
    phoneHref: whatsappNumber ? `tel:+${whatsappNumber}` : STUDIO_INFO.phoneHref,
  };
}
