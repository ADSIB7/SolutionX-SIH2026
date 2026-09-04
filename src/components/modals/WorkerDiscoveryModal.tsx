import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  MapPin, 
  Star, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Crosshair, 
  Search, 
  Sparkles, 
  Zap, 
  Droplet, 
  Hammer, 
  Wrench, 
  Paintbrush, 
  AlertCircle, 
  Timer, 
  RefreshCw, 
  SlidersHorizontal,
  ChevronDown,
  Check,
  Award,
  Building2
} from 'lucide-react';
import { Worker, WorkerRequest, Language } from '../../types';
import { mockWorkers, tradeCategories } from '../../data/workersData';
import { popularLocations } from '../../data/cooperativeData';

interface WorkerDiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang?: Language;
  initialLocality?: string;
  initialTrade?: string;
  initialWorkerId?: string;
}

type FlowState = 'discovery' | 'profile' | 'drafting' | 'sent' | 'accepted' | 'declined' | 'expired';

export const WorkerDiscoveryModal: React.FC<WorkerDiscoveryModalProps> = ({
  isOpen,
  onClose,
  initialLocality = 'Kothrud, Pune',
  initialTrade = 'all',
  initialWorkerId
}) => {
  // Modal accessibility: Escape key listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search & Filter State
  const [selectedLocality, setSelectedLocality] = useState(initialLocality);
  const [selectedTrade, setSelectedTrade] = useState(initialTrade);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'jobs' | 'price'>('distance');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  // Flow & Selection State
  const [flowState, setFlowState] = useState<FlowState>('discovery');
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [activeRequest, setActiveRequest] = useState<WorkerRequest | null>(null);

  // Request Form Fields
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('');
  const [serviceAddress, setServiceAddress] = useState(initialLocality);
  const [timeSlot, setTimeSlot] = useState('Immediate (within 30-45 mins)');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // 5-Minute Timer State
  const [countdownSeconds, setCountdownSeconds] = useState(300); // 5 minutes = 300s
  const [isFastDemoMode, setIsFastDemoMode] = useState(false);

  // Synchronize initial worker selection if provided
  useEffect(() => {
    if (initialWorkerId) {
      const found = mockWorkers.find(w => w.id === initialWorkerId);
      if (found) {
        setSelectedWorker(found);
        setFlowState('drafting');
      }
    }
  }, [initialWorkerId]);

  // Synchronize locality changes
  useEffect(() => {
    if (initialLocality) {
      setSelectedLocality(initialLocality);
      setServiceAddress(initialLocality);
    }
  }, [initialLocality]);

  // Synchronize trade changes
  useEffect(() => {
    if (initialTrade) {
      setSelectedTrade(initialTrade);
    }
  }, [initialTrade]);

  // Timer effect for 'sent' state
  useEffect(() => {
    let interval: any = null;
    if (flowState === 'sent' && countdownSeconds > 0) {
      interval = setInterval(() => {
        setCountdownSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setFlowState('expired');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [flowState, countdownSeconds]);

  // Filtered & Sorted Workers
  const filteredWorkers = useMemo(() => {
    let list = mockWorkers.filter((worker) => {
      // Locality filter (partial match)
      const locMatch = selectedLocality
        ? worker.locality.toLowerCase().includes(selectedLocality.split(',')[0].toLowerCase().trim()) ||
          selectedLocality.toLowerCase().includes(worker.locality.split(',')[0].toLowerCase().trim())
        : true;

      // Trade filter
      const tradeMatch = selectedTrade === 'all' || worker.primaryTrade === selectedTrade;

      // Search query filter (name, trade, skills)
      const query = searchQuery.toLowerCase().trim();
      const queryMatch = !query || 
        worker.name.toLowerCase().includes(query) ||
        worker.primaryTradeLabel.toLowerCase().includes(query) ||
        worker.skills.some(s => s.toLowerCase().includes(query));

      return (locMatch || !selectedLocality) && tradeMatch && queryMatch;
    });

    // If locality filter produced 0 results, fall back to showing all workers in the trade to keep experience realistic
    if (list.length === 0) {
      list = mockWorkers.filter((worker) => {
        const tradeMatch = selectedTrade === 'all' || worker.primaryTrade === selectedTrade;
        const query = searchQuery.toLowerCase().trim();
        const queryMatch = !query || 
          worker.name.toLowerCase().includes(query) ||
          worker.primaryTradeLabel.toLowerCase().includes(query) ||
          worker.skills.some(s => s.toLowerCase().includes(query));
        return tradeMatch && queryMatch;
      });
    }

    // Sort list
    return list.sort((a, b) => {
      if (sortBy === 'distance') {
        return a.distanceKm - b.distanceKm;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'jobs') {
        return b.completedJobs - a.completedJobs;
      }
      if (sortBy === 'price') {
        return a.baseVisitFee - b.baseVisitFee;
      }
      return 0;
    });
  }, [selectedLocality, selectedTrade, searchQuery, sortBy]);

  // Handlers
  const handleAutoDetectLocation = () => {
    setIsDetectingLocation(true);
    setTimeout(() => {
      setSelectedLocality('Baner / Wakad, Pune');
      setServiceAddress('Flat 402, Rohan Viti, Baner, Pune');
      setIsDetectingLocation(false);
      setShowLocationDropdown(false);
    }, 500);
  };

  const handleSelectWorkerForProfile = (worker: Worker) => {
    setSelectedWorker(worker);
    setFlowState('profile');
  };

  const handleSelectWorkerForRequest = (worker: Worker) => {
    setSelectedWorker(worker);
    if (!serviceAddress) {
      setServiceAddress(selectedLocality || worker.locality);
    }
    setFlowState('drafting');
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorker) return;

    const baseFee = selectedWorker.baseVisitFee;
    const platformFee = 15;
    const totalAmount = baseFee + platformFee;
    const workerPayout = Math.round(baseFee * (selectedWorker.workerPayoutPercent / 100));

    const newRequest: WorkerRequest = {
      id: `WEMP-${Math.floor(10000 + Math.random() * 90000)}`,
      workerId: selectedWorker.id,
      worker: selectedWorker,
      customerName: customerName || 'Valued Customer',
      customerPhone: customerPhone || '98220 00000',
      address: serviceAddress || selectedLocality,
      locality: selectedLocality,
      taskDescription: taskDescription || `Visit request for ${selectedWorker.primaryTradeLabel}`,
      preferredSlot: timeSlot,
      category: selectedServiceCategory || selectedWorker.primaryTradeLabel,
      baseFee,
      platformFee,
      totalAmount,
      workerPayout,
      status: 'sent',
      createdAt: Date.now()
    };

    setActiveRequest(newRequest);
    setCountdownSeconds(isFastDemoMode ? 30 : 300);
    setFlowState('sent');
  };

  // Simulation Controls for Demo
  const handleSimulateAccept = () => {
    if (activeRequest) {
      setActiveRequest({ ...activeRequest, status: 'accepted' });
    }
    setFlowState('accepted');
  };

  const handleSimulateDecline = () => {
    if (activeRequest) {
      setActiveRequest({ ...activeRequest, status: 'declined' });
    }
    setFlowState('declined');
  };

  const handleSimulateExpire = () => {
    if (activeRequest) {
      setActiveRequest({ ...activeRequest, status: 'expired' });
    }
    setCountdownSeconds(0);
    setFlowState('expired');
  };

  const handleResetToDiscovery = () => {
    setFlowState('discovery');
    setCountdownSeconds(isFastDemoMode ? 30 : 300);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTradeIcon = (trade: string) => {
    switch (trade) {
      case 'electrician': return <Zap className="w-4 h-4 text-amber-600" />;
      case 'plumber': return <Droplet className="w-4 h-4 text-sky-600" />;
      case 'cleaning': return <Sparkles className="w-4 h-4 text-teal-600" />;
      case 'carpenter': return <Hammer className="w-4 h-4 text-orange-600" />;
      case 'painting': return <Paintbrush className="w-4 h-4 text-purple-600" />;
      case 'appliances': return <Wrench className="w-4 h-4 text-blue-600" />;
      default: return <Sparkles className="w-4 h-4 text-brand-600" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[94vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center border border-brand-500/30 shadow-inner">
              <ShieldCheck className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  {flowState === 'discovery' && 'Discover Nearby Verified Worker-Owners'}
                  {flowState === 'profile' && 'Worker-Owner Credentials & Profile'}
                  {flowState === 'drafting' && `Direct Service Request to ${selectedWorker?.name}`}
                  {flowState === 'sent' && 'Direct Dispatch in Progress'}
                  {flowState === 'accepted' && 'Cooperative Booking Confirmed'}
                  {flowState === 'declined' && 'Worker Availability Update'}
                  {flowState === 'expired' && 'Dispatch Window Expired'}
                </h3>
                <span className="text-[10px] bg-brand-500/30 text-brand-300 font-semibold px-2 py-0.5 rounded-full border border-brand-400/30 hidden sm:inline">
                  Worker-First Model
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Direct dispatch to democratic worker-owners • 88% direct fee • Zero surge pricing
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Content Container */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 bg-slate-50/50">

          {/* ======================================================== */}
          {/* 1. DISCOVERY VIEW: Search & Browse Workers               */}
          {/* ======================================================== */}
          {flowState === 'discovery' && (
            <div className="space-y-5">
              
              {/* Locality & Search Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  
                  {/* Locality Selector with GPS Auto-detect */}
                  <div className="md:col-span-6 relative">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-600" />
                        <span>Your Ward Hub / Locality</span>
                      </label>
                      <button
                        type="button"
                        onClick={handleAutoDetectLocation}
                        className="text-[11px] font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1 transition-colors"
                      >
                        <Crosshair className={`w-3 h-3 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                        <span>{isDetectingLocation ? 'Locating...' : 'GPS Auto-Detect'}</span>
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={selectedLocality}
                        onChange={(e) => setSelectedLocality(e.target.value)}
                        onFocus={() => setShowLocationDropdown(true)}
                        placeholder="Enter locality (e.g., Kothrud, Pune)"
                        className="w-full pl-9 pr-8 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium text-slate-800"
                      />
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <button
                        type="button"
                        onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Ward Hub Suggestions Dropdown */}
                    {showLocationDropdown && (
                      <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl shadow-card border border-slate-200 p-2 z-30 max-h-48 overflow-y-auto">
                        <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Active Ward Hubs with On-Duty Workers
                        </div>
                        {popularLocations.slice(0, 6).map((loc) => (
                          <button
                            type="button"
                            key={loc}
                            onClick={() => {
                              setSelectedLocality(loc);
                              setShowLocationDropdown(false);
                            }}
                            className="w-full text-left px-3 py-1.5 text-xs rounded-xl hover:bg-brand-50 text-slate-700 hover:text-brand-800 flex items-center justify-between transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-brand-600" />
                              <span>{loc}</span>
                            </span>
                            {selectedLocality === loc && <Check className="w-3.5 h-3.5 text-brand-600" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Search by Skill or Name */}
                  <div className="md:col-span-6">
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Search Skill or Name
                    </label>
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="e.g. Inverter, AC, Drain, or Ramesh..."
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium text-slate-800"
                      />
                    </div>
                  </div>

                </div>

                {/* Trade Category Filter Pills */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  <span className="text-xs font-bold text-slate-400 shrink-0 uppercase tracking-wider text-[10.5px]">
                    Trade:
                  </span>
                  {tradeCategories.map((cat) => {
                    const isActive = selectedTrade === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedTrade(cat.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-800 border border-slate-200/80'
                        }`}
                      >
                        {getTradeIcon(cat.id)}
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sorting & Discovery Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <span>Verified Worker-Owners Near {selectedLocality || 'You'}</span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-100 text-brand-800">
                      {filteredWorkers.length} available
                    </span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Sorted by nearest dispatch ward hub. Workers directly accept requests.
                  </p>
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-500 font-medium">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="distance">Distance / ETA (Nearest)</option>
                    <option value="rating">Highest Rating</option>
                    <option value="jobs">Most Completed Jobs</option>
                    <option value="price">Base Visit Fee (Lowest)</option>
                  </select>
                </div>
              </div>

              {/* Workers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredWorkers.map((worker) => {
                  const isAvailable = worker.availability === 'available';
                  const isBusy = worker.availability === 'busy';

                  return (
                    <div
                      key={worker.id}
                      className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-brand-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative"
                    >
                      {/* Worker Card Top Info */}
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img
                                src={worker.photo}
                                alt={worker.name}
                                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-brand-400 transition-all"
                              />
                              {isAvailable && (
                                <span 
                                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center"
                                  title="Available Now"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-white" />
                                </span>
                              )}
                            </div>

                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                                  {worker.name}
                                </h4>
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                                  Co-owner
                                </span>
                              </div>

                              <p className="text-xs text-slate-600 font-medium flex items-center gap-1 mt-0.5">
                                {getTradeIcon(worker.primaryTrade)}
                                <span>{worker.primaryTradeLabel}</span>
                              </p>

                              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                <span className="flex items-center text-amber-600 font-bold">
                                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                                  {worker.rating}
                                </span>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-600 font-medium">{worker.reviewsCount} reviews</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-emerald-700 font-semibold">{worker.completedJobs} jobs</span>
                              </div>
                            </div>
                          </div>

                          {/* Distance / ETA Pill */}
                          <div className="text-right shrink-0">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-700 bg-brand-50 border border-brand-200/80 px-2 py-0.5 rounded-lg">
                              <MapPin className="w-3 h-3 text-brand-600" />
                              <span>{worker.etaMinutes} mins ({worker.distanceKm} km)</span>
                            </span>
                            <span className={`block text-[10px] font-semibold mt-1 ${
                              isAvailable ? 'text-emerald-600' : isBusy ? 'text-amber-600' : 'text-slate-400'
                            }`}>
                              {isAvailable ? '● Available Now' : isBusy ? '● Busy (Next slot)' : '○ Offline'}
                            </span>
                          </div>
                        </div>

                        {/* Cooperative Badge & Role */}
                        <div className="mb-2 flex items-center justify-between text-[11px] bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100">
                          <span className="text-slate-600 flex items-center gap-1 font-medium">
                            <Award className="w-3.5 h-3.5 text-brand-600" />
                            <span>{worker.cooperativeRole}</span>
                          </span>
                          <span className="text-slate-500">Member since {worker.memberSince}</span>
                        </div>

                        {/* Society Affiliation */}
                        {worker.cooperativeSociety && (
                          <div className="mb-3 text-[10.5px] text-brand-800 font-semibold flex items-center gap-1.5 bg-brand-50/60 px-2 py-1 rounded-lg border border-brand-200/60">
                            <Building2 className="w-3 h-3 text-brand-700 shrink-0" />
                            <span className="truncate">{worker.cooperativeSociety}</span>
                          </div>
                        )}

                        {/* Skills preview tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {worker.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="text-[10.5px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                          {worker.skills.length > 3 && (
                            <span className="text-[10px] text-slate-400 font-semibold self-center">
                              +{worker.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Pricing and Action Buttons */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Base Visit Fee</span>
                          <span className="text-base font-extrabold text-slate-900">
                            ₹{worker.baseVisitFee}
                            <span className="text-[10px] text-emerald-700 font-semibold ml-1.5 bg-emerald-50 px-1 py-0.5 rounded">
                              88% direct
                            </span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleSelectWorkerForProfile(worker)}
                            className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                          >
                            View Profile
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSelectWorkerForRequest(worker)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-coop-600 hover:from-brand-700 hover:to-coop-700 rounded-xl shadow-sm hover:shadow transition-all active:scale-95"
                          >
                            <span>Request Worker</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

              {filteredWorkers.length === 0 && (
                <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
                  <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
                  <h4 className="text-base font-bold text-slate-800">No Workers Found in this Specific Area</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Try clearing your trade filter or resetting to another Pune/Mumbai ward hub like Kothrud or Baner.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTrade('all');
                      setSelectedLocality('Kothrud, Pune');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
                  >
                    Reset Filters to Kothrud Hub
                  </button>
                </div>
              )}

            </div>
          )}

          {/* ======================================================== */}
          {/* 2. PROFILE VIEW: Worker Detailed Credentials            */}
          {/* ======================================================== */}
          {flowState === 'profile' && selectedWorker && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Back to discovery button */}
              <button
                type="button"
                onClick={() => setFlowState('discovery')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Worker Discovery List</span>
              </button>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-6">
                
                {/* Profile Hero */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedWorker.photo}
                      alt={selectedWorker.name}
                      className="w-20 h-20 rounded-3xl object-cover ring-4 ring-brand-100 shadow-md"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xl font-extrabold text-slate-900">{selectedWorker.name}</h3>
                        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                          Verified Worker-Owner
                        </span>
                        {selectedWorker.badge && (
                          <span className="text-xs bg-brand-50 text-brand-700 font-semibold px-2 py-0.5 rounded-md border border-brand-200">
                            {selectedWorker.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-slate-700 mt-1 flex items-center gap-1.5">
                        {getTradeIcon(selectedWorker.primaryTrade)}
                        <span>{selectedWorker.primaryTradeLabel}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-500 font-normal">{selectedWorker.locality}</span>
                      </p>

                      <div className="flex items-center gap-3 text-xs text-slate-600 mt-2">
                        <span className="flex items-center text-amber-500 font-bold">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                          {selectedWorker.rating} / 5.0
                        </span>
                        <span>•</span>
                        <span>{selectedWorker.reviewsCount} customer reviews</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-bold">{selectedWorker.completedJobs} jobs delivered</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="text-[11px] text-slate-400 block font-medium">Standard Base Tariff</span>
                    <span className="text-2xl font-black text-slate-900">₹{selectedWorker.baseVisitFee}</span>
                    <span className="block text-[11px] text-emerald-700 font-semibold mt-0.5">
                      88% Direct Payout (₹{Math.round(selectedWorker.baseVisitFee * 0.88)})
                    </span>
                  </div>
                </div>

                {/* Bio & Credentials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        About the Worker-Owner
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        {selectedWorker.shortBio}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Verified Skills & Competencies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedWorker.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs bg-white text-slate-800 font-semibold px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Trust & Cooperative Metrics */}
                  <div className="bg-brand-50/60 rounded-2xl p-4 border border-brand-200/80 space-y-3.5 text-xs">
                    <div className="font-bold text-brand-900 flex items-center gap-1.5 pb-2 border-b border-brand-200">
                      <ShieldCheck className="w-4 h-4 text-brand-600" />
                      <span>Cooperative Governance Record</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Cooperative Role:</span>
                        <span className="font-semibold text-slate-900 text-right">{selectedWorker.cooperativeRole}</span>
                      </div>
                      {selectedWorker.cooperativeSociety && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Affiliated Society:</span>
                          <span className="font-semibold text-brand-900 text-right">{selectedWorker.cooperativeSociety}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-600">Ward Hub:</span>
                        <span className="font-semibold text-slate-900">{selectedWorker.wardHub || selectedWorker.locality}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Member Tenure:</span>
                        <span className="font-semibold text-slate-900">Since {selectedWorker.memberSince}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Languages:</span>
                        <span className="font-semibold text-slate-900">{selectedWorker.languages.join(', ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Verification ID:</span>
                        <span className="font-mono text-[11px] text-brand-800 font-bold">{selectedWorker.verificationId}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-brand-200 text-[11px] text-emerald-800 font-medium">
                      ✓ Police background checked<br />
                      ✓ ₹5 Lakh accidental welfare insurance<br />
                      ✓ 30-Day cooperative rework warranty
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setFlowState('discovery')}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    ← Browse Other Workers
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectWorkerForRequest(selectedWorker)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-coop-600 hover:from-brand-700 hover:to-coop-700 rounded-xl shadow-md transition-all active:scale-95"
                  >
                    <span>Request {selectedWorker.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 3. DRAFTING VIEW: Task Request Form for Selected Worker  */}
          {/* ======================================================== */}
          {flowState === 'drafting' && selectedWorker && (
            <form onSubmit={handleSubmitRequest} className="space-y-5 animate-in fade-in duration-200">
              
              {/* Top Banner: Selected Worker Summary */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={selectedWorker.photo}
                    alt={selectedWorker.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-brand-400"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Sending Request To:</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                        Co-owner
                      </span>
                    </div>
                    <h4 className="text-base font-extrabold text-slate-900">{selectedWorker.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {selectedWorker.primaryTradeLabel} • {selectedWorker.etaMinutes} mins away ({selectedWorker.locality})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] text-slate-400 block font-medium">Base Visit Fee</span>
                    <span className="text-sm font-extrabold text-slate-900">₹{selectedWorker.baseVisitFee}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFlowState('discovery')}
                    className="text-xs font-semibold text-brand-600 hover:underline px-2 py-1"
                  >
                    Change Worker
                  </button>
                </div>
              </div>

              {/* Form Input Fields */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                
                {/* 1. Task / Problem Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Task / Problem Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Describe the problem (e.g. Ceiling fan sparking at regulator, low water pressure in kitchen, or lock jammed...)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 placeholder:text-slate-400"
                  />
                </div>

                {/* 2. Optional Service Category / Skill */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Service Category (Optional)
                    </label>
                    <select
                      value={selectedServiceCategory}
                      onChange={(e) => setSelectedServiceCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    >
                      <option value="">{selectedWorker.primaryTradeLabel} (General Visit)</option>
                      {selectedWorker.skills.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    >
                      <option value="Immediate (within 30-45 mins)">Immediate (within 30-45 mins)</option>
                      <option value="Today (02:00 PM - 04:00 PM)">Today (02:00 PM - 04:00 PM)</option>
                      <option value="Today (05:00 PM - 07:00 PM)">Today (05:00 PM - 07:00 PM)</option>
                      <option value="Tomorrow (10:00 AM - 12:00 PM)">Tomorrow (10:00 AM - 12:00 PM)</option>
                      <option value="Tomorrow (03:00 PM - 05:00 PM)">Tomorrow (03:00 PM - 05:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* 3. Address & Locality */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Full Address & Locality *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-brand-600 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={serviceAddress}
                      onChange={(e) => setServiceAddress(e.target.value)}
                      placeholder="House / Flat No., Landmark, Locality, Ward Hub"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>
                </div>

                {/* 4. Customer Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Srushti Kulkarni"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Mobile Number (For Dispatch Notification) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 98220 12345"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800"
                    />
                  </div>
                </div>

                {/* Transparent Cooperative Price Box */}
                <div className="p-4 rounded-2xl bg-brand-50/80 border border-brand-200/90 space-y-2 text-xs">
                  <div className="font-bold text-brand-900 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                      <span>Cooperative Tariff Breakdown</span>
                    </span>
                    <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-100 px-2 py-0.5 rounded">
                      Zero Surge Guarantee
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Base Inspection & Labor Fee ({selectedWorker.name}):</span>
                    <span className="font-semibold text-slate-900">₹{selectedWorker.baseVisitFee}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Cooperative Safety Corpus & Tool Bank Fund:</span>
                    <span className="font-semibold text-slate-900">₹15</span>
                  </div>

                  <div className="pt-2 border-t border-brand-200 flex justify-between items-center text-sm font-extrabold text-slate-900">
                    <span>Total Estimated Booking Amount:</span>
                    <span className="text-base text-brand-700">₹{selectedWorker.baseVisitFee + 15}</span>
                  </div>

                  <p className="text-[11px] text-emerald-800 pt-1 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      ₹{Math.round(selectedWorker.baseVisitFee * (selectedWorker.workerPayoutPercent / 100))} (88%) is credited directly to {selectedWorker.name}'s cooperative account upon your OTP signoff.
                    </span>
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setFlowState('discovery')}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel & Back
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-coop-600 hover:from-brand-700 hover:to-coop-700 shadow-md transition-all active:scale-95"
                  >
                    <span>Send Request to {selectedWorker.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </form>
          )}

          {/* ======================================================== */}
          {/* 4. SENT VIEW: Waiting for Worker Decision Window (5m)    */}
          {/* ======================================================== */}
          {flowState === 'sent' && selectedWorker && activeRequest && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card text-center space-y-6 animate-in zoom-in-95 duration-200">
              
              {/* Radar Pulsing Animation & Status */}
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-brand-400/20 animate-ping" />
                <div className="absolute inset-2 rounded-full bg-brand-500/10 animate-pulse" />
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-brand-600 to-coop-600 text-white flex items-center justify-center shadow-lg">
                  <Timer className="w-8 h-8 animate-spin-slow" />
                </div>
              </div>

              {/* Status Headline */}
              <div className="space-y-1.5 max-w-md mx-auto">
                <span className="text-xs font-extrabold text-brand-700 uppercase tracking-wider bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                  Request Sent Directly to Worker
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  Waiting for {selectedWorker.name} to Respond
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {selectedWorker.name} has received your task dispatch in the {selectedWorker.locality} ward hub.
                </p>
              </div>

              {/* 5-Minute Countdown Display */}
              <div className="max-w-sm mx-auto bg-slate-900 text-white p-5 rounded-2xl shadow-inner space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-400" />
                    <span>Decision Window:</span>
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {countdownSeconds > 0 ? 'Active Countdown' : 'Expired'}
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-mono font-black tracking-widest text-white py-1">
                  {formatTimer(countdownSeconds)}
                </div>

                <p className="text-[11px] text-slate-400">
                  Cooperative Policy: Worker-owners have 5 minutes to review and confirm requests. If time elapses, you can seamlessly auto-route to another nearby worker.
                </p>
              </div>

              {/* Worker & Task Summary snippet */}
              <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedWorker.photo}
                    alt={selectedWorker.name}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-brand-400"
                  />
                  <div>
                    <div className="font-bold text-slate-900">{selectedWorker.name}</div>
                    <div className="text-slate-500">{activeRequest.taskDescription}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block">Est. Total</span>
                  <span className="font-bold text-slate-900 text-sm">₹{activeRequest.totalAmount}</span>
                </div>
              </div>

              {/* =================================================== */}
              {/* PROTOTYPE / HACKATHON DEMO CONTROLS BANNER         */}
              {/* =================================================== */}
              <div className="max-w-lg mx-auto p-4 rounded-2xl bg-amber-50/80 border-2 border-dashed border-amber-300 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Prototype Simulation Controls (Judge & Demo Mode)</span>
                  </span>
                  <label className="text-[11px] font-semibold text-amber-800 flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFastDemoMode}
                      onChange={(e) => {
                        setIsFastDemoMode(e.target.checked);
                        setCountdownSeconds(e.target.checked ? 30 : 300);
                      }}
                      className="rounded text-brand-600 focus:ring-brand-500"
                    />
                    <span>30s Fast Mode</span>
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={handleSimulateAccept}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all"
                  >
                    ✓ Worker Accepts
                  </button>

                  <button
                    type="button"
                    onClick={handleSimulateDecline}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 shadow-sm transition-all"
                  >
                    ✕ Worker Declines
                  </button>

                  <button
                    type="button"
                    onClick={handleSimulateExpire}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-slate-800 bg-slate-200 hover:bg-slate-300 transition-all"
                  >
                    ⏱ Timer Expires
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* 5. ACCEPTED VIEW: Booking Confirmed & ETA                */}
          {/* ======================================================== */}
          {flowState === 'accepted' && selectedWorker && activeRequest && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card text-center space-y-6 animate-in zoom-in-95 duration-200">
              
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Request Confirmed & Dispatched
                </span>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {selectedWorker.name} has Accepted!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Booking Reference ID: <span className="font-bold text-brand-700">{activeRequest.id}</span>. The worker has accepted your task and is heading to your address.
                </p>
              </div>

              {/* Assigned Worker Details Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-lg mx-auto text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedWorker.photo}
                      alt={selectedWorker.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-bold text-slate-900">{selectedWorker.name}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                          Co-owner
                        </span>
                      </div>
                      <span className="text-xs text-slate-600 block">{selectedWorker.primaryTradeLabel} ({selectedWorker.rating} ★)</span>
                      <span className="text-xs text-slate-500">{selectedWorker.phone}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block font-medium">Estimated Arrival</span>
                    <span className="text-base font-black text-emerald-600">~{selectedWorker.etaMinutes} mins</span>
                    <span className="text-[10px] text-slate-500 block">{selectedWorker.distanceKm} km away</span>
                  </div>
                </div>

                {/* Economic Transparency Breakdown */}
                <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                  <div className="flex justify-between font-medium">
                    <span>Labor & Visit Fee:</span>
                    <span className="text-slate-900 font-bold">₹{activeRequest.baseFee}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Cooperative Safety & Tool Fund:</span>
                    <span className="text-slate-900 font-bold">₹{activeRequest.platformFee}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-extrabold text-slate-900">
                    <span>Total Amount Payable (Escrow):</span>
                    <span className="text-base text-brand-700">₹{activeRequest.totalAmount}</span>
                  </div>
                  <div className="pt-1 text-[11px] text-emerald-700 font-bold">
                    ✓ ₹{activeRequest.workerPayout} (88%) goes directly to {selectedWorker.name} with zero algorithmic deduction.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Close & Track on Dashboard
                </button>

                <button
                  type="button"
                  onClick={handleResetToDiscovery}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  Book Another Worker
                </button>
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* 6. DECLINED VIEW: Worker Declined                       */}
          {/* ======================================================== */}
          {flowState === 'declined' && selectedWorker && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card text-center space-y-5 animate-in zoom-in-95 duration-200">
              
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
                <AlertCircle className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Worker Busy / Declined
                </span>
                <h4 className="text-2xl font-black text-slate-900">
                  {selectedWorker.name} is Currently Unavailable
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  In our worker-owned cooperative model, members maintain full autonomy over their schedule and capacity. {selectedWorker.name} is currently completing an on-site job or taking a scheduled break.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto text-left text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-800 block">Zero Cancellation Penalties:</span>
                <p>No fee has been charged. You can instantly select another verified worker-owner nearby in {selectedLocality}.</p>
              </div>

              <div className="pt-3 flex justify-center">
                <button
                  type="button"
                  onClick={handleResetToDiscovery}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-coop-600 hover:from-brand-700 hover:to-coop-700 shadow-md transition-all active:scale-95"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Choose Another Nearby Worker</span>
                </button>
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* 7. EXPIRED VIEW: 5-Minute Timer Expired                  */}
          {/* ======================================================== */}
          {flowState === 'expired' && selectedWorker && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card text-center space-y-5 animate-in zoom-in-95 duration-200">
              
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mx-auto shadow-inner">
                <Timer className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  5-Minute Window Expired
                </span>
                <h4 className="text-2xl font-black text-slate-900">
                  Request Expired After 5 Minutes
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedWorker.name} was unable to respond within the cooperative 5-minute dispatch window. To prevent customer delays, requests are automatically closed with zero charges.
                </p>
              </div>

              <div className="bg-brand-50 border border-brand-200 rounded-2xl p-4 max-w-md mx-auto text-left text-xs text-brand-900 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-600" />
                  <span>Cooperative Rapid Routing Available</span>
                </span>
                <p className="text-slate-600">
                  Other verified worker-owners in your ward are ready to take this task right now.
                </p>
              </div>

              <div className="pt-3 flex justify-center">
                <button
                  type="button"
                  onClick={handleResetToDiscovery}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-coop-600 hover:from-brand-700 hover:to-coop-700 shadow-md transition-all active:scale-95"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Pick Another Nearby Worker</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
