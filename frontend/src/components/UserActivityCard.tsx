// components/UserActivityCard.tsx
"use client";

import React, {useEffect, useState} from "react";
import {getRandomRecentUser} from "@/lib/api";
import {useGlobal} from "@/context/Global";

export default function UserActivityCard() {
    const [randomUser, setRandomUser] = useState<{
        firstName: string;
        lastInitial: string;
        country: string;
    } | null>(null);
    const [displayName, setDisplayName] = useState('');
    const [displayLoc, setDisplayLoc] = useState('');
    const {user} = useGlobal();

    // fetch once on mount, then every 10 minutes
    useEffect(() => {
        const load = async () => {
            try {
                const jwt = localStorage.getItem("jwt") ?? '';
                const user = await getRandomRecentUser(jwt);
                if (user) {
                    setRandomUser(user)
                    setDisplayName(`${user.firstName?.toUpperCase()} ${user.lastInitial?.toUpperCase()}.`);
                    setDisplayLoc(user.state.toUpperCase());
                }
            } catch (e: unknown) {
                console.warn("ERROR", e);
            }
        };

        load().then();
        const timerId = setInterval(load, 600_000);

        return () => clearInterval(timerId);
    }, [user]);

    if (!randomUser) return null;

    return (
        <div
            className={`
        bg-white
        border-5 border-black
        shadow-black shadow-[0px_10px_0px_rgba(0,0,0,0.25)]
        rounded-full
        inline-block
        text-center
        relative
        montserrat-font
        leading-none
        w-fit

        /* mobile overrides */
        px-4 py-2
        text-[18px]

        /* md+ = original */
        md:px-8 md:py-4
        md:text-[56px]
      `}
        >
            <div className="text-[#EC7000] uppercase font-bold md:font-extrabold z-[1] relative">
                {displayName} from {displayLoc}
            </div>
            <div className="text-black uppercase font-bold md:font-extrabold z-[1] relative">
                taught a bible study!
            </div>
            <div
                className={`
          absolute
          bg-white
          border-b-2 border-r-2 border-black
          rotate-45
          rounded-[4px]
          shadow-black shadow-[10px_10px_0px_rgba(0,0,0,0.25)]

          /* mobile */
          w-8 h-8
          -bottom-4 right-9

          /* md+ = original */
          md:w-[60px] md:h-[60px]
          md:-bottom-[30px] md:right-[70px]
        `}
            />
        </div>
    );
}
