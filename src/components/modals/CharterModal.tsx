import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Scale, 
  Award, 
  Vote, 
  CheckCircle2, 
  FileText,
  HeartHandshake,
  TrendingUp
} from 'lucide-react';

interface CharterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWorkerJoin: () => void;
}

export const CharterModal: React.FC<CharterModalProps> = ({
  isOpen,
  onClose,
  onOpenWorkerJoin
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-brand-900 via-slate-900 to-trust-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">WorkerEMP Cooperative Model Charter</h3>
              <p className="text-xs text-brand-300">Under SIH Problem Statement 26089 Principles</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-700">
          
          {/* Article 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Vote className="w-4 h-4 text-brand-600" />
              <span>Article I: Democratic 1-Member 1-Vote Governance</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every certified skilled service worker who deposits nominal share capital of ₹100 is an equal shareholder. Regardless of tenure or service volume, each worker possesses exactly one vote in Annual General Meetings, Tariff Determinations, and Board Elections.
            </p>
          </div>

          {/* Article 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Article II: 88% Direct Payout & Surplus Patronage Dividends</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              WorkerEMP operates as a non-extractive collective. 88% of customer fees go immediately to the worker-owner. The remaining 12% funds server operations (4%), social security / ESI (4%), and the Patronage Dividend Pool (4%), which is redistributed annually back to active workers.
            </p>
          </div>

          {/* Article 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Scale className="w-4 h-4 text-trust-600" />
              <span>Article III: Open Standardized Rate Cards (Zero Surge)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Service tariffs are benchmarked transparently through joint consumer-worker advisory panels. Algorithms are strictly prohibited from engineering artificial scarcity or dynamic surge pricing against customers.
            </p>
          </div>

          {/* Article 4 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <HeartHandshake className="w-4 h-4 text-rose-600" />
              <span>Article IV: Worker Social Security & Emergency Corpus</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full ESI enrollment, ₹5,00,000 accidental disability and life cover, maternity support, and interest-free emergency tool upgrade credit funds are maintained for all active members.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-brand-50/80 border border-brand-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-brand-900 font-semibold">
              <ShieldCheck className="w-5 h-5 text-brand-700 shrink-0" />
              <span>Registered under Multi-State Cooperative Societies Framework.</span>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenWorkerJoin();
              }}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold shrink-0 transition-colors"
            >
              Enroll as Member
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
