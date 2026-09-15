import fs from 'fs';
import path from 'path';

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
  relevanceScore?: number;
}

export interface DatabaseSchema {
  projects: Project[];
  messages: ContactMessage[];
  certificates: Certificate[];
  siteContent: SiteContent;
  analytics: {
    pageViews: number;
    projectViews: Record<string, number>;
    inquiriesCount: number;
    lastViewedAt: string;
  };
  radarCache: {
    timestamp: number;
    items: TechRadarItem[];
  };
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-bastion',
    title: 'BASTION',
    slug: 'bastion',
    category: 'AI/ML',
    shortDescription: 'Autonomous AI-driven cybersecurity penetration testing platform simulating offensive and defensive workflows with multi-agent orchestration.',
    longDescription: 'BASTION creates a rigorous, isolated simulation environment where specialized autonomous LLM agents stress-test web applications, discover zero-day vulnerability attack vectors, and formulate immediate defensive patches.',
    problem: 'Modern web applications suffer from slow vulnerability remediation cycles. Manual penetration testing is expensive, infrequent, and cannot keep pace with continuous continuous integration / continuous deployment releases.',
    solution: 'Engineered an asynchronous multi-agent architecture where a Red Agent actively generates targeted penetration vectors, a Blue Agent simulates real-time defense adaptations, and a neutral Judge AI rates vulnerability severity according to CVSS criteria.',
    architecture: 'Micro-orchestrated agent loop utilizing state graphs. Red Agent isolates entry points, generates injection payloads; Blue Agent validates WAF rules and sandbox constraints; Judge AI validates proof-of-concept exploits and outputs structured remediation advisories.',
    technologies: ['Python', 'FastAPI', 'Multi-Agent Systems', 'LangGraph', 'Docker Sandboxing', 'React', 'TypeScript', 'Tailwind CSS'],
    myRole: 'Lead Architect & Developer — Designed the multi-agent decision cycle, prompt verification pipelines, and web telemetry interface.',
    challenges: 'Preventing hallucinated exploits and constraining LLM execution strictly within sandboxed Docker containers without leaking network sockets.',
    outcome: 'Demonstrated 68% faster vulnerability discovery in sample microservice topologies with 0 false-positive sandbox escapes in testing bench.',
    futureScope: 'Integrating automated PR creation for automated patching and static taint-analysis AST integration.',
    githubUrl: 'https://github.com/shrimyadav/bastion-ai-security',
    liveUrl: 'https://github.com/shrimyadav/bastion-ai-security',
    featured: true,
    published: true,
    metrics: [
      { label: 'Agent Roles', value: '3 (Red, Blue, Judge)' },
      { label: 'Sandbox Isolation', value: 'Docker Containerized' },
      { label: 'Triage Accuracy', value: '94% CVSS Alignment' }
    ],
    tags: ['AI Agents', 'Cybersecurity', 'Python', 'FastAPI', 'Docker'],
    order: 1,
    createdAt: '2025-11-10T10:00:00Z'
  },
  {
    id: 'proj-neos',
    title: 'NEOS',
    slug: 'neos',
    category: 'AI/ML',
    shortDescription: 'AI-powered opportunity and lead discovery platform that parses unstructured tech signals into prioritized actionable opportunities.',
    longDescription: 'NEOS scans unstructured developer ecosystems, social signals, open hackathons, grants, internship boards, and research lab updates to discover high-value opportunities before they reach saturated public boards.',
    problem: 'High-impact hackathons, student research grants, early-stage internships, and freelance tech leads are scattered across fragmented feeds, making timely discovery difficult and manual search tedious.',
    solution: 'Built an automated asynchronous data ingestion pipeline with text embedding filtering, relevance scoring, and semantic deduplication to deliver a daily intelligence stream of prioritized technical opportunities.',
    architecture: 'Distributed scrapers feed raw unstructured markdown to a semantic filtering worker. High-confidence opportunities are classified using vector embeddings and indexed with real-time alert triggers.',
    technologies: ['Python', 'AsyncIO', 'Vector Search', 'FastAPI', 'Node.js', 'React', 'Tailwind CSS'],
    myRole: 'Full-Stack Developer — Built the signal ingestion scrapers, similarity ranking logic, and modern dashboard.',
    challenges: 'Handling noisy markdown structures across varied platforms and optimizing embedding cache hits to minimize computational overhead.',
    outcome: 'Curates verified high-signal developer opportunities with sub-second semantic retrieval and intelligent matching filters.',
    futureScope: 'Adding automated resume-matching and custom webhook notifications for Discord/Slack channels.',
    githubUrl: 'https://github.com/shrimyadav/neos-opportunity-engine',
    liveUrl: 'https://github.com/shrimyadav/neos-opportunity-engine',
    featured: true,
    published: true,
    metrics: [
      { label: 'Signal Sources', value: '8+ Live Feeds' },
      { label: 'Filter Latency', value: '<250ms' },
      { label: 'Deduplication', value: 'Cosine Similarity' }
    ],
    tags: ['AI Discovery', 'NLP', 'Python', 'Full-Stack', 'Vector Search'],
    order: 2,
    createdAt: '2025-12-01T14:30:00Z'
  },
  {
    id: 'proj-railway',
    title: 'Train Route & Railway Optimization',
    slug: 'train-route-optimizer',
    category: 'Systems',
    shortDescription: 'Algorithmic transit routing and bottleneck simulation engine modeling rail congestion, delay propagation, and track scheduling.',
    longDescription: 'A practical systems project addressing railway transit scheduling complexities. Simulates train route conflicts, junction delays, and dynamic station dwell times to optimize track utilization across multi-node railway corridors.',
    problem: 'Single-track and junction bottlenecks cascade delays across regional railway networks, causing compounding transit disruptions and erratic schedule drift.',
    solution: 'Implemented dynamic priority routing algorithms based on weighted graph search (Dijkstra and A* variations) with lookahead conflict arbitration to minimize total passenger waiting hours.',
    architecture: 'Graph-based network representation of stations and tracks with discrete event simulation step engine. Interactive browser visualization plots train positions, junction states, and speed profiles.',
    technologies: ['Python', 'NetworkX', 'Algorithms', 'TypeScript', 'HTML5 Canvas', 'Tailwind CSS'],
    myRole: 'Core Algorithm & System Designer — Formulated priority queuing model and visual simulation canvas.',
    challenges: 'Preventing deadlock scenarios where bidirectional single-line trains meet head-to-head at passing sidings.',
    outcome: 'Demonstrated simulated 22% reduction in compounding schedule delays under simulated peak rush hour constraints.',
    futureScope: 'Integrating live open transit GTFS real-time feeds and genetic algorithm timetable generation.',
    githubUrl: 'https://github.com/shrimyadav/railway-transit-optimizer',
    liveUrl: 'https://github.com/shrimyadav/railway-transit-optimizer',
    featured: true,
    published: true,
    metrics: [
      { label: 'Graph Model', value: 'Weighted Directed Graph' },
      { label: 'Delay Reduction', value: '22% Peak Efficiency' },
      { label: 'Deadlock Safety', value: 'Lookahead Reservation' }
    ],
    tags: ['Algorithms', 'Python', 'Systems', 'Simulation', 'Graph Theory'],
    order: 3,
    createdAt: '2025-09-18T08:00:00Z'
  },
  {
    id: 'proj-citypulse',
    title: 'City Pulse',
    slug: 'city-pulse',
    category: 'Full-Stack',
    shortDescription: 'Real-time urban infrastructure telemetry and anomaly detection dashboard tracking municipal transit, traffic, and civic sensor alerts.',
    longDescription: 'City Pulse aggregates municipal data streams into a centralized command center, detecting sudden traffic density spikes, emergency transit deviations, and environmental anomalies in real-time.',
    problem: 'Civic authorities and urban commuters lack unified visibility across isolated transit, traffic, and public service monitoring systems during civic events and peak disturbances.',
    solution: 'Engineered a streaming dashboard featuring geo-spatial heatmap clustering, anomaly detection alerts, and an intuitive low-latency operator interface.',
    architecture: 'Simulated multi-source telemetry stream feeding an in-memory aggregation buffer. Outliers exceeding moving window standard deviations trigger visual and audio incident badges.',
    technologies: ['TypeScript', 'React', 'Node.js', 'Express', 'Tailwind CSS', 'Lucide Icons'],
    myRole: 'Full-Stack Engineer — Built data stream processing, responsive UI layouts, and anomaly triage workflow.',
    challenges: 'Rendering rapid real-time updates smoothly in browser without degrading frame rates or triggering excessive re-renders.',
    outcome: 'Lightweight, ultra-responsive dashboard capable of monitoring dozens of concurrent sensor nodes with zero UI lag.',
    futureScope: 'Predictive congestion forecasting using historical weather and temporal neural networks.',
    githubUrl: 'https://github.com/shrimyadav/city-pulse-urban-telemetry',
    liveUrl: 'https://github.com/shrimyadav/city-pulse-urban-telemetry',
    featured: true,
    published: true,
    metrics: [
      { label: 'Stream Processing', value: 'Real-Time Telemetry' },
      { label: 'Render Budget', value: '60 FPS Target' },
      { label: 'Anomaly Heuristic', value: 'Rolling Z-Score' }
    ],
    tags: ['Full-Stack', 'Real-Time', 'TypeScript', 'Data Visualization', 'UI/UX'],
    order: 4,
    createdAt: '2025-08-05T12:00:00Z'
  }
];

