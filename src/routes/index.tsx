import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Speakers } from "@/components/sections/Speakers";
import { Program } from "@/components/sections/Program";
import { Tickets } from "@/components/sections/Tickets";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { getEventData } from "@/lib/event-data";

export const Route = createFileRoute("/")({
  loader: () => getEventData(),
  component: Index,
});

function Index() {
  const {
    settings,
    config,
    descriptions,
    highlights,
    tickets,
    speakers,
    program,
    faq,
    legalPages,
  } = Route.useLoaderData();

  return (
    <div className="site-shell min-h-screen text-[#1E293B]">
      <Header title={settings.site_name || config.title} />
      <main>
        <Hero config={config} />
        <Speakers speakers={speakers} />
        <About config={config} descriptions={descriptions} highlights={highlights} />
        <Program items={program} />
        <Tickets tickets={tickets} salesEnabled={config.sales_enabled} />
        <Faq items={faq} />
      </main>
      <Footer config={config} settings={settings} legalPages={legalPages} />
    </div>
  );
}
