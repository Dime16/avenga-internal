import {fetchInitialData} from "@/lib/api";
import UserGreeting from "@/components/UserGreeting";
import Navbar from "@/components/Navbar";
import React from "react";
import Footer from "@/components/sections/Footer";
import ImageWithStickers from "@/components/ImageWithStickers";
import StepCardWithVideo from "@/components/StepCardWithVideo";
import LogoutModal from "@/components/modals/LogoutModal";
import TeachModal from "@/components/modals/TeachModal";

export default async function FollowUpPage() {
    const data = await fetchInitialData();

    const pageData = data?.pages.find((page) => page.type === 'followUp');

    return (
        <>
            <header className="sticky top-0 z-20 md:block">
                <UserGreeting/>
                <Navbar/>
            </header>
            <main
                className="flex overflow-hidden bg-background-brand flex-col px-[16px] py-[32px] md:flex-row md:p-[80px] md:gap-20 montserrat-font ">
                <LogoutModal/>
                <article className='basis-1/2 text-black text-center mb-[20px] md:mb-0 md:text-left'>
                    <h1 className={`font-bold leading-none tracking-wide md:mb-[32px] text-[64px] md:text-[148px] text-[${pageData?.titleColor}]`}>{pageData?.title}</h1>
                    <h2 className='font-bold text-[32px] tracking-wide md:text-[64px] leading-none my-[16px] md:my-[32px]'>{pageData?.subtitle}</h2>
                    <h3 className='font-bold text-[20px] tracking-wide md:text-[40px] leading-none mb-4'>{pageData?.titleDescription}</h3>
                    <p className="hidden md:block" dangerouslySetInnerHTML={{__html: pageData?.content ?? ''}}></p>
                </article>
                <aside className='basis-1/2 flex flex-col gap-[26px] '>
                        <ImageWithStickers imageUrl={pageData?.imageUrl ?? ''}/>
                    <p className="text-black block md:hidden"
                       dangerouslySetInnerHTML={{__html: pageData?.content ?? ''}}></p>
                    <StepCardWithVideo videoImageUrl={pageData?.videoImageUrl ?? ''}
                                       description={pageData?.videoDescription ?? ''}
                                       url={pageData?.videoUrl ?? ''}/>
                </aside>
                <TeachModal />
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}