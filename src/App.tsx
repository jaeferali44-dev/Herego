import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import PageHome from './components/PageHome';
import Footer from './components/Footer';
import { CONTACT_INFO as fallbackCONTACT_INFO, TOUR_PACKAGES } from './data';
import { useWebsiteContent } from './context/WebsiteContentContext';
import { preloadAllExploreJourneyImages } from './services/imagePreloader';

const PageAboutContact = lazy(() => import('./components/PageAboutContact'));
const PagePrivacyPolicy = lazy(() => import('./components/PagePrivacyPolicy'));
const PageTermsConditions = lazy(() => import('./components/PageTermsConditions'));
const PageAdmin = lazy(() => import('./components/PageAdmin'));

export default function App() {
  const { content } = useWebsiteContent();
  const CONTACT_INFO = content.contactInfo || fallbackCONTACT_INFO;

  // Helper to determine initial page and scroll target from URL
  const getInitialPageState = (): 'home' | 'about-contact' | 'privacy-policy' | 'terms-conditions' | 'admin' => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.toLowerCase();
    const params = new URLSearchParams(window.location.search);

    if (path === '/admin' || path === '/hidden-admin' || params.get('page') === 'admin' || params.get('admin') === 'true') {
      return 'admin';
    }
    if (path === '/about' || path === '/about-contact') {
      return 'about-contact';
    }
    if (path === '/privacy' || path === '/privacy-policy') {
      return 'privacy-policy';
    }
    if (path === '/terms' || path === '/terms-conditions') {
      return 'terms-conditions';
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<'home' | 'about-contact' | 'privacy-policy' | 'terms-conditions' | 'admin'>(getInitialPageState);

  // Synchronize browser history and popstate navigation
  useEffect(() => {
    const handlePopState = () => {
      const page = getInitialPageState();
      setCurrentPage(page);

      // Handle section scrolling on browser back/forward
      const path = window.location.pathname.toLowerCase();
      if (path === '/destinations' || path === '/destination') {
        setTimeout(() => {
          document.getElementById('destinations-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (path === '/journey' || path === '/journeys' || path === '/package' || path === '/tours' || path === '/tour') {
        setTimeout(() => {
          document.getElementById('tours-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (path === '/contact') {
        setTimeout(() => {
          document.getElementById('contact-desk-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Initial scroll check on mount for section paths
    const initialPath = window.location.pathname.toLowerCase();
    if (initialPath === '/destinations' || initialPath === '/destination') {
      setTimeout(() => {
        document.getElementById('destinations-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else if (initialPath === '/journey' || initialPath === '/journeys' || initialPath === '/package' || initialPath === '/tours' || initialPath === '/tour') {
      setTimeout(() => {
        document.getElementById('tours-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else if (initialPath === '/contact') {
      setTimeout(() => {
        document.getElementById('contact-desk-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Globally preload all Explore the Journey images from all 11 packages immediately on initial site load
  useEffect(() => {
    preloadAllExploreJourneyImages(content.tourPackages || TOUR_PACKAGES);
  }, [content.tourPackages]);

  const handlePageChange = (page: 'home' | 'about-contact' | 'privacy-policy' | 'terms-conditions' | 'admin', customPath?: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Update browser URL
    const targetPath = customPath || (
      page === 'home' ? '/' :
      page === 'about-contact' ? '/about' :
      page === 'privacy-policy' ? '/privacy' :
      page === 'terms-conditions' ? '/terms' :
      page === 'admin' ? '/admin' : '/'
    );

    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  };

  const handleScrollToContact = () => {
    const element = document.getElementById('contact-desk-section');
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const header = document.getElementById('global-header');
    const headerHeight = header ? header.offsetHeight : 80;

    // If the visitor is already on the Contact section, do nothing.
    const isAlreadyOnContact = rect.top >= -50 && rect.top <= headerHeight + 50;
    if (isAlreadyOnContact) {
      return;
    }

    const elementPosition = rect.top + window.scrollY;
    const offsetPosition = elementPosition - headerHeight - 24; // 24px offset for clean header clearance

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  const handleBookPackage = (destinationName: string) => {
    // If we are on the About page, switch back to home first
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        handleScrollToContact();
      }, 150);
    } else {
      handleScrollToContact();
    }
  };

  const handleBookHeaderClick = () => {
    // Switch to home page if not already there
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        handleScrollToContact();
      }, 150);
    } else {
      handleScrollToContact();
    }
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-obsidian text-off-white flex flex-col justify-between selection:bg-solar/35 selection:text-off-white">
      
      {/* Global Header */}
      <Header
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onBookClick={handleBookHeaderClick}
      />

      {/* Main Content Area with dynamic routing */}
      <main className="flex-grow">
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="w-8 h-8 border-2 border-solar border-t-transparent rounded-full animate-spin"></div></div>}>
          {currentPage === 'home' ? (
            <PageHome onBookPackage={handleBookPackage} />
          ) : currentPage === 'about-contact' ? (
            <PageAboutContact onAdminAccess={() => handlePageChange('admin')} />
          ) : currentPage === 'privacy-policy' ? (
            <PagePrivacyPolicy />
          ) : currentPage === 'admin' ? (
            <PageAdmin />
          ) : (
            <PageTermsConditions />
          )}
        </Suspense>
      </main>

      {/* Global Footer */}
      <Footer onPageChange={handlePageChange} />

      {/* Custom Sticky WhatsApp & Bottom Action Bar */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5">
        <a
          href={CONTACT_INFO.whatsAppUrl}
          target="_blank"
          referrerPolicy="no-referrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-off-white shadow-xl hover:scale-105 active:scale-95 transition-transform border border-white/20"
          title="Direct WhatsApp"
          aria-label="Direct WhatsApp"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 2c-5.52 0-10 4.48-10 10 0 1.931.547 3.731 1.492 5.269L2.122 22.1c-.14.408.249.816.666.665l5.241-1.378A9.92 9.92 0 0012.03 22c5.52 0 10-4.48 10-10S17.55 2 12.03 2zm-.095 18a7.923 7.923 0 01-3.52-.821c-.105-.054-.223-.058-.33-.024l-2.074.629.629-2.074c.03-.105.02-.22-.03-.33A7.9 7.9 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.306-5.741c-.2-.1-.17-.11-.47-.42l-.44-.45c-.11-.11-.29-.11-.4 0l-.33.33c-.22.22-.57.25-.83.08-.12-.08-.34-.23-.62-.48a4.93 4.93 0 01-.89-1.02c-.17-.26-.14-.6.08-.82l.14-.14c.11-.11.11-.29 0-.4l-.45-.44c-.31-.3-.32-.27-.42-.47-.1-.2-.05-.4.05-.5.1-.1.25-.26.37-.39.12-.13.16-.27.1-.42-.06-.15-.43-1.04-.59-1.44-.16-.39-.32-.33-.44-.33-.12 0-.25.01-.39.01-.14 0-.37.05-.56.26-.19.21-.74.72-.74 1.76s.76 2.04.86 2.18c.11.14 1.5 2.29 3.64 3.22.51.22.91.35 1.22.45.51.16.98.14 1.35.08.41-.06 1.26-.51 1.44-1.01.18-.5.18-.93.13-1.01-.05-.09-.2-.14-.4-.24z" />
          </svg>
        </a>
      </div>

    </div>
  );
}
