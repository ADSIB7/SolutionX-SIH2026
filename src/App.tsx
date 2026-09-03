import React, { useState } from 'react';
import { Language, ModalType } from './types';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/home/HeroSection';
import { ServiceSearchCard } from './components/home/ServiceSearchCard';
import { PopularServices } from './components/home/PopularServices';
import { HowItWorks } from './components/home/HowItWorks';
import { WhyWorkerEMP } from './components/home/WhyWorkerEMP';
import { TrustImpactSection } from './components/home/TrustImpactSection';
import { FinalCTA } from './components/home/FinalCTA';
import { BookingModal } from './components/modals/BookingModal';
import { WorkerJoinModal } from './components/modals/WorkerJoinModal';
import { LoginModal } from './components/modals/LoginModal';
import { CharterModal } from './components/modals/CharterModal';

export function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const [bookingPrefill, setBookingPrefill] = useState<{
    serviceId?: string;
    location?: string;
    date?: string;
    timeSlot?: string;
  }>({});

  const handleOpenModal = (type: ModalType) => {
    setActiveModal(type);
  };

  const handleCloseModal = () => {
    setActiveModal('none');
  };

  const handleOpenBooking = (prefill?: {
    serviceId?: string;
    location?: string;
    date?: string;
    timeSlot?: string;
  }) => {
    if (prefill) {
      setBookingPrefill(prefill);
    }
    setActiveModal('booking');
  };

  const handleBookServiceCard = (serviceId: string) => {
    setBookingPrefill({ serviceId });
    setActiveModal('booking');
  };

  const scrollToSearch = () => {
    const searchElem = document.getElementById('search-section');
    if (searchElem) {
      searchElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800 antialiased selection:bg-brand-500 selection:text-white">
      {/* 1. Navigation Bar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenModal={handleOpenModal}
      />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <HeroSection
          currentLang={currentLang}
          onOpenModal={handleOpenModal}
          onScrollToSearch={scrollToSearch}
        />

        {/* 3. Service Search Card */}
        <div id="search-section">
          <ServiceSearchCard
            currentLang={currentLang}
            onOpenBooking={handleOpenBooking}
          />
        </div>

        {/* 4. Popular Services */}
        <PopularServices
          currentLang={currentLang}
          onBookService={handleBookServiceCard}
        />

        {/* 5. How It Works */}
        <HowItWorks
          currentLang={currentLang}
          onOpenModal={handleOpenModal}
        />

        {/* 6. Why WorkerEMP (Cooperative Model Highlight) */}
        <WhyWorkerEMP
          currentLang={currentLang}
          onOpenModal={handleOpenModal}
        />

        {/* 7. Trust & Impact Section */}
        <TrustImpactSection
          currentLang={currentLang}
          onOpenModal={handleOpenModal}
        />

        {/* 8. Final CTA */}
        <FinalCTA
          currentLang={currentLang}
          onOpenModal={handleOpenModal}
        />
      </main>

      {/* 9. Footer */}
      <Footer
        currentLang={currentLang}
        onOpenModal={handleOpenModal}
      />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={activeModal === 'booking'}
        onClose={handleCloseModal}
        prefill={bookingPrefill}
      />

      <WorkerJoinModal
        isOpen={activeModal === 'worker-join'}
        onClose={handleCloseModal}
      />

      <LoginModal
        isOpen={activeModal === 'login'}
        onClose={handleCloseModal}
      />

      <CharterModal
        isOpen={activeModal === 'charter'}
        onClose={handleCloseModal}
        onOpenWorkerJoin={() => setActiveModal('worker-join')}
      />
    </div>
  );
}

export default App;
