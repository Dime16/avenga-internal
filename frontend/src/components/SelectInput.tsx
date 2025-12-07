'use client';

import CreatableSelect from 'react-select/creatable';
import {useId} from "react";
import {CSSObjectWithLabel} from "react-select";

export type SelectOption = {
    value: string;
    label: string;
};

type Props = {
    value: SelectOption | null;
    onChange: (value: SelectOption | null) => void;
    options: SelectOption[];
    placeholder?: string;
};



export default function SelectInput({ value, onChange, options, placeholder }: Props) {
    const id = useId();
    const customSelectStyles = {
        control: (provided: CSSObjectWithLabel) => ({
            ...provided,
            borderRadius: "0.375rem",
            border: "none"
        }),
        placeholder: (provided: CSSObjectWithLabel) => ({
            ...provided,
            color: "#9ca3af",
        }),
    }

    return (
        <CreatableSelect
            instanceId={id}
            inputId={id}
            isClearable
            value={value}
            onChange={onChange}
            options={options}
            styles={customSelectStyles}
            placeholder={placeholder || 'Select or type...'}
            className="react-select-container bg-white rounded-md border border-gray-400 text-black"
            classNamePrefix="react-select"
            isValidNewOption={() => false}
        />
    );
}
