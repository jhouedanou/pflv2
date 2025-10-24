import { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { WorkoutDay, Exercise } from '../types';

interface EditWorkoutScreenProps {
  onBack: () => void;
  onSave: (workout: WorkoutDay) => void;
  workout: WorkoutDay;
}

export function EditWorkoutScreen({ onBack, onSave, workout }: EditWorkoutScreenProps) {
  const [editedWorkout, setEditedWorkout] = useState<WorkoutDay>(JSON.parse(JSON.stringify(workout)));
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newExercise, setNewExercise] = useState<Partial<Exercise>>({
    name: '',
    sets: 3,
    reps: 10,
    equipment: 'Bodyweight',
    calories: 50,
    description: '',
  });

  const handleUpdateExercise = (id: string, field: keyof Exercise, value: any) => {
    setEditedWorkout({
      ...editedWorkout,
      exercises: editedWorkout.exercises.map(ex =>
        ex.id === id ? { ...ex, [field]: value } : ex
      ),
    });
  };

  const handleDeleteExercise = (id: string) => {
    setEditedWorkout({
      ...editedWorkout,
      exercises: editedWorkout.exercises.filter(ex => ex.id !== id),
    });
  };

  const handleAddExercise = () => {
    if (!newExercise.name) return;

    const exercise: Exercise = {
      id: `${editedWorkout.day}-${Date.now()}`,
      name: newExercise.name || '',
      sets: newExercise.sets || 3,
      reps: newExercise.reps || 10,
      equipment: newExercise.equipment || 'Bodyweight',
      calories: newExercise.calories || 50,
      description: newExercise.description,
      bpm: newExercise.bpm,
    };

    setEditedWorkout({
      ...editedWorkout,
      exercises: [...editedWorkout.exercises, exercise],
    });

    setIsAddDialogOpen(false);
    setNewExercise({
      name: '',
      sets: 3,
      reps: 10,
      equipment: 'Bodyweight',
      calories: 50,
      description: '',
    });
  };

  const handleSave = () => {
    const totalCalories = editedWorkout.exercises.reduce((sum, ex) => sum + ex.calories, 0);
    onSave({ ...editedWorkout, targetCalories: totalCalories });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-slate-900 dark:text-white">Éditer Jour {editedWorkout.day}</h1>
              <p className="text-slate-600 dark:text-slate-400">
                {editedWorkout.exercises.length} exercices • {editedWorkout.exercises.reduce((sum, ex) => sum + ex.calories, 0)} kcal
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Nouvel Exercice</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="name">Nom de l'exercice</Label>
                      <Input
                        id="name"
                        value={newExercise.name}
                        onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                        placeholder="Push-ups"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sets">Séries</Label>
                      <Input
                        id="sets"
                        type="number"
                        value={newExercise.sets}
                        onChange={(e) => setNewExercise({ ...newExercise, sets: parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reps">Répétitions</Label>
                      <Input
                        id="reps"
                        type="number"
                        value={newExercise.reps}
                        onChange={(e) => setNewExercise({ ...newExercise, reps: parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="equipment">Équipement</Label>
                      <Input
                        id="equipment"
                        value={newExercise.equipment}
                        onChange={(e) => setNewExercise({ ...newExercise, equipment: e.target.value })}
                        placeholder="Bodyweight"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="calories">Calories</Label>
                      <Input
                        id="calories"
                        type="number"
                        value={newExercise.calories}
                        onChange={(e) => setNewExercise({ ...newExercise, calories: parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bpm">BPM (optionnel)</Label>
                      <Input
                        id="bpm"
                        type="number"
                        value={newExercise.bpm || ''}
                        onChange={(e) => setNewExercise({ ...newExercise, bpm: e.target.value ? parseInt(e.target.value) : undefined })}
                        placeholder="120"
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="description">Description (optionnel)</Label>
                      <Input
                        id="description"
                        value={newExercise.description}
                        onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
                        placeholder="Instructions pour l'exercice..."
                      />
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleAddExercise}>
                    Ajouter l'exercice
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Exercices</CardTitle>
          </CardHeader>
          <CardContent>
            {editedWorkout.exercises.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-600 dark:text-slate-400">Aucun exercice</p>
                <Button className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter le premier exercice
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {editedWorkout.exercises.map((exercise, index) => (
                  <Card key={exercise.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Nom</Label>
                              <Input
                                value={exercise.name}
                                onChange={(e) => handleUpdateExercise(exercise.id, 'name', e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-2">
                                <Label>Séries</Label>
                                <Input
                                  type="number"
                                  value={exercise.sets}
                                  onChange={(e) => handleUpdateExercise(exercise.id, 'sets', parseInt(e.target.value))}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Reps</Label>
                                <Input
                                  type="number"
                                  value={exercise.reps}
                                  onChange={(e) => handleUpdateExercise(exercise.id, 'reps', parseInt(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Équipement</Label>
                              <Input
                                value={exercise.equipment}
                                onChange={(e) => handleUpdateExercise(exercise.id, 'equipment', e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-2">
                                <Label>Calories</Label>
                                <Input
                                  type="number"
                                  value={exercise.calories}
                                  onChange={(e) => handleUpdateExercise(exercise.id, 'calories', parseInt(e.target.value))}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>BPM</Label>
                                <Input
                                  type="number"
                                  value={exercise.bpm || ''}
                                  onChange={(e) => handleUpdateExercise(exercise.id, 'bpm', e.target.value ? parseInt(e.target.value) : undefined)}
                                  placeholder="Opt."
                                />
                              </div>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label>Description</Label>
                              <Input
                                value={exercise.description || ''}
                                onChange={(e) => handleUpdateExercise(exercise.id, 'description', e.target.value)}
                                placeholder="Instructions..."
                              />
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteExercise(exercise.id)}
                          className="shrink-0"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
