'use client';
import { useState, useRef, useEffect } from 'react';

// Icons
const ChatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-white">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="fixed bottom-6 left-6 z-50">
      {/* Launcher Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`w-14 h-14 bg-[#3B82F6] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center hover:scale-105 transition-all duration-200 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <ChatIcon />
      </button>

      {/* Chat Panel */}
      <div className={`w-80 bg-[#141619] border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-2xl flex flex-col h-[400px] transition-all duration-300 ease-in-out origin-bottom-left ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        <div className="p-4 border-b border-[rgba(255,255,255,0.05)] flex justify-between items-center font-bold text-white">
          Fitness Coach AI
          <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-[rgba(255,255,255,0.1)] transition-colors">
            <CloseIcon />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`p-3 rounded-lg text-sm max-w-[80%] ${m.role === 'user' ? 'bg-[#3B82F6] text-white ml-auto' : 'bg-[#141619] border border-[rgba(255,255,255,0.08)] text-gray-300'}`}>
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
    </div>
  );
}
