"use client";

import React, {useState} from "react";
import {useGlobal} from "@/context/Global";
import Link from "next/link";
import {MoveLeft} from "lucide-react";
import Image from "next/image";
import logo from "../../../public/png/logo-black.png";
import InformationModal from "@/components/modals/InformationModal";
import {sendForgotPassword} from "@/lib/api";

export default function ForgotPassword() {
    const [message, setMessage] = useState<{title: string, description: string} | null>(null);
    const [email, setEmail] = useState('');
    const {showLoader, hideLoader} = useGlobal();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        showLoader();
        try {
            await sendForgotPassword(email)
            setMessage({title: 'Email Sent', description: 'We have sent you an email with a code to reset your password. Please check your inbox.'})

        } catch (err: unknown) {
            setMessage({title: 'Error', description: 'Something went wrong. Please try again.'})
            console.error(err);
        } finally {
            hideLoader();
        }
    };

    return (
        <div className="flex min-h-screen max-h-screen md:overflow-hidden pt-[env(safe-area-inset-top)]">
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
                        <h3 className="text-black text-2xl font-bold mb-3">Forgot password</h3>
                        <p className="text-black mb-[32px] md:mb-[48px]">
                            No worries, Enter your email address to receive code
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email Address"
                                onChange={(e) => setEmail(e.target.value)}
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
                    onButtonClick={() => setMessage(null)}
                    title={message.title}
                    description={message?.description}
                />
            )}
        </div>
    );
}
