// app/components/InteractiveStudy.tsx
import React from "react";
import {fetchInitialData} from "@/lib/api";
import Image from "next/image";
import InteractiveStudyLink from "@/components/interactiveStudyLink";
import {InitialData} from "@/types/InitialData.interface";

export default async function InteractiveStudy() {
    const {interactiveStudy} = await fetchInitialData() as InitialData;

    if (!interactiveStudy) {
        return null
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm p-[16px] pb-[32px] md:p-[20px]">
            <div className="flex flex-col md:flex-row items-stretch gap-6">
                <div
                    className="w-full md:w-1/2 rounded-lg overflow-hidden h-[345px] object-contain object-center relative">
                    <Image
                        src={interactiveStudy.imageUrl}
                        alt={interactiveStudy.title}
                        fill
                        className=" w-full h-[345px] rounded-lg object-contain object-center"
                        priority
                        sizes="(min-width: 1200px) 33vw, 100vw"
                    />
                </div>

                <div className="flex flex-col justify-around text-center md:text-left">
                    <h2 className="font-extrabold text-black leading-tight text-[24px] md:text-[64px] mb-[20px] ">
                        {interactiveStudy.title}
                    </h2>
                    <p className="text-[16px] text-black  md:mb-4 md:text-[20px]">
                        {interactiveStudy.description}
                    </p>
                    <div className="mt-[20px] md:mt-6">
                        <InteractiveStudyLink pdfUrl={interactiveStudy.pdfUrl} privateLink={interactiveStudy.privateLink} actionButtonText={interactiveStudy.actionButtonText}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
