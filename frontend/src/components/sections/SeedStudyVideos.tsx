// app/components/SeedStudyVideos.tsx
import React from "react";
import {fetchInitialData} from "@/lib/api";
import VideoCardSmall from "@/components/VideoCardSmall";
import {InitialData} from "@/types/InitialData.interface";


export default async function SeedStudyVideos() {
    const {seedStudyCards} = await fetchInitialData() as InitialData;

    if (!seedStudyCards || seedStudyCards.length === 0) {
        return null;
    }

    return (
        <div>
            <h2 className="text-center text-black font-extrabold mb-[20px] text-[24px] md:mb-[36px] md:text-[64px]">
                WHY SEED STUDIES?
            </h2>

            <div className="flex overflow-auto md:mx-auto md:grid md:grid-cols-5 gap-6">
                {seedStudyCards.map((vid) => (
                    <VideoCardSmall
                        key={vid.id}
                        name={vid.name}
                        link={vid.link}
                        sort={vid.sort}
                    />
                ))}
            </div>
        </div>
    );
}
