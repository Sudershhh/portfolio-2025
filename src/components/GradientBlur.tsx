import { useEffect, useRef, useState } from "react";

// Optimized blob configuration - reduced from 15 to 7 blobs for better performance
// Selected blobs maintain visual quality while reducing computation by ~60%
const BLOB_CONFIG = [
  {
    color: { r: 0, g: 184, b: 255 }, // Ocean Blue 1
    alpha: 0.25,
    baseRadius: 0.32,
    speed: 0.0012,
    offset: 0,
    freqX: 1.3,
    freqY: 0.9,
    amp: 0.42,
    pulseSpeed: 0.003,
    pulseAmp: 0.15,
  },
  {
    color: { r: 0, g: 120, b: 255 }, // Ocean Blue 2
    alpha: 0.22,
    baseRadius: 0.28,
    speed: 0.0009,
    offset: Math.PI / 2,
    freqX: 0.7,
    freqY: 1.5,
    amp: 0.38,
    pulseSpeed: 0.004,
    pulseAmp: 0.12,
  },
  {
    color: { r: 187, g: 107, b: 217 }, // Hollow Purple 1
    alpha: 0.12,
    baseRadius: 0.3,
    speed: 0.0011,
    offset: Math.PI,
    freqX: 1.8,
    freqY: 0.8,
    amp: 0.4,
    pulseSpeed: 0.0025,
    pulseAmp: 0.18,
  },
  {
    color: { r: 120, g: 86, b: 214 }, // Hollow Purple 2
    alpha: 0.25,
    baseRadius: 0.25,
    speed: 0.0014,
    offset: (3 * Math.PI) / 2,
    freqX: 1.2,
    freqY: 1.9,
    amp: 0.35,
    pulseSpeed: 0.0035,
    pulseAmp: 0.14,
  },
  {
    color: { r: 60, g: 200, b: 255 }, // Bright Cyan
    alpha: 0.2,
    baseRadius: 0.22,
    speed: 0.0016,
    offset: Math.PI / 4,
    freqX: 2.1,
    freqY: 1.1,
    amp: 0.45,
    pulseSpeed: 0.005,
    pulseAmp: 0.2,
  },
  {
    color: { r: 140, g: 100, b: 230 }, // Lavender
    alpha: 0.18,
    baseRadius: 0.29,
    speed: 0.0022,
    offset: Math.PI / 3,
    freqX: 2.4,
    freqY: 1.4,
    amp: 0.48,
    pulseSpeed: 0.006,
    pulseAmp: 0.19,
  },
  {
    color: { r: 100, g: 70, b: 190 }, // Deep Purple
    alpha: 0.15,
    baseRadius: 0.33,
    speed: 0.0019,
    offset: (5 * Math.PI) / 6,
    freqX: 1.9,
    freqY: 2.5,
    amp: 0.52,
    pulseSpeed: 0.0055,
    pulseAmp: 0.24,
  },
];

// Performance constants
const TARGET_FPS = 30; // Reduced from 60 FPS for better performance
const FRAME_INTERVAL = 1000 / TARGET_FPS;

const GradientBlur = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);

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
    
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 300);
    };
    window.addEventListener("resize", handleResize);

    // Animation variables
    const baseSize = Math.min(window.innerWidth, window.innerHeight) * 0.9;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    // Reduced chaos factors for better performance
    const chaosFactor = 0.35;
    const turbulence = 0.25;
    const wildness = 0.3;

    let frame = 0;
    let lastTime = 0;
    let animationId: number;

    const animate = (currentTime: number) => {
      // Skip frame if tab is hidden
      if (!isVisible) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      // Frame rate limiting to 30 FPS
      if (lastTime && currentTime - lastTime < FRAME_INTERVAL) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = lastTime ? (currentTime - lastTime) / FRAME_INTERVAL : 1;
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame += deltaTime;

      // Create a subtle background gradient
      const bgGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        baseSize * 1.2
      );
      bgGradient.addColorStop(0, "rgba(10, 10, 30, 0.05)");
      bgGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Simplified blob rendering - removed complex motion calculations
      BLOB_CONFIG.forEach((blob) => {
        const {
          color,
          alpha,
          baseRadius,
          speed,
          offset,
          freqX,
          freqY,
          amp,
          pulseSpeed,
          pulseAmp,
        } = blob;

        const t = frame * speed;

        // Simplified chaotic movement
        const chaosX = Math.sin(t * 2.1) * Math.cos(t * 1.7) * chaosFactor;
        const chaosY = Math.cos(t * 1.9) * Math.sin(t * 2.3) * chaosFactor;

        // Simplified turbulence
        const turbX = Math.sin(t * 5.3) * Math.cos(t * 4.7) * turbulence;
        const turbY = Math.cos(t * 4.9) * Math.sin(t * 5.5) * turbulence;

        // Simplified wild factor
        const wildX =
          Math.sin(t * 8.7) * Math.cos(t * 7.3) * Math.sin(t * 3.1) * wildness;
        const wildY =
          Math.cos(t * 9.2) * Math.sin(t * 6.8) * Math.cos(t * 4.2) * wildness;

        // Simplified movement pattern
        const x =
          centerX +
          Math.cos(t * freqX + offset) * (baseSize * amp) +
          Math.sin(t * (freqY + 0.3) + offset) * (baseSize * amp * 0.5) +
          chaosX * baseSize +
          turbX * baseSize +
          wildX * baseSize;

        const y =
          centerY +
          Math.sin(t * freqY + offset) * (baseSize * amp) +
          Math.cos(t * (freqX + 0.2) + offset) * (baseSize * amp * 0.4) +
          chaosY * baseSize +
          turbY * baseSize +
          wildY * baseSize;

        // Simplified pulsing radius
        const pulseFactor =
          1 +
          Math.sin(t * pulseSpeed * 10) * pulseAmp +
          Math.cos(t * pulseSpeed * 15) * (pulseAmp * 0.5);

        const blobRadius = baseSize * baseRadius * pulseFactor;

        // Enhanced gradient with multiple color stops
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, blobRadius);
        gradient.addColorStop(
          0,
          `rgba(${color.r},${color.g},${color.b},${alpha})`
        );
        gradient.addColorStop(
          0.6,
          `rgba(${color.r},${color.g},${color.b},${alpha * 0.7})`
        );
        gradient.addColorStop(
          0.8,
          `rgba(${color.r},${color.g},${color.b},${alpha * 0.3})`
        );
        gradient.addColorStop(1, `rgba(${color.r},${color.g},${color.b},0)`);

        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.filter = "blur(80px)";
        ctx.beginPath();

        // Simplified distortion - reduced steps for performance
        const distortion = 0.08;
        const steps = 24; // Reduced from 36

        for (let i = 0; i <= steps; i++) {
          const angle = (i / steps) * Math.PI * 2;

          // Simplified distortion calculation
          const distortFactor =
            1 +
            Math.sin(angle * 3 + t) * distortion +
            Math.cos(angle * 5 + t * 1.5) * (distortion * 0.7);

          const px = x + Math.cos(angle) * blobRadius * distortFactor;
          const py = y + Math.sin(angle) * blobRadius * distortFactor;

          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }

        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.filter = "none";
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Visibility API - pause animation when tab is hidden
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isVisible]);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "95%",
        height: "560px",
        filter: "blur(80px)",
        WebkitFilter: "blur(80px)",
        overflow: "visible",
        flex: "none",
        zIndex: 1,
        pointerEvents: "none",
        willChange: "transform",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default GradientBlur;
