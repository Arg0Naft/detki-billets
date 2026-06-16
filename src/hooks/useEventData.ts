import { useEffect, useState } from "react";
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

export function useEventData() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [config, setConfig] = useState<EventConfig | null>(null);
  const [descriptions, setDescriptions] = useState<EventDescription[] | null>(null);
  const [highlights, setHighlights] = useState<EventHighlight[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [program, setProgram] = useState<ProgramItem[]>([]);
  const [faq, setFaq] = useState<FaqItem[]>([]);
  const [legalPages, setLegalPages] = useState<LegalPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([
      getSiteSettings(),
      getEventConfig(),
      getEventDescriptions(),
      getEventHighlights(),
      getTickets(),
      getSpeakers(),
      getProgram(),
      getFaq(),
      getLegalPages(),
    ])
      .then(
        ([
          siteSettings,
          eventConfig,
          eventDescriptions,
          eventHighlights,
          siteTickets,
          siteSpeakers,
          siteProgram,
          siteFaq,
          siteLegalPages,
        ]) => {
          if (!active) return;
          setSettings(siteSettings);
          setConfig(eventConfig);
          setDescriptions(eventDescriptions);
          setHighlights(eventHighlights);
          setTickets(siteTickets);
          setSpeakers(siteSpeakers);
          setProgram(siteProgram);
          setFaq(siteFaq);
          setLegalPages(siteLegalPages);
        },
      )
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

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
    loading,
  };
}
