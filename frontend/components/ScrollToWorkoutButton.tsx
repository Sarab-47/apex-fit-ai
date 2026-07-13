'use client';

export default function ScrollToWorkoutButton({ targetId }: { targetId: string }) {
  const scrollToWorkout = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button 
      onClick={scrollToWorkout} 
      className="mt-4 text-[#3B82F6] font-bold text-sm hover:underline"
    >
      Start Workout →
    </button>
  );
}