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
          start: "top top",
          end: "+=100%",          // Tight: unpin coincides with timeline completion
          pin: true,
          pinSpacing: true,
          pinReparent: true,      // Move section to <body> during pin → no ancestor stacking interference
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
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

      // 3. Fade in diagram container seamlessly (fixed opacity from 0.4 to 1)
      tl.fromTo(graphicsRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.5 }, 
        "-=0.6"
      );

      // 4. Manually trigger gravity well object
      const spiralData = { p: 0 };
      tl.to(spiralData, {
        p: 1.0,
        duration: 5, // Extended duration to ensure scroll gives plenty of time to watch
        ease: "none",
        onUpdate: () => {
          const progress = Math.max(0, Math.min(1, spiralData.p));
          // Spins faster as it approaches the center (conservation of angular momentum)
          const angle = Math.pow(progress, 1.2) * Math.PI * 14; 
          
          const t = progress;
          let radiusX, radiusY, cyCenter;

          if (t <= 0.9) {
            // Rolling along the grid surface
            const ease = t * t * t; 
            radiusX = 580 * (1 - t);
            radiusY = 190 * (1 - t);
            cyCenter = 250 + 200 * ease;
          } else {
            // Falling INSIDE the hole
            const overshoot = (t - 0.9) / 0.1; // goes from 0 to 1 in final phase
            const rimRx = 580 * 0.1;
            const rimRy = 190 * 0.1;
            const rimCy = 250 + 200 * Math.pow(0.9, 3);
            
            radiusX = rimRx * (1 - Math.pow(overshoot, 0.5)); // tightly loops inward
            radiusY = rimRy * (1 - Math.pow(overshoot, 0.5));
            cyCenter = rimCy + overshoot * 40; // dips further down the pipe
          }
          
          const cx = 600 + radiusX * Math.cos(angle);
          const cy = cyCenter + radiusY * Math.sin(angle);
          
          // Orb shrinks to zero gracefully
          const r = Math.max(0, 16 * (1 - t));

          if (ballRef.current) {
            ballRef.current.setAttribute("cx", cx.toString());
            ballRef.current.setAttribute("cy", cy.toString());
            ballRef.current.setAttribute("r", r.toString());
          }
        }
      }, "-=0.2"); // Start animation right as the grid finishes fading in
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="contact"
      className="bg-[#1a1a1a] w-full h-screen relative overflow-hidden flex flex-col"
      style={{ zIndex: 30, isolation: 'isolate' }}
    >
      
      {/* Absolute SVG expanding background mapping to full container */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path ref={pathRef} d="M 0 100 V 100 Q 50 100 100 100 V 100 z" fill="#e8705b" />
        </svg>
      </div>

      <div ref={contentRef} className="relative z-20 pt-16 md:pt-24 text-center w-full px-6 opacity-0 flex-none">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-medium text-[#1a1a1a] mb-3 sm:mb-4">
          Built to fit today.<br/>Ready for tomorrow.
        </h2>
        <p className="text-base sm:text-xl text-[#1a1a1a]/80 max-w-2xl mx-auto mb-6 md:mb-8">
          The best teacher you ever had, available anytime. Start learning on the whiteboard today.
        </p>
        <a href="https://alpha.clarifyed.ai/" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 rounded-full text-lg bg-[#9ca3af] text-[#1a1a1a] font-medium hover:bg-[#8b929e] transition-colors cursor-pointer relative z-30">
          Get Started
        </a>
      </div>
      
      {/* 3D Gravity well graphic - strictly constrained inside remaining flex space */}
      <div ref={graphicsRef} className="relative z-10 w-full max-w-[1200px] mx-auto opacity-0 pointer-events-none hidden md:flex flex-1 items-end justify-center overflow-hidden pt-4 pb-2">
        <svg viewBox="0 0 1200 550" fill="none" className="w-[120%] md:w-full h-full" preserveAspectRatio="xMidYMax meet">
          
          {/* Concentric ellipses plotting deep into the void */}
          {Array.from({length: 10}).map((_, i) => {
            const t = (i / 9) * 0.9; // Stops at t=0.9 to form the hole edge
            const ease = t * t * t;
            const rx = 580 * (1 - t);
            const ry = 190 * (1 - t);
            const cy = 250 + 200 * ease;
            return (
              <ellipse key={`ellipse-${i}`} cx="600" cy={cy} rx={rx} ry={ry} stroke="#050505" strokeWidth="1.5" opacity="0.95" fill="none" />
            );
          })}

          {/* Radial lines tracing the funnel descent into the pit */}
          {Array.from({length: 16}).map((_, i) => {
            const angle = (i * Math.PI) / 8;
            let d = "";
            for (let j = 0; j <= 9; j++) {
              const t = (j / 9) * 0.9;
              const ease = t * t * t;
              const rx = 580 * (1 - t);
              const ry = 190 * (1 - t);
              const cy = 250 + 200 * ease;
              
              const x = 600 + rx * Math.cos(angle);
              const y = cy + ry * Math.sin(angle);
              
              if (j === 0) d += `M ${x} ${y} `;
              else d += `L ${x} ${y} `;
            }
            return (
              <path 
                key={`radial-${i}`} 
                d={d}
                stroke="#050505" 
                strokeWidth="1.5" 
                opacity="0.95"
                fill="none"
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
