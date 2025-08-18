import { MONTH } from '../constants/time';

export function formatDate(date: Date): string {
  if (!date) return '';
  const year = date.getFullYear();
  const month = MONTH[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}
