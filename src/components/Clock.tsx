import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds();
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';

  return (
    <div className="flex flex-col items-center justify-center p-8 relative">
      {/* Decorative concentric circles */}
      <div className="absolute w-[380px] h-[380px] bg-white/5 rounded-full border border-white/5 animate-pulse" />
      <div className="absolute w-[320px] h-[320px] bg-white/5 rounded-full border border-white/10" />

      <motion.div 
        className="relative z-10 w-72 h-72 md:w-80 md:h-80 bg-white/10 backdrop-blur-xl rounded-full flex flex-col items-center justify-center border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        <div className="flex items-baseline text-white drop-shadow-[0_4px_10px_rgba(255,255,255,0.3)]">
          <span className="text-7xl md:text-8xl font-black tracking-tighter">
            {hours}
          </span>
          <motion.span 
            className="text-7xl md:text-8xl font-black text-white/50 mx-1"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            :
          </motion.span>
          <span className="text-7xl md:text-8xl font-black tracking-tighter">
            {minutes}
          </span>
        </div>
        
        <div className="mt-2 flex flex-col items-center">
          <div className="text-lg font-medium text-white/60 uppercase tracking-[4px] font-display">
            {ampm}
          </div>
          <div className="text-white/40 font-mono text-sm mt-1">
            {seconds.toString().padStart(2, '0')}s
          </div>
        </div>
      </motion.div>

      <motion.p 
        className="mt-12 text-white font-fun font-bold text-lg uppercase tracking-widest bg-white/10 px-6 py-2 rounded-full border border-white/10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {time.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
      </motion.p>
    </div>
  );
}
