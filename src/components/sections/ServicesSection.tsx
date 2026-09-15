import React from 'react';
import { Container } from '../ui/Container.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';
import { Button } from '../ui/Button.tsx';
import { SERVICES } from '../../data/portfolioData.ts';
import { Cpu, Globe, Bot, Rocket, Check, ArrowRight, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onOpenContact: (projectType?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#28E58B]" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-[#3B82F6]" />;
      case 'Bot':
        return <Bot className="w-6 h-6 text-[#7B35FF]" />;
      case 'Rocket':
        return <Rocket className="w-6 h-6 text-[#28E58B]" />;
      default:
        return <Cpu className="w-6 h-6 text-[#28E58B]" />;
    }
  };

  return (
    <section id="services" className="py-24 relative bg-[#03151F]">
      <Container size="lg">
        <SectionHeading
          category="Offerings &amp; Collaboration"
          title="What I Can Build"
          description="Available for select freelance engagements, contract engineering, and startup prototype sprints with realistic timelines and clean architecture."
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="p-7 sm:p-8 rounded-2xl bg-[#071E2B] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-105 transition-transform">
                    {getIcon(service.icon)}
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-[#9CA8B5] block">
                      Typical Scope
                    </span>
                    <span className="text-xs font-semibold text-[#F5F7FA]">
                      {service.suggestedTimeline}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#F5F7FA] tracking-tight">
                  {service.title}
                </h3>
                <p className="text-xs font-mono text-[#28E58B] mt-1 mb-3">
                  {service.tagline}
                </p>
                <p className="text-sm text-[#9CA8B5] leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2 mb-8 pt-4 border-t border-white/10">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#9CA8B5] block mb-2">
                    Key Deliverables
                  </span>
                  {service.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs text-[#F5F7FA]">
                      <Check className="w-3.5 h-3.5 text-[#28E58B] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-[#9CA8B5]">
                  Guide: {service.suggestedBudget}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onOpenContact(service.title)}
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  Discuss Project
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Freelance CTA Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#071E2B] via-[#0b2738] to-[#071E2B] border border-white/15 p-8 sm:p-12 overflow-hidden shadow-2xl">
          {/* Subtle Ambient light behind banner */}
          <div className="absolute top-0 right-1/4 w-96 h-48 bg-[#28E58B]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-48 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#28E58B] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COLLABORATION &amp; CONTRACTS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FA] tracking-tight">
              Have an idea worth building?
            </h3>
            <p className="mt-3 text-sm sm:text-base text-[#9CA8B5] leading-relaxed">
              Tell me what you're trying to build. I'll help turn the idea into a practical technical solution with clean code and no overpromising.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                variant="emerald"
                size="lg"
                onClick={() => onOpenContact('Full-Stack Application')}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Start a Conversation
              </Button>
              <span className="text-xs text-[#9CA8B5] font-mono">
                Average reply within 24 hours
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
