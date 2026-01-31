'use client';

import React, { useState } from 'react';
import { useFindings } from '@/hooks/use-swarm';
import { useQueryClient } from "@tanstack/react-query";
import { swarmService } from "@/services/swarm-service";
import {
    X,
    Terminal,
    Activity,
    Check,
    Trash2,
    Zap,
    Workflow,
    ShieldAlert,
    Copy,
} from 'lucide-react';
import Mermaid from './mermaid';

interface IntelligenceFeedProps {
    initialWing?: string;
}

export function IntelligenceFeed({ initialWing }: IntelligenceFeedProps) {
    const queryClient = useQueryClient();
    const [selectedDossier, setSelectedDossier] = useState<any>(null);
    const [filters, setFilters] = useState({
        wing: initialWing || 'all',
        sort: 'newest',
    });

    // Sync filters with prop
    React.useEffect(() => {
        if (initialWing) setFilters(prev => ({ ...prev, wing: initialWing }));
    }, [initialWing]);

    const { data: response, isLoading } = useFindings(filters);
    const findings = response?.data || [];

    const handleApprove = async (id: number) => {
        if (!confirm('Authorize publication of this intelligence?')) return;
        try {
            await swarmService.approve(id);
            queryClient.invalidateQueries({ queryKey: ['findings'] });
            setSelectedDossier(null);
        } catch (e) {
            console.error(e);
        }
    };

    const handleKill = async (id: number) => {
        if (!confirm('BURN THIS DOSSIER?')) return;
        try {
            await swarmService.kill(id);
            queryClient.invalidateQueries({ queryKey: ['findings'] });
            setSelectedDossier(null);
        } catch (e) {
            console.error(e);
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
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="animate-pulse space-y-8">
                    <div className="h-8 w-64 bg-zinc-100 rounded"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => <div key={i} className="h-64 bg-zinc-50 rounded-xl"></div>)}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 pt-0 pb-10">
            {/* GRID HEADER - Match Legacy Style */}
            <div className="mb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-zinc-100 pb-6 text-right">
                    <div className="hidden md:block flex-grow" />
                    <div className="flex items-center gap-3">
                        <select
                            value={filters.sort}
                            onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                            className="text-[10px] font-bold uppercase tracking-wider bg-white border border-zinc-200 text-zinc-600 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="highest_confidence">Highest Confidence</option>
                        </select>
                        <div className="text-[10px] font-mono text-zinc-400 bg-zinc-100 px-3 py-2 rounded-lg border border-zinc-200">
                            {findings.length} TOTAL DOSSIERS
                        </div>
                    </div>
                </div>

                {/* FILTERS - ONLY SHOW IF NOT FILTERED BY SIDEBAR */}
                {(!initialWing || initialWing === 'all') && (
                    <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide">
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
                )}
            </div>

            {/* THE FAMOUS VERTICAL CARD GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {findings.map((finding: any) => (
                    <div
                        key={finding.id}
                        onClick={() => setSelectedDossier(finding)}
                        className="group cursor-pointer border border-zinc-100 hover:border-indigo-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 rounded-xl p-6 bg-white flex flex-col h-full relative overflow-hidden"
                    >
                        <div className="flex items-center justify-between mb-5">
                            <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider border border-indigo-100/50">
                                {finding.wing || finding.department || 'Analysis'}
                            </span>
                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                                <Activity size={10} className="text-emerald-500" />
                                {new Date(finding.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>

                        <h3 className="text-base font-bold text-zinc-950 mb-3 group-hover:text-indigo-600 transition-colors leading-snug">
                            {finding.title || finding.headline}
                        </h3>

                        <p className="text-sm text-zinc-500 line-clamp-3 mb-6 flex-grow leading-relaxed font-serif italic">
                            "{finding.description || finding.punch || 'Forensic analysis in progress...'}"
                        </p>

                        <div className="flex items-center justify-between border-t border-zinc-50 pt-5 mt-auto">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-zinc-950 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                    {(finding.agent_id || finding.subagent || 'A').charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">Verified By</span>
                                    <span className="text-[10px] font-bold text-zinc-950 uppercase">{finding.agent_id || finding.subagent || 'Swarm'}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">Confidence</span>
                                <span className={`text-[10px] font-mono font-bold ${(finding.confidence_score || 90) > 80 ? 'text-emerald-600' : 'text-zinc-900'}`}>
                                    {finding.confidence_score || 90}%
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* EMPTY STATE */}
            {findings.length === 0 && (
                <div className="max-w-4xl mx-auto px-6 py-20 text-center border-t border-zinc-100/50">
                    <Terminal className="w-8 h-8 text-zinc-100 mx-auto mb-4" />
                    <p className="text-sm text-zinc-400 font-medium italic">
                        Terminal stand-by. No intelligence dossiers filed in the last 24h.
                    </p>
                </div>
            )}

            {/* EXPANDED DOSSIER MODAL - RESTORED PREMIUM DESIGN */}
            {selectedDossier && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 md:p-12 bg-zinc-950/40 backdrop-blur-md transition-all duration-300">
                    <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-[0_32px_128px_rgba(0,0,0,0.1)] border border-white/20 p-8 md:p-16 relative scrollbar-hide">
                        <button
                            onClick={() => setSelectedDossier(null)}
                            className="absolute top-8 right-8 text-zinc-300 hover:text-zinc-600 hover:bg-zinc-50 transition-all p-3 rounded-full z-10"
                        >
                            <X size={24} />
                        </button>

                        <div className="space-y-12">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-[0.2em] bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100/50">
                                        {selectedDossier.wing || selectedDossier.department}
                                    </span>
                                    <span className="text-[10px] font-mono text-zinc-400">ID: INF-{selectedDossier.id}</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tight leading-[1.05]">
                                    {selectedDossier.title || selectedDossier.headline}
                                </h1>
                                <p className="text-xl md:text-2xl text-zinc-500 font-medium italic border-l-4 border-indigo-100 pl-6 py-2">
                                    "{selectedDossier.description || selectedDossier.punch}"
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
                                    <div className="space-y-12">
                                        <section className="relative">
                                            <div className="absolute -left-8 top-0 text-zinc-100 text-6xl font-black -z-10 select-none">I</div>
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 flex items-center gap-2">
                                                <Zap size={14} className="text-indigo-500" /> Executive Hook
                                            </h4>
                                            <p className="text-zinc-800 leading-relaxed text-xl font-medium">
                                                {selectedDossier.analysis || selectedDossier.description}
                                            </p>
                                        </section>

                                        {selectedDossier.findings && (
                                            <section className="relative">
                                                <div className="absolute -left-8 top-0 text-zinc-100 text-6xl font-black -z-10 select-none">II</div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 flex items-center gap-2">
                                                    <Workflow size={14} className="text-indigo-500" /> Forensic Intelligence
                                                </h4>
                                                <div className="space-y-6">
                                                    {selectedDossier.findings.map((f: any, i: number) => (
                                                        <div key={i} className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                                                            <p className="text-zinc-600 leading-relaxed font-medium">{f.text || f}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-10">
                                    <div className="p-8 bg-zinc-950 rounded-3xl space-y-6 text-white shadow-xl shadow-indigo-900/10">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">Strategic Response</h4>
                                        <div className="text-sm font-medium leading-relaxed">
                                            {selectedDossier.strategic_advice ? (
                                                <ul className="space-y-5">
                                                    {Array.isArray(selectedDossier.strategic_advice) ? selectedDossier.strategic_advice.map((item: any, i: number) => (
                                                        <li key={i} className="flex gap-4">
                                                            <div className="flex-shrink-0 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                                                                {i + 1}
                                                            </div>
                                                            <span className="text-zinc-200">{typeof item === 'object' ? (item.text || item.advice || JSON.stringify(item)) : item}</span>
                                                        </li>
                                                    )) : <li className="text-zinc-200">{selectedDossier.strategic_advice}</li>}
                                                </ul>
                                            ) : (
                                                <span className="text-zinc-500 italic">Analysis finalization in progress...</span>
                                            )}
                                        </div>
                                    </div>

                                    {selectedDossier.impact_metrics && (
                                        <div className="p-8 bg-white rounded-3xl space-y-6 border border-zinc-100 shadow-sm">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">Forensic Metrics</h4>
                                            <div className="space-y-6">
                                                {Array.isArray(selectedDossier.impact_metrics) ? (
                                                    selectedDossier.impact_metrics.map((metric: any, i: number) => (
                                                        <div key={i} className="group">
                                                            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1 group-hover:text-indigo-500 transition-colors">
                                                                {metric.label || `Metric ${i + 1}`}
                                                            </p>
                                                            <p className="text-lg font-bold text-zinc-950 tracking-tight">{metric.value}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    Object.entries(selectedDossier.impact_metrics || {}).map(([label, value]: [any, any]) => (
                                                        <div key={label} className="group">
                                                            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1 group-hover:text-indigo-500 transition-colors">{label}</p>
                                                            <p className="text-lg font-bold text-zinc-950 tracking-tight">{String(value)}</p>
                                                        </div>
                                                    ))
                                                )}
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
                                        SECURED BY INSTITUTIONAL PARALLEL_AGENT RL • AGENT: {selectedDossier.agent_id || selectedDossier.subagent}
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
