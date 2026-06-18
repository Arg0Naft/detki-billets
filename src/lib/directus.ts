import type {
  EventConfig,
  EventDescription,
  FaqItem,
  LegalPage,
  ProgramItem,
  SiteSettings,
  Speaker,
  Ticket,
} from "@/types";

const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL?.replace(/\/+$/, "");

const demoSiteSettings: SiteSettings = {
  id: "site-settings-demo",
  site_name: "Детки Билеты",
  footer_description:
    "Демо-версия сайта конференции с резервными данными на случай, если Directus временно недоступен.",
  contact_email: "hello@detki-billets.test",
  contact_phone: "+7 (495) 123-45-67",
  instagram_url: "https://instagram.com",
  telegram_url: "https://t.me",
  vk_url: "https://vk.com",
  youtube_url: "https://youtube.com",
  max_url: "https://max.com",
};

const demoEventConfig: EventConfig = {
  id: "event-config-demo",
  title: "Конференция для молодых родителей",
  subtitle: "Выступления, поддержка и практические советы для семей с детьми.",
  date: "15 сентября 2026",
  time: "10:00 - 18:00",
  location: "Москва",
  location_address: "ул. Профсоюзная, 33, Москва",
  description_1:
    "Однодневная конференция с педиатрами, психологами и экспертами по развитию детей о здоровье и благополучии семьи.",
  description_2:
    "Участники смогут задать вопросы, пообщаться со спикерами лично и забрать с собой практические рекомендации.",
  sales_enabled: true,
};

const demoTickets: Ticket[] = [
  {
    id: "ticket-standard",
    name: "Билет участника",
    price: 5900,
    old_price: 7900,
    description: "Очное участие в конференции с полным доступом ко всем выступлениям и материалам.",
    features: [
      "Все выступления конференции",
      "Кофе-брейки и обед",
      "Раздаточные материалы",
      "Подарочный набор",
      "Живое общение со спикером",
    ],
    payment_url: "https://example.com/pay/participant",
    is_popular: true,
    is_active: true,
    sort_order: 1,
  },
];

const demoSpeakers: Speaker[] = [
  {
    id: "speaker-1",
    name: "Андрей Продеус",
    title: "Педиатр, профессор",
    bio: "Врач и эксперт по детскому здоровью. Простым языком объясняет, что действительно важно для родителей в первые годы жизни ребёнка.",
    photo_url: "",
    is_active: true,
    sort_order: 1,
  },
];

const demoProgram: ProgramItem[] = [
  {
    id: "program-1",
    time_slot: "10:00",
    title: "Открытие конференции",
    speaker: "Команда организаторов",
    description: "Краткое приветствие, обзор тем дня и главных практических выводов.",
    is_active: true,
    sort_order: 1,
  },
  {
    id: "program-2",
    time_slot: "11:00",
    title: "Основы детского здоровья",
    speaker: "Андрей Продеус",
    description: "На что родителям стоит обращать внимание в первые годы жизни ребёнка.",
    is_active: true,
    sort_order: 2,
  },
];

const demoFaq: FaqItem[] = [
  {
    id: "faq-1",
    question: "Можно ли прийти с ребёнком?",
    answer: "Да. На площадке будет семейная зона и комната для кормления.",
    is_active: true,
    sort_order: 1,
  },
  {
    id: "faq-2",
    question: "Будет ли доступна запись?",
    answer: "Да. После конференции участники получат доступ к записям выступлений.",
    is_active: true,
    sort_order: 2,
  },
];

const demoLegalPages: LegalPage[] = [
  {
    id: "legal-privacy",
    title: "Политика конфиденциальности",
    url: "#",
    is_active: true,
    sort_order: 1,
  },
  {
    id: "legal-offer",
    title: "Публичная оферта",
    url: "#",
    is_active: true,
    sort_order: 2,
  },
];

type DirectusListResponse<T> = {
  data: T[];
};

type DirectusItemResponse<T> = {
  data: T;
};

type CollectionQueryOptions = {
  includeInactive?: boolean;
};

type TicketApiItem = Omit<Ticket, "features"> & {
  features: string[] | string | null;
};

function warn(scope: string, err: unknown) {
  console.warn(`[directus:${scope}] using demo data`, err);
}

function ensureDirectusUrl() {
  if (!DIRECTUS_URL) {
    throw new Error("VITE_DIRECTUS_URL is not configured");
  }
}

