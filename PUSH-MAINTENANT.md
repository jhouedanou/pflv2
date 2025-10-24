# 🚀 Guide rapide de déploiement

## ✅ Tout est prêt!

Les corrections ont été appliquées. Il ne reste plus qu'à pousser le code sur GitHub.

## Commandes à exécuter

### 1. Vérifier les modifications

```bash
git status
```

Vous devriez voir:
- `index.html` (modifié)
- `public/manifest.json` (modifié)
- `public/*.png` (nouveaux fichiers)
- `CORRECTIONS.md` (nouveau)
- Et d'autres fichiers...

### 2. Ajouter tous les fichiers

```bash
git add .
```

### 3. Créer le commit

```bash
git commit -m "Fix: Correction des chemins pour GitHub Pages + Configuration Supabase complète"
```

### 4. Pousser sur GitHub

```bash
git push origin main
```

## Ce qui va se passer

1. ⏳ **Push des fichiers** (quelques secondes)
2. 🔄 **GitHub Actions se déclenche automatiquement**
3. 🏗️ **Build de l'application** (~2 minutes)
   - Installation des dépendances
   - Compilation TypeScript
   - Build Vite
4. 🚀 **Déploiement sur GitHub Pages** (~1 minute)
5. ✅ **Application en ligne!**

## Suivre le déploiement

1. Allez sur GitHub: https://github.com/jhouedanou/pflv2
2. Cliquez sur l'onglet **"Actions"**
3. Vous verrez le workflow **"Déploiement sur GitHub Pages"** en cours
4. Cliquez dessus pour voir les détails

## Une fois déployé (après 2-3 minutes)

### Tester l'application

Ouvrez: **https://jhouedanou.github.io/pflv2/**

### Vérifications à faire

1. ✅ La page s'affiche sans erreur 404
2. ✅ Les icônes s'affichent correctement
3. ✅ Le manifest PWA fonctionne
4. ✅ L'application est utilisable
5. ✅ Le thème rouge est appliqué
6. ✅ Les exercices sont en français

### Console du navigateur (F12)

Ouvrez la console et vérifiez:
- ✅ Pas d'erreurs 404
- ✅ Pas d'erreurs JavaScript
- ⚠️ L'erreur "runtime.lastError" peut apparaître (c'est normal, c'est une extension)

### Tester la PWA

1. Cliquez sur l'icône **"Installer"** dans la barre d'adresse
2. Installez l'application
3. Ouvrez-la comme une vraie application

## Configuration Supabase

⚠️ **Important**: N'oubliez pas de configurer Supabase!

1. Ouvrez https://supabase.com/dashboard/project/gfkmwbzwloybyuquyavz
2. Allez dans **SQL Editor**
3. Créez une nouvelle requête
4. Copiez le contenu de `supabase-schema.sql`
5. Exécutez la requête

**Consultez `SUPABASE-SETUP.md` pour plus de détails**

## En cas de problème

### Le workflow échoue

1. Vérifiez les logs dans GitHub Actions
2. Relancez le workflow (bouton "Re-run all jobs")
3. Vérifiez que `package.json` et `vite.config.ts` sont corrects

### Erreurs 404 persistent

1. Attendez 5-10 minutes (propagation DNS)
2. Videz le cache du navigateur (Ctrl+F5 ou Cmd+Shift+R)
3. Vérifiez que le base path dans `vite.config.ts` est `/pflv2/`

### Supabase ne fonctionne pas

1. Les données sont sauvegardées en localStorage en fallback
2. Vérifiez que les tables sont créées dans Supabase
3. Consultez `SUPABASE-SETUP.md`

## Commandes de dépannage

```bash
# Vérifier le statut git
git status

# Voir les derniers commits
git log --oneline -5

# Forcer le push (si nécessaire)
git push -f origin main

# Builder localement pour tester
npm run build
npm run preview
```

## Support

En cas de problème:
1. Consultez `CORRECTIONS.md` pour les détails techniques
2. Vérifiez `DEPLOYMENT.md` pour le guide complet
3. Ouvrez la console du navigateur (F12)
4. Vérifiez les logs GitHub Actions

---

## 📋 Checklist finale

Avant de pousser:
- [x] Build réussi localement (`npm run build`)
- [x] Icônes dans le bon dossier (`public/`)
- [x] Chemins corrigés dans `index.html`
- [x] Manifest avec bons chemins
- [x] Configuration Vite correcte

Après le push:
- [ ] Workflow GitHub Actions réussi
- [ ] Application accessible en ligne
- [ ] Pas d'erreurs 404
- [ ] PWA installable
- [ ] Tables Supabase créées

---

**Prêt à pousser? Lancez les commandes ci-dessus!** 🚀

```bash
git add .
git commit -m "Fix: Correction des chemins pour GitHub Pages + Configuration Supabase complète"
git push origin main
```
