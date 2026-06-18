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

        <div
          className={`mt-14 ${
            hasSingleSpeaker ? "mx-auto max-w-5xl" : "grid gap-6 md:grid-cols-2"
          }`}
        >
          {speakers.map((s) => (
            <div
              key={s.id}
              className={`surface-card relative overflow-hidden rounded-[2rem] ${
                hasSingleSpeaker ? "p-7 md:p-10" : "p-7 md:p-8"
              }`}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0EA5E9] via-[#7DD3FC] to-[#EC4899]" />
              <div
                className={`flex h-full flex-col gap-6 ${
                  hasSingleSpeaker
                    ? "lg:flex-row lg:items-center lg:gap-10"
                    : "md:flex-row md:items-start"
                }`}
              >
                {getSpeakerImage(s) ? (
                  <img
                    src={getSpeakerImage(s) ?? undefined}
                    alt={s.name}
                    className={`object-cover ring-4 ring-[#E0F2FE] ${
                      hasSingleSpeaker
                        ? "mx-auto h-72 w-full max-w-[21rem] rounded-[2rem] object-top shadow-[0_30px_70px_-40px_rgba(14,165,233,0.45)] md:h-[28rem] lg:mx-0"
                        : "h-28 w-28 rounded-[1.75rem]"
                    }`}
                  />
                ) : (
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-[#60A5FA] via-[#A78BFA] to-[#EC4899] text-2xl font-semibold text-white shadow-[0_24px_50px_-32px_rgba(236,72,153,0.5)] ring-4 ring-white">
                    {initials(s.name)}
                  </div>
                )}

                <div
                  className={`flex-1 ${hasSingleSpeaker ? "text-center lg:text-left" : "text-center md:text-left"}`}
                >
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {hasSingleSpeaker ? "Главный спикер конференции" : "Эксперт конференции"}
                  </p>
                  <h3
                    className={`mt-3 font-semibold tracking-[-0.03em] text-slate-950 ${
                      hasSingleSpeaker ? "text-3xl md:text-4xl" : "text-2xl"
                    }`}
                  >
                    {s.name}
                  </h3>
                  <p
                    className={`mt-2 font-semibold text-[#0284C7] ${
                      hasSingleSpeaker ? "text-base md:text-lg" : "text-sm"
                    }`}
                  >
                    {s.title}
                  </p>
                  <p
                    className={`mt-4 text-slate-600 ${
                      hasSingleSpeaker
                        ? "mx-auto max-w-2xl text-base leading-8 lg:mx-0"
                        : "text-sm leading-7"
                    }`}
                  >
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
