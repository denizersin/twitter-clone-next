"use client";
import React from 'react'
import useUserData from "@/app/hooks/useUserData";

export default function ClientPageContainer({ children, userData }) {

    const { data } = useUserData({
        initialData: userData
    })


    return (
        <> {children}</>
    )
}
