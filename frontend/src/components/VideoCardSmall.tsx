// app/components/VideoCardSmall.tsx
import React from "react";

interface VideoCardSmallProps {
    name: string;
    link: string;
    sort: number;
}

export default function VideoCardSmall({ name, link, sort }: VideoCardSmallProps) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`
        flex flex-col items-center 
        bg-white rounded-lg shadow-md hover:shadow-lg 
        transition-shadow duration-150
        px-4 py-6 space-y-3 text-black min-w-[145px]
      `}
        >
            {/* “Video” label at top */}
            <div className="text-sm font-semibold uppercase text-black">Video</div>

            {/* Circle with the number inside */}
            <div className="flex items-center justify-center h-[100px] w-[100px] md:h-[128px] md:w-[128px] rounded-full bg-background-brand">
                <span className="text-[72px] font-bold text-gray-800">{sort}</span>
            </div>

            {/* Speaker / video name */}
            <div className="text-center text-[24px] md:text-[36px] leading-snug">{name}</div>

            {/* Play icon */}
            <div className="flex items-center justify-center h-[48px] w-[48px] rounded-full bg-black mt-auto">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M8 5v14l11-7z" />
                </svg>
            </div>
        </a>
    );
}
