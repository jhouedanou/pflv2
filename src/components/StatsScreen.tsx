import { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, Flame, Clock, Calendar as CalendarIcon, Award, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { storage } from '../lib/storage';
import { UserStats } from '../types';

interface StatsScreenProps {
  onBack: () => void;
}

export function StatsScreen({ onBack }: StatsScreenProps) {
  const [stats, setStats] = useState<UserStats>({
    totalSessions: 0,
    totalCalories: 0,
    totalDuration: 0,
    daysCompleted: 0,
    weeklyActivity: [],
  });
  const [recentSessions, setRecentSessions] = useState<any[]>([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const sessions = storage.getSessions();

    // Calculate weekly activity
    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const weeklyData = Array(7).fill(0).map((_, i) => ({
      day: dayNames[i],
      sessions: 0,
      calories: 0,
    }));

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    sessions.forEach(session => {
      if (session.date >= oneWeekAgo) {
        const dayIndex = session.date.getDay();
        weeklyData[dayIndex].sessions += 1;
        weeklyData[dayIndex].calories += session.caloriesBurned;
      }
    });

    // Get unique days completed
    const uniqueDays = new Set(sessions.map(s => s.day));

    setStats({
      totalSessions: sessions.length,
      totalCalories: sessions.reduce((sum, s) => sum + s.caloriesBurned, 0),
      totalDuration: sessions.reduce((sum, s) => sum + s.duration, 0),
      daysCompleted: uniqueDays.size,
      weeklyActivity: weeklyData,
    });

    setRecentSessions(sessions.slice(-10).reverse());
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="secondary" size="icon" className="rounded-full" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="h-6 w-6" />
                <span className="opacity-90">Statistiques</span>
              </div>
              <h1>Vos Performances</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 opacity-10 rounded-full -mr-10 -mt-10" />
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <TrendingUp className="h-5 w-5" />
                Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-slate-900 dark:text-white mb-1">
                {stats.totalSessions}
              </div>
              <p className="text-slate-600 dark:text-slate-400">Complétées</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 opacity-10 rounded-full -mr-10 -mt-10" />
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <Flame className="h-5 w-5" />
                Calories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-slate-900 dark:text-white mb-1">
                {stats.totalCalories.toLocaleString()}
              </div>
              <p className="text-slate-600 dark:text-slate-400">kcal brûlées</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 opacity-10 rounded-full -mr-10 -mt-10" />
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <Clock className="h-5 w-5" />
                Durée
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-slate-900 dark:text-white mb-1">
                {Math.floor(stats.totalDuration / 60)}h {stats.totalDuration % 60}m
              </div>
              <p className="text-slate-600 dark:text-slate-400">Temps total</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 opacity-10 rounded-full -mr-10 -mt-10" />
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <CalendarIcon className="h-5 w-5" />
                Jours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-slate-900 dark:text-white mb-1">
                {stats.daysCompleted} / 14
              </div>
              <p className="text-slate-600 dark:text-slate-400">Complétés</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Activity Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Activité Hebdomadaire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.weeklyActivity}>
                  <defs>
                    <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={1}/>
                    </linearGradient>
                    <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#dc2626" stopOpacity={1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                  <XAxis dataKey="day" className="text-slate-600 dark:text-slate-400" />
                  <YAxis className="text-slate-600 dark:text-slate-400" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Bar dataKey="sessions" fill="url(#colorSessions)" name="Sessions" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="calories" fill="url(#colorCalories)" name="Calories" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Historique Récent
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentSessions.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-4">
                  <Award className="h-10 w-10" />
                </div>
                <h3 className="text-slate-900 dark:text-white mb-2">Aucune session</h3>
                <p className="text-slate-600 dark:text-slate-400">Commencez votre premier entraînement !</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentSessions.map((session, index) => (
                  <div
                    key={session.id}
                    className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                          {session.day}
                        </div>
                        <div>
                          <div className="text-slate-900 dark:text-white mb-1">Jour {session.day}</div>
                          <div className="text-slate-600 dark:text-slate-400">
                            {new Date(session.date).toLocaleDateString('fr-FR', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                            })}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                        {session.mode}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950">
                          <Flame className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                          <div className="text-slate-900 dark:text-white">{session.caloriesBurned}</div>
                          <div className="text-slate-600 dark:text-slate-400">kcal</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 dark:bg-green-950">
                          <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <div className="text-slate-900 dark:text-white">{session.duration}</div>
                          <div className="text-slate-600 dark:text-slate-400">min</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950">
                          <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <div className="text-slate-900 dark:text-white">
                            {session.completedExercises}/{session.totalExercises}
                          </div>
                          <div className="text-slate-600 dark:text-slate-400">exos</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}