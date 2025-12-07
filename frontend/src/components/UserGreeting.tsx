"use client";

import React, {useContext} from 'react';
import {GlobalContext} from "@/context/Global";
import {useRouter} from "next/navigation";


const UserGreeting: React.FC = () => {
    const router = useRouter();
    const context = useContext(GlobalContext);
    const handleBackToLogin = () => {
        router.push("/login");
    };

    return (<div
        className="bg-primary text-white text-center p-[10px] cursor-pointer text-[14px] md:text-[16px] uppercase pt-[max(env(safe-area-inset-top),10px)]"
        onClick={context?.user ? context?.openTeachModal : handleBackToLogin}>
        {context?.user ? (
            <>Hi <span className="text-black font-semibold ">{context?.user?.firstName}</span>, have you shared a new skill today?</>
        ) : (
            <>Got a skill to share with the world?</>
        )}
    </div>)

}


export default UserGreeting;