# Application de Coaching Fitness

Application web progressive (PWA) de coaching fitness avec programme d'entraînement personnalisé, traduction française complète et thème rouge.

## Fonctionnalités

- ✅ Programme d'entraînement de 14 jours traduit en français
- ✅ Thème rouge avec mode clair/sombre
- ✅ Suivi des poids et calories
- ✅ Statistiques et graphiques
- ✅ Sauvegarde dans Supabase avec fallback localStorage
- ✅ Installation en tant qu'application (PWA)
- ✅ Design responsive

## Installation locale

```bash
# Installation des dépendances
npm install

# Développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview
```

## Configuration Supabase

### 1. Créer les tables dans Supabase

Connectez-vous à votre projet Supabase et exécutez le script SQL dans `supabase-schema.sql` depuis le SQL Editor.

### 2. Configuration de la base de données

Les informations de connexion sont déjà configurées dans `src/lib/supabase.ts`:
- URL: `https://gfkmwbzwloybyuquyavz.supabase.co`
- API Key: Déjà configurée (clé anonyme publique)

### 3. Tables créées

- `workout_programs`: Stocke les programmes d'entraînement personnalisés
- `workout_history`: Historique des séances d'entraînement
- `weight_records`: Enregistrements de poids

### 4. Fonctionnement

L'application utilise un système de fallback:
1. Tentative de sauvegarde dans Supabase
2. En cas d'échec, sauvegarde en localStorage
3. Lecture depuis Supabase avec fallback sur localStorage

Chaque utilisateur reçoit un ID anonyme unique stocké localement.

## Déploiement sur GitHub Pages

### Configuration initiale

1. **Activer GitHub Pages**:
   - Allez dans les paramètres du dépôt GitHub
   - Section "Pages"
   - Source: "GitHub Actions"

2. **Push vers GitHub**:
   ```bash
   git add .
   git commit -m "Configuration pour déploiement GitHub Pages"
   git push origin main
   ```

3. **Déploiement automatique**:
   - Le workflow GitHub Actions se déclenche automatiquement
   - Le site sera disponible sur: `https://[votre-username].github.io/pflv2/`

### Structure du projet

```
pflv2/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Workflow de déploiement automatique
├── public/
│   └── manifest.json           # Manifest PWA
├── src/
│   ├── components/             # Composants React
│   ├── lib/
│   │   ├── supabase.ts        # Configuration Supabase
│   │   ├── supabaseStorage.ts # Fonctions de stockage Supabase
│   │   ├── storage.ts         # Réexport pour compatibilité
│   │   └── workoutData.ts     # Données d'entraînement (FR)
│   └── ...
├── supabase-schema.sql         # Script de création des tables
└── vite.config.ts             # Configuration Vite
```

## Technologies utilisées

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Supabase** - Base de données et authentification
- **Radix UI** - Composants accessibles
- **Recharts** - Graphiques
- **Lucide React** - Icônes

## Personnalisation

### Changer le nom du dépôt

Si votre dépôt n'est pas nommé "pflv2", modifiez la propriété `base` dans `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/votre-nom-de-repo/',
  // ...
})
```

### Modifier le thème

Les couleurs rouges sont définies dans `src/index.css`:
- Variables CSS pour le mode clair et sombre
- Section `:root` pour le mode clair
- Section `.dark` pour le mode sombre

## Projet original

Ce projet est basé sur le design Figma: https://www.figma.com/design/ofeuft3lpHCPrN0Mnc8tMd/Fitness-Coaching-App-Overview

## Licence

MIT