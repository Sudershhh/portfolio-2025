import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ParallaxCardProps {
  title: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  stats?: Array<{ label: string; value: string }>;
  bgColor?: string; // New prop for background glow color
}

export default function Project({
  title,
  description,
  imageUrl,
  demoUrl,
  githubUrl,
  stats,
  bgColor = "rgb(130, 201, 94)", // Default color if none provided
}: ParallaxCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  // const isInView = useInView(cardRef, { once: false, amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // This will control the card's movement, scaling, and stacking behavior
  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 1],
    [0, 0, 0, -400] // More dramatic backward movement
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 1],
    [1, 1, 1, 0.65] // More dramatic scale down
  );

  // Add perspective transform for more depth
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 1],
    [0, 0, 0, 12] // Slight rotation when moving back
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.5] // More opacity difference
  );

  // Calculate the index for stacking (we'll use this for the top offset)
  const index = cardRef.current
    ? Array.from(cardRef.current.parentElement?.children || []).indexOf(
        cardRef.current
      )
    : 0;

  return (
    <div
      ref={cardRef}
      className="h-[90vh] flex items-center justify-center max-w-5xl"
      style={{
        position: "sticky",
        top: `${index * 48}px`, // Increased offset for more visible stacking
      }}
    >
      <motion.div
        style={{
          y,
          scale,
          opacity,
          rotateX,
          transformPerspective: 1000,
          willChange: "transform",
        }}
        className="w-full"
      >
        <Card className="bg-zinc-900 border-[rgba(204,204,204,0.1)] rounded-3xl overflow-hidden px-11 py-14 text-white h-116 relative flex flex-col md:flex-row gap-12">
          {/* Glow Effect */}
          <div
            className="absolute aspect-square -bottom-[45px] -right-[1px] -top-[45px] w-[591px] overflow-hidden z-0"
            style={{
              backgroundColor: bgColor,
              filter: "blur(100px)",
              borderRadius: "1000px",
              opacity: 0.11,
            }}
          />

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between relative z-10">
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
              {demoUrl && (
                <Button
                  variant="outline"
                  className="rounded-full border-neutral-800 p-4 text-white font-medium bg-neutral-900 hover:none cursor-pointer mr-4"
                  onClick={() => window.open(demoUrl, "_blank")}
                >
                  Demo
                </Button>
              )}
              {githubUrl && (
                <Button
                  variant="outline"
                  className="rounded-full border-neutral-800 p-4 text-white font-medium bg-neutral-900 hover:none cursor-pointer"
                  onClick={() => window.open(githubUrl, "_blank")}
                >
                  GitHub
                </Button>
              )}
            </div>
          </div>
          <div className="flex-1 flex items-start justify-center ">
            <div className="rounded-lg overflow-hidden w-full h-[60%] md:h-[80%] min-h-[180px] flex items-center justify-center">
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
