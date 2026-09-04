import React, { useState, useEffect } from 'react';
import { 
  UserRole, 
  UserProfile,
  DemoSession,
  Booking, 
  Invoice,
  Review, 
  Dispute, 
  AppNotification, 
  Worker,
  BookingStatus 
} from './types';
import { 
  mockWorkers as initialWorkersData 
} from './data/workersData';
import { 
  loadStoredAppState, 
  saveStoredAppState, 
  resetStoredAppState, 
  defaultCustomer,
  defaultCooperative,
  demoProfiles,
  loadActiveSession,
  saveActiveSession,
  clearActiveSession,
  initialInvoices
} from './data/mockAppData';
import { 
  AppLanguage, 
  loadStoredLanguage, 
  saveStoredLanguage 
} from './data/mobileTranslations';

// Auth Portal
import { LoginPortal } from './components/auth/LoginPortal';

// Common Components
import { MobileHeader } from './components/common/MobileHeader';
import { BottomTabBar } from './components/common/BottomTabBar';
import { RoleSelectModal } from './components/common/RoleSelectModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';

// Customer Components
import { CustomerHome } from './components/customer/CustomerHome';
import { CustomerBook } from './components/customer/CustomerBook';
import { CustomerBookings } from './components/customer/CustomerBookings';
import { CustomerInvoices } from './components/customer/CustomerInvoices';
import { CustomerReviews } from './components/customer/CustomerReviews';
import { CustomerSupport } from './components/customer/CustomerSupport';

// Worker Components
import { WorkerJobs } from './components/worker/WorkerJobs';
import { WorkerRequests } from './components/worker/WorkerRequests';
import { WorkerReviews } from './components/worker/WorkerReviews';
import { WorkerDisputes } from './components/worker/WorkerDisputes';
import { WorkerProfile } from './components/worker/WorkerProfile';

// Cooperative Components
import { CooperativeOverview } from './components/cooperative/CooperativeOverview';
import { CooperativeMembers } from './components/cooperative/CooperativeMembers';
import { CooperativeBookings } from './components/cooperative/CooperativeBookings';
import { CooperativeDisputes } from './components/cooperative/CooperativeDisputes';
import { CooperativeReviews } from './components/cooperative/CooperativeReviews';

