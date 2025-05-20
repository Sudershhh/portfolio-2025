import { useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-6 px-4 md:px-8 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <div className="w-8 h-8 relative overflow-hidden">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path d="M22 8L16 2L10 8L16 14L22 8Z" fill="white" />
                <path d="M22 24L16 18L10 24L16 30L22 24Z" fill="white" />
              </svg>
            </div>
          </a>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#work"
            className="text-[rgb(230,230,230)] hover:text-white transition-colors text-sm leading-4 font-semibold"
          >
            Work
          </a>
          <a
            href="/experience"
            className="text-[rgb(230,230,230)] hover:text-white transition-colors text-sm leading-4 font-semibold"
          >
            Experience
          </a>
          <a
            href="/blog"
            className="text-[rgb(230,230,230)] hover:text-white transition-colors text-sm leading-4 font-semibold"
          >
            Blog
          </a>
          <a
            href="/faq"
            className="text-[rgb(230,230,230)] hover:text-white transition-colors text-sm leading-4 font-semibold"
          >
            FAQ
          </a>
          <Button className="ml-2 bg-transparent hover:bg-white/10 text-white rounded-full border border-white/20 px-6">
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
              href="/work"
              className="text-[rgb(230,230,230)] hover:text-white text-sm leading-4 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Work
            </a>
            <a
              href="/experience"
              className="text-[rgb(230,230,230)] hover:text-white text-sm leading-4 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </a>
            <a
              href="/blog"
              className="text-[rgb(230,230,230)] hover:text-white text-sm leading-4 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </a>
            <a
              href="/faq"
              className="text-[rgb(230,230,230)] hover:text-white text-sm leading-4 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </a>
            <Button className="mt-4 bg-transparent hover:bg-white/10 text-white rounded-full border border-white/20 px-6 py-2 text-lg">
              Get in Touch
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
