// ============================================================
// CENTRALIZED PROJECT DATA — Single Source of Truth
// Predictive Analytics-Driven Cloud Based SDLC Framework
// All values are project evaluation / demonstration data.
// ============================================================

export interface CSPInfo {
  id: string;
  name: string;
  fullName: string;
  shortDescription: string;
  keyStrengths: string[];
  color: string;
  accentColor: string;
  gradient: string;
}

export interface ParameterInfo {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
}

export interface PhaseInfo {
  id: string;
  name: string;
  description: string;
  keyParameters: string[];
  priorityNotes: string;
  recommendedPriorities: Record<string, number>;
}

export interface ScenarioInfo {
  id: string;
  name: string;
  description: string;
  findings: string;
  recommendedPriorities: Record<string, number>;
}

export const PROJECT_INFO = {
  title: 'Predictive Analytics-Driven Cloud Based SDLC Framework',
  shortName: 'Cloud SDLC Intelligence',
  subtitle:
    'Intelligent, adaptive and data-driven Cloud Service Provider selection across the Software Development Life Cycle.',
  institution: 'SRM Institute of Science and Technology',
  degree:
    'B.Tech Computer Science Engineering with specialization in Cloud Computing',
  department: 'Department of Networking and Communications',
  team: [
    { name: 'Lakshmi Prasanna', role: 'Team Member' },
    { name: 'Pujitha Atyam', role: 'Team Member' },
    { name: 'Harsha Vardhan', role: 'Team Member' },
  ],
  guide: {
    name: 'Dr. R. Naresh',
    title: 'Associate Professor',
    department: 'Department of Networking and Communications',
  },
  disclaimer:
    'Research Prototype — Decision-support framework based on project evaluation data',
};

export const PARAMETERS: ParameterInfo[] = [
  {
    id: 'cost',
    name: 'Cost',
    shortName: 'Cost',
    description:
      'Total cost of ownership including compute, storage, networking and data transfer expenses.',
    icon: 'DollarSign',
  },
  {
    id: 'security',
    name: 'Security',
    shortName: 'Security',
    description:
      'Encryption capabilities, compliance certifications, IAM features and data protection mechanisms.',
    icon: 'ShieldCheck',
  },
  {
    id: 'performance',
    name: 'Performance',
    shortName: 'Performance',
    description:
      'Compute speed, low-latency networking, throughput and response times across regions.',
    icon: 'Zap',
  },
  {
    id: 'reliability',
    name: 'Reliability',
    shortName: 'Reliability',
    description:
      'Uptime guarantees, SLA commitments, fault tolerance and disaster recovery capabilities.',
    icon: 'HeartPulse',
  },
  {
    id: 'scalability',
    name: 'Scalability',
    shortName: 'Scalability',
    description:
      'Auto-scaling, elastic resource allocation and ability to handle growing workloads.',
    icon: 'TrendingUp',
  },
  {
    id: 'greenScore',
    name: 'Green Score',
    shortName: 'Green',
    description:
      'Energy efficiency, renewable energy usage, carbon footprint and sustainability commitments.',
    icon: 'Leaf',
  },
  {
    id: 'probabilityIndex',
    name: 'Probability Index',
    shortName: 'Probability',
    description:
      'Predictive success indicator based on historical performance trends and projected outcomes.',
    icon: 'Target',
  },
];

// Default parameter rankings (Rank 1 = highest priority)
export const DEFAULT_RANKING: Record<string, number> = {
  cost: 1,
  security: 2,
  performance: 3,
  reliability: 4,
  scalability: 5,
  greenScore: 6,
  probabilityIndex: 7,
};

// Default PRPLW weights corresponding to default ranking
export const DEFAULT_WEIGHTS: Record<string, number> = {
  cost: 0.25,
  security: 0.21,
  performance: 0.18,
  reliability: 0.14,
  scalability: 0.11,
  greenScore: 0.07,
  probabilityIndex: 0.04,
};

