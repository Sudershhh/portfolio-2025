import { useEffect, useRef } from "react";

const BLOB_CONFIG = [
  {
    color: { r: 0, g: 184, b: 255 }, // Ocean Blue 1
    alpha: 0.55,
    radius: 0.32,
    speed: 0.0007,
    offset: 0,
    freqX: 1.1,
    freqY: 0.9,
    amp: 0.32,
  },
  {
    color: { r: 0, g: 120, b: 255 }, // Ocean Blue 2
    alpha: 0.48,
    radius: 0.28,
    speed: 0.0005,
    offset: Math.PI / 2,
    freqX: 0.7,
    freqY: 1.3,
    amp: 0.28,
  },
  {
    color: { r: 187, g: 107, b: 217 }, // Hollow Purple 1
    alpha: 0.52,
    radius: 0.3,
    speed: 0.0006,
    offset: Math.PI,
    freqX: 1.5,
    freqY: 0.8,
    amp: 0.3,
  },
  {
    color: { r: 120, g: 86, b: 214 }, // Hollow Purple 2
    alpha: 0.45,
    radius: 0.25,
    speed: 0.0008,
    offset: (3 * Math.PI) / 2,
    freqX: 1.2,
    freqY: 1.7,
    amp: 0.25,
  },
];

const GradientBlur = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation variables
    const baseSize = Math.min(window.innerWidth, window.innerHeight) * 0.85;
    const centerX = () => canvas.width / 2;
    const centerY = () => canvas.height / 2;

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      BLOB_CONFIG.forEach(
        ({ color, alpha, radius, speed, offset, freqX, freqY, amp }) => {
          // Haphazard, smooth movement using unique sine/cosine formulas
          const t = frame * speed;
          const x =
            centerX() +
            Math.cos(t * freqX + offset) * (baseSize * amp) +
            Math.sin(t * (freqY + 0.3) + offset) * (baseSize * amp * 0.3);
          const y =
            centerY() +
            Math.sin(t * freqY + offset) * (baseSize * amp) +
            Math.cos(t * (freqX + 0.2) + offset) * (baseSize * amp * 0.2);
          const blobRadius = baseSize * radius;

          // Create radial gradient for each blob
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, blobRadius);
          gradient.addColorStop(
            0,
            `rgba(${color.r},${color.g},${color.b},${alpha})`
          );
          gradient.addColorStop(1, `rgba(${color.r},${color.g},${color.b},0)`);

          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          ctx.filter = "blur(80px)";
          ctx.beginPath();
          ctx.arc(x, y, blobRadius, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.fillStyle = gradient;
          ctx.fill();
          ctx.filter = "none";
          ctx.restore();
        }
      );
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "85%",
        height: "480px",
        filter: "blur(80px)",
        WebkitFilter: "blur(80px)",
        overflow: "visible",
        flex: "none",
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default GradientBlur;
