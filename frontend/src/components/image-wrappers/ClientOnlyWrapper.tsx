'use client';

import React, { useEffect, useState } from "react";

interface Props {
    fallback?: React.ReactNode;
    children: React.ReactNode;
}

export default function ClientOnlyWrapper({ children, fallback = null }: Props) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return fallback;
    }

    return <>{children}</>;
}