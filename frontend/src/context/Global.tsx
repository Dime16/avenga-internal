'use client';

import React, {createContext, useContext, useState} from 'react';
import {Sticker} from "@/types/Sticker.interface";
import {StrapiUser} from "@/types/StrapiLoginResponse.interface";
import {Badge} from "@/types/Badge.interface";
import {useRouter} from "next/navigation";
import {Menu} from "@/types/Menu.interface";
import {ImageAndText} from "@/types/ImageAndText.Interface";
import {BibleStudyType} from "@/types/BibleStudyType.interface";

type GlobalContextType = {
    user: StrapiUser | null;
    setUser: (user: StrapiUser | null) => void;
    logout: () => void;
    showLoader: () => void;
    hideLoader: () => void;
    showLogoutModal: () => void;
    hideLogoutModal: () => void;
    openTeachModal: () => void;
    closeTeachModal: () => void;
    isLoading: boolean;
    openLogoutModal: boolean;
    stickers: Sticker[];
    isTeachModalOpen: boolean;
    userBadges: Badge[];
    menu: Menu;
    imageAndText: ImageAndText[];
    loginCount: number | null;
    setLoginCount: (loginCount: number | null) => void;
    setBibleStudiesCount: (bibleStudiesCount: number) => void
    bibleStudiesCount: number;
    activeBadge: Badge | null;
    setActiveBadge: (badge: Badge | null) => void;
    bibleStudyTypes: BibleStudyType[];
};

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({children, stickers, initialBibleStudiesCount, userBadges, menu, imageAndText, bibleStudyTypes}: {
    children: React.ReactNode,
    stickers: Sticker[],
    initialBibleStudiesCount: number,
    userBadges: Badge[],
    menu: Menu,
    imageAndText: ImageAndText[],
    bibleStudyTypes: BibleStudyType[]
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [openLogoutModal, setOpenLogoutModal] = useState(false);
    const [user, setUser] = useState<StrapiUser | null>(null);
    const [isTeachModalOpen, setTeachModalOpen] = useState(false);
    const [loginCount, setLoginCount] = useState<number | null>(null);
    const [activeBadge, setActiveBadge] = useState<Badge | null>(null);
    const [bibleStudiesCount, setBibleStudiesCount] = useState(initialBibleStudiesCount);
    const router = useRouter();

    const logout = () => {
        setUser(null);
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        setOpenLogoutModal(false)
        router.push("/home");
    };

    const showLoader = () => setIsLoading(true);
    const hideLoader = () => setIsLoading(false);
    const showLogoutModal = () => setOpenLogoutModal(true);
    const hideLogoutModal = () => setOpenLogoutModal(false);
    const openTeachModal = () => setTeachModalOpen(true);
    const closeTeachModal = () => setTeachModalOpen(false);

    return (
        <GlobalContext.Provider value={{
            isLoading,
            showLoader,
            hideLoader,
            user,
            setUser,
            logout,
            stickers,
            showLogoutModal,
            hideLogoutModal,
            openLogoutModal,
            openTeachModal,
            closeTeachModal,
            isTeachModalOpen,
            userBadges,
            loginCount,
            setLoginCount,
            setBibleStudiesCount,
            bibleStudiesCount,
            menu,
            imageAndText,
            activeBadge,
            setActiveBadge,
            bibleStudyTypes
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useLoader must be used within LoaderProvider');
    }
    return context;
};