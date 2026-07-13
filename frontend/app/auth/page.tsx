'use client';

import { useState } from 'react';
import SignupSteps from '@/components/SignupSteps';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      if (res.ok) {
        window.location.href = '/dashboard';
      } else {
        alert('Login failed');
      }
    } catch (error) {
      alert('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-[#141619] border border-[rgba(255,255,255,0.08)] rounded-2xl">
      <div className="flex p-1 bg-[#0A0B0D] rounded-xl mb-8">
        <button 
          className={`flex-1 py-3 text-center rounded-lg font-bold transition-all ${mode === 'login' ? 'bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'text-gray-500'}`}
          onClick={() => setMode('login')}
        >
          Login
        </button>
        <button 
          className={`flex-1 py-3 text-center rounded-lg font-bold transition-all ${mode === 'signup' ? 'bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'text-gray-500'}`}
          onClick={() => setMode('signup')}
        >
          Sign Up
        </button>
      </div>

      {mode === 'login' ? (
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input type="email" placeholder="Email" required className="bg-[#0A0B0D] border border-[rgba(255,255,255,0.08)] text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required className="bg-[#0A0B0D] border border-[rgba(255,255,255,0.08)] text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white font-bold rounded-xl p-3 mt-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-shadow" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      ) : (
        <SignupSteps />
      )}
    </div>
  );
}
