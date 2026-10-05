import {
  TrendingUp,
  Info,
  DollarSign,
  Zap,
  HeartPulse,
  Cpu,
  Leaf,
  MoveRight,
} from 'lucide-react';
import { PREDICTIVE_DATA, GREEN_SCORE_DATA, PORTABILITY_DATA, CSPS } from '@/data/projectData';
import { Card, Badge, SectionTitle, ProgressBar, Gauge } from '@/components/ui';
import { TrendChart, DemandChart } from '@/components/charts/Charts';

const CSP_COLORS: Record<string, string> = {
  aws: '#F59E0B',
  azure: '#3B82F6',
  gcp: '#0D9488',
};

export function PredictivePage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Predictive Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">
            Projected trends for cost, performance, reliability and resource demand
          </p>
        </div>
        <Badge variant="warning">
          <Info className="w-3 h-3" />
          Demonstration / Simulated Predictive Data
        </Badge>
      </div>

      {/* Trend charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <SectionTitle
            title="Predicted Cost Trend"
            subtitle={PREDICTIVE_DATA.costTrend.description}
            icon={<DollarSign className="w-5 h-5" />}
          />
          <TrendChart
            data={PREDICTIVE_DATA.costTrend.data}
            lines={[
              { key: 'aws', name: 'AWS', color: CSP_COLORS.aws },
              { key: 'azure', name: 'Azure', color: CSP_COLORS.azure },
              { key: 'gcp', name: 'GCP', color: CSP_COLORS.gcp },
            ]}
          />
        </Card>

        <Card className="p-6">
          <SectionTitle
            title="Predicted Performance"
            subtitle={PREDICTIVE_DATA.performanceTrend.description}
            icon={<Zap className="w-5 h-5" />}
          />
          <TrendChart
            data={PREDICTIVE_DATA.performanceTrend.data}
            lines={[
              { key: 'aws', name: 'AWS', color: CSP_COLORS.aws },
              { key: 'azure', name: 'Azure', color: CSP_COLORS.azure },
              { key: 'gcp', name: 'GCP', color: CSP_COLORS.gcp },
            ]}
          />
        </Card>

        <Card className="p-6">
          <SectionTitle
            title="Predicted Reliability"
            subtitle={PREDICTIVE_DATA.reliabilityTrend.description}
            icon={<HeartPulse className="w-5 h-5" />}
          />
          <TrendChart
            data={PREDICTIVE_DATA.reliabilityTrend.data}
            lines={[
              { key: 'aws', name: 'AWS', color: CSP_COLORS.aws },
              { key: 'azure', name: 'Azure', color: CSP_COLORS.azure },
              { key: 'gcp', name: 'GCP', color: CSP_COLORS.gcp },
            ]}
          />
        </Card>

        <Card className="p-6">
          <SectionTitle
            title="Predicted Resource Demand"
            subtitle={PREDICTIVE_DATA.resourceDemand.description}
            icon={<Cpu className="w-5 h-5" />}
          />
          <DemandChart data={PREDICTIVE_DATA.resourceDemand.data} />
        </Card>
      </div>

      {/* How predictive analytics helps */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
        <SectionTitle title="How Predictive Analytics Helps" icon={<TrendingUp className="w-5 h-5" />} />
        <p className="text-sm text-slate-700 leading-relaxed">
          Predictive analytics allows the framework to consider potential future trends rather than
          relying only on current evaluation values. By projecting cost trajectories, performance
          improvements, reliability evolution and resource demand growth, the framework can recommend
          a CSP that not only meets current requirements but is also likely to remain suitable throughout
          the project lifecycle.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          <div className="p-3 bg-white rounded-xl border border-slate-100">
            <div className="text-sm font-semibold text-slate-800 mb-1">Cost Forecasting</div>
            <p className="text-xs text-slate-600">Projects how CSP pricing evolves, helping avoid future cost surprises.</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-100">
            <div className="text-sm font-semibold text-slate-800 mb-1">Performance Projection</div>
            <p className="text-xs text-slate-600">Estimates performance improvements from CSP infrastructure upgrades.</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-100">
            <div className="text-sm font-semibold text-slate-800 mb-1">Reliability Tracking</div>
            <p className="text-xs text-slate-600">Monitors reliability trends to ensure long-term SLA compliance.</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-100">
            <div className="text-sm font-semibold text-slate-800 mb-1">Demand Planning</div>
            <p className="text-xs text-slate-600">Forecasts resource utilization to plan scaling and budget accordingly.</p>
          </div>
        </div>
      </Card>

      {/* Green Score */}
      <Card className="p-6">
        <SectionTitle
          title="Green Score & Sustainability"
          subtitle="Environmental impact assessment — Project Evaluation Data"
          icon={<Leaf className="w-5 h-5" />}
        />
        <Badge variant="warning" className="mb-4">
          <Info className="w-3 h-3" />
          Project Evaluation / Demonstration Data
        </Badge>
        <div className="grid md:grid-cols-3 gap-6">
          {CSPS.map((csp) => {
            const green = GREEN_SCORE_DATA[csp.id];
            const colors: Record<string, string> = {
              aws: '#F59E0B',
              azure: '#3B82F6',
              gcp: '#0D9488',
            };
            return (
              <div key={csp.id} className="text-center">
                <Gauge
                  value={green.greenScore}
                  max={10}
                  label={`${csp.name} Green Score`}
                  color={colors[csp.id]}
                  size={140}
                />
                <div className="mt-4 space-y-3 text-left">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600">Energy Efficiency</span>
                      <span className="font-semibold text-slate-800">{green.energyEfficiency}%</span>
                    </div>
                    <ProgressBar value={green.energyEfficiency} color="bg-emerald-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600">Renewable Energy</span>
                      <span className="font-semibold text-slate-800">{green.renewableEnergy}%</span>
                    </div>
                    <ProgressBar value={green.renewableEnergy} color="bg-teal-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600">Carbon Commitment</span>
                      <span className="font-semibold text-slate-800">{green.carbonCommitment}%</span>
                    </div>
                    <ProgressBar value={green.carbonCommitment} color="bg-cyan-500" />
                  </div>
                  <p className="text-xs text-slate-500 italic mt-2 leading-relaxed">
                    {green.sustainabilityInitiatives}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Portability */}
      <Card className="p-6">
        <SectionTitle
          title="Portability & Vendor Lock-in"
          subtitle="Migration flexibility and multi-cloud readiness assessment"
          icon={<MoveRight className="w-5 h-5" />}
        />
        <div className="grid md:grid-cols-3 gap-6">
          {CSPS.map((csp) => {
            const port = PORTABILITY_DATA[csp.id];
            const avg = (port.portabilityIndex + port.interoperability + port.crossPlatform + port.migrationFlexibility + port.multiCloudReadiness) / 5;
            return (
              <div key={csp.id} className="p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-slate-900">{csp.name}</span>
                  <Badge variant={avg >= 7.5 ? 'success' : avg >= 6 ? 'info' : 'warning'}>
                    Portability: {port.portabilityIndex}/10
                  </Badge>
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: 'Interoperability', value: port.interoperability },
                    { label: 'Cross-Platform', value: port.crossPlatform },
                    { label: 'Migration Flexibility', value: port.migrationFlexibility },
                    { label: 'Multi-Cloud Readiness', value: port.multiCloudReadiness },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600">{item.label}</span>
                        <span className="font-semibold text-slate-800">{item.value}/10</span>
                      </div>
                      <ProgressBar value={item.value} max={10} color="bg-indigo-500" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>Why Portability Matters:</strong> Portability reduces dependence on a single cloud
            provider, enabling organizations to migrate workloads, adopt multi-cloud strategies and avoid
            vendor lock-in. Higher portability scores indicate greater flexibility in cloud-to-cloud or
            cloud-to-on-premises transitions.
          </p>
        </div>
      </Card>
    </div>
  );
}
