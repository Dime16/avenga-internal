// app/about/page.tsx

import Image from "next/image";
import React from "react";
import {fetchInitialData} from "@/lib/api";
import logo from "../../../public/png/logo-white.png";
import {
    aboutImagesClasses,
    imageCardsConfig,
    mobileAboutImagesClasses
} from "@/components/constants";
import ShowMoreText from "@/components/ShowMoreText";
import {headers} from "next/headers";
import {InitialData} from "@/types/InitialData.interface";

export default async function AboutSection() {
    // This runs on the server at request time
    const {about} = await fetchInitialData() as InitialData;
    const h = await headers();
    const ua = h.get('user-agent') ?? '';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(ua);

    // If fetching failed or no entry, show a fallback
    if (!about) {
        return null
    }

    return (
        <div className="mt-[35px] md:mt-[80px]">
            <h1 className="text-center text-black font-extrabold mb-[20px] text-[24px] md:mb-[36px] md:text-[64px]">{about.title}</h1>
            <div
                className="relative w-full h-[220px] md:h-[400px] bg-cover bg-[position:50%_20%] rounded-[20px] overflow-hidden"
                style={{ backgroundImage: `url(${about.coverUrl})` }}
            >
                <div className="mx-auto">
                    <div className="flex flex-col md:grid md:grid-cols-5 md:gap-8">
                        <div className="flex-3/5 md:col-span-3" style={{color: about?.textColor || 'inherit'}}>
                            <Image src={logo} alt="SkillSeeds " width={150} style={{'height': 'auto'}}
                                   sizes="(min-width: 1200px) 33vw, 100vw"/>
                            <ShowMoreText text={about.description} minHeight={360} className={"mt-[24px] text-[18px] font-bold"}
                                          buttonClassName={"font-bold"}/>
                        </div>
                        <div className="flex-2/5 min-h-[300px] py-[20px] md:p-0 md:col-span-2 relative">
                            {about?.imageUrls?.map((image, index) => (
                                <div className="absolute bg-transparent w-full h-full" key={index}>
                                    <Image
                                        key={image}
                                        src={image}
                                        alt="Students studying in a classroom"
                                        width={imageCardsConfig[index].imageWidth}
                                        height={imageCardsConfig[index].imageHeight}
                                        className={`object-contain absolute ${isMobile ? mobileAboutImagesClasses[index] : aboutImagesClasses[index]}`}
                                        sizes="(min-width: 1200px) 33vw, 100vw"
                                    />
                                </div>

                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
