import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const links = [
  { href: "#about", label: "О событии" },
  { href: "#speakers", label: "Спикеры" },
  { href: "#program", label: "Программа" },
  { href: "#tickets", label: "Билеты" },
  { href: "#faq", label: "FAQ" },
];

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header({ title }: { title: string }) {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y < 80) {
        setVisible(true);
      } else if (y > lastY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled
          ? "border-b border-white/80 bg-white/90 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.45)] backdrop-blur-xl"
          : "bg-white/72 backdrop-blur-lg"
      }`}
    >
      <div className="site-container flex items-center justify-between py-4">
        <button
          onClick={() => scrollTo("#top")}
          className="text-left text-base font-semibold text-slate-950 md:text-lg"
        >
          <span className="bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#EC4899] bg-clip-text text-transparent">
            {title || "Конференция"}
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => scrollTo("#tickets")}
            className="hidden rounded-xl bg-[#0EA5E9] text-white md:inline-flex"
          >
            Купить билет
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Меню"
          >
            {open ? <X className="h-5 w-5 text-slate-900" /> : <Menu className="h-5 w-5 text-slate-900" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100/80 bg-white/95 md:hidden">
          <div className="site-container flex flex-col gap-2 py-4">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => {
                  setOpen(false);
                  scrollTo(l.href);
                }}
                className="rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
              >
                {l.label}
              </button>
            ))}
            <Button
              onClick={() => {
                setOpen(false);
                scrollTo("#tickets");
              }}
              className="mt-2 rounded-xl bg-[#0EA5E9] text-white"
            >
              Купить билет
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
