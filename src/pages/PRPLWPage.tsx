import {
  Calculator,
  Info,
  TrendingUp,
  Sigma,
} from 'lucide-react';
import { useEvaluation } from '@/context/EvaluationContext';
import { PARAMETERS } from '@/data/projectData';
import { Card, Badge, SectionTitle, ProgressBar } from '@/components/ui';
import { WeightBarChart } from '@/components/charts/Charts';

export function PRPLWPage() {
  const { recommendation, parameterRanking } = useEvaluation();
  const { weights } = recommendation;

  const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">PRPLW Analysis</h1>
        <p className="text-sm text-slate-500 mt-1">
          Parameter Ranking Priority Level Weightage — the core decision-making algorithm
        </p>
      </div>

      {/* Formula */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
        <div className="flex items-center gap-2 mb-3">
          <Sigma className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">PRPLW Formula</h2>
        </div>
        <div className="bg-white rounded-xl p-6 border border-blue-100 text-center">
          <div className="text-xl font-bold text-slate-900 tracking-wide">
            PRPLW Score = <span className="text-blue-600">Σ</span> (Parameter Rating × Parameter Weight)
          </div>
        </div>
        <p className="text-sm text-slate-600 mt-4 leading-relaxed">
          For each Cloud Service Provider, the final score is calculated by multiplying each parameter's
          rating by its PRPLW weight, then summing all contributions. The CSP with the highest score is recommended.
        </p>
      </Card>

      {/* Weight table */}
      <Card className="p-6">
        <SectionTitle
          title="Parameter Weights"
          subtitle="Current weight distribution based on your parameter ranking"
          icon={<Calculator className="w-5 h-5" />}
          action={<Badge variant={Math.abs(totalWeight - 1) < 0.001 ? 'success' : 'error'}>
            Total: {(totalWeight * 100).toFixed(0)}%
          </Badge>}
        />

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 font-semibold text-slate-600">Parameter</th>
                <th className="text-center py-2.5 px-3 font-semibold text-slate-600">Rank</th>
                <th className="text-center py-2.5 px-3 font-semibold text-slate-600">Priority</th>
                <th className="text-center py-2.5 px-3 font-semibold text-slate-600">Weight</th>
                <th className="text-left py-2.5 px-3 font-semibold text-slate-600 w-1/3">Influence</th>
              </tr>
            </thead>
            <tbody>
              {weights.map((w) => {
                const param = PARAMETERS.find((p) => p.id === w.parameterId);
                const priorityLabel = w.rank <= 2 ? 'Critical' : w.rank <= 4 ? 'High' : w.rank <= 5 ? 'Medium' : 'Low';
                const priorityColor = w.rank <= 2 ? 'error' : w.rank <= 4 ? 'warning' : w.rank <= 5 ? 'info' : 'neutral';
                return (
                  <tr key={w.parameterId} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-medium text-slate-800">{w.parameterName}</td>
                    <td className="text-center py-3 px-3">
                      <span className={`inline-flex w-7 h-7 rounded-lg items-center justify-center text-sm font-bold ${
                        w.rank === 1 ? 'bg-amber-100 text-amber-700' :
                        w.rank === 2 ? 'bg-slate-100 text-slate-700' :
                        w.rank === 3 ? 'bg-orange-100 text-orange-700' :
                        'bg-slate-50 text-slate-500'
                      }`}>
                        {w.rank}
                      </span>
                    </td>
                    <td className="text-center py-3 px-3">
                      <Badge variant={priorityColor as 'error' | 'warning' | 'info' | 'neutral'}>{priorityLabel}</Badge>
                    </td>
                    <td className="text-center py-3 px-3 font-bold text-indigo-600">{(w.weight * 100).toFixed(0)}%</td>
                    <td className="py-3 px-3">
                      <ProgressBar value={w.weight * 100} color="bg-indigo-500" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Weight distribution chart */}
      <Card className="p-6">
        <SectionTitle
          title="Weight Distribution"
          subtitle="Visual representation of parameter influence"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <WeightBarChart weights={weights} height={320} />
      </Card>

      {/* Why ranking matters */}
      <Card className="p-6">
        <SectionTitle
          title="Why Does Ranking Matter?"
          icon={<Info className="w-5 h-5" />}
        />
        <div className="space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            Higher-priority parameters receive greater influence in the final CSP recommendation.
            This means that the parameter you rank as #1 contributes the most to each CSP's score,
            while the parameter ranked #7 contributes the least.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
              <div className="text-sm font-bold text-amber-800 mb-1">High Priority (Ranks 1–3)</div>
              <p className="text-xs text-amber-700/80">
                Weights of 25%, 21% and 18% — these parameters collectively account for 64% of the total
                scoring influence. They are the primary drivers of the recommendation.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
              <div className="text-sm font-bold text-slate-700 mb-1">Lower Priority (Ranks 5–7)</div>
              <p className="text-xs text-slate-600">
                Weights of 11%, 7% and 4% — these parameters provide secondary refinement to the score
                but rarely change the recommendation on their own.
              </p>
            </div>
          </div>
          <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>Demonstration:</strong> Try changing the parameter ranking in the
              <span className="font-semibold text-blue-700"> New Evaluation </span>
              page. You'll see weights, scores and the recommended CSP update in real-time —
              demonstrating how the PRPLW algorithm adapts to different project priorities.
            </p>
          </div>
        </div>
      </Card>

      {/* Contribution breakdown */}
      <Card className="p-6">
        <SectionTitle
          title="Score Contribution Breakdown"
          subtitle="How each parameter contributes to each CSP's final score"
          icon={<Sigma className="w-5 h-5" />}
        />
        <div className="space-y-4">
          {recommendation.scores.map((score) => (
            <div key={score.cspId}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-800">{score.cspName}</span>
                <span className="text-sm font-bold text-blue-600">{score.score.toFixed(2)}</span>
              </div>
              <div className="flex h-6 rounded-lg overflow-hidden">
                {score.details.map((d) => {
                  const colors: Record<string, string> = {
                    cost: 'bg-amber-400',
                    security: 'bg-indigo-400',
                    performance: 'bg-sky-400',
                    reliability: 'bg-rose-400',
                    scalability: 'bg-emerald-400',
                    greenScore: 'bg-teal-400',
                    probabilityIndex: 'bg-violet-400',
                  };
                  const pct = (d.contribution / score.score) * 100;
                  return (
                    <div
                      key={d.parameterId}
                      className={`${colors[d.parameterId]} flex items-center justify-center text-[10px] text-white font-semibold transition-all`}
                      style={{ width: `${pct}%` }}
                      title={`${d.parameterName}: ${d.contribution.toFixed(2)} (${pct.toFixed(1)}%)`}
                    >
                      {pct > 8 && d.contribution.toFixed(1)}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {PARAMETERS.map((p) => {
            const colors: Record<string, string> = {
              cost: 'bg-amber-400',
              security: 'bg-indigo-400',
              performance: 'bg-sky-400',
              reliability: 'bg-rose-400',
              scalability: 'bg-emerald-400',
              greenScore: 'bg-teal-400',
              probabilityIndex: 'bg-violet-400',
            };
            return (
              <div key={p.id} className="flex items-center gap-1.5 text-xs text-slate-600">
                <div className={`w-3 h-3 rounded ${colors[p.id]}`} />
                {p.shortName}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
