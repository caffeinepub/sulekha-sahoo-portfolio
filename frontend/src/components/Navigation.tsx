import { useState, useEffect } from 'react';
import { Menu, X, Palette } from 'lucide-react';

const NAV_HEIGHT = 64; // px — matches h-16

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-sky-100' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('#home')}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-full bg-sky flex items-center justify-center">
            <Palette className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-lg text-ink tracking-tight">
            Sulekha<span className="text-sky">.</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-ink/70 hover:text-sky transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-sky rounded-full transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA Desktop */}
        <button
          onClick={() => handleNavClick('#contact')}
          className="hidden md:inline-flex items-center px-5 py-2 rounded-full bg-sky text-white text-sm font-semibold hover:bg-sky-dark transition-colors duration-200 shadow-sky-sm"
        >
          Hire Me
        </button>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-ink hover:bg-sky/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        } bg-white/98 backdrop-blur-md border-b border-sky-100`}
      >
        <ul className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left py-3 px-4 rounded-xl text-sm font-medium text-ink/80 hover:text-sky hover:bg-sky/5 transition-colors duration-200"
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="pt-2">
            <button
              onClick={() => handleNavClick('#contact')}
              className="w-full py-3 rounded-full bg-sky text-white text-sm font-semibold hover:bg-sky-dark transition-colors"
            >
              Hire Me
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
