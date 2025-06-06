import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ParallaxCardProps {
  title: string;
  description: string;
  imageUrl: Promise<string>;
  demoUrl?: string;
  githubUrl?: string;
  stats?: Array<{ label: string; value: string }>;
  bgColor?: string; // New prop for background glow color
  index?: number; // Added index prop to handle stacking
}

export default function Project({
  title,
  description,
  imageUrl,
  demoUrl,
  githubUrl,
  stats,
  bgColor = "rgb(130, 201, 94)", // Default color if none provided
  index = 0, // Default index
}: ParallaxCardProps) {
  const [loadedImage, setLoadedImage] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    let mounted = true;

    const loadImage = async () => {
      try {
        const img = await imageUrl;
        if (mounted) {
          setLoadedImage(img);
        }
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadImage();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      mounted = false;
      observer.disconnect();
    };
  }, [imageUrl]);

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

  return (
    <div
      ref={cardRef}
      className="h-[90vh] flex items-center justify-center max-w-5xl"
      style={{
        position: "sticky",
        top: `${index * 20}px`, // Reduced offset to 20px max as requested
        zIndex: 100 - index, // Higher index items go behind
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
        <Card className="bg-zinc-900 border-[rgba(204,204,204,0.1)] rounded-3xl overflow-hidden px-4 sm:px-11 py-6 sm:py-14 text-white h-fit sm:h-116 relative flex flex-col sm:flex-row gap-4 sm:gap-12">
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

          {/* Content Section with Title and Description */}
          <div className="flex-1 flex flex-col justify-between relative z-10 min-w-0 sm:order-1">
            {/* Title appears first on mobile, part of left section on desktop */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-medium text-center sm:text-left mb-4 sm:mb-0">
                {title}
              </h2>
              <p className="text-neutral-400 text-base sm:text-lg font-normal leading-6 mt-4 line-clamp-3 sm:line-clamp-none">
                {description}
              </p>

              {stats && (
                <div className="flex gap-4 sm:gap-8 mt-6 sm:mt-8 justify-center sm:justify-start">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <p className="text-zinc-400 text-sm sm:text-base">
                        {stat.label}
                      </p>
                      <p className="text-2xl sm:text-4xl font-bold">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-4 sm:mt-8 flex justify-center sm:justify-start items-center sm:items-end gap-4">
              {demoUrl && (
                <Button
                  variant="outline"
                  className="rounded-full cursor-pointer border-neutral-800 px-6 py-2 sm:p-4 text-white font-medium bg-neutral-900 hover:bg-neutral-800 hover:text-white"
                  onClick={() => window.open(demoUrl, "_blank")}
                >
                  Demo
                </Button>
              )}
              {githubUrl && (
                <Button
                  variant="outline"
                  className="rounded-full cursor-pointer border-neutral-800 px-6 py-2 sm:p-4 text-white font-medium bg-neutral-900 hover:bg-neutral-800 hover:text-white"
                  onClick={() => window.open(githubUrl, "_blank")}
                >
                  GitHub
                </Button>
              )}
            </div>
          </div>

          {/* Image Section - Right side on desktop */}
          <div className="flex-1 flex items-center justify-center min-w-0 sm:order-2">
            <div className="rounded-lg overflow-hidden w-full min-h-[200px] sm:min-h-[200px] flex justify-center">
              {loadedImage ? (
                <img
                  ref={imageRef}
                  src={loadedImage || "/placeholder.svg"}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain rounded-md"
                />
              ) : (
                <div className="w-full h-full bg-neutral-800 animate-pulse" />
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
