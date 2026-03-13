
import React from 'react';
import { AppView } from '../types';
import { Home, BookOpen, ClipboardCheck, MessageCircle, User, BarChart3, Trophy } from 'lucide-react';

interface LayoutProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, setView, children }) => {
  const navItems = [
    { id: AppView.HOME, label: 'หน้าแรก', icon: Home },
    { id: AppView.EDUCATION, label: 'ความรู้ (SOP)', icon: BookOpen },
    { id: AppView.ASSESSMENT, label: 'ประเมินพฤติกรรม', icon: ClipboardCheck },
    { id: AppView.CHAT, label: 'วิเคราะห์ AI', icon: MessageCircle },
    { id: AppView.LEADERBOARD, label: 'อันดับ (Leaderboard)', icon: Trophy },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#fcfdff]">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-900 text-white p-8 shadow-2xl relative z-20 overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        <div className="flex items-center gap-4 mb-12 relative z-10">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-indigo-500/20">
            <BarChart3 size={24} />
          </div>
          <div>
            <h1 className="font-extrabold text-xl leading-tight tracking-tight">Safety Data</h1>
            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest opacity-80">NUH Surgical Nursing</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-3 relative z-10">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                  currentView === item.id 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 translate-x-1' 
                  : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Icon size={20} className={currentView === item.id ? 'animate-pulse' : ''} />
                <span className="font-semibold text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-800 relative z-10">
          <div className="flex items-center gap-4 p-2">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
              <User size={20} className="text-slate-500" />
            </div>
            <div className="text-sm">
              <p className="font-bold">Medical Staff</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Online</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-12 pb-24 md:pb-12 relative">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around p-4 z-50 rounded-t-[2rem] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center gap-1.5 transition-all ${
                currentView === item.id ? 'text-indigo-600' : 'text-slate-400'
              }`}
            >
              <div className={`p-2 rounded-xl ${currentView === item.id ? 'bg-indigo-50' : ''}`}>
                <Icon size={20} />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
