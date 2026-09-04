import React, { useEffect } from 'react';
import { X, Bell, CheckCheck, Clock, ShieldAlert, Receipt, Star, Briefcase } from 'lucide-react';
import { AppNotification, UserRole } from '../../types';
import { AppLanguage, mobileTranslations } from '../../data/mobileTranslations';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  notifications: AppNotification[];
  onMarkAllRead: () => void;
  onNotificationClick: (notification: AppNotification) => void;
  currentLang?: AppLanguage;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  currentRole,
  notifications,
  onMarkAllRead,
  onNotificationClick,
  currentLang = 'en'
}) => {
  const t = mobileTranslations[currentLang];

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter notifications for this role
  const roleNotifs = notifications.filter(n => n.role === currentRole);
  const unreadCount = roleNotifs.filter(n => !n.isRead).length;

  const getLocalizedNotification = (n: AppNotification) => {
    let title = n.title;
    let message = n.message;

    if (currentLang === 'hi') {
      if (title.includes('Request Received') || title.includes('New Direct Request')) {
        title = 'नया कार्य अनुरोध प्राप्त';
      } else if (title.includes('Booking Confirmed') || title.includes('Request Accepted')) {
        title = 'बुकिंग स्वीकृत व पक्की';
      } else if (title.includes('Invoice') || title.includes('Receipt')) {
        title = 'प्रमाणित रसीद उपलब्ध';
      } else if (title.includes('Review') || title.includes('Rating')) {
        title = 'नई ग्राहक समीक्षा प्राप्त';
      } else if (title.includes('Grievance') || title.includes('Dispute')) {
        title = 'वार्ड परिषद सूचना';
      }
    } else if (currentLang === 'mr') {
      if (title.includes('Request Received') || title.includes('New Direct Request')) {
        title = 'नवीन काम विनंती प्राप्त';
      } else if (title.includes('Booking Confirmed') || title.includes('Request Accepted')) {
        title = 'बुकिंग मंजूर व निश्चित';
      } else if (title.includes('Invoice') || title.includes('Receipt')) {
        title = 'प्रमाणित पावती उपलब्ध';
      } else if (title.includes('Review') || title.includes('Rating')) {
        title = 'नवीन ग्राहक अभिप्राय';
      } else if (title.includes('Grievance') || title.includes('Dispute')) {
        title = 'वॉर्ड परिषद सूचना';
      }
    }

    return { title, message };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">{t.notifications.title}</h3>
              <p className="text-[11px] text-slate-400 capitalize">
                {t.notifications.updates.replace('{role}', t.roles[currentRole])}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Actions bar */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">
            {roleNotifs.length} {currentLang === 'hi' ? 'सूचनाएँ' : currentLang === 'mr' ? 'सूचना' : 'alerts'} ({unreadCount} {currentLang === 'hi' ? 'अपठित' : currentLang === 'mr' ? 'न वाचलेले' : 'unread'})
          </span>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllRead}
              className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>{t.notifications.markAllRead}</span>
            </button>
          )}
        </div>

        {/* Notification list */}
        <div className="p-3 space-y-2.5 overflow-y-auto max-h-[60vh]">
          {roleNotifs.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs font-medium">{t.notifications.emptyText}</p>
            </div>
          ) : (
            roleNotifs.map((n) => {
              const isPayment = n.type === 'payment_received' || n.type === 'invoice_issued';
              const isDispute = n.type === 'dispute_opened' || n.type === 'dispute_resolved';
              const isReview = n.type === 'review_received';
              const localized = getLocalizedNotification(n);

              return (
                <div
                  key={n.id}
                  onClick={() => {
                    onNotificationClick(n);
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer hover:border-emerald-400 ${
                    n.isRead 
                      ? 'bg-white border-slate-200 opacity-80' 
                      : 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 min-w-0">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 min-w-0">
                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                      )}
                      {isPayment ? (
                        <Receipt className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      ) : isDispute ? (
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      ) : isReview ? (
                        <Star className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      ) : (
                        <Briefcase className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      )}
                      <span className="truncate">{localized.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {n.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed break-words">
                    {localized.message}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    {n.bookingId && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md font-mono">
                        Ref #{n.bookingId.slice(-6).toUpperCase()}
                      </span>
                    )}
                    <span className="text-[10px] font-semibold text-slate-400 hover:text-emerald-700">
                      {t.notifications.tapToView} →
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-3 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
          >
            {t.common.close}
          </button>
        </div>

      </div>
    </div>
  );
};
