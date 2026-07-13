'use client';
import { useState, useEffect } from 'react';

export default function WorkoutLogger({ exercise_name }: { exercise_name: string }) {
  const [recommendation, setRecommendation] = useState<any>(null);
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [difficulty, setDifficulty] = useState('moderate');
  const [setNumber, setSetNumber] = useState(1);
  const [status, setStatus] = useState<'idle' | 'logging' | 'success'>('idle');

  useEffect(() => {
    fetch(`/api/workout-recommendation/adaptive/${encodeURIComponent(exercise_name)}`)
      .then(res => res.json())
      .then(data => setRecommendation(data));
  }, [exercise_name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('logging');
    await fetch('/api/workout-logs/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        exercise_name,
        actual_weight_kg: parseFloat(weight),
        actual_reps: parseInt(reps),
        difficulty_rating: difficulty,
        set_number: setNumber
      })
    });
    setSetNumber(prev => prev + 1);
    setWeight('');
    setReps('');
    setStatus('success');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <div className="bg-[#1A1D21] p-4 rounded-xl border border-[rgba(255,255,255,0.05)] mt-2">
      {recommendation && (
        <div className="mb-4 text-sm text-gray-400 bg-[#0A0B0D] p-3 rounded-lg border border-[rgba(255,255,255,0.05)]">
          <p className="font-bold text-white mb-1">Guidance:</p>
          <p>{recommendation.reasoning}</p>
          {recommendation.recommended_weight_kg && (
            <p className="mt-1 text-[#3B82F6] font-bold">Target: {recommendation.recommended_weight_kg} kg</p>
          )}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <input type="number" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} className="bg-[#0A0B0D] border border-[rgba(255,255,255,0.08)] text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" required />
          <input type="number" placeholder="Reps" value={reps} onChange={e => setReps(e.target.value)} className="bg-[#0A0B0D] border border-[rgba(255,255,255,0.08)] text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" required />
        </div>
        
        <div className="grid grid-cols-4 gap-1">
          {['easy', 'moderate', 'hard', 'failed'].map(d => (
            <button key={d} type="button" onClick={() => setDifficulty(d)} className={`text-[10px] uppercase font-bold py-2 rounded-lg transition-all ${difficulty === d ? 'bg-[#3B82F6] text-white' : 'bg-[#0A0B0D] text-gray-500'}`}>
              {d}
            </button>
          ))}
        </div>
        
        <button type="submit" className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white font-bold rounded-lg p-2 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-shadow">
          {status === 'logging' ? 'Logging...' : status === 'success' ? 'Logged Set ' + setNumber : 'Log Set ' + setNumber}
        </button>
      </form>
    </div>
  );
}
