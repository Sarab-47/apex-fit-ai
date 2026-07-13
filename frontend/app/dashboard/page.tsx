import { authenticatedFetch } from '@/lib/api';
import MealForm from '@/components/MealForm';
import LogoutButton from '@/components/LogoutButton';
import WorkoutSection from '@/components/WorkoutSection';
import ChatWidget from '@/components/ChatWidget';
import ScrollToWorkoutButton from '@/components/ScrollToWorkoutButton';

async function getDashboardData() {
  const today = new Date().toLocaleDateString('en-CA'); 
  
  const [workoutRes, mealsRes, nutritionRes] = await Promise.all([
    authenticatedFetch('/workout-recommendation/'),
    authenticatedFetch(`/meals/?date=${today}`), 
    authenticatedFetch('/nutrition-target/'),
  ]);
  
  const workoutData = workoutRes.ok ? await workoutRes.json() : null;
  const meals = mealsRes.ok ? await mealsRes.json() : [];
  const nutritionData = nutritionRes.ok ? await nutritionRes.json() : null;
  
  return { workoutData, meals, nutritionData };
}

export default async function DashboardPage() {
  const { workoutData, meals, nutritionData } = await getDashboardData();
  const totalCalories = meals.reduce((sum: number, m: any) => sum + m.calories, 0);
  const remainingCalories = nutritionData ? Math.max(nutritionData.target_calories - totalCalories, 0) : 0;
  const caloriePercentage = nutritionData ? Math.min((totalCalories / nutritionData.target_calories) * 100, 100) : 0;

  const focusDay = workoutData?.schedule[workoutData.today_focus_index];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-heading text-4xl">Dashboard</h1>
        <LogoutButton />
      </div>
      
      {workoutData && focusDay && (
        <section className="bg-[#141619] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 flex justify-between items-center">
            <div>
                <h2 className="font-heading text-xl mb-1">Today's Focus</h2>
                <p className="text-white font-bold">{focusDay.day} - {focusDay.exercises.length} exercises</p>
                <ScrollToWorkoutButton targetId="workout-section" />
            </div>
            <div className="text-right">
                <p className="text-gray-400 text-sm">Remaining Calories</p>
                <p className="font-black text-5xl text-white">{remainingCalories}</p>
            </div>
        </section>
      )}

      {workoutData && (
        <div id="workout-section">
            <WorkoutSection 
                schedule={workoutData.schedule} 
                split={workoutData.split} 
                initialDayIndex={workoutData.today_focus_index} 
            />
        </div>
      )}


      {nutritionData && (
        <section className="bg-[#141619] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 space-y-6">
            <h2 className="font-heading text-xl">Daily Calories</h2>
            <div className="flex items-baseline gap-2">
                <span className="font-black text-5xl text-white">{totalCalories}</span>
                <span className="text-gray-400">/ {nutritionData.target_calories} kcal</span>
            </div>
            
            <div className="h-3 w-full bg-[#0A0B0D] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA]" style={{ width: `${caloriePercentage}%` }}></div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                    { label: 'PROTEIN', value: `${nutritionData.protein_g}G` },
                    { label: 'CARBS', value: `${nutritionData.carbs_g}G` },
                    { label: 'FAT', value: `${nutritionData.fat_g}G` },
                ].map(macro => (
                    <div key={macro.label} className="bg-[#1A1D21] p-4 rounded-xl text-center">
                        <p className="font-black text-lg text-white">{macro.value}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{macro.label}</p>
                    </div>
                ))}
            </div>
        </section>
      )}
      
      <MealForm />
      <ChatWidget />
    </div>
  );
}
