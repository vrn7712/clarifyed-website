import React from 'react';
import { motion } from 'motion/react';

export default function WhiteboardCanvas() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      className="mt-24 relative max-w-5xl mx-auto rounded-[2rem] border border-white/15 bg-[#141414] shadow-2xl overflow-hidden group"
    >
      <img
        src={`${import.meta.env.BASE_URL}whiteboard-demo.png`}
        alt="Clarifyed whiteboard showing slope, tangent, derivative notes and Desmos graph"
        className="w-full h-auto"
        loading="eager"
      />
    </motion.div>
  );
}
