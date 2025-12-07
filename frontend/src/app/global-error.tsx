// src/app/global-error.tsx
'use client';
import logo from "../../public/png/logo-black.png";
import React from "react";
import Image from "next/image";

export default function GlobalError() {
    return (

        <div className="bg-background-brand flex flex-col items-center justify-center h-screen text-black">
            <div className="flex justify-center mb-[40px] md:mb-[26px]">
                <Image
                    className="w-[280px]"
                    priority
                    src={logo}
                    alt="SkillSeeds Logo"
                    sizes="(min-width: 1200px) 33vw, 100vw"
                />
            </div>
            <h1 className="text-2xl font-bold mb-2">Something went wrong...</h1>
            <p className="text-[18px]">You can try to go to</p>

            <div className="text-center mt-6">
                <a href="/home" className="mt-6 bg-black text-white px-4 py-2 rounded mr-4 text-[18px]">
                    Home
                </a>
                <span className="mr-4 text-[18px]">or</span>
                <a href="/login" className="mt-6 bg-black text-white px-4 py-2 rounded text-[18px]">
                    Login
                </a>
                <p className="mt-6 text-[18px]">in a few seconds</p>
            </div>

        </div>
    );
}