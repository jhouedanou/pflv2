# Guide de déploiement

## Prérequis

✅ Node.js installé (version 18 ou supérieure)
✅ Compte GitHub
✅ Compte Supabase (déjà configuré)

## Étape 1: Configuration Supabase

Avant le déploiement, configurez votre base de données Supabase:

1. Ouvrez le fichier `supabase-schema.sql`
2. Connectez-vous à Supabase: https://supabase.com/dashboard/project/gfkmwbzwloybyuquyavz
3. Allez dans "SQL Editor"
4. Créez une nouvelle requête et collez le contenu du fichier
5. Exécutez la requête

Consultez `SUPABASE-SETUP.md` pour des instructions détaillées.

## Étape 2: Préparation du code

Le code est déjà prêt pour le déploiement avec:
- ✅ Configuration Vite pour GitHub Pages
- ✅ Workflow GitHub Actions
- ✅ Intégration Supabase
- ✅ Thème rouge
- ✅ Traduction française
- ✅ Manifest PWA

## Étape 3: Premier déploiement

### 3.1 Initialiser le dépôt Git (si pas déjà fait)

```bash
git init
git add .
git commit -m "Configuration initiale pour déploiement"
```

### 3.2 Créer le dépôt sur GitHub

1. Allez sur https://github.com
2. Cliquez sur "New repository"
3. Nom: `pflv2` (ou autre nom, mais pensez à modifier `vite.config.ts`)
4. Ne pas initialiser avec README (déjà présent)
5. Créez le dépôt

### 3.3 Pousser le code

```bash
git remote add origin https://github.com/[votre-username]/pflv2.git
git branch -M main
git push -u origin main
```

### 3.4 Activer GitHub Pages

1. Allez dans Settings > Pages du dépôt
2. Source: "GitHub Actions"
3. Sauvegardez

### 3.5 Déploiement automatique

Le workflow GitHub Actions va:
1. Se déclencher automatiquement
2. Installer les dépendances
3. Builder l'application
4. Déployer sur GitHub Pages

Progression visible dans: Actions > Déploiement sur GitHub Pages

## Étape 4: Vérification

1. Attendez que le workflow se termine (environ 2-3 minutes)
2. L'URL de votre application sera: `https://[votre-username].github.io/pflv2/`
3. Testez l'application
4. Vérifiez la console (F12) pour les erreurs

## Étape 5: Mises à jour

Pour mettre à jour l'application:

```bash
# Faites vos modifications
git add .
git commit -m "Description des modifications"
git push origin main
```

Le déploiement se fait automatiquement après chaque push.

## Configuration avancée

### Domaine personnalisé

1. Settings > Pages > Custom domain
2. Entrez votre domaine
3. Configurez le DNS (CNAME vers [username].github.io)

### Variables d'environnement

Pour utiliser des variables d'environnement dans GitHub Actions:

1. Settings > Secrets and variables > Actions
2. Ajoutez vos secrets
3. Modifiez `.github/workflows/deploy.yml` pour les utiliser

### Optimisation du build

Le fichier JavaScript est assez gros (900 KB). Pour l'optimiser:

1. Activez le code splitting dans `vite.config.ts`
2. Utilisez des imports dynamiques
3. Analysez le bundle avec `npm run build -- --mode analyze`

## Dépannage

### Le site ne s'affiche pas

- Vérifiez que le workflow s'est terminé avec succès
- Vérifiez que Pages est activé dans les Settings
- Attendez 5-10 minutes (propagation DNS)
- Videz le cache du navigateur (Ctrl+F5)

### Erreurs 404 sur les assets

- Vérifiez que `base: '/pflv2/'` dans `vite.config.ts` correspond au nom du dépôt
- Si le dépôt s'appelle différemment, modifiez cette valeur

### Le workflow échoue

- Vérifiez les logs dans Actions
- Assurez-vous que `package.json` est correct
- Essayez de builder localement: `npm run build`

### Supabase ne fonctionne pas

- Vérifiez que les tables sont créées
- Vérifiez les politiques RLS
- Consultez `SUPABASE-SETUP.md`
- Les données sont sauvegardées en localStorage en fallback

## Test local du build de production

```bash
# Builder l'application
npm run build

# Servir le build localement
npm run preview
```

Ouvrez http://localhost:4173 pour tester.

## Commandes utiles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview

# Vérifier les erreurs TypeScript
npx tsc --noEmit
```

## Support

En cas de problème:
1. Consultez les fichiers README.md et SUPABASE-SETUP.md
2. Vérifiez les logs dans GitHub Actions
3. Consultez la console du navigateur (F12)
4. Vérifiez le dépôt GitHub pour les issues

## Checklist de déploiement

- [ ] Tables Supabase créées
- [ ] Politiques RLS activées
- [ ] Code poussé sur GitHub
- [ ] GitHub Pages activé
- [ ] Workflow exécuté avec succès
- [ ] Application accessible via l'URL
- [ ] Test de sauvegarde des données
- [ ] Test mode hors ligne
- [ ] Test sur mobile
- [ ] PWA installable

Bon déploiement! 🚀
