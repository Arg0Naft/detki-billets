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
    <section id="speakers" className="bg-[#F8FAFC] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">
            РЎРїРёРєРµСЂС‹
          </h2>
          <p className="mt-4 text-base text-[#64748B] md:text-lg">
            Р­РєСЃРїРµСЂС‚С‹ РєРѕРЅС„РµСЂРµРЅС†РёРё
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.map((s) => (
            <div
              key={s.$id}
              className="mx-auto flex h-full w-full max-w-md flex-col items-center rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition hover:shadow-md"
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
              <h3 className="mt-5 text-lg font-semibold text-[#1E293B]">{s.name}</h3>
              <p className="mt-1 text-sm font-medium text-[#0EA5E9]">{s.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#64748B]">{s.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
