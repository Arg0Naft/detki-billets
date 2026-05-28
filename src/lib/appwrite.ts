import { Client, Databases, ID, Query } from "appwrite";
import type { EventConfig, Ticket, Speaker, FaqItem } from "@/types";

const ENDPOINT = "https://fra.cloud.appwrite.io/v1";
const PROJECT_ID = "6a16957d0013c52aed6d";
const DATABASE_ID = "main";

const COL = {
  config: "event_config",
  tickets: "tickets",
  speakers: "speakers",
  faq: "faq",
} as const;

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
const databases = new Databases(client);

// ---------- Placeholder fallbacks ----------
const placeholderConfig: EventConfig = {
  $id: "main",
  title: "Конференция для молодых мам",
  subtitle:
    "Знания, поддержка и вдохновение для тех, кто только начал свой путь в материнстве",
  date: "15 сентября 2026",
  time: "10:00 – 18:00",
  location: "Москва, Конгресс-центр «Здоровье»",
  location_address: "ул. Профсоюзная, д. 33, Москва",
  description_1:
    "Однодневная конференция, посвящённая здоровью, развитию и психологическому благополучию мамы и малыша. Мы собрали ведущих врачей, психологов и педагогов, чтобы дать вам проверенные знания и ответы на самые важные вопросы.",
  description_2:
    "Это не просто лекции — это живое общение в тёплой и поддерживающей атмосфере. Вы сможете задать свои вопросы экспертам лично, обменяться опытом с другими мамами и получить практические инструменты, которые легко применять каждый день.",
  sales_enabled: true,
};

const placeholderTickets: Ticket[] = [
  {
    $id: "t1",
    name: "Стандарт",
    price: 2900,
    old_price: 3900,
    description: "Доступ ко всем лекциям и материалам",
    features: JSON.stringify([
      "Доступ ко всем лекциям",
      "Кофе-брейки и обед",
      "Раздаточные материалы",
      "Запись лекций на 30 дней",
    ]),
    is_popular: false,
    sort_order: 1,
  },
  {
    $id: "t2",
    name: "VIP",
    price: 5900,
    old_price: 7900,
    description: "Места в первом ряду и закрытая встреча со спикерами",
    features: JSON.stringify([
      "Всё из тарифа «Стандарт»",
      "Места в первом ряду",
      "Закрытая встреча со спикерами",
      "Подарочный набор для мамы",
      "Запись лекций навсегда",
    ]),
    is_popular: true,
    sort_order: 2,
  },
  {
    $id: "t3",
    name: "Группа",
    price: 7900,
    old_price: 11700,
    description: "Билет на троих — приходите с подругами",
    features: JSON.stringify([
      "3 билета «Стандарт»",
      "Места рядом в зале",
      "Общий подарочный набор",
      "Скидка 30% к обычной цене",
    ]),
    is_popular: false,
    sort_order: 3,
  },
];

const placeholderSpeakers: Speaker[] = [
  {
    $id: "s1",
    name: "Анна Соколова",
    title: "Врач-педиатр, к.м.н.",
    bio: "15 лет в детской медицине. Автор книги «Спокойная мама — здоровый малыш».",
    photo_url: "",
    sort_order: 1,
  },
  {
    $id: "s2",
    name: "Мария Григорьева",
    title: "Перинатальный психолог",
    bio: "Помогает мамам справляться с тревогой и выстраивать связь с ребёнком с первых дней.",
    photo_url: "",
    sort_order: 2,
  },
  {
    $id: "s3",
    name: "Екатерина Лебедева",
    title: "Консультант по грудному вскармливанию (IBCLC)",
    bio: "Поддержала более 2000 мам в налаживании комфортного кормления.",
    photo_url: "",
    sort_order: 3,
  },
];

const placeholderFaq: FaqItem[] = [
  {
    $id: "f1",
    question: "Можно ли прийти с малышом?",
    answer:
      "Да, на территории конференции работает уютная детская комната с профессиональными нянями и зона для кормления.",
    sort_order: 1,
  },
  {
    $id: "f2",
    question: "Будет ли запись лекций?",
    answer:
      "Записи всех выступлений будут доступны участникам в личном кабинете в течение 30 дней (для VIP — бессрочно).",
    sort_order: 2,
  },
  {
    $id: "f3",
    question: "Как получить билет после оплаты?",
    answer:
      "Электронный билет с QR-кодом придёт на вашу почту в течение нескольких минут после успешной оплаты.",
    sort_order: 3,
  },
  {
    $id: "f4",
    question: "Можно ли вернуть билет?",
    answer:
      "Да, билет можно вернуть не позднее чем за 7 дней до мероприятия с полным возвратом средств.",
    sort_order: 4,
  },
  {
    $id: "f5",
    question: "Будет ли питание включено?",
    answer:
      "В стоимость билета входят два кофе-брейка и обед. Меню учитывает потребности кормящих мам.",
    sort_order: 5,
  },
];

