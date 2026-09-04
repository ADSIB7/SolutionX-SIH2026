import React from 'react';
import {
  ShieldCheck,
  HeartHandshake,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Award,
  Users
} from 'lucide-react';
import { Language, ModalType } from '../../types';
import { translations } from '../../data/translations';

interface FooterProps {
  currentLang: Language;
  onOpenModal: (type: ModalType) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onOpenModal
}) => {
  const t = translations[currentLang];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">

      {/* Top Banner: SIH 26089 Statement Reference */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-slate-200">Rojgar Platform:</span>
            <span>Worker-Owned Cooperative Gig-Services Platform</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Multi-State Cooperative Societies Framework</span>
            <button
              type="button"
              onClick={() => onOpenModal('charter')}
              className="text-brand-400 hover:text-brand-300 font-semibold underline"
            >
              View Model Bye-Laws
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Col 1: Brand & Ethos */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-coop-500 flex items-center justify-center text-white shadow-md">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-white">
                    Worker<span className="text-brand-400">EMP</span>
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-brand-900 text-brand-300 border border-brand-700">
                    CO-OP
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">
                  Worker-Owned Gig Platform
                </span>
              </div>
            </a>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.footer.aboutDesc}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300 flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-brand-400" />
                <span>14,850+ Worker Owners</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>88% Direct Wage</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              {t.footer.servicesTitle}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#services" className="hover:text-white transition-colors">Electrician Services</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Plumbing & Sanitary</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Deep House Cleaning</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Carpentry & Furniture</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Painting & Waterproofing</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Appliance Repair</a></li>
            </ul>
          </div>

          {/* Col 3: Cooperative Governance & Worker Reg */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              {t.footer.coopTitle}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('worker-join')}
                  className="text-brand-400 hover:text-brand-300 font-medium transition-colors text-left"
                >
                  Join as a Worker-Owner
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('charter')}
                  className="hover:text-white transition-colors text-left"
                >
                  Cooperative Bye-Laws
                </button>
              </li>
              <li><a href="#impact" className="hover:text-white transition-colors">Dividend Distribution Audit</a></li>
              <li><a href="#why-cooperative" className="hover:text-white transition-colors">1-Member 1-Vote Voting</a></li>
              <li><a href="#why-cooperative" className="hover:text-white transition-colors">Worker Welfare & ESI Pool</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ward Hub Committees</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Grievance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-400">
                  National Cooperative Center, Central Ward, Pune & New Delhi, India
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <span className="text-xs text-slate-400">Toll-Free Grievance: 1800-260-8900</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span className="text-xs text-slate-400">coop@workeremp.org.in</span>
              </li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenModal('booking')}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                >
                  Customer Support Portal
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright */}
        <div className="mt-14 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} WorkerEMP Cooperative Society Ltd. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <button
              type="button"
              onClick={() => onOpenModal('charter')}
              className="hover:text-slate-400 transition-colors"
            >
              Fair Tariff Guidelines
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
