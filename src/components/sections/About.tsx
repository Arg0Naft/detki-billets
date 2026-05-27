import { BookOpen, Heart, Sparkles } from "lucide-react";
import type { EventConfig } from "@/types";

const highlights = [
  {
    icon: BookOpen,
    title: "Экспертные знания",
    text: "Лекции от врачей, психологов и педагогов с многолетней практикой.",
    color: "text-[#0EA5E9]",
    bg: "bg-[#E0F2FE]",
  },
  {
    icon: Heart,
    title: "Живое общение",
    text: "Тёплая атмосфера, поддержка и знакомства с такими же мамами.",
    color: "text-[#EC4899]",
    bg: "bg-[#FCE7F3]",
  },
  {
    icon: Sparkles,
    title: "Практические инструменты",
    text: "Готовые методики, которые можно применять уже на следующий день.",
    color: "text-[#0EA5E9]",
    bg: "bg-[#E0F2FE]",
  },
];

export function About({ config }: { config: EventConfig }) {
  return (
    <section id="about" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">
            О мероприятии
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#64748B] md:text-lg">
            {config.description_1}
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#64748B] md:text-lg">
            {config.description_2}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {highlights.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${h.bg}`}>
                  <Icon className={`h-6 w-6 ${h.color}`} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#1E293B]">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{h.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}