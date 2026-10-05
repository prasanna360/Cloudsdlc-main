import {
  Info,
  Target,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  Users,
  UserCheck,
  Building2,
} from 'lucide-react';
import {
  PROJECT_INFO,
  PROBLEM_STATEMENT,
  OBJECTIVES,
  PROPOSED_SOLUTION,
  CONTRIBUTIONS,
  LIMITATIONS,
} from '@/data/projectData';
import { Card, Badge, SectionTitle } from '@/components/ui';

export function AboutPage() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">About Project</h1>
        <p className="text-sm text-slate-500 mt-1">
          Academic project information and research overview
        </p>
      </div>

      {/* Project identity */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
            <Info className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{PROJECT_INFO.title}</h2>
            <p className="text-sm text-slate-600">{PROJECT_INFO.shortName}</p>
          </div>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">{PROJECT_INFO.subtitle}</p>
        <div className="mt-4">
          <Badge variant="warning">
            <Info className="w-3 h-3" />
            {PROJECT_INFO.disclaimer}
          </Badge>
        </div>
      </Card>

      {/* Institution info */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-bold text-slate-900">Institution</span>
          </div>
          <p className="text-sm text-slate-600">{PROJECT_INFO.institution}</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-bold text-slate-900">Degree</span>
          </div>
          <p className="text-sm text-slate-600">{PROJECT_INFO.degree}</p>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="w-5 h-5 text-teal-600" />
          <span className="text-sm font-bold text-slate-900">Department</span>
        </div>
        <p className="text-sm text-slate-600">{PROJECT_INFO.department}</p>
      </Card>

      {/* Team */}
      <Card className="p-6">
        <SectionTitle title="Project Team" icon={<Users className="w-5 h-5" />} />
        <div className="grid sm:grid-cols-3 gap-4">
          {PROJECT_INFO.team.map((member) => (
            <div key={member.name} className="text-center p-4 rounded-xl border border-slate-200 bg-white">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div className="text-sm font-bold text-slate-900">{member.name}</div>
              <div className="text-xs text-slate-500 mt-0.5">{member.role}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Guide */}
      <Card className="p-6">
        <SectionTitle title="Project Guide" icon={<UserCheck className="w-5 h-5" />} />
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
            {PROJECT_INFO.guide.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div className="text-base font-bold text-slate-900">{PROJECT_INFO.guide.name}</div>
            <div className="text-sm text-slate-500">{PROJECT_INFO.guide.title}</div>
            <div className="text-xs text-slate-400">{PROJECT_INFO.guide.department}</div>
          </div>
        </div>
      </Card>

      {/* Problem Statement */}
      <Card className="p-6">
        <SectionTitle title="Problem Statement" icon={<Target className="w-5 h-5" />} />
        <p className="text-sm text-slate-700 leading-relaxed">{PROBLEM_STATEMENT}</p>
      </Card>

      {/* Objectives */}
      <Card className="p-6">
        <SectionTitle title="Objectives" icon={<Target className="w-5 h-5" />} />
        <div className="space-y-2.5">
          {OBJECTIVES.map((obj, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">{obj}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Proposed Solution */}
      <Card className="p-6">
        <SectionTitle title="Proposed Solution" icon={<Lightbulb className="w-5 h-5" />} />
        <p className="text-sm text-slate-700 leading-relaxed">{PROPOSED_SOLUTION}</p>
      </Card>

      {/* Methodology summary */}
      <Card className="p-6">
        <SectionTitle title="Methodology" icon={<Info className="w-5 h-5" />} />
        <p className="text-sm text-slate-700 leading-relaxed">
          The framework follows a structured methodology: user requirements are collected, the SDLC phase
          is identified, seven key parameters are ranked by priority, PRPLW weights are calculated, CSPs
          are rated on each parameter, green score and portability metrics are integrated, predictive
          analytics provides future trend indicators, weighted scores are computed, and the CSP with the
          highest PRPLW score is recommended with a dynamic explanation.
        </p>
      </Card>

      {/* Contributions */}
      <Card className="p-6">
        <SectionTitle title="Contributions" icon={<CheckCircle2 className="w-5 h-5" />} />
        <div className="space-y-2.5">
          {CONTRIBUTIONS.map((contrib, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700 leading-relaxed">{contrib}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Limitations */}
      <Card className="p-6">
        <SectionTitle title="Limitations" icon={<AlertTriangle className="w-5 h-5" />} />
        <div className="space-y-2.5">
          {LIMITATIONS.map((lim, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700 leading-relaxed">{lim}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
