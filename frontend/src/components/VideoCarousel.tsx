"use client";

import React, { useRef } from "react";
import VideoCardMedium from "@/components/VideoCardMedium";
import { IVideoCardMedium } from "@/types/VideoCardMedium.interface";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

type Props = {
    videos: IVideoCardMedium[];
};

export default function VideoCarousel({ videos }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        const container = containerRef.current;
        if (!container) return;

        const scrollAmount = container.offsetWidth * 0.8;

        container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative w-full">

            <div className="relative">

                <div className="flex">
                    <div
                        ref={containerRef}
                        className="flex overflow-auto md:overflow-x-auto gap-[2%] md:scroll-smooth md:snap-x md:snap-mandatory md:mx-auto hide-scrollbar md:items-stretch lg:w-[calc(100%-100px)] "
                    >
                        {videos.map((vid) => (
                            <div key={vid.id} className="basis-1/2 md:flex-shrink-0 md:snap-start md:basis-[18.3%] h-full">
                                <VideoCardMedium
                                    title={vid.title}
                                    description={vid.description}
                                    link={vid.link}
                                    thumbnailUrl={vid.thumbnailUrl}
                                />
                            </div>
                        ))}
                        <div className="lex-shrink-0 snap-start flex-[2%] h-full" aria-hidden="true" />
                    </div>
                </div>


                <button
                    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-100 z-10"
                    onClick={() => scroll("left")}
                    aria-label="Scroll left"
                    disabled={videos.length <= 5}
                >
                    <HiChevronLeft size={24} />
                </button>

                <button
                    className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-100 z-10"
                    onClick={() => scroll("right")}
                    aria-label="Scroll right"
                    disabled={videos.length <= 5}
                >
                    <HiChevronRight size={24} />
                </button>
            </div>
        </div>
    );
}