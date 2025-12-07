import React from 'react';
import Image from 'next/image';
import {Check} from 'lucide-react';
import logo from "../../../public/png/logo-black.png";

interface ConfirmationModalProps {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    onButtonClick: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
                                                                 title,
                                                                 subtitle,
                                                                 buttonText,
                                                                 onButtonClick,
                                                             }) => {
    return (
        <div className="min-h-screen grid place-items-center w-full z-10">
            <div
                className="bg-background-brand rounded-lg p-2 md:p-6 w-full md:w-4/5 max-w-[780px] text-center md:border-2 border-black">
                <div className="flex justify-center mb-[32px] md:mb-[48px]">
                    <Image
                        className="w-[180px]"
                        priority
                        src={logo}
                        alt="SkillSeeds Logo"
                        sizes="(min-width: 1200px) 33vw, 100vw"
                    />
                </div>
                {/* Icon */}
                <div className="flex items-center justify-center bg-black rounded-lg p-4 mt-6 mx-auto w-20 h-20">
                    <Check className="w-10 h-10 text-white"/>
                </div>
                {/* Title */}
                <h2 className="mt-6 text-2xl font-bold text-gray-900">{title}</h2>
                {/* Subtitle */}
                {subtitle && <p className="mt-2 text-gray-700">{subtitle}</p>}
                {/* Action Button */}
                <button
                    type="button"
                    onClick={onButtonClick}
                    className="cursor-pointer mt-8 w-full bg-black text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default ConfirmationModal;