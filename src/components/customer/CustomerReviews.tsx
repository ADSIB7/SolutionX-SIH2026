import React from 'react';
import { Star, CheckCircle2, MessageSquare, Award } from 'lucide-react';
import { Review } from '../../types';

interface CustomerReviewsProps {
  reviews: Review[];
  onNavigateTab: (tab: string) => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  reviews,
  onNavigateTab
}) => {
  return (
    <div className="p-4 space-y-4 pb-24 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <h2 className="text-lg font-black text-slate-900 tracking-tight">Your Reviews & Ratings</h2>
        <p className="text-xs text-slate-500">Authentic feedback supporting worker-owner quality and cooperative dividends</p>
      </div>

      {/* Summary metric card */}
      <div className="bg-gradient-to-r from-brand-900 to-slate-900 rounded-3xl p-4 text-white shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs text-brand-300 font-semibold block">Total Reviews Given</span>
          <span className="text-2xl font-black text-white">{reviews.length} Verified</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-brand-300 font-semibold block">Cooperative Impact</span>
          <span className="text-xs text-emerald-300 font-bold flex items-center gap-1 mt-1 justify-end">
            <Award className="w-3.5 h-3.5" />
            <span>Fair Dividend Audited</span>
          </span>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-3">
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
            <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500">You have not submitted any reviews yet.</p>
            <button
              type="button"
              onClick={() => onNavigateTab('bookings')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-700 hover:bg-brand-800 shadow-2xs"
            >
              View Completed Bookings
            </button>
          </div>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{rev.workerName}</h4>
                  <span className="text-xs text-brand-700 font-medium">{rev.trade}</span>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 text-amber-700 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{rev.rating} / 5</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100 italic">
                "{rev.text}"
              </p>

              <div className="flex items-center justify-between text-[10.5px] text-slate-400 pt-1">
                <span>Date: {rev.date}</span>
                <span className="flex items-center gap-1 text-brand-700 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-brand-600" />
                  <span>Cooperative Verified</span>
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
