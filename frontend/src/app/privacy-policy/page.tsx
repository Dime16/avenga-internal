import {fetchInitialData} from "@/lib/api";
import UserGreeting from "@/components/UserGreeting";
import Navbar from "@/components/Navbar";
import React from "react";
import Footer from "@/components/sections/Footer";
import LogoutModal from "@/components/modals/LogoutModal";

export default async function SchedulePage() {
    const initialData = await fetchInitialData();

    const privacyPolicy = initialData?.privacyPolicy ?? '';

    return (
        <>
            <header className="sticky top-0 z-20 md:block">
                <UserGreeting/>
                <Navbar/>
            </header>
            <main
                className="flex overflow-hidden bg-background-brand flex-col px-[16px] py-[32px] md:flex-row md:p-[80px] md:gap-20 montserrat-font ">
                <LogoutModal/>
                <article className='flex-1/2 text-black text-center mb-[20px] md:mb-0 md:text-left'>
                    <h1 className="montserrat-font font-bold leading-none tracking-wide md:mb-[32px] text-[64px] md:text-[148px]">Privacy Policy</h1>
                    <p className="block text-left" dangerouslySetInnerHTML={{__html: privacyPolicy}}></p>
                </article>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}