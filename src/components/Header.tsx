import React from 'react';
import { Menu, Moon, Sun, Users, Share2, Palette } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  currentRoomId?: string;
  collaborators?: any[];
}

export function Header({ theme, toggleTheme, isSidebarOpen, setIsSidebarOpen, currentRoomId, collaborators = [] }: HeaderProps) {
  const handleInvite = () => {
    if (currentRoomId) {
      const url = `${window.location.origin}?room=${currentRoomId}`;
      navigator.clipboard.writeText(url);
      toast.success("Room link copied to clipboard!");
    }
  };

  return (
    <header className="h-16 border-b border-[#dee2e6] dark:border-[#414868] flex items-center justify-between px-6 bg-white/80 dark:bg-[#1a1b26]/80 backdrop-blur-md z-[60]">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-[#24283b] rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-[#ff6b6b] to-[#f06595] rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-pink-500/20">
            L
          </div>
          <div className="flex flex-col">
            <input
              defaultValue="Untitled Project"
              className="bg-transparent font-bold text-sm focus:outline-none focus:ring-1 focus:ring-[#ff6b6b] rounded px-1 -ml-1 transition-all w-32 sm:w-48"
            />
            <div className="flex items-center gap-1.5 px-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Sync Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {collaborators.length > 0 && (
          <div className="hidden md:flex items-center -space-x-2 mr-4">
            {collaborators.slice(0, 3).map((collab, i) => (
              <div
                key={collab.id || i}
                className="w-8 h-8 rounded-full border-2 border-white dark:border-[#1a1b26] flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: collab.color || '#ff6b6b' }}
                title={collab.name || 'Anonymous'}
              >
                <span className="text-white text-xs font-bold">
                  {(collab.name || 'A')[0].toUpperCase()}
                </span>
              </div>
            ))}
            {collaborators.length > 3 && (
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-[#1a1b26] bg-[#e9ecef] dark:bg-[#24283b] flex items-center justify-center text-[10px] font-bold">
                +{collaborators.length - 3}
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleInvite}
          className="flex items-center gap-2 px-4 py-2 bg-[#ff6b6b]/10 text-[#ff6b6b] hover:bg-[#ff6b6b]/20 rounded-xl transition-colors font-medium text-sm"
        >
          <Share2 size={16} />
          <span className="hidden sm:inline">Invite</span>
        </button>

        <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1"></div>

        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-100 dark:hover:bg-[#24283b] rounded-xl transition-colors"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
}
