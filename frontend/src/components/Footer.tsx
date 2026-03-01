import { SiInstagram, SiLinkedin, SiBehance } from 'react-icons/si';
import { MapPin, Heart } from 'lucide-react';

const socialLinks = [
  { icon: SiInstagram, href: '#', label: 'Instagram' },
  { icon: SiBehance, href: '#', label: 'Behance' },
  { icon: SiLinkedin, href: '#', label: 'LinkedIn' },
];

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-ink text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-sky flex items-center justify-center">
                <span className="text-white font-black text-sm">S</span>
              </div>
              <span className="font-display font-black text-xl">
                Sulekha<span className="text-sky">.</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              A creative graphics designer who loves color and helping brands look professional.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-sky transition-colors duration-200 flex items-center justify-center"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-white/40 mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-white/60 hover:text-sky text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-white/40 mb-5">
              Get In Touch
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:sulekhasaho09865@gmail.com"
                className="block text-white/60 hover:text-sky text-sm transition-colors duration-200 break-all"
              >
                sulekhasaho09865@gmail.com
              </a>
              <div className="flex items-start gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-sky flex-shrink-0 mt-0.5" />
                <span>Pasarbindha, Balasore, Odisha</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Sulekha Sahoo. All rights reserved.
          </p>
          <p className="text-white/40 text-sm flex items-center gap-1.5">
            Built with <Heart className="w-3.5 h-3.5 text-sky fill-sky" /> using caffeine.ai
          </p>
        </div>
      </div>
    </footer>
  );
}