function buildUrl(path: string) {
  ensureDirectusUrl();
  return new URL(path, `${DIRECTUS_URL}/`).toString();
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(buildUrl(path), {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Directus request failed: ${response.status} ${response.statusText}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

async function listItems<T>(collection: string, params?: Record<string, string>): Promise<T[]> {
  const query = params ? `?${new URLSearchParams(params).toString()}` : "";
  const response = await request<DirectusListResponse<T>>(`items/${collection}${query}`, {
    method: "GET",
  });
  return response.data;
}

async function getFirstItem<T>(collection: string, fallback: T): Promise<T> {
  try {
    const items = await listItems<T>(collection, { limit: "1" });
    if (!items.length) {
      throw new Error(`No items in ${collection}`);
    }
    return items[0];
  } catch (err) {
    warn(collection, err);
    return fallback;
  }
}

async function getOrderedItems<T>(
  collection: string,
  fallback: T[],
  options: CollectionQueryOptions = {},
): Promise<T[]> {
  try {
    const params: Record<string, string> = {
      sort: "sort_order",
      limit: "-1",
    };

    if (!options.includeInactive) {
      params["filter[is_active][_eq]"] = "true";
    }

    return await listItems<T>(collection, params);
  } catch (err) {
    warn(collection, err);
    return fallback;
  }
}

async function getOptionalOrderedItems<T>(
  collection: string,
  options: CollectionQueryOptions = {},
): Promise<T[] | null> {
  try {
    const params: Record<string, string> = {
      sort: "sort_order",
      limit: "-1",
    };

    if (!options.includeInactive) {
      params["filter[is_active][_eq]"] = "true";
    }

    return await listItems<T>(collection, params);
  } catch (err) {
    warn(collection, err);
    return null;
  }
}

function normalizeFeatures(value: TicketApiItem["features"]): string[] {
  if (Array.isArray(value)) {
    return value.map(String);
  }

  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.map(String);
    }
  } catch {
    // Legacy multiline values are handled below.
  }

  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeTicket(item: TicketApiItem): Ticket {
  return {
    ...item,
    features: normalizeFeatures(item.features),
  };
}

async function updateItem<T>(collection: string, id: string, data: Partial<T>) {
  await request<DirectusItemResponse<T>>(`items/${collection}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

async function createItem<T>(collection: string, data: T) {
  await request<DirectusItemResponse<T>>(`items/${collection}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

async function deleteItem(collection: string, id: string) {
  await request(`items/${collection}/${id}`, {
    method: "DELETE",
  });
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return getFirstItem("site_settings", demoSiteSettings);
}

export async function getEventConfig(): Promise<EventConfig> {
  return getFirstItem("event_config", demoEventConfig);
}

export async function getEventDescriptions(
  options: CollectionQueryOptions = {},
): Promise<EventDescription[] | null> {
  return getOptionalOrderedItems("event_descriptions", options);
}

export async function updateEventConfig(data: Partial<EventConfig>): Promise<void> {
  const current = await getEventConfig();
  const { id, ...payload } = data;
  void id;
  await updateItem<EventConfig>("event_config", current.id, payload);
}

export async function getTickets(options: CollectionQueryOptions = {}): Promise<Ticket[]> {
  const items = await getOrderedItems<TicketApiItem>("tickets", demoTickets, options);
  return items.map(normalizeTicket);
}

export async function updateTicket(id: string, data: Partial<Ticket>): Promise<void> {
  const { id: _ignored, ...payload } = data;
  void _ignored;
  await updateItem<Ticket>("tickets", id, payload);
}

export async function getSpeakers(options: CollectionQueryOptions = {}): Promise<Speaker[]> {
  return getOrderedItems("speakers", demoSpeakers, options);
}

export async function createSpeaker(data: Omit<Speaker, "id">): Promise<void> {
  await createItem("speakers", data);
}

export async function updateSpeaker(id: string, data: Partial<Speaker>): Promise<void> {
  const { id: _ignored, ...payload } = data;
  void _ignored;
  await updateItem<Speaker>("speakers", id, payload);
}

export async function deleteSpeaker(id: string): Promise<void> {
  await deleteItem("speakers", id);
}

export async function getProgram(options: CollectionQueryOptions = {}): Promise<ProgramItem[]> {
  return getOrderedItems("program", demoProgram, options);
}

export async function getFaq(options: CollectionQueryOptions = {}): Promise<FaqItem[]> {
  return getOrderedItems("faq", demoFaq, options);
}

export async function createFaqItem(data: Omit<FaqItem, "id">): Promise<void> {
  await createItem("faq", data);
}

export async function updateFaqItem(id: string, data: Partial<FaqItem>): Promise<void> {
  const { id: _ignored, ...payload } = data;
  void _ignored;
  await updateItem<FaqItem>("faq", id, payload);
}

export async function deleteFaqItem(id: string): Promise<void> {
  await deleteItem("faq", id);
}

export async function getLegalPages(options: CollectionQueryOptions = {}): Promise<LegalPage[]> {
  return getOrderedItems("legal_pages", demoLegalPages, options);
}
