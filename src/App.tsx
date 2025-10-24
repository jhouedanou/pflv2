import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './components/ui/button';
import { HomeScreen } from './components/HomeScreen';
import { WorkoutScreen } from './components/WorkoutScreen';
import { StatsScreen } from './components/StatsScreen';
import { WeightTrackerScreen } from './components/WeightTrackerScreen';
import { CalendarScreen } from './components/CalendarScreen';
import { EditWorkoutScreen } from './components/EditWorkoutScreen';
import { workoutProgram as initialWorkoutProgram } from './lib/workoutData';
import { storage } from './lib/storage';
import { WorkoutDay } from './types';

type Screen = 'home' | 'workout' | 'stats' | 'weight' | 'calendar' | 'settings' | 'profile' | 'edit-workout';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [screenData, setScreenData] = useState<any>(null);
  const [workoutProgram, setWorkoutProgram] = useState<WorkoutDay[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Load workout program from storage or use default
    const savedProgram = storage.getWorkoutProgram();
    if (savedProgram) {
      setWorkoutProgram(savedProgram);
    } else {
      setWorkoutProgram(initialWorkoutProgram);
      storage.saveWorkoutProgram(initialWorkoutProgram);
    }

    // Load theme
    const savedTheme = storage.getTheme();
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const handleNavigate = (screen: Screen, data?: any) => {
    setCurrentScreen(screen);
    setScreenData(data);
  };

  const handleWorkoutComplete = () => {
    const updatedProgram = workoutProgram.map(w =>
      w.day === screenData.day ? { ...w, completed: true } : w
    );
    setWorkoutProgram(updatedProgram);
    storage.saveWorkoutProgram(updatedProgram);
    setCurrentScreen('home');
  };

  const handleUpdateWorkout = (updatedWorkout: WorkoutDay) => {
    const updatedProgram = workoutProgram.map(w =>
      w.day === updatedWorkout.day ? updatedWorkout : w
    );
    setWorkoutProgram(updatedProgram);
    storage.saveWorkoutProgram(updatedProgram);
    setCurrentScreen('home');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    storage.saveTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className="relative min-h-screen">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full bg-white dark:bg-slate-800 shadow-lg"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>

      {/* Screens */}
      {currentScreen === 'home' && (
        <HomeScreen
          onNavigate={handleNavigate}
          workoutProgram={workoutProgram}
          onUpdateProgram={setWorkoutProgram}
        />
      )}

      {currentScreen === 'workout' && screenData && (
        <WorkoutScreen
          onBack={() => setCurrentScreen('home')}
          day={screenData.day}
          mode={screenData.mode}
          workout={workoutProgram[screenData.day - 1]}
          onComplete={handleWorkoutComplete}
        />
      )}

      {currentScreen === 'stats' && (
        <StatsScreen onBack={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'weight' && (
        <WeightTrackerScreen onBack={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'calendar' && (
        <CalendarScreen onBack={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'edit-workout' && screenData && (
        <EditWorkoutScreen
          onBack={() => setCurrentScreen('home')}
          onSave={handleUpdateWorkout}
          workout={workoutProgram[screenData.day - 1]}
        />
      )}

      {currentScreen === 'settings' && (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
          <div className="max-w-2xl mx-auto">
            <Button variant="outline" className="mb-6" onClick={() => setCurrentScreen('home')}>
              ← Retour
            </Button>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8 text-center">
              <h1 className="text-slate-900 dark:text-white mb-4">Paramètres</h1>
              <p className="text-slate-600 dark:text-slate-400">Fonctionnalités à venir</p>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'profile' && (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
          <div className="max-w-2xl mx-auto">
            <Button variant="outline" className="mb-6" onClick={() => setCurrentScreen('home')}>
              ← Retour
            </Button>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8 text-center">
              <h1 className="text-slate-900 dark:text-white mb-4">Profil</h1>
              <p className="text-slate-600 dark:text-slate-400">Fonctionnalités à venir</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
