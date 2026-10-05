import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, ArrowDown, X } from 'lucide-react';
import { METHODOLOGY_STEPS } from '@/data/projectData';
import { Card, SectionTitle } from '@/components/ui';
import { cn } from '@/lib/utils';

export function MethodologyPage() {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [modalStep, setModalStep] = useState<typeof METHODOLOGY_STEPS[0] | null>(null);

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Methodology</h1>
        <p className="text-sm text-slate-500 mt-1">
          The research methodology behind the PRPLW-based CSP selection framework
        </p>
      </div>

      {/* Workflow */}
      <Card className="p-6">
        <SectionTitle
          title="Research Workflow"
          subtitle="Click any step to see its explanation"
          icon={<BookOpen className="w-5 h-5" />}
        />

        <div className="space-y-1">
          {METHODOLOGY_STEPS.map((step, idx) => (
            <div key={step.id}>
              <button
                onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                className={cn(
                  'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left',
                  expandedStep === step.id
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                )}
              >
                <div className={cn(
                  'w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0',
                  expandedStep === step.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                )}>
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-900">{step.title}</div>
                  {expandedStep === step.id && (
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{step.description}</p>
                  )}
                </div>
                {expandedStep === step.id ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                )}
              </button>
              {idx < METHODOLOGY_STEPS.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <ArrowDown className="w-4 h-4 text-slate-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Clickable steps grid */}
      <Card className="p-6">
        <SectionTitle
          title="Methodology Steps"
          subtitle="Click a card for a detailed explanation"
          icon={<BookOpen className="w-5 h-5" />}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {METHODOLOGY_STEPS.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setModalStep(step)}
              className="text-left p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-sm font-semibold text-slate-800">{step.title}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{step.description}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Modal */}
      {modalStep && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-6"
          onClick={() => setModalStep(null)}
        >
          <Card className="p-6 max-w-lg w-full" >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                  {METHODOLOGY_STEPS.findIndex((s) => s.id === modalStep.id) + 1}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{modalStep.title}</h3>
              </div>
              <button onClick={() => setModalStep(null)} className="p-1.5 rounded-lg hover:bg-slate-100">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{modalStep.description}</p>
          </Card>
        </div>
      )}
    </div>
  );
}
