import React, { useState } from 'react';
import { Worker } from '../../types';
import { 
  Users, 
  UserPlus, 
  Search, 
  Phone, 
  Star, 
  ShieldCheck, 
  MapPin, 
  X
} from 'lucide-react';
import { AppLanguage, mobileTranslations, getLocalizedTrade } from '../../data/mobileTranslations';

interface CooperativeMembersProps {
  members: Worker[];
  onAddMember: (newMember: Omit<Worker, 'id'>) => void;
  currentLang?: AppLanguage;
}

export const CooperativeMembers: React.FC<CooperativeMembersProps> = ({
  members,
  onAddMember,
  currentLang = 'en'
}) => {
  const [search, setSearch] = useState('');
  const [filterTrade, setFilterTrade] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = mobileTranslations[currentLang];

  // Form State
  const [name, setName] = useState('');
  const [primaryTrade, setPrimaryTrade] = useState('electrician');
  const [primaryTradeLabel, setPrimaryTradeLabel] = useState('Electrician');
  const [phone, setPhone] = useState('+91 98220 ');
  const [locality, setLocality] = useState('Kothrud, Pune');
  const [baseVisitFee, setBaseVisitFee] = useState(299);

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
                          m.locality.toLowerCase().includes(search.toLowerCase());
    const matchesTrade = filterTrade === 'all' || m.primaryTrade.toLowerCase() === filterTrade.toLowerCase();
    return matchesSearch && matchesTrade;
  });

  const handleSubmitNewMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddMember({
      name: name.trim(),
      primaryTrade,
      primaryTradeLabel: primaryTradeLabel || primaryTrade,
      phone,
      rating: 5.0,
      reviewsCount: 1,
      completedJobs: 0,
      distanceKm: 0.8,
      etaMinutes: 10,
      baseVisitFee: Number(baseVisitFee),
      workerPayoutPercent: 88,
      cooperativeRole: 'Co-op Worker-Owner',
      cooperativeSociety: 'Pune Central Electricians Cooperative Society Ltd.',
      wardHub: 'Kothrud Ward Hub #12',
      memberSince: '2026',
      languages: ['Marathi', 'Hindi'],
      shortBio: 'Newly enrolled certified member of Pune Central Electricians Co-op Society.',
      locality,
      skills: [primaryTradeLabel, 'Safety Certified', 'Co-op Trained'],
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      availability: 'available'
    });

    setName('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Header & Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            {t.cooperative.members.title}
            <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded-full font-bold">
              {members.length}
            </span>
          </h2>
          <p className="text-xs text-slate-500">{t.cooperative.members.subtitle}</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5" />
          {t.cooperative.members.enrollWorkerBtn}
        </button>
      </div>

      {/* Search and Trade Filter */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.cooperative.members.searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-xs"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
          {['all', 'electrician', 'plumber', 'carpenter', 'cleaning', 'appliance'].map((tradeKey) => (
            <button
              key={tradeKey}
              onClick={() => setFilterTrade(tradeKey)}
              className={`px-3 py-1 rounded-full whitespace-nowrap capitalize font-medium transition-colors ${
                filterTrade === tradeKey
                  ? 'bg-purple-700 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {getLocalizedTrade(tradeKey, currentLang)}
            </button>
          ))}
        </div>
      </div>

      {/* Member Cards */}
      <div className="space-y-3">
        {filteredMembers.map((member) => (
          <div 
            key={member.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-sm space-y-2.5 hover:border-purple-300 transition-colors"
          >
            <div className="flex items-start gap-3">
              <img 
                src={member.photo} 
                alt={member.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 truncate">{member.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    member.availability === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {member.availability === 'available' ? t.cooperative.members.activeShift : t.cooperative.members.offShift}
                  </span>
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  {getLocalizedTrade(member.primaryTrade, currentLang)}
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
                  <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {member.rating} ({member.reviewsCount})
                  </span>
                  <span>•</span>
                  <span>{t.cooperative.members.jobsDone.replace('{count}', String(member.completedJobs))}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-2 text-xs flex items-center justify-between border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{member.locality}</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-slate-800">
                <span>{t.cooperative.members.baseVisit}</span>
                <span className="text-emerald-700">₹{member.baseVisitFee}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 text-slate-500">
              <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {t.cooperative.members.equalShareholder}
              </span>
              {member.phone && (
                <a 
                  href={`tel:${member.phone}`}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-700 font-bold hover:text-emerald-700"
                >
                  <Phone className="w-3 h-3" /> {currentLang === 'hi' ? 'कॉल करें' : currentLang === 'mr' ? 'कॉल करा' : 'Call Member'}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Enroll Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <UserPlus className="w-4 h-4 text-emerald-600" /> {t.cooperative.members.addModalTitle}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitNewMember} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">{t.cooperative.members.fullName}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Santosh Patil"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">{t.cooperative.members.trade}</label>
                <select
                  value={primaryTrade}
                  onChange={(e) => {
                    setPrimaryTrade(e.target.value);
                    const labelMap: Record<string, string> = {
                      electrician: 'Master Electrician',
                      plumber: 'Sanitary Plumber',
                      carpenter: 'Furniture Carpenter',
                      cleaning: 'Deep Cleaning Specialist',
                      appliance: 'Appliance Technician'
                    };
                    setPrimaryTradeLabel(labelMap[e.target.value] || 'Specialist');
                  }}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-slate-900"
                >
                  <option value="electrician">{getLocalizedTrade('electrician', currentLang)}</option>
                  <option value="plumber">{getLocalizedTrade('plumber', currentLang)}</option>
                  <option value="carpenter">{getLocalizedTrade('carpenter', currentLang)}</option>
                  <option value="cleaning">{getLocalizedTrade('cleaning', currentLang)}</option>
                  <option value="appliance">{getLocalizedTrade('appliances', currentLang)}</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">{t.cooperative.members.locality}</label>
                <input
                  type="text"
                  required
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{t.cooperative.members.phone}</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{t.cooperative.members.baseFee}</label>
                  <input
                    type="number"
                    min={99}
                    step={50}
                    value={baseVisitFee}
                    onChange={(e) => setBaseVisitFee(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  />
                </div>
              </div>

              <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-200 text-[11px] text-purple-800 leading-relaxed">
                {t.cooperative.members.shareNotice}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  {t.cooperative.members.cancelBtn}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl shadow-sm cursor-pointer"
                >
                  {t.cooperative.members.confirmBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
