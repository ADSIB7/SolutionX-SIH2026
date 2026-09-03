import React from 'react';
import { 
  ArrowRight, 
  HeartHandshake, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Users
} from 'lucide-react';
import { Language, ModalType } from '../../types';
import { translations } from '../../data/translations';

interface FinalCTAProps {
  currentLang: Language;
  onOpenModal: (type: ModalType) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  currentLang,
  onOpenModal
}) => {
  const t = translations[currentLang];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-tr from-brand-900 via-slate-900 to-coop-950 rounded-3xl p-8 sm:p-14 text-white shadow-elevated border border-slate-700/80 overflow-hidden">
          
          {/* Decorative background glows */}
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-coop-500/20 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            
            {/* Cooperative badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-300 bg-brand-950/80 border border-brand-500/30">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>SIH Problem Statement 26089 • Smart Cooperative Economy</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t.finalCta.headline}
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
              {t.finalCta.subtitle}
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => onOpenModal('booking')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-brand-500 via-brand-600 to-coop-600 hover:from-brand-600 hover:to-coop-700 shadow-lg shadow-brand-600/30 hover:shadow-xl hover:shadow-brand-600/40 active:scale-95 transition-all"
              >
                <span>{t.finalCta.bookBtn}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => onOpenModal('worker-join')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-base font-bold text-white bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-white/30 active:scale-95 transition-all"
              >
                <HeartHandshake className="w-5 h-5 text-brand-300" />
                <span>{t.finalCta.joinBtn}</span>
              </button>
            </div>

            {/* Perks */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.finalCta.perk1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.finalCta.perk2}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.finalCta.perk3}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
