// ============================================================
// PRPLW CALCULATION ENGINE
// Parameter Ranking Priority Level Weightage
// ============================================================

import {
  RANK_WEIGHTS,
  DEFAULT_CSP_RATINGS,
  PARAMETERS,
  CSPS,
  type CSPInfo,
} from '@/data/projectData';

export interface WeightResult {
  parameterId: string;
  parameterName: string;
  rank: number;
  weight: number;
}

export interface ScoreResult {
  cspId: string;
  cspName: string;
  score: number;
  details: { parameterId: string; parameterName: string; rating: number; weight: number; contribution: number }[];
}

export interface RankingResult {
  rank: number;
  cspId: string;
  cspName: string;
  score: number;
  isRecommended: boolean;
}

export interface RecommendationResult {
  recommendedCSP: CSPInfo | null;
  scores: ScoreResult[];
  rankings: RankingResult[];
  weights: WeightResult[];
  explanation: string;
  topParameters: { parameterId: string; parameterName: string; weight: number }[];
  marginFromSecond: number;
}

/**
 * Calculate PRPLW weights from a parameter ranking.
 * Rank 1 = highest priority = highest weight.
 */
export function calculatePRPLWWeights(
  ranking: Record<string, number>
): WeightResult[] {
  return PARAMETERS.map((param) => {
    const rank = ranking[param.id] ?? 99;
    const weight = RANK_WEIGHTS[rank] ?? 0;
    return {
      parameterId: param.id,
      parameterName: param.name,
      rank,
      weight,
    };
  }).sort((a, b) => a.rank - b.rank);
}

/**
 * Calculate a single CSP's PRPLW score.
 * Score = Σ(Rating × Weight)
 */
export function calculateCSPScore(
  cspId: string,
  cspName: string,
  ratings: Record<string, number>,
  weights: WeightResult[]
): ScoreResult {
  const details = weights.map((w) => {
    const rating = ratings[w.parameterId] ?? 0;
    const contribution = rating * w.weight;
    return {
      parameterId: w.parameterId,
      parameterName: w.parameterName,
      rating,
      weight: w.weight,
      contribution,
    };
  });

  const score = details.reduce((sum, d) => sum + d.contribution, 0);
  return { cspId, cspName, score, details };
}

/**
 * Calculate scores for all CSPs and produce rankings.
 */
export function calculateAllScores(
  cspRatings: Record<string, Record<string, number>>,
  weights: WeightResult[]
): ScoreResult[] {
  return CSPS.map((csp) =>
    calculateCSPScore(
      csp.id,
      csp.name,
      cspRatings[csp.id] ?? {},
      weights
    )
  );
}

/**
 * Rank CSPs by score (descending). Returns full ranking with recommendation flag.
 */
export function rankCSPs(scores: ScoreResult[]): RankingResult[] {
  const sorted = [...scores].sort((a, b) => b.score - a.score);
  return sorted.map((s, idx) => ({
    rank: idx + 1,
    cspId: s.cspId,
    cspName: s.cspName,
    score: s.score,
    isRecommended: idx === 0,
  }));
}

/**
 * Get the top N parameters by weight.
 */
export function getTopParameters(
  weights: WeightResult[],
  n: number = 3
): { parameterId: string; parameterName: string; weight: number }[] {
  return [...weights]
    .sort((a, b) => b.weight - a.weight)
    .slice(0, n)
    .map((w) => ({
      parameterId: w.parameterId,
      parameterName: w.parameterName,
      weight: w.weight,
    }));
}

/**
 * Dynamically generate a recommendation explanation based on actual calculations.
 * This is NOT hard-coded — it reads the top parameters and the recommended CSP's
 * ratings on those parameters to build a contextual justification.
 */
