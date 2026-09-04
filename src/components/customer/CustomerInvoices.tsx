import React, { useState, useEffect } from 'react';
import { Invoice } from '../../types';
import { 
  FileText, 
  IndianRupee, 
  CheckCircle2, 
  Clock, 
  Download, 
  Building2, 
  ShieldCheck, 
  X, 
  ExternalLink,
  Receipt
} from 'lucide-react';
import { 
  AppLanguage, 
  mobileTranslations, 
  getLocalizedTrade, 
  getLocalizedTask 
} from '../../data/mobileTranslations';

interface CustomerInvoicesProps {
  invoices: Invoice[];
  currentLang?: AppLanguage;
  onNavigateTab: (tab: string) => void;
}

export const CustomerInvoices: React.FC<CustomerInvoicesProps> = ({
  invoices,
  currentLang = 'en',
  onNavigateTab
}) => {
  const t = mobileTranslations[currentLang];
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedInvoice(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-2xl p-4 shadow-sm space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1">
          <Receipt className="w-3.5 h-3.5" /> {t.customer.invoices.certifiedReceipts}
        </span>
        <h2 className="text-base font-extrabold text-white">{t.customer.invoices.headerTitle}</h2>
        <p className="text-xs text-blue-200">
          {t.customer.invoices.headerDesc}
        </p>
      </div>

      {/* Invoice List */}
      <div className="space-y-3">
        {invoices.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-500 space-y-2">
            <FileText className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold">{t.customer.invoices.emptyTitle}</p>
            <p className="text-[11px] text-slate-400">{t.customer.invoices.emptyDesc}</p>
          </div>
        ) : (
          invoices.map((inv) => {
            const isPaid = inv.paymentStatus === 'paid';

            return (
              <div 
                key={inv.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                      {inv.invoiceNumber}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">{getLocalizedTask(inv.taskDescription, currentLang)}</h3>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {t.customer.invoices.serviceBy} <strong className="text-slate-800">{inv.workerName}</strong> ({getLocalizedTrade(inv.workerTrade, currentLang)})
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-slate-900 flex items-center justify-end">
                      <IndianRupee className="w-3.5 h-3.5" /> {inv.totalAmount}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                      isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {inv.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Co-op Fee Breakdown Strip */}
                <div className="bg-slate-50 rounded-xl p-2.5 text-xs text-slate-600 space-y-1.5 border border-slate-100">
                  <div className="flex items-center justify-between text-[11px]">
                    <span>{t.customer.invoices.workerPayout}</span>
                    <strong className="text-emerald-700 font-bold">₹{inv.workerPayout}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span>{t.customer.invoices.welfareFund}</span>
                    <strong className="text-teal-700 font-bold">₹{inv.coopWelfareFund}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                    <span>{t.customer.invoices.platformFee}</span>
                    <strong className="text-emerald-800 font-bold">₹0 ({t.customer.invoices.zeroExtortion})</strong>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => setSelectedInvoice(inv)}
                  className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-blue-200"
                >
                  <FileText className="w-3.5 h-3.5" /> {t.customer.invoices.viewInvoiceBtn}
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> {t.customer.invoices.modalTitle}
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 mt-0.5">{selectedInvoice.invoiceNumber}</h3>
                <p className="text-[10px] text-slate-400">Date: {selectedInvoice.date}</p>
              </div>
              <button 
                onClick={() => setSelectedInvoice(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cooperative Society Details */}
            <div className="bg-emerald-50/80 rounded-xl p-3 text-xs space-y-1 border border-emerald-200/60">
              <div className="font-bold text-emerald-950">{selectedInvoice.coopName}</div>
              <div className="text-[11px] text-emerald-800">Govt Society Reg # MH-PUN-COOP-2022-8491</div>
              {selectedInvoice.gstRegistration && (
                <div className="text-[10px] text-emerald-700">GSTIN: {selectedInvoice.gstRegistration}</div>
              )}
            </div>

            {/* Bill To & Worker Details */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{t.customer.invoices.billedTo}:</span>
                <div className="font-bold text-slate-800">{selectedInvoice.customerName}</div>
                <div className="text-[10px] text-slate-500">{t.customer.invoices.residentClient}</div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{t.customer.invoices.provider}:</span>
                <div className="font-bold text-slate-800">{selectedInvoice.workerName}</div>
                <div className="text-[10px] text-slate-500">{getLocalizedTrade(selectedInvoice.workerTrade, currentLang)}</div>
              </div>
            </div>

            {/* Itemized Line Items */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-800">{t.customer.invoices.serviceParticulars}</div>
              <div className="space-y-1.5 border border-slate-200 rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">{getLocalizedTask(selectedInvoice.taskDescription, currentLang)}</span>
                  <span className="font-bold text-slate-900">₹{selectedInvoice.baseFee}</span>
                </div>
                {selectedInvoice.materialCost > 0 && (
                  <div className="flex items-center justify-between text-slate-500">
                    <span>{t.customer.invoices.spareParts}</span>
                    <span>₹{selectedInvoice.materialCost}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>{t.customer.invoices.platformCommission}</span>
                  <span className="text-emerald-700 font-bold">₹0.00 ({t.customer.invoices.zeroExtortion})</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>{t.customer.invoices.socialWelfarePool}</span>
                  <span>₹{selectedInvoice.coopWelfareFund}</span>
                </div>
                <div className="flex items-center justify-between font-extrabold text-sm text-slate-900 pt-2 border-t border-slate-200">
                  <span>{t.customer.invoices.totalAmountPaid}</span>
                  <span className="text-emerald-700">₹{selectedInvoice.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Payment Meta */}
            <div className="bg-slate-50 rounded-xl p-2.5 text-[11px] text-slate-500 space-y-1 border border-slate-100">
              <div className="flex items-center justify-between">
                <span>{t.customer.invoices.paymentMode}:</span>
                <strong className="text-slate-700">{selectedInvoice.paymentMethod}</strong>
              </div>
              <div className="flex items-center justify-between font-mono">
                <span>{t.customer.invoices.refId}:</span>
                <span className="text-slate-700">{selectedInvoice.transactionRef}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  alert(`${t.customer.invoices.downloadSuccess}: ${selectedInvoice.invoiceNumber}`);
                  setSelectedInvoice(null);
                }}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> {t.customer.invoices.downloadPdf}
              </button>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                {t.customer.invoices.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
