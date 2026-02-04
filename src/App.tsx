import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { InfiniteCanvas } from './components/canvas/InfiniteCanvas';
import { Sidebar } from './components/Sidebar';
import { Chat } from './components/Chat';
import { Toolbar } from './components/Toolbar';
import { PropertiesPanel } from './components/PropertiesPanel';
import { MusicPlayer } from './components/MusicPlayer';
import { Cursors } from './components/canvas/Cursors';
import { HistoryPanel } from './components/HistoryPanel';
import { ShortcutsModal } from './components/ShortcutsModal';
import { BackgroundPanel } from './components/BackgroundPanel';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from "sonner@2.0.3";

import { LandingPage } from './components/LandingPage';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTool, setActiveTool] = useState('pencil');
  const [brushSettings, setBrushSettings] = useState({
    color: '#ff6b6b',
    size: 5,
    opacity: 1,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProperties, setShowProperties] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  
  const [backgroundConfig, setBackgroundConfig] = useState({
    color: '#fafaf9',
    pattern: 'grid' as 'none' | 'grid' | 'dots',
    patternOpacity: 0.1,
  });

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [paths, setPaths] = useState<any[]>([]);
  const [redoStack, setRedoStack] = useState<any[]>([]);

  const undo = useCallback(() => {
    if (paths.length === 0) return;
    const lastPath = paths[paths.length - 1];
    setPaths(prev => prev.slice(0, -1));
    setRedoStack(prev => [...prev, lastPath]);
  }, [paths]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;
    const lastRedo = redoStack[redoStack.length - 1];
    setRedoStack(prev => prev.slice(0, -1));
    setPaths(prev => [...prev, lastRedo]);
  }, [redoStack]);

  const clearAll = useCallback(() => {
    if (paths.length === 0) return;
    if (confirm('Are you sure you want to clear the entire workspace?')) {
      setRedoStack([...paths]);
      setPaths([]);
      toast.success("Canvas cleared");
    }
  }, [paths]);

  const exportCanvas = useCallback(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    // To export with background, we create a temporary canvas
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Fill background
    ctx.fillStyle = theme === 'dark' ? '#0f111a' : '#fafaf9';
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Draw the main canvas content
    ctx.drawImage(canvas, 0, 0);

    const link = document.createElement('a');
    link.download = `lofi-sketch-${new Date().getTime()}.png`;
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
    toast.success("Artboard exported");
  }, [theme]);

  // Shortcut handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        redo();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault();
        exportCanvas();
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (!isChatOpen) clearAll();
      }
      
      // Tool selection
      if (e.key.toLowerCase() === 'v') setActiveTool('select');
      if (e.key.toLowerCase() === 'p') setActiveTool('pencil');
      if (e.key.toLowerCase() === 'e') setActiveTool('eraser');
      if (e.key.toLowerCase() === 'r') setActiveTool('rectangle');
      if (e.key.toLowerCase() === 't') setActiveTool('text');
      if (e.key.toLowerCase() === 'h') setShowHistory(prev => !prev);
      if (e.key === '?') setShowShortcuts(prev => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, clearAll, exportCanvas, isChatOpen]);

  // Simulated collaborators for "big scale" feel
  const [collaborators, setCollaborators] = useState([
    { id: '1', name: 'LofiCat', x: 200, y: 300, color: '#f06595' },
    { id: '2', name: 'CoffeeBean', x: 500, y: 150, color: '#339af0' },
  ]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setBackgroundConfig(prev => ({ ...prev, color: '#0f111a' }));
    } else {
      document.documentElement.classList.remove('dark');
      setBackgroundConfig(prev => ({ ...prev, color: '#fafaf9' }));
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  return (
    <div className={`fixed inset-0 flex flex-col overflow-hidden transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#0f111a] text-[#c0caf5]' : 'bg-[#fafaf9] text-[#44403c]'
    }`}>
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] contrast-150 z-[100]" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')` }}></div>

      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main className="flex-1 relative flex overflow-hidden">
        {/* The Workspace */}
        <div className="flex-1 relative bg-grid-pattern dark:bg-grid-pattern-dark overflow-hidden">
          <InfiniteCanvas 
            activeTool={activeTool} 
            setActiveTool={setActiveTool}
            brushSettings={brushSettings}
            backgroundConfig={backgroundConfig}
            zoom={zoom}
            setZoom={setZoom}
            pan={pan}
            setPan={setPan}
            theme={theme}
            paths={paths}
            setPaths={setPaths}
            setRedoStack={setRedoStack}
          />

          {/* New History Panel */}
          <AnimatePresence>
            {showHistory && (
              <HistoryPanel 
                paths={paths} 
                setPaths={setPaths} 
                onClose={() => setShowHistory(false)} 
              />
            )}
          </AnimatePresence>

          {/* New Background Panel */}
          <AnimatePresence>
            {showBackground && (
              <BackgroundPanel 
                backgroundConfig={backgroundConfig}
                setBackgroundConfig={setBackgroundConfig}
                theme={theme}
                onClose={() => setShowBackground(false)} 
              />
            )}
          </AnimatePresence>

          {/* Presence Layer */}
          <Cursors collaborators={collaborators} zoom={zoom} pan={pan} />
          
          {/* Canvas Navigation Info */}
          <div className="absolute top-24 left-6 hidden md:flex items-center gap-4 bg-white/80 dark:bg-[#1a1b26]/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#dee2e6] dark:border-[#414868] text-[10px] font-mono font-bold tracking-widest uppercase text-gray-400 z-30">
            <span>ZOOM: {Math.round(zoom * 100)}%</span>
            <div className="w-[1px] h-3 bg-gray-200 dark:bg-gray-700"></div>
            <span>POS: {Math.round(pan.x)}, {Math.round(pan.y)}</span>
          </div>

          {/* Desktop Panels */}
          <div className="absolute top-20 right-6 z-40 hidden md:block">
            <PropertiesPanel 
              brushSettings={brushSettings}
              setBrushSettings={setBrushSettings}
            />
          </div>

          <div className="absolute top-20 left-6 z-40 hidden md:block">
            <MusicPlayer />
          </div>

          {/* UI Overlays */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-4 w-full px-4 pointer-events-none">
            <AnimatePresence>
              {showProperties && (
                <motion.div 
                  initial={{ y: 20, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 20, opacity: 0, scale: 0.95 }}
                  className="w-full max-w-sm pointer-events-auto"
                >
                  <div className="relative">
                    <PropertiesPanel 
                      brushSettings={brushSettings}
                      setBrushSettings={setBrushSettings}
                    />
                    <button 
                      onClick={() => setShowProperties(false)}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-[#1a1b26] rounded-full shadow-lg border border-[#dee2e6] dark:border-[#414868] flex items-center justify-center text-gray-400 hover:text-[#ff6b6b] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex items-center gap-2 pointer-events-auto">
              <Toolbar 
                activeTool={activeTool} 
                setActiveTool={(tool) => {
                  if (activeTool === tool) {
                    setShowProperties(!showProperties);
                  } else {
                    setActiveTool(tool);
                  }
                }}
                brushSettings={brushSettings}
                setBrushSettings={setBrushSettings}
                undo={undo}
                redo={redo}
                canUndo={paths.length > 0}
                canRedo={redoStack.length > 0}
                clearAll={clearAll}
                exportCanvas={exportCanvas}
                toggleHistory={() => setShowHistory(!showHistory)}
                toggleShortcuts={() => setShowShortcuts(!showShortcuts)}
                showHistory={showHistory}
              />
            </div>
          </div>
        </div>

        {/* Modal Overlays */}
        <AnimatePresence>
          {showShortcuts && (
            <ShortcutsModal onClose={() => setShowShortcuts(false)} />
          )}
        </AnimatePresence>

        {/* Messaging Interface */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="fixed right-0 top-16 bottom-0 w-85 z-[70] shadow-[-20px_0_40px_rgba(0,0,0,0.05)] dark:shadow-[-20px_0_40px_rgba(0,0,0,0.3)]"
            >
              <Chat onClose={() => setIsChatOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification Bubble */}
        <AnimatePresence>
          {!isChatOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsChatOpen(true)}
              className="fixed right-6 bottom-32 md:bottom-8 p-5 rounded-2xl shadow-2xl bg-white dark:bg-[#24283b] hover:translate-y-[-4px] transition-all z-[55] border border-[#e5e7eb] dark:border-[#414868] group"
            >
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff6b6b] group-hover:scale-110 transition-transform"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500 items-center justify-center text-[8px] text-white font-bold">2</span>
                </span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          onOpenHistory={() => setShowHistory(true)}
          onOpenShortcuts={() => setShowShortcuts(true)}
          onOpenBackground={() => setShowBackground(true)}
          onClearAll={clearAll}
          onExport={exportCanvas}
        />
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
        }
        .dark .bg-grid-pattern-dark {
          background-image: 
            linear-gradient(to right, #24283b 1px, transparent 1px),
            linear-gradient(to bottom, #24283b 1px, transparent 1px);
        }
        .bg-dots-pattern {
          background-image: radial-gradient(#e5e7eb 1.5px, transparent 1.5px);
        }
        .dark .bg-dots-pattern-dark {
          background-image: radial-gradient(#24283b 1.5px, transparent 1.5px);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
