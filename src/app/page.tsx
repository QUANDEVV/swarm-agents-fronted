'use client';

import { useLaunchSwarm, useStopSwarm, useSwarmStatus } from "@/hooks/use-swarm";
import { useQueryClient } from "@tanstack/react-query";
import { IntelligenceFeed } from "@/components/intelligence-feed";

/**
 * THE DINING TABLE (MAIN PAGE)
 * This is a super clean page. No URLs. No fetch calls.
 * It just uses our "Remote Control" hooks to talk to the kitchen.
 */
export default function Home() {
  const queryClient = useQueryClient();

  // 1. THE HEARTBEAT: We ask the backend "Is a swarm running?"
  const { data: status, isLoading: isStatusLoading } = useSwarmStatus();

  // 2. THE REMOTE CONTROLS: For starting and stopping.
  const { mutate: launchSwarm, isPending: isLaunching } = useLaunchSwarm();
  const { mutate: stopSwarm, isPending: isStopping } = useStopSwarm();

  // We check if the swarm is currently active according to the backend.
  const isSwarmActive = status?.active || false;

  return (
    <main className="min-h-screen bg-white text-zinc-900 font-sans antialiased selection:bg-indigo-100">

      {/* MINIMALIST HEADER */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center border-b border-zinc-100/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-zinc-950 rounded shadow-sm flex items-center justify-center font-bold text-white text-xs">I</div>
          <span className="font-semibold tracking-tight text-lg">Infomly Intelligence</span>
        </div>
        <div className="text-[10px] font-medium tracking-[0.2em] text-zinc-400 uppercase">
          Neural Node 01
        </div>
      </nav>

      {/* HERO SECTION - Investor Ready */}
      <div className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h1 className="text-6xl font-bold tracking-tight text-zinc-950 mb-6 leading-[1.1]">
          High-frequency forensic <br />
          <span className="text-indigo-600 italic font-serif">intelligence swarms</span>.
        </h1>

        <p className="text-lg text-zinc-500 max-w-xl mx-auto mb-12 font-medium leading-relaxed">
          Orchestrate up to 100 decentralized sub-agents to synthesize
          institution-grade dossiers in parallel.
        </p>

        {/* STRIPE-LIKE TRIGGER BUTTONS */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => launchSwarm()}
              disabled={isLaunching || isStopping || isSwarmActive}
              className={`
                relative overflow-hidden group
                px-8 py-3 rounded-md font-semibold text-sm transition-all duration-200
                ${isLaunching
                  ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200'
                  : isSwarmActive
                    ? 'bg-green-600 text-white border border-green-700 shadow-md cursor-default'
                    : 'bg-zinc-950 text-white hover:bg-zinc-800 border border-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.1)] active:scale-[0.98]'
                }
              `}
            >
              <div className="flex items-center gap-2">
                {isLaunching && (
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                )}
                <span>
                  {isLaunching ? 'Deploying Parallel Agents...' : isSwarmActive ? 'Swarm in Progress' : 'Execute Intelligent Batch'}
                </span>
              </div>
            </button>

            {/* THE STOP BUTTON (KILL-SWITCH) */}
            <button
              onClick={() => stopSwarm()}
              disabled={isLaunching || isStopping || !isSwarmActive}
              className={`
                px-8 py-3 rounded-md font-semibold text-sm transition-all duration-200
                border border-zinc-200 text-zinc-600 hover:bg-red-50 hover:text-red-700 hover:border-red-100
                disabled:opacity-30 disabled:cursor-not-allowed
              `}
            >
              <div className="flex items-center gap-2">
                {isStopping && (
                  <div className="w-3 h-3 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin"></div>
                )}
                <span>{isStopping ? 'Recalling...' : 'Abort Mission'}</span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-medium">
            <span className={`w-1.5 h-1.5 rounded-full ${isLaunching ? 'bg-amber-400 animate-pulse' : isSwarmActive ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-300'}`}></span>
            API STATUS: {isLaunching ? 'DEPLOYING' : isStopping ? 'STOPPING' : isSwarmActive ? 'FIELD ANALYSIS' : 'IDLE'}
          </div>

          {isSwarmActive && status?.progress && (
            <div className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest mt-2">
              Agents: {status.progress.pending} Pending | {status.progress.total} Total
            </div>
          )}
        </div>
      </div>

      {/* THE INTELLIGENCE DASHBOARD */}
      <section className="bg-zinc-50/50 min-h-[400px]">
        <IntelligenceFeed />
      </section>

      {/* SUBTLE BRANDING */}
      <footer className="w-full p-8 flex justify-center border-t border-zinc-50 bg-white">
        <p className="text-[10px] text-zinc-300 font-medium tracking-widest uppercase">
          Secured by Institutional Parallel-Agent RL
        </p>
      </footer>

    </main>
  );
}
