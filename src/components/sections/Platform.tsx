import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';

export default function Platform() {
  const [activeCircle, setActiveCircle] = useState<string | null>(null);

  const circleInfo: Record<string, string> = {
    whiteboard: "The AI teaches by writing notes, drawing diagrams, and embedding interactive widgets on a multi-page digital canvas. Students learn the way humans naturally do — visually, step by step, stroke by stroke.",
    knowledge: "Every student has a persistent knowledge graph that tracks everything they've ever learned — every topic, every formula, mastery level, and misconceptions. The AI remembers so students never start over.",
    collaboration: "Students invite friends to the same whiteboard. Everyone writes and solves together while the AI guides peer teaching based on each student's complementary strengths."
  };

  const beyondInsightRef = useRef<HTMLElement>(null);
  const { scrollYProgress: beyondInsightScrollProgress } = useScroll({
    target: beyondInsightRef,
    offset: ["start end", "end start"]
  });
  
  const beyondInsightY1 = useTransform(beyondInsightScrollProgress, [0, 1], [50, -50]);
  const beyondInsightY2 = useTransform(beyondInsightScrollProgress, [0, 1], [-50, 50]);
  const dotsY1 = useTransform(beyondInsightScrollProgress, [0, 1], [-150, 150]);
  const dotsY2 = useTransform(beyondInsightScrollProgress, [0, 1], [150, -150]);
  const dotsY3 = useTransform(beyondInsightScrollProgress, [0, 1], [-50, 50]);

  return (
    <section id="platform" ref={beyondInsightRef} className="py-28 md:py-40 px-6 text-center relative overflow-hidden">
      {/* Parallax Dotted Backgrounds */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          className="absolute inset-[-50%] opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2px)', backgroundSize: '32px 32px', y: dotsY1 }}
        />
        <motion.div
          className="absolute inset-[-50%] opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)', backgroundSize: '48px 48px', y: dotsY2 }}
        />
        <motion.div
          className="absolute inset-[-50%] opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #e8705b 1px, transparent 1px)', backgroundSize: '64px 64px', y: dotsY3 }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#1a1a1a_70%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-6 mb-8">
          {/* Top Animated Element: AI Sine Wave */}
          <div className="flex gap-2 justify-center items-center h-12 opacity-80 mb-2">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-1.5 rounded-full ${i === 4 ? 'bg-[#e8705b] shadow-[0_0_12px_#e8705b]' : 'bg-white/60'}`}
                animate={{ height: ["8px", "32px", "8px"] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.abs(i - 4) * 0.15 // Creates a wave from the center
                }}
              />
            ))}
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.15] tracking-tight flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 my-4">
            <span>Beyond Chatbots</span>
            <span className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-[#e8705b] inline-block shadow-[0_0_20px_#e8705b] shrink-0"></span>
            <span>Into Real Learning</span>
          </h2>

          {/* Bottom Animated Element: Knowledge Beam */}
          <div className="relative w-64 h-px mx-auto mt-6 bg-white/10 overflow-hidden">
            <motion.div
              className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-[#e8705b] to-transparent shadow-[0_0_10px_#e8705b]"
              animate={{ left: ["-33%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>

        <p className="text-lg md:text-xl text-[#a3a3a3] max-w-2xl mx-auto mb-16 leading-relaxed">
          Imagine the best teacher you ever had, standing at a whiteboard, teaching you one-on-one. Now put that on a screen. That's Clarifyed.
        </p>

        <div className="hidden md:flex justify-center items-center mb-12 relative h-64">
          <motion.button
            onClick={() => setActiveCircle(activeCircle === 'whiteboard' ? null : 'whiteboard')}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: -128 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`absolute w-64 h-64 rounded-full border flex items-center justify-center transition-all duration-500 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#e8705b] focus-visible:outline-offset-2 overflow-hidden ${activeCircle === 'whiteboard' ? 'border-[#e8705b] bg-[#1a1a1a]/90 backdrop-blur-3xl shadow-2xl z-30 scale-110' : 'border-[#e8705b]/30 bg-[#1a1a1a]/20 backdrop-blur-md hover:border-[#e8705b] hover:bg-[#1a1a1a]/40 z-10'}`}
          >
            <span className={`text-xl font-medium transition-colors ${activeCircle === 'whiteboard' ? 'text-[#e8705b]' : 'text-[#a3a3a3]'}`}>Whiteboard</span>
          </motion.button>
          
          <motion.button
            onClick={() => setActiveCircle(activeCircle === 'knowledge' ? null : 'knowledge')}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`absolute w-64 h-64 rounded-full border flex items-center justify-center transition-all duration-500 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#e8705b] focus-visible:outline-offset-2 overflow-hidden ${activeCircle === 'knowledge' ? 'border-[#e8705b] bg-[#1a1a1a]/90 backdrop-blur-3xl shadow-2xl z-30 scale-110' : 'border-[#e8705b]/30 bg-[#1a1a1a]/20 backdrop-blur-md hover:border-[#e8705b] hover:bg-[#1a1a1a]/40 z-10'}`}
          >
            <span className={`text-xl font-medium transition-colors ${activeCircle === 'knowledge' ? 'text-[#e8705b]' : 'text-[#a3a3a3]'}`}>Knowledge Graph</span>
          </motion.button>
          
          <motion.button
            onClick={() => setActiveCircle(activeCircle === 'collaboration' ? null : 'collaboration')}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 128 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`absolute w-64 h-64 rounded-full border flex items-center justify-center transition-all duration-500 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#e8705b] focus-visible:outline-offset-2 overflow-hidden ${activeCircle === 'collaboration' ? 'border-[#e8705b] bg-[#1a1a1a]/90 backdrop-blur-3xl shadow-2xl z-30 scale-110' : 'border-[#e8705b]/30 bg-[#1a1a1a]/20 backdrop-blur-md hover:border-[#e8705b] hover:bg-[#1a1a1a]/40 z-10'}`}
          >
            <span className={`text-xl font-medium transition-colors ${activeCircle === 'collaboration' ? 'text-[#e8705b]' : 'text-[#a3a3a3]'}`}>Collaboration</span>
          </motion.button>
        </div>

        <div className="flex md:hidden flex-col gap-4 mb-12 px-2">
          {(['whiteboard', 'knowledge', 'collaboration'] as const).map((key) => (
            <motion.button
              key={key}
              onClick={() => setActiveCircle(activeCircle === key ? null : key)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`w-full p-6 rounded-2xl border text-left transition-all duration-300 ${activeCircle === key ? 'border-[#e8705b] bg-[#e8705b]/10' : 'border-[#e8705b]/30 bg-white/5'}`}
            >
              <span className="text-[#e8705b] text-lg font-medium">{key === 'knowledge' ? 'Knowledge Graph' : key.charAt(0).toUpperCase() + key.slice(1)}</span>
              <AnimatePresence>
                {activeCircle === key && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-white/80 text-sm mt-3 leading-relaxed"
                  >
                    {circleInfo[key]}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        <div className="hidden md:flex h-32 mb-12 items-center justify-center">
          <AnimatePresence mode="wait">
            {activeCircle ? (
              <motion.p
                key={activeCircle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xl text-white max-w-2xl mx-auto leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10"
              >
                {circleInfo[activeCircle]}
              </motion.p>
            ) : (
              <motion.p
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xl text-[#a3a3a3] max-w-3xl mx-auto leading-relaxed"
              >
                Click a circle to explore how Clarifyed's three pillars work together to create a learning experience no chatbot can match.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
