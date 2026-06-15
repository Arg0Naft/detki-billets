import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import type { EventConfig, SiteSettings } from "@/types";

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero({ config, settings }: { config: EventConfig; settings: SiteSettings }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-[#E0F2FE] via-[#F0F9FF] to-white pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#0EA5E9]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#EC4899]/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
        <span className="inline-flex items-center rounded-full bg-white/80 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[#0EA5E9] shadow-sm ring-1 ring-[#0EA5E9]/20">
          РћРґРЅРѕРґРЅРµРІРЅР°СЏ РєРѕРЅС„РµСЂРµРЅС†РёСЏ
        </span>

        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-[#1E293B] md:text-6xl">
          {config.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-[#64748B] md:text-lg">
          {config.subtitle}
        </p>

        <div className="mx-auto mt-8 flex flex-col items-center justify-center gap-3 text-sm text-[#1E293B] md:flex-row md:gap-6 md:text-base">
          <div className="inline-flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#0EA5E9]" />
            <span>{config.date}</span>
          </div>
          <div className="inline-flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#0EA5E9]" />
            <span>{config.time}</span>
          </div>
          <div className="inline-flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#EC4899]" />
            <span>{config.location}</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            onClick={() => scrollTo("#tickets")}
            className="w-full bg-[#0EA5E9] text-white shadow-lg shadow-[#0EA5E9]/30 hover:bg-[#0284C7] sm:w-auto"
          >
            РљСѓРїРёС‚СЊ Р±РёР»РµС‚
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollTo("#about")}
            className="w-full border-[#0EA5E9]/30 bg-white text-[#0EA5E9] hover:bg-[#0EA5E9]/5 sm:w-auto"
          >
            РЈР·РЅР°С‚СЊ Р±РѕР»СЊС€Рµ
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-[#64748B]">
          <span>
            Р—Р°РїРёСЃРё Рё РґРѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ РјР°С‚РµСЂРёР°Р»С‹ РїРѕР·Р¶Рµ
            РїРѕСЏРІСЏС‚СЃСЏ РЅР° РїР»Р°С‚С„РѕСЂРјР°С…:
          </span>
          <Button variant="ghost" size="sm" asChild>
            <a
              href={settings.youtube_url || "https://youtube.com"}
              target="_blank"
              rel="noreferrer"
              className="text-[#FF0000]"
            >
              YouTube
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
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
