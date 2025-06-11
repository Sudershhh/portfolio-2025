// import { useEffect, useRef, useState } from "react";

// const BLOB_CONFIG = [
//   {
//     color: { r: 0, g: 184, b: 255 },
//     alpha: 0.25,
//     baseRadius: 0.42, // Increased size
//     speed: 0.002,
//     offset: 0,
//     freqX: 1.1,
//     freqY: 0.8,
//     amp: 0.35,
//     pulseSpeed: 0.002,
//     pulseAmp: 0.12,
//     cohesionStrength: 0.3,
//     separationRadius: 0.8,
//   },
//   {
//     color: { r: 0, g: 120, b: 255 },
//     alpha: 0.22,
//     baseRadius: 0.38,
//     speed: 0.00175,
//     offset: Math.PI / 3,
//     freqX: 0.9,
//     freqY: 1.2,
//     amp: 0.32,
//     pulseSpeed: 0.0025,
//     pulseAmp: 0.1,
//     cohesionStrength: 0.35,
//     separationRadius: 0.75,
//   },
//   {
//     color: { r: 187, g: 107, b: 217 },
//     alpha: 0.18,
//     baseRadius: 0.4,
//     speed: 0.00225,
//     offset: (2 * Math.PI) / 3,
//     freqX: 1.4,
//     freqY: 0.7,
//     amp: 0.33,
//     pulseSpeed: 0.002,
//     pulseAmp: 0.14,
//     cohesionStrength: 0.28,
//     separationRadius: 0.85,
//   },
//   {
//     color: { r: 120, g: 86, b: 214 },
//     alpha: 0.24,
//     baseRadius: 0.35,
//     speed: 0.0025,
//     offset: Math.PI,
//     freqX: 1.0,
//     freqY: 1.6,
//     amp: 0.3,
//     pulseSpeed: 0.0028,
//     pulseAmp: 0.11,
//     cohesionStrength: 0.32,
//     separationRadius: 0.7,
//   },
//   {
//     color: { r: 60, g: 200, b: 255 },
//     alpha: 0.2,
//     baseRadius: 0.32,
//     speed: 0.003,
//     offset: (4 * Math.PI) / 3,
//     freqX: 1.7,
//     freqY: 0.9,
//     amp: 0.38,
//     pulseSpeed: 0.004,
//     pulseAmp: 0.16,
//     cohesionStrength: 0.25,
//     separationRadius: 0.9,
//   },
//   {
//     color: { r: 0, g: 150, b: 220 },
//     alpha: 0.16,
//     baseRadius: 0.46,
//     speed: 0.0035,
//     offset: (5 * Math.PI) / 3,
//     freqX: 1.3,
//     freqY: 1.8,
//     amp: 0.42,
//     pulseSpeed: 0.0035,
//     pulseAmp: 0.18,
//     cohesionStrength: 0.4,
//     separationRadius: 0.95,
//   },
//   {
//     color: { r: 140, g: 100, b: 230 },
//     alpha: 0.19,
//     baseRadius: 0.39,
//     speed: 0.004,
//     offset: Math.PI / 6,
//     freqX: 2.0,
//     freqY: 1.1,
//     amp: 0.4,
//     pulseSpeed: 0.0048,
//     pulseAmp: 0.15,
//     cohesionStrength: 0.33,
//     separationRadius: 0.8,
//   },
//   {
//     color: { r: 100, g: 70, b: 190 },
//     alpha: 0.17,
//     baseRadius: 0.43,
//     speed: 0.00375,
//     offset: Math.PI / 2,
//     freqX: 1.5,
//     freqY: 2.1,
//     amp: 0.44,
//     pulseSpeed: 0.0042,
//     pulseAmp: 0.2,
//     cohesionStrength: 0.37,
//     separationRadius: 1.0,
//   },
// ];

// // Pre-calculated values with cohesion system
// const precalculatedValues = BLOB_CONFIG.map((blob, index) => {
//   // const totalBlobs = BLOB_CONFIG.length;
//   // const angle = (index * 2 * Math.PI) / totalBlobs;

