import { Star } from "lucide-react";
import { REVIEWS, STUDIO_INFO } from "@/data/studio";

export function Reviews() {
  return (
    <section
      id="opinie"
      className="scroll-mt-24 bg-white py-24 text-zinc-950 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Header + Soft Rating Pill */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8102e]">
            Opinie klientów
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
            Zaufali nam kierowcy z Warszawy
          </h2>

          <div className="mt-6 inline-flex items-center gap-3.5 rounded-full bg-[#f7f7f9] px-5 py-2.5 shadow-sm">
            <span className="font-display text-lg font-bold text-zinc-950">
              {STUDIO_INFO.rating}
            </span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-[#c8102e] text-[#c8102e]"
                />
              ))}
            </div>
            <span className="text-xs font-medium text-zinc-500">
              {STUDIO_INFO.reviewsCount}
            </span>
          </div>
        </div>

        {/* 3 Soft Airy Review Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-7">
          {REVIEWS.map((review) => (
            <article
              key={review.id}
              className="soft-card-light flex flex-col justify-between rounded-3xl p-7 sm:p-8"
            >
              <div>
                <div
                  className="flex items-center gap-1"
                  aria-label={`Ocena ${review.rating} na 5`}
                >
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 fill-[#c8102e] text-[#c8102e]"
                    />
                  ))}
                </div>

                <div className="mt-4 inline-flex flex-wrap items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-medium text-zinc-600 shadow-xs">
                  <span className="font-semibold text-zinc-950">
                    {review.car}
                  </span>
                  <span className="text-zinc-300">·</span>
                  <span>{review.service}</span>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
                  „{review.text}”
                </p>
              </div>

              <div className="mt-7 flex items-center gap-3.5 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 font-display text-xs font-bold text-white">
                  {review.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-950">
                    {review.author}
                  </div>
                  <div className="text-xs text-zinc-400">{review.date}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