function warn(scope: string, err: unknown) {
  // eslint-disable-next-line no-console
  console.warn(`[appwrite:${scope}] using placeholder data:`, err);
}

// ---------- Event config ----------
export async function getEventConfig(): Promise<EventConfig> {
  try {
    const res = await databases.listDocuments(DATABASE_ID, COL.config, [
      Query.limit(1),
    ]);

    if (!res.documents.length) {
      throw new Error("No event_config document found");
    }

    return res.documents[0] as unknown as EventConfig;
  } catch (err) {
    warn("getEventConfig", err);
    return placeholderConfig;
  }
}

export async function updateEventConfig(
  data: Partial<EventConfig>,
): Promise<void> {
  const res = await databases.listDocuments(DATABASE_ID, COL.config, [
    Query.limit(1),
  ]);

  if (res.documents.length) {
    const doc = res.documents[0] as EventConfig & {
      $id: string;
      $createdAt?: string;
      $updatedAt?: string;
      $permissions?: string[];
      $databaseId?: string;
      $collectionId?: string;
    };

    const {
      $id,
      $createdAt,
      $updatedAt,
      $permissions,
      $databaseId,
      $collectionId,
      ...rest
    } = doc;

    await databases.updateDocument(DATABASE_ID, COL.config, $id, {
      ...rest,
      ...data,
    });
  } else {
    await databases.createDocument(DATABASE_ID, COL.config, ID.unique(), data);
  }
}

// ---------- Tickets ----------
export async function getTickets(): Promise<Ticket[]> {
  try {
    const res = await databases.listDocuments(DATABASE_ID, COL.tickets, [
      Query.orderAsc("sort_order"),
    ]);
    return res.documents as unknown as Ticket[];
  } catch (err) {
    warn("getTickets", err);
    return placeholderTickets;
  }
}

export async function updateTicket(
  id: string,
  data: Partial<Ticket>,
): Promise<void> {
  const { $id: _id, ...payload } = data as Ticket & { $id?: string };
  void _id;
  await databases.updateDocument(DATABASE_ID, COL.tickets, id, payload);
}

// ---------- Speakers ----------
export async function getSpeakers(): Promise<Speaker[]> {
  try {
    const res = await databases.listDocuments(DATABASE_ID, COL.speakers, [
      Query.orderAsc("sort_order"),
    ]);
    return res.documents as unknown as Speaker[];
  } catch (err) {
    warn("getSpeakers", err);
    return placeholderSpeakers;
  }
}

export async function createSpeaker(
  data: Omit<Speaker, "$id">,
): Promise<void> {
  await databases.createDocument(DATABASE_ID, COL.speakers, ID.unique(), data);
}

export async function updateSpeaker(
  id: string,
  data: Partial<Speaker>,
): Promise<void> {
  const { $id: _id, ...payload } = data as Speaker & { $id?: string };
  void _id;
  await databases.updateDocument(DATABASE_ID, COL.speakers, id, payload);
}

export async function deleteSpeaker(id: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, COL.speakers, id);
}

// ---------- FAQ ----------
export async function getFaq(): Promise<FaqItem[]> {
  try {
    const res = await databases.listDocuments(DATABASE_ID, COL.faq, [
      Query.orderAsc("sort_order"),
    ]);
    return res.documents as unknown as FaqItem[];
  } catch (err) {
    warn("getFaq", err);
    return placeholderFaq;
  }
}

export async function createFaqItem(
  data: Omit<FaqItem, "$id">,
): Promise<void> {
  await databases.createDocument(DATABASE_ID, COL.faq, ID.unique(), data);
}

export async function updateFaqItem(
  id: string,
  data: Partial<FaqItem>,
): Promise<void> {
  const { $id: _id, ...payload } = data as FaqItem & { $id?: string };
  void _id;
  await databases.updateDocument(DATABASE_ID, COL.faq, id, payload);
}

export async function deleteFaqItem(id: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, COL.faq, id);
}
