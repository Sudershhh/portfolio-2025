"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, useInView } from "framer-motion";
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
  hasButton,
}: ParallaxCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.5 });

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
        <Card className="bg-zinc-900 border-zinc-800 rounded-2xl overflow-hidden p-10 text-white h-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-medium">{title}</h2>
              <p className="text-zinc-400">{description}</p>

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

              <div className="mt-8">
                <Button
                  variant="outline"
                  className="rounded-full  border-white text-white font-semibold bg-zinc-900"
                >
                  Demo
                </Button>

                <Button
                  variant="outline"
                  className="rounded-full border-zinc-700 text-white hover:bg-zinc-800"
                >
                  GitHub
                </Button>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
