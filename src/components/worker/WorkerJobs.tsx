import React, { useState } from 'react';
import { Booking, BookingStatus } from '../../types';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle2, 
  PlayCircle, 
  IndianRupee, 
  ChevronRight
} from 'lucide-react';
import { 
  AppLanguage, 
  mobileTranslations, 
  getLocalizedStatus, 
  getLocalizedSlot, 
  getLocalizedTask 
} from '../../data/mobileTranslations';

interface WorkerJobsProps {
  bookings: Booking[];
  currentLang?: AppLanguage;
  onUpdateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  onNavigateTab: (tab: string) => void;
}

export const WorkerJobs: React.FC<WorkerJobsProps> = ({
  bookings,
  currentLang = 'en',
  onUpdateBookingStatus,
  onNavigateTab
}) => {
  const t = mobileTranslations[currentLang];
  const [filter, setFilter] = useState<'active' | 'completed' | 'all'>('active');

  // Filter bookings for worker Ramesh Jadhav or general demo
  const workerBookings = bookings.filter(b => 
    b.workerId === 'w1' || b.workerId === 'w-ramesh-jadhav' || b.workerName.toLowerCase().includes('ramesh')
  );
  
  const filteredBookings = workerBookings.filter(b => {
    if (filter === 'active') {
      return ['accepted', 'active', 'in_progress'].includes(b.status);
    }
    if (filter === 'completed') {
      return b.status === 'completed';
    }
    return true;
  });

  const activeCount = workerBookings.filter(b => ['accepted', 'active', 'in_progress'].includes(b.status)).length;
  const pendingRequestsCount = bookings.filter(b => 
    (b.workerId === 'w1' || b.workerId === 'w-ramesh-jadhav' || b.workerName.toLowerCase().includes('ramesh')) && 
    b.status === 'requested'
  ).length;

  return (
    <div className="space-y-4">
      {/* Banner / Shift Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">{t.worker.jobs.dutyShiftActive}</span>
            </div>
            <span className="text-xs bg-emerald-700/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-emerald-100 font-medium">
              {t.worker.jobs.wardHub}
            </span>
          </div>

          <h2 className="text-lg font-bold text-white mt-2">Ramesh Jadhav</h2>
          <p className="text-xs text-emerald-200">{t.worker.jobs.directPayoutRate}</p>

          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-emerald-700/60 text-center">
            <div className="bg-emerald-950/40 rounded-xl p-2 border border-emerald-600/30">
              <div className="text-base font-bold text-white">{activeCount}</div>
              <div className="text-[10px] text-emerald-300">{t.worker.jobs.activeJobs}</div>
            </div>
            <div className="bg-emerald-950/40 rounded-xl p-2 border border-emerald-600/30">
              <div className="text-base font-bold text-white">₹3,850</div>
              <div className="text-[10px] text-emerald-300">{t.worker.jobs.todayNet}</div>
            </div>
            <div className="bg-emerald-950/40 rounded-xl p-2 border border-emerald-600/30">
              <div className="text-base font-bold text-emerald-300">4.94★</div>
              <div className="text-[10px] text-emerald-300">{t.worker.jobs.qualityScore}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Requests Alert if any */}
      {pendingRequestsCount > 0 && (
        <div 
          onClick={() => onNavigateTab('requests')}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer hover:bg-amber-100/70 transition-colors shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm shrink-0 animate-bounce">
              {pendingRequestsCount}
            </div>
            <div>
              <div className="text-xs font-bold text-amber-900">{t.worker.jobs.newRequestAlert}</div>
              <div className="text-[11px] text-amber-700">{t.worker.jobs.decisionWindowActive}</div>
            </div>
          </div>
          <div className="flex items-center text-xs font-semibold text-amber-900 gap-1">
            {t.worker.jobs.reviewBtn} <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600">
        <button
          onClick={() => setFilter('active')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            filter === 'active' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'
          }`}
        >
          {t.worker.jobs.filterActive} ({activeCount})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            filter === 'completed' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'
          }`}
        >
          {t.worker.jobs.filterCompleted}
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            filter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'
          }`}
        >
          {t.worker.jobs.filterAll} ({workerBookings.length})
        </button>
      </div>

      {/* Job Cards List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-500">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">{t.worker.jobs.emptyJobs}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBookings.map((job) => {
            const isAccepted = job.status === 'accepted';
            const isInProgress = job.status === 'in_progress';
            const isDone = job.status === 'completed';

            return (
              <div 
                key={job.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3 hover:border-emerald-300 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2 min-w-0">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                        #{job.id.slice(-6).toUpperCase()}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize shrink-0 ${
                        isInProgress ? 'bg-indigo-100 text-indigo-700' :
                        isAccepted ? 'bg-emerald-100 text-emerald-700' :
                        isDone ? 'bg-slate-100 text-slate-700' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {getLocalizedStatus(job.status, currentLang)}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 mt-1 break-words leading-tight">{getLocalizedTask(job.taskDescription, currentLang)}</h3>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-extrabold text-emerald-700 flex items-center justify-end">
                      <IndianRupee className="w-3.5 h-3.5" />
                      {job.workerPayout}
                    </div>
                    <div className="text-[10px] text-slate-400">{t.worker.jobs.yourTakeHome}</div>
                  </div>
                </div>

                {/* Customer and Location info */}
                <div className="bg-slate-50 rounded-xl p-2.5 text-xs text-slate-600 space-y-1.5 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">{job.customerName}</span>
                    <a 
                      href={`tel:${job.customerPhone}`}
                      className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200"
                    >
                      <Phone className="w-3 h-3" /> {t.worker.jobs.customer}
                    </a>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{job.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{getLocalizedSlot(job.scheduledSlot, currentLang)}</span>
                  </div>
                </div>

                {/* Action simulation buttons */}
                <div className="pt-1">
                  {isAccepted && (
                    <button
                      onClick={() => onUpdateBookingStatus(job.id, 'in_progress')}
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <PlayCircle className="w-4 h-4" /> {t.worker.jobs.startJobBtn}
                    </button>
                  )}

                  {isInProgress && (
                    <button
                      onClick={() => onUpdateBookingStatus(job.id, 'completed')}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" /> {t.worker.jobs.completeJobBtn}
                    </button>
                  )}

                  {isDone && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-xl p-2.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t.worker.jobs.completedBadge}
                      </span>
                      <span className="font-bold">₹{job.workerPayout}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
