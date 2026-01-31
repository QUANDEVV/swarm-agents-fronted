'use client';

import React, { useState } from 'react';
import { useLaunchSwarm, useStopSwarm, useSwarmStatus } from "@/hooks/use-swarm";
import { useQueryClient } from "@tanstack/react-query";
import { IntelligenceFeed } from "@/components/intelligence-feed";
import { AppSidebar } from "@/components/app-sidebar";
import { SeriesViewer } from "@/components/series-viewer";
import { LandingExtensions } from "@/components/landing-extensions";

/**
 * THE DINING TABLE (MAIN PAGE)
 * Streamlined version: Controls moved to header, Hero removed.
 */
export default function Home() {
  const queryClient = useQueryClient();
  const [activeDepartment, setActiveDepartment] = useState('all');
  const [activeView, setActiveView] = useState('feed'); // 'feed' | 'episode'
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | undefined>(undefined);

  // Status and Controls
  const { data: status, isLoading: isStatusLoading } = useSwarmStatus();
  const { mutate: launchSwarm, isPending: isLaunching } = useLaunchSwarm();
  const { mutate: stopSwarm, isPending: isStopping } = useStopSwarm();

  const isSwarmActive = status?.active || false;

  const handleNavigate = (dept: string, view: string, episodeId?: string) => {
    setActiveDepartment(dept);
    setActiveView(view);
    setSelectedEpisodeId(episodeId);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* SIDEBAR */}
      <AppSidebar
        activeDepartment={activeDepartment}
        activeView={activeView}
        selectedEpisodeId={selectedEpisodeId}
        onNavigate={handleNavigate}
      />

      {/* CONTENT AREA */}
      <main className="flex-grow pl-64 transition-all">

        {/* STRATEGIC HEADER - NOW WITH CONTROLS */}
        <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md px-10 py-4 flex justify-between items-center border-b border-zinc-100/50">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigate('all', 'feed')}>
            <div className="w-8 h-8 bg-zinc-950 rounded shadow-sm flex items-center justify-center font-bold text-white text-xs">I</div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-sm text-zinc-950 leading-none">Infomly</span>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Intelligence</span>
            </div>
          </div>

          {/* MISSION CONTROLS - PERSISTENT IN HEADER */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isLaunching ? 'bg-amber-400 animate-pulse' : isSwarmActive ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-300'}`}></span>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest leading-none">
                    {isLaunching ? 'DEPLOYING' : isStopping ? 'STOPPING' : isSwarmActive ? 'Active' : 'Standby'}
                  </span>
                </div>
                {isSwarmActive && status?.progress && (
                  <span className="text-[8px] font-bold text-zinc-300 uppercase tracking-tighter mt-1">
                    Agents: {status.progress.pending}/{status.progress.total}
                  </span>
                )}
              </div>
            </div>

            <div className="h-8 w-px bg-zinc-100" />

            <div className="flex items-center gap-2">
              {isSwarmActive ? (
                <button
                  onClick={() => stopSwarm()}
                  disabled={isStopping}
                  className="px-6 py-2 bg-white border border-rose-100 text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-lg text-[10px] font-black uppercase tracking-[0.15em] transition-all disabled:opacity-50"
                >
                  {isStopping ? 'Recalling...' : 'Abort Mission'}
                </button>
              ) : (
                <button
                  onClick={() => launchSwarm()}
                  disabled={isLaunching}
                  className="px-6 py-2 bg-zinc-950 text-white rounded-lg text-[10px] font-black uppercase tracking-[0.15em] hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200 disabled:opacity-50"
                >
                  {isLaunching ? 'Deploying...' : 'Execute Intelligent Batch'}
                </button>
              )}
            </div>
          </div>
        </nav>

        {activeView === 'feed' ? (
          <div className="bg-white">
            {/* THE DASHBOARD SECTION */}
            <div className="pb-24">
              <IntelligenceFeed initialWing={activeDepartment} />
            </div>

            {/* LANDING EXTENSIONS (COMMUNITY & SERVICES) */}
            {activeDepartment === 'all' && <LandingExtensions />}
          </div>
        ) : (
          <div className="bg-[#F9FAFB] min-h-[calc(100vh-68px)]">
            <SeriesViewer episodeId={selectedEpisodeId || ''} onBack={() => handleNavigate(activeDepartment, 'feed')} />
          </div>
        )}

        {/* HIGH-END MINIMAL FOOTER */}
        <footer className="w-full py-20 flex flex-col items-center border-t border-zinc-100 bg-white">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-6 h-6 bg-zinc-950 rounded flex items-center justify-center font-bold text-white text-[10px]">I</div>
            <span className="text-sm font-bold tracking-tight text-zinc-950">Infomly Intelligence</span>
          </div>
          <p className="text-[10px] text-zinc-300 font-bold tracking-[0.4em] uppercase">
            Sovereign Node 0x7F2 • Parallel-Agent RL Protocol
          </p>
        </footer>
      </main>
    </div>
  );
}
