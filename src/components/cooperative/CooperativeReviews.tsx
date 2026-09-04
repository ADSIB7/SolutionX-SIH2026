import React, { useState } from 'react';
import { Review } from '../../types';
import { 
  Star, 
  MessageSquare, 
  Search
} from 'lucide-react';
import { 
  AppLanguage, 
  mobileTranslations, 
  getLocalizedTrade, 
  getLocalizedReview 
} from '../../data/mobileTranslations';

interface CooperativeReviewsProps {
  reviews: Review[];
  currentLang?: AppLanguage;
}

export const CooperativeReviews: React.FC<CooperativeReviewsProps> = ({ 
  reviews,
  currentLang = 'en'
}) => {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [search, setSearch] = useState('');
  const t = mobileTranslations[currentLang];

  const filteredReviews = reviews.filter(r => {
    const matchesSearch = r.customerName.toLowerCase().includes(search.toLowerCase()) ||
                          r.workerName.toLowerCase().includes(search.toLowerCase()) ||
                          r.text.toLowerCase().includes(search.toLowerCase());
    const matchesRating = filterRating === 'all' || r.rating === filterRating;
    return matchesSearch && matchesRating;
  });

  return (
    <div className="space-y-4">
      {/* Cooperative Quality Benchmark */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">{t.cooperative.reviews.title}</h2>
            <p className="text-xs text-slate-500">{t.cooperative.reviews.subtitle}</p>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {t.cooperative.reviews.avgScore.replace('{score}', '4.93')}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-emerald-50/70 border border-emerald-200/50 p-2 rounded-xl">
            <div className="font-extrabold text-emerald-800 text-sm">98.4%</div>
            <div className="text-[10px] text-emerald-700">{t.cooperative.reviews.punctuality}</div>
          </div>
          <div className="bg-indigo-50/70 border border-indigo-200/50 p-2 rounded-xl">
            <div className="font-extrabold text-indigo-800 text-sm">100%</div>
            <div className="text-[10px] text-indigo-700">{t.cooperative.reviews.fairInvoicing}</div>
          </div>
          <div className="bg-teal-50/70 border border-teal-200/50 p-2 rounded-xl">
            <div className="font-extrabold text-teal-800 text-sm">0.2%</div>
            <div className="text-[10px] text-teal-700">{t.cooperative.reviews.disputeRate}</div>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.cooperative.reviews.searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setFilterRating('all')}
            className={`px-3 py-1 rounded-full font-medium transition-colors ${
              filterRating === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {currentLang === 'hi' ? 'सभी रेटिंग्स' : currentLang === 'mr' ? 'सर्व रेटिंग्ज' : 'All Ratings'} ({reviews.length})
          </button>
          {[5, 4, 3].map((star) => (
            <button
              key={star}
              onClick={() => setFilterRating(star)}
              className={`px-3 py-1 rounded-full font-medium transition-colors flex items-center gap-1 ${
                filterRating === star
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              <span>{star}★</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {filteredReviews.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-500">
            <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-semibold">
              {currentLang === 'hi' ? 'इस मानदंड से कोई समीक्षा मेल नहीं खाती' : currentLang === 'mr' ? 'या निकषाशी कोणतेही पुनरावलोकन जुळत नाही' : 'No reviews matching this criteria'}
            </p>
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-sm space-y-2 hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{rev.customerName}</span>
                    <span className="text-[10px] text-slate-400">• {rev.date}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 flex items-center gap-1 mt-0.5">
                    <span>{currentLang === 'hi' ? 'आवंटित सदस्य:' : currentLang === 'mr' ? 'नियुक्त सदस्य:' : 'Assigned Member:'}</span>
                    <strong className="text-slate-800">{rev.workerName}</strong>
                    <span className="text-[10px] text-slate-400">({getLocalizedTrade(rev.trade, currentLang)})</span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 text-xs font-extrabold text-amber-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{rev.rating}.0</span>
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
