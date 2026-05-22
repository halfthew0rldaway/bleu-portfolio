import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ABOUT', kana: '概要', href: '#about' },
    { name: 'WORKS', kana: '実績', href: '#works' },
    { name: 'GALLERY', kana: '画廊', href: '#gallery' },
    { name: 'CONTACT', kana: '連絡', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      // Find the element and scroll smoothly
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'py-4 bg-[#F4EFE6]/80 backdrop-blur-md border-b border-[#0B1220]/10 shadow-sm' : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Brand Logo */}
        <a href="#" className="group flex items-center gap-3">
          <div className="bg-[#0B1220] text-[#F4EFE6] px-3 py-1 text-sm font-mono tracking-tighter italic font-black skew-x-[-12deg] transition-all group-hover:bg-[#9E2A2B]">
            M98
          </div>
          <span className="font-display font-black italic tracking-tighter text-xl transition-colors group-hover:text-[#9E2A2B]">
            BLEU
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="relative group py-2"
            >
              <div className="flex flex-col items-center">
                <span className="font-display text-sm font-bold tracking-widest text-[#0B1220] transition-colors group-hover:text-[#9E2A2B]">
                  {link.name}
                </span>
                <span className="absolute -bottom-1 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[10px] font-mono text-[#D66A2C] translate-y-1 group-hover:translate-y-0">
                  {link.kana}
                </span>
              </div>
            </a>
          ))}
          
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="hidden lg:flex items-center gap-2 bg-[#0B1220] hover:bg-[#9E2A2B] text-[#F4EFE6] px-5 py-2 font-display text-xs font-bold tracking-widest transition-all skew-x-[-10deg] cursor-pointer"
          >
            <span className="skew-x-[10deg] flex items-center gap-1.5">
              LET'S BUILD <ArrowUpRight size={14} />
            </span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#0B1220] hover:text-[#9E2A2B] transition-colors p-1 cursor-pointer"
          id="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden w-full bg-[#F4EFE6] border-b border-[#0B1220]/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="flex justify-between items-center py-2 border-b border-[#0B1220]/5 group"
                >
                  <div className="flex gap-4 items-baseline">
                    <span className="font-display text-lg font-black tracking-wider text-[#0B1220] group-hover:text-[#9E2A2B]">
                      {link.name}
                    </span>
                    <span className="font-mono text-xs text-[#0B1220]/50 group-hover:text-[#D66A2C]">
                      // {link.kana}
                    </span>
                  </div>
                  <ArrowUpRight size={18} className="text-[#0B1220]/40 group-hover:text-[#9E2A2B] transition-colors" />
                </a>
              ))}
              
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="w-full text-center bg-[#0B1220] hover:bg-[#9E2A2B] text-[#F4EFE6] py-3.5 font-display text-sm font-bold tracking-widest transition-colors flex justify-center items-center gap-2"
              >
                LET'S BUILD <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
