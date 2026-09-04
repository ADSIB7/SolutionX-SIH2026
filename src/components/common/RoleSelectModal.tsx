import React, { useEffect } from 'react';
import { X, User, Wrench, Building2, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { UserRole } from '../../types';
import { AppLanguage, mobileTranslations } from '../../data/mobileTranslations';

interface RoleSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  currentLang?: AppLanguage;
}

export const RoleSelectModal: React.FC<RoleSelectModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSelectRole,
  currentLang = 'en'
}) => {
  const t = mobileTranslations[currentLang];

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tipText = currentLang === 'hi'
    ? 'अनुभव युक्ति: ग्राहक पोर्टल में बुकिंग बनाएं, उसे स्वीकारने के लिए कारीगर में बदलें, और प्रेषण देखने के लिए सहकारी में जाएं!'
    : currentLang === 'mr'
    ? 'मार्गदर्शक टीप: ग्राहक पोर्टलवर बुकिंग तयार करा, स्वीकारण्यासाठी कामगार वर जा, आणि वाटप पाहण्यासाठी सहकारी पोर्टलवर जा!'
    : 'Platform Tip: Create a booking in Customer, switch to Worker to accept it, and switch to Cooperative to oversee the dispatch!';

  const continueBtnText = currentLang === 'hi'
    ? 'वर्तमान पोर्टल पर जारी रखें'
    : currentLang === 'mr'
    ? 'सध्याच्या पोर्टलवर सुरू ठेवा'
    : 'Continue in Current View';

  const roles: {
    id: UserRole;
    title: string;
    subtitle: string;
    accountName: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    borderColor: string;
    badge: string;
  }[] = [
    {
      id: 'customer',
      title: t.roleSelect.customerTitle,
      subtitle: t.roleSelect.customerSub,
      accountName: currentLang === 'hi' ? 'पूजा शर्मा (कोथरूड, पुणे)' : currentLang === 'mr' ? 'पूजा शर्मा (कोथरूड, पुणे)' : 'Pooja Sharma (Kothrud, Pune)',
      description: t.roleSelect.customerDesc,
      icon: <User className="w-6 h-6 text-brand-700" />,
      color: 'bg-brand-50 text-brand-800',
      borderColor: 'border-brand-300',
      badge: currentRole === 'customer' ? t.roleSelect.activeBadge : (currentLang === 'hi' ? 'निवासी खाता' : currentLang === 'mr' ? 'रहिवासी खाते' : 'Resident Account')
    },
    {
      id: 'worker',
      title: t.roleSelect.workerTitle,
      subtitle: t.roleSelect.workerSub,
      accountName: currentLang === 'hi' ? 'रमेश जाधव (मुख्य इलेक्ट्रीशियन)' : currentLang === 'mr' ? 'रमेश जाधव (मुख्य इलेक्ट्रिशियन)' : 'Ramesh Jadhav (Master Electrician)',
      description: t.roleSelect.workerDesc,
      icon: <Wrench className="w-6 h-6 text-amber-700" />,
      color: 'bg-amber-50 text-amber-800',
      borderColor: 'border-amber-300',
      badge: currentRole === 'worker' ? t.roleSelect.activeBadge : (currentLang === 'hi' ? 'पुणे सेंट्रल सदस्य' : currentLang === 'mr' ? 'पुणे सेंट्रल सदस्य' : 'Pune Central Member')
    },
    {
      id: 'cooperative',
      title: t.roleSelect.coopTitle,
      subtitle: t.roleSelect.coopSub,
      accountName: t.cooperative.overview.societyName,
      description: t.roleSelect.coopDesc,
      icon: <Building2 className="w-6 h-6 text-emerald-800" />,
      color: 'bg-emerald-50 text-emerald-800',
      borderColor: 'border-emerald-300',
      badge: currentRole === 'cooperative' ? t.roleSelect.activeBadge : (currentLang === 'hi' ? 'वार्ड हब प्रशासन' : currentLang === 'mr' ? 'वॉर्ड हब प्रशासन' : 'Ward Hub Admin')
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-900 to-brand-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-300 flex items-center justify-center border border-brand-400/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight">{t.roleSelect.title}</h3>
              <p className="text-[11px] text-slate-300">{t.roleSelect.subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Guide Callout */}
        <div className="p-4 bg-brand-50/70 border-b border-brand-100 text-xs text-brand-950 leading-relaxed">
          {tipText}
        </div>

        {/* Role Cards List */}
        <div className="p-4 space-y-3 overflow-y-auto">
          {roles.map((r) => {
            const isSelected = currentRole === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  onSelectRole(r.id);
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 relative ${
                  isSelected
                    ? `${r.color} ${r.borderColor} shadow-sm ring-2 ring-brand-500/20`
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                  {r.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-sm font-bold text-slate-900">{r.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 border border-slate-200 text-slate-700 shrink-0">
                      {r.badge}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-brand-800 mt-0.5">{r.accountName}</div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">{r.description}</p>
                </div>

                {isSelected && (
                  <div className="shrink-0 self-center">
                    <CheckCircle2 className="w-5 h-5 text-brand-700" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom footer button */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-brand-700 hover:bg-brand-800 transition-colors"
          >
            {continueBtnText}
          </button>
        </div>

      </div>
    </div>
  );
};
