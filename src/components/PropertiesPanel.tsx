import React from 'react';
import { Sliders, Maximize2, Move, Droplets, Type } from 'lucide-react';
import { motion } from 'motion/react';

interface PropertiesPanelProps {
  brushSettings: {
    color: string;
    size: number;
    opacity: number;
  };
  setBrushSettings: (settings: any) => void;
}

export function PropertiesPanel({ brushSettings, setBrushSettings }: PropertiesPanelProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white/90 dark:bg-[#1a1b26]/90 backdrop-blur-xl border border-[#dee2e6] dark:border-[#414868] rounded-3xl p-5 shadow-2xl w-full"
    >
      <div className="flex items-center gap-2 mb-6 border-b border-[#dee2e6] dark:border-[#414868] pb-3">
        <Sliders size={16} className="text-[#ff6b6b]" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Properties</h3>
      </div>

      <div className="space-y-6">
        {/* Size Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase text-gray-400">
            <span className="flex items-center gap-1"><Maximize2 size={12} /> Brush Size</span>
            <span>{brushSettings.size}px</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="100" 
            value={brushSettings.size}
            onChange={(e) => setBrushSettings({ ...brushSettings, size: parseInt(e.target.value) })}
            className="w-full accent-[#ff6b6b] h-1.5 bg-gray-100 dark:bg-[#24283b] rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Opacity Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase text-gray-400">
            <span className="flex items-center gap-1"><Droplets size={12} /> Opacity</span>
            <span>{Math.round(brushSettings.opacity * 100)}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={brushSettings.opacity * 100}
            onChange={(e) => setBrushSettings({ ...brushSettings, opacity: parseInt(e.target.value) / 100 })}
            className="w-full accent-[#ff6b6b] h-1.5 bg-gray-100 dark:bg-[#24283b] rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="h-[1px] bg-gray-100 dark:bg-[#414868]"></div>

        {/* Quick Presets */}
        <div className="grid grid-cols-4 gap-2">
          {[2, 8, 16, 32].map((s) => (
            <button
              key={s}
              onClick={() => setBrushSettings({ ...brushSettings, size: s })}
              className={`aspect-square flex items-center justify-center rounded-xl border text-[10px] font-bold transition-all ${
                brushSettings.size === s 
                ? 'bg-[#ff6b6b] text-white border-transparent shadow-lg' 
                : 'bg-white dark:bg-[#24283b] border-[#dee2e6] dark:border-[#414868] text-gray-400 hover:border-[#ff6b6b]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
