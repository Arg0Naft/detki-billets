import { useEffect, useState } from "react";
import {
  getEventConfig,
  getFaq,
  getLegalPages,
  getProgram,
  getSiteSettings,
  getSpeakers,
  getTickets,
} from "@/lib/directus";
import type {
  EventConfig,
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
          siteTickets,
          siteSpeakers,
          siteProgram,
          siteFaq,
          siteLegalPages,
        ]) => {
          if (!active) return;
          setSettings(siteSettings);
          setConfig(eventConfig);
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

  return { settings, config, tickets, speakers, program, faq, legalPages, loading };
}
