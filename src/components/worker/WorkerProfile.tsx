import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Building2, 
  MapPin, 
  Phone, 
  CreditCard, 
  Award, 
  Clock, 
  CheckCircle, 
  ToggleLeft, 
  ToggleRight, 
  LifeBuoy, 
  Settings, 
  FileText,
  BadgePercent
} from 'lucide-react';
import { AppLanguage, mobileTranslations } from '../../data/mobileTranslations';

interface WorkerProfileProps {
  onResetData: () => void;
  currentLang?: AppLanguage;
}

export const WorkerProfile: React.FC<WorkerProfileProps> = ({ onResetData, currentLang = 'en' }) => {
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const t = mobileTranslations[currentLang];

  return (
    <div className="space-y-4">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-4">
        <div className="flex items-start gap-3.5">
          <img 
            src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200&auto=format&fit=crop&q=80" 
            alt="Ramesh Jadhav"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-base font-extrabold text-slate-900">
                {currentLang === 'hi' ? 'रमेश जाधव' : currentLang === 'mr' ? 'रमेश जाधव' : 'Ramesh Jadhav'}
              </h2>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> {t.worker.profile.coopOwner}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {currentLang === 'hi' ? 'प्रमाणित मुख्य इलेक्ट्रीशियन' : currentLang === 'mr' ? 'प्रमाणित मुख्य इलेक्ट्रिशियन' : 'Certified Master Electrician'}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {t.worker.profile.memberId}
            </p>
          </div>
        </div>

        {/* Availability Switch */}
        <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between border border-slate-100">
          <div>
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-500' : 'bg-slate-400'}`} />
              {t.worker.profile.availabilityStatus}
            </div>
            <div className="text-[11px] text-slate-500">
              {isAvailable ? t.worker.profile.receivingRequests : t.worker.profile.pausedStatus}
            </div>
          </div>

          <button
            onClick={() => setIsAvailable(!isAvailable)}
            className="text-slate-700 hover:text-emerald-700 transition-colors"
          >
            {isAvailable ? (
              <ToggleRight className="w-9 h-9 text-emerald-600 fill-emerald-100" />
            ) : (
              <ToggleLeft className="w-9 h-9 text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {/* Cooperative Membership Details */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Building2 className="w-4 h-4 text-emerald-600" /> {t.worker.profile.governanceOverview}
        </h3>

        <div className="space-y-2 text-xs">
          <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-3 space-y-1">
            <div className="font-bold text-emerald-950 text-xs">
              {t.cooperative.overview.societyName}
            </div>
            <div className="text-emerald-800 text-[11px]">
              {t.cooperative.overview.regNumber} • {t.worker.profile.wardArea}
            </div>
            <div className="text-[11px] text-emerald-700 pt-1 border-t border-emerald-200/60 flex items-center justify-between">
              <span>{currentLang === 'hi' ? 'स्वामित्व मतदान अधिकार: ' : currentLang === 'mr' ? 'मालकी मतदान हक्क: ' : 'Ownership Voting Rights: '}<strong>{currentLang === 'hi' ? '100 शेयर्स (श्रेणी अ)' : currentLang === 'mr' ? '100 शेअर्स (श्रेणी अ)' : '100 Shares (Tier A)'}</strong></span>
              <span>{currentLang === 'hi' ? 'लाभांश हिस्सा: ' : currentLang === 'mr' ? 'नफा हिस्सा: ' : 'Profit Share: '}<strong>{currentLang === 'hi' ? 'सक्रिय' : currentLang === 'mr' ? 'सक्रिय' : 'Active'}</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="text-sm font-extrabold text-slate-900">88.0%</div>
              <div className="text-[10px] text-slate-500">{t.worker.profile.directTakeHome}</div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="text-sm font-extrabold text-emerald-600">₹4,200</div>
              <div className="text-[10px] text-slate-500">{currentLang === 'hi' ? 'Q2 सहकारी लाभांश' : currentLang === 'mr' ? 'Q2 सहकारी लाभांश' : 'Q2 Co-op Dividend'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Worker Social Protections */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> {t.worker.profile.welfarePool}
        </h3>

        <div className="space-y-2 text-xs text-slate-700">
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-100">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> {currentLang === 'hi' ? '₹5,00,000 स्वास्थ्य एवं दुर्घटना सुरक्षा' : currentLang === 'mr' ? '₹5,00,000 आरोग्य व अपघात संरक्षण' : '₹5,00,000 Health & Accident Cover'}
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {currentLang === 'hi' ? 'सक्रिय' : currentLang === 'mr' ? 'सक्रिय' : 'Active'}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-100">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> {currentLang === 'hi' ? 'औजार बीमा एवं टूट-फूट कोष' : currentLang === 'mr' ? 'साहित्य विमा व नुकसान भरपाई निधी' : 'Tool Insurance & Breakage Fund'}
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {currentLang === 'hi' ? 'सक्रिय' : currentLang === 'mr' ? 'सक्रिय' : 'Active'}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-100">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> {currentLang === 'hi' ? 'लोकतांत्रिक परिषद विवाद सुरक्षा' : currentLang === 'mr' ? 'लोकशाही परिषद तक्रार संरक्षण' : 'Democratic Council Dispute Protection'}
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {currentLang === 'hi' ? 'सक्रिय' : currentLang === 'mr' ? 'सक्रिय' : 'Active'}
            </span>
          </div>
        </div>
      </div>

      {/* Help & Contact Options */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-2">
        <button
          onClick={() => setShowHelpModal(true)}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <LifeBuoy className="w-4 h-4 text-emerald-600" /> {currentLang === 'hi' ? 'वार्ड समन्वयक आपातकालीन हेल्पलाइन' : currentLang === 'mr' ? 'वॉर्ड समन्वयक आपत्कालीन हेल्पलाइन' : 'Ward Dispatcher Emergency Helpline'}
        </button>

        <button
          onClick={onResetData}
          className="w-full py-2 text-slate-400 hover:text-rose-600 text-xs font-medium transition-colors"
        >
          {t.worker.profile.resetAppDemo}
        </button>
      </div>

      {/* Dispatch Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xs w-full p-4 space-y-3 shadow-xl border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <LifeBuoy className="w-4 h-4 text-emerald-600" /> {currentLang === 'hi' ? 'वार्ड 14 प्रेषण कार्यालय' : currentLang === 'mr' ? 'वॉर्ड 14 प्रेषण कार्यालय' : 'Ward 14 Dispatch Office'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentLang === 'hi' ? 'यदि कार्यस्थल पर सुरक्षा संबंधी समस्या, ग्राहक विवाद या वाहन खराबी हो, तो तुरंत कोथरूड सहकारी केंद्र अधिकारी से संपर्क करें:' : currentLang === 'mr' ? 'कामाच्या ठिकाणी सुरक्षा समस्या, ग्राहक वाद किंवा वाहन बिघाड झाल्यास, कोथरूड सहकारी केंद्र अधिकाऱ्याशी त्वरित संपर्क साधा:' : 'If you experience on-site safety issues, difficult customer disputes, or vehicle breakdowns, call the Kothrud Cooperative Hub officer immediately:'}
            </p>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="font-bold text-slate-800">{currentLang === 'hi' ? 'अधिकारी: आनंद शिंदे' : currentLang === 'mr' ? 'अधिकारी: आनंद शिंदे' : 'Officer: Anand Shinde'}</div>
              <div className="text-slate-600 font-mono">+91 98220 99881</div>
              <div className="text-[10px] text-slate-400">
                {currentLang === 'hi' ? 'प्रतिदिन सुबह 7:00 से रात 10:00 तक उपलब्ध' : currentLang === 'mr' ? 'दररोज सकाळी 7:00 ते रात्री 10:00 पर्यंत उपलब्ध' : 'Available 7:00 AM - 10:00 PM Daily'}
              </div>
            </div>
            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
            >
              {t.common.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
