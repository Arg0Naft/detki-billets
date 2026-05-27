import { createFileRoute } from "@tanstack/react-router";
import { useEventData } from "@/hooks/useEventData";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Speakers } from "@/components/sections/Speakers";
import { Tickets } from "@/components/sections/Tickets";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { config, tickets, speakers, faq, loading } = useEventData();

  if (loading || !config) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0EA5E9]/20 border-t-[#0EA5E9]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#1E293B]">
      <Header title={config.title} />
      <main>
        <Hero config={config} />
        <About config={config} />
        <Speakers speakers={speakers} />
        <Tickets tickets={tickets} salesEnabled={config.sales_enabled} />
        <Faq items={faq} />
      </main>
      <Footer config={config} />
    </div>
  );
}
