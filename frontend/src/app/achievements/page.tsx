"use client";

import React, {useEffect, useState} from "react";

import {useGlobal} from "@/context/Global";
import UserGreeting from "@/components/UserGreeting";
import Navbar from "@/components/Navbar";
import LogoutModal from "@/components/modals/LogoutModal";
import Image from "next/image";
import TeachModal from "@/components/modals/TeachModal";
import {assignUserBadges} from "@/lib/utils";
import ImageWithPlaceholder from "@/components/image-wrappers/ImageWithPlaceholder";
import {fetchMyBibleStudyEntryCount, recordDailyLogin} from "@/lib/api";
import {useRouter} from "next/navigation";

export default function Achievements() {
    const router = useRouter();
    const {openTeachModal, setLoginCount, userBadges, loginCount, user} = useGlobal();
    const  [currentUser, setCurrentUser] = useState(user)



    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
            router.push("/login");
        }

        Promise.all([recordDailyLogin(jwt ?? ''), fetchMyBibleStudyEntryCount(jwt ?? '')]).then(([userDailyLogin, bibleStudyCount]) => {
            setLoginCount(userDailyLogin);
            if (user) {
                user.bibleStudyCount = bibleStudyCount;
                assignUserBadges(user, userDailyLogin, userBadges);
                setCurrentUser({ ...user });
            }
        })
            .catch(console.warn)
            .finally(() => {
            });
    }, [loginCount, router, setLoginCount, user, userBadges]);


    return (
        <div className="flex flex-col min-h-screen relative">
            <header className="sticky top-0 z-20 md:block">
                <UserGreeting/>
                <Navbar/>
            </header>
            <main className="bg-background-brand relative px-[16px] pb-[30px] md:px-[80px] md:pb-[80px] flex-1 flex flex-col">
                <LogoutModal/>
                <section className="teach-prompt">
                    <TeachModal/>
                </section>
                <section className="flex flex-col items-center text-black justify-center flex-1 bg-background-brand">
                    <div className="flex flex-col items-center w-full">
                        <h1 className="montserrat-font text-[64px] text-center font-extrabold mb-[36px] hidden md:block">
                            BADGES EARNED
                        </h1>

                        <div
                            className="mb-[24px] relative z-1 w-full gap-[20px] flex flex-col md:flex-row md:justify-between md:gap-[44px] ">
                            <div
                                className="max-w-7xl flex flex-col bg-white rounded-xl shadow-lg p-[20px] flex-1 md:flex-1/2 md:mx-auto md:p-[36px]">
                                <h2 className="montserrat-font text-[36px] font-semibold text-center mb-0 md:mb-[32px] uppercase leading-none">First
                                    Badge</h2>
                                {user?.registerBadge ? (
                                    <div className="text-center h-full">
                                        {user.registerBadge.imageUrl ? (
                                            <div className="text-center flex flex-col justify-between h-full">
                                                <div
                                                    className="relative flex items-center justify-center min-w-[200px] h-[148px] space-y-3">
                                                    <ImageWithPlaceholder src={user.registerBadge.imageUrl}
                                                                          alt={"World icon"}
                                                                          className={"object-contain mx-1 h-[88px] w-[80px] md:h-[200px] md:w-[250px]"}/>
                                                </div>
                                                <div className="">
                                                    <p className="text-[14px] md:text-[16px]  mt-1 font-bold">{user.registerBadge.title}</p>
                                                    <p className="text-[12px] md:text-[16px] md:mt-2">{user.registerBadge.description}</p>
                                                </div>
                                            </div>) : (
                                            <div className="flex justify-center">
                                                <div
                                                    className="bg-amber-100 animate-pulse rounded-md h-[88px] w-[80px] md:h-[148px] md:w-[200px]"></div>
                                            </div>
                                        )
                                        }
                                    </div>) : (<div className="flex justify-center items-center"><p className="m-0">No badge earned in this category</p></div>)}
                            </div>
                            <div
                                className="max-w-7xl bg-white rounded-xl shadow-lg relative z-1 flex-1 p-[20px] md:flex-1/2 md:mx-auto md:p-[36px]">
                                <h2 className="montserrat-font text-[36px] font-semibold text-center mb-0 md:mb-[32px] uppercase leading-none">Visit Badges</h2>
                                <div className="flex justify-between items-center h-auto">
                                    {user && user.loginBadge ? user.loginBadge?.map((badge, index) => (
                                        <div key={index} className="text-center flex flex-col items-center">
                                            <div
                                                className="relative flex items-center justify-center h-[88px] w-[80px] md:h-[200px] md:w-[250px]">
                                                <Image
                                                    fill
                                                    priority
                                                    src={badge.imageUrl || ''}
                                                    alt="World icon"
                                                    className={`object-contain mx-1 h-[88px] w-[80px] md:h-[200px] md:w-[250px] ${badge.active ? '' : 'opacity-30'}`}
                                                    sizes="(min-width: 1200px) 33vw, 100vw"
                                                />
                                            </div>
                                            <p className="text-[14px] md:text-[16px]  mt-1 font-bold">{badge.title}</p>
                                            <p className="text-[12px] md:text-[16px] md:mt-2">{badge.description}</p>
                                        </div>
                                    )) : (['', '', ''].map((_, index) => (
                                        <div className="flex justify-center" key={index}>
                                            <div
                                                className="bg-amber-100 animate-pulse rounded-md h-[88px] w-[80px] md:h-[148px] md:w-[200px]"></div>
                                        </div>
                                    )))
                                    }
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-white rounded-xl shadow-lg relative z-1 text-center w-full p-[20px] md:p-[36px] md:w-[75%]">
                            <h2 className="montserrat-font text-[36px] font-semibold text-center mb-[23px] leading-none uppercase">Bible Studies Badges</h2>
                            <button onClick={openTeachModal} type="button"
                                    className="text-white bg-black rounded-md w-fit py-2 px-4">
                                Teach a Bible Study
                            </button>
                            <div
                                className="flex justify-between items-center flex-wrap md:flex-nowrap gap-[25px] md:gap-[48px]">
                                {currentUser?.bibleStudyBadges ? (currentUser.bibleStudyBadges.map((badge, index) => (
                                    <div key={index}
                                         className="text-center flex flex-col items-center flex-[25%] md:flex-1/5">
                                        <div
                                            className="relative flex items-center justify-center h-[88px] w-[80px] md:h-[200px] md:w-[250px]">
                                            <Image
                                                fill
                                                className={`object-contain mx-1 h-[88px] w-[80px] md:h-[200px] md:w-[250px] ${badge.active ? '' : 'opacity-30'}`}
                                                priority
                                                src={badge.imageUrl || ''}
                                                alt="World icon"
                                                sizes="(min-width: 1200px) 33vw, 100vw"
                                            />
                                        </div>

                                        <p className="text-[14px] md:text-[16px] font-bold">{badge.title}</p>
                                        <p className="text-[12px] md:text-[16px] md:mt-2">{badge.description}</p>
                                        <div/>
                                    </div>
                                ))) : (['', '', ''].map((_, index) => (
                                    <div className="flex justify-center" key={index}>
                                        <div
                                            className="bg-amber-100 animate-pulse rounded-md h-[88px] w-[80px] md:h-[148px] md:w-[200px]"></div>
                                    </div>
                                )))
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}