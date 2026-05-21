export const getTotalTime = (periods: number) => {
  const years = periods / 12;
  const months = periods % 12;
  const yearsText = `${years >= 1 ? `${Math.floor(years)} año${years >= 2 ? 's' : ''}` : ''}`;
  const monthsText = `${months !== 0 ? ` y ${months} mes${months >= 2 ? 'es' : ''}` : ''}`;

  return `${yearsText}${monthsText}`;
};
