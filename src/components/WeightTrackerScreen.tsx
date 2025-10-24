import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, TrendingUp, TrendingDown, Minus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { storage } from '../lib/storage';
import { WeightEntry } from '../types';

interface WeightTrackerScreenProps {
  onBack: () => void;
}

export function WeightTrackerScreen({ onBack }: WeightTrackerScreenProps) {
  const [weights, setWeights] = useState<WeightEntry[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [newNotes, setNewNotes] = useState('');

  useEffect(() => {
    loadWeights();
  }, []);

  const loadWeights = () => {
    const data = storage.getWeights();
    setWeights(data);
  };

  const handleAddWeight = () => {
    if (!newWeight) return;

    const entry: WeightEntry = {
      id: Date.now().toString(),
      date: new Date(),
      weight: parseFloat(newWeight),
      notes: newNotes,
    };

    storage.saveWeight(entry);
    loadWeights();
    setIsDialogOpen(false);
    setNewWeight('');
    setNewNotes('');
  };

  const handleDeleteWeight = (id: string) => {
    storage.deleteWeight(id);
    loadWeights();
  };

  const stats = weights.length > 0 ? {
    current: weights[weights.length - 1].weight,
    start: weights[0].weight,
    min: Math.min(...weights.map(w => w.weight)),
    max: Math.max(...weights.map(w => w.weight)),
    change: weights[weights.length - 1].weight - weights[0].weight,
  } : null;

  const chartData = weights.map(w => ({
    date: new Date(w.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
    weight: w.weight,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-slate-900 dark:text-white">Suivi du Poids</h1>
              <p className="text-slate-600 dark:text-slate-400">Suivez votre évolution</p>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nouvelle Mesure</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Poids (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    placeholder="75.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optionnel)</Label>
                  <Textarea
                    id="notes"
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    placeholder="Notes sur votre pesée..."
                  />
                </div>
                <Button className="w-full" onClick={handleAddWeight}>
                  Enregistrer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {stats ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Actuel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-slate-900 dark:text-white">
                    {stats.current} <span className="text-slate-600 dark:text-slate-400">kg</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Départ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-slate-900 dark:text-white">
                    {stats.start} <span className="text-slate-600 dark:text-slate-400">kg</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Min / Max</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-slate-900 dark:text-white">
                    {stats.min} / {stats.max} <span className="text-slate-600 dark:text-slate-400">kg</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Évolution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`flex items-center gap-2 ${stats.change < 0 ? 'text-green-500' : stats.change > 0 ? 'text-orange-500' : 'text-slate-900 dark:text-white'}`}>
                    {stats.change < 0 ? <TrendingDown className="h-5 w-5" /> : stats.change > 0 ? <TrendingUp className="h-5 w-5" /> : <Minus className="h-5 w-5" />}
                    <span>{Math.abs(stats.change).toFixed(1)} kg</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Graphique d'Évolution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                      <XAxis dataKey="date" className="text-slate-600 dark:text-slate-400" />
                      <YAxis
                        domain={['dataMin - 2', 'dataMax + 2']}
                        className="text-slate-600 dark:text-slate-400"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="hsl(217, 91%, 60%)"
                        strokeWidth={2}
                        dot={{ fill: 'hsl(217, 91%, 60%)', r: 4 }}
                        name="Poids (kg)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* History */}
            <Card>
              <CardHeader>
                <CardTitle>Historique</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weights.slice().reverse().map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-start justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                    >
                      <div className="flex-1">
                        <div className="text-slate-900 dark:text-white mb-1">
                          {entry.weight} kg
                        </div>
                        <div className="text-slate-600 dark:text-slate-400">
                          {new Date(entry.date).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </div>
                        {entry.notes && (
                          <p className="text-slate-600 dark:text-slate-400 mt-2">{entry.notes}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteWeight(entry.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto">
                  <TrendingUp className="h-8 w-8 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-white mb-2">Aucune Donnée</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Commencez à suivre votre poids pour voir votre progression
                  </p>
                </div>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter Première Mesure
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
