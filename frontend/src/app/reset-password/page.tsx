"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {useGlobal} from "@/context/Global";
import Link from "next/link";
import {MoveLeft} from "lucide-react";
import Image from "next/image";
import logo from "../../../public/png/logo-black.png";
import InformationModal from "@/components/modals/InformationModal";
import {sendResetPassword} from "@/lib/api";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [message, setMessage] = useState<{title: string, description: string, isError?: boolean} | null>(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {showLoader, hideLoader} = useGlobal();
    const searchParams = useSearchParams();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage({
                title: 'Passwords do not match',
                description: 'Please make sure both passwords are the same.',
                isError: true,
            });
            return;
        }
        showLoader();
        try {
            const token = searchParams.get("code");
            if (!token) {
                setMessage({
                    title: 'Invalid Token',
                    description: 'Reset token is missing. Please try again from the email link.',
                    isError: true,
                });
                hideLoader();
                return;
            }

            const success = await sendResetPassword(token, password, confirmPassword);
            if (success) {
                setMessage({
                    title: 'Password Reset Successful',
                    description: 'You can now log in with your new password.',
                });
            } else {
                setMessage({
                    title: 'Error',
                    description: 'Something went wrong. Please try again.',
                    isError: true,
                });
            }

            hideLoader();
        } catch (err: unknown) {
            setMessage({title: 'Error', description: 'Something went wrong. Please try again.', isError: true})
            console.warn(err);
        } finally {
            hideLoader();
        }
    };

    const resetMessageAndNavigateToLogin = () => {
        if (message?.isError) {
            return;
        }
        setMessage(null);
        router.push("/login");
    }

    return (
        <div className="flex min-h-screen max-h-screen md:overflow-hidden">
            <div className="w-full bg-[url('/background.png')] bg-cover bg-center hidden md:w-1/3 md:block"></div>
            <div
                className="w-full md:w-2/3 flex items-center justify-center p-6 relative bg-background-brand">
                <div className="bg-background-brand flex flex-col
        justify-center rounded-2xl md:shadow-md  md:border-2
        border-black md:max-w-[673px] w-full md:min-h-[700px] md:mx-auto z-1 h-[100%] md:h-auto md:p-[120px]">
                    <Link href="/" className="block md:hidden">
                        <MoveLeft className="h-5 w-5 text-black"/>
                    </Link>
                    <div className="flex-1/2 flex flex-col justify-center text-center">
                        <div className="flex justify-center mb-[40px] md:mb-[26px]">
                            <Image
                                className="w-[180px]"
                                priority
                                src={logo}
                                alt="SkillSeeds Logo"
                                sizes="(min-width: 1200px) 33vw, 100vw"
                            />
                        </div>
                        <h3 className="text-black text-2xl font-bold ">Enter your new password</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 text-black"
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 text-black"
                            />
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
                            >
                                Reset Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {message && (
                <InformationModal
                    onButtonClick={() => resetMessageAndNavigateToLogin()}
                    title={message.title}
                    description={message?.description}
                />
            )}
        </div>
    );
}
