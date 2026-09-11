import React from 'react';
import { 
  Compass, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ArrowUp, 
  Home, 
  Map, 
  Sparkles, 
  Info, 
  CalendarCheck 
} from 'lucide-react';
import { CONTACT_INFO as fallbackCONTACT_INFO } from '../data';
import { useWebsiteContent } from '../context/WebsiteContentContext';
import { formatImageUrl } from '../types';
const logoImg = formatImageUrl("https://drive.google.com/file/d/1ElhGD9BLzFHQ5p179oyUJRai0pRYmGei/view?usp=drivesdk");

interface FooterProps {
  onPageChange: (page: 'home' | 'about-contact' | 'privacy-policy' | 'terms-conditions' | 'admin') => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  const { content } = useWebsiteContent();
  const CONTACT_INFO = content.contactInfo || fallbackCONTACT_INFO;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: 'home' | 'about-contact' | 'privacy-policy' | 'terms-conditions' | 'admin') => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionScroll = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    onPageChange('home');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const header = document.getElementById('global-header');
      const headerHeight = header ? header.offsetHeight : 80;

      const elementPosition = rect.top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - 24; // clean header offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }, 150);
  };

  return (
    <footer id="global-footer" className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-zinc-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-zinc-900 pb-12 mb-12">
          
          {/* Column 1: Brand & Identity */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3.5 cursor-pointer group" onClick={() => handleNav('home')}>
              <div className="bg-white rounded-lg px-3 py-2 flex items-center justify-center border border-white/20 shadow-md flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
                <img 
                  src={logoImg} 
                  alt="Explore Ethiopia Tour and Travel Logo" 
                  className="h-12 sm:h-14 w-auto object-contain filter drop-shadow-sm" 
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-zinc-100 leading-none">
                  Explore <span className="text-solar">Ethiopia</span>
                </span>
                <span className="text-[11px] sm:text-[12px] font-sans font-extrabold tracking-widest uppercase text-solar mt-1 leading-none">
                  Tour &amp; Travel
                </span>
              </div>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We bridge the gap between untamed wilderness and high-end comfort. Traverse surreal landscapes, discover vibrant living traditions, and cross regional borders with absolute peace of mind.
            </p>
            <div className="mt-2 p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
              <p className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">Independent Travel Brand</p>
              <p className="text-xs text-solar font-medium mt-0.5">
                Explore Ethiopia Tour and Travel
              </p>
            </div>
          </div>

          {/* Column 2: Navigation & Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-sm tracking-widest text-zinc-100 uppercase border-l-2 border-solar pl-3">
              Explore Destinations
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button 
                onClick={() => handleNav('home')} 
                className="text-zinc-400 hover:text-solar text-left transition-colors py-1.5 cursor-pointer flex items-center gap-2 group"
              >
                <Home className="w-4 h-4 text-zinc-500 group-hover:text-solar transition-transform duration-300 group-hover:scale-110 shrink-0" />
                <span>Home Gateway</span>
              </button>
              
              <button 
                onClick={() => handleNav('about-contact')} 
                className="text-zinc-400 hover:text-solar text-left transition-colors py-1.5 cursor-pointer flex items-center gap-2 group"
              >
                <Info className="w-4 h-4 text-zinc-500 group-hover:text-solar transition-transform duration-300 group-hover:scale-110 shrink-0" />
                <span>About Our Team</span>
              </button>
              
              <a 
                href="#tours-section" 
                onClick={(e) => handleSectionScroll(e, 'tours-section')} 
                className="text-zinc-400 hover:text-solar transition-colors py-1.5 flex items-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-zinc-500 group-hover:text-solar transition-transform duration-300 group-hover:scale-110 shrink-0" />
                <span>Signature Tours</span>
              </a>
              
              <a 
                href="#destinations-section" 
                onClick={(e) => handleSectionScroll(e, 'destinations-section')} 
                className="text-zinc-400 hover:text-solar transition-colors py-1.5 flex items-center gap-2 group"
              >
                <Map className="w-4 h-4 text-zinc-500 group-hover:text-solar transition-transform duration-300 group-hover:scale-110 shrink-0" />
                <span>Top Attractions</span>
              </a>
              
              <a 
                href="#contact-desk-section" 
                onClick={(e) => handleSectionScroll(e, 'contact-desk-section')} 
                className="text-zinc-400 hover:text-solar transition-colors py-1.5 flex items-center gap-2 group"
              >
                <CalendarCheck className="w-4 h-4 text-zinc-500 group-hover:text-solar transition-transform duration-300 group-hover:scale-110 shrink-0" />
                <span>Plan Your Tour</span>
              </a>
              
              <a 
                href={CONTACT_INFO.whatsAppUrl} 
                target="_blank" 
                referrerPolicy="no-referrer" 
                className="text-zinc-400 hover:text-solar transition-colors py-1.5 flex items-center gap-2 group"
              >
                <MessageSquare className="w-4 h-4 text-zinc-500 group-hover:text-solar transition-transform duration-300 group-hover:scale-110 shrink-0" />
                <span>WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Column 3: Contact Desk */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-sm tracking-widest text-zinc-100 uppercase border-l-2 border-solar pl-3">
              The Contact Desk
            </h3>
            <div className="flex flex-col gap-3 text-sm text-zinc-400">
              <div className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-solar shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="hover:text-solar transition-colors">{CONTACT_INFO.office} (Primary Hub)</span>
              </div>
              <div className="flex items-start gap-3 group">
                <Phone className="w-5 h-5 text-solar shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <a href={`tel:${CONTACT_INFO.phone1}`} className="hover:text-solar transition-colors">{CONTACT_INFO.phoneFormatted1}</a>
              </div>
              <div className="flex items-start gap-3 group">
                <Phone className="w-5 h-5 text-solar shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <a href={`tel:${CONTACT_INFO.phone2}`} className="hover:text-solar transition-colors">{CONTACT_INFO.phoneFormatted2}</a>
              </div>
              <div className="flex items-start gap-3 group">
                <Mail className="w-5 h-5 text-solar shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-solar transition-colors break-all">{CONTACT_INFO.email}</a>
              </div>
            </div>
          </div>

          {/* Column 4: Legal Documents */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-sm tracking-widest text-zinc-100 uppercase border-l-2 border-solar pl-3">
              Legal
            </h3>
            <div className="flex flex-col gap-2.5 text-sm text-zinc-400">
              <button 
                onClick={() => handleNav('privacy-policy')} 
                className="text-zinc-400 hover:text-solar text-left transition-colors py-1 cursor-pointer flex items-center gap-2 group"
              >
                <span>Privacy Policy</span>
              </button>
              <button 
                onClick={() => handleNav('terms-conditions')} 
                className="text-zinc-400 hover:text-solar text-left transition-colors py-1 cursor-pointer flex items-center gap-2 group"
              >
                <span>Terms &amp; Conditions</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer Base bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-zinc-500">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p>
              &copy; {new Date().getFullYear()} Explore Ethiopia Tour and Travel. All rights reserved.
            </p>
            <p className="text-[10px] text-zinc-600">
              Explore Ethiopia Tour and Travel. Designed for discerning East African explorers.
            </p>
          </div>

          {/* Social Profiles & Back to Top */}
          <div className="flex flex-wrap items-center gap-3 justify-center md:justify-end">
            {/* Instagram */}
            <a 
              href={CONTACT_INFO.instagramUrl} 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="px-4 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center gap-2 text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-[1.04] hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(238,42,123,0.3)] hover:bg-gradient-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:border-transparent cursor-pointer"
            >
              <svg className="w-4 h-4 stroke-current fill-none shrink-0" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>Follow us on Instagram</span>
            </a>

            {/* TikTok */}
            <a 
              href={CONTACT_INFO.tiktokUrl} 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="px-4 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center gap-2 text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-[1.04] hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(0,242,254,0.25)] hover:bg-black hover:border-zinc-700 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current text-[#00f2fe] drop-shadow-[1px_1px_0_#fe0979] shrink-0" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08.7.3 1.4.67 2.01.62.96 1.49 1.7 2.53 2.19.78.36 1.63.56 2.49.59v3.91c-1.39-.03-2.75-.41-3.95-1.12-.46-.28-.88-.62-1.25-1.01V15.5c-.04 1.79-.62 3.52-1.68 4.9-1.35 1.72-3.41 2.72-5.59 2.72-2.18 0-4.24-1-5.59-2.72-1.06-1.38-1.64-3.11-1.68-4.9-.04-1.79.54-3.52 1.6-4.9 1.25-1.6 3.16-2.57 5.2-2.61.12 0 .24 0 .36.01v3.94c-.16-.02-.32-.03-.48-.02-1.11.05-2.11.62-2.73 1.54-.53.76-.8 1.69-.76 2.63.05.94.41 1.83 1.02 2.53.71.79 1.74 1.24 2.82 1.24s2.11-.45 2.82-1.24c.61-.7 1.02-1.59 1.02-2.53.04-3.64-.01-14.73-.01-14.73z"/>
              </svg>
              <span>Follow us on TikTok</span>
            </a>

            {/* WhatsApp */}
            <a 
              href={CONTACT_INFO.whatsAppUrl} 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="px-4 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center gap-2 text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-[1.04] hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:bg-[#25D366] hover:border-transparent cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12.031 2c-5.52 0-10 4.48-10 10 0 1.931.547 3.731 1.492 5.269L2.122 22.1c-.14.408.249.816.666.665l5.241-1.378A9.92 9.92 0 0012.03 22c5.5 0 10-4.48 10-10S17.55 2 12.03 2zm-.095 18a7.923 7.923 0 01-3.52-.821c-.105-.054-.223-.058-.33-.024l-2.074.629.629-2.074c.03-.105.02-.22-.03-.33A7.9 7.9 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.306-5.741c-.2-.1-.17-.11-.47-.42l-.44-.45c-.11-.11-.29-.11-.4 0l-.33.33c-.22.22-.57.25-.83.08-.12-.08-.34-.23-.62-.48a4.93 4.93 0 01-.89-1.02c-.17-.26-.14-.6.08-.82l.14-.14c.11-.11.11-.29 0-.4l-.45-.44c-.31-.3-.32-.27-.42-.47-.1-.2-.05-.4.05-.5.1-.1.25-.26.37-.39.12-.13.16-.27.1-.42-.06-.15-.43-1.04-.59-1.44-.16-.39-.32-.33-.44-.33-.12 0-.25.01-.39.01-.14 0-.37.05-.56.26-.19.21-.74.72-.74 1.76s.76 2.04.86 2.18c.11.14 1.5 2.29 3.64 3.22.51.22.91.35 1.22.45.51.16.98.14 1.35.08.41-.06 1.26-.51 1.44-1.01.18-.5.18-.93.13-1.01-.05-.09-.2-.14-.4-.24z" />
              </svg>
              <span>WhatsApp Chat</span>
            </a>

            {/* Telegram */}
            <a 
              href={CONTACT_INFO.telegramUrl || `https://t.me/+251${(CONTACT_INFO.phone1 || '0910503969').replace(/^0/, '')}`} 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="px-4 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center gap-2 text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-[1.04] hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(34,158,217,0.3)] hover:bg-[#229ED9] hover:border-transparent cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.18l-1.91 9.02c-.14.65-.53.81-1.08.5l-2.91-2.14-1.4 1.35c-.15.15-.28.28-.58.28l.2-2.94 5.35-4.84c.23-.21-.05-.32-.35-.12L10.18 13.1l-2.85-.89c-.62-.2-.63-.62.13-.91l11.13-4.29c.51-.19.96.12.79 1.16z" />
              </svg>
              <span>Telegram Chat</span>
            </a>

            {/* Facebook */}
            <a 
              href={CONTACT_INFO.facebookUrl} 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="px-4 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center gap-2 text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-[1.04] hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(24,119,242,0.3)] hover:bg-[#1877F2] hover:border-transparent cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Follow us on Facebook</span>
            </a>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-solar text-solar transition-all group cursor-pointer hover:scale-105"
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
