export const MoneyFormat = Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format;

export const MoneyFixedFormat = Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}).format;

export const CompactFormat = Intl.NumberFormat('es-CO', {
  notation: 'compact',
  compactDisplay: 'short',
  style: 'currency',
  currency: 'COP',
}).format;

export const PercentageFormat = (value: number) => {
  return `${value.toFixed(2)}%`;
};
