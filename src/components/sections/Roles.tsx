import React from 'react';
import { motion } from 'motion/react';

/**
 * Memory
 * A brain-like node network representing the persistent knowledge graph / spaced repetition system.
 */
const MemoryIllustration = () => {
  const pulseNodes = [
    { cx: 60, cy: 50, r: 8 },
    { cx: 180, cy: 40, r: 10 },
    { cx: 40, cy: 110, r: 7 },
    { cx: 200, cy: 105, r: 9 },
    { cx: 130, cy: 30, r: 6 },
    { cx: 100, cy: 130, r: 8 },
    { cx: 170, cy: 130, r: 7 },
  ];

  const connections = [
    "M 120 80 L 60 50", "M 120 80 L 180 40", "M 120 80 L 40 110",
    "M 120 80 L 200 105", "M 120 80 L 130 30", "M 120 80 L 100 130",
    "M 120 80 L 170 130", "M 60 50 L 130 30", "M 180 40 L 200 105",
    "M 40 110 L 100 130", "M 170 130 L 200 105",
  ];

  return (
    <svg viewBox="0 0 240 160" className="w-full h-full" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {/* Connections */}
      {connections.map((d, i) => (
        <motion.path
          key={i} d={d}
          stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
        />
      ))}

      {/* Satellite nodes with pulse */}
      {pulseNodes.map((n, i) => (
        <motion.circle
          key={i} cx={n.cx} cy={n.cy} r={n.r}
          fill="rgba(255,255,255,0.35)" stroke="white" strokeWidth="1.5"
          animate={{ r: [n.r, n.r + 1.5, n.r], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
        />
      ))}

      {/* Central hub — brain */}
      <motion.circle
        cx="120" cy="80" r="22"
        fill="white" stroke="#1a1a1a" strokeWidth="2"
        animate={{ r: [22, 24, 22] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Brain icon inside hub (Tabler) */}
      <motion.g
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ transformOrigin: "120px 80px", transformBox: "fill-box" as any }}
      >
        <g transform="translate(108, 68) scale(1)" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
          <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
          <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
          <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
          <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
          <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" />
        </g>
      </motion.g>
    </svg>
  );
};

type CardConfig = {
  title: string;
  description: string;
  bg: string;
  shadow: string;
  illustration: React.ReactNode;
};

const cards: CardConfig[] = [
  {
    title: "Handwritten AI Notes",
    description: "Stroke-by-stroke notes in a handwritten style — equations, arrows, and pointers, drawn the way a real tutor would at the board.",
    bg: "bg-[#6b8280]",
    shadow: "hover:shadow-[#6b8280]/20",
    illustration: <img src={`${import.meta.env.BASE_URL}c1.jpeg`} alt="Handwritten AI notes on derivatives" className="w-full h-full object-cover rounded-2xl" loading="lazy" />,
  },
  {
    title: "Desmos",
    description: "Live, interactive Desmos graphs embedded right on the canvas. Plot functions, drag points, and explore math visually in real time.",
    bg: "bg-[#8ebf9e]",
    shadow: "hover:shadow-[#8ebf9e]/20",
    illustration: <img src={`${import.meta.env.BASE_URL}c2.jpeg`} alt="Desmos graph with function and tangent line" className="w-full h-full object-cover rounded-2xl" loading="lazy" />,
  },
  {
    title: "Mindmaps",
    description: "Auto-generated concept maps that tie every topic you've learned into one visual web — so nothing ever feels disconnected.",
    bg: "bg-[#7a9eb1]",
    shadow: "hover:shadow-[#7a9eb1]/20",
    illustration: <img src={`${import.meta.env.BASE_URL}mindmap.png`} alt="Differentiation mindmap with core concepts, applications, and techniques" className="w-full h-full object-cover object-left rounded-2xl" loading="lazy" />,
  },
  {
    title: "Interactives",
    description: "Embedded widgets, MCQs, and draggable graphs. Move the slider and watch the math respond — right on the canvas.",
    bg: "bg-[#c697c9]",
    shadow: "hover:shadow-[#c697c9]/20",
    illustration: <img src={`${import.meta.env.BASE_URL}c3.jpeg`} alt="Interactive parabola with roots, vertex, and axis of symmetry" className="w-full h-full object-cover rounded-2xl" loading="lazy" />,
  },
  {
    title: "Memory",
    description: "A persistent knowledge graph tracks everything you've mastered, every gap, and every misconception — so the AI never forgets where you left off.",
    bg: "bg-[#b07d62]",
    shadow: "hover:shadow-[#b07d62]/20",
    illustration: <MemoryIllustration />,
  },
  {
    title: "Diagrams",
    description: "Visual explanations, labeled figures, and geometry drawn by the AI — always accurate, always tied to the lesson at hand.",
    bg: "bg-[#5a8a6e]",
    shadow: "hover:shadow-[#5a8a6e]/20",
    illustration: <img src={`${import.meta.env.BASE_URL}diagram-parabola.jpeg`} alt="Parabola diagram showing roots, vertex, and axis of symmetry" className="w-full h-full object-cover rounded-2xl" loading="lazy" />,
  },
];

export default function Roles() {
  return (
    <section id="roles" className="py-32 px-6 bg-[#9ca3af]/10">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#a3a3a3] text-lg mb-4">Lives on the Whiteboard</p>
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-medium mb-6 max-w-3xl leading-tight">
          Writing. Drawing.<br/>Connecting. Teaching.
        </h2>
        <p className="text-xl text-[#a3a3a3] max-w-2xl mb-16">
          Every lesson shows up as handwriting, sketches, and visual maps on the canvas — never as a paragraph of chat.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -8 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`${card.bg} rounded-[2rem] p-8 md:p-10 relative overflow-hidden group flex flex-col min-h-[460px] hover:shadow-2xl ${card.shadow} transition-shadow duration-300`}
            >
              <h3 className="text-3xl md:text-4xl font-medium mb-5 text-[#1a1a1a] relative z-10">{card.title}</h3>
              <p className="text-base md:text-lg text-[#1a1a1a]/80 max-w-sm leading-relaxed relative z-10">
                {card.description}
              </p>

              <div className="mt-auto pt-6 flex-1 min-h-0 relative z-0">
                {card.illustration}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
