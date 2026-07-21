export type DirectusId = string;

export interface SiteSettings {
  id: DirectusId;
  site_name: string;
  footer_description: string;
  contact_email: string;
  contact_phone: string;
  instagram_url: string;
  telegram_url: string;
  vk_url: string;
  youtube_url: string;
  max_url: string;
}

export interface EventConfig {
  id: DirectusId;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  location_address: string;
  description_1: string;
  description_2: string;
  hero_badge?: string;
  date_description?: string;
  time_description?: string;
  sales_enabled: boolean;
}

export interface EventDescription {
  id: DirectusId;
  title?: string;
  text: string;
  is_active?: boolean;
  sort_order: number;
}

export interface EventHighlight {
  id: DirectusId;
  title: string;
  text: string;
  icon: "book" | "heart" | "sparkles" | string;
  is_active?: boolean;
  sort_order: number;
}

export interface Ticket {
  id: DirectusId;
  name: string;
  price: number;
  old_price: number;
  description: string;
  features: string[];
  payment_url?: string;
  is_popular: boolean;
  is_active?: boolean;
  sort_order: number;
}

export interface Speaker {
  id: DirectusId;
  name: string;
  title: string;
  bio: string;
  photo_url: string;
  is_active?: boolean;
  sort_order: number;
}

export interface FaqItem {
  id: DirectusId;
  question: string;
  answer: string;
  is_active?: boolean;
  sort_order: number;
}

export interface ProgramItem {
  id: DirectusId;
  time_slot: string;
  title: string;
  speaker: string;
  description: string;
  is_active?: boolean;
  sort_order: number;
}

export interface LegalPage {
  id: DirectusId;
  title: string;
  url: string;
  is_active?: boolean;
  sort_order: number;
}
