import type { EventHighlight } from "@/types";

const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL?.replace(/\/+$/, "");

const fallbackHighlights: EventHighlight[] = [
  {
    id: "highlight-book",
    title: "Экспертные знания",
    text: "Лекции от врачей, психологов и педагогов с многолетней практикой.",
    icon: "book",
    is_active: true,
    sort_order: 1,
  },
  {
    id: "highlight-heart",
    title: "Живое общение",
    text: "Тёплая атмосфера, поддержка и знакомства с такими же мамами.",
    icon: "heart",
    is_active: true,
    sort_order: 2,
  },
  {
    id: "highlight-sparkles",
    title: "Практические инструменты",
    text: "Готовые методики, которые можно применять уже на следующий день.",
    icon: "sparkles",
    is_active: true,
    sort_order: 3,
  },
];

type DirectusListResponse<T> = { data: T[] };

export async function getEventHighlights(): Promise<EventHighlight[]> {
  if (!DIRECTUS_URL) return fallbackHighlights;

  try {
    const response = await fetch(
      `${DIRECTUS_URL}/items/event_highlights?sort=sort_order&limit=-1&filter[is_active][_eq]=true`,
    );
    if (!response.ok) throw new Error(`Directus request failed: ${response.status}`);
    const payload = (await response.json()) as DirectusListResponse<EventHighlight>;
    return payload.data;
  } catch (error) {
    console.warn("[directus:event_highlights] using demo data", error);
    return fallbackHighlights;
  }
}
