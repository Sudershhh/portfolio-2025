import { useEffect, useRef, useState } from "react";

const BLOB_CONFIG = [
  {
    color: { r: 0, g: 184, b: 255 },
    alpha: 0.25,
    baseRadius: 0.42, // Increased size
    speed: 0.002,
    offset: 0,
    freqX: 1.1,
    freqY: 0.8,
    amp: 0.35,
    pulseSpeed: 0.002,
    pulseAmp: 0.12,
    cohesionStrength: 0.3,
    separationRadius: 0.8,
  },
  {
    color: { r: 0, g: 120, b: 255 },
    alpha: 0.22,
    baseRadius: 0.38,
    speed: 0.00175,
    offset: Math.PI / 3,
    freqX: 0.9,
    freqY: 1.2,
    amp: 0.32,
    pulseSpeed: 0.0025,
    pulseAmp: 0.1,
    cohesionStrength: 0.35,
    separationRadius: 0.75,
  },
  {
    color: { r: 187, g: 107, b: 217 },
    alpha: 0.18,
    baseRadius: 0.4,
    speed: 0.00225,
    offset: (2 * Math.PI) / 3,
    freqX: 1.4,
    freqY: 0.7,
    amp: 0.33,
    pulseSpeed: 0.002,
    pulseAmp: 0.14,
    cohesionStrength: 0.28,
    separationRadius: 0.85,
  },
  {
    color: { r: 120, g: 86, b: 214 },
    alpha: 0.24,
    baseRadius: 0.35,
    speed: 0.0025,
    offset: Math.PI,
    freqX: 1.0,
    freqY: 1.6,
    amp: 0.3,
    pulseSpeed: 0.0028,
    pulseAmp: 0.11,
    cohesionStrength: 0.32,
    separationRadius: 0.7,
  },
  {
    color: { r: 60, g: 200, b: 255 },
    alpha: 0.2,
    baseRadius: 0.32,
    speed: 0.003,
    offset: (4 * Math.PI) / 3,
    freqX: 1.7,
    freqY: 0.9,
    amp: 0.38,
    pulseSpeed: 0.004,
    pulseAmp: 0.16,
    cohesionStrength: 0.25,
    separationRadius: 0.9,
  },
  {
    color: { r: 0, g: 150, b: 220 },
    alpha: 0.16,
    baseRadius: 0.46,
    speed: 0.0035,
    offset: (5 * Math.PI) / 3,
    freqX: 1.3,
    freqY: 1.8,
    amp: 0.42,
    pulseSpeed: 0.0035,
    pulseAmp: 0.18,
    cohesionStrength: 0.4,
    separationRadius: 0.95,
  },
  {
    color: { r: 140, g: 100, b: 230 },
    alpha: 0.19,
    baseRadius: 0.39,
    speed: 0.004,
    offset: Math.PI / 6,
    freqX: 2.0,
    freqY: 1.1,
    amp: 0.4,
    pulseSpeed: 0.0048,
    pulseAmp: 0.15,
    cohesionStrength: 0.33,
    separationRadius: 0.8,
  },
  {
    color: { r: 100, g: 70, b: 190 },
    alpha: 0.17,
    baseRadius: 0.43,
    speed: 0.00375,
    offset: Math.PI / 2,
    freqX: 1.5,
    freqY: 2.1,
    amp: 0.44,
    pulseSpeed: 0.0042,
    pulseAmp: 0.2,
    cohesionStrength: 0.37,
    separationRadius: 1.0,
  },
];

// Pre-calculated values with cohesion system
const precalculatedValues = BLOB_CONFIG.map((blob, index) => {
  // const totalBlobs = BLOB_CONFIG.length;
  // const angle = (index * 2 * Math.PI) / totalBlobs;

  return {
    ...blob,
    colorString: `${blob.color.r},${blob.color.g},${blob.color.b}`,
    // Snake-like movement parameters
    snakeSegment: index,
    followDistance: 0.15 + index * 0.05, // Each blob follows the previous
    // Amoeba parameters
    amoebaFactor: 0.18 + Math.random() * 0.12,
    amoebaSpeed: 0.0017 + Math.random() * 0.002,
    amoebaPhase: Math.random() * Math.PI * 2,
    // Cohesion tracking
    currentX: 0,
    currentY: 0,
    velocityX: 0,
    velocityY: 0,
  };
});

