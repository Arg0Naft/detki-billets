import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { getEventConfig, updateEventConfig } from "@/lib/appwrite";
import type { EventConfig } from "@/types";

export function AdminConfig() {
  const [c, setC] = useState<EventConfig | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getEventConfig().then(setC);
  }, []);

  if (!c) return <div className="text-sm text-[#64748B]">Загрузка…</div>;

  const update = <K extends keyof EventConfig>(k: K, v: EventConfig[K]) =>
    setC({ ...c, [k]: v });

  async function save() {
    if (!c) return;
    setSaving(true);
    try {
      await updateEventConfig(c);
      toast.success("Сохранено");
    } catch (e) {
      toast.error("Ошибка сохранения");
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#1E293B]">Основное</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Название">
          <Input value={c.title} onChange={(e) => update("title", e.target.value)} />
        </Field>
        <Field label="Подзаголовок">
          <Input value={c.subtitle} onChange={(e) => update("subtitle", e.target.value)} />
        </Field>
        <Field label="Дата">
          <Input value={c.date} onChange={(e) => update("date", e.target.value)} />
        </Field>
        <Field label="Время">
          <Input value={c.time} onChange={(e) => update("time", e.target.value)} />
        </Field>
        <Field label="Место">
          <Input value={c.location} onChange={(e) => update("location", e.target.value)} />
        </Field>
        <Field label="Адрес">
          <Input
            value={c.location_address}
            onChange={(e) => update("location_address", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Описание (абзац 1)">
        <Textarea
          rows={4}
          value={c.description_1}
          onChange={(e) => update("description_1", e.target.value)}
        />
      </Field>
      <Field label="Описание (абзац 2)">
        <Textarea
          rows={4}
          value={c.description_2}
          onChange={(e) => update("description_2", e.target.value)}
        />
      </Field>

      <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
        <div>
          <div className="font-medium text-[#1E293B]">Продажи билетов</div>
          <div className="text-sm text-[#64748B]">Включить кнопки покупки на сайте</div>
        </div>
        <Switch
          checked={c.sales_enabled}
          onCheckedChange={(v) => update("sales_enabled", v)}
        />
      </div>

      <Button
        onClick={save}
        disabled={saving}
        className="bg-[#0EA5E9] text-white hover:bg-[#0284C7]"
      >
        {saving ? "Сохранение…" : "Сохранить"}
      </Button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1.5 block">{label}</Label>
      {children}
    </div>
  );
}