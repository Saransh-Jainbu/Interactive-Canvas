import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  Users,
  Palette,
  Zap,
  Github,
  Pencil,
  Globe,
  MousePointer2,
  MessageSquare,
  Download,
} from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const features = [
  {
    icon: Zap,
    title: 'Infinite Canvas',
    description: 'Pan and zoom without limits. Your ideas have a workspace that never runs out of space.',
    gradient: 'from-[#ff6b6b] to-[#f06595]',
    glow: '#ff6b6b',
  },
  {
    icon: Users,
    title: 'Real-time Collaboration',
    description: 'See live cursors, strokes, and chat with teammates — all synchronized in under 50ms.',
    gradient: 'from-[#7aa2f7] to-[#bb9af7]',
    glow: '#7aa2f7',
  },
  {
    icon: Palette,
    title: 'Rich Drawing Tools',
    description: 'Pencil, shapes, text, and eraser — with full control over color, size, and opacity.',
    gradient: 'from-[#ff9e64] to-[#ffc777]',
    glow: '#ff9e64',
  },
  {
    icon: Globe,
    title: 'Share Instantly',
    description: 'Copy a room link and collaborate right away. No installs or account required for guests.',
    gradient: 'from-[#73daca] to-[#41a6b5]',
    glow: '#73daca',
  },
];

const stats = [
  { num: '∞', label: 'Canvas Size' },
  { num: '<50ms', label: 'Sync Latency' },
  { num: '2K+', label: 'Active Users' },
  { num: '100%', label: 'Free to Use' },
];

const CURSORS = [
  { name: 'Alex', color: '#ff6b6b', from: { x: 40, y: 190 }, to: [{ x: 200, y: 130 }, { x: 340, y: 110 }] },
  { name: 'Sam', color: '#7aa2f7', from: { x: 300, y: 310 }, to: [{ x: 180, y: 260 }, { x: 80, y: 240 }] },
];

