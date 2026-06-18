import type { ProgramItem } from "@/types";

export function Program({ items }: { items: ProgramItem[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <section id="program" className="section-shell section-alt">
      <div className="site-container max-w-5xl">
        <div className="section-intro mx-auto max-w-2xl text-center">
          <h2 className="section-title">Программа</h2>
          <p className="section-copy mt-4 md:text-lg">Расписание конференции на весь день.</p>
        </div>

        <div className="mt-12 space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="surface-card grid gap-5 rounded-[1.75rem] border border-white/80 p-6 md:grid-cols-[132px_1fr] md:items-start md:p-7"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0284C7]">
                {item.time_slot}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                {item.speaker && (
                  <p className="mt-1 text-sm font-semibold text-[#DB2777]">{item.speaker}</p>
                )}
                {item.description && (
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
