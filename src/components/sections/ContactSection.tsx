import React, { useState, useEffect } from 'react';
import { Container } from '../ui/Container.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';
import { Button } from '../ui/Button.tsx';
import { CheckCircle2, AlertCircle, Send, Mail, MapPin, Linkedin, Github } from 'lucide-react';
import { SiteContent } from '../../types/index.ts';

interface ContactSectionProps {
  content: SiteContent;
  initialProjectType?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  content,
  initialProjectType
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Full-Stack Application',
    budget: "Let's Discuss",
    timeline: 'Flexible',
    phone: '',
    message: '',
    website_check: '' // Anti-spam honeypot
  });

  useEffect(() => {
    if (initialProjectType) {
      setFormData((prev) => ({ ...prev, projectType: initialProjectType }));
    }
  }, [initialProjectType]);

  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const projectTypeOptions = [
    'AI Application',
    'Website',
    'Full-Stack Application',
    'Automation',
    'AI Agent',
    'MVP',
    'Other'
  ];

  const budgetOptions = [
    'Under ₹10K',
    '₹10K–₹25K',
    '₹25K–₹50K',
    '₹50K+',
    "Let's Discuss"
  ];

  const timelineOptions = ['ASAP', '1–2 weeks', '1 month', 'Flexible'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic client validation
    if (!formData.name.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (formData.message.trim().length < 8) {
      setErrorMessage('Please include a short message (at least 8 characters).');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSuccessResponse(data.message || `Thanks, ${formData.name}. Your project inquiry has been received.`);
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: 'Full-Stack Application',
        budget: "Let's Discuss",
        timeline: 'Flexible',
        phone: '',
        message: '',
        website_check: ''
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-[#071E2B]/50 border-t border-white/10">
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Details & Context */}
          <div className="lg:col-span-5 space-y-8">
            <SectionHeading
              category="Get In Touch"
              title="Start a Technical Conversation"
              description="Whether you have an ambitious AI application, a full-stack project, or an internship opportunity, feel free to reach out directly."
              className="mb-8"
            />

            <div className="space-y-4">
              <a
                href={`mailto:${content.socials?.email || 'shrimyadav777@gmail.com'}`}
                className="p-4 rounded-xl bg-[#071E2B] border border-white/10 hover:border-[#28E58B]/50 transition-colors flex items-center gap-4 group"
              >
                <div className="p-2.5 rounded-lg bg-white/5 text-[#28E58B] group-hover:bg-[#28E58B]/10 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#9CA8B5] block">
                    Direct Email
                  </span>
                  <span className="text-sm font-semibold text-[#F5F7FA]">
                    {content.socials?.email || 'shrimyadav777@gmail.com'}
                  </span>
                </div>
              </a>

              <div className="p-4 rounded-xl bg-[#071E2B] border border-white/10 flex items-center gap-4">
                <div className="p-2.5 rounded-lg bg-white/5 text-[#3B82F6]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#9CA8B5] block">
                    Location &amp; Availability
                  </span>
                  <span className="text-sm font-semibold text-[#F5F7FA]">
                    India • Remote Collaborations Worldwide
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-[#9CA8B5] uppercase tracking-wider block mb-3">
                Professional Profiles
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={content.socials?.linkedin || 'https://www.linkedin.com/in/shrim-yadav-479919403/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#071E2B] border border-white/10 text-xs font-mono text-[#F5F7FA] hover:text-[#28E58B] hover:border-[#28E58B]/40 transition-colors flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4 text-[#3B82F6]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={content.socials?.github || 'https://github.com/shrimyadav'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#071E2B] border border-white/10 text-xs font-mono text-[#F5F7FA] hover:text-[#28E58B] hover:border-[#28E58B]/40 transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4 text-white" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Structured Lead-Generation Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#071E2B] border border-white/15 shadow-2xl relative">
              {/* Success State */}
              {successResponse ? (
                <div className="py-12 px-4 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#28E58B]/10 border border-[#28E58B]/30 text-[#28E58B] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#F5F7FA]">
                    Message received.
                  </h3>
                  <p className="text-sm text-[#9CA8B5] max-w-md mx-auto">
                    {successResponse}
                  </p>
                  <div className="pt-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setSuccessResponse(null)}
                    >
                      Send Another Inquiry
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot hidden input for spam bots */}
                  <input
                    type="text"
                    name="website_check"
                    value={formData.website_check}
                    onChange={(e) =>
                      setFormData({ ...formData, website_check: e.target.value })
                    }
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center gap-2.5 text-xs text-red-300">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#9CA8B5] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#03151F] border border-white/10 text-sm text-[#F5F7FA] placeholder-[#9CA8B5]/50 focus:outline-none focus:border-[#28E58B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#9CA8B5] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#03151F] border border-white/10 text-sm text-[#F5F7FA] placeholder-[#9CA8B5]/50 focus:outline-none focus:border-[#28E58B]"
                      />
                    </div>
                  </div>

                  {/* Row 2: Company & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#9CA8B5] mb-1.5">
                        Company / Organization (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="e.g. Acme Labs"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#03151F] border border-white/10 text-sm text-[#F5F7FA] placeholder-[#9CA8B5]/50 focus:outline-none focus:border-[#28E58B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#9CA8B5] mb-1.5">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+1 555-0192"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#03151F] border border-white/10 text-sm text-[#F5F7FA] placeholder-[#9CA8B5]/50 focus:outline-none focus:border-[#28E58B]"
                      />
                    </div>
                  </div>

                  {/* Row 3: Project Type */}
                  <div>
                    <label className="block text-xs font-mono text-[#9CA8B5] mb-1.5">
                      Project Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {projectTypeOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, projectType: opt })
                          }
                          className={`py-2 px-2 text-center rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                            formData.projectType === opt
                              ? 'bg-[#28E58B]/20 border border-[#28E58B] text-[#28E58B] font-bold'
                              : 'bg-[#03151F] border border-white/10 text-[#9CA8B5] hover:text-white'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Row 4: Budget Range & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#9CA8B5] mb-1.5">
                        Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-xl bg-[#03151F] border border-white/10 text-sm text-[#F5F7FA] focus:outline-none focus:border-[#28E58B]"
                      >
                        {budgetOptions.map((b) => (
                          <option key={b} value={b} className="bg-[#071E2B]">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#9CA8B5] mb-1.5">
                        Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) =>
                          setFormData({ ...formData, timeline: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-xl bg-[#03151F] border border-white/10 text-sm text-[#F5F7FA] focus:outline-none focus:border-[#28E58B]"
                      >
                        {timelineOptions.map((t) => (
                          <option key={t} value={t} className="bg-[#071E2B]">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Message */}
                  <div>
                    <label className="block text-xs font-mono text-[#9CA8B5] mb-1.5">
                      Project Details / Overview *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Outline the core objective, desired features, or problem to be solved..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#03151F] border border-white/10 text-sm text-[#F5F7FA] placeholder-[#9CA8B5]/50 focus:outline-none focus:border-[#28E58B]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="emerald"
                      size="lg"
                      loading={loading}
                      icon={<Send className="w-4 h-4" />}
                      iconPosition="right"
                      className="w-full"
                    >
                      {loading ? 'Submitting Inquiry...' : 'Send Project Inquiry'}
                    </Button>
                    <p className="text-[11px] text-[#9CA8B5] text-center mt-2.5 font-mono">
                      Submissions are stored securely and routed to Shrim Yadav
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
