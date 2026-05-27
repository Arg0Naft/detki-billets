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
import {
  createSpeaker,
  deleteSpeaker,
  getSpeakers,
  updateSpeaker,
} from "@/lib/appwrite";
import type { Speaker } from "@/types";
import { Trash2 } from "lucide-react";

const empty = { name: "", title: "", bio: "", photo_url: "", sort_order: 0 };

export function AdminSpeakers() {
  const [list, setList] = useState<Speaker[]>([]);
  const [draft, setDraft] = useState(empty);

  const load = () => getSpeakers().then(setList);
  useEffect(() => {
    load();
  }, []);

  function patch(id: string, p: Partial<Speaker>) {
    setList((prev) => prev.map((s) => (s.$id === id ? { ...s, ...p } : s)));
  }

  async function save(s: Speaker) {
    try {
      await updateSpeaker(s.$id, {
        name: s.name,
        title: s.title,
        bio: s.bio,
        photo_url: s.photo_url,
        sort_order: Number(s.sort_order),
      });
      toast.success("Спикер сохранён");
    } catch (e) {
      console.error(e);
      toast.error("Ошибка сохранения");
    }
  }

  async function remove(id: string) {
    try {
      await deleteSpeaker(id);
      setList((prev) => prev.filter((s) => s.$id !== id));
      toast.success("Удалено");
    } catch (e) {
      console.error(e);
      toast.error("Ошибка удаления");
    }
  }

  async function add() {
    if (!draft.name.trim()) {
      toast.error("Введите имя спикера");
      return;
    }
    try {
      await createSpeaker({ ...draft, sort_order: Number(draft.sort_order) });
      setDraft(empty);
      await load();
      toast.success("Спикер добавлен");
    } catch (e) {
      console.error(e);
      toast.error("Ошибка создания");
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-[#1E293B]">Спикеры</h2>

      <div className="rounded-xl border border-dashed border-[#0EA5E9]/40 bg-[#F0F9FF] p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
          Добавить спикера
        </h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Input
            placeholder="Имя"
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          />
          <Input
            placeholder="Должность"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          />
          <Input
            placeholder="URL фото"
            value={draft.photo_url}
            onChange={(e) => setDraft({ ...draft, photo_url: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Порядок"
            value={draft.sort_order}
            onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })}
          />
          <Textarea
            className="md:col-span-2"
            placeholder="Биография"
            value={draft.bio}
            onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
          />
        </div>
        <Button onClick={add} className="mt-4 bg-[#0EA5E9] text-white hover:bg-[#0284C7]">
          Добавить
        </Button>
      </div>

      <div className="space-y-4">
        {list.map((s) => (
          <div key={s.$id} className="space-y-3 rounded-xl border border-slate-200 bg-white p-5">
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <Label className="mb-1.5 block">Имя</Label>
                <Input value={s.name} onChange={(e) => patch(s.$id, { name: e.target.value })} />
              </div>
              <div>
                <Label className="mb-1.5 block">Должность</Label>
                <Input value={s.title} onChange={(e) => patch(s.$id, { title: e.target.value })} />
              </div>
              <div>
                <Label className="mb-1.5 block">URL фото</Label>
                <Input
                  value={s.photo_url}
                  onChange={(e) => patch(s.$id, { photo_url: e.target.value })}
                />
              </div>
              <div>
                <Label className="mb-1.5 block">Порядок</Label>
                <Input
                  type="number"
                  value={s.sort_order}
                  onChange={(e) => patch(s.$id, { sort_order: Number(e.target.value) })}
                />
              </div>
            </div>
            <div>
              <Label className="mb-1.5 block">Биография</Label>
              <Textarea
                rows={3}
                value={s.bio}
                onChange={(e) => patch(s.$id, { bio: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => save(s)}
                className="bg-[#0EA5E9] text-white hover:bg-[#0284C7]"
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
                    <AlertDialogTitle>Удалить спикера?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Это действие нельзя отменить. Спикер «{s.name}» будет удалён навсегда.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={() => remove(s.$id)}>Удалить</AlertDialogAction>
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