import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Student {
  name: string;
  email?: string;
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const student: Student | null = JSON.parse(localStorage.getItem('student') || 'null');
  const points = parseInt(localStorage.getItem('codekids_points') || '0', 10);

  const handleLogout = () => {
    localStorage.removeItem('student');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b-2 border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center shadow-playful group-hover:scale-110 transition-transform">
              <span className="font-display font-bold text-lg text-primary-foreground">B</span>
            </div>
            <span className="text-xl font-display font-bold text-gradient-hero">BlockJava</span>
          </Link>

          <div className="flex items-center gap-3">
            {points > 0 && (
              <div className="flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-accent fill-accent animate-bounce-slow" />
                <span className="font-bold text-sm">{points} pts</span>
              </div>
            )}

            {student ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                  <span className="text-sm font-bold">Hi, {student.name} 👋</span>
                </div>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={handleLogout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm" className="gap-2">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
