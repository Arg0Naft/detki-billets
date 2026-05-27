import { Instagram, Send, Mail, Phone } from "lucide-react";
import type { EventConfig } from "@/types";

export function Footer({ config }: { config: EventConfig }) {
  return (
    <footer className="bg-[#0F172A] text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        <div>
          <div className="text-lg font-semibold text-white">{config.title}</div>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Конференция для молодых мам — место, где забота о себе и ребёнке встречается с поддержкой экспертов.
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-wider text-white">
            Контакты
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#0EA5E9]" />
              <a href="mailto:hello@event.ru" className="hover:text-white">hello@event.ru</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#0EA5E9]" />
              <a href="tel:+74951234567" className="hover:text-white">+7 (495) 123-45-67</a>
            </li>
            <li className="text-slate-400">{config.location_address}</li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-wider text-white">
            Мы в соцсетях
          </div>
          <div className="mt-4 flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition hover:bg-[#EC4899]/20 hover:text-[#EC4899]"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="Telegram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition hover:bg-[#0EA5E9]/20 hover:text-[#0EA5E9]"
            >
              <Send className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="VKontakte"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-sm font-bold transition hover:bg-[#0EA5E9]/20 hover:text-[#0EA5E9]"
            >
              VK
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-5 text-xs text-slate-500 md:px-6">
          © {new Date().getFullYear()} {config.title}. Все права защищены.
        </div>
      </div>
    </footer>
  );
}