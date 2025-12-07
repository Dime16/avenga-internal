"use client";
import React from "react";
import Image from "next/image";

interface VideoPreviewProps {
    link: string;           // full video URL (YouTube/Vimeo)
    thumbnailUrl: string;   // pre-fetched thumbnail URL
}

export default function VideoPreview({ link, thumbnailUrl }: VideoPreviewProps) {
    // Detect source and construct embed URL
    const youtubeMatch = link.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([A-Za-z0-9_-]{11})/
    );
    const vimeoMatch = link.match(/vimeo\.com\/(?:video\/)?(\d+)/);

    let embedUrl = "";
    if (youtubeMatch) {
        const id = youtubeMatch[1];
        embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1`;
    } else if (vimeoMatch) {
        const id = vimeoMatch[1];
        embedUrl = `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1`;
    }

    return (
        <div className="group relative w-full h-0 pb-[56.25%] bg-gray-100 overflow-hidden">
            {/* Thumbnail */}
            {thumbnailUrl && (
                <Image
                    src={thumbnailUrl}
                    alt="Video thumbnail"
                    fill
                    className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            )}

            {/* Embedded player */}
            {embedUrl && (
                <iframe
                    src={embedUrl}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
                />
            )}

            {/* Play icon overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:hidden">
                <svg className="h-12 w-12 text-white drop-shadow-lg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="playMask" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
                        <rect width="48" height="48" fill="white" />
                        <polygon points="18,12 18,36 34,24" fill="black" />
                    </mask>
                    <circle cx="24" cy="24" r="24" fill="white" mask="url(#playMask)" />
                </svg>
            </div>
        </div>
    );
}
