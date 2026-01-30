'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

/**
 * THE WAITER STATION (QUERY PROVIDER)
 * This lets the whole website use TanStack Query.
 */
export default function QueryProvider({ children }: { children: React.ReactNode }) {
    // We create a "Client" - this is like the waiter's notepad where they remember orders.
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // Remember things for at least 1 minute
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
