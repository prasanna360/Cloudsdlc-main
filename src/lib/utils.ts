export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatScore(score: number): string {
  return score.toFixed(2);
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(0)}%`;
}
