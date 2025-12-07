"use client";

import React, {useState, useMemo, useEffect} from "react";
import Image from "next/image";
import {Eye, EyeOff, MoveLeft} from "lucide-react";
import logo from "../../public/png/logo-black.png";
import type {RegisterFormProps} from "@/types/RegisterUserInput.interface";
import dynamic from "next/dynamic";
import type {SelectOption} from "@/components/SelectInput";

import {Country, State} from 'country-state-city';
import {AddressForm, addressSchema} from "@/schemas/addressSchema";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";

const genderOptions: SelectOption[] = [
    {value: "Male", label: "Male"},
    {value: "Female", label: "Female"},
];

const SelectInput = dynamic(
    () => import("@/components/SelectInput"),
    {ssr: false}
);

export default function RegisterForm({onSubmit, error}: RegisterFormProps) {
    const countryOptions = useMemo(() => {
        return Country.getAllCountries().map(country => ({
            label: country.name ?? '',
            value: country.isoCode ?? '',
        }));
    }, []);
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<AddressForm>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            yearOfBirth: "",
            gender: "",
            country: "",
            state: "",
            zipCode: "",
        },
    });
    const formData = watch();
    useEffect(() => {
    }, [formData]);

    const selectedCountry = watch("country");

    const codeName = useMemo(
        () => (selectedCountry === "US" ? "ZIP Code" : "Postal Code"),
        [selectedCountry]
    );

    const states = useMemo(() => {
        if (!selectedCountry) return [];
        return State.getStatesOfCountry(selectedCountry).map((s) => ({
            label: s.name,
            value: s.name,
        }));
    }, [selectedCountry]);

    const togglePasswordVisibility = () => {
        setShowPassword((visible) => !visible);
    };

    return (
        <div className="min-h-screen flex items-center justify-center w-full md:max-w-[673px]">
            <div className="w-full md:min-w-xl z-1 relative bg-background-brand">
                <Link href="/" className="block md:hidden">
                    <MoveLeft className="h-5 w-5 text-black"/>
                </Link>
                <div className="rounded-lg md:shadow-lg md:py-[58px] md:px-[110px] md:border-2 border-black">
                    {/* Header */}
                    <div className="flex justify-center mb-[32px] md:mb-[48px]">
                                <Image
                                    className="w-[180px]"
                                    priority
                                    src={logo}
                                    alt="SkillSeeds Logo"
                                    sizes="(min-width: 1200px) 33vw, 100vw"
                                />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="">
                                <input
                                    {...register('firstName')}
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    className="bg-white w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
                                    value={formData.firstName}
                                    required
                                />
                                {errors.firstName && (
                                    <p className="text-red-500">{errors.firstName.message}</p>
                                )}
                            </div>
                            <div className="">
                                <input
                                    {...register('lastName')}
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    className="bg-white w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
                                    value={formData.lastName}
                                    required
                                />
                                {errors.lastName && (
                                    <p className="text-red-500">{errors.lastName.message}</p>
                                )}
                            </div>

                        </div>

                        {/* Email */}
                        <div className="">
                            <input
                                {...register('email')}
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="bg-white w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[#363636]"
                                value={formData.email}
                                required
                            />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>


                        {/* Password */}
                        <div>
                            <div className="flex items-center relative">
                                <input
                                    {...register('password')}
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="bg-white w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-black pr-10 text-[#363636]"
                                    value={formData.password}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400"/>
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400"/>
                                    )}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Year & Gender */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <input
                                    {...register("yearOfBirth")}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="\d{4}"
                                    name="yearOfBirth"
                                    placeholder="Year of Birth"
                                    className="bg-white w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-black placeholder-gray-400 text-[#363636]"
                                    value={formData.yearOfBirth}
                                    required
                                />
                                {errors.yearOfBirth && (
                                    <p className="text-red-500">{errors.yearOfBirth.message}</p>
                                )}
                            </div>
                            <div className="">
                                <Controller
                                    name="gender"
                                    control={control}
                                    render={({field}) => (
                                        <SelectInput
                                            {...field}
                                            value={genderOptions.find(o => o.value === field.value) || null}
                                            onChange={(opt) => field.onChange(opt?.value)}
                                            options={genderOptions}
                                            placeholder="Gender"
                                        />
                                    )}
                                />
                                {errors.gender && (
                                    <p className="text-red-500">{errors.gender.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Country */}
                        <div className="relative">
                            <Controller
                                name="country"
                                control={control}
                                render={({field}) => (
                                    <SelectInput
                                        {...field}
                                        value={countryOptions.find(o => o.value === field.value) || null}
                                        onChange={(opt) => field.onChange(opt?.value)}
                                        options={countryOptions}
                                        placeholder="Country"
                                    />
                                )}
                            />
                            {errors.country && (
                                <p className="text-red-500">{errors.country.message}</p>
                            )}
                        </div>
                        {/*State and ZIP */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Controller
                                    name="state"
                                    control={control}
                                    render={({field}) => (
                                        <SelectInput
                                            {...field}
                                            value={states.find(o => o.value === field.value) || null}
                                            onChange={(opt) => field.onChange(opt?.value)}
                                            options={states}
                                            placeholder="State/Province"
                                        />
                                    )}
                                />
                                {errors.state && (
                                    <p className="text-red-500">{errors.state.message}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    {...register("zipCode")}
                                    name="zipCode"
                                    placeholder={codeName}
                                    className="bg-white w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[#363636]"
                                />
                                {errors.zipCode && (
                                    <p className="text-red-500">{errors.zipCode.message}</p>
                                )}
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="cursor-pointer w-full bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition duration-200 mt-2"
                        >
                            Sign up
                        </button>

                        <p className="text-center text-sm mt-7 text-black">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="text-black font-semibold hover:underline"
                            >
                                Log in
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
