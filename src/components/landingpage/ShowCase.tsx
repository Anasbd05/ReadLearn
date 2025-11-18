"use client";
import showcase from "@/assets/product-image.png";
import showcase2 from "@/assets/product-image2.png";
import showcase3 from "@/assets/product-image3.png";

import { useTransform, motion, useScroll, MotionValue } from "framer-motion";
import { useRef } from "react";
import Image, { StaticImageData } from "next/image";

const showcases = [
  {
    id: 1,
    image: showcase,
    alt: "Browser books",
  },
  {
    id: 2,
    image: showcase2,
    alt: "Ai content generator",
  },
  {
    id: 3,
    image: showcase3,
    alt: "Vocabulary",
  },
];

export default function ProductShowcase() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <main
      className="bg-linear-to-b py-8 md:py-12 lg:py-14 from-white to-[#D2DCFF]"
      ref={container}
    >
      <section className="text-gray-900 w-full  mb-16 ">
        <div className="relative z-10 px-4 sm:px-6 lg:px-10 space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Your Learning Journey, Visualized
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            From selecting your favorite content to building a robust
            vocabulary, see how every feature works together to accelerate your
            path to fluency.
          </p>
        </div>
      </section>
      <section className="w-full">
        {showcases.map((showcase, i) => {
          const targetScale = 1 - (showcases.length - i) * 0.05;
          return (
            <ShowcaseCard
              key={showcase.id}
              i={i}
              image={showcase.image}
              alt={showcase.alt}
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
interface ShowcaseCardProps {
  i: number;
  image: StaticImageData;
  alt: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  i,
  image,
  alt,
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
      className=" flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="relative w-[90%] max-w-3xl origin-top"
      >
        <motion.div style={{ opacity }}>
          <Image
            src={image}
            alt={alt}
            className="w-full h-auto rounded-2xl shadow-sm"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
