import type { RefObject } from "react";

export const useScrollTo = () => {
  const scrollToSection = (ref: RefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return { scrollToSection };
};
