import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, Star, CheckCircle2, Lock, Flame, ChevronDown, Award, Target, X, Play } from "lucide-react";
import MainLayout from "@/components/MainLayout";
import ChatBox from "./chatbox";
const WORLDS = [
  { 
    name: "Code Forest", 
    icon: "🌲", 
    gradient: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-900",
    description: "Master the fundamentals of movement and control"
  },
  { 
    name: "Logic Lagoon", 
    icon: "🐙", 
    gradient: "from-blue-500 to-cyan-600",
    bgLight: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-900",
    description: "Learn loops and repetition patterns"
  },
  { 
    name: "Input Island", 
    icon: "🏝️", 
    gradient: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-900",
    description: "Explore effects, sounds, and visual programming"
  },
  { 
    name: "Function Galaxy", 
    icon: "🛸", 
    gradient: "from-purple-500 to-pink-600",
    bgLight: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-900",
    description: "Dive into conditionals and decision making"
  },
  { 
    name: "Ultimate City", 
    icon: "🤖", 
    gradient: "from-rose-500 to-red-600",
    bgLight: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-900",
    description: "Master advanced techniques and combinations"
  },
];

// --- 1. Task Definitions ---
const LESSON_DATA: Record<number, { title: string; desc: string; pts: number; world: number }> = {
  // WORLD 1: Code Forest - Basic Movement
  1: { title: "First Steps", desc: "Use the 'move' block to move your sprite forward by 50 steps", pts: 10, world: 0 },
  2: { title: "Turn Around", desc: "Use the 'turn left' block to rotate your sprite by 50 degrees", pts: 10, world: 0 },
  3: { title: "Jump Up", desc: "Use the 'change y by' block to make your sprite jump!", pts: 15, world: 0 },
  4: { title: "Play a Sound", desc: "Find and use the 'play sound meow' block", pts: 10, world: 0 },
  5: { title: "Say Hello", desc: "Use the 'say' block to make your sprite greet the world", pts: 15, world: 0 },
  6: { title: "Teleport", desc: "Use 'go to x: y:' block to jump to position (100, 50)", pts: 25, world: 0 },
  7: { title: "Move & Turn", desc: "Combine a 'move' block and a 'turn right' block together", pts: 20, world: 0 },
  8: { title: "Repeat 5 Times", desc: "Use a 'repeat' block to do an action 5 times", pts: 30, world: 0 },
  9: { title: "Wait Then Jump", desc: "Use 'wait 1 second' followed by a jump", pts: 20, world: 0 },
  10: { title: "BOSS: Forever Loop", desc: "Use the 'forever' block to create an infinite loop!", pts: 100, world: 0 },
  
  // WORLD 2: Logic Lagoon - Loops
  11: { title: "Count to 10", desc: "Use 'repeat 10' to repeat an action exactly 10 times", pts: 30, world: 1 },
  12: { title: "Moving Loop", desc: "Put a 'move' block inside a 'repeat' loop", pts: 30, world: 1 },
  13: { title: "Draw a Square", desc: "Use repeat 4 to move forward and turn right 4 times", pts: 40, world: 1 },
  14: { title: "Spin Forever", desc: "Use 'forever' with a 'turn' block to keep spinning", pts: 35, world: 1 },
  15: { title: "Dance Loop", desc: "Put 'jump' and 'wait' blocks inside a loop", pts: 35, world: 1 },
  16: { title: "Fast Movement", desc: "Use 'repeat' with 'move 100' to travel far", pts: 40, world: 1 },
  17: { title: "Make an Octagon", desc: "Repeat turning 45 degrees exactly 8 times", pts: 50, world: 1 },
  18: { title: "Loop Inside Loop", desc: "Put one 'repeat' block inside another 'repeat' block", pts: 60, world: 1 },
  19: { title: "Walk Slowly", desc: "Use repeat with move and wait to walk step by step", pts: 40, world: 1 },
  20: { title: "Draw a Circle", desc: "Repeat small turns 36 times to make a circle shape", pts: 50, world: 1 },
  
  // WORLD 3: Input Island - Effects & Looks
  21: { title: "Change Costume", desc: "Use the 'next costume' block to change how sprite looks", pts: 25, world: 2 },
  22: { title: "Grow Bigger", desc: "Use 'set size to 200%' to make sprite twice as big", pts: 25, world: 2 },
  23: { title: "Hide & Show", desc: "Use 'hide' block then 'show' block to make sprite appear/disappear", pts: 30, world: 2 },
  24: { title: "Ghost Effect", desc: "Use 'set ghost effect' to make sprite see-through", pts: 30, world: 2 },
  25: { title: "Two Sounds", desc: "Play two different sound blocks one after another", pts: 35, world: 2 },
  26: { title: "Talk While Moving", desc: "Use 'say' block and 'move' block together", pts: 30, world: 2 },
  27: { title: "Shrink Down", desc: "Use 'set size to 50%' to make sprite half the size", pts: 25, world: 2 },
  28: { title: "Rainbow Colors", desc: "Use 'change color effect' to change sprite's color", pts: 30, world: 2 },
  29: { title: "Think Bubble", desc: "Use 'think for 2 seconds' to show a thought bubble", pts: 25, world: 2 },
  30: { title: "Clear Effects", desc: "Use 'clear graphic effects' to reset all visual changes", pts: 30, world: 2 },
  
  // WORLD 4: Function Galaxy - Conditionals
  31: { title: "New Background", desc: "Use 'switch backdrop' to change the stage background", pts: 35, world: 3 },
  32: { title: "Long Wait", desc: "Use 'wait 5 seconds' block", pts: 20, world: 3 },
  33: { title: "Say Your Name", desc: "Type your own name in a 'say' block", pts: 20, world: 3 },
  34: { title: "Sound & Hide", desc: "Play a sound block, then use 'hide' block", pts: 35, world: 3 },
  35: { title: "Reset Everything", desc: "Use 'show' and 'set size to 100%' to reset sprite", pts: 30, world: 3 },
  36: { title: "Bounce at Edge", desc: "Use 'if on edge, bounce' block to bounce off walls", pts: 40, world: 3 },
  37: { title: "Random Position", desc: "Use 'go to random position' block", pts: 30, world: 3 },
  38: { title: "If-Else Choice", desc: "Use an 'if-else' block to make a decision", pts: 45, world: 3 },
  39: { title: "Go to Center", desc: "Use 'go to x:0 y:0' to return to the middle of stage", pts: 25, world: 3 },
  40: { title: "Check Score", desc: "Use an 'if' block to check if a number is greater than 10", pts: 50, world: 3 },
  
  // WORLD 5: Ultimate City - Advanced
  41: { title: "Glide Up", desc: "Use 'glide' block to smoothly move to top of screen", pts: 35, world: 4 },
  42: { title: "Create Variable", desc: "Make a new variable called 'Speed' and set it to 10", pts: 40, world: 4 },
  43: { title: "Math Blocks", desc: "Use a '+ operator' block to add 50 + 50 in a move block", pts: 40, world: 4 },
  44: { title: "Follow Mouse", desc: "Use 'point towards mouse-pointer' block", pts: 35, world: 4 },
  45: { title: "Wait for Click", desc: "Use 'wait until' block with 'sprite clicked?' condition", pts: 45, world: 4 },
  46: { title: "Move on X-axis", desc: "Use 'set x to' or 'change x by' block to move horizontally", pts: 30, world: 4 },
  47: { title: "Move on Y-axis", desc: "Use 'set y to' or 'change y by' block to move vertically", pts: 30, world: 4 },
  48: { title: "Win Condition", desc: "Use 'if score = 100' to check if player won", pts: 50, world: 4 },
  49: { title: "Glide & Spin", desc: "Use 'glide' and 'turn' blocks at the same time", pts: 55, world: 4 },
  50: { title: "ULTIMATE BOSS", desc: "Combine loop, if-else, and sound in one program!", pts: 100, world: 4 },
};

