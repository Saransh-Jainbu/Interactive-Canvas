import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  Users,
  Palette,
  Layers,
  Github
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onStart: () => void;
}

const features = [
  {
    icon: Sparkles,
    title: "Infinite Canvas",
    description: "Never run out of space. A boundless workspace for your biggest ideas and smallest details."
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description: "Work together flawlessly. See cursors, live changes, and chat with your team in real-time."
  },
  {
    icon: Palette,
    title: "Lofi Aesthetic",
    description: "A premium design language inspired by minimalist lofi aesthetics. Beautiful, clean, and distraction-free."
  },
  {
    icon: Layers,
    title: "Powerful Tools",
    description: "Advanced drawing tools, shapes, and textures with full undo/redo and history tracking."
  }
];

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0f111a] text-gray-900 dark:text-[#c0caf5] overflow-x-hidden selection:bg-[#ff6b6b]/30">
      {/* Hero Background Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Decorative Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#ff6b6b]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#7aa2f7]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-[110] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-[#ff6b6b] rounded-2xl flex items-center justify-center shadow-lg shadow-[#ff6b6b]/20">
              <Sparkles className="text-white" size={20} />
            </div>
            <span className="font-bold text-xl tracking-tighter">FIGMA MAKE</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <button
              onClick={onStart}
              className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl text-sm font-bold shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Enter Workspace
            </button>
          </motion.div>
        </div>
      </nav>

      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ff6b6b]/10 text-[#ff6b6b] rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <Sparkles size={12} />
                <span>Next Gen Canvas Builder</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tightest leading-[0.9] mb-8 bg-clip-text text-transparent bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-200 dark:to-gray-400">
                Design <br /> Without <br /> <span className="text-[#ff6b6b]">Boundaries.</span>
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-lg mb-10 leading-relaxed font-medium">
                The most sophisticated collaborative canvas for modern teams. Built with a premium lofi aesthetic and professional-grade drawing tools.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={onStart}
                  className="w-full sm:w-auto px-8 py-5 bg-[#ff6b6b] text-white rounded-[24px] font-bold text-lg shadow-2xl shadow-[#ff6b6b]/30 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all group"
                >
                  Start Drawing
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-8 py-5 bg-white dark:bg-[#1a1b26] border border-gray-200 dark:border-[#414868] text-gray-900 dark:text-white rounded-[24px] font-bold text-lg shadow-sm hover:bg-gray-50 dark:hover:bg-[#24283b] transition-all flex items-center justify-center gap-3">
                  <Github size={20} />
                  View Project
                </button>
              </div>

              <div className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-[#0f111a] overflow-hidden bg-gray-200">
                      <ImageWithFallback
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-bold text-gray-400 tracking-tight">
                  <span className="text-gray-900 dark:text-white">Join 2,000+</span> creators globally
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.4, duration: 1, type: "spring" }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 bg-linear-to-br from-[#ff6b6b]/20 to-[#7aa2f7]/20 blur-3xl opacity-50" />
              <div className="relative h-full bg-white/50 dark:bg-[#1a1b26]/50 backdrop-blur-xl rounded-[48px] border border-white dark:border-white/10 shadow-2xl overflow-hidden group">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1571647627378-e4ed42e700fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZGVzaWduZXIlMjB3b3Jrc3BhY2UlMjBjb2xsYWJvcmF0aXZlJTIwZHJhd2luZ3xlbnwxfHx8fDE3NzAxNzk5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Interface Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />

                {/* Floating UI Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 left-10 p-4 bg-white/90 dark:bg-[#1a1b26]/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-[#ff6b6b] flex items-center justify-center text-white">
                    <Palette size={14} />
                  </div>
                  <div className="pr-4">
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Active Tool</div>
                    <div className="text-xs font-bold">Magic Pencil</div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-10 right-10 p-4 bg-white/90 dark:bg-[#1a1b26]/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 flex items-center gap-3"
                >
                  <div className="flex -space-x-2">
                    {[1, 2].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#1a1b26] bg-gray-200 overflow-hidden">
                        <ImageWithFallback src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="user" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Collaborators</div>
                    <div className="text-xs font-bold">2 people editing</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-white/40 dark:bg-[#1a1b26]/40 backdrop-blur-sm border border-gray-100 dark:border-[#414868] rounded-[32px] hover:bg-white dark:hover:bg-[#24283b] transition-all group shadow-sm hover:shadow-xl"
              >
                <div className="w-14 h-14 bg-gray-50 dark:bg-[#0f111a] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all">
                  <feature.icon className="text-[#ff6b6b]" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[48px] bg-gray-900 dark:bg-[#1a1b26] p-12 md:p-24 overflow-hidden text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b6b]/20 to-transparent opacity-50" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">Ready to build your masterpiece?</h2>
              <p className="text-gray-400 text-lg mb-12 font-medium">Join thousands of creators who have already started designing without limits.</p>
              <button
                onClick={onStart}
                className="px-12 py-5 bg-white text-gray-900 rounded-[24px] font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
              >
                Launch Experience
              </button>
            </div>

            {/* Background elements for CTA */}
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <Sparkles size={120} className="text-[#ff6b6b]" />
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 dark:border-[#1a1b26]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
          <div className="text-sm font-bold tracking-tight">© 2026 FIGMA MAKE STUDIO</div>
          <div className="flex items-center gap-8">
            <button className="text-xs font-black uppercase tracking-widest hover:opacity-100 transition-opacity">Privacy</button>
            <button className="text-xs font-black uppercase tracking-widest hover:opacity-100 transition-opacity">Terms</button>
            <button className="text-xs font-black uppercase tracking-widest hover:opacity-100 transition-opacity">Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
