import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "Рћ СЃРѕР±С‹С‚РёРё" },
  { href: "#speakers", label: "РЎРїРёРєРµСЂС‹" },
  { href: "#program", label: "РџСЂРѕРіСЂР°РјРјР°" },
  { href: "#tickets", label: "Р‘РёР»РµС‚С‹" },
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
      } ${scrolled ? "bg-white/90 backdrop-blur shadow-sm" : "bg-white/70 backdrop-blur"}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <button
          onClick={() => scrollTo("#top")}
          className="text-left text-base font-semibold text-[#1E293B] md:text-lg"
        >
          <span className="bg-gradient-to-r from-[#0EA5E9] to-[#EC4899] bg-clip-text text-transparent">
            {title || "РљРѕРЅС„РµСЂРµРЅС†РёСЏ"}
          </span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-sm font-medium text-[#64748B] transition hover:text-[#0EA5E9]"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => scrollTo("#tickets")}
            className="hidden bg-[#0EA5E9] text-white hover:bg-[#0284C7] md:inline-flex"
          >
            РљСѓРїРёС‚СЊ Р±РёР»РµС‚
          </Button>
          <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="РњРµРЅСЋ">
            {open ? (
              <X className="h-6 w-6 text-[#1E293B]" />
            ) : (
              <Menu className="h-6 w-6 text-[#1E293B]" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => {
                  setOpen(false);
                  scrollTo(l.href);
                }}
                className="py-2 text-left text-sm font-medium text-[#1E293B]"
              >
                {l.label}
              </button>
            ))}
            <Button
              onClick={() => {
                setOpen(false);
                scrollTo("#tickets");
              }}
              className="mt-2 bg-[#0EA5E9] text-white hover:bg-[#0284C7]"
            >
              РљСѓРїРёС‚СЊ Р±РёР»РµС‚
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
