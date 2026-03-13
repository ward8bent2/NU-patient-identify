
import React, { useState } from 'react';
import Layout from './components/Layout';
import Education from './components/Education';
import Assessment from './components/Assessment';
import ChatAssistant from './components/ChatAssistant';
import Leaderboard from './components/Leaderboard';
import { AppView } from './types';
import { ArrowRight, Star, AlertTriangle, ShieldCheck, CheckSquare, BarChart3, Trophy } from 'lucide-react';

const HomeView: React.FC<{ setView: (v: AppView) => void }> = ({ setView }) => {
  return (
    <div className="space-y-12 animate-fadeIn">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-700 to-slate-900 text-white rounded-[2rem] p-8 md:p-12 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-medium mb-6">
            SOP: SP-BQP-002-205-03
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
            Identify ดี <br className="hidden md:block" /> ไม่มีผิดพลาด
          </h1>
          <p className="text-indigo-50 text-lg mb-8 opacity-90 leading-relaxed">
            แพลตฟอร์มวิเคราะห์และพัฒนาทักษะการระบุตัวตนผู้ป่วย <br />
            งานการพยาบาลศัลยกรรม โรงพยาบาลมหาวิทยาลัยนเรศวร
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setView(AppView.EDUCATION)}
              className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-50 transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-95"
            >
              เรียนรู้มาตรฐาน <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => setView(AppView.ASSESSMENT)}
              className="px-8 py-4 bg-indigo-500/30 text-white border border-white/30 backdrop-blur-sm rounded-2xl font-bold hover:bg-white/10 transition-all active:scale-95"
            >
              ประเมินพฤติกรรม (Compliance)
            </button>
            <button 
              onClick={() => setView(AppView.LEADERBOARD)}
              className="px-8 py-4 bg-amber-500/20 text-white border border-amber-400/30 backdrop-blur-sm rounded-2xl font-bold hover:bg-amber-400/20 transition-all flex items-center gap-2 active:scale-95"
            >
              <Trophy size={20} className="text-amber-400" /> Leaderboard
            </button>
          </div>
        </div>
        {/* Abstract shapes */}
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[10%] w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all group">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BarChart3 size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Data-Driven Safety</h3>
          <p className="text-slate-500 text-sm leading-relaxed">วิเคราะห์ความเสี่ยงและพฤติกรรมผ่านเกณฑ์ Compliance Checklist ที่เป็นมาตรฐานสากล</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all group">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Zero Identify Error</h3>
          <p className="text-slate-500 text-sm leading-relaxed">มุ่งเน้นการป้องกัน Human Error ในขั้นตอนการให้ยา เจาะเลือด และการให้เลือด</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-violet-100 transition-all group">
          <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Star size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">100% Accuracy</h3>
          <p className="text-slate-500 text-sm leading-relaxed">ประเมินและทบทวนอย่างต่อเนื่องเพื่อให้มั่นใจว่าบุคลากรทุกคนปฏิบัติได้ถูกต้อง 100%</p>
        </div>
      </section>

      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center gap-10 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px]"></div>
        <div className="flex-1 space-y-4 relative z-10">
          <h2 className="text-3xl font-bold">ต้องการวิเคราะห์กรณีศึกษา?</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            ปรึกษา Safety Data Analyst AI ของเราเพื่อวิเคราะห์ความเสี่ยงในสถานการณ์ที่ซับซ้อน หรือทบทวนขั้นตอน SOP ที่ไม่ชัดเจน
          </p>
          <button 
            onClick={() => setView(AppView.CHAT)}
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            เริ่มการวิเคราะห์เชิงลึก <ArrowRight size={20} />
          </button>
        </div>
        <div className="hidden md:block w-48 h-48 bg-slate-800 rounded-full flex items-center justify-center relative shadow-inner border border-slate-700">
           <div className="absolute inset-0 bg-indigo-500/10 rounded-full animate-pulse"></div>
           <BarChart3 size={64} className="text-indigo-500 relative z-10" />
        </div>
      </div>

      <footer className="text-center text-slate-400 text-sm py-8 border-t border-slate-100">
        <p>© 2024-2026 งานการพยาบาลศัลยกรรม โรงพยาบาลมหาวิทยาลัยนเรศวร</p>
        <p className="mt-2 text-[10px] font-medium uppercase tracking-widest text-slate-300">Identify ดี ไม่มีผิดพลาด • Safety First</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return <HomeView setView={setCurrentView} />;
      case AppView.EDUCATION:
        return <Education />;
      case AppView.ASSESSMENT:
        return <Assessment />;
      case AppView.CHAT:
        return <ChatAssistant />;
      case AppView.LEADERBOARD:
        return <Leaderboard onBack={() => setCurrentView(AppView.HOME)} />;
      default:
        return <HomeView setView={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
      `}</style>
      {renderView()}
    </Layout>
  );
};

export default App;