// PRPLW weight lookup — weight assigned based on rank position (1–7)
// The methodology assigns higher weights to higher-priority parameters.
// These are the project's defined weight values for each rank position.
export const RANK_WEIGHTS: Record<number, number> = {
  1: 0.25,
  2: 0.21,
  3: 0.18,
  4: 0.14,
  5: 0.11,
  6: 0.07,
  7: 0.04,
};

// CSP evaluation ratings — Demonstration / Evaluation Dataset
// These are project-defined evaluation values, NOT live cloud benchmarks.
export const DEFAULT_CSP_RATINGS: Record<string, Record<string, number>> = {
  aws: { cost: 7, security: 9, performance: 9, reliability: 9, scalability: 10, greenScore: 7, probabilityIndex: 8 },
  azure: { cost: 8, security: 9, performance: 8, reliability: 9, scalability: 9, greenScore: 8, probabilityIndex: 7 },
  gcp: { cost: 9, security: 8, performance: 9, reliability: 8, scalability: 9, greenScore: 9, probabilityIndex: 9 },
};

export const CSPS: CSPInfo[] = [
  {
    id: 'aws',
    name: 'AWS',
    fullName: 'Amazon Web Services',
    shortDescription:
      'The most comprehensive and broadly adopted cloud platform, offering over 200 fully featured services globally.',
    keyStrengths: [
      'Strong performance and scalability',
      'Extensive global infrastructure',
      'Mature service ecosystem',
      'High reliability and uptime',
    ],
    color: '#F59E0B',
    accentColor: '#F59E0B',
    gradient: 'from-amber-50 to-orange-50',
  },
  {
    id: 'azure',
    name: 'Azure',
    fullName: 'Microsoft Azure',
    shortDescription:
      'Microsoft\'s cloud platform with deep enterprise integration, hybrid capabilities and strong security compliance.',
    keyStrengths: [
      'Balanced performance and security',
      'Enterprise integration',
      'Hybrid cloud capabilities',
      'Strong compliance certifications',
    ],
    color: '#3B82F6',
    accentColor: '#3B82F6',
    gradient: 'from-blue-50 to-sky-50',
  },
  {
    id: 'gcp',
    name: 'GCP',
    fullName: 'Google Cloud Platform',
    shortDescription:
      'Google\'s cloud offering with strong data analytics, machine learning capabilities and industry-leading sustainability.',
    keyStrengths: [
      'Strong sustainability and green score',
      'Cost-effective pricing',
      'Excellent data and ML tools',
      'High probability index',
    ],
    color: '#0D9488',
    accentColor: '#0D9488',
    gradient: 'from-teal-50 to-cyan-50',
  },
];