export function generateRecommendationExplanation(
  rankings: RankingResult[],
  scores: ScoreResult[],
  weights: WeightResult[],
  cspRatings: Record<string, Record<string, number>>
): string {
  if (rankings.length === 0) return 'No recommendation available.';

  const recommended = rankings[0];
  const recommendedScore = scores.find((s) => s.cspId === recommended.cspId);
  if (!recommendedScore) return 'No recommendation available.';

  const top3 = getTopParameters(weights, 3);
  const secondPlace = rankings[1];
  const margin = recommended.score - (secondPlace?.score ?? 0);

  // Build parameter strength description
  const paramStrengths = top3
    .map((p) => {
      const rating = cspRatings[recommended.cspId]?.[p.parameterId] ?? 0;
      const ratingLabel = rating >= 9 ? 'an excellent' : rating >= 8 ? 'a strong' : rating >= 7 ? 'a good' : 'a moderate';
      return `${p.parameterName} (rating: ${rating}/10, weight: ${(p.weight * 100).toFixed(0)}%) with ${ratingLabel} evaluation score`;
    })
    .join(', ');

  const cspInfo = CSPS.find((c) => c.id === recommended.cspId);
  const cspFullName = cspInfo?.fullName ?? recommended.cspName;

  let explanation = `The recommendation is ${cspFullName} with a PRPLW score of ${recommended.score.toFixed(2)}. `;
  explanation += `This recommendation is primarily influenced by the high priority assigned to ${top3[0].parameterName}, ${top3[1].parameterName}, and ${top3[2].parameterName}. `;
  explanation += `${recommended.cspName} demonstrates ${paramStrengths}. `;

  if (margin > 0.01) {
    explanation += `The margin over the second-ranked provider (${secondPlace?.cspName}) is ${margin.toFixed(2)} points, indicating a ${margin > 0.3 ? 'clear' : 'modest'} advantage under the current priority configuration.`;
  } else {
    explanation += `The scores are very close, indicating that the recommendation may change with minor adjustments to parameter priorities.`;
  }

  return explanation;
}

/**
 * Full recommendation pipeline — weights → scores → ranking → explanation.
 */
export function generateRecommendation(
  ranking: Record<string, number>,
  cspRatings: Record<string, Record<string, number>> = DEFAULT_CSP_RATINGS
): RecommendationResult {
  const weights = calculatePRPLWWeights(ranking);
  const scores = calculateAllScores(cspRatings, weights);
  const rankings = rankCSPs(scores);
  const explanation = generateRecommendationExplanation(rankings, scores, weights, cspRatings);
  const topParameters = getTopParameters(weights, 3);
  const recommendedCSP = CSPS.find((c) => c.id === rankings[0]?.cspId) ?? null;
  const marginFromSecond = rankings[0] ? rankings[0].score - (rankings[1]?.score ?? 0) : 0;

  return {
    recommendedCSP,
    scores,
    rankings,
    weights,
    explanation,
    topParameters,
    marginFromSecond,
  };
}

/**
 * Get a rating label (High / Medium / Low) from a numeric rating.
 */
export function getRatingLabel(rating: number): { label: string; color: string } {
  if (rating >= 9) return { label: 'High', color: 'text-emerald-600' };
  if (rating >= 7) return { label: 'Medium', color: 'text-amber-600' };
  return { label: 'Low', color: 'text-rose-600' };
}

/**
 * Validate a parameter ranking object.
 * Returns { valid, errors }.
 */
export function validateRanking(ranking: Record<string, number>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const ranks = Object.values(ranking);

  if (ranks.length === 0) {
    errors.push('No parameter rankings provided.');
    return { valid: false, errors };
  }

  // Check for duplicates
  const seen = new Set<number>();
  for (const r of ranks) {
    if (seen.has(r)) {
      errors.push(`Duplicate rank detected: rank ${r} is assigned to multiple parameters.`);
    }
    seen.add(r);
  }

  // Check range
  for (const r of ranks) {
    if (r < 1 || r > 7 || !Number.isInteger(r)) {
      errors.push(`Invalid rank value: ${r}. Ranks must be integers from 1 to 7.`);
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate CSP ratings.
 */
export function validateCSPRatings(
  ratings: Record<string, Record<string, number>>
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const cspId of Object.keys(ratings)) {
    for (const paramId of Object.keys(ratings[cspId])) {
      const val = ratings[cspId][paramId];
      if (val < 0 || val > 10 || !Number.isFinite(val)) {
        errors.push(`Invalid rating for ${cspId}/${paramId}: ${val}. Must be between 0 and 10.`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}
