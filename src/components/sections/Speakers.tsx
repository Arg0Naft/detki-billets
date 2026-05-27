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
  const visibleSpeakers = speakers.slice(0, 1); // показываем только первого

  return (
    <section id="speakers" className="bg-[#F8FAFC] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">
            Спикеры
          </h2>
          <p className="mt-4 text-base text-[#64748B] md:text-lg">
            Эксперты, которым доверяют тысячи семей
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-1 lg:grid-cols-1">
          {visibleSpeakers.map((s) => (
            ...
          ))}
        </div>
      </div>
    </section>
  );
}
