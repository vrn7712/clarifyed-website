import React from 'react';
import { motion } from 'motion/react';

const brandsRow1 = [
  { name: "YouTube", svg: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></> },
  { name: "Google Classroom", svg: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></> },
  { name: "Desmos", svg: <><path d="M2 12A10 10 0 1 0 22 12A10 10 0 1 0 2 12M6 12L18 12M12 6L12 18"/></> },
  { name: "PDF", svg: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></> }
];

const brandsRow2 = [
  { name: "Notion", svg: <><path d="M4 4h16v16H4z M9 9h6v6H9z" /></> },
  { name: "Drive", svg: <><path d="M10.8 4.8L4 16.8 7.2 22.4l6.8-12M20 22.4L23.2 16.8 16.4 4.8M4 16.8h13.6L20 22.4H7.2z" /></> },
  { name: "Khan Academy", svg: <><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></> },
  { name: "Zoom", svg: <><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></> }
];

export default function Integrations() {
  return (
    <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center overflow-hidden">
      <div className="z-10 relative">
        <p className="text-[#a3a3a3] text-lg mb-4">Plugs in. Levels up.</p>
        <h2 className="text-5xl md:text-7xl font-medium mb-8 leading-tight">
          Works with what<br/>you already<br/>use.
        </h2>
        <p className="text-xl text-[#a3a3a3] max-w-md">
          YouTube videos, PDF textbooks, Desmos graphing, Google Classroom — all integrated seamlessly into the whiteboard experience.
        </p>
      </div>

      <div className="relative h-[400px] md:h-[600px] w-full flex flex-col justify-center gap-6 md:gap-8 mask-edges overflow-hidden -mx-6 md:mx-0 w-[calc(100%+3rem)] md:w-full">
        {/* CSS Mask to fade the edges of the marquee */}
        <div style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: '-webkit-linear-gradient(left, transparent, black 15%, black 85%, transparent)' }} className="w-[150%] md:w-[120%] -ml-[25%] md:-ml-[10%] flex flex-col gap-6 md:gap-8 transform -rotate-6">
          
          {/* Row 1 - Moves Left */}
          <div className="flex w-[200%] gap-6">
            <motion.div 
              animate={{ x: [0, "-50%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex w-fit justify-around gap-6 pr-6"
            >
              {[...brandsRow1, ...brandsRow1, ...brandsRow1, ...brandsRow1].map((brand, i) => (
                <div key={i} className="flex-shrink-0 flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-8 py-5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#a3a3a3] group-hover:text-white transition-colors">
                    {brand.svg}
                  </svg>
                  <span className="text-xl font-medium text-[#a3a3a3] group-hover:text-white transition-colors">{brand.name}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 - Moves Right */}
          <div className="flex w-[200%] gap-6">
            <motion.div 
              animate={{ x: ["-50%", 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex w-fit justify-around gap-6 pr-6"
            >
              {[...brandsRow2, ...brandsRow2, ...brandsRow2, ...brandsRow2].map((brand, i) => (
                <div key={`reverse-${i}`} className="flex-shrink-0 flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-8 py-5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#a3a3a3] group-hover:text-white transition-colors">
                    {brand.svg}
                  </svg>
                  <span className="text-xl font-medium text-[#a3a3a3] group-hover:text-white transition-colors">{brand.name}</span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
