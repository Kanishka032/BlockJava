import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Code2, Rocket, Sparkles, Terminal, Cpu, Play, Layers, LogOut, User, ShieldCheck, ArrowRight, Star, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/MainLayout";
import heroImage from "@/assets/hero-kids-coding.png";
import HowItWorksButton from "./HowItWorksButton";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("student") || "null");
    setStudent(saved);
    if (!saved) setShowLoginModal(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("student");
    setStudent(null);
    setShowLoginModal(true);
  };

  const features = [
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Visual Logic",
      description: "Drag and drop blocks to build complex logic without syntax errors.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      border: "border-purple-200",
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      title: "Real Code",
      description: "See your blocks transform into professional Java-style code instantly.",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Instant Run",
      description: "Run your programs in real-time and see your ideas come to life.",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      border: "border-orange-200",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Creative Canvas",
      description: "Build apps and animations on a professional-grade canvas.",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      border: "border-pink-200",
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 font-sans overflow-x-hidden relative">
        
        {/* Background Orbs - Purple/Pink/Blue */}
        <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/40 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-400/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-400/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* LOGIN MODAL */}
        {showLoginModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => {}} />
            
            <div className="relative bg-white border-4 border-purple-200 p-10 rounded-3xl shadow-2xl w-full max-w-md text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-white">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-4xl font-black text-slate-900 mb-4">Welcome to BlockJava!</h2>
              <p className="text-xl text-slate-700 mb-8 leading-relaxed font-semibold">
                Login to save your projects and earn cool stars! ⭐
              </p>

              <div className="space-y-4">
                <Button 
                  onClick={() => navigate("/login")}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-8 rounded-2xl font-bold text-xl shadow-2xl transition-all hover:scale-105"
                >
                  🚀 Sign In
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate("/signup")}
                  className="w-full py-8 rounded-2xl font-bold text-lg border-2 border-purple-300 text-purple-800 hover:bg-purple-50"
                >
                  ✨ Create Account
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* HEADER */}
        <header className="sticky top-0 z-40 px-6 py-5">
          <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-xl border-2 border-purple-200 rounded-3xl px-8 py-4 flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-3 group cursor-pointer hover:scale-105 transition-all" onClick={() => navigate("/home")}>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-2xl shadow-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="font-black text-2xl text-slate-900">BlockJava</span>
            </div>

            {student && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 px-5 py-3 rounded-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-lg text-white">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">{student.name}</p>
                    <p className="text-sm text-purple-600 font-bold">⭐ Level {Math.floor(student.points / 100) || 1}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout} 
                  className="bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-xl p-2"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="relative pt-20 pb-24">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 px-6 py-3 rounded-2xl">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-600"></span>
                </span>
                <span className="text-lg font-bold text-purple-800 uppercase">Super Fun Coding!</span>
              </div>

              <h1 className="text-7xl lg:text-8xl font-black leading-tight bg-gradient-to-r from-slate-900 via-purple-600 to-pink-600 bg-clip-text">
                Code with <br />
                <span className="block text-transparent bg-gradient-to-r from-purple-500 to-red-500 bg-clip-text drop-shadow-lg">
                  Magic Blocks! ✨
                </span>
              </h1>

              <p className="text-2xl text-slate-800 max-w-lg leading-relaxed font-semibold">
                Turn code into colorful blocks! Build awesome games and apps!
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-6 justify-center lg:justify-start">
                <Button 
                  onClick={() => navigate("/create")}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-9 rounded-3xl font-black text-2xl shadow-2xl hover:scale-105 transition-all group"
                >
                  🚀 Start Building!
                  <ArrowRight className="ml-3 w-7 h-7 group-hover:translate-x-2 transition-transform" />
                </Button>
                <HowItWorksButton />
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-8 bg-gradient-to-r from-purple-400/50 to-pink-400/50 rounded-3xl blur-xl group-hover:opacity-100 transition-all" />
              <div className="relative bg-white border-4 border-purple-200 rounded-3xl p-6 shadow-2xl">
                <img src={heroImage} alt="Kids Coding" className="rounded-2xl w-full" />
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-xl animate-bounce">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-2xl shadow-xl animate-bounce" style={{animationDelay: '0.3s'}}>
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black bg-gradient-to-r from-slate-900 to-purple-600 bg-clip-text mb-6">Why Kids Love BlockJava!</h2>
            <p className="text-2xl text-slate-800 max-w-3xl mx-auto font-semibold">
              Everything you need to become a coding superstar!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div 
                key={f.title}
                className={`group bg-white ${f.bgColor} ${f.border} border-4 p-10 rounded-3xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-500`}
                style={{animationDelay: `${i * 200}ms`}}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${f.color} rounded-3xl flex items-center justify-center text-white mb-6 shadow-xl group-hover:scale-110 transition-all border-4 border-white`}>
                  {f.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 text-slate-900">{f.title}</h3>
                <p className="text-slate-700 text-lg leading-relaxed font-semibold">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

     

        {/* CTA */}
       

        {/* FOOTER */}
        <footer className="py-16 border-t-4 border-purple-200 bg-white text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <span className="font-black text-3xl text-slate-900">BlockJava</span>
          </div>
          <p className="text-xl text-slate-700 font-semibold">
            © 2026 Made with ❤️ by <span className="text-purple-600 font-black">Kanishka</span>
          </p>
        </footer>
      </div>
    </MainLayout>
  );
};

export default Index;
