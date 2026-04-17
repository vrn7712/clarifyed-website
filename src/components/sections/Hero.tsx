import React from 'react';
import { motion } from 'motion/react';
import WhiteboardCanvas from './WhiteboardCanvas';
import RandomUnderline from './RandomUnderline';

export default function Hero() {
  return (
    <section className="relative pb-40 px-6 text-center max-w-7xl mx-auto overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#e8705b]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      {/* Main Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#a3a3a3] text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-[#e8705b] animate-pulse"></span>
          Whiteboard-Native AI Tutoring
        </motion.div>
        
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="text-5xl sm:text-7xl md:text-8xl font-medium tracking-tighter leading-[1.02] mb-8 text-[#f4f4f0]"
        >
          Learn on a{' '}
          <RandomUnderline strokeWidth={14}>
            <span className="pr-2">whiteboard</span>
          </RandomUnderline>
          .<br />
          <span className="text-[#a3a3a3]">Not in a chat.</span>
        </motion.h1>

        <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-lg md:text-xl text-[#a3a3a3] max-w-xl mx-auto mb-12 leading-relaxed font-light">
          The AI writes the lesson on the board, hands you the pen, and corrects you mid-stroke when you go wrong.
        </motion.p>
        
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-lg bg-[#e8705b] text-white font-medium hover:bg-[#d6604d] transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_#e8705b]"
          >
            Try Clarifyed
          </a>
          <a 
            href="#platform"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-lg bg-white/5 text-white font-medium hover:bg-white/10 border border-white/10 transition-all"
          >
            See How It Works
          </a>
        </motion.div>
      </motion.div>

      {/* Improved Whiteboard Graphic */}
      <WhiteboardCanvas />
    </section>
  );
}
