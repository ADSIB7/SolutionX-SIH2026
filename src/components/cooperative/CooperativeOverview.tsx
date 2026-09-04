import React, { useState } from 'react';
import { Booking, Dispute, Review, DemandForecast, WorkforceAllocation } from '../../types';
import { mockDemandForecasts, mockWorkforceAllocations } from '../../data/mockAppData';
import { 
  Building2, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  AlertCircle, 
  Star, 
  IndianRupee, 
  ChevronRight, 
  UserPlus, 
  Award, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  BrainCircuit, 
  MapPin, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';
import { AppLanguage, mobileTranslations, getLocalizedTrade } from '../../data/mobileTranslations';

interface CooperativeOverviewProps {
  bookings: Booking[];
  disputes: Dispute[];
  reviews: Review[];
  onNavigateTab: (tab: string) => void;
  onOpenAddMember: () => void;
  currentLang?: AppLanguage;
}

export const CooperativeOverview: React.FC<CooperativeOverviewProps> = ({
  bookings,
  disputes,
  reviews,
  onNavigateTab,
  onOpenAddMember,
  currentLang = 'en'
}) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'ai_forecast'>('overview');
  const [forecasts, setForecasts] = useState<DemandForecast[]>(mockDemandForecasts);
  const [allocations, setAllocations] = useState<WorkforceAllocation[]>(mockWorkforceAllocations);
  const [rebalanceToast, setRebalanceToast] = useState<string | null>(null);
  const t = mobileTranslations[currentLang];

  const activeBookingsCount = bookings.filter(b => ['accepted', 'active', 'in_progress'].includes(b.status)).length;
  const pendingRequestsCount = bookings.filter(b => b.status === 'requested').length;
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const openDisputesCount = disputes.filter(d => d.status !== 'resolved').length;

  // Dynamic calculation of retained reserve fund
  const dynamicReserveFund = 142800 + completedBookings.reduce((acc, b) => acc + b.coopFund, 0);

  const handleSimulateRebalance = () => {
    setAllocations(prev => prev.map(a => {
      if (a.ward.includes('14')) {
        return {
          ...a,
          assignedWorkersCount: a.assignedWorkersCount + 4,
          utilizationRate: 82,
          status: 'Optimal',
          suggestedAction: currentLang === 'hi' 
            ? 'वार्ड 12 से 4 आरक्षित तकनीशियन जुटाए गए। ईटीए <12 मिनट पर स्थिर।' 
            : currentLang === 'mr' 
            ? 'वॉर्ड 12 मधून 4 राखीव तंत्रज्ञ तैनात केले. ईटीए <12 मिनिटांवर स्थिर.' 
            : '4 reserve technicians mobilized from Ward 12. ETA stabilized at <12m.'
        };
      }
      return a;
    }));

    const toastMsg = currentLang === 'hi' 
      ? 'एआई पुनर्संतुलन प्रेषित: वार्ड 14 में 4 तकनीशियन तैनात किए गए। काम का समान वितरण।'
      : currentLang === 'mr'
      ? 'एआय पुनर्संतुलन पाठवले: वॉर्ड 14 मध्ये 4 तंत्रज्ञ नियुक्त केले. कामाचे समान वाटप.'
      : 'AI Rebalance Dispatched: 4 technicians assigned to Ward 14. Zero worker burnout.';
    setRebalanceToast(toastMsg);
    setTimeout(() => setRebalanceToast(null), 4000);
  };

  const getLocalizedForecastReason = (reason: string) => {
    if (reason.includes('Evening peak')) {
      return currentLang === 'hi'
        ? 'शाम के व्यस्त समय में वापसी। एसी व ट्रिपिंग मरम्मत की अधिक मांग अपेक्षित।'
        : currentLang === 'mr'
        ? 'संध्याकाळच्या गर्दीच्या वेळेत परतणे. एसी व ट्रिपिंग दुरुस्तीची जास्त मागणी अपेक्षित.'
        : reason;
    }
    if (reason.includes('Post-office')) {
      return currentLang === 'hi'
        ? 'कार्यालय उपरांत नियमित मरम्मत और प्रकाश व्यवस्था रखरखाव अनुरोध।'
        : currentLang === 'mr'
        ? 'कार्यालय संपल्यानंतर नियमित दुरुस्ती आणि रोषणाई देखभाल विनंत्या.'
        : reason;
    }
    return reason;
  };

  const getLocalizedAction = (action: string) => {
    if (action.includes('Optimal balance')) {
      return currentLang === 'hi'
        ? 'संतुलित आवंटन। 12 मिनट से कम का प्रतिक्रिया समय।'
        : currentLang === 'mr'
        ? 'संतुलित वाटप. १२ मिनिटांपेक्षा कमी प्रतिसाद वेळ.'
        : action;
    }
    if (action.includes('mobilized')) {
      return currentLang === 'hi'
        ? 'वार्ड 12 से तकनीशियन जुटाए गए।'
        : currentLang === 'mr'
        ? 'वॉर्ड 12 मधून तंत्रज्ञ तैनात केले.'
        : action;
    }
    return action;
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Cooperative Ward Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-950 text-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> {t.cooperative.overview.hubWard}
            </span>
            <span className="text-[10px] bg-purple-800/60 border border-purple-500/40 px-2 py-0.5 rounded-full font-semibold text-purple-100">
              {t.cooperative.overview.regNumber}
            </span>
          </div>

          <h2 className="text-base sm:text-lg font-extrabold text-white mt-2">
            {t.cooperative.overview.societyName}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            {t.cooperative.overview.collectiveSubtitle}
          </p>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-700 text-center">
            <div className="bg-white/5 rounded-xl p-2 border border-white/10">
              <div className="text-lg font-black text-white">48</div>
              <div className="text-[10px] text-slate-300">{t.cooperative.overview.memberOwners}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-2 border border-white/10">
              <div className="text-lg font-black text-purple-300">36</div>
              <div className="text-[10px] text-purple-200">{t.cooperative.overview.onActiveDuty}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-2 border border-white/10">
              <div className="text-lg font-black text-amber-400">4.93★</div>
              <div className="text-[10px] text-amber-200">{t.cooperative.overview.wardQuality}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-navigation: Operations vs Smart Demand Allocation */}
      <div className="flex gap-2 p-1 bg-slate-200/80 rounded-xl text-xs font-bold text-slate-600">
        <button
          onClick={() => setActiveSection('overview')}
          className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeSection === 'overview' ? 'bg-white text-purple-950 shadow-xs' : 'hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-purple-700" />
          <span>{t.cooperative.overview.wardOperations}</span>
        </button>
        <button
          onClick={() => setActiveSection('ai_forecast')}
          className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeSection === 'ai_forecast' ? 'bg-white text-purple-900 shadow-xs' : 'hover:text-slate-900'
          }`}
        >
          <BrainCircuit className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
          <span>{t.cooperative.overview.smartDemandTab}</span>
        </button>
      </div>

      {/* SECTION 1: WARD OPERATIONS */}
      {activeSection === 'overview' && (
        <div className="space-y-4">
          {/* Operational Attention Alerts */}
          {openDisputesCount > 0 && (
            <div 
              onClick={() => onNavigateTab('disputes')}
              className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer hover:bg-rose-100/70 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-rose-900">
                    {t.cooperative.overview.grievanceAlert.replace('{count}', String(openDisputesCount))}
                  </div>
                  <div className="text-[11px] text-rose-700">{t.cooperative.overview.grievanceAlertDesc}</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-rose-700" />
            </div>
          )}

          {/* Primary Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div 
              onClick={() => onNavigateTab('bookings')}
              className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-sm space-y-1.5 cursor-pointer hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.cooperative.overview.activeJobs}</span>
                <Briefcase className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">{activeBookingsCount}</div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-600" /> {t.cooperative.overview.newIncoming.replace('{count}', String(pendingRequestsCount))}
              </div>
            </div>

            <div 
              onClick={() => onNavigateTab('members')}
              className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-sm space-y-1.5 cursor-pointer hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.cooperative.overview.workerOwners}</span>
                <Users className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">48</div>
              <div className="text-[11px] text-slate-400">{t.cooperative.overview.democraticVoting}</div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-sm space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.cooperative.overview.retainedReserve}</span>
                <IndianRupee className="w-4 h-4 text-teal-600" />
              </div>
              <div className="text-2xl font-black text-emerald-700">₹{dynamicReserveFund.toLocaleString('en-IN')}</div>
              <div className="text-[11px] text-slate-400">{t.cooperative.overview.coopSocialFund}</div>
            </div>

            <div 
              onClick={() => onNavigateTab('reviews')}
              className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-sm space-y-1.5 cursor-pointer hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.cooperative.overview.reviews}</span>
                <Star className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-black text-slate-900">{reviews.length + 140}</div>
              <div className="text-[11px] text-emerald-600 font-semibold">{t.cooperative.overview.positiveRating}</div>
            </div>
          </div>

          {/* Quick Governance & Management Actions */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.cooperative.overview.cooperativeOperations}
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onOpenAddMember}
                className="p-3 bg-purple-50 hover:bg-purple-100 text-purple-900 rounded-xl text-left border border-purple-200 transition-colors flex flex-col justify-between h-20"
              >
                <UserPlus className="w-4 h-4 text-purple-700" />
                <div>
                  <div className="text-xs font-bold">{t.cooperative.overview.enrollMember}</div>
                  <div className="text-[10px] text-purple-700">{t.cooperative.overview.enrollMemberDesc}</div>
                </div>
              </button>

              <button
                onClick={() => onNavigateTab('disputes')}
                className="p-3 bg-purple-50 hover:bg-purple-100 text-purple-900 rounded-xl text-left border border-purple-200 transition-colors flex flex-col justify-between h-20"
              >
                <ShieldCheck className="w-4 h-4 text-purple-700" />
                <div>
                  <div className="text-xs font-bold">{t.cooperative.overview.peerCouncil}</div>
                  <div className="text-[10px] text-purple-700">{t.cooperative.overview.peerCouncilDesc}</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: SMART DEMAND ALLOCATION */}
      {activeSection === 'ai_forecast' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* AI Banner */}
          <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-2xl p-4 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" /> {t.cooperative.overview.smartSuiteBadge}
              </span>
              <span className="text-[10px] bg-purple-800/80 px-2 py-0.5 rounded-full border border-purple-500/30 font-semibold">
                {t.cooperative.overview.predictiveModel}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white">{t.cooperative.overview.aiHeadline}</h3>
            <p className="text-xs text-purple-200 leading-relaxed">
              {t.cooperative.overview.aiDescription}
            </p>
          </div>

          {/* Rebalance Toast */}
          {rebalanceToast && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{rebalanceToast}</span>
            </div>
          )}

          {/* Forecast Time Slots */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {t.cooperative.overview.hourlyDemandTitle}
              </h4>
              <span className="text-[10px] text-slate-400">{t.cooperative.overview.next12Hours}</span>
            </div>

            <div className="space-y-2.5">
              {forecasts.map((f, i) => (
                <div 
                  key={i}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{f.hourSlot}</span>
                      <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-md font-semibold text-slate-700">
                        {getLocalizedTrade(f.trade, currentLang)}
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      f.expectedDemandLevel === 'Surge Peak' 
                        ? 'bg-rose-100 text-rose-800' 
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {f.expectedDemandLevel === 'Surge Peak' 
                        ? (currentLang === 'hi' ? 'चरम मांग' : currentLang === 'mr' ? 'कमाल मागणी' : 'Surge Peak') 
                        : (currentLang === 'hi' ? 'सामान्य मांग' : currentLang === 'mr' ? 'सामान्य मागणी' : 'Normal')}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-snug">
                    {getLocalizedForecastReason(f.predictedReason)}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                    <span>{t.cooperative.overview.activeVsRecommended.replace('{active}', String(f.activeWorkers)).replace('{recommended}', String(f.recommendedWorkers))}</span>
                    {f.gapOrSurplus < 0 ? (
                      <span className="text-rose-600 font-bold">
                        {t.cooperative.overview.technicianShortfall.replace('{count}', String(Math.abs(f.gapOrSurplus)))}
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-bold">{t.cooperative.overview.adequateCapacity}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Allocation Rebalancing Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {t.cooperative.overview.crossWardTitle}
              </h4>
              <button
                onClick={handleSimulateRebalance}
                className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold px-3 py-1 rounded-xl border border-purple-200 flex items-center gap-1 transition-colors"
              >
                <Sparkles className="w-3 h-3 text-purple-600" />
                <span>{t.cooperative.overview.autoRebalanceBtn}</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {allocations.map((a, i) => (
                <div key={i} className="p-3 rounded-xl border border-slate-100 bg-slate-50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{a.ward}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      a.status === 'Optimal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {a.status === 'Optimal' 
                        ? (currentLang === 'hi' ? 'इष्टतम' : currentLang === 'mr' ? 'इष्टतम' : 'Optimal') 
                        : (currentLang === 'hi' ? 'संतुलित' : currentLang === 'mr' ? 'संतुलित' : a.status)}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    {currentLang === 'hi' ? 'कौशल: ' : currentLang === 'mr' ? 'कौशल्य: ' : 'Trade: '}<strong>{getLocalizedTrade(a.trade, currentLang)}</strong> • {t.cooperative.overview.assigned.replace('{count}', String(a.assignedWorkersCount))} • {t.cooperative.overview.utilization.replace('{rate}', String(a.utilizationRate))}
                  </div>
                  <p className="text-[10px] text-indigo-900 bg-indigo-50/80 p-1.5 rounded-lg border border-indigo-100 mt-1">
                    💡 {getLocalizedAction(a.suggestedAction)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cooperative Principles Card */}
      <div className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 space-y-2">
        <div className="font-bold text-slate-800 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-emerald-600" /> {t.cooperative.overview.platformGovTitle}
        </div>
        <p className="leading-relaxed text-[11px]">
          {t.cooperative.overview.platformGovDesc}
        </p>
      </div>
    </div>
  );
};
