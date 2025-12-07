"use client";

import React, {useContext, useEffect} from 'react';
import { X } from 'lucide-react';
import {GlobalContext} from "@/context/Global";


const LogoutModal: React.FC = () => {
    const context = useContext(GlobalContext);

    // Prevent background scroll when modal is open
    useEffect(() => {
        if (!context?.openLogoutModal) {
            // document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [context?.openLogoutModal]);

    if (!context?.openLogoutModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black"
                style={{ opacity: 0.3 }}
                onClick={context.hideLogoutModal}
            />

            <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-md z-60 mx-[16px] md:m-0">
                <button
                    onClick={context.hideLogoutModal}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800  cursor-pointer"
                >
                    <X size={20} />
                </button>
                <div className="flex items-center mb-4">
                    <h2 className="text-xl text-black font-semibold">Logout?</h2>
                </div>

                {/* Body */}
                <p className="text-gray-700 mb-6">
                    Some of the features you will miss. Do you really want to logout?
                </p>

                {/* Actions */}
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={context.hideLogoutModal}
                        className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer text-black font-bold"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={context.logout}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
