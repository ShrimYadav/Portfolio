import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button.tsx';

interface NavbarProps {
  onOpenContact: (projectType?: string) => void;
  onOpenAdmin: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenContact,
  onOpenAdmin,
  onOpenResume
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'projects', 'skills', 'services', 'certificates', 'radar', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Certificates', href: '#certificates', id: 'certificates' },
    { label: 'Tech Radar', href: '#radar', id: 'radar' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-[#03151F]/90 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/40'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="group flex items-center gap-2.5 focus:outline-none"
            aria-label="Shrim Yadav Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#071E2B] to-[#03151F] border border-[#28E58B]/40 flex items-center justify-center shadow-md shadow-[#28E58B]/10 group-hover:border-[#28E58B] transition-colors">
              <span className="text-xs font-mono font-bold tracking-wider text-[#28E58B]">SY</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-[#F5F7FA] group-hover:text-white transition-colors">
                SHRIM YADAV
              </span>
              <span className="text-[10px] font-mono text-[#9CA8B5] tracking-wide">
                AI + FULL-STACK
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#071E2B]/80 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-white/10 text-[#F5F7FA] font-semibold'
                      : 'text-[#9CA8B5] hover:text-[#F5F7FA] hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenResume}
              className="text-xs font-medium text-[#9CA8B5] hover:text-[#F5F7FA] px-2.5 py-1.5 transition-colors cursor-pointer"
            >
              Resume
            </button>

            <button
              onClick={onOpenAdmin}
              title="Admin Portal"
              className="p-2 rounded-lg text-[#9CA8B5] hover:text-[#28E58B] hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            <Button
              variant="emerald"
              size="sm"
              onClick={() => onOpenContact()}
              icon={<ArrowUpRight className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              Let's Talk
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="emerald"
              size="sm"
              onClick={() => onOpenContact()}
            >
              Let's Talk
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#9CA8B5] hover:text-white hover:bg-white/10 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#03151F]/95 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-8">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`text-lg font-medium py-2 px-4 rounded-xl transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#28E58B]/10 text-[#28E58B] font-semibold'
                    : 'text-[#9CA8B5] hover:text-[#F5F7FA] hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2.5 rounded-xl border border-white/15 text-sm font-medium text-[#F5F7FA] hover:bg-white/5"
            >
              View / Download Resume
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2 text-xs font-mono text-[#9CA8B5] hover:text-[#28E58B] flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Dashboard Portal</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
