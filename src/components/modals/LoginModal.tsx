import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  User, 
  HeartHandshake, 
  Lock, 
  ArrowRight,
  CheckCircle2,
  Phone,
  Building2
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [role, setRole] = useState<'customer' | 'worker' | 'admin'>('customer');
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleReset = () => {
    setIsLoggedIn(false);
    setOtpSent(false);
    setMobile('');
    setOtp('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">WorkerEMP Portal Access</h3>
              <p className="text-[11px] text-slate-300">Secure Cooperative Authentication</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isLoggedIn ? (
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-150">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">
                  Authentication Successful!
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Logged in as <span className="font-bold text-brand-700 uppercase">{role}</span> ({mobile}).
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
                Redirecting to your personalized cooperative portal workspace...
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
              >
                Continue to Dashboard
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Role Switcher */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl">
                <button
                  type="button"
                  onClick={() => { setRole('customer'); setOtpSent(false); }}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${
                    role === 'customer'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => { setRole('worker'); setOtpSent(false); }}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${
                    role === 'worker'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Worker-Owner
                </button>
                <button
                  type="button"
                  onClick={() => { setRole('admin'); setOtpSent(false); }}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${
                    role === 'admin'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Ward Admin
                </button>
              </div>

              {/* Login Form */}
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

                  {role === 'admin' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Ward Passcode / Token
                      </label>
                      <input
                        type="password"
                        placeholder="Ward secret key"
                        defaultValue="SIH26089"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 font-mono"
                      />
                    </div>
                  )}

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
                    <span>Verify & Login</span>
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
