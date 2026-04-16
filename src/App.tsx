import React, { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import LogoCloud from './components/sections/LogoCloud';
import ClarifyedFeatures from './components/sections/ClarifyedFeatures';
import Platform from './components/sections/Platform';
import Roles from './components/sections/Roles';
import Architecture from './components/sections/Architecture';
import ThinkDifferent from './components/sections/ThinkDifferent';
import Assessment from './components/sections/Assessment';
import Testimonials from './components/sections/Testimonials';
import Team from './components/sections/Team';
import CaseStudy from './components/sections/CaseStudy';
import Integrations from './components/sections/Integrations';
import Pricing from './components/sections/Pricing';
import CTA from './components/sections/CTA';
import VideoDemos from './components/sections/VideoDemos';
import FAQ from './components/sections/FAQ';

export default function App() {
  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.origin === window.location.origin) {
        e.preventDefault();
        const element = document.querySelector(anchor.hash);
        if (element) {
          // Adjust offset for the fixed header
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#f4f4f0] font-sans selection:bg-[#e8705b] selection:text-white">
      <a href="#main-content" className="skip-to-content shadow-lg px-4 py-2 bg-[#e8705b] text-white rounded-full absolute -top-16 left-4 focus:top-4 transition-all z-50 focus:outline-none focus-visible:ring-4 ring-white/50">Skip to content</a>
      
      <Navbar />
      
      <main id="main-content" className="pt-32">
        <Hero />
        <LogoCloud />
        <ClarifyedFeatures />
        <Platform />
        <Roles />
        <Architecture />
        <ThinkDifferent />
        <Assessment />
        <Testimonials />
        <Team />
        <CaseStudy />
        <Integrations />
        <Pricing />
        <CTA />
        <VideoDemos />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
