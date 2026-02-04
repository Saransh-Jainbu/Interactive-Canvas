import React from 'react';
import { X, Settings, Download, Trash2, HelpCircle, Layers, History, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHistory: () => void;
  onOpenShortcuts: () => void;
  onOpenBackground: () => void;
  onClearAll: () => void;
  onExport: () => void;
}

export function Sidebar({ isOpen, onClose, onOpenHistory, onOpenShortcuts, onOpenBackground, onClearAll, onExport }: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[60]"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-[#1a1b26] border-r border-[#dee2e6] dark:border-[#414868] shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-6 border-b border-[#dee2e6] dark:border-[#414868] flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Settings size={22} className="text-[#ff6b6b]" />
                Workspace
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-[#24283b] rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
              <section>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 px-2">Canvas</h3>
                <div className="space-y-1">
                  <SidebarItem icon={Layers} label="Layers" active />
                  <SidebarItem icon={History} label="History" onClick={() => { onOpenHistory(); onClose(); }} />
                  <SidebarItem icon={ImageIcon} label="Background" onClick={() => { onOpenBackground(); onClose(); }} />
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 px-2">Actions</h3>
                <div className="space-y-1">
                  <SidebarItem icon={Download} label="Export Canvas" onClick={() => { onExport(); onClose(); }} />
                  <SidebarItem icon={Trash2} label="Clear All" color="text-red-400" onClick={() => { onClearAll(); onClose(); }} />
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 px-2">Support</h3>
                <div className="space-y-1">
                  <SidebarItem icon={HelpCircle} label="Shortcuts" onClick={() => { onOpenShortcuts(); onClose(); }} />
                  <SidebarItem icon={Settings} label="App Settings" />
                </div>
              </section>
            </div>

            <div className="p-6 mt-auto border-t border-[#dee2e6] dark:border-[#414868] bg-gray-50/50 dark:bg-[#24283b]/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#f06595]"></div>
                <div>
                  <p className="text-sm font-bold">Lofi Studio</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Free Plan</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SidebarItem({ icon: Icon, label, onClick, active = false, color = "" }: { icon: any, label: string, onClick?: () => void, active?: boolean, color?: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-[#ff6b6b]/10 text-[#ff6b6b]' 
        : 'hover:bg-gray-100 dark:hover:bg-[#24283b] text-gray-600 dark:text-gray-400'
    }`}>
      <Icon size={18} className={`${active ? 'text-[#ff6b6b]' : color || 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200'}`} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
