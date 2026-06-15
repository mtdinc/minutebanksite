import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ACTIVE_DOWNLOAD_URL } from '../lib/downloadLinks';

const navLinks = [
  { label: 'Features', target: 'features' },
  { label: 'How It Works', target: 'how-it-works' },
  { label: 'Platforms', target: 'platforms' },
  { label: 'Social', target: 'groups' },
  { label: 'Privacy', target: 'privacy' },
];

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (targetId: string) => {
    const section = document.getElementById(targetId);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-[border-color,box-shadow] duration-200 bg-[#f7f7f5] ${
        isScrolled
          ? 'border-b border-[#e0e0dd]/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
          : ''
      }`}
    >
      <div className="h-[60px] max-w-[1600px] mx-auto px-4 sm:px-6 xl:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="font-medium text-[16px] tracking-[0.12em] uppercase hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 rounded"
        >
          <span className="font-bold text-[#B85C3A]">Minute</span><span className="font-normal text-[#1a1a1a]">Bank</span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={(e) => { e.preventDefault(); scrollTo(link.target); }}
              className="font-normal text-[#71717a] text-[14px] hover:text-[#1a1a1a] transition-colors focus:outline-none focus-visible:text-[#1a1a1a] focus-visible:underline"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/help"
            className="font-normal text-[#71717a] text-[14px] hover:text-[#1a1a1a] transition-colors focus:outline-none focus-visible:text-[#1a1a1a] focus-visible:underline"
          >
            Help
          </Link>
          <a
            href={ACTIVE_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-1.5 bg-[#e87a55] text-white text-[13px] tracking-wide hover:bg-[#d06a48] transition-colors border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 no-underline inline-block"
          >
            Download
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#71717a] hover:text-[#1a1a1a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 rounded"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#f7f7f5]/95 backdrop-blur-md border-b border-[#e0e0dd]/60 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.target}
                  href={`#${link.target}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.target); }}
                  className="block py-3 px-3 text-[#71717a] text-[15px] hover:text-[#1a1a1a] hover:bg-[#e0e0dd]/30 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55]"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/help"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-3 text-[#71717a] text-[15px] hover:text-[#1a1a1a] hover:bg-[#e0e0dd]/30 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55]"
              >
                Help
              </Link>
              <a
                href={ACTIVE_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="block mt-2 mx-3 py-3 w-[calc(100%-24px)] text-center bg-[#e87a55] text-white text-[15px] tracking-wide hover:bg-[#d06a48] transition-colors border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 no-underline"
              >
                Download
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