const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-python-ai',
    name: 'Python for AI & Development',
    issuingOrganization: 'IBM / Coursera',
    date: '2025',
    credentialUrl: 'https://coursera.org/verify',
    skillsVerified: ['Python', 'Object-Oriented Programming', 'REST APIs', 'Data Structures'],
    category: 'Programming & AI'
  },
  {
    id: 'cert-ml-foundations',
    name: 'Machine Learning Specialization',
    issuingOrganization: 'DeepLearning.AI',
    date: '2025',
    credentialUrl: 'https://coursera.org/verify',
    skillsVerified: ['Supervised Learning', 'Neural Networks', 'Model Evaluation', 'Feature Engineering'],
    category: 'AI / ML'
  },
  {
    id: 'cert-fullstack-dev',
    name: 'Modern Full-Stack Web Development',
    issuingOrganization: 'Meta Professional Certifications',
    date: '2024',
    credentialUrl: 'https://coursera.org/verify',
    skillsVerified: ['React', 'JavaScript/TypeScript', 'State Management', 'Responsive Architecture'],
    category: 'Full-Stack'
  },
  {
    id: 'cert-cloud-systems',
    name: 'Cloud Computing & Distributed Fundamentals',
    issuingOrganization: 'AWS Academy / Google Cloud',
    date: '2024',
    credentialUrl: 'https://aws.amazon.com',
    skillsVerified: ['Containerization', 'Microservices', 'Database Design', 'Serverless APIs'],
    category: 'Cloud & Infrastructure'
  }
];

