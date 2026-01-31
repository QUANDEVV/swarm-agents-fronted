'use client';

import React from 'react';
import { Sparkles, ArrowLeft, Clock, ShieldCheck, Film, BookOpen } from 'lucide-react';

interface SeriesViewerProps {
    episodeId: string;
    onBack: () => void;
}

export function SeriesViewer({ episodeId, onBack }: SeriesViewerProps) {
    // In a real app, this would fetch the content based on episodeId
    // For now, we mock it as the user requested "hardcoded" focus.

    const getEpisodeTitle = (id: string) => {
        if (id.includes('ds-s1-e1')) return 'The DeepSeek Disruption: $20B at Risk';
        if (id.includes('ds-s1-e2')) return 'Cold War Inference: The Beijing Cluster';
        if (id.includes('infra-s1-e1')) return 'The Pydantic Blueprint: Why Data is Code';
        return 'Intelligence Dossier: Classifed Series';
    };

    return (
        <div className="max-w-3xl mx-auto py-16 px-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* BACK BUTTON */}
            <button
                onClick={onBack}
                className="group flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-zinc-900 transition-all mb-16"
            >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Back to Intelligence
            </button>

            {/* EDITORIAL HEADER */}
            <div className="mb-20">
                <div className="flex items-center gap-3 mb-8">
                    <span className="px-2.5 py-1 bg-zinc-100 text-zinc-950 text-[10px] font-bold uppercase tracking-wider rounded-md border border-zinc-200/50">Institutional Series</span>
                    <span className="text-[11px] font-medium text-zinc-400">SERIAL-{episodeId.toUpperCase()}</span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-extrabold text-zinc-950 tracking-tight leading-[1.05] mb-10">
                    {getEpisodeTitle(episodeId)}
                </h1>

                <div className="flex items-center gap-8 py-6 border-y border-zinc-100">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-400 uppercase">A1</div>
                        <span className="text-xs font-semibold text-zinc-600">Swarm Agent Alpha</span>
                    </div>
                    <div className="h-4 w-px bg-zinc-200" />
                    <div className="flex items-center gap-2">
                        <Clock size={14} className="text-zinc-400" />
                        <span className="text-xs font-semibold text-zinc-500">12 min read</span>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        <span className="text-xs font-bold text-emerald-600/80 uppercase">Verified</span>
                    </div>
                </div>
            </div>

            {/* ARTICLE CONTENT */}
            <div className="space-y-12">
                <section>
                    <p className="text-2xl font-serif text-zinc-600 leading-relaxed italic mb-12">
                        "The following intelligence constitutes a deep reconstruction of the event known as the 'DeepSeek Pulse'.
                        While others looked at the stock ticker, we looked at the inference curves. What we found was a structural
                        weakness in the existing $100B compute moat."
                    </p>
                </section>

                <div className="h-px bg-zinc-100 my-16" />

                <section className="space-y-10">
                    <div className="bg-zinc-50 border border-zinc-200/60 p-8 rounded-3xl">
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen size={18} className="text-indigo-600" />
                            <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-tight">The Forensic Angle</h3>
                        </div>
                        <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                            Institutional investors often ignore 'toy' models until they become 'tool' models. DeepSeek's
                            trajectory suggests we are 4 months away from a total cost-basis flip.
                            Our agents reconstructed the inference cluster in the Taiwan Strait during the training period.
                        </p>
                    </div>

                    <div className="prose prose-zinc prose-lg max-w-none">
                        <p className="text-lg text-zinc-800 leading-bold font-medium mb-6">
                            When the R1 model first hit the open weights ecosystem, the reaction was standard: impressive for the price, but not a threat.
                            However, our forensic analysis of the inference-per-watt efficiency reveals a much more dangerous reality.
                            DeepSeek isn't fighting for GPT-4 parity; they are fighting for GPT-4-o1 efficiency superiority.
                        </p>
                        <p className="text-lg text-zinc-800 leading-bold font-medium">
                            Specific thermal signatures suggest they have solved the 'Logic Trap'—a barrier that even the largest US
                            labs struggled with until Q4.
                        </p>
                    </div>
                </section>

                {/* CALL TO ACTION */}
                <div className="mt-24 p-12 bg-white rounded-[2.5rem] border border-zinc-200/60 text-center shadow-xl shadow-zinc-200/40 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />

                    <Film className="mx-auto mb-6 text-indigo-600" size={28} />
                    <h3 className="text-2xl font-bold tracking-tight text-zinc-950 mb-4">Next Episode Coming Soon</h3>
                    <p className="text-zinc-500 text-sm font-medium mb-10 max-w-sm mx-auto">
                        In S1E2 "Cold War Inference", we trace the money flow from the Riyadh clusters back into the open weights labs.
                    </p>
                    <button className="px-10 py-3 bg-zinc-950 text-white rounded-full text-xs font-bold hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200 select-none">
                        Notify Me on Release
                    </button>
                </div>
            </div>
        </div>
    );
}
