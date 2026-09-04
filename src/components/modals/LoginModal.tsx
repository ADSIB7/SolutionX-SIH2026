import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Phone,
  Star,
  AlertTriangle,
  MessageSquare,
  Briefcase,
  Clock,
  MapPin,
  LogOut,
  UserCheck
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type WorkerTab = 'jobs' | 'ratings' | 'reviews' | 'disputes';

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose
}) => {
  // Modal accessibility: Escape key listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const [role, setRole] = useState<'customer' | 'worker' | 'admin'>('worker');
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [workerTab, setWorkerTab] = useState<WorkerTab>('jobs');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setOtpSent(false);
    setMobile('');
    setOtp('');
  };

  const handleFullReset = () => {
    handleLogout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`relative w-full ${isLoggedIn && role === 'worker' ? 'max-w-2xl' : 'max-w-md'
        } bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col transition-all duration-200`}>

        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isLoggedIn && role === 'worker' ? 'Worker Member Portal' : 'WorkerEMP Portal Access'}
              </h3>
              <p className="text-[11px] text-slate-300">
                {isLoggedIn && role === 'worker'
                  ? 'Pune Central Electricians Co-op Society • Kothrud Ward'
                  : 'Secure Cooperative Authentication'
                }
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Press Esc to close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {isLoggedIn ? (
            /* ======================================================== */
            /* WORKER LOGGED IN VIEW: Only Ratings, Disputes, Reviews, Jobs */
            /* ======================================================== */
            role === 'worker' ? (
              <div className="space-y-5 animate-in fade-in duration-150">

                {/* Worker Identity Mini Bar */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=120&h=120&q=80"
                      alt="Rameshwar Jadhav"
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-brand-400"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-extrabold text-slate-900">Rameshwar Jadhav</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                          Co-owner
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 block">
                        Pune Central Electricians Co-op Society • ID: WEMP-8841
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 bg-white hover:bg-rose-50 rounded-xl border border-slate-200 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>

                {/* 4 Focused Tabs: Jobs, Ratings, Reviews, Disputes */}
                <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setWorkerTab('jobs')}
                    className={`py-2 px-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${workerTab === 'jobs'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Current Jobs</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWorkerTab('ratings')}
                    className={`py-2 px-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${workerTab === 'ratings'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    <Star className="w-3.5 h-3.5 text-amber-500" />
                    <span>Ratings</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWorkerTab('reviews')}
                    className={`py-2 px-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${workerTab === 'reviews'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                    <span>Reviews</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWorkerTab('disputes')}
                    className={`py-2 px-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${workerTab === 'disputes'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Disputes (0)</span>
                  </button>
                </div>

                {/* TAB 1: CURRENT JOBS / REQUESTS */}
                {workerTab === 'jobs' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <span>Assigned & Dispatched Jobs</span>
                      <span className="text-emerald-600">1 Active On-Site</span>
                    </div>

                    {/* Active Job Card */}
                    <div className="bg-white border-2 border-brand-300/80 rounded-2xl p-4 shadow-sm space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-brand-50 text-brand-700 px-2 py-0.5 rounded-md border border-brand-200">
                            Current Active Dispatch
                          </span>
                          <h5 className="text-sm font-extrabold text-slate-900 mt-1">
                            MCB Sparking & Main Distribution Board Check
                          </h5>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-brand-600" />
                            <span>Flat 301, Rohan Ashima, Kothrud Ward #12</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                            Dispatched
                          </span>
                          <span className="text-xs text-slate-400 block mt-1">ETA: ~18 mins</span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-50 rounded-xl text-xs flex items-center justify-between text-slate-600">
                        <span>Customer: <strong>Ananya Sharma (+91 98221 54321)</strong></span>
                        <span className="font-bold text-slate-900">₹349 (Your Direct 88%: ₹307)</span>
                      </div>
                    </div>

                    {/* Scheduled Upcoming Job */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs flex items-center justify-between text-slate-600">
                      <div>
                        <span className="font-bold text-slate-800 block">Upcoming: Ceiling Fan Inverter Line Inspection</span>
                        <span className="text-slate-400 text-[11px]">Scheduled for Tomorrow • 10:00 AM</span>
                      </div>
                      <span className="font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                        ₹249 base
                      </span>
                    </div>
                  </div>
                )}

                {/* TAB 2: RATINGS */}
                {workerTab === 'ratings' && (
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 font-black text-2xl">
                          4.94
                        </div>
                        <div>
                          <div className="flex items-center text-amber-400">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-slate-800 block mt-0.5">
                            Top Cooperative Craftsman Standing
                          </span>
                          <span className="text-[11px] text-slate-500">Based on 428 verified municipal ratings</span>
                        </div>
                      </div>
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-xl">
                        Grade-A Standing
                      </span>
                    </div>

                    {/* Rating Breakdown */}
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center text-slate-700">
                        <span>Punctuality & Ward Arrival SLA:</span>
                        <span className="font-bold text-slate-900">5.0 / 5.0 ★</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[99%]" />
                      </div>

                      <div className="flex justify-between items-center text-slate-700 pt-1">
                        <span>Technical Workmanship & Safety:</span>
                        <span className="font-bold text-slate-900">4.9 / 5.0 ★</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[98%]" />
                      </div>

                      <div className="flex justify-between items-center text-slate-700 pt-1">
                        <span>Transparent Tariff Adherence (Zero Overcharging):</span>
                        <span className="font-bold text-slate-900">5.0 / 5.0 ★</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[100%]" />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: REVIEWS */}
                {workerTab === 'reviews' && (
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Recent Household Reviews (Kothrud Ward Hub)
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Nikhil S. • Mayur Colony, Kothrud</span>
                        <span className="flex items-center text-amber-500 font-bold">5.0 ★</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        "Ramesh replaced our damaged MCB quickly and provided a transparent cooperative bill. Genuine Havells parts at actual MRP, no inflated cuts."
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Dr. Sneha K. • Dahanukar Colony</span>
                        <span className="flex items-center text-amber-500 font-bold">5.0 ★</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        "Extremely professional, arrived in 20 minutes with safety gear and multimeter. Knowing he is a co-op owner gives huge peace of mind."
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Prakash J. • Ideal Colony</span>
                        <span className="flex items-center text-amber-500 font-bold">4.9 ★</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        "Fixed our inverter earthing fault efficiently. Clean work and fair cooperative rate card."
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB 4: DISPUTES */}
                {workerTab === 'disputes' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3 text-emerald-900">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                      <div>
                        <h5 className="font-extrabold text-sm">0 Active Customer Disputes</h5>
                        <p className="text-xs text-emerald-800 mt-0.5">
                          Clean record for the current quarterly cooperative auditing cycle.
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2 text-slate-600">
                      <span className="font-bold text-slate-800 block">Peer Dispute Council Policy:</span>
                      <p className="leading-relaxed">
                        Unlike algorithmic gig apps that block worker accounts without explanation, all WorkerEMP customer grievances are mediated by the elected Ward Dispute Council with right-to-be-heard guarantees.
                      </p>
                    </div>
                  </div>
                )}

                {/* Close Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    Close Portal
                  </button>
                </div>

              </div>
            ) : (
              /* CUSTOMER / ADMIN LOGGED IN VIEW */
              <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-150">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">
                    Logged in as {role === 'customer' ? 'Customer' : 'Ward Administrator'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Connected phone: <span className="font-bold text-brand-700">{mobile || '+91 98220 00000'}</span>
                  </p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
                  Ready to book verified worker-owners with zero surge pricing.
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
                  >
                    Log Out
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )
          ) : (
            /* LOGIN FORM VIEW */
            <div className="space-y-4">
              {/* Role Switcher */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl">
                <button
                  type="button"
                  onClick={() => { setRole('worker'); setOtpSent(false); }}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${role === 'worker'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Worker-Owner
                </button>
                <button
                  type="button"
                  onClick={() => { setRole('customer'); setOtpSent(false); }}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${role === 'customer'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => { setRole('admin'); setOtpSent(false); }}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${role === 'admin'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Ward Admin
                </button>
              </div>

              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Registered Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="Enter 10-digit mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium"
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    {role === 'worker'
                      ? 'Enter your mobile number registered with your Ward Cooperative Society.'
                      : 'We will send a one-time passcode for secure verification.'}
                  </p>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-coop-600 hover:from-brand-700 hover:to-coop-700 shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Send Verification OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-3 rounded-xl bg-brand-50 border border-brand-200 text-xs text-brand-900 flex justify-between items-center">
                    <span>OTP sent to <strong>+91 {mobile}</strong></span>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-brand-700 underline font-semibold text-[11px]"
                    >
                      Change
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Enter 4-Digit OTP (Demo: 2608)
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="2 6 0 8"
                      className="w-full text-center text-lg tracking-widest font-mono font-bold py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-coop-600 hover:from-brand-700 hover:to-coop-700 shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Verify & Enter Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
