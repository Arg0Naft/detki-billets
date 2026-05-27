export interface EventConfig {
  $id?: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  location_address: string;
  description_1: string;
  description_2: string;
  sales_enabled: boolean;
}

export interface Ticket {
  $id: string;
  name: string;
  price: number;
  old_price: number;
  description: string;
  features: string; // JSON array string
  is_popular: boolean;
  sort_order: number;
}

export interface Speaker {
  $id: string;
  name: string;
  title: string;
  bio: string;
  photo_url: string;
  sort_order: number;
}

export interface FaqItem {
  $id: string;
  question: string;
  answer: string;
  sort_order: number;
}