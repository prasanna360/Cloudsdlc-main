import { useState } from 'react';
import { Workflow, Info, ArrowDown, Check } from 'lucide-react';
import { useEvaluation } from '@/context/EvaluationContext';
import { SDLC_PHASES, PARAMETERS } from '@/data/projectData';
import { Card, Badge, SectionTitle, ProgressBar } from '@/components/ui';
import { cn } from '@/lib/utils';

export function SDLCPage() {
  const { selectedPhaseId, parameterRanking, recommendation, applyPhasePriorities } = useEvaluation();
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);

  const selectedPhase = SDLC_PHASES.find((p) => p.id === selectedPhaseId) ?? SDLC_PHASES[0];

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">SDLC Analysis</h1>
        <p className="text-sm text-slate-500 mt-1">
          Interactive SDLC timeline with phase-specific parameter priorities
        </p>
      </div>

      {/* Timeline */}
      <Card className="p-6">
        <SectionTitle
          title="SDLC Timeline"
          subtitle="Select a phase to see its priority recommendations"
          icon={<Workflow className="w-5 h-5" />}
        />
        {/* Desktop timeline */}
        <div className="hidden lg:flex items-center justify-between gap-2">
          {SDLC_PHASES.map((phase, idx) => {
            const selected = selectedPhaseId === phase.id;
            return (
              <div key={phase.id} className="flex items-center flex-1">
                <button
                  onClick={() => applyPhasePriorities(phase.id)}
                  onMouseEnter={() => setHoveredPhase(phase.id)}
                  onMouseLeave={() => setHoveredPhase(null)}
                  className={cn(
                    'flex flex-col items-center gap-2 px-3 py-3 rounded-xl transition-all border-2 min-w-[110px]',
                    selected
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  )}
                >
                  <div
                    className={cn(
                      'w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all',
                      selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                    )}
                  >
                    {idx + 1}
                  </div>
                  <span className={cn(
                    'text-xs font-semibold',
                    selected ? 'text-blue-700' : 'text-slate-600'
                  )}>
                    {phase.name}
                  </span>
                </button>
                {idx < SDLC_PHASES.length - 1 && (
                  <ArrowDown className="w-4 h-4 text-slate-300 rotate-[-90deg] mx-1 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
        {/* Mobile timeline */}
        <div className="lg:hidden space-y-2">
          {SDLC_PHASES.map((phase, idx) => {
            const selected = selectedPhaseId === phase.id;
            return (
              <div key={phase.id}>
                <button
                  onClick={() => applyPhasePriorities(phase.id)}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all',
                    selected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                  )}
                >
                  <div className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold',
                    selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                  )}>
                    {idx + 1}
                  </div>
                  <span className={cn('text-sm font-semibold', selected ? 'text-blue-700' : 'text-slate-600')}>
                    {phase.name}
                  </span>
                  {selected && <Check className="w-4 h-4 text-blue-600 ml-auto" />}
                </button>
                {idx < SDLC_PHASES.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="w-4 h-4 text-slate-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Phase details */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{selectedPhase.name} Phase</h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">{selectedPhase.description}</p>
          </div>
          <Badge variant="info">Phase {SDLC_PHASES.findIndex((p) => p.id === selectedPhase.id) + 1} of 7</Badge>
        </div>

        {/* Key parameters */}
        <div className="mb-6">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            Key Parameters for This Phase
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedPhase.keyParameters.map((kp) => {
              const param = PARAMETERS.find((p) => p.id === kp);
              return (
                <Badge key={kp} variant="default">
                  {param?.name}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Priority notes */}
        <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl mb-6">
          <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">
            Priority Considerations
          </div>
          <p className="text-sm text-slate-700">{selectedPhase.priorityNotes}</p>
        </div>

        {/* Current ranking */}
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
          Current Parameter Ranking (Applied to This Phase)
        </div>
        <div className="space-y-2.5">
          {[...PARAMETERS]
            .sort((a, b) => parameterRanking[a.id] - parameterRanking[b.id])
            .map((param) => {
              const rank = parameterRanking[param.id];
              const weight = recommendation.weights.find((w) => w.parameterId === param.id)?.weight ?? 0;
              const isKey = selectedPhase.keyParameters.includes(param.id);
              return (
                <div
                  key={param.id}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-xl border transition-all',
                    isKey ? 'border-blue-200 bg-blue-50/50' : 'border-slate-200 bg-white'
                  )}
                >
                  <div className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0',
                    rank === 1 ? 'bg-amber-100 text-amber-700' :
                    rank <= 3 ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-500'
                  )}>
                    {rank}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      {param.name}
                      {isKey && <Badge variant="info">Key for {selectedPhase.name}</Badge>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Weight</div>
                    <div className="text-sm font-bold text-indigo-600">{(weight * 100).toFixed(0)}%</div>
                  </div>
                  <div className="w-24">
                    <ProgressBar value={weight * 100} color="bg-indigo-500" />
                  </div>
                </div>
              );
            })}
        </div>
      </Card>

      {/* Adaptive decision-making note */}
      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-100">
        <SectionTitle title="Adaptive Decision-Making" icon={<Info className="w-5 h-5" />} />
        <p className="text-sm text-slate-700 leading-relaxed">
          The framework demonstrates adaptive decision-making by adjusting parameter priorities based on
          the selected SDLC phase. Rather than using one universal weighting scheme, the PRPLW algorithm
          recalculates weights and CSP scores whenever the phase changes — showing how the optimal cloud
          provider may differ across the software development lifecycle.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {SDLC_PHASES.map((phase) => {
            const isCurrent = selectedPhaseId === phase.id;
            return (
              <button
                key={phase.id}
                onClick={() => applyPhasePriorities(phase.id)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                  isCurrent ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                )}
              >
                {phase.name}
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
