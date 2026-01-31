'use client';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { swarmService } from "@/services/swarm-service";

/**
 * THE MUTATION HOOK (USE-SWARM)
 * This is like a "Custom Remote Control." 
 */
export const useLaunchSwarm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => swarmService.launch(),
        onSuccess: (data) => {
            // We tell the Heartbeat to refresh immediately!
            queryClient.invalidateQueries({ queryKey: ['swarm-status'] });
            console.log('Swarm launched!', data);
        },
        onError: (error) => {
            console.error('Failed to launch swarm', error);
        }
    });
};

/**
 * THE KILL-SWITCH HOOK (USE-STOP-SWARM)
 * This is for when you want to "Abort Mission."
 */
export const useStopSwarm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => swarmService.stop(),
        onSuccess: (data) => {
            // We tell the Heartbeat to refresh immediately!
            queryClient.invalidateQueries({ queryKey: ['swarm-status'] });
            console.log('Swarm stopped!', data);
        },
        onError: (error) => {
            console.error('Failed to stop swarm', error);
        }
    });
};

/**
 * THE HEARTBEAT HOOK (USE-SWARM-STATUS)
 * This hook checks the backend every 5 seconds to see if the swarm 
 * is still running. This makes the UI "Smart."
 */
export const useSwarmStatus = () => {
    return useQuery({
        queryKey: ['swarm-status'],
        queryFn: () => swarmService.status(),
        refetchInterval: 5000, // Check every 5 seconds
    });
};

/**
 * THE INTELLIGENCE FEED HOOK (USE-FINDINGS)
 * This fetches the real-world dossiers from the database.
 */
export const useFindings = (filters?: { wing?: string; sort?: string; min_confidence?: number }) => {
    return useQuery({
        queryKey: ['findings', filters],
        queryFn: () => swarmService.listFindings(filters),
        refetchInterval: 3000, // Refresh every 3 seconds for live thinking updates
    });
};
