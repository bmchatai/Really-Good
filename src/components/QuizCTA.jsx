import { ArrowRight, HelpCircle } from 'lucide-react';

export default function QuizCTA() {
  return (
    <section className="py-20 md:py-32 px-4 w-full flex flex-col items-center bg-black border-t border-white/5">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-12 lg:gap-20 bg-card-surface border border-accent-base rounded-[2rem] p-8 md:p-16 relative overflow-hidden group hover:shadow-accent-glow transition-all duration-500">
        
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Text Content */}
        <div className="w-full md:w-2/3 relative z-10 flex flex-col items-start text-left">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-accent animate-pulse" />
            <span className="font-mono text-sm tracking-widest text-accent uppercase font-semibold">Interactive</span>
          </div>
          
          <h2 className="font-druk text-3xl sm:text-4xl lg:text-5xl uppercase leading-[1.1] tracking-[-0.02em] text-white mb-6">
            Das 'Why-Your-Ads-Fail'-Quiz
          </h2>
          
          <p className="font-sans text-base md:text-lg text-white/80 leading-relaxed font-light mb-4">
            Finde in unter 2 Minuten heraus, warum deine Creatives nicht performen – und was du tun musst, um deine Ads endlich profitabel zu machen.
          </p>
          <p className="font-sans text-base md:text-lg text-white/80 leading-relaxed font-light mb-10">
            Dafür haben wir ein Quiz entwickelt, das deine aktuelle Situation analysiert und dir konkrete Lösungsansätze liefert – abgestimmt auf dein Stadium als Brand.
          </p>
          
          {/* Action Button - typically opens typeform or goes to quiz page */}
          <a
            href="https://form.typeform.com/to/dDmy0xtw"
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden bg-white text-black font-semibold text-sm md:text-base px-8 py-4 min-h-[52px] rounded-full flex items-center justify-center gap-3 hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center gap-2">
              Zum Quiz
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
          </a>
        </div>
        
        {/* Visual Element (3D illustration or icon) */}
        <div className="w-full md:w-1/3 flex justify-center items-center relative z-10">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
            <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full animate-pulse-glow"></div>
            <div className="w-full h-full border border-white/10 rounded-full flex justify-center items-center backdrop-blur-sm relative z-10 bg-black/40">
              <span className="text-8xl">🤔</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
