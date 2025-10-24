-- Script SQL pour créer les tables dans Supabase
-- À exécuter dans le SQL Editor de Supabase

-- Table pour les programmes d'entraînement
CREATE TABLE IF NOT EXISTS workout_programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  day INTEGER NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  target_calories INTEGER,
  exercises JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, day)
);

-- Table pour l'historique des entraînements
CREATE TABLE IF NOT EXISTS workout_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  day INTEGER NOT NULL,
  date DATE NOT NULL,
  calories_burned INTEGER NOT NULL,
  exercises_completed INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour les enregistrements de poids
CREATE TABLE IF NOT EXISTS weight_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  date DATE NOT NULL,
  weight DECIMAL(5, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_workout_programs_user_id ON workout_programs(user_id);
CREATE INDEX IF NOT EXISTS idx_workout_history_user_id ON workout_history(user_id);
CREATE INDEX IF NOT EXISTS idx_workout_history_date ON workout_history(date);
CREATE INDEX IF NOT EXISTS idx_weight_records_user_id ON weight_records(user_id);
CREATE INDEX IF NOT EXISTS idx_weight_records_date ON weight_records(date);

-- Active Row Level Security (RLS)
ALTER TABLE workout_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE weight_records ENABLE ROW LEVEL SECURITY;

-- Politiques de sécurité (permettre tout pour les utilisateurs anonymes)
CREATE POLICY "Permettre toutes les opérations sur workout_programs" ON workout_programs
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Permettre toutes les opérations sur workout_history" ON workout_history
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Permettre toutes les opérations sur weight_records" ON weight_records
  FOR ALL USING (true) WITH CHECK (true);

-- Fonction pour mettre à jour le champ updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour updated_at
CREATE TRIGGER update_workout_programs_updated_at
  BEFORE UPDATE ON workout_programs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
