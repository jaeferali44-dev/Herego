import React from 'react';
import { FileText, Compass, Scale, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { LazyImage } from './LazyImage';

export default function PageTermsConditions() {
  return (
    <div id="terms-conditions-page-container" className="bg-obsidian text-off-white py-20">
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
            Terms &amp; Conditions
          </h1>
          <p className="text-muted-silver text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Please read these terms and conditions carefully. They outline the legal agreement between you and explore Ethiopia tour and travel.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6 sm:px-12 lg:px-16 max-w-4xl mx-auto">
        <div className="flex flex-col gap-12 font-sans text-muted-silver text-sm sm:text-base leading-relaxed">
          
          <div className="flex flex-col gap-4">
            <h2 className="font-display font-bold text-2xl text-off-white flex items-center gap-3">
              <Compass className="w-6 h-6 text-solar" />
              <span>1. Booking and Payments</span>
            </h2>
            <p>
              By confirming a custom tour, travel program, or transportation rental through explore Ethiopia tour and travel, you agree to the designated payment timeline discussed at the time of your reservation. A deposit is required to secure premium vehicles, expert local guides, and regional permits. All prices are calculated in good faith based on current regional tariffs, fuel costs, and park fee regulations.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-display font-bold text-2xl text-off-white flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-solar" />
              <span>2. Regional Permits and Custody</span>
            </h2>
            <p>
              Certain remote destinations (such as Dallol, Erta Ale, and specific zones within Simien and Bale Mountains National Parks) require regional security clearances and local permitting. Explore Ethiopia Tour and Travel manages these applications on your behalf. You agree to provide accurate and timely passport details to ensure permit validation.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-display font-bold text-2xl text-off-white flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-solar" />
              <span>3. Changes and Cancellations</span>
            </h2>
            <p>
              Due to the bespoke nature of travel in East Africa, cancellations or modification policies vary by package, hotel base, and logistics complexity. We work closely with each customer to provide flexible rescheduling where possible. explore Ethiopia tour and travel reserves the right to make minor modifications to itineraries due to local weather anomalies, road conditions, or security considerations to prioritize guest safety.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-display font-bold text-2xl text-off-white flex items-center gap-3">
              <Scale className="w-6 h-6 text-solar" />
              <span>4. Liability Limitation</span>
            </h2>
            <p>
              While every effort is made to maintain top-tier comfort, travel in remote terrain carries inherent environmental variables. Explore Ethiopia Tour and Travel is not responsible for delays, losses, or expenses resulting from flight cancellations, natural weather shifts, or regional infrastructure adjustments. We strongly encourage all guests to purchase comprehensive international travel insurance before arrival.
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
