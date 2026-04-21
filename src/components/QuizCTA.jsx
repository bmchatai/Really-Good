import { HelpCircle } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

const TYPEFORM_ID = 'dDmy0xtw';

export default function QuizCTA() {
  return (
    <section className="relative py-20 md:py-32 px-4 w-full flex flex-col items-center bg-black border-t border-white/5 overflow-hidden">
      <AnimatedBackground />

      <div className="max-w-4xl w-full relative z-10 flex flex-col items-center">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-12">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-accent animate-pulse" />
            <span className="font-mono text-sm tracking-widest text-accent uppercase font-semibold">Interactive</span>
          </div>

          <h2 className="font-druk text-3xl sm:text-4xl lg:text-5xl uppercase leading-[1.1] tracking-[-0.02em] text-white mb-6">
            Das 'Why-Your-Ads-Fail'-Quiz
          </h2>

          <p className="font-sans text-base md:text-lg text-white/80 leading-relaxed font-light max-w-2xl">
            Finde in unter 2 Minuten heraus, warum deine Creatives nicht performen – und was du tun musst, um deine Ads endlich profitabel zu machen.
          </p>
        </div>

        {/* Embedded Typeform */}
        <div className="w-full bg-card-surface border border-accent-base rounded-[2rem] overflow-hidden shadow-[0_0_60px_-20px_rgba(47,215,191,0.35)] relative">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-accent/5 to-transparent" />
          <iframe
            title="Why-Your-Ads-Fail Quiz"
            src={`https://form.typeform.com/to/${TYPEFORM_ID}?typeform-embed=embed-widget&embed-hide-footer=true&disable-auto-focus=true`}
            className="relative block w-full bg-transparent"
            style={{ height: 'min(720px, 85vh)', minHeight: 560, border: 0 }}
            allow="camera; microphone; autoplay; encrypted-media;"
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
}
