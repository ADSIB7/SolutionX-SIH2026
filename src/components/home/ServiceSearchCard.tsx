import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  ChevronRight,
  Crosshair,
  Zap,
  Droplet,
  Hammer,
  Paintbrush,
  Wrench,
  Check
} from 'lucide-react';
import { Language, ModalType } from '../../types';
import { translations } from '../../data/translations';
import { servicesData } from '../../data/servicesData';
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
  const [selectedService, setSelectedService] = useState('electrician');
  const [location, setLocation] = useState('Kothrud, Pune');
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedSlot, setSelectedSlot] = useState('Immediate (within 45 mins)');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [locationDetecting, setLocationDetecting] = useState(false);

  const quickPills = [
    { label: 'Fan Repair', id: 'electrician' },
    { label: 'Deep Cleaning', id: 'cleaning' },
    { label: 'Tap Leakage', id: 'plumber' },
    { label: 'Lock Fitting', id: 'carpenter' },
    { label: 'AC Service', id: 'appliances' },
    { label: 'Wall Paint', id: 'painting' }
  ];

  const handleDetectLocation = () => {
    setLocationDetecting(true);
    setTimeout(() => {
      setLocation('Baner, Pune (Auto-detected)');
      setLocationDetecting(false);
    }, 600);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking({
      serviceId: selectedService,
      location,
      date: selectedDate,
      timeSlot: selectedSlot
    });
  };

  return (
    <div className="relative -mt-8 sm:-mt-12 z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-elevated border border-slate-200/90 p-5 sm:p-7 backdrop-blur-lg">
        
        {/* Top Header & Cooperative Note */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {t.search.title}
            </h3>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1.5 self-start sm:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>Zero Platform Surge • Verified Cooperative Rates</span>
          </span>
        </div>

        {/* Search Booking Form */}
        <form onSubmit={handleSearchSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 lg:gap-4">
            
            {/* Field 1: Service Selector */}
            <div className="md:col-span-4 bg-slate-50 hover:bg-slate-100/80 transition-colors p-3 rounded-2xl border border-slate-200/80 focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                {t.search.serviceLabel}
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer py-0.5"
                >
                  {servicesData.map((s) => {
                    const localizedName = currentLang === 'hi' ? s.hindiName : currentLang === 'mr' ? s.marathiName : s.name;
                    return (
                      <option key={s.id} value={s.id}>
                        {localizedName} (From ₹{s.minPrice})
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Field 2: Location Input */}
            <div className="md:col-span-4 relative bg-slate-50 hover:bg-slate-100/80 transition-colors p-3 rounded-2xl border border-slate-200/80 focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500">
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
                    Popular Cooperative Ward Hubs
                  </div>
                  {popularLocations.map((loc) => (
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

            {/* Field 3: Date & Slot Selector */}
            <div className="md:col-span-2 bg-slate-50 hover:bg-slate-100/80 transition-colors p-3 rounded-2xl border border-slate-200/80 focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                {t.search.dateTimeLabel}
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-600 shrink-0" />
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer py-0.5"
                >
                  <option value="Today">Today (Immediate)</option>
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="Weekend Slot">Weekend Slot</option>
                  <option value="Select Custom">Custom Schedule</option>
                </select>
              </div>
            </div>

            {/* Field 4: Action Button */}
            <div className="md:col-span-2 flex items-center">
              <button
                type="submit"
                className="w-full h-full min-h-[52px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-coop-600 hover:from-brand-700 hover:to-coop-700 shadow-md shadow-brand-600/25 active:scale-95 transition-all"
              >
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
          {quickPills.map((pill) => (
            <button
              key={pill.label}
              type="button"
              onClick={() => {
                setSelectedService(pill.id);
                onOpenBooking({ serviceId: pill.id, location });
              }}
              className="px-2.5 py-1 text-xs rounded-full bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-800 border border-slate-200/70 hover:border-brand-300 transition-all font-medium"
            >
              {pill.label}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
