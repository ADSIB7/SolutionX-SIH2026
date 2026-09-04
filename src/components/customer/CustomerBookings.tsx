import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Star, 
  Phone, 
  ShieldAlert, 
  ChevronRight, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Booking, BookingStatus, Review } from '../../types';
import { 
  AppLanguage, 
  mobileTranslations, 
  getLocalizedStatus, 
  getLocalizedTrade, 
  getLocalizedSlot, 
  getLocalizedTask, 
  getLocalizedReview 
} from '../../data/mobileTranslations';

interface CustomerBookingsProps {
  bookings: Booking[];
  currentLang?: AppLanguage;
  onUpdateBookingStatus: (bookingId: string, newStatus: BookingStatus, note?: string) => void;
  onSubmitReview: (bookingId: string, rating: number, text: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const CustomerBookings: React.FC<CustomerBookingsProps> = ({
  bookings,
  currentLang = 'en',
  onUpdateBookingStatus,
  onSubmitReview,
  onNavigateTab
}) => {
  const t = mobileTranslations[currentLang];
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed' | 'disputed'>('all');
  
  // Rate & Review Modal State
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const filteredBookings = bookings.filter((b) => {
    if (activeFilter === 'active') return b.status === 'requested' || b.status === 'accepted' || b.status === 'in_progress';
    if (activeFilter === 'completed') return b.status === 'completed';
    if (activeFilter === 'disputed') return b.status === 'disputed';
    return true;
  });

  const handleOpenReview = (b: Booking) => {
    setReviewBooking(b);
    setReviewRating(5);
    setReviewComment('');
  };

  const handleSendReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewBooking) return;
    onSubmitReview(reviewBooking.id, reviewRating, reviewComment);
    setReviewBooking(null);
  };

  const getStatusBadge = (status: BookingStatus) => {
    const label = getLocalizedStatus(status, currentLang);
    switch (status) {
      case 'requested':
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">{label}</span>;
      case 'accepted':
      case 'in_progress':
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">{label}</span>;
      case 'completed':
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">{label}</span>;
      case 'disputed':
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-800">{label}</span>;
      case 'declined':
      case 'expired':
      default:
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">{label}</span>;
    }
  };

