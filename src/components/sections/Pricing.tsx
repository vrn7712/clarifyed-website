import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, Zap, Video, Infinity } from 'lucide-react';
import RandomUnderline from './RandomUnderline';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-32 px-6 relative overflow-hidden bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#a3a3a3] text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#e8705b]" />
            No Paywalls. Just Pure Learning.
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-medium tracking-tight mb-6"
          >
            Pricing that <span className="text-[#a3a3a3]"><RandomUnderline strokeWidth={10}>adapts.</RandomUnderline></span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#a3a3a3] leading-relaxed"
          >
            Start learning today on the full Socratic whiteboard. Upgrade when you need richer modalities faster.
          </motion.p>

          {/* Toggle */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 inline-flex items-center gap-4 bg-white/5 p-2 rounded-full border border-white/10"
          >
            <button 
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                !isAnnual ? 'bg-white text-black shadow-md' : 'text-[#a3a3a3] hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                isAnnual ? 'bg-white text-black shadow-md' : 'text-[#a3a3a3] hover:text-white'
              }`}
            >
              Annually <span className="text-[10px] bg-[#e8705b] text-white px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
          
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 h-full relative group transition-colors hover:border-white/20"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-medium mb-2 text-white">Starter Sandbox</h3>
              <p className="text-[#a3a3a3] h-12">The full Socratic teaching experience. Forever free.</p>
              <div className="mt-8 flex items-end gap-2">
                <span className="text-6xl font-medium tracking-tight text-white">$0</span>
                <span className="text-[#a3a3a3] mb-2 font-medium">/ forever</span>
              </div>
            </div>

            <button className="w-full py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors mb-10">
              Start Learning
            </button>

            <ul className="space-y-5">
              {[
                "Full interactive Whiteboard canvas",
                "Persistent Knowledge Graph tracking",
                "Real-time stroke correction",
                "Basic widget embedding (graphs, nodes)",
                "Standard AI modality pacing"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-4 text-[#e0e0e0]">
                  <Check className="w-5 h-5 text-[#8ebf9e] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Premium Tier */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-b from-[#1a1a1a] to-[#221815] border border-[#e8705b]/40 rounded-[2.5rem] p-10 h-[105%] relative group shadow-xl"
          >
            {/* Minimal inner border effect instead of glow */}
            <div className="absolute inset-0 rounded-[2.5rem] border border-[#e8705b]/10 pointer-events-none" />
            
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#e8705b] text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_0_20px_rgba(232,112,91,0.5)] z-20">
              <Zap className="w-3.5 h-3.5 fill-current" />
              Most Popular
            </div>

            <div className="mb-8 relative z-10">
              <h3 className="text-2xl font-medium mb-2 text-[#e8705b]">Clarifyed Pro</h3>
              <p className="text-[#a3a3a3] h-12">Unlocks the richest learning modalities, instantly.</p>
              <div className="mt-8 flex items-end gap-2">
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={isAnnual ? 'annual' : 'monthly'}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-6xl font-medium tracking-tight text-white"
                  >
                    ${isAnnual ? '15' : '19'}
                  </motion.span>
                </AnimatePresence>
                <span className="text-[#a3a3a3] mb-2 font-medium">/ month{isAnnual && ', billed yearly'}</span>
              </div>
            </div>

            <button className="relative w-full py-4 rounded-full bg-[#e8705b] text-white font-medium transition-all hover:bg-[#d6604d] hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#e8705b]/20 mb-10 overflow-hidden z-10 group">
              <span className="relative z-10">Upgrade to Pro</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>

            <div className="relative z-10">
              <p className="text-sm font-medium text-white mb-4">Everything in Starter, plus:</p>
              <ul className="space-y-5">
                {[
                  { text: "Unlimited Instant Video Generation", icon: <Video className="w-5 h-5 text-[#8ebf9e] shrink-0 mt-0.5" /> },
                  { text: "Priority AI inference limits", icon: <Zap className="w-5 h-5 text-[#8ebf9e] shrink-0 mt-0.5" /> },
                  { text: "Unlimited Collaboration Invites", icon: <Infinity className="w-5 h-5 text-[#8ebf9e] shrink-0 mt-0.5" /> },
                  { text: "High-def PDF outputs & study guides", icon: <Check className="w-5 h-5 text-[#8ebf9e] shrink-0 mt-0.5" /> },
                  { text: "Advanced 3D interactive widgets", icon: <Check className="w-5 h-5 text-[#8ebf9e] shrink-0 mt-0.5" /> }
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-4 text-white">
                    {feature.icon}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
