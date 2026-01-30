'use client';

import React, { useState } from 'react';
import { useFindings } from '@/hooks/use-swarm';
import { useQueryClient } from "@tanstack/react-query";
import { swarmService } from "@/services/swarm-service";
import {
    X,
    Terminal,
    ChevronRight,
    Search,
    ShieldAlert,
    TrendingUp,
    Workflow,
    Copy,
    Zap,
    Activity,
    Check,
    Trash2
} from 'lucide-react';
import Mermaid from './mermaid';

/**
 * THE MERCENARY TERMINAL (INTELLIGENCE FEED)
 * This component displays the list of forensic dossiers.
 * It's designed to feel like a high-end Bloomberg terminal for AI research.
 */
export function IntelligenceFeed() {
    const queryClient = useQueryClient();
    const [filters, setFilters] = useState({
        wing: 'all',
        sort: 'newest',
        min_confidence: 0,
    });

    const { data: response, isLoading } = useFindings(filters);
    const [selectedDossier, setSelectedDossier] = useState<any>(null);

    const findings = response?.data || [];

    const handleApprove = async (id: number) => {
        if (!confirm('Authorize publication of this intelligence?')) return;
        try {
            await swarmService.approve(id);
            queryClient.invalidateQueries({ queryKey: ['findings'] });
            setSelectedDossier((prev: any) => ({ ...prev, status: 'published' }));
            alert("Dossier Approved & Published.");
        } catch (e) {
            console.error(e);
            alert("Authorization Failed.");
        }
    };

    const handleKill = async (id: number) => {
        if (!confirm('BURN THIS DOSSIER? It will be permanently deleted.')) return;
        try {
            await swarmService.kill(id);
            queryClient.invalidateQueries({ queryKey: ['findings'] });
            setSelectedDossier(null);
        } catch (e) {
            console.error(e);
            alert("Burn Failed.");
        }
    };

    const wings = [
        { id: 'all', label: 'All Sectors' },
        { id: 'The DeepSeek Files', label: 'DeepSeek Files' },
        { id: 'Agentic Infrastructure', label: 'Infrastructure' },
        { id: 'Agentic Commerce', label: 'Commerce' },
        { id: 'GEO Strategy', label: 'GEO Strategy' },
    ];

    if (isLoading && findings.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-12 border-t border-zinc-100/50">
                <div className="animate-pulse flex flex-col gap-4">
                    <div className="h-4 w-32 bg-zinc-100 rounded"></div>
                    <div className="h-24 w-full bg-zinc-50 rounded"></div>
                    <div className="h-24 w-full bg-zinc-50 rounded"></div>
                </div>
            </div>
        );
    }

    if (findings.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-20 text-center border-t border-zinc-100/50">
                <Terminal className="w-8 h-8 text-zinc-100 mx-auto mb-4" />
                <p className="text-sm text-zinc-400 font-medium italic">
                    Terminal stand-by. No intelligence dossiers filed in the last 24h.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="mb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-zinc-100 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-zinc-950 rounded-lg flex items-center justify-center text-white shadow-lg">
                            <Terminal size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-zinc-950 tracking-tight">Intelligence Swarm</h2>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">Live Forensic Synthesis</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            value={filters.sort}
                            onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                            className="text-[10px] font-bold uppercase tracking-wider bg-white border border-zinc-200 text-zinc-600 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="highest_confidence">Highest Confidence</option>
                        </select>
                        <div className="text-[10px] font-mono text-zinc-400 bg-zinc-50 px-3 py-2 rounded-lg border border-zinc-100">
                            {findings.length} TOTAL DOSSIERS
                        </div>
                    </div>
                </div>

                <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
                    {wings.map((wing) => (
                        <button
                            key={wing.id}
                            onClick={() => setFilters(prev => ({ ...prev, wing: wing.id }))}
                            className={`whitespace-nowrap px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${filters.wing === wing.id
                                ? 'bg-zinc-950 text-white shadow-lg shadow-zinc-900/20'
                                : 'bg-white text-zinc-500 border border-zinc-100 hover:border-zinc-300 hover:text-zinc-800'
                                }`}
                        >
                            {wing.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {findings.map((finding: any) => (
                    <div
                        key={finding.id}
                        onClick={() => setSelectedDossier(finding)}
                        className="group cursor-pointer border border-zinc-100 hover:border-indigo-200 hover:shadow-[0_20px_40px_rgb(0,0,0,0.04)] transition-all duration-500 rounded-xl p-6 bg-white flex flex-col h-full relative overflow-hidden"
                    >
                        <div className="flex items-center justify-between mb-5">
                            <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider border border-indigo-100/50">
                                {finding.wing}
                            </span>
                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                                <Activity size={10} className="text-emerald-500" />
                                {new Date(finding.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>

                        <h3 className="text-base font-bold text-zinc-950 mb-3 group-hover:text-indigo-600 transition-colors leading-snug">
                            {finding.headline}
                        </h3>

                        <p className="text-sm text-zinc-500 line-clamp-3 mb-6 flex-grow leading-relaxed font-serif italic">
                            "{finding.punch}"
                        </p>

                        <div className="flex items-center justify-between border-t border-zinc-50 pt-5 mt-auto">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-zinc-950 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                    {finding.subagent.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">Verified By</span>
                                    <span className="text-[10px] font-bold text-zinc-950 uppercase">{finding.subagent}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">Confidence</span>
                                <span className={`text-[10px] font-mono font-bold ${finding.confidence_score > 80 ? 'text-emerald-600' : 'text-zinc-900'}`}>
                                    {finding.confidence_score}%
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dossier Modal */}
            {selectedDossier && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 md:p-12 bg-zinc-950/40 backdrop-blur-md transition-all duration-300">
                    <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-[0_32px_128px_rgba(0,0,0,0.1)] border border-white/20 p-8 md:p-16 relative">
                        <button
                            onClick={() => setSelectedDossier(null)}
                            className="absolute top-8 right-8 text-zinc-300 hover:text-zinc-600 hover:bg-zinc-50 transition-all p-3 rounded-full"
                        >
                            <X size={24} />
                        </button>

                        <div className="max-w-4xl mx-auto">
                            <div className="space-y-6 mb-16">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-[0.2em] bg-indigo-50 px-3 py-1 rounded-full">{selectedDossier.wing}</span>
                                    <span className="text-[10px] font-mono text-zinc-400">ID: INF-{selectedDossier.id}-{Math.random().toString(36).substr(2, 4).toUpperCase()}</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tight leading-[1.05]">{selectedDossier.headline}</h1>
                                <p className="text-xl md:text-2xl text-zinc-500 font-medium italic border-l-4 border-indigo-100 pl-6 py-2">
                                    {selectedDossier.punch}
                                </p>

                                {selectedDossier.status === 'review' && (
                                    <div className="flex items-center gap-4 pt-4">
                                        <button
                                            onClick={() => handleApprove(selectedDossier.id)}
                                            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold uppercase tracking-widest text-xs transition-all shadow-xl shadow-indigo-200"
                                        >
                                            <Check size={16} /> Authorize Publication
                                        </button>
                                        <button
                                            onClick={() => handleKill(selectedDossier.id)}
                                            className="flex items-center gap-2 px-6 py-3 bg-white border border-rose-100 hover:border-rose-300 text-rose-500 hover:text-rose-600 rounded-lg font-bold uppercase tracking-widest text-xs transition-all"
                                        >
                                            <Trash2 size={16} /> Burn Dossier
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                                <div className="md:col-span-2 space-y-12">
                                    {selectedDossier.body && (
                                        <div className="space-y-12">
                                            <section className="relative">
                                                <div className="absolute -left-8 top-0 text-zinc-100 text-6xl font-black -z-10 select-none">I</div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 flex items-center gap-2">
                                                    <Zap size={14} className="text-indigo-500" /> Executive Hook
                                                </h4>
                                                <p className="text-zinc-800 leading-relaxed text-xl font-medium">{selectedDossier.body.hook}</p>
                                            </section>

                                            <section className="relative">
                                                <div className="absolute -left-8 top-0 text-zinc-100 text-6xl font-black -z-10 select-none">II</div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 flex items-center gap-2">
                                                    <Workflow size={14} className="text-indigo-500" /> Forensic Intelligence
                                                </h4>
                                                <p className="text-zinc-600 leading-relaxed whitespace-pre-line text-lg">{selectedDossier.body.development}</p>
                                            </section>

                                            <section className="relative">
                                                <div className="absolute -left-8 top-0 text-zinc-100 text-6xl font-black -z-10 select-none">III</div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 flex items-center gap-2">
                                                    <ShieldAlert size={14} className="text-indigo-500" /> Macro Implication
                                                </h4>
                                                <p className="text-zinc-700 leading-relaxed text-lg bg-zinc-50 p-6 rounded-2xl border border-zinc-100">{selectedDossier.body.implication}</p>
                                            </section>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-10">
                                    <div className="p-8 bg-zinc-950 rounded-3xl space-y-6 text-white shadow-xl shadow-indigo-900/10">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">Strategic Response</h4>
                                        <div className="text-sm font-medium leading-relaxed">
                                            {Array.isArray(selectedDossier.strategic_advice) ? (
                                                <ul className="space-y-5">
                                                    {selectedDossier.strategic_advice.map((item: string, i: number) => (
                                                        <li key={i} className="flex gap-4">
                                                            <div className="flex-shrink-0 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-[10px] font-bold">
                                                                {i + 1}
                                                            </div>
                                                            <span className="text-zinc-200">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : typeof selectedDossier.strategic_advice === 'string' ? (
                                                selectedDossier.strategic_advice
                                            ) : (
                                                <span className="text-zinc-500 italic">Analysis finalization in progress...</span>
                                            )}
                                        </div>
                                    </div>

                                    {selectedDossier.impact_metrics && (
                                        <div className="p-8 bg-white rounded-3xl space-y-6 border border-zinc-100 shadow-sm">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">Forensic Metrics</h4>
                                            <div className="space-y-6">
                                                {Object.entries(selectedDossier.impact_metrics).map(([label, value]: [any, any]) => (
                                                    <div key={label} className="group">
                                                        <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1 group-hover:text-indigo-500 transition-colors">{label}</p>
                                                        <p className="text-lg font-bold text-zinc-950 tracking-tight">{value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {selectedDossier.visual_schema && (
                                <div className="mt-20 pt-20 border-t border-zinc-100">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-1">IV. System Visualization</h4>
                                            <p className="text-xs text-zinc-500 font-medium italic">Neural Path Logic Diagram v2.0</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(selectedDossier.visual_schema);
                                                alert("Forensic Schema Copied to Clipboard");
                                            }}
                                            className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest bg-indigo-50 px-4 py-2 rounded-full transition-all hover:shadow-md"
                                        >
                                            <Copy size={12} /> Copy Schema
                                        </button>
                                    </div>
                                    <div className="bg-zinc-950 p-12 rounded-[2.5rem] border border-zinc-900 shadow-2xl flex justify-center items-center">
                                        <Mermaid chart={selectedDossier.visual_schema} />
                                    </div>
                                    <p className="text-[10px] text-zinc-400 text-center mt-8 uppercase tracking-[0.4em] font-medium">
                                        SECURED BY INSTITUTIONAL PARALLEL_AGENT RL • AGENT: {selectedDossier.subagent}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
