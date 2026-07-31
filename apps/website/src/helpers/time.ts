export const getTotalTime = (periods: number) => {
  if (periods === 0) return 'Inicio';

  const years = periods / 12;
  const months = periods % 12;
  const yearsText = `${years >= 1 ? `${Math.floor(years)} año${years >= 2 ? 's' : ''}` : ''}`;
  const monthsText = `${months !== 0 ? `${months} mes${months >= 2 ? 'es' : ''}` : ''}`;

  if (years >= 1 && months !== 0) {
    return `${yearsText} y ${monthsText}`;
  }

  return years >= 1 ? yearsText : monthsText;
};
