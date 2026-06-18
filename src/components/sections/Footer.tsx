import { Instagram, Mail, Phone, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { EventConfig, LegalPage, SiteSettings } from "@/types";

export function Footer({
  config,
  settings,
  legalPages,
}: {
  config: EventConfig;
  settings: SiteSettings;
  legalPages: LegalPage[];
}) {
  return (
    <footer className="relative overflow-hidden bg-[#0F172A] text-slate-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7DD3FC]/80 to-transparent" />
      <div className="pointer-events-none absolute -top-14 right-10 h-40 w-40 rounded-full bg-[#0EA5E9]/10 blur-3xl" />

      <div className="site-container grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-200/70">
            Детки Билеты
          </div>
          <div className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
            {settings.site_name || config.title}
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
            {settings.footer_description}
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Контакты</div>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/6">
                <Mail className="h-4 w-4 text-[#38BDF8]" />
              </span>
              <a href={`mailto:${settings.contact_email}`} className="transition hover:text-white">
                {settings.contact_email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/6">
                <Phone className="h-4 w-4 text-[#38BDF8]" />
              </span>
              <a href={`tel:${settings.contact_phone}`} className="transition hover:text-white">
                {settings.contact_phone}
              </a>
            </li>
            <li className="text-slate-400">{config.location_address}</li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
            Мы в соцсетях
          </div>
          <div className="mt-5 flex gap-3">
            <a
              href={settings.instagram_url || "#"}
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/6 transition hover:bg-[#EC4899]/20 hover:text-[#F9A8D4]"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={settings.telegram_url || "#"}
              aria-label="Telegram"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/6 transition hover:bg-[#0EA5E9]/20 hover:text-[#7DD3FC]"
            >
              <Send className="h-5 w-5" />
            </a>
            <a
              href={settings.vk_url || "#"}
              aria-label="VKontakte"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/6 text-sm font-bold transition hover:bg-[#0EA5E9]/20 hover:text-[#7DD3FC]"
            >
              VK
            </a>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              variant="secondary"
              size="sm"
              asChild
              className="rounded-full bg-white/8 text-white hover:bg-white/14"
            >
              <a href={settings.youtube_url || "https://youtube.com"} target="_blank" rel="noreferrer">
                YouTube
              </a>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              asChild
              className="rounded-full bg-white/8 text-white hover:bg-white/14"
            >
              <a href={settings.max_url || "https://max.com"} target="_blank" rel="noreferrer">
                Max
              </a>
            </Button>
          </div>

          {legalPages.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-400">
              {legalPages.map((page) => (
                <a
                  key={page.id}
                  href={page.url || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-white"
                >
                  {page.title}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-white/8">
        <div className="site-container py-5 text-xs text-slate-500">
          © {new Date().getFullYear()} {settings.site_name || config.title}. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
