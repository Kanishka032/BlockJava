import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Trophy, Star, CheckCircle2, Lock, Flame, 
  Gamepad2, Map, Crown, Rocket, Sparkles
} from "lucide-react";
import MainLayout from "@/components/MainLayout";

type ViewMode = "learn" | "play" | "leaderboard";

const StudentHub: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ViewMode>("learn");
  const student = JSON.parse(localStorage.getItem("student") || "{}");
  const [points] = useState(student.points || 0);
  const [missions, setMissions] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    // 1. Fetch Missions & Leaderboard from your API
    const fetchData = async () => {
      try {
        const resTask = await fetch(`import.meta.env.VITE_API_BASE_URL/api/tasks/progress/${student.id}`);
        const completedData = await resTask.json();
        const completedIds = new Set(completedData.map((t: any) => t.taskId));

        setMissions(Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          status: completedIds.has(i + 1) ? "done" : (i === 0 || completedIds.has(i)) ? "active" : "locked",
        })));

        const resBoard = await fetch(`import.meta.env.VITE_API_BASE_URL/api/students/leaderboard`);
        setLeaderboard(await resBoard.json());
      } catch (e) {
        // Fallback data
        setLeaderboard([{name: "Aman", points: 500}, {name: "Sana", points: 450}]);
      }
    };
    fetchData();
  }, [student.id]);

  return (
    <MainLayout points={points}>
      <div className="min-h-screen bg-[#FDFCF0]">
        
        {/* --- 🧭 SIMPLE NAVBAR --- */}
        <nav className="bg-white border-b-4 border-yellow-400 sticky top-0 z-50 p-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <h1 className="font-black text-2xl text-blue-600 tracking-tighter">CODEKIDS</h1>
            
            <div className="flex bg-slate-100 p-1 rounded-full border-2 border-slate-200">
              {['learn', 'play', 'leaderboard'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as ViewMode)}
                  className={`px-6 py-2 rounded-full font-black text-sm transition-all uppercase
                    ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-blue-600'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-orange-100 px-4 py-1 rounded-full border-2 border-orange-200">
              <Flame size={18} className="text-orange-500" fill="currentColor"/>
              <span className="font-black text-orange-700">{points} XP</span>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto p-8">
          
          {/* --- SECTION: LEARN (Missions) --- */}
          {activeTab === 'learn' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
              {missions.map((m) => (
                <button
                  key={m.id}
                  onClick={() => { localStorage.setItem("active_task_id", m.id); navigate('/create'); }}
                  disabled={m.status === 'locked'}
                  className={`aspect-square rounded-3xl border-b-8 flex items-center justify-center transition-all
                    ${m.status === 'done' ? 'bg-emerald-400 border-emerald-600' : 
                      m.status === 'locked' ? 'bg-slate-200 border-slate-300 opacity-50' : 'bg-blue-500 border-blue-700 animate-bounce'}
                  `}
                >
                  {m.status === 'locked' ? <Lock className="text-slate-400"/> : <span className="text-white font-black text-3xl">{m.id}</span>}
                </button>
              ))}
            </div>
          )}

          {/* --- SECTION: PLAY (Projects) --- */}
          {activeTab === 'play' && (
            <div className="grid md:grid-cols-3 gap-6">
              {[{t: "Cat Race", x: 50, i: "🐱"}, {t: "Maze Runner", x: 100, i: "🌀"}, {t: "Dance Party", x: 75, i: "🕺"}].map((p, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border-4 border-purple-200 shadow-xl">
                  <div className="text-4xl mb-4">{p.i}</div>
                  <h3 className="font-black text-xl mb-2">{p.t}</h3>
                  <div className="bg-yellow-100 text-yellow-700 font-bold px-3 py-1 rounded-full inline-block mb-6">+{p.x} XP</div>
                  <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-black shadow-[0_4px_0_0_#4c1d95] active:translate-y-1 active:shadow-none transition-all">PLAY</button>
                </div>
              ))}
            </div>
          )}

          {/* --- SECTION: LEADERBOARD --- */}
          {activeTab === 'leaderboard' && (
            <div className="max-w-xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border-4 border-blue-50 overflow-hidden">
              <div className="bg-blue-600 p-8 text-center text-white">
                <Crown size={48} className="mx-auto mb-2 text-yellow-400"/>
                <h2 className="text-3xl font-black italic">TOP CODERS</h2>
              </div>
              <div className="p-4">
                {leaderboard.map((u, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-2xl mb-2 ${u.name === student.name ? 'bg-blue-50 border-2 border-blue-200' : 'bg-slate-50'}`}>
                    <div className="flex items-center gap-4">
                      <span className="font-black text-slate-400 w-6">#{i+1}</span>
                      <span className="font-black text-slate-700 uppercase">{u.name}</span>
                    </div>
                    <span className="font-black text-blue-600">{u.points} XP</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </MainLayout>
  );
};

export default StudentHub;