export const SDLC_PHASES: PhaseInfo[] = [
  {
    id: 'planning',
    name: 'Planning',
    description:
      'Initial phase where project scope, feasibility, budget and timelines are defined. Cloud strategy and provider considerations begin here.',
    keyParameters: ['cost', 'probabilityIndex', 'scalability'],
    priorityNotes:
      'Cost and feasibility are top priorities during planning. Scalability planning is essential for future growth projection.',
    recommendedPriorities: {
      cost: 1, security: 4, performance: 5, reliability: 6, scalability: 2, greenScore: 7, probabilityIndex: 3,
    },
  },
  {
    id: 'analysis',
    name: 'Analysis',
    description:
      'Requirements are gathered and analyzed. Security, compliance and performance requirements are identified for the target cloud environment.',
    keyParameters: ['security', 'performance', 'reliability'],
    priorityNotes:
      'Security and compliance requirements are analyzed thoroughly. Performance expectations are documented.',
    recommendedPriorities: {
      cost: 4, security: 1, performance: 2, reliability: 3, scalability: 5, greenScore: 7, probabilityIndex: 6,
    },
  },
  {
    id: 'design',
    name: 'Design',
    description:
      'System architecture and cloud resource design. Scalability patterns, reliability mechanisms and cost structures are designed.',
    keyParameters: ['scalability', 'reliability', 'performance'],
    priorityNotes:
      'Scalability and reliability architecture are central to design decisions. Performance patterns are established.',
    recommendedPriorities: {
      cost: 5, security: 4, performance: 2, reliability: 3, scalability: 1, greenScore: 7, probabilityIndex: 6,
    },
  },
  {
    id: 'development',
    name: 'Development',
    description:
      'Code is written and cloud services are integrated. Performance and cost optimization during development influence provider choice.',
    keyParameters: ['performance', 'cost', 'probabilityIndex'],
    priorityNotes:
      'Performance of cloud services directly impacts development velocity. Cost of development resources is monitored.',
    recommendedPriorities: {
      cost: 2, security: 5, performance: 1, reliability: 4, scalability: 6, greenScore: 7, probabilityIndex: 3,
    },
  },
  {
    id: 'testing',
    name: 'Testing',
    description:
      'Quality assurance, load testing and security testing. Reliability and performance under load are validated against CSP capabilities.',
    keyParameters: ['reliability', 'performance', 'security'],
    priorityNotes:
      'Reliability under load is tested. Security vulnerabilities and performance bottlenecks are identified.',
    recommendedPriorities: {
      cost: 6, security: 3, performance: 2, reliability: 1, scalability: 4, greenScore: 7, probabilityIndex: 5,
    },
  },
  {
    id: 'deployment',
    name: 'Deployment',
    description:
      'Application is deployed to the cloud. Reliability, scalability and security of the deployment environment are critical.',
    keyParameters: ['reliability', 'security', 'scalability'],
    priorityNotes:
      'Reliability and security of the production environment are paramount. Scalability for launch traffic is essential.',
    recommendedPriorities: {
      cost: 5, security: 2, performance: 4, reliability: 1, scalability: 3, greenScore: 7, probabilityIndex: 6,
    },
  },
  {
    id: 'maintenance',
    name: 'Maintenance',
    description:
      'Ongoing operations, monitoring and optimization. Cost optimization, reliability and green computing become long-term priorities.',
    keyParameters: ['cost', 'reliability', 'greenScore'],
    priorityNotes:
      'Long-term cost optimization and reliability are key. Green computing and sustainability gain importance over time.',
    recommendedPriorities: {
      cost: 1, security: 4, performance: 5, reliability: 2, scalability: 6, greenScore: 3, probabilityIndex: 7,
    },
  },
];

export const SCENARIOS: ScenarioInfo[] = [
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    description:
      'Online retail platform requiring high availability, elastic scalability during peak traffic and cost-effective storage for large product catalogs.',
    findings:
      'AWS performs strongly in performance, scalability and reliability — critical for e-commerce platforms handling variable traffic loads and requiring consistent uptime.',
    recommendedPriorities: {
      cost: 3, security: 4, performance: 1, reliability: 2, scalability: 5, greenScore: 7, probabilityIndex: 6,
    },
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description:
      'Healthcare application with strict security, compliance and reliability requirements for sensitive patient data and critical services.',
    findings:
      'Azure provides a balance of performance, security and enterprise capabilities — well-suited for healthcare applications requiring strong compliance and data protection.',
    recommendedPriorities: {
      cost: 5, security: 1, performance: 4, reliability: 2, scalability: 6, greenScore: 7, probabilityIndex: 3,
    },
  },
  {
    id: 'socialmedia',
    name: 'Social Media',
    description:
      'Social media platform needing massive scalability, high performance for real-time interactions and cost-effective data storage.',
    findings:
      'AWS performs strongly in performance, scalability and reliability — essential for social media platforms with rapidly growing user bases and real-time engagement.',
    recommendedPriorities: {
      cost: 4, security: 3, performance: 1, reliability: 2, scalability: 5, greenScore: 7, probabilityIndex: 6,
    },
  },
  {
    id: 'custom',
    name: 'Custom Project',
    description:
      'Custom project with user-defined requirements. Parameter priorities can be set manually based on specific project needs.',
    findings:
      'Custom projects use user-defined parameter rankings. The PRPLW engine calculates weights and scores based on the selected priorities.',
    recommendedPriorities: {
      cost: 1, security: 2, performance: 3, reliability: 4, scalability: 5, greenScore: 6, probabilityIndex: 7,
    },
  },
];

