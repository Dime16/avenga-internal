"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";

import RegisterForm from "@/components/RegisterForm";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import bgImage from "../../../public/background.png";


import type {RegisterUserInput} from "@/types/RegisterUserInput.interface";
import {registerUser} from "@/lib/api";
import {useGlobal} from "@/context/Global";
import {badWords} from "@/app/register/constants";
import {Filter} from "bad-words";
import {RegisterErrorResponse} from "@/types/RegisterErrorResponse.interface";

export default function RegisterPage() {
    const {showLoader, hideLoader} = useGlobal();
    const router = useRouter();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [error, setError] = useState<string>('');
    const filter = new Filter();


    const handleRegister = async (data: RegisterUserInput) => {
        filter.addWords(badWords.join(', '))
        if (filter.isProfane(data.firstName) || filter.isProfane(data.lastName)) {
            setError('Can\'t use that name.');
            return;
        }

        showLoader();
        try {
            await registerUser(data);
            setShowConfirmation(true);
        } catch (error: unknown) {
            setError((error as RegisterErrorResponse)?.message || 'Something went wrong while registering your account.');
            setShowConfirmation(false);
        } finally {
            hideLoader();
        }
    };

    const handleBackToLogin = () => {
        router.push("/login");
    };


    return (
        <>
            <div className="bg-background-brand flex min-h-screen max-h-screen overflow-auto md:overflow-hidden pt-[env(safe-area-inset-top)]">
                <div className="hidden md:block md:w-1/3">
                    <Image priority src={bgImage} alt="Background" className="w-full h-full object-cover"/>
                </div>
                <div className="relative w-full md:w-2/3 flex items-center justify-center p-6">
                    {showConfirmation && (
                        <ConfirmationModal
                            title="Your account has been created successfully, you must VERIFY your account by checking you email before logging in."
                            subtitle=""
                            buttonText="Back to  Login"
                            onButtonClick={handleBackToLogin}
                        />
                    )}
                    {!showConfirmation && (<RegisterForm onSubmit={handleRegister} error={error}/>)}
                </div>
            </div>


        </>
    );
}
