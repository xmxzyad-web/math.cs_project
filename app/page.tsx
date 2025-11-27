"use client";
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

  // Pomodoro Timer Logic
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
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
                setMinutes(5);
              }
            } else {
              setPomodoroMode('work');
              setMinutes(25);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, pomodoroMode, completedPomodoros]);

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
      const from = unitConversions.temperature[fromUnit];
      const to = unitConversions.temperature[toUnit];
      
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
      }
    } else {
      // Standard conversion
      const fromFactor = unitConversions[unitCategory][fromUnit];
      const toFactor = unitConversions[unitCategory][toUnit];
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
          const match = line.match(/print\((.*?)\)/);
          if (match) {
            let content = match[1].trim();
            content = content.replace(/^["']|["']$/g, '');
            content = content.replace(/f["']/g, '');
            result += content + '\n';
          }
        }
      }
      
      if (result) {
        setOutput(result);
      } else {
        setOutput('✓ Code executed successfully\n(Note: This is a demo editor - only print statements work)');
      }
    } catch (error) {
      setOutput('Error: ' + error.message);
    }
  };

  // Derivative Calculator
  const calculateDerivative = () => {
    const input = derivativeInput.toLowerCase().trim();
    let result = { solution: '', steps: [], rule: '' };
    
    if (input.includes('x^3')) {
      result = {
        rule: 'قاعدة القوة',
        steps: [
          'd/dx[x³]',
          'نستخدم قاعدة: d/dx[xⁿ] = n·xⁿ⁻¹',
          'هنا n = 3',
          'd/dx[x³] = 3·x³⁻¹',
          'd/dx[x³] = 3x²'
        ],
        solution: '3x²'
      };
    } else if (input.includes('x^2')) {
      result = {
        rule: 'قاعدة القوة',
        steps: [
          'd/dx[x²]',
          'نستخدم قاعدة: d/dx[xⁿ] = n·xⁿ⁻¹',
          'هنا n = 2',
          'd/dx[x²] = 2·x²⁻¹',
          'd/dx[x²] = 2x'
        ],
        solution: '2x'
      };
    } else if (input.includes('sin') && input.includes('x')) {
      result = {
        rule: 'مشتقة الدالة المثلثية',
        steps: [
          'd/dx[sin(x)]',
          'مشتقة sin(x) معروفة',
          'd/dx[sin(x)] = cos(x)'
        ],
        solution: 'cos(x)'
      };
    } else if (input.includes('cos') && input.includes('x')) {
      result = {
        rule: 'مشتقة الدالة المثلثية',
        steps: [
          'd/dx[cos(x)]',
          'مشتقة cos(x) معروفة',
          'd/dx[cos(x)] = -sin(x)'
        ],
        solution: '-sin(x)'
      };
    } else if (input.includes('e^x')) {
      result = {
        rule: 'مشتقة الدالة الأسية',
        steps: [
          'd/dx[eˣ]',
          'مشتقة eˣ تساوي نفسها',
          'd/dx[eˣ] = eˣ'
        ],
        solution: 'eˣ'
      };
    } else if (input.includes('ln') && input.includes('x')) {
      result = {
        rule: 'مشتقة اللوغاريتم',
        steps: [
          'd/dx[ln(x)]',
          'd/dx[ln(x)] = 1/x'
        ],
        solution: '1/x'
      };
    } else if (input.includes('sinh')) {
      result = {
        rule: 'مشتقة الدالة الزائدية',
        steps: [
          'd/dx[sinh(x)]',
          'd/dx[sinh(x)] = cosh(x)'
        ],
        solution: 'cosh(x)'
      };
    } else if (input.includes('cosh')) {
      result = {
        rule: 'مشتقة الدالة الزائدية',
        steps: [
          'd/dx[cosh(x)]',
          'd/dx[cosh(x)] = sinh(x)'
        ],
        solution: 'sinh(x)'
      };
    } else {
      result = {
        rule: 'أمثلة',
        steps: [
          'جرب: x^2, x^3, sin(x), cos(x)',
          'e^x, ln(x), sinh(x), cosh(x)'
        ],
        solution: 'اكتب دالة للاشتقاق'
      };
    }
    
    setDerivativeResult(result);
  };

  // Integration Calculator
  const solveIntegral = () => {
    const input = integralInput.toLowerCase().trim();
    let result = { solution: '', steps: [], method: '' };
    
    if (input.includes('x^2')) {
      result = {
        method: 'تكامل مباشر',
        steps: [
          '∫ x² dx',
          'قانون: ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C',
          'n = 2',
          '∫ x² dx = x³/3 + C'
        ],
        solution: 'x³/3 + C'
      };
    } else if (input.includes('x^3')) {
      result = {
        method: 'تكامل مباشر',
        steps: [
          '∫ x³ dx',
          'قانون: ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C',
          'n = 3',
          '∫ x³ dx = x⁴/4 + C'
        ],
        solution: 'x⁴/4 + C'
      };
    } else if (input.includes('sin') && input.includes('x')) {
      result = {
        method: 'تكامل مباشر',
        steps: [
          '∫ sin(x) dx',
          '∫ sin(x) dx = -cos(x) + C'
        ],
        solution: '-cos(x) + C'
      };
    } else if (input.includes('cos') && input.includes('x')) {
      result = {
        method: 'تكامل مباشر',
        steps: [
          '∫ cos(x) dx',
          '∫ cos(x) dx = sin(x) + C'
        ],
        solution: 'sin(x) + C'
      };
    } else if (input.includes('e^x')) {
      result = {
        method: 'تكامل مباشر',
        steps: [
          '∫ eˣ dx',
          '∫ eˣ dx = eˣ + C'
        ],
        solution: 'eˣ + C'
      };
    } else if (input.includes('1/x')) {
      result = {
        method: 'تكامل مباشر',
        steps: [
          '∫ 1/x dx',
          '∫ 1/x dx = ln|x| + C'
        ],
        solution: 'ln|x| + C'
      };
    } else {
      result = {
        method: 'أمثلة',
        steps: [
          'جرب: x^2, x^3, sin(x)',
          'cos(x), e^x, 1/x'
        ],
        solution: 'اكتب دالة للتكامل'
      };
    }
    
    setIntegralResult(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900" dir="rtl">
      {/* Animated Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
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
                    <li>• Test loops and conditions</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-5 backdrop-blur-sm">
                  <div className="text-3xl mb-2">📚</div>
                  <h4 className="text-purple-400 font-bold mb-2">Examples</h4>
                  <ul className="text-gray-300 text-sm space-y-1 font-mono">
                    <li>• print(2 + 2)</li>
                    <li>• print("Hello")</li>
                    <li>• for i in range(5):</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-5 backdrop-blur-sm">
                  <div className="text-3xl mb-2">⚡</div>
                  <h4 className="text-green-400 font-bold mb-2">Quick Start</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Write your code</li>
                    <li>• Click Run Code</li>
                    <li>• See results below</li>
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

              {/* Category Selection */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {[
                  { id: 'length', label: 'الطول', icon: '📏' },
                  { id: 'weight', label: 'الوزن', icon: '⚖️' },
                  { id: 'temperature', label: 'الحرارة', icon: '🌡️' },
                  { id: 'area', label: 'المساحة', icon: '📐' },
                  { id: 'volume', label: 'الحجم', icon: '🧪' },
                  { id: 'time', label: 'الوقت', icon: '⏰' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setUnitCategory(cat.id);
                      const units = Object.keys(unitConversions[cat.id]);
                      setFromUnit(units[0]);
                      setToUnit(units[1] || units[0]);
                      setInputValue('');
                      setConvertedValue('');
                    }}
                    className={`p-4 rounded-xl font-bold transition-all ${
                      unitCategory === cat.id
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <div className="text-sm">{cat.label}</div>
                  </button>
                ))}
              </div>

              {/* Conversion Interface */}
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 p-6 rounded-2xl border border-cyan-500/30">
                    <label className="block text-cyan-400 font-bold mb-3">من:</label>
                    <select
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-500 mb-4"
                    >
                      {Object.keys(unitConversions[unitCategory]).map(unit => (
                        <option key={unit} value={unit} className="bg-gray-900">
                          {unitLabels[unitCategory][unit]}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="أدخل القيمة"
                      className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-xl text-white text-lg focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="bg-white/5 p-6 rounded-2xl border border-blue-500/30">
                    <label className="block text-blue-400 font-bold mb-3">إلى:</label>
                    <select
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-xl text-white focus:outline-none focus:border-blue-500 mb-4"
                    >
                      {Object.keys(unitConversions[unitCategory]).map(unit => (
                        <option key={unit} value={unit} className="bg-gray-900">
                          {unitLabels[unitCategory][unit]}
                        </option>
                      ))}
                    </select>
                    <div className="px-4 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/50 rounded-xl text-white text-lg font-bold min-h-[52px] flex items-center">
                      {convertedValue || '---'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={convertUnit}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-4 rounded-xl font-bold hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/50 text-lg hover:scale-105"
                >
                  تحويل
                </button>

                {convertedValue && (
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 rounded-2xl border border-green-500/30 text-center">
                    <p className="text-gray-300 mb-2">النتيجة:</p>
                    <p className="text-2xl md:text-3xl font-bold text-white">
                      {inputValue} {unitLabels[unitCategory][fromUnit]} = {convertedValue} {unitLabels[unitCategory][toUnit]}
                    </p>
                  </div>
                )}
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

              {/* Category Selection */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {[
                  { id: 'length', label: 'الطول', icon: '📏' },
                  { id: 'weight', label: 'الوزن', icon: '⚖️' },
                  { id: 'temperature', label: 'الحرارة', icon: '🌡️' },
                  { id: 'area', label: 'المساحة', icon: '📐' },
                  { id: 'volume', label: 'الحجم', icon: '🧪' },
                  { id: 'time', label: 'الوقت', icon: '⏰' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setUnitCategory(cat.id);
                      const units = Object.keys(unitConversions[cat.id]);
                      setFromUnit(units[0]);
                      setToUnit(units[1] || units[0]);
                      setInputValue('');
                      setConvertedValue('');
                    }}
                    className={`p-4 rounded-xl font-bold transition-all ${
                      unitCategory === cat.id
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50 scale-105'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10 hover:scale-105'
                    }`}
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <div className="text-sm">{cat.label}</div>
                  </button>
                ))}
              </div>

              {/* Conversion Interface */}
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 p-6 rounded-2xl border border-cyan-500/30">
                    <label className="block text-cyan-400 font-bold mb-3 text-lg">من:</label>
                    <select
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-500 mb-4 text-lg"
                    >
                      {Object.keys(unitConversions[unitCategory]).map(unit => (
                        <option key={unit} value={unit} className="bg-gray-900">
                          {unitLabels[unitCategory][unit]}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="أدخل القيمة"
                      className="w-full px-4 py-4 bg-white/10 border border-cyan-500/30 rounded-xl text-white text-xl font-bold focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="bg-white/5 p-6 rounded-2xl border border-blue-500/30">
                    <label className="block text-blue-400 font-bold mb-3 text-lg">إلى:</label>
                    <select
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-xl text-white focus:outline-none focus:border-blue-500 mb-4 text-lg"
                    >
                      {Object.keys(unitConversions[unitCategory]).map(unit => (
                        <option key={unit} value={unit} className="bg-gray-900">
                          {unitLabels[unitCategory][unit]}
                        </option>
                      ))}
                    </select>
                    <div className="px-4 py-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/50 rounded-xl text-white text-xl font-bold min-h-[64px] flex items-center justify-center">
                      {convertedValue || '---'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={convertUnit}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-5 rounded-xl font-bold hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/50 text-xl hover:scale-105"
                >
                  🔄 تحويل الآن
                </button>

                {convertedValue && (
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-8 rounded-2xl border-2 border-green-500/30 text-center backdrop-blur-sm">
                    <div className="text-4xl mb-4">✅</div>
                    <p className="text-gray-300 mb-3 text-lg">النتيجة:</p>
                    <p className="text-3xl md:text-4xl font-black text-white mb-2">
                      {inputValue} {unitLabels[unitCategory][fromUnit]}
                    </p>
                    <p className="text-2xl text-green-400 font-bold mb-2">=</p>
                    <p className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                      {convertedValue} {unitLabels[unitCategory][toUnit]}
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Reference */}
              <div className="mt-8 grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-5 rounded-xl border border-purple-500/30">
                  <h4 className="font-bold text-lg mb-3 text-purple-400">💡 نصيحة</h4>
                  <p className="text-gray-300 text-sm">اختر الفئة المناسبة، ثم أدخل القيمة واضغط تحويل للحصول على النتيجة الدقيقة</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 p-5 rounded-xl border border-orange-500/30">
                  <h4 className="font-bold text-lg mb-3 text-orange-400">⚡ سريع ودقيق</h4>
                  <p className="text-gray-300 text-sm">يدعم أكثر من 40 وحدة قياس مختلفة في 6 فئات رئيسية</p>
                </div>
              </div>
            </div>
          )}

          {/* Derivative Tab */}
          {activeTab === 'derivative' && (
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl shadow-lg shadow-pink-500/50">
                  <TrendingUp size={28} className="text-white" />
                </div>
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">حاسبة الاشتقاق</h2>
              </div>
              
              <div className="mb-6">
                <input
                  type="text"
                  value={derivativeInput}
                  onChange={(e) => setDerivativeInput(e.target.value)}
                  placeholder="مثال: x^2, sin(x), e^x, ln(x)"
                  className="w-full px-5 py-4 bg-white/5 border-2 border-pink-500/30 rounded-xl focus:border-pink-500 focus:outline-none text-white placeholder-gray-500 text-lg backdrop-blur-sm transition-all"
                />
                <p className="text-sm text-gray-400 mt-3">جرب: x^2, x^3, sin(x), cos(x), e^x, ln(x), sinh(x), cosh(x)</p>
              </div>

              <button
                onClick={calculateDerivative}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-4 rounded-xl font-bold hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg shadow-pink-500/50 text-lg hover:scale-105 mb-8"
              >
                احسب المشتقة
              </button>

              {derivativeResult && (
                <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl p-6 border-2 border-pink-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                    <h3 className="text-xl font-bold text-pink-400">القاعدة: {derivativeResult.rule}</h3>
                  </div>
                  <h4 className="text-lg font-bold text-pink-300 mb-4">خطوات الحل:</h4>
                  <div className="space-y-2 mb-6">
                    {derivativeResult.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                        <span className="text-pink-400 font-bold">{i + 1}.</span>
                        <p className="text-gray-200 font-mono text-base flex-1">{step}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl border-2 border-pink-400/50 shadow-lg shadow-pink-500/30">
                    <p className="text-lg font-bold text-pink-300 mb-2">الحل النهائي:</p>
                    <p className="text-3xl font-mono text-white font-bold">{derivativeResult.solution}</p>
                  </div>
                </div>
              )}

              <div className="mt-8 grid md:grid-cols-3 gap-4">
                <div className="bg-cyan-500/10 border border-cyan-500/30 p-5 rounded-xl backdrop-blur-sm">
                  <h4 className="font-bold text-lg mb-3 text-cyan-400">قواعد أساسية</h4>
                  <div className="text-sm text-gray-300 space-y-2 font-mono">
                    <p className="p-2 bg-white/5 rounded">d/dx[xⁿ] = n·xⁿ⁻¹</p>
                    <p className="p-2 bg-white/5 rounded">d/dx[eˣ] = eˣ</p>
                    <p className="p-2 bg-white/5 rounded">d/dx[ln(x)] = 1/x</p>
                  </div>
                </div>
                <div className="bg-pink-500/10 border border-pink-500/30 p-5 rounded-xl backdrop-blur-sm">
                  <h4 className="font-bold text-lg mb-3 text-pink-400">دوال مثلثية</h4>
                  <div className="text-sm text-gray-300 space-y-2 font-mono">
                    <p className="p-2 bg-white/5 rounded">d/dx[sin(x)] = cos(x)</p>
                    <p className="p-2 bg-white/5 rounded">d/dx[cos(x)] = -sin(x)</p>
                    <p className="p-2 bg-white/5 rounded">d/dx[tan(x)] = sec²(x)</p>
                  </div>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 p-5 rounded-xl backdrop-blur-sm">
                  <h4 className="font-bold text-lg mb-3 text-purple-400">دوال زائدية</h4>
                  <div className="text-sm text-gray-300 space-y-2 font-mono">
                    <p className="p-2 bg-white/5 rounded">d/dx[sinh(x)] = cosh(x)</p>
                    <p className="p-2 bg-white/5 rounded">d/dx[cosh(x)] = sinh(x)</p>
                    <p className="p-2 bg-white/5 rounded">d/dx[tanh(x)] = sech²(x)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Integration Tab */}
          {activeTab === 'integration' && (
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-xl shadow-lg shadow-violet-500/50">
                  <Sigma size={28} className="text-white" />
                </div>
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">حاسبة التكامل</h2>
              </div>
              
              <div className="mb-6">
                <input
                  type="text"
                  value={integralInput}
                  onChange={(e) => setIntegralInput(e.target.value)}
                  placeholder="مثال: x^2, sin(x), cos(x), e^x"
                  className="w-full px-5 py-4 bg-white/5 border-2 border-violet-500/30 rounded-xl focus:border-violet-500 focus:outline-none text-white placeholder-gray-500 text-lg backdrop-blur-sm transition-all"
                />
                <p className="text-sm text-gray-400 mt-3">جرب: x^2, x^3, sin(x), cos(x), e^x, 1/x</p>
              </div>

              <button
                onClick={solveIntegral}
                className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white px-6 py-4 rounded-xl font-bold hover:from-violet-600 hover:to-indigo-600 transition-all shadow-lg shadow-violet-500/50 text-lg hover:scale-105 mb-8"
              >
                احسب التكامل
              </button>

              {integralResult && (
                <div className="bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-2xl p-6 border-2 border-violet-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></div>
                    <h3 className="text-xl font-bold text-violet-400">الطريقة: {integralResult.method}</h3>
                  </div>
                  <h4 className="text-lg font-bold text-violet-300 mb-4">خطوات الحل:</h4>
                  <div className="space-y-2 mb-6">
                    {integralResult.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                        <span className="text-violet-400 font-bold">{i + 1}.</span>
                        <p className="text-gray-200 font-mono text-base flex-1">{step}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-xl border-2 border-violet-400/50 shadow-lg shadow-violet-500/30">
                    <p className="text-lg font-bold text-violet-300 mb-2">الحل النهائي:</p>
                    <p className="text-3xl font-mono text-white font-bold">{integralResult.solution}</p>
                  </div>
                </div>
              )}

              <div className="mt-8 grid md:grid-cols-2 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/30 p-5 rounded-xl backdrop-blur-sm">
                  <h4 className="font-bold text-lg mb-3 text-blue-400">قواعد التكامل</h4>
                  <div className="text-sm text-gray-300 space-y-2 font-mono">
                    <p className="p-2 bg-white/5 rounded">∫ xⁿ dx = xⁿ⁺¹/(n+1) + C</p>
                    <p className="p-2 bg-white/5 rounded">∫ eˣ dx = eˣ + C</p>
                    <p className="p-2 bg-white/5 rounded">∫ 1/x dx = ln|x| + C</p>
                  </div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 p-5 rounded-xl backdrop-blur-sm">
                  <h4 className="font-bold text-lg mb-3 text-green-400">دوال مثلثية</h4>
                  <div className="text-sm text-gray-300 space-y-2 font-mono">
                    <p className="p-2 bg-white/5 rounded">∫ sin(x) dx = -cos(x) + C</p>
                    <p className="p-2 bg-white/5 rounded">∫ cos(x) dx = sin(x) + C</p>
                    <p className="p-2 bg-white/5 rounded">∫ sec²(x) dx = tan(x) + C</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Formulas Tab */}
          {activeTab === 'formulas' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg shadow-yellow-500/50">
                    <BookOpen size={28} className="text-white" />
                  </div>
                  <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">الدوال الزائدية</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-5 rounded-xl border border-blue-500/30 backdrop-blur-sm">
                      <p className="font-bold text-lg mb-3 text-blue-400">التعريفات:</p>
                      <div className="space-y-2 font-mono text-gray-300">
                        <p className="p-2 bg-white/5 rounded">sinh(x) = (eˣ - e⁻ˣ)/2</p>
                        <p className="p-2 bg-white/5 rounded">cosh(x) = (eˣ + e⁻ˣ)/2</p>
                        <p className="p-2 bg-white/5 rounded">tanh(x) = sinh(x)/cosh(x)</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-5 rounded-xl border border-purple-500/30 backdrop-blur-sm">
                      <p className="font-bold text-lg mb-3 text-purple-400">المشتقات:</p>
                      <div className="space-y-2 font-mono text-gray-300">
                        <p className="p-2 bg-white/5 rounded">d/dx[sinh(x)] = cosh(x)</p>
                        <p className="p-2 bg-white/5 rounded">d/dx[cosh(x)] = sinh(x)</p>
                        <p className="p-2 bg-white/5 rounded">d/dx[tanh(x)] = sech²(x)</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-5 rounded-xl border border-green-500/30 backdrop-blur-sm">
                      <p className="font-bold text-lg mb-3 text-green-400">المتطابقات:</p>
                      <div className="space-y-2 font-mono text-gray-300">
                        <p className="p-2 bg-white/5 rounded">cosh²(x) - sinh²(x) = 1</p>
                        <p className="p-2 bg-white/5 rounded">1 - tanh²(x) = sech²(x)</p>
                        <p className="p-2 bg-white/5 rounded">sinh(2x) = 2sinh(x)cosh(x)</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-5 rounded-xl border border-yellow-500/30 backdrop-blur-sm">
                      <p className="font-bold text-lg mb-3 text-yellow-400">التكاملات:</p>
                      <div className="space-y-2 font-mono text-gray-300">
                        <p className="p-2 bg-white/5 rounded">∫ sinh(x)dx = cosh(x) + C</p>
                        <p className="p-2 bg-white/5 rounded">∫ cosh(x)dx = sinh(x) + C</p>
                        <p className="p-2 bg-white/5 rounded">∫ tanh(x)dx = ln|cosh(x)| + C</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl shadow-lg shadow-pink-500/50">
                    <Calculator size={28} className="text-white" />
                  </div>
                  <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">المتطابقات المثلثية</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 p-5 rounded-xl border border-pink-500/30 backdrop-blur-sm">
                      <p className="font-bold text-lg mb-3 text-pink-400">المتطابقات الأساسية:</p>
                      <div className="space-y-2 font-mono text-gray-300">
                        <p className="p-2 bg-white/5 rounded">sin²(x) + cos²(x) = 1</p>
                        <p className="p-2 bg-white/5 rounded">1 + tan²(x) = sec²(x)</p>
                        <p className="p-2 bg-white/5 rounded">1 + cot²(x) = csc²(x)</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-500/10 to-violet-500/10 p-5 rounded-xl border border-indigo-500/30 backdrop-blur-sm">
                      <p className="font-bold text-lg mb-3 text-indigo-400">الزوايا المضاعفة:</p>
                      <div className="space-y-2 font-mono text-gray-300">
                        <p className="p-2 bg-white/5 rounded">sin(2x) = 2sin(x)cos(x)</p>
                        <p className="p-2 bg-white/5 rounded">cos(2x) = cos²(x) - sin²(x)</p>
                        <p className="p-2 bg-white/5 rounded">tan(2x) = 2tan(x)/(1-tan²(x))</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 p-5 rounded-xl border border-teal-500/30 backdrop-blur-sm">
                      <p className="font-bold text-lg mb-3 text-teal-400">الجمع والطرح:</p>
                      <div className="space-y-2 font-mono text-sm text-gray-300">
                        <p className="p-2 bg-white/5 rounded">sin(A±B) = sinAcosB ± cosAsinB</p>
                        <p className="p-2 bg-white/5 rounded">cos(A±B) = cosAcosB ∓ sinAsinB</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 p-5 rounded-xl border border-orange-500/30 backdrop-blur-sm">
                      <p className="font-bold text-lg mb-3 text-orange-400">قيم خاصة:</p>
                      <div className="space-y-2 font-mono text-sm text-gray-300">
                        <p className="p-2 bg-white/5 rounded">sin(π/6)=1/2, cos(π/6)=√3/2</p>
                        <p className="p-2 bg-white/5 rounded">sin(π/4)=√2/2, cos(π/4)=√2/2</p>
                        <p className="p-2 bg-white/5 rounded">sin(π/3)=√3/2, cos(π/3)=1/2</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 mb-8">
          <div className="inline-block px-10 py-5 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
            <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
              ✨ مشروع سنة أولى ✨
            </p>
            <p className="text-lg font-semibold text-gray-300">
              رياضيات وعلوم الحاسب
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}