import React from 'react';
import { 
  Home, 
  Search, 
  Calendar, 
  Star, 
  LifeBuoy, 
  Briefcase, 
  Radio, 
  ShieldAlert, 
  UserCheck, 
  LayoutDashboard, 
  Users,
  FileText 
} from 'lucide-react';
import { UserRole } from '../../types';
import { AppLanguage, mobileTranslations } from '../../data/mobileTranslations';

interface BottomTabBarProps {
  currentRole: UserRole;
  currentLang?: AppLanguage;
  activeTab: string;
  onTabChange: (tab: string) => void;
  badgeCounts: {
    customerBookings?: number;
    workerJobs?: number;
    workerRequests?: number;
    coopDisputes?: number;
  };
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  currentRole,
  currentLang = 'en',
  activeTab,
  onTabChange,
  badgeCounts
}) => {
  const t = mobileTranslations[currentLang];

  // Distinct portal color schemes: Customer (Blue), Worker-Owner (Green), Cooperative (Purple)
  const roleTheme = {
    customer: {
      activeText: 'text-blue-600 font-bold',
      indicator: 'bg-blue-600',
      badge: 'bg-blue-600'
    },
    worker: {
      activeText: 'text-emerald-600 font-bold',
      indicator: 'bg-emerald-600',
      badge: 'bg-emerald-600'
    },
    cooperative: {
      activeText: 'text-purple-700 font-bold',
      indicator: 'bg-purple-700',
      badge: 'bg-purple-700'
    }
  }[currentRole];

  const getTabsForRole = () => {
    switch (currentRole) {
      case 'customer':
        return [
          { id: 'home', label: t.tabs.home, icon: <Home className="w-5 h-5" /> },
          { id: 'book', label: t.tabs.book, icon: <Search className="w-5 h-5" /> },
          { 
            id: 'bookings', 
            label: t.tabs.bookings, 
            icon: <Calendar className="w-5 h-5" />, 
            badge: badgeCounts.customerBookings && badgeCounts.customerBookings > 0 ? badgeCounts.customerBookings : undefined 
          },
          { id: 'invoices', label: t.tabs.invoices, icon: <FileText className="w-5 h-5" /> },
          { id: 'support', label: t.tabs.support, icon: <LifeBuoy className="w-5 h-5" /> }
        ];

      case 'worker':
        return [
          { 
            id: 'jobs', 
            label: t.tabs.jobs, 
            icon: <Briefcase className="w-5 h-5" />, 
            badge: badgeCounts.workerJobs && badgeCounts.workerJobs > 0 ? badgeCounts.workerJobs : undefined 
          },
          { 
            id: 'requests', 
            label: t.tabs.requests, 
            icon: <Radio className="w-5 h-5" />, 
            badge: badgeCounts.workerRequests && badgeCounts.workerRequests > 0 ? badgeCounts.workerRequests : undefined 
          },
          { id: 'reviews', label: t.tabs.reviews, icon: <Star className="w-5 h-5" /> },
          { id: 'disputes', label: t.tabs.disputes, icon: <ShieldAlert className="w-5 h-5" /> },
          { id: 'profile', label: t.tabs.profile, icon: <UserCheck className="w-5 h-5" /> }
        ];

      case 'cooperative':
        return [
          { id: 'overview', label: t.tabs.overview, icon: <LayoutDashboard className="w-5 h-5" /> },
          { id: 'members', label: t.tabs.members, icon: <Users className="w-5 h-5" /> },
          { id: 'bookings', label: t.tabs.bookings, icon: <Calendar className="w-5 h-5" /> },
          { 
            id: 'disputes', 
            label: t.tabs.disputes, 
            icon: <ShieldAlert className="w-5 h-5" />, 
            badge: badgeCounts.coopDisputes && badgeCounts.coopDisputes > 0 ? badgeCounts.coopDisputes : undefined 
          },
          { id: 'reviews', label: t.tabs.reviews, icon: <Star className="w-5 h-5" /> }
        ];
    }
  };

  const tabs = getTabsForRole();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1 px-2 shadow-lg max-w-md mx-auto">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all duration-150 active:scale-90 flex-1 min-w-0 ${
                isActive
                  ? roleTheme.activeText
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              {/* Icon Container with Badge */}
              <div className="relative">
                <div className={`${isActive ? 'scale-110' : 'text-slate-400'} transition-transform`}>
                  {tab.icon}
                </div>
                {tab.badge !== undefined && (
                  <span className={`absolute -top-1.5 -right-2 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-pulse ${roleTheme.badge}`}>
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-full">
                {tab.label}
              </span>

              {/* Active Indicator Bar */}
              {isActive && (
                <span className={`w-4 h-0.5 rounded-full mt-0.5 ${roleTheme.indicator}`} />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
