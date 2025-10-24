# Configuration Supabase - Instructions détaillées

## Étape 1: Créer les tables

1. Connectez-vous à votre projet Supabase: https://gfkmwbzwloybyuquyavz.supabase.co
2. Cliquez sur "SQL Editor" dans le menu latéral
3. Cliquez sur "New query"
4. Copiez et collez le contenu du fichier `supabase-schema.sql`
5. Cliquez sur "Run" pour exécuter le script

## Étape 2: Vérifier la création des tables

1. Allez dans "Table Editor"
2. Vous devriez voir 3 nouvelles tables:
   - `workout_programs`
   - `workout_history`
   - `weight_records`

## Étape 3: Vérifier les politiques RLS

1. Pour chaque table, cliquez sur l'icône "⚙️" puis "RLS policies"
2. Vérifiez que les politiques sont actives
3. Les politiques permettent toutes les opérations (SELECT, INSERT, UPDATE, DELETE)

## Étape 4: Tester la connexion

1. Lancez l'application en local: `npm run dev`
2. Ouvrez la console du navigateur (F12)
3. Utilisez l'application normalement
4. Vérifiez dans Supabase > Table Editor que les données apparaissent

## Structure des tables

### workout_programs
Stocke les programmes d'entraînement personnalisés de chaque utilisateur.

Colonnes:
- `id`: UUID (clé primaire)
- `user_id`: TEXT (identifiant anonyme de l'utilisateur)
- `day`: INTEGER (numéro du jour, 1-14)
- `completed`: BOOLEAN (jour complété ou non)
- `target_calories`: INTEGER (objectif calorique)
- `exercises`: JSONB (liste des exercices)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### workout_history
Historique des séances d'entraînement complétées.

Colonnes:
- `id`: UUID (clé primaire)
- `user_id`: TEXT
- `day`: INTEGER
- `date`: DATE
- `calories_burned`: INTEGER
- `exercises_completed`: INTEGER
- `created_at`: TIMESTAMP

### weight_records
Enregistrements de poids de l'utilisateur.

Colonnes:
- `id`: UUID (clé primaire)
- `user_id`: TEXT
- `date`: DATE
- `weight`: DECIMAL(5,2)
- `created_at`: TIMESTAMP

## Fonctionnement de l'ID utilisateur

L'application génère automatiquement un ID anonyme pour chaque utilisateur:
- Format: `anon_[timestamp]_[random]`
- Stocké dans localStorage
- Permet d'isoler les données de chaque utilisateur sans authentification

## Système de fallback

L'application utilise un double système de sauvegarde:

1. **Supabase (prioritaire)**: Toutes les opérations tentent d'abord Supabase
2. **localStorage (backup)**: Si Supabase échoue, utilise localStorage

Avantages:
- ✅ Données synchronisées en ligne
- ✅ Fonctionne même hors ligne
- ✅ Pas de perte de données
- ✅ Migration automatique vers Supabase

## Dépannage

### Erreur: "relation does not exist"
➡️ Les tables n'ont pas été créées. Exécutez le script SQL.

### Erreur: "permission denied"
➡️ Vérifiez les politiques RLS. Elles doivent être actives et autoriser toutes les opérations.

### Erreur: "Invalid API key"
➡️ Vérifiez que la clé API dans `src/lib/supabase.ts` est correcte.

### Les données ne s'affichent pas
➡️ Ouvrez la console (F12) et vérifiez les erreurs. Les données devraient être en localStorage en fallback.

## Accès à la console Supabase

- **URL**: https://supabase.com/dashboard/project/gfkmwbzwloybyuquyavz
- **SQL Editor**: Pour exécuter des requêtes SQL
- **Table Editor**: Pour voir et éditer les données
- **API Docs**: Documentation auto-générée de votre API

## Sécurité

⚠️ **Important**: La clé API utilisée est la clé "anon" (publique). Elle est sûre pour être exposée dans le code client grâce aux politiques RLS.

Pour une vraie application en production:
1. Configurez l'authentification Supabase
2. Ajustez les politiques RLS pour vérifier auth.uid()
3. N'exposez jamais la clé "service_role"
