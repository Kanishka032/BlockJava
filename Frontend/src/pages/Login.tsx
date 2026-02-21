import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code2, ArrowLeft, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code2, ArrowLeft, LogIn, Sparkles } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Base URL of deployed backend
  const API_BASE_URL = "https://blockjava-1.onrender.com";

  // Handle query param token from OAuth redirect
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token"); // backend should redirect with ?token=JWT

    if (token) {
      localStorage.setItem("student", JSON.stringify({ token }));
      navigate("/home");
    }
  }, [location.search, navigate]);

  // Email/Password login
  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const student = await res.json();
        localStorage.setItem("student", JSON.stringify(student));
        navigate("/home");
      } else {
        const data = await res.json();
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  // Google OAuth login (server-side)
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F7FF] text-[#2D3142] font-sans p-4 relative overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .glass-card { background: white; border: 2px solid #F0E6FF; box-shadow: 0 20px 40px rgba(147, 51, 234, 0.08); }
        .text-magic-gradient { background: linear-gradient(135deg, #9333EA 0%, #F43F5E 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .btn-magic { background: linear-gradient(90deg, #7C3AED 0%, #A855F7 100%); box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3); transition: all 0.3s ease; }
        .btn-magic:hover { transform: scale(1.02); box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4); filter: brightness(1.1); }
        .input-purple { border: 2px solid #F3E8FF !important; transition: all 0.2s ease; }
        .input-purple:focus { border-color: #A855F7 !important; background: #FAF5FF !important; box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1); }
      `}</style>

      {/* Decorative Background */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-purple-200/40 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-pink-100/50 blur-[100px] rounded-full"></div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/home")}
        className="absolute top-8 left-8 flex items-center gap-2 text-purple-400 hover:text-purple-600 transition-colors font-bold z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-xs uppercase tracking-[0.2em]">Return Home</span>
      </button>

      <div className="w-full max-w-md z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="bg-white p-4 rounded-[2rem] shadow-xl shadow-purple-100 border-2 border-purple-50 animate-float">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl">
              <Code2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-black tracking-tight text-magic-gradient uppercase italic">BlockJava</h1>
            <div className="flex items-center justify-center gap-2 bg-purple-50 px-3 py-1 rounded-full mt-2">
              <Sparkles className="w-3 h-3 text-purple-500" />
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest text-nowrap">Super Fun Coding!</span>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="glass-card p-10 rounded-[3rem] space-y-8 relative overflow-hidden">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#1E1B4B]">Welcome Back!</h2>
            <p className="text-slate-400 text-sm">Ready to build something awesome?</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-2xl text-xs font-bold text-center border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-purple-300 uppercase tracking-widest ml-2">Email Address</label>
              <Input
                className="input-purple h-14 rounded-2xl px-6 bg-slate-50/50 text-lg"
                placeholder="codingstar@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-purple-300 uppercase tracking-widest ml-2">Secret Password</label>
              <Input
                className="input-purple h-14 rounded-2xl px-6 bg-slate-50/50 text-lg"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              className="w-full h-15 btn-magic text-white font-black text-xl rounded-2xl py-7 flex items-center justify-center gap-3 transition-all"
              onClick={handleLogin}
            >
              Start Coding
              <LogIn className="w-6 h-6" />
            </Button>
          </div>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t-2 border-purple-50"></div>
            <span className="flex-shrink mx-4 text-[10px] font-black text-purple-200 uppercase tracking-widest">Social Login</span>
            <div className="flex-grow border-t-2 border-purple-50"></div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-purple-50 hover:border-purple-200 p-3 rounded-2xl transition-all shadow-sm font-bold text-slate-600"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="text-center pt-2">
            <p className="text-slate-400 text-sm font-medium">
              New to BlockJava?{' '}
              <button
                onClick={() => navigate("/signup")}
                className="text-purple-600 font-black hover:text-pink-500 transition-colors underline underline-offset-4"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-purple-200 text-[10px] font-black uppercase tracking-[0.5em]">
          © 2026 Crafted by Kanishka
        </p>
      </div>
    </div>
  );
};

export default Login;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Base URL for your backend
  const API_BASE_URL = "https://blockjava-1.onrender.com";

  // Email/Password login
  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const student = await res.json();
        localStorage.setItem("student", JSON.stringify(student));
        navigate("/home");
      } else {
        const data = await res.json();
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  // Google OAuth login
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F7FF] text-[#2D3142] font-sans p-4 relative overflow-hidden">
      {/* Custom Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .glass-card { background: white; border: 2px solid #F0E6FF; box-shadow: 0 20px 40px rgba(147, 51, 234, 0.08); }
        .text-magic-gradient { background: linear-gradient(135deg, #9333EA 0%, #F43F5E 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .btn-magic { background: linear-gradient(90deg, #7C3AED 0%, #A855F7 100%); box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3); transition: all 0.3s ease; }
        .btn-magic:hover { transform: scale(1.02); box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4); filter: brightness(1.1); }
        .input-purple { border: 2px solid #F3E8FF !important; transition: all 0.2s ease; }
        .input-purple:focus { border-color: #A855F7 !important; background: #FAF5FF !important; box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1); }
      `}</style>

      {/* Decorative Background */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-purple-200/40 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-pink-100/50 blur-[100px] rounded-full"></div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/home")}
        className="absolute top-8 left-8 flex items-center gap-2 text-purple-400 hover:text-purple-600 transition-colors font-bold z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-xs uppercase tracking-[0.2em]">Return Home</span>
      </button>

      <div className="w-full max-w-md z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="bg-white p-4 rounded-[2rem] shadow-xl shadow-purple-100 border-2 border-purple-50 animate-float">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl">
              <Code2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-black tracking-tight text-magic-gradient uppercase italic">BlockJava</h1>
            <div className="flex items-center justify-center gap-2 bg-purple-50 px-3 py-1 rounded-full mt-2">
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest text-nowrap">
                Super Fun Coding!
              </span>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="glass-card p-10 rounded-[3rem] space-y-8 relative overflow-hidden">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#1E1B4B]">Welcome Back!</h2>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-2xl text-xs font-bold text-center border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-purple-300 uppercase tracking-widest ml-2">Email Address</label>
              <Input
                className="input-purple h-14 rounded-2xl px-6 bg-slate-50/50 text-lg"
                placeholder="codingstar@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-purple-300 uppercase tracking-widest ml-2">Secret Password</label>
              <Input
                className="input-purple h-14 rounded-2xl px-6 bg-slate-50/50 text-lg"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              className="w-full h-15 btn-magic text-white font-black text-xl rounded-2xl py-7 flex items-center justify-center gap-3 transition-all"
              onClick={handleLogin}
            >
              Start Coding
              <LogIn className="w-6 h-6" />
            </Button>
          </div>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t-2 border-purple-50"></div>
            <span className="flex-shrink mx-4 text-[10px] font-black text-purple-200 uppercase tracking-widest">Social Login</span>
            <div className="flex-grow border-t-2 border-purple-50"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-purple-50 hover:border-purple-200 p-3 rounded-2xl transition-all shadow-sm font-bold text-slate-600"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="text-center pt-2">
            <p className="text-slate-400 text-sm font-medium">
              New to BlockJava?{' '}
              <button
                onClick={() => navigate("/signup")}
                className="text-purple-600 font-black hover:text-pink-500 transition-colors underline underline-offset-4"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


