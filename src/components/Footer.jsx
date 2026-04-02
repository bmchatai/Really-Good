import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-surface rounded-t-[2rem] md:rounded-t-[3rem] w-full px-4 pt-12 md:pt-20 pb-8 flex flex-col items-center mt-10 md:mt-20 relative z-10 border-t border-white/5">
      <div className="max-w-6xl w-full">
        
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 mb-12 md:mb-20">
          
          {/* Col 1 */}
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <span className="font-druk font-bold text-2xl uppercase tracking-tighter text-white">ReelyGood</span>
            <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-[200px]">
              Performance Creative Agentur aus Köln.<br /><br />
              Geschäftsführer:<br />
              Hakan Kara & Koray Kartal
            </p>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">Navigation</span>
            {['Leistungen', 'Case Studies', 'Prozess', 'FAQ'].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="font-sans text-sm text-white/70 hover:text-accent transition-colors w-fit">
                {link}
              </a>
            ))}
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">Legal</span>
            <a href="#" className="font-sans text-sm text-white/70 hover:text-accent transition-colors w-fit">Impressum</a>
            <a href="#" className="font-sans text-sm text-white/70 hover:text-accent transition-colors w-fit">Datenschutz</a>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col items-start lg:items-end gap-4 col-span-2 md:col-span-1">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">Start Now</span>
            <a
              href="https://form.typeform.com/to/dDmy0xtw"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-full border border-accent/30 text-accent font-sans text-sm font-semibold hover:bg-accent hover:text-black transition-all duration-300"
            >
              Free Video sichern <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-sm text-text-secondary">© ReelyGood 2026. All rights reserved.</span>
            <span className="font-sans text-[10px] text-white/30 max-w-sm">
              Plattform der EU-Kommission zur Online-Streitbeilegung: www.ec.europa.eu/consumers/odr
            </span>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success-green/10 border border-success-green/20">
            <div className="w-2 h-2 rounded-full bg-success-green animate-pulse"></div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-success-green">System Operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
