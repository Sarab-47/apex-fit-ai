'use client';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProgressChart({ exercise_name }: { exercise_name: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/workout-logs/progress/${encodeURIComponent(exercise_name)}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Failed to fetch progress', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [exercise_name]);

  if (loading) return <div className="text-gray-500 p-4">Loading...</div>;
  if (data.length === 0) return <p className="text-gray-400 p-4 text-sm">Log a few sessions to see your progress here.</p>;

  return (
    <div className="h-64 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
          <YAxis stroke="#9CA3AF" fontSize={12} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1A1D21', border: 'none' }}
            itemStyle={{ color: '#fff' }}
          />
          <Line 
            type="monotone" 
            dataKey="max_weight_kg" 
            stroke="#3B82F6" 
            strokeWidth={2} 
            dot={{ fill: '#3B82F6' }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
