# 🚀 Mode Automatique Ajouté!

## Nouvelle fonctionnalité: Mode Auto

Un nouveau mode d'entraînement automatique a été ajouté à l'application de fitness!

## 🎯 Qu'est-ce que le Mode Auto?

Le **Mode Auto** est un mode d'entraînement guidé qui:

- ⏱️ **Lance automatiquement un timer** pour chaque exercice
- 🔄 **Passe automatiquement** à la série suivante quand le timer atteint zéro
- ⏸️ **Peut être mis en pause** à tout moment
- 🔊 **Signaux sonores** pour les 3 dernières secondes
- 📊 **Barre de progression visuelle** en temps réel

## 📱 Comment utiliser le Mode Auto

### 1. Démarrer le Mode Auto

Depuis l'écran d'aperçu d'un jour d'entraînement:

1. Cliquez sur le bouton **"Mode Auto"** (rouge/orange)
2. Le timer démarre automatiquement pour le premier exercice
3. Suivez les instructions à l'écran

### 2. Pendant l'exercice

**Affichage:**
- 🔴 **Grand timer** montrant le temps restant (en secondes)
- 📊 **Barre de progression** rouge/orange
- 🎯 **Nombre de répétitions** affiché en dessous
- 📝 **Description de l'exercice**

**Timer:**
- Le timer est calculé automatiquement: **2,5 secondes par répétition**
- Exemple: 15 reps = 37,5 secondes
- Les 3 dernières secondes clignotent en rouge avec un son

### 3. Contrôles disponibles

**⏸️ Pause/Reprendre:**
- Cliquez sur "Pause" pour mettre le timer en pause
- Cliquez sur "Reprendre" pour continuer

**❌ Quitter Auto:**
- Revient au mode manuel
- Vous pouvez terminer manuellement la série

**⏭️ Navigation:**
- Les flèches gauche/droite permettent de passer aux exercices précédents/suivants
- Le timer s'arrête automatiquement lors du changement

### 4. Repos automatique

Après chaque série:
- ⏱️ **Timer de repos** de 20 secondes (mode auto)
- 🔄 **Passage automatique** à la série suivante
- 🔊 **Sons de compte à rebours** pour les 3 dernières secondes

### 5. Fin automatique

Quand le timer atteint zéro:
- ✅ La série est **marquée comme terminée automatiquement**
- ⏱️ Le **timer de repos démarre**
- 🔄 **Passage automatique** à la série suivante (ou exercice suivant)

## 🎨 Interface visuelle

### Bouton Mode Auto (écran d'aperçu)
```
┌────────────────────┐  ┌────────────────────┐
│  🎯 Mode Guidé     │  │  ⏱️ Mode Auto      │
│  (Bleu/Violet)     │  │  (Rouge/Orange)    │
└────────────────────┘  └────────────────────┘
```

### Timer en mode auto
```
╔═══════════════════════════════╗
║     ⏱️ Temps restant          ║
║                               ║
║          25s                  ║
║      (clignotant si ≤3)       ║
║                               ║
║   ▓▓▓▓▓▓▓▓░░░░░░░░░░░        ║
║   (Barre de progression)      ║
║                               ║
║  [⏸️ Pause] [❌ Quitter Auto] ║
╚═══════════════════════════════╝
```

## 🔊 Sons

Le mode auto inclut des signaux sonores:

- **3 dernières secondes**: Bip de compte à rebours
- **Fin du timer**: Bip final
- **Peut être désactivé**: Icône son en haut à droite

## 💡 Cas d'usage

**Parfait pour:**
- ✅ Suivre un rythme régulier
- ✅ Ne pas avoir à regarder l'horloge
- ✅ Entraînement en circuit
- ✅ Débutants qui ont besoin de guidance
- ✅ Entraînement à domicile sans coach

**Mode manuel toujours disponible:**
- Vous pouvez passer du mode auto au mode manuel
- Le mode guidé classique reste disponible
- Flexibilité totale

## 🎯 Différences entre les modes

| Fonctionnalité | Mode Guidé | Mode Auto |
|----------------|------------|-----------|
| Timer automatique | ❌ Non | ✅ Oui |
| Passage auto séries | ❌ Non | ✅ Oui |
| Contrôle manuel | ✅ Oui | ⏸️ Pause disponible |
| Sons de compte à rebours | ❌ Non | ✅ Oui |
| Temps de repos | 15s | 20s |
| Bouton de complétion | ✅ Manuel | ⏱️ Automatique |

## 🛠️ Fonctionnalités techniques

### Calcul du temps
```typescript
Durée = Nombre de répétitions × 2,5 secondes
```

Exemples:
- 10 reps = 25 secondes
- 15 reps = 37,5 secondes
- 20 reps = 50 secondes
- 30 reps = 75 secondes

### Repos entre séries
- **Mode normal**: 15 secondes
- **Mode auto**: 20 secondes
- **Mode fat-burner**: 10 secondes

### États du mode auto
1. **Timer en cours** - Compte à rebours actif
2. **En pause** - Timer figé
3. **Repos** - Entre les séries
4. **Terminé** - Exercice complété

## 📱 Responsive

Le mode auto fonctionne sur:
- 📱 **Mobile** - Interface adaptée tactile
- 💻 **Desktop** - Grand affichage confortable
- 🖥️ **Tablette** - Vue optimisée

## 🎨 Thème

Le mode auto utilise le nouveau thème rouge:
- 🔴 **Couleurs rouge/orange** pour le mode auto
- 🔵 **Bleu/violet** pour le mode guidé
- 🌓 **Compatible mode sombre**

## 🚀 Prochaines améliorations possibles

Idées pour le futur:
- [ ] Personnalisation du temps par répétition
- [ ] Musique intégrée avec rythme BPM
- [ ] Vidéos de démonstration
- [ ] Historique des temps par exercice
- [ ] Défis et objectifs de temps
- [ ] Mode HIIT avec timers spécifiques

## 📝 Notes

- Le mode auto est **optionnel** - vous pouvez toujours utiliser le mode guidé manuel
- Les **deux boutons** sont affichés sur l'écran d'aperçu
- Le mode auto **sauvegarde** les données normalement
- Compatible avec **tous les exercices** du programme

---

**Le mode auto est maintenant disponible dans l'application!** 🎉

Testez-le et profitez d'un entraînement guidé automatiquement!
