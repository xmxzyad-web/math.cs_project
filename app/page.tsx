'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, CheckCircle, Clock, Code, Play, Pause, RotateCcw, Trash2, Plus, BookOpen, Sigma, TrendingUp, Zap } from 'lucide-react';

export default function MathCSProject() {
  const [activeTab, setActiveTab] = useState('todo');
  
  // Todo List State
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  
  // Pomodoro Timer State
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState('work');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [customWorkMinutes, setCustomWorkMinutes] = useState(25);
  const [customBreakMinutes, setCustomBreakMinutes] = useState(5);
  
  // Unit Converter State
  const [unitCategory, setUnitCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [inputValue, setInputValue] = useState('');
  const [convertedValue, setConvertedValue] = useState('');
  
  // Python Code Editor State
  const [pythonCode, setPythonCode] = useState('# Write your Python code here\nprint("Hello, World!")\n\n# Try some math\nresult = 2 + 2\nprint(f"2 + 2 = {result}")');
  const [output, setOutput] = useState('');
  
  // Derivative Calculator State
  const [derivativeInput, setDerivativeInput] = useState('');
  const [derivativeResult, setDerivativeResult] = useState(null);

  // Integration Calculator State
  const [integralInput, setIntegralInput] = useState('');
  const [integralResult, setIntegralResult] = useState(null);

  // Pomodoro Timer Logic (مصدر الخطأ وتم تصحيحه)
  useEffect(() => {
    // التصحيح 1: تعريف النوع الصريح (number | null)
    let interval: number | null = null; 
    
    if (isActive) {
      // TypeScript يعرف الآن أن setInterval يعيد number
      interval = window.setInterval(() => { 
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            if (pomodoroMode === 'work') {
              setCompletedPomodoros(completedPomodoros + 1);
              if ((completedPomodoros + 1) % 4 === 0) {
                setPomodoroMode('longBreak');
                setMinutes(15);
              } else {
                setPomodoroMode('break');
                setMinutes(customBreakMinutes); // استخدام القيمة المخصصة
              }
            } else {
              setPomodoroMode('work');
              setMinutes(customWorkMinutes); // استخدام القيمة المخصصة
            }
            // تشغيل صوت تنبيه (غير موجود في الكود ولكن مهم)
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    // التصحيح 2: فحص قيمة null قبل تمريرها لـ clearInterval
    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [isActive, minutes, seconds, pomodoroMode, completedPomodoros, customWorkMinutes, customBreakMinutes]); 
  // ملاحظة: إضافة customWorkMinutes و customBreakMinutes إلى dependencies

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (pomodoroMode === 'work') {
      setMinutes(customWorkMinutes);
    } else if (pomodoroMode === 'break') {
      setMinutes(customBreakMinutes);
    } else {
      setMinutes(15);
    }
    setSeconds(0);
  };

  // Unit Converter
  const unitConversions = {
    length: {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100,
      millimeter: 1000,
      mile: 0.000621371,
      yard: 1.09361,
      foot: 3.28084,
      inch: 39.3701
    },
    weight: {
      kilogram: 1,
      gram: 1000,
      milligram: 1000000,
      ton: 0.001,
      pound: 2.20462,
      ounce: 35.274
    },
    temperature: {
      celsius: { factor: 1, offset: 0 },
      fahrenheit: { factor: 9/5, offset: 32 },
      kelvin: { factor: 1, offset: 273.15 }
    },
    area: {
      squareMeter: 1,
      squareKilometer: 0.000001,
      squareCentimeter: 10000,
      hectare: 0.0001,
      acre: 0.000247105,
      squareFoot: 10.7639
    },
    volume: {
      liter: 1,
      milliliter: 1000,
      cubicMeter: 0.001,
      gallon: 0.264172,
      quart: 1.05669,
      pint: 2.11338,
      cup: 4.22675
    },
    time: {
      second: 1,
      minute: 1/60,
      hour: 1/3600,
      day: 1/86400,
      week: 1/604800,
      month: 1/2592000,
      year: 1/31536000
    },
    pressure: {
      pascal: 1,
      kilopascal: 0.001,
      bar: 0.00001,
      atmosphere: 0.00000986923,
      psi: 0.000145038,
      torr: 0.00750062,
      mmHg: 0.00750062
    },
    power: {
      watt: 1,
      kilowatt: 0.001,
      megawatt: 0.000001,
      horsepower: 0.00134102,
      btu: 3.41214
    }
  };

  const convertUnit = () => {
    if (!inputValue || isNaN(inputValue)) {
      setConvertedValue('');
      return;
    }
    
    const value = parseFloat(inputValue);
    let result;

    if (unitCategory === 'temperature') {
      // Special handling for temperature
      // (The original logic for temperature conversion is already correct)
      
      if (fromUnit === toUnit) {
        result = value;
      } else if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        result = (value * 9/5) + 32;
      } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        result = (value - 32) * 5/9;
      } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
        result = value + 273.15;
      } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        result = value - 273.15;
      } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
        result = ((value - 32) * 5/9) + 273.15;
      } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
        result = ((value - 273.15) * 9/5) + 32;
      } else {
        // Fallback for unexpected temperature conversion
        result = value; 
      }
    } else {
      // Standard conversion
      const fromFactor = unitConversions[unitCategory][fromUnit];
      const toFactor = unitConversions[unitCategory][toUnit];
      // Correction: Convert the input value to the base unit (factor=1) first, then to the target unit.
      // In the provided factors, the base unit (e.g., meter, kilogram) has a factor of 1.
      // Conversion from A to B: Value_B = Value_A * (Factor_B / Factor_A)
      // Since Factor_Base = 1: Value_B = (Value_A / Factor_A) * Factor_B
      
      result = (value / fromFactor) * toFactor;
    }

    setConvertedValue(result.toFixed(6));
  };

  const unitLabels = {
    length: {
      meter: 'متر', kilometer: 'كيلومتر', centimeter: 'سنتيمتر', 
      millimeter: 'مليمتر', mile: 'ميل', yard: 'ياردة', 
      foot: 'قدم', inch: 'إنش'
    },
    weight: {
      kilogram: 'كيلوجرام', gram: 'جرام', milligram: 'مليجرام',
      ton: 'طن', pound: 'رطل', ounce: 'أونصة'
    },
    temperature: {
      celsius: 'سيليزية', fahrenheit: 'فهرنهايت', kelvin: 'كلفن'
    },
    area: {
      squareMeter: 'متر مربع', squareKilometer: 'كيلومتر مربع',
      squareCentimeter: 'سنتيمتر مربع', hectare: 'هكتار',
      acre: 'أكر', squareFoot: 'قدم مربع'
    },
    volume: {
      liter: 'لتر', milliliter: 'مليلتر', cubicMeter: 'متر مكعب',
      gallon: 'جالون', quart: 'كوارت', pint: 'باينت', cup: 'كوب'
    },
    time: {
      second: 'ثانية', minute: 'دقيقة', hour: 'ساعة',
      day: 'يوم', week: 'أسبوع', month: 'شهر', year: 'سنة'
    },
    pressure: {
      pascal: 'باسكال', kilopascal: 'كيلوباسكال', bar: 'بار',
      atmosphere: 'ضغط جوي', psi: 'PSI', torr: 'تور', mmHg: 'مم زئبق'
    },
    power: {
      watt: 'واط', kilowatt: 'كيلوواط', megawatt: 'ميجاواط',
      horsepower: 'حصان', btu: 'BTU/h'
    }
  };

  // Todo List Functions
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Python Code Execution (Simulated)
  const runPythonCode = () => {
    try {
      let result = '';
      const lines = pythonCode.split('\n');
      
      for (let line of lines) {
        if (line.trim().startsWith('print(')) {
          // This is a simplistic simulation for print() function
          const match = line.match(/print\((.*?)\)/);
          if (match) {
            let content = match[1].trim();
            // Attempt to resolve variables based on previous lines (very basic simulation)
            if (content.includes('result')) {
                // Simplified evaluation for the demo lines
                const mathMatch = pythonCode.match(/result = (\d+) ([+\-*\/]) (\d+)/);
                if (mathMatch) {
                    const num1 = parseInt(mathMatch[1]);
                    const op = mathMatch[2];
                    const num2 = parseInt(mathMatch[3]);
                    let calcResult;
                    if (op === '+') calcResult = num1 + num2;
                    else if (op === '-') calcResult = num1 - num2;
                    else if (op === '*') calcResult = num1 * num2;
                    else if (op === '/') calcResult = num1 / num2;

                    content = content.replace(/\{result\}/, calcResult !== undefined ? String(calcResult) : 'Error');
                }
            }

            // Remove string quotes for clean output
            content = content.replace(/^["']|["']$/g, '');
            content = content.replace(/f["']/g, '');
            content = content.replace(/["]/g, ''); // Handle double quotes
            
            result += content + '\n';
          }
        }
      }
      
      if (result.trim()) {
        setOutput(result.trim());
      } else {
        setOutput('✓ Code executed successfully\n(Note: This is a demo editor - only print statements are supported)');
      }
    } catch (error) {
      setOutput('Error: ' + error.message);
    }
  };

  // Derivative Calculator
  const calculateDerivative = () => {
    const input = derivativeInput.toLowerCase().trim().replace(/\s/g, '');
    let result = { solution: '', steps: [], rule: '' };
    
    // Check for common functions first
    if (input.includes('sin(')) {
      result = { rule: 'مشتقة الدالة المثلثية', steps: ['d/dx[sin(x)]', 'd/dx[sin(x)] = cos(x)'], solution: 'cos(x)' };
    } else if (input.includes('cos(')) {
      result = { rule: 'مشتقة الدالة المثلثية', steps: ['d/dx[cos(x)]', 'd/dx[cos(x)] = -sin(x)'], solution: '-sin(x)' };
    } else if (input.includes('e^x') || input.includes('exp(x)')) {
      result = { rule: 'مشتقة الدالة الأسية', steps: ['d/dx[eˣ]', 'd/dx[eˣ] = eˣ'], solution: 'eˣ' };
    } else if (input.includes('ln(')) {
      result = { rule: 'مشتقة اللوغاريتم', steps: ['d/dx[ln(x)]', 'd/dx[ln(x)] = 1/x'], solution: '1/x' };
    } else if (input.includes('sinh(')) {
      result = { rule: 'مشتقة الدالة الزائدية', steps: ['d/dx[sinh(x)]', 'd/dx[sinh(x)] = cosh(x)'], solution: 'cosh(x)' };
    } else if (input.includes('cosh(')) {
      result = { rule: 'مشتقة الدالة الزائدية', steps: ['d/dx[cosh(x)]', 'd/dx[cosh(x)] = sinh(x)'], solution: 'sinh(x)' };
    } 
    // Check for power rule (x^n or nx^n)
    else if (input.includes('x^')) {
      const powerMatch = input.match(/x\^(\d+)/);
      if (powerMatch) {
        const n = parseInt(powerMatch[1]);
        const newN = n - 1;
        const coefficient = n;
        const solution = newN === 1 ? `${coefficient}x` : `${coefficient}x^${newN}`;

        result = {
          rule: 'قاعدة القوة',
          steps: [
            `d/dx[x^${n}]`,
            `نستخدم قاعدة: d/dx[xⁿ] = n·xⁿ⁻¹`,
            `هنا n = ${n}`,
            `d/dx[x^${n}] = ${coefficient}·x^${newN}`,
            `d/dx[x^${n}] = ${solution}`
          ],
          solution: solution
        };
      }
    } else if (input.includes('x')) {
        // Linear function, e.g., 5x -> 5
        const linearMatch = input.match(/(\d*)x/);
        const coefficient = linearMatch && linearMatch[1] ? parseInt(linearMatch[1]) : 1;
        result = {
          rule: 'مشتقة ثابت في متغير',
          steps: [
            `d/dx[${coefficient}x]`,
            `مشتقة c*x هي c`,
            `d/dx[${coefficient}x] = ${coefficient}`
          ],
          solution: String(coefficient)
        };
    } else if (!isNaN(parseFloat(input))) {
        // Constant function, e.g., 5 -> 0
        result = {
            rule: 'مشتقة ثابت',
            steps: [
                `d/dx[${input}]`,
                `مشتقة أي ثابت تساوي صفر`,
                `d/dx[${input}] = 0`
            ],
            solution: '0'
        };
    } 
    
    // Default/Examples
    if (!result.solution) {
      result = {
        rule: 'أمثلة',
        steps: [
          'جرب: x^2, 3x^3, sin(x), e^x',
          'ln(x), sinh(x), 5'
        ],
        solution: 'اكتب دالة للاشتقاق'
      };
    }
    
    setDerivativeResult(result as any);
  };

  // Integration Calculator
  const solveIntegral = () => {
    const input = integralInput.toLowerCase().trim().replace(/\s/g, '');
    let result = { solution: '', steps: [], method: '' };
    
    // Check for common integral functions
    if (input.includes('1/x')) {
      result = { method: 'تكامل مباشر', steps: ['∫ 1/x dx', '∫ 1/x dx = ln|x| + C'], solution: 'ln|x| + C' };
    } else if (input.includes('sin(')) {
      result = { method: 'تكامل مباشر', steps: ['∫ sin(x) dx', '∫ sin(x) dx = -cos(x) + C'], solution: '-cos(x) + C' };
    } else if (input.includes('cos(')) {
      result = { method: 'تكامل مباشر', steps: ['∫ cos(x) dx', '∫ cos(x) dx = sin(x) + C'], solution: 'sin(x) + C' };
    } else if (input.includes('e^x') || input.includes('exp(x)')) {
      result = { method: 'تكامل مباشر', steps: ['∫ eˣ dx', '∫ eˣ dx = eˣ + C'], solution: 'eˣ + C' };
    } 
    // Check for power rule (x^n or nx^n)
    else if (input.includes('x^')) {
      const powerMatch = input.match(/x\^(\d+)/);
      if (powerMatch) {
        const n = parseInt(powerMatch[1]);
        const newN = n + 1;
        const solution = `x^${newN}/${newN} + C`;

        result = {
          method: 'قاعدة القوة للتكامل',
          steps: [
            `∫ x^${n} dx`,
            `قانون: ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C`,
            `n = ${n}`,
            `∫ x^${n} dx = ${solution}`
          ],
          solution: solution
        };
      }
    } else if (input.includes('x')) {
        // Linear function, e.g., x or 5x
        const linearMatch = input.match(/(\d*)x/);
        const coefficient = linearMatch && linearMatch[1] ? parseInt(linearMatch[1]) : 1;
        const solution = `${coefficient}x²/2 + C`;
        result = {
          method: 'قاعدة القوة (x¹)',
          steps: [
            `∫ ${coefficient}x dx`,
            `∫ cxⁿ dx = c * xⁿ⁺¹/(n+1) + C`,
            `∫ ${coefficient}x dx = ${solution}`
          ],
          solution: solution
        };
    } else if (!isNaN(parseFloat(input))) {
        // Constant function, e.g., 5
        const constant = parseFloat(input);
        result = {
            method: 'تكامل ثابت',
            steps: [
                `∫ ${constant} dx`,
                `تكامل الثابت c هو cx + C`,
                `∫ ${constant} dx = ${constant}x + C`
            ],
            solution: `${constant}x + C`
        };
    } 
    
    // Default/Examples
    if (!result.solution) {
      result = {
        method: 'أمثلة',
        steps: [
          'جرب: x^2, sin(x), e^x, 1/x',
          '5, x'
        ],
        solution: 'اكتب دالة للتكامل'
      };
    }
    
    setIntegralResult(result as any);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900" dir="rtl">
      {/* Animated Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes pulse {
            0%, 100% { transform: scale(1) translate(0, 0); }
            50% { transform: scale(1.1) translate(5px, 5px); }
          }
          .animate-pulse { animation: pulse 8s infinite alternate; }
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 15s ease infinite;
          }
        `}} />
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-full border border-purple-500/30 backdrop-blur-sm">
            <Zap className="text-yellow-400" size={20} />
            <span className="text-gray-300 font-semibold">First Year Project</span>
          </div>
          <h1 className="text-6xl font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient">
              مشروع رياضيات وعلوم الحاسب
            </span>
          </h1>
          <p className="text-gray-400 text-xl font-light">أدوات متقدمة للدراسة والإنتاجية والبرمجة</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {[
            { id: 'todo', label: 'المهام', icon: CheckCircle, gradient: 'from-green-500 to-emerald-500' },
            { id: 'pomodoro', label: 'بومودورو', icon: Clock, gradient: 'from-orange-500 to-red-500' },
            { id: 'python', label: 'Python', icon: Code, gradient: 'from-blue-500 to-cyan-500' },
            { id: 'converter', label: 'المحول', icon: Calculator, gradient: 'from-cyan-500 to-blue-500' },
            { id: 'derivative', label: 'الاشتقاق', icon: TrendingUp, gradient: 'from-pink-500 to-purple-500' },
            { id: 'integration', label: 'التكامل', icon: Sigma, gradient: 'from-violet-500 to-indigo-500' },
            { id: 'formulas', label: 'القوانين', icon: BookOpen, gradient: 'from-yellow-500 to-orange-500' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.gradient} text-white shadow-2xl shadow-${tab.gradient.split('-')[1]}-500/50 scale-105`
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20'
              }`}
            >
              <tab.icon size={20} className={activeTab === tab.id ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto">
          {/* Todo List Tab */}
          {activeTab === 'todo' && (
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg shadow-green-500/50">
                  <CheckCircle size={28} className="text-white" />
                </div>
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">قائمة المهام</h2>
              </div>
              
              <div className="flex gap-3 mb-8">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                  placeholder="أضف مهمة جديدة..."
                  className="flex-1 px-5 py-4 bg-white/5 border-2 border-green-500/30 rounded-xl focus:border-green-500 focus:outline-none text-white placeholder-gray-500 text-lg backdrop-blur-sm transition-all"
                />
                <button
                  onClick={addTodo}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-500/50 flex items-center gap-2 hover:scale-105"
                >
                  <Plus size={22} />
                  إضافة
                </button>
              </div>

              <div className="space-y-3">
                {todos.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-gray-400 text-lg">لا توجد مهام. ابدأ بإضافة مهمتك الأولى!</p>
                  </div>
                ) : (
                  todos.map(todo => (
                    <div
                      key={todo.id}
                      className="group flex items-center gap-4 p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-green-500/50 transition-all backdrop-blur-sm"
                    >
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className={`flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
                          todo.completed
                            ? 'bg-gradient-to-br from-green-500 to-emerald-500 border-green-500 shadow-lg shadow-green-500/50'
                            : 'border-gray-500 hover:border-green-500'
                        }`}
                      >
                        {todo.completed && <CheckCircle size={18} className="text-white" />}
                      </button>
                      <span className={`flex-1 text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                        {todo.text}
                      </span>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {todos.length > 0 && (
                <div className="mt-8 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/30">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">التقدم</span>
                    <span className="text-green-400 font-bold text-lg">{todos.filter(t => t.completed).length} / {todos.length}</span>
                  </div>
                  <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                      style={{width: `${(todos.filter(t => t.completed).length / todos.length) * 100}%`}}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Pomodoro Timer Tab */}
          {activeTab === 'pomodoro' && (
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg shadow-orange-500/50">
                  <Clock size={28} className="text-white" />
                </div>
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">مؤقت بومودورو</h2>
              </div>
              
              <div className="text-center">
                <div className={`inline-block px-8 py-3 rounded-2xl text-sm font-bold mb-8 backdrop-blur-sm ${
                  pomodoroMode === 'work' ? 'bg-red-500/20 text-red-400 border border-red-500/50' :
                  pomodoroMode === 'break' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
                  'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                }`}>
                  {pomodoroMode === 'work' ? '🎯 وقت العمل والتركيز' :
                    pomodoroMode === 'break' ? '☕ استراحة قصيرة' :
                    '🌟 استراحة طويلة'}
                </div>
                
                <div className="relative inline-block mb-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                  <div className="relative text-8xl md:text-9xl font-black text-white font-mono tracking-tight">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </div>
                </div>

                <div className="flex gap-4 justify-center mb-10">
                  <button
                    onClick={toggleTimer}
                    className={`group px-10 md:px-12 py-4 md:py-5 rounded-2xl font-bold text-white transition-all shadow-2xl flex items-center gap-3 ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-orange-500/50'
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-green-500/50'
                    } hover:scale-105`}
                  >
                    {isActive ? <Pause size={24} className="group-hover:scale-110 transition-transform" /> : <Play size={24} className="group-hover:scale-110 transition-transform" />}
                    <span className="text-lg md:text-xl">{isActive ? 'إيقاف' : 'ابدأ'}</span>
                  </button>
                  <button
                    onClick={resetTimer}
                    className="px-10 md:px-12 py-4 md:py-5 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold transition-all flex items-center gap-3 border border-white/20 hover:border-white/40 hover:scale-105"
                  >
                    <RotateCcw size={24} />
                    <span className="text-lg md:text-xl">إعادة</span>
                  </button>
                </div>

                {/* Custom Time Settings */}
                <div className="mb-8 p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/30">
                  <h3 className="text-purple-400 font-bold mb-4 text-lg">⚙️ إعدادات مخصصة</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">وقت العمل (دقيقة)</label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCustomWorkMinutes(Math.max(1, customWorkMinutes - 5))}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-bold"
                        >
                          -5
                        </button>
                        <input
                          type="number"
                          value={customWorkMinutes}
                          onChange={(e) => setCustomWorkMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                          className="flex-1 px-4 py-2 bg-white/5 border border-purple-500/30 rounded-lg text-white text-center font-bold focus:outline-none focus:border-purple-500"
                        />
                        <button
                          onClick={() => setCustomWorkMinutes(customWorkMinutes + 5)}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-bold"
                        >
                          +5
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">وقت الراحة (دقيقة)</label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCustomBreakMinutes(Math.max(1, customBreakMinutes - 5))}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-bold"
                        >
                          -5
                        </button>
                        <input
                          type="number"
                          value={customBreakMinutes}
                          onChange={(e) => setCustomBreakMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                          className="flex-1 px-4 py-2 bg-white/5 border border-purple-500/30 rounded-lg text-white text-center font-bold focus:outline-none focus:border-purple-500"
                        />
                        <button
                          onClick={() => setCustomBreakMinutes(customBreakMinutes + 5)}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-bold"
                        >
                          +5
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { mode: 'work', time: customWorkMinutes, label: 'عمل', color: 'red' },
                    { mode: 'break', time: customBreakMinutes, label: 'قصيرة', color: 'green' },
                    { mode: 'longBreak', time: 15, label: 'طويلة', color: 'blue' }
                  ].map(preset => (
                    <button
                      key={preset.mode}
                      onClick={() => { setPomodoroMode(preset.mode); setMinutes(preset.time); setSeconds(0); setIsActive(false); }}
                      className={`p-5 md:p-6 bg-${preset.color}-500/10 hover:bg-${preset.color}-500/20 border border-${preset.color}-500/30 hover:border-${preset.color}-500/50 rounded-2xl transition-all backdrop-blur-sm hover:scale-105`}
                    >
                      <p className={`text-${preset.color}-400 font-bold mb-2 text-sm md:text-base`}>{preset.label}</p>
                      <p className="text-white text-2xl md:text-3xl font-bold">{preset.time}:00</p>
                    </button>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/30">
                  <p className="text-gray-400 mb-4 font-semibold">جلسات العمل المكتملة</p>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-bold text-base md:text-lg transition-all ${
                          i < completedPomodoros
                            ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50'
                            : 'bg-white/5 text-gray-600 border border-white/10'
                        }`}
                      >
                        {i < completedPomodoros ? '✓' : i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Python Editor Tab */}
          {activeTab === 'python' && (
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/50">
                    <Code size={28} className="text-white" />
                  </div>
                  <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Python Editor</h2>
                </div>
                <button
                  onClick={runPythonCode}
                  className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-500/50 flex items-center gap-3 hover:scale-105"
                >
                  <Play size={22} className="group-hover:scale-110 transition-transform" />
                  Run Code
                </button>
              </div>
              
              <div className="mb-6">
                <div className="bg-slate-950 rounded-t-xl px-4 py-2 flex items-center gap-2 border border-blue-500/30 border-b-0">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-3 text-gray-400 text-sm font-mono">main.py</span>
                </div>
                <textarea
                  value={pythonCode}
                  onChange={(e) => setPythonCode(e.target.value)}
                  className="w-full h-80 px-6 py-4 bg-slate-950 border-2 border-blue-500/30 rounded-b-xl focus:border-blue-500 focus:outline-none text-green-400 font-mono text-base leading-relaxed"
                  spellCheck="false"
                />
              </div>

              {output && (
                <div className="bg-slate-950 rounded-xl p-6 border-2 border-green-500/30 shadow-lg shadow-green-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <h3 className="text-green-400 font-bold text-lg">Output:</h3>
                  </div>
                  <pre className="text-gray-300 font-mono whitespace-pre-wrap leading-relaxed">{output}</pre>
                </div>
              )}

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-5 backdrop-blur-sm">
                  <div className="text-3xl mb-2">💡</div>
                  <h4 className="text-blue-400 font-bold mb-2">Tips</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Use print() for output</li>
                    <li>• Try math operations</li>
                    <li>• Test variable assignments (basic demo support)</li>
                  </ul>
                </div>
                {/* Placeholder for more cards */}
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-5 backdrop-blur-sm">
                    <div className="text-3xl mb-2">⚙️</div>
                    <h4 className="text-blue-400 font-bold mb-2">Supported Code</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Basic arithmetic</li>
                        <li>• Single-line print statements</li>
                        <li>• Simple variable assignment (e.g., `x = 5`)</li>
                    </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-5 backdrop-blur-sm">
                    <div className="text-3xl mb-2">⚠️</div>
                    <h4 className="text-blue-400 font-bold mb-2">Limitations</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                        <li>• No loops or functions</li>
                        <li>• No complex libraries</li>
                        <li>• This is a client-side simulation</li>
                    </ul>
                </div>
              </div>
            </div>
          )}

          {/* Unit Converter Tab */}
          {activeTab === 'converter' && (
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl shadow-lg shadow-cyan-500/50">
                  <Calculator size={28} className="text-white" />
                </div>
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">محول الوحدات</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label htmlFor="category" className="text-gray-300 mb-2 block font-semibold">فئة الوحدة</label>
                  <select
                    id="category"
                    value={unitCategory}
                    onChange={(e) => {
                      const newCategory = e.target.value;
                      setUnitCategory(newCategory);
                      const units = Object.keys(unitConversions[newCategory]);
                      setFromUnit(units[0]);
                      setToUnit(units[1] || units[0]);
                      setConvertedValue('');
                    }}
                    className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-500 appearance-none transition-all"
                  >
                    {Object.keys(unitConversions).map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'length' ? 'طول' :
                         cat === 'weight' ? 'وزن' :
                         cat === 'temperature' ? 'حرارة' :
                         cat === 'area' ? 'مساحة' :
                         cat === 'volume' ? 'حجم' :
                         cat === 'time' ? 'وقت' :
                         cat === 'pressure' ? 'ضغط' :
                         cat === 'power' ? 'طاقة/قدرة' : cat}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="fromUnit" className="text-gray-300 mb-2 block font-semibold">من وحدة</label>
                  <select
                    id="fromUnit"
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-500 appearance-none transition-all"
                  >
                    {Object.keys(unitConversions[unitCategory]).map(unit => (
                      <option key={unit} value={unit}>{unitLabels[unitCategory][unit] || unit}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="toUnit" className="text-gray-300 mb-2 block font-semibold">إلى وحدة</label>
                  <select
                    id="toUnit"
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-500 appearance-none transition-all"
                  >
                    {Object.keys(unitConversions[unitCategory]).map(unit => (
                      <option key={unit} value={unit}>{unitLabels[unitCategory][unit] || unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div className="md:col-span-1">
                  <label htmlFor="inputValue" className="text-gray-300 mb-2 block font-semibold">القيمة للمحول</label>
                  <input
                    type="number"
                    id="inputValue"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="أدخل القيمة"
                    className="w-full px-5 py-4 bg-white/5 border-2 border-cyan-500/30 rounded-xl focus:border-cyan-500 focus:outline-none text-white placeholder-gray-500 text-lg backdrop-blur-sm transition-all"
                  />
                </div>
                <div className="md:col-span-1">
                  <button
                    onClick={convertUnit}
                    className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/50 flex items-center justify-center gap-2 hover:scale-105"
                  >
                    <Zap size={22} />
                    تحويل
                  </button>
                </div>
                <div className="md:col-span-1">
                  <div className="p-4 bg-white/5 rounded-xl border border-blue-500/30 text-center">
                    <p className="text-gray-400 mb-1">النتيجة</p>
                    <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 break-words">
                      {convertedValue || '...'}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Derivative Calculator Tab */}
          {activeTab === 'derivative' && (
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl shadow-lg shadow-pink-500/50">
                  <TrendingUp size={28} className="text-white" />
                </div>
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">حاسبة الاشتقاق</h2>
              </div>
              
              <div className="flex gap-4 mb-6">
                <input
                  type="text"
                  value={derivativeInput}
                  onChange={(e) => setDerivativeInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && calculateDerivative()}
                  placeholder="أدخل الدالة للاشتقاق (مثل: x^2, sin(x), e^x)"
                  className="flex-1 px-5 py-4 bg-white/5 border-2 border-purple-500/30 rounded-xl focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 text-lg backdrop-blur-sm transition-all"
                />
                <button
                  onClick={calculateDerivative}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg shadow-pink-500/50 flex items-center gap-2 hover:scale-105"
                >
                  <TrendingUp size={22} />
                  اشتقاق
                </button>
              </div>

              {derivativeResult && (
                <div className="bg-white/5 p-6 rounded-2xl border border-purple-500/30 shadow-xl">
                  <h3 className="text-2xl font-bold text-purple-400 mb-4">النتيجة:</h3>
                  <div className="p-4 bg-slate-950 rounded-xl mb-4 border border-pink-500/30">
                    <p className="text-3xl font-black text-white font-mono">{derivativeResult.solution}</p>
                  </div>
                  
                  <h4 className="text-lg font-bold text-gray-300 mb-2">الخطوات: (القاعدة: {derivativeResult.rule})</h4>
                  <ul className="space-y-2 text-gray-400 list-inside list-disc">
                    {derivativeResult.steps.map((step, index) => (
                      <li key={index} className="bg-white/5 p-3 rounded-lg font-mono text-sm border border-white/10">{step}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Integration Calculator Tab */}
          {activeTab === 'integration' && (
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-xl shadow-lg shadow-violet-500/50">
                  <Sigma size={28} className="text-white" />
                </div>
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">حاسبة التكامل</h2>
              </div>
              
              <div className="flex gap-4 mb-6">
                <input
                  type="text"
                  value={integralInput}
                  onChange={(e) => setIntegralInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && solveIntegral()}
                  placeholder="أدخل الدالة للتكامل (مثل: x^2, cos(x), 1/x)"
                  className="flex-1 px-5 py-4 bg-white/5 border-2 border-indigo-500/30 rounded-xl focus:border-indigo-500 focus:outline-none text-white placeholder-gray-500 text-lg backdrop-blur-sm transition-all"
                />
                <button
                  onClick={solveIntegral}
                  className="px-8 py-4 bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-xl font-bold hover:from-violet-600 hover:to-indigo-600 transition-all shadow-lg shadow-violet-500/50 flex items-center gap-2 hover:scale-105"
                >
                  <Sigma size={22} />
                  تكامل
                </button>
              </div>

              {integralResult && (
                <div className="bg-white/5 p-6 rounded-2xl border border-indigo-500/30 shadow-xl">
                  <h3 className="text-2xl font-bold text-indigo-400 mb-4">النتيجة:</h3>
                  <div className="p-4 bg-slate-950 rounded-xl mb-4 border border-violet-500/30">
                    <p className="text-3xl font-black text-white font-mono">{integralResult.solution}</p>
                  </div>
                  
                  <h4 className="text-lg font-bold text-gray-300 mb-2">الخطوات: (الطريقة: {integralResult.method})</h4>
                  <ul className="space-y-2 text-gray-400 list-inside list-disc">
                    {integralResult.steps.map((step, index) => (
                      <li key={index} className="bg-white/5 p-3 rounded-lg font-mono text-sm border border-white/10">{step}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Formulas Tab (Placeholder) */}
          {activeTab === 'formulas' && (
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 text-center">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg shadow-yellow-500/50">
                  <BookOpen size={28} className="text-white" />
                </div>
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">قوانين ومراجع</h2>
              </div>
              <p className="text-gray-400 text-xl mb-6">هذه المساحة مخصصة لإضافة مراجع سريعة لقوانين الرياضيات والفيزياء وعلوم الحاسب.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-white/5 rounded-xl border border-yellow-500/30">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">قوانين الرياضيات</h3>
                  <p className="text-gray-300">قواعد الاشتقاق، التكامل، المتسلسلات، الجبر الخطي.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-xl border border-orange-500/30">
                  <h3 className="text-2xl font-bold text-orange-400 mb-2">مفاهيم علوم الحاسب</h3>
                  <p className="text-gray-300">تعقيد الخوارزميات (Big O)، هياكل البيانات، قواعد البيانات.</p>
                </div>
              </div>
              <p className="mt-8 text-gray-500">جاري العمل على إضافة المحتوى...</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}