// import { useEffect, useRef } from "react";

// const BLOB_CONFIG = [
//   {
//     color: { r: 0, g: 184, b: 255 }, // Ocean Blue 1
//     alpha: 0.55,
//     radius: 0.32,
//     speed: 0.0007,
//     offset: 0,
//     freqX: 1.1,
//     freqY: 0.9,
//     amp: 0.32,
//   },
//   {
//     color: { r: 0, g: 120, b: 255 }, // Ocean Blue 2
//     alpha: 0.48,
//     radius: 0.28,
//     speed: 0.0005,
//     offset: Math.PI / 2,
//     freqX: 0.7,
//     freqY: 1.3,
//     amp: 0.28,
//   },
//   {
//     color: { r: 187, g: 107, b: 217 }, // Hollow Purple 1
//     alpha: 0.52,
//     radius: 0.3,
//     speed: 0.0006,
//     offset: Math.PI,
//     freqX: 1.5,
//     freqY: 0.8,
//     amp: 0.3,
//   },
//   {
//     color: { r: 120, g: 86, b: 214 }, // Hollow Purple 2
//     alpha: 0.45,
//     radius: 0.25,
//     speed: 0.0008,
//     offset: (3 * Math.PI) / 2,
//     freqX: 1.2,
//     freqY: 1.7,
//     amp: 0.25,
//   },
// ];

// const GradientBlur = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     // Set canvas size
//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);

//     // Animation variables
//     const baseSize = Math.min(window.innerWidth, window.innerHeight) * 0.85;
//     const centerX = () => canvas.width / 2;
//     const centerY = () => canvas.height / 2;

//     let frame = 0;
//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       frame++;
//       BLOB_CONFIG.forEach(
//         ({ color, alpha, radius, speed, offset, freqX, freqY, amp }) => {
//           // Haphazard, smooth movement using unique sine/cosine formulas
//           const t = frame * speed;
//           const x =
//             centerX() +
//             Math.cos(t * freqX + offset) * (baseSize * amp) +
//             Math.sin(t * (freqY + 0.3) + offset) * (baseSize * amp * 0.3);
//           const y =
//             centerY() +
//             Math.sin(t * freqY + offset) * (baseSize * amp) +
//             Math.cos(t * (freqX + 0.2) + offset) * (baseSize * amp * 0.2);
//           const blobRadius = baseSize * radius;

//           // Create radial gradient for each blob
//           const gradient = ctx.createRadialGradient(x, y, 0, x, y, blobRadius);
//           gradient.addColorStop(
//             0,
//             `rgba(${color.r},${color.g},${color.b},${alpha})`
//           );
//           gradient.addColorStop(1, `rgba(${color.r},${color.g},${color.b},0)`);

//           ctx.save();
//           ctx.globalCompositeOperation = "lighter";
//           ctx.filter = "blur(80px)";
//           ctx.beginPath();
//           ctx.arc(x, y, blobRadius, 0, 2 * Math.PI);
//           ctx.closePath();
//           ctx.fillStyle = gradient;
//           ctx.fill();
//           ctx.filter = "none";
//           ctx.restore();
//         }
//       );
//       requestAnimationFrame(animate);
//     };
//     animate();
//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//     };
//   }, []);

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         width: "85%",
//         height: "480px",
//         filter: "blur(80px)",
//         WebkitFilter: "blur(80px)",
//         overflow: "visible",
//         flex: "none",
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

// export default GradientBlur;

"use client";

import { useEffect, useRef } from "react";

