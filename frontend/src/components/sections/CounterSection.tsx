"use client"
import React, {useEffect, useState} from 'react';
import Image from 'next/image';

import {useGlobal} from "@/context/Global";
import {isMobile, shuffle} from "@/lib/utils";
import {stickerMobilePositions, stickerPositions} from "@/components/constants";
import ClientOnlyWrapper from "@/components/image-wrappers/ClientOnlyWrapper";
import {fetchBibleStudyCount} from "@/lib/api";

export default function CounterSection() {
    const {stickers, user} = useGlobal();
    const [randomStickers, setRandomStickers] = useState<typeof stickers>([]);
    const [bibleStudiesCount, setBibleStudiesCount] = useState<number>()
    useEffect(() => {
        fetchBibleStudyCount().then(response => {
            setBibleStudiesCount(response?.count || 0)
        }).catch(() => {
            setBibleStudiesCount(0)
        })

        setRandomStickers(
            shuffle(stickers).slice(0, 10));
    }, [stickers, user]);

    return (
        <div className="relative flex items-center justify-center bg-background-brand overflow-hidden pt-[30px] md:pt-[60px] pb-[30px] md:p-[70px]">
            {randomStickers.map((sticker, index) => (
                <ClientOnlyWrapper key={index}>
                    <Image
                        key={index}
                        src={sticker.imageUrl ?? ''}
                        alt={sticker.caption || 'sticker'}
                        width={120}
                        height={120}
                        className={`absolute ${isMobile ? stickerMobilePositions[index] : stickerPositions[index]}`}
                        sizes="(min-width: 1200px) 33vw, 100vw"
                    />
                </ClientOnlyWrapper>
            ))}

            {/* Counter card */}
            <div
                className="bg-white flex flex-col rounded-2xl overflow-hidden
                 max-w-lg w-4/5 text-center z-10 border-6 border-black shadow-black
                  shadow-[10px_15px_0_rgba(0,0,0,0.25)] sm:min-w-[315px] sm:min-h-[200px]
                  md:min-w-[900px] md:min-h-[300px]

                 ">
                <div
                    className="bg-accent text-white
                    leading-none border-b-6 border-black
                    text-[94px]
                    md:text-[236px]"
                >
                    <p className="leading-[.9] tk-field-gothic-xxcondensed font-black">{bibleStudiesCount?.toLocaleString()}</p>
                </div>
                <div
                    className="bg-white flex flex-1 justify-center items-center
                    text-black  font-[900] leading-none text-[34px] md:text-[80px] montserrat-font py-2 md:py-3">
                    <h1 className="m-0">SKILLS SHARED THIS YEAR!</h1>
                </div>
            </div>
        </div>
    );
}