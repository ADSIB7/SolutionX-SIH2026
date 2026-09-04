import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Users,
  ArrowRight,
  FileCheck,
  MapPin,
  Phone,
  Mail,
  Award
} from 'lucide-react';
import { popularLocations } from '../../data/cooperativeData';

interface CooperativeRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CooperativeRegisterModal: React.FC<CooperativeRegisterModalProps> = ({
  isOpen,
  onClose
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

  const [societyName, setSocietyName] = useState('');
  const [entityType, setEntityType] = useState<'primary-society' | 'ward-collective' | 'shg-federation' | 'artisan-guild'>('primary-society');
  const [regNumber, setRegNumber] = useState('');
  const [wardHub, setWardHub] = useState('Kothrud, Pune');
  const [repName, setRepName] = useState('');
  const [repRole, setRepRole] = useState('Secretary / Chairperson');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [memberCount, setMemberCount] = useState('25-50 members');
  const [selectedTrades, setSelectedTrades] = useState<string[]>(['electrician', 'plumber']);
  const [isSuccess, setIsSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  const tradeOptions = [
    { id: 'electrician', label: 'Electrical & Power' },
    { id: 'plumber', label: 'Plumbing & Water Works' },
    { id: 'cleaning', label: 'Deep Cleaning & Sanitation' },
    { id: 'carpenter', label: 'Carpentry & Woodcraft' },
    { id: 'appliances', label: 'HVAC & Appliances' },
    { id: 'painting', label: 'Painting & Waterproofing' }
  ];

  const handleToggleTrade = (tradeId: string) => {
    if (selectedTrades.includes(tradeId)) {
      if (selectedTrades.length > 1) {
        setSelectedTrades(selectedTrades.filter(t => t !== tradeId));
      }
    } else {
      setSelectedTrades([...selectedTrades, tradeId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `COOP-REG-${Math.floor(10000 + Math.random() * 90000)}`;
    setApplicationId(generatedId);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSocietyName('');
    setRegNumber('');
    setRepName('');
    setPhone('');
    setEmail('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">

        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Enroll Your Cooperative or Ward Hub
                </h3>
                <span className="text-[10.5px] bg-brand-500/30 text-brand-300 font-semibold px-2 py-0.5 rounded-full border border-brand-400/30 hidden sm:inline">
                  Collective Onboarding
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Institutional registration for primary service societies, labor collectives & SHGs
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Press Esc to close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 bg-slate-50/50">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Cooperative Application Submitted
                </span>
                <h4 className="text-2xl font-extrabold text-slate-900">
                  Application Logged: {applicationId}
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  <span className="font-bold text-brand-800">{societyName}</span> has been registered for ward dispatch integration in <span className="font-semibold text-slate-800">{wardHub}</span>.
                </p>
              </div>

              {/* Next steps list */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto text-left space-y-2.5 text-xs text-slate-700">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5 pb-2 border-b border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-brand-600" />
                  <span>Next Steps for Ward Dispatch Activation:</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                  <span><strong>Federation Verification:</strong> Municipal cooperative registrar validates registration certificate #{regNumber || 'MSCS/PENDING'}.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                  <span><strong>Roster Roster Upload:</strong> Secretary will receive portal credentials to enroll the initial {memberCount} member-workers.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                  <span><strong>Ward Hub Live:</strong> Direct P2P bookings begin routing to verified member-owners with 88% direct payout.</span>
                </div>
              </div>

              <div className="pt-3 flex justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Done & Return to Homepage
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Institutional Notice */}
              <div className="p-3.5 bg-brand-50/80 rounded-2xl border border-brand-200/80 flex items-start gap-3 text-xs text-brand-900">
                <Users className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>Collective Registration Only:</strong> WorkerEMP partners with registered cooperative societies, worker unions, ward collectives, and SHGs. Individual craftsmen work as proud members of affiliated cooperatives, not isolated gig contractors.
                </div>
              </div>

              {/* Section 1: Cooperative Information */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  1. Cooperative Society Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Cooperative / Collective Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={societyName}
                      onChange={(e) => setSocietyName(e.target.value)}
                      placeholder="e.g. Kothrud Electricians Co-op Society Ltd."
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-medium text-slate-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Entity Type *
                    </label>
                    <select
                      value={entityType}
                      onChange={(e) => setEntityType(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-semibold text-slate-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    >
                      <option value="primary-society">Primary Labor Cooperative Society</option>
                      <option value="ward-collective">Ward Service Collective Hub</option>
                      <option value="shg-federation">Registered SHG (Self-Help Group) Federation</option>
                      <option value="artisan-guild">Artisan & Craft Guild Society</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Registration / Society Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
                      placeholder="e.g. MSCS/PUN/2022/4410"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-mono text-slate-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Municipal Ward Hub Location *
                    </label>
                    <select
                      value={wardHub}
                      onChange={(e) => setWardHub(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-semibold text-slate-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    >
                      {popularLocations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Authorized Representative */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  2. Authorized Representative Contact
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Secretary / President Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={repName}
                      onChange={(e) => setRepName(e.target.value)}
                      placeholder="e.g. Suresh Patil"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-medium text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Official Designation
                    </label>
                    <input
                      type="text"
                      value={repRole}
                      onChange={(e) => setRepRole(e.target.value)}
                      placeholder="e.g. General Secretary"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-medium text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Official Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 98220 11223"
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 font-medium text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Cooperative Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contact@kothrudcoop.org"
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 font-medium text-slate-800"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Collective Membership & Trades */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    3. Member Workers & Trades Covered
                  </h4>
                  <span className="text-[11px] font-semibold text-slate-500">
                    Initial Collective Size:
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {['10-25 members', '25-50 members', '50+ members'].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setMemberCount(count)}
                      className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${memberCount === count
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Trades Offered by Your Member-Owners (Select all that apply):
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {tradeOptions.map((t) => {
                      const isSelected = selectedTrades.includes(t.id);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => handleToggleTrade(t.id)}
                          className={`p-2.5 text-xs rounded-xl border text-left font-medium flex items-center justify-between transition-all ${isSelected
                              ? 'bg-brand-50 border-brand-300 text-brand-900 font-bold'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                          <span>{t.label}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-coop-600 hover:from-brand-700 hover:to-coop-700 shadow-md transition-all active:scale-95"
                >
                  <span>Submit Cooperative Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
