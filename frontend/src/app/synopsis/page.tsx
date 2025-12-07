import {fetchInitialData} from "@/lib/api";
import UserGreeting from "@/components/UserGreeting";
import Navbar from "@/components/Navbar";
import React from "react";
import Footer from "@/components/sections/Footer";
import ImageWithStickers from "@/components/ImageWithStickers";
import StepCardWithVideo from "@/components/StepCardWithVideo";
import LogoutModal from "@/components/modals/LogoutModal";
import TeachModal from "@/components/modals/TeachModal";

export default async function SynopsisPage() {
    const data = await fetchInitialData();

    const pageData = data?.pages.find((page) => page.type === 'synopsis');

    return (
        <>
            <header className="sticky top-0 z-20 md:block">
                <UserGreeting/>
                <Navbar/>
            </header>
            <main
                style={{backgroundColor: pageData?.pageBackgroundColor}}
                className="px-[16px] py-[32px] md:p-[80px]  montserrat-font ">
                <LogoutModal/>
                <div className="flex overflow-hidden flex-col  md:flex-row  bg-transparent md:gap-[40px]">
                    <article className='flex-1/2 text-black text-center mb-[20px] md:mb-0 md:text-left'>
                        <h1 className={`font-bold leading-none tracking-wide md:mb-[32px] text-[64px] md:text-[148px] text-[${pageData?.titleColor}]`}>{pageData?.title}</h1>
                        <h2 className='font-bold text-[32px] tracking-wide md:text-[64px] leading-none my-[16px] md:my-[32px]'>{pageData?.subtitle}</h2>
                        <h3 className='font-bold text-[20px] tracking-wide md:text-[40px]'>{pageData?.titleDescription}</h3>
                        <p className="hidden md:block" dangerouslySetInnerHTML={{__html: pageData?.content ?? ''}}></p>
                    </article>
                    <aside className='flex-1/2 flex flex-col gap-[26px] '>
                        <ImageWithStickers imageUrl={pageData?.imageUrl ?? ''}/>
                        <p className="text-black block md:hidden"
                           dangerouslySetInnerHTML={{__html: pageData?.content ?? ''}}></p>
                        <StepCardWithVideo videoImageUrl={pageData?.videoImageUrl ?? ''}
                                           description={pageData?.videoDescription ?? ''}
                                           url={pageData?.videoUrl ?? ''}/>
                    </aside>
                    <TeachModal />
                </div>
                {pageData?.coreCards && (
                    <section className="flex justify-between flex-col md:flex-row gap-[20px] pt-[40px]">
                        {pageData.coreCards.map((card, index) => (
                            <div key={index} className="md:flex-1/3">
                                <div className="p-[30px] rounded-[40px] bg-white overflow-hidden flex flex-col items-center justify-between h-full">
                                    <p className="pb-3 text-center text-[24px] text-black ">{card.title}</p>
                                    <a
                                        href={card.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-black  text-white font-bold py-2 px-4 rounded-full">
                                        {card.urlDescription}
                                    </a>
                                </div>

                            </div>
                        ))}
                    </section>
                )}

            </main>
            <footer style={{backgroundColor: pageData?.pageBackgroundColor}} className="">
                <div className="px-[16px] md:px-[40px]">
                    <div className="rounded-[40px] overflow-hidden">
                        <Footer/>
                    </div>
                </div>
            </footer>
        </>
    )
}