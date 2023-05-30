"use client";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'

export default function PageLoading() {
    const { data: loadingStata } = useQuery({
        queryKey: ['loadingState']
    })
    const queryClient = useQueryClient();
    useEffect(() => {
        queryClient.setQueryData(['loadingState'], 'loading');
        return () => {
            queryClient.setQueryData(['loadingState'], 'loaded');

        }
    }, [])


    return (
        <div className={'loading component'}> <span>loading</span>

        </div>
    )
}
