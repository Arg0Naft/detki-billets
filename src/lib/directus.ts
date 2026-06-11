import type {
  EventConfig,
  FaqItem,
  LegalPage,
  ProgramItem,
  SiteSettings,
  Speaker,
  Ticket,
} from "@/types";

const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL?.replace(/\/+$/, "");

const demoSiteSettings: SiteSettings = {
  $id: "site-settings-demo",
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
  $id: "event-config-demo",
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
    $id: "ticket-standard",
    name: "Стандарт",
    price: 2900,
    old_price: 3900,
    description: "Полный доступ ко всем выступлениям и материалам.",
    features: JSON.stringify([
      "Все выступления конференции",
      "Кофе-брейки и обед",
      "Раздаточные материалы",
      "Доступ к записи на 30 дней",
    ]),
    payment_url: "https://example.com/pay/standard",
    is_popular: false,
    sort_order: 1,
  },
  {
    $id: "ticket-vip",
    name: "VIP",
    price: 5900,
    old_price: 7900,
    description: "Места в первых рядах и закрытая встреча со спикерами.",
    features: JSON.stringify([
      "Все, что входит в Стандарт",
      "Места в первых рядах",
      "Закрытая встреча со спикерами",
      "Подарочный набор",
      "Бессрочный доступ к записи",
    ]),
    payment_url: "https://example.com/pay/vip",
    is_popular: true,
    sort_order: 2,
  },
];

const demoSpeakers: Speaker[] = [
  {
    $id: "speaker-1",
    name: "Anna Sokolova",
    title: "Педиатр",
    bio: "Специализируется на раннем детском здоровье и профилактической медицине.",
    photo_url: "",
    sort_order: 1,
  },
  {
    $id: "speaker-2",
    name: "Maria Grigorieva",
    title: "Перинатальный психолог",
    bio: "Помогает родителям справляться с тревогой и выстраивать контакт в первые годы жизни ребёнка.",
    photo_url: "",
    sort_order: 2,
  },
];

const demoProgram: ProgramItem[] = [
  {
    $id: "program-1",
    time_slot: "10:00",
    title: "Открытие конференции",
    speaker: "Команда организаторов",
    description: "Краткое приветствие, обзор тем дня и главных практических выводов.",
    sort_order: 1,
  },
  {
    $id: "program-2",
    time_slot: "11:00",
    title: "Основы детского здоровья",
    speaker: "Anna Sokolova",
    description: "На что родителям стоит обращать внимание в первые годы жизни ребёнка.",
    sort_order: 2,
  },
];

const demoFaq: FaqItem[] = [
  {
    $id: "faq-1",
    question: "Можно ли прийти с ребёнком?",
    answer: "Да. На площадке будет семейная зона и комната для кормления.",
    sort_order: 1,
  },
  {
    $id: "faq-2",
    question: "Будет ли доступна запись?",
    answer: "Да. После конференции участники получат доступ к записям выступлений.",
    sort_order: 2,
  },
];

const demoLegalPages: LegalPage[] = [
  {
    $id: "legal-privacy",
    title: "Политика конфиденциальности",
    url: "#",
    sort_order: 1,
  },
  {
    $id: "legal-offer",
    title: "Публичная оферта",
    url: "#",
    sort_order: 2,
  },
];

type DirectusListResponse<T> = {
  data: T[];
};

type DirectusItemResponse<T> = {
  data: T;
};

function warn(scope: string, err: unknown) {
  console.warn(`[directus:${scope}] using demo data`, err);
}

function ensureDirectusUrl() {
  if (!DIRECTUS_URL) {
    throw new Error("VITE_DIRECTUS_URL is not configured");
  }
}

function buildUrl(path: string, params?: Record<string, string>) {
  ensureDirectusUrl();
  const url = new URL(path, `${DIRECTUS_URL}/`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
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

async function getOrderedItems<T>(collection: string, fallback: T[]): Promise<T[]> {
  try {
    return await listItems<T>(collection, {
      sort: "sort_order",
      limit: "-1",
    });
  } catch (err) {
    warn(collection, err);
    return fallback;
  }
}

async function updateItem<T extends Record<string, unknown>>(
  collection: string,
  id: string,
  data: Partial<T>,
) {
  await request<DirectusItemResponse<T>>(`items/${collection}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

async function createItem<T extends Record<string, unknown>>(collection: string, data: T) {
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

export async function updateEventConfig(data: Partial<EventConfig>): Promise<void> {
  const current = await getEventConfig();
  if (!current.$id) {
    throw new Error("Event config item id is missing");
  }
  await updateItem<EventConfig>("event_config", current.$id, data);
}

export async function getTickets(): Promise<Ticket[]> {
  return getOrderedItems("tickets", demoTickets);
}

export async function updateTicket(id: string, data: Partial<Ticket>): Promise<void> {
  const { $id: _ignored, ...payload } = data;
  void _ignored;
  await updateItem<Ticket>("tickets", id, payload);
}

export async function getSpeakers(): Promise<Speaker[]> {
  return getOrderedItems("speakers", demoSpeakers);
}

export async function createSpeaker(data: Omit<Speaker, "$id">): Promise<void> {
  await createItem("speakers", data);
}

export async function updateSpeaker(id: string, data: Partial<Speaker>): Promise<void> {
  const { $id: _ignored, ...payload } = data;
  void _ignored;
  await updateItem<Speaker>("speakers", id, payload);
}

export async function deleteSpeaker(id: string): Promise<void> {
  await deleteItem("speakers", id);
}

export async function getProgram(): Promise<ProgramItem[]> {
  return getOrderedItems("program", demoProgram);
}

export async function getFaq(): Promise<FaqItem[]> {
  return getOrderedItems("faq", demoFaq);
}

export async function createFaqItem(data: Omit<FaqItem, "$id">): Promise<void> {
  await createItem("faq", data);
}

export async function updateFaqItem(id: string, data: Partial<FaqItem>): Promise<void> {
  const { $id: _ignored, ...payload } = data;
  void _ignored;
  await updateItem<FaqItem>("faq", id, payload);
}

export async function deleteFaqItem(id: string): Promise<void> {
  await deleteItem("faq", id);
}

export async function getLegalPages(): Promise<LegalPage[]> {
  return getOrderedItems("legal_pages", demoLegalPages);
}
