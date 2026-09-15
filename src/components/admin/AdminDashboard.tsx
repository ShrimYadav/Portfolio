import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Mail,
  FolderGit2,
  Settings,
  BarChart3,
  Search,
  Star,
  Trash2,
  CheckCircle,
  Clock,
  MessageSquare,
  Plus,
  Edit2,
  Eye,
  EyeOff,
  LogOut,
  Save,
  FileText
} from 'lucide-react';
import { Button } from '../ui/Button.tsx';
import { Badge } from '../ui/Badge.tsx';
import { ContactMessage, Project, SiteContent } from '../../types/index.ts';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onContentUpdated: (newContent: SiteContent) => void;
  onProjectsUpdated: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onContentUpdated,
  onProjectsUpdated
}) => {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('admin_token'));
  const [secretKey, setSecretKey] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  // Admin Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'messages' | 'projects' | 'content'>('overview');

  // Overview Data
  const [overview, setOverview] = useState<any>(null);

  // Messages Data
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [msgFilter, setMsgFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);
  const [newNoteText, setNewNoteText] = useState<string>('');

  // Projects Data
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);

  // Content Data
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [contentSaveSuccess, setContentSaveSuccess] = useState<boolean>(false);

  // Authenticate
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secretKey })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }
      setToken(data.token);
      sessionStorage.setItem('admin_token', data.token);
    } catch (err: any) {
      setLoginError(err.message || 'Invalid admin credentials');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem('admin_token');
  };

  // Fetch admin overview
  const fetchOverview = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/admin/overview', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOverview(data);
      }
    } catch (err) {
      console.error('Failed to load overview:', err);
    }
  };

  // Fetch messages
  const fetchMessages = async () => {
    if (!token) return;
    try {
      const url = new URL('/api/admin/messages', window.location.origin);
      if (msgFilter !== 'all') url.searchParams.append('status', msgFilter);
      if (searchQuery.trim()) url.searchParams.append('search', searchQuery.trim());

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        if (selectedMsg) {
          const updated = data.find((m: ContactMessage) => m.id === selectedMsg.id);
          if (updated) setSelectedMsg(updated);
        }
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };

  // Fetch projects
  const fetchProjects = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/admin/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  };

  // Fetch content
  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const data = await res.json();
        setSiteContent(data);
      }
    } catch (err) {
      console.error('Failed to load content:', err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOverview();
      fetchMessages();
      fetchProjects();
      fetchContent();
    }
  }, [token]);

  useEffect(() => {
    if (token && activeTab === 'messages') {
      fetchMessages();
    }
  }, [msgFilter, searchQuery]);

  // Message Actions
  const handleUpdateMessageStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchMessages();
        fetchOverview();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleImportant = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isImportant: !current })
      });
      if (res.ok) fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleRead = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isRead: !current })
      });
      if (res.ok) {
        fetchMessages();
        fetchOverview();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setSelectedMsg(null);
        fetchMessages();
        fetchOverview();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddNote = async (id: string) => {
    if (!newNoteText.trim()) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: newNoteText })
      });
      if (res.ok) {
        setNewNoteText('');
        fetchMessages();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Project Actions
  const handleTogglePublishProject = async (project: Project) => {
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ published: !project.published })
      });
      if (res.ok) {
        fetchProjects();
        onProjectsUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleFeaturedProject = async (project: Project) => {
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ featured: !project.featured })
      });
      if (res.ok) {
        fetchProjects();
        onProjectsUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      const isNew = !editingProject.id;
      const url = isNew ? '/api/admin/projects' : `/api/admin/projects/${editingProject.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editingProject)
      });

      if (res.ok) {
        setEditingProject(null);
        fetchProjects();
        onProjectsUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Content Actions
  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteContent) return;

    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(siteContent)
      });
      if (res.ok) {
        const updated = await res.json();
        setSiteContent(updated);
        onContentUpdated(updated);
        setContentSaveSuccess(true);
        setTimeout(() => setContentSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#03151F]/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-[#071E2B] border border-white/15 shadow-2xl shadow-black overflow-hidden my-auto">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#03151F]/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/25">
              ADMIN CRM
            </span>
            <h2 className="text-base font-bold text-[#F5F7FA]">
              Shrim Yadav Portfolio Control Center
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {token && (
              <button
                onClick={handleLogout}
                className="text-xs font-mono text-[#9CA8B5] hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#9CA8B5] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Admin"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Not Authenticated State: Login Screen */}
        {!token ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto my-auto w-full text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#60A5FA] flex items-center justify-center mx-auto mb-5">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#F5F7FA] mb-2">
              Protected Admin Area
            </h3>
            <p className="text-xs text-[#9CA8B5] mb-6">
              Enter your master secret key to access lead inquiries, edit case studies, and modify site content.
            </p>

            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-xs text-red-300">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                required
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="Admin Secret Key (default: shrim-admin-2026)"
                className="w-full px-4 py-2.5 rounded-xl bg-[#03151F] border border-white/15 text-sm text-[#F5F7FA] focus:outline-none focus:border-[#28E58B]"
              />
              <Button
                type="submit"
                variant="emerald"
                size="md"
                loading={loginLoading}
                className="w-full"
              >
                Unlock Dashboard
              </Button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full sm:w-56 p-4 border-b sm:border-b-0 sm:border-r border-white/10 bg-[#03151F]/50 flex sm:flex-col gap-2 shrink-0 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono transition-colors text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-[#3B82F6]/20 text-[#60A5FA] font-bold'
                    : 'text-[#9CA8B5] hover:text-white hover:bg-white/5'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-colors text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'messages'
                    ? 'bg-[#28E58B]/20 text-[#28E58B] font-bold'
                    : 'text-[#9CA8B5] hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4" />
                  <span>Inquiries (CRM)</span>
                </div>
                {overview?.analytics?.unreadInquiries > 0 && (
                  <span className="w-2 h-2 rounded-full bg-[#28E58B]" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono transition-colors text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'projects'
                    ? 'bg-[#7B35FF]/20 text-[#C084FC] font-bold'
                    : 'text-[#9CA8B5] hover:text-white hover:bg-white/5'
                }`}
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Projects</span>
              </button>

              <button
                onClick={() => setActiveTab('content')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono transition-colors text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'content'
                    ? 'bg-white/15 text-white font-bold'
                    : 'text-[#9CA8B5] hover:text-white hover:bg-white/5'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Site Content</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {/* 1. OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-[#F5F7FA]">
                    Platform Analytics &amp; Lead Overview
                  </h3>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-[#03151F] border border-white/10">
                      <div className="text-xs font-mono text-[#9CA8B5]">Total Inquiries</div>
                      <div className="text-2xl font-bold text-[#28E58B] mt-1">
                        {overview?.analytics?.totalInquiries ?? 0}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#03151F] border border-white/10">
                      <div className="text-xs font-mono text-[#9CA8B5]">Unread Messages</div>
                      <div className="text-2xl font-bold text-amber-400 mt-1">
                        {overview?.analytics?.unreadInquiries ?? 0}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#03151F] border border-white/10">
                      <div className="text-xs font-mono text-[#9CA8B5]">Estimated Views</div>
                      <div className="text-2xl font-bold text-[#60A5FA] mt-1">
                        {overview?.analytics?.pageViews ?? 142}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#03151F] border border-white/10">
                      <div className="text-xs font-mono text-[#9CA8B5]">Conversion Rate</div>
                      <div className="text-2xl font-bold text-[#C084FC] mt-1">
                        {overview?.analytics?.conversionRate ?? '0.0%'}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-[#03151F] border border-white/10">
                    <h4 className="text-sm font-bold text-[#F5F7FA] mb-3">
                      Recent Inquiry Stream
                    </h4>
                    {messages.length === 0 ? (
                      <p className="text-xs text-[#9CA8B5] py-4">No project inquiries yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {messages.slice(0, 4).map((msg) => (
                          <div
                            key={msg.id}
                            onClick={() => {
                              setSelectedMsg(msg);
                              setActiveTab('messages');
                            }}
                            className="p-3 rounded-lg bg-[#071E2B] border border-white/5 hover:border-white/20 transition-colors flex items-center justify-between cursor-pointer"
                          >
                            <div>
                              <span className="text-xs font-bold text-[#F5F7FA] mr-2">
                                {msg.name}
                              </span>
                              <span className="text-[11px] text-[#9CA8B5]">
                                {msg.projectType} • {msg.budget}
                              </span>
                            </div>
                            <Badge
                              variant={msg.status === 'New' ? 'emerald' : 'blue'}
                              size="sm"
                            >
                              {msg.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 2. MESSAGES (CRM) TAB */}
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="text-lg font-bold text-[#F5F7FA]">
                      Inquiry Management &amp; CRM
                    </h3>
                    {/* Filter tabs */}
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#03151F] border border-white/10 text-xs font-mono overflow-x-auto">
                      {['all', 'New', 'Contacted', 'In Discussion', 'Converted', 'Closed'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setMsgFilter(st)}
                          className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                            msgFilter === st ? 'bg-white/15 text-white font-bold' : 'text-[#9CA8B5] hover:text-white'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#9CA8B5] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search inquiries by name, email, company, or message..."
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#03151F] border border-white/10 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#28E58B]"
                    />
                  </div>

                  {/* Message Detail & List layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Message List */}
                    <div className="lg:col-span-5 space-y-2 max-h-[500px] overflow-y-auto">
                      {messages.length === 0 ? (
                        <div className="p-8 text-center border border-dashed border-white/10 rounded-xl text-xs text-[#9CA8B5]">
                          No inquiries found matching criteria.
                        </div>
                      ) : (
                        messages.map((msg) => (
                          <div
                            key={msg.id}
                            onClick={() => {
                              setSelectedMsg(msg);
                              if (!msg.isRead) handleToggleRead(msg.id, false);
                            }}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                              selectedMsg?.id === msg.id
                                ? 'bg-[#03151F] border-[#28E58B]/50'
                                : msg.isRead
                                ? 'bg-[#071E2B] border-white/5'
                                : 'bg-[#071E2B] border-[#28E58B]/30'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-[#F5F7FA]">
                                {msg.name}
                              </span>
                              <span className="text-[10px] font-mono text-[#9CA8B5]">
                                {new Date(msg.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="text-[11px] text-[#9CA8B5] truncate mb-2">
                              {msg.company ? `${msg.company} • ` : ''}{msg.projectType}
                            </div>
                            <div className="flex items-center justify-between">
                              <Badge size="sm" variant={msg.status === 'New' ? 'emerald' : 'blue'}>
                                {msg.status}
                              </Badge>
                              {msg.isImportant && (
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Message Detail View */}
                    <div className="lg:col-span-7">
                      {selectedMsg ? (
                        <div className="p-5 rounded-xl bg-[#03151F] border border-white/10 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-base font-bold text-[#F5F7FA]">
                                {selectedMsg.name}
                              </h4>
                              <p className="text-xs text-[#9CA8B5] font-mono mt-0.5">
                                {selectedMsg.email} {selectedMsg.phone ? `• ${selectedMsg.phone}` : ''}
                              </p>
                              {selectedMsg.company && (
                                <p className="text-xs text-[#60A5FA] mt-0.5">
                                  {selectedMsg.company}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleToggleImportant(selectedMsg.id, selectedMsg.isImportant)}
                                className="p-1.5 rounded-lg text-[#9CA8B5] hover:text-amber-400"
                                title="Toggle Important"
                              >
                                <Star className={`w-4 h-4 ${selectedMsg.isImportant ? 'text-amber-400 fill-amber-400' : ''}`} />
                              </button>
                              <button
                                onClick={() => handleDeleteMessage(selectedMsg.id)}
                                className="p-1.5 rounded-lg text-[#9CA8B5] hover:text-red-400"
                                title="Delete Inquiry"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-[#071E2B] text-xs font-mono border border-white/5">
                            <div>
                              <span className="text-[#9CA8B5] block text-[10px]">PROJECT</span>
                              <span className="text-[#F5F7FA]">{selectedMsg.projectType}</span>
                            </div>
                            <div>
                              <span className="text-[#9CA8B5] block text-[10px]">BUDGET</span>
                              <span className="text-[#28E58B]">{selectedMsg.budget}</span>
                            </div>
                            <div>
                              <span className="text-[#9CA8B5] block text-[10px]">TIMELINE</span>
                              <span className="text-[#F5F7FA]">{selectedMsg.timeline}</span>
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] font-mono uppercase text-[#9CA8B5] block mb-1">
                              Inquiry Message:
                            </span>
                            <div className="p-3.5 rounded-lg bg-[#071E2B] text-xs sm:text-sm text-[#F5F7FA] leading-relaxed whitespace-pre-wrap border border-white/5">
                              {selectedMsg.message}
                            </div>
                          </div>

                          {/* Status Selector */}
                          <div className="pt-2 flex items-center gap-3">
                            <span className="text-xs font-mono text-[#9CA8B5]">Status:</span>
                            <select
                              value={selectedMsg.status}
                              onChange={(e) => handleUpdateMessageStatus(selectedMsg.id, e.target.value)}
                              className="px-3 py-1 rounded-lg bg-[#071E2B] border border-white/10 text-xs text-[#F5F7FA] focus:outline-none"
                            >
                              {['New', 'Contacted', 'In Discussion', 'Converted', 'Closed'].map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>

                            <a
                              href={`mailto:${selectedMsg.email}?subject=Re: Project Inquiry — ${selectedMsg.projectType}`}
                              className="ml-auto inline-flex items-center gap-1 text-xs font-mono text-[#28E58B] hover:underline"
                            >
                              Reply via Email &rarr;
                            </a>
                          </div>

                          {/* Internal CRM Notes */}
                          <div className="pt-3 border-t border-white/10">
                            <span className="text-[10px] font-mono uppercase text-[#9CA8B5] block mb-2">
                              Internal CRM Notes
                            </span>
                            <div className="space-y-1.5 mb-3">
                              {selectedMsg.notes && selectedMsg.notes.length > 0 ? (
                                selectedMsg.notes.map((n) => (
                                  <div key={n.id} className="p-2 rounded bg-[#071E2B] text-[11px] text-[#9CA8B5]">
                                    {n.text}
                                  </div>
                                ))
                              ) : (
                                <p className="text-[11px] text-[#9CA8B5]/60 italic">No notes added yet.</p>
                              )}
                            </div>

                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={newNoteText}
                                onChange={(e) => setNewNoteText(e.target.value)}
                                placeholder="Add an internal note..."
                                className="flex-1 px-3 py-1.5 rounded-lg bg-[#071E2B] border border-white/10 text-xs text-[#F5F7FA] focus:outline-none"
                              />
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => handleAddNote(selectedMsg.id)}
                              >
                                Add Note
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-12 text-center border border-dashed border-white/10 rounded-xl text-xs text-[#9CA8B5]">
                          Select an inquiry to view details, update status, and manage CRM notes.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. PROJECTS TAB */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#F5F7FA]">
                      Project Case Studies ({projects.length})
                    </h3>
                    <Button
                      variant="emerald"
                      size="sm"
                      onClick={() =>
                        setEditingProject({
                          title: '',
                          slug: '',
                          category: 'AI/ML',
                          shortDescription: '',
                          longDescription: '',
                          problem: '',
                          solution: '',
                          architecture: '',
                          technologies: ['Python', 'React'],
                          myRole: 'Full-Stack Developer',
                          challenges: '',
                          outcome: '',
                          futureScope: '',
                          githubUrl: '',
                          featured: false,
                          published: true,
                          tags: ['AI']
                        })
                      }
                      icon={<Plus className="w-3.5 h-3.5" />}
                    >
                      New Project
                    </Button>
                  </div>

                  {editingProject ? (
                    <form onSubmit={handleSaveProject} className="p-5 rounded-xl bg-[#03151F] border border-white/10 space-y-4">
                      <h4 className="text-sm font-bold text-[#F5F7FA]">
                        {editingProject.id ? 'Edit Project' : 'Create New Project'}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-[#9CA8B5] mb-1">Title</label>
                          <input
                            type="text"
                            required
                            value={editingProject.title || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#071E2B] border border-white/10 text-xs text-[#F5F7FA]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-[#9CA8B5] mb-1">Slug (URL)</label>
                          <input
                            type="text"
                            required
                            value={editingProject.slug || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#071E2B] border border-white/10 text-xs text-[#F5F7FA]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#9CA8B5] mb-1">Short Description</label>
                        <input
                          type="text"
                          required
                          value={editingProject.shortDescription || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#071E2B] border border-white/10 text-xs text-[#F5F7FA]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#9CA8B5] mb-1">Problem &amp; Why It Matters</label>
                        <textarea
                          rows={2}
                          value={editingProject.problem || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#071E2B] border border-white/10 text-xs text-[#F5F7FA]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#9CA8B5] mb-1">Solution &amp; Architecture</label>
                        <textarea
                          rows={2}
                          value={editingProject.solution || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#071E2B] border border-white/10 text-xs text-[#F5F7FA]"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" type="button" onClick={() => setEditingProject(null)}>
                          Cancel
                        </Button>
                        <Button variant="emerald" size="sm" type="submit">
                          Save Project
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-3">
                      {projects.map((proj) => (
                        <div
                          key={proj.id}
                          className="p-4 rounded-xl bg-[#03151F] border border-white/10 flex items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-[#F5F7FA]">{proj.title}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#9CA8B5]">
                                {proj.category}
                              </span>
                              {proj.featured && (
                                <Badge variant="emerald" size="sm">FEATURED</Badge>
                              )}
                            </div>
                            <p className="text-xs text-[#9CA8B5] line-clamp-1 mt-1">
                              {proj.shortDescription}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleFeaturedProject(proj)}
                              className={`p-1.5 rounded-lg transition-colors ${proj.featured ? 'text-amber-400' : 'text-[#9CA8B5] hover:text-white'}`}
                              title="Toggle Featured"
                            >
                              <Star className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleTogglePublishProject(proj)}
                              className={`p-1.5 rounded-lg transition-colors ${proj.published ? 'text-[#28E58B]' : 'text-[#9CA8B5]'}`}
                              title={proj.published ? 'Published' : 'Hidden'}
                            >
                              {proj.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => setEditingProject(proj)}
                              className="p-1.5 rounded-lg text-[#9CA8B5] hover:text-white"
                              title="Edit Project"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 4. CONTENT TAB */}
              {activeTab === 'content' && siteContent && (
                <form onSubmit={handleSaveContent} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#F5F7FA]">
                      Site Content &amp; Headlines
                    </h3>
                    {contentSaveSuccess && (
                      <span className="text-xs font-mono text-[#28E58B] flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Saved successfully
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#9CA8B5] mb-1">Hero Main Headline</label>
                    <input
                      type="text"
                      value={siteContent.heroHeadline}
                      onChange={(e) => setSiteContent({ ...siteContent, heroHeadline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#03151F] border border-white/10 text-xs text-[#F5F7FA]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#9CA8B5] mb-1">Hero Supporting Line</label>
                    <textarea
                      rows={2}
                      value={siteContent.heroSupportingLine}
                      onChange={(e) => setSiteContent({ ...siteContent, heroSupportingLine: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#03151F] border border-white/10 text-xs text-[#F5F7FA]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#9CA8B5] mb-1">Currently Building Status Line</label>
                    <input
                      type="text"
                      value={siteContent.currentlyBuilding}
                      onChange={(e) => setSiteContent({ ...siteContent, currentlyBuilding: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#03151F] border border-white/10 text-xs text-[#F5F7FA]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#9CA8B5] mb-1">Profile Photo URL</label>
                    <input
                      type="text"
                      value={siteContent.profilePhotoUrl || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, profilePhotoUrl: e.target.value })}
                      placeholder="Paste image link or upload in Hero section"
                      className="w-full px-3 py-2 rounded-xl bg-[#03151F] border border-white/10 text-xs text-[#F5F7FA]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#9CA8B5] mb-1">LinkedIn Profile</label>
                      <input
                        type="text"
                        value={siteContent.socials?.linkedin || ''}
                        onChange={(e) =>
                          setSiteContent({
                            ...siteContent,
                            socials: { ...siteContent.socials, linkedin: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#03151F] border border-white/10 text-xs text-[#F5F7FA]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#9CA8B5] mb-1">GitHub Profile</label>
                      <input
                        type="text"
                        value={siteContent.socials?.github || ''}
                        onChange={(e) =>
                          setSiteContent({
                            ...siteContent,
                            socials: { ...siteContent.socials, github: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#03151F] border border-white/10 text-xs text-[#F5F7FA]"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button variant="emerald" size="md" type="submit" icon={<Save className="w-3.5 h-3.5" />}>
                      Save Content Changes
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