//   return {
//     ...blob,
//     colorString: `${blob.color.r},${blob.color.g},${blob.color.b}`,
//     // Snake-like movement parameters
//     snakeSegment: index,
//     followDistance: 0.15 + index * 0.05, // Each blob follows the previous
//     // Amoeba parameters
//     amoebaFactor: 0.18 + Math.random() * 0.12,
//     amoebaSpeed: 0.0017 + Math.random() * 0.002,
//     amoebaPhase: Math.random() * Math.PI * 2,
//     // Cohesion tracking
//     currentX: 0,
//     currentY: 0,
//     velocityX: 0,
//     velocityY: 0,
//   };
// });

// const OptimizedGradientBlur = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const animationRef = useRef<number>(0);
//   const frameRef = useRef<number>(0);
//   const lastTimeRef = useRef<number>(0);
//   const [isVisible, setIsVisible] = useState(true);

//   // Blob positions for cohesion calculation
//   const blobPositions = useRef<
//     Array<{ x: number; y: number; vx: number; vy: number }>
//   >([]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d", {
//       alpha: true,
//       willReadFrequently: false,
//       desynchronized: true,
//     });

//     if (!ctx) return;

//     // Performance optimized pixel ratio
//     const pixelRatio = Math.min(window.devicePixelRatio, 1.5);

//     const resizeCanvas = () => {
//       const width = window.innerWidth;
//       const height = window.innerHeight;

//       canvas.width = width * pixelRatio;
//       canvas.height = height * pixelRatio;
//       canvas.style.width = `${width}px`;
//       canvas.style.height = `${height}px`;

//       ctx.scale(pixelRatio, pixelRatio);
//     };

//     resizeCanvas();

//     let resizeTimeout: NodeJS.Timeout;
//     const handleResize = () => {
//       clearTimeout(resizeTimeout);
//       resizeTimeout = setTimeout(resizeCanvas, 300);
//     };

//     window.addEventListener("resize", handleResize);

//     // Animation setup - larger blobs, center-focused
//     const baseSize = Math.min(window.innerWidth, window.innerHeight) * 1.1; // Increased
//     const centerX = window.innerWidth / 2;
//     const centerY = window.innerHeight / 2;

//     // Initialize blob positions at center
//     blobPositions.current = precalculatedValues.map((_, i) => {
//       const angle = (i * 2 * Math.PI) / precalculatedValues.length;
//       const radius = baseSize * 0.2;
//       return {
//         x: centerX + Math.cos(angle) * radius,
//         y: centerY + Math.sin(angle) * radius,
//         vx: Math.cos(angle) * 0.5,
//         vy: Math.sin(angle) * 0.5,
//       };
//     });

//     // Cohesion parameters
//     const cohesionRadius = baseSize * 0.4;
//     const maxSpeed = 4.5;
//     const damping = 0.98;

//     // Frame rate control
//     const targetFPS = 30; // Slightly higher for smoother cohesion
//     const frameInterval = 1000 / targetFPS;

//     const animate = (currentTime: number) => {
//       if (!isVisible) {
//         animationRef.current = requestAnimationFrame(animate);
//         return;
//       }

//       if (currentTime - lastTimeRef.current < frameInterval) {
//         animationRef.current = requestAnimationFrame(animate);
//         return;
//       }

//       const deltaTime =
//         Math.min(currentTime - (lastTimeRef.current || currentTime), 100) /
//         16.67;
//       lastTimeRef.current = currentTime;
//       frameRef.current += deltaTime * 1.2;

//       // Clear canvas
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // Subtle background
//       ctx.fillStyle = "rgba(2, 2, 8, 0.015)";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       ctx.save();
//       ctx.globalCompositeOperation = "lighter";
//       ctx.filter = "blur(35px)";

//       // Calculate cohesion forces and update positions
//       precalculatedValues.forEach((blob, i) => {
//         const {
//           // speed,
//           offset,
//           freqX,
//           freqY,
//           amp,
//           cohesionStrength,
//           separationRadius,
//           snakeSegment,
//           followDistance,
//         } = blob;

