import { useRef, useEffect } from "react";
import { Button } from "./button";

interface WaveButtonProps {
  isPlaying: boolean;
  onClick: () => void;
}

export function WaveButton({ isPlaying, onClick }: WaveButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const incrementRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isPlaying) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 120;
    const height = 40;
    canvas.width = width;
    canvas.height = height;

    const animate = () => {
      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      ctx.clearRect(0, 0, width, height);

      // Draw the wave
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 + Math.sin(incrementRef.current) * 0.4})`;
      ctx.lineWidth = 2;

      const amplitude = Math.sin(incrementRef.current) * 8;
      const centerY = height / 2;

      ctx.moveTo(0, centerY);

      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin(x / 20 + incrementRef.current) * amplitude;
        ctx.lineTo(x, y);
      }

      ctx.stroke();
      ctx.closePath();

      incrementRef.current += 0.02;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <Button
      onClick={onClick}
      className="cursor-pointer bg-transparent hover:bg-white/10 text-white rounded-full border border-white/20 px-2 py-1 text-sm group relative overflow-hidden min-w-[70px] min-h-[32px]"
    >
      {isPlaying ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-2 w-[calc(100%-14px)] h-[calc(100%-14px)] "
          style={{ mixBlendMode: "overlay" }}
        />
      ) : (
        <span className="relative z-10 text-sm">Sound</span>
      )}
    </Button>
  );
}
