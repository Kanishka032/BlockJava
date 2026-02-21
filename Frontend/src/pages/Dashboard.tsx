import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import {
  Trash2,
  FolderOpen,
  Plus,
  Code2,
  Settings,
  Mail,
  Zap,
  BarChart3,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Project {
  id: string;
  title: string;
  projectData: string;
}

interface DailyProgress {
  date: string;
  tasksCompleted: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [dailyProgress, setDailyProgress] = useState<DailyProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [progressLoading, setProgressLoading] = useState(true);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [confirmResetPassword, setConfirmResetPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [newName, setNewName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);

  const points = student?.points || 0;
  const level = Math.floor(points / 100) + 1;

  /* ---------------- LOAD STUDENT FROM STORAGE ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("student");
    if (!saved) {
      navigate("/login");
      return;
    }
    const parsed = JSON.parse(saved);
    setStudent(parsed);
    setNewName(parsed?.name || "");
  }, [navigate]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let token = params.get("token");
    if (!token) return;
    // If token comes from full URL, extract only the UUID
    if (token.includes("http://") || token.includes("token=")) {
      const parts = token.split("token=");
      token = parts[parts.length - 1];
    }
    setResetToken(token);
    setIsResetOpen(true);
  }, []);

  /* ---------------- FETCH DASHBOARD DATA ---------------- */
  const loadDashboardData = useCallback(async () => {
    if (!student?.id) return;
    try {
      setLoading(true);
      const [studentRes, projectsRes] = await Promise.all([
        fetch(`import.meta.env.VITE_API_BASE_URL/api/auth/student/${student.id}`),
        fetch(`import.meta.env.VITE_API_BASE_URL/api/projects/student/${student.id}`),
      ]);
      if (studentRes.ok) {
        const updatedStudent = await studentRes.json();
        localStorage.setItem("student", JSON.stringify(updatedStudent));
        setStudent(updatedStudent);
      }
      if (projectsRes.ok) {
        const data = await projectsRes.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Dashboard Load Error:", err);
    } finally {
      setLoading(false);
    }
  }, [student?.id]);

  const fetchDailyProgress = useCallback(async () => {
    if (!student?.id) return;
    try {
      setProgressLoading(true);
      const res = await fetch(
        `import.meta.env.VITE_API_BASE_URL/api/tasks/students/${student.id}/daily-progress`
      );
      if (!res.ok) throw new Error("Failed to fetch progress");
      const raw = await res.json();
      const formatted = raw.map((item: any) =>
        Array.isArray(item)
          ? { date: item[0], tasksCompleted: item[1] || 0 }
          : { date: item.date, tasksCompleted: item.tasksCompleted || 0 }
      );
      setDailyProgress(formatted);
    } catch (err) {
      console.error("Progress Error:", err);
    } finally {
      setProgressLoading(false);
    }
  }, [student?.id]);

  useEffect(() => {
    if (student?.id) {
      loadDashboardData();
      fetchDailyProgress();
    }
  }, [student?.id, loadDashboardData, fetchDailyProgress]);

  /* ---------------- PROGRESS CALCULATIONS ---------------- */
  const sortedProgress = useMemo(() => {
    return [...dailyProgress]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-14);
  }, [dailyProgress]);

  const totalTasks = useMemo(
    () => sortedProgress.reduce((sum, day) => sum + (day.tasksCompleted || 0), 0),
    [sortedProgress]
  );

  const bestDay = useMemo(() => {
    if (sortedProgress.length === 0) return 0;
    return Math.max(...sortedProgress.map((d) => d.tasksCompleted || 0));
  }, [sortedProgress]);

  const avgTasks = useMemo(() => {
    return sortedProgress.length > 0
      ? Math.round(totalTasks / sortedProgress.length)
      : 0;
  }, [totalTasks, sortedProgress.length]);

  /* ---------------- ACTIONS ---------------- */
  const openProject = (project: Project) => {
    localStorage.setItem("codekids_workspace", project.projectData);
    navigate("/create");
  };

  const deleteProject = (id: string) => {
    if (!confirm("Delete project permanently?")) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Project deleted ✅" });
  };

  const handleUpdateProfile = async () => {
    if (!student?.email) return;
    setIsUpdating(true);
    try {
      if (newName && newName !== student.name) {
        await axios.put(
          `import.meta.env.VITE_API_BASE_URL/api/auth/student/${student.id}/update-name`,
          { name: newName }
        );
        const updatedStudent = { ...student, name: newName };
        setStudent(updatedStudent);
        localStorage.setItem("student", JSON.stringify(updatedStudent));
      }
      if (currentPassword && newPassword) {
        await axios.put(
          `import.meta.env.VITE_API_BASE_URL/api/auth/student/${student.email}/change-password`,
          { currentPassword, newPassword }
        );
      }
      toast({ title: "Profile updated successfully ✨" });
      setIsSettingsOpen(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (error: any) {
      if (error.response) {
        toast({ title: error.response.data.error || "Update failed" });
      } else {
        toast({ title: "Server not reachable" });
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleResetPasswordSubmit = async () => {
    if (resetLoading) return;
    if (!resetPassword || !confirmResetPassword) {
      toast({
        title: "Error",
        description: "Please fill both password fields",
        variant: "destructive",
      });
      return;
    }
    if (resetPassword !== confirmResetPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    setResetLoading(true);
    try {
      const { data } = await axios.put(
        "import.meta.env.VITE_API_BASE_URL/api/auth/reset-password",
        { token: resetToken, newPassword: resetPassword }
      );
      toast({
        title: "Success",
        description: data.message || "Password reset successfully",
      });
      setIsResetOpen(false);
      setResetPassword("");
      setConfirmResetPassword("");
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (error: any) {
      toast({
        title: "Reset Failed",
        description: error.response?.data?.error || "Invalid or expired token",
        variant: "destructive",
      });
    } finally {
      setResetLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (sendingReset) return;
    const email = student?.email?.trim();
    if (!email) {
      toast({
        title: "Email is required",
        description: "Please login or enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    setSendingReset(true);
    try {
      const { data } = await axios.post(
        "import.meta.env.VITE_API_BASE_URL/api/auth/forgot-password",
        { email }
      );
      toast({
        title: "Reset Email Sent 📧",
        description:
          data?.message || "If this email exists, a password reset link has been sent.",
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast({
          title: "Request Failed",
          description: error.response.data?.error || "Unable to send reset email.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Server Error",
          description: "Server not reachable. Try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setSendingReset(false);
    }
  };

  /* ---------------- LOADING SCREEN ---------------- */
  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 font-medium">Loading your dashboard...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <MainLayout>
      <div className="w-full px-4 py-8 space-y-8">

        {/* HERO SECTION */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-8 text-white shadow-xl">
          <h1 className="text-3xl font-bold mb-1">
            Welcome back, {student?.name}! 👋
          </h1>
          <p className="text-purple-100 text-sm">
            Level {level} Coder • Ready to build something cool today?
          </p>

          {/* QUICK ACTIONS ICONS */}
          <div className="flex gap-3 mt-6">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-xl gap-2"
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings className="w-4 h-4" />
              Profile
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-xl gap-2"
              onClick={handleForgotPassword}
              disabled={sendingReset}
            >
              <Mail className="w-4 h-4" />
              {sendingReset ? "Sending..." : "Forgot Password"}
            </Button>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={<BarChart3 className="w-5 h-5 text-blue-500" />}
            title="Total Tasks"
            value={totalTasks}
          />
          <StatCard
            icon={<Zap className="w-5 h-5 text-amber-500" />}
            title="Total XP"
            value={points}
          />
          <StatCard
            icon={<Code2 className="w-5 h-5 text-purple-500" />}
            title="Projects"
            value={projects.length}
          />
        </div>

        {/* PROJECTS SECTION */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-slate-800">My Projects</h2>
            <Button
              onClick={() => navigate("/create")}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg shadow-pink-200 rounded-xl gap-2 transition-all hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Code2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No projects yet. Let's start coding!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all"
                >
                  <div>
                    <p className="font-semibold text-slate-700">{project.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      ID: {project.id.slice(0, 8)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openProject(project)}
                      className="hover:bg-green-50 hover:text-green-600 rounded-lg gap-1"
                    >
                      <FolderOpen className="w-4 h-4" />
                      Open
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteProject(project.id)}
                      className="hover:bg-red-50 hover:text-red-600 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SETTINGS MODAL */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="rounded-2xl max-w-md">
          <DialogTitle className="text-xl font-bold">Profile Settings</DialogTitle>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium text-slate-600 mb-1 block">
                Display Name
              </label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Your name"
                className="rounded-xl border-slate-200"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600 mb-1 block">
                Current Password
              </label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current password"
                className="rounded-xl border-slate-200"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600 mb-1 block">
                New Password
              </label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="rounded-xl border-slate-200"
              />
            </div>
            <Button
              onClick={handleUpdateProfile}
              disabled={isUpdating}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* RESET PASSWORD MODAL */}
      <Dialog open={isResetOpen} onOpenChange={setIsResetOpen}>
        <DialogContent className="rounded-2xl max-w-md">
          <DialogTitle className="text-xl font-bold">Reset Password</DialogTitle>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium text-slate-600 mb-1 block">
                New Password
              </label>
              <Input
                type="password"
                value={resetPassword}
                onChange={(e) => setResetPassword(e.target.value)}
                placeholder="New password"
                className="rounded-xl border-slate-200"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600 mb-1 block">
                Confirm Password
              </label>
              <Input
                type="password"
                value={confirmResetPassword}
                onChange={(e) => setConfirmResetPassword(e.target.value)}
                placeholder="Confirm password"
                className="rounded-xl border-slate-200"
              />
            </div>
            <Button
              onClick={handleResetPasswordSubmit}
              disabled={resetLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl"
            >
              {resetLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

/* ---------- REUSABLE STAT CARD ---------- */
const StatCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
}) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:border-purple-200 transition-colors">
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <span className="text-sm font-medium text-slate-500">{title}</span>
    </div>
    <p className="text-3xl font-bold text-slate-800">{value}</p>
  </div>
);

export default Dashboard;