import React from 'react';
import { Marquee } from '../ui/marquee';

const allBrands = [
  { name: "YouTube", svg: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></> },
  { name: "Classroom", svg: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></> },
  { name: "Desmos", svg: <><path d="M2 12A10 10 0 1 0 22 12A10 10 0 1 0 2 12M6 12L18 12M12 6L12 18"/></> },
  { name: "PDF", svg: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></> },
  { name: "Notion", svg: <><path d="M4 4h16v16H4z M9 9h6v6H9z" /></> },
  { name: "Drive", svg: <><path d="M10.8 4.8L4 16.8 7.2 22.4l6.8-12M20 22.4L23.2 16.8 16.4 4.8M4 16.8h13.6L20 22.4H7.2z" /></> },
  { name: "Khan", svg: <><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></> },
  { name: "Zoom", svg: <><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></> }
];

const row1 = allBrands.slice(0, 4);
const row2 = allBrands.slice(4, 8);

export default function Integrations() {
  return (
    <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center overflow-hidden">
      <div className="z-10 relative">
        <p className="text-[#a3a3a3] text-lg mb-4">Plugs in. Levels up.</p>
        <h2 className="text-5xl md:text-7xl font-medium mb-8 leading-tight text-white">
          Works with what<br/>you already<br/>use.
        </h2>
        <p className="text-xl text-[#a3a3a3] max-w-md">
          YouTube videos, PDF textbooks, Desmos graphing, Google Classroom — all integrated seamlessly into the whiteboard experience.
        </p>
      </div>

      <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-end -mx-6 md:mx-0 pr-0 md:-mr-12 lg:-mr-24 mask-edges-left">
        {/* CSS Mask to fade the left edge to integrate cleanly into the dark background */}
        <div 
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 100%)', 
            WebkitMaskImage: '-webkit-linear-gradient(left, transparent, black 15%, black 100%)' 
          }} 
          className="w-full h-full flex flex-col justify-center gap-4 md:gap-5"
        >
          {/* Row 1 */}
          <div className="w-[120%] absolute -right-[10%] flex flex-col gap-4 md:gap-5">
            <Marquee duration={35} repeat={5} className="[--gap:1rem] md:[--gap:1.25rem]">
              {row1.map((brand, i) => (
                <div 
                  key={`r1-${i}`} 
                  className="w-40 h-40 md:w-[200px] md:h-[200px] shrink-0 bg-[#9ea6a3] rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center justify-center gap-3 transition-transform hover:scale-105 cursor-pointer shadow-lg overflow-hidden group"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className={`w-12 h-12 md:w-16 md:h-16 transition-colors ${
                      i % 3 === 0 ? 'text-[#e8705b] fill-[#e8705b]/20' : 
                      i % 2 === 0 ? 'text-blue-600 fill-blue-600/20' : 
                      'text-[#1a1a1a] fill-[#1a1a1a]/20'
                    }`}
                  >
                    {brand.svg}
                  </svg>
                  <span className="text-[#1a1a1a] font-bold text-sm md:text-base tracking-tight opacity-80 group-hover:opacity-100 transition-opacity">
                    {brand.name}
                  </span>
                </div>
              ))}
            </Marquee>

            {/* Row 2 */}
            <Marquee duration={40} repeat={5} reverse className="[--gap:1rem] md:[--gap:1.25rem]">
              {row2.map((brand, i) => (
                <div 
                  key={`r2-${i}`} 
                  className="w-40 h-40 md:w-[200px] md:h-[200px] shrink-0 bg-[#9ea6a3] rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center justify-center gap-3 transition-transform hover:scale-105 cursor-pointer shadow-lg overflow-hidden group"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className={`w-12 h-12 md:w-16 md:h-16 transition-colors ${
                      (i+1) % 3 === 0 ? 'text-[#e8705b] fill-[#e8705b]/20' : 
                      (i+1) % 2 === 0 ? 'text-emerald-700 fill-emerald-700/20' : 
                      'text-[#1a1a1a] fill-[#1a1a1a]/20'
                    }`}
                  >
                    {brand.svg}
                  </svg>
                  <span className="text-[#1a1a1a] font-bold text-sm md:text-base tracking-tight opacity-80 group-hover:opacity-100 transition-opacity">
                    {brand.name}
                  </span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
