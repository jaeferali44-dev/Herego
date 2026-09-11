import React from 'react';
import { ShieldCheck, ArrowRight, Lock, Eye, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { LazyImage } from './LazyImage';

export default function PagePrivacyPolicy() {
  return (
    <div id="privacy-policy-page-container" className="bg-obsidian text-off-white py-20">
      {/* Page Header banner */}
      <section className="relative py-36 md:py-48 px-6 sm:px-12 lg:px-16 overflow-hidden border-b border-accent-border/40">
        <div className="absolute inset-0 z-0">
          <LazyImage
            src="https://lh3.googleusercontent.com/d/1lPneimMnO3ELOjLv-zMcqYX4mBGtJ1IN"
            alt="Misty Ethiopian Mountains Backdrop"
            className="w-full h-full opacity-10 filter brightness-50"
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
            Legal Information
          </span>
          <h1 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-off-white capitalize mt-8 mb-8 tracking-tight leading-tight">
            Privacy Policy
          </h1>
          <p className="text-muted-silver text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Your privacy is of the utmost importance to us. This policy describes how we handle and protect your personal information at explore Ethiopia tour and travel.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6 sm:px-12 lg:px-16 max-w-4xl mx-auto">
        <div className="flex flex-col gap-12 font-sans text-muted-silver text-sm sm:text-base leading-relaxed">
          
          <div className="flex flex-col gap-4">
            <h2 className="font-display font-bold text-2xl text-off-white flex items-center gap-3">
              <Lock className="w-6 h-6 text-solar" />
              <span>1. Information We Collect</span>
            </h2>
            <p>
              We collect information to provide premium, custom-tailored travel experiences. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-400">
              <li>Contact details such as your name, email address, phone number, and physical address.</li>
              <li>Travel preferences, dietary restrictions, accommodation requests, and specific physical requirements.</li>
              <li>Passport details and regional permit information where legally required by local Ethiopian authorities.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-display font-bold text-2xl text-off-white flex items-center gap-3">
              <Eye className="w-6 h-6 text-solar" />
              <span>2. How We Use Your Information</span>
            </h2>
            <p>
              The information we gather is used strictly for booking, personalization, and security purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-400">
              <li>To design, coordinate, and secure permits for custom itineraries.</li>
              <li>To communicate itinerary updates, safety bulletins, and billing details.</li>
              <li>To coordinate with our certified ground teams and transport logistics managers.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-display font-bold text-2xl text-off-white flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-solar" />
              <span>3. Data Security and Sharing</span>
            </h2>
            <p>
              We implement industry-standard administrative, physical, and technological safeguards to protect your personal data. Your information is never sold or traded to third-party marketers. It is shared only with certified travel providers, accommodation bases, or national park registries to the extent necessary to execute your travel permits and bookings.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-display font-bold text-2xl text-off-white flex items-center gap-3">
              <FileText className="w-6 h-6 text-solar" />
              <span>4. Your Rights</span>
            </h2>
            <p>
              You have the right to request access to the personal data we hold about you, request corrections, or request complete deletion of your records. Please contact our central travel desk directly to initiate any data access request.
            </p>
          </div>

          <div className="border-t border-accent-border/40 pt-8 mt-4 text-xs text-zinc-500">
            <p>Last updated: July 2026. Explore Ethiopia Tour and Travel.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
