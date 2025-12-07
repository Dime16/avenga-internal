"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";

interface ImageWithPlaceholderProps {
    src?: string;
    alt: string;
    className?: string;
    fill?: boolean;
    priority?: boolean;
    width?: number;
    height?: number;
}

export default function ImageWithPlaceholder({
                                                 src,
                                                 alt,
                                                 className = "",
                                                 fill = false,
                                                 priority = false,
                                                 width = 100, height = 100,
                                             }: ImageWithPlaceholderProps) {
    if (!src) {
        return (
            <div
                className={clsx(
                    "bg-gray-200 animate-pulse rounded-md",
                    "relative",
                    fill ? "w-full h-full absolute inset-0 " : ``,
                    className
                )}
            />
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            className={className}
            width={width}
            height={height}
            priority={priority}
            sizes="(min-width: 1200px) 33vw, 100vw"
        />
    );
}