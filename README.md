# 🎨 Interactive Canvas

A high-performance, real-time collaborative whiteboard application built for seamless brainstorming, design, and teamwork. Experience an infinite canvas where ideas flow freely.

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![React](https://img.shields.io/badge/React-18-61dafb.svg) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6.svg) ![Supabase](https://img.shields.io/badge/Supabase-Realtime-3ecf8e.svg)

## ✨ Features

### 🖌️ Core Experience
- **Infinite Canvas:** Pan and zoom without limits.
- **Real-time Collaboration:** See other users' cursors and drawing paths live (powered by Supabase).
- **Multi-Tool Support:** Pencil, Eraser, Shapes (Rectangle, Circle, Diamond, Arrow), and Text.
- **Advanced Styling:** Customize stroke color, width, opacity, and fill.
- **Dark Mode:** Fully supported beautiful dark theme.

### 💬 Communication
- **Live Chat:** Integrated team chat linked to the room.
- **Persistent History:** Messages are saved even if you close the panel.
- **Unread Notifications:** Smart badges notify you of missed messages.
- **Presence:** See who is online in the room.

### 📱 Responsive Design
- **Mobile Optimized:** Dedicated mobile toolbar and touch gestures.
- **Adaptive UI:** Panels and interactions adjust for Phone, Tablet, and Desktop.

## 🚀 Roadmap (Premium Features)

We are actively working on these "Pro" features:

- 🪄 **AI Sketch-to-Image:** Turn rough scribbles into polished assets.
- 📐 **Smart Shapes:** Auto-correct hand-drawn shapes.
- 📂 **Cloud Library:** Save and reuse team assets.
- 🔒 **Private Rooms:** Password-protected sessions.
- 🎥 **Timelapse Export:** Download a video of your creative process.

## 🛠️ Tech Stack

- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State/Backend:** [Supabase](https://supabase.com/) (Realtime & Auth)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)
- **Animations:** [Motion](https://motion.dev/) (formerly Framer Motion)

## ⚡ Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/interactive-canvas.git
    cd interactive-canvas
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env` file in the root directory:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Start the app:**
    ```bash
    npm run dev
    ```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ for creative teams.