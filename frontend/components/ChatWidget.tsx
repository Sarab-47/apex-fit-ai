'use client';
import { useState, useRef, useEffect } from 'react';

export default function ChatWidget() {
  const [messages, setMessages] = useState<{role: 'user'|'assistant', content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = { role: 'user' as const, content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: messages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (e) {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-[#141619] border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-2xl flex flex-col h-[400px]">
      <div className="p-4 border-b border-[rgba(255,255,255,0.05)] font-bold text-white">Fitness Coach AI</div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`p-3 rounded-lg text-sm max-w-[80%] ${m.role === 'user' ? 'bg-[#3B82F6] text-white ml-auto' : 'bg-[#1A1D21] text-gray-300'}`}>
            {m.content}
          </div>
        ))}
        {isLoading && <div className="text-xs text-gray-500 italic">Coach is typing...</div>}
      </div>

      <div className="p-3 border-t border-[rgba(255,255,255,0.05)] flex gap-2">
        <input 
          className="flex-1 bg-[#0A0B0D] text-white p-2 rounded-lg text-sm outline-none disabled:opacity-50" 
          value={input} 
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask a question..."
          disabled={isLoading}
        />
        <button onClick={sendMessage} className="bg-[#3B82F6] text-white px-4 rounded-lg text-sm font-bold disabled:opacity-50" disabled={isLoading}>Send</button>
      </div>
    </div>
  );
}