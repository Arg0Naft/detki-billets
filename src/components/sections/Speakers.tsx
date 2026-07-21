import mainSpeakerPhoto from "@/assets/main-speaker.png";
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
  const hasSingleSpeaker = speakers.length === 1;

  function getSpeakerImage(speaker: Speaker) {
    if (speaker.photo_url) {
      return speaker.photo_url;
    }

    if (hasSingleSpeaker) {
      return mainSpeakerPhoto;
    }

    return null;
  }

  return (
    <section id="speakers" className="section-shell section-alt">
      <div className="site-container max-w-6xl">
        <div className="section-intro mx-auto max-w-2xl text-center">
          <span className="section-kicker">Команда экспертов</span>
          <h2 className="section-title">Спикеры</h2>
          <p className="section-copy mt-4 md:text-lg">Эксперты конференции</p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl space-y-6">
          {speakers.map((s) => (
            <div
              key={s.id}
              className="surface-card relative overflow-hidden rounded-[2rem] p-7 md:p-10"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0EA5E9] via-[#7DD3FC] to-[#EC4899]" />
              <div className="flex h-full flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
                {getSpeakerImage(s) ? (
                  <img
                    src={getSpeakerImage(s) ?? undefined}
                    alt={s.name}
                    className="mx-auto h-72 w-full max-w-[21rem] rounded-[2rem] object-cover object-top shadow-[0_30px_70px_-40px_rgba(14,165,233,0.45)] ring-4 ring-[#E0F2FE] md:h-[28rem] lg:mx-0"
                  />
                ) : (
                  <div className="mx-auto flex h-72 w-full max-w-[21rem] shrink-0 items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#60A5FA] via-[#A78BFA] to-[#EC4899] text-5xl font-semibold text-white shadow-[0_30px_70px_-40px_rgba(236,72,153,0.5)] ring-4 ring-white md:h-[28rem] lg:mx-0">
                    {initials(s.name)}
                  </div>
                )}

                <div className="flex-1 text-center lg:text-left">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {hasSingleSpeaker ? "Главный спикер конференции" : "Эксперт конференции"}
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 md:text-4xl">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-base font-semibold text-[#0284C7] md:text-lg">
                    {s.title}
                  </p>
                  <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 lg:mx-0">
                    {s.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
