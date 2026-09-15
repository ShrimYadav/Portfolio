import React from 'react';
import { X, Download, Printer, GraduationCap, Code, Briefcase, Mail, Linkedin, Github } from 'lucide-react';
import { Button } from '../ui/Button.tsx';
import { RESUME_DATA } from '../../data/portfolioData.ts';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSimulatedPdf = () => {
    // Generate clean text-based / markdown export or triggers native print-to-pdf
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#03151F]/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#071E2B] border border-white/15 shadow-2xl shadow-black overflow-hidden my-auto">
        {/* Modal Header Actions */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#03151F]/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#28E58B]/10 text-[#28E58B] border border-[#28E58B]/20">
              TECHNICAL CV
            </span>
            <span className="text-sm font-bold text-[#F5F7FA]">
              Shrim Yadav — Resume
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="emerald"
              size="sm"
              onClick={handleDownloadSimulatedPdf}
              icon={<Download className="w-3.5 h-3.5" />}
            >
              Print / Save PDF
            </Button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#9CA8B5] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: High-End Printable Resume Layout */}
        <div className="overflow-y-auto p-6 sm:p-10 bg-white text-slate-900 font-sans print:p-0">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-6 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {RESUME_DATA.name}
              </h1>
              <p className="text-sm font-bold text-blue-700 tracking-wide uppercase mt-1">
                {RESUME_DATA.title}
              </p>
              <p className="text-xs text-slate-600 mt-1">
                {RESUME_DATA.education.degree}
              </p>
            </div>

            <div className="text-xs text-slate-600 space-y-1 sm:text-right font-mono">
              <div>Email: {RESUME_DATA.contact.email}</div>
              <div>LinkedIn: {RESUME_DATA.contact.linkedin}</div>
              <div>GitHub: {RESUME_DATA.contact.github}</div>
            </div>
          </div>

          {/* Technical Summary */}
          <div className="mb-6">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2 font-mono">
              Professional Profile &amp; Core Strengths
            </h2>
            <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
              {RESUME_DATA.technicalSummary.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2 font-mono">
              Education
            </h2>
            <div className="flex justify-between items-start text-xs">
              <div>
                <span className="font-bold text-slate-900">
                  {RESUME_DATA.education.degree}
                </span>
                <p className="text-slate-600">
                  Core coursework: Data Structures &amp; Algorithms, Operating Systems, Database Management, Artificial Intelligence
                </p>
              </div>
              <span className="font-mono text-slate-500 shrink-0 ml-4">
                Undergraduate
              </span>
            </div>
          </div>

          {/* Key Engineering Projects */}
          <div className="mb-6">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-3 font-mono">
              Selected Technical Projects
            </h2>
            <div className="space-y-4">
              {RESUME_DATA.projects.map((proj, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-slate-900 text-sm">
                      {proj.name}
                    </span>
                    <span className="font-mono text-[11px] text-blue-700">
                      {proj.tech}
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-slate-700 space-y-0.5">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2 font-mono">
              Technical Skillset
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div>
                <span className="font-bold text-slate-900">Languages:</span> Python, TypeScript, JavaScript, C++, SQL, HTML/CSS
              </div>
              <div>
                <span className="font-bold text-slate-900">AI / ML:</span> Multi-Agent Workflows, LLM APIs, LangGraph, Vector Search, Prompt Engineering
              </div>
              <div>
                <span className="font-bold text-slate-900">Full-Stack &amp; Frameworks:</span> React, Next.js, Node.js, Express, FastAPI, Tailwind CSS
              </div>
              <div>
                <span className="font-bold text-slate-900">Developer Tools:</span> Git, GitHub, Docker, VS Code, Google Colab, Postman, Linux CLI
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
