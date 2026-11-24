import { Star } from "lucide-react";
import { REVIEWS, STUDIO_INFO } from "@/data/studio";

export function Reviews() {
  return (
    <section
      id="opinie"
      className="scroll-mt-24 border-t border-white/[0.06] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Opinie klientów
            </p>
            <h2 className="mt-2.5 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Zaufali nam kierowcy z Warszawy
            </h2>
          </div>

          <div className="inline-flex w-fit items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5">
            <span className="font-display text-xl font-semibold text-white">
              {STUDIO_INFO.rating}
            </span>
            <div className="h-6 w-px bg-white/10" />
            <div>
              <div className="flex items-center gap-0.5 text-white">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-white text-white" />
                ))}
              </div>
              <div className="mt-0.5 text-[11px] text-zinc-400">
                {STUDIO_INFO.reviewsCount}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Monochrome Review Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <article
              key={review.id}
              className="mono-card flex flex-col justify-between rounded-2xl p-6"
            >
              <div>
                <div
                  className="flex items-center gap-1"
                  aria-label={`Ocena ${review.rating} na 5`}
                >
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-3.5 w-3.5 fill-white text-white"
                    />
                  ))}
                </div>

                <div className="mt-4 text-xs font-medium text-zinc-400">
                  <span className="text-white">{review.car}</span>
                  <span className="mx-1.5 text-zinc-600">·</span>
                  <span>{review.service}</span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                  „{review.text}”
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] font-display text-xs font-semibold text-white">
                    {review.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {review.author}
                    </div>
                    <div className="text-xs text-zinc-500">{review.date}</div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
