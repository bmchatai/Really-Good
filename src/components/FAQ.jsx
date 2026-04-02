import { useState, useRef } from 'react';
import gsap from 'gsap';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "Kann ich als Dienstleister oder als Softwaredienstleister ein Video anfordern?",
    a: "Ja, auch diese Bereiche decken wir ab."
  },
  {
    q: "Ich habe ein Produkt, welches eher unspektakulär ist. Denkt ihr, ihr könnt es trotzdem in Szene setzen?",
    a: "Ja, können wir! Teilweise stießen wir auf Produkte, deren Gründer keinen klaren Plan hatten, diese kreativ zu präsentieren. Es gelang uns, nicht nur durch Ideen und Produktion zu beeindrucken, sondern auch mit den erzielten Ergebnissen 🚀"
  },
  {
    q: "Wie läuft der Prozess ab? Muss ich viel Aufwand betreiben?",
    a: "Wir übernehmen 99% des Testvideos. Das Einzige, was wir von dir benötigen, ist, dass du uns das/die Produkte, welche/s im Video vorkommen soll(en), zuschickst. Wir skripten, filmen und bearbeiten das Video und senden es dir zu! Du hast also einen extrem geringen Aufwand."
  },
  {
    q: "Wozu dient das kostenlose Testvideo?",
    a: "Wir möchten dir einen Vertrauensvorschuss geben und zuerst unter Beweis stellen, dass wir dein Produkt und dein Konzept in eine performante Werbeanzeige übersetzen können. So bekommst du einen echten Eindruck von unserer Arbeit und kannst anschließend auf dieser Basis entscheiden, ob eine Zusammenarbeit für dich sinnvoll ist und ob du dir vorstellen kannst, gemeinsam mit uns deine Ziele zu erreichen. Im ersten Gespräch analysieren wir deine aktuelle Situation und bewerten, wo du gerade stehst. Dabei schauen wir ehrlich, ob und wie wir dir überhaupt helfen könnten. Wenn wir sehen, dass du gut zu uns passt und wir echtes Potenzial erkennen, gehen wir den nächsten Schritt: Wir erstellen für dich unverbindlich und kostenlos ein Testvideo."
  },
  {
    q: "Ab wann bin ich qualifiziert für eine Kooperation mit ReelyGood?",
    a: "Wir arbeiten mit Brands ab einem Umsatz von 15.000 Euro pro Monat. Wir haben allerdings weitere Dienstleistungen, die für Brands sind, die noch nicht an diesem Punkt sind. Mit diesen Dienstleistungen sorgen wir dafür, dass Umsätze im fünfstelligen Bereich erreicht werden. Melde dich jetzt bei uns und wir erklären dir genau, wie wir das anstellen 🤝"
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-32 px-4 bg-black w-full flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-10 md:mb-20 relative">
          <h2 className="font-druk text-4xl md:text-5xl uppercase tracking-[-0.02em] inline-block relative">
            Häufig Gestellte Fragen
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-accent rounded-full shadow-accent-glow"></div>
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      gsap.to(contentRef.current, { height: 'auto', duration: 0.4, ease: 'power3.out' });
    } else {
      gsap.to(contentRef.current, { height: 0, duration: 0.4, ease: 'power3.out' });
    }
  };

  return (
    <div className="bg-card-surface border border-white/5 rounded-[1.5rem] overflow-hidden transition-colors hover:border-white/10 cursor-pointer" onClick={toggle}>
      <div className="px-5 md:px-6 py-5 md:py-6 flex items-center justify-between gap-4">
        <h3 className="font-sans font-semibold text-base md:text-xl text-white/90 leading-snug">{question}</h3>
        <div className="shrink-0 w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center">
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </div>
      <div ref={contentRef} className="h-0 overflow-hidden">
        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-2 font-sans text-text-secondary leading-relaxed text-base">
          {answer}
        </div>
      </div>
    </div>
  );
}
