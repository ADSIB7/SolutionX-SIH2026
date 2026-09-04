import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  Wrench, 
  ArrowRight, 
  Sparkles, 
  Globe, 
  Lock, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { UserRole, UserProfile } from '../../types';
import { demoProfiles } from '../../data/mockAppData';
import { AppLanguage, mobileTranslations } from '../../data/mobileTranslations';

interface LoginPortalProps {
  currentLang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  onLogin: (profile: UserProfile) => void;
}

export const LoginPortal: React.FC<LoginPortalProps> = ({ 
  currentLang, 
  onLanguageChange, 
  onLogin 
}) => {
  const t = mobileTranslations[currentLang];
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [locality, setLocality] = useState('');
  const [trade, setTrade] = useState('electrician');
  const [coopName, setCoopName] = useState('');

  // 1-Tap Demo shortcut: loads the pre-configured mock profile for the chosen role
  const handleUseDemoProfile = () => {
    const demo = demoProfiles[selectedRole];
    onLogin(demo);
  };

  // Form submission: logs in / creates custom profile based on user input
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    const fallbackProfile = demoProfiles[selectedRole];
    const tradeLabels: Record<string, string> = {
      electrician: 'Master Electrician',
      plumber: 'Sanitary Plumber',
      carpenter: 'Furniture Carpenter',
      cleaning: 'Deep Cleaning Specialist',
      appliance: 'Appliance Repair Technician'
    };

    const customProfile: UserProfile = {
      id: `${selectedRole}-${Date.now().toString().slice(-4)}`,
      role: selectedRole,
      name: name.trim() || fallbackProfile.name,
      title: selectedRole === 'customer' 
        ? 'Registered Household Customer' 
        : selectedRole === 'worker' 
        ? `${tradeLabels[trade] || 'Certified Technician'} & Co-owner` 
        : 'Cooperative Society Administrator',
      phone: phone.trim() || fallbackProfile.phone,
      email: `${(name.trim() || 'user').toLowerCase().replace(/\s+/g, '.')}@example.com`,
      avatar: fallbackProfile.avatar,
      locality: locality.trim() || fallbackProfile.locality,
      wardHub: fallbackProfile.wardHub,
      coopId: fallbackProfile.coopId,
      coopName: selectedRole === 'cooperative' && coopName.trim() 
        ? coopName.trim() 
        : fallbackProfile.coopName,
      memberId: fallbackProfile.memberId,
      verificationBadge: fallbackProfile.verificationBadge,
      equityTier: fallbackProfile.equityTier
    };

    onLogin(customProfile);
  };

  // Role pill color styling
  const roleStyles = {
    customer: {
      activeTab: 'bg-blue-600 text-white shadow-xs',
      button: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white',
      border: 'border-blue-500',
      badge: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    worker: {
      activeTab: 'bg-emerald-600 text-white shadow-xs',
      button: 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white',
      border: 'border-emerald-500',
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    cooperative: {
      activeTab: 'bg-purple-700 text-white shadow-xs',
      button: 'bg-purple-700 hover:bg-purple-800 active:bg-purple-900 text-white',
      border: 'border-purple-500',
      badge: 'bg-purple-50 text-purple-800 border-purple-200'
    }
  };

  const currentStyle = roleStyles[selectedRole];

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-start sm:py-6 selection:bg-emerald-500 selection:text-white">
      {/* Mobile Viewport */}
      <div className="w-full max-w-md min-h-screen sm:min-h-[850px] bg-slate-50 border-x border-slate-200 shadow-2xl relative flex flex-col overflow-y-auto sm:rounded-3xl p-5 space-y-4">
        
        {/* Top Clean App Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
              R
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900 block leading-none">
                Rojgar
              </span>
              <span className="text-[10px] font-semibold text-slate-500 block mt-0.5">
                {t.tagline}
              </span>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 text-[11px] font-bold text-slate-700">
            <Globe className="w-3 h-3 text-slate-400 ml-1" />
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-1.5 py-0.5 rounded-lg transition-colors ${currentLang === 'en' ? 'bg-emerald-600 text-white' : 'hover:text-slate-900'}`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('hi')}
              className={`px-1.5 py-0.5 rounded-lg transition-colors ${currentLang === 'hi' ? 'bg-emerald-600 text-white' : 'hover:text-slate-900'}`}
            >
              हिं
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('mr')}
              className={`px-1.5 py-0.5 rounded-lg transition-colors ${currentLang === 'mr' ? 'bg-emerald-600 text-white' : 'hover:text-slate-900'}`}
            >
              मरा
            </button>
          </div>
        </div>

        {/* Auth Mode Toggle: Log In vs Sign Up */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-200/80 rounded-2xl">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              authMode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.auth.loginTab}
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              authMode === 'signup' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.auth.signupTab}
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
            {t.auth.chooseRole}
          </label>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setSelectedRole('customer')}
              className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                selectedRole === 'customer'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="text-[11px] truncate max-w-full">{t.roles.customer}</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('worker')}
              className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                selectedRole === 'worker'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span className="text-[11px] truncate max-w-full">{t.roles.worker}</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('cooperative')}
              className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                selectedRole === 'cooperative'
                  ? 'bg-purple-700 text-white border-purple-700 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span className="text-[11px] truncate max-w-full">{t.roles.cooperative}</span>
            </button>
          </div>
        </div>

        {/* 1-Tap Demo Profile Shortcut Button (Prominent, no list shown) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{currentLang === 'hi' ? 'त्वरित मूल्यांकन पहुँच' : currentLang === 'mr' ? 'जलद मूल्यमापन प्रवेश' : 'Fast Evaluation Access'}</span>
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${currentStyle.badge}`}>
              {selectedRole === 'customer' ? t.roles.customer : selectedRole === 'worker' ? t.roles.worker : t.roles.cooperative}
            </span>
          </div>

          <p className="text-[11px] text-slate-500 leading-snug">
            {t.auth.quickDemoNotice}
          </p>

          <button
            type="button"
            onClick={handleUseDemoProfile}
            className={`w-full py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 ${currentStyle.button}`}
          >
            <span>{t.auth.useDemoBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Or enter with custom credentials form */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-3 text-[11px] font-bold text-slate-400 uppercase">
            {currentLang === 'hi' ? 'या विवरण दर्ज करें' : currentLang === 'mr' ? 'किंवा तपशील भरा' : 'or enter details'}
          </span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Auth Input Form */}
        <form onSubmit={handleSubmitForm} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              {t.auth.fullName}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.auth.fullNamePlaceholder}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              {t.auth.phone}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t.auth.phonePlaceholder}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              {t.auth.locality}
            </label>
            <input
              type="text"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              placeholder={t.auth.localityPlaceholder}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-800"
            />
          </div>

          {/* Conditional field for Worker-Owner */}
          {selectedRole === 'worker' && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t.auth.primaryTrade}
              </label>
              <select
                value={trade}
                onChange={(e) => setTrade(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-800"
              >
                <option value="electrician">{t.trades.electrician}</option>
                <option value="plumber">{t.trades.plumber}</option>
                <option value="carpenter">{t.trades.carpenter}</option>
                <option value="cleaning">{t.trades.cleaning}</option>
                <option value="appliance">{t.trades.appliances}</option>
              </select>
            </div>
          )}

          {/* Conditional field for Cooperative */}
          {selectedRole === 'cooperative' && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t.auth.coopName}
              </label>
              <input
                type="text"
                value={coopName}
                onChange={(e) => setCoopName(e.target.value)}
                placeholder={t.auth.coopNamePlaceholder}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-800"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 mt-2"
          >
            <span>{authMode === 'login' ? t.auth.loginBtn : t.auth.signupBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Footer Guarantee */}
        <div className="text-center py-2">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {currentLang === 'hi' 
                ? 'श्रमिक-स्वामित्व और सहकारी रूप से संचालित' 
                : currentLang === 'mr' 
                ? 'कामगार-मालकी आणि सहकारी नियंत्रित' 
                : 'Worker-Owned & Cooperative Governed'}
            </span>
          </p>
        </div>

      </div>
    </div>
  );
};