export function App() {
  // 1. Authentication, Session & Language State
  const [activeSession, setActiveSession] = useState<DemoSession | null>(() => loadActiveSession());
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [currentLang, setCurrentLang] = useState<AppLanguage>(() => loadStoredLanguage());
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [selectedWorkerForBooking, setSelectedWorkerForBooking] = useState<Worker | null>(null);

  // Domain Entities
  const [workers, setWorkers] = useState<Worker[]>(initialWorkersData);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // 2. Load data from localStorage on mount
  useEffect(() => {
    const saved = loadStoredAppState();
    setBookings(saved.bookings);
    setInvoices(saved.invoices || initialInvoices);
    setReviews(saved.reviews);
    setDisputes(saved.disputes);
    setNotifications(saved.notifications);

    const session = loadActiveSession();
    if (session) {
      setActiveSession(session);
      setCurrentRole(session.user.role);
      if (session.user.role === 'customer') setActiveTab('home');
      else if (session.user.role === 'worker') setActiveTab('jobs');
      else setActiveTab('overview');
    }
  }, []);

  // 3. Persist state to localStorage on updates
  useEffect(() => {
    if (bookings.length > 0 || reviews.length > 0) {
      saveStoredAppState({
        bookings,
        invoices,
        reviews,
        disputes,
        notifications,
        currentRole,
        customer: defaultCustomer,
        cooperative: defaultCooperative
      });
    }
  }, [bookings, invoices, reviews, disputes, notifications, currentRole]);

  // Global Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsRoleModalOpen(false);
        setIsNotificationOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Login handler
  const handleLogin = (profile: UserProfile) => {
    const session: DemoSession = {
      user: profile,
      loginTime: Date.now()
    };
    saveActiveSession(session);
    setActiveSession(session);
    setCurrentRole(profile.role);
    if (profile.role === 'customer') setActiveTab('home');
    else if (profile.role === 'worker') setActiveTab('jobs');
    else setActiveTab('overview');
  };

  // Language change handler
  const handleLanguageChange = (lang: AppLanguage) => {
    setCurrentLang(lang);
    saveStoredLanguage(lang);
  };

  // Logout handler
  const handleLogout = () => {
    clearActiveSession();
    setActiveSession(null);
  };

  // Fast demo role switch
  const handleSelectRole = (role: UserRole) => {
    const profile = demoProfiles[role];
    handleLogin(profile);
    setIsRoleModalOpen(false);
  };

  // Reset demo state
  const handleResetData = () => {
    resetStoredAppState();
    const fresh = loadStoredAppState();
    setBookings(fresh.bookings);
    setInvoices(fresh.invoices);
    setReviews(fresh.reviews);
    setDisputes(fresh.disputes);
    setNotifications(fresh.notifications);
    setWorkers(initialWorkersData);
    const session = loadActiveSession();
    if (session) {
      setCurrentRole(session.user.role);
      setActiveTab(session.user.role === 'customer' ? 'home' : session.user.role === 'worker' ? 'jobs' : 'overview');
    }
  };

  // 4. Booking Handlers
  const handleCustomerCreateBooking = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);

    // Create notifications for Worker & Cooperative
    const workerNotification: AppNotification = {
      id: `notif-${Date.now()}-w`,
      role: 'worker',
      recipientId: newBooking.workerId,
      title: newBooking.isEmergency ? '⚡ URGENT: Emergency Booking!' : '⚡ New Direct Booking Request!',
      message: `${newBooking.customerName} requested ${newBooking.taskDescription} at ${newBooking.locality}. 5 mins to accept!`,
      timestamp: 'Just now',
      isRead: false,
      type: 'booking_request',
      bookingId: newBooking.id,
      targetTab: 'requests'
    };

    const coOpNotification: AppNotification = {
      id: `notif-${Date.now()}-c`,
      role: 'cooperative',
      recipientId: newBooking.coopId,
      title: 'Dispatch Logged: New Ward Request',
      message: `Direct request dispatched to member ${newBooking.workerName} (₹${newBooking.totalAmount}).`,
      timestamp: 'Just now',
      isRead: false,
      type: 'booking_request',
      bookingId: newBooking.id,
      targetTab: 'bookings'
    };

    setNotifications(prev => [workerNotification, coOpNotification, ...prev]);
    setActiveTab('bookings');
  };

  const handleUpdateBookingStatus = (bookingId: string, nextStatus: BookingStatus, note?: string) => {
    let completedBookingItem: Booking | null = null;

    setBookings(prev => prev.map(b => {
      if (b.id !== bookingId) return b;

      const stageDescMap: Record<BookingStatus, string> = {
        draft: 'Drafting service request.',
        requested: `Direct booking request sent to ${b.workerName}.`,
        accepted: `${b.workerName} accepted your request within prompt window.`,
        active: `${b.workerName} is en route to site.`,
        in_progress: `${b.workerName} arrived on site and commenced diagnostics & work.`,
        completed: 'Work successfully verified and completed.',
        declined: 'Worker was occupied and politely declined. Reassigned by Ward Hub.',
        expired: 'Request timed out after 5 minutes. Ward dispatch triggered auto-reroute.',
        cancelled: 'Booking cancelled by customer.',
        disputed: 'Dispute opened for Ward Council peer mediation.'
      };

      const updatedBooking: Booking = {
        ...b,
        status: nextStatus,
        completedAt: nextStatus === 'completed' ? Date.now() : b.completedAt,
        timeline: [
          ...b.timeline,
          {
            status: nextStatus,
            label: nextStatus.toUpperCase(),
            timestamp: 'Just now',
            note: note || stageDescMap[nextStatus] || `Status updated to ${nextStatus}`
          }
        ]
      };

      if (nextStatus === 'completed') {
        completedBookingItem = updatedBooking;
      }

      return updatedBooking;
    }));

    // If job was marked completed, automatically generate an Invoice & Notifications
    const targetBooking = bookings.find(b => b.id === bookingId);
    if (nextStatus === 'completed' && targetBooking) {
      const newInvId = `INV-${Date.now().toString().slice(-4)}`;
      const generatedInvoice: Invoice = {
        id: newInvId,
        bookingId: targetBooking.id,
        invoiceNumber: `ROZ/PUN/26/089-${newInvId.slice(-4)}`,
        customerId: targetBooking.customerId,
        customerName: targetBooking.customerName,
        workerId: targetBooking.workerId,
        workerName: targetBooking.workerName,
        workerTrade: targetBooking.workerTrade,
        coopId: targetBooking.coopId,
        coopName: targetBooking.coopName,
        taskDescription: targetBooking.taskDescription,
        date: 'Today, Just now',
        baseFee: targetBooking.baseFee,
        materialCost: 0,
        platformFee: 0,
        coopWelfareFund: targetBooking.coopFund,
        workerPayout: targetBooking.workerPayout,
        totalAmount: targetBooking.totalAmount,
        paymentMethod: 'Cooperative Escrow',
        paymentStatus: 'paid',
        transactionRef: `UPI/ROJGAR/${Date.now().toString().slice(-8)}`,
        gstRegistration: '27AABCP8821M1ZK'
      };

      setInvoices(prev => [generatedInvoice, ...prev]);

      // Add Payment/Invoice notifications
      const invoiceNotifCustomer: AppNotification = {
        id: `notif-${Date.now()}-inv-c`,
        role: 'customer',
        recipientId: targetBooking.customerId,
        title: '🧾 Digital Co-op Invoice Generated',
        message: `Work completed by ${targetBooking.workerName}. Invoice #${generatedInvoice.invoiceNumber} paid via Escrow.`,
        timestamp: 'Just now',
        isRead: false,
        type: 'invoice_issued',
        bookingId: targetBooking.id,
        targetTab: 'invoices',
        entityId: generatedInvoice.id
      };

      const invoiceNotifWorker: AppNotification = {
        id: `notif-${Date.now()}-inv-w`,
        role: 'worker',
        recipientId: targetBooking.workerId,
        title: '💰 ₹' + targetBooking.workerPayout + ' Credited to Wallet',
        message: `Payout for booking #${targetBooking.id.slice(-6).toUpperCase()} settled instantly (88% direct earnings).`,
        timestamp: 'Just now',
        isRead: false,
        type: 'payment_received',
        bookingId: targetBooking.id,
        targetTab: 'jobs'
      };

      const coOpReserveNotif: AppNotification = {
        id: `notif-${Date.now()}-inv-coop`,
        role: 'cooperative',
        recipientId: targetBooking.coopId,
        title: '🏛️ +₹' + targetBooking.coopFund + ' Retained to Welfare Reserve',
        message: `12% social security contribution collected from completed job #${targetBooking.id.slice(-6).toUpperCase()}.`,
        timestamp: 'Just now',
        isRead: false,
        type: 'payment_received',
        bookingId: targetBooking.id,
        targetTab: 'overview'
      };

      setNotifications(prev => [invoiceNotifCustomer, invoiceNotifWorker, coOpReserveNotif, ...prev]);
    } else if (targetBooking) {
      // General status alert
      const custAlert: AppNotification = {
        id: `notif-${Date.now()}-u`,
        role: 'customer',
        recipientId: targetBooking.customerId,
        title: `Job Update: ${nextStatus.replace('_', ' ').toUpperCase()}`,
        message: `${targetBooking.workerName} updated booking #${bookingId.slice(-6).toUpperCase()}: ${nextStatus.replace('_', ' ')}`,
        timestamp: 'Just now',
        isRead: false,
        type: nextStatus === 'accepted' ? 'booking_accepted' : 'job_started',
        bookingId,
        targetTab: 'bookings'
      };
      setNotifications(prev => [custAlert, ...prev]);
    }
  };

  // 5. Customer Review Handler
  const handleCustomerSubmitReview = (bookingId: string, rating: number, text: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      bookingId,
      workerId: booking.workerId,
      workerName: booking.workerName,
      customerId: booking.customerId,
      customerName: booking.customerName,
      customerAvatar: defaultCustomer.avatar,
      rating,
      text,
      date: 'Today',
      trade: booking.workerTrade,
      coopId: booking.coopId
    };

    setReviews(prev => [newRev, ...prev]);

    // Update booking rating & reviewText
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          rating,
          reviewText: text
        };
      }
      return b;
    }));

    // Update worker rating and reviewsCount in state
    setWorkers(prev => prev.map(w => {
      if (w.id === booking.workerId || w.name === booking.workerName) {
        const newCount = w.reviewsCount + 1;
        const newRating = Number(((w.rating * w.reviewsCount + rating) / newCount).toFixed(2));
        return {
          ...w,
          rating: newRating,
          reviewsCount: newCount
        };
      }
      return w;
    }));

    // Notify Worker
    const workerReviewNotif: AppNotification = {
      id: `notif-${Date.now()}-rev`,
      role: 'worker',
      recipientId: booking.workerId,
      title: `⭐ New ${rating}-Star Review!`,
      message: `${booking.customerName} reviewed your service: "${text.slice(0, 45)}..."`,
      timestamp: 'Just now',
      isRead: false,
      type: 'review_received',
      targetTab: 'reviews'
    };
    setNotifications(prev => [workerReviewNotif, ...prev]);
  };

  // 6. Dispute Handlers
  const handleCustomerRaiseDispute = (bookingId: string, issue: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const newDispId = `DISP-${Date.now().toString().slice(-4)}`;
    const newDisp: Dispute = {
      id: newDispId,
      bookingId,
      customerId: booking.customerId,
      customerName: booking.customerName,
      workerId: booking.workerId,
      workerName: booking.workerName,
      workerTrade: booking.workerTrade,
      coopId: booking.coopId,
      coopName: booking.coopName,
      issue,
      status: 'open',
      createdAt: 'Today'
    };

    setDisputes(prev => [newDisp, ...prev]);

    // Mark booking status as disputed
    handleUpdateBookingStatus(bookingId, 'disputed', `Customer opened dispute #${newDispId}`);

    // Notifications for Worker & Co-op
    const dispNotifWorker: AppNotification = {
      id: `notif-${Date.now()}-dw`,
      role: 'worker',
      recipientId: booking.workerId,
      title: 'Customer Inquiry / Grievance Logged',
      message: `Customer ${booking.customerName} filed an inquiry. Please review and provide your statement.`,
      timestamp: 'Just now',
      isRead: false,
      type: 'dispute_opened',
      targetTab: 'disputes'
    };

    const dispNotifCoop: AppNotification = {
      id: `notif-${Date.now()}-dc`,
      role: 'cooperative',
      recipientId: booking.coopId,
      title: 'Ward Peer Council Alert: New Grievance',
      message: `Ward grievance logged regarding booking #${booking.id.slice(-6).toUpperCase()}. Council mediation required.`,
      timestamp: 'Just now',
      isRead: false,
      type: 'dispute_opened',
      targetTab: 'disputes'
    };

    setNotifications(prev => [dispNotifWorker, dispNotifCoop, ...prev]);
  };

  const handleWorkerRespondDispute = (disputeId: string, response: string) => {
    setDisputes(prev => prev.map(d => {
      if (d.id !== disputeId) return d;
      return {
        ...d,
        workerResponse: response,
        workerResponseTime: 'Today, Just now',
        status: d.status === 'open' ? 'under_review' : d.status
      };
    }));

    const coopAlert: AppNotification = {
      id: `notif-${Date.now()}-wr`,
      role: 'cooperative',
      recipientId: defaultCooperative.id,
      title: 'Worker Clarification Submitted',
      message: `Worker statement submitted for dispute #${disputeId.slice(-6).toUpperCase()}. Ready for Ward Council ruling.`,
      timestamp: 'Just now',
      isRead: false,
      type: 'dispute_opened',
      targetTab: 'disputes'
    };
    setNotifications(prev => [coopAlert, ...prev]);
  };

  const handleResolveDispute = (disputeId: string, resolutionNotes: string) => {
    setDisputes(prev => prev.map(d => {
      if (d.id !== disputeId) return d;
      return {
        ...d,
        resolutionNotes,
        resolutionDate: 'Today',
        status: 'resolved'
      };
    }));

    const targetDispute = disputes.find(d => d.id === disputeId);

    const custRuling: AppNotification = {
      id: `notif-${Date.now()}-cr`,
      role: 'customer',
      recipientId: targetDispute?.customerId || defaultCustomer.id,
      title: '✅ Grievance Resolved by Cooperative Council',
      message: resolutionNotes,
      timestamp: 'Just now',
      isRead: false,
      type: 'dispute_resolved',
      targetTab: 'support'
    };

    const workerRuling: AppNotification = {
      id: `notif-${Date.now()}-wrul`,
      role: 'worker',
      recipientId: targetDispute?.workerId || 'w1',
      title: 'Dispute Concluded by Ward Council',
      message: resolutionNotes,
      timestamp: 'Just now',
      isRead: false,
      type: 'dispute_resolved',
      targetTab: 'disputes'
    };

    setNotifications(prev => [custRuling, workerRuling, ...prev]);
  };

  // 7. Cooperative Member Enrollment
  const handleAddMember = (newMemberData: Omit<Worker, 'id'>) => {
    const newWorker: Worker = {
      ...newMemberData,
      id: `w-${Date.now()}`
    };
    setWorkers(prev => [newWorker, ...prev]);

    const memberNotif: AppNotification = {
      id: `notif-${Date.now()}-mem`,
      role: 'cooperative',
      recipientId: defaultCooperative.id,
      title: '🎉 Worker-Owner Enrolled!',
      message: `${newWorker.name} has joined Pune Central Electricians Co-op (Ward 14).`,
      timestamp: 'Just now',
      isRead: false,
      type: 'booking_accepted',
      targetTab: 'members'
    };
    setNotifications(prev => [memberNotif, ...prev]);
  };

  // Simulate incoming request for worker
  const handleSimulateIncomingWorkerRequest = () => {
    const newId = `BKG-${Date.now().toString().slice(-4)}`;
    const newSimulatedBooking: Booking = {
      id: newId,
      customerId: 'c-102',
      customerName: 'Rahul Verma',
      customerPhone: '+91 98220 88291',
      workerId: 'w-ramesh-jadhav',
      workerName: 'Rameshwar Jadhav',
      workerPhoto: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&h=300&q=80',
      workerTrade: 'Master Electrician',
      coopId: defaultCooperative.id,
      coopName: defaultCooperative.name,
      taskDescription: 'Emergency Electrical Tripping & MCB Diagnosis',
      category: 'electrician',
      locality: 'Kothrud, Pune',
      address: 'Flat 402, Rohan Ashima, Near Gandhi Bhavan, Kothrud',
      scheduledSlot: 'Immediate (within 30 mins)',
      baseFee: 349,
      totalAmount: 399,
      workerPayout: 351,
      coopFund: 48,
      status: 'requested',
      isEmergency: true,
      createdAt: Date.now(),
      timeline: [
        {
          status: 'requested',
          label: 'EMERGENCY REQUEST SENT',
          timestamp: 'Just now',
          note: 'Direct booking request sent to worker. 5-min decision window active.'
        }
      ]
    };

    handleCustomerCreateBooking(newSimulatedBooking);
  };

  // Notification click with deep linking
  const handleNotificationClick = (notif: AppNotification) => {
    // Mark as read immediately
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, isRead: true } : n));
    setIsNotificationOpen(false);

    // Deep link to target tab
    if (notif.targetTab) {
      setActiveTab(notif.targetTab);
    } else if (notif.type === 'booking_request') {
      if (currentRole === 'worker') setActiveTab('requests');
      else setActiveTab('bookings');
    } else if (notif.type === 'invoice_issued' || notif.type === 'payment_received') {
      if (currentRole === 'customer') setActiveTab('invoices');
      else setActiveTab('overview');
    } else if (notif.type === 'dispute_opened' || notif.type === 'dispute_resolved') {
      if (currentRole === 'customer') setActiveTab('support');
      else setActiveTab('disputes');
    } else if (notif.type === 'review_received') {
      setActiveTab('reviews');
    }
  };

  // Mark all read
  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => {
      if (n.role === currentRole) return { ...n, isRead: true };
      return n;
    }));
  };

  // Notifications filtering & unread counts
  const roleNotifications = notifications.filter(n => n.role === currentRole);
  const unreadCount = roleNotifications.filter(n => !n.isRead).length;

  // Pending counts for badges
  const pendingRequestsCount = bookings.filter(b => 
    (b.workerId === 'w1' || b.workerId === 'w-ramesh-jadhav' || b.workerName.toLowerCase().includes('ramesh')) && 
    b.status === 'requested'
  ).length;
  const activeBookingsCount = bookings.filter(b => ['accepted', 'active', 'in_progress'].includes(b.status)).length;
  const openDisputesCount = disputes.filter(d => d.status !== 'resolved').length;

  // 8. If not logged in, render the LoginPortal
  if (!activeSession) {
    return (
      <LoginPortal 
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onLogin={handleLogin} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-start sm:py-6 selection:bg-emerald-500 selection:text-white">
      {/* Mobile App Viewport Container */}
      <div className="w-full max-w-md min-h-screen sm:min-h-[850px] sm:max-h-[920px] bg-slate-50 border-x border-slate-200 shadow-2xl relative flex flex-col overflow-hidden sm:rounded-3xl">
        
        {/* Mobile Header */}
        <MobileHeader
          currentRole={currentRole}
          activeProfile={activeSession.user}
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          onOpenRoleSelect={() => setIsRoleModalOpen(true)}
          onOpenNotifications={() => setIsNotificationOpen(true)}
          unreadNotificationsCount={unreadCount}
          onResetData={handleResetData}
          onLogout={handleLogout}
        />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-4">
          
          {/* CUSTOMER PORTAL */}
          {currentRole === 'customer' && (
            <>
              {activeTab === 'home' && (
                <CustomerHome
                  customer={defaultCustomer}
                  bookings={bookings}
                  onNavigateTab={setActiveTab}
                  onSelectWorkerForBooking={(worker) => {
                    setSelectedWorkerForBooking(worker);
                    setActiveTab('book');
                  }}
                  currentLang={currentLang}
                />
              )}

              {activeTab === 'book' && (
                <CustomerBook
                  customer={defaultCustomer}
                  initialSelectedWorker={selectedWorkerForBooking}
                  onClearInitialWorker={() => setSelectedWorkerForBooking(null)}
                  onCreateBooking={handleCustomerCreateBooking}
                  onNavigateTab={setActiveTab}
                  currentLang={currentLang}
                />
              )}

              {activeTab === 'bookings' && (
                <CustomerBookings
                  bookings={bookings}
                  onUpdateBookingStatus={handleUpdateBookingStatus}
                  onSubmitReview={handleCustomerSubmitReview}
                  onNavigateTab={setActiveTab}
                  currentLang={currentLang}
                />
              )}

              {activeTab === 'invoices' && (
                <CustomerInvoices
                  invoices={invoices}
                  onNavigateTab={setActiveTab}
                  currentLang={currentLang}
                />
              )}

              {activeTab === 'support' && (
                <CustomerSupport
                  bookings={bookings}
                  disputes={disputes}
                  onRaiseDispute={handleCustomerRaiseDispute}
                  currentLang={currentLang}
                />
              )}
            </>
          )}

          {/* WORKER PORTAL */}
          {currentRole === 'worker' && (
            <>
              {activeTab === 'jobs' && (
                <WorkerJobs
                  bookings={bookings}
                  onUpdateBookingStatus={handleUpdateBookingStatus}
                  onNavigateTab={setActiveTab}
                  currentLang={currentLang}
                />
              )}

              {activeTab === 'requests' && (
                <WorkerRequests
                  bookings={bookings}
                  onUpdateBookingStatus={handleUpdateBookingStatus}
                  onSimulateNewRequest={handleSimulateIncomingWorkerRequest}
                  currentLang={currentLang}
                />
              )}

              {activeTab === 'reviews' && (
                <WorkerReviews
                  reviews={reviews}
                  currentLang={currentLang}
                />
              )}

              {activeTab === 'disputes' && (
                <WorkerDisputes
                  disputes={disputes}
                  onWorkerRespond={handleWorkerRespondDispute}
                  currentLang={currentLang}
                />
              )}

              {activeTab === 'profile' && (
                <WorkerProfile
                  onResetData={handleResetData}
                  currentLang={currentLang}
                />
              )}
            </>
          )}

          {/* COOPERATIVE PORTAL */}
          {currentRole === 'cooperative' && (
            <>
              {activeTab === 'overview' && (
                <CooperativeOverview
                  bookings={bookings}
                  disputes={disputes}
                  reviews={reviews}
                  onNavigateTab={setActiveTab}
                  onOpenAddMember={() => setActiveTab('members')}
                  currentLang={currentLang}
                />
              )}

              {activeTab === 'members' && (
                <CooperativeMembers
                  members={workers}
                  onAddMember={handleAddMember}
                  currentLang={currentLang}
                />
              )}

              {activeTab === 'bookings' && (
                <CooperativeBookings
                  bookings={bookings}
                  onUpdateBookingStatus={handleUpdateBookingStatus}
                  currentLang={currentLang}
                />
              )}

              {activeTab === 'disputes' && (
                <CooperativeDisputes
                  disputes={disputes}
                  onResolveDispute={handleResolveDispute}
                  currentLang={currentLang}
                />
              )}

              {activeTab === 'reviews' && (
                <CooperativeReviews
                  reviews={reviews}
                  currentLang={currentLang}
                />
              )}
            </>
          )}
        </main>

        {/* Fixed Bottom Tab Bar */}
        <BottomTabBar
          currentRole={currentRole}
          currentLang={currentLang}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          badgeCounts={{
            customerBookings: activeBookingsCount,
            workerJobs: activeBookingsCount,
            workerRequests: pendingRequestsCount,
            coopDisputes: openDisputesCount
          }}
        />

        {/* Role Switcher Modal */}
        <RoleSelectModal
          isOpen={isRoleModalOpen}
          onClose={() => setIsRoleModalOpen(false)}
          currentRole={currentRole}
          onSelectRole={handleSelectRole}
          currentLang={currentLang}
        />

        {/* Notification Drawer */}
        <NotificationDrawer
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
          currentRole={currentRole}
          notifications={roleNotifications}
          onMarkAllRead={handleMarkAllNotificationsRead}
          onNotificationClick={handleNotificationClick}
          currentLang={currentLang}
        />
      </div>
    </div>
  );
}

export default App;
