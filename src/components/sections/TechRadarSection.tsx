import React, { useState, useEffect } from 'react';
import { Container } from '../ui/Container.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';
import { Button } from '../ui/Button.tsx';
import { TechRadarItem } from '../../types/index.ts';
import { Radar, ExternalLink, Search, RefreshCw, Sparkles, Newspaper } from 'lucide-react';

export const TechRadarSection: React.FC = () => {
  const [items, setItems] = useState<TechRadarItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('AI engineering agents full-stack trends');
  const [sourceTag, setSourceTag] = useState<string>('cached');

  const presetTopics = [
    'AI Agents & Automation',
    'Next.js Full-Stack',
    'Python FastAPI LLM',
    'Vector Search & RAG'
  ];

  const fetchRadar = async (searchTerm: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/tech-radar?q=${encodeURIComponent(searchTerm)}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
        setSourceTag(data.source || 'cached');
      }
    } catch (err) {
      console.error('Failed to fetch Tech Radar:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRadar(query);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchRadar(query.trim());
    }
  };

  const handleTopicClick = (topic: string) => {
    setQuery(topic);
    fetchRadar(topic);
  };

  return (
    <section id="radar" className="py-24 relative bg-[#03151F]">
      <Container size="lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <SectionHeading
            category="Live Technology Intelligence"
            title="AI &amp; Tech Radar"
            description="Tracking active research papers, production agent benchmarks, and full-stack runtime architectures."
            className="mb-0"
          />

          {/* Source indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#071E2B] border border-white/10 text-xs font-mono text-[#9CA8B5] shrink-0 self-start md:self-auto">
            <Radar className="w-3.5 h-3.5 text-[#28E58B] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Telemetry: {sourceTag === 'serpapi' ? 'Live SerpApi Feed' : 'Curated Stream'}</span>
          </div>
        </div>

        {/* Search & Topic Selector */}
        <div className="mb-8 p-4 rounded-2xl bg-[#071E2B] border border-white/10">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#9CA8B5] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tech radar (e.g. AI Agents, LLM benchmarks, RAG systems)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#03151F] border border-white/10 text-sm text-[#F5F7FA] placeholder-[#9CA8B5]/60 focus:outline-none focus:border-[#28E58B]"
              />
            </div>

            <Button
              type="submit"
              variant="secondary"
              size="md"
              loading={loading}
              icon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Update Radar
            </Button>
          </form>

          {/* Quick preset chips */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[#9CA8B5] mr-1">Trending Topics:</span>
            {presetTopics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => handleTopicClick(topic)}
                className={`text-xs font-mono px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  query === topic
                    ? 'bg-[#28E58B]/20 text-[#28E58B] border border-[#28E58B]/30'
                    : 'bg-white/5 text-[#9CA8B5] hover:text-white hover:bg-white/10'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Radar Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="p-6 rounded-2xl bg-[#071E2B] border border-white/10 animate-pulse h-44" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-[#071E2B] border border-white/10 hover:border-white/20 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-xs font-mono text-[#28E58B] px-2 py-0.5 rounded bg-[#28E58B]/10 border border-[#28E58B]/20">
                      {item.category || 'Technology Intelligence'}
                    </span>
                    <span className="text-[11px] font-mono text-[#9CA8B5]">
                      {item.date}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#F5F7FA] group-hover:text-white transition-colors mt-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#9CA8B5] mt-2 line-clamp-3 leading-relaxed">
                    {item.snippet}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#9CA8B5] truncate max-w-[200px]">
                    Source: {item.source}
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#60A5FA] hover:text-white transition-colors"
                  >
                    <span>Read Analysis</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};
