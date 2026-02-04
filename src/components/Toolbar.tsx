import React, { useState } from 'react';
import {
  Pencil,
  Eraser,
  Square,
  Circle,
  Type,
  MousePointer2,
  Minus,
  Plus,
  Undo2,
  Redo2,
  Trash2,
  Download,
  History,
  Keyboard,
  Triangle,
  ArrowUpRight,
  ChevronUp,
  Settings2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ToolbarProps {
  activeTool: string;
  setActiveTool: (tool: string) => void;
  brushSettings: { color: string; size: number };
  setBrushSettings: (settings: any) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  clearAll: () => void;
  exportCanvas: () => void;
  toggleHistory: () => void;
  toggleShortcuts: () => void;
  showHistory: boolean;
}

const colors = [
  '#ff6b6b', '#f06595', '#cc5de8', '#845ef7',
  '#339af0', '#20c997', '#51cf66', '#fcc419', '#ff922b',
  '#44403c', '#d6d3d1', '#ffffff'
];

const shapes = [
  { id: 'rectangle', icon: Square, label: 'Rectangle' },
  { id: 'circle', icon: Circle, label: 'Circle' },
  { id: 'triangle', icon: Triangle, label: 'Triangle' },
  { id: 'arrow', icon: ArrowUpRight, label: 'Arrow' },
  { id: 'line', icon: Minus, label: 'Line' },
];

export function Toolbar({
  activeTool,
  setActiveTool,
  brushSettings,
  setBrushSettings,
  undo,
  redo,
  canUndo,
  canRedo,
  clearAll,
  exportCanvas,
  toggleHistory,
  toggleShortcuts,
  showHistory
}: ToolbarProps) {
  const [showShapes, setShowShapes] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const getToolIcon = (id: string) => {
    switch (id) {
      case 'select': return <MousePointer2 size={18} />;
      case 'pencil': return <Pencil size={18} />;
      case 'eraser': return <Eraser size={18} />;
      case 'text': return <Type size={18} />;
      case 'rectangle': return <Square size={18} />;
      case 'circle': return <Circle size={18} />;
      case 'triangle': return <Triangle size={18} />;
      case 'arrow': return <ArrowUpRight size={18} />;
      case 'line': return <Minus size={18} />;
      default: return <Pencil size={18} />;
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/95 dark:bg-[#1a1b26]/95 backdrop-blur-2xl border border-[#dee2e6] dark:border-[#414868] rounded-[24px] md:rounded-full p-2 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center gap-1.5 max-w-[calc(100vw-32px)]"
    >
      <div className="flex items-center gap-1 shrink-0 px-1">
        {/* Basic Tools */}
        {['select', 'pencil', 'eraser'].map((id) => (
          <button
            key={id}
            onClick={() => {
              setActiveTool(id);
              setShowShapes(false);
            }}
            className={`p-2.5 md:p-3 rounded-[18px] md:rounded-full transition-all duration-400 group relative active:scale-90 ${activeTool === id
              ? 'bg-[#ff6b6b] text-white shadow-lg shadow-pink-500/25 ring-2 ring-pink-500/10'
              : 'hover:bg-gray-100 dark:hover:bg-[#24283b] text-gray-500 dark:text-[#c0caf5]'
              }`}
          >
            {getToolIcon(id)}
            <span className="hidden md:block absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/90 text-white text-[10px] rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap font-bold tracking-wider backdrop-blur-sm border border-white/10 shadow-xl">
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </span>
          </button>
        ))}

        {/* Shapes Menu */}
        <div className="relative isolate">
          <button
            onClick={() => setShowShapes(!showShapes)}
            className={`p-2.5 md:p-3 rounded-[18px] md:rounded-full transition-all duration-400 group relative active:scale-90 ${shapes.some(s => s.id === activeTool)
              ? 'bg-[#ff6b6b] text-white shadow-lg shadow-pink-500/25 ring-2 ring-pink-500/10'
              : 'hover:bg-gray-100 dark:hover:bg-[#24283b] text-gray-500 dark:text-[#c0caf5]'
              }`}
          >
            {shapes.some(s => s.id === activeTool) ? getToolIcon(activeTool) : <Square size={18} />}
            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center border border-white dark:border-[#1a1b26] transition-transform ${showShapes ? 'rotate-180 bg-[#ff6b6b]' : 'bg-gray-400'}`}>
              <ChevronUp size={8} className="text-white" />
            </div>
          </button>

          <AnimatePresence>
            {showShapes && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: -10, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white/95 dark:bg-[#1a1b26]/95 backdrop-blur-xl border border-[#dee2e6] dark:border-[#414868] rounded-2xl p-2 shadow-2xl flex flex-col gap-1 min-w-[140px] z-[100]"
              >
                {shapes.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => {
                      setActiveTool(shape.id);
                      setShowShapes(false);
                    }}
                    className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs transition-colors font-bold ${activeTool === shape.id
                      ? 'bg-[#ff6b6b]/10 text-[#ff6b6b]'
                      : 'hover:bg-gray-50 dark:hover:bg-[#24283b] text-gray-500'
                      }`}
                  >
                    <shape.icon size={14} />
                    <span>{shape.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-[1px] h-8 bg-gray-200 dark:bg-[#414868] shrink-0 mx-0.5"></div>

      {/* Desktop Color List (Hidden on Mobile) */}
      <div className="hidden md:flex items-center gap-2 overflow-x-auto no-scrollbar px-2 shrink-0 max-w-none py-1.5 isolate">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setBrushSettings({ ...brushSettings, color })}
            className={`w-6 h-6 rounded-full transition-all duration-300 active:scale-75 flex-shrink-0 relative ${brushSettings.color === color
              ? 'ring-2 ring-offset-2 ring-pink-500 dark:ring-offset-[#1a1b26]'
              : 'hover:scale-110 shadow-sm'
              }`}
            style={{
              backgroundColor: color,
              border: '1.5px solid rgba(0,0,0,0.08)'
            }}
          >
            {brushSettings.color === color && (
              <motion.div
                layoutId="activeColorIndicator"
                className="absolute inset-0 rounded-full flex items-center justify-center"
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
              </motion.div>
            )}
          </button>
        ))}

        {/* Custom Color Picker Desktop */}
        <div className="relative flex-shrink-0">
          <input
            type="color"
            value={brushSettings.color}
            onChange={(e) => setBrushSettings({ ...brushSettings, color: e.target.value })}
            className="absolute inset-0 opacity-0 cursor-pointer w-6 h-6"
            title="Custom color"
          />
          <div
            className="w-6 h-6 rounded-full transition-all duration-300 hover:scale-110 active:scale-75 flex items-center justify-center cursor-pointer"
            style={{
              background: 'conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
              border: '1.5px solid rgba(0,0,0,0.08)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
        </div>
      </div>

      {/* Mobile Color Trigger & Popover */}
      <div className="relative md:hidden px-2">
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="w-8 h-8 rounded-full shadow-sm border-2 border-white dark:border-[#414868] ring-2 ring-gray-100 dark:ring-[#24283b] transition-transform active:scale-90 relative"
          style={{ backgroundColor: brushSettings.color }}
        >
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-white dark:bg-[#1a1b26] rounded-full flex items-center justify-center border border-gray-200 dark:border-[#414868]">
            <ChevronUp size={8} className={`transition-transform duration-300 ${showColorPicker ? 'rotate-180' : ''}`} />
          </div>
        </button>

        <AnimatePresence>
          {showColorPicker && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: -50, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-white/95 dark:bg-[#1a1b26]/95 backdrop-blur-xl border border-[#dee2e6] dark:border-[#414868] rounded-2xl shadow-2xl z-[100] w-[200px]"
            >
              <div className="grid grid-cols-4 gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setBrushSettings({ ...brushSettings, color });
                      setShowColorPicker(false);
                    }}
                    className={`w-8 h-8 rounded-full relative ${brushSettings.color === color ? 'ring-2 ring-offset-2 ring-pink-500' : ''
                      }`}
                    style={{ backgroundColor: color, border: '1px solid rgba(0,0,0,0.1)' }}
                  />
                ))}

                {/* Custom Picker Mobile */}
                <div className="relative w-8 h-8">
                  <input
                    type="color"
                    onChange={(e) => {
                      setBrushSettings({ ...brushSettings, color: e.target.value });
                      setShowColorPicker(false);
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="w-full h-full rounded-full border border-gray-200"
                    style={{ background: 'conic-gradient(from 0deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)' }}
                  />
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 text-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Color</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-[1px] h-8 bg-gray-200 dark:bg-[#414868] shrink-0 mx-0.5 hidden sm:block"></div>

      <div className="flex items-center gap-0.5 shrink-0 px-1">
        <button
          onClick={undo}
          disabled={!canUndo}
          className={`p-2 rounded-full transition-all active:scale-95 group relative ${canUndo
            ? 'hover:bg-gray-100 dark:hover:bg-[#24283b] text-gray-500 dark:text-[#c0caf5]'
            : 'text-gray-200 dark:text-gray-800 cursor-not-allowed'
            }`}
        >
          <Undo2 size={18} />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className={`p-2 rounded-full transition-all active:scale-95 group relative ${canRedo
            ? 'hover:bg-gray-100 dark:hover:bg-[#24283b] text-gray-500 dark:text-[#c0caf5]'
            : 'text-gray-200 dark:text-gray-800 cursor-not-allowed'
            }`}
        >
          <Redo2 size={18} />
        </button>

        <div className="w-[1px] h-4 bg-gray-200 dark:bg-[#414868] mx-1 hidden sm:block"></div>

        <button
          onClick={toggleHistory}
          className={`p-2 rounded-full transition-all active:scale-95 hidden sm:block ${showHistory
            ? 'bg-pink-50 text-[#ff6b6b] dark:bg-pink-500/10'
            : 'hover:bg-gray-100 dark:hover:bg-[#24283b] text-gray-500 dark:text-[#c0caf5]'
            }`}
        >
          <History size={18} />
        </button>

        <button
          onClick={toggleShortcuts}
          className="p-2 rounded-full transition-all active:scale-95 hover:bg-gray-100 dark:hover:bg-[#24283b] text-gray-500 dark:text-[#c0caf5] hidden sm:block"
        >
          <Keyboard size={18} />
        </button>

        <button
          onClick={exportCanvas}
          className="p-2 rounded-full transition-all active:scale-95 hover:bg-gray-100 dark:hover:bg-[#24283b] text-gray-500 dark:text-[#c0caf5] hidden sm:block"
        >
          <Download size={18} />
        </button>

        <button
          onClick={clearAll}
          className="p-2 rounded-full transition-all active:scale-95 hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 hidden sm:block"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
}
