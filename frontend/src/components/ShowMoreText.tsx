// components/ShowMoreText.tsx
"use client";

import React, {useState, useRef, useMemo, useEffect} from 'react';
import {isMobile} from "@/lib/utils";

interface ShowMoreTextProps {
    text: string;
    minHeight: number;
    className?: string;
    buttonClassName?: string;
    buttonMoreText?: string;
    buttonLessText?: string;
}

export default function ShowMoreText({
                                         text,
                                         minHeight,
                                         className = '',
                                         buttonClassName = '',
                                         buttonMoreText = 'Show more',
                                         buttonLessText = 'Show less',
                                     }: ShowMoreTextProps) {
    const [expanded, setExpanded] = useState(false);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const textRef = useRef<HTMLParagraphElement>(null);

    const showToggle = useMemo(() => {
        if (!isMobile || !textRef.current || !mounted) return false;
        return textRef.current.scrollHeight > minHeight;
    }, [minHeight, mounted]);


    const clampStyle = useMemo(() => {
        if (!mounted) return undefined;           // never clamp on SSR
        if (!isMobile) return undefined;        // only clamp on mobile
        if (expanded) return undefined;           // but not if already expanded
        return { maxHeight: `${minHeight}px`, overflow: 'hidden' };
    }, [mounted, expanded, minHeight]);

    return (
        <div>
            <p
                ref={textRef}
                className={className}
                style={clampStyle}
            >
                {text}
            </p>

            {isMobile && showToggle && (
                <button
                    onClick={() => setExpanded(x => !x)}
                    className={buttonClassName}
                >
                    {expanded ? buttonLessText : buttonMoreText}
                </button>
            )}
        </div>
    );
}
