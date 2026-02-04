import React, { useState } from 'react';
import {
    Search,
    Server,
    Database,
    Cloud,
    Smartphone,
    Laptop,
    Box,
    File,
    Folder,
    User,
    Users,
    Globe,
    Wifi,
    Lock,
    Cpu,
    HardDrive
} from 'lucide-react';

interface InsertPanelProps {
    onInsert: (iconName: string) => void;
    onClose: () => void;
}

const ICONS = [
    { name: 'server', icon: Server, label: 'Server' },
    { name: 'database', icon: Database, label: 'Database' },
    { name: 'cloud', icon: Cloud, label: 'Cloud' },
    { name: 'smartphone', icon: Smartphone, label: 'Mobile' },
    { name: 'laptop', icon: Laptop, label: 'Laptop' },
    { name: 'box', icon: Box, label: 'Container' },
    { name: 'file', icon: File, label: 'File' },
    { name: 'folder', icon: Folder, label: 'Folder' },
    { name: 'user', icon: User, label: 'User' },
    { name: 'users', icon: Users, label: 'Users' },
    { name: 'globe', icon: Globe, label: 'Internet' },
    { name: 'wifi', icon: Wifi, label: 'Network' },
    { name: 'lock', icon: Lock, label: 'Security' },
    { name: 'cpu', icon: Cpu, label: 'Compute' },
    { name: 'hard-drive', icon: HardDrive, label: 'Storage' },
];

export function InsertPanel({ onInsert, onClose }: InsertPanelProps) {
    const [search, setSearch] = useState('');

    const filteredIcons = ICONS.filter(item =>
        item.label.toLowerCase().includes(search.toLowerCase()) ||
        item.name.includes(search.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col bg-white dark:bg-[#24283b] border-l border-[#dee2e6] dark:border-[#414868] shadow-2xl">
            <div className="p-4 border-b border-[#dee2e6] dark:border-[#414868]">
                <h2 className="font-semibold mb-3">Insert Elements</h2>
                <div className="relative">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search icons..."
                        className="w-full bg-gray-100 dark:bg-[#1a1b26] border-none rounded-xl px-4 py-2 pl-10 text-sm focus:ring-2 focus:ring-[#ff6b6b]/50 outline-none transition-all"
                    />
                    <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-3 gap-2 align-start content-start">
                {filteredIcons.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => onInsert(item.name)}
                        className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#1a1b26] border border-transparent hover:border-gray-200 dark:hover:border-[#414868] transition-all group"
                    >
                        <div className="p-2 rounded-lg bg-white dark:bg-[#0f111a] shadow-sm group-hover:scale-110 transition-transform text-gray-600 dark:text-gray-300 group-hover:text-[#ff6b6b]">
                            <item.icon size={24} />
                        </div>
                        <span className="text-[10px] font-medium text-gray-500 text-center truncate w-full">
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
