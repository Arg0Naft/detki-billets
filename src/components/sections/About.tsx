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
    <section id="about" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">
            О мероприятии
          </h2>

          <Accordion type="single" collapsible className="mt-10 space-y-3">
            {items.map((item, index) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="rounded-xl border border-slate-200 bg-white px-5"
              >
                <AccordionTrigger className="text-left text-base font-medium text-[#1E293B] hover:no-underline">
                  {item.title?.trim() || `Подробнее ${index + 1}`}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-[#64748B]">
                  {item.text}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {highlights.length > 0 && (
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {highlights.map((highlight) => {
              const iconKey =
                highlight.icon in iconMap ? (highlight.icon as keyof typeof iconMap) : "sparkles";
              const Icon = iconMap[iconKey];
              const style = iconStyles[iconKey];

              return (
                <div
                  key={highlight.id}
                  className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${style.bg}`}
                  >
                    <Icon className={`h-6 w-6 ${style.color}`} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#1E293B]">{highlight.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{highlight.text}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
