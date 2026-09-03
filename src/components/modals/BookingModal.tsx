import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  ArrowRight,
  UserCheck,
  Star,
  Sparkles,
  Zap
} from 'lucide-react';
import { servicesData } from '../../data/servicesData';
import { popularLocations } from '../../data/cooperativeData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: {
    serviceId?: string;
    location?: string;
    date?: string;
    timeSlot?: string;
  };
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  prefill
}) => {
  if (!isOpen) return null;

  const [selectedServiceId, setSelectedServiceId] = useState(prefill?.serviceId || 'electrician');
  const [selectedSubServiceId, setSelectedSubServiceId] = useState('');
  const [address, setAddress] = useState(prefill?.location || 'Kothrud, Pune');
  const [date, setDate] = useState(prefill?.date || 'Today');
  const [slot, setSlot] = useState(prefill?.timeSlot || '10:00 AM - 12:00 PM');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const currentService = servicesData.find(s => s.id === selectedServiceId) || servicesData[0];
  const selectedSub = currentService.subServices.find(sub => sub.id === selectedSubServiceId) || currentService.subServices[0];
  const basePrice = selectedSub ? selectedSub.basePrice : currentService.minPrice;
  const platformFee = 15;
  const totalPrice = basePrice + platformFee;
  const workerPayout = Math.round(basePrice * 0.88);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `WEMP-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingId(generatedId);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-brand-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Book a Verified Cooperative Service</h3>
              <p className="text-xs text-slate-300">Zero surge pricing • 88% direct payout to worker</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Booking Confirmed
                </span>
                <h4 className="text-2xl font-extrabold text-slate-900">
                  Worker Dispatched!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Your booking ID is <span className="font-bold text-brand-700">{bookingId}</span>. A verified worker-member from your local ward hub has received the dispatch.
                </p>
              </div>

              {/* Assigned Worker Info Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto text-left flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Ramesh Jadhav"
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-400"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-slate-900">Ramesh Jadhav</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded">
                        Co-owner
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 block">Senior Electrician (4.94 ★)</span>
                    <span className="text-xs text-emerald-600 font-semibold">ETA: ~25 mins</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Total Est.</span>
                  <span className="text-base font-extrabold text-slate-900">₹{totalPrice}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
                >
                  Close & Track on Dashboard
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Service & Sub-service Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Service Category
                  </label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => {
                      setSelectedServiceId(e.target.value);
                      setSelectedSubServiceId('');
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  >
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} (Base ₹{s.minPrice})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Specific Task / Problem
                  </label>
                  <select
                    value={selectedSubServiceId || (selectedSub ? selectedSub.id : '')}
                    onChange={(e) => setSelectedSubServiceId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  >
                    {currentService.subServices.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name} (₹{sub.basePrice})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location & Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Service Address / Locality
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-brand-600 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Flat / House No, Landmark, Locality, City"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium"
                  />
                </div>
              </div>

              {/* Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Date
                  </label>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800"
                  >
                    <option value="Today">Today (Immediate)</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Saturday">This Saturday</option>
                    <option value="This Sunday">This Sunday</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800"
                  >
                    <option value="Immediate (within 45 mins)">Immediate (within 45 mins)</option>
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                    <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Customer Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Srushti K."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mobile Number (for OTP & Dispatch)
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 98230 00000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800"
                  />
                </div>
              </div>

              {/* Transparent Cooperative Price Breakdown Box */}
              <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200/80 space-y-2 text-xs">
                <div className="font-bold text-brand-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                    <span>Transparent Cooperative Tariff Breakdown</span>
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-100/70 px-2 py-0.5 rounded">
                    No Surge Guarantee
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Standard Labor Fee ({selectedSub?.name || currentService.name}):</span>
                  <span className="font-semibold text-slate-900">₹{basePrice}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Cooperative Fund & Insurance:</span>
                  <span className="font-semibold text-slate-900">₹{platformFee}</span>
                </div>
                <div className="pt-2 border-t border-brand-200 flex justify-between items-center text-sm font-bold text-slate-900">
                  <span>Total Estimated Payable:</span>
                  <span className="text-base text-brand-700">₹{totalPrice}</span>
                </div>
                <p className="text-[11px] text-emerald-800 pt-1 font-medium">
                  ✓ ₹{workerPayout} (88%) goes directly to the worker-owner immediately upon job signoff.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-coop-600 hover:from-brand-700 hover:to-coop-700 shadow-md transition-all active:scale-95"
                >
                  <span>Confirm Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
