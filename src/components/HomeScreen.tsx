import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Settings, User, Play, Dumbbell, Flame, Clock, Award, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { WorkoutDay, WorkoutMode } from '../types';
import { storage } from '../lib/storage';

interface HomeScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  workoutProgram: WorkoutDay[];
  onUpdateProgram: (program: WorkoutDay[]) => void;
}

export function HomeScreen({ onNavigate, workoutProgram, onUpdateProgram }: HomeScreenProps) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedMode, setSelectedMode] = useState<WorkoutMode>('normal');
  const [stats, setStats] = useState({ calories: 0, weeklyWorkouts: 0 });

  useEffect(() => {
    const sessions = storage.getSessions();
    const thisWeek = sessions.filter(s => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return s.date >= weekAgo;
    });
    setStats({
      calories: thisWeek.reduce((sum, s) => sum + s.caloriesBurned, 0),
      weeklyWorkouts: thisWeek.length,
    });
  }, []);

  // Safety check: ensure workoutProgram is valid
  if (!workoutProgram || workoutProgram.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">Chargement du programme...</p>
        </div>
      </div>
    );
  }

  const currentWorkout = workoutProgram[selectedDay - 1];
  const completedDays = workoutProgram.filter(d => d.completed).length;

  const modes = [
    { id: 'normal' as WorkoutMode, name: 'Normal', rest: '15s', icon: Dumbbell, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400' },
    { id: 'auto' as WorkoutMode, name: 'Auto', rest: '20s', icon: Zap, color: 'from-green-500 to-emerald-600', bg: 'bg-green-500/10', text: 'text-green-600 dark:text-green-400' },
    { id: 'fat-burner' as WorkoutMode, name: 'Fat Burner', rest: '10s', icon: Flame, color: 'from-orange-500 to-red-600', bg: 'bg-orange-500/10', text: 'text-orange-600 dark:text-orange-400' },
  ];

  const motivationalMessages = [
    "Tu es plus fort que tu ne le penses !",
    "Chaque jour est une victoire !",
    "La constance bat le talent !",
    "Ton futur toi te remerciera !",
    "La douleur d'aujourd'hui est la force de demain !",
  ];

  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-6 w-6" />
                <span className="opacity-90">Project Fat Loss</span>
              </div>
              <h1 className="mb-2">Bonjour Champion ! 👋</h1>
              <p className="opacity-90">{randomMessage}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="icon" className="rounded-full" onClick={() => onNavigate('calendar')}>
                <Calendar className="h-5 w-5" />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full" onClick={() => onNavigate('stats')}>
                <TrendingUp className="h-5 w-5" />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full" onClick={() => onNavigate('settings')}>
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Stats Cards in Hero */}
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2 opacity-90">
                <Target className="h-4 w-4" />
                <span>Progression</span>
              </div>
              <div className="mb-2">
                <span className="text-2xl md:text-3xl">{completedDays}</span>
                <span className="opacity-75">/14</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1.5">
                <div
                  className="bg-white h-1.5 rounded-full transition-all"
                  style={{ width: `${(completedDays / 14) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2 opacity-90">
                <Flame className="h-4 w-4" />
                <span>Calories</span>
              </div>
              <div className="text-2xl md:text-3xl">{stats.calories}</div>
              <div className="opacity-75">kcal brûlées</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2 opacity-90">
                <Dumbbell className="h-4 w-4" />
                <span>Sessions</span>
              </div>
              <div className="text-2xl md:text-3xl">{stats.weeklyWorkouts}</div>
              <div className="opacity-75">cette semaine</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-8 space-y-6">
        {/* Day Selector */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Programme 14 Jours</CardTitle>
            <CardDescription>Sélectionnez votre entraînement du jour</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {workoutProgram.map((workout) => (
                <button
                  key={workout.day}
                  onClick={() => setSelectedDay(workout.day)}
                  className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center transition-all hover:scale-105 ${
                    selectedDay === workout.day
                      ? 'border-blue-500 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                      : workout.completed
                      ? 'border-green-500 bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <span className={selectedDay === workout.day || workout.completed ? '' : 'text-slate-900 dark:text-white'}>
                    {workout.day}
                  </span>
                  {workout.completed && selectedDay !== workout.day && (
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1" />
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Workout Mode Selector */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Mode d'Entraînement</CardTitle>
            <CardDescription>Choisissez l'intensité de votre session</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {modes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    className={`relative overflow-hidden p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                      selectedMode === mode.id
                        ? 'border-transparent shadow-xl scale-105'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {selectedMode === mode.id && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-10`} />
                    )}
                    <div className="relative">
                      <div className={`inline-flex p-3 rounded-xl mb-3 ${selectedMode === mode.id ? `bg-gradient-to-br ${mode.color}` : mode.bg}`}>
                        <Icon className={`h-6 w-6 ${selectedMode === mode.id ? 'text-white' : mode.text}`} />
                      </div>
                      <div className="text-left">
                        <div className="text-slate-900 dark:text-white mb-1">{mode.name}</div>
                        <div className="text-slate-600 dark:text-slate-400">Repos: {mode.rest}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Workout Preview */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-3">
                  Jour {selectedDay}
                  <Badge variant="secondary" className="text-sm">
                    {currentWorkout.exercises.length} exercices
                  </Badge>
                </CardTitle>
                <CardDescription className="flex items-center gap-2 mt-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  {currentWorkout.targetCalories} kcal
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => onNavigate('edit-workout', { day: selectedDay })}>
                Personnaliser
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentWorkout.exercises.map((exercise, index) => (
                <div
                  key={exercise.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-slate-900 dark:text-white mb-1">{exercise.name}</div>
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                      <span>{exercise.sets} × {exercise.reps}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-400" />
                      <span>{exercise.equipment}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border-0">
                    <Flame className="h-3 w-3 mr-1" />
                    {exercise.calories}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Start Workout Button */}
        <div className="sticky bottom-6 flex justify-center">
          <Button
            size="lg"
            className="gap-3 text-lg px-12 py-6 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
            onClick={() => onNavigate('workout', { day: selectedDay, mode: selectedMode })}
          >
            <Play className="h-6 w-6 fill-current" />
            Démarrer l'Entraînement
          </Button>
        </div>
      </div>
    </div>
  );
}