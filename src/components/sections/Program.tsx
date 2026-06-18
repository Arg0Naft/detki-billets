import type { ProgramItem } from "@/types";

export function Program({ items }: { items: ProgramItem[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <section id="program" className="section-shell section-alt">
      <div className="site-container max-w-5xl">
        <div className="section-intro mx-auto max-w-2xl text-center">
          <span className="section-kicker">План дня</span>
          <h2 className="section-title">Программа</h2>
          <p className="section-copy mt-4 md:text-lg">Расписание конференции на весь день.</p>
        </div>

        <div className="mt-14 space-y-4">
          {items.map((item, index) => (
            <article
              key={item.id}
              className="surface-card relative overflow-hidden rounded-[2rem] p-6 md:grid-cols-[132px_1fr] md:p-8"
            >
              <div className="absolute inset-y-0 left-0 hidden w-1 bg-gradient-to-b from-[#0EA5E9] via-[#7DD3FC] to-[#F472B6] md:block" />
              <div className="grid gap-5 md:grid-cols-[124px_1fr] md:items-start">
                <div className="flex items-center gap-3 md:block">
                  <div className="inline-flex rounded-full bg-sky-50 px-3 py-2 text-sm font-semibold tracking-[0.12em] text-[#0284C7] shadow-[0_14px_30px_-28px_rgba(14,165,233,0.9)]">
                    {item.time_slot}
                  </div>
                  {index === 0 && (
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400 md:mt-3 md:block">
                      Старт программы
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                    {item.title}
                  </h3>
                  {item.speaker && (
                    <p className="mt-2 inline-flex rounded-full bg-[#FDF2F8] px-3 py-1 text-sm font-semibold text-[#DB2777]">
                      {item.speaker}
                    </p>
                  )}
                  {item.description && (
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
