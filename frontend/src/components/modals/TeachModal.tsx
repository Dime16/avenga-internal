// components/TeachModal.tsx
"use client";

import React, {useState} from "react";
import {useGlobal} from "@/context/Global";
import {incrementBibleStudyCount} from "@/lib/api";
import {assignUserBadges, findActiveUserBadge} from "@/lib/utils";
import Select, {MultiValue} from "react-select";
import {ValueLabel} from "@/types/ValueLabel.interface";
import {RegisterErrorResponse} from "@/types/RegisterErrorResponse.interface";
import {useRouter} from "next/navigation";

export default function TeachModal() {
    const {
        user,
        isTeachModalOpen,
        closeTeachModal,
        setUser,
        loginCount,
        userBadges,
        setBibleStudiesCount,
        bibleStudiesCount,
        setActiveBadge,
        bibleStudyTypes,
        logout
    } = useGlobal();
    const router = useRouter();
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [selectedTypesIds, setSelectedTypesIds] = useState<number[]>([]);

    const typeOptions: ValueLabel[] = bibleStudyTypes.map((studyType) => ({
        value: studyType.id,
        label: studyType.studyType
    }));

    const handleChange = (newValue: MultiValue<ValueLabel>): void => {
        setSelectedTypesIds(newValue ? newValue.map((option) => Number(option.value)) : []);
    }

    if (!user || !isTeachModalOpen) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        const added = parseInt(inputValue.trim(), 10);
        if (isNaN(added) || added < 0) {
            setErrorMsg("Please enter a valid non-negative number.");
            return;
        }

        setLoading(true);
        try {
            const jwt = localStorage.getItem("jwt");
            if (!jwt) return;

            const bibleStudyEntry = {
                bibleStudyTypesIds: selectedTypesIds,
                added: added,
            }

            const increment = await incrementBibleStudyCount(bibleStudyEntry, jwt);

            if (user && increment) {
                const userWithCount = {...user, bibleStudiesCount: (user.bibleStudyCount || 0) + increment};
                assignUserBadges(userWithCount, loginCount, userBadges)
                setUser(userWithCount);
                setBibleStudiesCount(Number(bibleStudiesCount) + Number(added));
                const active = findActiveUserBadge(userWithCount);
                setActiveBadge(active);
                localStorage.setItem('user', JSON.stringify(userWithCount));
            }
            setInputValue('')
            setSelectedTypesIds([])
            closeTeachModal();
        } catch (error: unknown) {
            setErrorMsg((error as RegisterErrorResponse)?.message || "Something went wrong.");
            if((error as { status?: number })?.status === 401) {
                logout();
                router.push("/login");
                closeTeachModal();
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-black opacity-80 z-40"
                onClick={closeTeachModal}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div
                    className="
            bg-[#F5F5F5]      /* light off-white background */
            rounded-2xl
            shadow-lg
            mx-4 md:mx-0
            py-4 px-4 md:px-6 md:py-6
            flex flex-col
          "
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="w-full flex justify-end mb-2">
                        <button
                            onClick={closeTeachModal}
                            className="
                w-8 h-8
                bg-white
                rounded-full
                flex items-center justify-center
                text-black
                hover:bg-gray-200
                transition
              "
                            aria-label="Close"
                        >
                            &times;
                        </button>
                    </div>
                    <div className="md:m-[50px] max-w-[450px]">
                        <h2 className="font-bold text-center text-black mb-[20px] md:tracking-tighter text-[28px] md:text-[36px] md:leading-[1.1] md:mb-[48px]">
                            Hi <span className="text-[#3C9146]">{user.firstName}</span>, have you taught a skill recently?
                            Let us know below!
                        </h2>
                        <p className="text-black mb-1">Skill taught:</p>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <input
                                type="number"
                                min="0"
                                max="5"
                                value={inputValue}
                                onChange={(e) => {
                                    const clamped = Math.min(5, Math.max(0, parseInt(e.target.value, 10) || 0));
                                    setInputValue(clamped.toString());
                                }}
                                placeholder="Enter number 1 - 5"
                                className="
                w-full
                border border-gray-300
                rounded-md
                px-4 py-2
                mb-[20px]
                focus:outline-none focus:ring-2 focus:ring-[#3C9146]
                bg-white
                text-base text-black
              "
                                required
                            />
                            <div>
                                <p className="text-black">Did this skill study lead to any of the following?</p>
                                <Select
                                    isMulti
                                    required
                                    placeholder={'Select all that apply'}
                                    name="stydyTypes"
                                    options={typeOptions}
                                    value={typeOptions.filter((option) => selectedTypesIds.includes(Number(option.value)))}
                                    onChange={handleChange}
                                    className="basic-multi-select text-black"
                                    classNamePrefix="select"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="
                w-full
                mt-2
                bg-accent
                text-white
                font-medium
                py-2
                rounded-md
                hover:bg-green-700
                transition
                disabled:opacity-50 disabled:cursor-not-allowed
              "
                            >
                                {loading ? "Submitting…" : "Submit"}
                            </button>
                            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
                        </form>
                    </div>


                </div>
            </div>
        </>
    );
}
