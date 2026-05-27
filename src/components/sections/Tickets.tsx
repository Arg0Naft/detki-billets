import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import type { Ticket } from "@/types";

function parseFeatures(s: string): string[] {
  try {
    const arr = JSON.parse(s);
    return Array.isArray(arr) ? arr.map(String) : [];
  } catch {
    return s
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);
  }
}

export function Tickets({
  tickets,
  salesEnabled,
}: {
  tickets: Ticket[];
  salesEnabled: boolean;
}) {
  const visibleTickets = tickets.slice(0, 1);

  return (
    <section id="tickets" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">
            Билет на конференцию
          </h2>
          <p className="mt-4 text-base text-[#64748B] md:text-lg">
            Один понятный тариф — всё, что нужно для комфортного участия
          </p>
        </div>

        {!salesEnabled && (
          <div className="mx-auto mt-8 max-w-lg rounded-xl bg-[#FCE7F3] px-6 py-4 text-center text-sm font-medium text-[#9D174D]">
            Продажи скоро откроются — следите за обновлениями
          </div>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-1">
          {visibleTickets.map((t) => {
            const features = parseFeatures(t.features);
            const popular = true; // единственный тариф делаем «главным»

            return (
              <div
                key={t.$id}
                className={`relative flex flex-col rounded-2xl bg-white p-7 shadow-sm transition ${
                  popular
                    ? "border-2 border-[#0EA5E9] shadow-lg shadow-[#0EA5E9]/15 md:-translate-y-2"
                    : "border border-slate-200"
                }`}
              >
                {popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#EC4899] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow">
                    Рекомендованный тариф
                  </span>
                )}
                <h3 className="mt-2 text-xl font-semibold text-[#1E293B]">{t.name}</h3>
                {t.description && (
                  <p className="mt-2 text-sm text-[#64748B]">{t.description}</p>
                )}

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-[#1E293B]">
                    {t.price.toLocaleString("ru-RU")}₽
                  </span>
                  {t.old_price > 0 && t.old_price > t.price && (
                    <span className="text-base text-[#94A3B8] line-through">
                      {t.old_price.toLocaleString("ru-RU")}₽
                    </span>
                  )}
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#1E293B]">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0EA5E9]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  disabled={!salesEnabled}
                  onClick={() =>
                    alert("Оплата будет доступна в ближайшее время")
                  }
                  className="mt-7 w-full bg-gradient-to-r from-[#0EA5E9] to-[#EC4899] text-white hover:opacity-90"
                >
                  {salesEnabled ? "Купить билет" : "Скоро в продаже"}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
