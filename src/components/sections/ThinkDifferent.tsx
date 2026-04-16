import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';

export default function ThinkDifferent() {
  const [tdStep, setTdStep] = useState(1);
  const thinkDifferentRef = useRef<HTMLElement>(null);
  const { scrollYProgress: tdProgress } = useScroll({
    target: thinkDifferentRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(tdProgress, "change", (latest) => {
    if (latest < 0.33) setTdStep(1);
    else if (latest < 0.66) setTdStep(2);
    else setTdStep(3);
  });

  return (
    <section ref={thinkDifferentRef} className="h-[300vh] relative bg-[#1a1a1a]">
      <div className="sticky top-0 h-screen overflow-hidden relative" style={{ perspective: '2000px' }}>
        {/* Typographic Context */}
        <div className="absolute top-[5%] md:top-[7%] left-0 right-0 text-center z-20 px-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium mb-1 md:mb-3 text-white">Think Different.</h2>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium text-[#a3a3a3]">We Already Built It.</h2>
        </div>

        <div className="absolute top-[22%] md:top-[25%] left-0 right-0 z-20 px-6">
          <div className="max-w-xl mx-auto text-center relative h-32 sm:h-28">
            <AnimatePresence mode="wait">
              {tdStep === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="absolute inset-0 flex flex-col items-center text-center">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-2 text-white">Learn</h3>
                  <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed">The AI writes on the whiteboard — notes, diagrams, equations, stroke by stroke. Every concept taught visually.</p>
                </motion.div>
              )}
              {tdStep === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="absolute inset-0 flex flex-col items-center text-center">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-2 text-white">Adapt</h3>
                  <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed">The AI checks your knowledge graph before every lesson. It fills gaps and adjusts difficulty in real time.</p>
                </motion.div>
              )}
              {tdStep === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="absolute inset-0 flex flex-col items-center text-center">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-2 text-white">Execute</h3>
                  <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed">You pick up the pen and solve on the same canvas. The AI corrects you mid-step in real time.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Isometric SVG Illustration Stage */}
        <div 
          className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] flex items-center justify-center pointer-events-none"
        >
          <motion.div 
            initial={{ rotateX: 60, rotateZ: -45, scale: 0.8, opacity: 0 }}
            animate={{ rotateX: 60, rotateZ: -45, scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative w-full max-w-[600px] aspect-[3/2]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* The Main Digital Whiteboard Plane */}
            <motion.div 
              className="absolute inset-0 bg-[#222222] rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10"
            >
              {/* Subtle Document Grid */}
              <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.05]">
                <pattern id="isometric-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="1"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#isometric-grid)" />
              </svg>

              {/* Dynamic SVGs driven by tdStep */}
              <svg width="100%" height="100%" className="absolute inset-0">
                {/* Step 1: Learning Math Geometry */}
                <AnimatePresence>
                  {(tdStep >= 1) && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                      {/* Graph Axes */}
                      <motion.path 
                        d="M 100,300 L 500,300 M 100,300 L 100,80" 
                        stroke="#444" strokeWidth="2" strokeLinecap="round" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                      {/* Smooth Sine/Cosine Math Wave */}
                      <motion.path 
                        d="M 100,200 C 150,50 250,50 300,200 C 350,350 450,350 500,200" 
                        stroke="#f4f4f0" strokeWidth="3" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                      />
                      {/* Geometric Polygon plotted next to it */}
                      <motion.polygon 
                        points="350,120 450,120 400,60" 
                        stroke="#888" strokeWidth="2" fill="rgba(255,255,255,0.02)"
                        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                      />
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* Step 2: Adapt - Connecting the Knowledge Graph Overlay */}
                <AnimatePresence>
                  {(tdStep >= 2) && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {/* Mapping structural connection lines */}
                      <motion.path 
                        d="M 220,130 L 300,200 L 400,160 L 430,230 L 280,270 Z" 
                        stroke="rgba(232, 112, 91, 0.3)" strokeWidth="1.5" strokeDasharray="6,4" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }}
                      />
                      {/* Illuminated Knowledge Nodes mapping exactly to intersection points */}
                      {[
                        { cx: 220, cy: 130, delay: 0 },
                        { cx: 300, cy: 200, delay: 0.2 },
                        { cx: 400, cy: 160, delay: 0.4 },
                        { cx: 430, cy: 230, delay: 0.6 },
                        { cx: 280, cy: 270, delay: 0.8 },
                      ].map((node, i) => (
                        <motion.circle 
                          key={i}
                          cx={node.cx} cy={node.cy} r="6" 
                          fill="#e8705b"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: node.delay, type: "spring", stiffness: 200 }}
                        />
                      ))}
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* Step 3: Execute - Student draws organically, AI corrects structurally */}
                <AnimatePresence>
                  {tdStep === 3 && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {/* Jittery "Human" Stroke Attempt */}
                      <motion.path 
                        d="M 120,280 L 160,210 L 210,290 L 270,180" 
                        stroke="#666" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
                      />
                      {/* Beautiful "AI" Real-Time Correction overlaying the jitter */}
                      <motion.path 
                        d="M 140,240 C 190,170 230,290 280,220" 
                        stroke="#e8705b" strokeWidth="5" strokeLinecap="round" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                      />
                      {/* Validation "Tick" from AI */}
                      <motion.path
                        d="M 285,225 L 295,235 L 315,205"
                        stroke="#e8705b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.8, duration: 0.5, ease: "easeOut" }}
                      />
                    </motion.g>
                  )}
                </AnimatePresence>
              </svg>
            </motion.div>

            {/* Z-Axis Floating UI Elements for True Isometric Depth Effect */}
            <AnimatePresence>
              {tdStep >= 2 && (
                <motion.div 
                  initial={{ z: 0, opacity: 0 }}
                  animate={{ z: 50, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <svg width="100%" height="100%" className="absolute inset-0 drop-shadow-2xl">
                    <rect x="350" y="80" width="130" height="40" rx="6" fill="#1a1a1a" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <circle cx="370" cy="100" r="4" fill="#10b981" />
                    <text x="385" y="104" fill="#f4f4f0" fontSize="12" fontWeight="500">Mastered: Calculus</text>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {tdStep === 3 && (
                <motion.div 
                  initial={{ z: 0, opacity: 0 }}
                  animate={{ z: 90, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <svg width="100%" height="100%" className="absolute inset-0 drop-shadow-2xl">
                    <rect x="150" y="120" width="160" height="34" rx="6" fill="rgba(232, 112, 91, 0.95)" stroke="#fff" strokeWidth="1" />
                    <text x="230" y="142" fill="#fff" fontSize="12" textAnchor="middle" fontWeight="600">Tangent misaligned</text>
                    {/* Tiny connector line dropping back down to board */}
                    <path d="M 230,154 L 230,200" stroke="#e8705b" strokeWidth="1" strokeDasharray="3,3" opacity="0.6"/>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>

        {/* Global Dark Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#1a1a1a] from-50% via-[#1a1a1a]/80 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
