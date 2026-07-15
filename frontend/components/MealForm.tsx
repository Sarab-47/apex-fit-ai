'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function MealForm() {
  const [formData, setFormData] = useState({ name: '', calories: '', protein_g: '', carbs_g: '', fat_g: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Get local YYYY-MM-DD
    const localDate = new Date().toLocaleDateString('en-CA');

    const res = await fetch('/api/meals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        calories: parseInt(formData.calories),
        protein_g: parseFloat(formData.protein_g),
        carbs_g: parseFloat(formData.carbs_g),
        fat_g: parseFloat(formData.fat_g),
        date: localDate,
      }),
    });

    if (res.ok) {
      router.refresh();
      setFormData({ name: '', calories: '', protein_g: '', carbs_g: '', fat_g: '' });
    } else {
      toast.error('Failed to log meal. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 bg-[#141619] border border-[rgba(255,255,255,0.08)] rounded-2xl">
      <h2 className="font-heading text-xl">Log Meal</h2>
      <input type="text" placeholder="Meal Name" value={formData.name} className="bg-[#0A0B0D] border border-[rgba(255,255,255,0.08)] text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
      <input type="number" placeholder="Calories" value={formData.calories} className="bg-[#0A0B0D] border border-[rgba(255,255,255,0.08)] text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setFormData({...formData, calories: e.target.value})} required />
      <input type="number" placeholder="Protein (g)" value={formData.protein_g} className="bg-[#0A0B0D] border border-[rgba(255,255,255,0.08)] text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setFormData({...formData, protein_g: e.target.value})} required />
      <input type="number" placeholder="Carbs (g)" value={formData.carbs_g} className="bg-[#0A0B0D] border border-[rgba(255,255,255,0.08)] text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setFormData({...formData, carbs_g: e.target.value})} required />
      <input type="number" placeholder="Fat (g)" value={formData.fat_g} className="bg-[#0A0B0D] border border-[rgba(255,255,255,0.08)] text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setFormData({...formData, fat_g: e.target.value})} required />
      <button type="submit" className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white font-bold rounded-xl p-3 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-shadow">Log Meal</button>
    </form>
  );
}
