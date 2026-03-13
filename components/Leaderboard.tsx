
import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Star, Users, ArrowLeft, RefreshCw } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { fetchLeaderboard } from '../services/sheetService';

interface LeaderboardProps {
  onBack: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onBack }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchLeaderboard();
    // Sort by points descending
    const sortedData = [...data].sort((a, b) => b.points - a.points);
    setEntries(sortedData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold"
        >
          <ArrowLeft size={20} />
          กลับหน้าหลัก
        </button>
        <button 
          onClick={loadData}
          className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
          title="Refresh"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 text-amber-600 rounded-[2rem] mb-4 shadow-lg shadow-amber-200/50">
          <Trophy size={40} />
        </div>
        <h2 className="text-4xl font-black text-slate-800 tracking-tight">Leaderboard</h2>
        <p className="text-slate-500 font-medium">ทำเนียบผู้พิทักษ์ความปลอดภัยผู้ป่วย (Safety Champions)</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-400 font-bold animate-pulse">กำลังโหลดข้อมูลอันดับ...</p>
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-indigo-900/5 border border-slate-50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Rank</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Champion</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Unit</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {entries.map((entry, index) => (
                  <tr key={index} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl font-black text-lg">
                        {index === 0 ? (
                          <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center shadow-sm">
                            1
                          </div>
                        ) : index === 1 ? (
                          <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center shadow-sm">
                            2
                          </div>
                        ) : index === 2 ? (
                          <div className="w-10 h-10 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center shadow-sm">
                            3
                          </div>
                        ) : (
                          <span className="text-slate-300">{index + 1}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                          <Users size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{entry.name}</p>
                          <div className="flex items-center gap-1">
                            <Star size={10} className="text-amber-400 fill-amber-400" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Level {Math.floor(entry.points / 1000) + 1}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                        {entry.unit}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-indigo-600">{entry.points.toLocaleString()}</span>
                        <span className="text-[10px] font-bold text-slate-300 uppercase">pts</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {entries.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-slate-400 font-medium">ยังไม่มีข้อมูลอันดับในขณะนี้</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Top Score</p>
            <p className="text-xl font-black text-slate-800">{entries[0]?.points.toLocaleString() || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Participants</p>
            <p className="text-xl font-black text-slate-800">{entries.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Medal size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg Compliance</p>
            <p className="text-xl font-black text-slate-800">
              {entries.length > 0 
                ? Math.round(entries.reduce((acc, curr) => acc + curr.score, 0) / entries.length / 12 * 100)
                : 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
