import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Users, 
  MapPin, 
  Star, 
  CheckCircle2, 
  Award, 
  TrendingUp, 
  HeartHandshake,
  Sparkles,
  Zap,
  Wrench,
  Droplet
} from 'lucide-react';
import { Language, ModalType } from '../../types';
import { translations } from '../../data/translations';

interface HeroSectionProps {
  currentLang: Language;
  onOpenModal: (type: ModalType) => void;
  onScrollToSearch: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  onOpenModal,
  onScrollToSearch
}) => {
  const t = translations[currentLang];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-brand-50/70 via-slate-50 to-white">
      {/* Subtle background decorative shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute top-48 -right-32 w-96 h-96 rounded-full bg-trust-200/40 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-coop-200/30 blur-3xl" />
        
        {/* Subtle geometric dot grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `radial-gradient(#0d9488 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* SIH Cooperative Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-800 bg-brand-100/80 border border-brand-200 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600"></span>
              </span>
              <span>{t.hero.sihBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              {currentLang === 'en' ? (
                <>
                  Trusted Services.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-teal-600 to-coop-600">
                    Fair Work.
                  </span>{' '}
                  Stronger Communities.
                </>
              ) : (
                <span>{t.hero.headline}</span>
              )}
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
              {t.hero.subheadline}
            </p>

            {/* Two Primary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2">
              <button
                type="button"
                onClick={() => onOpenModal('booking')}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-brand-600 via-brand-700 to-coop-600 hover:from-brand-700 hover:to-coop-700 shadow-lg shadow-brand-600/25 hover:shadow-xl hover:shadow-brand-600/35 transform active:scale-95 transition-all"
              >
                <span>{t.hero.bookBtn}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => onOpenModal('worker-join')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-bold text-brand-800 bg-white hover:bg-brand-50/80 border-2 border-brand-200 hover:border-brand-300 shadow-sm transition-all"
              >
                <HeartHandshake className="w-5 h-5 text-brand-600" />
                <span>{t.hero.joinBtn}</span>
              </button>
            </div>

            {/* Trust Micro-Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 w-full border-t border-slate-200/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-700 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">100% Police Verified</span>
                  <span className="text-[11px] text-slate-500">Aadhaar & Skill Checked</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-100/80 flex items-center justify-center text-teal-700 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">88% Worker Retained</span>
                  <span className="text-[11px] text-slate-500">Cooperative Dividend</span>
                </div>
              </div>

              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-lg bg-trust-100/80 flex items-center justify-center text-trust-700 shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">Zero Surge Pricing</span>
                  <span className="text-[11px] text-slate-500">Standardized Rates</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Modern Graphic Composition */}
          <div className="lg:col-span-5 relative">
            
            {/* Visual Container */}
            <div className="relative mx-auto max-w-md lg:max-w-none bg-gradient-to-tr from-slate-900 via-slate-800 to-brand-950 rounded-3xl p-6 shadow-2xl text-white border border-slate-700/60 overflow-hidden">
              
              {/* Map background matrix & radar ring */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                  <circle cx="200" cy="200" r="160" stroke="#14b8a6" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="200" cy="200" r="110" stroke="#3b82f6" strokeWidth="1" />
                  <circle cx="200" cy="200" r="60" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="200" y1="20" x2="200" y2="380" stroke="#0d9488" strokeWidth="0.8" opacity="0.4" />
                  <line x1="20" y1="200" x2="380" y2="200" stroke="#0d9488" strokeWidth="0.8" opacity="0.4" />
                </svg>
              </div>

              {/* Header Bar inside Card */}
              <div className="relative flex items-center justify-between pb-4 border-b border-slate-700/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Live Cooperative Network
                  </span>
                </div>
                <span className="text-[11px] font-medium bg-brand-900/80 text-brand-300 px-2.5 py-0.5 rounded-full border border-brand-700/50">
                  Pune & Mumbai Hubs
                </span>
              </div>

              {/* Interactive Visual: Connected Worker & Customer Node */}
              <div className="relative py-6 space-y-4">
                
                {/* Active Worker Profile Card (Floating node) */}
                <div className="bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=120&h=120&q=80"
                        alt="Ramesh Jadhav"
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-brand-400"
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-800 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-white">Ramesh Jadhav</h4>
                        <span className="text-[10px] bg-brand-500/20 text-brand-300 font-medium px-1.5 py-0.5 rounded">
                          Co-op Owner
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                        <Zap className="w-3 h-3 text-amber-400" />
                        <span>Master Electrician • 12 yrs exp</span>
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                        <span className="flex items-center text-amber-400 font-semibold">
                          <Star className="w-3 h-3 fill-amber-400 mr-0.5" /> 4.94
                        </span>
                        <span>•</span>
                        <span className="text-emerald-400 font-medium">890 jobs completed</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Dispatch Status</span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-700/50 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>18 mins away</span>
                    </span>
                  </div>
                </div>

                {/* Connection Line with animated signal */}
                <div className="relative flex items-center justify-center py-1">
                  <div className="h-7 w-0.5 bg-gradient-to-b from-brand-400 via-teal-300 to-trust-400" />
                  <div className="absolute px-3 py-0.5 bg-slate-900 text-[10px] font-semibold text-brand-300 rounded-full border border-brand-500/40">
                    Direct P2P Escrow Dispatched
                  </div>
                </div>

                {/* Customer Household Request Node */}
                <div className="bg-slate-800/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-trust-900/80 border border-trust-500/40 flex items-center justify-center text-trust-300 font-bold text-sm">
                      KH
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">Household Request #26089</span>
                        <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.2 rounded">Kothrud</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        MCB Tripping & Switchboard Inspection
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-100">₹349</span>
                    <span className="text-[10px] text-emerald-400 block">₹307 to Worker (88%)</span>
                  </div>
                </div>

                {/* Cooperative Dividend Live Tracker Card */}
                <div className="bg-gradient-to-r from-emerald-950/70 to-teal-950/70 p-3.5 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-300 font-medium block">
                        Today's Cooperative Dividend Distributed
                      </span>
                      <span className="text-sm font-extrabold text-emerald-300">
                        ₹42,850 credited to worker accounts
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => onOpenModal('charter')}
                    className="text-[11px] font-semibold text-brand-300 hover:text-white underline decoration-brand-500"
                  >
                    View Charter
                  </button>
                </div>

              </div>

              {/* Bottom Quick Hub Indicators */}
              <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-brand-400" />
                  <span>14,850+ Co-owners</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Democratic 1-Worker 1-Vote</span>
                </div>
              </div>

            </div>

            {/* Floating decorative badge on top right */}
            <div className="absolute -top-4 -right-4 bg-white text-slate-900 px-3.5 py-2 rounded-2xl shadow-card border border-slate-200 hidden sm:flex items-center gap-2 animate-bounce-slow">
              <div className="w-7 h-7 rounded-xl bg-coop-100 flex items-center justify-center text-coop-700 font-bold text-xs">
                ★
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">4.94 / 5.0</div>
                <div className="text-[10px] text-slate-500">Trusted Community Score</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
