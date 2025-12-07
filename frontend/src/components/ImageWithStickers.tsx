// src/app/components/ImageWithStickers.tsx
"use client";

import React from "react";
import {useGlobal} from "@/context/Global";
import {isMobile, shuffle} from "@/lib/utils";
import Image from "next/image";
import {mobileStickersOverImage, stickersOverImage} from "@/components/constants";
import ClientOnlyWrapper from "@/components/image-wrappers/ClientOnlyWrapper";


interface ImageWithStickersProps {
    imageUrl: string;
}

export default function ImageWithStickers({imageUrl}: ImageWithStickersProps) {
    const {stickers} = useGlobal();

    const randomStickers = shuffle(stickers).slice(0, 3);

    return (
        <div className="relative block h-full min-h-[450px]">
            <Image
                src={imageUrl}
                alt="main"
                fill
                className="w-full rounded-2xl object-cover"
                sizes="(min-width: 1200px) 33vw, 100vw"
            />


            {randomStickers.map((sticker, i) => (
                <ClientOnlyWrapper key={i}>
                    <Image
                        width={isMobile ? mobileStickersOverImage[i].imageWidth : stickersOverImage[i].imageWidth}
                        height={isMobile ? mobileStickersOverImage[i].imageHeight : stickersOverImage[i].imageHeight}
                        key={i}
                        src={sticker.imageUrl ?? ''}
                        alt="sticker"
                        className={`absolute z-1 ${isMobile ? mobileStickersOverImage[i].classes : stickersOverImage[i].classes}`}
                        sizes="(min-width: 1200px) 33vw, 100vw"
                    />
                </ClientOnlyWrapper>
            ))}
        </div>
    );
}