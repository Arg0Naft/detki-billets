import type { Speaker } from "@/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Speakers({ speakers }: { speakers: Speaker[] }) {
  return (
    <section id="speakers" className="section-shell section-alt">
      <div className="site-container">
        <div className="section-intro mx-auto max-w-2xl text-center">
          <h2 className="section-title">Спикеры</h2>
          <p className="section-copy mt-4 md:text-lg">Эксперты конференции</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.map((s) => (
            <div
              key={s.id}
              className="surface-card mx-auto flex h-full w-full max-w-md flex-col items-center rounded-[1.75rem] border border-white/80 p-7 text-center"
            >
              {s.photo_url ? (
                <img
                  src={s.photo_url}
                  alt={s.name}
                  className="h-28 w-28 rounded-full object-cover ring-4 ring-[#E0F2FE]"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#EC4899] text-2xl font-semibold text-white ring-4 ring-white">
                  {initials(s.name)}
                </div>
              )}
              <h3 className="mt-5 text-xl font-semibold text-slate-900">{s.name}</h3>
              <p className="mt-1 text-sm font-semibold text-[#0284C7]">{s.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{s.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
