import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { createFaqItem, deleteFaqItem, getFaq, updateFaqItem } from "@/lib/directus";
import type { FaqItem } from "@/types";
import { Trash2 } from "lucide-react";

const empty = { question: "", answer: "", sort_order: 0 };

export function AdminFaq() {
  const [list, setList] = useState<FaqItem[]>([]);
  const [draft, setDraft] = useState(empty);

  const load = () => getFaq().then(setList);
  useEffect(() => {
    load();
  }, []);

  function patch(id: string, p: Partial<FaqItem>) {
    setList((prev) => prev.map((f) => (f.$id === id ? { ...f, ...p } : f)));
  }

  async function save(f: FaqItem) {
    try {
      await updateFaqItem(f.$id, {
        question: f.question,
        answer: f.answer,
        sort_order: Number(f.sort_order),
      });
      toast.success("Вопрос сохранён");
    } catch (e) {
      console.error(e);
      toast.error("Ошибка сохранения");
    }
  }

  async function remove(id: string) {
    try {
      await deleteFaqItem(id);
      setList((prev) => prev.filter((f) => f.$id !== id));
      toast.success("Удалено");
    } catch (e) {
      console.error(e);
      toast.error("Ошибка удаления");
    }
  }

  async function add() {
    if (!draft.question.trim()) {
      toast.error("Введите вопрос");
      return;
    }
    try {
      await createFaqItem({ ...draft, sort_order: Number(draft.sort_order) });
      setDraft(empty);
      await load();
      toast.success("Вопрос добавлен");
    } catch (e) {
      console.error(e);
      toast.error("Ошибка создания");
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-[#1E293B]">FAQ</h2>

      <div className="rounded-xl border border-dashed border-[#EC4899]/40 bg-[#FDF2F8] p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#EC4899]">
          Добавить вопрос
        </h3>
        <div className="mt-4 space-y-3">
          <Input
            placeholder="Вопрос"
            value={draft.question}
            onChange={(e) => setDraft({ ...draft, question: e.target.value })}
          />
          <Textarea
            placeholder="Ответ"
            value={draft.answer}
            onChange={(e) => setDraft({ ...draft, answer: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Порядок"
            value={draft.sort_order}
            onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })}
          />
        </div>
        <Button onClick={add} className="mt-4 bg-[#EC4899] text-white hover:bg-[#DB2777]">
          Добавить
        </Button>
      </div>

      <div className="space-y-4">
        {list.map((f) => (
          <div key={f.$id} className="space-y-3 rounded-xl border border-slate-200 bg-white p-5">
            <div>
              <Label className="mb-1.5 block">Вопрос</Label>
              <Input
                value={f.question}
                onChange={(e) => patch(f.$id, { question: e.target.value })}
              />
            </div>
            <div>
              <Label className="mb-1.5 block">Ответ</Label>
              <Textarea
                rows={3}
                value={f.answer}
                onChange={(e) => patch(f.$id, { answer: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-3">
              <Label>Порядок</Label>
              <Input
                type="number"
                className="w-24"
                value={f.sort_order}
                onChange={(e) => patch(f.$id, { sort_order: Number(e.target.value) })}
              />
              <Button
                onClick={() => save(f)}
                className="ml-auto bg-[#0EA5E9] text-white hover:bg-[#0284C7]"
              >
                Сохранить
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" /> Удалить
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Удалить вопрос?</AlertDialogTitle>
                    <AlertDialogDescription>Это действие нельзя отменить.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={() => remove(f.$id)}>Удалить</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
