export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'AI/ML' | 'Full-Stack' | 'Automation' | 'Systems';
  shortDescription: string;
  longDescription: string;
  problem: string;
  solution: string;
  architecture: string;
  technologies: string[];
  myRole: string;
  challenges: string;
  outcome: string;
  futureScope: string;
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  published: boolean;
  metrics?: { label: string; value: string }[];
  tags: string[];
  order: number;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  phone?: string;
  status: 'New' | 'Contacted' | 'In Discussion' | 'Converted' | 'Closed';
  isRead: boolean;
  isImportant: boolean;
  notes: { id: string; text: string; createdAt: string }[];
  ipAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuingOrganization: string;
  date: string;
  credentialUrl?: string;
  skillsVerified: string[];
  category: string;
}

export interface SiteContent {
  heroHeadline: string;
  heroSupportingLine: string;
  aboutHeadline: string;
  aboutText: string[];
  currentlyBuilding: string;
  resumeUrl: string;
  profilePhotoUrl: string;
  socials: {
    linkedin: string;
    github: string;
    email: string;
  };
}

export interface TechRadarItem {
  id: string;
  title: string;
  source: string;
  category: string;
  snippet: string;
  url: string;
  date: string;
}

export type SkillProficiency = 'Core' | 'Working Knowledge' | 'Currently Learning';

export interface SkillItem {
  name: string;
  level: SkillProficiency;
  icon?: string;
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: SkillItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: string;
  suggestedBudget: string;
  suggestedTimeline: string;
}
