import { useState } from 'react';
import { Network, ArrowDown, X, Layers } from 'lucide-react';
import { ARCHITECTURE_LAYERS } from '@/data/projectData';
import { Card, SectionTitle } from '@/components/ui';
import { cn } from '@/lib/utils';

const LAYER_COLORS: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  input: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-600' },
  decision: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', badge: 'bg-indigo-600' },
  evaluation: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', badge: 'bg-teal-600' },
  output: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-600' },
};

export function ArchitecturePage() {
  const [modalLayer, setModalLayer] = useState<typeof ARCHITECTURE_LAYERS[0] | null>(null);

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Architecture</h1>
        <p className="text-sm text-slate-500 mt-1">
          Interactive architecture diagram of the Cloud SDLC Intelligence framework
        </p>
      </div>

      {/* Architecture diagram */}
      <Card className="p-6">
        <SectionTitle
          title="Framework Architecture"
          subtitle="Click any layer to see its components"
          icon={<Network className="w-5 h-5" />}
        />

        <div className="space-y-1">
          {ARCHITECTURE_LAYERS.map((layer, idx) => {
            const colors = LAYER_COLORS[layer.id];
            return (
              <div key={layer.id}>
                <button
                  onClick={() => setModalLayer(layer)}
                  className={cn(
                    'w-full p-5 rounded-2xl border-2 transition-all text-left hover:shadow-md',
                    colors.bg,
                    colors.border
                  )}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={cn('w-8 h-8 rounded-xl text-white text-sm font-bold flex items-center justify-center', colors.badge)}>
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={cn('text-sm font-bold', colors.text)}>{layer.name}</div>
                      <div className="text-xs text-slate-500">{layer.description}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {layer.components.map((comp) => (
                      <span
                        key={comp}
                        className="px-2.5 py-1 text-xs font-medium bg-white/80 rounded-lg border border-slate-200 text-slate-600"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </button>
                {idx < ARCHITECTURE_LAYERS.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="w-5 h-5 text-slate-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Data flow description */}
      <Card className="p-6">
        <SectionTitle title="Data Flow" subtitle="How data moves through the framework" icon={<Network className="w-5 h-5" />} />
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
            <p><strong>Input Layer:</strong> The user provides project requirements, selects an application scenario, and specifies budget and timeline constraints.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
            <p><strong>Decision Layer:</strong> The SDLC Phase Module identifies the current lifecycle phase. Parameters are identified and ranked. The PRPLW Algorithm calculates weights. Green Score, Portability and Predictive Analytics modules add supplementary evaluation data.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
            <p><strong>Evaluation Layer:</strong> AWS, Azure and GCP are each rated on all seven parameters using the project evaluation dataset.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center flex-shrink-0">4</span>
            <p><strong>Decision Output:</strong> Weighted scores are calculated, CSPs are ranked, and the highest-scoring CSP is recommended with a dynamically generated explanation.</p>
          </div>
        </div>
      </Card>

      {/* Modal */}
      {modalLayer && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-6"
          onClick={() => setModalLayer(null)}
        >
          <Card className="p-6 max-w-lg w-full">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">{modalLayer.name}</h3>
              <button onClick={() => setModalLayer(null)} className="p-1.5 rounded-lg hover:bg-slate-100">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <p className="text-sm text-slate-600 mb-4">{modalLayer.description}</p>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Components</div>
            <div className="space-y-2">
              {modalLayer.components.map((comp) => (
                <div key={comp} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-sm text-slate-700">{comp}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
