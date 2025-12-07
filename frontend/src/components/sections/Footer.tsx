// app/components/Footer.tsx
import React from "react";
import {fetchInitialData} from "@/lib/api";
import Image from "next/image";
import {DynamicIcon} from "lucide-react/dynamic";
import {InitialData} from "@/types/InitialData.interface";
import Link from "next/link";
import SmartNavItem from "@/components/SmartNavItem";

export default async function Footer() {
    const { footer } = await fetchInitialData() as InitialData;
    const currentYear = new Date().getFullYear();

    return (
        <div className="px-[32px] py-[48px] md:px-[48px] md:py-[70px] bg-white ">
            <div
                className="mx-auto grid sm:grid-cols-4 lg:grid-cols-4 gap-6 text-black  border-b-1 pb-[10px] border-black md:pb-[30px]">
                <div className="flex flex-col md:max-w-[250px]">
                    {footer?.imageUrl && <Image className="mb-[48px] max-w-[134px] md:max-w-full" src={footer.imageUrl || ''} alt="SkillSeeds " width={140}
                            height={60}  sizes="(min-width: 1200px) 33vw, 100vw"/>}
                    <h3 className="text-black font-bold">{footer?.description}</h3>
                </div>
                {footer?.FooterMenus?.map((menu, index) => (
                    <div key={index}>
                        <h3 className="mb-[28px] font-extrabold text-[20px] md:mb-[50px]">{menu.menuTitle}</h3>
                        <ul className={`mb-[20px] font-bold text-[16px] ${menu.isIconMenu ? 'flex' : ''}`}>
                            {menu.menu.map((item, i) => (
                                item.icon ? (
                                    <li className="mb-[20px] font-bold text-[16px] mr-[20px]"
                                        key={i}>
                                        <a href={item.url}>
                                            <DynamicIcon  name={item.icon} color={item.color} size={20} />
                                        </a>
                                    </li>
                                ) : (
                                    <SmartNavItem title={item.title} url={item.url} loggedInUrl={item.loggedInUrl} key={i} />
                                    )
                            ))}
                        </ul>
                    </div>
                ))}

            </div>
            <div className="mx-auto grid grid-cols-2 gap-6 pt-[48px] text-black">
                <div className="text-left col-span-2 md:col-span-1 md:mr-[120px] md:text-right">{'© ' + currentYear + ' ' + footer?.rights}</div>
                <Link href="/privacy-policy" className="text-left col-span-2 md:col-span-1 text-blue-600 cursor-pointer">{footer?.terms}</Link>
            </div>
        </div>
    );
}
