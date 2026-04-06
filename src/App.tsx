import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, ArrowUpRight, Linkedin, Twitter, Facebook, Instagram, Youtube, User, BookOpen, Building2 } from 'lucide-react';

const ArticleCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div 
        className="absolute top-0 left-0 h-2 bg-[#e8705b] z-10 w-full origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      {children}
    </div>
  );
};

export default function App() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

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

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  const [activeCircle, setActiveCircle] = useState<string | null>(null);

  const circleInfo: Record<string, string> = {
    whiteboard: "The AI teaches by writing notes, drawing diagrams, and embedding interactive widgets on a multi-page digital canvas. Students learn the way humans naturally do — visually, step by step, stroke by stroke.",
    knowledge: "Every student has a persistent knowledge graph that tracks everything they've ever learned — every topic, every formula, mastery level, and misconceptions. The AI remembers so students never start over.",
    collaboration: "Students invite friends to the same whiteboard. Everyone writes and solves together while the AI guides peer teaching based on each student's complementary strengths."
  };

  const ctaRef = useRef<HTMLElement>(null);
  const { scrollYProgress: ctaScrollProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"]
  });

  const ballX = useTransform(ctaScrollProgress, (p) => {
    const progress = Math.max(0, Math.min(1, (p - 0.2) / 0.6));
    const angle = progress * Math.PI * 8; // 4 rotations
    const radius = 550 * (1 - progress);
    return 600 + radius * Math.cos(angle);
  });

  const ballY = useTransform(ctaScrollProgress, (p) => {
    const progress = Math.max(0, Math.min(1, (p - 0.2) / 0.6));
    const angle = progress * Math.PI * 8;
    const radius = 180 * (1 - progress);
    // Add a slight dip to the Y position to match the curved lines
    const dip = 60 * Math.sin(progress * Math.PI);
    return 250 + radius * Math.sin(angle) + dip * (1 - progress);
  });

  const ballRadius = useTransform(ctaScrollProgress, (p) => {
    const progress = Math.max(0, Math.min(1, (p - 0.2) / 0.6));
    return 15 * (1 - progress) + 2;
  });

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

  const architectureRef = useRef<HTMLElement>(null);
  const { scrollYProgress: architectureScrollProgress } = useScroll({
    target: architectureRef,
    offset: ["start end", "end start"]
  });
  const architectureY1 = useTransform(architectureScrollProgress, [0, 1], [80, -80]);
  const architectureY2 = useTransform(architectureScrollProgress, [0, 1], [40, -40]);

  const [tdStep, setTdStep] = useState(1);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "It feels like having the best tutor in the world sitting right next to me. The AI writes on the whiteboard, draws diagrams, and when I get stuck, it corrects me mid-step. Nothing else comes close.",
      name: "Priya Sharma",
      title: "12th Grade Student, Delhi",
      image: "https://i.pravatar.cc/150?img=47"
    },
    {
      quote: "The knowledge graph is a game-changer. I can see exactly where each student's gaps are, what misconceptions they hold, and what they mastered weeks ago. It's like having X-ray vision into learning.",
      name: "Dr. James Whitfield",
      title: "Physics Teacher, Greenwood Academy",
      image: "https://i.pravatar.cc/150?img=11"
    },
    {
      quote: "My daughter went from dreading math to asking for extra sessions. The whiteboard approach feels natural to her — she picks up the pen and solves alongside the AI. Her confidence has completely transformed.",
      name: "Meera Kapoor",
      title: "Parent of a 10th Grader",
      image: "https://i.pravatar.cc/150?img=32"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const thinkDifferentRef = useRef<HTMLElement>(null);
  const { scrollYProgress: tdProgress } = useScroll({
    target: thinkDifferentRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(tdProgress, "change", (latest) => {
    if (latest < 0.3) setTdStep(1);
    else if (latest < 0.7) setTdStep(2);
    else setTdStep(3);
  });

  const tdTimings = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1];
  const pointerYValues = [0, 40, 40, 0, 0, 40, 40, 0, 0];
  const wheelRotValues = [0, 0, -120, -120, -120, -120, -240, -240, -240];

  const pointerY = useTransform(tdProgress, tdTimings, pointerYValues);
  const wheelRotation = useTransform(tdProgress, tdTimings, wheelRotValues);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#f4f4f0] font-sans selection:bg-[#e8705b] selection:text-white">
      {/* Header */}
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
        className="fixed left-1/2 -translate-x-1/2 z-50 backdrop-blur-md border shadow-2xl overflow-hidden"
      >
        <motion.div 
          animate={{ height: isScrolled ? "4rem" : "5rem" }}
          className="w-full px-6 flex items-center justify-between max-w-7xl mx-auto"
        >
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="6" width="28" height="20" rx="3" stroke="#f4f4f0" strokeWidth="3" fill="none"/>
              <path d="M12 16 L18 12 L24 16 L30 10" stroke="#e8705b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <line x1="14" y1="30" x2="26" y2="30" stroke="#f4f4f0" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <span className="text-xl font-medium tracking-tight">Clarifyed</span>
          </div>

          <nav className="hidden md:flex items-center bg-white/5 rounded-full p-1 border border-white/10">
            <a href="#roles" className="px-4 py-1.5 rounded-full text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all">Features</a>
            <a href="#resources" className="px-4 py-1.5 rounded-full text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all">Resources</a>
            <a href="#company" className="px-4 py-1.5 rounded-full text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all">Company</a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="px-4 py-1.5 rounded-full text-sm border border-white/20 hover:bg-white/10 transition-all">Sign in</button>
            <a href="#contact" className="px-4 py-1.5 rounded-full text-sm bg-[#e8705b] text-white font-medium hover:bg-[#d6604d] transition-all">Get Started</a>
          </div>
        </motion.div>
      </motion.header>

      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative pt-32 pb-40 px-6 text-center max-w-7xl mx-auto overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#e8705b]/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

          {/* Floating Elements */}
          <motion.div 
            animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:flex absolute top-32 left-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 items-center gap-4 shadow-2xl"
          >
            <div className="w-10 h-10 rounded-full bg-[#8ebf9e]/20 flex items-center justify-center text-[#8ebf9e]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-white">Knowledge Graph</p>
              <p className="text-xs text-[#a3a3a3]">1,247 Concepts Mapped</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [10, -10, 10], rotate: [2, -2, 2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="hidden lg:flex absolute top-52 right-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 items-center gap-4 shadow-2xl"
          >
            <div className="w-10 h-10 rounded-full bg-[#e8705b]/20 flex items-center justify-center text-[#e8705b]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-white">Live Session</p>
              <p className="text-xs text-[#a3a3a3]">AI Teaching Now</p>
            </div>
          </motion.div>

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
              className="text-6xl md:text-8xl font-medium tracking-tighter leading-[1.05] mb-8"
            >
              Learn Like Never Before<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#a3a3a3]">With a Real Tutor</span>
            </motion.h1>
            
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-xl md:text-2xl text-[#a3a3a3] max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              No chatbot. No chat interface. An AI tutor that teaches on a whiteboard — writing, drawing, and guiding you step by step.
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

          {/* Hero Graphic - Abstract Data Visualization */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="mt-24 relative max-w-5xl mx-auto h-[300px] md:h-[400px] rounded-t-[3rem] border-t border-x border-white/10 bg-gradient-to-b from-white/5 to-transparent overflow-hidden flex items-end justify-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,112,91,0.15)_0%,transparent_70%)]" />
            
            {/* Abstract Bars */}
            <div className="flex items-end justify-center gap-2 md:gap-4 w-full px-8 pb-0 h-full opacity-60">
              {Array.from({ length: 15 }).map((_, i) => {
                const height = 20 + Math.random() * 60;
                return (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1.5, delay: 0.8 + i * 0.05, ease: "easeOut" }}
                    className="w-full max-w-[40px] bg-gradient-to-t from-transparent via-white/20 to-white/40 rounded-t-lg relative"
                  >
                    <motion.div 
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                      className="absolute top-0 left-0 right-0 h-1 bg-[#e8705b] rounded-t-lg shadow-[0_0_10px_#e8705b]"
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Logo Cloud */}
        <section className="border-t border-white/10 py-12 relative z-10 bg-[#1a1a1a] overflow-hidden">
          <div className="flex whitespace-nowrap relative">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-16 px-8 grayscale opacity-50"
            >
              {/* First Set */}
              <span className="text-2xl font-bold tracking-tighter">TechCrunch</span>
              <span className="text-xl font-semibold flex items-center gap-1"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg> EdSurge</span>
              <span className="text-2xl font-light tracking-widest">PRODUCT HUNT</span>
              <span className="text-2xl font-serif italic">Forbes Education</span>
              <span className="text-xl font-medium flex items-center gap-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg> MIT Tech Review</span>
              <div className="flex gap-2">
                <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-xs">YC</span>
                <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-xs">TC</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter">TechCrunch</span>
              <span className="text-2xl font-light tracking-widest">PRODUCT HUNT</span>

              {/* Duplicate Set for Seamless Loop */}
              <span className="text-2xl font-bold tracking-tighter">TechCrunch</span>
              <span className="text-xl font-semibold flex items-center gap-1"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg> EdSurge</span>
              <span className="text-2xl font-light tracking-widest">PRODUCT HUNT</span>
              <span className="text-2xl font-serif italic">Forbes Education</span>
              <span className="text-xl font-medium flex items-center gap-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg> MIT Tech Review</span>
              <div className="flex gap-2">
                <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-xs">YC</span>
                <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-xs">TC</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter">TechCrunch</span>
              <span className="text-2xl font-light tracking-widest">PRODUCT HUNT</span>
            </motion.div>
          </div>
          {/* Gradient Masks for smooth fade on edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10"></div>
        </section>

        {/* Beyond Insight */}
        <section ref={beyondInsightRef} className="py-40 px-6 text-center relative overflow-hidden">
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
            {/* Gradient mask to fade out edges */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#1a1a1a_70%)]" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="flex flex-col items-center justify-center gap-8 mb-24">
              <motion.div style={{ y: beyondInsightY1 }} className="grid grid-cols-11 gap-3 opacity-30">
                 {Array.from({length: 33}).map((_, i) => (
                   <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 16 ? 'bg-[#e8705b] opacity-100 scale-150 shadow-[0_0_10px_#e8705b]' : 'bg-white'}`}></div>
                 ))}
              </motion.div>
              
              <h2 className="text-5xl md:text-7xl font-medium flex items-center justify-center gap-6 flex-wrap">
                Beyond Chatbots. <span className="w-8 h-8 rounded-full bg-[#e8705b] inline-block shadow-[0_0_20px_#e8705b]"></span> Into Real Learning.
              </h2>

              <motion.div style={{ y: beyondInsightY2 }} className="grid grid-cols-11 gap-3 opacity-30">
                 {Array.from({length: 33}).map((_, i) => (
                   <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>
                 ))}
              </motion.div>
            </div>

            <div className="flex justify-center items-center mb-12 relative h-64">
               <motion.button 
                 onClick={() => setActiveCircle(activeCircle === 'whiteboard' ? null : 'whiteboard')}
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: -128 }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 viewport={{ once: true }}
                 className={`absolute w-64 h-64 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${activeCircle === 'whiteboard' ? 'border-[#e8705b] bg-[#e8705b]/10 z-20 scale-105' : 'border-[#e8705b]/50 hover:border-[#e8705b] hover:bg-[#e8705b]/5 z-0'}`}
               >
                  <span className="text-[#e8705b] text-xl font-medium">Whiteboard</span>
               </motion.button>
               <motion.button 
                 onClick={() => setActiveCircle(activeCircle === 'knowledge' ? null : 'knowledge')}
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                 viewport={{ once: true }}
                 className={`absolute w-64 h-64 rounded-full border flex items-center justify-center backdrop-blur-sm transition-all duration-300 cursor-pointer ${activeCircle === 'knowledge' ? 'border-[#e8705b] bg-[#e8705b]/20 z-20 scale-105' : 'border-[#e8705b]/50 bg-[#1a1a1a]/40 hover:border-[#e8705b] hover:bg-[#1a1a1a]/60 z-10'}`}
               >
                  <span className="text-[#e8705b] text-xl font-medium">Knowledge Graph</span>
               </motion.button>
               <motion.button 
                 onClick={() => setActiveCircle(activeCircle === 'collaboration' ? null : 'collaboration')}
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 128 }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 viewport={{ once: true }}
                 className={`absolute w-64 h-64 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${activeCircle === 'collaboration' ? 'border-[#e8705b] bg-[#e8705b]/10 z-20 scale-105' : 'border-[#e8705b]/50 hover:border-[#e8705b] hover:bg-[#e8705b]/5 z-0'}`}
               >
                  <span className="text-[#e8705b] text-xl font-medium">Collaboration</span>
               </motion.button>
            </div>

            <div className="h-32 mb-12 flex items-center justify-center">
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
                    className="text-2xl text-[#a3a3a3] max-w-4xl mx-auto leading-relaxed"
                  >
                    Imagine the best teacher you ever had, standing at a whiteboard, teaching you one-on-one. Now put that on a screen. That's Clarifyed.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* For the people */}
        <section id="roles" className="py-32 px-6 bg-[#9ca3af]/10">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#a3a3a3] text-lg mb-4">Built for Every Learner</p>
            <h2 className="text-5xl md:text-7xl font-medium mb-6 max-w-3xl leading-tight">
              For the people shaping the future
            </h2>
            <p className="text-xl text-[#a3a3a3] max-w-2xl mb-16">
              The next era of education belongs to those who learn by doing, not by reading chatbot replies.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -8 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-[#6b8280] rounded-[2rem] p-10 relative overflow-hidden group hover:shadow-2xl hover:shadow-[#6b8280]/20 transition-shadow duration-300"
              >
                <h3 className="text-4xl font-medium mb-6 text-[#1a1a1a]">Students</h3>
                <p className="text-lg text-[#1a1a1a]/80 max-w-sm relative z-10">
                  Learn with a personal AI tutor that teaches on a whiteboard — writing notes, drawing diagrams, and correcting you in real time as you solve.
                </p>
                <motion.svg 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-0 right-0 w-64 h-64 translate-x-1/4 translate-y-1/4 opacity-20 group-hover:scale-110 transition-transform duration-700" viewBox="0 0 200 200" fill="none"
                >
                  {Array.from({length: 5}).map((_, i) => (
                    <circle key={i} cx="100" cy="100" r={40 + i * 15} stroke="white" strokeWidth="1" />
                  ))}
                </motion.svg>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -8 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-[#8ebf9e] rounded-[2rem] p-10 relative overflow-hidden group hover:shadow-2xl hover:shadow-[#8ebf9e]/20 transition-shadow duration-300"
              >
                <h3 className="text-4xl font-medium mb-6 text-[#1a1a1a]">Teachers</h3>
                <p className="text-lg text-[#1a1a1a]/80 max-w-sm relative z-10">
                  Track every student's understanding through persistent knowledge graphs. See exactly where gaps and misconceptions live, without manual assessment.
                </p>
                <motion.svg 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-10 right-10 w-32 h-32 opacity-20 group-hover:scale-110 transition-transform duration-700 origin-center" viewBox="0 0 100 100" fill="none"
                >
                  <circle cx="30" cy="50" r="25" stroke="white" strokeWidth="1" />
                  <circle cx="70" cy="50" r="25" stroke="white" strokeWidth="1" />
                </motion.svg>
              </motion.div>

              {/* Card 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -8 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-[#7a9eb1] rounded-[2rem] p-10 relative overflow-hidden group hover:shadow-2xl hover:shadow-[#7a9eb1]/20 transition-shadow duration-300"
              >
                <h3 className="text-4xl font-medium mb-6 text-[#1a1a1a]">Schools</h3>
                <p className="text-lg text-[#1a1a1a]/80 max-w-sm relative z-10">
                  Deploy scalable AI tutoring across classrooms. Every student gets personalized one-on-one teaching without increasing headcount or cost.
                </p>
                <motion.svg 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-0 right-10 w-48 h-48 translate-y-1/4 opacity-20 group-hover:scale-110 transition-transform duration-700" viewBox="0 0 100 100" fill="none"
                >
                  <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="1" />
                  <circle cx="50" cy="50" r="35" stroke="white" strokeWidth="1" />
                  <circle cx="50" cy="50" r="50" stroke="white" strokeWidth="1" />
                </motion.svg>
              </motion.div>

              {/* Card 4 */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -8 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-[#c697c9] rounded-[2rem] p-10 relative overflow-hidden group hover:shadow-2xl hover:shadow-[#c697c9]/20 transition-shadow duration-300"
              >
                <h3 className="text-4xl font-medium mb-6 text-[#1a1a1a]">Parents</h3>
                <p className="text-lg text-[#1a1a1a]/80 max-w-sm relative z-10">
                  See your child's real learning progress — not just grades. The knowledge graph shows exactly what they've mastered and where they need help.
                </p>
                <motion.svg 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-0 right-10 w-48 h-48 translate-y-1/4 opacity-20 group-hover:scale-110 transition-transform duration-700 origin-center" viewBox="0 0 100 100" fill="none"
                >
                  <path d="M 10 90 Q 50 10 90 90" stroke="white" strokeWidth="1" />
                  <path d="M 20 90 Q 50 30 80 90" stroke="white" strokeWidth="1" />
                  <path d="M 30 90 Q 50 50 70 90" stroke="white" strokeWidth="1" />
                  <ellipse cx="50" cy="90" rx="40" ry="10" stroke="white" strokeWidth="1" />
                </motion.svg>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section ref={architectureRef} className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#a3a3a3] text-lg mb-4">The Architecture of Intelligent Tutoring</p>
              <h2 className="text-5xl md:text-7xl font-medium mb-8 leading-tight">
                Built for What's<br/>Next.<br/>Already.
              </h2>
              <p className="text-xl text-[#a3a3a3] max-w-md">
                Whiteboard canvas, knowledge graphs, video generation, and interactive widgets — all working together.
              </p>
            </div>
            <div className="relative h-[500px]">
              {/* Stacked Cards */}
              <motion.div style={{ y: architectureY1 }} className="absolute top-0 right-0 w-4/5 h-80 z-0">
                <motion.div 
                  initial={{ rotate: 0, x: 0, y: 0 }}
                  whileInView={{ rotate: 6, x: 20, y: -10 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="w-full h-full bg-[#6b8280] rounded-[2rem] p-10 origin-bottom-right opacity-50"
                ></motion.div>
              </motion.div>
              <motion.div style={{ y: architectureY2 }} className="absolute top-10 right-4 w-4/5 h-80 z-10">
                <motion.div 
                  initial={{ rotate: 0, x: 0, y: 0 }}
                  whileInView={{ rotate: 3, x: 10, y: -5 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                  viewport={{ once: true }}
                  className="w-full h-full bg-[#7a9eb1] rounded-[2rem] p-10 origin-bottom-right opacity-80"
                ></motion.div>
              </motion.div>
              <motion.div 
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
                className="absolute top-20 right-8 w-4/5 bg-[#8ebf9e] rounded-[2rem] p-10 h-80 shadow-2xl z-20"
              >
                <div className="grid grid-cols-2 gap-2 w-12 mb-8">
                  <div className="w-4 h-4 rounded-full bg-[#e8705b]"></div>
                  <div className="w-4 h-4 rounded-full bg-[#e8705b]"></div>
                  <div className="w-4 h-4 rounded-full bg-black/20"></div>
                  <div className="w-4 h-4 rounded-full bg-black/20"></div>
                </div>
                <h3 className="text-4xl font-medium text-[#1a1a1a] leading-tight">
                  Smart that makes you smarter
                </h3>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Think Different */}
        <section ref={thinkDifferentRef} className="h-[300vh] relative bg-[#1a1a1a]">
          <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center pt-24">
            <h2 className="text-5xl md:text-6xl font-medium mb-4">Think Different.</h2>
            <h2 className="text-5xl md:text-6xl font-medium text-[#a3a3a3] mb-12">We Already Built It.</h2>

            {/* Text Container */}
            <div className="relative w-full max-w-2xl h-32 flex justify-center mb-8">
              <AnimatePresence mode="wait">
                {tdStep === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0 flex flex-col items-center text-center">
                    <h3 className="text-4xl font-medium mb-4">Learn</h3>
                    <p className="text-[#a3a3a3] text-lg">The AI writes on the whiteboard — notes in handwritten style, diagrams, equations, stroke by stroke. Every concept taught visually, the way great teachers have always done it.</p>
                  </motion.div>
                )}
                {tdStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0 flex flex-col items-center text-center">
                    <h3 className="text-4xl font-medium mb-4">Adapt</h3>
                    <p className="text-[#a3a3a3] text-lg">The AI checks your knowledge graph before every lesson. It knows your prerequisites, fills gaps automatically, and adjusts difficulty in real time based on how you're performing.</p>
                  </motion.div>
                )}
                {tdStep === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0 flex flex-col items-center text-center">
                    <h3 className="text-4xl font-medium mb-4">Execute</h3>
                    <p className="text-[#a3a3a3] text-lg">You pick up the pen and solve on the same canvas. The AI watches in real time and corrects you mid-step if you go wrong — no waiting until the end to find out.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pointer */}
            <motion.div style={{ y: pointerY }} className="absolute top-[420px] flex flex-col items-center z-20">
              <div className="w-10 h-10 rounded-full bg-[#e8705b] flex items-center justify-center shadow-[0_0_20px_rgba(232,112,91,0.5)]">
                <div className="w-3 h-3 rotate-45 bg-white"></div>
              </div>
              <div className="w-px h-12 bg-gradient-to-b from-[#e8705b] to-transparent"></div>
            </motion.div>

            {/* Wheel */}
            <div className="absolute top-[560px] left-1/2 -translate-x-1/2 w-[800px] h-[800px]">
              <motion.div 
                style={{ rotate: wheelRotation }} 
                className="w-full h-full rounded-full border border-white/10 relative"
              >
                {/* Orb 1 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#2a2a2a] border border-white/20 text-white text-2xl font-medium flex items-center justify-center shadow-xl">
                  <div style={{ transform: 'rotate(0deg)' }}>1</div>
                </div>
                {/* Orb 2 */}
                <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#2a2a2a] border border-white/20 text-white text-2xl font-medium flex items-center justify-center shadow-xl">
                  <div style={{ transform: 'rotate(120deg)' }}>2</div>
                </div>
                {/* Orb 3 */}
                <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#2a2a2a] border border-white/20 text-white text-2xl font-medium flex items-center justify-center shadow-xl">
                  <div style={{ transform: 'rotate(240deg)' }}>3</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Compliance & QA */}
        <section className="grid md:grid-cols-2 min-h-[600px]">
          <div className="bg-[#e8705b] relative overflow-hidden flex items-center justify-center p-12">
             {/* Complex wireframe graphic */}
             <motion.svg 
               animate={{ rotate: 360 }}
               transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
               className="w-full max-w-md opacity-80" viewBox="0 0 400 400" fill="none"
             >
               {Array.from({length: 6}).map((_, i) => (
                 <ellipse key={i} cx="200" cy="200" rx={80 + i * 20} ry="180" transform={`rotate(${i * 30} 200 200)`} stroke="white" strokeWidth="1" />
               ))}
               <circle cx="120" cy="150" r="8" fill="#3b82f6" />
               <circle cx="280" cy="200" r="8" fill="#10b981" />
               <circle cx="220" cy="280" r="8" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
             </motion.svg>
          </div>
          <div className="bg-[#9ca3af] p-16 md:p-24 flex flex-col justify-center">
            <h2 className="text-5xl md:text-6xl font-medium text-[#1a1a1a] mb-8 leading-tight">
              Assessment That<br/>Truly Understands
            </h2>
            <p className="text-xl text-[#1a1a1a]/80 max-w-md leading-relaxed">
              100% coverage of every concept. Real-time misconception detection. Spaced repetition woven naturally into every lesson — no flashcard decks needed.
            </p>
          </div>
        </section>

        {/* Trusted By */}
        <section className="py-32 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="flex flex-col justify-between">
            <h2 className="text-5xl md:text-7xl font-medium leading-tight text-[#f4f4f0]/90">
              Loved by the<br/>learners who<br/>lead the way
            </h2>
            <div className="flex gap-4 mt-16">
              <button 
                onClick={prevTestimonial}
                className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-white/50" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                <p className="text-2xl md:text-3xl leading-relaxed mb-10 text-[#f4f4f0]/90">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} className="w-14 h-14 rounded-full border-2 border-[#e8705b]" />
                  <div>
                    <h4 className="font-medium text-lg">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-[#a3a3a3] text-sm">{testimonials[currentTestimonial].title}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Faded next testimonial */}
            <div className="mt-16 opacity-10 overflow-hidden h-24">
              <p className="text-2xl leading-relaxed">
                "{testimonials[(currentTestimonial + 1) % testimonials.length].quote.substring(0, 120)}..."
              </p>
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="bg-[#7a9eb1] rounded-t-[3rem] p-6 md:p-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-7xl font-medium text-[#1a1a1a] leading-tight mb-6">
                  From struggling<br/>with calculus to<br/>mastering it
                </h2>
                <p className="text-xl text-[#1a1a1a]/70 mb-10 max-w-lg">
                  Greenwood Academy deployed Clarifyed across their math department — unlocking personalized tutoring for every student and transforming learning outcomes.
                </p>
                <div className="flex items-center gap-8 text-[#1a1a1a]">
                  <span className="text-3xl font-serif italic">Greenwood</span>
                  <span className="text-2xl font-medium flex items-center gap-2"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M6 12h12"/></svg> Academy</span>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="h-[400px] rounded-tl-[10rem] rounded-br-[10rem] overflow-hidden"
              >
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070&auto=format&fit=crop" alt="Students learning" className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 text-[#1a1a1a]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#8ebf9e] flex items-center justify-center">
                    <ArrowUpRight className="w-6 h-6 text-[#1a1a1a]" />
                  </div>
                  <span className="text-5xl font-medium">100%</span>
                </div>
                <p className="text-lg">Concept coverage</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 text-[#1a1a1a]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#8ebf9e] flex items-center justify-center">
                    <ArrowUpRight className="w-6 h-6 text-[#1a1a1a]" />
                  </div>
                  <span className="text-5xl font-medium">3x</span>
                </div>
                <p className="text-lg">Faster learning</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 text-[#1a1a1a]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#8ebf9e] flex items-center justify-center">
                    <ArrowUpRight className="w-6 h-6 text-[#1a1a1a]" />
                  </div>
                  <span className="text-5xl font-medium">94%</span>
                </div>
                <p className="text-lg">Retention rate</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-32 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#a3a3a3] text-lg mb-4">Plugs in. Levels up.</p>
            <h2 className="text-5xl md:text-7xl font-medium mb-8 leading-tight">
              Works with what<br/>you already<br/>use.
            </h2>
            <p className="text-xl text-[#a3a3a3] max-w-md">
              YouTube videos, PDF textbooks, Desmos graphing, Google Classroom — all integrated seamlessly into the whiteboard experience.
            </p>
          </div>
          <div className="relative h-[600px] overflow-hidden">
            {/* Grid of integration logos */}
            <div className="absolute right-0 top-0 grid grid-cols-2 gap-4 w-[120%] transform rotate-12 translate-x-10 -translate-y-20">
               {Array.from({length: 8}).map((_, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, scale: 0.5 }}
                   whileInView={{ opacity: 0.8, scale: 1 }}
                   transition={{ duration: 0.5, delay: i * 0.1 }}
                   viewport={{ once: true }}
                   whileHover={{ opacity: 1, scale: 1.05, rotate: -5 }}
                   className="bg-[#9ca3af] rounded-3xl aspect-square flex items-center justify-center p-8 transition-colors cursor-pointer"
                 >
                   {i === 0 && <span className="text-2xl font-bold text-black">YouTube</span>}
                   {i === 1 && <span className="text-2xl font-bold text-black">Desmos</span>}
                   {i === 2 && <span className="text-xl font-bold text-black">Google Classroom</span>}
                   {i === 3 && <span className="text-3xl font-bold text-black">PDF</span>}
                   {i === 4 && <span className="text-2xl font-bold text-black">Notion</span>}
                   {i === 5 && <span className="text-2xl font-bold text-black">Drive</span>}
                   {i === 6 && <span className="text-xl font-bold text-black">Khan Academy</span>}
                   {i === 7 && <span className="text-2xl font-bold text-black">Zoom</span>}
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section ref={ctaRef} id="contact" className="bg-[#e8705b] pt-32 pb-64 px-6 text-center relative overflow-hidden flex flex-col items-center justify-start min-h-[90vh]">
          <div className="relative z-10 mb-24">
            <h2 className="text-5xl md:text-7xl font-medium text-[#1a1a1a] mb-6">
              Built to fit today.<br/>Ready for tomorrow
            </h2>
            <p className="text-xl text-[#1a1a1a]/80 max-w-2xl mx-auto mb-10">
              The best teacher you ever had, available anytime. Start learning on the whiteboard today.
            </p>
            <button className="px-8 py-4 rounded-full text-lg bg-[#9ca3af] text-[#1a1a1a] font-medium hover:bg-[#8b929e] transition-all">
              Get Started
            </button>
          </div>
          
          {/* Gravity well graphic */}
          <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[1200px] h-[500px] opacity-40 pointer-events-none">
            <svg viewBox="0 0 1200 500" fill="none">
              {/* Concentric ellipses getting denser at the center */}
              <ellipse cx="600" cy="250" rx="550" ry="180" stroke="#1a1a1a" strokeWidth="1" />
              <ellipse cx="600" cy="250" rx="450" ry="145" stroke="#1a1a1a" strokeWidth="1" />
              <ellipse cx="600" cy="250" rx="350" ry="110" stroke="#1a1a1a" strokeWidth="1" />
              <ellipse cx="600" cy="250" rx="250" ry="75" stroke="#1a1a1a" strokeWidth="1" />
              <ellipse cx="600" cy="250" rx="150" ry="40" stroke="#1a1a1a" strokeWidth="1" />
              <ellipse cx="600" cy="250" rx="80" ry="18" stroke="#1a1a1a" strokeWidth="1" />
              <ellipse cx="600" cy="250" rx="30" ry="5" stroke="#1a1a1a" strokeWidth="1" />
              
              {/* Radial lines curving into the center */}
              {Array.from({length: 16}).map((_, i) => {
                const angle = (i * Math.PI) / 8;
                const startX = 600 + 550 * Math.cos(angle);
                const startY = 250 + 180 * Math.sin(angle);
                const endX = 600 + 30 * Math.cos(angle);
                const endY = 250 + 5 * Math.sin(angle);
                // Draw a curve that dips down slightly to create the gravity well effect
                const cpX = 600 + 200 * Math.cos(angle);
                const cpY = 250 + 100 * Math.sin(angle) + 60; // Add Y offset for the dip
                
                return (
                  <path 
                    key={i} 
                    d={`M ${startX} ${startY} Q ${cpX} ${cpY} ${endX} ${endY}`} 
                    stroke="#1a1a1a" 
                    strokeWidth="1" 
                  />
                );
              })}
              <motion.circle 
                cx={ballX} 
                cy={ballY} 
                r={ballRadius} 
                fill="white" 
                className="shadow-[0_0_30px_white]" 
              />
            </svg>
          </div>
        </section>

        {/* Featured Articles */}
        <section id="resources" className="py-32 px-6 bg-[#7a9eb1] text-[#1a1a1a] overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-5xl md:text-6xl font-medium">Featured Articles</h2>
              <button className="flex items-center gap-4 text-lg font-medium hover:opacity-80">
                All Articles 
                <div className="w-12 h-12 rounded-full bg-[#e8705b] flex items-center justify-center text-white">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
              {/* Article 1 */}
              <ArticleCard className="group min-w-[800px] bg-[#8ebf9e] rounded-[2rem] p-8 flex gap-8 snap-center">
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="px-3 py-1 rounded-full border border-[#1a1a1a]/20 text-sm mb-6 inline-block">EdTech</span>
                    <h3 className="text-4xl font-medium leading-tight mb-8">
                      Why Chatbot Tutors Are Failing Students — And What Comes Next
                    </h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1a1a1a]/20 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                      </div>
                      <span className="font-medium">Clarifyed</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm opacity-80">
                      <span>Mar 22, 2026</span>
                      <span className="flex items-center gap-1"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> 4 min read</span>
                    </div>
                  </div>
                </div>
                <div className="w-[400px] h-[300px] rounded-2xl overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=1974&auto=format&fit=crop" alt="Article" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                </div>
              </ArticleCard>

              {/* Article 2 */}
              <ArticleCard className="group min-w-[400px] bg-[#8ebf9e] rounded-[2rem] p-8 flex flex-col justify-between snap-center">
                <div>
                  <span className="px-3 py-1 rounded-full border border-[#1a1a1a]/20 text-sm mb-6 inline-block">Research</span>
                  <h3 className="text-3xl font-medium leading-tight mb-8">
                    The Science Behind Whiteboard Learning: Why Visual Teaching Works
                  </h3>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1a1a1a]/20 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    </div>
                    <span className="font-medium">Clarifyed</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm opacity-80">
                    <span>Mar 16, 2026</span>
                    <span className="flex items-center gap-1"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> 3 min read</span>
                  </div>
                </div>
              </ArticleCard>
            </div>

            <div className="flex justify-between items-center mt-8">
              <div className="flex gap-2">
                <button className="w-16 h-16 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center hover:bg-[#1a1a1a]/5 transition-colors">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button className="w-16 h-16 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center hover:bg-[#1a1a1a]/5 transition-colors">
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-2 rounded-full bg-[#1a1a1a]"></div>
                <div className="w-8 h-2 rounded-full bg-[#1a1a1a]/20"></div>
                <div className="w-8 h-2 rounded-full bg-[#1a1a1a]/20"></div>
                <div className="w-8 h-2 rounded-full bg-[#1a1a1a]/20"></div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="company" className="bg-[#1a1a1a] pt-32 pb-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="6" width="28" height="20" rx="3" stroke="#f4f4f0" strokeWidth="3" fill="none"/>
                  <path d="M12 16 L18 12 L24 16 L30 10" stroke="#e8705b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <line x1="14" y1="30" x2="26" y2="30" stroke="#f4f4f0" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                <span className="text-3xl font-medium tracking-tight">Clarifyed</span>
              </div>
              <p className="text-[#a3a3a3] mb-8">
                Whiteboard-native AI tutoring.<br/>Real learning, delivered.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-medium text-[#a3a3a3] mb-6">For</h4>
              <ul className="space-y-4 text-[#f4f4f0]/80">
                <li><a href="#roles" className="flex items-center gap-2 hover:text-white transition-colors"><User className="w-4 h-4" /> Students</a></li>
                <li><a href="#roles" className="flex items-center gap-2 hover:text-white transition-colors"><User className="w-4 h-4" /> Teachers</a></li>
                <li><a href="#roles" className="flex items-center gap-2 hover:text-white transition-colors"><User className="w-4 h-4" /> Schools</a></li>
                <li><a href="#roles" className="flex items-center gap-2 hover:text-white transition-colors"><User className="w-4 h-4" /> Parents</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-medium text-[#a3a3a3] mb-6">Knowledge</h4>
              <ul className="space-y-4 text-[#f4f4f0]/80">
                <li><a href="#resources" className="flex items-center gap-2 hover:text-white transition-colors"><BookOpen className="w-4 h-4" /> Blog</a></li>
                <li><a href="#resources" className="flex items-center gap-2 hover:text-white transition-colors"><BookOpen className="w-4 h-4" /> Trust Center</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-medium text-[#a3a3a3] mb-6">Company</h4>
              <ul className="space-y-4 text-[#f4f4f0]/80">
                <li><a href="#company" className="flex items-center gap-2 hover:text-white transition-colors"><Building2 className="w-4 h-4" /> About Us</a></li>
                <li><a href="#company" className="flex items-center gap-2 hover:text-white transition-colors"><Building2 className="w-4 h-4" /> Careers</a></li>
                <li><a href="#company" className="flex items-center gap-2 hover:text-white transition-colors"><Building2 className="w-4 h-4" /> Partners</a></li>
                <li><a href="#privacy-policy" className="flex items-center gap-2 hover:text-white transition-colors"><Building2 className="w-4 h-4" /> Privacy Policy</a></li>
                <li><a href="#terms" className="flex items-center gap-2 hover:text-white transition-colors"><Building2 className="w-4 h-4" /> Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-16 flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-md w-full">
              <h4 className="text-3xl font-medium mb-2">Stay Updated</h4>
              <p className="text-[#a3a3a3] mb-6">Get the latest on AI-powered learning and whiteboard tutoring.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email" className="bg-transparent border border-white/20 rounded-lg px-4 py-3 flex-1 focus:outline-none focus:border-[#e8705b] transition-colors" />
                <button className="bg-[#f4f4f0] text-[#1a1a1a] px-6 py-3 rounded-lg font-medium hover:bg-white transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
            
            <p className="text-[#f4f4f0] text-lg">
              © 2026 Teenage Works Private Limited. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
