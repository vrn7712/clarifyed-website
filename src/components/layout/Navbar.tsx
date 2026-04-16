import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

import RandomUnderline from '../sections/RandomUnderline';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ 
          y: 0,
          width: isScrolled ? "min(80%, 800px)" : "100%",
          top: isScrolled ? "24px" : "0px",
          borderRadius: isScrolled ? "9999px" : "0px",
          backgroundColor: isScrolled ? "rgba(26, 26, 26, 0.95)" : "rgba(26, 26, 26, 0.8)",
          borderColor: isScrolled ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-1/2 -translate-x-1/2 z-50 backdrop-blur-md border shadow-2xl overflow-visible"
      >
        <motion.div 
          animate={{ height: isScrolled ? "4rem" : "5rem" }}
          className="w-full px-6 flex items-center justify-between max-w-7xl mx-auto overflow-visible"
        >
          <div className="flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}clarifyed_temp_logo.png`} alt="Clarifyed Logo" className="h-8 w-auto" />
          </div>

          <nav className="hidden md:flex items-center bg-white/5 rounded-full p-1 border border-white/10">
            <a href="#roles" className="px-4 py-1.5 rounded-full text-sm text-white/80 hover:text-white transition-all"><RandomUnderline>Features</RandomUnderline></a>
            <a href="#resources" className="px-4 py-1.5 rounded-full text-sm text-white/80 hover:text-white transition-all"><RandomUnderline>Resources</RandomUnderline></a>
            <a href="#company" className="px-4 py-1.5 rounded-full text-sm text-white/80 hover:text-white transition-all"><RandomUnderline>Company</RandomUnderline></a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden md:block px-4 py-1.5 rounded-full text-sm border border-white/20 hover:bg-white/10 transition-all focus-visible:outline-2 focus-visible:outline-[#e8705b] focus-visible:outline-offset-2">Sign in</button>
            <a href="#contact" className="hidden md:block px-4 py-1.5 rounded-full text-sm bg-[#e8705b] text-white font-medium hover:bg-[#d6604d] transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Get Started</a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#e8705b] focus-visible:outline-offset-2"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#1a1a1a]/98 backdrop-blur-xl pt-28 px-8 md:hidden"
          >
            <nav className="flex flex-col gap-6 mb-10">
              <a href="#roles" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-white/90 hover:text-white transition-colors">Features</a>
              <a href="#resources" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-white/90 hover:text-white transition-colors">Resources</a>
              <a href="#company" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-white/90 hover:text-white transition-colors">Company</a>
            </nav>
            <div className="flex flex-col gap-3">
              <button className="w-full py-3 rounded-full text-lg border border-white/20 hover:bg-white/10 transition-all">Sign in</button>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 rounded-full text-lg bg-[#e8705b] text-white font-medium hover:bg-[#d6604d] transition-all text-center">Get Started</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
