"use client";

import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle
} from "lucide-react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>("todo");

  // Todo
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoInput, setTodoInput] = useState<string>("");

  // Pomodoro
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Converter
  const [inputValue, setInputValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("meter");
  const [toUnit, setToUnit] = useState<string>("kilometer");
  const [result, setResult] = useState<string>("");

  // Derivative
  const [derivativeInput, setDerivativeInput] = useState<string>("");
  const [derivativeResult, setDerivativeResult] = useState<string>("");

  // Integral
  const [integralInput, setIntegralInput] = useState<string>("");
  const [integralResult, setIntegralResult] = useState<string>("");

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsRunning(false);
          } else {
            setMinutes((m) => m - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((s) => s - 1);
        }
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, seconds, minutes]);

  // Todo functions
  const addTodo = () => {
    if (!todoInput.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: todoInput, completed: false }
    ]);
    setTodoInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // Converter
  const convertUnits = () => {
    const value = Number(inputValue);
    if (isNaN(value)) {
      setResult("");
      return;
    }

    const factors: Record<string, number> = {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100
    };

    const from = factors[fromUnit];
    const to = factors[toUnit];
    const output = (value / from) * to;

    setResult(output.toFixed(4));
  };

  // Derivative
  const calculateDerivative = () => {
    if (derivativeInput.includes("x^2")) {
      setDerivativeResult("2x");
    } else {
      setDerivativeResult("يرجى إدخال دالة صحيحة");
    }
  };

  // Integral
  const calculateIntegral = () => {
    if (integralInput.includes("x^2")) {
      setIntegralResult("x^3 / 3 + C");
    } else {
      setIntegralResult("يرجى إدخال دالة صحيحة");
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-10">
        Math & CS Dashboard
      </h1>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {["todo", "pomodoro", "converter", "derivative", "integral"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {activeTab === "todo" && (
        <div>
          <div className="flex gap-2 mb-4">
            <input
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              className="bg-gray-800 p-2 flex-1"
              placeholder="أضف مهمة جديدة"
            />
            <button
              onClick={addTodo}
              className="bg-green-600 px-4 py-2 rounded"
            >
              <Plus />
            </button>
          </div>

          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 mb-2"
            >
              <button onClick={() => toggleTodo(todo.id)}>
                <CheckCircle />
              </button>
              <span className={todo.completed ? "line-through" : ""}>
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>
                <Trash2 />
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === "pomodoro" && (
        <div className="text-center">
          <div className="text-6xl font-mono mb-6">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </div>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="bg-green-600 px-6 py-2 rounded"
            >
              {isRunning ? <Pause /> : <Play />}
            </button>
            <button
              onClick={() => {
                setMinutes(25);
                setSeconds(0);
                setIsRunning(false);
              }}
              className="bg-gray-700 px-6 py-2 rounded"
            >
              <RotateCcw />
            </button>
          </div>
        </div>
      )}

      {activeTab === "converter" && (
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-gray-800 p-2"
            />

            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="bg-gray-800 p-2"
            >
              <option value="meter">Meter</option>
              <option value="kilometer">Kilometer</option>
              <option value="centimeter">Centimeter</option>
            </select>

            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="bg-gray-800 p-2"
            >
              <option value="meter">Meter</option>
              <option value="kilometer">Kilometer</option>
              <option value="centimeter">Centimeter</option>
            </select>
          </div>

          <button
            onClick={convertUnits}
            className="bg-blue-600 px-6 py-2 rounded"
          >
            تحويل
          </button>

          {result && (
            <div className="mt-4 text-xl font-bold">
              النتيجة: {result}
            </div>
          )}
        </div>
      )}

      {activeTab === "derivative" && (
        <div>
          <input
            value={derivativeInput}
            onChange={(e) => setDerivativeInput(e.target.value)}
            className="bg-gray-800 p-2 w-full"
            placeholder="مثال: x^2"
          />
          <button
            onClick={calculateDerivative}
            className="bg-pink-600 px-6 py-2 mt-4 rounded"
          >
            حساب المشتقة
          </button>

          {derivativeResult && (
            <div className="mt-4 text-lg">
              النتيجة: {derivativeResult}
            </div>
          )}
        </div>
      )}

      {activeTab === "integral" && (
        <div>
          <input
            value={integralInput}
            onChange={(e) => setIntegralInput(e.target.value)}
            className="bg-gray-800 p-2 w-full"
            placeholder="مثال: x^2"
          />
          <button
            onClick={calculateIntegral}
            className="bg-purple-600 px-6 py-2 mt-4 rounded"
          >
            حساب التكامل
          </button>

          {integralResult && (
            <div className="mt-4 text-lg">
              النتيجة: {integralResult}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
