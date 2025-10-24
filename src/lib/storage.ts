import { WorkoutSession, WeightEntry, WorkoutDay } from '../types';

const STORAGE_KEYS = {
  SESSIONS: 'workout_sessions',
  WEIGHTS: 'weight_entries',
  WORKOUTS: 'workout_program',
  THEME: 'theme_preference',
};

export const storage = {
  // Workout Sessions
  getSessions: (): WorkoutSession[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return data ? JSON.parse(data, (key, value) => {
      if (key === 'date') return new Date(value);
      return value;
    }) : [];
  },

  saveSession: (session: WorkoutSession) => {
    const sessions = storage.getSessions();
    sessions.push(session);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  },

  deleteSession: (id: string) => {
    const sessions = storage.getSessions().filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  },

  // Weight Entries
  getWeights: (): WeightEntry[] => {
    const data = localStorage.getItem(STORAGE_KEYS.WEIGHTS);
    return data ? JSON.parse(data, (key, value) => {
      if (key === 'date') return new Date(value);
      return value;
    }) : [];
  },

  saveWeight: (entry: WeightEntry) => {
    const weights = storage.getWeights();
    weights.push(entry);
    weights.sort((a, b) => a.date.getTime() - b.date.getTime());
    localStorage.setItem(STORAGE_KEYS.WEIGHTS, JSON.stringify(weights));
  },

  deleteWeight: (id: string) => {
    const weights = storage.getWeights().filter(w => w.id !== id);
    localStorage.setItem(STORAGE_KEYS.WEIGHTS, JSON.stringify(weights));
  },

  // Workout Program
  getWorkoutProgram: (): WorkoutDay[] => {
    const data = localStorage.getItem(STORAGE_KEYS.WORKOUTS);
    return data ? JSON.parse(data) : null;
  },

  saveWorkoutProgram: (program: WorkoutDay[]) => {
    localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(program));
  },

  // Theme
  getTheme: (): 'light' | 'dark' => {
    return (localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark') || 'light';
  },

  saveTheme: (theme: 'light' | 'dark') => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },
};
