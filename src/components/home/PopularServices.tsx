import React, { useState } from 'react';
import { 
  Zap, 
  Droplet, 
  Sparkles, 
  Hammer, 
  Paintbrush, 
  Wrench, 
  LayoutGrid, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  Users,
  ChevronDown
} from 'lucide-react';
import { Language, ServiceCategory } from '../../types';
import { translations } from '../../data/translations';
import { servicesData } from '../../data/servicesData';

interface PopularServicesProps {
  currentLang: Language;
  onBookService: (serviceId: string) => void;
}

export const PopularServices: React.FC<PopularServicesProps> = ({
  currentLang,
  onBookService
}) => {
  const t = translations[currentLang];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Icon mapper
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Droplet': return <Droplet className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Hammer': return <Hammer className="w-6 h-6" />;
      case 'Paintbrush': return <Paintbrush className="w-6 h-6" />;
      case 'Wrench': return <Wrench className="w-6 h-6" />;
      default: return <LayoutGrid className="w-6 h-6" />;
    }
  };

  const getServiceColor = (id: string) => {
    switch (id) {
      case 'electrician':
        return {
          iconBg: 'bg-amber-100 text-amber-700',
          hoverBorder: 'hover:border-amber-300',
          accent: 'text-amber-700'
        };
      case 'plumber':
        return {
          iconBg: 'bg-sky-100 text-sky-700',
          hoverBorder: 'hover:border-sky-300',
          accent: 'text-sky-700'
        };
      case 'cleaning':
        return {
          iconBg: 'bg-teal-100 text-teal-700',
          hoverBorder: 'hover:border-teal-300',
          accent: 'text-teal-700'
        };
      case 'carpenter':
        return {
          iconBg: 'bg-orange-100 text-orange-700',
          hoverBorder: 'hover:border-orange-300',
          accent: 'text-orange-700'
        };
      case 'painting':
        return {
          iconBg: 'bg-purple-100 text-purple-700',
          hoverBorder: 'hover:border-purple-300',
          accent: 'text-purple-700'
        };
      case 'appliances':
        return {
          iconBg: 'bg-blue-100 text-blue-700',
          hoverBorder: 'hover:border-blue-300',
          accent: 'text-blue-700'
        };
      default:
        return {
          iconBg: 'bg-emerald-100 text-emerald-700',
          hoverBorder: 'hover:border-emerald-300',
          accent: 'text-emerald-700'
        };
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-800 bg-brand-100/90 border border-brand-200 mb-3 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-700" />
            <span>{t.services.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.services.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid (7 items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {servicesData.map((service) => {
            const styles = getServiceColor(service.id);
            const localizedName = currentLang === 'hi' ? service.hindiName : currentLang === 'mr' ? service.marathiName : service.name;
            const localizedDesc = currentLang === 'hi' ? service.hindiDescription : currentLang === 'mr' ? service.marathiDescription : service.description;
            const isExpanded = expandedId === service.id;

            return (
              <div
                key={service.id}
                className={`group bg-white rounded-3xl p-6 shadow-soft hover:shadow-card border border-slate-200/90 ${styles.hoverBorder} transition-all duration-200 flex flex-col justify-between relative`}
              >
                {/* Popular Tag */}
                {service.popularTag && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700 border border-brand-200">
                      {service.popularTag}
                    </span>
                  </div>
                )}

                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${styles.iconBg} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                      {getIcon(service.iconName)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                        {localizedName}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{service.turnaround}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {localizedDesc}
                  </p>

                  {/* Highlights Bar */}
                  <div className="py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs mb-4">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-400" />
                      <span>{service.activeWorkers.toLocaleString()} Members</span>
                    </span>
                    <span className="font-bold text-emerald-700">
                      ₹{service.minPrice} <span className="font-normal text-slate-500">base</span>
                    </span>
                  </div>

                  {/* Sub-services expandable preview */}
                  {isExpanded && (
                    <div className="mb-4 pt-2 border-t border-slate-100 space-y-1.5 animate-in fade-in duration-150">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Standard Sub-Services & Rate Card:
                      </div>
                      {service.subServices.map((sub) => (
                        <div key={sub.id} className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-slate-50/70">
                          <span className="text-slate-700 font-medium">{sub.name}</span>
                          <span className="font-bold text-slate-900">₹{sub.basePrice}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onBookService(service.id)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-brand-600 group-hover:bg-brand-600 transition-colors shadow-sm"
                  >
                    <span>{t.services.bookBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : service.id)}
                    className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
                    title="Toggle Rate Card Details"
                  >
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Assurance Note */}
        <div className="mt-12 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-coop-100 text-coop-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Cooperative Workmanship Assurance
              </h4>
              <p className="text-xs text-slate-600">
                Every service includes 30-day free rework warranty, verified genuine spare parts at actuals, and emergency support.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right hidden md:block">
              <span className="text-xs text-slate-400 block">Cooperative Multiplier</span>
              <span className="text-sm font-extrabold text-brand-700">88% to Worker</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
