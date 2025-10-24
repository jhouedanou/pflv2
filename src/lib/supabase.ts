import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gfkmwbzwloybyuquyavz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdma213Ynp3bG95Ynl1cXV5YXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyOTMyNzcsImV4cCI6MjA3Njg2OTI3N30.PxDehc8G14fvQCr7Uxmi_6DmIfGdUW4dLYcC4FCL75o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour la base de données
export interface WorkoutRecord {
  id?: string;
  user_id?: string;
  day: number;
  completed: boolean;
  completed_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface WeightRecord {
  id?: string;
  user_id?: string;
  date: string;
  weight: number;
  created_at?: string;
}

export interface WorkoutHistoryRecord {
  id?: string;
  user_id?: string;
  day: number;
  date: string;
  calories_burned: number;
  exercises_completed: number;
  created_at?: string;
}