//         const t = frameRef.current * blob.speed;
//         const pos = blobPositions.current[i];

//         // Base movement from center with radial expansion
//         const baseMovementX =
//           Math.cos(t * freqX + offset) * (baseSize * amp) +
//           Math.cos(frameRef.current * 0.003 + offset) * (baseSize * 0.3);
//         const baseMovementY =
//           Math.sin(t * freqY + offset) * (baseSize * amp) +
//           Math.sin(frameRef.current * 0.003 + offset) * (baseSize * 0.3);

//         // Snake-like following behavior
//         let snakeForceX = 0;
//         let snakeForceY = 0;
//         if (snakeSegment > 0) {
//           const leader = blobPositions.current[snakeSegment - 1];
//           const dx = leader.x - pos.x;
//           const dy = leader.y - pos.y;
//           const distance = Math.sqrt(dx * dx + dy * dy);
//           const targetDistance = baseSize * followDistance;

//           if (distance > targetDistance) {
//             const force = (distance - targetDistance) * 0.02;
//             snakeForceX = (dx / distance) * force;
//             snakeForceY = (dy / distance) * force;
//           }
//         }

//         // Cohesion forces
//         let cohesionX = 0;
//         let cohesionY = 0;
//         let separationX = 0;
//         let separationY = 0;
//         let neighborCount = 0;

//         blobPositions.current.forEach((otherPos, j) => {
//           if (i === j) return;

//           const dx = otherPos.x - pos.x;
//           const dy = otherPos.y - pos.y;
//           const distance = Math.sqrt(dx * dx + dy * dy);

//           if (distance < cohesionRadius && distance > 0) {
//             // Cohesion - move towards neighbors
//             cohesionX += dx;
//             cohesionY += dy;
//             neighborCount++;

//             // Separation - avoid getting too close
//             if (distance < baseSize * separationRadius) {
//               const separationForce =
//                 (baseSize * separationRadius - distance) / distance;
//               separationX -= dx * separationForce * 0.1;
//               separationY -= dy * separationForce * 0.1;
//             }
//           }
//         });

//         if (neighborCount > 0) {
//           cohesionX = (cohesionX / neighborCount) * cohesionStrength * 0.01;
//           cohesionY = (cohesionY / neighborCount) * cohesionStrength * 0.01;
//         }

//         // Combine forces
//         const targetX = centerX + baseMovementX;
//         const targetY = centerY + baseMovementY;

//         pos.vx +=
//           (targetX - pos.x) * 0.012 + cohesionX + separationX + snakeForceX;
//         pos.vy +=
//           (targetY - pos.y) * 0.012 + cohesionY + separationY + snakeForceY;

//         // Apply damping and speed limit
//         pos.vx *= damping;
//         pos.vy *= damping;

//         const blobSpeed = Math.sqrt(pos.vx * pos.vx + pos.vy * pos.vy);
//         if (blobSpeed > maxSpeed) {
//           pos.vx = (pos.vx / blobSpeed) * maxSpeed;
//           pos.vy = (pos.vy / blobSpeed) * maxSpeed;
//         }

//         // Update position
//         pos.x += pos.vx;
//         pos.y += pos.vy;
//       });

//       // Draw blobs with enhanced organic shapes
//       precalculatedValues.forEach((blob, i) => {
//         const {
//           colorString,
//           alpha,
//           baseRadius,
//           pulseSpeed,
//           pulseAmp,
//           amoebaFactor,
//           amoebaSpeed,
//           amoebaPhase,
//         } = blob;

//         const pos = blobPositions.current[i];
//         const t = frameRef.current * pulseSpeed;

//         // Enhanced pulsing with amoeba effect
//         const pulseFactor =
//           1 +
//           Math.sin(t * 8) * pulseAmp +
//           Math.cos(t * 12) * (pulseAmp * 0.6) +
//           Math.sin(frameRef.current * amoebaSpeed + amoebaPhase) * amoebaFactor;

//         const blobRadius = baseSize * baseRadius * pulseFactor;

