import React from 'react';
import { 
  MapPin, 
  Search, 
  Calendar, 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  Star, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Droplet,
  Wrench,
  ChevronRight
} from 'lucide-react';
import { CustomerProfile, Booking, Worker } from '../../types';
import { mockWorkers } from '../../data/workersData';
import { 
  AppLanguage, 
  mobileTranslations, 
  getLocalizedTrade, 
  getLocalizedTask, 
  getLocalizedSlot 
} from '../../data/mobileTranslations';

interface CustomerHomeProps {
  customer: CustomerProfile;
  bookings: Booking[];
  currentLang?: AppLanguage;
  onNavigateTab: (tab: string) => void;
  onSelectWorkerForBooking: (worker: Worker) => void;
}

export const CustomerHome: React.FC<CustomerHomeProps> = ({
  customer,
  bookings,
  currentLang = 'en',
  onNavigateTab,
  onSelectWorkerForBooking
}) => {
  const t = mobileTranslations[currentLang];

  // Find current active / pending booking if any
  const currentActiveBooking = bookings.find(
    b => b.status === 'requested' || b.status === 'accepted' || b.status === 'in_progress'
  );

  const topWorkers = mockWorkers.slice(0, 4);

  return (
    <div className="p-4 space-y-5 pb-24 animate-in fade-in duration-200">
      
      {/* Top Greeting & Locality Card */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between relative z-10">
          <div>
            <span className="text-xs font-semibold text-blue-200 block">{t.customer.home.greeting}</span>
            <h2 className="text-xl font-black tracking-tight text-white">{customer.name}</h2>
          </div>
          <img
            src={customer.avatar}
            alt={customer.name}
            className="w-11 h-11 rounded-full object-cover border-2 border-blue-300/60 shadow-sm"
          />
        </div>

        {/* Locality Selector Pill */}
        <div className="mt-3.5 pt-3 border-t border-blue-700/60 flex items-center justify-between text-xs text-blue-100">
          <div className="flex items-center gap-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-blue-300 shrink-0" />
            <span>{t.customer.home.wardHub} <strong>{customer.locality}</strong></span>
          </div>
          <span className="text-[10px] bg-blue-950/70 text-blue-200 px-2 py-0.5 rounded-full border border-blue-600/40">
            {t.customer.home.zone}
          </span>
        </div>
      </div>

      {/* Current Active Booking Banner (if present) */}
      {currentActiveBooking && (
        <div className="bg-white rounded-2xl p-4 border border-blue-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              {currentActiveBooking.status === 'requested' && t.customer.home.waitingWorker}
              {currentActiveBooking.status === 'accepted' && t.customer.home.workerEnRoute}
              {currentActiveBooking.status === 'in_progress' && t.customer.home.workUnderway}
            </span>
            <span className="text-xs font-bold text-slate-800">#{currentActiveBooking.id}</span>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={currentActiveBooking.workerPhoto}
              alt={currentActiveBooking.workerName}
              className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 truncate">
                {currentActiveBooking.workerName}
              </h4>
              <p className="text-xs text-slate-600 truncate">{getLocalizedTask(currentActiveBooking.taskDescription, currentLang)}</p>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                <span className="text-blue-700 font-semibold">{getLocalizedTrade(currentActiveBooking.workerTrade, currentLang)}</span>
                <span>•</span>
                <span>{getLocalizedSlot(currentActiveBooking.scheduledSlot, currentLang)}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('bookings')}
            className="w-full py-2 px-3 rounded-xl text-xs font-bold text-blue-800 bg-blue-50 hover:bg-blue-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{t.customer.home.trackStatus}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 3 Quick Action Cards */}
      <div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">
          {t.customer.home.quickActions}
        </h3>
        <div className="grid grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => onNavigateTab('book')}
            className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:shadow-xs transition-all active:scale-95 text-center cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 leading-tight">{t.customer.home.bookWorker}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('bookings')}
            className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:shadow-xs transition-all active:scale-95 text-center cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 leading-tight">{t.customer.home.myBookings}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('support')}
            className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:shadow-xs transition-all active:scale-95 text-center cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 leading-tight">{t.customer.home.raiseDispute}</span>
          </button>
        </div>
      </div>

      {/* Nearby Verified Worker-Owners */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            {t.customer.home.nearbyWorkers}
          </h3>
          <button
            type="button"
            onClick={() => onNavigateTab('book')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
          >
            <span>{t.customer.home.viewAll}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {topWorkers.map((worker) => (
            <div
              key={worker.id}
              className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between gap-3 hover:border-blue-300 transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={worker.photo}
                    alt={worker.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-600 rounded-full border border-white text-white text-[9px] flex items-center justify-center">
                    ✓
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{worker.name}</h4>
                  </div>
                  <p className="text-xs text-blue-700 font-medium truncate">{getLocalizedTrade(worker.primaryTradeLabel, currentLang)}</p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    <span className="flex items-center text-amber-600 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                      {worker.rating}
                    </span>
                    <span>•</span>
                    <span>{worker.etaMinutes} {t.customer.home.minsAway}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-900">₹{worker.baseVisitFee}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectWorkerForBooking(worker)}
                className="shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-2xs cursor-pointer"
              >
                {t.customer.home.requestBtn}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cooperative Guarantee Pill */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/80 space-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0" />
          <span className="text-xs font-bold text-slate-900">
            {t.customer.home.guaranteeTitle}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-blue-700" />
            <span>{t.customer.home.guaranteePoint1}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-blue-700" />
            <span>{t.customer.home.guaranteePoint2}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            <span>{t.customer.home.guaranteePoint3}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            <span>{t.customer.home.guaranteePoint4}</span>
          </div>
        </div>
      </div>

    </div>
  );
};
