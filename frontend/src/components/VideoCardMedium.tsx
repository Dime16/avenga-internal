// components/VideoCardMedium.tsx
import React from "react";
import VideoPreview from "@/components/VideoPreviewcard";

interface VideoCardMediumProps {
    title: string;
    description: string;
    link: string;
    thumbnailUrl: string;
}

export default function VideoCardMedium({ title, description, link, thumbnailUrl }: VideoCardMediumProps) {
    return (
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md flex flex-col justify-between h-full w-[200px] md:w-full">
            <a href={link} target="_blank" rel="noopener noreferrer">
                <VideoPreview thumbnailUrl={thumbnailUrl} link={link} />
            </a>
            <div className="p-4 flex flex-col">
                <h3 className="font-bold text-black text-[20px] line-clamp-1 md:line-clamp-none md:text-lg">{title}</h3>
                <p className="text-gray-700 text-sm line-clamp-2 md:line-clamp-3 md:mt-1">{description}</p>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center bg-black text-white font-medium py-2 rounded-md hover:bg-gray-800 transition mt-2 md:mt-4"
                >
                    PLAY
                </a>
            </div>
        </div>
    );
}