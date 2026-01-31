'use client';

import React from 'react';
import {
    Zap,
    Home as HomeIcon,
    Globe,
    TrendingUp,
    Hexagon
} from 'lucide-react';

interface SidebarProps {
    activeDepartment: string;
    activeView: string; // 'feed' | 'episode'
    selectedEpisodeId?: string;
    onNavigate: (dept: string, view: string, episodeId?: string) => void;
}

export const DEPARTMENTS = [
    {
        id: 'The DeepSeek Files',
        label: 'DeepSeek Files',
        icon: Hexagon,
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-50',
        series: [
            {
                title: 'The Open Source Takeover',
                episodes: [
                    { id: 'ds-s1-e1', title: 'The $20B Risk', season: 1, ep: 1 },
                    { id: 'ds-s1-e2', title: 'Cold War Inference', season: 1, ep: 2 },
                    { id: 'ds-s1-e3', title: 'The Energy Arbitrage', season: 1, ep: 3 },
                ]
            }
        ]
    },
    {
        id: 'Agentic Infrastructure',
        label: 'Infrastructure',
        icon: Zap,
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        series: [
            {
                title: 'The MCP Protocols',
                episodes: [
                    { id: 'infra-s1-e1', title: 'Pydantic-AI Architecture', season: 1, ep: 1 },
                    { id: 'infra-s1-e2', title: 'LangGraph Pipelines', season: 1, ep: 2 },
                ]
            }
        ]
    },
    {
        id: 'GEO Strategy',
        label: 'GEO Strategy',
        icon: Globe,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        series: [
            {
                title: 'The Silicon Curtain',
                episodes: [
                    { id: 'geo-s1-e1', title: 'CHIPS Act Forensics', season: 1, ep: 1 },
                    { id: 'geo-s1-e2', title: 'Taiwan Strait Compute', season: 1, ep: 2 },
                ]
            }
        ]
    },
    {
        id: 'Agentic Commerce',
        label: 'Agentic Commerce',
        icon: TrendingUp,
        color: 'text-rose-600',
        bgColor: 'bg-rose-50',
        series: [
            {
                title: 'The $10T Agent Economy',
                episodes: [
                    { id: 'comm-s1-e1', title: 'Stripe Agentic Payments', season: 1, ep: 1 },
                    { id: 'comm-s1-e2', title: 'The Procurement Bot Riot', season: 1, ep: 2 },
                ]
            }
        ]
    }
];

const PLATFORM_LINKS = [
    { id: 'home', label: 'Home', icon: HomeIcon },
];

const INTELLIGENCE_WINGS = DEPARTMENTS;

export function AppSidebar({ activeDepartment, activeView, selectedEpisodeId, onNavigate }: SidebarProps) {
    return (
        <aside className="w-64 h-screen bg-white border-r border-zinc-100 flex flex-col fixed left-0 top-0 z-50">
            {/* MINIMAL SIDEBAR CONTENT */}
            <div className="flex-grow overflow-y-auto px-6 py-12 space-y-12">

                {/* PLATFORM SECTION */}
                <div className="space-y-4">
                    <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-2">Platform</h3>
                    <div className="space-y-1">
                        {PLATFORM_LINKS.map(link => (
                            <button
                                key={link.id}
                                onClick={() => onNavigate('all', 'feed')}
                                className={`w-full flex items-center gap-3 px-2 py-1.5 rounded-md text-[13px] transition-all ${activeDepartment === 'all' && link.id === 'home'
                                    ? 'bg-zinc-50 text-indigo-600 font-semibold'
                                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                                    }`}
                            >
                                <link.icon size={16} strokeWidth={1.5} />
                                <span>{link.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* INTELLIGENCE WINGS SECTION */}
                <div className="space-y-4">
                    <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-2">Intelligence Wings</h3>
                    <div className="space-y-1">
                        {INTELLIGENCE_WINGS.map(dept => (
                            <div key={dept.id} className="space-y-0.5">
                                <button
                                    onClick={() => onNavigate(dept.id, 'feed')}
                                    className={`w-full flex items-center gap-3 px-2 py-1.5 rounded-md text-[13px] transition-all group ${activeDepartment === dept.id && activeView === 'feed'
                                        ? 'bg-zinc-50 text-indigo-600 font-semibold'
                                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                                        }`}
                                >
                                    <dept.icon size={16} strokeWidth={1.5} />
                                    <span>{dept.label}</span>
                                </button>

                                {/* SERIES EPISODES AS INDENTED SUB-ITEMS IF SELECTED */}
                                {(activeDepartment === dept.id) && dept.series.map(s => (
                                    <div key={s.title} className="pl-6 space-y-0.5 mt-1 border-l border-zinc-100 ml-4">
                                        {s.episodes.map(ep => (
                                            <button
                                                key={ep.id}
                                                onClick={() => onNavigate(dept.id, 'episode', ep.id)}
                                                className={`w-full text-left px-3 py-1 rounded text-[11px] transition-all ${selectedEpisodeId === ep.id
                                                    ? 'text-indigo-600 font-bold'
                                                    : 'text-zinc-400 hover:text-zinc-700'
                                                    }`}
                                            >
                                                {ep.title}
                                            </button>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* VERY MINIMAL FOOTER */}
            <div className="p-8">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Network Live</span>
                </div>
            </div>
        </aside>
    );
}

// Add shimmer animation safely for SSR
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(200%); }
    }
    `;
    document.head.appendChild(style);
}
