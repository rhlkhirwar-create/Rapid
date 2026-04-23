import { motion } from 'motion/react';
import { Trash2, Rocket, Trees, Waves, Sparkles } from 'lucide-react';
import { Alarm, ThemeType } from '../types';
import { DAYS_SHORT, THEMES } from '../constants';

const themeIcons = {
  space: Rocket,
  jungle: Trees,
  underwater: Waves,
  fairy: Sparkles,
};

interface AlarmCardProps {
  alarm: Alarm;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function AlarmCard({ alarm, onToggle, onDelete }: AlarmCardProps) {
  const Icon = themeIcons[alarm.theme];
  const theme = THEMES[alarm.theme];

  const toggleWithSound = (id: string) => {
    const audio = new Audio(theme.ringtoneUrl);
    audio.volume = 0.2;
    audio.play().catch(() => {});
    setTimeout(() => {
      audio.pause();
    }, 1000);
    onToggle(id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      whileHover={{ y: -2 }}
      className={`relative overflow-hidden p-6 glass-card-sm ${
        alarm.enabled ? 'border-white/20' : 'border-white/5 opacity-60'
      } transition-all duration-300`}
    >
      {/* Decorative Background Glow */}
      <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[60px] opacity-20 ${
        alarm.enabled ? theme.accentColor : 'bg-white/10'
      }`} />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-5">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-xl border border-white/10 bg-white/5`}>
            <Icon className={alarm.enabled ? 'text-white' : 'text-white/40'} size={32} />
          </div>
          
          <div>
            <h3 className={`text-4xl font-display font-black leading-tight tracking-tight ${alarm.enabled ? 'text-white' : 'text-white/40'}`}>
              {alarm.time}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-[10px] font-bold uppercase tracking-[2px] ${alarm.enabled ? 'text-white/60' : 'text-white/20'}`}>
                {alarm.label || theme.name}
              </span>
              {alarm.enabled && (
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          <button
            onClick={() => toggleWithSound(alarm.id)}
            className={`w-14 h-8 rounded-full relative transition-colors duration-300 focus:outline-none border border-white/10 ${
              alarm.enabled ? 'bg-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-white/10'
            }`}
          >
            <motion.div
              animate={{ x: alarm.enabled ? 24 : 4 }}
              className={`absolute top-1 left-0 w-6 h-6 rounded-full shadow-lg ${
                alarm.enabled ? 'bg-white' : 'bg-white/40'
              }`}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
          
          <button 
            onClick={() => onDelete(alarm.id)}
            className={`p-2 rounded-xl hover:bg-red-500/20 transition-colors text-white/20 hover:text-red-400`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="mt-6 flex gap-1 relative z-10 border-t border-white/5 pt-4">
        {DAYS_SHORT.map((day, idx) => (
          <div
            key={day}
            className={`flex-1 text-center py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors ${
              alarm.days.includes(idx)
                ? (alarm.enabled ? 'bg-white/20 text-white' : 'bg-white/5 text-white/30')
                : 'text-white/10'
            }`}
          >
            {day[0]}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
