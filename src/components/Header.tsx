import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, Instagram, Send } from 'lucide-react';
import { CONTACT_INFO as fallbackCONTACT_INFO } from '../data';
import { useWebsiteContent } from '../context/WebsiteContentContext';
import { motion, AnimatePresence } from 'motion/react';
import { formatImageUrl } from '../types';
const logoImg = formatImageUrl("https://drive.google.com/file/d/1ElhGD9BLzFHQ5p179oyUJRai0pRYmGei/view?usp=drivesdk");

interface HeaderProps {
  currentPage: 'home' | 'about-contact' | 'privacy-policy' | 'terms-conditions' | 'admin';
  onPageChange: (page: 'home' | 'about-contact' | 'privacy-policy' | 'terms-conditions' | 'admin', customPath?: string) => void;
  onBookClick: () => void;
}

export default function Header({ currentPage, onPageChange, onBookClick }: HeaderProps) {
  const { content } = useWebsiteContent();
  const CONTACT_INFO = content.contactInfo || fallbackCONTACT_INFO;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: 'home' | 'about-contact' | 'privacy-policy' | 'terms-conditions' | 'admin', sectionId?: string) => {
    setMobileMenuOpen(false);

    const performScroll = (id: string) => {
      const element = document.getElementById(id);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const header = document.getElementById('global-header');
      const headerHeight = header ? header.offsetHeight : 80;

      if (id === 'contact-desk-section') {
        const isAlreadyOnContact = rect.top >= -50 && rect.top <= headerHeight + 50;
        if (isAlreadyOnContact) {
          return;
        }
      }

      const elementPosition = rect.top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - 24; // 24px clean breathing margin

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    };

    let customPath: string | undefined = undefined;
    if (sectionId === 'destinations-section') customPath = '/destinations';
    if (sectionId === 'tours-section') customPath = '/tours';
    if (sectionId === 'contact-desk-section') customPath = '/contact';

    if (currentPage !== page) {
      onPageChange(page, customPath);
      if (sectionId) {
        setTimeout(() => {
          performScroll(sectionId);
        }, 150);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      if (customPath && window.location.pathname !== customPath) {
        window.history.pushState({}, '', customPath);
      }
      if (sectionId) {
        performScroll(sectionId);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBookingClick = () => {
    onBookClick();
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', page: 'home' as const },
    { label: 'Destinations', page: 'home' as const, section: 'destinations-section' },
    { label: 'Tours', page: 'home' as const, section: 'tours-section' },
    { label: 'About', page: 'about-contact' as const },
    { label: 'Contact', page: 'home' as const, section: 'contact-desk-section' },
  ];

  const isItemActive = (item: typeof navItems[0]) => {
    if (currentPage !== item.page) return false;
    return !item.section;
  };

  return (
    <header 
      id="global-header" 
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? 'bg-obsidian/95 backdrop-blur-md py-2 shadow-xl' 
          : 'bg-transparent py-3'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-18 sm:h-22">
          
          {/* Left Side: Brand Identity */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer pr-4 group" 
            onClick={() => handleNavClick('home')}
          >
            <div className="flex items-center gap-3.5">
              <img 
                src={logoImg} 
                alt="Explore Ethiopia Tour and Travel Logo" 
                className="h-16 sm:h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-md flex-shrink-0" 
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="flex flex-col justify-center">
                <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-off-white leading-none whitespace-nowrap">
                  Explore <span className="text-solar">Ethiopia</span>
                </span>
                <span className="text-[11px] sm:text-[12px] font-sans font-extrabold tracking-widest uppercase text-solar mt-1 leading-none whitespace-nowrap">
                  Tour &amp; Travel
                </span>
              </div>
            </div>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-10 xl:gap-12 mx-6">
            {navItems.map((item) => {
              const isCurrentPageActive = isItemActive(item);
              
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.page, item.section)}
                  className={`text-xs font-display font-semibold tracking-[0.18em] uppercase transition-all duration-300 py-2 relative group cursor-pointer whitespace-nowrap ${
                    isCurrentPageActive
                      ? 'text-solar'
                      : 'text-muted-silver hover:text-solar'
                  }`}
                >
                  {item.label}
                  {/* Underline Indicator (Animates from center outward) */}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-solar transition-all duration-300 ${
                    isCurrentPageActive ? 'w-6' : 'w-0 group-hover:w-6'
                  }`} />
                </button>
              );
            })}
          </nav>

          {/* Right Side: WhatsApp, Telegram & CTA */}
          <div className="hidden lg:flex items-center gap-3.5 flex-shrink-0">
            {/* WhatsApp (Authentic Green Style) */}
            <a
              href={CONTACT_INFO.whatsAppUrl}
              target="_blank"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md transition-all duration-300 ease-out hover:scale-[1.08] hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(37,211,102,0.4)] active:scale-95 cursor-pointer"
              title="Chat on WhatsApp"
              aria-label="WhatsApp"
            >
              <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 2c-5.52 0-10 4.48-10 10 0 1.931.547 3.731 1.492 5.269L2.122 22.1c-.14.408.249.816.666.665l5.241-1.378A9.92 9.92 0 0012.03 22c5.52 0 10-4.48 10-10S17.55 2 12.03 2zm-.095 18a7.923 7.923 0 01-3.52-.821c-.105-.054-.223-.058-.33-.024l-2.074.629.629-2.074c.03-.105.02-.22-.03-.33A7.9 7.9 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.306-5.741c-.2-.1-.17-.11-.47-.42l-.44-.45c-.11-.11-.29-.11-.4 0l-.33.33c-.22.22-.57.25-.83.08-.12-.08-.34-.23-.62-.48a4.93 4.93 0 01-.89-1.02c-.17-.26-.14-.6.08-.82l.14-.14c.11-.11.11-.29 0-.4l-.45-.44c-.31-.3-.32-.27-.42-.47-.1-.2-.05-.4.05-.5.1-.1.25-.26.37-.39.12-.13.16-.27.1-.42-.06-.15-.43-1.04-.59-1.44-.16-.39-.32-.33-.44-.33-.12 0-.25.01-.39.01-.14 0-.37.05-.56.26-.19.21-.74.72-.74 1.76s.76 2.04.86 2.18c.11.14 1.5 2.29 3.64 3.22.51.22.91.35 1.22.45.51.16.98.14 1.35.08.41-.06 1.26-.51 1.44-1.01.18-.5.18-.93.13-1.01-.05-.09-.2-.14-.4-.24z" />
              </svg>
            </a>

            {/* Telegram (Authentic Telegram Blue Style) */}
            <a
              href={CONTACT_INFO.telegramUrl || `https://t.me/+251${(CONTACT_INFO.phone1 || '0910503969').replace(/^0/, '')}`}
              target="_blank"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full bg-[#229ED9] text-white flex items-center justify-center shadow-md transition-all duration-300 ease-out hover:scale-[1.08] hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(34,158,217,0.4)] active:scale-95 cursor-pointer"
              title={`Telegram Chat (${CONTACT_INFO.phoneFormatted1 || CONTACT_INFO.phone1})`}
              aria-label="Telegram"
            >
              <Send className="w-4.5 h-4.5 ml-0.5" />
            </a>

            {/* Premium Pill CTA Button */}
            <button
              onClick={handleBookingClick}
              className="px-7 py-3.5 rounded-full bg-solar text-slate-900 font-display font-extrabold text-[11px] tracking-[0.2em] uppercase cursor-pointer luxury-cta"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Actions: Hamburger Icon */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-slate-card border border-accent-border text-off-white hover:border-solar transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden w-full bg-obsidian/98 backdrop-blur-lg border-t border-accent-border/40 absolute top-full left-0 py-10 px-8 shadow-2xl flex flex-col gap-8 z-50 overflow-y-auto max-h-[85vh]"
          >
            {/* Primary Nav Links */}
            <div className="flex flex-col gap-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-silver/50 font-bold px-2 mb-2">
                Menu
              </p>
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.page, item.section)}
                  className="flex items-center justify-between px-4 py-3 rounded-lg text-left font-display font-medium text-off-white hover:bg-white/5 active:bg-solar active:text-slate-900 transition-all text-sm border border-transparent hover:border-white/10"
                >
                  <span className="tracking-[0.15em] uppercase">{item.label}</span>
                  <Compass className="w-4 h-4 text-solar shrink-0" />
                </button>
              ))}
            </div>

            {/* Quick Actions & Social Icons */}
            <div className="border-t border-accent-border/30 pt-8 flex flex-col gap-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-silver/50 font-bold px-2">
                Connect With Us
              </p>
              
              {/* Social media icons with authentic brand identities */}
              <div className="grid grid-cols-2 gap-3 py-2">
                {/* WhatsApp */}
                <a
                  href={CONTACT_INFO.whatsAppUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="py-3.5 rounded-xl bg-[#25D366] text-white flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_6px_18px_rgba(37,211,102,0.4)]"
                  title="WhatsApp Chat"
                  aria-label="WhatsApp"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 2c-5.52 0-10 4.48-10 10 0 1.931.547 3.731 1.492 5.269L2.122 22.1c-.14.408.249.816.666.665l5.241-1.378A9.92 9.92 0 0012.03 22c5.5 0 10-4.48 10-10S17.55 2 12.03 2zm-.095 18a7.923 7.923 0 01-3.52-.821c-.105-.054-.223-.058-.33-.024l-2.074.629.629-2.074c.03-.105.02-.22-.03-.33A7.9 7.9 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.306-5.741c-.2-.1-.17-.11-.47-.42l-.44-.45c-.11-.11-.29-.11-.4 0l-.33.33c-.22.22-.57.25-.83.08-.12-.08-.34-.23-.62-.48a4.93 4.93 0 01-.89-1.02c-.17-.26-.14-.6.08-.82l.14-.14c.11-.11.11-.29 0-.4l-.45-.44c-.31-.3-.32-.27-.42-.47-.1-.2-.05-.4.05-.5.1-.1.25-.26.37-.39.12-.13.16-.27.1-.42-.06-.15-.43-1.04-.59-1.44-.16-.39-.32-.33-.44-.33-.12 0-.25.01-.39.01-.14 0-.37.05-.56.26-.19.21-.74.72-.74 1.76s.76 2.04.86 2.18c.11.14 1.5 2.29 3.64 3.22.51.22.91.35 1.22.45.51.16.98.14 1.35.08.41-.06 1.26-.51 1.44-1.01.18-.5.18-.93.13-1.01-.05-.09-.2-.14-.4-.24z" />
                  </svg>
                  <span className="text-xs font-display font-bold uppercase tracking-wider">WhatsApp</span>
                </a>

                {/* Telegram */}
                <a
                  href={CONTACT_INFO.telegramUrl || `https://t.me/+251${(CONTACT_INFO.phone1 || '0910503969').replace(/^0/, '')}`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="py-3.5 rounded-xl bg-[#229ED9] text-white flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_6px_18px_rgba(34,158,217,0.4)]"
                  title="Telegram Chat"
                  aria-label="Telegram"
                >
                  <Send className="w-4.5 h-4.5" />
                  <span className="text-xs font-display font-bold uppercase tracking-wider">Telegram</span>
                </a>

                {/* Instagram */}
                <a
                  href={CONTACT_INFO.instagramUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="py-3.5 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_6px_18px_rgba(238,42,123,0.4)]"
                  title="Instagram Page"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4.5 h-4.5" />
                  <span className="text-xs font-display font-bold uppercase tracking-wider">Insta</span>
                </a>

                {/* TikTok */}
                <a
                  href={CONTACT_INFO.tiktokUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="py-3.5 rounded-xl bg-[#010101] border border-neutral-800 text-white flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all duration-300 hover:scale-[1.05] hover:shadow-[2px_2px_0px_#00f2fe,-2px_-2px_0px_#fe0979]"
                  title="TikTok Account"
                  aria-label="TikTok"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08.7.3 1.4.67 2.01.62.96 1.49 1.7 2.53 2.19.78.36 1.63.56 2.49.59v3.91c-1.39-.03-2.75-.41-3.95-1.12-.46-.28-.88-.62-1.25-1.01V15.5c-.04 1.79-.62 3.52-1.68 4.9-1.35 1.72-3.41 2.72-5.59 2.72-2.18 0-4.24-1-5.59-2.72-1.06-1.38-1.64-3.11-1.68-4.9-.04-1.79.54-3.52 1.6-4.9 1.25-1.6 3.16-2.57 5.2-2.61.12 0 .24 0 .36.01v3.94c-.16-.02-.32-.03-.48-.02-1.11.05-2.11.62-2.73 1.54-.53.76-.8 1.69-.76 2.63.05.94.41 1.83 1.02 2.53.71.79 1.74 1.24 2.82 1.24s2.11-.45 2.82-1.24c.61-.7 1.02-1.59 1.02-2.53.04-3.64-.01-14.73-.01-14.73z" />
                  </svg>
                  <span className="text-xs font-display font-bold uppercase tracking-wider">TikTok</span>
                </a>
              </div>

              {/* Book Now Button */}
              <div className="flex flex-col gap-2.5 mt-2">
                <button
                  onClick={handleBookingClick}
                  className="w-full py-4 rounded-full bg-solar text-slate-900 font-display font-black text-center text-xs tracking-widest uppercase cursor-pointer luxury-cta"
                >
                  Book Custom Inquiry Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

