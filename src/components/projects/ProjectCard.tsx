import React from 'react';
import { Project } from '../../types/index.ts';
import { Badge } from '../ui/Badge.tsx';
import { Button } from '../ui/Button.tsx';
import { ArrowUpRight, Github, ExternalLink, Cpu, Terminal, Shield, Network, Activity } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
  onSelectProjectType?: (type: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenCaseStudy
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI/ML':
        return <Cpu className="w-4 h-4 text-[#28E58B]" />;
      case 'Systems':
        return <Network className="w-4 h-4 text-[#3B82F6]" />;
      case 'Full-Stack':
        return <Terminal className="w-4 h-4 text-[#7B35FF]" />;
      default:
        return <Activity className="w-4 h-4 text-[#28E58B]" />;
    }
  };

  const getVisualAccent = (slug: string) => {
    switch (slug) {
      case 'bastion':
        return {
          gradient: 'from-emerald-500/10 via-blue-500/5 to-transparent',
          borderHover: 'hover:border-[#28E58B]/50',
          accentColor: '#28E58B'
        };
      case 'neos':
        return {
          gradient: 'from-blue-500/10 via-purple-500/5 to-transparent',
          borderHover: 'hover:border-[#3B82F6]/50',
          accentColor: '#3B82F6'
        };
      case 'train-route-optimizer':
        return {
          gradient: 'from-purple-500/10 via-blue-500/5 to-transparent',
          borderHover: 'hover:border-[#7B35FF]/50',
          accentColor: '#7B35FF'
        };
      default:
        return {
          gradient: 'from-blue-500/10 via-emerald-500/5 to-transparent',
          borderHover: 'hover:border-white/30',
          accentColor: '#3B82F6'
        };
    }
  };

  const style = getVisualAccent(project.slug);

  return (
    <div
      className={`group relative rounded-2xl bg-[#071E2B] border border-white/10 ${style.borderHover} transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-black/60`}
    >
      {/* Background Accent Gradient */}
      <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${style.gradient} rounded-full blur-3xl pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity`} />

      <div className="p-6 sm:p-8 relative z-10">
        {/* Top bar: Category + Status */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-white/5 border border-white/10">
              {getCategoryIcon(project.category)}
            </span>
            <span className="text-xs font-mono font-medium tracking-wide text-[#9CA8B5] uppercase">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.featured && (
              <Badge variant="emerald" size="sm">
                FEATURED
              </Badge>
            )}
          </div>
        </div>

        {/* Project Title & Short Description */}
        <h3 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] group-hover:text-white transition-colors tracking-tight">
          {project.title}
        </h3>

        <p className="mt-3 text-sm text-[#9CA8B5] leading-relaxed line-clamp-3 font-normal">
          {project.shortDescription}
        </p>

        {/* Highlight Architecture / Core Feature Snapshot */}
        {project.slug === 'bastion' && (
          <div className="mt-5 p-3 rounded-xl bg-[#03151F] border border-white/10 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-1.5 text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Red Agent</span>
            </div>
            <span className="text-[#9CA8B5]">⟷</span>
            <div className="flex items-center gap-1.5 text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Blue Agent</span>
            </div>
            <span className="text-[#9CA8B5]">⟷</span>
            <div className="flex items-center gap-1.5 text-[#28E58B]">
              <span className="w-2 h-2 rounded-full bg-[#28E58B]" />
              <span>Judge AI</span>
            </div>
          </div>
        )}

        {project.slug === 'neos' && (
          <div className="mt-5 p-3 rounded-xl bg-[#03151F] border border-white/10 flex items-center justify-between text-xs font-mono text-[#9CA8B5]">
            <span>Raw Web Signals</span>
            <span className="text-[#28E58B]">➔ NLP Filtering ➔</span>
            <span className="text-[#60A5FA]">Actionable Leads</span>
          </div>
        )}

        {project.slug === 'train-route-optimizer' && (
          <div className="mt-5 p-3 rounded-xl bg-[#03151F] border border-white/10 flex items-center justify-between text-xs font-mono text-[#9CA8B5]">
            <span>Graph Nodes</span>
            <span className="text-[#C084FC]">➔ Lookahead Priority ➔</span>
            <span className="text-[#28E58B]">Zero Deadlocks</span>
          </div>
        )}

        {project.slug === 'city-pulse' && (
          <div className="mt-5 p-3 rounded-xl bg-[#03151F] border border-white/10 flex items-center justify-between text-xs font-mono text-[#9CA8B5]">
            <span>Civic Sensors</span>
            <span className="text-[#60A5FA]">➔ Rolling Z-Score ➔</span>
            <span className="text-amber-400">Anomaly Triage</span>
          </div>
        )}

        {/* Metrics Grid */}
        {project.metrics && (
          <div className="mt-5 grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
            {project.metrics.map((m, idx) => (
              <div key={idx}>
                <div className="text-[10px] font-mono text-[#9CA8B5] truncate">
                  {m.label}
                </div>
                <div className="text-xs font-semibold text-[#F5F7FA] truncate mt-0.5">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tech Badges */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/5 text-[#9CA8B5] border border-white/5"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-[#9CA8B5]">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 sm:px-8 sm:py-5 border-t border-white/10 bg-[#03151F]/60 flex items-center justify-between gap-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onOpenCaseStudy(project)}
          icon={<ArrowUpRight className="w-4 h-4 text-[#28E58B]" />}
          iconPosition="right"
          className="w-full sm:w-auto"
        >
          View Case Study
        </Button>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[#9CA8B5] hover:text-[#F5F7FA] hover:bg-white/5 transition-colors"
              title="View GitHub Repository"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
