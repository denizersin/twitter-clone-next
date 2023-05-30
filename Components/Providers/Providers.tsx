"use client";
import React, { FC } from 'react'
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,// 5 minutes
        
        }
    }
})
interface IProvidersProps {
    children?: React.ReactNode | React.ReactNode[];
}

const Providers: FC<IProvidersProps> = ({ children }: IProvidersProps) => {


    return (

        <SessionProvider>
            <QueryClientProvider client={queryClient} >
                <ReactQueryDevtools initialIsOpen={true} />
                {children}
            </QueryClientProvider>
        </SessionProvider>
    )
}
export default Providers;