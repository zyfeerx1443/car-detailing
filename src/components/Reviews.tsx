import { Star, Quote, CheckCircle2 } from "lucide-react";
import { REVIEWS, STUDIO_INFO } from "@/data/studio";

export function Reviews() {
  return (
    <section id="reviews" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="pointer-events-none absolute right-10 top-1/2 -z-10 h-[340px] w-[340px] -translate-y-1/2 rounded-full bg-amber-500/7 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              <span className="h-px w-6 bg-amber-400" />
              Репутация и доверие
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Отзывы наших клиентов
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
              Более 70% автовладельцев возвращаются к нам на ежегодное
              обновление керамики и рекомендуют студию друзьям.
            </p>
          </div>

          {/* Rating Badge */}
          <div className="glass-card inline-flex w-fit items-center gap-4 rounded-2xl px-5 py-3.5">
            <div className="font-display text-3xl font-bold text-amber-400">
              {STUDIO_INFO.rating}
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
              <div className="mt-1 text-xs font-medium text-zinc-400">
                {STUDIO_INFO.reviewsCount}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
          {REVIEWS.map((review) => (
            <article
              key={review.id}
              className="glass-card glass-card-hover relative flex flex-col justify-between rounded-3xl p-6 sm:p-7"
            >
              <div>
                {/* Top Row: Stars & Quote */}
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center gap-1 text-amber-400"
                    aria-label={`Оценка ${review.rating} из 5`}
                  >
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-amber-500/30" />
                </div>

                {/* Car & Service Tag */}
                <div className="mt-4 inline-flex flex-wrap items-center gap-2 rounded-xl border border-amber-400/20 bg-amber-500/[0.08] px-3 py-1.5 text-xs">
                  <span className="font-semibold text-amber-300">
                    {review.car}
                  </span>
                  <span className="text-amber-500/50">•</span>
                  <span className="text-zinc-300">{review.service}</span>
                </div>

                {/* Body */}
                <p className="mt-5 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
                  «{review.text}»
                </p>
              </div>

              {/* Author */}
              <div className="mt-7 flex items-center justify-between border-t border-white/[0.08] pt-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/30 bg-gradient-to-br from-amber-500/25 to-zinc-900 font-display text-xs font-bold text-amber-300">
                    {review.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
                      <span>{review.author}</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                    <div className="text-xs text-zinc-500">{review.date}</div>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-zinc-500">
                  Проверенный клиент
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
