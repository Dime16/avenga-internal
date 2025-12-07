export const dynamic = "force-dynamic";

import type {Metadata, Viewport} from "next";
import {Geist, Geist_Mono, Montserrat} from "next/font/google";
import "./globals.css";
import {GlobalProvider} from '@/context/Global';
import Loader from '@/components/Loader';
import {fetchInitialData} from "@/lib/api";
import TokenValidator from "@/components/TokenValidator";

// 1) Load Geist Sans & Geist Mono exactly as before
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// 2) Load Montserrat 700 (Google) into a CSS var
const montserrat700 = Montserrat({
    weight: "700",
    subsets: ["latin"],
    variable: "--font-montserrat-700",
});

export const metadata: Metadata = {
    title: "SS",
    description: "SkillSeeds"
}

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
}

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const initialData = await fetchInitialData();

    return (
        <html lang="en">
        <head>
            <link rel="stylesheet" href="https://use.typekit.net/ucq0sxv.css"/>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${montserrat700.variable} antialiased bg-background-brand montserrat-font min-h-screen`}
        >
        {initialData ? (
            <GlobalProvider stickers={initialData.stickers} initialBibleStudiesCount={initialData.count}
                            userBadges={initialData.badges} menu={initialData.menu}
                            imageAndText={initialData.imageAndText} bibleStudyTypes={initialData.bibleStudyTypes}>
                <TokenValidator />
                <Loader/>
                {children}
            </GlobalProvider>) : (<></>)
        }

        <script src="https://static.elfsight.com/platform/platform.js" async></script>
        <div className="elfsight-app-7071e0e1-0814-49ff-acd7-2344e9154296" data-elfsight-app-lazy></div>

        </body>
        </html>
    );
}
