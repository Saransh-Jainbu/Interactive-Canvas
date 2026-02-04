import React from 'react';
import { motion } from 'motion/react';
import { X, Command } from 'lucide-react';

interface ShortcutsModalProps {
  onClose: () => void;
}

const shortcuts = [
  { key: 'V', label: 'Select Tool', desc: 'Move and pan' },
  { key: 'P', label: 'Pencil Tool', desc: 'Freehand drawing' },
  { key: 'E', label: 'Eraser Tool', desc: 'Remove strokes' },
  { key: 'R', label: 'Rectangle', desc: 'Draw shapes' },
  { key: 'T', label: 'Text Tool', desc: 'Add text' },
  { key: 'Cmd/Ctrl + Z', label: 'Undo', desc: 'Step back' },
  { key: 'Cmd/Ctrl + Shift + Z', label: 'Redo', desc: 'Step forward' },
  { key: 'Cmd/Ctrl + E', label: 'Export', desc: 'Save as image' },
  { key: 'Space (Hold)', label: 'Hand Tool', desc: 'Pan workspace' },
  { key: 'Delete/Backsp', label: 'Clear All', desc: 'Empty canvas' },
];

export function ShortcutsModal({ onClose }: ShortcutsModalProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white dark:bg-[#1a1b26] w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 dark:border-[#414868]"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 dark:border-[#414868] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-50 dark:bg-pink-500/10 flex items-center justify-center text-[#ff6b6b]">
              <Command size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Shortcuts</h2>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">Workspace Commands</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-[#24283b] rounded-full transition-colors text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 grid gap-4 max-h-[60vh] overflow-y-auto no-scrollbar">
          {shortcuts.map((s, i) => (
            <div key={i} className="flex items-center justify-between group">
              <div>
                <p className="text-sm font-semibold">{s.label}</p>
                <p className="text-xs text-gray-400">{s.desc}</p>
              </div>
              <kbd className="px-2.5 py-1 rounded-lg border border-gray-200 dark:border-[#414868] bg-gray-50 dark:bg-[#24283b] text-[10px] font-mono font-bold shadow-sm group-hover:border-pink-200 dark:group-hover:border-pink-500/30 transition-colors">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50/50 dark:bg-[#1f2335]/50 border-t border-gray-100 dark:border-[#414868]">
          <p className="text-center text-[11px] text-gray-400 italic">
            "Design is a language, shortcuts are the grammar."
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
