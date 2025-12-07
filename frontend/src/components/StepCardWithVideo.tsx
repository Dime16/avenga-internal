// src/app/components/VideoWithStep.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface VideoWithStepProps {
    videoImageUrl: string;
    description: string;
    url: string;
}

export default function StepCardWithVideo({
                                              videoImageUrl,
                                              description,
                                              url,
                                          }: VideoWithStepProps) {

    if(!videoImageUrl || !url || !description) {
        return null;
    }
    return (
        <div className="bg-white flex-1/4 rounded-2xl flex flex-col min-h-[238px] md:min-h-[435px]">
            {videoImageUrl && (
                <Link
                    href={url}
                    className="block relative flex-1"
                >
                    <Image
                        src={videoImageUrl}
                        alt={description}
                        fill
                        className="object-contain w-full h-full pt-8"
                        sizes="(min-width: 1200px) 33vw, 100vw"
                    />
                </Link>)}
            {url && (
                <Link
                    href={url}
                    className="flex items-center text-lg font-medium text-green-600 hover:underline px-[18px] py-[16px]"
                >
                    <div className="bg-accent w-[48px] h-[48px] rounded-[50%] flex justify-center items-center">
                        <div
                            className="
              w-0 h-0
              border-t-[10px] border-t-transparent
              border-b-[10px] border-b-transparent
              border-l-[15px] border-l-white ml-1
            "
                        />
                    </div>

                    <p className="text-[#0C0C0C] ml-[10px] font-light text-[24px]">{description}</p>
                </Link>
            )}
        </div>
    );
}