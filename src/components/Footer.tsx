import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Send,
  MessageCircle,
  Play,
  Globe,
} from "lucide-react";
import { STUDIO_INFO } from "@/data/studio";

const SOCIAL_LINKS = [
  { label: "Telegram", href: STUDIO_INFO.socials.telegram, icon: Send },
  { label: "WhatsApp", href: STUDIO_INFO.socials.whatsapp, icon: MessageCircle },
  { label: "VK", href: STUDIO_INFO.socials.vk, icon: Globe },
  { label: "YouTube", href: STUDIO_INFO.socials.youtube, icon: Play },
];

export function Footer() {
  return (
    <footer
      id="contacts"
      className="relative border-t border-white/[0.08] bg-[#06070a] pb-10 pt-16 sm:pt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a href="#" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/40 bg-amber-500/10">
                <span className="font-display text-base font-bold text-amber-400">
                  A
                </span>
              </div>
              <div className="leading-none">
                <div className="font-display text-base font-bold tracking-[0.14em] text-white">
                  {STUDIO_INFO.brand}
                </div>
                <div className="mt-1 text-[10px] font-semibold tracking-[0.22em] text-zinc-500">
                  {STUDIO_INFO.brandSub}
                </div>
              </div>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-400">
              Премиальная детейлинг-студия полного цикла в{" "}
              {STUDIO_INFO.cityPrepositional}. Профессиональная защита кузова
              керамикой и полиуретаном, деликатный уход за интерьером.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-semibold text-zinc-300 transition-all hover:border-amber-400/50 hover:bg-amber-500/10 hover:text-amber-300"
                  >
                    <Icon className="h-3.5 w-3.5 text-amber-400" />
                    <span>{social.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">
              Навигация
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
              {[
                { href: "#services", label: "Услуги и цены" },
                { href: "#calculator", label: "Калькулятор" },
                { href: "#about", label: "О студии" },
                { href: "#reviews", label: "Отзывы клиентов" },
                { href: "#booking", label: "Запись на осмотр" },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors hover:text-amber-400"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">
              Контакты
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li>
                <a
                  href={STUDIO_INFO.phoneHref}
                  className="flex items-center gap-3 font-semibold text-white transition-colors hover:text-amber-400"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-amber-400">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span>{STUDIO_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${STUDIO_INFO.email}`}
                  className="flex items-center gap-3 text-zinc-400 transition-colors hover:text-amber-400"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-amber-400">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span>{STUDIO_INFO.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Address & Hours */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">
              Адрес и режим работы
            </h3>
            <div className="mt-4 space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-amber-400">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-medium text-zinc-200">
                    {STUDIO_INFO.address}
                  </div>
                  <div className="mt-0.5 text-xs text-zinc-500">
                    {STUDIO_INFO.addressNote}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-amber-400">
                  <Clock className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-medium text-zinc-200">
                    {STUDIO_INFO.hours}
                  </div>
                  <div className="mt-0.5 text-xs text-zinc-500">
                    Без выходных, по предварительной записи
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-zinc-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {STUDIO_INFO.brand}{" "}
            {STUDIO_INFO.brandSub}. Все права защищены.
          </p>
          <p>Не является публичной офертой · Москва</p>
        </div>
      </div>
    </footer>
  );
}