// Replace the BLOB_CONFIG array with this enhanced version that has increased opacity and 3 additional blobs
const BLOB_CONFIG = [
  // Original blobs with increased opacity
  {
    color: { r: 0, g: 184, b: 255 }, // Ocean Blue 1
    alpha: 0.15, // Increased opacity
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
    alpha: 0.12, // Increased opacity
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
    alpha: 0.12, // Increased opacity
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
    alpha: 0.25, // Increased opacity
    baseRadius: 0.25,
    speed: 0.0014,
    offset: (3 * Math.PI) / 2,
    freqX: 1.2,
    freqY: 1.9,
    amp: 0.35,
    pulseSpeed: 0.0035,
    pulseAmp: 0.14,
  },
  // Additional blobs with increased opacity
  {
    color: { r: 60, g: 200, b: 255 }, // Bright Cyan
    alpha: 0.2, // Increased opacity
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
    color: { r: 0, g: 150, b: 220 }, // Medium Blue
    alpha: 0.12, // Increased opacity
    baseRadius: 0.36,
    speed: 0.0018,
    offset: Math.PI / 6,
    freqX: 1.6,
    freqY: 2.2,
    amp: 0.5,
    pulseSpeed: 0.0045,
    pulseAmp: 0.22,
  },
  {
    color: { r: 140, g: 100, b: 230 }, // Lavender
    alpha: 0.18, // Increased opacity
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
    alpha: 0.15, // Increased opacity
    baseRadius: 0.33,
    speed: 0.0019,
    offset: (5 * Math.PI) / 6,
    freqX: 1.9,
    freqY: 2.5,
    amp: 0.52,
    pulseSpeed: 0.0055,
    pulseAmp: 0.24,
  },
  {
    color: { r: 30, g: 160, b: 240 }, // Sky Blue
    alpha: 0.23, // Increased opacity
    baseRadius: 0.27,
    speed: 0.0024,
    offset: (7 * Math.PI) / 8,
    freqX: 2.7,
    freqY: 1.7,
    amp: 0.55,
    pulseSpeed: 0.0065,
    pulseAmp: 0.21,
  },
  // Three new sophisticated blobs
  {
    color: { r: 80, g: 210, b: 235 }, // Turquoise
    alpha: 0.2,
    baseRadius: 0.31,
    speed: 0.0026,
    offset: (11 * Math.PI) / 12,
    freqX: 3.2,
    freqY: 2.3,
    amp: 0.47,
    pulseSpeed: 0.0075,
    pulseAmp: 0.23,
    // Unique sophisticated motion parameters
    complexMotion: true,
    harmonics: [
      { freq: 3.7, amp: 0.15, phase: 0 },
      { freq: 5.2, amp: 0.08, phase: Math.PI / 3 },
    ],
  },
  {
    color: { r: 150, g: 130, b: 255 }, // Periwinkle
    alpha: 0.26,
    baseRadius: 0.34,
    speed: 0.0021,
    offset: (4 * Math.PI) / 5,
    freqX: 2.9,
    freqY: 1.6,
    amp: 0.51,
    pulseSpeed: 0.0058,
    pulseAmp: 0.26,
    // Unique sophisticated motion parameters
    complexMotion: true,
    harmonics: [
      { freq: 4.3, amp: 0.12, phase: Math.PI / 6 },
      { freq: 6.1, amp: 0.07, phase: Math.PI / 2 },
    ],
  },
  {
    color: { r: 70, g: 90, b: 230 }, // Royal Blue
    alpha: 0.29,
    baseRadius: 0.26,
    speed: 0.0023,
    offset: (2 * Math.PI) / 7,
    freqX: 3.5,
    freqY: 2.8,
    amp: 0.53,
    pulseSpeed: 0.0068,
    pulseAmp: 0.25,
    // Unique sophisticated motion parameters
    complexMotion: true,
    harmonics: [
      { freq: 5.6, amp: 0.14, phase: Math.PI / 4 },
      { freq: 7.2, amp: 0.09, phase: (3 * Math.PI) / 4 },
    ],
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
    const baseSize = Math.min(window.innerWidth, window.innerHeight) * 0.9;
    const centerX = () => canvas.width / 2;
    const centerY = () => canvas.height / 2;

    // Increased chaos factors for more unpredictable motion
    const chaosFactor = 0.35; // Increased from 0.15
    const turbulence = 0.2; // Increased from 0.08
    const wildness = 0.4; // New factor for even more randomness

    let frame = 0;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      // Calculate delta time for smoother animations across different devices
      const deltaTime = lastTime ? (currentTime - lastTime) / 16.67 : 1; // Normalize to ~60fps
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame += deltaTime;

      // Create a subtle background gradient
      const bgGradient = ctx.createRadialGradient(
        centerX(),
        centerY(),
        0,
        centerX(),
        centerY(),
        baseSize * 1.2
      );
      bgGradient.addColorStop(0, "rgba(10, 10, 30, 0.05)");
      bgGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // In the animate function, replace the BLOB_CONFIG.forEach loop with this enhanced version
      // that handles the sophisticated motion for the new blobs

      // Find the BLOB_CONFIG.forEach loop in the animate function and replace it with this:
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
          complexMotion,
          harmonics,
        } = blob;

        const t = frame * speed;

        // Enhanced chaotic movement with more complex patterns
        const chaosX = Math.sin(t * 2.1) * Math.cos(t * 1.7) * chaosFactor;
        const chaosY = Math.cos(t * 1.9) * Math.sin(t * 2.3) * chaosFactor;

        // Increased turbulence with higher frequency oscillations
        const turbX = Math.sin(t * 5.3) * Math.cos(t * 4.7) * turbulence;
        const turbY = Math.cos(t * 4.9) * Math.sin(t * 5.5) * turbulence;

        // Wild factor for unpredictable movement
        const wildX =
          Math.sin(t * 8.7) * Math.cos(t * 7.3) * Math.sin(t * 3.1) * wildness;
        const wildY =
          Math.cos(t * 9.2) * Math.sin(t * 6.8) * Math.cos(t * 4.2) * wildness;

        // Additional sophisticated motion for new blobs
        let sophisticatedX = 0;
        let sophisticatedY = 0;

        if (complexMotion && harmonics) {
          // Apply harmonic series for more sophisticated motion
          harmonics.forEach(({ freq, amp: harmAmp, phase }) => {
            sophisticatedX += Math.sin(t * freq + phase) * harmAmp * baseSize;
            sophisticatedY +=
              Math.cos(t * freq + phase * 1.3) * harmAmp * baseSize;
          });

          // Add Lissajous patterns for complex orbital motion
          const lissajousX =
            Math.sin(t * 2.3 + offset) * Math.cos(t * 1.7) * 0.15 * baseSize;
          const lissajousY =
            Math.cos(t * 3.1 + offset) * Math.sin(t * 2.5) * 0.15 * baseSize;

          sophisticatedX += lissajousX;
          sophisticatedY += lissajousY;
        }

        // Complex movement pattern with increased craziness
        const x =
          centerX() +
          Math.cos(t * freqX + offset) * (baseSize * amp) +
          Math.sin(t * (freqY + 0.3) + offset) * (baseSize * amp * 0.5) +
          chaosX * baseSize +
          turbX * baseSize +
          wildX * baseSize +
          sophisticatedX;

        const y =
          centerY() +
          Math.sin(t * freqY + offset) * (baseSize * amp) +
          Math.cos(t * (freqX + 0.2) + offset) * (baseSize * amp * 0.4) +
          chaosY * baseSize +
          turbY * baseSize +
          wildY * baseSize +
          sophisticatedY;

        // More dramatic pulsing radius effect with additional harmonics
        let pulseFactor =
          1 +
          Math.sin(t * pulseSpeed * 10) * pulseAmp +
          Math.cos(t * pulseSpeed * 15) * (pulseAmp * 0.5);

        // Add subtle higher frequency pulsing for more organic feel
        if (complexMotion) {
          pulseFactor += Math.sin(t * pulseSpeed * 25) * (pulseAmp * 0.2);
        }

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

        // Use more distorted circle for more organic feel
        const distortion = complexMotion ? 0.1 : 0.08; // More distortion for complex blobs
        const steps = 36;

        for (let i = 0; i <= steps; i++) {
          const angle = (i / steps) * Math.PI * 2;

          // More complex distortion for sophisticated blobs
          let distortFactor =
            1 +
            Math.sin(angle * 3 + t) * distortion +
            Math.cos(angle * 5 + t * 1.5) * (distortion * 0.7);

          if (complexMotion) {
            // Add higher frequency distortions for more organic shape
            distortFactor +=
              Math.sin(angle * 7 + t * 2.3) * (distortion * 0.4) +
              Math.cos(angle * 9 + t * 3.1) * (distortion * 0.3);
          }

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

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

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
        width: "95%",
        height: "560px",
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
