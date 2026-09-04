import React, { useState, useRef, useEffect } from 'react';
import { Bell, RotateCcw, ChevronDown, User, Wrench, Building2, LogOut, Globe } from 'lucide-react';
import { UserRole, UserProfile } from '../../types';
import { AppLanguage, mobileTranslations } from '../../data/mobileTranslations';

interface MobileHeaderProps {
  currentRole: UserRole;
  activeProfile?: UserProfile | null;
  currentLang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  onOpenRoleSelect: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
  onResetData: () => void;
  onLogout: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  currentRole,
  activeProfile,
  currentLang,
  onLanguageChange,
  onOpenRoleSelect,
  onOpenNotifications,
  unreadNotificationsCount,
  onResetData,
  onLogout
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const t = mobileTranslations[currentLang];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setShowLangMenu(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Role pill themes: Customer (Blue), Worker-Owner (Green), Cooperative (Purple)
  const roleBadgeConfig: Record<UserRole, { label: string; icon: React.ReactNode; badgeClass: string }> = {
    customer: {
      label: activeProfile ? activeProfile.name.split(' ')[0] : t.roles.customer,
      icon: <User className="w-3.5 h-3.5 text-blue-700 shrink-0" />,
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
    },
    worker: {
      label: activeProfile ? activeProfile.name.split(' ')[0] : t.roles.worker,
      icon: <Wrench className="w-3.5 h-3.5 text-emerald-700 shrink-0" />,
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
    },
    cooperative: {
      label: activeProfile ? activeProfile.name.split(' ')[0] : t.roles.cooperative,
      icon: <Building2 className="w-3.5 h-3.5 text-purple-800 shrink-0" />,
      badgeClass: 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100'
    }
  };

  const currentBadge = roleBadgeConfig[currentRole];

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-3 py-2 shadow-xs">
      <div className="flex items-center justify-between gap-1">
        
        {/* Left: Rojgar Brand Name & Tagline */}
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-xs shrink-0">
            R
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-base font-black tracking-tight text-slate-900 leading-none">
              Rojgar
            </span>
            <span className="text-[9px] font-medium text-slate-500 tracking-tight leading-none mt-0.5 truncate">
              {t.tagline}
            </span>
          </div>
        </div>

        {/* Right Actions: Clean Language Dropdown + Role Pill + Bell + Logout */}
        <div className="flex items-center gap-1 shrink-0">
          
          {/* Language Selector Dropdown */}
          <div className="relative" ref={langMenuRef}>
            <button
              type="button"
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="inline-flex items-center gap-0.5 px-2 py-1 rounded-lg text-[11px] font-bold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Change Language"
            >
              <Globe className="w-3 h-3 text-slate-500" />
              <span>{currentLang === 'en' ? 'EN' : currentLang === 'hi' ? 'हिं' : 'मरा'}</span>
              <ChevronDown className="w-2.5 h-2.5 opacity-60" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-1 w-28 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    onLanguageChange('en');
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 font-medium transition-colors ${
                    currentLang === 'en' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  English (EN)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLanguageChange('hi');
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 font-medium transition-colors ${
                    currentLang === 'hi' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  हिंदी (HI)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLanguageChange('mr');
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 font-medium transition-colors ${
                    currentLang === 'mr' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  मराठी (MR)
                </button>
              </div>
            )}
          </div>

          {/* Role Indicator Pill with distinct role theme */}
          <button
            type="button"
            onClick={onOpenRoleSelect}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold border shadow-2xs transition-all active:scale-95 ${currentBadge.badgeClass}`}
            title="Switch portal role"
          >
            {activeProfile?.avatar ? (
              <img 
                src={activeProfile.avatar} 
                alt="" 
                className="w-3.5 h-3.5 rounded-full object-cover shrink-0" 
              />
            ) : (
              currentBadge.icon
            )}
            <span className="truncate max-w-[65px]">{currentBadge.label}</span>
            <ChevronDown className="w-2.5 h-2.5 opacity-60" />
          </button>

          {/* Notifications Bell */}
          <button
            type="button"
            onClick={onOpenNotifications}
            className="relative p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors focus:outline-none"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[14px] h-[14px] px-0.5 bg-rose-600 text-white rounded-full text-[9px] font-black flex items-center justify-center border border-white shadow-xs">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Switch Profile / Logout Button */}
          <button
            type="button"
            onClick={onLogout}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none"
            title={t.auth.logout}
            aria-label={t.auth.logout}
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>

          {/* Reset Demo Button */}
          <button
            type="button"
            onClick={() => {
              if (window.confirm(t.header.resetConfirm)) {
                onResetData();
              }
            }}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none"
            title={t.header.resetState}
            aria-label={t.header.resetState}
          >
            <RotateCcw className="w-3 h-3" />
          </button>

        </div>

      </div>
    </header>
  );
};
