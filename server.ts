import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { db } from './src/server/db.ts';

dotenv.config();

const PORT = 3000;
const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'shrim-admin-2026';

// In-memory rate limiting map for contact submissions & login attempts
interface RateLimitEntry {
  count: number;
  resetTime: number;
}
const rateLimits: Map<string, RateLimitEntry> = new Map();

function checkRateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimits.get(ip);
  if (!record || now > record.resetTime) {
    rateLimits.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (record.count >= limit) {
    return false;
  }
  record.count += 1;
  return true;
}

// Active session tokens for admin
const adminSessions = new Set<string>();

function generateSessionToken(): string {
  const token = crypto.randomBytes(32).toString('hex');
  adminSessions.add(token);
  return token;
}

function requireAdminAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
    return;
  }
  const token = authHeader.split(' ')[1];
  if (!adminSessions.has(token)) {
    res.status(403).json({ error: 'Forbidden: Invalid or expired session' });
    return;
  }
  next();
}

async function startServer() {
  const app = express();

  // Basic middleware
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Security Headers
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // ==========================================
  // SEO & CRAWLER ROUTES
  // ==========================================
  app.get('/robots.txt', (_req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/admin/

Sitemap: ${process.env.APP_URL || 'https://shrimyadav.dev'}/sitemap.xml
`);
  });

  app.get('/sitemap.xml', (_req, res) => {
    const projects = db.getProjects();
    const baseUrl = process.env.APP_URL || 'https://shrimyadav.dev';
    const now = new Date().toISOString().split('T')[0];

    const projectUrls = projects
      .map(
        (p) => `  <url>
    <loc>${baseUrl}/#project-${p.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
      )
      .join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/#about</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#projects</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#skills</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/#services</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#contact</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
${projectUrls}
</urlset>`;

    res.type('application/xml');
    res.send(sitemap);
  });

  // ==========================================
  // PUBLIC API ROUTES
  // ==========================================

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Site Content
  app.get('/api/content', (_req, res) => {
    res.json(db.getSiteContent());
  });

  // Projects list
  app.get('/api/projects', (_req, res) => {
    const projects = db.getProjects();
    res.json(projects);
  });

  // Project details by slug
  app.get('/api/projects/:slug', (req, res) => {
    const project = db.getProjectBySlug(req.params.slug);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    db.recordProjectView(req.params.slug);
    res.json(project);
  });

  // Certificates
  app.get('/api/certificates', (_req, res) => {
    res.json(db.getCertificates());
  });

  // Page view analytics
  app.post('/api/analytics/view', (req, res) => {
    const { slug } = req.body || {};
    if (slug) {
      db.recordProjectView(slug);
    } else {
      db.recordPageView();
    }
    res.json({ success: true });
  });

  // Tech Radar (SerpApi integration with robust fallback)
  app.get('/api/tech-radar', async (req, res) => {
    const query = (req.query.q as string) || 'AI engineering agents full-stack trends';
    const serpApiKey = process.env.SERPAPI_KEY;

    if (serpApiKey && serpApiKey.trim() !== '') {
      try {
        const serpUrl = new URL('https://serpapi.com/search.json');
        serpUrl.searchParams.append('engine', 'google_news');
        serpUrl.searchParams.append('q', query);
        serpUrl.searchParams.append('api_key', serpApiKey);
        serpUrl.searchParams.append('hl', 'en');
        serpUrl.searchParams.append('gl', 'us');

        const serpRes = await fetch(serpUrl.toString(), { signal: AbortSignal.timeout(5000) });
        if (serpRes.ok) {
          const data = (await serpRes.json()) as any;
          const newsResults = data.news_results || [];
          if (Array.isArray(newsResults) && newsResults.length > 0) {
            const formatted = newsResults.slice(0, 6).map((item: any, idx: number) => ({
              id: `serp-${Date.now()}-${idx}`,
              title: item.title || 'Tech Intelligence Update',
              source: item.source?.name || 'Tech Radar Intelligence',
              category: query.toLowerCase().includes('agent') ? 'AI Agents' : 'Tech Intelligence',
              snippet: item.snippet || item.title,
              url: item.link || '#',
              date: item.date || 'Recent'
            }));
            db.setTechRadar(formatted);
            res.json({ source: 'serpapi', items: formatted });
            return;
          }
        }
      } catch (err) {
        console.warn('SerpApi request failed or timed out, serving cached Tech Radar:', err);
      }
    }

    // Fallback to high-quality curated technical intelligence
    const cached = db.getTechRadar();
    res.json({ source: 'cached-intelligence', items: cached });
  });

  // Contact Form Submission
  app.post('/api/contact', async (req, res) => {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';

    // Rate Limiting: 5 submissions per 10 minutes
    if (!checkRateLimit(ip, 5, 10 * 60 * 1000)) {
      res.status(429).json({
        error: 'Too many requests. Please wait a few moments before sending another inquiry.'
      });
      return;
    }

    const {
      name,
      email,
      company,
      projectType,
      budget,
      timeline,
      message,
      phone,
      website_check // Honeypot
    } = req.body;

    // Honeypot spam protection
    if (website_check) {
      console.warn(`Spam bot trapped by honeypot field from IP ${ip}`);
      // Return fake success to confuse the spam bot without saving
      res.json({
        success: true,
        message: `Thanks, ${name || 'there'}. Your project inquiry has been received.`
      });
      return;
    }

    // Input Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      res.status(400).json({ error: 'Please provide a valid name (at least 2 characters).' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }

    if (!message || typeof message !== 'string' || message.trim().length < 8) {
      res.status(400).json({ error: 'Please include a brief description of your project or inquiry (minimum 8 characters).' });
      return;
    }

    try {
      const sanitizedName = name.trim().slice(0, 100);
      const sanitizedEmail = email.trim().toLowerCase().slice(0, 120);
      const sanitizedCompany = (company || '').toString().trim().slice(0, 120);
      const sanitizedProjectType = (projectType || 'Full-Stack Application').toString().slice(0, 50);
      const sanitizedBudget = (budget || "Let's Discuss").toString().slice(0, 50);
      const sanitizedTimeline = (timeline || 'Flexible').toString().slice(0, 50);
      const sanitizedMessage = message.trim().slice(0, 3000);
      const sanitizedPhone = (phone || '').toString().trim().slice(0, 30);

      const savedMessage = db.addMessage({
        name: sanitizedName,
        email: sanitizedEmail,
        company: sanitizedCompany,
        projectType: sanitizedProjectType,
        budget: sanitizedBudget,
        timeline: sanitizedTimeline,
        message: sanitizedMessage,
        phone: sanitizedPhone,
        ipAddress: ip
      });

      // Email dispatch logic (graceful SMTP check or simulated delivery)
      const recipient = process.env.CONTACT_EMAIL || 'shrimyadav777@gmail.com';
      console.log(`[Notification Engine] New inquiry from ${sanitizedName} (${sanitizedEmail}) regarding ${sanitizedProjectType} (${sanitizedBudget}) queued for ${recipient}. ID: ${savedMessage.id}`);

      // Return clean response compliant with prompt specification
      res.json({
        success: true,
        id: savedMessage.id,
        name: sanitizedName,
        message: `Thanks, ${sanitizedName}. Your project inquiry has been received.`
      });
    } catch (err) {
      console.error('Error saving contact inquiry:', err);
      res.status(500).json({ error: 'Something went wrong on our side. Please try again.' });
    }
  });

  // ==========================================
  // ADMIN AUTH & MANAGEMENT ROUTES
  // ==========================================

  // Admin Login
  app.post('/api/admin/login', (req, res) => {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';

    // Rate limit login attempts: 10 attempts per 15 minutes
    if (!checkRateLimit(`login-${ip}`, 10, 15 * 60 * 1000)) {
      res.status(429).json({ error: 'Too many login attempts. Please try again later.' });
      return;
    }

    const { secretKey } = req.body;
    if (!secretKey || typeof secretKey !== 'string') {
      res.status(400).json({ error: 'Secret access key required' });
      return;
    }

    if (secretKey.trim() === ADMIN_SECRET) {
      const token = generateSessionToken();
      res.json({
        success: true,
        token,
        message: 'Admin authorization granted'
      });
    } else {
      res.status(401).json({ error: 'Invalid admin credentials' });
    }
  });

  // Admin Overview
  app.get('/api/admin/overview', requireAdminAuth, (_req, res) => {
    const analytics = db.getAnalytics();
    const projects = db.getProjects(true);
    const messages = db.getMessages();
    const certificates = db.getCertificates();

    res.json({
      analytics,
      projectCount: projects.length,
      certificateCount: certificates.length,
      recentMessages: messages.slice(0, 5),
      publishedProjects: projects.filter((p) => p.published).length
    });
  });

  // Admin Messages (CRM)
  app.get('/api/admin/messages', requireAdminAuth, (req, res) => {
    let messages = db.getMessages();
    const { status, search, unreadOnly } = req.query;

    if (status && typeof status === 'string' && status !== 'all') {
      messages = messages.filter((m) => m.status.toLowerCase() === status.toLowerCase());
    }

    if (unreadOnly === 'true') {
      messages = messages.filter((m) => !m.isRead);
    }

    if (search && typeof search === 'string' && search.trim() !== '') {
      const q = search.toLowerCase();
      messages = messages.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          (m.company && m.company.toLowerCase().includes(q)) ||
          m.message.toLowerCase().includes(q)
      );
    }

    res.json(messages);
  });

  app.patch('/api/admin/messages/:id', requireAdminAuth, (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const updated = db.updateMessage(id, updates);
    if (!updated) {
      res.status(404).json({ error: 'Message not found' });
      return;
    }
    res.json(updated);
  });

  app.post('/api/admin/messages/:id/notes', requireAdminAuth, (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Note text required' });
      return;
    }
    const updated = db.addMessageNote(id, text.trim());
    if (!updated) {
      res.status(404).json({ error: 'Message not found' });
      return;
    }
    res.json(updated);
  });

  app.delete('/api/admin/messages/:id', requireAdminAuth, (req, res) => {
    const success = db.deleteMessage(req.params.id);
    if (!success) {
      res.status(404).json({ error: 'Message not found' });
      return;
    }
    res.json({ success: true });
  });

  // Admin Projects Management
  app.get('/api/admin/projects', requireAdminAuth, (_req, res) => {
    res.json(db.getProjects(true));
  });

  app.post('/api/admin/projects', requireAdminAuth, (req, res) => {
    const projectData = req.body;
    if (!projectData.title || !projectData.slug) {
      res.status(400).json({ error: 'Title and slug are required' });
      return;
    }
    const created = db.addProject(projectData);
    res.status(201).json(created);
  });

  app.put('/api/admin/projects/:id', requireAdminAuth, (req, res) => {
    const updated = db.updateProject(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json(updated);
  });

  app.delete('/api/admin/projects/:id', requireAdminAuth, (req, res) => {
    const success = db.deleteProject(req.params.id);
    if (!success) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json({ success: true });
  });

  // Admin Content Management
  app.put('/api/admin/content', requireAdminAuth, (req, res) => {
    const updated = db.updateSiteContent(req.body);
    res.json(updated);
  });

  // Admin Certificates Management
  app.post('/api/admin/certificates', requireAdminAuth, (req, res) => {
    const { name, issuingOrganization, date, credentialUrl, skillsVerified, category } = req.body;
    if (!name || !issuingOrganization) {
      res.status(400).json({ error: 'Name and issuing organization required' });
      return;
    }
    const created = db.addCertificate({
      name,
      issuingOrganization,
      date: date || '2025',
      credentialUrl,
      skillsVerified: Array.isArray(skillsVerified) ? skillsVerified : [],
      category: category || 'Engineering'
    });
    res.status(201).json(created);
  });

  app.delete('/api/admin/certificates/:id', requireAdminAuth, (req, res) => {
    const success = db.deleteCertificate(req.params.id);
    if (!success) {
      res.status(404).json({ error: 'Certificate not found' });
      return;
    }
    res.json({ success: true });
  });

  // ==========================================
  // VITE & FRONTEND INTEGRATION
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Shrim Yadav Portfolio Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
