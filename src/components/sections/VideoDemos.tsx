import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ArrowLeft, ArrowRight } from 'lucide-react';

export default function VideoDemos() {
  const [activeVideo, setActiveVideo] = useState(0);

  const videoDemos = [
    { prompt: "Explain Nodes and Antinodes in standing wave", title: "AI Teaching on Whiteboard", description: "Watch the AI write notes and draw diagrams in real time", src: `${import.meta.env.BASE_URL}video1.mp4` },
    { prompt: "What is underdamped motion?", title: "Knowledge Graph in Action", description: "See how the AI tracks and adapts to student understanding", src: `${import.meta.env.BASE_URL}video2.mp4` },
    { prompt: "Derive the Distance Formula with visuals", title: "Collaborative Problem Solving", description: "Students and AI working together on the same canvas", src: `${import.meta.env.BASE_URL}video3.mp4` },
    { prompt: "Visualize current through a cylindrical wire", title: "Real-Time Error Correction", description: "The AI catches mistakes mid-step and guides corrections", src: `${import.meta.env.BASE_URL}video4.mp4` },
    { prompt: "Visually derive the Pythagorean Theorem", title: "Interactive Widgets & Tools", description: "Embedded graphing, calculators, and simulations", src: `${import.meta.env.BASE_URL}video5.mp4` },
    { prompt: "Explain Square Wave Harmonics", title: "Spaced Repetition Woven In", description: "Automatic review scheduling based on mastery", src: `${import.meta.env.BASE_URL}video6.mp4` },
  ];

  return (
    <section id="resources" className="py-32 px-6 bg-[#111] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Search bar */}
        <div className="relative max-w-lg mx-auto mb-20">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
          <input
            type="text"
            readOnly
            value={videoDemos[activeVideo].prompt}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-[#888] text-lg focus:outline-none transition-colors font-mono cursor-default pointer-events-none"
          />
        </div>

        {/* Stacked cards container */}
        <div className="relative flex items-center justify-center" style={{ minHeight: '500px' }}>
          {/* Background stacked cards — fanned behind */}
          {videoDemos.map((video, i) => {
            const offset = i - activeVideo;
            const isActive = i === activeVideo;
            const absOffset = Math.abs(offset);

            if (absOffset > 2 && !isActive) return null;

            return (
              <motion.div
                key={i}
                onClick={() => setActiveVideo(i)}
                animate={{
                  x: offset * 35,
                  y: isActive ? 0 : 20 + absOffset * 8,
                  scale: isActive ? 1 : 0.92 - absOffset * 0.03,
                  rotateZ: isActive ? 0 : offset * 2.5,
                  opacity: isActive ? 1 : 0.4 - absOffset * 0.1,
                  zIndex: isActive ? 30 : 20 - absOffset,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute w-full max-w-[800px] rounded-2xl border overflow-hidden ${
                  isActive
                    ? 'bg-[#1a1a1a] border-white/15 shadow-2xl shadow-black/50 cursor-default'
                    : 'bg-[#161616] border-white/5 cursor-pointer'
                }`}
                style={{ transformOrigin: 'center bottom' }}
              >
                {/* Video */}
                <div className="relative aspect-video bg-black">
                  {isActive ? (
                    <video
                      key={`video-${i}`}
                      src={video.src}
                      controls
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      preload="metadata"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white/20 text-sm font-mono">{video.title}</span>
                    </div>
                  )}
                </div>

                {/* Info bar */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-5 border-t border-white/5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-medium text-white/90 mb-1">{video.title}</h3>
                        <p className="text-sm text-[#666]">{video.description}</p>
                      </div>
                      <span className="text-xs text-[#555] font-mono shrink-0 mt-1">{i + 1}/{videoDemos.length}</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Navigation below */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={() => setActiveVideo((prev) => (prev - 1 + videoDemos.length) % videoDemos.length)}
            aria-label="Previous demo"
            className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-white/40" />
          </button>

          <div className="flex gap-2">
            {videoDemos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveVideo(i)}
                aria-label={`Demo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeVideo ? 'w-8 bg-[#e8705b]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveVideo((prev) => (prev + 1) % videoDemos.length)}
            aria-label="Next demo"
            className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
          >
            <ArrowRight className="w-4 h-4 text-white/40" />
          </button>
        </div>
      </div>
    </section>
  );
}
