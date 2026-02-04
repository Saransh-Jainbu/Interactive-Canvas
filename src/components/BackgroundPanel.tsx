import React from 'react';
import { motion } from 'motion/react';
import { Image as ImageIcon, X, Palette, Grid } from 'lucide-react';

interface BackgroundPanelProps {
  onClose: () => void;
  backgroundConfig: {
    color: string;
    pattern: 'none' | 'grid' | 'dots';
    patternOpacity: number;
  };
  setBackgroundConfig: (config: any) => void;
  theme: 'light' | 'dark';
}

const patternOptions = [
  { id: 'none', label: 'Solid', icon: ImageIcon },
  { id: 'grid', label: 'Grid', icon: Grid },
  { id: 'dots', label: 'Dots', icon: Palette },
];

const colors = [
  { id: 'default', light: '#fafaf9', dark: '#0f111a', label: 'Default' },
  { id: 'vintage', light: '#fdf6e3', dark: '#073642', label: 'Vintage' },
  { id: 'paper', light: '#f4f1ea', dark: '#1c1c1c', label: 'Paper' },
  { id: 'ocean', light: '#f0f4f8', dark: '#102a43', label: 'Ocean' },
  { id: 'soft-pink', light: '#fff5f5', dark: '#2d1b1b', label: 'Rose' },
];

export function BackgroundPanel({ onClose, backgroundConfig, setBackgroundConfig, theme }: BackgroundPanelProps) {
  return (
    <motion.div 
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="absolute left-6 top-20 bottom-32 w-72 bg-white/95 dark:bg-[#1a1b26]/95 backdrop-blur-2xl border border-[#dee2e6] dark:border-[#414868] rounded-[32px] shadow-2xl z-[50] flex flex-col overflow-hidden"
    >
      <div className="p-5 border-b border-gray-100 dark:border-[#414868] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ImageIcon size={18} className="text-[#ff6b6b]" />
          <h3 className="font-bold text-sm">Background</h3>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#24283b] rounded-full text-gray-400">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-8 no-scrollbar">
        {/* Colors */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Color Palette</p>
          <div className="grid grid-cols-5 gap-2">
            {colors.map((c) => (
              <button
                key={c.id}
                onClick={() => setBackgroundConfig({ ...backgroundConfig, color: theme === 'light' ? c.light : c.dark })}
                className={`w-10 h-10 rounded-xl border-2 transition-all ${
                  backgroundConfig.color === (theme === 'light' ? c.light : c.dark)
                    ? 'border-[#ff6b6b] scale-110'
                    : 'border-transparent hover:border-gray-200 dark:hover:border-[#414868]'
                }`}
                style={{ backgroundColor: theme === 'light' ? c.light : c.dark }}
                title={c.label}
              />
            ))}
          </div>
        </section>

        {/* Patterns */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Texture Pattern</p>
          <div className="space-y-2">
            {patternOptions.map((pattern) => (
              <button
                key={pattern.id}
                onClick={() => setBackgroundConfig({ ...backgroundConfig, pattern: pattern.id })}
                className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${
                  backgroundConfig.pattern === pattern.id
                    ? 'bg-pink-50 dark:bg-pink-500/10 text-[#ff6b6b] border border-pink-100 dark:border-pink-500/20'
                    : 'bg-gray-50 dark:bg-[#24283b] text-gray-500 dark:text-gray-400 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <pattern.icon size={16} />
                  <span className="text-xs font-bold">{pattern.label}</span>
                </div>
                {backgroundConfig.pattern === pattern.id && (
                  <div className="w-1.5 h-1.5 bg-[#ff6b6b] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Intensity */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Pattern Intensity</p>
            <span className="text-[10px] font-mono text-[#ff6b6b]">{Math.round(backgroundConfig.patternOpacity * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={backgroundConfig.patternOpacity}
            onChange={(e) => setBackgroundConfig({ ...backgroundConfig, patternOpacity: parseFloat(e.target.value) })}
            className="w-full h-1.5 bg-gray-100 dark:bg-[#414868] rounded-full appearance-none cursor-pointer accent-[#ff6b6b]"
          />
        </section>
      </div>

      <div className="p-4 bg-gray-50/50 dark:bg-[#1f2335]/50 border-t border-gray-100 dark:border-[#414868]">
        <p className="text-[10px] text-gray-400 text-center leading-relaxed italic">
          Canvas texture affects your focus. Choose what feels right for your flow.
        </p>
      </div>
    </motion.div>
  );
}
