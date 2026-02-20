import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Code2, ArrowLeft, UserPlus, Sparkles } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");
    if (!name || !email || !password) {
      setError("Name, Email, and Password are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:8082/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        const data = await res.json();
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const decoded: any = jwtDecode(credentialResponse.credential);
      const googleUser = { 
        name: decoded.name, 
        email: decoded.email,
        isGoogleAccount: true 
      };

      const res = await fetch("http://localhost:8082/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(googleUser),
      });

      if (res.ok) {
        const student = await res.json();
        localStorage.setItem("student", JSON.stringify(student));
        navigate("/home"); 
      }
    } catch (err) {
      setError("Google Signup Error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F7FF] text-[#2D3142] font-sans p-4 relative overflow-hidden">
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }

        .glass-card {
          background: white;
          border: 2px solid #F0E6FF;
          box-shadow: 0 20px 40px rgba(147, 51, 234, 0.08);
        }

        .text-magic-gradient {
          background: linear-gradient(135deg, #9333EA 0%, #F43F5E 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .btn-magic {
          background: linear-gradient(90deg, #7C3AED 0%, #A855F7 100%);
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
          transition: all 0.3s ease;
        }

        .btn-magic:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4);
          filter: brightness(1.1);
        }

        .input-purple {
          border: 2px solid #F3E8FF !important;
          transition: all 0.2s ease;
        }

        .input-purple:focus {
          border-color: #A855F7 !important;
          background: #FAF5FF !important;
          box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1);
        }
      `}</style>

      {/* Decorative Background Elements */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-purple-200/40 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-pink-100/50 blur-[100px] rounded-full"></div>

      <div className="w-full max-w-md z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="bg-white p-4 rounded-[2rem] shadow-xl shadow-purple-100 border-2 border-purple-50 animate-float">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl">
              <Code2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-black tracking-tight text-magic-gradient uppercase italic">BlockJava</h1>
            <div className="flex items-center justify-center gap-2 bg-purple-50 px-3 py-1 rounded-full mt-2">
              <Sparkles className="w-3 h-3 text-purple-500" />
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Join the Magic!</span>
            </div>
          </div>
        </div>

        {/* Signup Form */}
        <div className="glass-card p-8 rounded-[3rem] space-y-6 relative overflow-hidden">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#1E1B4B]">Create Account</h2>
            <p className="text-slate-400 text-sm">Start your coding adventure today</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-2xl text-xs font-bold text-center border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-purple-300 uppercase tracking-widest ml-2">Your Name</label>
              <Input 
                className="input-purple h-12 rounded-2xl px-5 bg-slate-50/50"
                placeholder="Kanishka" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-purple-300 uppercase tracking-widest ml-2">Email Address</label>
              <Input 
                className="input-purple h-12 rounded-2xl px-5 bg-slate-50/50"
                placeholder="hello@world.com" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-purple-300 uppercase tracking-widest ml-2">Create Password</label>
              <Input 
                className="input-purple h-12 rounded-2xl px-5 bg-slate-50/50"
                placeholder="••••••••" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            
            <Button 
              className="w-full h-14 btn-magic text-white font-black text-lg rounded-2xl py-6 flex items-center justify-center gap-3 mt-2"
              onClick={handleSignup}
            >
              Sign Up Now
              <UserPlus className="w-5 h-5" />
            </Button>
          </div>

          <div className="relative flex items-center py-1">
            <div className="flex-grow border-t-2 border-purple-50"></div>
            <span className="flex-shrink mx-4 text-[10px] font-black text-purple-200 uppercase tracking-widest">OR</span>
            <div className="flex-grow border-t-2 border-purple-50"></div>
          </div>

          {/* Google Signup */}
          <div className="flex justify-center bg-white rounded-2xl p-1 border-2 border-purple-50 shadow-sm">
            <GoogleLogin 
              onSuccess={handleGoogleSuccess} 
              onError={() => setError("Google Signup Failed")} 
              theme="outline"
              shape="pill"
              width="320"
            />
          </div>

          <div className="text-center pt-2">
            <button 
              onClick={() => navigate("/login")}
              className="text-slate-400 hover:text-purple-600 text-sm font-medium flex items-center justify-center gap-2 w-full transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Already a member? <span className="font-bold underline">Login</span>
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-purple-200 text-[10px] font-black uppercase tracking-[0.5em]">
          BlockJava Studio © 2026
        </p>
      </div>
    </div>
  );
};

export default Signup;