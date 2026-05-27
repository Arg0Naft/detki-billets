import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/types";

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <section id="faq" className="bg-[#F8FAFC] py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">
            Частые вопросы
          </h2>
          <p className="mt-4 text-base text-[#64748B] md:text-lg">
            Отвечаем на самые важные вопросы об участии
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {items.map((f) => (
            <AccordionItem
              key={f.$id}
              value={f.$id}
              className="rounded-xl border border-slate-200 bg-white px-5"
            >
              <AccordionTrigger className="text-left text-base font-medium text-[#1E293B] hover:no-underline">
                {f.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-[#64748B]">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}