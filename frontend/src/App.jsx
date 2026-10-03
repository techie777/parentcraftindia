import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { BookingNotificationProvider } from './context/BookingNotificationContext';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CounselorDirectoryPage from './components/CounselorDirectoryPage';
import CounselorProfilePage from './components/CounselorProfilePage';
import VendorOnboardingPage from './components/VendorOnboardingPage';
import VendorDashboard from './components/VendorDashboard';
import ParentFAQHub from './components/ParentFAQHub';
import ProblemAreasHub from './components/ProblemAreasHub';
import AdminLoginView from './components/AdminLoginView';
import SpecialistPortalPage from './components/SpecialistPortalPage';
import Footer from './components/Footer';
import AskExpertModal from './components/AskExpertModal';
import BookCounselorModal from './components/BookCounselorModal';
import CounselorChatModal from './components/CounselorChatModal';
import MyBookingsModal from './components/MyBookingsModal';
import StickyBottomCTA from './components/StickyBottomCTA';
import AppFeatureTutorialModal from './components/AppFeatureTutorialModal';
import AppSpotlightTourModal from './components/AppSpotlightTourModal';
import MobileBottomNav from './components/MobileBottomNav';
import InitialSplashScreen from './components/InitialSplashScreen';

export default function App() {
  const getInitialTabFromUrl = () => {
    const path = window.location.pathname.toLowerCase();
    const search = new URLSearchParams(window.location.search).get('tab');

    if (path.includes('specialist') || search === 'specialist') return 'specialist';
    if (path.includes('vendor-onboarding') || search === 'onboarding') return 'onboarding';
    if (path.includes('admin') || search === 'admin') return 'admin';
    if (path.includes('counselor') || search === 'book-counselor') return 'book-counselor';
    if (path.includes('common-problems') || search === 'problems') return 'common-problems';
    return 'home';
  };

  const [activeTab, setActiveTab] = useState(getInitialTabFromUrl());
  const [selectedCounselorForProfile, setSelectedCounselorForProfile] = useState(null);
  
  // Modals State
  const [isAskExpertOpen, setIsAskExpertOpen] = useState(false);
  const [isBookCounselorOpen, setIsBookCounselorOpen] = useState(false);
  const [isCounselorChatOpen, setIsCounselorChatOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [showInitialSplash, setShowInitialSplash] = useState(true);
  const [isFeatureTutorialOpen, setIsFeatureTutorialOpen] = useState(false);
  const [isSpotlightTourOpen, setIsSpotlightTourOpen] = useState(false);

  const handleSplashFinish = () => {
    setShowInitialSplash(false);
    const seenTutorial = sessionStorage.getItem('parentcraft_tutorial_seen') || localStorage.getItem('parentcraft_tutorial_seen');
    if (!seenTutorial) {
      // 1st time visitor gets the Tutorial Screen (which they can read or skip)
      setIsFeatureTutorialOpen(true);
    }
  };

  const handleOpenTutorial = () => {
    setIsFeatureTutorialOpen(true);
  };

  const handleOpenSpotlightTour = () => {
    setIsSpotlightTourOpen(true);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedCounselorForProfile(null);

    let newPath = '/';
    if (tab === 'book-counselor') newPath = '/counselors';
    else if (tab === 'specialist') newPath = '/specialist';
    else if (tab === 'onboarding') newPath = '/vendor-onboarding';
    else if (tab === 'admin') newPath = '/admin';
    else if (tab === 'common-problems') newPath = '/common-problems';

    window.history.pushState(null, '', newPath);
  };

  const handleOpenCounselorBooking = () => {
    handleTabChange('book-counselor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCounselor = (counselor) => {
    setSelectedCounselorForProfile(counselor);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdminView = activeTab === 'admin';

  return (
    <LanguageProvider>
      <AuthProvider>
        <BookingNotificationProvider>
          {/* Initial Loading Splash Screen */}
          {showInitialSplash && (
            <InitialSplashScreen onFinish={handleSplashFinish} />
          )}

          <div className="min-h-screen flex flex-col justify-between font-sans relative bg-warmbg text-slate-800 pb-20 md:pb-0 max-w-full overflow-x-clip">
            <div>
              {/* HIDE NAVBAR COMPLETELY ON ADMIN VIEW */}
              {!isAdminView && (
                <Navbar
                  activeTab={activeTab}
                  setActiveTab={handleTabChange}
                  onBookCounselor={handleOpenCounselorBooking}
                  onOpenMyBookings={() => setIsMyBookingsOpen(true)}
                  onOpenTutorial={handleOpenTutorial}
                  onOpenSpotlightTour={handleOpenSpotlightTour}
                  onOpenCrisisModal={() => setIsCounselorChatOpen(true)}
                  isTourActive={isSpotlightTourOpen}
                />
              )}

              <main className="transition-all duration-300">
                {activeTab === 'home' && (
                  <HomePage
                    onNavToProblems={() => handleTabChange('common-problems')}
                    onNavToBookCounselor={handleOpenCounselorBooking}
                    onOpenCounselorChat={() => setIsCounselorChatOpen(true)}
                    onNavToSpecialist={() => handleTabChange('specialist')}
                  />
                )}

                {activeTab === 'book-counselor' && (
                  selectedCounselorForProfile ? (
                    <CounselorProfilePage
                      counselor={selectedCounselorForProfile}
                      onBackToDirectory={() => setSelectedCounselorForProfile(null)}
                      onBookingComplete={() => setIsMyBookingsOpen(true)}
                    />
                  ) : (
                    <CounselorDirectoryPage
                      onSelectCounselor={handleSelectCounselor}
                    />
                  )
                )}

                {activeTab === 'common-problems' && (
                  <ProblemAreasHub
                    onOpenCounselorChat={(opts) => setIsCounselorChatOpen(true)}
                    onBookCounselor={handleOpenCounselorBooking}
                  />
                )}

                {activeTab === 'specialist' && (
                  <SpecialistPortalPage />
                )}

                {activeTab === 'onboarding' && (
                  <VendorOnboardingPage
                    onComplete={() => handleTabChange('home')}
                  />
                )}

                {activeTab === 'vendor-portal' && (
                  <VendorDashboard />
                )}

                {activeTab === 'admin' && (
                  <AdminLoginView />
                )}
              </main>
            </div>

            {/* Sticky Bottom Action Bar & Modals */}
            {!isAdminView && (
              <>
                {activeTab === 'home' && (
                  <StickyBottomCTA
                    onAskExpert={() => setIsCounselorChatOpen(true)}
                    onBookCounselor={handleOpenCounselorBooking}
                  />
                )}

                <Footer setActiveTab={handleTabChange} />

                {/* Native App-Style Mobile Bottom Navigation */}
                <MobileBottomNav
                  activeTab={activeTab}
                  setActiveTab={handleTabChange}
                  onOpenMyBookings={() => setIsMyBookingsOpen(true)}
                  onOpenCrisisModal={() => setIsCounselorChatOpen(true)}
                  onOpenTutorial={handleOpenTutorial}
                  onOpenSpotlightTour={handleOpenSpotlightTour}
                  isTourActive={isSpotlightTourOpen}
                />
              </>
            )}

            {/* Modals */}
            <AskExpertModal
              isOpen={isAskExpertOpen}
              onClose={() => setIsAskExpertOpen(false)}
            />

            <BookCounselorModal
              isOpen={isBookCounselorOpen}
              onClose={() => setIsBookCounselorOpen(false)}
            />

            <CounselorChatModal
              isOpen={isCounselorChatOpen}
              onClose={() => setIsCounselorChatOpen(false)}
              onBookSession={handleOpenCounselorBooking}
            />

            <MyBookingsModal
              isOpen={isMyBookingsOpen}
              onClose={() => setIsMyBookingsOpen(false)}
            />

            {/* FEATURE 1: TUTORIAL SCREEN (USER CAN READ OR SKIP) */}
            <AppFeatureTutorialModal
              isOpen={isFeatureTutorialOpen}
              onClose={() => {
                setIsFeatureTutorialOpen(false);
                sessionStorage.setItem('parentcraft_tutorial_seen', 'true');
                localStorage.setItem('parentcraft_tutorial_seen', 'true');
              }}
              onStartSpotlightTour={() => {
                setIsFeatureTutorialOpen(false);
                sessionStorage.setItem('parentcraft_tutorial_seen', 'true');
                localStorage.setItem('parentcraft_tutorial_seen', 'true');
                setIsSpotlightTourOpen(true);
              }}
            />

            {/* FEATURE 2: BLACK OVERLAY SCREEN GUIDING THROUGH HOME, EXPERTS, PROBLEMS, BOOKINGS, SOS HELP */}
            <AppSpotlightTourModal
              isOpen={isSpotlightTourOpen}
              onClose={() => {
                setIsSpotlightTourOpen(false);
                sessionStorage.setItem('parentcraft_spotlight_seen', 'true');
                localStorage.setItem('parentcraft_spotlight_seen', 'true');
              }}
            />

          </div>
        </BookingNotificationProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
