import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import type { Ticket } from "@/types";

export function Tickets({ tickets, salesEnabled }: { tickets: Ticket[]; salesEnabled: boolean }) {
  return (
    <section id="tickets" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">Билеты</h2>
          <p className="mt-4 text-base text-[#64748B] md:text-lg">
            Выберите формат участия, который подходит вам больше всего.
          </p>
        </div>

        {!salesEnabled && (
          <div className="mx-auto mt-8 max-w-lg rounded-xl bg-[#FCE7F3] px-6 py-4 text-center text-sm font-medium text-[#9D174D]">
            Скоро в продаже.
          </div>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="relative flex w-full flex-col rounded-2xl border-2 border-[#0EA5E9] bg-white p-8 shadow-lg shadow-[#0EA5E9]/15"
            >
              {ticket.is_popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#EC4899] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow">
                  Рекомендованный тариф
                </span>
              )}

              <h3 className="mt-2 text-xl font-semibold text-[#1E293B]">{ticket.name}</h3>
              {ticket.description && (
                <p className="mt-2 text-sm text-[#64748B]">{ticket.description}</p>
              )}

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#1E293B]">
                  {ticket.price.toLocaleString("ru-RU")} RUB
                </span>
                {ticket.old_price > 0 && ticket.old_price > ticket.price && (
                  <span className="text-base text-[#94A3B8] line-through">
                    {ticket.old_price.toLocaleString("ru-RU")} RUB
                  </span>
                )}
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {ticket.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-[#1E293B]">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0EA5E9]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                disabled={!salesEnabled || !ticket.payment_url}
                asChild={Boolean(salesEnabled && ticket.payment_url)}
                className="mt-7 w-full bg-gradient-to-r from-[#0EA5E9] to-[#EC4899] text-white hover:opacity-90"
              >
                {salesEnabled && ticket.payment_url ? (
                  <a href={ticket.payment_url}>Купить билет</a>
                ) : (
                  <span>{salesEnabled ? "Ссылка оплаты не указана" : "Скоро в продаже"}</span>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
