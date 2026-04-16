import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';

const layersData = [
  { 
    id: 1, 
    title: "Learn", 
    desc: "The AI writes on the digital whiteboard — notes, diagrams, and equations, stroke by stroke.", 
    cy: 420, 
    textY: 300 
  },
  { 
    id: 2, 
    title: "Adapt", 
    desc: "A persistent knowledge graph tracks everything you master, adjusting difficulty in real time.", 
    cy: 500, 
    textY: 450 
  },
  { 
    id: 3, 
    title: "Execute", 
    desc: "Take the pen and solve directly on the canvas. The AI observes and corrects you mid-step.", 
    cy: 580, 
    textY: 600 
  },
  { 
    id: 4, 
    title: "Collaborate", 
    desc: "Invite friends and solve together while the smart AI mediates the group effortlessly.", 
    cy: 660, 
    textY: 750 
  },
];

export default function ThinkDifferent() {
  const [tdStep, setTdStep] = useState(1);
  const thinkDifferentRef = useRef<HTMLElement>(null);
  
  // Track scroll progress inside this enormous 400vh component
  const { scrollYProgress: tdProgress } = useScroll({
    target: thinkDifferentRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(tdProgress, "change", (latest) => {
    if (latest < 0.25) setTdStep(1);
    else if (latest < 0.5) setTdStep(2);
    else if (latest < 0.75) setTdStep(3);
    else setTdStep(4);
  });

  return (
    <section ref={thinkDifferentRef} className="h-[400vh] relative bg-[#1a1a1a]">
      {/* Sticky Container rendering perfectly at all scroll heights */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center p-4">
        
        {/* SVG acts as absolute structural layout */}
        <svg 
          viewBox="0 0 1000 1000" 
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full max-w-7xl mx-auto"
        >
          <defs>
            {/* The Vibrant Blue/Cyan gradient requested from the reference */}
            <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" /> {/* bright blue */}
              <stop offset="100%" stopColor="#06b6d4" /> {/* bright cyan */}
            </linearGradient>
            <linearGradient id="activeSideLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1d4ed8" /> 
              <stop offset="100%" stopColor="#0891b2" /> 
            </linearGradient>
            <linearGradient id="activeSideRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" /> 
              <stop offset="100%" stopColor="#164e63" /> 
            </linearGradient>
          </defs>

          {/* Title rendered logically inside the SVG canvas so it coordinates perfectly aligned scale and offsets naturally against elements independently of browser height. */}
          <foreignObject x="0" y="80" width="1000" height="200">
            <div className="flex flex-col items-center justify-center w-full h-full text-center">
              <h2 className="text-[72px] leading-tight text-white font-medium tracking-tight">Think Different.</h2>
              <h2 className="text-[56px] leading-tight text-neutral-500 font-medium mt-2 tracking-tight">We Already Built It.</h2>
            </div>
          </foreignObject>

          {/* Render Connections & Text Labels FIRST so they remain in background */}
          {layersData.map((layer) => {
            const isActive = tdStep === layer.id;
            
            return (
              <g key={`route-${layer.id}`}>
                {/* Organic routing line from Isometric cube to the precise Text box height */}
                <motion.path
                  d={`M 410,${layer.cy} C 480,${layer.cy} 480,${layer.textY + 60} 550,${layer.textY + 60}`}
                  fill="none"
                  stroke={isActive ? "#3b82f6" : "rgba(255,255,255,0.1)"}
                  strokeWidth={isActive ? 3 : 1}
                  animate={{ 
                    stroke: isActive ? "#3b82f6" : "rgba(255,255,255,0.1)", 
                    strokeWidth: isActive ? 3 : 1 
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                
                {/* Text Description Block */}
                <foreignObject x="550" y={layer.textY} width="450" height="120">
                  <motion.div 
                    className="h-full flex flex-col justify-center pl-6 border-l-2"
                    initial={false}
                    animate={{ 
                      borderColor: isActive ? "#3b82f6" : "rgba(255,255,255,0.05)",
                      opacity: isActive ? 1 : 0.3 
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-2">{layer.title}</h3>
                    <p className="text-neutral-400 text-lg leading-relaxed">{layer.desc}</p>
                  </motion.div>
                </foreignObject>
              </g>
            );
          })}

          {/* Render Isometric Stack in REVERSE order so Layer 1 (Top) overlaps Layer 2 overlapping Layer 3... */}
          {[...layersData].reverse().map((layer) => {
            const isActive = tdStep === layer.id;
            
            // Core isometric math parameters
            const W = 160;
            const H = 80;
            const TH = 20;
            
            // Exact plot points
            const pTop = `250,${layer.cy - H}`;
            const pRightInner = `410,${layer.cy}`;
            const pBottomInner = `250,${layer.cy + H}`;
            const pLeftInner = `90,${layer.cy}`;
            
            const pRightOuter = `410,${layer.cy + TH}`;
            const pBottomOuter = `250,${layer.cy + H + TH}`;
            const pLeftOuter = `90,${layer.cy + TH}`;
            
            const topFace = `${pTop} ${pRightInner} ${pBottomInner} ${pLeftInner}`;
            const rightFace = `${pBottomInner} ${pRightInner} ${pRightOuter} ${pBottomOuter}`;
            const leftFace = `${pLeftInner} ${pBottomInner} ${pBottomOuter} ${pLeftOuter}`;

            return (
              <g key={`isometric-${layer.id}`} className="transition-transform duration-700 ease-out">
                {/* TRANSLUCENT WIREFRAME BASE (Always Visible) */}
                <polygon points={topFace} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                <polygon points={rightFace} fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                <polygon points={leftFace} fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

                {/* SOLID GRADIENT OVERLAY (Crossfades on becoming Active) */}
                <motion.polygon 
                  points={topFace} fill="url(#activeGradient)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"
                  animate={{ opacity: isActive ? 1 : 0 }} transition={{ duration: 0.5 }}
                />
                <motion.polygon 
                  points={rightFace} fill="url(#activeSideRight)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"
                  animate={{ opacity: isActive ? 1 : 0 }} transition={{ duration: 0.5 }}
                />
                <motion.polygon 
                  points={leftFace} fill="url(#activeSideLeft)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"
                  animate={{ opacity: isActive ? 1 : 0 }} transition={{ duration: 0.5 }}
                />
              </g>
            );
          })}
        </svg>

        {/* Global Dark Gradient Fade to hide hard bottom edges cleanly and shallow without obscuring lowest text blocks*/}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