const OptimizedGradientBlur = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const frameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(true);

  // Blob positions for cohesion calculation
  const blobPositions = useRef<
    Array<{ x: number; y: number; vx: number; vy: number }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      willReadFrequently: false,
      desynchronized: true,
    });

    if (!ctx) return;

    // Performance optimized pixel ratio
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5);

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(pixelRatio, pixelRatio);
    };

    resizeCanvas();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 300);
    };

    window.addEventListener("resize", handleResize);

    // Animation setup - larger blobs, center-focused
    const baseSize = Math.min(window.innerWidth, window.innerHeight) * 1.1; // Increased
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Initialize blob positions at center
    blobPositions.current = precalculatedValues.map((_, i) => {
      const angle = (i * 2 * Math.PI) / precalculatedValues.length;
      const radius = baseSize * 0.2;
      return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: Math.cos(angle) * 0.5,
        vy: Math.sin(angle) * 0.5,
      };
    });

    // Cohesion parameters
    const cohesionRadius = baseSize * 0.4;
    const maxSpeed = 4.5;
    const damping = 0.98;

    // Frame rate control
    const targetFPS = 30; // Slightly higher for smoother cohesion
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      if (currentTime - lastTimeRef.current < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime =
        Math.min(currentTime - (lastTimeRef.current || currentTime), 100) /
        16.67;
      lastTimeRef.current = currentTime;
      frameRef.current += deltaTime * 1.2;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle background
      ctx.fillStyle = "rgba(2, 2, 8, 0.015)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.filter = "blur(35px)";

      // Calculate cohesion forces and update positions
      precalculatedValues.forEach((blob, i) => {
        const {
          // speed,
          offset,
          freqX,
          freqY,
          amp,
          cohesionStrength,
          separationRadius,
          snakeSegment,
          followDistance,
        } = blob;

        const t = frameRef.current * blob.speed;
        const pos = blobPositions.current[i];

        // Base movement from center with radial expansion
        const baseMovementX =
          Math.cos(t * freqX + offset) * (baseSize * amp) +
          Math.cos(frameRef.current * 0.003 + offset) * (baseSize * 0.3);
        const baseMovementY =
          Math.sin(t * freqY + offset) * (baseSize * amp) +
          Math.sin(frameRef.current * 0.003 + offset) * (baseSize * 0.3);

        // Snake-like following behavior
        let snakeForceX = 0;
        let snakeForceY = 0;
        if (snakeSegment > 0) {
          const leader = blobPositions.current[snakeSegment - 1];
          const dx = leader.x - pos.x;
          const dy = leader.y - pos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const targetDistance = baseSize * followDistance;

          if (distance > targetDistance) {
            const force = (distance - targetDistance) * 0.02;
            snakeForceX = (dx / distance) * force;
            snakeForceY = (dy / distance) * force;
          }
        }

        // Cohesion forces
        let cohesionX = 0;
        let cohesionY = 0;
        let separationX = 0;
        let separationY = 0;
        let neighborCount = 0;

        blobPositions.current.forEach((otherPos, j) => {
          if (i === j) return;

          const dx = otherPos.x - pos.x;
          const dy = otherPos.y - pos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < cohesionRadius && distance > 0) {
            // Cohesion - move towards neighbors
            cohesionX += dx;
            cohesionY += dy;
            neighborCount++;

            // Separation - avoid getting too close
            if (distance < baseSize * separationRadius) {
              const separationForce =
                (baseSize * separationRadius - distance) / distance;
              separationX -= dx * separationForce * 0.1;
              separationY -= dy * separationForce * 0.1;
            }
          }
        });

        if (neighborCount > 0) {
          cohesionX = (cohesionX / neighborCount) * cohesionStrength * 0.01;
          cohesionY = (cohesionY / neighborCount) * cohesionStrength * 0.01;
        }

        // Combine forces
        const targetX = centerX + baseMovementX;
        const targetY = centerY + baseMovementY;

        pos.vx +=
          (targetX - pos.x) * 0.012 + cohesionX + separationX + snakeForceX;
        pos.vy +=
          (targetY - pos.y) * 0.012 + cohesionY + separationY + snakeForceY;

        // Apply damping and speed limit
        pos.vx *= damping;
        pos.vy *= damping;

        const blobSpeed = Math.sqrt(pos.vx * pos.vx + pos.vy * pos.vy);
        if (blobSpeed > maxSpeed) {
          pos.vx = (pos.vx / blobSpeed) * maxSpeed;
          pos.vy = (pos.vy / blobSpeed) * maxSpeed;
        }

        // Update position
        pos.x += pos.vx;
        pos.y += pos.vy;
      });

      // Draw blobs with enhanced organic shapes
      precalculatedValues.forEach((blob, i) => {
        const {
          colorString,
          alpha,
          baseRadius,
          pulseSpeed,
          pulseAmp,
          amoebaFactor,
          amoebaSpeed,
          amoebaPhase,
        } = blob;

        const pos = blobPositions.current[i];
        const t = frameRef.current * pulseSpeed;

        // Enhanced pulsing with amoeba effect
        const pulseFactor =
          1 +
          Math.sin(t * 8) * pulseAmp +
          Math.cos(t * 12) * (pulseAmp * 0.6) +
          Math.sin(frameRef.current * amoebaSpeed + amoebaPhase) * amoebaFactor;

        const blobRadius = baseSize * baseRadius * pulseFactor;

        // Create gradient
        const gradient = ctx.createRadialGradient(
          pos.x,
          pos.y,
          0,
          pos.x,
          pos.y,
          blobRadius
        );
        gradient.addColorStop(0, `rgba(${colorString},${alpha})`);
        gradient.addColorStop(0.3, `rgba(${colorString},${alpha * 0.8})`);
        gradient.addColorStop(0.6, `rgba(${colorString},${alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(${colorString},0)`);

        // Draw organic shape
        ctx.beginPath();

        const distortion = 0.12;
        const steps = 16;
        const amoebaTime = frameRef.current * amoebaSpeed;

        for (let j = 0; j <= steps; j++) {
          const angle = (j / steps) * Math.PI * 2;

          // Enhanced amoeba distortion
          const distortFactor =
            1 +
            Math.sin(angle * 3 + t * 2) * distortion +
            Math.cos(angle * 5 + t * 1.5) * (distortion * 0.8) +
            Math.sin(angle * 4 + amoebaTime) *
              Math.cos(angle * 2 - amoebaTime * 0.8) *
              amoebaFactor *
              0.9;

          const px = pos.x + Math.cos(angle) * blobRadius * distortFactor;
          const py = pos.y + Math.sin(angle) * blobRadius * distortFactor;

          if (j === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }

        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      ctx.filter = "none";
      ctx.restore();

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Visibility API
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isVisible]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        filter: "blur(35px)",
        WebkitFilter: "blur(35px)",
        overflow: "hidden",
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

export default OptimizedGradientBlur;
