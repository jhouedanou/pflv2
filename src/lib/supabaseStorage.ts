import { supabase, WorkoutRecord, WeightRecord, WorkoutHistoryRecord } from './supabase';
import { WorkoutSession, WeightEntry, WorkoutDay } from '../types';

// Helper pour obtenir ou créer un user_id anonyme
const getUserId = (): string => {
  let userId = localStorage.getItem('anonymous_user_id');
  if (!userId) {
    userId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('anonymous_user_id', userId);
  }
  return userId;
};

const STORAGE_KEYS = {
  SESSIONS: 'workout_sessions',
  WEIGHTS: 'weight_entries',
  WORKOUTS: 'workout_program',
  THEME: 'theme_preference',
};

export const supabaseStorage = {
  // Workout Sessions
  getSessions: async (): Promise<WorkoutSession[]> => {
    try {
      const userId = getUserId();
      const { data, error } = await supabase
        .from('workout_history')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });

      if (error) throw error;

      // Convertir les données Supabase en WorkoutSession
      return (data || []).map((record: WorkoutHistoryRecord) => ({
        id: record.id || '',
        day: record.day,
        date: new Date(record.date),
        caloriesBurned: record.calories_burned,
        exercisesCompleted: record.exercises_completed,
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des sessions:', error);
      // Fallback sur localStorage
      const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      return data ? JSON.parse(data, (key, value) => {
        if (key === 'date') return new Date(value);
        return value;
      }) : [];
    }
  },

  saveSession: async (session: WorkoutSession) => {
    try {
      const userId = getUserId();
      const { error } = await supabase
        .from('workout_history')
        .insert({
          user_id: userId,
          day: session.day,
          date: session.date.toISOString(),
          calories_burned: session.caloriesBurned,
          exercises_completed: session.exercisesCompleted,
        });

      if (error) throw error;

      // Sauvegarder aussi en local comme backup
      const sessions = await supabaseStorage.getSessions();
      sessions.push(session);
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la session:', error);
      // Fallback sur localStorage
      const sessions = await supabaseStorage.getSessions();
      sessions.push(session);
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    }
  },

  deleteSession: async (id: string) => {
    try {
      const { error } = await supabase
        .from('workout_history')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Supprimer aussi du localStorage
      const sessions = await supabaseStorage.getSessions();
      const filtered = sessions.filter(s => s.id !== id);
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(filtered));
    } catch (error) {
      console.error('Erreur lors de la suppression de la session:', error);
      // Fallback sur localStorage
      const sessions = await supabaseStorage.getSessions();
      const filtered = sessions.filter(s => s.id !== id);
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(filtered));
    }
  },

  // Weight Entries
  getWeights: async (): Promise<WeightEntry[]> => {
    try {
      const userId = getUserId();
      const { data, error } = await supabase
        .from('weight_records')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: true });

      if (error) throw error;

      return (data || []).map((record: WeightRecord) => ({
        id: record.id || '',
        date: new Date(record.date),
        weight: record.weight,
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des poids:', error);
      // Fallback sur localStorage
      const data = localStorage.getItem(STORAGE_KEYS.WEIGHTS);
      return data ? JSON.parse(data, (key, value) => {
        if (key === 'date') return new Date(value);
        return value;
      }) : [];
    }
  },

  saveWeight: async (entry: WeightEntry) => {
    try {
      const userId = getUserId();
      const { error } = await supabase
        .from('weight_records')
        .insert({
          user_id: userId,
          date: entry.date.toISOString().split('T')[0],
          weight: entry.weight,
        });

      if (error) throw error;

      // Sauvegarder aussi en local comme backup
      const weights = await supabaseStorage.getWeights();
      weights.push(entry);
      weights.sort((a, b) => a.date.getTime() - b.date.getTime());
      localStorage.setItem(STORAGE_KEYS.WEIGHTS, JSON.stringify(weights));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du poids:', error);
      // Fallback sur localStorage
      const weights = await supabaseStorage.getWeights();
      weights.push(entry);
      weights.sort((a, b) => a.date.getTime() - b.date.getTime());
      localStorage.setItem(STORAGE_KEYS.WEIGHTS, JSON.stringify(weights));
    }
  },

  deleteWeight: async (id: string) => {
    try {
      const { error } = await supabase
        .from('weight_records')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Supprimer aussi du localStorage
      const weights = await supabaseStorage.getWeights();
      const filtered = weights.filter(w => w.id !== id);
      localStorage.setItem(STORAGE_KEYS.WEIGHTS, JSON.stringify(filtered));
    } catch (error) {
      console.error('Erreur lors de la suppression du poids:', error);
      // Fallback sur localStorage
      const weights = await supabaseStorage.getWeights();
      const filtered = weights.filter(w => w.id !== id);
      localStorage.setItem(STORAGE_KEYS.WEIGHTS, JSON.stringify(filtered));
    }
  },

  // Workout Program
  getWorkoutProgram: async (): Promise<WorkoutDay[] | null> => {
    try {
      const userId = getUserId();
      const { data, error } = await supabase
        .from('workout_programs')
        .select('*')
        .eq('user_id', userId)
        .order('day', { ascending: true });

      if (error) throw error;

      if (!data || data.length === 0) {
        // Fallback sur localStorage
        const localData = localStorage.getItem(STORAGE_KEYS.WORKOUTS);
        return localData ? JSON.parse(localData) : null;
      }

      // Convertir les données Supabase en WorkoutDay
      return data.map((record: any) => ({
        day: record.day,
        completed: record.completed,
        targetCalories: record.target_calories,
        exercises: JSON.parse(record.exercises),
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération du programme:', error);
      // Fallback sur localStorage
      const data = localStorage.getItem(STORAGE_KEYS.WORKOUTS);
      return data ? JSON.parse(data) : null;
    }
  },

  saveWorkoutProgram: async (program: WorkoutDay[]) => {
    try {
      const userId = getUserId();

      // Supprimer l'ancien programme
      await supabase
        .from('workout_programs')
        .delete()
        .eq('user_id', userId);

      // Insérer le nouveau programme
      const records = program.map(day => ({
        user_id: userId,
        day: day.day,
        completed: day.completed,
        target_calories: day.targetCalories,
        exercises: JSON.stringify(day.exercises),
      }));

      const { error } = await supabase
        .from('workout_programs')
        .insert(records);

      if (error) throw error;

      // Sauvegarder aussi en local comme backup
      localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(program));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du programme:', error);
      // Fallback sur localStorage
      localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(program));
    }
  },

  // Theme (reste en localStorage seulement)
  getTheme: (): 'light' | 'dark' => {
    return (localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark') || 'light';
  },

  saveTheme: (theme: 'light' | 'dark') => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },
};

// Export aussi l'ancien storage pour compatibilité
export { supabaseStorage as storage };
