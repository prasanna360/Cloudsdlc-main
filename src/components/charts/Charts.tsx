import {
  Radar,
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
  ReferenceLine,
} from 'recharts';
import { CSPS, PARAMETERS } from '@/data/projectData';

interface RadarChartData {
  parameter: string;
  aws: number;
  azure: number;
  gcp: number;
}

interface CSPRadarChartProps {
  ratings: Record<string, Record<string, number>>;
  height?: number;
}

export function CSPRadarChart({ ratings, height = 380 }: CSPRadarChartProps) {
  const data: RadarChartData[] = PARAMETERS.map((p) => ({
    parameter: p.shortName,
    aws: ratings.aws?.[p.id] ?? 0,
    azure: ratings.azure?.[p.id] ?? 0,
    gcp: ratings.gcp?.[p.id] ?? 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsRadar data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
        <PolarGrid stroke="#E2E8F0" />
        <PolarAngleAxis dataKey="parameter" tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} />
        <PolarRadiusAxis domain={[0, 10]} tick={{ fill: '#94A3B8', fontSize: 10 }} />
        <Radar name="AWS" dataKey="aws" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.15} strokeWidth={2} />
        <Radar name="Azure" dataKey="azure" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.15} strokeWidth={2} />
        <Radar name="GCP" dataKey="gcp" stroke="#0D9488" fill="#0D9488" fillOpacity={0.15} strokeWidth={2} />
        <Legend wrapperStyle={{ paddingTop: '12px' }} />
        <Tooltip />
      </RechartsRadar>
    </ResponsiveContainer>
  );
}

interface ScoreBarChartProps {
  scores: { cspId: string; cspName: string; score: number }[];
  height?: number;
}

export function ScoreBarChart({ scores, height = 300 }: ScoreBarChartProps) {
  const data = scores.map((s) => ({
    name: s.cspName,
    score: s.score,
    cspId: s.cspId,
  }));

  const colorMap: Record<string, string> = {
    aws: '#F59E0B',
    azure: '#3B82F6',
    gcp: '#0D9488',
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 20, right: 20, bottom: 10, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 13, fontWeight: 600 }} axisLine={{ stroke: '#CBD5E1' }} />
        <YAxis domain={[0, 10]} tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip
          cursor={{ fill: '#F1F5F9' }}
          contentStyle={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            fontSize: '13px',
          }}
        />
        <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={70}>
          {data.map((entry, idx) => (
            <Cell key={idx} fill={colorMap[entry.cspId] ?? '#3B82F6'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

interface WeightBarChartProps {
  weights: { parameterName: string; weight: number }[];
  height?: number;
}

export function WeightBarChart({ weights, height = 300 }: WeightBarChartProps) {
  const data = weights.map((w) => ({
    name: w.parameterName,
    weight: +(w.weight * 100).toFixed(1),
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 100 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
        <XAxis type="number" domain={[0, 25]} tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: '#475569', fontSize: 12 }}
          axisLine={{ stroke: '#CBD5E1' }}
          width={100}
        />
        <Tooltip
          cursor={{ fill: '#F1F5F9' }}
          contentStyle={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            fontSize: '13px',
          }}
          formatter={(v: number) => [`${v}%`, 'Weight']}
        />
        <Bar dataKey="weight" radius={[0, 6, 6, 0]} barSize={22} fill="#6366F1" />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface TrendChartProps {
  data: Array<Record<string, number | string | boolean>>;
  lines: { key: string; name: string; color: string }[];
  height?: number;
  yLabel?: string;
}

export function TrendChart({ data, lines, height = 280, yLabel }: TrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="period" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={{ stroke: '#CBD5E1' }} />
        <YAxis
          domain={[0, 10]}
          tick={{ fill: '#94A3B8', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft', style: { fill: '#94A3B8', fontSize: 11 } } : undefined}
        />
        <Tooltip
          contentStyle={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            fontSize: '13px',
          }}
        />
        <Legend wrapperStyle={{ paddingTop: '8px' }} />
        <ReferenceLine x="Q5 (P)" stroke="#CBD5E1" strokeDasharray="4 4" label={{ value: 'Projected', position: 'top', fill: '#94A3B8', fontSize: 10 }} />
        {lines.map((l) => (
          <Line
            key={l.key}
            type="monotone"
            dataKey={l.key}
            name={l.name}
            stroke={l.color}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

interface DemandChartProps {
  data: Array<Record<string, number | string | boolean>>;
  height?: number;
}

export function DemandChart({ data, height = 280 }: DemandChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
        <defs>
          <linearGradient id="demandGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="period" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={{ stroke: '#CBD5E1' }} />
        <YAxis
          domain={[0, 100]}
          tick={{ fill: '#94A3B8', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          label={{ value: 'Utilization %', angle: -90, position: 'insideLeft', style: { fill: '#94A3B8', fontSize: 11 } }}
        />
        <Tooltip
          contentStyle={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            fontSize: '13px',
          }}
        />
        <ReferenceLine x="Q5 (P)" stroke="#CBD5E1" strokeDasharray="4 4" label={{ value: 'Projected', position: 'top', fill: '#94A3B8', fontSize: 10 }} />
        <Area
          type="monotone"
          dataKey="demand"
          name="Resource Demand"
          stroke="#6366F1"
          strokeWidth={2}
          fill="url(#demandGrad)"
          dot={{ r: 3 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface ComparisonBarChartProps {
  data: { parameter: string; aws: number; azure: number; gcp: number }[];
  height?: number;
}

export function ComparisonBarChart({ data, height = 350 }: ComparisonBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
        <XAxis dataKey="parameter" tick={{ fill: '#475569', fontSize: 11 }} axisLine={{ stroke: '#CBD5E1' }} interval={0} angle={-15} textAnchor="end" height={60} />
        <YAxis domain={[0, 10]} tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip
          cursor={{ fill: '#F1F5F9' }}
          contentStyle={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            fontSize: '13px',
          }}
        />
        <Legend wrapperStyle={{ paddingTop: '8px' }} />
        <Bar dataKey="aws" name="AWS" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={18} />
        <Bar dataKey="azure" name="Azure" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={18} />
        <Bar dataKey="gcp" name="GCP" fill="#0D9488" radius={[4, 4, 0, 0]} barSize={18} />
      </BarChart>
    </ResponsiveContainer>
  );
}