// Scenario findings for comparison page
export const SCENARIO_FINDINGS = [
  {
    scenario: 'E-Commerce',
    finding:
      'AWS performs strongly in performance, scalability and reliability — critical for e-commerce platforms handling variable traffic loads and requiring consistent uptime.',
    bestFit: 'AWS',
  },
  {
    scenario: 'Healthcare',
    finding:
      'Azure provides a balance of performance, security and enterprise capabilities — well-suited for healthcare applications requiring strong compliance and data protection.',
    bestFit: 'Azure',
  },
  {
    scenario: 'Social Media',
    finding:
      'AWS performs strongly in performance, scalability and reliability — essential for social media platforms with rapidly growing user bases and real-time engagement.',
    bestFit: 'AWS',
  },
  {
    scenario: 'General / Sustainability',
    finding:
      'GCP performs strongly in sustainability with the highest green score — ideal for projects where environmental impact is a key consideration.',
    bestFit: 'GCP',
  },
];

// Predictive analytics — Demonstration / Simulated Data
// Historical + projected values for visualization purposes.
export const PREDICTIVE_DATA = {
  costTrend: {
    label: 'Cost Trend (Simulated)',
    description: 'Projected cost evolution over project lifecycle periods.',
    data: [
      { period: 'Q1', aws: 7.2, azure: 8.1, gcp: 9.0, projected: false },
      { period: 'Q2', aws: 7.0, azure: 7.9, gcp: 8.8, projected: false },
      { period: 'Q3', aws: 6.8, azure: 7.7, gcp: 8.6, projected: false },
      { period: 'Q4', aws: 6.5, azure: 7.5, gcp: 8.4, projected: false },
      { period: 'Q5 (P)', aws: 6.3, azure: 7.2, gcp: 8.2, projected: true },
      { period: 'Q6 (P)', aws: 6.0, azure: 7.0, gcp: 8.0, projected: true },
      { period: 'Q7 (P)', aws: 5.8, azure: 6.8, gcp: 7.8, projected: true },
      { period: 'Q8 (P)', aws: 5.5, azure: 6.5, gcp: 7.6, projected: true },
    ],
  },
  performanceTrend: {
    label: 'Performance Trend (Simulated)',
    description: 'Projected performance index over time across CSPs.',
    data: [
      { period: 'Q1', aws: 8.5, azure: 7.8, gcp: 8.6, projected: false },
      { period: 'Q2', aws: 8.7, azure: 7.9, gcp: 8.7, projected: false },
      { period: 'Q3', aws: 8.8, azure: 8.0, gcp: 8.8, projected: false },
      { period: 'Q4', aws: 9.0, azure: 8.1, gcp: 9.0, projected: false },
      { period: 'Q5 (P)', aws: 9.1, azure: 8.2, gcp: 9.1, projected: true },
      { period: 'Q6 (P)', aws: 9.2, azure: 8.3, gcp: 9.2, projected: true },
      { period: 'Q7 (P)', aws: 9.3, azure: 8.4, gcp: 9.3, projected: true },
      { period: 'Q8 (P)', aws: 9.4, azure: 8.5, gcp: 9.4, projected: true },
    ],
  },
  reliabilityTrend: {
    label: 'Reliability Trend (Simulated)',
    description: 'Projected reliability index over time across CSPs.',
    data: [
      { period: 'Q1', aws: 8.8, azure: 8.9, gcp: 7.8, projected: false },
      { period: 'Q2', aws: 8.9, azure: 9.0, gcp: 7.9, projected: false },
      { period: 'Q3', aws: 9.0, azure: 9.0, gcp: 8.0, projected: false },
      { period: 'Q4', aws: 9.0, azure: 9.1, gcp: 8.1, projected: false },
      { period: 'Q5 (P)', aws: 9.1, azure: 9.2, gcp: 8.2, projected: true },
      { period: 'Q6 (P)', aws: 9.2, azure: 9.2, gcp: 8.3, projected: true },
      { period: 'Q7 (P)', aws: 9.2, azure: 9.3, gcp: 8.4, projected: true },
      { period: 'Q8 (P)', aws: 9.3, azure: 9.3, gcp: 8.5, projected: true },
    ],
  },
  resourceDemand: {
    label: 'Resource Demand (Simulated)',
    description: 'Projected resource utilization demand over project lifecycle.',
    data: [
      { period: 'Q1', demand: 30, projected: false },
      { period: 'Q2', demand: 45, projected: false },
      { period: 'Q3', demand: 55, projected: false },
      { period: 'Q4', demand: 65, projected: false },
      { period: 'Q5 (P)', demand: 78, projected: true },
      { period: 'Q6 (P)', demand: 85, projected: true },
      { period: 'Q7 (P)', demand: 92, projected: true },
      { period: 'Q8 (P)', demand: 98, projected: true },
    ],
  },
};

