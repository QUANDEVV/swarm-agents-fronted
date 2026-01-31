'use client';

import React from 'react';
import {
    Globe,
    ArrowRight,
    Cpu,
    Shield,
    Terminal,
    Fingerprint
} from 'lucide-react';

/**
 * STRIPE-STYLE LANDING MODULES
 * Ultra-premium, high-whitespace, $100M Investor Ready.
 */
export function LandingExtensions() {
    return (
        <div className="bg-white">

            {/* SECTION: THE GLOBAL REGISTRY (COMMUNITY) */}
            <section className="max-w-7xl mx-auto px-10 py-48">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    <div className="sticky top-32">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-8">
                            <Fingerprint size={12} /> Institutional Backbone
                        </div>
                        <h2 className="text-7xl font-bold text-zinc-950 tracking-tight leading-[1.05] mb-10">
                            The Global <br />
                            <span className="text-indigo-600 font-serif italic">Infrastructure</span>.
                        </h2>
                        <p className="text-xl text-zinc-500 font-medium leading-relaxed max-w-md">
                            A decentralized registry of vetted institutional compute nodes.
                            Verified through zero-knowledge proofs and parallel-agent RL.
                        </p>

                        <div className="mt-12 flex items-center gap-6">
                            <button className="flex items-center gap-2 text-sm font-bold text-zinc-950 hover:gap-3 transition-all group">
                                Join the Registry <ArrowRight size={18} className="text-indigo-600 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <div className="h-4 w-px bg-zinc-200" />
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">1,482 Active Nodes</span>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {/* NODE LIST - WEIGHTLESS DESIGN */}
                        {[
                            { name: 'London Node-01', location: 'EU (United Kingdom)', status: 'Verified', latent: '12ms' },
                            { name: 'Singapore Cluster', location: 'APAC (Singapore)', status: 'Verified', latent: '8ms' },
                            { name: 'Zurich Vault', location: 'EU (Switzerland)', status: 'Syncing', latent: '24ms' },
                            { name: 'Tokyo Node-09', location: 'APAC (Japan)', status: 'Verified', latent: '14ms' },
                            { name: 'New York Node', location: 'US (East)', status: 'Idle', latent: '10ms' },
                        ].map((node, i) => (
                            <div key={i} className="flex items-center justify-between py-8 border-b border-zinc-50 group hover:px-4 transition-all hover:bg-zinc-50/50 rounded-xl">
                                <div className="flex items-center gap-6">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                    <div>
                                        <h4 className="text-lg font-bold text-zinc-950">{node.name}</h4>
                                        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mt-1">{node.location}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em] mb-1">Latency</span>
                                    <span className="text-xs font-mono font-bold text-zinc-400">{node.latent}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION: PRODUCTS (SERVICES) */}
            <section className="border-t border-zinc-100">
                <div className="max-w-7xl mx-auto px-10 py-64">
                    <div className="text-center mb-32">
                        <h2 className="text-6xl font-bold text-zinc-950 tracking-tighter mb-8 italic font-serif">
                            Architectural Capabilities
                        </h2>
                        <div className="h-1 w-24 bg-indigo-600 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                        {/* CAPABILITY 1 */}
                        <div className="space-y-8 group">
                            <div className="w-16 h-16 bg-zinc-50 rounded-[2rem] flex items-center justify-center text-zinc-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all border border-zinc-100">
                                <Cpu size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-zinc-950 tracking-tight">Massive Parallelism</h3>
                            <p className="text-lg text-zinc-500 font-medium leading-relaxed">
                                Orchestrate up to 500 agents in a single mission cluster.
                                Millisecond latency for real-time forensic synthesis.
                            </p>
                            <button className="text-sm font-bold text-indigo-600 uppercase tracking-widest hover:translate-x-1 transition-transform">
                                Deploy Cluster →
                            </button>
                        </div>

                        {/* CAPABILITY 2 */}
                        <div className="space-y-8 group">
                            <div className="w-16 h-16 bg-zinc-50 rounded-[2rem] flex items-center justify-center text-zinc-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all border border-zinc-100">
                                <Shield size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-zinc-950 tracking-tight">Data Sovereignty</h3>
                            <p className="text-lg text-zinc-500 font-medium leading-relaxed">
                                Private, on-premise vault deployments for sensitive institutional data.
                                End-to-end encrypted intelligence.
                            </p>
                            <button className="text-sm font-bold text-indigo-600 uppercase tracking-widest hover:translate-x-1 transition-transform">
                                Provision Vault →
                            </button>
                        </div>

                        {/* CAPABILITY 3 */}
                        <div className="space-y-8 group">
                            <div className="w-16 h-16 bg-zinc-50 rounded-[2rem] flex items-center justify-center text-zinc-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all border border-zinc-100">
                                <Terminal size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-zinc-950 tracking-tight">Terminal Integration</h3>
                            <p className="text-lg text-zinc-500 font-medium leading-relaxed">
                                Universal REST and gRPC hooks. Feed dossiers directly into
                                Bloomberg, Reuters, or internal trading terminals.
                            </p>
                            <button className="text-sm font-bold text-indigo-600 uppercase tracking-widest hover:translate-x-1 transition-transform">
                                Review Docs →
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL STRIPE CTA */}
            <section className="bg-zinc-950 py-32 overflow-hidden relative">
                {/* Subtle light effect top left */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />

                <div className="max-w-4xl mx-auto px-10 text-center relative z-10">
                    <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-12 italic font-serif">
                        Ready to scale intelligence?
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button className="px-12 py-5 bg-white text-zinc-950 font-black text-sm uppercase tracking-widest rounded-xl hover:bg-zinc-100 transition-all shadow-xl shadow-indigo-900/20">
                            Apply for Node Access
                        </button>
                        <button className="px-12 py-5 bg-zinc-900 text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-all border border-zinc-800">
                            Speak to an Agent
                        </button>
                    </div>
                    <p className="mt-12 text-zinc-500 font-bold text-[10px] uppercase tracking-[0.4em]">
                        Institutional Access Only • Minimum Stake Required
                    </p>
                </div>
            </section>
        </div>
    );
}
