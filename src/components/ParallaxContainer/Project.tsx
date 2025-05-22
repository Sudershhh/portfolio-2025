"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ParallaxCardProps {
  title: string;
  description: string;
  imageUrl: string;
  stats?: Array<{ label: string; value: string }>;
  hasButton?: boolean;
}

export default function Project({
  title,
  description,
  imageUrl,
  stats,
}: ParallaxCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  // const isInView = useInView(cardRef, { once: false, amount: 0.5 });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // This will control the card's movement and stacking behavior
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  // Calculate the index for stacking (we'll use this for the top offset)
  const index = cardRef.current
    ? Array.from(cardRef.current.parentElement?.children || []).indexOf(
        cardRef.current
      )
    : 0;

  return (
    <div
      ref={cardRef}
      className="h-screen flex items-center justify-center max-w-5xl"
      style={{
        position: "sticky",
        top: `${index * 24}px`, // 24px offset for each card
      }}
    >
      <motion.div style={{ y, opacity }} className="w-full">
        <Card className="bg-zinc-900 border-zinc-800 rounded-3xl overflow-hidden px-11 py-14 text-white h-116 relative flex flex-col md:flex-row gap-12">
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-medium">{title}</h2>
              <p className="text-neutral-400 text-lg font-normal leading-6 mt-4">
                {description}
              </p>

              {stats && (
                <div className="flex gap-8 mt-8">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <p className="text-zinc-400">{stat.label}</p>
                      <p className="text-4xl font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-8 flex justify-start items-end">
              <Button
                variant="outline"
                className="rounded-full border-neutral-800 p-4 text-white font-medium bg-neutral-900 hover:none cursor-pointer mr-4"
              >
                Demo
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-neutral-800 p-4 text-white font-medium bg-neutral-900 hover:none cursor-pointer"
              >
                GitHub
              </Button>
            </div>
          </div>
          <div className="flex-1 flex items-start justify-center ">
            <div className="rounded-lg overflow-hidden w-full h-[60%] md:h-[80%] min-h-[180px] flex items-center justify-center bg-amber-400">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
                style={{ minHeight: "200px", maxHeight: "70vh" }}
              />
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
