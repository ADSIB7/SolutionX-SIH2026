import React, { useState } from 'react';
import { 
  ShieldCheck, 
  HeartHandshake, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Scale, 
  DollarSign, 
  Vote, 
  Flame, 
  ArrowRight,
  BadgePercent
} from 'lucide-react';
import { Language, ModalType } from '../../types';
import { translations } from '../../data/translations';
import { platformComparisons } from '../../data/cooperativeData';

interface WhyWorkerEMPProps {
  currentLang: Language;
  onOpenModal: (type: ModalType) => void;
}

export const WhyWorkerEMP: React.FC<WhyWorkerEMPProps> = ({
  currentLang,
  onOpenModal
}) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'benefits' | 'comparison'>('benefits');

  const cooperativePillars = [
    {
      title: t.whyCoop.card1Title,
      desc: t.whyCoop.card1Desc,
      icon: <ShieldCheck className="w-6 h-6 text-brand-600" />,
      tag: '100% Verified',
      accent: 'border-brand-200 bg-brand-50/50'
    },
    {
      title: t.whyCoop.card2Title,
      desc: t.whyCoop.card2Desc,
      icon: <BadgePercent className="w-6 h-6 text-emerald-600" />,
      tag: '88% Payout + Dividend',
      accent: 'border-emerald-200 bg-emerald-50/50'
    },
    {
      title: t.whyCoop.card3Title,
      desc: t.whyCoop.card3Desc,
      icon: <Scale className="w-6 h-6 text-trust-600" />,
      tag: 'Zero Surge Traps',
      accent: 'border-trust-200 bg-trust-50/50'
    },
    {
      title: t.whyCoop.card4Title,
      desc: t.whyCoop.card4Desc,
      icon: <HeartHandshake className="w-6 h-6 text-rose-600" />,
      tag: 'ESI & ₹5L Insurance',
      accent: 'border-rose-200 bg-rose-50/50'
    },
    {
      title: t.whyCoop.card5Title,
      desc: t.whyCoop.card5Desc,
      icon: <Vote className="w-6 h-6 text-indigo-600" />,
      tag: '1-Worker 1-Vote',
      accent: 'border-indigo-200 bg-indigo-50/50'
    },
    {
      title: t.whyCoop.card6Title,
      desc: t.whyCoop.card6Desc,
      icon: <Award className="w-6 h-6 text-amber-600" />,
      tag: '30-Day Free Warranty',
      accent: 'border-amber-200 bg-amber-50/50'
    }
  ];

  return (
    <section id="why-cooperative" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-800 bg-brand-100/90 border border-brand-200 mb-3 shadow-sm">
            <Users className="w-3.5 h-3.5 text-brand-700" />
            <span>{t.whyCoop.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.whyCoop.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            {t.whyCoop.subtitle}
          </p>

          {/* Switcher Tabs */}
          <div className="mt-6 inline-flex p-1 bg-slate-200/80 rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveTab('benefits')}
              className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeTab === 'benefits'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cooperative Core Pillars
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('comparison')}
              className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeTab === 'comparison'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cooperative vs Commercial Gig Apps
            </button>
          </div>
        </div>

        {/* View 1: 6 Cooperative Pillars Cards */}
        {activeTab === 'benefits' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            {cooperativePillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft hover:shadow-card transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                      {pillar.icon}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-brand-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Guaranteed by Cooperative Charter</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View 2: Side-by-Side Comparison Table */}
        {activeTab === 'comparison' && (
          <div className="bg-white rounded-3xl shadow-card border border-slate-200 overflow-hidden animate-in fade-in duration-200">
            
            <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">
                  {t.whyCoop.compareHeading}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  SIH Problem Statement 26089: Transforming gig labor from algorithmic exploitation to collective prosperity.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-500 text-white self-start sm:self-auto">
                {t.whyCoop.metricPill}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-4 px-6">Evaluation Factor</th>
                    <th className="py-4 px-6 text-brand-700 bg-brand-50/50">
                      WorkerEMP (Cooperative Model)
                    </th>
                    <th className="py-4 px-6 text-rose-700 bg-rose-50/20">
                      Traditional Commercial Gig Platforms
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {platformComparisons.map((item, index) => (
                    <tr key={index} className={item.isHighlight ? 'bg-brand-50/30' : 'hover:bg-slate-50/60'}>
                      <td className="py-4 px-6 font-semibold text-slate-900 flex items-center gap-2">
                        <span>{item.feature}</span>
                      </td>
                      <td className="py-4 px-6 text-slate-800 bg-brand-50/30 font-medium">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item.cooperative}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-600 bg-rose-50/10">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span>{item.traditional}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <span>* Data verified under Multi-State Cooperative Societies Act provisions.</span>
              <button
                type="button"
                onClick={() => onOpenModal('worker-join')}
                className="text-xs font-bold text-brand-700 hover:text-brand-900 inline-flex items-center gap-1"
              >
                <span>Join as a Worker-Owner today</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
