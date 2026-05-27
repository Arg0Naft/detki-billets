import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";

export function AdminLogin() {
  const navigate = useNavigate();
  const [l, setL] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (login(l, p)) {
      navigate({ to: "/admin/dashboard" });
    } else {
      setErr("Неверный логин или пароль");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        <h1 className="text-xl font-semibold text-[#1E293B]">Вход в админ-панель</h1>
        <p className="mt-1 text-sm text-[#64748B]">Управление контентом события</p>

        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor="l">Логин</Label>
            <Input id="l" value={l} onChange={(e) => setL(e.target.value)} autoFocus />
          </div>
          <div>
            <Label htmlFor="p">Пароль</Label>
            <Input id="p" type="password" value={p} onChange={(e) => setP(e.target.value)} />
          </div>
          {err && <p className="text-sm text-red-600">{err}</p>}
          <Button type="submit" className="w-full bg-[#0EA5E9] text-white hover:bg-[#0284C7]">
            Войти
          </Button>
        </div>
      </form>
    </div>
  );
}