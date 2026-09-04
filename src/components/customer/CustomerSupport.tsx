import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Phone, 
  HelpCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  Plus, 
  X,
  MessageSquare,
  Building2
} from 'lucide-react';
import { Dispute, Booking } from '../../types';
import { 
  AppLanguage, 
  mobileTranslations, 
  getLocalizedTrade, 
  getLocalizedStatement 
} from '../../data/mobileTranslations';

interface CustomerSupportProps {
  disputes: Dispute[];
  bookings: Booking[];
  currentLang?: AppLanguage;
  onRaiseDispute: (bookingId: string, issue: string) => void;
}

export const CustomerSupport: React.FC<CustomerSupportProps> = ({
  disputes,
  bookings,
  currentLang = 'en',
  onRaiseDispute
}) => {
  const t = mobileTranslations[currentLang];
  const [showRaiseModal, setShowRaiseModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(bookings[0]?.id || '');
  const [issueText, setIssueText] = useState('');

  React.useEffect(() => {
    if (!showRaiseModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowRaiseModal(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showRaiseModal]);

  const handleCreateDispute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingId || !issueText) return;
    onRaiseDispute(selectedBookingId, issueText);
    setShowRaiseModal(false);
    setIssueText('');
  };

  return (
    <div className="p-4 space-y-5 pb-24 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <h2 className="text-lg font-black text-slate-900 tracking-tight">{t.customer.support.title}</h2>
        <p className="text-xs text-slate-500">{t.customer.support.subtitle}</p>
      </div>

      {/* Raise Dispute CTA Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-3xl p-4 text-white shadow-sm flex items-center justify-between gap-3">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/40">
            <Scale className="w-3 h-3" />
            <span>{t.customer.support.councilBadge}</span>
          </span>
          <h3 className="text-sm font-bold text-white">{t.customer.support.bannerTitle}</h3>
          <p className="text-[11px] text-slate-300">{t.customer.support.bannerDesc}</p>
        </div>
        <button
          type="button"
          onClick={() => setShowRaiseModal(true)}
          className="shrink-0 py-2.5 px-3.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>{t.customer.support.raiseIssueBtn}</span>
        </button>
      </div>

      {/* Disputes List */}
      <div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">
          {t.customer.support.activeGrievances.replace('{count}', String(disputes.length))}
        </h3>

        {disputes.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-3xl border border-slate-200 p-5 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <p className="text-xs font-bold text-slate-800">{t.customer.support.noDisputesTitle}</p>
            <p className="text-[11px] text-slate-500">{t.customer.support.noDisputesDesc}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {disputes.map((dsp) => (
              <div
                key={dsp.id}
                className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs space-y-3"
              >
                {/* Status bar */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900 font-mono">
                    Ref #{dsp.bookingId}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    dsp.status === 'resolved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : dsp.status === 'under_review'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {dsp.status === 'under_review' ? (currentLang === 'hi' ? 'परिषद समीक्षा में' : currentLang === 'mr' ? 'समिती तपासत आहे' : 'Council Reviewing') : dsp.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {t.customer.support.targetProfessional.replace('{name}', dsp.workerName).replace('{trade}', getLocalizedTrade(dsp.workerTrade, currentLang))}
                  </h4>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mt-1.5 space-y-1 overflow-hidden">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">{t.customer.support.yourStatement}:</span>
                    <blockquote className="text-xs text-slate-700 leading-relaxed border-l-2 border-slate-300 pl-2 break-words whitespace-pre-wrap">
                      {getLocalizedStatement(dsp.issue, currentLang)}
                    </blockquote>
                  </div>
                </div>

                {/* Worker Response (if provided) */}
                {dsp.workerResponse && (
                  <div className="bg-indigo-50/70 p-3 rounded-2xl border border-indigo-200/70 text-xs space-y-1.5 overflow-hidden">
                    <span className="font-bold text-indigo-900 flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-indigo-700 shrink-0" />
                      <span>{t.customer.support.workerResponse.replace('{name}', dsp.workerName)}:</span>
                    </span>
                    <blockquote className="text-slate-700 leading-relaxed border-l-2 border-indigo-300 pl-2 break-words whitespace-pre-wrap">
                      {getLocalizedStatement(dsp.workerResponse, currentLang)}
                    </blockquote>
                    {dsp.workerResponseTime && (
                      <span className="text-[10px] text-indigo-700 block mt-0.5 font-medium">{dsp.workerResponseTime}</span>
                    )}
                  </div>
                )}

                {/* Council Resolution Notes */}
                {dsp.resolutionNotes && (
                  <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200 text-xs space-y-1.5 overflow-hidden">
                    <span className="font-bold text-emerald-900 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{t.customer.support.councilResolution}:</span>
                    </span>
                    <blockquote className="text-slate-700 leading-relaxed border-l-2 border-emerald-400 pl-2 break-words whitespace-pre-wrap">
                      {getLocalizedStatement(dsp.resolutionNotes, currentLang)}
                    </blockquote>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cooperative Help Center Cards */}
      <div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">
          {t.customer.support.emergencyTitle}
        </h3>
        
        <div className="space-y-2.5">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t.customer.support.helplineTitle}</h4>
                <p className="text-[11px] text-slate-500">{t.customer.support.helplineTiming}</p>
              </div>
            </div>
            <a
              href="tel:18002608900"
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100"
            >
              {t.customer.support.callBtn}
            </a>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t.customer.support.wardHubCell}</h4>
                <p className="text-[11px] text-slate-500">{t.customer.support.wardHubAddress}</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
              Zone 4
            </span>
          </div>
        </div>
      </div>

      {/* Raise Dispute Modal */}
      {showRaiseModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 p-5 space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">{t.customer.support.modalTitle}</h3>
                <p className="text-xs text-slate-500">{t.customer.support.modalSubtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowRaiseModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDispute} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.customer.support.selectBooking}
                </label>
                <select
                  value={selectedBookingId}
                  onChange={(e) => setSelectedBookingId(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                >
                  {bookings.map((b) => (
                    <option key={b.id} value={b.id}>
                      #{b.id} - {b.workerName} ({getLocalizedTrade(b.workerTrade, currentLang)}) - ₹{b.totalAmount}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.customer.support.describeIssue}
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={t.customer.support.describeIssuePlaceholder}
                  value={issueText}
                  onChange={(e) => setIssueText(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-[11px] text-blue-900 space-y-1">
                {t.customer.support.coopProtection}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-2xs"
              >
                {t.customer.support.submitGrievanceBtn}
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
