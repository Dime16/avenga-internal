import React from "react";
import Navbar from "@/components/Navbar";
import UserGreeting from "@/components/UserGreeting";
import LogoutModal from "@/components/modals/LogoutModal";
import CounterSection from "@/components/sections/CounterSection";
import UserActivityCard from "@/components/UserActivityCard";
import ImageCard from "@/components/ImageCard";
import TeachModal from "@/components/modals/TeachModal";
import AboutSection from "@/components/sections/About";
import FeaturedStudies from "@/components/sections/FeaturedStudies";
import Footer from "@/components/sections/Footer";
import ImageAndText from "@/components/ImageAndText";
import SeedVideos from "@/components/sections/SeedVideos";
import SeedStudyVideos from "@/components/sections/SeedStudyVideos";
import InteractiveStudy from "@/components/sections/InteractiveStudy";


export default async function HomePage() {

    return (
        <>
            <header className="sticky top-0 z-20 block">
                <UserGreeting/>
                <Navbar/>
            </header>
            <main className="px-0 md:px-[80px] bg-background-brand ">
                <LogoutModal/>
                <CounterSection/>
                <section className="flex flex-col items-center justify-center w-full bg-background-brand px-[20px] md:px-0  md:m-auto mb-[40px] md:mb-[100px]">
                    <UserActivityCard />
                </section>
                <section className="cards px-[16px] md:px-0 md:w-[70%] md:mx-auto">
                    <ImageCard />
                </section>
                <section className="teach-prompt">
                    <TeachModal />
                </section>
                <section id="about" className="about px-[16px] md:px-0">
                    <AboutSection />
                </section>
                <section id="resources" className="px-[16px] md:px-0 mb-[35px] md:mb-[80px]">
                    <ImageAndText position="top" />
                </section>
                <section id="videos" className="win-your-world-videos px-[16px] md:px-0 mb-[35px] md:mb-[80px]">
                    <SeedVideos />
                </section>
                <section id="seed_studies" className="seed-studies-videos px-[16px] md:px-0 mb-[35px] md:mb-[80px]">
                    <SeedStudyVideos />
                </section>
                <section id="" className="interactive-study px-[16px] md:px-0 mb-[35px] md:mb-[80px]">
                    <InteractiveStudy />
                </section>
                <section className="featured-study px-[16px] md:px-0 mb-[35px] md:mb-[80px]">
                    <FeaturedStudies />
                </section>
                <section id="images_and_text" className="px-[16px] md:px-0">
                    <ImageAndText position="bottom" />
                </section>
            </main>
            <footer>
                <Footer />
            </footer>
        </>

    );
}
