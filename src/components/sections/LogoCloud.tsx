import React from 'react';
import { motion } from 'motion/react';

// Brand marks — inline so we don't depend on external logo files.
// Grayscale is applied by the parent wrapper, so brand colors are intentionally omitted.
const ProductHuntMark = () => (
  <span className="flex items-center gap-2">
    <svg viewBox="0 0 40 40" className="w-7 h-7" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="currentColor" />
      <path
        d="M17 11h6.2c3.2 0 5.8 2.6 5.8 5.8s-2.6 5.8-5.8 5.8H19v6.4h-2V11zm2 2v7.6h4.2c2.1 0 3.8-1.7 3.8-3.8s-1.7-3.8-3.8-3.8H19z"
        fill="#1a1a1a"
      />
    </svg>
    <span className="text-xl font-semibold tracking-tight">Product Hunt</span>
  </span>
);

const YCStartupSchoolMark = () => (
  <span className="flex items-center gap-2">
    <svg viewBox="0 0 40 40" className="w-7 h-7" aria-hidden="true">
      <rect width="40" height="40" rx="4" fill="currentColor" />
      <path
        d="M14.5 11l5.5 8.3L25.5 11h2.4l-6.9 10.4V29h-2v-7.6L12.1 11z"
        fill="#1a1a1a"
      />
    </svg>
    <span className="text-xl font-semibold tracking-tight">YC Startup School</span>
  </span>
);

const PhysicsWallahMark = () => (
  <span className="flex items-center gap-2">
    <img
      src={`${import.meta.env.BASE_URL}PW_logo.png`}
      alt="Physics Wallah"
      className="h-8 w-auto object-contain"
    />
    <span className="text-xl font-semibold tracking-tight">Physics Wallah</span>
  </span>
);

const LogoSet = () => (
  <>
    <ProductHuntMark />
    <YCStartupSchoolMark />
    <PhysicsWallahMark />
  </>
);

export default function LogoCloud() {
  return (
    <section className="border-t border-white/10 py-12 relative z-10 bg-[#1a1a1a] overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-center text-sm uppercase tracking-[0.2em] text-[#a3a3a3] mb-8"
      >
        Mentored by professionals from &amp; featured at
      </motion.p>

      <div className="flex whitespace-nowrap relative">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex items-center gap-20 px-10 grayscale opacity-60"
        >
          {/* Repeat the set enough times so the -50% loop remains seamless even with only 3 logos */}
          <LogoSet />
          <LogoSet />
          <LogoSet />
          <LogoSet />
          <LogoSet />
          <LogoSet />
        </motion.div>
      </div>

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10 pointer-events-none"></div>
    </section>
  );
}
