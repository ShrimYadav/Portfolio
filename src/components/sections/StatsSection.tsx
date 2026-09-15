import React from 'react';
import { Container } from '../ui/Container.tsx';
import { PERSONAL_STATS } from '../../data/portfolioData.ts';
import { GraduationCap, Sparkles, Layers, Terminal, Trophy, Clock } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    'CSE Student': <GraduationCap className="w-5 h-5 text-[#3B82F6]" />,
    'AI / ML Focus': <Sparkles className="w-5 h-5 text-[#28E58B]" />,
    'Full-Stack': <Layers className="w-5 h-5 text-[#7B35FF]" />,
    'Python Developer': <Terminal className="w-5 h-5 text-[#28E58B]" />,
    'Hackathon Builder': <Trophy className="w-5 h-5 text-[#3B82F6]" />,
    'Open to Work': <Clock className="w-5 h-5 text-[#28E58B]" />
  };

  return (
    <section className="py-12 border-y border-white/10 bg-[#071E2B]/40">
      <Container size="lg">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {PERSONAL_STATS.map((stat, idx) => {
            const icon = iconMap[stat.value] || <Terminal className="w-5 h-5 text-[#3B82F6]" />;
            return (
              <div
                key={idx}
                className="group relative p-4 rounded-xl bg-[#071E2B] border border-white/10 hover:border-white/20 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                    {icon}
                  </div>
                  <span className="text-[10px] font-mono text-[#9CA8B5] tracking-wider uppercase">
                    {stat.label.split(' ')[0]}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#F5F7FA] tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-[#9CA8B5] mt-1 leading-snug">
                    {stat.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
