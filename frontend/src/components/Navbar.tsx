"use client";
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from "../../public/png/logo.png";
import logoLoggedIn from "../../public/png/logo.png";
import {useGlobal} from "@/context/Global";
import {assignUserBadges, findActiveUserBadge} from "@/lib/utils";
import {HiMenu, HiX} from "react-icons/hi";
import SimpleConfirmationModal from "@/components/modals/SimpleConfirmationModal";
import {deleteUser} from "@/lib/api";
import {useRouter} from "next/navigation";
import InformationModal from "@/components/modals/InformationModal";
import {usePushNotifications} from "@/hooks/usePushNotifications";

export default function NavBar() {
    usePushNotifications();
    const router = useRouter();
    const {user, setUser, loginCount, userBadges, showLogoutModal, menu, showLoader, hideLoader, activeBadge, setActiveBadge} = useGlobal();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [informationModalData, setInformationModalData] = useState<{
        title: string,
        description: string,
        error?: boolean
    } | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        const userJson = localStorage.getItem('user');
        if (token && userJson) {
            const userObj = JSON.parse(userJson);
            assignUserBadges(userObj, loginCount, userBadges);
            setUser(userObj);
            const active = findActiveUserBadge(userObj);
            setActiveBadge(active);
        }
    }, [loginCount, setActiveBadge, setUser, userBadges]);

    const resetStateAndNavigateToHome = () => {
        setUser(null);
        setInformationModalData(null);
        router.push("/home");
    }

    const deleteProfile = () => {
        showLoader()
        const token = localStorage.getItem('jwt') ?? '';
        deleteUser(token).then(() => {
            hideLoader()
            localStorage.removeItem('jwt');
            localStorage.removeItem('user');
            setOpenConfirmationModal(false);
            setInformationModalData({
                title: 'Profile Deleted',
                description: 'Your profile has been deleted.',
            })
        }).catch(() => {
            hideLoader()
            setOpenConfirmationModal(false);
            setInformationModalData({
                title: 'Something went wrong.',
                description: 'Please try again later.',
                error: true,
            })
        })
    }

    const toggleDropdown = () => setDropdownOpen(dropdownOpen => !dropdownOpen);

    if (!menu || !menu.menuItem || menu.menuItem.length <= 0) return (<></>);

    return (
        <nav className="bg-background-brand py-2 relative z-50">
            <div className="mx-auto px-4 md:px-[80px]">
                <div className="flex items-center justify-between h-16">

                    {/* ← Mobile burger icon */}
                    <div className="md:hidden min-w-[90px]">
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="text-2xl"
                        >
                            {mobileOpen
                                ? <HiX className="w-8 h-8 text-black"/>
                                : <HiMenu className="w-8 h-8 text-black"/>
                            }
                        </button>
                    </div>

                    {/* ← Logo (centered on mobile, left on desktop) */}
                    <div className="flex justify-center md:justify-start">
                        <Link href="/">
                            <Image
                                src={user ? logoLoggedIn : logo}
                                alt="SkillSeeds"
                                width={100}
                                style={{height: 'auto'}}
                                sizes="(min-width: 1200px) 33vw, 100vw"
                            />
                        </Link>
                    </div>

                    {/* ← Desktop menu */}
                    <div className="hidden md:flex md:space-x-8">
                        {menu.menuItem?.map(item => (
                            <Link
                                key={item.id}
                                href={item.url}
                                className="text-black font-bold hover:underline"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>

                    {/* ← Badge & Sign-in/Logout */}
                    <div className="flex items-center">
                        {user ? (
                            <>
                                {/* Mobile badge */}
                                {activeBadge && (
                                    <Link href="/achievements" className="md:hidden">
                                        <Image
                                            src={activeBadge.imageUrl ?? ''}
                                            alt="Badge"
                                            width={48}
                                            height={48}
                                            className="rounded-full"
                                        />
                                    </Link>
                                )}


                                {/* Desktop badge + logout */}
                                <div className="hidden md:flex items-center">
                                    {/* Mobile badge */}
                                    {activeBadge && (
                                        <Link href="/achievements" className="mr-[24px]">
                                            <Image
                                                src={activeBadge.imageUrl ?? ''}
                                                alt="Badge"
                                                width={90}
                                                height={90}
                                                priority
                                                sizes="(min-width: 1200px) 33vw, 100vw"
                                            />
                                        </Link>
                                    )}


                                    <div className="relative">
                                        <button
                                            onClick={() => toggleDropdown()}
                                            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition h-fit cursor-pointer"
                                        >
                                            Logout
                                        </button>
                                        {dropdownOpen && (<div className="">
                                            <div
                                                className="absolute right-0 top-full mt-2 w-[160px] bg-white shadow-md rounded-md z-50">
                                                <button
                                                    className="block w-full text-left px-4 py-2 text-black"
                                                    onClick={() => {
                                                        setDropdownOpen(false);
                                                        showLogoutModal();
                                                    }}
                                                >
                                                    Logout
                                                </button>
                                                <button
                                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                                                    onClick={() => {
                                                        setDropdownOpen(false);
                                                        // deleteProfileModal();
                                                    }}
                                                >
                                                    Delete Profile
                                                </button>
                                            </div>
                                        </div>)}
                                        {dropdownOpen && (<div className="">
                                            <div
                                                className="absolute right-0 top-full mt-2 w-[160px] bg-white shadow-md rounded-md z-50">
                                                <button
                                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black cursor-pointer"
                                                    onClick={() => {
                                                        showLogoutModal();
                                                    }}
                                                >
                                                    Logout
                                                </button>
                                                <button
                                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer"
                                                    onClick={() => {
                                                        setOpenConfirmationModal(true)
                                                    }}
                                                >
                                                    Delete Profile
                                                </button>
                                            </div>
                                        </div>)}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="inline bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition w-[90px]"
                                >
                                    Sign in
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* ← Mobile dropdown (absolute, overlays content) */}
            {mobileOpen && (
                <div className="absolute top-16 left-0 right-0 bg-white rounded-b-xl shadow-lg z-50 md:hidden">
                    <div className="flex flex-col space-y-4 p-4 text-black font-bold">
                        {menu.menuItem?.map(item => (
                            <Link
                                key={item.id}
                                href={item.url}
                                onClick={() => setMobileOpen(false)}
                            >
                                {item.title}
                            </Link>

                        ))}
                        <hr/>

                        {user ? (
                            <button
                                onClick={() => {
                                    setMobileOpen(false);
                                    showLogoutModal();
                                }}
                                className="text-left"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                            >
                                Sign in
                            </Link>
                        )}
                        {user && (<button
                            className="text-left"
                            onClick={() => {
                                setMobileOpen(false);
                                setOpenConfirmationModal(true)
                            }}
                        >
                            Delete Profile
                        </button>)}
                    </div>
                </div>
            )}
            {openConfirmationModal && (
                <SimpleConfirmationModal
                    title={menu?.confirmation?.title}
                    description={menu?.confirmation?.description}
                    buttonText={menu?.confirmation?.confirmation}
                    onButtonClick={deleteProfile}
                    cancelButtonText={menu?.confirmation?.cancel}
                    onCancelButtonClick={() => setOpenConfirmationModal(false)}
                />
            )}

            {informationModalData && (
                <InformationModal onButtonClick={() => resetStateAndNavigateToHome()}
                                  description={informationModalData.description}
                                  title={informationModalData.title}
                                  error={informationModalData.error}
                />
            )}
        </nav>
    );
}
