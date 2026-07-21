import { BookOpen, Heart, Sparkles } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { EventConfig, EventDescription, EventHighlight } from "@/types";

const iconMap = {
  book: BookOpen,
  heart: Heart,
  sparkles: Sparkles,
};

const iconStyles = {
  book: { color: "text-[#0EA5E9]", bg: "bg-[#E0F2FE]" },
  heart: { color: "text-[#EC4899]", bg: "bg-[#FCE7F3]" },
  sparkles: { color: "text-[#0EA5E9]", bg: "bg-[#E2F2FE]" },
};

export function About({
  config,
  descriptions,
  highlights,
}: {
  config: EventConfig;
  descriptions: EventDescription[] | null;
  highlights: EventHighlight[];
}) {
  const fallbackDescriptions: EventDescription[] = [
    {
      id: "event-description-fallback-1",
      title: "О конференции",
      text: config.description_1,
      sort_order: 1,
    },
    {
      id: "event-description-fallback-2",
      title: "Что получат участники",
      text: config.description_2,
      sort_order: 2,
    },
  ].filter((item) => item.text);

  const items = descriptions === null ? fallbackDescriptions : descriptions;

  return (
    <section id="about" className="section-shell bg-transparent">
      <div className="site-container max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div className="mx-auto w-full max-w-3xl lg:mx-0 lg:max-w-none">
           <div className="section-intro text-center lg:max-w-2xl lg:text-left">
  <span className="section-kicker">
    {config.about_badge?.trim() || "Что вас ждёт"}
  </span>

  <h2 className="section-title">
    {config.about_title?.trim() || "О мероприятии"}
  </h2>

  <p className="section-copy">
    {config.about_description?.trim() ||
      "Спокойная, содержательная программа для родителей, которым важны ясные ответы, практические инструменты и поддержка экспертов."}
  </p>
</div>

            <Accordion type="single" collapsible className="mt-10 space-y-4">
              {items.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="surface-card overflow-hidden rounded-[1.7rem] border-white/80 px-6"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-slate-950 hover:no-underline">
                    {item.title?.trim() || `Подробнее ${index + 1}`}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-7 text-slate-600">
                    {item.text}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {highlights.length > 0 && (
            <div className="space-y-4">
              {highlights.map((highlight, index) => {
                const iconKey =
                  highlight.icon in iconMap ? (highlight.icon as keyof typeof iconMap) : "sparkles";
                const Icon = iconMap[iconKey];
                const style = iconStyles[iconKey];
                const cardClass =
                  index === 1
                    ? "surface-card-warm"
                    : index === 2
                      ? "surface-card-strong"
                      : "surface-card";

                return (
                  <div key={highlight.id} className={`${cardClass} rounded-[1.8rem] p-6`}>
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${style.bg}`}
                    >
                      <Icon className={`h-6 w-6 ${style.color}`} />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-slate-950">
                      {highlight.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{highlight.text}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
