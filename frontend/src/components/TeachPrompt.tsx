// components/TeachPrompt.tsx
"use client";

import React from "react";
import Image from "next/image";
import laptop from "../../public/png/pray-laptop.png";
import {useGlobal} from "@/context/Global";

export default function TeachPrompt() {
    const {openTeachModal} = useGlobal();

    return (
        <div className="w-full flex flex-col md:flex-row items-center bg-white mt-[80px]
    border-2 border-orange-500">
            <div className="
        flex-none
        bg-primary
        flex items-center justify-center
        px-4 md:px-6
        py-6
        rounded-l-lg
        rounded-r-full
      ">
                <div className="w-full h-full rounded-full overflow-hidden">
                    <Image
                        src={laptop}
                        alt="Praying before laptop"
                        width={300}
                        height={300}
                        className="object-cover w-full h-full"
                        sizes="(min-width: 1200px) 33vw, 100vw"
                    />
                </div>
            </div>

            <div className="
        flex-1
        rounded-r-lg
        pl-4 md:pl-6 pr-4 md:pr-6
        py-6
        flex flex-col md:flex-row
        items-center
        justify-center
      ">
                <div className="flex flex-col items-center">
                            <span className="text-[64px] font-bold text-black mb-6">
          Have you taught a Bible study
        </span>
                    <button onClick={openTeachModal} className="
          mt-4 md:mt-0
          bg-primary
          text-white
          px-6 py-2 md:px-8 md:py-3
          rounded
          font-bold
          text-[20px]
          cursor-pointer
          transition
        ">
                        Teach a Bible Study
                    </button>
                </div>
            </div>
        </div>
    );
}