export function normalizeSeries(values: number[]): number[] {
  const max = Math.max(...values, 1);
  return values.map((value) => value / max);
}

export function buildAreaPath(
  normalized: number[],
  width: number,
  height: number,
  padding = 4,
): string {
  if (normalized.length === 0) return "";

  const innerW = width - padding * 2;
  const innerH = height - padding * 2;
  const step = normalized.length > 1 ? innerW / (normalized.length - 1) : 0;

  const points = normalized.map((value, index) => {
    const x = padding + index * step;
    const y = padding + innerH - value * innerH;
    return `${x},${y}`;
  });

  const baseline = `${padding},${padding + innerH}`;
  const lastX = padding + (normalized.length - 1) * step;
  const close = `${lastX},${padding + innerH} ${baseline}`;

  return `M ${points[0]} L ${points.slice(1).join(" L ")} L ${close} Z`;
}

export function buildLinePath(
  normalized: number[],
  width: number,
  height: number,
  padding = 4,
): string {
  if (normalized.length === 0) return "";

  const innerW = width - padding * 2;
  const innerH = height - padding * 2;
  const step = normalized.length > 1 ? innerW / (normalized.length - 1) : 0;

  return normalized
    .map((value, index) => {
      const x = padding + index * step;
      const y = padding + innerH - value * innerH;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}
