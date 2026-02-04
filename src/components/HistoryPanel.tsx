import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { History, X, Trash2, Pencil, Eraser, Square, Type, Circle, Triangle, ArrowUpRight, Minus } from 'lucide-react';

interface HistoryPanelProps {
  paths: any[];
  setPaths: (paths: any[] | ((p: any[]) => any[])) => void;
  onClose: () => void;
}

const getToolIcon = (tool: string) => {
  switch (tool) {
    case 'pencil': return Pencil;
    case 'eraser': return Eraser;
    case 'rectangle': return Square;
    case 'circle': return Circle;
    case 'triangle': return Triangle;
    case 'arrow': return ArrowUpRight;
    case 'line': return Minus;
    case 'text': return Type;
    default: return Pencil;
  }
};

export function HistoryPanel({ paths, setPaths, onClose }: HistoryPanelProps) {
  const removePath = (index: number) => {
    setPaths(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.div 
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="absolute left-6 top-20 bottom-32 w-72 bg-white/95 dark:bg-[#1a1b26]/95 backdrop-blur-2xl border border-[#dee2e6] dark:border-[#414868] rounded-[32px] shadow-2xl z-[50] flex flex-col overflow-hidden"
    >
      <div className="p-5 border-b border-gray-100 dark:border-[#414868] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <History size={18} className="text-[#ff6b6b]" />
          <h3 className="font-bold text-sm">Path History</h3>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#24283b] rounded-full text-gray-400">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
        {paths.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-30 gap-2">
            <History size={32} />
            <p className="text-[10px] font-mono tracking-tighter uppercase font-bold">No steps taken yet</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {[...paths].reverse().map((path, idx) => {
              const originalIndex = paths.length - 1 - idx;
              const Icon = getToolIcon(path.tool);
              
              return (
                <motion.div
                  key={`${originalIndex}-${path.points?.length}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-3 rounded-2xl bg-gray-50/50 dark:bg-[#24283b]/50 border border-transparent hover:border-pink-200 dark:hover:border-pink-500/20 group transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white dark:bg-[#1a1b26] border border-gray-100 dark:border-[#414868] flex items-center justify-center shadow-sm">
                        <Icon size={14} className={path.tool === 'eraser' ? 'text-gray-400' : 'text-[#ff6b6b]'} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold capitalize">{path.tool}</p>
                        <p className="text-[9px] text-gray-400 font-mono">
                          {path.points?.length || 0} pts • {path.size}px
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removePath(originalIndex)}
                      className="p-1.5 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      <div className="p-4 bg-gray-50/50 dark:bg-[#1f2335]/50 border-t border-gray-100 dark:border-[#414868]">
        <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono font-bold tracking-widest uppercase">
          <span>Total Paths</span>
          <span className="text-[#ff6b6b]">{paths.length}</span>
        </div>
      </div>
    </motion.div>
  );
}
