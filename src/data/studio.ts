export const STUDIO_INFO = {
  brand: "APEX",
  brandSub: "DETAILING LAB",
  cityPrepositional: "Москве",
  city: "Москва",
  phoneDisplay: "+7 (495) 988-42-10",
  phoneHref: "tel:+74959884210",
  email: "studio@apex-detailing.ru",
  address: "г. Москва, 2-я Магистральная ул., д. 18, стр. 2",
  addressNote: "Закрытая охраняемая территория · удобный заезд с ТТК",
  hours: "Ежедневно с 09:00 до 21:00",
  rating: "5.0",
  reviewsCount: "240+ отзывов на Яндекс Картах",
  socials: {
    telegram: "https://t.me/apex_detailing_lab",
    whatsapp: "https://wa.me/74959884210",
    vk: "https://vk.com/apex_detailing_lab",
    youtube: "https://youtube.com/@apex_detailing_lab",
  },
} as const;

export type VehicleClassId = "sedan" | "crossover" | "suv";

export interface VehicleClass {
  id: VehicleClassId;
  label: string;
  subtitle: string;
  examples: string;
  multiplier: number;
}

export const VEHICLE_CLASSES: VehicleClass[] = [
  {
    id: "sedan",
    label: "Седан",
    subtitle: "Купе · Хэтчбек · Бизнес-класс",
    examples: "BMW 3 / 5, Mercedes E-Class, Audi A6",
    multiplier: 1,
  },
  {
    id: "crossover",
    label: "Кроссовер",
    subtitle: "Компактный и средний SUV",
    examples: "Porsche Macan, BMW X3 / X5, Li L7",
    multiplier: 1.2,
  },
  {
    id: "suv",
    label: "Внедорожник",
    subtitle: "Полноразмерный SUV · Минивэн",
    examples: "Range Rover, Mercedes GLS, Land Cruiser",
    multiplier: 1.4,
  },
];

export type ServiceId =
  | "ceramic"
  | "ppf_front"
  | "ppf_full"
  | "interior"
  | "presale"
  | "glass_wheels";

export interface ServiceCardItem {
  id: ServiceId;
  calculatorIds: ServiceId[];
  title: string;
  tag: string;
  priceFrom: number;
  duration: string;
  description: string;
  highlights: string[];
  featured?: boolean;
}

export const SERVICE_CARDS: ServiceCardItem[] = [
  {
    id: "ceramic",
    calculatorIds: ["ceramic"],
    title: "Керамика и полировка",
    tag: "Хит студии",
    priceFrom: 35000,
    duration: "2–3 дня",
    description:
      "Многоэтапная восстановительная полировка кузова с удалением до 95% царапин и нанесением 2–3 слоёв керамики 9H.",
    highlights: [
      "Глубокая зеркальная глубина цвета и блеск",
      "Мощный гидрофобный и антистатический эффект",
      "Защита от реагентов, УФ и птичьего помёта до 3 лет",
    ],
    featured: true,
  },
  {
    id: "ppf_front",
    calculatorIds: ["ppf_front"],
    title: "Оклейка полиуретаном",
    tag: "Максимум защиты",
    priceFrom: 65000,
    duration: "2–5 дней",
    description:
      "Бронирование зон риска или полная оклейка кузова антигравийной полиуретановой плёнкой LLumar / SunTek с подворотом краёв.",
    highlights: [
      "Толщина 190–210 мкм — защита от камней и пескоструя",
      "Эффект самовосстановления царапин при нагреве",
      "Гарантия от пожелтения и отслоений до 5 лет",
    ],
  },
  {
    id: "interior",
    calculatorIds: ["interior"],
    title: "Детейлинг-химчистка салона",
    tag: "Чистота и уход",
    priceFrom: 18000,
    duration: "1–2 дня",
    description:
      "Деликатная глубокая очистка кожи, алькантары, текстиля и декоративных вставок составами Koch-Chemie с консервацией.",
    highlights: [
      "Матовый защитный бальзам для кожи без жирного блеска",
      "Безопасная чистка воздуховодов, швов и кнопок",
      "Озонация салона — устранение 100% запахов и бактерий",
    ],
  },
  {
    id: "presale",
    calculatorIds: ["presale"],
    title: "Предпродажная подготовка",
    tag: "Под ключ",
    priceFrom: 29000,
    duration: "1–2 дня",
    description:
      "Комплексное обновление внешнего вида и салона перед продажей: повышает ликвидность и итоговую цену авто до 15%.",
    highlights: [
      "Освежающая полировка + быстрый защитный состав",
      "Комплексная чистка салона, багажника и подкапотного",
      "Студийная фотосессия автомобиля для объявления",
    ],
  },
];

