import React from 'react';
import { Container } from '../ui/Container.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';
import { SiteContent } from '../../types/index.ts';
import { Terminal, Brain, Layers, GitBranch, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  content: SiteContent;
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ content }) => {
  const ethosItems = [
    {
      icon: <Brain className="w-5 h-5 text-[#28E58B]" />,
      title: 'Applied AI Over Research Silos',
      description: 'Bridging experimental machine learning algorithms with reliable, containerized full-stack execution.'
    },
    {
      icon: <Layers className="w-5 h-5 text-[#3B82F6]" />,
      title: 'End-to-End System Thinking',
      description: 'Designing typed frontends, scalable REST/FastAPI backends, and structured database state models.'
    },
    {
      icon: <Zap className="w-5 h-5 text-[#7B35FF]" />,
      title: 'Practical Automation First',
      description: 'Eliminating repetitive human tasks through intelligent agents, web scrapers, and event pipelines.'
    },
    {
      icon: <GitBranch className="w-5 h-5 text-[#28E58B]" />,
      title: 'Hackathon-Tested Speed',
      description: 'Iterating rapidly under constraints, debugging methodically, and shipping functional MVPs.'
    }
  ];

  return (
    <section id="about" className="py-24 relative bg-[#03151F]">
      <Container size="lg">
        <SectionHeading
          category="Engineering Profile"
          title="Bridging AI Intelligence with Production Engineering"
          description={content.aboutHeadline || "I’m a Computer Science Engineering student focused on building intelligent software at the intersection of AI, automation and full-stack development."}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative Positioning */}
          <div className="lg:col-span-7 space-y-6 text-[#9CA8B5] text-base sm:text-lg leading-relaxed font-normal">
            {content.aboutText && content.aboutText.length > 0 ? (
              content.aboutText.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))
            ) : (
              <>
                <p>
                  I’m a Computer Science Engineering student focused on building intelligent software at the intersection of AI, automation and full-stack development.
                </p>
                <p>
                  Rather than treating machine learning as isolated notebooks, I focus on deploying AI into tangible, production-ready software tools. My work revolves around autonomous multi-agent workflows, FastAPI backends, typed React architectures, and high-performance graph algorithms.
                </p>
                <p>
                  I enjoy participating in competitive hackathons, solving algorithmic problems in Python and C++, building reliable full-stack applications, and crafting minimal, high-speed digital products.
                </p>
              </>
            )}

            {/* Technical Philosophy Quote */}
            <div className="p-5 rounded-xl bg-[#071E2B] border-l-4 border-[#28E58B] border-y border-r border-white/10 text-sm italic text-[#F5F7FA] font-mono">
              "Great software engineers don’t just train models — they architect the glue, data pipelines, security boundaries, and user interfaces that make models useful."
            </div>
          </div>

          {/* Right Column: Key Focus Areas Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {ethosItems.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#071E2B] border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="p-2 rounded-lg bg-white/5">{item.icon}</div>
                  <h3 className="text-sm font-bold text-[#F5F7FA]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-[#9CA8B5] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
