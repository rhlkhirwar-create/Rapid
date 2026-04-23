import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Rocket, Trees, Waves, Sparkles, Sun, Cloud, Moon, Star } from 'lucide-react';
import { Alarm, ThemeType } from '../types';
import { THEMES } from '../constants';

interface WakeUpScreenProps {
  alarm: Alarm;
  onDismiss: () => void;
}

const themeTargets = {
  space: Star,
  jungle: Trees,
  underwater: Waves,
  fairy: Sparkles,
};

export default function WakeUpScreen({ alarm, onDismiss }: WakeUpScreenProps) {
  const [tapCount, setTapCount] = useState(0);
  const [targets, setTargets] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const theme = THEMES[alarm.theme];
  const TargetIcon = themeTargets[alarm.theme];
  const requiredTaps = 10;

  // Initialize targets
  useEffect(() => {
    const newTargets = Array.from({ length: requiredTaps }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10, // 10-90%
      y: Math.random() * 60 + 20, // 20-80%
      size: Math.random() * 40 + 30, // 30-70px
    }));
    setTargets(newTargets);
    
    // Play audio
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.play().catch(e => console.log('Audio playback blocked - interaction needed'));
    }
  }, []);

  const handleTap = (id: number) => {
    setTargets(prev => prev.filter(t => t.id !== id));
    setTapCount(prev => {
      const next = prev + 1;
      if (next === requiredTaps) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
        setTimeout(onDismiss, 2000);
      }
      return next;
    });
  };

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden ${theme.bgColor}`}>
      <audio ref={audioRef} src={theme.ringtoneUrl} />

      {/* Background Atmosphere */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className={`absolute top-0 left-0 w-full h-full ${theme.accentColor} blur-[120px] rounded-full transform -translate-y-1/2`} />
      </div>

      {/* Game Header */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-50 text-center mb-8 px-6"
      >
        <motion.div
           animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
           transition={{ repeat: Infinity, duration: 2 }}
           className="inline-block mb-4 p-6 bg-white/20 backdrop-blur-md rounded-full shadow-2xl"
        >
          <Sun size={80} className="text-yellow-400" />
        </motion.div>
        <h1 className="text-5xl font-display font-extrabold text-white mb-2 tracking-tight shadow-sm">
          WAKE UP!
        </h1>
        <p className="text-white/80 font-fun font-bold text-xl uppercase tracking-widest">
          Tap {requiredTaps - tapCount} more {alarm.theme === 'space' ? 'stars' : 'friends'}!
        </p>
      </motion.div>

      {/* The Game Area */}
      <div className="relative w-full h-full flex-grow">
        <AnimatePresence>
          {targets.map((target) => (
            <motion.button
              key={target.id}
              onClick={() => handleTap(target.id)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                x: `${target.x}%`,
                y: `${target.y}%`,
              }}
              exit={{ scale: 2, opacity: 0, rotate: 180 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="absolute p-4 -translate-x-1/2 -translate-y-1/2 transition-shadow"
              style={{ left: 0, top: 0 }} // Positioning is handled by motion x/y
            >
              <div className={`p-4 rounded-full shadow-lg ${theme.accentColor} border-4 border-white/30 text-white`}>
                <TargetIcon size={target.size} />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Progress Footer */}
      <div className="absolute bottom-12 w-full max-w-xs px-8">
        <div className="h-6 w-full bg-white/10 backdrop-blur-md rounded-full mt-4 overflow-hidden p-1">
          <motion.div 
            className="h-full bg-white rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(tapCount / requiredTaps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
