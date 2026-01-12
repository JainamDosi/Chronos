
export enum SlotType {
  PRODUCTIVE = 'PRODUCTIVE',
  UNPRODUCTIVE = 'UNPRODUCTIVE',
  SLEEP = 'SLEEP',
  UNTRACKED = 'UNTRACKED'
}

export type Rating = 1 | 2 | 3 | 4 | 5;

export interface TimeSlot {
  type: SlotType;
  rating?: Rating;
}

// Key is date string "YYYY-MM-DD"
export type WeeklyData = {
  [date: string]: {
    [hour: number]: TimeSlot;
  };
};

export interface AIInsight {
  score: number;
  critique: string;
  recommendations: string[];
}
