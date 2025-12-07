import React from "react";
import Link from "next/link";
import Image from "next/image";
import {fetchInitialData} from "@/lib/api";
import {imageCardsConfig} from "@/components/constants";
import {InitialData} from "@/types/InitialData.interface";


export default async function ImageCard() {


    const {imageCards} = await fetchInitialData() as InitialData;

    if(!imageCards) return null;

    imageCards.forEach(card => {
        const words = card.text.split(" ");
        words.forEach(word => {
            if (word.length > 10) {
                const firstPart = word.slice(0, 10) + "-";
                const secondPart = word.slice(10);
                card.text = card.text.replace(word, firstPart + secondPart);
            }
        })
    });

    return (
        <div className="flex justify-between montserrat-font font-montserrat gap-[12px] md:gap-[35px]">
            {imageCards.map((card, index) => (
                <Link
                    key={card.id}
                    href={card.href}
                    className={` border-black shadow-black shadow-[10px_10px_0px_rgba(0,0,0,0.25)]  relative 
                     flex flex-col  aspect-square rounded-[20px] border-5 transition ${imageCardsConfig[index].backgroundColor}
                     flex-1/3 max-w-1/3
                     md:h-[400px]
                     `}
                >
                    <div className="flex-1 relative bg-transparent">
                        <Image
                            src={card.imageUrl}
                            alt={card.text}
                            width={imageCardsConfig[index].imageWidth}
                            height={imageCardsConfig[index].imageHeight}
                            className={`object-contain absolute ${imageCardsConfig[index].imageClasses}`}
                            sizes="(min-width: 1200px) 100vw"
                        />
                    </div>
                    <div
                        className="z-1 font-extrabold bg-transparent text-white leading-[.9] text-[16px] p-3 lg:text-[40px] xl:text-[50px] 2xl:text-[60apx] md:p-6 ">
                        {card.text}
                    </div>
                </Link>
            ))}
        </div>
    );
}
