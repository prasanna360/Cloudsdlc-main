import { useState, type ReactNode } from 'react';
import {
  LayoutDashboard,
  Play,
  Calculator,
  GitCompareArrows,
  TrendingUp,
  Workflow,
  Trophy,
  BookOpen,
  Network,
  Info,
  Rocket,
  Home,
  Menu,
  X,
  Cloud,
  FlaskConical,
  RotateCcw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEvaluation } from '@/context/EvaluationContext';
import { PROJECT_INFO } from '@/data/projectData';

export type PageId =
  | 'landing'
  | 'dashboard'
  | 'evaluation'
  | 'prplw'
  | 'comparison'
  | 'predictive'
  | 'sdlc'
  | 'results'
  | 'methodology'
  | 'architecture'
  | 'about'
  | 'future';

interface LayoutProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  children: ReactNode;
}

const NAV_ITEMS: { id: PageId; label: string; icon: typeof Home; group: string }[] = [
  { id: 'landing', label: 'Home', icon: Home, group: 'Overview' },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'Overview' },
  { id: 'evaluation', label: 'New Evaluation', icon: Play, group: 'Analysis' },
  { id: 'prplw', label: 'PRPLW Analysis', icon: Calculator, group: 'Analysis' },
  { id: 'comparison', label: 'CSP Comparison', icon: GitCompareArrows, group: 'Analysis' },
  { id: 'predictive', label: 'Predictive Analytics', icon: TrendingUp, group: 'Analysis' },
  { id: 'sdlc', label: 'SDLC Analysis', icon: Workflow, group: 'Analysis' },
  { id: 'results', label: 'Results', icon: Trophy, group: 'Output' },
  { id: 'methodology', label: 'Methodology', icon: BookOpen, group: 'Reference' },
  { id: 'architecture', label: 'System Architecture', icon: Network, group: 'Reference' },
  { id: 'about', label: 'About Project', icon: Info, group: 'Reference' },
  { id: 'future', label: 'Future Scope', icon: Rocket, group: 'Reference' },
];

const NAV_GROUPS = ['Overview', 'Analysis', 'Output', 'Reference'];

export function Layout({ currentPage, onNavigate, children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resetEvaluation, advancedSimulation, recommendation } = useEvaluation();

  const handleNavigate = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const handleReset = () => {
    if (window.confirm('Reset all evaluation values to defaults? This will restore the default SDLC phase, scenario, parameter rankings and CSP ratings.')) {
      resetEvaluation();
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full text-slate-200">
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Cloud className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-white leading-tight">Cloud SDLC</div>
            <div className="text-[11px] text-slate-300 leading-tight">Intelligence</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {NAV_GROUPS.map((group) => (
          <div key={group} className="mb-4">
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              {group}
            </div>
            {NAV_ITEMS.filter((i) => i.group === group).map((item) => {
              const Icon = item.icon;
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 mb-1.5',
                    active
                      ? 'bg-white/10 text-white shadow-lg shadow-slate-950/30 ring-1 ring-white/10'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <Icon className={cn('w-4 h-4 flex-shrink-0', active ? 'text-sky-300' : 'text-slate-400')} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/10 space-y-2">
        <div className="px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-400/20">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-200">
            <FlaskConical className="w-3 h-3" />
            Research Prototype
          </div>
          <div className="text-[10px] text-amber-100/80 mt-1 leading-tight">
            Decision-support framework based on project evaluation data
          </div>
        </div>
        {advancedSimulation && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-400/20">
            <div className="text-[11px] font-semibold text-emerald-200">
              Simulation Mode: Active
            </div>
          </div>
        )}
        {recommendation.recommendedCSP && (
          <div className="px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-[10px] text-slate-400 uppercase tracking-[0.14em]">Recommended CSP</div>
            <div className="mt-1 text-sm font-bold text-white">
              {recommendation.recommendedCSP.name}
              <span className="text-xs font-normal text-slate-300 ml-1">
                ({recommendation.rankings[0].score.toFixed(2)})
              </span>
            </div>
          </div>
        )}
        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-white/5 hover:text-white transition-colors border border-white/10"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Evaluation
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-900">
      <aside className="hidden lg:flex w-64 flex-shrink-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 border-r border-slate-800 fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 shadow-2xl transition-transform duration-300 lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="lg:hidden sticky top-0 z-20 bg-slate-950/90 backdrop-blur border-b border-slate-800 px-4 py-3 flex items-center justify-between text-white">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-white/10"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-sky-300" />
            <span className="text-sm font-bold text-white">Cloud SDLC Intelligence</span>
          </div>
          <div className="w-9" />
        </header>

        <main className="flex-1">{children}</main>
      </div>

      {/* Close button for mobile drawer */}
      {mobileOpen && (
        <button
          onClick={() => setMobileOpen(false)}
          className="fixed top-3 right-3 z-50 lg:hidden p-2 rounded-lg bg-white shadow-md"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 text-slate-700" />
        </button>
      )}
    </div>
  );
}

export { PROJECT_INFO };
