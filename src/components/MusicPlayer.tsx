import React, { useState, useEffect } from 'react';
import { Play, SkipForward, SkipBack, Music2, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState({
    title: 'Rainy Night In Tokyo',
    artist: 'Lofi Girl',
  });

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-white/80 dark:bg-[#1a1b26]/80 backdrop-blur-xl border border-[#dee2e6] dark:border-[#414868] rounded-3xl p-4 shadow-2xl flex flex-col gap-4 w-64"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b6b] to-[#f06595] flex items-center justify-center text-white shadow-lg">
          <Music2 size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold truncate tracking-tight">{track.title}</p>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">{track.artist}</p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Progress Bar */}
        <div className="h-1 bg-gray-100 dark:bg-[#24283b] rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#ff6b6b]"
            initial={{ width: '30%' }}
            animate={{ width: isPlaying ? '60%' : '30%' }}
            transition={{ duration: 5, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
          />
        </div>

        <div className="flex items-center justify-between">
          <button className="text-gray-400 hover:text-[#ff6b6b] transition-colors"><SkipBack size={16} /></button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-[#ff6b6b] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-pink-500/20"
          >
            {isPlaying ? <div className="w-3 h-3 flex gap-0.5"><div className="w-1 h-full bg-white"></div><div className="w-1 h-full bg-white"></div></div> : <Play size={16} className="ml-0.5" />}
          </button>
          <button className="text-gray-400 hover:text-[#ff6b6b] transition-colors"><SkipForward size={16} /></button>
          <div className="w-[1px] h-4 bg-gray-200 dark:bg-[#414868] mx-1"></div>
          <button className="text-gray-400 hover:text-[#ff6b6b] transition-colors"><Volume2 size={16} /></button>
        </div>
      </div>
    </motion.div>
  );
}
