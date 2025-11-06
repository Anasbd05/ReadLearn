/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useTransform, motion, useScroll, MotionValue } from "framer-motion";
import { useRef } from "react";
import { BookOpen, MousePointerClick, Star, Check } from "lucide-react";

const steps = [
  {
    step: "Step 1",
    title: "Choose Your Content",
    features: [
      "Discover & choose from book library",
      "Import your own text",
      "Create content using AI",
    ],
    icon: BookOpen,
    color: "#F9F8F6",
  },
  {
    step: "Step 2",
    title: "Read & Translate",
    features: [
      "Click-to-translate any word",
      "View definition, context & pronunciation",
      "Seamless reading experience",
    ],
    icon: MousePointerClick,
    color: "#F9F8F6",
  },
  {
    step: "Step 3",
    title: "Build Your Vocabulary",
    features: [
      "Bookmark words instantly",
      "Star difficult words for review",
      "Track your learning progress",
    ],
    icon: Star,
    color: "#F9F8F6",
  },
];

export default function App() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <main id="how-it-works" className="bg-white" ref={container}>
      <section className="text-gray-900 py-10 md:py-14 w-full bg-white grid place-content-center relative">
        <div className="relative z-10 px-8 space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Master Any Language
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Your journey to fluency starts here. Scroll down to discover how!
          </p>
        </div>
      </section>

      <section className="text-gray-900 w-full bg-white">
        {steps.map((step, i) => {
          const targetScale = 1 - (steps.length - i) * 0.05;
          return (
            <Card
              key={`step_${i}`}
              i={i}
              step={step.step}
              title={step.title}
              features={step.features}
              icon={step.icon}
              color={step.color}
              progress={scrollYProgress}
              range={[i * 0.33, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </section>
    </main>
  );
}

interface CardProps {
  i: number;
  step: string;
  title: string;
  features: string[];
  icon: any;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card: React.FC<CardProps> = ({
  i,
  step,
  title,
  features,
  icon: Icon,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative h-[500px] w-[90%] border border-gray-300 rounded-3xl p-8 md:p-12 origin-top shadow-sm"
      >
        <motion.div style={{ opacity }} className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 border border-gray-300 rounded-2xl flex items-center justify-center">
              <Icon className="w-8 h-8 text-gray-900" />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">{step}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {title}
              </h2>
            </div>
          </div>

          <div className="space-y-4 mt-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4 border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors"
              >
                <div className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-gray-900" />
                </div>
                <p className="text-gray-900 text-lg font-medium leading-relaxed">
                  {feature}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="pt-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gray-900 rounded-full"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
