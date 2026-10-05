import {
  Trophy,
  Calculator,
  ShieldCheck,
  Zap,
  HeartPulse,
  TrendingUp,
  Leaf,
  Target,
  ArrowRight,
  Info,
} from 'lucide-react';
import { useEvaluation, useSelectedPhase, useSelectedScenario } from '@/context/EvaluationContext';
import { CSPS } from '@/data/projectData';
import { Card, Badge, SectionTitle, ProgressBar } from '@/components/ui';
import { CSPRadarChart, ScoreBarChart, WeightBarChart } from '@/components/charts/Charts';
import { getRatingLabel } from '@/lib/prplw';
import { formatScore } from '@/lib/utils';
import type { PageId } from '@/components/Layout';

interface DashboardPageProps {
  onNavigate: (page: PageId) => void;
}

// Helper to get the highest-rated CSP for a given parameter
function getTopCSPForParameter(
  parameterId: string,
  cspRatings: Record<string, Record<string, number>>
) {
  let topCsp = CSPS[0];
  let topRating = 0;
  for (const csp of CSPS) {
    const rating = cspRatings[csp.id]?.[parameterId] ?? 0;
    if (rating > topRating) {
      topRating = rating;
      topCsp = csp;
    }
  }
  return { csp: topCsp, rating: topRating };
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { recommendation, cspRatings, customProjectName, selectedScenarioId } = useEvaluation();
  const phase = useSelectedPhase();
  const scenario = useSelectedScenario();
  const displayScenarioName = selectedScenarioId === 'custom' && customProjectName.trim()
    ? customProjectName.trim()
    : scenario.name;

  const rec = recommendation.recommendedCSP;
  const rankings = recommendation.rankings;
  const topScore = rankings[0]?.score ?? 0;

  const kpiCards = [
    {
      label: 'Recommended CSP',
      value: rec?.name ?? '—',
      sub: rec?.fullName ?? '',
      icon: Trophy,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      ring: 'ring-amber-100',
    },
    {
      label: 'Highest PRPLW Score',
      value: formatScore(topScore),
      sub: `out of 10.00`,
      icon: Calculator,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      ring: 'ring-blue-100',
    },
    {
      label: 'Highest Security',
      ...(() => {
        const top = getTopCSPForParameter('security', cspRatings);
        return { value: top.csp.name, sub: `Rating: ${top.rating}/10` };
      })(),
      icon: ShieldCheck,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      ring: 'ring-indigo-100',
    },
    {
      label: 'Highest Performance',
      ...(() => {
        const top = getTopCSPForParameter('performance', cspRatings);
        return { value: top.csp.name, sub: `Rating: ${top.rating}/10` };
      })(),
      icon: Zap,
      color: 'text-sky-600',
      bg: 'bg-sky-50',
      ring: 'ring-sky-100',
    },
    {
      label: 'Highest Reliability',
      ...(() => {
        const top = getTopCSPForParameter('reliability', cspRatings);
        return { value: top.csp.name, sub: `Rating: ${top.rating}/10` };
      })(),
      icon: HeartPulse,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      ring: 'ring-rose-100',
    },
    {
      label: 'Highest Scalability',
      ...(() => {
        const top = getTopCSPForParameter('scalability', cspRatings);
        return { value: top.csp.name, sub: `Rating: ${top.rating}/10` };
      })(),
      icon: TrendingUp,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      ring: 'ring-emerald-100',
    },
    {
      label: 'Highest Green Score',
      ...(() => {
        const top = getTopCSPForParameter('greenScore', cspRatings);
        return { value: top.csp.name, sub: `Rating: ${top.rating}/10` };
      })(),
      icon: Leaf,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      ring: 'ring-teal-100',
    },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Cloud SDLC Intelligence Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time overview of evaluation results and CSP performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="warning">
            <Info className="w-3 h-3" />
            Evaluation Dataset: Demonstration / Project Data
          </Badge>
        </div>
      </div>

      {/* Context bar */}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="text-slate-500">Current context:</span>
        <Badge variant="info">SDLC Phase: {phase.name}</Badge>
        <Badge variant="default">Scenario: {displayScenarioName}</Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card key={idx} className={`p-5 ring-1 ${kpi.ring}`}>
              <div className={`w-10 h-10 rounded-xl ${kpi.bg} ${kpi.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-500 font-medium">{kpi.label}</div>
              <div className="text-xl font-bold text-slate-900 mt-0.5">{kpi.value}</div>
              {kpi.sub && <div className="text-xs text-slate-400 mt-0.5">{kpi.sub}</div>}
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <SectionTitle
            title="CSP Performance Radar"
            subtitle="AWS vs Azure vs GCP across all parameters"
            icon={<Target className="w-5 h-5" />}
          />
          <CSPRadarChart ratings={cspRatings} />
        </Card>

        <Card className="p-6">
          <SectionTitle
            title="PRPLW Score Ranking"
            subtitle="Weighted scores based on current parameter priorities"
            icon={<Trophy className="w-5 h-5" />}
          />
          <ScoreBarChart scores={recommendation.scores} />
          <div className="mt-4 space-y-2">
            {rankings.map((r) => (
              <div key={r.cspId} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                    r.rank === 1 ? 'bg-amber-100 text-amber-700' :
                    r.rank === 2 ? 'bg-slate-100 text-slate-600' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {r.rank}
                  </span>
                  <span className="font-medium text-slate-700">{r.cspName}</span>
                  {r.isRecommended && <Badge variant="success">Recommended</Badge>}
                </div>
                <span className="font-bold text-slate-900">{formatScore(r.score)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <SectionTitle
            title="Parameter Weight Distribution"
            subtitle="PRPLW weights based on current ranking"
            icon={<Calculator className="w-5 h-5" />}
          />
          <WeightBarChart weights={recommendation.weights} />
        </Card>

        <Card className="p-6">
          <SectionTitle
            title={`Why ${rec?.name ?? 'This CSP'}?`}
            subtitle="Dynamic recommendation explanation"
            icon={<Info className="w-5 h-5" />}
          />
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
            <p className="text-sm text-slate-700 leading-relaxed">
              {recommendation.explanation}
            </p>
          </div>
          <div className="mt-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
              Top Influencing Parameters
            </div>
            <div className="space-y-3">
              {recommendation.topParameters.map((p, idx) => (
                <div key={p.parameterId}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">
                      {idx + 1}. {p.parameterName}
                    </span>
                    <span className="text-slate-500 font-semibold">{(p.weight * 100).toFixed(0)}%</span>
                  </div>
                  <ProgressBar value={p.weight * 100} color="bg-indigo-500" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* CTA */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Run a new evaluation</h3>
            <p className="text-sm text-slate-600 mt-1">
              Change SDLC phase, scenario and parameter priorities to see how the recommendation adapts.
            </p>
          </div>
          <button
            onClick={() => onNavigate('evaluation')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Start Evaluation
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Card>
    </div>
  );
}