// Green score / sustainability data — Project Evaluation Data
export const GREEN_SCORE_DATA = {
  aws: {
    greenScore: 7,
    energyEfficiency: 70,
    renewableEnergy: 65,
    carbonCommitment: 60,
    sustainabilityInitiatives:
      'Commitment to 100% renewable energy by 2025. Investing in wind and solar projects globally.',
  },
  azure: {
    greenScore: 8,
    energyEfficiency: 78,
    renewableEnergy: 75,
    carbonCommitment: 72,
    sustainabilityInitiatives:
      'Carbon negative by 2030. Investing in renewable energy and advanced datacenter efficiency.',
  },
  gcp: {
    greenScore: 9,
    energyEfficiency: 88,
    renewableEnergy: 90,
    carbonCommitment: 85,
    sustainabilityInitiatives:
      'Carbon neutral since 2007. 100% renewable energy matching for all operations by 2030.',
  },
};

// Portability data — Project Evaluation Data
export const PORTABILITY_DATA = {
  aws: {
    portabilityIndex: 6,
    interoperability: 7,
    crossPlatform: 6,
    migrationFlexibility: 6,
    multiCloudReadiness: 5,
  },
  azure: {
    portabilityIndex: 7,
    interoperability: 8,
    crossPlatform: 8,
    migrationFlexibility: 7,
    multiCloudReadiness: 7,
  },
  gcp: {
    portabilityIndex: 8,
    interoperability: 8,
    crossPlatform: 7,
    migrationFlexibility: 8,
    multiCloudReadiness: 8,
  },
};

