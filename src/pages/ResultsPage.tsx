import {
  Trophy,
  Download,
  Info,
  Calculator,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { useEvaluation, useSelectedPhase, useSelectedScenario } from '@/context/EvaluationContext';
import { CSPS, PARAMETERS, PROJECT_INFO, SDLC_PHASES, SCENARIOS } from '@/data/projectData';
import { Card, Badge, SectionTitle, ProgressBar } from '@/components/ui';
import { CSPRadarChart, ScoreBarChart, WeightBarChart } from '@/components/charts/Charts';
import { formatScore, cn } from '@/lib/utils';

export function ResultsPage() {
  const { recommendation, parameterRanking, cspRatings, customProjectName, selectedScenarioId } = useEvaluation();
  const phase = useSelectedPhase();
  const scenario = useSelectedScenario();
  const displayScenarioName = selectedScenarioId === 'custom' && customProjectName.trim()
    ? customProjectName.trim()
    : scenario.name;
  const { rankings, scores, weights, explanation, topParameters, recommendedCSP, marginFromSecond } = recommendation;

  const handleDownloadReport = () => {
    const report = generateReportText();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cloud_SDLC_Evaluation_Report_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateReportText = () => {
    const lines: string[] = [];
    lines.push('=================================================');
    lines.push('  CLOUD SDLC INTELLIGENCE');
    lines.push(`  ${PROJECT_INFO.title}`);
    lines.push('=================================================');
    lines.push('');
    lines.push(`Generated: ${new Date().toLocaleString()}`);
    lines.push(`Status: ${PROJECT_INFO.disclaimer}`);
    lines.push('');
    lines.push('--- EVALUATION INPUTS ---');
    lines.push('');
    lines.push(`SDLC Phase: ${phase.name}`);
    lines.push(`  Description: ${phase.description}`);
    lines.push('');
    lines.push(`Scenario: ${displayScenarioName}`);
    lines.push(`  Description: ${scenario.description}`);
    lines.push('');
    lines.push('--- PARAMETER RANKING & PRPLW WEIGHTS ---');
    lines.push('');
    lines.push('Rank | Parameter          | Weight');
    lines.push('-----|--------------------|--------');
    [...weights].sort((a, b) => a.rank - b.rank).forEach((w) => {
      lines.push(` ${String(w.rank).padStart(2)} | ${w.parameterName.padEnd(18)} | ${(w.weight * 100).toFixed(0)}%`);
    });
    const totalW = weights.reduce((s, w) => s + w.weight, 0);
    lines.push(`     | ${'Total'.padEnd(18)} | ${(totalW * 100).toFixed(0)}%`);
    lines.push('');
    lines.push('--- CSP EVALUATION RATINGS ---');
    lines.push('');
    lines.push('Parameter          |  AWS | Azure | GCP');
    lines.push('-------------------|------|-------|-----');
    PARAMETERS.forEach((p) => {
      lines.push(
        `${p.name.padEnd(18)} | ${String(cspRatings.aws[p.id]).padStart(4)} | ${String(cspRatings.azure[p.id]).padStart(5)} | ${String(cspRatings.gcp[p.id]).padStart(3)}`
      );
    });
    lines.push('');
    lines.push('--- PRPLW SCORE CALCULATION ---');
    lines.push('');
    lines.push('Formula: Score = Sum(Rating x Weight)');
    lines.push('');
    scores.forEach((s) => {
      lines.push(`${s.cspName}:`);
      s.details.forEach((d) => {
        lines.push(`  ${d.parameterName.padEnd(18)}: ${d.rating} x ${d.weight.toFixed(2)} = ${d.contribution.toFixed(2)}`);
      });
      lines.push(`  ${'TOTAL'.padEnd(22)} = ${s.score.toFixed(2)}`);
      lines.push('');
    });
    lines.push('--- FINAL RANKING ---');
    lines.push('');
    rankings.forEach((r) => {
      const marker = r.isRecommended ? ' *** RECOMMENDED ***' : '';
      lines.push(`  Rank ${r.rank}: ${r.cspName} — Score: ${r.score.toFixed(2)}${marker}`);
    });
    lines.push('');
    lines.push(`Margin from second place: ${marginFromSecond.toFixed(2)}`);
    lines.push('');
    lines.push('--- RECOMMENDATION EXPLANATION ---');
    lines.push('');
    lines.push(explanation);
    lines.push('');
    lines.push('--- TOP INFLUENCING PARAMETERS ---');
    lines.push('');
    topParameters.forEach((p, i) => {
      lines.push(`  ${i + 1}. ${p.parameterName} (Weight: ${(p.weight * 100).toFixed(0)}%)`);
    });
    lines.push('');
    lines.push('--- EVALUATION SUMMARY ---');
    lines.push('');
    lines.push(`Recommended CSP: ${recommendedCSP?.name ?? 'N/A'} (${recommendedCSP?.fullName ?? ''})`);
    lines.push(`PRPLW Score: ${rankings[0]?.score.toFixed(2) ?? 'N/A'}`);
    lines.push(`SDLC Phase: ${phase.name}`);
    lines.push(`Scenario: ${displayScenarioName}`);
    lines.push('');
    lines.push('=================================================');
    lines.push('  Note: All ratings are project evaluation /');
    lines.push('  demonstration data, not live cloud benchmarks.');
    lines.push('=================================================');

    return lines.join('\n');
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Results</h1>
          <p className="text-sm text-slate-500 mt-1">
            Complete evaluation summary with exportable report
          </p>
        </div>
        <button
          onClick={handleDownloadReport}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          Download Evaluation Report
        </button>
      </div>

      {/* Summary banner */}
      <Card className={cn('p-6', recommendedCSP && 'ring-2 ring-amber-200')}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Recommended CSP</div>
              <div className="text-2xl font-bold text-slate-900">{recommendedCSP?.name}</div>
              <div className="text-sm text-slate-500">{recommendedCSP?.fullName}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide">PRPLW Score</div>
            <div className="text-3xl font-bold text-blue-600">{formatScore(rankings[0]?.score ?? 0)}</div>
            <div className="text-xs text-slate-500">Margin: +{marginFromSecond.toFixed(2)}</div>
          </div>
        </div>
      </Card>

      {/* Context */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="info">SDLC Phase: {phase.name}</Badge>
        <Badge variant="default">Scenario: {displayScenarioName}</Badge>
        <Badge variant="warning">
          <Info className="w-3 h-3" />
          Demonstration / Evaluation Data
        </Badge>
      </div>

      {/* Explanation */}
      <Card className="p-6">
        <SectionTitle title={`Why ${recommendedCSP?.name}?`} subtitle="Dynamic recommendation explanation" icon={<Info className="w-5 h-5" />} />
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
          <p className="text-sm text-slate-700 leading-relaxed">{explanation}</p>
        </div>
        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          {topParameters.map((p, idx) => (
            <div key={p.parameterId} className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="text-xs text-slate-400 font-semibold">#{idx + 1} Influencing Parameter</div>
              <div className="text-sm font-bold text-slate-900 mt-1">{p.parameterName}</div>
              <div className="mt-2">
                <ProgressBar value={p.weight * 100} color="bg-indigo-500" />
                <div className="text-xs text-slate-500 mt-1 text-right">{(p.weight * 100).toFixed(0)}% weight</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <SectionTitle title="Score Comparison" icon={<Trophy className="w-5 h-5" />} />
          <ScoreBarChart scores={scores} />
        </Card>
        <Card className="p-6">
          <SectionTitle title="CSP Radar" icon={<Calculator className="w-5 h-5" />} />
          <CSPRadarChart ratings={cspRatings} height={300} />
        </Card>
      </div>

      <Card className="p-6">
        <SectionTitle title="Parameter Weights" icon={<Calculator className="w-5 h-5" />} />
        <WeightBarChart weights={weights} height={280} />
      </Card>

      {/* Detailed scores */}
      <Card className="p-6">
        <SectionTitle title="Score Breakdown" subtitle="Contribution of each parameter to each CSP's score" icon={<FileText className="w-5 h-5" />} />
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
                const weight = weights.find((w) => w.parameterId === param.id)?.weight ?? 0;
                return (
                  <tr key={param.id} className="border-b border-slate-100">
                    <td className="py-2.5 px-3 font-medium text-slate-700">{param.name}</td>
                    <td className="text-center py-2.5 px-3 text-indigo-600 font-semibold">{(weight * 100).toFixed(0)}%</td>
                    {CSPS.map((csp) => {
                      const rating = cspRatings[csp.id][param.id];
                      const contribution = rating * weight;
                      return (
                        <td key={csp.id} className="text-center py-2.5 px-3">
                          <div className="text-xs text-slate-400">{rating} × {weight.toFixed(2)}</div>
                          <div className="text-sm font-semibold text-slate-800">{contribution.toFixed(2)}</div>
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
                    <span className={cn('font-bold text-base', r.isRecommended ? 'text-amber-600' : 'text-blue-600')}>
                      {formatScore(r.score)}
                    </span>
                    {r.isRecommended && <Badge variant="warning" className="ml-1">#1</Badge>}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Evaluation summary */}
      <Card className="p-6">
        <SectionTitle title="Evaluation Summary" icon={<CheckCircle2 className="w-5 h-5" />} />
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="text-sm text-slate-600">Recommended CSP</span>
              <span className="text-sm font-bold text-slate-900">{recommendedCSP?.name}</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="text-sm text-slate-600">PRPLW Score</span>
              <span className="text-sm font-bold text-slate-900">{formatScore(rankings[0]?.score ?? 0)}</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="text-sm text-slate-600">Margin from 2nd</span>
              <span className="text-sm font-bold text-slate-900">{marginFromSecond.toFixed(2)}</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="text-sm text-slate-600">SDLC Phase</span>
              <span className="text-sm font-bold text-slate-900">{phase.name}</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="text-sm text-slate-600">Scenario</span>
              <span className="text-sm font-bold text-slate-900">{displayScenarioName}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Ranking</div>
            {rankings.map((r) => (
              <div key={r.cspId} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center',
                    r.rank === 1 ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'
                  )}>{r.rank}</span>
                  <span className="text-sm font-medium text-slate-700">{r.cspName}</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{formatScore(r.score)}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
