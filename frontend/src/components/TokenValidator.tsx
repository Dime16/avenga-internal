'use client';

import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter, usePathname } from 'next/navigation';
import { useGlobal } from '@/context/Global';

export default function TokenValidator() {
    const { logout, setUser } = useGlobal();
    const router = useRouter();
    const pathname = usePathname(); // triggers on every route change

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (!token) return;

        try {
            const decoded: { exp: number } = jwtDecode(token);
            const now = Math.floor(Date.now() / 1000);

            if (decoded.exp < now) {
                console.warn('Token expired, logging out...');
                setUser(null);
                logout();
                router.push('/login');
            }
        } catch (err) {
            console.error('Invalid token:', err);
            setUser(null);
            logout();
            router.push('/login');
        }
    }, [logout, pathname, router, setUser]);

    return null;
}