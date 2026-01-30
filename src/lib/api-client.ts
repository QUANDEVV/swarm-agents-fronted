import axios from 'axios';

/**
 * THE KITCHEN (API CLIENT)
 * This is where we talk to the backend. 
 * We keep the URLs here so they don't get messy in our pages.
 */
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default apiClient;
