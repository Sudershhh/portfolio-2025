import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CodeXml } from "lucide-react";
import { ContactModal } from "./ContactModal";
import { WaveButton } from "@/components/ui/WaveButton";
import { useScrollTo } from "@/lib/useScrollTo";
import type { SectionRefs } from "@/types/section";

interface HeaderProps {
  sectionRefs: SectionRefs;
}

const Header = ({ sectionRefs }: HeaderProps) => {
  const { scrollToSection } = useScrollTo();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // Set default to true
  const [scrolled, setScrolled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    // Create audio element with the correct public path
    audioRef.current = new Audio("/ambience.mp3");
    audioRef.current.loop = true;

    // Don't autoplay immediately, wait for user interaction
    setIsPlaying(false);

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[2000] py-3 px-3 md:py-4 md:px-6 transition-colors duration-200 
      ${scrolled ? "bg-black/20 backdrop-blur-md" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <div className="w-6 h-6 md:w-7 md:h-7 relative overflow-hidden">
              <CodeXml color="white" fill="white" width="100%" height="100%" />
            </div>
          </a>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => scrollToSection(sectionRefs.workRef)}
            className="text-[rgb(230,230,230)] cursor-pointer hover:text-white transition-colors text-base leading-4 font-medium"
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection(sectionRefs.backgroundRef)}
            className="text-[rgb(230,230,230)] cursor-pointer hover:text-white transition-colors text-base leading-4 font-medium"
          >
            Background
          </button>
          <button
            onClick={() => scrollToSection(sectionRefs.experienceRef)}
            className="text-[rgb(230,230,230)] cursor-pointer hover:text-white transition-colors text-base leading-4 font-medium"
          >
            Experience
          </button>

          <Button
            className="ml-1 cursor-pointer bg-transparent hover:bg-white/10 text-white rounded-full border border-white/20 px-3 py-1 text-xs"
            onClick={() => setIsContactModalOpen(true)}
          >
            Get in Touch
          </Button>

          <WaveButton isPlaying={isPlaying} onClick={toggleSound} />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-1.5 relative z-[70]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-200 ease-in-out"
            style={{ transform: isMenuOpen ? "rotate(90deg)" : "none" }}
          >
            <path
              d={
                isMenuOpen ? "M18 6L6 18M6 6L18 18" : "M4 6H20M4 12H20M4 18H20"
              }
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 z-[65] pt-16">
          <nav className="flex flex-col items-center space-y-5 p-4">
            <button
              className="text-[rgb(230,230,230)] hover:text-white text-sm leading-4 font-medium"
              onClick={() => {
                scrollToSection(sectionRefs.workRef);
                setIsMenuOpen(false);
              }}
            >
              Work
            </button>
            <button
              className="text-[rgb(230,230,230)] hover:text-white text-sm leading-4 font-medium"
              onClick={() => {
                scrollToSection(sectionRefs.backgroundRef);
                setIsMenuOpen(false);
              }}
            >
              Background
            </button>
            <button
              className="text-[rgb(230,230,230)] hover:text-white text-sm leading-4 font-medium"
              onClick={() => {
                scrollToSection(sectionRefs.experienceRef);
                setIsMenuOpen(false);
              }}
            >
              Experience
            </button>

            <Button
              className="mt-2 bg-transparent hover:bg-white/10 text-white rounded-full border border-white/20 px-4 py-1.5 text-sm"
              onClick={() => {
                setIsMenuOpen(false);
                setIsContactModalOpen(true);
              }}
            >
              Get in Touch
            </Button>
          </nav>
        </div>
      )}

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </header>
  );
};

export default Header;
