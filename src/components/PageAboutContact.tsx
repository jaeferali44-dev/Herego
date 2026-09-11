import React, { useState } from 'react';
import { Award, Compass, Heart, ArrowRight, ShieldCheck, Mail, Phone, MapPin, MessageSquare, ExternalLink } from 'lucide-react';
import { CONTACT_INFO as fallbackCONTACT_INFO } from '../data';
import { useWebsiteContent } from '../context/WebsiteContentContext';
import { motion, AnimatePresence } from 'motion/react';
import { LazyImage } from './LazyImage';
import { formatImageUrl } from '../types';
const logoImg = formatImageUrl("https://drive.google.com/file/d/1ElhGD9BLzFHQ5p179oyUJRai0pRYmGei/view?usp=drivesdk");

interface PageAboutContactProps {
  onAdminAccess?: () => void;
}

export default function PageAboutContact({ onAdminAccess }: PageAboutContactProps) {
  const { content } = useWebsiteContent();
  const CONTACT_INFO = content.contactInfo || fallbackCONTACT_INFO;

  const [layer1Unlocked, setLayer1Unlocked] = useState(false);
  const [layer2Unlocked, setLayer2Unlocked] = useState(false);
  const [layer3Unlocked, setLayer3Unlocked] = useState(false);
  const [showPrivateGatewayScreen, setShowPrivateGatewayScreen] = useState(false);
  return (
    <div id="about-contact-page-container" className="bg-obsidian text-off-white py-20">
      
      {/* Page Header banner */}
      <section className="relative py-36 md:py-48 px-6 sm:px-12 lg:px-16 overflow-hidden border-b border-accent-border/40">
        <div className="absolute inset-0 z-0">
          <LazyImage
            src="https://lh3.googleusercontent.com/d/1lPneimMnO3ELOjLv-zMcqYX4mBGtJ1IN"
            alt="Misty Ethiopian Mountains Backdrop"
            className="w-full h-full opacity-15 filter brightness-50"
            imgClassName="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/90 to-obsidian/70" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          <span className="text-solar text-xs sm:text-sm font-bold uppercase tracking-widest bg-solar/10 px-4.5 py-2 rounded-full border border-solar/30">
            About Our Travel Desk
          </span>
          <h1 className="font-display font-medium text-5xl sm:text-6xl lg:text-7xl text-off-white capitalize mt-8 mb-8 tracking-tight leading-tight">
            About &amp; Contact
          </h1>
          <p className="text-muted-silver text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            Discover the legacy, collaborative synergy, and detailed blueprint behind explore Ethiopia tour and travel.
          </p>
        </motion.div>
      </section>

      {/* BLOCK 1: Our Story & Synergy */}
      <section className="py-36 md:py-48 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-7 flex flex-col gap-10">
          <div className="inline-flex items-center gap-2.5 text-solar text-xs sm:text-sm font-bold uppercase tracking-widest">
            <Compass className="w-5 h-5 animate-spin-slow" />
            <span>Bridging Frontiers Together</span>
          </div>
          
          <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-off-white leading-tight">
            Our Story &amp; Synergy
          </h2>
          
          <p className="text-muted-silver text-base sm:text-lg lg:text-xl leading-relaxed font-sans">
            Born in Addis Ababa, <span className="text-solar font-bold">Explore Ethiopia Tour and Travel</span> was founded on a simple belief: travel should be profound, safe, and deeply personal. We bring decades of regional expertise, a robust fleet of operational transport options, and strong connections with local communities to create travel experiences that respect regional heritage and delight curious minds.
          </p>

          {/* Core Values / Synergy callouts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="p-8 bg-slate-card border border-accent-border/60 rounded-xl">
              <p className="font-display font-bold text-base sm:text-lg text-off-white mb-2 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-solar" />
                <span>Uncompromised Safety</span>
              </p>
              <p className="text-sm sm:text-base text-muted-silver leading-relaxed">
                Rigorously certified transport fleets, verified safety escorts, and around-the-clock ground coordination desks.
              </p>
            </div>

            <div className="p-8 bg-slate-card border border-accent-border/60 rounded-xl">
              <p className="font-display font-bold text-base sm:text-lg text-off-white mb-2 flex items-center gap-2.5">
                <Heart className="w-5 h-5 text-solar" />
                <span>Deep Local Connections</span>
              </p>
              <p className="text-sm sm:text-base text-muted-silver leading-relaxed">
                Respectful access to indigenous communities, regional celebrations, and remote paths with veteran guides.
              </p>
            </div>
          </div>
        </div>

        {/* Brand visual showcase */}
        <div className="lg:col-span-5 relative w-full lg:sticky lg:top-24">
          <div className="absolute -inset-2.5 bg-gradient-to-tr from-solar to-solar/20 rounded-2xl blur-xl opacity-25" />
          <div className="relative bg-slate-card border border-accent-border rounded-2xl p-8 sm:p-12 flex flex-col gap-6 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-solar/10 rounded-full blur-3xl" />
            
            <span className="text-xs text-solar font-bold uppercase tracking-widest bg-solar/10 px-3.5 py-1.5 rounded-md self-start">
              Official Brand
            </span>

            <div className="flex flex-col items-center text-center py-6 gap-5 bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
              <img 
                src={logoImg} 
                alt="Explore Ethiopia Tour and Travel Official Logo" 
                className="w-full max-w-[380px] h-auto object-contain mx-auto filter drop-shadow-xl"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="pt-4 border-t border-white/10 w-full">
                <p className="font-display font-black text-2xl lg:text-3xl text-off-white tracking-tight">
                  Explore <span className="text-solar">Ethiopia</span>
                </p>
                <p className="text-xs font-sans font-extrabold tracking-widest uppercase text-solar mt-1">
                  Tour &amp; Travel
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-muted-silver leading-relaxed border-t border-accent-border/40 pt-6">
              Decades of authentic East African hospitality, certified road itineraries, custom cross-border permits, and verified regional guides.
            </p>
          </div>
        </div>
      </section>

      {/* BLOCK 2: The Booking & Design Process (Step Grid) */}
      <section className="py-36 md:py-48 px-6 sm:px-12 lg:px-16 bg-slate-card border-y border-accent-border/50">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-24">
            <span className="text-solar text-xs sm:text-sm font-bold uppercase tracking-widest border-b-2 border-solar/30 pb-2">The Experience Blueprint</span>
            <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-off-white mt-6 mb-4 tracking-tight leading-tight">
              How We Shape Your Adventure
            </h2>
            <p className="text-muted-silver max-w-3xl mx-auto text-base sm:text-lg lg:text-xl leading-relaxed">
              From raw inspiration to smooth, high-end, comfortable execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            
            {/* Step 1 Card */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-obsidian border border-accent-border rounded-xl p-10 flex flex-col gap-6 hover:border-solar transition-all duration-300 relative group"
            >
              <div className="absolute top-5 right-8 font-display font-black text-6xl text-solar/10 group-hover:text-solar/20 transition-colors">
                01
              </div>
              <span className="text-[10px] sm:text-xs text-solar font-bold uppercase tracking-widest bg-solar/10 px-3 py-1.5 rounded self-start">
                First Intake
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-off-white">
                Submit Your Dream
              </h3>
              <p className="text-muted-silver text-base sm:text-lg leading-relaxed">
                Tell us where you want to go and what your style is using our digital inquiry systems.
              </p>
            </motion.div>

            {/* Step 2 Card */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-obsidian border border-accent-border rounded-xl p-10 flex flex-col gap-6 hover:border-solar transition-all duration-300 relative group"
            >
              <div className="absolute top-5 right-8 font-display font-black text-6xl text-solar/10 group-hover:text-solar/20 transition-colors">
                02
              </div>
              <span className="text-[10px] sm:text-xs text-solar font-bold uppercase tracking-widest bg-solar/10 px-3 py-1.5 rounded self-start">
                Expert Design
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-off-white">
                Drafting the Plan
              </h3>
              <p className="text-muted-silver text-base sm:text-lg leading-relaxed">
                Our travel desk in Addis Ababa maps out custom accommodation, routes, flights, and professional guide pairings.
              </p>
            </motion.div>

            {/* Step 3 Card */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-obsidian border border-accent-border rounded-xl p-10 flex flex-col gap-6 hover:border-solar transition-all duration-300 relative group"
            >
              <div className="absolute top-5 right-8 font-display font-black text-6xl text-solar/10 group-hover:text-solar/20 transition-colors">
                03
              </div>
              <span className="text-[10px] sm:text-xs text-solar font-bold uppercase tracking-widest bg-solar/10 px-3 py-1.5 rounded self-start">
                Departure Ready
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-off-white">
                Verification &amp; Go
              </h3>
              <p className="text-muted-silver text-base sm:text-lg leading-relaxed">
                We finalize your custom price proposal, secure your transport options, and align the regional details so you can explore with complete peace of mind.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Custom Contact Desk details section */}
      <section id="contact-desk-section" className="py-36 md:py-48 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <span className="text-solar text-xs sm:text-sm font-bold uppercase tracking-widest">Direct Access Desk</span>
              <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-off-white mt-4 mb-6 leading-tight">
                Plan Your Tour
              </h2>
              <p className="text-muted-silver text-base sm:text-lg lg:text-xl leading-relaxed">
                Ready to explore Ethiopia and beyond? Get in touch with our travel specialists, and we'll help you plan the perfect trip tailored to your interests, schedule, and budget.
              </p>
            </div>

            <div className="flex flex-col gap-6 text-base sm:text-lg text-muted-silver">
              <div className="flex items-start gap-4 p-6 sm:p-8 bg-slate-card border border-accent-border/50 rounded-xl hover:border-solar/40 transition-colors group">
                <MapPin className="w-6 h-6 text-solar shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="font-bold text-off-white text-base sm:text-lg">Central Operations Base</p>
                  <p className="text-sm sm:text-base text-muted-silver mt-1">{CONTACT_INFO.office}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 sm:p-8 bg-slate-card border border-accent-border/50 rounded-xl hover:border-solar/40 transition-colors group">
                <Mail className="w-6 h-6 text-solar shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="font-bold text-off-white text-base sm:text-lg">Inquiry Processing Email</p>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm sm:text-base text-solar hover:underline mt-1 break-all block font-bold">{CONTACT_INFO.email}</a>
                </div>
              </div>

              {/* Branded Social Channels Card */}
              <div className="p-6 sm:p-8 bg-slate-card border border-accent-border/50 rounded-xl flex flex-col gap-5 hover:border-solar/40 transition-colors">
                <div>
                  <p className="font-bold text-off-white text-base sm:text-lg">Connect on Social Channels</p>
                  <p className="text-sm text-muted-silver mt-1">Join our online explorer community</p>
                </div>
                
                <div className="flex flex-col gap-3">
                  {/* Instagram */}
                  <a
                    href={CONTACT_INFO.instagramUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center gap-3 px-4.5 py-3 rounded-xl bg-obsidian border border-accent-border/40 text-sm text-zinc-300 hover:text-white transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(238,42,123,0.18)] hover:bg-gradient-to-r hover:from-[#833ab4]/10 hover:to-[#fcb045]/10 hover:border-[#ee2a7b]/40 cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-[#ee2a7b] stroke-current fill-none shrink-0" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span className="font-semibold text-zinc-300">Follow us on Instagram</span>
                  </a>

                  {/* TikTok */}
                  <a
                    href={CONTACT_INFO.tiktokUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center gap-3 px-4.5 py-3 rounded-xl bg-obsidian border border-accent-border/40 text-sm text-zinc-300 hover:text-white transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,242,254,0.15)] hover:bg-black/40 hover:border-zinc-700 cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-[#00f2fe] fill-current drop-shadow-[1px_1px_0_#fe0979] shrink-0" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08.7.3 1.4.67 2.01.62.96 1.49 1.7 2.53 2.19.78.36 1.63.56 2.49.59v3.91c-1.39-.03-2.75-.41-3.95-1.12-.46-.28-.88-.62-1.25-1.01V15.5c-.04 1.79-.62 3.52-1.68 4.9-1.35 1.72-3.41 2.72-5.59 2.72-2.18 0-4.24-1-5.59-2.72-1.06-1.38-1.64-3.11-1.68-4.9-.04-1.79.54-3.52 1.6-4.9 1.25-1.6 3.16-2.57 5.2-2.61.12 0 .24 0 .36.01v3.94c-.16-.02-.32-.03-.48-.02-1.11.05-2.11.62-2.73 1.54-.53.76-.8 1.69-.76 2.63.05.94.41 1.83 1.02 2.53.71.79 1.74 1.24 2.82 1.24s2.11-.45 2.82-1.24c.61-.7 1.02-1.59 1.02-2.53.04-3.64-.01-14.73-.01-14.73z"/>
                    </svg>
                    <span className="font-semibold text-zinc-300">Follow us on TikTok</span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={CONTACT_INFO.whatsAppUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center gap-3 px-4.5 py-3 rounded-xl bg-obsidian border border-accent-border/40 text-sm text-zinc-300 hover:text-white transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(37,211,102,0.18)] hover:bg-[#25D366]/10 hover:border-[#25D366]/40 cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-[#25D366] fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M12.031 2c-5.52 0-10 4.48-10 10 0 1.931.547 3.731 1.492 5.269L2.122 22.1c-.14.408.249.816.666.665l5.241-1.378A9.92 9.92 0 0012.03 22c5.5 0 10-4.48 10-10S17.55 2 12.03 2zm-.095 18a7.923 7.923 0 01-3.52-.821c-.105-.054-.223-.058-.33-.024l-2.074.629.629-2.074c.03-.105.02-.22-.03-.33A7.9 7.9 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.306-5.741c-.2-.1-.17-.11-.47-.42l-.44-.45c-.11-.11-.29-.11-.4 0l-.33.33c-.22.22-.57.25-.83.08-.12-.08-.34-.23-.62-.48a4.93 4.93 0 01-.89-1.02c-.17-.26-.14-.6.08-.82l.14-.14c.11-.11.11-.29 0-.4l-.45-.44c-.31-.3-.32-.27-.42-.47-.1-.2-.05-.4.05-.5.1-.1.25-.26.37-.39.12-.13.16-.27.1-.42-.06-.15-.43-1.04-.59-1.44-.16-.39-.32-.33-.44-.33-.12 0-.25.01-.39.01-.14 0-.37.05-.56.26-.19.21-.74.72-.74 1.76s.76 2.04.86 2.18c.11.14 1.5 2.29 3.64 3.22.51.22.91.35 1.22.45.51.16.98.14 1.35.08.41-.06 1.26-.51 1.44-1.01.18-.5.18-.93.13-1.01-.05-.09-.2-.14-.4-.24z" />
                    </svg>
                    <span className="font-semibold text-zinc-300">Chat with us on WhatsApp</span>
                  </a>

                  {/* Telegram */}
                  <a
                    href={CONTACT_INFO.telegramUrl || `https://t.me/+251${(CONTACT_INFO.phone1 || '0910503969').replace(/^0/, '')}`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center gap-3 px-4.5 py-3 rounded-xl bg-obsidian border border-accent-border/40 text-sm text-zinc-300 hover:text-white transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(34,158,217,0.18)] hover:bg-[#229ED9]/10 hover:border-[#229ED9]/40 cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-[#229ED9] fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.18l-1.91 9.02c-.14.65-.53.81-1.08.5l-2.91-2.14-1.4 1.35c-.15.15-.28.28-.58.28l.2-2.94 5.35-4.84c.23-.21-.05-.32-.35-.12L10.18 13.1l-2.85-.89c-.62-.2-.63-.62.13-.91l11.13-4.29c.51-.19.96.12.79 1.16z" />
                    </svg>
                    <span className="font-semibold text-zinc-300">Chat with us on Telegram</span>
                  </a>

                  {/* Facebook */}
                  <a
                    href={CONTACT_INFO.facebookUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center gap-3 px-4.5 py-3 rounded-xl bg-obsidian border border-accent-border/40 text-sm text-zinc-300 hover:text-white transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(24,119,242,0.18)] hover:bg-[#1877F2]/10 hover:border-[#1877F2]/40 cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-[#1877F2] fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="font-semibold text-zinc-300">Follow us on Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-card border border-accent-border rounded-xl p-8 sm:p-14 flex flex-col gap-8 shadow-2xl">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-off-white">Our Support Team Channels</h3>
            <p className="text-sm sm:text-base text-muted-silver leading-relaxed">
              For security, robust response tracking, and prompt receipt of itinerary designs, we recommend initiating contact via phone call or WhatsApp message.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <a
                href={`tel:${CONTACT_INFO.phone1}`}
                className="p-8 rounded-xl bg-obsidian border border-accent-border/60 hover:border-solar transition-all group flex flex-col gap-3"
              >
                <Phone className="w-6 h-6 text-solar group-hover:scale-110 transition-transform" />
                <p className="text-[10px] sm:text-xs uppercase text-muted-silver/60 tracking-widest mt-2 font-bold">Primary Line</p>
                <p className="text-base sm:text-lg font-black text-off-white">{CONTACT_INFO.phoneFormatted1}</p>
                <p className="text-xs text-muted-silver/80">Tap to place instant call</p>
              </a>

              <a
                href={`tel:${CONTACT_INFO.phone2}`}
                className="p-8 rounded-xl bg-obsidian border border-accent-border/60 hover:border-solar transition-all group flex flex-col gap-3"
              >
                <Phone className="w-6 h-6 text-solar group-hover:scale-110 transition-transform" />
                <p className="text-[10px] sm:text-xs uppercase text-muted-silver/60 tracking-widest mt-2 font-bold">Secondary Line</p>
                <p className="text-base sm:text-lg font-black text-off-white">{CONTACT_INFO.phoneFormatted2}</p>
                <p className="text-xs text-muted-silver/80">Tap to place instant call</p>
              </a>
            </div>

            <a
              href={CONTACT_INFO.whatsAppUrl}
              target="_blank"
              referrerPolicy="no-referrer"
              className="w-full py-5 rounded-xl bg-[#25D366] text-white font-display font-black text-sm tracking-widest uppercase text-center flex items-center justify-center gap-2.5 hover:bg-[#20ba5a] hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chat on WhatsApp ({CONTACT_INFO.phone1})</span>
            </a>
          </div>

        </div>
      </section>

      {/* Hidden Access Dots Container (Blends naturally with page, no text, no admin buttons) */}
      <div className="pt-8 pb-4 flex items-center justify-center gap-2">
        {/* Layer 1 - Hidden Dot (Double-click to reveal Layer 2 Dot) */}
        <button
          type="button"
          onClick={(e) => {
            if (e.detail === 2) {
              setLayer1Unlocked(true);
            }
          }}
          onDoubleClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLayer1Unlocked(true);
          }}
          className="p-2 group cursor-pointer focus:outline-none border-none bg-transparent"
          title=""
          aria-label=""
        >
          <div className="w-2 h-2 rounded-full bg-zinc-700/50 group-hover:bg-amber-400/80 transition-all scale-90 group-hover:scale-125" />
        </button>

        {/* Layer 2 - Second Hidden Dot (Revealed after Layer 1 double-click. Double-click to reveal Layer 3 Dot) */}
        {layer1Unlocked && (
          <button
            type="button"
            onClick={(e) => {
              if (e.detail === 2) {
                setLayer2Unlocked(true);
              }
            }}
            onDoubleClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLayer2Unlocked(true);
            }}
            className="p-2 group cursor-pointer focus:outline-none border-none bg-transparent"
            title=""
            aria-label=""
          >
            <div className="w-2 h-2 rounded-full bg-amber-500/70 group-hover:bg-amber-400 transition-all scale-100 group-hover:scale-125" />
          </button>
        )}

        {/* Layer 3 - Third Hidden Dot (Revealed after Layer 2 double-click. Double-click to reveal Layer 4 Management Access) */}
        {layer2Unlocked && (
          <button
            type="button"
            onClick={(e) => {
              if (e.detail === 2) {
                setLayer3Unlocked(true);
                setShowPrivateGatewayScreen(true);
              }
            }}
            onDoubleClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLayer3Unlocked(true);
              setShowPrivateGatewayScreen(true);
            }}
            className="p-2 group cursor-pointer focus:outline-none border-none bg-transparent animate-bounce"
            title=""
            aria-label=""
          >
            <div className="w-2 h-2 rounded-full bg-amber-400 group-hover:bg-amber-300 transition-all scale-100 group-hover:scale-125 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
          </button>
        )}
      </div>

      {/* Layer 4 - Private Management Access Option Screen (Accidental Visitor Protected) */}
      <AnimatePresence>
        {showPrivateGatewayScreen && (
          <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-center flex flex-col items-center gap-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold font-display text-zinc-100">Private Gateway Desk</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Restricted operations area. Standard administrative sign-in credentials (Username and Password) are required to proceed.
                </p>
              </div>

              <div className="w-full flex flex-col gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPrivateGatewayScreen(false);
                    if (onAdminAccess) {
                      onAdminAccess();
                    }
                  }}
                  className="w-full py-3.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Proceed to Admin Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLayer1Unlocked(false);
                    setLayer2Unlocked(false);
                    setLayer3Unlocked(false);
                    setShowPrivateGatewayScreen(false);
                  }}
                  className="w-full py-3 px-5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-sm transition-all cursor-pointer"
                >
                  Back to About Page
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
