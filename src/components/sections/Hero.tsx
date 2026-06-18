import { Calendar, Clock, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { EventConfig, SiteSettings } from "@/types";

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero({ config, settings }: { config: EventConfig; settings: SiteSettings }) {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-[#BAE6FD]/55 via-white/40 to-transparent" />
      <div className="pointer-events-none absolute -top-24 right-[-7rem] h-80 w-80 rounded-full bg-[#0EA5E9]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-[-6rem] h-72 w-72 rounded-full bg-[#EC4899]/8 blur-3xl" />

      <div className="site-container relative max-w-5xl text-center">
        {config.hero_badge?.trim() && (
          <span className="soft-pill inline-flex items-center rounded-full border border-[#BAE6FD] bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0284C7]">
            {config.hero_badge}
          </span>
        )}

        <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 md:text-6xl">
          {config.title}
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
          {config.subtitle}
        </p>

        <div className="mx-auto mt-9 flex flex-col items-center justify-center gap-3 text-sm text-slate-700 md:flex-row md:gap-4 md:text-[15px]">
          <div className="soft-pill inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2">
            <Calendar className="h-4 w-4 text-[#0EA5E9]" />
            <span>{config.date}</span>
          </div>
          <div className="soft-pill inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2">
            <Clock className="h-4 w-4 text-[#0EA5E9]" />
            <span>{config.time}</span>
          </div>
          <div className="soft-pill inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2">
            <MapPin className="h-4 w-4 text-[#EC4899]" />
            <span>{config.location}</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            onClick={() => scrollTo("#tickets")}
            className="w-full rounded-xl bg-[#0EA5E9] text-white sm:w-auto"
          >
            Купить билет
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollTo("#about")}
            className="w-full rounded-xl border-slate-200 bg-white/95 text-slate-700 sm:w-auto"
          >
            Узнать больше
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
          <span>Записи и дополнительные материалы позже появятся на платформах:</span>
          <Button variant="ghost" size="sm" asChild className="rounded-full px-3">
            <a
              href={settings.youtube_url || "https://youtube.com"}
              target="_blank"
              rel="noreferrer"
              className="text-[#DC2626]"
            >
              YouTube
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild className="rounded-full px-3">
            <a
              href={settings.max_url || "https://max.com"}
              target="_blank"
              rel="noreferrer"
              className="text-[#7C3AED]"
            >
              Max
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
