/** Likelihood × Severity → risk level (matrix). */
const rank = { Low: 1, Medium: 2, High: 3 };

export function computeRiskLevel(likelihood, severity) {
  const a = rank[likelihood] ?? 2;
  const b = rank[severity] ?? 2;
  const p = a * b;
  if (p <= 2) return 'Low';
  if (p <= 4) return 'Medium';
  if (p <= 6) return 'High';
  return 'Critical';
}