//         // Create gradient
//         const gradient = ctx.createRadialGradient(
//           pos.x,
//           pos.y,
//           0,
//           pos.x,
//           pos.y,
//           blobRadius
//         );
//         gradient.addColorStop(0, `rgba(${colorString},${alpha})`);
//         gradient.addColorStop(0.3, `rgba(${colorString},${alpha * 0.8})`);
//         gradient.addColorStop(0.6, `rgba(${colorString},${alpha * 0.4})`);
//         gradient.addColorStop(1, `rgba(${colorString},0)`);

//         // Draw organic shape
//         ctx.beginPath();

//         const distortion = 0.12;
//         const steps = 16;
//         const amoebaTime = frameRef.current * amoebaSpeed;

//         for (let j = 0; j <= steps; j++) {
//           const angle = (j / steps) * Math.PI * 2;

//           // Enhanced amoeba distortion
//           const distortFactor =
//             1 +
//             Math.sin(angle * 3 + t * 2) * distortion +
//             Math.cos(angle * 5 + t * 1.5) * (distortion * 0.8) +
//             Math.sin(angle * 4 + amoebaTime) *
//               Math.cos(angle * 2 - amoebaTime * 0.8) *
//               amoebaFactor *
//               0.9;

//           const px = pos.x + Math.cos(angle) * blobRadius * distortFactor;
//           const py = pos.y + Math.sin(angle) * blobRadius * distortFactor;

//           if (j === 0) {
//             ctx.moveTo(px, py);
//           } else {
//             ctx.lineTo(px, py);
//           }
//         }

//         ctx.closePath();
//         ctx.fillStyle = gradient;
//         ctx.fill();
//       });

//       ctx.filter = "none";
//       ctx.restore();

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animationRef.current = requestAnimationFrame(animate);

//     // Visibility API
//     const handleVisibilityChange = () => {
//       setIsVisible(!document.hidden);
//     };
//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     return () => {
//       cancelAnimationFrame(animationRef.current);
//       window.removeEventListener("resize", handleResize);
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, [isVisible]);

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         filter: "blur(35px)",
//         WebkitFilter: "blur(35px)",
//         overflow: "hidden",
//         zIndex: 1,
//         pointerEvents: "none",
//       }}
//     >
//       <canvas
//         ref={canvasRef}
//         style={{
//           width: "100%",
//           height: "100%",
//           position: "absolute",
//           pointerEvents: "none",
//         }}
//       />
//     </div>
//   );
// };

// export default OptimizedGradientBlur;

import { useEffect, useRef, useCallback, useMemo } from "react";

