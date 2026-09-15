import React, { useState } from 'react';
import { Container } from '../ui/Container.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';
import { ProjectCard } from '../projects/ProjectCard.tsx';
import { Project } from '../../types/index.ts';

interface ProjectsSectionProps {
  projects: Project[];
  onOpenCaseStudy: (project: Project) => void;
  onSelectProjectType?: (type: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onOpenCaseStudy,
  onSelectProjectType
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'AI/ML', 'Full-Stack', 'Systems'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative bg-[#03151F]">
      <Container size="lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            category="Selected Engineering Works"
            title="Production Software &amp; Intelligent Systems"
            description="High-craft personal and hackathon projects demonstrating end-to-end full-stack architecture, autonomous AI agents, and practical systems engineering."
            className="mb-0"
          />

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#071E2B] border border-white/10 shrink-0 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white/15 text-[#F5F7FA] font-bold shadow-xs'
                    : 'text-[#9CA8B5] hover:text-[#F5F7FA] hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenCaseStudy={onOpenCaseStudy}
              onSelectProjectType={onSelectProjectType}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
