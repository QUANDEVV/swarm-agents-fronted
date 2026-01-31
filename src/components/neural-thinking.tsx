import React from 'react';
import { Activity, Radio, Search, Database, PenTool, CheckCircle2 } from 'lucide-react';

interface ThoughtLog {
    phase: string;
    status: string;
    message: string;
    timestamp: string;
}

interface NeuralThinkingProps {
    thoughtLog: ThoughtLog[];
    currentPhase: string;
}

/**
 * Modern "Stripe-like" visualization of the AI Swarm's thought process.
 * Clean, minimal, efficient.
 */
export function NeuralThinking({ thoughtLog, currentPhase }: NeuralThinkingProps) {

    const steps = [
        { id: 'scout', label: 'Scout', icon: Search, description: 'Deep retrieval across 15+ sources' },
        { id: 'analyst', label: 'Analyst', icon: Database, description: 'Impact correlation & metric extraction' },
        { id: 'consultant', label: 'Consultant', icon: Radio, description: 'Strategic synthesis & advisory' },
        { id: 'architect', label: 'Architect', icon: Activity, description: 'Neural path logic rendering' },
        { id: 'editor', label: 'Editor', icon: PenTool, description: 'Final validation & scoring' },
    ];

    const getCurrentStepIndex = () => {
        // If complete, return step length (past end)
        if (currentPhase === 'complete') return steps.length;
        return steps.findIndex(s => s.id === currentPhase);
    };

    const activeIndex = getCurrentStepIndex();

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8 p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-ping absolute top-0 left-0 opacity-75"></div>
                        <div className="w-3 h-3 bg-indigo-500 rounded-full relative"></div>
                    </div>
                    <h3 className="text-[11px] font-black text-zinc-900 uppercase tracking-widest">Processing Intelligence</h3>
                </div>
                <span className="text-[10px] font-bold text-zinc-300">EST. TIME: 14s</span>
            </div>

            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-zinc-100"></div>

                <div className="space-y-8 relative">
                    {steps.map((step, index) => {
                        const isActive = index === activeIndex;
                        const isCompleted = index < activeIndex;
                        const isPending = index > activeIndex;

                        return (
                            <div key={step.id} className={`flex gap-6 transition-all duration-500 ${isPending ? 'opacity-30' : 'opacity-100'}`}>
                                <div className={`
                                    relative z-10 w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500
                                    ${isActive ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-200 scale-110' : ''}
                                    ${isCompleted ? 'bg-white border-zinc-200 text-emerald-500' : ''}
                                    ${isPending ? 'bg-white border-zinc-100 text-zinc-300' : ''}
                                `}>
                                    {isCompleted ? <CheckCircle2 size={20} /> : <step.icon size={20} />}

                                    {isActive && (
                                        <div className="absolute -inset-1 bg-indigo-100 -z-10 rounded-2xl animate-pulse"></div>
                                    )}
                                </div>

                                <div className="pt-2 flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className={`text-sm font-bold transition-colors ${isActive ? 'text-indigo-900' : 'text-zinc-900'}`}>
                                            {step.label}
                                        </h4>
                                        {isActive && (
                                            <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">Processing</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-zinc-500 font-medium mb-3">{step.description}</p>

                                    {/* Live Logs for this step */}
                                    {(isActive || isCompleted) && (
                                        <div className="space-y-1.5">
                                            {thoughtLog
                                                .filter(log => log.phase === step.id)
                                                .map((log, i) => (
                                                    <div key={i} className="flex items-start gap-2 text-[10px] text-zinc-400 font-semibold animate-in fade-in slide-in-from-left-2 duration-300 uppercase tracking-tight">
                                                        <span className="text-indigo-300">●</span>
                                                        <span>{log.message}</span>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
