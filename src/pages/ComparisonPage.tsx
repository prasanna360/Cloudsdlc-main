import {
  GitCompareArrows,
  Trophy,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { useEvaluation } from '@/context/EvaluationContext';
import { CSPS, PARAMETERS, SCENARIO_FINDINGS } from '@/data/projectData';
import { Card, Badge, SectionTitle, ProgressBar } from '@/components/ui';
import { CSPRadarChart, ComparisonBarChart, ScoreBarChart } from '@/components/charts/Charts';
import { getRatingLabel } from '@/lib/prplw';
import { formatScore, cn } from '@/lib/utils';

export function ComparisonPage() {
  const { recommendation, cspRatings } = useEvaluation();
  const { rankings, scores } = recommendation;

  const comparisonData = PARAMETERS.map((p) => ({
    parameter: p.shortName,
    aws: cspRatings.aws[p.id],
    azure: cspRatings.azure[p.id],
    gcp: cspRatings.gcp[p.id],
  }));

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">CSP Comparison</h1>
        <p className="text-sm text-slate-500 mt-1">
          Detailed comparison of AWS, Azure and GCP across all evaluation parameters
        </p>
      </div>

      <Badge variant="warning">
        <Info className="w-3 h-3" />
        Evaluation Dataset: Demonstration / Project Data
      </Badge>

      {/* Radar + Bar charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <SectionTitle title="Radar Comparison" subtitle="All parameters at a glance" icon={<GitCompareArrows className="w-5 h-5" />} />
          <CSPRadarChart ratings={cspRatings} />
        </Card>

        <Card className="p-6">
          <SectionTitle title="Parameter-by-Parameter" subtitle="Side-by-side rating comparison" icon={<GitCompareArrows className="w-5 h-5" />} />
          <ComparisonBarChart data={comparisonData} />
        </Card>
      </div>

      {/* Score comparison */}
      <Card className="p-6">
        <SectionTitle title="PRPLW Score Ranking" subtitle="Weighted scores based on current priorities" icon={<Trophy className="w-5 h-5" />} />
        <ScoreBarChart scores={scores} />
        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          {rankings.map((r) => {
            const csp = CSPS.find((c) => c.id === r.cspId);
            return (
              <div
                key={r.cspId}
                className={cn(
                  'p-4 rounded-xl border-2',
                  r.isRecommended ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-white'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900">{r.cspName}</span>
                  {r.isRecommended && <Badge variant="warning"><Trophy className="w-3 h-3" /> #1</Badge>}
                </div>
                <div className="text-2xl font-bold text-slate-900">{formatScore(r.score)}</div>
                <div className="text-xs text-slate-500 mt-1">{csp?.fullName}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Detailed table */}
      <Card className="p-6">
        <SectionTitle title="Detailed Parameter Table" subtitle="Ratings with High / Medium / Low indicators" icon={<GitCompareArrows className="w-5 h-5" />} />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 font-semibold text-slate-600">Parameter</th>
                <th className="text-center py-2.5 px-3 font-semibold text-slate-600">Weight</th>
                {CSPS.map((csp) => (
                  <th key={csp.id} className="text-center py-2.5 px-3 font-semibold text-slate-600">
                    {csp.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PARAMETERS.map((param) => {
                const weight = recommendation.weights.find((w) => w.parameterId === param.id)?.weight ?? 0;
                return (
                  <tr key={param.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-medium text-slate-800">{param.name}</td>
                    <td className="text-center py-3 px-3 text-indigo-600 font-semibold">{(weight * 100).toFixed(0)}%</td>
                    {CSPS.map((csp) => {
                      const rating = cspRatings[csp.id][param.id];
                      const label = getRatingLabel(rating);
                      const isHighest = rating === Math.max(...CSPS.map((c) => cspRatings[c.id][param.id]));
                      return (
                        <td key={csp.id} className="text-center py-3 px-3">
                          <div className="inline-flex flex-col items-center gap-0.5">
                            <span className="font-bold text-slate-800">{rating}</span>
                            <span className={cn('text-[10px] font-semibold', label.color)}>
                              {label.label}
                              {isHighest && ' ★'}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              <tr className="border-t-2 border-slate-200 bg-slate-50/50">
                <td className="py-3 px-3 font-bold text-slate-900" colSpan={2}>PRPLW Score</td>
                {rankings.map((r) => (
                  <td key={r.cspId} className="text-center py-3 px-3">
                    <span className="font-bold text-blue-600 text-base">{formatScore(r.score)}</span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Key strengths */}
      <div className="grid md:grid-cols-3 gap-4">
        {CSPS.map((csp) => {
          const ranking = rankings.find((r) => r.cspId === csp.id);
          return (
            <Card key={csp.id} className={cn('p-5', ranking?.isRecommended && 'ring-2 ring-amber-200')}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: csp.color }}>
                  {csp.name[0]}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{csp.name}</div>
                  <div className="text-xs text-slate-500">Rank #{ranking?.rank}</div>
                </div>
              </div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Key Strengths</div>
              <div className="space-y-1.5">
                {csp.keyStrengths.map((s, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-600">{s}</span>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Scenario findings */}
      <Card className="p-6">
        <SectionTitle title="Scenario Findings" subtitle="Project-documented findings for common scenarios" icon={<Info className="w-5 h-5" />} />
        <div className="space-y-3">
          {SCENARIO_FINDINGS.map((sf, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {sf.scenario[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-slate-800">{sf.scenario}</span>
                  <Badge variant="success">Best Fit: {sf.bestFit}</Badge>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{sf.finding}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-amber-600 bg-amber-50/50 rounded-lg px-3 py-2">
          Note: These are project findings based on evaluation data, not live cloud benchmarks.
        </div>
      </Card>
    </div>
  );
}
