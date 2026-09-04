import React, { useState, useEffect } from 'react';
import { Booking, BookingStatus } from '../../types';
import { 
  Clock, 
  MapPin, 
  IndianRupee, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  UserCheck, 
  Calendar,
  AlertTriangle 
} from 'lucide-react';
import { 
  AppLanguage, 
  mobileTranslations, 
  getLocalizedSlot, 
  getLocalizedTask 
} from '../../data/mobileTranslations';

interface WorkerRequestsProps {
  bookings: Booking[];
  currentLang?: AppLanguage;
  onUpdateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  onSimulateNewRequest: () => void;
}

export const WorkerRequests: React.FC<WorkerRequestsProps> = ({
  bookings,
  currentLang = 'en',
  onUpdateBookingStatus,
  onSimulateNewRequest
}) => {
  const t = mobileTranslations[currentLang];

  // Pending requests for Ramesh Jadhav or unassigned
  const pendingRequests = bookings.filter(b => 
    (b.workerId === 'w1' || b.workerId === 'w-ramesh-jadhav' || b.workerName.toLowerCase().includes('ramesh')) && 
    b.status === 'requested'
  );

  // Simulated countdown clock for the top request (default 245s / ~4 min)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(245);

  useEffect(() => {
    if (pendingRequests.length === 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [pendingRequests.length]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  const isUrgent = secondsRemaining < 60;

  return (
    <div className="space-y-4">
      {/* Header Banner - Responsive and collision-free */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-sm space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 flex-wrap">
              <span>{t.worker.requests.title}</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                {pendingRequests.length} {t.worker.requests.pendingCount}
              </span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">{t.worker.requests.windowSubtitle}</p>
          </div>

          <button
            onClick={onSimulateNewRequest}
            className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 active:bg-emerald-200 font-bold px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1 transition-colors shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>+ {t.worker.requests.simulateRequestBtn}</span>
          </button>
        </div>
      </div>

      {pendingRequests.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">{t.worker.requests.emptyRequests}</h3>
          </div>
          <button
            onClick={onSimulateNewRequest}
            className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl shadow-sm inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" /> {t.worker.requests.simulateRequestBtn}
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {pendingRequests.map((req) => {
            return (
              <div 
                key={req.id}
                className="bg-white rounded-2xl border-2 border-emerald-500/80 p-3.5 shadow-md space-y-3 relative overflow-hidden"
              >
                {/* Urgent Countdown Strip */}
                <div className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold ${
                  isUrgent 
                    ? 'bg-rose-50 border-rose-200 text-rose-800' 
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                }`}>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Clock className={`w-4 h-4 shrink-0 ${isUrgent ? 'animate-spin text-rose-600' : 'text-amber-600'}`} />
                    <span className="truncate">{t.worker.requests.expiresIn}:</span>
                  </div>
                  <div className="text-xs sm:text-sm font-black font-mono tracking-wider shrink-0">
                    {timeFormatted}
                  </div>
                </div>

                {/* Emergency Tag if applicable */}
                {req.isEmergency && (
                  <div className="bg-rose-100 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>{t.worker.requests.immediateRequest}</span>
                  </div>
                )}

                {/* Request Details */}
                <div>
                  <div className="flex items-start justify-between gap-2 min-w-0">
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                        Request #{req.id.slice(-6).toUpperCase()}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 break-words leading-tight mt-0.5">
                        {getLocalizedTask(req.taskDescription, currentLang)}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-base font-black text-emerald-700 flex items-center justify-end">
                        <IndianRupee className="w-3.5 h-3.5" />
                        {req.workerPayout}
                      </div>
                      <div className="text-[10px] text-slate-400">{t.worker.requests.directCredit}</div>
                    </div>
                  </div>

                  <div className="mt-2.5 bg-slate-50 rounded-xl p-2.5 text-xs text-slate-600 space-y-1.5 border border-slate-100">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <span className="font-semibold text-slate-800">{req.customerName}</span>
                      <span className="text-[10px] bg-slate-200/80 px-2 py-0.5 rounded-full font-medium text-slate-700">
                        {req.locality}
                      </span>
                    </div>
                    <div className="flex items-start gap-1 text-slate-500 min-w-0">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="break-words flex-1">{req.address}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{getLocalizedSlot(req.scheduledSlot, currentLang)}</span>
                    </div>
                  </div>
                </div>

                {/* Payout Breakdown */}
                <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-2 text-xs text-emerald-900 space-y-1">
                  <div className="flex items-center justify-between font-semibold text-[11px]">
                    <span>{t.worker.requests.totalCustomerPaid}: ₹{req.totalAmount}</span>
                    <span className="text-emerald-700 font-bold">{t.worker.requests.directCredit} (88%): ₹{req.workerPayout}</span>
                  </div>
                  <div className="text-[10px] text-emerald-700">
                    ₹{req.coopFund} {t.worker.requests.welfareShare}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => onUpdateBookingStatus(req.id, 'declined')}
                    className="py-2.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                  >
                    <XCircle className="w-4 h-4" /> {t.worker.requests.declineJobBtn}
                  </button>
                  <button
                    onClick={() => onUpdateBookingStatus(req.id, 'accepted')}
                    className="py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" /> {t.worker.requests.acceptJobBtn}
                  </button>
                </div>

                {/* Demo expiry button */}
                <button
                  onClick={() => onUpdateBookingStatus(req.id, 'expired')}
                  className="w-full text-center text-[10px] text-slate-400 hover:text-rose-600 font-medium py-0.5 transition-colors"
                >
                  {currentLang === 'hi' ? '[डेमो: स्वतः-समयसमाप्ति सिमुलेट करें]' : currentLang === 'mr' ? '[डेमो: आपोआप मुदत संपणे सिमुलेट करा]' : '[Demo Control: Simulate Auto-Timeout / Expiry]'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