// Fixed blob configuration with complex motion for more blobs
const BLOB_CONFIG = [
  {
    color: { r: 100, g: 220, b: 200 }, // Light Aqua Green
    alpha: 0.18,
    baseRadius: 0.32,
    speed: 0.0012,
    offset: 0,
    freqX: 1.3,
    freqY: 0.9,
    amp: 0.42,
    pulseSpeed: 0.003,
    pulseAmp: 0.15,
    complexMotion: true,
    harmonics: [
      { freq: 2.1, amp: 0.12, phase: 0 },
      { freq: 3.7, amp: 0.08, phase: Math.PI / 4 },
    ],
  },
  {
    color: { r: 120, g: 200, b: 255 }, // Light Blue
    alpha: 0.16,
    baseRadius: 0.28,
    speed: 0.0009,
    offset: Math.PI / 2,
    freqX: 0.7,
    freqY: 1.5,
    amp: 0.38,
    pulseSpeed: 0.004,
    pulseAmp: 0.12,
    complexMotion: true,
    harmonics: [
      { freq: 2.8, amp: 0.1, phase: Math.PI / 3 },
      { freq: 4.2, amp: 0.07, phase: Math.PI / 6 },
    ],
  },
  {
    color: { r: 187, g: 107, b: 217 }, // Purple
    alpha: 0.09,
    baseRadius: 0.3,
    speed: 0.0011,
    offset: Math.PI,
    freqX: 1.8,
    freqY: 0.8,
    amp: 0.4,
    pulseSpeed: 0.0025,
    pulseAmp: 0.18,
    complexMotion: true,
    harmonics: [
      { freq: 3.1, amp: 0.11, phase: Math.PI / 2 },
      { freq: 4.8, amp: 0.06, phase: Math.PI / 5 },
    ],
  },
  {
    color: { r: 120, g: 86, b: 214 }, // Purple
    alpha: 0.18,
    baseRadius: 0.25,
    speed: 0.0014,
    offset: (3 * Math.PI) / 2,
    freqX: 1.2,
    freqY: 1.9,
    amp: 0.35,
    pulseSpeed: 0.0035,
    pulseAmp: 0.14,
    complexMotion: true,
    harmonics: [
      { freq: 2.5, amp: 0.09, phase: Math.PI / 7 },
      { freq: 3.9, amp: 0.05, phase: Math.PI / 3 },
    ],
  },
  {
    color: { r: 150, g: 240, b: 220 }, // Light Aqua
    alpha: 0.14,
    baseRadius: 0.22,
    speed: 0.0016,
    offset: Math.PI / 4,
    freqX: 2.1,
    freqY: 1.1,
    amp: 0.45,
    pulseSpeed: 0.005,
    pulseAmp: 0.2,
    complexMotion: true,
    harmonics: [
      { freq: 3.3, amp: 0.13, phase: Math.PI / 8 },
      { freq: 5.1, amp: 0.08, phase: Math.PI / 4 },
    ],
  },
  {
    color: { r: 140, g: 100, b: 230 }, // Purple
    alpha: 0.13,
    baseRadius: 0.29,
    speed: 0.0022,
    offset: Math.PI / 3,
    freqX: 2.4,
    freqY: 1.4,
    amp: 0.48,
    pulseSpeed: 0.006,
    pulseAmp: 0.19,
    complexMotion: true,
    harmonics: [
      { freq: 2.7, amp: 0.1, phase: Math.PI / 6 },
      { freq: 4.5, amp: 0.07, phase: Math.PI / 2 },
    ],
  },
  {
    color: { r: 100, g: 70, b: 190 }, // Purple
    alpha: 0.11,
    baseRadius: 0.33,
    speed: 0.0019,
    offset: (5 * Math.PI) / 6,
    freqX: 1.9,
    freqY: 2.5,
    amp: 0.52,
    pulseSpeed: 0.0055,
    pulseAmp: 0.24,
    complexMotion: true,
    harmonics: [
      { freq: 3.6, amp: 0.12, phase: Math.PI / 9 },
      { freq: 5.4, amp: 0.08, phase: Math.PI / 3 },
    ],
  },
  {
    color: { r: 130, g: 220, b: 255 }, // Light Sky Blue
    alpha: 0.16,
    baseRadius: 0.27,
    speed: 0.0024,
    offset: (7 * Math.PI) / 8,
    freqX: 2.7,
    freqY: 1.7,
    amp: 0.55,
    pulseSpeed: 0.0065,
    pulseAmp: 0.21,
    complexMotion: true,
    harmonics: [
      { freq: 2.9, amp: 0.11, phase: Math.PI / 5 },
      { freq: 4.7, amp: 0.06, phase: Math.PI / 7 },
    ],
  },
  {
    color: { r: 110, g: 230, b: 200 }, // Light Turquoise
    alpha: 0.14,
    baseRadius: 0.31,
    speed: 0.0026,
    offset: (11 * Math.PI) / 12,
    freqX: 3.2,
    freqY: 2.3,
    amp: 0.47,
    pulseSpeed: 0.0075,
    pulseAmp: 0.23,
    complexMotion: true,
    harmonics: [
      { freq: 3.7, amp: 0.15, phase: 0 },
      { freq: 5.2, amp: 0.08, phase: Math.PI / 3 },
    ],
  },
  {
    color: { r: 150, g: 130, b: 255 }, // Periwinkle
    alpha: 0.18,
    baseRadius: 0.34,
    speed: 0.0021,
    offset: (4 * Math.PI) / 5,
    freqX: 2.9,
    freqY: 1.6,
    amp: 0.51,
    pulseSpeed: 0.0058,
    pulseAmp: 0.26,
    complexMotion: true,
    harmonics: [
      { freq: 4.3, amp: 0.12, phase: Math.PI / 6 },
      { freq: 6.1, amp: 0.07, phase: Math.PI / 2 },
    ],
  },
] as const;

