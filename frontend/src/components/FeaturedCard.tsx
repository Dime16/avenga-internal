"use client"

import React from 'react';
import Image from 'next/image';

export interface FeaturedCardProps {
    id: number;
    description: string;
    pdfUrl: string;
    imageUrl: string;
    privateLink?: boolean;
}

export default function FeaturedCard({
                                         id,
                                         description,
                                         pdfUrl,
                                         imageUrl,
                                         privateLink
                                     }: FeaturedCardProps) {
    return (
        <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-md p-[16px]">
            {/* Top Image */}
            <div className="w-full aspect-[16/9] relative rounded-2xl overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={`Featured Study ${id}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, 50vw"
                />
            </div>

            {/* Description */}
            <div className="px-4 py-4 flex-1">
                <p className="text-gray-800 text-base leading-relaxed line-clamp-4 md:line-clamp-none">
                    {description}
                </p>
            </div>


            {privateLink ? (
                    <div><a target="_blank"
                            href='/login'
                            rel="noopener noreferrer"
                            className="block bg-black text-white text-center py-4 text-lg font-medium hover:bg-gray-900 transition rounded-lg">View
                        Study {id}</a>
                    </div>) :
                <div><a
                    href={pdfUrl}
                    className="block bg-black text-white text-center py-4 text-lg font-medium hover:bg-gray-900 transition rounded-lg">View
                    Study {id}</a>
                </div>}

        </div>
    );
}
