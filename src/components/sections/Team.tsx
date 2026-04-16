import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Twitter } from 'lucide-react';

export default function Team() {
  return (
    <section className="pt-16 pb-32 px-6 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-20"
        >
          <p className="text-[#a3a3a3] text-lg mb-4">The Minds Behind Clarifyed</p>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-medium leading-tight">
            Meet the People<span className="text-[#e8705b]">.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              name: "Vyom Nishant Patel",
              role: "ML Pipeline Lead & R&D Lead",
              image: `${import.meta.env.BASE_URL}team_vyom.jpg`,
              bio: "Architecting the AI teaching engine and knowledge graph infrastructure that powers personalized whiteboard tutoring."
            },
            {
              name: "Abhisar Mehta",
              role: "ML Pipeline Engineer & Lead of Production Systems",
              image: `${import.meta.env.BASE_URL}team_abhisar.jpg`,
              bio: "Building the production ML systems that deliver real-time AI tutoring at scale across thousands of concurrent sessions."
            }
          ].map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:border-[#e8705b]/30 transition-colors duration-300"
            >
              <div className="relative w-24 h-24 mb-6 mx-auto">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#e8705b]/50 group-hover:border-[#e8705b] transition-colors"
                  loading="lazy"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#8ebf9e] border-2 border-[#1a1a1a]" />
              </div>

              <div className="text-center">
                <h3 className="text-xl font-medium mb-1">{person.name}</h3>
                <p className="text-[#e8705b] text-sm font-medium mb-4">{person.role}</p>
                <p className="text-[#a3a3a3] text-sm leading-relaxed">{person.bio}</p>
              </div>

              <div className="flex justify-center gap-3 mt-6">
                <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors" aria-label={`${person.name} LinkedIn`}>
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors" aria-label={`${person.name} Twitter`}>
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
