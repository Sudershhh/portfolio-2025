import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CodeXml } from "lucide-react";
import { ContactModal } from "./ContactModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-6 px-4 md:px-8 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <div className="w-8 h-8 relative overflow-hidden">
              <CodeXml color="white" fill="white" width={32} height={32} />
            </div>
          </a>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#work"
            className="text-[rgb(230,230,230)] hover:text-white transition-colors text-base leading-4 font-semibold"
          >
            Work
          </a>
          <a
            href="#background"
            className="text-[rgb(230,230,230)] hover:text-white transition-colors text-base leading-4 font-semibold"
          >
            Background
          </a>
          <a
            href="#experience"
            className="text-[rgb(230,230,230)] hover:text-white transition-colors text-base leading-4 font-semibold"
          >
            Experience
          </a>

          <Button
            className="ml-2 bg-transparent hover:bg-white/10 text-white rounded-full border border-white/20 px-6"
            onClick={() => setIsContactModalOpen(true)}
          >
            Get in Touch
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
        <div className="md:hidden fixed inset-0 bg-black/95 z-40 pt-24">
          <nav className="flex flex-col items-center space-y-8 p-4">
            <a
              href="#work"
              className="text-[rgb(230,230,230)] hover:text-white text-sm leading-4 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Work
            </a>
            <a
              href="#background"
              className="text-[rgb(230,230,230)] hover:text-white text-sm leading-4 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Background
            </a>
            <a
              href="#experience"
              className="text-[rgb(230,230,230)] hover:text-white text-sm leading-4 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </a>

            <Button
              className="mt-4 bg-transparent hover:bg-white/10 text-white rounded-full border border-white/20 px-6 py-2 text-lg"
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
