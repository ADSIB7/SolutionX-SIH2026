import React from 'react';
import {
  Sparkles,
  Search,
  UserCheck,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  CreditCard,
  Star,
  Award
} from 'lucide-react';
import { Language, ModalType } from '../../types';
import { translations } from '../../data/translations';

interface HowItWorksProps {
  currentLang: Language;
  onOpenModal: (type: ModalType) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  currentLang,
  onOpenModal
}) => {
  const t = translations[currentLang];

  const steps = [
    {
      num: '01',
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      icon: <Search className="w-6 h-6 text-brand-600" />,
      color: 'bg-brand-50 border-brand-200 text-brand-700',
      badge: 'Local Ward Hub'
    },
    {
      num: '02',
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      icon: <UserCheck className="w-6 h-6 text-trust-600" />,
      color: 'bg-trust-50 border-trust-200 text-trust-700',
      badge: 'Verified Co-Owners'
    },
    {
      num: '03',
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      icon: <ShieldCheck className="w-6 h-6 text-coop-600" />,
      color: 'bg-coop-50 border-coop-200 text-coop-700',
      badge: '5-Min Window'
    },
    {
      num: '04',
      title: t.howItWorks.step4Title,
      desc: t.howItWorks.step4Desc,
      icon: <Award className="w-6 h-6 text-amber-600" />,
      color: 'bg-amber-50 border-amber-200 text-amber-700',
      badge: '88% Direct Payout'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-800 bg-brand-100/90 border border-brand-200 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-700" />
            <span>{t.howItWorks.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.howItWorks.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">

          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-1/3 left-12 right-12 h-0.5 bg-gradient-to-r from-brand-200 via-trust-200 to-coop-200 -z-0" />

          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="relative z-10 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft hover:shadow-card transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Step Number & Icon Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-14 h-14 rounded-2xl ${step.color} border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                    {step.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-brand-300 transition-colors">
                    {step.num}
                  </span>
                </div>

                {/* Badge */}
                <div className="mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
                    {step.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-700 transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Bottom Subtle Step Indicator */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Phase {idx + 1} of 4</span>
                <span className="text-brand-600 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Transparent</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Cooperative Flow CTA Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-900 via-slate-900 to-trust-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-300">
              <HeartHandshake className="w-4 h-4" />
              <span>Rojgar Cooperative Model</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Fair for Customers. Transformative for Workers.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Unlike commercial middlemen, WorkerEMP is governed by registered cooperative bye-laws with annual surplus profit-sharing dividends.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenModal('worker-join')}
              className="px-5 py-3 rounded-xl font-bold text-sm bg-brand-500 hover:bg-brand-600 text-white shadow-md transition-all active:scale-95"
            >
              Enroll Cooperative
            </button>
            <button
              type="button"
              onClick={() => onOpenModal('charter')}
              className="px-5 py-3 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
            >
              Read Model Charter
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
