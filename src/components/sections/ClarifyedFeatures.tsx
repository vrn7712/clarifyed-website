import React from "react";
import { PenTool, BrainCircuit, Users, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { Marquee } from "../ui/marquee";

const marqueeData = [
  "How do I balance this chemical equation?",
  "Why does the curve approach zero?",
  "Can you explain eigenvectors visually?",
  "What's the intuition behind this formula?",
  "Show me the step-by-step derivation.",
  "Let's review what I missed last week.",
  "I don't understand projectile motion.",
  "Can we graph this function together?",
  "Why is the derivative positive here?",
  "Explain this concept like I'm 5.",
  "How does this connect to what we learned?",
  "Can you create a flashcard for this?",
];

const features = [
  {
    description:
      "No chat windows or text threads. You and your AI tutor read, write, and draw directly on a shared digital canvas.",
    icon: PenTool,
    title: "True Whiteboard Native",
  },
  {
    description:
      "Your tutor maintains a persistent knowledge graph of your strengths, weaknesses, and learning history.",
    icon: BrainCircuit,
    title: "Unforgettable Memory",
  },
  {
    description:
      "Invite friends and solve together. The AI acts as a smart mediator, guiding everyone in real-time.",
    icon: Users,
    title: "Multiplayer Collaboration",
  },
  {
    description:
      "Embed Desmos widgets, auto-generate interactive quizzes, and render accurate 3D geometry instantly.",
    icon: Sparkles,
    title: "Deeply Interactive",
  },
];

export default function ClarifyedFeatures() {
  const m1 = marqueeData.slice(0, marqueeData.length / 3);
  const m2 = marqueeData.slice(
    marqueeData.length / 3,
    (marqueeData.length / 3) * 2
  );
  const m3 = marqueeData.slice((marqueeData.length / 3) * 2);

  return (
    <section className="relative bg-[#1a1a1a] pt-20 sm:pt-40 text-[#f4f4f0]">
      <div className="mx-auto max-w-full">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center space-y-4 px-5 text-center md:px-10">
          <h2 className="max-w-3xl font-medium text-4xl sm:text-5xl lg:text-6xl text-white">
            Removing the roadblocks to your understanding
          </h2>
          <p className="max-w-2xl text-base md:text-lg text-neutral-400">
            It's easy to get lost in a sea of generic chatbot answers. We filter out the noise, providing interactive, personalized, side-by-side tutoring that actually helps you learn.
          </p>
          <div className="relative mx-auto mt-8 max-w-3xl overflow-hidden">
            <div className="absolute left-0 z-50 h-full w-20 bg-linear-to-r from-[#1a1a1a]" />
            <div className="absolute right-0 z-50 h-full w-20 bg-linear-to-l from-[#1a1a1a]" />

            <div className="-mx-6 flex w-screen flex-col md:-mx-10 lg:-mx-16">
              <Marquee className="[--duration:45s] [--gap:0.75rem]" repeat={4}>
                {m1.map((q) => (
                  <Badge
                    className="rounded-none border-[#333333] bg-[#222222] text-[#f4f4f0] px-4 py-2 font-medium tracking-wide shadow-sm"
                    key={q}
                    size="lg"
                    variant="outline"
                  >
                    {q}
                  </Badge>
                ))}
              </Marquee>

              <Marquee
                className="[--duration:50s] [--gap:0.75rem]"
                repeat={4}
                reverse
              >
                {m2.map((q) => (
                  <Badge
                    className="rounded-none border-[#333333] bg-[#222222] text-[#f4f4f0] px-4 py-2 font-medium tracking-wide shadow-sm"
                    key={q}
                    size="lg"
                    variant="outline"
                  >
                    {q}
                  </Badge>
                ))}
              </Marquee>

              <Marquee className="[--duration:42s] [--gap:0.75rem]" repeat={4}>
                {m3.map((q) => (
                  <Badge
                    className="rounded-none border-[#333333] bg-[#222222] text-[#f4f4f0] px-4 py-2 font-medium tracking-wide shadow-sm"
                    key={q}
                    size="lg"
                    variant="outline"
                  >
                    {q}
                  </Badge>
                ))}
              </Marquee>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 divide-dashed divide-neutral-800 border-t border-neutral-800 border-dashed sm:grid-cols-2 sm:divide-x lg:grid-cols-4 max-w-7xl mx-auto border-x border-b">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                className="group flex flex-col gap-5 px-5 py-8 last:border-b-0 lg:border-b-0 lg:px-8 lg:py-12 transition-colors hover:bg-[#222222]/50"
                key={feature.title}
              >
                <div className="p-3 bg-[#e8705b]/10 w-fit rounded-lg ring-1 ring-[#e8705b]/20">
                  <Icon className="size-8 text-[#e8705b]" strokeWidth={1.5} />
                </div>

                <div className="flex flex-col gap-2 pt-6 lg:pt-10">
                  <h3 className="font-semibold text-2xl tracking-tight text-white">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-neutral-400 font-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
