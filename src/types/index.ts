
export interface Model {
  id: string;
  name: string;
  imageUrl: string;
  pin: string;
}

export interface Slot {
  id: string;
  day: string;
  time: string;
  status: 'gebucht' | 'frei' | 'blocker' | 'wild';
  model: string | null;
}

export interface Day {
  name: string;
  shortName: string;
  date: string;
  slots: Slot[];
}

export type WeekData = Day[];

export type AuthStatus = 'unauthenticated' | 'authenticated';
