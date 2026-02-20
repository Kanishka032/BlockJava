import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, X, Sparkles, CheckCircle2 } from "lucide-react";

const HowItWorksButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Updated Button matching Dashboard "Home" style */}
      <Button
        onClick={() => setOpen(true)}
        className="w-full sm:w-auto bg-white text-[#7C3AED] border-2 border-[#F0E6FF] hover:bg-[#F8F7FF] hover:border-[#A855F7] font-black text-lg px-8 py-7 rounded-[2rem] shadow-lg shadow-purple-100/50 transition-all hover:-translate-y-1 active:scale-95 group"
      >
        <BookOpen className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
        How It Works
      </Button>

      {/* Popup / Modal */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-purple-900/20 backdrop-blur-md p-4 animate-in fade-in duration-300">
          
          <div className="bg-white border-2 border-[#F0E6FF] rounded-[3rem] max-w-md w-full p-10 relative shadow-[0_20px_50px_rgba(124,58,237,0.15)] animate-in zoom-in-95 duration-300">
            
            {/* Close button icon */}
            <button
              className="absolute top-8 right-8 p-2 rounded-2xl hover:bg-purple-50 text-purple-300 hover:text-purple-600 transition-all"
              onClick={() => setOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-10">
               <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-purple-200">
                  <BookOpen className="w-10 h-10 text-white" />
               </div>
               <h2 className="text-3xl font-black text-[#1E1B4B] tracking-tight">
                How It Works
              </h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span className="text-[10px] font-black text-purple-300 uppercase tracking-widest">Learn the magic</span>
              </div>
            </div>

            {/* Steps List */}
            <ul className="space-y-5">
              {[
                { num: "01", text: "Drag and drop colorful blocks to build your logic.", color: "text-purple-500", bg: "bg-purple-50" },
                { num: "02", text: "Watch it turn into real Java code automatically.", color: "text-pink-500", bg: "bg-pink-50" },
                { num: "03", text: "Hit PLAY to see your sprites come to life!", color: "text-indigo-500", bg: "bg-indigo-50" },
                { num: "04", text: "Complete tasks to earn points and level up.", color: "text-amber-500", bg: "bg-amber-50" },
              ].map((step, index) => (
                <li key={index} className="flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-slate-50 group">
                  <span className={`flex-shrink-0 w-10 h-10 ${step.bg} ${step.color} rounded-xl flex items-center justify-center font-black text-sm`}>
                    {step.num}
                  </span>
                  <p className="text-[#475569] font-bold text-sm leading-relaxed pt-2">
                    {step.text}
                  </p>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="mt-10">
              <Button 
                className="w-full py-8 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] hover:from-[#6D28D9] hover:to-[#9333EA] text-white font-black text-xl rounded-2xl shadow-xl shadow-purple-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                onClick={() => setOpen(false)}
              >
                Got It! 
                <CheckCircle2 className="w-6 h-6" />
              </Button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default HowItWorksButton;