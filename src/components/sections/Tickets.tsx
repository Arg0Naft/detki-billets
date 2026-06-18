import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Ticket } from "@/types";

export function Tickets({ tickets, salesEnabled }: { tickets: Ticket[]; salesEnabled: boolean }) {
  return (
    <section id="tickets" className="section-shell bg-transparent">
      <div className="site-container">
        <div className="section-intro mx-auto max-w-2xl text-center">
          <h2 className="section-title">Билеты</h2>
          <p className="section-copy mt-4 md:text-lg">
            Выберите формат участия, который подходит вам больше всего.
          </p>
        </div>

        {!salesEnabled && (
          <div className="mx-auto mt-8 max-w-lg rounded-[1.25rem] border border-[#FBCFE8] bg-[#FDF2F8] px-6 py-4 text-center text-sm font-medium text-[#9D174D]">
            Скоро в продаже.
          </div>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="surface-card-strong relative flex w-full flex-col rounded-[1.9rem] border border-slate-200/80 p-8"
            >
              {ticket.is_popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#EC4899] px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-sm">
                  Рекомендованный тариф
                </span>
              )}

              <h3 className="mt-2 text-xl font-semibold text-slate-900">{ticket.name}</h3>
              {ticket.description && <p className="mt-2 text-sm leading-7 text-slate-600">{ticket.description}</p>}

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-slate-950">
                  {ticket.price.toLocaleString("ru-RU")} RUB
                </span>
                {ticket.old_price > 0 && ticket.old_price > ticket.price && (
                  <span className="text-base text-slate-400 line-through">
                    {ticket.old_price.toLocaleString("ru-RU")} RUB
                  </span>
                )}
              </div>

              <ul className="mt-7 flex-1 space-y-3.5">
                {ticket.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#E0F2FE]">
                      <Check className="h-3.5 w-3.5 text-[#0284C7]" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                disabled={!salesEnabled || !ticket.payment_url}
                asChild={Boolean(salesEnabled && ticket.payment_url)}
                className="mt-8 w-full rounded-xl bg-[#0EA5E9] text-white"
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
