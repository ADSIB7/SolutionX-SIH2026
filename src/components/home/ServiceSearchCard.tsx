import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  ChevronRight,
  Crosshair,
  Check,
  Users
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import { popularLocations } from '../../data/cooperativeData';

interface ServiceSearchCardProps {
  currentLang: Language;
  onOpenBooking: (prefill?: { serviceId?: string; location?: string; date?: string; timeSlot?: string }) => void;
}

export const ServiceSearchCard: React.FC<ServiceSearchCardProps> = ({
  currentLang,
  onOpenBooking
}) => {
  const t = translations[currentLang];
  const [selectedTrade, setSelectedTrade] = useState('all');
  const [location, setLocation] = useState('Kothrud, Pune');
  const [selectedSlot, setSelectedSlot] = useState('Immediate (within 30 mins)');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [locationDetecting, setLocationDetecting] = useState(false);

  const quickWorkerPills = [
    { label: '⚡ Master Electricians', id: 'electrician' },
    { label: '💧 Emergency Plumbers', id: 'plumber' },
    { label: '✨ Deep Home Cleaners', id: 'cleaning' },
    { label: '🔨 Precision Carpenters', id: 'carpenter' },
    { label: '❄️ AC & Appliance Pros', id: 'appliances' },
    { label: '🎨 Certified Painters', id: 'painting' }
  ];

  const handleDetectLocation = () => {
    setLocationDetecting(true);
    setTimeout(() => {
      setLocation('Baner / Wakad, Pune');
      setLocationDetecting(false);
    }, 500);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking({
      serviceId: selectedTrade,
      location,
      timeSlot: selectedSlot
    });
  };

  return (
    <div className="relative -mt-8 sm:-mt-12 z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-elevated border border-slate-200/90 p-5 sm:p-7 backdrop-blur-lg">
        
        {/* Top Header & Cooperative Note */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
              <Users className="w-4 h-4 text-brand-700" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>{t.search.title}</span>
                <span className="text-[10.5px] bg-brand-50 text-brand-700 border border-brand-200/80 px-2 py-0.5 rounded-full font-semibold hidden sm:inline">
                  Worker-First Discovery
                </span>
              </h3>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1.5 self-start sm:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>Zero Algorithmic Surge • 88% Direct Payout to Worker-Owners</span>
          </span>
        </div>

        {/* Worker Discovery Search Form */}
        <form onSubmit={handleSearchSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 lg:gap-4">
            
            {/* Field 1: Locality Input (Worker-first location priority) */}
            <div className="md:col-span-5 relative bg-slate-50 hover:bg-slate-100/80 transition-colors p-3 rounded-2xl border border-slate-200/80 focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {t.search.locationLabel}
                </label>
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  className="text-[10.5px] font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1"
                >
                  <Crosshair className={`w-3 h-3 ${locationDetecting ? 'animate-spin' : ''}`} />
                  <span>{locationDetecting ? 'Detecting...' : 'Auto Detect'}</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => setShowLocationDropdown(true)}
                  placeholder={t.search.locationPlaceholder}
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none placeholder:text-slate-400"
                />
              </div>

              {/* Location Suggestions Dropdown */}
              {showLocationDropdown && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-card border border-slate-200 p-2 z-30 max-h-48 overflow-y-auto">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Nearby Cooperative Ward Hubs
                  </div>
                  {popularLocations.slice(0, 7).map((loc) => (
                    <button
                      type="button"
                      key={loc}
                      onClick={() => {
                        setLocation(loc);
                        setShowLocationDropdown(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs rounded-xl hover:bg-brand-50 text-slate-700 hover:text-brand-800 flex items-center justify-between transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {loc}
                      </span>
                      {location === loc && <Check className="w-3.5 h-3.5 text-brand-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Field 2: Trade / Skill Category */}
            <div className="md:col-span-4 bg-slate-50 hover:bg-slate-100/80 transition-colors p-3 rounded-2xl border border-slate-200/80 focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                {t.search.serviceLabel}
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={selectedTrade}
                  onChange={(e) => setSelectedTrade(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer py-0.5"
                >
                  <option value="all">All Skilled Trades (Nearest Workers)</option>
                  <option value="electrician">Electricians (From ₹249)</option>
                  <option value="plumber">Plumbers (From ₹229)</option>
                  <option value="cleaning">Cleaners & Sanitation (From ₹349)</option>
                  <option value="carpenter">Carpenters & Woodwork (From ₹299)</option>
                  <option value="appliances">AC & Appliance Technicians (From ₹349)</option>
                  <option value="painting">Painters & Waterproofer (From ₹399)</option>
                </select>
              </div>
            </div>

            {/* Field 3: Action Button */}
            <div className="md:col-span-3 flex items-center">
              <button
                type="submit"
                className="w-full h-full min-h-[52px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-coop-600 hover:from-brand-700 hover:to-coop-700 shadow-md shadow-brand-600/25 active:scale-95 transition-all"
              >
                <Search className="w-4 h-4" />
                <span>{t.search.findBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </form>

        {/* Quick shortcut pills */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">
            {t.search.quickTagsLabel}
          </span>
          {quickWorkerPills.map((pill) => (
            <button
              key={pill.label}
              type="button"
              onClick={() => {
                setSelectedTrade(pill.id);
                onOpenBooking({ serviceId: pill.id, location });
              }}
              className="px-3 py-1 text-xs rounded-full bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-800 border border-slate-200/70 hover:border-brand-300 transition-all font-medium flex items-center gap-1"
            >
              <span>{pill.label}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
