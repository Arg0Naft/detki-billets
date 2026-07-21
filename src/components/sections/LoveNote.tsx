export function LoveNote() {
  return (
    <section className="section-shell overflow-hidden pt-0" aria-label="Напоминание о любви">
      <div className="site-container">
        <div className="relative mx-auto max-w-4xl rounded-[2rem] border border-[#FBCFE8]/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(253,242,248,0.88),rgba(240,249,255,0.92))] px-6 py-12 text-center shadow-[0_24px_60px_-46px_rgba(236,72,153,0.55)] md:px-12 md:py-16">
          <div className="pointer-events-none absolute -top-16 left-10 h-32 w-32 rounded-full bg-[#F9A8D4]/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 -bottom-14 h-36 w-36 rounded-full bg-[#7DD3FC]/25 blur-3xl" />
          <p className="love-note relative text-[#BE185D]">
            И не забывайте, что доктор прописал любовь!
          </p>
        </div>
      </div>
    </section>
  );
}
