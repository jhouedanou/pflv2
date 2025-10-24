export type WorkoutMode = 'normal' | 'auto' | 'fat-burner';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  equipment: string;
  calories: number;
  bpm?: number;
  description?: string;
}

export interface WorkoutDay {
  day: number;
  exercises: Exercise[];
  completed: boolean;
  targetCalories: number;
}

export interface WorkoutSession {
  id: string;
  day: number;
  date: Date;
  duration: number;
  caloriesBurned: number;
  mode: WorkoutMode;
  completedExercises: number;
  totalExercises: number;
  weightLifted?: number;
}

export interface WeightEntry {
  id: string;
  date: Date;
  weight: number;
  notes?: string;
}

export interface UserStats {
  totalSessions: number;
  totalCalories: number;
  totalDuration: number;
  daysCompleted: number;
  weeklyActivity: { day: string; sessions: number; calories: number }[];
}
