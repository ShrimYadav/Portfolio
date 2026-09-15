import React from 'react';
import { Container } from '../ui/Container.tsx';
import { Shield, Linkedin, Github, Mail, ArrowUp } from 'lucide-react';
import { SiteContent } from '../../types/index.ts';

interface FooterProps {
  content: SiteContent;
  onOpenAdmin: () => void;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  content,
  onOpenAdmin,
  onOpenResume
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#03151F] border-t border-white/10 py-12 text-[#9CA8B5]">
      <Container size="lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-[#F5F7FA] tracking-tight">
                SHRIM YADAV
              </span>
              <span className="text-xs font-mono text-[#28E58B] px-2 py-0.5 rounded bg-[#28E58B]/10 border border-[#28E58B]/20">
                PORTFOLIO
              </span>
            </div>
            <p className="text-xs text-[#9CA8B5] mt-1">
              Building intelligent software for the real world.
            </p>
          </div>

          {/* Quick Links & Socials */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-mono">
            <a
              href={content.socials?.linkedin || 'https://www.linkedin.com/in/shrim-yadav-479919403/'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>LinkedIn</span>
            </a>
            <a
              href={content.socials?.github || 'https://github.com/shrimyadav'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5 text-white" />
              <span>GitHub</span>
            </a>
            <a
              href={`mailto:${content.socials?.email || 'shrimyadav777@gmail.com'}`}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#28E58B]" />
              <span>Email</span>
            </a>
            <button
              onClick={onOpenResume}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Resume
            </button>
            <button
              onClick={onOpenAdmin}
              className="hover:text-[#28E58B] transition-colors flex items-center gap-1 cursor-pointer"
              title="Admin Portal"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-[#071E2B] border border-white/10 hover:border-white/20 text-[#9CA8B5] hover:text-white transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono gap-3 text-center sm:text-left">
          <div>
            &copy; 2026 Shrim Yadav. All rights reserved.
          </div>
          <div className="text-[11px] text-[#9CA8B5]/80">
            Crafted with React, TypeScript, Tailwind CSS &amp; Express
          </div>
        </div>
      </Container>
    </footer>
  );
};
