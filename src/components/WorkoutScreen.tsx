import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Check, Flame, Clock, Activity, ChevronRight, ChevronLeft, Timer, Award, Volume2, VolumeX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { WorkoutDay, WorkoutMode, WorkoutSession } from '../types';
import { storage } from '../lib/storage';
import { audioManager } from '../lib/audio';

interface WorkoutScreenProps {
  onBack: () => void;
  day: number;
  mode: WorkoutMode;
  workout: WorkoutDay;
  onComplete: () => void;
}

export function WorkoutScreen({ onBack, day, mode, workout, onComplete }: WorkoutScreenProps) {
  const [viewMode, setViewMode] = useState<'overview' | 'step-by-step'>('overview');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(0);
  const [workoutStartTime] = useState(Date.now());
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [totalCalories, setTotalCalories] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Mode Auto states
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [exerciseTimeLeft, setExerciseTimeLeft] = useState(0);
  const [autoExerciseDuration, setAutoExerciseDuration] = useState(0);

  const restDurations = { normal: 15, auto: 20, 'fat-burner': 10 };
  const restDuration = restDurations[mode];

  // Calculate auto exercise duration based on reps (2-3 seconds per rep)
  const calculateExerciseDuration = (reps: number) => {
    return reps * 2.5; // 2.5 seconds per rep
  };

  useEffect(() => {
    if (isResting && restTimeLeft > 0) {
      const timer = setTimeout(() => {
        setRestTimeLeft(restTimeLeft - 1);
        
        // Play sound for last 3 seconds
        if (soundEnabled && restTimeLeft <= 3 && restTimeLeft > 0) {
          audioManager.playCountdownBeep();
        }
        
        // Play final beep when timer ends
        if (soundEnabled && restTimeLeft === 1) {
          setTimeout(() => audioManager.playFinalBeep(), 1000);
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isResting && restTimeLeft === 0) {
      setIsResting(false);
      if (mode === 'auto') {
        handleNextSet();
      }
    }
  }, [isResting, restTimeLeft, mode, soundEnabled]);

  // Auto mode timer for exercises
  useEffect(() => {
    if (isAutoMode && !isAutoPaused && !isResting && exerciseTimeLeft > 0) {
      const timer = setTimeout(() => {
        setExerciseTimeLeft(exerciseTimeLeft - 1);

        // Play sound for last 3 seconds
        if (soundEnabled && exerciseTimeLeft <= 3 && exerciseTimeLeft > 0) {
          audioManager.playCountdownBeep();
        }

        // Play final beep when timer ends
        if (soundEnabled && exerciseTimeLeft === 1) {
          setTimeout(() => audioManager.playFinalBeep(), 1000);
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isAutoMode && !isAutoPaused && !isResting && exerciseTimeLeft === 0 && autoExerciseDuration > 0) {
      // Auto complete set when timer reaches 0
      handleCompleteSet();
    }
  }, [isAutoMode, isAutoPaused, isResting, exerciseTimeLeft, autoExerciseDuration, soundEnabled]);

  // Initialize exercise timer when starting a new exercise in auto mode
  useEffect(() => {
    if (isAutoMode && !isResting) {
      const duration = calculateExerciseDuration(currentExercise.reps);
      setAutoExerciseDuration(duration);
      setExerciseTimeLeft(duration);
    }
  }, [isAutoMode, currentExerciseIndex, currentSet, isResting]);

  const currentExercise = workout.exercises[currentExerciseIndex];
  const progressPercent = (completedExercises.size / workout.exercises.length) * 100;

  const handleCompleteSet = () => {
    if (currentSet < currentExercise.sets) {
      setIsResting(true);
      setRestTimeLeft(restDuration);
    } else {
      const newCompleted = new Set(completedExercises);
      newCompleted.add(currentExercise.id);
      setCompletedExercises(newCompleted);
      setTotalCalories(prev => prev + currentExercise.calories);

      if (currentExerciseIndex < workout.exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSet(1);
      }
    }
  };

  const handleNextSet = () => {
    if (currentSet < currentExercise.sets) {
      setCurrentSet(currentSet + 1);
    }
  };

  const handlePrevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setCurrentSet(1);
      setIsResting(false);
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSet(1);
      setIsResting(false);
    }
  };

  const handleFinishWorkout = () => {
    const duration = Math.floor((Date.now() - workoutStartTime) / 1000 / 60);
    const session: WorkoutSession = {
      id: Date.now().toString(),
      day,
      date: new Date(),
      duration,
      caloriesBurned: totalCalories,
      mode,
      completedExercises: completedExercises.size,
      totalExercises: workout.exercises.length,
    };
    storage.saveSession(session);
    onComplete();
  };

  if (viewMode === 'overview') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="secondary" size="icon" className="rounded-full" onClick={onBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <h1 className="mb-1">Jour {day}</h1>
                <p className="opacity-90">Mode {mode}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <Flame className="h-5 w-5 mb-2 opacity-90" />
                <div className="text-xl">{totalCalories}</div>
                <div className="opacity-75">/ {workout.targetCalories} kcal</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <Activity className="h-5 w-5 mb-2 opacity-90" />
                <div className="text-xl">{completedExercises.size}</div>
                <div className="opacity-75">/ {workout.exercises.length} exercices</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <Clock className="h-5 w-5 mb-2 opacity-90" />
                <div className="text-xl">{restDuration}s</div>
                <div className="opacity-75">repos</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Exercices du Jour</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {workout.exercises.map((exercise, index) => (
                  <div
                    key={exercise.id}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      completedExercises.has(exercise.id)
                        ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-xl shadow-lg ${
                          completedExercises.has(exercise.id)
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                            : 'bg-gradient-to-br from-blue-500 to-purple-600'
                        } text-white`}>
                          {completedExercises.has(exercise.id) ? <Check className="h-5 w-5" /> : index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="text-slate-900 dark:text-white mb-1">{exercise.name}</div>
                          <div className="text-slate-600 dark:text-slate-400 mb-2">
                            {exercise.sets} séries × {exercise.reps} reps
                          </div>
                          {exercise.description && (
                            <p className="text-slate-600 dark:text-slate-400 mt-2 p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                              {exercise.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-2 mt-3">
                            <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-700">
                              {exercise.equipment}
                            </Badge>
                            <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300">
                              <Flame className="h-3 w-3 mr-1" />
                              {exercise.calories} kcal
                            </Badge>
                            {exercise.bpm && (
                              <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                                <Activity className="h-3 w-3 mr-1" />
                                {exercise.bpm} BPM
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="sticky bottom-6 flex justify-center gap-4 px-4">
            <Button
              size="lg"
              className="gap-3 text-lg px-8 py-6 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
              onClick={() => setViewMode('step-by-step')}
            >
              <Play className="h-6 w-6 fill-current" />
              Mode Guidé
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="gap-3 text-lg px-8 py-6 rounded-full shadow-2xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 border-0 text-white"
              onClick={() => {
                setIsAutoMode(true);
                setViewMode('step-by-step');
                const duration = calculateExerciseDuration(workout.exercises[0].reps);
                setAutoExerciseDuration(duration);
                setExerciseTimeLeft(duration);
              }}
            >
              <Timer className="h-6 w-6" />
              Mode Auto
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Progress Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setViewMode('overview')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-slate-600 dark:text-slate-400">
                Exercice {currentExerciseIndex + 1} / {workout.exercises.length}
              </span>
            </div>
            <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300">
              {totalCalories} kcal
            </Badge>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {isResting ? (
          <Card className="border-0 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white text-center relative">
              {/* Sound Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </Button>
              
              <Timer className="h-16 w-16 mx-auto mb-4 opacity-90" />
              <div className="mb-2 opacity-90">Temps de repos</div>
              <div className={`text-6xl mb-4 transition-all ${restTimeLeft <= 3 ? 'scale-110 animate-pulse' : ''}`}>
                {restTimeLeft}s
              </div>
              <div className="w-full max-w-xs mx-auto bg-white/20 rounded-full h-2 mb-4">
                <div
                  className="bg-white h-2 rounded-full transition-all"
                  style={{ width: `${((restDuration - restTimeLeft) / restDuration) * 100}%` }}
                />
              </div>
              <p className="opacity-90">Prochain: Série {currentSet + 1}</p>
            </div>
          </Card>
        ) : (
          <>
            <Card className="border-0 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h2>{currentExercise.name}</h2>
                  <Badge className="bg-white/20 border-white/30 text-white">
                    Série {currentSet} / {currentExercise.sets}
                  </Badge>
                </div>
              </div>
              <CardContent className="pt-8 pb-8">
                {/* Auto Mode Timer */}
                {isAutoMode && (
                  <div className="mb-6 p-6 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 border-2 border-red-200 dark:border-red-800">
                    <div className="text-center">
                      <div className="text-slate-600 dark:text-slate-400 mb-2 flex items-center justify-center gap-2">
                        <Timer className="h-5 w-5" />
                        Temps restant
                      </div>
                      <div className={`text-6xl font-bold mb-3 transition-all ${exerciseTimeLeft <= 3 ? 'scale-110 animate-pulse text-red-600' : 'text-slate-900 dark:text-white'}`}>
                        {Math.ceil(exerciseTimeLeft)}s
                      </div>
                      <div className="w-full max-w-xs mx-auto bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-4">
                        <div
                          className="bg-gradient-to-r from-red-600 to-orange-600 h-3 rounded-full transition-all"
                          style={{ width: `${((autoExerciseDuration - exerciseTimeLeft) / autoExerciseDuration) * 100}%` }}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsAutoPaused(!isAutoPaused)}
                        className="mr-2"
                      >
                        {isAutoPaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
                        {isAutoPaused ? 'Reprendre' : 'Pause'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsAutoMode(false);
                          setIsAutoPaused(false);
                          setExerciseTimeLeft(0);
                        }}
                      >
                        Quitter Auto
                      </Button>
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-4">
                    <div>
                      <div className="text-5xl">{currentExercise.reps}</div>
                      <div className="opacity-90">reps</div>
                    </div>
                  </div>
                  {currentExercise.bpm && (
                    <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-lg py-2 px-4">
                      <Activity className="h-5 w-5 mr-2" />
                      Rythme: {currentExercise.bpm} BPM
                    </Badge>
                  )}
                </div>

                {currentExercise.description && (
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 mb-6">
                    <p className="text-slate-700 dark:text-slate-300 text-center">
                      {currentExercise.description}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <Badge variant="secondary" className="text-lg py-2 px-4">
                    {currentExercise.equipment}
                  </Badge>
                  <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 text-lg py-2 px-4">
                    <Flame className="h-4 w-4 mr-2" />
                    {currentExercise.calories} kcal
                  </Badge>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full"
                    onClick={handlePrevExercise}
                    disabled={currentExerciseIndex === 0}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    className="flex-1 rounded-full text-lg py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
                    onClick={handleCompleteSet}
                  >
                    {currentSet === currentExercise.sets ? (
                      <>
                        <Check className="h-5 w-5 mr-2" />
                        Terminer Exercice
                      </>
                    ) : (
                      'Série Terminée'
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full"
                    onClick={handleNextExercise}
                    disabled={currentExerciseIndex === workout.exercises.length - 1}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {completedExercises.size === workout.exercises.length && (
          <Card className="border-0 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-12 text-white text-center">
              <Award className="h-24 w-24 mx-auto mb-6" />
              <h2 className="mb-4">Bravo ! 🎉</h2>
              <p className="text-xl opacity-90 mb-8">
                Vous avez terminé tous les exercices !
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full text-lg px-12 py-6"
                onClick={handleFinishWorkout}
              >
                Terminer l'Entraînement
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}