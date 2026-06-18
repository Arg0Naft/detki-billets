import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/types";

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <section id="faq" className="section-shell section-alt">
      <div className="site-container max-w-3xl">
        <div className="section-intro text-center">
          <h2 className="section-title">Частые вопросы</h2>
          <p className="section-copy mt-4 md:text-lg">
            Отвечаем на самые важные вопросы об участии
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-10 space-y-4">
          {items.map((f) => (
            <AccordionItem
              key={f.id}
              value={f.id}
              className="surface-card rounded-[1.5rem] border border-slate-200/80 bg-white px-6"
            >
              <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline">
                {f.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-7 text-slate-600">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
