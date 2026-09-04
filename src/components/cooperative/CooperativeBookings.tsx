import React, { useState } from 'react';
import { Booking, BookingStatus } from '../../types';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  User, 
  Search 
} from 'lucide-react';
import { 
  AppLanguage, 
  mobileTranslations, 
  getLocalizedStatus, 
  getLocalizedTask, 
  getLocalizedSlot 
} from '../../data/mobileTranslations';

interface CooperativeBookingsProps {
  bookings: Booking[];
  onUpdateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  currentLang?: AppLanguage;
}

export const CooperativeBookings: React.FC<CooperativeBookingsProps> = ({
  bookings,
  onUpdateBookingStatus,
  currentLang = 'en'
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'active' | 'completed'>('all');
  const [search, setSearch] = useState('');
  const t = mobileTranslations[currentLang];

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.taskDescription.toLowerCase().includes(search.toLowerCase()) ||
                          b.customerName.toLowerCase().includes(search.toLowerCase()) ||
                          b.workerName.toLowerCase().includes(search.toLowerCase());
    
    if (!matchesSearch) return false;
    if (filter === 'pending') return b.status === 'requested';
    if (filter === 'active') return ['accepted', 'active', 'in_progress'].includes(b.status);
    if (filter === 'completed') return b.status === 'completed';
    return true;
  });

  const getFilterLabel = (f: 'all' | 'pending' | 'active' | 'completed') => {
    switch (f) {
      case 'all': return t.customer.bookings.filterAll;
      case 'pending': return currentLang === 'hi' ? 'लंबित' : currentLang === 'mr' ? 'प्रलंबित' : 'Pending';
      case 'active': return t.customer.bookings.filterActive;
      case 'completed': return t.customer.bookings.filterCompleted;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900">{t.cooperative.bookings.title}</h2>
          <p className="text-xs text-slate-500">{t.cooperative.bookings.subtitle}</p>
        </div>
        <span className="text-xs bg-purple-50 text-purple-800 font-bold px-2.5 py-1 rounded-xl border border-purple-200">
          {t.cooperative.bookings.totalLogs.replace('{count}', String(bookings.length))}
        </span>
      </div>

      {/* Filter and Search */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.cooperative.bookings.searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl text-[11px] font-semibold text-slate-600">
          {(['all', 'pending', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`py-1 rounded-lg capitalize transition-all ${
                filter === f ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-900'
              }`}
            >
              {getFilterLabel(f)}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-500">
            <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-semibold">{t.cooperative.bookings.noMatch}</p>
          </div>
        ) : (
          filteredBookings.map((b) => {
            const isPending = b.status === 'requested';
            const isActive = ['accepted', 'active', 'in_progress'].includes(b.status);
            const isCompleted = b.status === 'completed';

            return (
              <div 
                key={b.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-sm space-y-2.5 hover:border-purple-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        #{b.id.slice(-6).toUpperCase()}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                        isActive ? 'bg-indigo-100 text-indigo-700' :
                        isPending ? 'bg-amber-100 text-amber-800' :
                        isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {getLocalizedStatus(b.status, currentLang)}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-1">
                      {getLocalizedTask(b.taskDescription, currentLang)}
                    </h3>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-extrabold text-slate-900">₹{b.totalAmount}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">
                      {t.cooperative.bookings.toCoop.replace('{amount}', String(b.coopFund))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-2.5 text-xs text-slate-600 space-y-1.5 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">{t.worker.jobs.customer} {b.customerName}</span>
                    <span className="text-[10px] text-slate-500">
                      {getLocalizedSlot(b.scheduledSlot, currentLang)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1 text-slate-700">
                      <User className="w-3 h-3 text-emerald-600" /> {currentLang === 'hi' ? 'आवंटित: ' : currentLang === 'mr' ? 'नियुक्त: ' : 'Assigned: '}<strong>{b.workerName}</strong>
                    </span>
                    <span className="text-[10px] text-slate-500">{b.locality}</span>
                  </div>
                </div>

                {/* Dispatch interventions */}
                {isPending && (
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => onUpdateBookingStatus(b.id, 'accepted')}
                      className="flex-1 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      {t.cooperative.bookings.promptAcceptHub}
                    </button>
                    <button
                      onClick={() => onUpdateBookingStatus(b.id, 'declined')}
                      className="py-1.5 px-3 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 rounded-xl text-xs font-semibold transition-colors"
                    >
                      {t.cooperative.bookings.reassignBtn}
                    </button>
                  </div>
                )}

                {isActive && (
                  <div className="flex items-center justify-between text-[11px] text-indigo-700 bg-indigo-50/70 p-2 rounded-xl border border-indigo-100 font-medium">
                    <span>{t.cooperative.bookings.activeExecution}</span>
                    <button
                      onClick={() => onUpdateBookingStatus(b.id, 'completed')}
                      className="font-bold underline text-indigo-800 hover:text-indigo-900"
                    >
                      {t.cooperative.bookings.markDoneBtn}
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
