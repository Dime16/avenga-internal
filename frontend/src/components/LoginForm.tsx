"use client";

import React, {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {MoveLeft} from "lucide-react";
import logo from "../../public/png/logo-black.png";

// Props for LoginForm
export interface LoginFormProps {
    onSubmit: (credentials: { identifier: string; password: string }) => void;
    error?: string;
}

export default function LoginForm({onSubmit, error}: LoginFormProps) {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({identifier, password});
    };

    return (
        <div className="bg-background-brand flex flex-col
        justify-center rounded-2xl md:shadow-md p-0 md:p-8 md:border-2
        border-black md:max-w-[673px] w-full md:min-h-[700px] md:mx-auto z-1 h-[100%] md:h-auto">
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
                <p className="text-black text-2xl font-bold mb-[32px] md:mb-[48px]">
                    Welcome Back!
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                        className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 text-black"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 text-black "
                    />

                    {error && (
                        <p className="text-sm text-red-500 text-center">{error}</p>
                    )}

                    <div className="text-right">
                        <a href="/forgot-password" className="text-sm text-red-500 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
                    >
                        Login
                    </button>

                    <a href="/register"
                       className="w-full block bg-primary text-white py-2 rounded-md hover:bg-primary-light transition">
                        <span className="text-black">Sign Up</span>
                    </a>
                </form>
            </div>


            <div className="flex-1 flex flex-col justify-end">
            </div>

        </div>
    );
}