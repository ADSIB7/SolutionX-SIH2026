import React, { useState } from 'react';
import { Dispute } from '../../types';
import { 
  Scale, 
  CheckCircle2, 
  AlertCircle, 
  User 
} from 'lucide-react';
import { 
  AppLanguage, 
  mobileTranslations, 
  getLocalizedStatus, 
  getLocalizedTrade, 
  getLocalizedStatement 
} from '../../data/mobileTranslations';

interface CooperativeDisputesProps {
  disputes: Dispute[];
  onResolveDispute: (disputeId: string, resolutionNotes: string) => void;
  currentLang?: AppLanguage;
}

export const CooperativeDisputes: React.FC<CooperativeDisputesProps> = ({
  disputes,
  onResolveDispute,
  currentLang = 'en'
}) => {
  const [resolutionTexts, setResolutionTexts] = useState<Record<string, string>>({});
  const t = mobileTranslations[currentLang];

  const handleResolve = (disputeId: string, customNote?: string) => {
    const defaultAmicable = currentLang === 'hi'
      ? 'वार्ड 14 साथी परिषद द्वारा सौहार्दपूर्ण समाधान।'
      : currentLang === 'mr'
      ? 'वॉर्ड 14 सहकारी परिषदेकडून सलोख्याने निकाली काढले.'
      : 'Resolved amicably by Ward 14 Peer Council.';
    const note = customNote || resolutionTexts[disputeId] || defaultAmicable;
    onResolveDispute(disputeId, note);
    setResolutionTexts(prev => ({ ...prev, [disputeId]: '' }));
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-purple-700" /> {t.cooperative.disputes.title}
          </h2>
          <p className="text-xs text-slate-500">{t.cooperative.disputes.subtitle}</p>
        </div>
        <span className="text-xs bg-purple-50 text-purple-800 font-bold px-2.5 py-1 rounded-xl border border-purple-200">
          {t.cooperative.disputes.pendingCount.replace('{count}', String(disputes.filter(d => d.status !== 'resolved').length))}
        </span>
      </div>

      {disputes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-500">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
          <p className="text-xs font-semibold">{t.cooperative.disputes.noGrievances}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {disputes.map((dispute) => {
            const isResolved = dispute.status === 'resolved';

            return (
              <div 
                key={dispute.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        #{dispute.id.slice(-6).toUpperCase()}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                        isResolved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {getLocalizedStatus(dispute.status, currentLang)}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-1">
                      {getLocalizedTrade(dispute.workerTrade, currentLang)} {currentLang === 'hi' ? 'सेवा' : currentLang === 'mr' ? 'सेवा' : 'Service'}
                    </h3>
                  </div>

                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                    {dispute.createdAt}
                  </span>
                </div>

                {/* Dispute Parties */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">{t.worker.jobs.customer}</span>
                    <span className="font-semibold text-slate-800">{dispute.customerName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">{t.worker.profile.coopOwner}</span>
                    <span className="font-semibold text-slate-800">{dispute.workerName}</span>
                  </div>
                </div>

                {/* Customer Complaint */}
                <div className="bg-rose-50/70 border border-rose-100 rounded-xl p-3 text-xs text-rose-950 space-y-1.5 overflow-hidden">
                  <div className="font-bold flex items-center gap-1 text-rose-800">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{t.cooperative.disputes.customerComplaint}</span>
                  </div>
                  <blockquote className="text-slate-700 leading-relaxed border-l-2 border-rose-300 pl-2.5 break-words whitespace-pre-wrap">
                    {getLocalizedStatement(dispute.issue, currentLang)}
                  </blockquote>
                </div>

                {/* Worker Explanation */}
                <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3 text-xs text-indigo-950 space-y-1.5 overflow-hidden">
                  <div className="font-bold flex items-center gap-1 text-indigo-800">
                    <User className="w-3.5 h-3.5 shrink-0" />
                    <span>{t.cooperative.disputes.workerStatement}</span>
                  </div>
                  <blockquote className="text-slate-700 leading-relaxed border-l-2 border-indigo-300 pl-2.5 break-words whitespace-pre-wrap">
                    {dispute.workerResponse 
                      ? getLocalizedStatement(dispute.workerResponse, currentLang) 
                      : (currentLang === 'hi' ? 'कारीगर-स्वामी के औपचारिक वक्तव्य की प्रतीक्षा...' : currentLang === 'mr' ? 'कामगार-मालकाच्या अधिकृत उत्तराची प्रतीक्षा...' : 'Awaiting formal statement from worker-owner...')}
                  </blockquote>
                </div>

                {/* Council Resolution if already resolved */}
                {isResolved && dispute.resolutionNotes && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 space-y-1.5 overflow-hidden">
                    <div className="font-bold flex items-center gap-1 text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.cooperative.disputes.councilRuling}</span>
                    </div>
                    <blockquote className="text-slate-700 leading-relaxed border-l-2 border-emerald-400 pl-2.5 break-words whitespace-pre-wrap">
                      {getLocalizedStatement(dispute.resolutionNotes, currentLang)}
                    </blockquote>
                  </div>
                )}

                {/* Council Resolution Controls if not resolved */}
                {!isResolved && (
                  <div className="space-y-2 pt-1 border-t border-slate-100">
                    <label className="text-xs font-bold text-slate-700 block">
                      {t.cooperative.disputes.remediationLabel}
                    </label>
                    <textarea
                      rows={2}
                      value={resolutionTexts[dispute.id] || ''}
                      onChange={(e) => setResolutionTexts(prev => ({ ...prev, [dispute.id]: e.target.value }))}
                      placeholder={t.cooperative.disputes.remediationPlaceholder}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          const note = currentLang === 'hi'
                            ? 'परिषद निर्णय: सहकारी वारंटी स्वीकृत। ग्राहक को ₹0 लागत पर पुनः निरीक्षण प्रदान किया गया।'
                            : currentLang === 'mr'
                            ? 'परिषद निर्णय: सहकारी वॉरंटी मंजूर. ग्राहकाला ₹0 खर्चात पुनर्निरीक्षण दिले.'
                            : 'Council ruling: Co-op warranty approved. Customer re-inspection completed at ₹0 cost.';
                          handleResolve(dispute.id, note);
                        }}
                        className="py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
                      >
                        {t.cooperative.disputes.approveRemedyBtn}
                      </button>

                      <button
                        onClick={() => {
                          const defaultSignoff = currentLang === 'hi'
                            ? 'ग्राहक और कारीगर दोनों की सहमति से निर्णय दर्ज।'
                            : currentLang === 'mr'
                            ? 'ग्राहक आणि कामगार दोघांच्या संमतीने निर्णय नोंदवला.'
                            : 'Settled with mutual customer & worker sign-off.';
                          handleResolve(dispute.id, resolutionTexts[dispute.id] || defaultSignoff);
                        }}
                        className="py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
                      >
                        {t.cooperative.disputes.recordRulingBtn}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