export const METHODOLOGY_STEPS = [
  {
    id: 'req',
    title: 'User Requirements',
    description:
      'The process begins with collecting user requirements including project type, budget constraints, security needs, performance expectations and sustainability goals.',
  },
  {
    id: 'sdlc',
    title: 'SDLC Phase Identification',
    description:
      'The current Software Development Life Cycle phase is identified. Each phase has different priority weights for cloud parameters.',
  },
  {
    id: 'param',
    title: 'Parameter Identification',
    description:
      'Seven key parameters are identified: Cost, Security, Performance, Reliability, Scalability, Green Score and Probability Index.',
  },
  {
    id: 'rank',
    title: 'Parameter Ranking',
    description:
      'Parameters are ranked by priority based on the SDLC phase and project scenario. Rank 1 represents the highest priority parameter.',
  },
  {
    id: 'prplw',
    title: 'PRPLW Weight Calculation',
    description:
      'The PRPLW algorithm assigns weights to each parameter based on its rank. Higher-ranked parameters receive greater weightage in the final calculation.',
  },
  {
    id: 'rating',
    title: 'CSP Rating',
    description:
      'Each Cloud Service Provider (AWS, Azure, GCP) is rated on all seven parameters using the project evaluation dataset.',
  },
  {
    id: 'green',
    title: 'Green Score & Portability',
    description:
      'Sustainability and portability metrics are integrated into the evaluation. Green score reflects environmental impact; portability index reflects vendor lock-in risk.',
  },
  {
    id: 'predict',
    title: 'Predictive Analytics',
    description:
      'Predictive indicators project future trends in cost, performance, reliability and resource demand based on simulated historical data.',
  },
  {
    id: 'weighted',
    title: 'Weighted Score Calculation',
    description:
      'Final scores are calculated using: PRPLW Score = Σ(Parameter Rating × Parameter Weight) for each CSP.',
  },
  {
    id: 'compare',
    title: 'CSP Comparison',
    description:
      'Weighted scores are compared across all three CSPs. Radar charts, bar charts and tables visualize the comparison.',
  },
  {
    id: 'recommend',
    title: 'Final Recommendation',
    description:
      'The CSP with the highest PRPLW score is recommended. A dynamic explanation is generated based on the top influencing parameters.',
  },
];

export const ARCHITECTURE_LAYERS = [
  {
    id: 'input',
    name: 'Input Layer',
    description: 'Collects project requirements and constraints from the user.',
    components: ['User Requirements', 'Project Scenario', 'Budget & Timeline'],
  },
  {
    id: 'decision',
    name: 'Decision Layer',
    description:
      'Processes inputs through the PRPLW algorithm and supporting modules.',
    components: [
      'SDLC Phase Module',
      'Parameter Identification',
      'PRPLW Algorithm',
      'Green Score Module',
      'Portability Index Module',
      'Predictive Analytics Engine',
    ],
  },
  {
    id: 'evaluation',
    name: 'Evaluation Layer',
    description: 'CSPs are evaluated against weighted parameters.',
    components: ['AWS', 'Azure', 'GCP'],
  },
  {
    id: 'output',
    name: 'Decision Output',
    description: 'Produces weighted scores, ranking and final recommendation.',
    components: ['Weighted Scores', 'Ranking', 'Recommended CSP'],
  },
];

export const PROBLEM_STATEMENT =
  'Organizations face significant challenges in selecting the most suitable Cloud Service Provider for their software projects. Existing selection methods often rely on static comparisons, ignore the varying priorities across different SDLC phases, and do not incorporate predictive indicators or sustainability considerations. This leads to suboptimal cloud adoption decisions that may not align with project-specific requirements, resulting in increased costs, reduced performance, or vendor lock-in.';

export const OBJECTIVES = [
  'Develop a predictive analytics-driven framework for CSP selection that adapts to different SDLC phases.',
  'Implement the PRPLW (Parameter Ranking Priority Level Weightage) algorithm for multi-criteria decision-making.',
  'Evaluate and compare AWS, Azure and GCP across seven key parameters.',
  'Integrate green score and sustainability considerations into the CSP selection process.',
  'Incorporate portability and vendor lock-in analysis to support multi-cloud strategies.',
  'Provide predictive indicators for cost, performance, reliability and resource demand trends.',
  'Generate transparent, explainable recommendations with dynamic justification.',
];

export const PROPOSED_SOLUTION =
  'The proposed framework introduces a PRPLW-based multi-criteria decision-making approach that dynamically weights cloud parameters according to SDLC phase priorities and project scenarios. By combining weighted scoring with predictive analytics, green score evaluation and portability assessment, the framework provides adaptive, data-driven CSP recommendations that align with specific project requirements rather than using a one-size-fits-all comparison.';

