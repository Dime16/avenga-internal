"use client";

import LoginForm from "@/components/LoginForm";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {useGlobal} from "@/context/Global";
import {fetchMyBibleStudyEntryCount, loginUser, recordDailyLogin} from "@/lib/api";
import {assignUserBadges} from "@/lib/utils";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState<string>('');
    const {showLoader, hideLoader, setUser, setLoginCount, userBadges} = useGlobal();

    const handleLogin = async (data: { identifier: string; password: string }) => {
        showLoader();
        try {
            const {jwt, user} = await loginUser(data);
            if (user) {
                localStorage.setItem("jwt", jwt);
                localStorage.setItem("user", JSON.stringify(user));
                const bibleStudyCount = await fetchMyBibleStudyEntryCount(jwt)
                const userWithCount = {...user, bibleStudyCount: bibleStudyCount};
                setUser(userWithCount)
                const userDailyLogin = await recordDailyLogin(jwt);
                setLoginCount(userDailyLogin);
                assignUserBadges(user, userDailyLogin, userBadges);
                router.push("/home");
                setError('')
            } else {
                setError('Invalid username or password');
            }
        } catch (err: unknown) {
            setError('Invalid username or password');
            console.warn(err);
        } finally {
            hideLoader();
        }
    };

    return (
        <div className="flex min-h-screen max-h-screen md:overflow-hidden pt-[env(safe-area-inset-top)]">
            <div className="w-full bg-[url('/background.png')] bg-cover bg-center hidden md:w-1/3 md:block"></div>
            <div
                className="w-full md:w-2/3 flex items-center justify-center p-6 relative bg-background-brand">
                <LoginForm onSubmit={handleLogin} error={error}/>
            </div>
        </div>
    );
}
