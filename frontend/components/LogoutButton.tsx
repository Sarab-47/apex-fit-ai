'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/auth');
  };

  return (
    <button onClick={handleLogout} className="border border-[rgba(255,255,255,0.08)] text-gray-400 hover:text-white hover:border-gray-600 px-4 py-2 rounded-lg transition-colors">
      Logout
    </button>
  );
}
