import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { supabase } from '../supabase/client';
import { toast } from "sonner";

interface AuthPageProps {
    onBack: () => void;
    onAuth: (user: { id: string; name: string; isGuest: boolean }) => void;
}

export function AuthPage({ onBack, onAuth }: AuthPageProps) {
    const [mode, setMode] = useState<'choice' | 'guest' | 'login' | 'signup'>('choice');
    const [guestName, setGuestName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGuestStart = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!guestName.trim()) {
            toast.error("Please enter a name");
            return;
        }
        onAuth({
            id: Math.random().toString(36).substring(7),
            name: guestName,
            isGuest: true
        });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const { data: { user }, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        setIsLoading(false);
        if (error) {
            toast.error(error.message);
            return;
        }

        if (user) {
            const name = user.user_metadata?.full_name || email.split('@')[0];
            onAuth({
                id: user.id,
                name: name,
                isGuest: false
            });
            toast.success("Welcome back!");
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const { data: { user }, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: guestName || email.split('@')[0]
                }
            }
        });

        setIsLoading(false);
        if (error) {
            toast.error(error.message);
            return;
        }

        if (user) {
            toast.success("Account created! You can now log in.");
            setMode('login');
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#0f111a] text-gray-900 dark:text-[#c0caf5] flex items-center justify-center p-6 overflow-hidden selection:bg-[#ff6b6b]/30">
            {/* Background Effects - Matching Landing Page */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#ff6b6b]/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#7aa2f7]/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={onBack}
                className="fixed top-6 left-6 z-10 flex items-center gap-2 px-5 py-3 bg-white/80 dark:bg-[#1a1b26]/80 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-[#414868] hover:bg-white dark:hover:bg-[#24283b] transition-all shadow-lg"
            >
                <ArrowLeft size={18} />
                <span className="text-sm font-bold">Back</span>
            </motion.button>

            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative w-full max-w-md z-10"
            >
                <div className="bg-white/40 dark:bg-[#1a1b26]/40 backdrop-blur-sm border border-gray-100 dark:border-[#414868] rounded-[32px] shadow-2xl p-8">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-[#ff6b6b] rounded-2xl flex items-center justify-center shadow-lg shadow-[#ff6b6b]/20">
                            <Sparkles className="text-white" size={20} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight">
                                {mode === 'guest' ? 'Continue as Guest' : mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Get Started'}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                {mode === 'guest' ? 'Enter your name to begin' : mode === 'login' ? 'Sign in to your account' : mode === 'signup' ? 'Sign up for an account' : 'Choose how to continue'}
                            </p>
                        </div>
                    </div>

                    {/* Forms */}
                    <AnimatePresence mode="wait">
                        {mode === 'choice' && (
                            <motion.div
                                key="choice"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-4"
                            >
                                <button
                                    onClick={() => setMode('guest')}
                                    className="w-full px-8 py-5 bg-[#ff6b6b] text-white rounded-[24px] font-bold text-lg shadow-2xl shadow-[#ff6b6b]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Continue as Guest
                                </button>

                                <div className="relative py-2">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200 dark:border-[#414868]" />
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="px-4 text-xs font-black uppercase tracking-[0.2em] text-gray-400 bg-white/40 dark:bg-[#1a1b26]/40">or</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setMode('login')}
                                    className="w-full px-8 py-5 bg-white dark:bg-[#24283b] border border-gray-200 dark:border-[#414868] rounded-[24px] font-bold text-lg shadow-sm hover:bg-gray-50 dark:hover:bg-[#2a2f47] transition-all"
                                >
                                    Login with Account
                                </button>

                                <button
                                    onClick={() => setMode('signup')}
                                    className="w-full text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors pt-2"
                                >
                                    Don't have an account? <span className="font-bold">Sign up</span>
                                </button>
                            </motion.div>
                        )}

                        {mode === 'guest' && (
                            <motion.form
                                key="guest"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                onSubmit={handleGuestStart}
                                className="space-y-6"
                            >
                                <div className="space-y-4">
                                    <input
                                        value={guestName}
                                        onChange={(e) => setGuestName(e.target.value)}
                                        placeholder="Enter your name..."
                                        className="w-full bg-gray-100 dark:bg-[#24283b] border border-gray-200 dark:border-[#414868] rounded-xl px-6 py-4 text-base outline-none focus:ring-2 ring-[#ff6b6b]/50 transition-all font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                        autoFocus
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={!guestName.trim()}
                                    className="w-full px-8 py-4 bg-[#ff6b6b] text-white rounded-[24px] font-bold text-lg shadow-xl shadow-[#ff6b6b]/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                                >
                                    Start Drawing
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setMode('choice')}
                                    className="w-full text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                                >
                                    ← Back to options
                                </button>
                            </motion.form>
                        )}

                        {(mode === 'login' || mode === 'signup') && (
                            <motion.form
                                key={mode}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                onSubmit={mode === 'login' ? handleLogin : handleSignUp}
                                className="space-y-4"
                            >
                                {mode === 'signup' && (
                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Full Name</label>
                                        <input
                                            value={guestName}
                                            onChange={(e) => setGuestName(e.target.value)}
                                            placeholder="Your name"
                                            className="w-full bg-gray-100 dark:bg-[#24283b] border border-gray-200 dark:border-[#414868] rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#ff6b6b]/50 transition-all font-medium"
                                        />
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="w-full bg-gray-100 dark:bg-[#24283b] border border-gray-200 dark:border-[#414868] rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#ff6b6b]/50 transition-all font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-gray-100 dark:bg-[#24283b] border border-gray-200 dark:border-[#414868] rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#ff6b6b]/50 transition-all font-medium"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full px-8 py-4 bg-[#ff6b6b] text-white rounded-[24px] font-bold text-lg shadow-xl shadow-[#ff6b6b]/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            <span>Loading...</span>
                                        </>
                                    ) : (
                                        <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                                    className="w-full text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                                >
                                    {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMode('choice')}
                                    className="w-full text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                                >
                                    ← Back to options
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
