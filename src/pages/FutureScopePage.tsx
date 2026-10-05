import {
  Rocket,
  CheckCircle2,
  ArrowRight,
  Info,
} from 'lucide-react';
import { IMPLEMENTED_FEATURES, FUTURE_SCOPE_ITEMS, PROJECT_INFO } from '@/data/projectData';
import { Card, SectionTitle, Badge } from '@/components/ui';

export function FutureScopePage() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Future Scope</h1>
        <p className="text-sm text-slate-500 mt-1">
          What's implemented now vs. what's planned for future development
        </p>
      </div>

      <Badge variant="warning">
        <Info className="w-3 h-3" />
        {PROJECT_INFO.disclaimer}
      </Badge>

      {/* Currently Implemented */}
      <Card className="p-6">
        <SectionTitle
          title="Currently Implemented"
          subtitle="Features available in this research prototype"
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
        <div className="grid sm:grid-cols-2 gap-3">
          {IMPLEMENTED_FEATURES.map((feat, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">{feat.title}</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{feat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Future Scope */}
      <Card className="p-6">
        <SectionTitle
          title="Future Scope"
          subtitle="Planned extensions — not yet implemented"
          icon={<Rocket className="w-5 h-5" />}
        />
        <div className="grid sm:grid-cols-2 gap-3">
          {FUTURE_SCOPE_ITEMS.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-blue-200 bg-blue-50/30">
              <div className="flex items-start gap-2">
                <Rocket className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Clear separation note */}
      <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">Important Note</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              The features listed under <strong>Currently Implemented</strong> are fully functional in this
              research prototype. The items under <strong>Future Scope</strong> are planned extensions that
              are <strong>not yet implemented</strong> and should not be presented as existing capabilities
              during project reviews or in documentation.
            </p>
          </div>
        </div>
      </Card>

      {/* Roadmap visual */}
      <Card className="p-6">
        <SectionTitle title="Development Roadmap" subtitle="Progression from current prototype to full platform" icon={<ArrowRight className="w-5 h-5" />} />
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center">✓</span>
            <div>
              <div className="text-sm font-semibold text-slate-900">Phase 1: Research Prototype (Current)</div>
              <div className="text-xs text-slate-600">PRPLW algorithm, interactive evaluation, dashboard, predictive analytics with simulated data</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200">
            <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">2</span>
            <div>
              <div className="text-sm font-semibold text-slate-900">Phase 2: Real-Time Data Integration</div>
              <div className="text-xs text-slate-600">Live CSP pricing APIs, performance benchmarks, real-time monitoring</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50 border border-indigo-200">
            <span className="w-7 h-7 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center">3</span>
            <div>
              <div className="text-sm font-semibold text-slate-900">Phase 3: Advanced ML & Multi-Cloud</div>
              <div className="text-xs text-slate-600">Machine learning predictions, multi-cloud allocation, additional CSPs, dynamic weight tuning</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
