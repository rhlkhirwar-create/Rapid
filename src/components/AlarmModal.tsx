import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Rocket, Trees, Waves, Sparkles, Check } from 'lucide-react';
import { Alarm, ThemeType } from '../types';
import { DAYS_SHORT, THEMES } from '../constants';

interface AlarmModalProps {
  onSave: (alarm: Omit<Alarm, 'id' | 'enabled'>) => void;
  onClose: () => void;
}

const themeOptions: { type: ThemeType; icon: any }[] = [
  { type: 'space', icon: Rocket },
  { type: 'jungle', icon: Trees },
  { type: 'underwater', icon: Waves },
  { type: 'fairy', icon: Sparkles },
];

export default function AlarmModal({ onSave, onClose }: AlarmModalProps) {
  const [time, setTime] = useState('07:30');
  const [label, setLabel] = useState('');
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [theme, setTheme] = useState<ThemeType>('space');

  const toggleDay = (idx: number) => {
    setSelectedDays(prev => 
      prev.includes(idx) ? prev.filter(d => d !== idx) : [...prev, idx]
    );
  };

  const handleSave = () => {
    onSave({
      time,
      label,
      days: selectedDays,
      theme,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="relative w-full max-w-md bg-purple-deep/40 backdrop-blur-3xl rounded-[3rem] shadow-2xl overflow-hidden border border-white/20"
      >
        <div className="p-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-display font-black text-white italic">New Magic Alarm</h2>
              <p className="text-white/40 text-xs font-bold uppercase tracking-[2px] mt-1">Adventure Settings</p>
            </div>
            <button onClick={onClose} className="p-3 bg-white/5 rounded-2xl text-white/40 hover:text-white transition-colors border border-white/10">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-10">
            {/* Time Picker */}
            <div className="flex justify-center relative group">
              <div className="absolute -inset-4 bg-white/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="relative z-10 text-7xl font-display font-black text-white bg-transparent p-4 rounded-3xl outline-none transition-all drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              />
            </div>

            {/* Label */}
            <div>
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[3px] mb-3 ml-2 italic">Alarm Name</p>
              <input
                placeholder="Morning Wakeup!"
                value={label}
                onChange={e => setLabel(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-5 rounded-[2rem] font-fun font-bold text-white placeholder:text-white/20 focus:bg-white/10 outline-none transition-all"
              />
            </div>

            {/* Days Selection */}
            <div>
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[3px] mb-3 ml-2 italic">Repeat Adventure</p>
              <div className="flex justify-between gap-2">
                {DAYS_SHORT.map((day, idx) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(idx)}
                    className={`flex-1 py-4 rounded-2xl font-black text-xs transition-all border ${
                      selectedDays.includes(idx)
                        ? 'bg-white/20 text-white border-white/30 shadow-lg scale-105'
                        : 'bg-white/5 text-white/30 border-white/5 hover:bg-white/10'
                    }`}
                  >
                    {day[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Selection */}
            <div>
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[3px] mb-3 ml-2 italic">Theme & Magic Sound</p>
              <div className="grid grid-cols-4 gap-4">
                {themeOptions.map(({ type, icon: Icon }) => (
                  <button
                    key={type}
                    onClick={() => setTheme(type)}
                    className={`aspect-square rounded-[2rem] flex flex-col items-center justify-center gap-1 transition-all group relative border ${
                      theme === type
                        ? 'bg-white/20 text-white border-white/30 shadow-xl scale-110 rotate-3'
                        : 'bg-white/5 text-white/30 border-white/5 hover:bg-white/10'
                    }`}
                  >
                    <Icon size={24} />
                    <span className="text-[9px] font-black uppercase mt-1 opacity-60">
                      {type}
                    </span>
                    {theme === type && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1 border-2 border-[#2D1B4E]"
                      >
                        <Check size={10} strokeWidth={5} className="text-purple-900" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-yellow-400 text-purple-900 py-6 rounded-[2.5rem] font-display font-black text-xl shadow-[0_10px_40px_rgba(250,224,62,0.3)] hover:bg-yellow-300 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
            >
              <Check size={28} strokeWidth={4} />
              Set Wakeup!
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
