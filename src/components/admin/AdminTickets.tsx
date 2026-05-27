import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { getTickets, updateTicket } from "@/lib/appwrite";
import type { Ticket } from "@/types";

function featuresToText(s: string) {
  try {
    const arr = JSON.parse(s);
    return Array.isArray(arr) ? arr.join("\n") : "";
  } catch {
    return s;
  }
}

export function AdminTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    getTickets().then(setTickets);
  }, []);

  function patch(id: string, patch: Partial<Ticket>) {
    setTickets((prev) => prev.map((t) => (t.$id === id ? { ...t, ...patch } : t)));
  }

  async function save(t: Ticket) {
    try {
      const features = JSON.stringify(
        featuresToText(t.features).split("\n").map((x) => x.trim()).filter(Boolean),
      );
      await updateTicket(t.$id, {
        name: t.name,
        price: Number(t.price),
        old_price: Number(t.old_price),
        description: t.description,
        features,
        is_popular: t.is_popular,
        sort_order: Number(t.sort_order),
      });
      toast.success(`Билет «${t.name}» сохранён`);
    } catch (e) {
      console.error(e);
      toast.error("Ошибка сохранения");
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#1E293B]">Билеты</h2>
      {tickets.map((t) => (
        <div
          key={t.$id}
          className="space-y-4 rounded-xl border border-slate-200 bg-white p-5"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="mb-1.5 block">Название</Label>
              <Input value={t.name} onChange={(e) => patch(t.$id, { name: e.target.value })} />
            </div>
            <div>
              <Label className="mb-1.5 block">Описание</Label>
              <Input
                value={t.description}
                onChange={(e) => patch(t.$id, { description: e.target.value })}
              />
            </div>
            <div>
              <Label className="mb-1.5 block">Цена, ₽</Label>
              <Input
                type="number"
                value={t.price}
                onChange={(e) => patch(t.$id, { price: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label className="mb-1.5 block">Старая цена, ₽</Label>
              <Input
                type="number"
                value={t.old_price}
                onChange={(e) => patch(t.$id, { old_price: Number(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <Label className="mb-1.5 block">Включено в билет (одна строка — один пункт)</Label>
            <Textarea
              rows={5}
              value={featuresToText(t.features)}
              onChange={(e) => patch(t.$id, { features: e.target.value })}
            />
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch
                checked={t.is_popular}
                onCheckedChange={(v) => patch(t.$id, { is_popular: v })}
              />
              <span className="text-sm text-[#1E293B]">Популярный</span>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm">Порядок</Label>
              <Input
                type="number"
                className="w-24"
                value={t.sort_order}
                onChange={(e) => patch(t.$id, { sort_order: Number(e.target.value) })}
              />
            </div>
            <Button
              onClick={() => save(t)}
              className="ml-auto bg-[#0EA5E9] text-white hover:bg-[#0284C7]"
            >
              Сохранить
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}