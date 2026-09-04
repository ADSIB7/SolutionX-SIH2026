import React from 'react';
import { Review } from '../../types';
import { 
  Star, 
  ShieldCheck, 
  Award, 
  ThumbsUp, 
  CheckCircle2, 
  MessageSquare
} from 'lucide-react';
import { 
  AppLanguage, 
  mobileTranslations, 
  getLocalizedTrade, 
  getLocalizedReview 
} from '../../data/mobileTranslations';

interface WorkerReviewsProps {
  reviews: Review[];
  currentLang?: AppLanguage;
}

export const WorkerReviews: React.FC<WorkerReviewsProps> = ({ reviews, currentLang = 'en' }) => {
  const t = mobileTranslations[currentLang];

  // Reviews for Ramesh Jadhav
  const workerReviews = reviews.filter(r => 
    r.workerId === 'w1' || r.workerId === 'w-ramesh-jadhav' || r.workerName.toLowerCase().includes('ramesh')
  );

  return (
    <div className="space-y-4">
      {/* Score Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {t.worker.reviews.trustMetric}
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-1">{t.worker.reviews.customerReputation}</h2>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> {t.worker.reviews.tierAVerified}
          </span>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-3 border border-slate-100">
          <div className="text-center shrink-0 pr-3 border-r border-slate-200">
            <div className="text-3xl font-black text-slate-900 leading-none">4.94</div>
            <div className="flex items-center justify-center text-amber-500 my-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-[10px] text-slate-500">{workerReviews.length + 80} {t.worker.reviews.totalRatings}</div>
          </div>

          <div className="flex-1 space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-600 w-3 font-semibold">5★</span>
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
              </div>
              <span className="text-[10px] text-slate-400 w-6 text-right">92%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-600 w-3 font-semibold">4★</span>
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '8%' }} />
              </div>
              <span className="text-[10px] text-slate-400 w-6 text-right">8%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-600 w-3 font-semibold">3★</span>
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '0%' }} />
              </div>
              <span className="text-[10px] text-slate-400 w-6 text-right">0%</span>
            </div>
          </div>
        </div>

        {/* Quality highlights */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-2.5 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <div className="font-bold text-emerald-900">99.4% On-Time</div>
              <div className="text-[10px] text-emerald-700">Ward 14 Leader</div>
            </div>
          </div>
          <div className="bg-teal-50/70 border border-teal-200/60 rounded-xl p-2.5 flex items-center gap-2">
            <ThumbsUp className="w-5 h-5 text-teal-600 shrink-0" />
            <div>
              <div className="font-bold text-teal-900">100% Fair Pricing</div>
              <div className="text-[10px] text-teal-700">No Price Gouging</div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Feed */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
          {t.worker.reviews.recentCustomerFeedback} ({workerReviews.length})
        </h3>

        {workerReviews.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-500">
            <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-semibold">No reviews recorded yet</p>
          </div>
        ) : (
          workerReviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-2.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{rev.customerName}</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {t.worker.reviews.verifiedBooking}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{rev.date} • {getLocalizedTrade(rev.trade, currentLang)}</div>
                </div>

                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-extrabold text-amber-800">{rev.rating}.0</span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                "{getLocalizedReview(rev.text, currentLang)}"
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
