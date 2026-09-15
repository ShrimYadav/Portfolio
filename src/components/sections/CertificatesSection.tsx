import React from 'react';
import { Container } from '../ui/Container.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';
import { Certificate } from '../../types/index.ts';
import { Award, ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ certificates }) => {
  return (
    <section id="certificates" className="py-24 relative bg-[#071E2B]/40 border-t border-white/10">
      <Container size="lg">
        <SectionHeading
          category="Credentials &amp; Coursework"
          title="Verified Specializations &amp; Certificates"
          description="Structured coursework and technical milestones in Machine Learning, Python Systems, Full-Stack Architecture, and Cloud Fundamentals."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl bg-[#071E2B] border border-white/10 hover:border-white/20 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#28E58B]">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-[#9CA8B5] px-2.5 py-1 rounded-full bg-white/5">
                    {cert.date}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#F5F7FA] group-hover:text-white transition-colors">
                  {cert.name}
                </h3>
                <p className="text-xs font-mono text-[#3B82F6] mt-1 mb-4">
                  {cert.issuingOrganization}
                </p>

                {/* Skills Verified */}
                <div className="space-y-1.5 pt-3 border-t border-white/5">
                  <div className="text-[11px] font-mono text-[#9CA8B5] mb-2 uppercase">
                    Competencies Covered:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsVerified.map((s, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#F5F7FA] border border-white/5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#28E58B]" />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {cert.credentialUrl && (
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-[#9CA8B5] font-mono">
                    Credential Verified
                  </span>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-[#60A5FA] hover:text-white transition-colors"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
