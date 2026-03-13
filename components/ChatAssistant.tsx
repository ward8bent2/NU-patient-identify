
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getSafetyAdvice } from '../services/geminiService';
import { Send, Bot, User, Loader2, BarChart3 } from 'lucide-react';

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'สวัสดีครับ ผมคือผู้เชี่ยวชาญด้านการวิเคราะห์ข้อมูลและความปลอดภัย (Safety Data Analyst) ผมพร้อมวิเคราะห์ข้อมูลความเสี่ยงและให้คำปรึกษาตามมาตรฐาน SOP SP-BQP-002-205-03 เพื่อเป้าหมาย Zero Error ครับ' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.concat(userMsg).map(m => ({ role: m.role, content: m.content }));
      const response = await getSafetyAdvice(history);
      setMessages(prev => [...prev, { role: 'assistant', content: response || 'ขออภัยครับ ระบบวิเคราะห์ข้อมูลขัดข้อง' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'ไม่สามารถติดต่อเซิร์ฟเวอร์ได้ โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ต' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <header className="bg-slate-900 text-white p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <BarChart3 size={22} />
        </div>
        <div>
          <h3 className="font-bold">Safety Data Analyst AI</h3>
          <p className="text-xs text-slate-400">ระบบวิเคราะห์ข้อมูลความปลอดภัยเชิงลึก</p>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                {msg.role === 'user' ? <User size={16} /> : <BarChart3 size={16} />}
              </div>
              <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-slate-800 text-white rounded-tr-none' : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100'}`}>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100 flex items-center gap-2">
              <Loader2 className="animate-spin text-blue-500" size={16} />
              <span className="text-sm text-slate-400">กำลังประมวลผลข้อมูลเชิงวิเคราะห์...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="ปรึกษาการวิเคราะห์ความเสี่ยง..."
            className="flex-1 bg-white border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 mt-2 text-center">ตัวอย่าง: "วิเคราะห์ความเสี่ยงการให้เลือด", "ผลทางสถิติของการสแกน QR code ช่วยลด Human Error อย่างไร"</p>
      </div>
    </div>
  );
};

export default ChatAssistant;
