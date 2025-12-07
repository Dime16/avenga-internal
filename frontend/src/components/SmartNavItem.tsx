// src/components/SmartNavItem.tsx
'use client';

import Link from 'next/link';
import {useGlobal} from '@/context/Global';

interface SmartNavItemProps {
    url?: string;
    loggedInUrl?: string;
    title?: string;
    className?: string;
}

export default function SmartNavItem({url, loggedInUrl, title, className = ''}: SmartNavItemProps) {
    const {user} = useGlobal();
    const destination = (user ? (loggedInUrl ?? url) : url) ?? '/';

    return (
        <li className={`mb-[20px] font-bold text-[16px] ${className}`}>
            <Link href={destination}>{title}</Link>
        </li>
    );
}