import React, { useState } from 'react';
import { Container } from '../ui/Container.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';
import { Badge } from '../ui/Badge.tsx';
import { SKILL_GROUPS } from '../../data/portfolioData.ts';
import { Code, Brain, Server, Wrench, CheckCircle, BookOpen, Compass } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [filterLevel, setFilterLevel] = useState<string>('All');

  const categoryIcons: Record<string, React.ReactNode> = {
    'Programming Languages': <Code className="w-5 h-5 text-[#3B82F6]" />,
    'AI / Machine Learning': <Brain className="w-5 h-5 text-[#28E58B]" />,
    'Full-Stack & Backend': <Server className="w-5 h-5 text-[#7B35FF]" />,
    'Tools & Development Ecosystem': <Wrench className="w-5 h-5 text-[#60A5FA]" />
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Core':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#28E58B]/10 text-[#28E58B] border border-[#28E58B]/25">
            <CheckCircle className="w-3 h-3" />
            Core
          </span>
        );
      case 'Working Knowledge':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/25">
            <Compass className="w-3 h-3" />
            Working Knowledge
          </span>
        );
      case 'Currently Learning':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#7B35FF]/10 text-[#C084FC] border border-[#7B35FF]/25">
            <BookOpen className="w-3 h-3" />
            Exploring
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-[#071E2B]/50 border-t border-white/10">
      <Container size="lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            category="Technical Capabilities"
            title="Modern Skill Matrix &amp; Proficiency"
            description="Truthful technical breakdown categorized by verified project application rather than arbitrary percentage bars."
            className="mb-0"
          />

          {/* Proficiency legend pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#03151F] border border-white/10 text-xs font-mono">
            <button
              onClick={() => setFilterLevel('All')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                filterLevel === 'All' ? 'bg-white/15 text-white font-bold' : 'text-[#9CA8B5] hover:text-white'
              }`}
            >
              All Skills
            </button>
            <button
              onClick={() => setFilterLevel('Core')}
              className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                filterLevel === 'Core' ? 'bg-[#28E58B]/20 text-[#28E58B] font-bold' : 'text-[#9CA8B5] hover:text-[#28E58B]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#28E58B]" />
              Core
            </button>
            <button
              onClick={() => setFilterLevel('Working Knowledge')}
              className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                filterLevel === 'Working Knowledge' ? 'bg-[#3B82F6]/20 text-[#60A5FA] font-bold' : 'text-[#9CA8B5] hover:text-[#60A5FA]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
              Working Knowledge
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_GROUPS.map((group, idx) => {
            const visibleSkills = filterLevel === 'All'
              ? group.skills
              : group.skills.filter((s) => s.level === filterLevel);

            if (visibleSkills.length === 0) return null;

            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-[#071E2B] border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                      {categoryIcons[group.category] || <Code className="w-5 h-5 text-[#3B82F6]" />}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#F5F7FA]">
                        {group.category}
                      </h3>
                      <p className="text-xs text-[#9CA8B5] font-normal">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="mt-6 divide-y divide-white/5">
                    {visibleSkills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="py-3 flex items-center justify-between gap-4 group"
                      >
                        <span className="text-sm font-medium text-[#F5F7FA] group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                        {getLevelBadge(skill.level)}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[#9CA8B5]">
                  Applied in live applications &amp; open-source repositories
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
