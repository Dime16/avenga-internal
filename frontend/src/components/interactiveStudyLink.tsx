"use client";

import {useGlobal} from "@/context/Global";
import ArrowButton from "@/components/ArrowButton";
import React from "react";

export default function InteractiveStudyLink({pdfUrl, privateLink, actionButtonText}: { pdfUrl?: string, privateLink: boolean, actionButtonText: string }) {
    const {user} = useGlobal();

    return (
        <>
            {(user && user.id) || !privateLink ? (<ArrowButton name={actionButtonText} href={pdfUrl}/>) :
                (<a href="/login"
                    className="inline-flex items-center bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                    <span>{actionButtonText}</span>
                    <span className="ml-2">→</span>
                </a>)}
        </>

    )
}