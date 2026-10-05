import { useState, useRef } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Workflow,
  Boxes,
  ListOrdered,
  Calculator,
  GripVertical,
  RotateCcw,
  AlertCircle,
  Sparkles,
  Trophy,
  Info,
} from 'lucide-react';
import {
  useEvaluation,
  useSelectedPhase,
  useSelectedScenario,
} from '@/context/EvaluationContext';
import {
  SDLC_PHASES,
  SCENARIOS,
  PARAMETERS,
  CSPS,
} from '@/data/projectData';
import { Card, Badge, SectionTitle, ProgressBar, Notification } from '@/components/ui';
import { ScoreBarChart, WeightBarChart } from '@/components/charts/Charts';
import { formatScore, cn } from '@/lib/utils';
import { validateRanking } from '@/lib/prplw';
import type { PageId } from '@/components/Layout';

interface EvaluationPageProps {
  onNavigate: (page: PageId) => void;
}

const PARAM_ICONS: Record<string, string> = {
  cost: 'DollarSign',
  security: 'ShieldCheck',
  performance: 'Zap',
  reliability: 'HeartPulse',
  scalability: 'TrendingUp',
  greenScore: 'Leaf',
  probabilityIndex: 'Target',
};

export function EvaluationPage({ onNavigate }: EvaluationPageProps) {
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    selectedPhaseId,
    selectedScenarioId,
    customProjectName,
    parameterRanking,
    recommendation,
    setPhase,
    setScenario,
    setCustomProjectName,
    updateParameterRank,
    applyPhasePriorities,
    applyScenarioPriorities,
    resetEvaluation,
    advancedSimulation,
    toggleAdvancedSimulation,
    cspRatings,
    setCSPRating,
  } = useEvaluation();

  const phase = useSelectedPhase();
  const scenario = useSelectedScenario();
  const displayScenarioName = selectedScenarioId === 'custom' && customProjectName.trim()
    ? customProjectName.trim()
    : scenario.name;
  const dragParam = useRef<string | null>(null);
  const [dragOverParam, setDragOverParam] = useState<string | null>(null);

  const steps = [
    { num: 1, label: 'SDLC Phase', icon: Workflow },
    { num: 2, label: 'Scenario', icon: Boxes },
    { num: 3, label: 'Parameter Priority', icon: ListOrdered },
    { num: 4, label: 'Results', icon: Calculator },
  ];

  const handleDragStart = (paramId: string) => {
    dragParam.current = paramId;
  };

  const handleDragOver = (e: React.DragEvent, paramId: string) => {
    e.preventDefault();
    setDragOverParam(paramId);
  };

  const handleDrop = (e: React.DragEvent, targetParamId: string) => {
    e.preventDefault();
    const sourceParamId = dragParam.current;
    if (sourceParamId && sourceParamId !== targetParamId) {
      const sourceRank = parameterRanking[sourceParamId];
      const targetRank = parameterRanking[targetParamId];
      updateParameterRank(sourceParamId, targetRank);
      // After updateParameterRank shifts others, we need to set the target to sourceRank
      // Actually simpler: swap the two parameters' ranks
      // Let's use swapParameters instead — but we don't have it exposed cleanly here
      // Actually we can just swap
    }
    dragParam.current = null;
    setDragOverParam(null);
  };

  // Better approach: use swap on drop
  const handleDropSwap = (e: React.DragEvent, targetParamId: string) => {
    e.preventDefault();
    const sourceParamId = dragParam.current;
    if (sourceParamId && sourceParamId !== targetParamId) {
      // Swap ranks between source and target
      const sourceRank = parameterRanking[sourceParamId];
      const targetRank = parameterRanking[targetParamId];
      // Use updateParameterRank to move source to target's position
      // This shifts everything in between
      updateParameterRank(sourceParamId, targetRank);
    }
    dragParam.current = null;
    setDragOverParam(null);
  };

  const handleRankChange = (paramId: string, newRank: number) => {
    const clamped = Math.max(1, Math.min(7, newRank));
    updateParameterRank(paramId, clamped);
  };

  const validation = validateRanking(parameterRanking);

  // Sorted parameters by rank for display
  const sortedParams = [...PARAMETERS].sort(
    (a, b) => parameterRanking[a.id] - parameterRanking[b.id]
  );

  const canProceed = () => {
    if (step === 1) return !!selectedPhaseId;
    if (step === 2) {
      if (!selectedScenarioId) return false;
      if (selectedScenarioId === 'custom') return customProjectName.trim().length > 0;
      return true;
    }
    if (step === 3) return validation.valid;
    return true;
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      if (step === 3) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    }
  };

  const handlePhaseSelect = (phaseId: string) => {
    setPhase(phaseId);
    applyPhasePriorities(phaseId);
  };

  const handleScenarioSelect = (scenarioId: string) => {
    setScenario(scenarioId);
    if (scenarioId !== 'custom') {
      setCustomProjectName('');
    }
    applyScenarioPriorities(scenarioId);
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      {showSuccess && (
        <Notification
          type="success"
          message="PRPLW weights calculated successfully! Scores and rankings updated."
          onClose={() => setShowSuccess(false)}
        />
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">New Evaluation</h1>
        <p className="text-sm text-slate-500 mt-1">
          Step-by-step CSP selection using the PRPLW algorithm
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-8 bg-white rounded-2xl border border-slate-200 p-4">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const active = step === s.num;
          const done = step > s.num;
          return (
            <div key={s.num} className="flex items-center flex-1">
              <div
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all',
                  active && 'bg-blue-50',
                  done && 'opacity-60'
                )}
              >
                <div
                  className={cn(
                    'w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all',
                    active && 'bg-blue-600 text-white shadow-md shadow-blue-600/20',
                    done && 'bg-emerald-500 text-white',
                    !active && !done && 'bg-slate-100 text-slate-400'
                  )}
                >
                  {done ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <div className="hidden sm:block">
                  <div className="text-[10px] text-slate-400 font-medium">Step {s.num}</div>
                  <div className={cn('text-sm font-semibold', active ? 'text-blue-700' : 'text-slate-600')}>
                    {s.label}
                  </div>
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div className={cn('h-0.5 flex-1 mx-2 rounded-full', done ? 'bg-emerald-300' : 'bg-slate-100')} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step 1 — SDLC Phase */}
      {step === 1 && (
        <Card className="p-6">
          <SectionTitle
            title="Select SDLC Phase"
            subtitle="Choose the current Software Development Life Cycle phase"
            icon={<Workflow className="w-5 h-5" />}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SDLC_PHASES.map((p) => {
              const selected = selectedPhaseId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePhaseSelect(p.id)}
                  className={cn(
                    'text-left p-4 rounded-xl border-2 transition-all',
                    selected
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-900">{p.name}</span>
                    {selected && <Check className="w-4 h-4 text-blue-600" />}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {p.keyParameters.map((kp) => {
                      const param = PARAMETERS.find((par) => par.id === kp);
                      return (
                        <span key={kp} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium">
                          {param?.shortName}
                        </span>
                      );
                    })}
                  </div>
                </button>
              );
            })}
          </div>
          {phase && (
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                Phase Priority Notes
              </div>
              <p className="text-sm text-slate-600">{phase.priorityNotes}</p>
            </div>
          )}
        </Card>
      )}

      {/* Step 2 — Scenario */}
      {step === 2 && (
        <Card className="p-6">
          <SectionTitle
            title="Select Application Scenario"
            subtitle="Choose the project scenario that best matches your use case"
            icon={<Boxes className="w-5 h-5" />}
          />
          <div className="grid sm:grid-cols-2 gap-3">
            {SCENARIOS.map((s) => {
              const selected = selectedScenarioId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => handleScenarioSelect(s.id)}
                  className={cn(
                    'text-left p-4 rounded-xl border-2 transition-all',
                    selected
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-900">{s.name}</span>
                    {selected && <Check className="w-4 h-4 text-blue-600" />}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-2">{s.description}</p>
                  <div className="text-[11px] text-blue-600 font-medium bg-blue-50/50 rounded-lg px-2 py-1.5">
                    {s.findings}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedScenarioId === 'custom' && (
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Project name
              </label>
              <input
                type="text"
                value={customProjectName}
                onChange={(e) => setCustomProjectName(e.target.value)}
                placeholder="e.g. Finance Risk Monitoring Platform"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <p className="mt-2 text-xs text-slate-500">
                This project name will be used when describing your custom evaluation scenario.
              </p>
            </div>
          )}
        </Card>
      )}

      {/* Step 3 — Parameter Ranking */}
      {step === 3 && (
        <div className="space-y-6">
          <Card className="p-6">
            <SectionTitle
              title="Rank Parameters by Priority"
              subtitle="Drag to reorder — Rank 1 = Highest Priority"
              icon={<ListOrdered className="w-5 h-5" />}
              action={
                <Badge variant="info">
                  <Info className="w-3 h-3" />
              Drag-and-drop or use arrows
            </Badge>
              }
            />

            {!validation.valid && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-rose-700">
                  {validation.errors.map((e, i) => (
                    <div key={i}>{e}</div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2.5">
              {sortedParams.map((param) => {
                const rank = parameterRanking[param.id];
                const weight = recommendation.weights.find((w) => w.parameterId === param.id)?.weight ?? 0;
                return (
                  <div
                    key={param.id}
                    draggable
                    onDragStart={() => handleDragStart(param.id)}
                    onDragOver={(e) => handleDragOver(e, param.id)}
                    onDrop={(e) => handleDropSwap(e, param.id)}
                    onDragEnd={() => setDragOverParam(null)}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-xl border-2 transition-all bg-white',
                      dragOverParam === param.id
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    )}
                  >
                    <GripVertical className="w-4 h-4 text-slate-300 cursor-grab active:cursor-grabbing" />

                    {/* Rank badge */}
                    <div
                      className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0',
                        rank === 1 ? 'bg-amber-100 text-amber-700' :
                        rank === 2 ? 'bg-slate-100 text-slate-700' :
                        rank === 3 ? 'bg-orange-100 text-orange-700' :
                        'bg-slate-50 text-slate-500'
                      )}
                    >
                      {rank}
                    </div>

                    {/* Parameter info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-900">{param.name}</div>
                      <div className="text-xs text-slate-500 truncate">{param.description}</div>
                    </div>

                    {/* Weight */}
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs text-slate-400">Weight</div>
                      <div className="text-sm font-bold text-indigo-600">{(weight * 100).toFixed(0)}%</div>
                    </div>

                    {/* Up/Down buttons */}
                    <div className="flex flex-col gap-0.5 flex-shrink-0">
                      <button
                        onClick={() => handleRankChange(param.id, rank - 1)}
                        disabled={rank === 1}
                        className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Move up"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 rotate-90" />
                      </button>
                      <button
                        onClick={() => handleRankChange(param.id, rank + 1)}
                        disabled={rank === 7}
                        className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Move down"
                      >
                        <ArrowRight className="w-3.5 h-3.5 rotate-90" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-900">How PRPLW Weights Work</span>
              </div>
              <p className="text-xs text-indigo-700/80 leading-relaxed">
                Higher-priority parameters receive greater weight in the final CSP score calculation.
                Rank 1 gets 25% weight, decreasing progressively to Rank 7 at 4%. Total weights sum to 100%.
              </p>
            </div>
          </Card>

          {/* Live weight preview */}
          <Card className="p-6">
            <SectionTitle
              title="Live Weight Preview"
              subtitle="Weights update instantly as you reorder parameters"
              icon={<Calculator className="w-5 h-5" />}
            />
            <WeightBarChart weights={recommendation.weights} height={250} />
          </Card>
        </div>
      )}

      {/* Step 4 — Results */}
      {step === 4 && (
        <div className="space-y-6">
          <Card className="p-6">
            <SectionTitle
              title="PRPLW Evaluation Results"
              subtitle={`${phase.name} phase · ${displayScenarioName} scenario`}
              icon={<Trophy className="w-5 h-5" />}
            />

            {/* Score cards */}
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {recommendation.rankings.map((r) => {
                const csp = CSPS.find((c) => c.id === r.cspId);
                const isRec = r.isRecommended;
                return (
                  <div
                    key={r.cspId}
                    className={cn(
                      'p-5 rounded-2xl border-2 transition-all',
                      isRec
                        ? 'border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 shadow-md'
                        : 'border-slate-200 bg-white'
                    )}
                  >
                    {isRec && (
                      <div className="mb-2">
                        <Badge variant="warning">
                          <Trophy className="w-3 h-3" />
                          Recommended CSP
                        </Badge>
                      </div>
                    )}
                    <div className="text-2xl font-bold text-slate-900">{r.cspName}</div>
                    <div className="text-xs text-slate-500 mb-3">{csp?.fullName}</div>
                    <div className="text-xs text-slate-400">PRPLW Score</div>
                    <div className="text-3xl font-bold text-slate-900">{formatScore(r.score)}</div>
                    <div className="text-xs text-slate-500 mt-1">Rank #{r.rank}</div>
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900">
                  Why {recommendation.recommendedCSP?.name}?
                </span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {recommendation.explanation}
              </p>
            </div>

            <ScoreBarChart scores={recommendation.scores} />

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onNavigate('results')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                View Full Results
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('comparison')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Compare CSPs
              </button>
              <button
                onClick={() => onNavigate('predictive')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Predictive Analytics
              </button>
            </div>
          </Card>

          {/* Advanced Simulation */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Advanced Simulation Mode</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Modify CSP ratings to test different scenarios (useful for viva demonstration)
                </p>
              </div>
              <button
                onClick={toggleAdvancedSimulation}
                className={cn(
                  'relative w-12 h-6 rounded-full transition-colors',
                  advancedSimulation ? 'bg-emerald-500' : 'bg-slate-200'
                )}
              >
                <div
                  className={cn(
                    'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform',
                    advancedSimulation ? 'translate-x-6' : 'translate-x-0.5'
                  )}
                />
              </button>
            </div>

            {advancedSimulation && (
              <div className="mt-4 space-y-4">
                <Badge variant="warning">Simulation Mode: Active — Ratings are editable</Badge>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 px-3 font-semibold text-slate-600">Parameter</th>
                        {CSPS.map((csp) => (
                          <th key={csp.id} className="text-center py-2 px-3 font-semibold text-slate-600">
                            {csp.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PARAMETERS.map((param) => (
                        <tr key={param.id} className="border-b border-slate-100">
                          <td className="py-2 px-3 font-medium text-slate-700">{param.name}</td>
                          {CSPS.map((csp) => (
                            <td key={csp.id} className="text-center py-2 px-3">
                              <input
                                type="number"
                                min={0}
                                max={10}
                                value={cspRatings[csp.id][param.id]}
                                onChange={(e) => setCSPRating(csp.id, param.id, parseFloat(e.target.value) || 0)}
                                className="w-16 text-center px-2 py-1 rounded-lg border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm font-semibold"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500">
                  Scores, rankings and recommendation update in real-time as you change ratings.
                </p>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => step > 1 && setStep(step - 1)}
          disabled={step === 1}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-colors',
            step === 1
              ? 'text-slate-300 cursor-not-allowed'
              : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50'
          )}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Reset evaluation to defaults?')) {
                resetEvaluation();
                setStep(1);
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-slate-500 hover:text-slate-700 text-sm font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>

          {step < 4 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={cn(
                'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-colors',
                canProceed()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              )}
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('results')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
            >
              <Check className="w-4 h-4" />
              View Full Results
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
