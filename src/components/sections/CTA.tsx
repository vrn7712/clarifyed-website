import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CTA() {
  const containerRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const graphicsRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<SVGCircleElement>(null);

  useGSAP(() => {
    // Ensure cleanup of previous scroll triggers
    const ctx = gsap.context(() => {
      // Dynamic sweep lines
      const startPath = "M 0 100 V 100 Q 50 100 100 100 V 100 z";
      const midPath   = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
      const endPath   = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top", // Trigger when the top of section touches the top of window 
          end: "+=200%",    // Controls scrolling distance inside the pin
          pin: true,
          scrub: 1,         // Smooth interpolations 
        }
      });

      // 1. Reveal Sweep
      // We animate the "d" attribute directly. As long as points and types match, 
      // core GSAP natively handles standard simple morphing without the MorphSVGPlugin!
      tl.to(pathRef.current, { attr: { d: midPath }, ease: "power1.in", duration: 1 })
        .to(pathRef.current, { attr: { d: endPath }, ease: "power1.out", duration: 1 });

      // 2. Fade in CTA contents over the new background
      tl.fromTo(contentRef.current, 
        { opacity: 0, y: 60 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 
        "-=0.5"
      );

      // 3. Fade in diagram container seamlessly
      tl.fromTo(graphicsRef.current, 
        { opacity: 0 }, 
        { opacity: 0.4, duration: 0.5 }, 
        "-=0.6"
      );

      // 4. Manually trigger gravity well object
      // Use an empty object proxy to tween numeric progress
      const spiralData = { p: 0 };
      tl.to(spiralData, {
        p: 1.0,
        duration: 3, 
        ease: "none",
        onUpdate: () => {
          const progress = Math.max(0, Math.min(1, spiralData.p));
          const angle = progress * Math.PI * 10; // spiral 5 full rotations
          
          const radiusX = 550 * (1 - progress);
          const radiusY = 180 * (1 - progress);
          const dip = 2 * (1 - progress) * progress * 150;
          
          const cx = 600 + radiusX * Math.cos(angle);
          const cy = 250 + radiusY * Math.sin(angle) + dip;
          const r = 20 * (1 - progress) + 3;

          if (ballRef.current) {
            ballRef.current.setAttribute("cx", cx.toString());
            ballRef.current.setAttribute("cy", cy.toString());
            ballRef.current.setAttribute("r", r.toString());
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="contact" className="bg-[#1a1a1a] w-full h-screen relative overflow-hidden flex flex-col">
      
      {/* Absolute SVG expanding background mapping to full container */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path ref={pathRef} d="M 0 100 V 100 Q 50 100 100 100 V 100 z" fill="#e8705b" />
        </svg>
      </div>

      <div ref={contentRef} className="relative z-20 pt-16 md:pt-24 text-center w-full px-6 opacity-0 flex-none">
        <h2 className="text-5xl md:text-7xl font-medium text-[#1a1a1a] mb-4">
          Built to fit today.<br/>Ready for tomorrow.
        </h2>
        <p className="text-xl text-[#1a1a1a]/80 max-w-2xl mx-auto mb-6 md:mb-8">
          The best teacher you ever had, available anytime. Start learning on the whiteboard today.
        </p>
        <button className="px-8 py-4 rounded-full text-lg bg-[#9ca3af] text-[#1a1a1a] font-medium hover:bg-[#8b929e] transition-colors cursor-pointer relative z-30">
          Get Started
        </button>
      </div>
      
      {/* 3D Gravity well graphic - strictly constrained inside remaining flex space */}
      <div ref={graphicsRef} className="relative z-10 w-full max-w-[1200px] mx-auto opacity-0 pointer-events-none hidden md:flex flex-1 items-end justify-center overflow-hidden pt-4 pb-2">
        <svg viewBox="0 0 1200 550" fill="none" className="w-[120%] md:w-full h-full" preserveAspectRatio="xMidYMax meet">
          
          {/* Concentric ellipses plotting deep into the void */}
          <ellipse cx="600" cy="250" rx="550" ry="180" stroke="#1a1a1a" strokeWidth="1" opacity="0.9" />
          <ellipse cx="600" cy="250" rx="450" ry="145" stroke="#1a1a1a" strokeWidth="1" opacity="0.9" />
          <ellipse cx="600" cy="250" rx="350" ry="110" stroke="#1a1a1a" strokeWidth="1" opacity="0.9" />
          <ellipse cx="600" cy="250" rx="250" ry="75" stroke="#1a1a1a" strokeWidth="1" opacity="0.9" />
          <ellipse cx="600" cy="250" rx="150" ry="40" stroke="#1a1a1a" strokeWidth="1" opacity="0.9" />
          <ellipse cx="600" cy="250" rx="80" ry="18" stroke="#1a1a1a" strokeWidth="1" opacity="0.9" />
          <ellipse cx="600" cy="250" rx="30" ry="5" stroke="#1a1a1a" strokeWidth="1" opacity="0.9" />

          {/* Radial lines tracing the funnel descent into the pit */}
          {Array.from({length: 16}).map((_, i) => {
            const angle = (i * Math.PI) / 8;
            const startX = 600 + 550 * Math.cos(angle);
            const startY = 250 + 180 * Math.sin(angle);
            const endX = 600 + 30 * Math.cos(angle);
            const endY = 250 + 5 * Math.sin(angle);
            
            // Dramatic cpY push to create a powerful gravity drop
            const cpX = 600 + 200 * Math.cos(angle);
            const cpY = 250 + 100 * Math.sin(angle) + 180; 
            
            return (
              <path 
                key={i} 
                d={`M ${startX} ${startY} Q ${cpX} ${cpY} ${endX} ${endY}`} 
                stroke="#1a1a1a" 
                strokeWidth="1" 
                opacity="0.8"
              />
            );
          })}
          
          <circle 
            ref={ballRef}
            cx="1150" 
            cy="250" 
            r="17" 
            fill="white" 
            style={{ filter: "drop-shadow(0px 0px 15px rgba(255,255,255,1))" }}
          />
        </svg>
      </div>
    </section>
  );
}
