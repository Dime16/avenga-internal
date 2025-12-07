// app/components/FeaturedStudies.tsx
import React from "react";
import {fetchInitialData} from "@/lib/api";
import FeaturedCard from "@/components/FeaturedCard";
import {InitialData} from "@/types/InitialData.interface";


export default async function FeaturedStudies() {
    const {featuredStudies} = await fetchInitialData() as InitialData;

    if (!featuredStudies || featuredStudies.length === 0) {
        return null
    }

    return (
        <div className="pb-[35px]">
            <h1 className="text-center text-black font-extrabold mb-[20px] text-[24px] md:text-[64px] md:mb-[36px]">
                Explore Our Featured Studies
            </h1>

            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {featuredStudies.map((featuredCard, index) => (
                    <FeaturedCard
                        key={featuredCard.id}
                        id={index + 1}
                        description={featuredCard.description}
                        pdfUrl={featuredCard.pdfUrl}
                        imageUrl={featuredCard.imageUrl}
                        privateLink={featuredCard.privateLink}
                    />
                ))}
            </div>
        </div>
    );
}
