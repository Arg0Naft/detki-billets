import { useEffect, useState } from "react";
import { getEventConfig, getTickets, getSpeakers, getFaq } from "@/lib/appwrite";
import type { EventConfig, Ticket, Speaker, FaqItem } from "@/types";

export function useEventData() {
  const [config, setConfig] = useState<EventConfig | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [faq, setFaq] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([getEventConfig(), getTickets(), getSpeakers(), getFaq()])
      .then(([c, t, s, f]) => {
        if (!active) return;
        setConfig(c);
        setTickets(t);
        setSpeakers(s);
        setFaq(f);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { config, tickets, speakers, faq, loading };
}