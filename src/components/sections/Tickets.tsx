import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Ticket } from "@/types";

export function Tickets({ tickets, salesEnabled }: { tickets: Ticket[]; salesEnabled: boolean }) {
  const hasSingleTicket = tickets.length === 1;

  return (
    <section id="tickets" className="section-shell relative overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute top-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#BAE6FD]/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-[#FCE7F3]/45 blur-3xl" />

      <div className="site-container max-w-6xl">
        <div className="section-intro mx-auto max-w-2xl text-center">
          <span className="section-kicker">Участие</span>
          <h2 className="section-title">Билеты</h2>
          <p className="section-copy mt-4 md:text-lg">
            Выберите формат участия, который подходит вам больше всего.
          </p>
        </div>

        {!salesEnabled && (
          <div className="mx-auto mt-8 max-w-lg rounded-[1.35rem] border border-[#FBCFE8] bg-[#FDF2F8] px-6 py-4 text-center text-sm font-medium text-[#9D174D] shadow-[0_18px_40px_-36px_rgba(236,72,153,0.8)]">
            Скоро в продаже.
          </div>
        )}

        <div
          className={`mx-auto mt-14 ${
            hasSingleTicket ? "max-w-4xl" : "grid max-w-5xl gap-6 lg:grid-cols-2"
          }`}
        >
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`relative flex w-full flex-col rounded-[2rem] p-8 ${
                ticket.is_popular ? "surface-card-warm" : "surface-card-strong"
              } ${hasSingleTicket ? "items-center px-7 py-10 text-center md:px-12" : ""}`}
            >
              {(ticket.is_popular || hasSingleTicket) && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#EC4899] px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-sm">
                  {hasSingleTicket ? "Единственный билет" : "Рекомендованный тариф"}
                </span>
              )}

              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {hasSingleTicket
                  ? "Единственный формат участия"
                  : ticket.is_popular
                    ? "Лучший баланс цены и пользы"
                    : "Базовый формат участия"}
              </p>
              <h3 className="mt-3 text-[1.9rem] font-semibold tracking-[-0.04em] text-slate-950">
                {ticket.name}
              </h3>
              {ticket.description && (
                <p className="mt-3 text-sm leading-7 text-slate-600">{ticket.description}</p>
              )}

              <div className="mt-7 flex items-end gap-2">
                <span className="text-[2.5rem] font-extrabold leading-none tracking-[-0.05em] text-slate-950">
                  {ticket.price.toLocaleString("ru-RU")} ₽
                </span>
                {ticket.old_price > 0 && ticket.old_price > ticket.price && (
                  <span className="text-base text-slate-400 line-through">
                    {ticket.old_price.toLocaleString("ru-RU")} ₽
                  </span>
                )}
              </div>

              <ul
                className={`mt-7 flex-1 space-y-3.5 ${
                  hasSingleTicket ? "w-full max-w-md text-left" : ""
                }`}
              >
                {ticket.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                  >
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
                className={`mt-8 w-full rounded-2xl bg-[#0EA5E9] text-white ${
                  hasSingleTicket ? "max-w-md" : ""
                }`}
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
