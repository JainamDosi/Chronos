
import React from 'react';
import { SlotType } from './types';

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const HOURS = Array.from({ length: 24 }, (_, i) => i);

export const SLOT_COLORS: Record<SlotType, string[]> = {
  [SlotType.PRODUCTIVE]: [
    'bg-zinc-800',
    'bg-emerald-950/40',
    'bg-emerald-900/60',
    'bg-emerald-700/80',
    'bg-emerald-600',
    'bg-emerald-500'
  ],
  [SlotType.UNPRODUCTIVE]: [
    'bg-zinc-800',
    'bg-rose-950/40',
    'bg-rose-900/60',
    'bg-rose-700/80',
    'bg-rose-600',
    'bg-rose-500'
  ],
  [SlotType.SLEEP]: ['bg-indigo-500/80'],
  [SlotType.UNTRACKED]: ['bg-transparent']
};

export const Icons = {
  Productive: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
  ),
  Unproductive: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
  ),
  Sleep: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
  ),
  Bot: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="10" x="3" y="11" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" x2="8" y1="16" y2="16"/><line x1="16" x2="16" y1="16" y2="16"/></svg>
  )
};
