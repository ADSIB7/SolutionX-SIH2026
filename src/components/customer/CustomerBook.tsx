import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  Radio, 
  AlertCircle, 
  Sparkles,
  Building2,
  Phone
} from 'lucide-react';
import { Worker, Booking, CustomerProfile } from '../../types';
import { mockWorkers } from '../../data/workersData';
import { 
  AppLanguage, 
  mobileTranslations, 
  getLocalizedTrade, 
  getLocalizedSlot, 
  getLocalizedTask 
} from '../../data/mobileTranslations';

interface CustomerBookProps {
  customer: CustomerProfile;
  currentLang?: AppLanguage;
  initialSelectedWorker?: Worker | null;
  onClearInitialWorker?: () => void;
  onCreateBooking: (newBooking: Booking) => void;
  onNavigateTab: (tab: string) => void;
}

export const CustomerBook: React.FC<CustomerBookProps> = ({
  customer,
  currentLang = 'en',
  initialSelectedWorker,
  onClearInitialWorker,
  onCreateBooking,
  onNavigateTab
}) => {
  const t = mobileTranslations[currentLang];
  const [selectedLocality, setSelectedLocality] = useState('Kothrud, Pune');
  const [selectedTrade, setSelectedTrade] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selection & Request State
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(initialSelectedWorker || null);
  const [isDrafting, setIsDrafting] = useState(false);
  
  // Form fields
  const [taskDescription, setTaskDescription] = useState('');
  const [scheduledSlot, setScheduledSlot] = useState('Immediate (within 30 mins)');
  const [address, setAddress] = useState('Flat 402, Shanti Heights, Paud Road, Kothrud');
  
  // 5-Min Countdown active state for prototype demo
  const [activeRequestedBooking, setActiveRequestedBooking] = useState<Booking | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(300); // 5 mins

  useEffect(() => {
    if (initialSelectedWorker) {
      setSelectedWorker(initialSelectedWorker);
      setIsDrafting(true);
    }
  }, [initialSelectedWorker]);

  // Countdown timer for request
  useEffect(() => {
    if (!activeRequestedBooking) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleExpireRequest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeRequestedBooking]);

  const trades = [
    { id: 'all', label: t.trades.all },
    { id: 'electrician', label: t.trades.electrician },
    { id: 'plumber', label: t.trades.plumber },
    { id: 'cleaning', label: t.trades.cleaning },
    { id: 'carpenter', label: t.trades.carpenter },
    { id: 'painting', label: t.trades.painting },
    { id: 'appliances', label: t.trades.appliances }
  ];

  const localities = [
    'Kothrud, Pune',
    'Baner / Wakad, Pune',
    'Viman Nagar, Pune',
    'Hadapsar, Pune',
    'Aundh, Pune'
  ];

  // Filter workers
  const filteredWorkers = mockWorkers.filter((w) => {
    const matchesTrade = selectedTrade === 'all' || w.primaryTrade === selectedTrade;
    const matchesQuery = 
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.primaryTradeLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (w.cooperativeSociety && w.cooperativeSociety.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTrade && matchesQuery;
  });

  const handleStartDrafting = (worker: Worker) => {
    setSelectedWorker(worker);
    setIsDrafting(true);
  };

  const handleCloseDrafting = () => {
    setIsDrafting(false);
    setSelectedWorker(null);
    if (onClearInitialWorker) onClearInitialWorker();
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorker) return;

    const baseFee = selectedWorker.baseVisitFee;
    const coopFund = 15;
    const total = baseFee + coopFund;
    const payout = Math.round(baseFee * 0.88);

    const newBooking: Booking = {
      id: `BKG-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: customer.id,
      customerName: customer.name,
      customerPhone: customer.phone,
      workerId: selectedWorker.id,
      workerName: selectedWorker.name,
      workerPhoto: selectedWorker.photo,
      workerTrade: selectedWorker.primaryTradeLabel,
      coopId: 'coop-pune-central',
      coopName: selectedWorker.cooperativeSociety || 'Pune Central Electricians Cooperative Society Ltd.',
      taskDescription: taskDescription || 'General diagnostic inspection & repair',
      category: selectedWorker.primaryTrade,
      locality: selectedLocality,
      address: address,
      scheduledSlot: scheduledSlot,
      baseFee: baseFee,
      totalAmount: total,
      workerPayout: payout,
      coopFund: coopFund,
      status: 'requested',
      timeline: [
        {
          status: 'requested',
          label: 'Request Dispatched',
          timestamp: 'Just now',
          note: `Sent directly to ${selectedWorker.name} with a live 5-minute decision window.`
        }
      ],
      createdAt: Date.now()
    };

    onCreateBooking(newBooking);
    setIsDrafting(false);
    setActiveRequestedBooking(newBooking);
    setSecondsLeft(300);
  };

  // Demo actions during the 5-minute decision window
  const handleAcceptRequest = () => {
    if (!activeRequestedBooking) return;
    const acceptedBooking: Booking = {
      ...activeRequestedBooking,
      status: 'active',
      timeline: [
        ...activeRequestedBooking.timeline,
        {
          status: 'accepted',
          label: 'Worker Accepted Request',
          timestamp: 'Just now',
          note: `${activeRequestedBooking.workerName} confirmed arrival for ${activeRequestedBooking.scheduledSlot}.`
        }
      ]
    };
    onCreateBooking(acceptedBooking);
    setActiveRequestedBooking(null);
    onNavigateTab('bookings');
  };

  const handleDeclineRequest = () => {
    if (!activeRequestedBooking) return;
    const declinedBooking: Booking = {
      ...activeRequestedBooking,
      status: 'declined',
      timeline: [
        ...activeRequestedBooking.timeline,
        {
          status: 'declined',
          label: 'Worker Unavailable',
          timestamp: 'Just now',
          note: `${activeRequestedBooking.workerName} is currently on an active emergency job.`
        }
      ]
    };
    onCreateBooking(declinedBooking);
    setActiveRequestedBooking(null);
  };

  const handleExpireRequest = () => {
    if (!activeRequestedBooking) return;
    const expiredBooking: Booking = {
      ...activeRequestedBooking,
      status: 'expired',
      timeline: [
        ...activeRequestedBooking.timeline,
        {
          status: 'expired',
          label: 'Window Expired',
          timestamp: 'Just now',
          note: 'No response received within 5 minutes. No cancellation fee charged.'
        }
      ]
    };
    onCreateBooking(expiredBooking);
    setActiveRequestedBooking(null);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 space-y-4 pb-24 animate-in fade-in duration-200">
      
      {/* Search & Locality Selector */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.customer.book.selectWardHub}</span>
          </div>
          <select
            value={selectedLocality}
            onChange={(e) => setSelectedLocality(e.target.value)}
            className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none"
          >
            {localities.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.customer.book.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Trade Category Horizontal Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {trades.map((trade) => {
            const isSelected = selectedTrade === trade.id;
            return (
              <button
                key={trade.id}
                type="button"
                onClick={() => setSelectedTrade(trade.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {trade.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Workers List Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>{t.customer.book.workersNearbyCount.replace('{count}', String(filteredWorkers.length))}</span>
        <span>{t.customer.book.sortedBy}</span>
      </div>

      {/* Workers Cards */}
      <div className="space-y-3">
        {filteredWorkers.map((worker) => (
          <div
            key={worker.id}
            className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs hover:border-blue-300 transition-all space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="relative shrink-0">
                <img
                  src={worker.photo}
                  alt={worker.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                  ✓
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{worker.name}</h4>
                  <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg shrink-0">
                    ₹{worker.baseVisitFee}
                  </span>
                </div>

                <p className="text-xs text-blue-700 font-semibold truncate">{getLocalizedTrade(worker.primaryTradeLabel, currentLang)}</p>
                
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                  <span className="flex items-center text-amber-600 font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                    {worker.rating}
                  </span>
                  <span>•</span>
                  <span>{worker.completedJobs} {t.customer.home.jobsDone}</span>
                  <span>•</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {worker.etaMinutes}m ({worker.distanceKm}km)
                  </span>
                </div>
              </div>
            </div>

            {/* Cooperative Affiliation Tag */}
            {worker.cooperativeSociety && (
              <div className="bg-blue-50/70 px-3 py-1.5 rounded-xl border border-blue-100 flex items-center justify-between text-[11px] text-blue-900">
                <div className="flex items-center gap-1.5 truncate">
                  <Building2 className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  <span className="truncate">{worker.cooperativeSociety}</span>
                </div>
                <span className="text-[9.5px] font-bold text-blue-800 bg-white px-1.5 py-0.5 rounded border border-blue-200 shrink-0 ml-1">
                  {t.customer.book.coopBadge}
                </span>
              </div>
            )}

            {/* Skills pills */}
            <div className="flex flex-wrap gap-1">
              {worker.skills.slice(0, 3).map((skill, idx) => (
                <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                  {skill}
                </span>
              ))}
            </div>

            {/* Action button */}
            <button
              type="button"
              onClick={() => handleStartDrafting(worker)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <span>{t.customer.book.sendRequestBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Sheet: Request Form */}
      {isDrafting && selectedWorker && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Sheet Header */}
            <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={selectedWorker.photo}
                  alt={selectedWorker.name}
                  className="w-9 h-9 rounded-xl object-cover border border-white/20"
                />
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">
                    {t.customer.book.requestWorker.replace('{name}', selectedWorker.name)}
                  </h4>
                  <p className="text-[11px] text-blue-300">
                    {getLocalizedTrade(selectedWorker.primaryTradeLabel, currentLang)} • {selectedWorker.etaMinutes} {t.customer.home.minsAway}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseDrafting}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form inputs */}
            <form onSubmit={handleSubmitRequest} className="p-4 space-y-3.5 overflow-y-auto">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.customer.book.describeTask}
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder={t.customer.book.describeTaskPlaceholder}
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.customer.book.preferredSlot}
                </label>
                <select
                  value={scheduledSlot}
                  onChange={(e) => setScheduledSlot(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                >
                  <option value="Immediate (within 30 mins)">{t.customer.book.slotImmediate}</option>
                  <option value="Today, 2:00 PM - 3:00 PM">{t.customer.book.slotAfternoon}</option>
                  <option value="Today, 5:00 PM - 6:00 PM">{t.customer.book.slotEvening}</option>
                  <option value="Tomorrow Morning (9:00 AM - 11:00 AM)">{t.customer.book.slotTomorrow}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.customer.book.serviceAddress}
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              {/* Transparent Cooperative Rate Breakdown */}
              <div className="bg-blue-50/80 p-3.5 rounded-2xl border border-blue-200/80 space-y-2 text-xs">
                <span className="font-bold text-blue-900 block">{t.customer.book.transparentPricing}</span>
                
                <div className="flex justify-between text-slate-600">
                  <span>{t.customer.book.baseVisit}</span>
                  <span>₹{selectedWorker.baseVisitFee}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{t.customer.book.coopSafetyFund}</span>
                  <span>₹15</span>
                </div>
                <div className="pt-2 border-t border-blue-200 flex justify-between font-bold text-slate-900">
                  <span>{t.customer.book.totalPayable}</span>
                  <span>₹{selectedWorker.baseVisitFee + 15}</span>
                </div>

                <div className="pt-1 text-[11px] text-blue-800 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>
                    {t.customer.book.directPayoutNote
                      .replace('{amount}', String(Math.round(selectedWorker.baseVisitFee * 0.88)))
                      .replace('{name}', selectedWorker.name)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t.customer.book.sendRequestBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>

          </div>
        </div>
      )}

      {/* 5-Minute Live Countdown Modal with Demo Controls */}
      {activeRequestedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200 p-5 text-center space-y-4">
            
            {/* Pulsing Radar Ring */}
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <div className="relative w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-600 flex items-center justify-center shadow-md">
                <Radio className="w-7 h-7 text-blue-600 animate-pulse" />
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                {t.customer.book.dispatchedTo.replace('{name}', activeRequestedBooking.workerName)}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1 font-mono">
                {formatTimer(secondsLeft)}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {t.customer.book.waitingConfirmation}
              </p>
            </div>

            {/* Booking Summary Box */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-left text-xs space-y-1">
              <div className="flex justify-between font-bold text-slate-800">
                <span>{t.customer.book.taskLabel}</span>
                <span className="truncate max-w-[180px]">{getLocalizedTask(activeRequestedBooking.taskDescription, currentLang)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>{t.customer.book.slotLabel}</span>
                <span>{getLocalizedSlot(activeRequestedBooking.scheduledSlot, currentLang)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>{t.customer.book.totalLabel}</span>
                <span className="font-semibold text-slate-900">₹{activeRequestedBooking.totalAmount}</span>
              </div>
            </div>

            {/* Prototype Demo Controls */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                {t.customer.book.demoControls}
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={handleAcceptRequest}
                  className="py-2 px-1 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-2xs"
                >
                  {t.customer.book.demoAccept}
                </button>
                <button
                  type="button"
                  onClick={handleDeclineRequest}
                  className="py-2 px-1 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95"
                >
                  {t.customer.book.demoDecline}
                </button>
                <button
                  type="button"
                  onClick={handleExpireRequest}
                  className="py-2 px-1 rounded-xl text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 active:scale-95"
                >
                  {t.customer.book.demoExpire}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
