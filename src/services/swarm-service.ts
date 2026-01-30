import apiClient from "@/lib/api-client";

/**
 * THE DELIVERY TRUCK (SWARM SERVICE)
 * This specific file handles all requests for the Swarm.
 * It's the only place that knows the exact backend "addresses."
 */
export const swarmService = {
    /**
     * PUSH THE BUTTON: This tells the backend to start the swarm now.
     */
    launch: async () => {
        const response = await apiClient.post('/admin/swarm/launch');
        return response.data;
    },

    /**
     * STOP THE ENGINES: This tells the backend to recall all agents.
     */
    stop: async () => {
        const response = await apiClient.post('/admin/swarm/stop');
        return response.data;
    },

    /**
     * CHECK STATUS: Asks the backend "Is anyone in the field right now?"
     */
    status: async () => {
        const response = await apiClient.get('/admin/swarm/status');
        return response.data;
    },

    /**
     * THE INTELLIGENCE FEED: Fetches all published dossiers.
     */
    /**
     * THE INTELLIGENCE FEED: Fetches all published dossiers.
     */
    listFindings: async (params?: { wing?: string; sort?: string; min_confidence?: number }) => {
        const response = await apiClient.get('/findings', { params });
        return response.data;
    },

    /**
     * REVIEW: Approve a finding to make it officially published.
     */
    approve: async (id: number) => {
        const response = await apiClient.post(`/admin/review/${id}/approve`);
        return response.data;
    },

    /**
     * REVIEW: Kill a finding (Trash/Delete).
     */
    kill: async (id: number) => {
        const response = await apiClient.post(`/admin/review/${id}/kill`);
        return response.data;
    }
};
