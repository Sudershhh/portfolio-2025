import { useEffect } from "react";

type TextShineProps = {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
};

const KEYFRAMES_NAME = "text-shine-effect";

export function TextShine({
  children,
  duration = 4, // Faster animation for better effect
  className = "",
  style = {},
}: TextShineProps) {
  useEffect(() => {
    const styles = `
      @keyframes ${KEYFRAMES_NAME} {
        to {
          background-position: 200% center;
        }
      }
      
      .text-shine {
        padding: 0.4rem 1rem;
        border-radius: 2rem;
        background: black;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: all 0.2s ease;
      }

      .text-shine:hover {
        background: rgb(39, 39, 42);
        border-color: rgba(82, 82, 91, 0.4);
        transform: translateY(-1px);
      }

      .shine-text {
        background: linear-gradient(
          90deg,
          #888 0%,
          #eee 25%,
          #fff 50%,
          #eee 75%,
          #888 100%
        );
        background-size: 200% auto;
        color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        animation: ${KEYFRAMES_NAME} ${duration}s linear infinite;
      }
    `;

    if (!document.getElementById(KEYFRAMES_NAME)) {
      const styleElement = document.createElement("style");
      styleElement.id = KEYFRAMES_NAME;
      styleElement.innerHTML = styles;
      document.head.appendChild(styleElement);
    }

    return () => {
      const existingStyle = document.getElementById(KEYFRAMES_NAME);
      if (
        existingStyle &&
        document.querySelectorAll(".text-shine").length === 1
      ) {
        existingStyle.remove();
      }
    };
  }, [duration]);

  return (
    <span
      className={`text-shine border-1 border-neutral-600 ${className}`.trim()}
      style={{
        display: "inline-block",
        ...style,
      }}
    >
      <span className="shine-text text-xl font-medium">{children}</span>
    </span>
  );
}