export const CONTRIBUTIONS = [
  'A novel PRPLW algorithm for parameter ranking and weight assignment in CSP selection.',
  'Integration of SDLC phase-aware priority weighting into cloud decision-making.',
  'A unified evaluation framework combining cost, security, performance, reliability, scalability, sustainability and predictive indicators.',
  'A demonstration platform (Cloud SDLC Intelligence) implementing the framework as an interactive web application.',
  'Scenario-based evaluation showing how different project contexts yield different optimal CSP recommendations.',
];

export const LIMITATIONS = [
  'CSP ratings are based on project evaluation data, not real-time cloud monitoring.',
  'Predictive analytics uses simulated historical data for demonstration purposes.',
  'The framework currently evaluates three CSPs (AWS, Azure, GCP); additional providers are future scope.',
  'Green scores and portability indices are based on publicly available information and project research, not live measurements.',
  'The PRPLW weight distribution is fixed by rank position; dynamic weight tuning is future scope.',
];

export const FUTURE_SCOPE_ITEMS = [
  {
    title: 'Real-Time Cloud Data Integration',
    description:
      'Integrate live CSP pricing APIs, performance benchmarks and availability metrics to replace static evaluation data with real-time values.',
  },
  {
    title: 'Advanced Predictive Algorithms',
    description:
      'Enhance predictive analytics with machine learning models (ARIMA, LSTM, regression) for more accurate trend forecasting.',
  },
  {
    title: 'Improved Historical Datasets',
    description:
      'Build comprehensive historical datasets from real cloud usage patterns to improve prediction accuracy.',
  },
  {
    title: 'Real-Time CSP Monitoring',
    description:
      'Implement continuous monitoring of CSP performance, reliability and cost metrics with alerting and auto-recommendation updates.',
  },
  {
    title: 'Additional Cloud Providers',
    description:
      'Extend the framework to evaluate additional CSPs such as IBM Cloud, Oracle Cloud, Alibaba Cloud and regional providers.',
  },
  {
    title: 'Advanced Multi-Cloud Decision-Making',
    description:
      'Develop multi-cloud allocation strategies that distribute workloads across multiple CSPs based on per-parameter strengths.',
  },
  {
    title: 'Dynamic Weight Tuning',
    description:
      'Allow the PRPLW weight distribution to be dynamically adjusted rather than fixed by rank position, enabling finer-grained optimization.',
  },
  {
    title: 'Automated Compliance Checking',
    description:
      'Integrate regulatory compliance databases to automatically filter CSPs based on industry-specific requirements (HIPAA, GDPR, FedRAMP).',
  },
];

export const IMPLEMENTED_FEATURES = [
  {
    title: 'PRPLW Algorithm',
    description:
      'Full implementation of Parameter Ranking Priority Level Weightage with dynamic weight recalculation.',
  },
  {
    title: 'SDLC Phase-Aware Weighting',
    description:
      'Seven SDLC phases with phase-specific parameter priority recommendations.',
  },
  {
    title: 'CSP Evaluation Engine',
    description:
      'Weighted score calculation for AWS, Azure and GCP across seven parameters.',
  },
  {
    title: 'Interactive Parameter Ranking',
    description:
      'Drag-and-drop parameter ranking with real-time weight and score updates.',
  },
  {
    title: 'Scenario-Based Analysis',
    description:
      'E-Commerce, Healthcare, Social Media and Custom project scenarios with documented findings.',
  },
  {
    title: 'Advanced Simulation Mode',
    description:
      'Interactive CSP rating modification for demonstration and viva scenarios.',
  },
  {
    title: 'Predictive Analytics Dashboard',
    description:
      'Simulated cost, performance, reliability and resource demand trend visualization.',
  },
  {
    title: 'Green Score & Portability Analysis',
    description:
      'Sustainability and vendor lock-in assessment integrated into the evaluation.',
  },
  {
    title: 'Dynamic Recommendation Explanation',
    description:
      'Automated "Why this CSP?" generation based on actual calculation results.',
  },
  {
    title: 'Evaluation Report Export',
    description:
      'Downloadable evaluation summary with all inputs, calculations and results.',
  },
];
