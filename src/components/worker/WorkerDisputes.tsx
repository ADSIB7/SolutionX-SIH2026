import React, { useState } from 'react';
import { Dispute } from '../../types';
import { 
  ShieldAlert, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  User,
  Scale 
} from 'lucide-react';
import { 
  AppLanguage, 
  mobileTranslations, 
  getLocalizedStatus, 
  getLocalizedTrade, 
  getLocalizedStatement 
} from '../../data/mobileTranslations';

interface WorkerDisputesProps {
  disputes: Dispute[];
  currentLang?: AppLanguage;
  onWorkerRespond: (disputeId: string, response: string) => void;
}

export const WorkerDisputes: React.FC<WorkerDisputesProps> = ({
  disputes,
  currentLang = 'en',
  onWorkerRespond
}) => {
  const t = mobileTranslations[currentLang];

  // Filter disputes relevant to worker Ramesh Jadhav
  const workerDisputes = disputes.filter(d => 
    d.workerId === 'w1' || d.workerId === 'w-ramesh-jadhav' || d.workerName.toLowerCase().includes('ramesh')
  );
  const [responseTexts, setResponseTexts] = useState<Record<string, string>>({});

  const handleTextChange = (disputeId: string, text: string) => {
    setResponseTexts(prev => ({ ...prev, [disputeId]: text }));
  };

  const handleSendResponse = (disputeId: string) => {
    const text = responseTexts[disputeId];
    if (!text || !text.trim()) return;
    onWorkerRespond(disputeId, text.trim());
    setResponseTexts(prev => ({ ...prev, [disputeId]: '' }));
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Cooperative Protection Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-4 shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-400 shrink-0" />
          <h2 className="text-sm font-bold text-white">{t.worker.disputes.peerPanel}</h2>
        </div>
        <p className="text-xs text-indigo-200 leading-relaxed">
          {t.worker.disputes.disputesSubtitle}
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
          {t.worker.disputes.disputeCases} ({workerDisputes.length})
        </h3>

        {workerDisputes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800">{t.worker.disputes.noActiveDisputes}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.worker.disputes.allClearDesc}
            </p>
          </div>
        ) : (
          workerDisputes.map((dispute) => {
            const isResolved = dispute.status === 'resolved';

            return (
              <div 
                key={dispute.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2 min-w-0">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                        Dispute #{dispute.id.slice(-6).toUpperCase()}
                      </span>
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-mono">
                        Booking #{dispute.bookingId.slice(-6).toUpperCase()}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-1 truncate">
                      {getLocalizedTrade(dispute.workerTrade, currentLang)} Service
                    </h4>
                    <div className="text-[11px] text-slate-400">Filed by: {dispute.customerName} • {dispute.createdAt}</div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize shrink-0 ${
                    isResolved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {getLocalizedStatus(dispute.status, currentLang)}
                  </span>
                </div>

                {/* Complaint Text - Blockquote without quotes to avoid overflow */}
                <div className="bg-rose-50/70 border border-rose-100 rounded-xl p-3 text-xs text-rose-900 space-y-1.5 overflow-hidden">
                  <div className="font-bold flex items-center gap-1 text-rose-800">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{t.worker.disputes.claimDetails}</span>
                  </div>
                  <blockquote className="text-slate-700 leading-relaxed border-l-2 border-rose-300 pl-2.5 break-words whitespace-pre-wrap">
                    {getLocalizedStatement(dispute.issue, currentLang)}
                  </blockquote>
                </div>

                {/* Existing Worker Response */}
                {dispute.workerResponse && (
                  <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3 text-xs text-indigo-950 space-y-1.5 overflow-hidden">
                    <div className="font-bold flex items-center gap-1 text-indigo-800">
                      <User className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.worker.disputes.yourStatement}</span>
                    </div>
                    <blockquote className="text-slate-700 leading-relaxed border-l-2 border-indigo-300 pl-2.5 break-words whitespace-pre-wrap">
                      {getLocalizedStatement(dispute.workerResponse, currentLang)}
                    </blockquote>
                  </div>
                )}

                {/* Co-op Council Resolution Notes if available */}
                {dispute.resolutionNotes && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 space-y-1.5 overflow-hidden">
                    <div className="font-bold flex items-center gap-1 text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.worker.disputes.peerCouncilRuling}</span>
                    </div>
                    <blockquote className="text-slate-700 leading-relaxed border-l-2 border-emerald-400 pl-2.5 break-words whitespace-pre-wrap">
                      {getLocalizedStatement(dispute.resolutionNotes, currentLang)}
                    </blockquote>
                  </div>
                )}

                {/* Reply Form if not yet resolved */}
                {!isResolved && (
                  <div className="space-y-2 pt-1 border-t border-slate-100">
                    <label className="text-[11px] font-bold text-slate-700 block">
                      {t.worker.disputes.provideExplanation}
                    </label>
                    <textarea
                      rows={2}
                      value={responseTexts[dispute.id] || ''}
                      onChange={(e) => handleTextChange(dispute.id, e.target.value)}
                      placeholder={t.worker.disputes.explanationPlaceholder}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 text-slate-900 break-words"
                    />
                    <button
                      onClick={() => handleSendResponse(dispute.id)}
                      disabled={!responseTexts[dispute.id]?.trim()}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" /> {t.worker.disputes.submitResponseBtn}
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