const INITIAL_SITE_CONTENT: SiteContent = {
  heroHeadline: 'Building Intelligent Digital Products.',
  heroSupportingLine: 'AI/ML + Full-Stack Developer building practical software, intelligent automation, and modern digital experiences.',
  aboutHeadline: 'Engineering intelligent software at the convergence of AI and production-ready full-stack architecture.',
  aboutText: [
    'I’m a Computer Science Engineering student focused on building intelligent software at the intersection of AI, automation, and full-stack development.',
    'Rather than treating AI as an isolated research silo, I focus on shipping practical, production-ready software systems that solve tangible problems — from multi-agent security sandboxes to high-performance web applications.',
    'I enjoy competitive hackathons, algorithmic problem solving in Python and C++, building reliable APIs, and designing minimal, high-craft user interfaces.'
  ],
  currentlyBuilding: 'Autonomous multi-agent testing pipelines & intelligent discovery engines',
  resumeUrl: '/Shrim_Yadav_Resume.pdf',
  profilePhotoUrl: '',
  socials: {
    linkedin: 'https://www.linkedin.com/in/shrim-yadav-479919403/',
    github: 'https://github.com/shrimyadav',
    email: 'shrimyadav777@gmail.com'
  }
};

const INITIAL_TECH_RADAR: TechRadarItem[] = [
  {
    id: 'radar-1',
    title: 'Autonomous Multi-Agent Architectures in Production Systems',
    source: 'AI Engineering Report',
    category: 'AI Agents',
    snippet: 'Exploring deterministic state graphs (LangGraph, AutoGen) over unstructured loops to achieve verifiable reliability in enterprise agent deployments.',
    url: 'https://github.com/topics/ai-agents',
    date: '2026-03-10'
  },
  {
    id: 'radar-2',
    title: 'FastAPI & Async Python Concurrency Benchmarks for LLM Gateways',
    source: 'Python Software Foundation',
    category: 'Python & Backend',
    snippet: 'Analyzing UVLoop and AnyIO streaming throughput optimizations when handling high-concurrency token streaming and backpressure management.',
    url: 'https://fastapi.tiangolo.com/',
    date: '2026-03-08'
  },
  {
    id: 'radar-3',
    title: 'Next-Generation Full-Stack Web: Server Components & Edge Runtime',
    source: 'Web Standards Weekly',
    category: 'Full-Stack',
    snippet: 'How progressive hydration, streaming SSR, and zero-bundle server logic combine to produce sub-100ms first input delay on modern cloud infrastructures.',
    url: 'https://react.dev/reference/rsc/server-components',
    date: '2026-03-04'
  },
  {
    id: 'radar-4',
    title: 'Vector Search & Hybrid BM25 Indexing for RAG Accuracy',
    source: 'Information Retrieval Hub',
    category: 'Machine Learning',
    snippet: 'Combining sparse keyword representations with dense vector embeddings to minimize semantic hallucination in enterprise documentation search.',
    url: 'https://en.wikipedia.org/wiki/Okapi_BM25',
    date: '2026-02-28'
  }
];

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        return {
          projects: parsed.projects || INITIAL_PROJECTS,
          messages: parsed.messages || [],
          certificates: parsed.certificates || INITIAL_CERTIFICATES,
          siteContent: parsed.siteContent || INITIAL_SITE_CONTENT,
          analytics: parsed.analytics || {
            pageViews: 142,
            projectViews: {},
            inquiriesCount: 0,
            lastViewedAt: new Date().toISOString()
          },
          radarCache: parsed.radarCache || {
            timestamp: Date.now(),
            items: INITIAL_TECH_RADAR
          }
        };
      }
    } catch (err) {
      console.warn('Error reading database file, using defaults:', err);
    }

    const defaultData: DatabaseSchema = {
      projects: INITIAL_PROJECTS,
      messages: [],
      certificates: INITIAL_CERTIFICATES,
      siteContent: INITIAL_SITE_CONTENT,
      analytics: {
        pageViews: 142,
        projectViews: {},
        inquiriesCount: 0,
        lastViewedAt: new Date().toISOString()
      },
      radarCache: {
        timestamp: Date.now(),
        items: INITIAL_TECH_RADAR
      }
    };
    this.saveData(defaultData);
    return defaultData;
  }

  private saveData(data: DatabaseSchema): void {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist database file:', err);
    }
  }

  public getProjects(includeUnpublished = false): Project[] {
    return includeUnpublished
      ? this.data.projects
      : this.data.projects.filter((p) => p.published);
  }

  public getProjectBySlug(slug: string): Project | undefined {
    return this.data.projects.find((p) => p.slug === slug);
  }

  public addProject(project: Omit<Project, 'id' | 'createdAt'>): Project {
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.data.projects.push(newProject);
    this.saveData(this.data);
    return newProject;
  }

  public updateProject(id: string, updates: Partial<Project>): Project | null {
    const idx = this.data.projects.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.data.projects[idx] = { ...this.data.projects[idx], ...updates };
    this.saveData(this.data);
    return this.data.projects[idx];
  }

  public deleteProject(id: string): boolean {
    const lenBefore = this.data.projects.length;
    this.data.projects = this.data.projects.filter((p) => p.id !== id);
    if (this.data.projects.length !== lenBefore) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // Messages
  public getMessages(): ContactMessage[] {
    return [...this.data.messages].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getMessageById(id: string): ContactMessage | undefined {
    return this.data.messages.find((m) => m.id === id);
  }

  public addMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'updatedAt' | 'isRead' | 'isImportant' | 'status' | 'notes'>): ContactMessage {
    const newMessage: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      status: 'New',
      isRead: false,
      isImportant: false,
      notes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.messages.unshift(newMessage);
    this.data.analytics.inquiriesCount = (this.data.analytics.inquiriesCount || 0) + 1;
    this.saveData(this.data);
    return newMessage;
  }

  public updateMessage(id: string, updates: Partial<ContactMessage>): ContactMessage | null {
    const idx = this.data.messages.findIndex((m) => m.id === id);
    if (idx === -1) return null;
    this.data.messages[idx] = {
      ...this.data.messages[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveData(this.data);
    return this.data.messages[idx];
  }

  public addMessageNote(id: string, text: string): ContactMessage | null {
    const msg = this.data.messages.find((m) => m.id === id);
    if (!msg) return null;
    msg.notes.push({
      id: `note-${Date.now()}`,
      text,
      createdAt: new Date().toISOString()
    });
    msg.updatedAt = new Date().toISOString();
    this.saveData(this.data);
    return msg;
  }

  public deleteMessage(id: string): boolean {
    const lenBefore = this.data.messages.length;
    this.data.messages = this.data.messages.filter((m) => m.id !== id);
    if (this.data.messages.length !== lenBefore) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // Certificates
  public getCertificates(): Certificate[] {
    return this.data.certificates;
  }

  public addCertificate(cert: Omit<Certificate, 'id'>): Certificate {
    const newCert: Certificate = {
      ...cert,
      id: `cert-${Date.now()}`
    };
    this.data.certificates.push(newCert);
    this.saveData(this.data);
    return newCert;
  }

  public deleteCertificate(id: string): boolean {
    const lenBefore = this.data.certificates.length;
    this.data.certificates = this.data.certificates.filter((c) => c.id !== id);
    if (this.data.certificates.length !== lenBefore) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // Site Content
  public getSiteContent(): SiteContent {
    return this.data.siteContent;
  }

  public updateSiteContent(updates: Partial<SiteContent>): SiteContent {
    this.data.siteContent = {
      ...this.data.siteContent,
      ...updates,
      socials: {
        ...this.data.siteContent.socials,
        ...(updates.socials || {})
      }
    };
    this.saveData(this.data);
    return this.data.siteContent;
  }

  // Analytics
  public recordPageView(): void {
    this.data.analytics.pageViews = (this.data.analytics.pageViews || 0) + 1;
    this.data.analytics.lastViewedAt = new Date().toISOString();
    this.saveData(this.data);
  }

  public recordProjectView(slug: string): void {
    if (!this.data.analytics.projectViews) {
      this.data.analytics.projectViews = {};
    }
    this.data.analytics.projectViews[slug] = (this.data.analytics.projectViews[slug] || 0) + 1;
    this.saveData(this.data);
  }

  public getAnalytics() {
    return {
      ...this.data.analytics,
      totalInquiries: this.data.messages.length,
      unreadInquiries: this.data.messages.filter((m) => !m.isRead).length,
      conversionRate: this.data.analytics.pageViews > 0
        ? ((this.data.messages.length / this.data.analytics.pageViews) * 100).toFixed(1) + '%'
        : '0.0%'
    };
  }

  // Tech Radar
  public getTechRadar(): TechRadarItem[] {
    return this.data.radarCache?.items || INITIAL_TECH_RADAR;
  }

  public setTechRadar(items: TechRadarItem[]): void {
    this.data.radarCache = {
      timestamp: Date.now(),
      items
    };
    this.saveData(this.data);
  }
}

export const db = new Database();
