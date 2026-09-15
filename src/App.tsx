import React, { useState, useEffect } from 'react';
import { Navbar } from './components/navigation/Navbar.tsx';
import { Footer } from './components/navigation/Footer.tsx';
import { HeroSection } from './components/sections/HeroSection.tsx';
import { StatsSection } from './components/sections/StatsSection.tsx';
import { AboutSection } from './components/sections/AboutSection.tsx';
import { ProjectsSection } from './components/sections/ProjectsSection.tsx';
import { SkillsSection } from './components/sections/SkillsSection.tsx';
import { ServicesSection } from './components/sections/ServicesSection.tsx';
import { CertificatesSection } from './components/sections/CertificatesSection.tsx';
import { TechRadarSection } from './components/sections/TechRadarSection.tsx';
import { ContactSection } from './components/sections/ContactSection.tsx';
import { ProjectModal } from './components/projects/ProjectModal.tsx';
import { ResumeModal } from './components/modals/ResumeModal.tsx';
import { AdminDashboard } from './components/admin/AdminDashboard.tsx';
import { INITIAL_SITE_CONTENT, PROJECTS, CERTIFICATES } from './data/portfolioData.ts';
import { Project, SiteContent } from './types/index.ts';

export default function App() {
  const [content, setContent] = useState<SiteContent>(INITIAL_SITE_CONTENT);
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [contactProjectType, setContactProjectType] = useState<string | undefined>(undefined);

  // Load latest content and projects from persistent backend
  const loadData = async () => {
    try {
      const [contentRes, projectsRes] = await Promise.all([
        fetch('/api/content'),
        fetch('/api/projects')
      ]);

      if (contentRes.ok) {
        const contentData = await contentRes.json();
        setContent(contentData);
      }

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json();
        if (Array.isArray(projectsData) && projectsData.length > 0) {
          setProjects(projectsData);
        }
      }
    } catch (err) {
      console.warn('Using local fallback data while server initializes:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenContact = (projectType?: string) => {
    if (projectType) {
      setContactProjectType(projectType);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhotoUpdated = (photoUrl: string) => {
    setContent((prev) => ({ ...prev, profilePhotoUrl: photoUrl }));
  };

  return (
    <div className="min-h-screen bg-[#03151F] text-[#F5F7FA] selection:bg-[#28E58B] selection:text-[#03151F] relative">
      {/* Sticky Navigation */}
      <Navbar
        content={content}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => handleOpenContact()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <HeroSection
          content={content}
          onOpenContact={() => handleOpenContact()}
          onOpenResume={() => setIsResumeOpen(true)}
          onPhotoUpdated={handlePhotoUpdated}
        />

        <StatsSection />

        <AboutSection
          content={content}
          onOpenContact={() => handleOpenContact()}
        />

        <ProjectsSection
          projects={projects}
          onOpenCaseStudy={(proj) => setSelectedCaseStudy(proj)}
          onSelectProjectType={(type) => handleOpenContact(type)}
        />

        <SkillsSection />

        <ServicesSection
          onOpenContact={(type) => handleOpenContact(type)}
        />

        <CertificatesSection
          certificates={CERTIFICATES}
        />

        <TechRadarSection />

        <ContactSection
          content={content}
          initialProjectType={contactProjectType}
        />
      </main>

      {/* Footer */}
      <Footer
        content={content}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Modals */}
      <ProjectModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onDiscussProject={(projTitle) => handleOpenContact(`Project: ${projTitle}`)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onContentUpdated={(newContent) => setContent(newContent)}
        onProjectsUpdated={loadData}
      />
    </div>
  );
}