// Pre-calculate constants to avoid repeated calculations
const CHAOS_FACTOR = 0.35; // Reduced for more controlled movement
const TURBULENCE = 0.25; // Reduced for more controlled movement
const WILDNESS = 0.3; // Reduced for more controlled movement
const TARGET_FPS = 60;
const FRAME_TIME = 1000 / TARGET_FPS;
const DISTORTION_STEPS = 32; // Increased for smoother circles
const DISTORTION_STEP_SIZE = (Math.PI * 2) / DISTORTION_STEPS;

// Pre-calculate color strings to avoid string concatenation in animation loop
const COLOR_CACHE = new Map<string, string[]>();

const getColorStops = (
  color: { r: number; g: number; b: number },
  alpha: number
) => {
  const key = `${color.r}-${color.g}-${color.b}-${alpha}`;
  if (!COLOR_CACHE.has(key)) {
    COLOR_CACHE.set(key, [
      `rgba(${color.r},${color.g},${color.b},${alpha})`,
      `rgba(${color.r},${color.g},${color.b},${alpha * 0.7})`,
      `rgba(${color.r},${color.g},${color.b},${alpha * 0.3})`,
      `rgba(${color.r},${color.g},${color.b},0)`,
    ]);
  }
  return COLOR_CACHE.get(key)!;
};

