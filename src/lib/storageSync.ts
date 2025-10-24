import { supabase } from './supabase';
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

// Fonction pour synchroniser en arrière-plan avec Supabase
const syncToSupabase = async (key: string, data: any) => {
  try {
    const userId = getUserId();

    switch (key) {
      case STORAGE_KEYS.SESSIONS:
        // Synchroniser les sessions
        await supabase.from('workout_history').upsert(
          data.map((session: WorkoutSession) => ({
            id: session.id,
            user_id: userId,
            day: session.day,
            date: session.date instanceof Date ? session.date.toISOString() : session.date,
            calories_burned: session.caloriesBurned,
            exercises_completed: session.exercisesCompleted,
          }))
        );
        break;

      case STORAGE_KEYS.WEIGHTS:
        // Synchroniser les poids
        await supabase.from('weight_records').upsert(
          data.map((entry: WeightEntry) => ({
            id: entry.id,
            user_id: userId,
            date: entry.date instanceof Date ? entry.date.toISOString().split('T')[0] : entry.date,
            weight: entry.weight,
          }))
        );
        break;

      case STORAGE_KEYS.WORKOUTS:
        // Supprimer l'ancien programme et insérer le nouveau
        await supabase.from('workout_programs').delete().eq('user_id', userId);
        await supabase.from('workout_programs').insert(
          data.map((day: WorkoutDay) => ({
            user_id: userId,
            day: day.day,
            completed: day.completed,
            target_calories: day.targetCalories,
            exercises: JSON.stringify(day.exercises),
          }))
        );
        break;
    }
  } catch (error) {
    console.log('Sync to Supabase failed (using localStorage fallback):', error);
    // Ne pas propager l'erreur - localStorage fonctionne comme fallback
  }
};

// Fonction pour charger depuis Supabase au démarrage
const loadFromSupabase = async () => {
  try {
    const userId = getUserId();

    // Charger les sessions
    const { data: sessions } = await supabase
      .from('workout_history')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (sessions && sessions.length > 0) {
      const localSessions = sessions.map(record => ({
        id: record.id,
        day: record.day,
        date: new Date(record.date),
        caloriesBurned: record.calories_burned,
        exercisesCompleted: record.exercises_completed,
      }));
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(localSessions));
    }

    // Charger les poids
    const { data: weights } = await supabase
      .from('weight_records')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: true });

    if (weights && weights.length > 0) {
      const localWeights = weights.map(record => ({
        id: record.id,
        date: new Date(record.date),
        weight: record.weight,
      }));
      localStorage.setItem(STORAGE_KEYS.WEIGHTS, JSON.stringify(localWeights));
    }

    // Charger le programme
    const { data: program } = await supabase
      .from('workout_programs')
      .select('*')
      .eq('user_id', userId)
      .order('day', { ascending: true });

    if (program && program.length > 0) {
      const localProgram = program.map(record => ({
        day: record.day,
        completed: record.completed,
        targetCalories: record.target_calories,
        exercises: JSON.parse(record.exercises),
      }));
      localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(localProgram));
    }
  } catch (error) {
    console.log('Load from Supabase failed (using localStorage):', error);
    // Ne pas propager l'erreur - localStorage fonctionne comme fallback
  }
};

// Charger les données au démarrage (appel unique)
if (typeof window !== 'undefined') {
  loadFromSupabase();
}

// Storage synchrone avec sync Supabase en arrière-plan
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

    // Synchroniser en arrière-plan
    syncToSupabase(STORAGE_KEYS.SESSIONS, sessions);
  },

  deleteSession: (id: string) => {
    const sessions = storage.getSessions().filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));

    // Supprimer dans Supabase en arrière-plan
    supabase.from('workout_history').delete().eq('id', id).then(() => {
      console.log('Session deleted from Supabase');
    }).catch(err => console.log('Delete from Supabase failed:', err));
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

    // Synchroniser en arrière-plan
    syncToSupabase(STORAGE_KEYS.WEIGHTS, weights);
  },

  deleteWeight: (id: string) => {
    const weights = storage.getWeights().filter(w => w.id !== id);
    localStorage.setItem(STORAGE_KEYS.WEIGHTS, JSON.stringify(weights));

    // Supprimer dans Supabase en arrière-plan
    supabase.from('weight_records').delete().eq('id', id).then(() => {
      console.log('Weight deleted from Supabase');
    }).catch(err => console.log('Delete from Supabase failed:', err));
  },

  // Workout Program
  getWorkoutProgram: (): WorkoutDay[] | null => {
    const data = localStorage.getItem(STORAGE_KEYS.WORKOUTS);
    return data ? JSON.parse(data) : null;
  },

  saveWorkoutProgram: (program: WorkoutDay[]) => {
    localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(program));

    // Synchroniser en arrière-plan
    syncToSupabase(STORAGE_KEYS.WORKOUTS, program);
  },

  // Theme
  getTheme: (): 'light' | 'dark' => {
    return (localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark') || 'light';
  },

  saveTheme: (theme: 'light' | 'dark') => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },
};
