import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  HeartHandshake, 
  MapPin, 
  Award, 
  Star, 
  Quote,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Language, ModalType } from '../../types';
import { translations } from '../../data/translations';
import { cooperativeStats, workerSpotlights } from '../../data/cooperativeData';

interface TrustImpactSectionProps {
  currentLang: Language;
  onOpenModal: (type: ModalType) => void;
}

export const TrustImpactSection: React.FC<TrustImpactSectionProps> = ({
  currentLang,
  onOpenModal
}) => {
  const t = translations[currentLang];

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-brand-600" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-teal-600" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-emerald-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-rose-600" />;
      case 'MapPin': return <MapPin className="w-5 h-5 text-trust-600" />;
      default: return <Award className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <section id="impact" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-800 bg-brand-100/90 border border-brand-200 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-700" />
            <span>{t.trust.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.trust.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            {t.trust.subtitle}
          </p>
        </div>

        {/* 6 Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-20">
          {cooperativeStats.map((stat) => {
            const localizedLabel = currentLang === 'hi' ? stat.hindiLabel : currentLang === 'mr' ? stat.marathiLabel : stat.label;
            return (
              <div
                key={stat.id}
                className="bg-slate-50 hover:bg-white rounded-3xl p-5 border border-slate-200/90 hover:border-brand-200 shadow-sm hover:shadow-card transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3">
                    {getStatIcon(stat.icon)}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-slate-700 mt-1 line-clamp-1">
                    {localizedLabel}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] text-brand-700 font-semibold">
                  {stat.trend}
                </div>
              </div>
            );
          })}
        </div>

        {/* Worker-Owners Member Spotlights */}
        <div className="pt-8 border-t border-slate-100">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t.trust.workerSpotlightTitle}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              {t.trust.workerSpotlightSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workerSpotlights.map((worker) => (
              <div
                key={worker.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft hover:shadow-card transition-all duration-200 flex flex-col justify-between relative group"
              >
                <div>
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-50 text-brand-700 border border-brand-200">
                      {worker.badge}
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      +₹{worker.dividendEarned.toLocaleString()} Dividend
                    </span>
                  </div>

                  {/* Worker Profile Header */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <img
                      src={worker.image}
                      alt={worker.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-300 shadow-sm"
                    />
                    <div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                        {worker.name}
                      </h4>
                      <p className="text-xs font-medium text-brand-700">
                        {worker.trade}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{worker.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4">
                    <Quote className="w-4 h-4 text-brand-300 mb-1" />
                    <p className="text-xs text-slate-600 italic leading-relaxed">
                      "{worker.quote}"
                    </p>
                  </div>
                </div>

                {/* Performance stats bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1 font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{worker.rating}</span>
                    <span className="text-slate-400 font-normal">({worker.reviewsCount})</span>
                  </span>
                  <span className="font-semibold text-slate-700">
                    {worker.completedJobs} Jobs Completed
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
