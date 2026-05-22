const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const formatDate = (date: string) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return `${MONTHS_SHORT[parsedDate.getMonth()]} ${parsedDate.getFullYear()}`;
};

export const timeBetween = (date_start: string, date_end: string) => {
  const start = new Date(date_start);

  if (Number.isNaN(start.getTime())) {
    return '';
  }

  const end = Date.parse(date_end) ? new Date(date_end) : new Date();

  const diffMs = Math.abs(end.getTime() - start.getTime());

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''}`;
  }

  if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''}`;
  }

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''}`;
  }

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  }

  return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
};