function CanvasPreview() {
  return (
    <div className="relative w-full h-full bg-[#fafafa] dark:bg-[#16181f]">
      {/* Dot grid */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="#d1d5db" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" className="opacity-60 dark:opacity-20" />
      </svg>

      {/* SVG drawing layer */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 360">
        {/* Freehand stroke 1 */}
        <motion.path
          d="M 50 200 C 90 150, 150 120, 210 155 S 310 180, 360 130"
          stroke="#ff6b6b" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: 'easeInOut' }}
        />
        {/* Freehand stroke 2 */}
        <motion.path
          d="M 30 270 C 80 240, 140 260, 200 245 S 300 220, 370 255"
          stroke="#7aa2f7" strokeWidth="2.5" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.0, ease: 'easeInOut' }}
        />
        {/* Rectangle */}
        <motion.rect
          x="215" y="85" width="130" height="90" rx="10"
          stroke="#ff9e64" strokeWidth="2" fill="rgba(255,158,100,0.08)"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          style={{ transformOrigin: '280px 130px' }}
        />
        {/* Circle */}
        <motion.circle
          cx="88" cy="118" r="46"
          stroke="#73daca" strokeWidth="2" fill="rgba(115,218,202,0.08)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.9 }}
          style={{ transformOrigin: '88px 118px' }}
        />
        {/* Triangle */}
        <motion.polygon
          points="310,310 375,310 342,265"
          stroke="#bb9af7" strokeWidth="2" fill="rgba(187,154,247,0.08)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 2.2 }}
        />
        {/* Text label */}
        <motion.text
          x="230" y="138" fontSize="11" fill="#ff9e64" fontWeight="600" fontFamily="system-ui"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
        >
          Idea Box
        </motion.text>
      </svg>

      {/* Animated cursors */}
      {CURSORS.map((c, idx) => (
        <motion.div
          key={c.name}
          className="absolute flex items-center gap-1 pointer-events-none z-10"
          style={{ x: c.from.x, y: c.from.y }}
          animate={{
            x: [c.from.x, c.to[0].x, c.to[1].x, c.from.x],
            y: [c.from.y, c.to[0].y, c.to[1].y, c.from.y],
          }}
          transition={{ duration: 6, delay: idx * 1.2, ease: 'easeInOut', repeat: Infinity }}
        >
          <MousePointer2 size={15} style={{ color: c.color, filter: `drop-shadow(0 0 4px ${c.color})` }} />
          <span
            className="text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full leading-none"
            style={{ backgroundColor: c.color }}
          >
            {c.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0f111a] text-gray-900 dark:text-[#c0caf5] overflow-x-hidden selection:bg-[#ff6b6b]/30">

      {/* Background glow orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#ff6b6b]/8 blur-[100px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#7aa2f7]/8 blur-[100px] rounded-full pointer-events-none" />

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center h-16 px-6 border-b border-gray-200/60 dark:border-white/5 bg-white/70 dark:bg-[#0f111a]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5"
          >
            <img
              src="/logo.png"
              alt="Interactive Canvas logo"
              className="w-8 h-8 rounded-lg object-contain"
              onError={(e) => {
                // Fallback if logo not yet placed
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <span className="font-bold text-base tracking-tight">Interactive Canvas</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-[#24283b]"
            >
              <Github size={15} />
              GitHub
            </a>
            <button
              onClick={onStart}
              className="px-5 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Launch App
            </button>
          </motion.div>
        </div>
      </nav>

      <main className="relative">

        {/* ── HERO ────────────────────────────────────────── */}
        <section className="min-h-screen flex flex-col justify-center pt-24 pb-20 px-6">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-14 items-center">

            {/* Left copy */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#ff6b6b]/10 text-[#ff6b6b] rounded-full text-[10px] font-black uppercase tracking-[0.18em] mb-6">
                <Sparkles size={10} />
                Real-time Collaborative Canvas
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.92] mb-6">
                Draw Together,<br />
                <span className="text-[#ff6b6b]">Create</span> Without<br />
                Limits.
              </h1>

              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-md mb-10 leading-relaxed font-medium">
                An infinite canvas where teams think visually. See live cursors, draw together in real-time, and chat — all in one beautiful workspace.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <button
                  onClick={onStart}
                  className="flex items-center gap-2 px-7 py-4 bg-[#ff6b6b] text-white rounded-2xl font-bold text-base shadow-2xl shadow-[#ff6b6b]/30 hover:scale-[1.03] active:scale-[0.97] transition-all group"
                >
                  Start Drawing Free
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-7 py-4 bg-white dark:bg-[#1a1b26] border border-gray-200 dark:border-[#414868] rounded-2xl font-bold text-base hover:bg-gray-50 dark:hover:bg-[#24283b] transition-all"
                >
                  <Github size={18} />
                  View Source
                </a>
              </div>

              {/* Avatar social proof */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {['#ff6b6b', '#7aa2f7', '#73daca', '#bb9af7', '#ff9e64'].map((color, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border-2 border-white dark:border-[#0f111a] flex items-center justify-center text-white text-[11px] font-black"
                      style={{ backgroundColor: color }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  <span className="font-bold text-gray-900 dark:text-white">2,000+</span> creators worldwide
                </p>
              </div>
            </motion.div>

            {/* Right — animated canvas preview */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.9 }}
              className="relative"
            >
              {/* Glow halo */}
              <div className="absolute inset-6 bg-gradient-to-br from-[#ff6b6b]/15 via-[#7aa2f7]/10 to-transparent blur-3xl rounded-3xl" />

              <div className="relative bg-white dark:bg-[#1a1b26] rounded-3xl border border-gray-200/80 dark:border-[#414868]/50 shadow-2xl overflow-hidden">
                {/* Window chrome bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-[#414868]/50 bg-gray-50/80 dark:bg-[#24283b]/80">
                  <div className="w-3 h-3 rounded-full bg-[#ff6b6b]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffc777]" />
                  <div className="w-3 h-3 rounded-full bg-[#73daca]" />
                  <div className="flex-1 mx-3 h-5 bg-gray-200/70 dark:bg-[#414868]/40 rounded-md" />
                  <div className="w-14 h-5 bg-[#ff6b6b]/20 rounded-md" />
                </div>

                {/* Canvas area */}
                <div className="relative h-[340px] md:h-[400px]">
                  <CanvasPreview />

                  {/* Floating tool chip */}
                  <motion.div
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-4 right-4 flex items-center gap-2 bg-white/92 dark:bg-[#24283b]/92 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg border border-gray-100 dark:border-[#414868]"
                  >
                    <Pencil size={12} className="text-[#ff6b6b]" />
                    <span className="text-[11px] font-bold">Pencil</span>
                    <div className="w-3 h-3 rounded-full bg-[#ff6b6b] ml-0.5" />
                  </motion.div>

                  {/* Live collaborators chip */}
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/92 dark:bg-[#24283b]/92 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg border border-gray-100 dark:border-[#414868]"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <div className="flex -space-x-1.5 mr-0.5">
                      {['#ff6b6b', '#7aa2f7'].map((c, i) => (
                        <div key={i} className="w-5 h-5 rounded-full border border-white dark:border-[#24283b]" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold">2 drawing live</span>
                  </motion.div>

                  {/* Chat chip */}
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white/92 dark:bg-[#24283b]/92 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg border border-gray-100 dark:border-[#414868]"
                  >
                    <MessageSquare size={12} className="text-[#7aa2f7]" />
                    <span className="text-[11px] font-bold text-[#7aa2f7]">3 messages</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── STATS STRIP ─────────────────────────────────── */}
        <section className="border-y border-gray-100 dark:border-[#414868]/30 bg-white/50 dark:bg-[#1a1b26]/40 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-3xl font-black text-[#ff6b6b] mb-1">{s.num}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ────────────────────────────────────── */}
        <section className="py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-[#24283b] rounded-full text-[10px] font-black uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400 mb-5">
                Everything you need
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
                Built for real collaboration
              </h2>
              <p className="text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto font-medium">
                Every feature crafted to make drawing together feel fast and effortless.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative p-7 bg-white dark:bg-[#1a1b26] rounded-2xl border border-gray-100 dark:border-[#414868]/50 hover:border-[#ff6b6b]/30 hover:shadow-2xl transition-all duration-300 cursor-default"
                  style={{ '--glow': f.glow } as React.CSSProperties}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-lg`}
                  >
                    <f.icon className="text-white" size={22} />
                  </div>
                  <h3 className="font-bold text-base mb-2 tracking-tight">{f.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                    {f.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURE HIGHLIGHT ───────────────────────────── */}
        <section className="py-10 pb-28 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-5">
            {[
              { icon: Download, title: 'Export Anytime', desc: 'Download your canvas as a PNG with one click — background included.', color: '#ff6b6b' },
              { icon: MessageSquare, title: 'Live Chat', desc: 'Built-in team chat with unread badges, so conversation stays with the canvas.', color: '#7aa2f7' },
              { icon: Sparkles, title: 'Dark Mode', desc: 'Full dark mode for late-night sessions. Looks stunning either way.', color: '#bb9af7' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 bg-white dark:bg-[#1a1b26] rounded-2xl border border-gray-100 dark:border-[#414868]/50 hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: item.color + '20' }}>
                  <item.icon size={20} style={{ color: item.color }} />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────── */}
        <section className="pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden bg-gray-900 dark:bg-[#1a1b26] p-14 md:p-24 text-center"
            >
              {/* Mesh gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b6b]/25 via-transparent to-[#7aa2f7]/20 pointer-events-none" />
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#ff6b6b]/15 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute -bottom-12 right-0 w-64 h-64 bg-[#7aa2f7]/15 blur-3xl rounded-full pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">
                  Start creating today.
                </h2>
                <p className="text-gray-400 text-base mb-10 max-w-md mx-auto font-medium">
                  No account needed. Open a canvas, share the link, and start drawing with your team in seconds.
                </p>
                <button
                  onClick={onStart}
                  className="inline-flex items-center gap-2 px-10 py-4 bg-white text-gray-900 rounded-2xl font-bold text-base hover:scale-105 active:scale-95 transition-all shadow-2xl"
                >
                  Open Canvas Free
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className="py-10 border-t border-gray-100 dark:border-[#1a1b26]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt=""
              className="w-5 h-5 rounded object-contain opacity-60"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <span className="text-xs font-bold text-gray-400 tracking-tight">© 2026 Interactive Canvas</span>
          </div>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Support'].map((label) => (
              <button
                key={label}
                className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
