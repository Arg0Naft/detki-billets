import {
  getEventConfig,
  getEventDescriptions,
  getFaq,
  getLegalPages,
  getProgram,
  getSiteSettings,
  getSpeakers,
  getTickets,
} from "@/lib/directus";
import { getEventHighlights } from "@/lib/event-highlights";
import type {
  EventConfig,
  EventDescription,
  EventHighlight,
  FaqItem,
  LegalPage,
  ProgramItem,
  SiteSettings,
  Speaker,
  Ticket,
} from "@/types";

export type EventData = {
  settings: SiteSettings;
  config: EventConfig;
  descriptions: EventDescription[] | null;
  highlights: EventHighlight[];
  tickets: Ticket[];
  speakers: Speaker[];
  program: ProgramItem[];
  faq: FaqItem[];
  legalPages: LegalPage[];
};

export async function getEventData(): Promise<EventData> {
  const [
    settings,
    config,
    descriptions,
    highlights,
    tickets,
    speakers,
    program,
    faq,
    legalPages,
  ] = await Promise.all([
    getSiteSettings(),
    getEventConfig(),
    getEventDescriptions(),
    getEventHighlights(),
    getTickets(),
    getSpeakers(),
    getProgram(),
    getFaq(),
    getLegalPages(),
  ]);

  return {
    settings,
    config,
    descriptions,
    highlights,
    tickets,
    speakers,
    program,
    faq,
    legalPages,
  };
}
