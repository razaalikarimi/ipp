import { Card } from './ui/card';
import { Button } from './ui/button';
import {
  BookOpen, Users, FileText, Award, Globe, ArrowRight,
  Sparkles, TrendingUp, Clock, CheckCircle, Star, Zap,
  GraduationCap, Microscope, Brain, Atom,
} from 'lucide-react';

const stats = [
  { icon: FileText, value: '1,247', label: 'Articles Published', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
  { icon: Users, value: '850+', label: 'Contributing Authors', color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50' },
  { icon: Globe, value: '45', label: 'Countries', color: 'from-violet-500 to-violet-600', bg: 'bg-violet-50' },
  { icon: Award, value: '3.245', label: 'Impact Factor', color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50' },
];

const features = [
  {
    icon: Zap,
    title: 'Rapid Publication',
    description: 'Average review-to-publication in just 45 days with our streamlined editorial process.',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Accessible to millions of researchers across 45+ countries worldwide.',
    gradient: 'from-blue-400 to-cyan-500',
  },
  {
    icon: CheckCircle,
    title: 'Rigorous Peer Review',
    description: 'Double-blind peer review by leading domain experts ensures quality.',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    icon: Star,
    title: 'Open Access',
    description: 'Free, unrestricted access promotes wider dissemination and higher citations.',
    gradient: 'from-violet-400 to-purple-500',
  },
];

const highlights = [
  {
    month: 'February 2026',
    title: 'Special Issue: AI in Healthcare',
    description: 'Featuring 12 groundbreaking papers on artificial intelligence applications in medical diagnostics and treatment planning.',
    tag: 'Featured',
    tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    month: 'January 2026',
    title: 'Most Cited Article Award',
    description: '"Climate Modeling with Machine Learning" by Dr. Sarah Johnson reached 500+ citations in just 6 months.',
    tag: 'Trending',
    tagColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    month: 'December 2025',
    title: 'Impact Factor Update',
    description: 'JCSRA achieves a new impact factor of 3.245, marking a 15% increase from the previous year.',
    tag: 'Milestone',
    tagColor: 'bg-amber-100 text-amber-700',
  },
];

const disciplines = [
  { icon: Brain, name: 'Neuroscience', papers: 142 },
  { icon: Atom, name: 'Physics', papers: 198 },
  { icon: Microscope, name: 'Biomedical', papers: 231 },
  { icon: GraduationCap, name: 'Education', papers: 87 },
];

interface HomePageProps {
  onTabChange: (tab: string) => void;
}

export function HomePage({ onTabChange }: HomePageProps) {
  return (
    <div className="space-y-10">
      {/* ── Hero Section ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-8 md:p-12">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-cyan-400/5 rounded-full blur-2xl" />

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-blue-100">Volume 28, Issue 1 — Now Available</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
            Advancing Scientific
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
              Knowledge Together
            </span>
          </h1>

          <p className="text-lg md:text-xl text-blue-200/80 mb-8 leading-relaxed max-w-2xl">
            JCSRA publishes peer-reviewed, open-access research across all scientific
            disciplines. Join thousands of researchers worldwide pushing the boundaries of discovery.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-blue-50 font-semibold px-6 shadow-lg shadow-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-0.5"
              onClick={() => onTabChange('submission')}
            >
              Submit Your Research
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-6 transition-all duration-300 hover:-translate-y-0.5"
              onClick={() => onTabChange('current')}
            >
              Browse Articles
            </Button>
          </div>
        </div>

        {/* Floating badge */}
        <div className="hidden lg:flex absolute top-8 right-8 items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-extrabold text-cyan-300">3.245</div>
            <div className="text-xs text-blue-200 font-medium tracking-wider uppercase">Impact Factor</div>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div className="flex flex-col items-center">
            <div className="text-3xl font-extrabold text-emerald-300">32%</div>
            <div className="text-xs text-blue-200 font-medium tracking-wider uppercase">Accept Rate</div>
          </div>
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1"
          >
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.bg} mb-3`}>
              <stat.icon className={`h-5 w-5 bg-gradient-to-r ${stat.color} bg-clip-text`} style={{ color: 'inherit' }} />
            </div>
            <div className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
            {/* Hover accent gradient */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          </div>
        ))}
      </div>

      {/* ── About + Why Publish ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* About */}
        <Card className="relative overflow-hidden p-6 border-gray-100 hover:shadow-lg transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 text-sm text-blue-600 font-semibold mb-3">
              <BookOpen className="h-4 w-4" />
              ABOUT THE JOURNAL
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Pioneering Research Since 1998</h2>
            <p className="text-gray-600 mb-4 leading-relaxed text-sm">
              The Journal of Contemporary Scientific Research & Analysis (JCSRA) is a leading
              international peer-reviewed journal committed to publishing high-quality research
              across diverse scientific disciplines.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {['Open Access Model', 'Rigorous Peer Review', 'Major Database Indexed', 'Fast Turnaround'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Disciplines */}
        <Card className="relative overflow-hidden p-6 border-gray-100 hover:shadow-lg transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 text-sm text-violet-600 font-semibold mb-3">
              <Microscope className="h-4 w-4" />
              RESEARCH DISCIPLINES
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Multidisciplinary Coverage</h2>
            <div className="space-y-3">
              {disciplines.map((d) => (
                <div key={d.name} className="flex items-center gap-3 group/item">
                  <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center group-hover/item:bg-violet-100 transition-colors">
                    <d.icon className="h-4 w-4 text-violet-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{d.name}</span>
                      <span className="text-xs text-gray-500">{d.papers} papers</span>
                    </div>
                    <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-400 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${(d.papers / 250) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* ── Why Publish With Us ── */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
          <h2 className="text-xl font-bold text-gray-900">Why Publish With Us?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} mb-3 shadow-sm`}>
                <feature.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              {/* Subtle hover highlight */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 transition-opacity duration-500`} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent Highlights ── */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-8 w-1 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full" />
          <h2 className="text-xl font-bold text-gray-900">Recent Highlights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              onClick={() => onTabChange('current')}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.tagColor}`}>
                  {item.tag}
                </span>
                <span className="text-xs text-gray-400">{item.month}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              <div className="mt-3 flex items-center gap-1 text-sm text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Read more <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Call to Action ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 md:p-10 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Ready to Share Your Research?</h3>
            <p className="text-blue-100 max-w-xl">
              Submit your manuscript today and join a global community of researchers advancing scientific knowledge.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-white text-indigo-700 hover:bg-blue-50 font-semibold px-8 shadow-lg shadow-indigo-900/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex-shrink-0"
            onClick={() => onTabChange('submission')}
          >
            Submit Manuscript
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