const OptimizedGradientBlur = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const dimensionsRef = useRef({
    width: 0,
    height: 0,
    baseSize: 0,
    centerX: 0,
    centerY: 0,
  });

  // Memoize blob calculations that don't change
  const blobCalculations = useMemo(() => {
    return BLOB_CONFIG.map((blob) => ({
      ...blob,
      colorStops: getColorStops(blob.color, blob.alpha),
      // Pre-calculate some frequently used values
      ampBaseSize: blob.amp,
      pulseSpeedTen: blob.pulseSpeed * 10,
      pulseSpeedFifteen: blob.pulseSpeed * 15,
      pulseSpeedTwentyFive: blob.pulseSpeed * 25,
    }));
  }, []);

  const updateDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const baseSize = Math.min(width, height) * 0.6; // Reduced from 0.9

    // Only update if dimensions actually changed
    if (
      dimensionsRef.current.width !== width ||
      dimensionsRef.current.height !== height
    ) {
      canvas.width = width;
      canvas.height = height;

      dimensionsRef.current = {
        width,
        height,
        baseSize,
        centerX: width / 2,
        centerY: height / 2,
      };
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });
    if (!ctx) return;

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    let frame = 0;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      const deltaTime = lastTime
        ? Math.min((currentTime - lastTime) / FRAME_TIME, 2)
        : 1;
      lastTime = currentTime;

      const { width, height, baseSize, centerX, centerY } =
        dimensionsRef.current;

      // Clear canvas with transparent background
      ctx.clearRect(0, 0, width, height);
      frame += deltaTime;

      // Set common canvas properties once
      ctx.globalCompositeOperation = "lighter";
      ctx.filter = "blur(80px)"; // Increased blur for softer effect

      // Render blobs with optimized calculations
      for (let i = 0; i < blobCalculations.length; i++) {
        const blob = blobCalculations[i];
        const t = frame * blob.speed;

        // Pre-calculate trigonometric values
        const tFreqX = t * blob.freqX + blob.offset;
        const tFreqY = t * blob.freqY + blob.offset;
        const tFreqXOffset = t * (blob.freqY + 0.3) + blob.offset;
        const tFreqYOffset = t * (blob.freqX + 0.2) + blob.offset;

        // Optimized chaotic movement calculations
        const chaosX = Math.sin(t * 2.1) * Math.cos(t * 1.7) * CHAOS_FACTOR;
        const chaosY = Math.cos(t * 1.9) * Math.sin(t * 2.3) * CHAOS_FACTOR;

        // Optimized turbulence calculations
        const turbX = Math.sin(t * 5.3) * Math.cos(t * 4.7) * TURBULENCE;
        const turbY = Math.cos(t * 4.9) * Math.sin(t * 5.5) * TURBULENCE;

        // Optimized wild factor calculations
        const wildX =
          Math.sin(t * 8.7) * Math.cos(t * 7.3) * Math.sin(t * 3.1) * WILDNESS;
        const wildY =
          Math.cos(t * 9.2) * Math.sin(t * 6.8) * Math.cos(t * 4.2) * WILDNESS;

        // Sophisticated motion for complex blobs
        let sophisticatedX = 0;
        let sophisticatedY = 0;

        if (blob.complexMotion && blob.harmonics) {
          // Optimized harmonic calculations
          for (let j = 0; j < blob.harmonics.length; j++) {
            const harmonic = blob.harmonics[j];
            const tFreqPhase = t * harmonic.freq + harmonic.phase;
            const harmAmpBaseSize = harmonic.amp * baseSize;

            sophisticatedX += Math.sin(tFreqPhase) * harmAmpBaseSize;
            sophisticatedY += Math.cos(tFreqPhase * 1.3) * harmAmpBaseSize;
          }

          // Optimized Lissajous patterns
          const lissajousAmp = 0.1 * baseSize; // Reduced from 0.15
          sophisticatedX +=
            Math.sin(t * 2.3 + blob.offset) * Math.cos(t * 1.7) * lissajousAmp;
          sophisticatedY +=
            Math.cos(t * 3.1 + blob.offset) * Math.sin(t * 2.5) * lissajousAmp;
        }

        // Calculate final position with controlled spread
        const baseSizeAmp = baseSize * blob.ampBaseSize;
        const spreadFactor = 1.2; // Reduced from 1.8 to prevent stretching

        const x =
          centerX +
          (Math.cos(tFreqX) * baseSizeAmp +
            Math.sin(tFreqXOffset) * (baseSizeAmp * 0.5) +
            (chaosX + turbX + wildX) * baseSize +
            sophisticatedX) *
            spreadFactor;

        const y =
          centerY +
          (Math.sin(tFreqY) * baseSizeAmp +
            Math.cos(tFreqYOffset) * (baseSizeAmp * 0.4) +
            (chaosY + turbY + wildY) * baseSize +
            sophisticatedY) *
            spreadFactor;

        // Optimized pulsing radius calculation
        let pulseFactor =
          1 +
          Math.sin(t * blob.pulseSpeedTen) * blob.pulseAmp +
          Math.cos(t * blob.pulseSpeedFifteen) * (blob.pulseAmp * 0.5);

        if (blob.complexMotion) {
          pulseFactor +=
            Math.sin(t * blob.pulseSpeedTwentyFive) * (blob.pulseAmp * 0.2);
        }

        const blobRadius = baseSize * blob.baseRadius * pulseFactor;

        // Create gradient with cached color stops
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, blobRadius);
        const colorStops = blob.colorStops;
        gradient.addColorStop(0, colorStops[0]);
        gradient.addColorStop(0.6, colorStops[1]);
        gradient.addColorStop(0.8, colorStops[2]);
        gradient.addColorStop(1, colorStops[3]);

        // Create proper circular path with controlled distortion
        ctx.beginPath();

        const distortion = 0.05; // Reduced distortion for more circular shapes

        for (let j = 0; j <= DISTORTION_STEPS; j++) {
          const angle = j * DISTORTION_STEP_SIZE;

          // Simplified distortion for better circular shapes
          let distortFactor = 1 + Math.sin(angle * 3 + t) * distortion;

          if (blob.complexMotion) {
            distortFactor += Math.sin(angle * 5 + t * 1.5) * (distortion * 0.3);
          }

          const cosAngle = Math.cos(angle);
          const sinAngle = Math.sin(angle);
          const radiusDistort = blobRadius * distortFactor;

          const px = x + cosAngle * radiusDistort;
          const py = y + sinAngle * radiusDistort;

          if (j === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }

        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      ctx.filter = "none";
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [blobCalculations, updateDimensions]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
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
