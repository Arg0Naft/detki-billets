import { Calendar, Clock, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { EventConfig } from "@/types";

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero({ config }: { config: EventConfig }) {
  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#D9F1FF]/75 via-white/45 to-transparent" />
      <div className="pointer-events-none absolute -top-20 right-[-6rem] h-72 w-72 rounded-full bg-[#38BDF8]/14 blur-3xl md:h-96 md:w-96" />
      <div className="pointer-events-none absolute top-1/3 left-[-5rem] h-56 w-56 rounded-full bg-[#F9A8D4]/12 blur-3xl md:h-72 md:w-72" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 h-48 w-48 rounded-full bg-[#FDE68A]/12 blur-3xl" />

      <div className="site-container relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(19rem,23rem)] lg:gap-12">
          <div className="max-w-3xl text-center lg:text-left">
            <span className="section-kicker px-4 text-[0.62rem] tracking-[0.16em] lg:justify-start lg:text-left">
              {config.hero_badge?.trim() || "Практическая конференция для родителей"}
            </span>

            <h1 className="mx-auto mt-6 max-w-[11ch] text-[clamp(2.35rem,8vw,5.15rem)] font-extrabold leading-[0.94] tracking-[-0.06em] text-slate-950 lg:mx-0 lg:max-w-[9.5ch]">
              {config.title}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[clamp(1rem,2.4vw,1.2rem)] leading-8 text-slate-600 lg:mx-0">
              {config.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-700 lg:justify-start">
              <div className="soft-pill inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#0EA5E9]" />
                <span>{config.date}</span>
              </div>

              <div className="soft-pill inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#0EA5E9]" />
                <span>{config.time}</span>
              </div>

              <div className="soft-pill inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#EC4899]" />
                <span>{config.location}</span>
              </div>
            </div>

            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row lg:justify-start">
              <Button
                size="lg"
                onClick={() => scrollTo("#tickets")}
                className="w-full rounded-2xl bg-[#0EA5E9] px-7 text-white sm:w-auto"
              >
                Купить билет
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("#about")}
                className="w-full rounded-2xl border-white/80 bg-white/90 px-7 text-slate-700 sm:w-auto"
              >
                Узнать больше
              </Button>
            </div>
          </div>

          <aside className="surface-card-strong relative overflow-hidden rounded-[2rem] p-6 text-left shadow-[0_28px_70px_-46px_rgba(14,165,233,0.45)] md:p-7 lg:translate-y-2">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0EA5E9] via-[#7DD3FC] to-[#EC4899]" />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Ближайшее событие
            </p>

            <div className="mt-5 space-y-3">
              <div className="rounded-[1.35rem] border border-white/80 bg-white/88 p-4 shadow-[0_16px_40px_-36px_rgba(15,23,42,0.5)]">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Calendar className="h-4 w-4 text-[#0EA5E9]" />
                  {config.date}
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {config.date_description?.trim() ||
                    "Очная программа с практическими выступлениями и живыми вопросами."}
                </p>
              </div>

              <div className="rounded-[1.35rem] border border-white/80 bg-white/88 p-4 shadow-[0_16px_40px_-36px_rgba(15,23,42,0.5)]">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Clock className="h-4 w-4 text-[#0EA5E9]" />
                  {config.time}
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {config.time_description?.trim() ||
                    "Плотная, но комфортная программа без перегруза и с понятной структурой."}
                </p>
              </div>

              <div className="rounded-[1.35rem] border border-white/80 bg-white/88 p-4 shadow-[0_16px_40px_-36px_rgba(15,23,42,0.5)]">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <MapPin className="h-4 w-4 text-[#EC4899]" />
                  {config.location}
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {config.location_address}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
