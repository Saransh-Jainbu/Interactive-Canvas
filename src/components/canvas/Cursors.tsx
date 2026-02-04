import React from 'react';
import { motion } from 'motion/react';
import { MousePointer2 } from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
}

interface CursorsProps {
  collaborators: Collaborator[];
  zoom: number;
  pan: { x: number; y: number };
}

export function Cursors({ collaborators, zoom, pan }: CursorsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {collaborators.map((c) => (
        <motion.div
          key={c.id}
          className="absolute"
          animate={{
            x: c.x * zoom + pan.x,
            y: c.y * zoom + pan.y,
          }}
          transition={{ type: 'spring', damping: 40, stiffness: 200, mass: 0.5 }}
        >
          <div className="relative">
            <MousePointer2 
              size={18} 
              fill={c.color} 
              className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" 
            />
            <div 
              className="absolute left-4 top-4 px-2 py-0.5 rounded-full text-[10px] font-bold text-white whitespace-nowrap shadow-lg"
              style={{ backgroundColor: c.color }}
            >
              {c.name}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
