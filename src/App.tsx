import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Bell, Moon, Sun, Info, Heart } from 'lucide-react';
import { Alarm, ThemeType } from './types';
import Clock from './components/Clock';
import AlarmCard from './components/AlarmCard';
import AlarmModal from './components/AlarmModal';
import WakeUpScreen from './components/WakeUpScreen';

const STORAGE_KEY = 'kid_alarms_app_v1';

const BEDTIME_TASKS = [
  { id: 'teeth', label: 'Brush Teeth', icon: '🪥' },
  { id: 'pjs', label: 'Wear Pajamas', icon: '👕' },
  { id: 'story', label: 'Bedtime Story', icon: '📚' },
  { id: 'water', label: 'Drink Water', icon: '💧' },
];

export default function App() {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAlarm, setActiveAlarm] = useState<Alarm | null>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [lastCheckedMinute, setLastCheckedMinute] = useState<string>('');

  // Load alarms from storage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setAlarms(JSON.parse(saved));
    } else {
      // Default alarm for demo
      setAlarms([{
        id: '1',
        time: '07:30',
        days: [1, 2, 3, 4, 5],
        label: 'Rise and Shine!',
        enabled: true,
        theme: 'jungle'
      }]);
    }
  }, []);

  // Save alarms to storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alarms));
  }, [alarms]);

  // Alarm Check Logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const currentHHMM = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const currentDay = now.getDay();

      if (currentHHMM !== lastCheckedMinute) {
        setLastCheckedMinute(currentHHMM);
        
        const alarmToTrigger = alarms.find(a => 
          a.enabled && 
          a.time === currentHHMM && 
          a.days.includes(currentDay)
        );

        if (alarmToTrigger && !activeAlarm) {
          setActiveAlarm(alarmToTrigger);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [alarms, lastCheckedMinute, activeAlarm]);

  const addAlarm = (newAlarmData: Omit<Alarm, 'id' | 'enabled'>) => {
    const newAlarm: Alarm = {
      ...newAlarmData,
      id: Math.random().toString(36).substr(2, 9),
      enabled: true,
    };
    setAlarms(prev => [...prev, newAlarm].sort((a, b) => a.time.localeCompare(b.time)));
    setIsModalOpen(false);
  };

  const toggleAlarm = (id: string) => {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  const deleteAlarm = (id: string) => {
    setAlarms(prev => prev.filter(a => a.id !== id));
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  return (
    <div className="min-h-screen bg-[#2D1B4E] text-white overflow-x-hidden relative selection:bg-purple-light selection:text-white">
      {/* Background Gradients */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#1A1A2E] via-[#2D1B4E] to-[#4A2D73] opacity-80 z-0"></div>
      <div className="fixed top-[-100px] left-[-100px] w-64 h-64 bg-pink-500 rounded-full blur-[120px] opacity-20 z-0"></div>
      <div className="fixed bottom-[-100px] right-[-100px] w-80 h-80 bg-blue-500 rounded-full blur-[120px] opacity-20 z-0"></div>

      {/* Floating Emojis/Stars */}
      <div className="fixed top-1/4 left-10 text-4xl opacity-20 z-0 select-none">⭐</div>
      <div className="fixed bottom-1/3 left-1/4 text-2xl opacity-10 z-0 select-none">⭐</div>
      <div className="fixed top-1/3 right-10 text-5xl opacity-20 z-0 select-none">☁️</div>
      <div className="fixed bottom-1/4 right-20 text-3xl opacity-10 z-0 select-none">⭐</div>

      {/* Header */}
      <header className="relative z-10 px-6 pt-8 flex justify-between items-center max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(250,224,62,0.4)]">
            <span className="text-2xl">☀️</span>
          </div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-white/90">Wakey Palace</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full flex items-center border border-white/10 shadow-lg">
            <span className="text-yellow-400 mr-2">⭐</span>
            <span className="font-bold text-sm tracking-wide">{completedTasks.length * 10} Points</span>
          </div>
          <div className="w-11 h-11 rounded-2xl border-2 border-white/30 overflow-hidden shadow-lg bg-gradient-to-tr from-pink-400 to-yellow-300 ring-2 ring-white/10">
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 flex flex-col items-center">
        {/* Clock Section */}
        <section className="mb-20 w-full">
          <Clock />
        </section>

        {/* Action Button - Immersive UI Style */}
        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="mb-20 bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-black px-12 py-5 rounded-[2rem] text-xl shadow-[0_10px_50px_rgba(250,224,62,0.4)] flex items-center gap-3 transition-colors uppercase tracking-wider"
        >
          <Plus size={24} strokeWidth={4} />
          Plan New Adventure
        </motion.button>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Alarms Section */}
          <section className="w-full">
            <div className="flex items-center justify-between mb-8 px-2">
              <h2 className="text-2xl font-bold tracking-tight text-white/90 flex items-center gap-3 italic">
                <Bell className="text-yellow-400" size={24} />
                My Magic Alarms
              </h2>
            </div>

            <div className="grid gap-6">
              <AnimatePresence mode="popLayout">
                {alarms.map(alarm => (
                  <AlarmCard 
                    key={alarm.id} 
                    alarm={alarm} 
                    onToggle={toggleAlarm} 
                    onDelete={deleteAlarm} 
                  />
                ))}
              </AnimatePresence>

              {alarms.length === 0 && (
                <div className="glass-card p-12 text-center border-dashed opacity-50">
                  <p className="font-fun font-bold text-white/60 mb-2 italic">Your palace is quiet...</p>
                  <p className="text-sm text-white/30">Add an alarm to start the fun!</p>
                </div>
              )}
            </div>
          </section>

          {/* Bedtime Routine - Refined for Immersive UI */}
          <section className="w-full">
            <div className="flex items-center justify-between mb-8 px-2">
              <h2 className="text-2xl font-bold tracking-tight text-white/90 flex items-center gap-3 italic">
                <Moon className="text-indigo-400" size={24} />
                Bedtime Tasks
              </h2>
            </div>

            <div className="glass-card p-8">
              <div className="grid grid-cols-1 gap-4">
                {BEDTIME_TASKS.map(task => (
                  <button
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`p-5 rounded-3xl flex items-center gap-4 transition-all group ${
                      completedTasks.includes(task.id)
                        ? 'bg-indigo-500/20 border-indigo-500/40 opacity-50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    } border`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner ${
                      completedTasks.includes(task.id) ? 'bg-indigo-500/30' : 'bg-white/5'
                    }`}>
                      {task.icon}
                    </div>
                    <div className="text-left flex-grow">
                      <div className={`font-bold text-lg ${completedTasks.includes(task.id) ? 'line-through text-white/40' : ''}`}>
                        {task.label}
                      </div>
                      <div className="text-xs text-white/40 font-medium uppercase tracking-widest mt-0.5">
                        {completedTasks.includes(task.id) ? 'Level Up!' : 'Adventure Task'}
                      </div>
                    </div>
                    {completedTasks.includes(task.id) && (
                      <div className="bg-green-400/20 text-green-400 p-2 rounded-full border border-green-400/30">
                        <Check size={16} strokeWidth={4} />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                 <div className="flex justify-between items-center mb-4 text-xs font-bold uppercase tracking-widest text-indigo-300">
                    <span>Routine Progress</span>
                    <span>{Math.round((completedTasks.length / BEDTIME_TASKS.length) * 100)}%</span>
                 </div>
                 <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-pink-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(completedTasks.length / BEDTIME_TASKS.length) * 100}%` }}
                    />
                 </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 py-12 text-center opacity-30">
        <Heart className="mx-auto mb-2 text-pink-400" size={16} fill="currentColor" />
        <p className="text-[10px] font-bold uppercase tracking-[4px]">Designed for Magic Mornings</p>
      </footer>

      {/* Modals & Overlays */}
      <AnimatePresence>
        {isModalOpen && (
          <AlarmModal 
            onSave={addAlarm} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
        {activeAlarm && (
          <WakeUpScreen 
            alarm={activeAlarm} 
            onDismiss={() => setActiveAlarm(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
