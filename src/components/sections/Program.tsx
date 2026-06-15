import type { ProgramItem } from "@/types";

export function Program({ items }: { items: ProgramItem[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <section id="program" className="bg-[#F8FAFC] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">
            Программа
          </h2>
          <p className="mt-4 text-base text-[#64748B] md:text-lg">
            Расписание конференции на весь день.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {items.map((item) => (
            <article
              key={item.$id}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[120px_1fr]"
            >
              <div className="text-sm font-semibold uppercase tracking-wide text-[#0EA5E9]">
                {item.time_slot}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1E293B]">{item.title}</h3>
                {item.speaker && (
                  <p className="mt-1 text-sm font-medium text-[#EC4899]">{item.speaker}</p>
                )}
                {item.description && (
                  <p className="mt-3 text-sm leading-relaxed text-[#64748B]">{item.description}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