type LessonStatus = "not_started" | "completed" | "locked";

interface Lesson {
  id: number;
  title: string;
  description: string;
  points: number;
  status: LessonStatus;
  world: number;
}

const LearnPage: React.FC = () => {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("student") || "null");
  const [points, setPoints] = useState<number>(student?.points || 0);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [expandedWorld, setExpandedWorld] = useState<number | null>(0);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (!student) {
      navigate("/login");
      return;
    }

    const allLessons: Lesson[] = Array.from({ length: 50 }, (_, i) => {
      const id = i + 1;
      return {
        id: id,
        title: LESSON_DATA[id]?.title || `Mission #${id}`,
        description: LESSON_DATA[id]?.desc || `Challenge level ${id}`,
        points: LESSON_DATA[id]?.pts || 20 + Math.floor(i / 5) * 5,
        world: LESSON_DATA[id]?.world || Math.floor(i / 10),
        status: "locked",
      };
    });

    fetch(`http://localhost:8082/api/tasks/progress/${student.id}`)
      .then((res) => res.json())
      .then((completedTasks: any[]) => {
        const completedIds = new Set(completedTasks.map((t) => t.taskId));
        const updatedLessons = allLessons.map((lesson, index) => {
          if (completedIds.has(lesson.id)) return { ...lesson, status: "completed" as const };
          const prevCompleted = index === 0 || completedIds.has(allLessons[index - 1].id);
          return { ...lesson, status: prevCompleted ? "not_started" as const : "locked" as const };
        });
        setLessons(updatedLessons);
      })
      .catch(() => {
        setLessons(allLessons.map((l, i) => (i === 0 ? { ...l, status: "not_started" } : l)));
      });
  }, []);

  const handleStart = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const startMission = () => {
    if (selectedLesson) {
      localStorage.setItem("active_task_id", selectedLesson.id.toString());
      navigate("/create");
    }
  };

  const groupedLessons = WORLDS.map((world, idx) => ({
    ...world,
    lessons: lessons.filter(l => l.world === idx),
    completed: lessons.filter(l => l.world === idx && l.status === "completed").length,
    total: lessons.filter(l => l.world === idx).length,
  }));

  const totalCompleted = lessons.filter(l => l.status === 'completed').length;
  const completionRate = Math.round((totalCompleted / 50) * 100);

  return (
    <MainLayout points={points}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <ChatBox/>
        {/* Modern Header */}
        <div className="bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black text-slate-900 mb-2">Learning Path</h1>
                <p className="text-slate-600 font-medium">Master coding concepts through progressive challenges</p>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <div className="text-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-bold text-slate-600">Progress</span>
                  </div>
                  <div className="text-3xl font-black text-blue-600">{completionRate}%</div>
                </div>
                <div className="h-12 w-px bg-slate-200" />
                <div className="text-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-5 h-5 text-amber-600" />
                    <span className="text-sm font-bold text-slate-600">Your XP</span>
                  </div>
                  <div className="text-3xl font-black text-amber-600">{points}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            
            {/* Total Progress Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Trophy className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-bold text-slate-500">MISSIONS</span>
              </div>
              <div className="mb-2">
                <div className="text-3xl font-black text-slate-900">{totalCompleted}/50</div>
                <div className="text-sm text-slate-600 font-medium mt-1">Completed</div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>

            {/* Points Card */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 shadow-lg text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-bold opacity-90">YOUR XP</span>
              </div>
              <div className="text-3xl font-black mb-1">{points}</div>
              <div className="text-sm opacity-90 font-medium">Total earned</div>
            </div>

            {/* Total XP Available Card */}
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 shadow-lg text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-bold opacity-90">MAX XP</span>
              </div>
              <div className="text-3xl font-black mb-1">1740</div>
              <div className="text-sm opacity-90 font-medium">Total available</div>
            </div>

            {/* Worlds Mastered Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-emerald-100 p-3 rounded-xl">
                  <Star className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-sm font-bold text-slate-500">WORLDS</span>
              </div>
              <div className="text-3xl font-black text-slate-900">
                {groupedLessons.filter(w => w.completed === w.total).length}/5
              </div>
              <div className="text-sm text-slate-600 font-medium mt-1">Mastered</div>
            </div>
          </div>

          {/* World Sections */}
          <div className="space-y-4">
            {groupedLessons.map((world, worldIdx) => {
              const progressPercent = Math.round((world.completed / world.total) * 100);
              const isComplete = world.completed === world.total;
              
              return (
                <div 
                  key={worldIdx} 
                  className={`bg-white rounded-2xl border-2 ${world.border} shadow-lg overflow-hidden transition-all ${
                    expandedWorld === worldIdx ? 'ring-4 ring-blue-100' : ''
                  }`}
                >
                  
                  {/* World Header */}
                  <button
                    onClick={() => setExpandedWorld(expandedWorld === worldIdx ? null : worldIdx)}
                    className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-all group"
                  >
                    <div className="flex items-center gap-5">
                      {/* Icon with gradient background */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${world.gradient} flex items-center justify-center text-3xl shadow-lg`}>
                        {world.icon}
                      </div>
                      
                      <div className="text-left">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className={`font-black text-2xl ${world.text}`}>{world.name}</h3>
                          {isComplete && (
                            <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              <CheckCircle2 size={12} />
                              MASTERED
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 font-medium mb-2">{world.description}</p>
                        
                        {/* Progress Bar */}
                        <div className="flex items-center gap-3">
                          <div className="w-48 bg-slate-200 rounded-full h-2">
                            <div 
                              className={`bg-gradient-to-r ${world.gradient} h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-slate-700">{world.completed}/{world.total}</span>
                        </div>
                      </div>
                    </div>
                    
                    <ChevronDown 
                      className={`transition-transform text-slate-400 group-hover:text-slate-600 ${
                        expandedWorld === worldIdx ? 'rotate-180' : ''
                      }`} 
                      size={28}
                    />
                  </button>

                  {/* Missions Grid */}
                  {expandedWorld === worldIdx && (
                    <div className={`p-6 pt-0 ${world.bgLight} border-t-2 ${world.border}`}>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {world.lessons.map((lesson) => {
                          const isBoss = lesson.id % 10 === 0;
                          
                          return (
                            <button
                              key={lesson.id}
                              disabled={lesson.status === "locked"}
                              onClick={() => lesson.status !== "locked" && handleStart(lesson)}
                              className={`
                                relative w-full aspect-square rounded-2xl flex flex-col items-center justify-center 
                                border-b-[6px] transition-all duration-200 font-black
                                ${lesson.status === "completed" 
                                  ? `bg-gradient-to-br ${world.gradient} border-slate-700 text-white shadow-xl scale-100` 
                                  : lesson.status === "locked"
                                  ? "bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed"
                                  : "bg-white border-slate-300 text-slate-800 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-105"}
                                ${isBoss && lesson.status !== "locked" ? 'ring-4 ring-amber-400' : ''}
                              `}
                            >
                              {lesson.status === "locked" ? (
                                <Lock size={28} strokeWidth={2.5} />
                              ) : isBoss ? (
                                <div className="flex flex-col items-center">
                                  <Star size={36} className="fill-current mb-1" />
                                  <span className="text-xs font-black">BOSS</span>
                                </div>
                              ) : (
                                <span className="text-4xl">{lesson.id}</span>
                              )}
                              
                              {lesson.status === "completed" && (
                                <div className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-lg">
                                  <CheckCircle2 size={20} className="text-emerald-500" />
                                </div>
                              )}
                              
                              {lesson.status === "not_started" && !isBoss && (
                                <div className="absolute inset-0 rounded-2xl bg-blue-400/20 animate-pulse" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Task Detail Modal */}
        {selectedLesson && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">
              
              {/* Modal Header */}
              <div className={`bg-gradient-to-br ${WORLDS[selectedLesson.world].gradient} p-8 text-white relative`}>
                <button
                  onClick={() => setSelectedLesson(null)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
                >
                  <X size={20} />
                </button>
                
                <div className="text-center">
                  <div className="text-6xl mb-4">{WORLDS[selectedLesson.world].icon}</div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold inline-block mb-3">
                    MISSION {selectedLesson.id}
                  </div>
                  <h2 className="text-3xl font-black mb-2">{selectedLesson.title}</h2>
                  <p className="text-white/90 text-sm font-medium">{WORLDS[selectedLesson.world].name}</p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Mission Objective</h3>
                  <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4">
                    <p className="text-slate-800 font-medium leading-relaxed text-lg">
                      {selectedLesson.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-2xl">
                  <span className="text-sm font-bold text-slate-700">Reward</span>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span className="text-2xl font-black text-amber-600">{selectedLesson.points} XP</span>
                  </div>
                </div>

                <button
                  onClick={startMission}
                  className={`w-full bg-gradient-to-r ${WORLDS[selectedLesson.world].gradient} text-white font-black text-lg py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-105`}
                >
                  <Play className="w-5 h-5 fill-white" />
                  START MISSION
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default LearnPage;
