import { Quote } from 'lucide-react';

const testimonials = [
  {
    author: "Christopher Nitsch",
    company: "Klosterfrau",
    text: "Sehr professionelle Arbeitsweise und grandiose Ergebnisse. Wenn Sie einen starken Partner in Fragen Content für Social Media suchen, sind Sie hier an der richtigen Adresse!"
  },
  {
    author: "Jonas Noyon",
    company: "Geschäftsführer Prepmymeal GmbH",
    text: "Es entstehen monatlich neue Winner Creatives fuer uns und die Ideen sowie Kreativitaet von ReelyGood ist beeindruckend."
  },
  {
    author: "Hyatt Regency",
    company: "Köln",
    text: "Ein ausgesprochen nettes Team! Die Qualität der Zusammenarbeit und Kommunikation war ausgezeichnet und wir sind mit dem erstellten Content sehr zufrieden."
  },
  {
    author: "Frittenwerk",
    company: "Deutschland",
    text: "Ein tolles Team, was schnell und zuverlässig ist. Sie bieten eine hohe Qualität von Videos an und setzen Feedback sehr gut um!"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-32 px-4 bg-dark-surface w-full flex flex-col items-center border-t border-white/5">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12 md:mb-24 relative">
          <h2 className="font-druk text-4xl md:text-5xl uppercase tracking-[-0.02em] inline-block relative">
            Was sagen Kunden zu ReelyGood?
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-accent rounded-full shadow-accent-glow"></div>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-card-surface border border-white/5 hover:border-accent-base rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 lg:p-12 relative flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 hover:shadow-accent-glow">
              <Quote className="absolute top-8 left-8 w-12 h-12 text-accent opacity-20 group-hover:opacity-40 transition-opacity" />
              
              <p className="font-sans text-base lg:text-xl text-white/90 leading-relaxed font-light italic mb-8 md:mb-10 relative z-10 pt-4">
                "{t.text}"
              </p>
              
              <div className="flex flex-col border-t border-white/5 pt-6 mt-auto">
                <span className="font-sans font-semibold text-white">{t.author}</span>
                <span className="font-mono text-xs text-text-secondary tracking-widest uppercase mt-1">
                  {t.company}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
