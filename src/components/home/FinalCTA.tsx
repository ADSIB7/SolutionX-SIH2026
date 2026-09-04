import React from 'react';
import { UserCheck, Building2 } from 'lucide-react';
import { Language, ModalType } from '../../types';

interface FinalCTAProps {
  currentLang?: Language;
  onOpenModal: (type: ModalType) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onOpenModal
}) => {
  return (
    <section className="py-8 pb-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Forest Green Container matching Reference */}
        <div className="relative bg-[#0c3826] rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-xl border border-emerald-800/40 overflow-hidden">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            
            {/* Left/Center: Illustration + Copy */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              
              {/* Illustrated Workers Strip Thumbnail */}
              <div className="relative w-44 sm:w-56 h-28 rounded-2xl overflow-hidden shadow-md shrink-0 border border-emerald-700/50 bg-[#072418]">
                <img
                  src="/images/rozgar_workers_strip.jpg"
                  alt="Rozgar Worker Collective"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Text Block */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  Let's build better opportunities, together.
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed font-normal">
                  Join Rozgar today and be a part of a movement that empowers workers and strengthens communities.
                </p>
              </div>

            </div>

            {/* Right: Dual Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
              
              {/* Join as Worker */}
              <button
                type="button"
                onClick={() => onOpenModal('worker-join')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md hover:shadow-lg active:scale-95 transition-all focus:outline-none"
              >
                <UserCheck className="w-4 h-4" />
                <span>Join as Worker</span>
              </button>

              {/* Join as Cooperative / Customer */}
              <button
                type="button"
                onClick={() => onOpenModal('coop-register')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 active:scale-95 transition-all focus:outline-none"
              >
                <Building2 className="w-4 h-4 text-emerald-300" />
                <span>Join as Cooperative / Customer</span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
