import { useState } from "react";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { AdminConfig } from "./AdminConfig";
import { AdminTickets } from "./AdminTickets";
import { AdminSpeakers } from "./AdminSpeakers";
import { AdminFaq } from "./AdminFaq";
import { Settings, Ticket, Users, HelpCircle, LogOut } from "lucide-react";

const sections = [
  { id: "config", label: "Основное", icon: Settings },
  { id: "tickets", label: "Билеты", icon: Ticket },
  { id: "speakers", label: "Спикеры", icon: Users },
  { id: "faq", label: "FAQ", icon: HelpCircle },
] as const;

type SectionId = (typeof sections)[number]["id"];

export function AdminDashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState<SectionId>("config");

  function onLogout() {
    logout();
    navigate({ to: "/admin" });
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white p-5 md:flex">
        <div className="text-lg font-semibold text-[#1E293B]">Админ-панель</div>
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {sections.map((s) => {
            const Icon = s.icon;
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive ? "bg-[#0EA5E9] text-white" : "text-[#64748B] hover:bg-slate-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {s.label}
              </button>
            );
          })}
        </nav>
        <Button variant="outline" onClick={onLogout} className="mt-4">
          <LogOut className="mr-2 h-4 w-4" /> Выйти
        </Button>
      </aside>

      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
          <select
            value={active}
            onChange={(e) => setActive(e.target.value as SectionId)}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm"
          >
            {sections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          <Button variant="outline" size="sm" onClick={onLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        <main className="mx-auto w-full max-w-4xl flex-1 p-6 md:p-10">
          {active === "config" && <AdminConfig />}
          {active === "tickets" && <AdminTickets />}
          {active === "speakers" && <AdminSpeakers />}
          {active === "faq" && <AdminFaq />}
        </main>
      </div>
    </div>
  );
}