export interface CalculatorService {
  id: ServiceId;
  title: string;
  shortTitle: string;
  description: string;
  basePrice: number;
  days: number;
  exclusiveWith?: ServiceId;
  badge?: string;
}

export const CALCULATOR_SERVICES: CalculatorService[] = [
  {
    id: "ceramic",
    title: "Керамика 9H + восстановительная полировка",
    shortTitle: "Керамика и полировка",
    description: "2–3 этапа полировки, обезжиривание, 2 слоя керамики + топ-коут",
    basePrice: 35000,
    days: 2,
    badge: "Популярно",
  },
  {
    id: "ppf_front",
    title: "Оклейка зон риска полиуретаном",
    shortTitle: "Полиуретан (зоны риска)",
    description: "Капот, бампер, передние крылья, фары, зеркала, стойки и полоса крыши",
    basePrice: 65000,
    days: 2,
    exclusiveWith: "ppf_full",
  },
  {
    id: "ppf_full",
    title: "Полная оклейка кузова полиуретаном",
    shortTitle: "Полная оклейка PPF",
    description: "100% кузова в глянцевый или сатиновый (матовый) полиуретан с подворотами",
    basePrice: 185000,
    days: 5,
    exclusiveWith: "ppf_front",
    badge: "Гарантия 5 лет",
  },
  {
    id: "interior",
    title: "Детейлинг-химчистка салона + озонация",
    shortTitle: "Химчистка салона",
    description: "Полная очистка кожи, текстиля, пластика и консервация защитным кремом",
    basePrice: 18000,
    days: 1,
  },
  {
    id: "presale",
    title: "Предпродажная подготовка «под ключ»",
    shortTitle: "Предпродажная подготовка",
    description: "Лёгкая полировка, чистка салона, мойка двигателя паром, чернение и фото",
    basePrice: 29000,
    days: 1,
  },
  {
    id: "glass_wheels",
    title: "Антидождь на все стёкла + керамика дисков",
    shortTitle: "Антидождь и диски",
    description: "Улучшенная видимость в ливень и защита дисков от тормозной пыли",
    basePrice: 9500,
    days: 0.5,
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
    author: "Алексей Соколов",
    car: "BMW X5 G05",
    service: "Оклейка зон риска + керамика 9H",
    date: "Октябрь 2026",
    rating: 5,
    text: "Забирал новый X5 прямо из салона и сразу пригнал в APEX. Ребята идеально затянули всю переднюю часть в полиуретан SunTek — стыков и подворотов вообще не видно, даже если вглядываться вплотную. На остальной кузов положили керамику, цвет «чёрный сапфир» стал буквально бездонным. Отдельное спасибо за ежедневные фотоотчёты в Telegram.",
    initials: "АС",
  },
  {
    id: "rev-2",
    author: "Дмитрий Воронов",
    car: "Porsche Cayenne Coupe",
    service: "Восстановительная полировка + химчистка",
    date: "Сентябрь 2026",
    rating: 5,
    text: "После двух московских зим на кузове появилась мелкая паутинка от моек, а светлая кожа на водительском кресле заметно потемнела. Здесь реально светлая стерильная студия и адекватные мастера — сначала показали все нюансы под лампами и замерили толщину лака. Забрал машину как из шоурума: кожа снова матовая, ни одного развода или запаха химии.",
    initials: "ДВ",
  },
  {
    id: "rev-3",
    author: "Екатерина Морозова",
    car: "Mercedes-Benz E-Class",
    service: "Предпродажная подготовка",
    date: "Август 2026",
    rating: 5,
    text: "Готовила машину к продаже и решила сделать комплекс под ключ. Честно, когда увидела результат — даже задумалась, а стоит ли продавать. Моторный отсек идеально чистый, кузов сияет, царапины на дверях исчезли. Продала автомобиль первому же покупателю на 180 тысяч дороже рынка буквально за два дня. Рекомендую!",
    initials: "ЕМ",
  },
];

export const PARTNER_BRANDS = [
  "KOCH-CHEMIE",
  "LLUMAR",
  "GYEON QUARTZ",
  "SUNTEK",
  "RUPES",
  "SONAX PROFILINE",
];

export function formatRubles(amount: number): string {
  return new Intl.NumberFormat("ru-RU").format(Math.round(amount)) + " ₽";
}
