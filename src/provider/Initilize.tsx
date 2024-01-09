"use client";
import Loader from '@/app/_ui/Loader/Loader';
import useData from '@/hooks/useData';
import React, { ReactNode } from 'react';

interface InitializeProps {
    children: ReactNode;
}

function Initialize({ children }: InitializeProps) {
    const { user_profile: data } = useData();

    return (false) ? (
        <Loader/>
    ) : (
        <>{children}</>
    );
}

export default Initialize;