  return (
    <div className="p-4 space-y-4 pb-24 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <h2 className="text-lg font-black text-slate-900 tracking-tight">{t.customer.bookings.title}</h2>
        <p className="text-xs text-slate-500">{t.customer.bookings.subtitle}</p>
      </div>

      {/* Filter Segmented Control */}
      <div className="flex items-center bg-slate-100 p-1 rounded-2xl text-xs font-bold text-slate-600">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`flex-1 py-1.5 rounded-xl transition-all ${
            activeFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
          }`}
        >
          {t.customer.bookings.filterAll} ({bookings.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('active')}
          className={`flex-1 py-1.5 rounded-xl transition-all ${
            activeFilter === 'active' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
          }`}
        >
          {t.customer.bookings.filterActive}
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('completed')}
          className={`flex-1 py-1.5 rounded-xl transition-all ${
            activeFilter === 'completed' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
          }`}
        >
          {t.customer.bookings.filterCompleted}
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('disputed')}
          className={`flex-1 py-1.5 rounded-xl transition-all ${
            activeFilter === 'disputed' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
          }`}
        >
          {t.customer.bookings.filterDisputes}
        </button>
      </div>

      {/* Bookings List */}
      <div className="space-y-3.5">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500 font-medium">{t.customer.bookings.emptyBookings}</p>
            <button
              type="button"
              onClick={() => onNavigateTab('book')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-2xs"
            >
              {t.customer.bookings.bookWorkerNow}
            </button>
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs space-y-3.5"
            >
              {/* Card top bar */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-900 font-mono">#{b.id}</span>
                {getStatusBadge(b.status)}
              </div>

              {/* Worker & Task details */}
              <div className="flex items-start gap-3">
                <img
                  src={b.workerPhoto}
                  alt={b.workerName}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{b.workerName}</h4>
                  <span className="text-xs text-blue-700 font-semibold block">{getLocalizedTrade(b.workerTrade, currentLang)}</span>
                  <p className="text-xs text-slate-600 mt-1 leading-snug">{getLocalizedTask(b.taskDescription, currentLang)}</p>
                </div>
              </div>

              {/* Slot & Fare strip */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{getLocalizedSlot(b.scheduledSlot, currentLang)}</span>
                </div>
                <div className="font-bold text-slate-900">
                  ₹{b.totalAmount} <span className="text-[10px] text-blue-700 font-normal">({t.customer.bookings.directPayoutPercent})</span>
                </div>
              </div>

              {/* 6-Stage Timeline Progress Tracker */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">
                  {t.customer.bookings.serviceLifecycle}
                </span>
                
                <div className="flex items-center justify-between relative px-2">
                  <div className="absolute top-2 left-4 right-4 h-0.5 bg-slate-200 -z-0" />
                  
                  {/* Stage 1: Dispatched */}
                  <div className="flex flex-col items-center z-10">
                    <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] font-bold">
                      ✓
                    </div>
                    <span className="text-[9px] font-medium text-slate-600 mt-1">{t.customer.bookings.stageSent}</span>
                  </div>

                  {/* Stage 2: Accepted */}
                  <div className="flex flex-col items-center z-10">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      b.status !== 'requested' && b.status !== 'declined' && b.status !== 'expired'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}>
                      {b.status !== 'requested' && b.status !== 'declined' && b.status !== 'expired' ? '✓' : '2'}
                    </div>
                    <span className="text-[9px] font-medium text-slate-600 mt-1">{t.customer.bookings.stageConfirmed}</span>
                  </div>

                  {/* Stage 3: In Progress */}
                  <div className="flex flex-col items-center z-10">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      b.status === 'in_progress' || b.status === 'completed'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}>
                      {b.status === 'in_progress' || b.status === 'completed' ? '✓' : '3'}
                    </div>
                    <span className="text-[9px] font-medium text-slate-600 mt-1">{t.customer.bookings.stageWork}</span>
                  </div>

                  {/* Stage 4: Completed */}
                  <div className="flex flex-col items-center z-10">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      b.status === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}>
                      {b.status === 'completed' ? '✓' : '4'}
                    </div>
                    <span className="text-[9px] font-medium text-slate-600 mt-1">{t.customer.bookings.stageDone}</span>
                  </div>

                  {/* Stage 5: Reviewed */}
                  <div className="flex flex-col items-center z-10">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      b.rating ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-400'
                    }`}>
                      {b.rating ? '★' : '5'}
                    </div>
                    <span className="text-[9px] font-medium text-slate-600 mt-1">{t.customer.bookings.stageRated}</span>
                  </div>
                </div>
              </div>

              {/* Prototype Lifecycle Controls & Actions */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                
                {/* Progress Active Booking Demo Controls */}
                {b.status === 'accepted' && (
                  <button
                    type="button"
                    onClick={() => onUpdateBookingStatus(b.id, 'in_progress', 'Worker arrived at service address and initiated task.')}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-2xs"
                  >
                    {t.customer.bookings.demoWorkStarted}
                  </button>
                )}

                {b.status === 'in_progress' && (
                  <button
                    type="button"
                    onClick={() => onUpdateBookingStatus(b.id, 'completed', 'Job completed with 30-day rework warranty.')}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-2xs"
                  >
                    {t.customer.bookings.demoMarkCompleted}
                  </button>
                )}

                {/* Completed & Not Yet Reviewed */}
                {b.status === 'completed' && !b.rating && (
                  <button
                    type="button"
                    onClick={() => handleOpenReview(b)}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 flex items-center justify-center gap-1.5"
                  >
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{t.customer.bookings.rateWorker.replace('{name}', b.workerName)}</span>
                  </button>
                )}

                {/* Show Existing Rating */}
                {b.rating && (
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 flex-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{t.customer.bookings.ratedScore.replace('{rating}', String(b.rating))}</span>
                    <span className="text-slate-500 font-normal truncate ml-1">"{getLocalizedReview(b.reviewText || '', currentLang)}"</span>
                  </div>
                )}

                {/* Dispute Action button */}
                {b.status !== 'disputed' && (b.status === 'completed' || b.status === 'active' || b.status === 'in_progress') && (
                  <button
                    type="button"
                    onClick={() => onNavigateTab('support')}
                    className="py-1.5 px-3 rounded-xl text-xs font-medium text-slate-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                  >
                    {t.customer.bookings.raiseIssue}
                  </button>
                )}
              </div>

            </div>
          ))
        )}
      </div>

      {/* Rate & Review Bottom Sheet Modal */}
      {reviewBooking && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 p-5 space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {t.customer.bookings.reviewTitle.replace('{name}', reviewBooking.workerName)}
                </h3>
                <p className="text-xs text-slate-500">
                  #{reviewBooking.id} • {getLocalizedTrade(reviewBooking.workerTrade, currentLang)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setReviewBooking(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendReview} className="space-y-3.5">
              
              {/* Star rating selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.customer.bookings.selectRating}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 text-2xl focus:outline-none transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= reviewRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-sm font-extrabold text-slate-800 ml-2">
                    {reviewRating} / 5
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.customer.bookings.feedbackLabel}
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={t.customer.bookings.feedbackPlaceholder}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-2xs"
              >
                {t.customer.bookings.submitReview}
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
