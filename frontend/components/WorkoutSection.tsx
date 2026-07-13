'use client';
import { useState } from 'react';
import WorkoutLogger from './WorkoutLogger';
import { getIcon } from '@/lib/exerciseIcons';

export default function WorkoutSection({ 
  schedule, 
  split, 
  initialDayIndex = 0 
}: { 
  schedule: any[], 
  split: string, 
  initialDayIndex?: number 
}) {
  const [activeDayIndex, setActiveDayIndex] = useState(initialDayIndex);
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);

  if (!schedule || schedule.length === 0) return <p className="text-gray-400">Unable to load workout plan.</p>;

  return (
    <div className="bg-[#141619] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6">
      <h2 className="font-heading text-2xl mb-6">Workout: {split}</h2>
      
      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {schedule.map((day, i) => (
          <button
            key={i}
            onClick={() => setActiveDayIndex(i)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeDayIndex === i 
                ? 'bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                : 'bg-[#1A1D21] text-gray-400 hover:text-white'
            }`}
          >
            {day.day}
          </button>
        ))}
      </div>

      {/* Exercises */}
      <div className="space-y-4">
        {schedule[activeDayIndex].exercises.map((ex: any, j: number) => {
          const IconComponent = getIcon(ex.exercise_name);
          return (
            <div key={j} className="bg-[#1A1D21] p-4 rounded-xl border border-[rgba(255,255,255,0.05)]">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedExercise(expandedExercise === ex.exercise_name ? null : ex.exercise_name)}>
                <div className="flex items-center gap-3">
                  <div className="text-[#3B82F6] w-8 h-8 flex items-center justify-center">
                    <IconComponent />
                  </div>
                  <div>
                    <p className="font-bold text-white">{ex.exercise_name}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{ex.target_muscle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-xl text-white">{ex.sets_reps}</p>
                </div>
              </div>
              {expandedExercise === ex.exercise_name && (
                <WorkoutLogger exercise_name={ex.exercise_name} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
