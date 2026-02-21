import React, { useState, useCallback, useRef, useEffect } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { toast } from '@/hooks/use-toast';
import MainLayout from '@/components/MainLayout';
import Header from '@/components/Header';
import BlocklyWorkspace from '@/components/BlocklyWorkspace';
import Stage, { SpriteController } from '@/components/Stage';
import CodeViewer from '@/components/CodeViewer';
import ControlBar from '@/components/ControlBar';
import SpriteSelector from '@/components/SpriteSelector';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Code2, Terminal, Play, CheckCircle2 } from 'lucide-react';
// import { validateTask, taskRules } from "@/pages/taskValidator";
import { validateTask, taskRules } from "@/pages/taskValidator";

const CreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSprite, setSelectedSprite] = useState(() => localStorage.getItem('codekids_selected_sprite') || 'cat');

  const spriteRef = useRef<SpriteController | null>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  const [points, setPoints] = useState(() => {
    const studentData = localStorage.getItem('student');
    if (studentData) return JSON.parse(studentData).points || 0;
    return 0;
  });

  /* ---------------- Blockly Handlers ---------------- */
  const handleCodeChange = useCallback((newCode: string) => setCode(newCode), []);
  const handleSpriteRef = useCallback((controller: SpriteController | null) => { spriteRef.current = controller; }, []);
  
  const handleSpriteChange = useCallback((sprite: string) => {
    setSelectedSprite(sprite);
    localStorage.setItem('codekids_selected_sprite', sprite);
    if (spriteRef.current) spriteRef.current.reset();
    toast({ title: "🎨 Sprite Changed!", description: `Your sprite is now a ${sprite}!` });
  }, []);

  /* ---------------- Workspace Persistence ---------------- */
  const loadProjectFromStorage = useCallback(() => {
    const savedProject = localStorage.getItem("codekids_workspace");
    if (!savedProject || !workspaceRef.current) return;

    setTimeout(() => {
      if (!workspaceRef.current) return;
      
      try {
        let data = savedProject;

        while (typeof data === "string" && (data.trim().startsWith('"') || data.trim().startsWith('"{'))) {
          data = JSON.parse(data);
        }

        const json = typeof data === "string" ? JSON.parse(data) : data;

        workspaceRef.current.clear();

        if (json.blocks || json.languageVersion !== undefined) {
          Blockly.serialization.workspaces.load(json, workspaceRef.current);
          console.log("✅ Loaded via Serialization");
        } else {
          const xml = Blockly.utils.xml.textToDom(savedProject);
          Blockly.Xml.domToWorkspace(xml, workspaceRef.current);
          console.log("✅ Loaded via XML Fallback");
        }

        localStorage.removeItem("codekids_workspace");
        toast({ title: "📂 Project Loaded!", description: "Welcome back!" });
      } catch (error) {
        console.error("Critical Load Error:", error);
        toast({ title: "Load Error", description: "Project data is corrupted.", variant: "destructive" });
      }
    }, 100);
  }, []);

  const handleWorkspaceChange = useCallback((workspace: Blockly.WorkspaceSvg) => { 
    workspaceRef.current = workspace; 
    loadProjectFromStorage();
  }, [loadProjectFromStorage]);

  /* ---------------- Code Execution ---------------- */
 

 const runCode = async () => {
  if (!spriteRef.current || !workspaceRef.current) return;
  setIsRunning(true);
  const sprite = spriteRef.current;
  sprite.reset();

  try {
    // ✅ generate code once, safely
    const generatedCode = javascriptGenerator.workspaceToCode(workspaceRef.current);

    const stage = {
      mouseX: 0,
      mouseY: 0,
      setBackdrop: async (bg: string) => await sprite.setBackdrop(bg),
    };

    // Execute async code
    await new Function(
      'sprite', 'stage',
      `return (async () => { ${generatedCode} })();`
    )(sprite, stage);

  } catch (error) {
    console.error('Execution error:', error);
  } finally {
    setIsRunning(false);
  }
};

  const stopCode = () => { if (spriteRef.current) spriteRef.current.stop(); setIsRunning(false); };
  const resetSprite = () => { if (spriteRef.current) spriteRef.current.reset(); setIsRunning(false); };

  const saveProject = async () => {
    if (!workspaceRef.current) return;
    const studentData = localStorage.getItem("student");
    const student = studentData ? JSON.parse(studentData) : null;

    if (!student?.id) {
      toast({ title: "Not logged in", variant: "destructive" });
      return;
    }

    const projectName = prompt("Enter project name:");
    if (!projectName?.trim()) return;

    const blockData = Blockly.serialization.workspaces.save(workspaceRef.current);
    const payload = {
      studentId: student.id,
      title: projectName,
      projectData: JSON.stringify(blockData)
    };

    try {
      const res = await fetch("import.meta.env.VITE_API_BASE_URL/api/projects/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) toast({ title: "✅ Project Saved!" });
    } catch (error) {
      toast({ title: "Connection Error", variant: "destructive" });
    }
  };

  const clearWorkspace = () => {
    if (!workspaceRef.current) return;
    workspaceRef.current.clear();
    if (spriteRef.current) spriteRef.current.reset();
    setCode('');
    toast({ title: "🗑️ Cleared!" });
  };

  /* ---------------- Task Completion ---------------- */
  const finishTask = async () => {
    try {
      const rawId = localStorage.getItem("active_task_id");
      if (!rawId) { toast({ title: "No Task Active", variant: "destructive" }); return; }

      const lessonId = parseInt(rawId);
      if (!workspaceRef.current) return;

      const generatedCode = javascriptGenerator.workspaceToCode(workspaceRef.current);
      if (!generatedCode.trim()) { toast({ title: "Empty Code", variant: "destructive" }); return; }

      const isValid = validateTask(generatedCode, lessonId);
      if (!isValid) { toast({ title: "❌ Not Completed", variant: "destructive" }); return; }

      const studentData = localStorage.getItem("student");
      if (!studentData) return;
      const student = JSON.parse(studentData);
      const taskPoints = taskRules[lessonId]?.points || 0;

      const response = await fetch("import.meta.env.VITE_API_BASE_URL/api/tasks/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: student.id, taskId: lessonId, points: taskPoints }),
      });

      if (response.ok) {
        const updatedStudent = await response.json();
        localStorage.setItem("student", JSON.stringify(updatedStudent));
        setPoints(updatedStudent.points);
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        toast({ title: "🎉 Amazing!", description: `Earned ${taskPoints} XP!` });
        setTimeout(() => navigate("/learn"), 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProjectFromStorage();
  }, [loadProjectFromStorage]);

  return (
    <MainLayout points={points}>
      <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
        <Header 
          title="BlockJava Studio" 
          subtitle="Building logic one block at a time"
          actions={
            <div className="flex items-center gap-3">
              <ControlBar
                isRunning={isRunning}
                onRun={runCode}
                onStop={stopCode}
                onReset={resetSprite}
                onSave={saveProject}
                onClear={clearWorkspace}
              />
              <button onClick={finishTask} className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-5 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all">
                <CheckCircle2 className="w-4 h-4" /> FINISH
              </button>
            </div>
          }
        />
        <main className="flex-1 p-4 lg:p-6 flex flex-col xl:flex-row gap-6 min-h-0">
          <div className="flex-[2] flex flex-col bg-white rounded-3xl border-2 border-slate-200 shadow-2xl overflow-hidden relative">
            <div className="px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b-2 border-slate-200 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-600" />
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Logic Workspace</span>
            </div>
            <div className="flex-1 relative">
              <BlocklyWorkspace 
                onCodeChange={handleCodeChange}
                onWorkspaceChange={handleWorkspaceChange}
              />
            </div>
          </div>
          <div className="w-full xl:w-[380px] bg-white rounded-3xl border-2 border-slate-200 p-5 shadow-2xl flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm">
                <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" /> STAGE PREVIEW
              </h3>
              <SpriteSelector selectedSprite={selectedSprite} onSpriteChange={handleSpriteChange} />
            </div>
            <div className="flex justify-center bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl border-2 border-slate-300 p-2 shadow-inner aspect-square">
              <Stage onSpriteRef={handleSpriteRef} isRunning={isRunning} spriteType={selectedSprite} />
            </div>
          </div>
          <div className="flex-1 xl:max-w-[440px] flex flex-col bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-2xl min-h-0">
            <div className="px-5 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-slate-200 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-purple-600" />
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.2em]">Java Console</span>
            </div>
            <div className="flex-1 overflow-auto bg-slate-50 min-h-0">
              <CodeViewer code={code} />
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  );
};

export default CreatePage;