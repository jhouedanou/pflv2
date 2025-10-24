import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, Flame, Clock, Dumbbell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { storage } from '../lib/storage';
import { WorkoutSession } from '../types';
import { fr } from 'date-fns/locale';

interface CalendarScreenProps {
  onBack: () => void;
}

export function CalendarScreen({ onBack }: CalendarScreenProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [completedDates, setCompletedDates] = useState<Date[]>([]);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = () => {
    const data = storage.getSessions();
    setSessions(data);

    const dates = data.map(s => {
      const d = new Date(s.date);
      d.setHours(0, 0, 0, 0);
      return d;
    });
    setCompletedDates(dates);
  };

  const selectedDaySessions = sessions.filter(s => {
    const sessionDate = new Date(s.date);
    return (
      sessionDate.getDate() === selectedDate.getDate() &&
      sessionDate.getMonth() === selectedDate.getMonth() &&
      sessionDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-slate-900 dark:text-white">Calendrier</h1>
            <p className="text-slate-600 dark:text-slate-400">Historique de vos entraînements</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Vue Calendrier
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                modifiers={{
                  completed: completedDates,
                }}
                modifiersStyles={{
                  completed: {
                    backgroundColor: 'hsl(142, 76%, 36%)',
                    color: 'white',
                    fontWeight: 'bold',
                  },
                }}
                className="rounded-lg border"
              />
              <div className="mt-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-600" />
                  <span className="text-slate-600 dark:text-slate-400">Entraînement complété</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected Day Details */}
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate.toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDaySessions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                    <Dumbbell className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">Aucun entraînement ce jour</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDaySessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-4 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-slate-900 dark:text-white mb-1">
                            Jour {session.day}
                          </div>
                          <div className="text-slate-600 dark:text-slate-400">
                            {new Date(session.date).toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </div>
                        <Badge variant="secondary">{session.mode}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <div>
                            <div className="text-slate-900 dark:text-white">{session.caloriesBurned} kcal</div>
                            <div className="text-slate-600 dark:text-slate-400">Calories</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-green-500" />
                          <div>
                            <div className="text-slate-900 dark:text-white">{session.duration} min</div>
                            <div className="text-slate-600 dark:text-slate-400">Durée</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Dumbbell className="h-4 w-4 text-blue-500" />
                          <div>
                            <div className="text-slate-900 dark:text-white">
                              {session.completedExercises}/{session.totalExercises}
                            </div>
                            <div className="text-slate-600 dark:text-slate-400">Exercices</div>
                          </div>
                        </div>

                        {session.weightLifted && (
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="text-slate-900 dark:text-white">{session.weightLifted} kg</div>
                              <div className="text-slate-600 dark:text-slate-400">Soulevé</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Monthly Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Résumé du Mois</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(() => {
                const thisMonth = sessions.filter(s => {
                  const sessionDate = new Date(s.date);
                  return (
                    sessionDate.getMonth() === selectedDate.getMonth() &&
                    sessionDate.getFullYear() === selectedDate.getFullYear()
                  );
                });

                return (
                  <>
                    <div className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <div className="text-slate-900 dark:text-white mb-1">{thisMonth.length}</div>
                      <div className="text-slate-600 dark:text-slate-400">Sessions</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <div className="text-slate-900 dark:text-white mb-1">
                        {thisMonth.reduce((sum, s) => sum + s.caloriesBurned, 0)}
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">Calories</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <div className="text-slate-900 dark:text-white mb-1">
                        {thisMonth.reduce((sum, s) => sum + s.duration, 0)} min
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">Durée totale</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <div className="text-slate-900 dark:text-white mb-1">
                        {new Set(thisMonth.map(s => s.day)).size}
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">Jours uniques</div>
                    </div>
                  </>
                );
              })()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}