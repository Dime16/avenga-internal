'use client'

import React from "react";
import Image from "next/image";
import {useGlobal} from "@/context/Global";


export default function ImageAndText({position}: { position:  'top' | 'bottom' }) {
    const {imageAndText, user} = useGlobal()
    const components = imageAndText.filter(card => card.position === position);



    return (
        <div
            className={`grid montserrat-font font-montserrat grid-cols-1 md:grid-cols-2 gap-[35px] bg-background-brand items-stretch
              ${components && components.length > 0 && components[0].position === 'top' ? 'mt-[35px] md:mt-[80px]' : 'pb-[40px] md:pb-[80px]'}`}>
            {components.map((card, index) => {
                    switch (card.type) {
                        case 'image':
                            return (
                                <div
                                    key={index}
                                    className="relative aspect-[3/2] border-black border rounded-[40px] overflow-hidden w-full"
                                >
                                    <Image
                                        src={card.imageUrl ?? ''}
                                        alt={card.imageAlt ?? 'Alt'}
                                        fill
                                        sizes="(min-width: 1200px) 33vw, 100vw"
                                        className="object-cover"
                                    />
                                </div>
                            )
                        case 'text':
                            return (
                                <div key={index}
                                     className="border-black border rounded-[40px] text-black  p-[20px] md:px-[37px] md:py-[50px] flex justify-center flex-col">
                                    <h2 style={{color: card.titleColor}}
                                        className="mb-4 font-extrabold text-[32px] xl:text-[90px] leading-none">{card.title}</h2>
                                    <p style={{color: card.subtitleColor}}
                                       className="mb-4 font-bold text-[20px] leading-[1] md:text-[32px]">{card.subtitle}</p>
                                    <p style={{color: card.descriptionColor}}
                                       className="font-semibold">{card.description}</p>
                                </div>
                            )
                        case 'textAndImage':
                            return (
                                <div key={index}
                                     className=" flex flex-col justify-between border-black border rounded-[40px] text-black px-[20px] py-[30px] md:px-[37px] md:py-[50px] w-full">
                                    <div
                                        className="grid grid-cols-1 md:grid-cols-2 gap-[20px] md:gap-[100px] w-full mb-[36px] items-stretch">
                                        <div
                                            className="flex justify-center flex-col">
                                            <h3 style={{color: card.titleColor}}
                                                className="font-extrabold text-[30px] md:text-[50px] mb-4 leading-none">{card.title}
                                                <span style={{color: card.subtitleColor}}
                                                      className="">{card.subtitle}</span></h3>

                                            <p style={{color: card.descriptionColor}} className="font-semibold"
                                               dangerouslySetInnerHTML={{__html: card.description ?? ''}}></p>
                                        </div>
                                        <div
                                            className="relative aspect-[1] md:aspect-[3/2]  h-full w-full "
                                        >
                                            <Image
                                                src={card.imageUrl ?? ''}
                                                alt={card.imageAlt ?? 'Alt'}
                                                fill
                                                sizes="(min-width: 1200px) 100vw, 100vw"
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                    {user || !card.privateLink ? (
                                        <div><a style={{backgroundColor: card.urlColor}} href={card.url ?? ''} target="_blank"
                                                rel="noopener noreferrer"
                                                className="block w-full flex-1 text-center rounded-[30px] p-[20px] font-[500] text-[14px] leading-[.9] md:text-[16px]">{card.urlDescription}</a></div>) :
                                        <div><a style={{backgroundColor: card.urlColor}} href='/login'
                                           className="block w-full flex-1 text-center rounded-[30px] p-[20px] font-[500] text-[14px] leading-[.9] md:text-[16px]">{card.urlDescription}</a> </div>}

                                </div>
                            )
                        default:
                            return (<div key={index}></div>)
                    }
                }
            )}
        </div>
    );
}
