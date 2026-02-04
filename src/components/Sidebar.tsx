import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Settings,
  History,
  Keyboard,
  Download,
  Trash2,
  Grid
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHistory: () => void;
  onOpenShortcuts: () => void;
  onOpenBackground: () => void;
  onClearAll: () => void;
  onExport: () => void;
  currentRoomId?: string;
}

export function Sidebar({
  isOpen,
  onClose,
  onOpenHistory,
  onOpenShortcuts,
  onOpenBackground,
  onClearAll,
  onExport,
  currentRoomId
}: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[80]"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-[#1a1b26] z-[90] shadow-2xl flex flex-col"
          >
            <div className="h-16 border-b border-[#dee2e6] dark:border-[#414868] flex items-center justify-between px-6">
              <span className="font-bold text-lg">Menu</span>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-[#24283b] rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="p-6 space-y-3 overflow-y-auto h-full">
                <div className="px-2 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest">Workspace</div>

                <button onClick={onOpenBackground} className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-100 dark:hover:bg-[#24283b] rounded-2xl transition-colors text-left group">
                  <Grid size={22} className="text-gray-400 group-hover:text-[#ff6b6b] transition-colors" />
                  <span className="font-semibold text-base">Background</span>
                </button>

                <button onClick={onOpenHistory} className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-100 dark:hover:bg-[#24283b] rounded-2xl transition-colors text-left group">
                  <History size={22} className="text-gray-400 group-hover:text-[#ff6b6b] transition-colors" />
                  <span className="font-semibold text-base">History</span>
                </button>

                <div className="px-2 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest mt-8">Actions</div>

                <button onClick={onExport} className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-100 dark:hover:bg-[#24283b] rounded-2xl transition-colors text-left group">
                  <Download size={22} className="text-gray-400 group-hover:text-[#ff6b6b] transition-colors" />
                  <span className="font-semibold text-base">Export</span>
                </button>

                <button onClick={onClearAll} className="w-full flex items-center gap-4 px-5 py-4 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-colors text-left group">
                  <Trash2 size={22} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                  <span className="font-semibold text-base text-red-500">Clear Canvas</span>
                </button>

                {currentRoomId && (
                  <button
                    onClick={() => {
                      const url = `${window.location.origin}?room=${currentRoomId}`;
                      navigator.clipboard.writeText(url);
                      alert("Link copied! Share it with friends.");
                      onClose();
                    }}
                    className="w-full flex items-center gap-4 px-5 py-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-colors text-left group"
                  >
                    <Settings size={22} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                    <span className="font-semibold text-base text-blue-500">Share Link</span>
                  </button>
                )}

                <div className="px-2 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest mt-8">Help</div>

                <button onClick={onOpenShortcuts} className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-100 dark:hover:bg-[#24283b] rounded-2xl transition-colors text-left group">
                  <Keyboard size={22} className="text-gray-400 group-hover:text-[#ff6b6b] transition-colors" />
                  <span className="font-semibold text-base">Shortcuts</span>
                </button>
              </div>
            </div>

            <div className="p-4 border-t border-[#dee2e6] dark:border-[#414868]">
              <div className="text-xs text-gray-400 font-mono text-center">Room: {currentRoomId}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
