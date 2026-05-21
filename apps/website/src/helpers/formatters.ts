export const MoneyFormat = Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format;

export const PercentageFormat = (value: number) => {
  return `${value.toFixed(2)}%`;
};
