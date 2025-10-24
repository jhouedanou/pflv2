# Fix: Erreur "getSessions is not a function"

## Problème résolu

L'application affichait l'erreur:
```
TypeError: wt.getSessions(...).filter is not a function
```

Et les erreurs Supabase:
```
Could not find the table 'public.workout_history' in the schema cache
Could not find the table 'public.workout_programs' in the schema cache
```

## Causes

1. **Fonctions asynchrones utilisées de façon synchrone**:
   - `supabaseStorage.ts` avait des fonctions `async` qui retournaient des Promises
   - Les composants React les utilisaient de façon synchrone avec `.filter()` directement
   - Cela causait l'erreur car on ne peut pas appeler `.filter()` sur une Promise

2. **Tables Supabase non créées**:
   - Les tables n'avaient pas encore été créées dans Supabase
   - Les requêtes retournaient donc des 404

## Solution appliquée

### 1. Nouveau système de storage synchrone ✅

Créé **[src/lib/storageSync.ts](src/lib/storageSync.ts)** qui:

- **Fonctionne de façon synchrone** (pas de Promise)
- Utilise **localStorage comme source principale** (instantané)
- **Synchronise avec Supabase en arrière-plan** (ne bloque pas l'UI)
- **Charge les données de Supabase au démarrage** de l'application
- **Continue de fonctionner** même si Supabase échoue

### 2. Architecture hybride

```
┌─────────────┐
│  Composants │
│    React    │
└──────┬──────┘
       │ Appels synchrones
       ▼
┌──────────────┐
│   storage    │ ◄──── Synchrone (localStorage)
│ (storageSync)│
└──────┬───────┘
       │ Sync en arrière-plan
       ▼
┌──────────────┐
│   Supabase   │ ◄──── Asynchrone
└──────────────┘
```

### 3. Avantages de cette approche

✅ **Pas de changement de code** dans les composants React
✅ **Performance optimale** (localStorage est instantané)
✅ **Fonctionne offline** (localStorage toujours disponible)
✅ **Synchronisation automatique** avec Supabase quand disponible
✅ **Pas de bloquage de l'UI** pendant les requêtes réseau
✅ **Fallback robuste** si Supabase échoue

## Fichiers modifiés

1. **[src/lib/storageSync.ts](src/lib/storageSync.ts)** - NOUVEAU
   - Storage synchrone avec sync Supabase en arrière-plan
   - Charge les données de Supabase au démarrage
   - Synchronise chaque modification

2. **[src/lib/storage.ts](src/lib/storage.ts)** - MODIFIÉ
   - Maintenant réexporte depuis `storageSync` au lieu de `supabaseStorage`

3. **[src/lib/supabaseStorage.ts](src/lib/supabaseStorage.ts)** - CONSERVÉ
   - Gardé pour référence
   - Non utilisé actuellement

## Comportement

### Premier chargement (sans données Supabase)
1. L'app démarre
2. `loadFromSupabase()` essaie de charger (échoue si tables vides)
3. L'app utilise localStorage (vide au début)
4. L'utilisateur crée des données
5. Données sauvegardées dans localStorage (instantané)
6. Synchronisation vers Supabase en arrière-plan (si tables existent)

### Chargements suivants (avec données Supabase)
1. L'app démarre
2. `loadFromSupabase()` charge les données
3. Données copiées dans localStorage
4. L'app utilise localStorage (rapide)
5. Modifications synchronisées vers Supabase

### Si Supabase échoue
1. L'app continue de fonctionner normalement
2. Toutes les données dans localStorage
3. Message console: "Sync failed (using localStorage fallback)"
4. L'utilisateur ne voit aucune erreur
5. Retry automatique au prochain chargement de la page

## Configuration Supabase

Les tables peuvent maintenant être créées **à tout moment**:

1. **Si les tables existent déjà**:
   - Les données seront synchronisées immédiatement
   - Chargement au démarrage

2. **Si les tables n'existent pas encore**:
   - L'app fonctionne avec localStorage
   - Créez les tables quand vous voulez
   - Au prochain chargement, les données seront synchronisées

### Créer les tables maintenant (optionnel)

1. Ouvrez https://supabase.com/dashboard/project/gfkmwbzwloybyuquyavz
2. SQL Editor
3. Copiez le contenu de `supabase-schema.sql`
4. Exécutez

Consultez **[SUPABASE-SETUP.md](SUPABASE-SETUP.md)** pour les détails.

## Test local

Pour tester les changements localement:

```bash
# Build
npm run build

# Prévisualiser
npm run preview
```

Ouvrez http://localhost:4173 et vérifiez:
- ✅ Pas d'erreur "filter is not a function"
- ✅ L'app charge correctement
- ✅ Les données sont sauvegardées
- ✅ Console: messages "Sync to Supabase failed" ou "success" (normal)

## Déploiement

```bash
git add .
git commit -m "Fix: Storage synchrone avec sync Supabase en arrière-plan"
git push origin main
```

Après 2-3 minutes:
- https://jhouedanou.github.io/pflv2/
- L'erreur sera corrigée
- L'app fonctionnera même sans les tables Supabase

## Logs de la console

Normaux:
```
✅ "Load from Supabase failed (using localStorage)" - OK si tables pas créées
✅ "Sync to Supabase failed (using localStorage fallback)" - OK si tables pas créées
✅ "Session deleted from Supabase" - OK quand suppression réussit
```

Erreurs à surveiller:
```
❌ Erreur JavaScript/TypeScript
❌ "is not a function"
```

## Résumé

| Aspect | Avant | Après |
|--------|-------|-------|
| API | Asynchrone | Synchrone |
| Source primaire | Supabase | localStorage |
| Performance | Lente (réseau) | Instantanée |
| Fonctionne offline | Non | Oui |
| Requiert Supabase | Oui | Non (optionnel) |
| UI bloquée | Parfois | Jamais |
| Code composants | À modifier | Inchangé |

---

**L'erreur est maintenant corrigée et l'app fonctionne avec ou sans Supabase!** ✅
