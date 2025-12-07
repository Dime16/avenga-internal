// app/components/SeedVideos.tsx
import React from "react";
import {fetchInitialData} from "@/lib/api";
import {InitialData} from "@/types/InitialData.interface";
import VideoCarousel from "@/components/VideoCarousel";


export default async function SeedVideos() {
    const { seedVideos } = (await fetchInitialData()) as InitialData;

    if (!seedVideos || seedVideos.length === 0) return null;

    const videosWithThumbnails = await Promise.all(
        seedVideos.map(async (vid) => {
            const { link } = vid;

            const youtubeMatch = link.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([A-Za-z0-9_-]{11})/);
            const vimeoMatch = link.match(/vimeo\.com\/(?:video\/)?(\d+)/);

            let thumbnailUrl = "";

            if (vimeoMatch) {
                // 🎯 Vimeo overrides YouTube if matched
                try {
                    const res = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(link)}`);
                    const json = await res.json();
                    thumbnailUrl = json.thumbnail_url;
                } catch {
                    thumbnailUrl = ""; // Fallback
                }
            } else if (youtubeMatch && youtubeMatch[1]) {
                thumbnailUrl = `https://img.youtube.com/vi/${youtubeMatch[1]}/hqdefault.jpg`;
            }

            return {
                ...vid,
                thumbnailUrl,
            };
        })
    );

    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="text-center text-black font-extrabold mb-[20px] text-[24px] md:mb-[36px] md:text-[64px]">
                SkillSeeds Challenge
            </h2>

            <div className="w-full">
                <VideoCarousel videos={videosWithThumbnails} />
                {/*))}*/}
            </div>
        </div>
    );
}
