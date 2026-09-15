import React, { useRef } from 'react';
import { ArrowRight, Download, Terminal, Sparkles, Code2, Cpu, Shield, Upload } from 'lucide-react';
import { Button } from '../ui/Button.tsx';
import { Badge } from '../ui/Badge.tsx';
import { Container } from '../ui/Container.tsx';
import { SiteContent } from '../../types/index.ts';

interface HeroSectionProps {
  content: SiteContent;
  onOpenContact: () => void;
  onOpenResume: () => void;
  onUpdatePhoto?: (url: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  content,
  onOpenContact,
  onOpenResume,
  onUpdatePhoto
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdatePhoto) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUpdatePhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#3B82F6]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-[#28E58B]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[250px] bg-[#7B35FF]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle background tech grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#F5F7FA 1px, transparent 1px), linear-gradient(90deg, #F5F7FA 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <Container size="lg" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Personal Positioning & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#071E2B] border border-[#28E58B]/30 shadow-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#28E58B] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#28E58B]" />
              </span>
              <span className="text-xs font-medium text-[#F5F7FA]">
                {content.currentlyBuilding || 'Currently building AI-powered software'}
              </span>
            </div>

            {/* Engineer Identity & Subhead */}
            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono tracking-widest text-[#28E58B] uppercase">
                  Shrim Yadav
                </span>
                <span className="text-xs text-[#9CA8B5]">•</span>
                <span className="text-xs font-mono text-[#9CA8B5]">
                  BTech CSE • Python • AI/ML • Full-Stack
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F5F7FA] leading-[1.1]">
                {content.heroHeadline || 'Building Intelligent Digital Products.'}
              </h1>
            </div>

            {/* Supporting Line */}
            <p className="text-base sm:text-lg text-[#9CA8B5] max-w-2xl leading-relaxed mb-8 font-normal">
              {content.heroSupportingLine ||
                'AI/ML + Full-Stack Developer building practical software, intelligent automation and modern digital experiences.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <Button
                variant="emerald"
                size="lg"
                onClick={() => handleScrollTo('projects')}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                View My Work
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={onOpenContact}
              >
                Let's Work Together
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onOpenResume}
                icon={<Download className="w-4 h-4" />}
              >
                Download Resume
              </Button>
            </div>

            {/* Truthful Technical Pillars */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 w-full max-w-xl">
              <div>
                <div className="text-xs font-mono text-[#9CA8B5] mb-1">FOUNDATION</div>
                <div className="text-sm font-bold text-[#F5F7FA]">CSE Student</div>
                <div className="text-[11px] text-[#9CA8B5]">CS &amp; Algorithms</div>
              </div>
              <div>
                <div className="text-xs font-mono text-[#28E58B] mb-1">CORE STACK</div>
                <div className="text-sm font-bold text-[#F5F7FA]">Python &amp; React</div>
                <div className="text-[11px] text-[#9CA8B5]">TypeScript &amp; FastAPI</div>
              </div>
              <div>
                <div className="text-xs font-mono text-[#60A5FA] mb-1">SPECIALIZATION</div>
                <div className="text-sm font-bold text-[#F5F7FA]">AI Agents &amp; RAG</div>
                <div className="text-[11px] text-[#9CA8B5]">Automation Systems</div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Portrait Frame & Technical Shell */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px]">
              {/* Outer decorative ambient glow ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#28E58B]/30 via-[#3B82F6]/30 to-[#7B35FF]/20 blur-xl opacity-70" />

              {/* Main Card Enclosure */}
              <div className="relative rounded-2xl bg-[#071E2B] border border-white/15 p-4 sm:p-5 shadow-2xl shadow-black/80 backdrop-blur-xl">
                {/* Header bar with terminal-style controls */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="text-[11px] font-mono text-[#9CA8B5] flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-[#28E58B]" />
                    <span>engineer.shrim_yadav</span>
                  </div>
                  <Badge variant="emerald" size="sm">ONLINE</Badge>
                </div>

                {/* Portrait Display Area */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-b from-[#0c2a3d] to-[#03151F] border border-white/10 flex flex-col items-center justify-center group">
                  {content.profilePhotoUrl ? (
                    <img
                      src={content.profilePhotoUrl}
                      alt="Shrim Yadav"
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full p-6 flex flex-col items-center justify-between text-center relative">
                      {/* Geometric Holographic Backdrop */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,229,139,0.12),transparent_70%)]" />

                      {/* Top technical tag */}
                      <div className="relative z-10 w-full flex justify-between items-center text-[10px] font-mono text-[#9CA8B5]">
                        <span>ROLE: SWE // AI</span>
                        <span>LOC: IN</span>
                      </div>

                      {/* Center Emblem / Stylized Portrait Presentation */}
                      <div className="relative z-10 my-auto flex flex-col items-center">
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-tr from-[#03151F] to-[#071E2B] border-2 border-[#28E58B]/50 flex items-center justify-center shadow-2xl shadow-[#28E58B]/20">
                          <span className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-[#F5F7FA] font-mono">
                            SY
                          </span>
                          {/* Corner accent reticles */}
                          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#28E58B]" />
                          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#28E58B]" />
                          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#28E58B]" />
                          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#28E58B]" />
                        </div>

                        <div className="mt-4 text-center">
                          <p className="text-base font-bold text-[#F5F7FA]">Shrim Yadav</p>
                          <p className="text-xs text-[#9CA8B5] font-mono mt-0.5">
                            AI + Full-Stack Developer
                          </p>
                        </div>
                      </div>

                      {/* Bottom Technical Status */}
                      <div className="relative z-10 w-full text-center">
                        <p className="text-[11px] text-[#9CA8B5] italic">
                          "Building practical software at the intersection of AI and modern web architectures."
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Photo Customizer / Upload Overlay */}
                  <div className="absolute inset-0 bg-[#03151F]/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                    <p className="text-xs font-mono text-[#F5F7FA] mb-2 text-center">
                      Upload your professional portrait photo:
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      variant="emerald"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      icon={<Upload className="w-3.5 h-3.5" />}
                    >
                      Select Photo File
                    </Button>
                    <span className="text-[10px] text-[#9CA8B5] mt-2">
                      JPEG, PNG, WebP supported
                    </span>
                  </div>
                </div>

                {/* Bottom Hardware & Status Badges */}
                <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-[#9CA8B5]">
                    <Cpu className="w-3.5 h-3.5 text-[#28E58B]" />
                    <span>Python 3.12+ // TS 5</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#9CA8B5] justify-end">
                    <Code2 className="w-3.5 h-3.5 text-[#3B82F6]" />
                    <span>Agent Systems</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
