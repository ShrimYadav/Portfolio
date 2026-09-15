import { SkillGroup, ServiceItem, Project, Certificate, SiteContent } from '../types/index.ts';

export const INITIAL_SITE_CONTENT: SiteContent = {
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

export const PROJECTS: Project[] = [
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

export const CERTIFICATES: Certificate[] = [
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

export const PERSONAL_INFO = {
  name: 'Shrim Yadav',
  shortName: 'Shrim',
  initials: 'SY',
  role: 'BTech CSE Student | Python Developer | AI/ML Enthusiast | Full-Stack Developer',
  headline: 'Building Intelligent Digital Products.',
  subheadline: 'AI/ML + Full-Stack Developer building practical software, intelligent automation and modern digital experiences.',
  location: 'India',
  universityStatus: 'Computer Science & Engineering',
  primaryFocus: 'AI + Full-Stack Software Engineering',
  email: 'shrimyadav777@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shrim-yadav-479919403/',
  github: 'https://github.com/shrimyadav',
  status: 'Open to Opportunities & Internships',
  currentlyBuilding: 'Autonomous multi-agent testing environments and automated intelligence discovery'
};

export const PERSONAL_STATS = [
  {
    label: 'Academic Foundation',
    value: 'CSE Student',
    detail: 'BTech Computer Science & Engineering',
    color: '#3B82F6'
  },
  {
    label: 'Primary Specialization',
    value: 'AI / ML Focus',
    detail: 'Agents, LLM Pipelines & Automation',
    color: '#28E58B'
  },
  {
    label: 'Engineering Spectrum',
    value: 'Full-Stack',
    detail: 'React, Node, TypeScript & FastAPI',
    color: '#7B35FF'
  },
  {
    label: 'Core Language',
    value: 'Python Developer',
    detail: 'Algorithms, Data Pipelines & Scripting',
    color: '#28E58B'
  },
  {
    label: 'Applied Experience',
    value: 'Hackathon Builder',
    detail: 'Rapid prototype shipping & problem solving',
    color: '#3B82F6'
  },
  {
    label: 'Availability',
    value: 'Open to Work',
    detail: 'Internships, Junior SWE & Freelance',
    color: '#28E58B'
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Programming Languages',
    description: 'Algorithmic fundamentals, scripting, typed development, and systems programming',
    skills: [
      { name: 'Python', level: 'Core' },
      { name: 'TypeScript', level: 'Core' },
      { name: 'JavaScript (ES6+)', level: 'Core' },
      { name: 'C++', level: 'Working Knowledge' },
      { name: 'HTML5 & Modern CSS', level: 'Core' }
    ]
  },
  {
    category: 'AI / Machine Learning',
    description: 'Applied machine learning, generative models, autonomous agents, and embedding pipelines',
    skills: [
      { name: 'AI Agents & Multi-Agent Workflows', level: 'Core' },
      { name: 'AI APIs & LLM Integration', level: 'Core' },
      { name: 'Prompt Engineering & Triage', level: 'Core' },
      { name: 'AI Automation Pipelines', level: 'Core' },
      { name: 'Machine Learning Fundamentals', level: 'Core' },
      { name: 'Computer Vision Basics', level: 'Working Knowledge' }
    ]
  },
  {
    category: 'Full-Stack & Backend',
    description: 'Production web architectures, component design, reactive state, and robust APIs',
    skills: [
      { name: 'React', level: 'Core' },
      { name: 'Next.js Architecture', level: 'Core' },
      { name: 'Node.js & Express', level: 'Core' },
      { name: 'RESTful API Engineering', level: 'Core' },
      { name: 'Database Fundamentals (SQL / NoSQL)', level: 'Core' },
      { name: 'FastAPI (Python)', level: 'Working Knowledge' }
    ]
  },
  {
    category: 'Tools & Development Ecosystem',
    description: 'Version control, interactive compute environments, debugging, and testing utilities',
    skills: [
      { name: 'Git & GitHub Workflows', level: 'Core' },
      { name: 'VS Code & CLI Utilities', level: 'Core' },
      { name: 'Google Colab & Jupyter', level: 'Core' },
      { name: 'AI Development & Testing Tools', level: 'Core' },
      { name: 'Docker Sandboxing Basics', level: 'Working Knowledge' },
      { name: 'Postman & API Testing', level: 'Core' }
    ]
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'ai-applications',
    title: 'AI-Powered Applications',
    tagline: 'Transform LLMs into practical, production-grade business tools',
    description: 'Architecting end-to-end intelligent software solutions featuring agentic workflows, conversational assistants, smart search, and automated reasoning pipelines.',
    deliverables: [
      'Custom AI Assistants & Specialized Copilots',
      'Autonomous AI Agent loops (Red/Blue testing, research)',
      'Vector Search, RAG & Document Intelligence',
      'AI-Powered Analytics & Decision Dashboards',
      'Secure LLM API integrations with structured validation'
    ],
    icon: 'Cpu',
    suggestedBudget: '₹25K–₹50K+',
    suggestedTimeline: '2–4 weeks'
  },
  {
    id: 'fullstack-web',
    title: 'Full-Stack Web Development',
    tagline: 'Modern, responsive, and high-performance digital platforms',
    description: 'Building clean, resilient web applications with modern React/Next.js frontends, modular server backends, secure authentication, and production database modeling.',
    deliverables: [
      'Production Web Applications & Client Portals',
      'Responsive Marketing & Business Platforms',
      'Performant Admin Panels & Operations Hubs',
      'REST & GraphQL API Endpoints',
      'Robust Database Modeling with Migrations'
    ],
    icon: 'Globe',
    suggestedBudget: '₹15K–₹40K',
    suggestedTimeline: '1–3 weeks'
  },
  {
    id: 'automation-systems',
    title: 'Workflow Automation & Scraping',
    tagline: 'Eliminate repetitive manual tasks through autonomous code',
    description: 'Connecting fragmented APIs, building reliable data extraction pipelines, and constructing AI-assisted workflows that execute continuously without human bottleneck.',
    deliverables: [
      'Multi-source Web Scraping & Ingestion Engines',
      'Cross-platform API Integrations & Webhooks',
      'Automated Lead Discovery & Signal Notification',
      'Data Cleaning, Parsing & Storage Pipelines',
      'Scheduled Batch Jobs & Event Monitoring'
    ],
    icon: 'Bot',
    suggestedBudget: '₹10K–₹25K',
    suggestedTimeline: '1–2 weeks'
  },
  {
    id: 'mvp-development',
    title: 'Prototype & MVP Development',
    tagline: 'Turn concept sketches into functional, testable software fast',
    description: 'Helping startup founders, researchers, and creators validate software ideas quickly with clean, extensible codebases ready for user testing and pitch presentations.',
    deliverables: [
      'Rapid Concept-to-Prototype Execution',
      'Interactive Clickable & Functional Prototypes',
      'Authentication, Database & Core User Journeys',
      'Investor & Hackathon-Ready Demonstrations',
      'Clear Technical Architecture Documentation'
    ],
    icon: 'Rocket',
    suggestedBudget: '₹20K–₹50K+',
    suggestedTimeline: '1–3 weeks'
  }
];

export const RESUME_DATA = {
  name: 'Shrim Yadav',
  title: 'AI/ML Enthusiast & Full-Stack Developer',
  contact: {
    email: 'shrimyadav777@gmail.com',
    linkedin: 'linkedin.com/in/shrim-yadav-479919403',
    github: 'github.com/shrimyadav',
    portfolio: 'Portfolio Website'
  },
  education: {
    degree: 'Bachelor of Technology (BTech) in Computer Science & Engineering',
    status: 'Undergraduate Student',
    focus: 'Artificial Intelligence, Software Systems, Full-Stack Development'
  },
  technicalSummary: [
    'Proficient in Python, TypeScript, React, Node.js, and modern full-stack architectures.',
    'Hands-on experience architecting autonomous multi-agent pipelines, AI testing sandboxes, and structured API layers.',
    'Strong computer science fundamentals: algorithms, data structures, graph search, and object-oriented design.',
    'Active participant in hackathons and real-world software product engineering.'
  ],
  projects: [
    {
      name: 'BASTION — Autonomous AI Cybersecurity Platform',
      tech: 'Python, FastAPI, Multi-Agent Systems, Docker, React, TypeScript',
      bullets: [
        'Architected an isolated simulation environment where specialized Red and Blue AI agents simulate cyber attacks and defensive patches.',
        'Integrated neutral Judge AI to score vulnerability vectors according to CVSS criteria.',
        'Engineered an interactive real-time telemetry dashboard monitoring attack execution graphs.'
      ]
    },
    {
      name: 'NEOS — AI Opportunity & Lead Discovery Engine',
      tech: 'Python, AsyncIO, Vector Search, FastAPI, React, Node.js',
      bullets: [
        'Built automated web scraping and signal ingestion pipelines collecting grants, hackathons, and technical opportunities.',
        'Implemented semantic NLP embeddings and deduplication for sub-second retrieval.',
        'Designed a high-craft client dashboard with alert rules and classification filters.'
      ]
    },
    {
      name: 'Train Route & Railway Optimizer',
      tech: 'Python, NetworkX, Graph Search, TypeScript, HTML5 Canvas',
      bullets: [
        'Modeled rail corridors as weighted graphs to simulate junction delays and optimize passenger throughput.',
        'Applied priority routing algorithms with lookahead conflict reservation to prevent bottleneck deadlocks.'
      ]
    }
  ]
};
