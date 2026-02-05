import { WorkoutDay } from '../types';

// Programme d'exercices avec banc, barre de 30kg, haltères de 15kg et haltères de 10kg
// Pas de jumping jacks, burpees ou autres exercices de saut

export const workoutProgram: WorkoutDay[] = [
  {
    day: 1,
    completed: false,
    targetCalories: 280,
    exercises: [
      { id: '1-1', name: 'Développé couché', sets: 4, reps: 12, equipment: 'Banc + Barre 30kg', calories: 70, description: 'Allongé sur le banc, poussez la barre de 30kg depuis la poitrine vers le haut' },
      { id: '1-2', name: 'Rowing un bras', sets: 4, reps: 12, equipment: 'Haltère 15kg', calories: 55, description: 'Penché en avant, tirez l\'haltère de 15kg vers la hanche, un bras à la fois' },
      { id: '1-3', name: 'Écartés couchés', sets: 3, reps: 12, equipment: 'Banc + Haltères 10kg', calories: 45, description: 'Allongé sur le banc, écartez les haltères de 10kg puis ramenez-les au centre' },
      { id: '1-4', name: 'Curl biceps', sets: 3, reps: 15, equipment: 'Haltères 15kg', calories: 40, description: 'Debout, fléchissez les bras pour lever les haltères de 15kg vers les épaules' },
      { id: '1-5', name: 'Extensions triceps', sets: 3, reps: 12, equipment: 'Haltère 10kg', calories: 35, description: 'Tenez l\'haltère de 10kg à deux mains derrière la tête et étendez les bras' },
    ],
  },
  {
    day: 2,
    completed: false,
    targetCalories: 300,
    exercises: [
      { id: '2-1', name: 'Squats avec barre', sets: 4, reps: 15, equipment: 'Barre 30kg', calories: 80, description: 'Barre de 30kg sur les épaules, descendez en squat profond' },
      { id: '2-2', name: 'Fentes avec haltères', sets: 3, reps: 12, equipment: 'Haltères 15kg', calories: 65, description: 'Haltères de 15kg en main, avancez une jambe et descendez le genou arrière' },
      { id: '2-3', name: 'Soulevé de terre roumain', sets: 4, reps: 12, equipment: 'Barre 30kg', calories: 70, description: 'Barre de 30kg, descendez en gardant les jambes légèrement fléchies' },
      { id: '2-4', name: 'Mollets debout', sets: 3, reps: 20, equipment: 'Haltères 15kg', calories: 35, description: 'Haltères de 15kg en main, montez sur la pointe des pieds' },
      { id: '2-5', name: 'Hip thrust', sets: 3, reps: 15, equipment: 'Banc + Barre 30kg', calories: 60, description: 'Dos sur le banc, barre de 30kg sur les hanches, poussez vers le haut' },
    ],
  },
  {
    day: 3,
    completed: false,
    targetCalories: 270,
    exercises: [
      { id: '3-1', name: 'Développé épaules', sets: 4, reps: 12, equipment: 'Haltères 15kg', calories: 60, description: 'Assis ou debout, poussez les haltères de 15kg au-dessus de la tête' },
      { id: '3-2', name: 'Élévations latérales', sets: 3, reps: 15, equipment: 'Haltères 10kg', calories: 45, description: 'Levez les haltères de 10kg sur les côtés jusqu\'à hauteur des épaules' },
      { id: '3-3', name: 'Élévations frontales', sets: 3, reps: 12, equipment: 'Haltères 10kg', calories: 40, description: 'Levez les haltères de 10kg devant vous jusqu\'à hauteur des épaules' },
      { id: '3-4', name: 'Rowing menton', sets: 3, reps: 12, equipment: 'Barre 30kg', calories: 55, description: 'Tirez la barre de 30kg vers le menton en gardant les coudes hauts' },
      { id: '3-5', name: 'Shrugs', sets: 3, reps: 15, equipment: 'Haltères 15kg', calories: 35, description: 'Haltères de 15kg en main, haussez les épaules vers les oreilles' },
    ],
  },
  {
    day: 4,
    completed: false,
    targetCalories: 260,
    exercises: [
      { id: '4-1', name: 'Curl marteau', sets: 3, reps: 12, equipment: 'Haltères 15kg', calories: 40, description: 'Curl avec les haltères de 15kg en position neutre (pouces vers le haut)' },
      { id: '4-2', name: 'Curl concentration', sets: 3, reps: 12, equipment: 'Haltère 10kg', calories: 35, description: 'Assis, coude sur la cuisse, curl avec l\'haltère de 10kg' },
      { id: '4-3', name: 'Barre au front', sets: 3, reps: 12, equipment: 'Banc + Barre 30kg', calories: 50, description: 'Allongé sur le banc, descendez la barre de 30kg vers le front puis étendez' },
      { id: '4-4', name: 'Kickback triceps', sets: 3, reps: 12, equipment: 'Haltères 10kg', calories: 35, description: 'Penché, étendez les haltères de 10kg vers l\'arrière' },
      { id: '4-5', name: 'Curl barre', sets: 3, reps: 12, equipment: 'Barre 30kg', calories: 45, description: 'Debout, curl avec la barre de 30kg' },
    ],
  },
  {
    day: 5,
    completed: false,
    targetCalories: 290,
    exercises: [
      { id: '5-1', name: 'Développé couché incliné', sets: 4, reps: 12, equipment: 'Banc + Haltères 15kg', calories: 65, description: 'Banc incliné, poussez les haltères de 15kg vers le haut' },
      { id: '5-2', name: 'Pull-over', sets: 3, reps: 12, equipment: 'Banc + Haltère 15kg', calories: 50, description: 'Allongé sur le banc, descendez l\'haltère de 15kg derrière la tête' },
      { id: '5-3', name: 'Rowing un bras', sets: 4, reps: 12, equipment: 'Banc + Haltère 15kg', calories: 55, description: 'Main sur le banc, tirez l\'haltère de 15kg vers la hanche' },
      { id: '5-4', name: 'Développé serré', sets: 3, reps: 12, equipment: 'Banc + Barre 30kg', calories: 55, description: 'Développé couché avec prise serrée pour cibler les triceps' },
      { id: '5-5', name: 'Pompes sur le banc', sets: 3, reps: 15, equipment: 'Banc', calories: 40, description: 'Mains sur le banc, pompes inclinées' },
    ],
  },
  {
    day: 6,
    completed: false,
    targetCalories: 310,
    exercises: [
      { id: '6-1', name: 'Squats avant', sets: 4, reps: 12, equipment: 'Barre 30kg', calories: 75, description: 'Barre de 30kg devant sur les épaules, squat profond' },
      { id: '6-2', name: 'Fentes arrière', sets: 3, reps: 12, equipment: 'Haltères 10kg', calories: 55, description: 'Haltères de 10kg en main, reculez une jambe en fente' },
      { id: '6-3', name: 'Good morning', sets: 3, reps: 12, equipment: 'Barre 30kg', calories: 50, description: 'Barre de 30kg sur les épaules, penchez le buste en avant' },
      { id: '6-4', name: 'Extension quadriceps', sets: 3, reps: 15, equipment: 'Banc + Haltère 10kg', calories: 40, description: 'Assis sur le banc, haltère de 10kg sur la cheville, étendez la jambe' },
      { id: '6-5', name: 'Goblet squat', sets: 3, reps: 15, equipment: 'Haltère 15kg', calories: 60, description: 'Tenez l\'haltère de 15kg contre la poitrine et faites un squat' },
    ],
  },
  {
    day: 7,
    completed: false,
    targetCalories: 200,
    exercises: [
      { id: '7-1', name: 'Étirements complets', sets: 1, reps: 20, equipment: 'Banc', calories: 40, description: 'Routine d\'étirements utilisant le banc comme support, minutes et non répétitions' },
      { id: '7-2', name: 'Curl léger', sets: 2, reps: 20, equipment: 'Haltères 10kg', calories: 30, description: 'Curls légers avec les haltères de 10kg pour la récupération active' },
      { id: '7-3', name: 'Élévations latérales légères', sets: 2, reps: 15, equipment: 'Haltères 10kg', calories: 25, description: 'Élévations légères pour maintenir la mobilité des épaules' },
      { id: '7-4', name: 'Squats sans poids', sets: 2, reps: 20, equipment: 'Poids du corps', calories: 35, description: 'Squats légers pour la récupération des jambes' },
      { id: '7-5', name: 'Gainage sur banc', sets: 3, reps: 30, equipment: 'Banc', calories: 40, description: 'Planche avec les mains sur le banc, secondes et non répétitions' },
    ],
  },
  {
    day: 8,
    completed: false,
    targetCalories: 290,
    exercises: [
      { id: '8-1', name: 'Développé couché', sets: 4, reps: 10, equipment: 'Banc + Barre 30kg', calories: 70, description: 'Développé avec la barre de 30kg, tempo lent' },
      { id: '8-2', name: 'Rowing penché', sets: 4, reps: 12, equipment: 'Barre 30kg', calories: 65, description: 'Penché, tirez la barre de 30kg vers le ventre' },
      { id: '8-3', name: 'Écartés inclinés', sets: 3, reps: 12, equipment: 'Banc + Haltères 10kg', calories: 45, description: 'Banc incliné, écartés avec les haltères de 10kg' },
      { id: '8-4', name: 'Rowing un bras', sets: 3, reps: 12, equipment: 'Banc + Haltère 15kg', calories: 50, description: 'Main sur le banc, tirez l\'haltère de 15kg vers la hanche' },
      { id: '8-5', name: 'Dips sur banc', sets: 3, reps: 15, equipment: 'Banc', calories: 45, description: 'Mains sur le banc, descendez le corps en pliant les coudes' },
    ],
  },
  {
    day: 9,
    completed: false,
    targetCalories: 300,
    exercises: [
      { id: '9-1', name: 'Squats', sets: 5, reps: 10, equipment: 'Barre 30kg', calories: 85, description: 'Squats profonds avec la barre de 30kg' },
      { id: '9-2', name: 'Soulevé de terre', sets: 4, reps: 10, equipment: 'Barre 30kg', calories: 75, description: 'Soulevé de terre classique avec la barre de 30kg' },
      { id: '9-3', name: 'Fentes marchées', sets: 3, reps: 12, equipment: 'Haltères 15kg', calories: 60, description: 'Fentes en avançant avec les haltères de 15kg' },
      { id: '9-4', name: 'Hip thrust', sets: 3, reps: 15, equipment: 'Banc + Barre 30kg', calories: 55, description: 'Extension des hanches avec le dos sur le banc' },
      { id: '9-5', name: 'Step-up sur banc', sets: 3, reps: 12, equipment: 'Banc + Haltères 10kg', calories: 50, description: 'Montez sur le banc avec les haltères de 10kg' },
    ],
  },
  {
    day: 10,
    completed: false,
    targetCalories: 280,
    exercises: [
      { id: '10-1', name: 'Développé Arnold', sets: 4, reps: 12, equipment: 'Haltères 15kg', calories: 60, description: 'Développé épaules avec rotation des haltères de 15kg' },
      { id: '10-2', name: 'Face pull avec haltères', sets: 3, reps: 15, equipment: 'Haltères 10kg', calories: 40, description: 'Tirez les haltères de 10kg vers le visage en écartant les coudes' },
      { id: '10-3', name: 'Élévations latérales penchées', sets: 3, reps: 12, equipment: 'Haltères 10kg', calories: 40, description: 'Penché, levez les haltères de 10kg sur les côtés' },
      { id: '10-4', name: 'Développé militaire', sets: 4, reps: 10, equipment: 'Barre 30kg', calories: 65, description: 'Debout, poussez la barre de 30kg au-dessus de la tête' },
      { id: '10-5', name: 'Shrugs lourds', sets: 3, reps: 15, equipment: 'Haltères 15kg', calories: 35, description: 'Haussements d\'épaules avec les haltères de 15kg' },
    ],
  },
  {
    day: 11,
    completed: false,
    targetCalories: 260,
    exercises: [
      { id: '11-1', name: 'Curl 21s (protocole spécial)', sets: 3, reps: 1, equipment: 'Barre 30kg', calories: 50, description: 'Protocole 21s: 7 demi-reps bas, 7 demi-reps haut, 7 reps complètes = 1 série' },
      { id: '11-2', name: 'Curl incliné', sets: 3, reps: 12, equipment: 'Banc + Haltères 10kg', calories: 40, description: 'Allongé sur banc incliné, curl avec les haltères de 10kg' },
      { id: '11-3', name: 'Extension triceps couché', sets: 3, reps: 12, equipment: 'Banc + Haltères 10kg', calories: 40, description: 'Allongé, étendez les haltères de 10kg au-dessus de la tête' },
      { id: '11-4', name: 'Dips sur banc', sets: 3, reps: 15, equipment: 'Banc', calories: 45, description: 'Triceps dips avec les mains sur le banc' },
      { id: '11-5', name: 'Curl concentration', sets: 3, reps: 12, equipment: 'Haltère 15kg', calories: 35, description: 'Curl concentré avec l\'haltère de 15kg' },
    ],
  },
  {
    day: 12,
    completed: false,
    targetCalories: 320,
    exercises: [
      { id: '12-1', name: 'Développé couché pause', sets: 4, reps: 8, equipment: 'Banc + Barre 30kg', calories: 70, description: 'Développé avec pause de 2 secondes en bas' },
      { id: '12-2', name: 'Rowing Pendlay', sets: 4, reps: 10, equipment: 'Barre 30kg', calories: 65, description: 'Rowing explosif avec la barre de 30kg depuis le sol' },
      { id: '12-3', name: 'Développé haltères', sets: 3, reps: 12, equipment: 'Banc + Haltères 15kg', calories: 60, description: 'Développé couché avec les haltères de 15kg' },
      { id: '12-4', name: 'Pull-over', sets: 3, reps: 12, equipment: 'Banc + Haltère 15kg', calories: 50, description: 'Pull-over avec l\'haltère de 15kg' },
      { id: '12-5', name: 'Rowing menton large', sets: 3, reps: 12, equipment: 'Barre 30kg', calories: 55, description: 'Rowing au menton avec prise large' },
    ],
  },
  {
    day: 13,
    completed: false,
    targetCalories: 310,
    exercises: [
      { id: '13-1', name: 'Squats paused', sets: 4, reps: 8, equipment: 'Barre 30kg', calories: 80, description: 'Squats avec pause de 2 secondes en bas' },
      { id: '13-2', name: 'Soulevé de terre jambes tendues', sets: 4, reps: 10, equipment: 'Barre 30kg', calories: 70, description: 'Soulevé de terre avec les jambes tendues' },
      { id: '13-3', name: 'Fentes latérales', sets: 3, reps: 12, equipment: 'Haltères 10kg', calories: 55, description: 'Fentes sur le côté avec les haltères de 10kg' },
      { id: '13-4', name: 'Bulgarian split squat', sets: 3, reps: 12, equipment: 'Banc + Haltères 15kg', calories: 65, description: 'Pied arrière sur le banc, squat avec les haltères de 15kg' },
      { id: '13-5', name: 'Mollets assis', sets: 3, reps: 20, equipment: 'Haltères 15kg', calories: 35, description: 'Assis sur le banc, haltères de 15kg sur les genoux' },
    ],
  },
  {
    day: 14,
    completed: false,
    targetCalories: 200,
    exercises: [
      { id: '14-1', name: 'Circuit léger haut du corps', sets: 2, reps: 15, equipment: 'Haltères 10kg', calories: 50, description: 'Enchaînement de curls, élévations et développés légers' },
      { id: '14-2', name: 'Circuit léger bas du corps', sets: 2, reps: 15, equipment: 'Haltères 10kg', calories: 50, description: 'Enchaînement de squats et fentes légers' },
      { id: '14-3', name: 'Étirements sur banc', sets: 1, reps: 15, equipment: 'Banc', calories: 30, description: 'Routine d\'étirements utilisant le banc, minutes et non répétitions' },
      { id: '14-4', name: 'Gainage', sets: 3, reps: 30, equipment: 'Banc', calories: 40, description: 'Planche avec les mains sur le banc, secondes et non répétitions' },
    ],
  },
];
