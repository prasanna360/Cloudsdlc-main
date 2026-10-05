import {
  Cloud,
  ArrowRight,
  Calculator,
  ShieldCheck,
  Zap,
  Leaf,
  Target,
  CheckCircle2,
  TrendingUp,
  GitCompareArrows,
  BookOpen,
  Award,
} from 'lucide-react';
import type { PageId } from '@/components/Layout';
import { CSPS, PARAMETERS, PROJECT_INFO } from '@/data/projectData';
import { Card, Badge } from '@/components/ui';

const PROCESS_STEPS = [
  { label: 'Project Requirements', icon: Target },
  { label: 'SDLC Phase', icon: BookOpen },
  { label: 'Parameter Ranking', icon: Calculator },
  { label: 'PRPLW Weights', icon: Calculator },
  { label: 'CSP Evaluation', icon: GitCompareArrows },
  { label: 'Predictive Analysis', icon: TrendingUp },
  { label: 'Recommendation', icon: Award },
];

interface LandingPageProps {
  onNavigate: (page: PageId) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const heroStats = [
    { label: 'CSPs benchmarked', value: '3' },
    { label: 'Parameters ranked', value: '7' },
    { label: 'Confidence score', value: '95%' },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#e0ecff_0%,#f8fbff_35%,#f8fafc_100%)]">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.12) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(circle at center, black 35%, transparent 100%)',
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-12 lg:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-8">
              <Badge variant="info" className="border-blue-200 bg-blue-100/80 text-blue-700 shadow-sm">
                <Cloud className="h-3.5 w-3.5" />
                Research Prototype · SRM Institute of Science and Technology
              </Badge>

              <div className="space-y-5">
                <h1 className="max-w-4xl text-4xl font-black tracking-[-0.05em] text-slate-900 sm:text-5xl lg:text-6xl">
                  Predictive Analytics-Driven Cloud Based SDLC Framework
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-600 lg:text-lg">
                  {PROJECT_INFO.subtitle}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => onNavigate('evaluation')}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Start Evaluation
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onNavigate('methodology')}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-6 py-3.5 font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
                >
                  <BookOpen className="h-4 w-4" />
                  Explore Methodology
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                    <div className="text-2xl font-black tracking-tight text-slate-900">{stat.value}</div>
                    <div className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-[#f3f8fb] p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.10)_1px,transparent_1px)] bg-[size:42px_42px] opacity-80" />

              <div className="relative flex items-center justify-between pb-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                  Workflow
                </div>
                <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                  Live
                </span>
              </div>

              <div className="relative space-y-3 pt-2">
                {PROCESS_STEPS.slice(0, 5).map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 p-3 shadow-sm backdrop-blur-sm">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 shadow-inner shadow-sky-200/70">
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="flex flex-1 items-center gap-3 text-left">
                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                          Step {idx + 1}
                        </span>
                        <span className="text-base font-medium text-slate-700">{step.label}</span>
                      </div>

                      <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-16 lg:mt-20">
            <div className="hidden lg:flex items-center justify-between gap-3">
              {PROCESS_STEPS.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="flex flex-1 items-center gap-3">
                    <div className="flex w-full flex-col items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 text-blue-600 shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-center text-[11px] font-semibold leading-tight text-slate-600">
                        {step.label}
                      </span>
                    </div>
                    {idx < PROCESS_STEPS.length - 1 && (
                      <ArrowRight className="mt-[-24px] h-4 w-4 text-slate-300" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 lg:hidden">
              {PROCESS_STEPS.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{step.label}</span>
                    {idx < PROCESS_STEPS.length - 1 && (
                      <ArrowRight className="ml-auto h-4 w-4 text-slate-300 rotate-90" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Evaluated Cloud Service Providers</h2>
          <p className="mt-2 text-sm text-slate-500">
            Three CSPs evaluated across seven parameters using the PRPLW algorithm
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {CSPS.map((csp) => (
            <Card key={csp.id} hover className="group rounded-[28px] border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black text-white shadow-md"
                  style={{ backgroundColor: csp.color }}
                >
                  {csp.name[0]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{csp.name}</h3>
                  <p className="text-xs text-slate-500">{csp.fullName}</p>
                </div>
              </div>
              <p className="mb-5 text-sm leading-relaxed text-slate-600">{csp.shortDescription}</p>
              <div className="space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Key Strengths
                </div>
                {csp.keyStrengths.map((strength, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                    <span className="text-sm text-slate-600">{strength}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50/80 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Seven Evaluation Parameters</h2>
            <p className="mt-2 text-sm text-slate-500">
              Each parameter is ranked by priority and weighted using the PRPLW algorithm
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
            {PARAMETERS.map((param, idx) => {
              const icons: Record<string, typeof Zap> = {
                cost: Calculator,
                security: ShieldCheck,
                performance: Zap,
                reliability: ShieldCheck,
                scalability: TrendingUp,
                greenScore: Leaf,
                probabilityIndex: Target,
              };
              const Icon = icons[param.id] ?? Target;
              return (
                <Card key={param.id} className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    Parameter {idx + 1}
                  </div>
                  <div className="text-sm font-semibold text-slate-800">{param.name}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Framework Capabilities</h2>
          <p className="mt-2 text-sm text-slate-500">
            A complete decision-support system for cloud provider selection
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Calculator, title: 'PRPLW Algorithm', desc: 'Parameter Ranking Priority Level Weightage dynamically assigns weights based on your priorities.' },
            { icon: GitCompareArrows, title: 'Multi-Criteria Comparison', desc: 'AWS, Azure and GCP evaluated across cost, security, performance, reliability, scalability, green score and probability.' },
            { icon: TrendingUp, title: 'Predictive Analytics', desc: 'Simulated trend analysis for cost, performance, reliability and resource demand forecasting.' },
            { icon: Leaf, title: 'Sustainability Focus', desc: 'Green score integration ensures environmental impact is part of the decision process.' },
            { icon: BookOpen, title: 'SDLC-Aware Weighting', desc: 'Parameter priorities adapt to the current Software Development Life Cycle phase.' },
            { icon: Award, title: 'Explainable Recommendations', desc: 'Dynamic "Why this CSP?" explanations generated from actual calculation results.' },
          ].map((feat, i) => {
            const Icon = feat.icon;
            return (
              <Card key={i} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{feat.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{feat.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 py-14">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to evaluate your cloud options?</h2>
          <p className="mt-3 text-blue-100">
            Run the PRPLW engine with your project's SDLC phase and parameter priorities.
          </p>
          <button
            onClick={() => onNavigate('evaluation')}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-semibold text-blue-700 shadow-lg shadow-blue-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50"
          >
            Start Evaluation
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Cloud className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-bold text-slate-900">Cloud SDLC Intelligence</span>
          </div>
          <p className="text-xs text-slate-500">
            {PROJECT_INFO.title} · {PROJECT_INFO.institution}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Research Prototype — Demonstration / Evaluation Dataset
          </p>
        </div>
      </footer>
    </div>
  );
}
