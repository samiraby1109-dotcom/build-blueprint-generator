import { type ClassValue, clsx } from 'clsx';

// Simple classname merge utility
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format date for display
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Generate shareable URL for results
export function getResultsUrl(resultId: string): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/blueprint/${resultId}`;
  }
  return `/blueprint/${resultId}`;
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Storage keys
export const STORAGE_KEYS = {
  QUIZ_STATE: 'blueprint-quiz-state',
  RESULTS: 'blueprint-results',
} as const;

// Save result to localStorage
export function saveResult(resultId: string, result: unknown): void {
  if (typeof window === 'undefined') return;

  const existingResults = localStorage.getItem(STORAGE_KEYS.RESULTS);
  const results = existingResults ? JSON.parse(existingResults) : {};
  results[resultId] = result;
  localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
}

// Get result from localStorage
export function getResult(resultId: string): unknown | null {
  if (typeof window === 'undefined') return null;

  const existingResults = localStorage.getItem(STORAGE_KEYS.RESULTS);
  if (!existingResults) return null;

  const results = JSON.parse(existingResults);
  return results[resultId] || null;
}
