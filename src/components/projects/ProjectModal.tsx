import React, { useState } from 'react';
import { Project } from '../../types/index.ts';
import { Badge } from '../ui/Badge.tsx';
import { Button } from '../ui/Button.tsx';
import {
  X,
  Github,
  ExternalLink,
  Cpu,
  Layers,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  Workflow,
  Play,
  RotateCcw
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onDiscussProject?: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onDiscussProject
}) => {
  const [activeTab, setActiveTab] = useState<'case-study' | 'technical-breakdown'>('case-study');
  
  // Interactive simulator state for BASTION
  const [simStep, setSimStep] = useState<number>(0);
  const [simRunning, setSimRunning] = useState<boolean>(false);

  if (!project) return null;

  const handleRunBastionSim = () => {
    setSimRunning(true);
    setSimStep(1);
    setTimeout(() => {
      setSimStep(2);
      setTimeout(() => {
        setSimStep(3);
        setSimRunning(false);
      }, 1200);
    }, 1200);
  };

  const handleResetSim = () => {
    setSimStep(0);
    setSimRunning(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#03151F]/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#071E2B] border border-white/15 shadow-2xl shadow-black overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#03151F]/70">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#28E58B]/10 text-[#28E58B] border border-[#28E58B]/20">
              {project.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] tracking-tight">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-[#03151F] p-1 rounded-xl border border-white/10 text-xs font-mono">
              <button
                onClick={() => setActiveTab('case-study')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'case-study'
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-[#9CA8B5] hover:text-white'
                }`}
              >
                Case Study
              </button>
              <button
                onClick={() => setActiveTab('technical-breakdown')}
                className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'technical-breakdown'
                    ? 'bg-[#3B82F6]/20 text-[#60A5FA] font-semibold'
                    : 'text-[#9CA8B5] hover:text-[#60A5FA]'
                }`}
              >
                <Workflow className="w-3.5 h-3.5" />
                Technical Breakdown
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#9CA8B5] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          {activeTab === 'case-study' ? (
            <>
              {/* Overview & Quick Metrics */}
              <div className="p-5 rounded-xl bg-[#03151F] border border-white/10">
                <p className="text-base sm:text-lg text-[#F5F7FA] leading-relaxed">
                  {project.longDescription}
                </p>
                {project.metrics && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
                    {project.metrics.map((m, idx) => (
                      <div key={idx}>
                        <div className="text-xs font-mono text-[#9CA8B5]">{m.label}</div>
                        <div className="text-sm font-bold text-[#28E58B] mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Problem & Why It Matters */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-mono text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span>THE PROBLEM &amp; WHY IT MATTERS</span>
                </div>
                <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/15 text-sm sm:text-base text-[#F5F7FA] leading-relaxed">
                  {project.problem}
                </div>
              </div>

              {/* Solution & Architecture */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-mono text-[#28E58B]">
                  <Lightbulb className="w-4 h-4" />
                  <span>THE SOLUTION &amp; SYSTEM ARCHITECTURE</span>
                </div>
                <div className="p-5 rounded-xl bg-[#03151F] border border-white/10 space-y-3 text-sm sm:text-base text-[#9CA8B5] leading-relaxed">
                  <p className="text-[#F5F7FA]">{project.solution}</p>
                  <p className="font-mono text-xs text-[#9CA8B5] bg-black/40 p-3 rounded-lg border border-white/5">
                    <span className="text-[#3B82F6]">Architecture Blueprint:</span> {project.architecture}
                  </p>
                </div>
              </div>

              {/* Technologies Used */}
              <div>
                <h4 className="text-xs font-mono text-[#9CA8B5] uppercase tracking-wider mb-3">
                  Technologies &amp; Libraries
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-[#03151F] text-xs font-mono text-[#F5F7FA] border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* My Role & Challenges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-[#03151F] border border-white/10">
                  <div className="text-xs font-mono text-[#60A5FA] mb-2 uppercase tracking-wide">
                    My Engineering Contribution
                  </div>
                  <p className="text-sm text-[#F5F7FA] leading-relaxed">
                    {project.myRole}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#03151F] border border-white/10">
                  <div className="text-xs font-mono text-red-400 mb-2 uppercase tracking-wide">
                    Core Technical Challenges
                  </div>
                  <p className="text-sm text-[#F5F7FA] leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
              </div>

              {/* Outcome & Future Scope */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#28E58B] mb-2 uppercase tracking-wide">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Demonstrated Outcome</span>
                  </div>
                  <p className="text-sm text-[#F5F7FA] leading-relaxed">
                    {project.outcome}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#03151F] border border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#C084FC] mb-2 uppercase tracking-wide">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Future Scope &amp; Roadmap</span>
                  </div>
                  <p className="text-sm text-[#9CA8B5] leading-relaxed">
                    {project.futureScope}
                  </p>
                </div>
              </div>
            </>
          ) : (
            /* Technical Breakdown / Interview Mode */
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20">
                <h4 className="text-sm font-bold text-[#60A5FA] mb-1">
                  Interview Mode: Technical Deep-Dive
                </h4>
                <p className="text-xs text-[#9CA8B5]">
                  Explains the trade-offs, architecture decisions, and system constraints evaluated during the build of {project.title}.
                </p>
              </div>

              {/* Special interactive breakdown for BASTION */}
              {project.slug === 'bastion' && (
                <div className="p-6 rounded-xl bg-[#03151F] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#F5F7FA]">
                        Multi-Agent Triangulation Loop
                      </h4>
                      <p className="text-xs text-[#9CA8B5] mt-0.5">
                        Interactive demonstration of Red Agent attack vector generation, Blue Agent mitigation, and Judge AI scoring.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="emerald"
                        size="sm"
                        onClick={handleRunBastionSim}
                        disabled={simRunning}
                        icon={<Play className="w-3.5 h-3.5" />}
                      >
                        {simRunning ? 'Simulating...' : 'Run Simulation'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleResetSim}
                        icon={<RotateCcw className="w-3.5 h-3.5" />}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>

                  {/* Simulator Steps */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {/* Step 1: Red Agent */}
                    <div className={`p-4 rounded-xl border transition-all ${
                      simStep >= 1
                        ? 'bg-red-500/10 border-red-500/40 text-red-300 shadow-md shadow-red-500/10'
                        : 'bg-black/40 border-white/10 text-[#9CA8B5]'
                    }`}>
                      <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                        <span>1. RED AGENT</span>
                        {simStep >= 1 && <span className="text-red-400">ACTIVE</span>}
                      </div>
                      <p className="text-xs leading-relaxed">
                        Simulates penetration vectors: AST parsing identifies unvalidated SQL/parameter injection attack surface.
                      </p>
                    </div>

                    {/* Step 2: Blue Agent */}
                    <div className={`p-4 rounded-xl border transition-all ${
                      simStep >= 2
                        ? 'bg-blue-500/10 border-blue-500/40 text-blue-300 shadow-md shadow-blue-500/10'
                        : 'bg-black/40 border-white/10 text-[#9CA8B5]'
                    }`}>
                      <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                        <span>2. BLUE AGENT</span>
                        {simStep >= 2 && <span className="text-blue-400">MITIGATED</span>}
                      </div>
                      <p className="text-xs leading-relaxed">
                        Synthesizes runtime rule modifications, parameter sanitization filters, and rate-limiting WAF boundaries.
                      </p>
                    </div>

                    {/* Step 3: Judge AI */}
                    <div className={`p-4 rounded-xl border transition-all ${
                      simStep >= 3
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-500/10'
                        : 'bg-black/40 border-white/10 text-[#9CA8B5]'
                    }`}>
                      <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                        <span>3. JUDGE AI</span>
                        {simStep >= 3 && <span className="text-[#28E58B]">CVSS 8.2 VERIFIED</span>}
                      </div>
                      <p className="text-xs leading-relaxed">
                        Validates exploit reproducibility, generates structured JSON vulnerability report, and signs test assertion.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Architectural Q&A for Technical Interviews */}
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-[#03151F] border border-white/10">
                  <h5 className="text-sm font-bold text-[#F5F7FA] mb-2">
                    Why choose this specific architecture?
                  </h5>
                  <p className="text-xs sm:text-sm text-[#9CA8B5] leading-relaxed">
                    Separating execution into decoupled agent roles prevents bias. In traditional monolithic prompts, the model attempts to both generate an exploit and validate it simultaneously, creating blind spots. By splitting responsibilities into distinct Red, Blue, and Judge graphs, we achieve independent validation with verifiable metrics.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#03151F] border border-white/10">
                  <h5 className="text-sm font-bold text-[#F5F7FA] mb-2">
                    Key Performance &amp; Safety Trade-offs
                  </h5>
                  <p className="text-xs sm:text-sm text-[#9CA8B5] leading-relaxed">
                    Running untrusted payloads requires rigid Docker container sandboxing with ephemeral networking and non-root execution. The trade-off was container spin-up latency (~1.2s per test) versus isolation safety; caching pre-warmed base images reduced this to sub-300ms.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#03151F]/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#9CA8B5] hover:text-white"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {onDiscussProject && (
              <Button
                variant="emerald"
                size="sm"
                onClick={() => {
                  onClose();
                  onDiscussProject(project.title);
                }}
              >
                Discuss Similar Project
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
