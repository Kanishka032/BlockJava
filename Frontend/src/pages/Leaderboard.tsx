import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import {
  Trophy,
  Award,
  Zap,
  Calendar,
  Crown,
  TrendingUp,
  Users,
  GitCommit,
  Circle,
  BarChart3,
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  points: number;
}

interface RankedStudent extends Student {
  rank: number;
}

interface DailyProgress {
  date: string;
  tasksCompleted: number;
}

const Leaderboard: React.FC = () => {
  const navigate = useNavigate();

  const student = useMemo(() => {
    const stored = localStorage.getItem("student");
    return stored ? JSON.parse(stored) : null;
  }, []);

  const [leaderboardData, setLeaderboardData] = useState<RankedStudent[]>([]);
  const [dailyProgress, setDailyProgress] = useState<DailyProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [progressLoading, setProgressLoading] = useState(true);

  const top3 = useMemo(() => leaderboardData.slice(0, 3), [leaderboardData]);

  // const currentUserRank = useMemo(
  //   () => leaderboardData.findIndex((s) => s.id === student?.id) + 1,
  //   [leaderboardData, student?.id]
  // );
const fetchDailyProgress = useCallback(async () => {
  if (!student?.id) return;

  try {
    setProgressLoading(true);
    const res = await fetch(
      `import.meta.env.VITE_API_BASE_URL/api/tasks/students/${student.id}/daily-progress`
    );
    if (!res.ok) throw new Error("Failed to fetch daily progress");

    const rawData = await res.json();

    // Detect type: array-of-arrays or array-of-objects
    const formattedData: DailyProgress[] = rawData.map((item: any) => {
      if (Array.isArray(item)) {
        return { date: item[0], tasksCompleted: item[1] || 0 };
      } else {
        return { date: item.date, tasksCompleted: item.tasksCompleted || 0 };
      }
    });

    console.log("Formatted Progress:", formattedData); // DEBUG
    setDailyProgress(formattedData);
  } catch (err) {
    console.error("Progress Error:", err);
  } finally {
    setProgressLoading(false);
  }
}, [student?.id]);
  const isCurrentUser = (id: string) => id === student?.id;

  // const globalTaskData = useMemo(() => {
  //   if (leaderboardData.length === 0) return [];

  //   return [
  //     {
  //       name: "0-50 pts",
  //       value: leaderboardData.filter((s) => (s.points || 0) <= 50).length,
  //       color: "#EF4444",
  //     },
  //     {
  //       name: "51-200 pts",
  //       value: leaderboardData.filter(
  //         (s) => (s.points || 0) > 50 && (s.points || 0) <= 200
  //       ).length,
  //       color: "#FBBF24",
  //     },
  //     {
  //       name: "201-500 pts",
  //       value: leaderboardData.filter(
  //         (s) => (s.points || 0) > 200 && (s.points || 0) <= 500
  //       ).length,
  //       color: "#10B981",
  //     },
  //     {
  //       name: "500+ pts",
  //       value: leaderboardData.filter((s) => (s.points || 0) > 500).length,
  //       color: "#3B82F6",
  //     },
  //   ];
  // }, [leaderboardData]);

  const fetchLeaderboard = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("import.meta.env.VITE_API_BASE_URL/api/leaderboard/students");
      if (!res.ok) throw new Error("Failed to fetch leaderboard");

      const data: Student[] = await res.json();
      const ranked = data
        .sort((a, b) => (b.points || 0) - (a.points || 0))
        .map((s, idx) => ({
          ...s,
          points: s.points || 0,
          rank: idx + 1,
        }));

      setLeaderboardData(ranked);
    } catch (err) {
      console.error("Leaderboard Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  
  useEffect(() => {
    if (!student) {
      navigate("/login");
      return;
    }

    fetchLeaderboard();
    fetchDailyProgress();
  }, [student?.id, navigate, fetchLeaderboard, fetchDailyProgress]);

  const sortedProgress = useMemo(() => {
    return [...dailyProgress]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-14);
  }, [dailyProgress]);
// const currentUserRank = useMemo(() => {
//   if (!student?.id) return 0;
//   const index = leaderboardData.findIndex((s) => s.id === student.id);
//   return index >= 0 ? index + 1 : 0; // fallback if not found
// }, [leaderboardData, student?.id]);
const currentUserRank = useMemo(() => {
  if (!student?.id) return 0;
  const idx = leaderboardData.findIndex((s) => s.id === student.id);
  return idx >= 0 ? idx + 1 : 0;
}, [leaderboardData, student?.id]);

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

// Safe pie chart
const globalTaskData = useMemo(() => {
  if (!leaderboardData || leaderboardData.length === 0) return [];
  return [
    { name: "0-50 pts", value: leaderboardData.filter((s) => (s.points || 0) <= 50).length, color: "#EF4444" },
    { name: "51-200 pts", value: leaderboardData.filter((s) => (s.points || 0) > 50 && (s.points || 0) <= 200).length, color: "#FBBF24" },
    { name: "201-500 pts", value: leaderboardData.filter((s) => (s.points || 0) > 200 && (s.points || 0) <= 500).length, color: "#10B981" },
    { name: "500+ pts", value: leaderboardData.filter((s) => (s.points || 0) > 500).length, color: "#3B82F6" },
  ];
}, [leaderboardData]);
// const bestDay = useMemo(() => {
//   if (sortedProgress.length === 0) return 0;
//   return Math.max(...sortedProgress.map((d) => d.tasksCompleted || 0));
// }, [sortedProgress]);
// const totalTasks = useMemo(
//   () => sortedProgress.reduce((sum, day) => sum + day.tasksCompleted, 0),
//   [sortedProgress]
// );

// const avgTasks = useMemo(() => {
//   return sortedProgress.length > 0
//     ? Math.round(totalTasks / sortedProgress.length)
//     : 0;
// }, [totalTasks, sortedProgress.length]);
// const bestDay = useMemo(() => {
//   if (sortedProgress.length === 0) return 0;
//   return Math.max(...sortedProgress.map(d => d.tasksCompleted || 0));
// }, [sortedProgress]);
// const avgTasks = useMemo(() => {
//   return sortedProgress.length > 0
//     ? Math.round(totalTasks / sortedProgress.length)
//     : 0;
// }, [totalTasks, sortedProgress.length]);

  return (
    <MainLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Trophy className="w-10 h-10" />
                <h1 className="text-4xl font-bold">Global Leaderboard</h1>
              </div>
              <p className="text-purple-100 flex items-center gap-2">
                <Users className="w-4 h-4" />
                {leaderboardData.length} coders • Live rankings
              </p>
            </div>

            {currentUserRank > 0 && (
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/30">
                <div className="text-sm text-purple-100 mb-1">Your Rank</div>
                <div className="text-3xl font-bold">#{currentUserRank}</div>
              </div>
            )}
          </div>
        </div>

        {/* PODIUM - TOP 3 */}
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-800">
              🥇 TOP 3 Champions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {top3.map((s, idx) => (
              <div
                key={s.id}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  idx === 0
                    ? "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-400 shadow-lg transform scale-105"
                    : idx === 1
                    ? "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-400"
                    : "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-400"
                } ${isCurrentUser(s.id) ? "ring-4 ring-blue-500" : ""}`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">
                    {["🥇", "🥈", "🥉"][idx]}
                  </div>
                  <div className="text-xl font-bold text-gray-800 mb-1">
                    {s.name}
                  </div>
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-700">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    {s.points.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GLOBAL TASK PIE CHART + RANKINGS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* GLOBAL TASK COMPLETION PIE CHART */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                Global Task Completion
              </h2>
            </div>

            <div className="flex flex-col items-center">
              <svg
                viewBox="0 0 200 200"
                className="w-64 h-64 mb-4"
              >
                {globalTaskData.map((slice, idx) => {
                  const prevSum = globalTaskData
                    .slice(0, idx)
                    .reduce((acc, s) => acc + s.value, 0);
                  const total = globalTaskData.reduce(
                    (acc, s) => acc + s.value,
                    0
                  );
                  const startAngle =
                    (prevSum / total) * 2 * Math.PI * -1 + Math.PI * 1.5;
                  const endAngle =
                    ((prevSum + slice.value) / total) * 2 * Math.PI * -1 +
                    Math.PI * 1.5;

                  const x1 = 100 + 75 * Math.cos(startAngle);
                  const y1 = 100 + 75 * Math.sin(startAngle);
                  const x2 = 100 + 75 * Math.cos(endAngle);
                  const y2 = 100 + 75 * Math.sin(endAngle);

                  const largeArc = slice.value > total * 0.25 ? 1 : 0;

                  return (
                    <path
                      key={idx}
                      d={`M 100 100 L ${x1} ${y1} A 75 75 0 ${largeArc} 0 ${x2} ${y2} Z`}
                      fill={slice.color}
                      stroke="white"
                      strokeWidth="2"
                      className="transition-all hover:opacity-80"
                    />
                  );
                })}
                <circle cx="100" cy="100" r="45" fill="white" />
                <text
                  x="100"
                  y="95"
                  textAnchor="middle"
                  className="text-3xl font-bold fill-gray-800"
                >
                  {leaderboardData.length}
                </text>
                <text
                  x="100"
                  y="110"
                  textAnchor="middle"
                  className="text-sm fill-gray-600"
                >
                  Total Coders
                </text>
              </svg>

              {/* LEGEND */}
              <div className="w-full space-y-2">
                {globalTaskData.map((item, idx) => {
                  const total = globalTaskData.reduce(
                    (acc, s) => acc + s.value,
                    0
                  );
                  const percentage = Math.round((item.value / total) * 100);

                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-medium text-gray-700">
                          {item.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-800">
                          {item.value} students
                        </div>
                        <div className="text-xs text-gray-500">
                          {percentage}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* FULL RANKINGS */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                Full Rankings ({leaderboardData.length} total)
              </h2>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {loading ? (
                <div className="text-center py-12 text-gray-500">
                  Loading rankings...
                </div>
              ) : (
                <div>
                  {leaderboardData.slice(0, 20).map((s) => (
                    <div
                      key={s.id}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                        isCurrentUser(s.id)
                          ? "bg-blue-50 border-2 border-blue-400 shadow-md"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            s.rank === 1
                              ? "bg-yellow-400 text-yellow-900"
                              : s.rank === 2
                              ? "bg-gray-300 text-gray-800"
                              : s.rank === 3
                              ? "bg-orange-400 text-orange-900"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          #{s.rank}
                        </div>
                        <span
                          className={`font-semibold ${
                            isCurrentUser(s.id)
                              ? "text-blue-700"
                              : "text-gray-800"
                          }`}
                        >
                          {s.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 font-bold text-gray-700">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        {s.points.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DAILY PROGRESS */}
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              Your Progress (Last 14 Days)
            </h2>
          </div>

          {progressLoading ? (
            <div className="text-center py-12 text-gray-500">
              Loading your progress...
            </div>
          ) : sortedProgress.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📊</div>
              <div className="text-xl font-semibold text-gray-700 mb-2">
                No tasks completed yet
              </div>
              <div className="text-gray-500">
                Start solving problems to see your progress! 💻
              </div>
            </div>
          ) : (
            <div>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl border border-blue-200">
                  <div className="text-2xl font-bold text-blue-700 mb-1">
                    {sortedProgress.length}
                  </div>
                  <div className="text-sm text-blue-600">Active Days</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-xl border border-green-200">
                  <div className="text-2xl font-bold text-green-700 mb-1">
                    {totalTasks}
                  </div>
                  <div className="text-sm text-green-600">Total Tasks</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-xl border border-purple-200">
                  <div className="text-2xl font-bold text-purple-700 mb-1">
                    {bestDay}
                  </div>
                  <div className="text-sm text-purple-600">Best Day</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-xl border border-orange-200">
                  <div className="text-2xl font-bold text-orange-700 mb-1">
                    {avgTasks}
                  </div>
                  <div className="text-sm text-orange-600">Avg Per Day</div>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm font-semibold text-gray-600 mb-3">
                  Daily Tasks <span className="text-gray-400">→ Most recent</span>
                </div>

                <div className="flex items-end justify-between gap-2 h-48">
                  {sortedProgress.map((day, idx) => {
                    const date = new Date(day.date);
                    const dayName = date.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    });
                    const percentage = Math.min(
                      (day.tasksCompleted / Math.max(bestDay, 1)) * 100,
                      100
                    );

                    return (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col items-center group"
                      >
                        <div className="relative w-full mb-2">
                          <div className="text-xs font-semibold text-gray-700 text-center mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {day.tasksCompleted}
                          </div>
                          <div
                            className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-700 hover:to-blue-500 cursor-pointer"
                            style={{
                              height: `${Math.max(percentage, 5)}%`,
                              minHeight: "8px",
                            }}
                          />
                        </div>
                        <div className="text-[10px] text-gray-500 text-center leading-tight max-w-[60px] line-clamp-2">
                          {dayName}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Leaderboard;