import { getLocales } from 'expo-localization';
const { languageTag } = getLocales()[0];

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat(languageTag, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
export function formatTime(date: Date) {
  return new Intl.DateTimeFormat(languageTag, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date);
}

export function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat(languageTag, {
    style: 'currency',
    currency,
  }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat(languageTag, {
    maximumFractionDigits: 2,
  }).format(value);
}

