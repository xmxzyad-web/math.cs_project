"use client";

import React, { useState, useEffect } from "react";
import {
  Calculator,
  CheckCircle,
  Clock,
  Code,
  Play,
  Pause,
  RotateCcw,
  Trash2,
  Plus,
  BookOpen,
  Sigma,
  TrendingUp,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("todo");

  // To-Do LIST
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Pomodoro
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("work");

  const modes = {
    work: { label: "🎯 وقت العمل", color: "text-red-400" },
    break: { label: "☕ استراحة قصيرة", color: "text-green-400" },
    long: { label: "🌟 استراحة طويلة", color: "text-blue-400" },
  };

  // CONVERTER
  const [val, setVal] = useState("");
  const [result, setResult] = useState("");

  // PYTHON DEMO
  const [py, setPy] = useState(`print("Hello")`);
  const [pyOut, setPyOut] = useState("");

  // DERIVATIVE / INTEGRAL
  const [dIn, setDIn] = useState("");
  const [dOut, setDOut] = useState("");

  const [iIn, setIIn] = useState("");
  const [iOut, setIOut] = useState("");

  // -------------------------
  // Pomodoro Effect
  // -------------------------
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s === 0) {
          setMinutes((m) => {
            if (m === 0) {
              setIsActive(false);
              setMode(mode === "work" ? "break" : "work");
              return mode === "work" ? 5 : 25;
            }
            return m - 1;
          });
          return 59;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, mode]);

  // -------------------------
  // Converter Simple Demo
  // -------------------------
  const convert = () => {
    if (!val) return setResult("");
    setResult((parseFloat(val) * 1000).toString() + " mm");
  };

  // -------------------------
  // Simulated Python Runner
  // -------------------------
  const runPy = () => {
    const lines = py.split("\n");
    let out = "";

    lines.forEach((line) => {
      if (line.startsWith("print(")) {
        let x = line.replace("print(", "").replace(")", "");
        x = x.replace(/["']/g, "");
        out += x + "\n";
      }
    });

    setPyOut(out || "✓ Executed");
  };

  // -------------------------
  // Derivative Demo
  // -------------------------
  const calcD = () => {
    if (dIn.includes("x^2")) setDOut("2x");
    else if (dIn.includes("x^3")) setDOut("3x²");
    else setDOut("مش قادر أفهم الدالة");
  };

  // -------------------------
  // Integration Demo
  // -------------------------
  const calcI = () => {
    if (iIn.includes("x^2")) setIOut("x³/3 + C");
    else if (iIn.includes("x^3")) setIOut("x⁴/4 + C");
    else setIOut("مش قادر أفهم الدالة");
  };

  // -------------------------
  // Tabs COLORS (No Dynamic Tailwind)
  // -------------------------
  const tabColor = {
    todo: "from-green-500 to-emerald-500",
    pomodoro: "from-orange-500 to-red-500",
    python: "from-blue-500 to-cyan-500",
    converter: "from-cyan-500 to-blue-500",
    derivative: "from-pink-500 to-purple-500",
    integral: "from-violet-500 to-indigo-500",
    formulas: "from-yellow-500 to-orange-500",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6" dir="rtl">
      <div className="text-center mb-10">
        <div className="text-gray-300 flex items-center justify-center gap-2 mb-3">
          <Zap /> مشروع سنة أولى (Math & CS)
        </div>
        <h1 className="text-4xl font-black text-white">أدوات دراسية + برمجية</h1>
      </div>

      {/* ---------------- Tabs Buttons ---------------- */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {[
          ["todo", "المهام", CheckCircle],
          ["pomodoro", "بومودورو", Clock],
          ["python", "Python", Code],
          ["converter", "المحول", Calculator],
          ["derivative", "الاشتقاق", TrendingUp],
          ["integral", "التكامل", Sigma],
          ["formulas", "القوانين", BookOpen],
        ].map(([id, label, Icon]) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-5 py-3 flex items-center gap-2 rounded-xl font-bold transition ${
              activeTab === id
                ? `bg-gradient-to-r ${tabColor[id]} text-white shadow-xl`
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </div>

      {/* ---------------- CONTENT ---------------- */}
      <div className="max-w-4xl mx-auto bg-white/5 p-6 rounded-2xl border border-white/10">

        {/* ---------------- To-Do ---------------- */}
        {activeTab === "todo" && (
          <>
            <h2 className="text-2xl font-bold mb-4">قائمة المهام</h2>
            <div className="flex gap-3 mb-4">
              <input
                className="flex-1 bg-white/10 p-2 rounded-md text-white"
                placeholder="مهمة جديدة..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
              <button
                onClick={() => {
                  if (!newTodo.trim()) return;
                  setTodos([...todos, { id: Date.now(), text: newTodo }]);
                  setNewTodo("");
                }}
                className="px-4 bg-green-500 rounded-md text-white"
              >
                إضافة
              </button>
            </div>

            <div className="space-y-3">
              {todos.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between bg-white/10 p-3 rounded-md"
                >
                  <span className="text-white">{t.text}</span>
                  <button
                    onClick={() =>
                      setTodos(todos.filter((x) => x.id !== t.id))
                    }
                    className="text-red-400"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ---------------- Pomodoro ---------------- */}
        {activeTab === "pomodoro" && (
          <>
            <h2 className="text-2xl font-bold mb-4">مؤقت بومودورو</h2>

            <div className={`text-xl mb-3 ${modes[mode].color}`}>
              {modes[mode].label}
            </div>

            <div className="text-6xl text-center font-mono text-white mb-4">
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setIsActive(!isActive)}
                className="px-6 py-2 bg-green-500 rounded-xl text-white"
              >
                {isActive ? <Pause /> : <Play />}
              </button>
              <button
                onClick={() => {
                  setIsActive(false);
                  setMinutes(mode === "work" ? 25 : 5);
                  setSeconds(0);
                }}
                className="px-6 py-2 bg-white/20 rounded-xl text-white"
              >
                <RotateCcw />
              </button>
            </div>
          </>
        )}

        {/* ---------------- Converter ---------------- */}
        {activeTab === "converter" && (
          <>
            <h2 className="text-2xl font-bold mb-4">محول وحدات</h2>
            <input
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="أدخل رقم..."
              className="w-full p-2 bg-white/10 text-white rounded-md mb-4"
            />
            <button
              onClick={convert}
              className="px-4 py-2 bg-cyan-500 text-white rounded-md mb-3"
            >
              تحويل
            </button>
            <div className="text-xl text-white">
              {result || "---"}
            </div>
          </>
        )}

        {/* ---------------- Python ---------------- */}
        {activeTab === "python" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Python Editor</h2>
            <textarea
              value={py}
              onChange={(e) => setPy(e.target.value)}
              className="w-full h-40 bg-black text-green-400 p-3 rounded-md font-mono"
            />
            <button
              onClick={runPy}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Run
            </button>
            <pre className="bg-black/60 text-white p-3 rounded-md mt-3 whitespace-pre-wrap">
              {pyOut}
            </pre>
          </>
        )}

        {/* ---------------- Derivative ---------------- */}
        {activeTab === "derivative" && (
          <>
            <h2 className="text-2xl font-bold mb-4">الاشتقاق</h2>
            <input
              value={dIn}
              onChange={(e) => setDIn(e.target.value)}
              placeholder="مثال: x^2"
              className="w-full p-2 bg-white/10 text-white rounded-md mb-4"
            />
            <button
              onClick={calcD}
              className="px-4 py-2 bg-pink-500 text-white rounded-md"
            >
              اشتقّ
            </button>
            <div className="text-xl text-white mt-4">
              {dOut}
            </div>
          </>
        )}

        {/* ---------------- Integral ---------------- */}
        {activeTab === "integral" && (
          <>
            <h2 className="text-2xl font-bold mb-4">التكامل</h2>
            <input
              value={iIn}
              onChange={(e) => setIIn(e.target.value)}
              placeholder="مثال: x^3"
              className="w-full p-2 bg-white/10 text-white rounded-md mb-4"
            />
            <button
              onClick={calcI}
              className="px-4 py-2 bg-purple-500 text-white rounded-md"
            >
              أكمل
            </button>
            <div className="text-xl text-white mt-4">
              {iOut}
            </div>
          </>
        )}

        {/* ---------------- Formulas ---------------- */}
        {activeTab === "formulas" && (
          <>
            <h2 className="text-2xl font-bold mb-4">القوانين الأساسية</h2>

            <div className="grid gap-4">
              <div className="p-4 bg-white/10 rounded-md text-white">
                • مشتقة xⁿ = n xⁿ⁻¹  
              </div>
              <div className="p-4 bg-white/10 rounded-md text-white">
                • ∫ xⁿ dx = xⁿ⁺¹ / (n+1) + C
              </div>
              <div className="p-4 bg-white/10 rounded-md text-white">
                • sin, cos, tan جداول أساسية…
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
