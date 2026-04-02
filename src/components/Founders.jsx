const founders = [
  {
    name: "Hakan Kara",
    role: "Geschäftsführer & Creative Strategist",
    image: "/hakan.png",
    bio: "Hakan entwickelt die kreativen Strategien, die aus Produkten echte Bestseller machen. Mit seinem Gespür für Zielgruppen und datengetriebene Creatives hat er bereits dutzende Brands profitabel skaliert."
  },
  {
    name: "Koray Kartal",
    role: "Geschäftsführer & Produktion",
    image: "/koray.png",
    bio: "Koray verantwortet die gesamte Produktionsseite – von der ersten Idee bis zum finalen Cut. Er sorgt dafür, dass jedes Video nicht nur gut aussieht, sondern auch wirklich konvertiert."
  }
];

export default function Founders() {
  return (
    <section className="py-16 md:py-32 px-4 bg-black w-full flex flex-col items-center border-t border-white/5">
      <div className="max-w-6xl w-full">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-20 relative">
          <h2 className="font-druk text-4xl md:text-5xl uppercase tracking-[-0.02em] inline-block relative">
            Die Köpfe hinter ReelyGood
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-accent rounded-full shadow-accent-glow"></div>
          </h2>
          <p className="font-sans text-base md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto mt-10">
            Keine anonyme Agentur. Hinter jeder Creative-Strategie stecken zwei Unternehmer, die selbst wissen, was es bedeutet, mit Ads zu skalieren.
          </p>
        </div>

        {/* Founder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {founders.map((founder, i) => (
            <div
              key={i}
              className="bg-card-surface border border-white/5 hover:border-accent-base rounded-[1.5rem] md:rounded-[2rem] p-8 md:p-12 flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-1 hover:shadow-accent-glow"
            >
              {/* Photo */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden mb-6 ring-2 ring-white/10 group-hover:ring-accent/40 transition-all duration-300 flex-shrink-0">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name & Role */}
              <h3 className="font-druk text-xl md:text-2xl uppercase tracking-[-0.01em] text-white mb-1">
                {founder.name}
              </h3>
              <span className="font-mono text-xs text-accent uppercase tracking-widest mb-5">
                {founder.role}
              </span>

              {/* Bio */}
              <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed font-light">
                {founder.bio}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
