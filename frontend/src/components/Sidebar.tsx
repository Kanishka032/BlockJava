import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Code2, BookOpen, Trophy, Star, LayoutDashboard } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: Code2, label: 'Create', path: '/create' },
  { icon: BookOpen, label: 'Learn', path: '/learn' },
  { icon: Trophy, label: 'Leaderboard', path: '/play' },
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
];

const Sidebar: React.FC = () => {
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    const fetchPoints = () => {
      const studentData = JSON.parse(localStorage.getItem("student") || "{}");
      if (studentData && studentData.points !== undefined) {
        setPoints(studentData.points);
      }
    };

    fetchPoints();
    window.addEventListener('storage', fetchPoints);
    return () => window.removeEventListener('storage', fetchPoints);
  }, []);

  return (
    <aside className="w-20 lg:w-72 h-screen sticky top-0 bg-white flex flex-col transition-all duration-300 border-r-2 border-slate-200 shadow-lg">
      
      {/* Logo & Branding */}
      <div className="flex-none">
        <div className="p-4 lg:p-6 flex items-center justify-center lg:justify-start gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <div className="hidden lg:block">
            <span className="text-2xl font-black text-slate-900 block leading-none">
              BlockJava
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Studio</span>
          </div>
        </div>

        {/* XP Badge */}
        <div className="px-4 lg:px-6 mb-6">
          <div className="flex items-center justify-center lg:justify-start gap-3 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl py-3 px-4 shadow-md hover:shadow-lg transition-all group">
            <div className="bg-gradient-to-br from-yellow-400 to-amber-500 p-2 rounded-xl shadow-md group-hover:scale-110 transition-transform">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div className="hidden lg:block">
              <p className="text-xs font-black text-amber-700 uppercase tracking-wider">Your XP</p>
              <p className="text-2xl font-black text-slate-900">{points}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 lg:px-4 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-center lg:justify-start gap-4 rounded-2xl p-4 transition-all duration-300 group relative overflow-hidden ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-xl scale-105' 
                  : 'text-slate-700 hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-200 hover:shadow-md font-semibold'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                )}
                
                <div className={`relative z-10 ${isActive ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-white'} p-2.5 rounded-xl transition-all group-hover:scale-110 shadow-sm`}>
                  <item.icon className="w-6 h-6 flex-shrink-0" />
                </div>
                <span className="hidden lg:inline tracking-tight text-base relative z-10">{item.label}</span>
                
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg"></div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;